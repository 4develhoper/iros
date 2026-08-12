/** @format */

import "server-only";

import { headers } from "next/headers";
import { createSafeAction } from "next-safe-form";
import type { z } from "zod";
import { auth } from "@/lib/better-auth/auth";
import type { TAuthSession } from "@/lib/better-auth/auth.types";
import type { TSafeAction } from "./safe-form.types";

/**
 * Erreur métier destinée à l'utilisateur.
 *
 * `createSafeAction` renvoie le message de toute exception au client. Sans
 * distinction, un bug interne exposerait ses détails d'implémentation : seuls
 * les messages portés par `ActionError` sont donc transmis tels quels, les
 * autres sont remplacés par un message générique.
 *
 * @example
 * ```ts
 * throw new ActionError("Cet e-mail est déjà utilisé.");
 * ```
 */
export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

/** Message affiché lorsqu'une exception inattendue est interceptée. */
export const DEFAULT_SERVER_ERROR_MESSAGE =
  "Une erreur est survenue. Veuillez réessayer.";

/** Options communes aux deux fabriques d'actions. */
type TCreateActionOptions<TSchema extends z.ZodTypeAny, TOutput> = {
  /** Nom de l'action, utilisé comme préfixe dans les journaux serveur. */
  actionName: string;
  /** Schéma de validation appliqué à la `FormData` reçue. */
  schema: TSchema;
  /** Logique métier exécutée après validation. */
  handler: (data: z.infer<TSchema>) => Promise<TOutput>;
};

/**
 * Journalise l'exception puis la reformule pour le client.
 *
 * @param actionName - Nom de l'action fautive.
 * @param error - Exception interceptée.
 */
const rethrowSanitized = (actionName: string, error: unknown): never => {
  console.error(`[action:${actionName}]`, error);

  if (error instanceof ActionError) {
    throw error;
  }

  throw new Error(DEFAULT_SERVER_ERROR_MESSAGE);
};

/**
 * Crée une Server Action validée, accessible sans session.
 *
 * @example
 * ```ts
 * export const subscribeAction = createAction({
 *   actionName: "subscribe",
 *   schema: subscribeSchema,
 *   handler: async ({ email }) => saveSubscriber(email),
 * });
 * ```
 */
export const createAction = <TSchema extends z.ZodTypeAny, TOutput>({
  actionName,
  schema,
  handler,
}: TCreateActionOptions<TSchema, TOutput>): TSafeAction<TOutput> =>
  // `createSafeAction` type sa charge utile de succès en `any` : on rétablit
  // ici `TOutput` pour que `onSuccess` reste typé côté composant.
  createSafeAction({
    schema,
    handler: async (data) => {
      try {
        return await handler(data);
      } catch (error) {
        return rethrowSanitized(actionName, error);
      }
    },
  }) as TSafeAction<TOutput>;

/** Options d'une action protégée : le handler reçoit la session en second argument. */
type TCreateAuthActionOptions<TSchema extends z.ZodTypeAny, TOutput> = Omit<
  TCreateActionOptions<TSchema, TOutput>,
  "handler"
> & {
  handler: (data: z.infer<TSchema>, session: TAuthSession) => Promise<TOutput>;
};

/**
 * Crée une Server Action validée **et** protégée par une session.
 *
 * La session est vérifiée avant l'exécution du handler, qui reçoit donc un
 * utilisateur garanti non nul.
 *
 * @example
 * ```ts
 * export const createTaskAction = createAuthAction({
 *   actionName: "createTask",
 *   schema: createTaskSchema,
 *   handler: async (input, { user }) => createTask(input, user.id),
 * });
 * ```
 */
export const createAuthAction = <TSchema extends z.ZodTypeAny, TOutput>({
  actionName,
  schema,
  handler,
}: TCreateAuthActionOptions<TSchema, TOutput>) =>
  createAction({
    actionName,
    schema,
    handler: async (data) => {
      const session = await auth.api.getSession({ headers: await headers() });

      if (!session) {
        throw new ActionError(
          "Vous devez être connecté pour effectuer cette action.",
        );
      }

      return await handler(data, session);
    },
  });
