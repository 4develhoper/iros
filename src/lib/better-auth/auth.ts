import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { database, schemas } from "@/lib/drizzle";

/** Indique si un fournisseur OAuth est configuré dans l'environnement. */
const hasProvider = (id?: string, secret?: string): boolean =>
  Boolean(id && secret);

/**
 * Instance serveur de Better Auth.
 *
 * Elle expose le handler HTTP (`auth.handler`, monté sur `/api/auth/[...all]`)
 * et l'API serveur (`auth.api.getSession`, ...). Les fournisseurs OAuth ne sont
 * activés que si leurs identifiants sont présents dans l'environnement, ce qui
 * permet de démarrer le boilerplate sans configuration externe.
 */
export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "sqlite",
    schema: {
      user: schemas.user,
      session: schemas.session,
      account: schemas.account,
      verification: schemas.verification,
    },
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },

  socialProviders: {
    ...(hasProvider(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    )
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          },
        }
      : {}),
    ...(hasProvider(
      process.env.GITHUB_CLIENT_ID,
      process.env.GITHUB_CLIENT_SECRET,
    )
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          },
        }
      : {}),
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // prolongée au plus une fois par jour
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // session mise en cache 5 min pour éviter un accès DB par requête
    },
  },

  // `nextCookies` doit rester le dernier plugin : il pose les cookies définis
  // par les autres plugins depuis les Server Actions.
  plugins: [nextCookies()],
});
