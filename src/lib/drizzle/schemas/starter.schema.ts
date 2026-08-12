import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth.schema";

/**
 * Table de démonstration utilisée par la feature `starter`.
 *
 * Elle sert de gabarit : dupliquer ce fichier, renommer la table et adapter
 * les colonnes pour créer une nouvelle entité métier.
 */
export const task = sqliteTable("task", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  /** Priorité de la tâche, contrainte côté application par Zod. */
  priority: text("priority", { enum: ["low", "medium", "high"] })
    .default("medium")
    .notNull(),
  completed: integer("completed", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});
