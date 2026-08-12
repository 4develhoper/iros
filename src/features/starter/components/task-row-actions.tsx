"use client";

import { useSafeActionForm } from "next-safe-form";
import { useState } from "react";
import { Check, RotateCcw, Trash2 } from "react-feather";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import {
  deleteTaskAction,
  toggleTaskAction,
} from "@/features/starter/server/actions/task.action";
import type { TTask } from "@/features/starter/types/task.types";

export type TTaskRowActionsProps = {
  /** Tâche concernée par les actions. */
  task: TTask;
};

/**
 * Actions disponibles sur une ligne de tâche : bascule d'état et suppression.
 *
 * Ces mutations n'ont pas de champ à saisir : elles utilisent directement
 * `useSafeActionForm` avec des `<form>` natifs et des champs cachés, plutôt que
 * le pont React Hook Form réservé aux vrais formulaires.
 *
 * La suppression passe par une confirmation modale, car elle est irréversible.
 */
export const TaskRowActions = ({ task }: TTaskRowActionsProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const toggle = useSafeActionForm<{ task: TTask }>({
    action: toggleTaskAction,
    initialValues: { task },
    onError: (message: string) => toast.error(message),
  });

  const remove = useSafeActionForm<{ id: string }>({
    action: deleteTaskAction,
    initialValues: { id: task.id },
    onSuccess: () => {
      toast.success("Tâche supprimée.");
      setIsConfirmOpen(false);
    },
    onError: (message: string) => {
      toast.error(message);
      setIsConfirmOpen(false);
    },
  });

  return (
    <div className="flex items-center justify-end gap-1">
      <form action={toggle.formAction}>
        <input type="hidden" name="id" value={task.id} />
        <input type="hidden" name="completed" value={String(!task.completed)} />
        <IconButton
          type="submit"
          icon={task.completed ? <RotateCcw /> : <Check />}
          label={
            task.completed ? "Marquer comme à faire" : "Marquer comme terminée"
          }
          size="sm"
          isLoading={toggle.isPending}
        />
      </form>

      <form action={remove.formAction}>
        <input type="hidden" name="id" value={task.id} />

        <IconButton
          icon={<Trash2 />}
          label="Supprimer la tâche"
          size="sm"
          variant="ghost"
          className="text-danger hover:bg-danger/10"
          onClick={() => setIsConfirmOpen(true)}
        />

        <Dialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          title="Supprimer cette tâche ?"
          description="Cette action est définitive et ne peut pas être annulée."
          size="sm"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsConfirmOpen(false)}>
                Annuler
              </Button>
              <Button
                type="submit"
                variant="danger"
                isLoading={remove.isPending}
              >
                Supprimer
              </Button>
            </>
          }
        >
          La tâche « {task.title} » sera retirée de votre liste.
        </Dialog>
      </form>
    </div>
  );
};
