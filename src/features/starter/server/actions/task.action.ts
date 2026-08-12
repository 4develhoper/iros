"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/routes.config";
import {
  createTaskSchema,
  deleteTaskSchema,
  toggleTaskSchema,
} from "@/features/starter/schemas/task.schema";
import {
  createTask,
  deleteTask,
  setTaskCompletion,
} from "@/features/starter/server/dal/task.dal";
import { ActionError, createAuthAction } from "@/lib/safe-form/create-action";

/**
 * Server Actions de la feature `starter`.
 *
 * Elles utilisent `createAuthAction` : la session est vérifiée en amont et le
 * handler reçoit un utilisateur garanti non nul.
 */

/** Crée une tâche pour l'utilisateur connecté. */
export const createTaskAction = createAuthAction({
  actionName: "createTask",
  schema: createTaskSchema,
  handler: async (input, { user }) => {
    const task = await createTask(input, user.id);

    revalidatePath(routes.app.starter);

    return { task };
  },
});

/** Marque une tâche comme terminée ou à faire. */
export const toggleTaskAction = createAuthAction({
  actionName: "toggleTask",
  schema: toggleTaskSchema,
  handler: async ({ id, completed }, { user }) => {
    const task = await setTaskCompletion(id, completed, user.id);

    if (!task) {
      throw new ActionError("Cette tâche est introuvable.");
    }

    revalidatePath(routes.app.starter);

    return { task };
  },
});

/** Supprime définitivement une tâche. */
export const deleteTaskAction = createAuthAction({
  actionName: "deleteTask",
  schema: deleteTaskSchema,
  handler: async ({ id }, { user }) => {
    const task = await deleteTask(id, user.id);

    if (!task) {
      throw new ActionError("Cette tâche est introuvable.");
    }

    revalidatePath(routes.app.starter);

    return { id };
  },
});
