import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultRedirectAfterLogin,
  defaultRedirectWhenUnauthenticated,
  protectedRoutePrefixes,
  routes,
  SESSION_EXPIRED_PARAM,
} from "@/config/routes.config";

/** Routes du tunnel d'authentification, interdites aux utilisateurs connectés. */
const AUTH_ROUTES: readonly string[] = [
  routes.auth.login,
  routes.auth.register,
];

/**
 * Supprime les cookies de session laissés par une session qui n'existe plus.
 *
 * Better Auth pose `session_token` ainsi que `session_data` lorsque le cache
 * cookie est activé, avec un préfixe `__Secure-` en production : on cible donc
 * les noms par suffixe.
 *
 * @param request - Requête entrante, source des cookies à purger.
 * @param response - Réponse sur laquelle poser les suppressions.
 */
const clearStaleSessionCookies = (
  request: NextRequest,
  response: NextResponse,
): void => {
  for (const cookie of request.cookies.getAll()) {
    if (
      cookie.name.endsWith("session_token") ||
      cookie.name.endsWith("session_data")
    ) {
      response.cookies.delete(cookie.name);
    }
  }
};

/**
 * Garde d'accès exécutée avant le rendu des pages.
 *
 * Remplace l'ancienne convention `middleware.ts`, dépréciée depuis Next.js 16.
 *
 * Le contrôle est volontairement *optimiste* : seule la présence du cookie de
 * session est vérifiée, sans requête en base, pour rester rapide sur l'edge.
 * La vérification qui fait autorité reste `requireUser()` dans la DAL, appelée
 * côté serveur au rendu des pages protégées.
 *
 * Cette asymétrie impose un garde-fou : un cookie présent mais rattaché à
 * aucune session valide ferait sinon rebondir le visiteur entre la page de
 * connexion et l'espace protégé. Le marqueur `SESSION_EXPIRED_PARAM`, posé par
 * `requireUser()`, rompt le cycle et déclenche la purge du cookie.
 */
export const proxy = (request: NextRequest): NextResponse => {
  const { pathname, search, searchParams } = request.nextUrl;
  const hasSessionCookie = Boolean(getSessionCookie(request));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // Retour d'une session invalidée : on purge le cookie fantôme et on laisse
  // la page de connexion s'afficher.
  if (isAuthRoute && searchParams.has(SESSION_EXPIRED_PARAM)) {
    const response = NextResponse.next();
    clearStaleSessionCookies(request, response);

    return response;
  }

  const isProtectedRoute = protectedRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  // Visiteur anonyme sur une route protégée : renvoi vers la connexion en
  // mémorisant la destination initiale.
  if (isProtectedRoute && !hasSessionCookie) {
    const loginUrl = new URL(defaultRedirectWhenUnauthenticated, request.url);
    loginUrl.searchParams.set("redirectTo", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  // Utilisateur déjà connecté sur une page de connexion ou d'inscription.
  if (isAuthRoute && hasSessionCookie) {
    return NextResponse.redirect(
      new URL(defaultRedirectAfterLogin, request.url),
    );
  }

  return NextResponse.next();
};

export const config = {
  /**
   * Exclut les ressources statiques, les images optimisées et les routes de
   * l'API d'authentification (qui doivent rester joignables sans session).
   */
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
