/**
 * Catalogue centralisé des routes de l'application.
 *
 * Grâce à `typedRoutes`, toute valeur invalide est rejetée à la compilation
 * lorsqu'elle est passée à `<Link href>` ou `redirect()`.
 */
export const routes = {
  /** Routes accessibles sans session. */
  public: {
    landing: "/",
  },
  /** Routes du tunnel d'authentification. */
  auth: {
    login: "/login",
    register: "/register",
  },
  /** Routes protégées par le middleware. */
  app: {
    starter: "/starter",
  },
} as const;

/**
 * Préfixes des routes protégées.
 *
 * Consommé par `src/middleware.ts` pour rediriger les visiteurs anonymes.
 */
export const protectedRoutePrefixes = [routes.app.starter] as const;

/** Route par défaut après une connexion réussie. */
export const defaultRedirectAfterLogin = routes.app.starter;

/** Route utilisée lorsqu'une session est requise mais absente. */
export const defaultRedirectWhenUnauthenticated = routes.auth.login;

/**
 * Paramètre signalant qu'un cookie de session a survécu à sa session.
 *
 * Il évite une boucle de redirections : le proxy ne fait qu'un contrôle
 * optimiste (présence du cookie) et renverrait sans fin vers l'espace protégé
 * un visiteur que la vérification serveur vient de rejeter. Sa présence indique
 * au proxy de purger le cookie obsolète et de laisser la page de connexion
 * s'afficher.
 *
 * @see src/proxy.ts
 * @see src/features/auth/server/dal/session.dal.ts
 */
export const SESSION_EXPIRED_PARAM = "session_expired";

/** Destination des visiteurs dont le cookie de session n'est plus valable. */
export const loginWithExpiredSession =
  `${routes.auth.login}?${SESSION_EXPIRED_PARAM}=1` as const;
