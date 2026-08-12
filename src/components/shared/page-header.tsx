import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type TPageHeaderProps = {
  /** Titre de la page. */
  title: string;
  /** Phrase de contexte affichée sous le titre. */
  description?: string;
  /** Actions principales alignées à droite. */
  action?: ReactNode;
  className?: string;
};

/**
 * En-tête de page des écrans applicatifs.
 *
 * @example
 * ```tsx
 * <PageHeader title="Starter" description="Page de démonstration" action={<Button>Nouveau</Button>} />
 * ```
 */
export const PageHeader = ({
  title,
  description,
  action,
  className,
}: TPageHeaderProps) => (
  <header
    className={cn(
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      className,
    )}
  >
    <div className="space-y-1">
      <h1 className="text-2xl font-medium tracking-tight text-ink-900">
        {title}
      </h1>
      {description ? <p className="text-sm text-muted">{description}</p> : null}
    </div>
    {action}
  </header>
);
