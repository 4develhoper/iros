import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type TEmptyStateProps = {
  /** Icône illustrant l'absence de contenu. */
  icon?: ReactNode;
  /** Titre du message. */
  title: string;
  /** Explication ou piste d'action. */
  description?: string;
  /** Bouton d'action principal. */
  action?: ReactNode;
  className?: string;
};

/**
 * État vide d'une liste, d'un tableau ou d'un tableau de bord.
 *
 * @example
 * ```tsx
 * <EmptyState icon={<Inbox />} title="Aucune tâche" action={<Button>Créer</Button>} />
 * ```
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
}: TEmptyStateProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border px-6 py-14 text-center",
      className,
    )}
  >
    {icon ? (
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-full bg-vanilla text-primary [&_svg]:size-5"
      >
        {icon}
      </span>
    ) : null}

    <div className="space-y-1">
      <p className="font-medium text-ink-900">{title}</p>
      {description ? (
        <p className="mx-auto max-w-sm text-sm text-muted">{description}</p>
      ) : null}
    </div>

    {action}
  </div>
);
