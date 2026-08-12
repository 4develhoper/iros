import "server-only";

import { and, desc, eq } from "drizzle-orm";
import type { TCreateTaskData } from "@/features/starter/schemas/task.schema";
import type { TTask } from "@/features/starter/types/task.types";
import { database, schemas } from "@/lib/drizzle";

/**
 * Accès aux données des tâches.
 *
 * Chaque requête est filtrée par `userId` : le cloisonnement entre comptes est
 * appliqué ici, jamais dans les composants.
 */

/**
 * Liste les tâches d'un utilisateur, de la plus récente à la plus ancienne.
 *
 * @param userId - Identifiant du propriétaire des tâches.
 */
export const listTasksByUser = async (userId: string): Promise<TTask[]> =>
  await database
    .select()
    .from(schemas.task)
    .where(eq(schemas.task.userId, userId))
    .orderBy(desc(schemas.task.createdAt));

/**
 * Crée une tâche pour un utilisateur donné.
 *
 * @param input - Données validées du formulaire.
 * @param userId - Identifiant du propriétaire.
 * @returns La tâche créée.
 */
export const createTask = async (
  input: TCreateTaskData,
  userId: string,
): Promise<TTask> => {
  const [created] = await database
    .insert(schemas.task)
    .values({
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description ?? null,
      priority: input.priority,
      userId,
    })
    .returning();

  return created;
};

/**
 * Bascule l'état « terminée » d'une tâche.
 *
 * @returns La tâche mise à jour, ou `undefined` si elle n'appartient pas à
 * l'utilisateur.
 */
export const setTaskCompletion = async (
  taskId: string,
  completed: boolean,
  userId: string,
): Promise<TTask | undefined> => {
  const [updated] = await database
    .update(schemas.task)
    .set({ completed })
    .where(and(eq(schemas.task.id, taskId), eq(schemas.task.userId, userId)))
    .returning();

  return updated;
};

/**
 * Supprime une tâche appartenant à l'utilisateur.
 *
 * @returns La tâche supprimée, ou `undefined` si aucune ligne ne correspond.
 */
export const deleteTask = async (
  taskId: string,
  userId: string,
): Promise<TTask | undefined> => {
  const [deleted] = await database
    .delete(schemas.task)
    .where(and(eq(schemas.task.id, taskId), eq(schemas.task.userId, userId)))
    .returning();

  return deleted;
};
