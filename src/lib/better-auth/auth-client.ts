"use client";

import { createAuthClient } from "better-auth/react";

/**
 * Client Better Auth utilisable dans les composants client.
 *
 * Aucune `baseURL` n'est fournie volontairement : le client vise alors la même
 * origine que la page courante. Le boilerplate reste ainsi correct quel que
 * soit le port de développement ou le domaine de déploiement, sans dépendre
 * d'une variable d'environnement à tenir à jour.
 *
 * @example
 * ```tsx
 * const { data: session, isPending } = authClient.useSession();
 * await authClient.signOut();
 * ```
 */
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
