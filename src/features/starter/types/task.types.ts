import type { schemas } from "@/lib/drizzle";

/** Tâche telle que lue en base de données. */
export type TTask = typeof schemas.task.$inferSelect;

/** Payload d'insertion d'une tâche. */
export type TNewTask = typeof schemas.task.$inferInsert;

/** Niveau de priorité d'une tâche. */
export type TTaskPriority = TTask["priority"];
