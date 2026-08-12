/** @format */

"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import {
  loginSchema,
  logoutSchema,
  registerSchema,
} from "@/features/auth/schemas/auth.schema";
import { auth } from "@/lib/better-auth/auth";
import { ActionError, createAction } from "@/lib/safe-form/create-action";

/**
 * Traduit une erreur Better Auth en message destiné à l'utilisateur.
 *
 * Les erreurs d'API portent un message exploitable ; toute autre exception est
 * relayée telle quelle pour être journalisée puis masquée par `createAction`.
 *
 * @param error - Exception levée par `auth.api`.
 * @param fallback - Message affiché si l'erreur n'est pas une erreur d'API.
 */
const toActionError = (error: unknown, fallback: string): never => {
  if (error instanceof APIError) {
    throw new ActionError(error.body?.message ?? fallback);
  }

  throw error;
};

/**
 * Connecte un utilisateur avec son e-mail et son mot de passe.
 *
 * En cas de succès, le cookie de session est posé par le plugin `nextCookies`
 * de Better Auth ; la redirection est laissée au composant appelant.
 */
export const loginAction = createAction({
  actionName: "login",
  schema: loginSchema,
  handler: async ({ email, password, rememberMe }) => {
    try {
      const result = await auth.api.signInEmail({
        body: { email, password, rememberMe },
        headers: await headers(),
      });

      return { user: result.user };
    } catch (error) {
      return toActionError(error, "E-mail ou mot de passe incorrect.");
    }
  },
});

/**
 * Crée un compte puis ouvre immédiatement une session.
 *
 * `autoSignIn` étant activé côté Better Auth, aucune connexion supplémentaire
 * n'est nécessaire après l'inscription.
 */
export const registerAction = createAction({
  actionName: "register",
  schema: registerSchema,
  handler: async ({ firstName, lastName, email, password }) => {
    try {
      const result = await auth.api.signUpEmail({
        body: {
          name: `${firstName.trim()} ${lastName.trim()}`,
          email,
          password,
        },
        headers: await headers(),
      });

      return { user: result.user };
    } catch (error) {
      return toActionError(
        error,
        "La création du compte a échoué. Vérifiez vos informations.",
      );
    }
  },
});

/**
 * Ferme la session courante et invalide le cookie associé.
 */
export const logoutAction = createAction({
  actionName: "logout",
  schema: logoutSchema,
  handler: async () => {
    try {
      await auth.api.signOut({ headers: await headers() });

      return { success: true };
    } catch (error) {
      return toActionError(error, "La déconnexion a échoué.");
    }
  },
});
