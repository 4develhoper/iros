/** @format */

import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loginWithExpiredSession } from "@/config/routes.config";
import { auth } from "@/lib/better-auth/auth";
import type { TAuthSession, TAuthUser } from "@/lib/better-auth/auth.types";

/**
 * Couche d'accès aux données de session (Data Access Layer).
 *
 * Toute lecture de session passe par ce module : les composants et actions
 * n'appellent jamais `auth.api` directement, ce qui garantit un point unique
 * pour faire évoluer les règles d'accès.
 *
 * Ces fonctions lisent les en-têtes de la requête : elles rendent le rendu
 * dynamique. Sous `cacheComponents`, leurs appelants doivent donc être placés
 * derrière une frontière `<Suspense>`.
 */

/**
 * Récupère la session courante sans jamais échouer.
 *
 * @returns La session, ou `null` si le visiteur n'est pas connecté.
 */
export const getCurrentSession = async (): Promise<TAuthSession | null> =>
  await auth.api.getSession({ headers: await headers() });

/**
 * Récupère l'utilisateur connecté.
 *
 * @returns L'utilisateur, ou `null` si le visiteur n'est pas connecté.
 */
export const getCurrentUser = async (): Promise<TAuthUser | null> => {
  const session = await getCurrentSession();

  return session?.user ?? null;
};

/**
 * Impose une session valide et renvoie l'utilisateur associé.
 *
 * Redirige vers la page de connexion lorsque le visiteur est anonyme : à
 * utiliser dans les pages et layouts protégés.
 *
 * La redirection porte le marqueur `SESSION_EXPIRED_PARAM` : sans lui, un
 * cookie obsolète — présent mais rattaché à aucune session — provoquerait une
 * boucle, le proxy renvoyant vers l'espace protégé le visiteur que cette
 * fonction vient d'en éjecter.
 *
 * @example
 * ```tsx
 * const user = await requireUser();
 * ```
 */
export const requireUser = async (): Promise<TAuthUser> => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(loginWithExpiredSession);
  }

  return user;
};
