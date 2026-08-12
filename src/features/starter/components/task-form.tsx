"use client";

import { Plus } from "react-feather";
import toast from "react-hot-toast";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TextArea } from "@/components/ui/text-area";
import { createTaskSchema } from "@/features/starter/schemas/task.schema";
import { createTaskAction } from "@/features/starter/server/actions/task.action";
import { useSafeForm } from "@/lib/safe-form/use-safe-form";

/** Libellés français des priorités, pour la liste déroulante. */
const PRIORITY_OPTIONS = [
  { label: "Basse", value: "low" },
  { label: "Moyenne", value: "medium" },
  { label: "Haute", value: "high" },
] as const;

/**
 * Formulaire de création de tâche.
 *
 * Illustre la chaîne complète du boilerplate : React Hook Form pour l'état des
 * champs, Zod pour la validation, `next-safe-form` pour l'appel serveur typé
 * et react-hot-toast pour le retour utilisateur.
 */
export const TaskForm = () => {
  const { register, getFieldError, onSubmit, isPending } = useSafeForm({
    schema: createTaskSchema,
    action: createTaskAction,
    defaultValues: { title: "", description: "", priority: "medium" },
    resetOnSuccess: true,
    onSuccess: ({ task }) => toast.success(`Tâche « ${task.title} » créée.`),
    onError: (message) => toast.error(message),
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
        <FormField
          name="title"
          label="Titre"
          error={getFieldError("title")}
          isRequired
        >
          <Input
            id="title"
            placeholder="Préparer la démonstration"
            hasError={Boolean(getFieldError("title"))}
            {...register("title")}
          />
        </FormField>

        <FormField
          name="priority"
          label="Priorité"
          error={getFieldError("priority")}
          isRequired
        >
          <Select
            id="priority"
            options={PRIORITY_OPTIONS}
            hasError={Boolean(getFieldError("priority"))}
            {...register("priority")}
          />
        </FormField>
      </div>

      <FormField
        name="description"
        label="Description"
        error={getFieldError("description")}
        hint="Optionnel — 500 caractères maximum."
      >
        <TextArea
          id="description"
          placeholder="Détaillez ce qu'il y a à faire…"
          hasError={Boolean(getFieldError("description"))}
          {...register("description")}
        />
      </FormField>

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isPending}
          leftIcon={<Plus className="size-4" />}
        >
          Ajouter la tâche
        </Button>
      </div>
    </form>
  );
};
