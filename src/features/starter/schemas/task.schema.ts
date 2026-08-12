import { z } from "zod";
import { formBoolean, formOptionalString } from "@/lib/safe-form/form-schema";

/** Priorités acceptées, alignées sur l'énumération de la table `task`. */
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

/** Schéma de création d'une tâche. */
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères.")
    .max(120, "Le titre ne peut pas dépasser 120 caractères."),
  description: formOptionalString(
    500,
    "La description ne peut pas dépasser 500 caractères.",
  ),
  priority: z.enum(TASK_PRIORITIES, { message: "Priorité invalide." }),
});

/** Schéma de bascule de l'état « terminée ». */
export const toggleTaskSchema = z.object({
  id: z.string().min(1, "Identifiant de tâche manquant."),
  completed: formBoolean(),
});

/** Schéma de suppression d'une tâche. */
export const deleteTaskSchema = z.object({
  id: z.string().min(1, "Identifiant de tâche manquant."),
});

/** Valeurs attendues à la saisie (React Hook Form). */
export type TCreateTaskInput = z.input<typeof createTaskSchema>;

/** Valeurs normalisées après validation (handlers serveur). */
export type TCreateTaskData = z.output<typeof createTaskSchema>;
export type TToggleTaskData = z.output<typeof toggleTaskSchema>;
export type TDeleteTaskData = z.output<typeof deleteTaskSchema>;
