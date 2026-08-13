import type { ReactNode } from "react";
import { AlertTriangle, Info, XOctagon } from "react-feather";
import { cn } from "@/lib/utils/cn";

/** Niveaux d'attention d'un encart. */
export type TDocNoteVariant = "info" | "warning" | "danger";

export type TDocNoteProps = {
  /** Intention de l'encart. @default "info" */
  variant?: TDocNoteVariant;
  /** Titre court de l'encart. */
  title: string;
  /** Contenu de l'encart. */
  children: ReactNode;
};

/**
 * Les jetons sémantiques sont utilisés en transparence (`bg-danger/10`) plutôt
 * qu'avec une couleur figée de la palette Tailwind : l'encart reste lisible
 * dans les deux thèmes sans variante `dark:`.
 */
const VARIANT_CLASSES: Record<TDocNoteVariant, string> = {
  info: "border-primary/25 bg-primary/8 text-primary",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/30 bg-danger/10 text-danger",
};

const VARIANT_ICONS: Record<TDocNoteVariant, ReactNode> = {
  info: <Info />,
  warning: <AlertTriangle />,
  danger: <XOctagon />,
};

/**
 * Encart mettant en avant une précaution ou une information annexe.
 *
 * @example
 * ```tsx
 * <DocNote variant="warning" title="Attention">
 *   `db:push` écrase le schéma sans laisser de migration.
 * </DocNote>
 * ```
 */
export const DocNote = ({
  variant = "info",
  title,
  children,
}: TDocNoteProps) => (
  <div
    className={cn(
      "flex max-w-3xl gap-3 rounded-card border p-4",
      VARIANT_CLASSES[variant],
    )}
  >
    <span aria-hidden="true" className="mt-0.5 shrink-0 [&_svg]:size-4.5">
      {VARIANT_ICONS[variant]}
    </span>

    <div className="space-y-1">
      <p className="text-sm font-medium">{title}</p>
      <div className="text-sm leading-relaxed text-ink-700">{children}</div>
    </div>
  </div>
);
