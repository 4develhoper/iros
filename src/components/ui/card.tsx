import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Niveaux de mise en avant d'une carte. */
export type TCardVariant = "elevated" | "outlined" | "soft";

export type TCardProps = ComponentProps<"div"> & {
  /** Apparence de la surface. @default "outlined" */
  variant?: TCardVariant;
};

const VARIANT_CLASSES: Record<TCardVariant, string> = {
  elevated: "bg-background shadow-[0_8px_30px_-12px_rgba(16,20,32,0.18)]",
  outlined: "bg-background border border-border",
  soft: "bg-vanilla border border-vanilla-300",
};

/**
 * Conteneur de contenu à coins arrondis.
 *
 * S'utilise avec les sous-composants `CardHeader`, `CardBody` et `CardFooter`
 * pour obtenir des espacements cohérents.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader title="Tâches" description="Vos éléments en cours" />
 *   <CardBody>…</CardBody>
 * </Card>
 * ```
 */
export const Card = ({
  variant = "outlined",
  className,
  ...props
}: TCardProps) => (
  <div
    className={cn("rounded-card", VARIANT_CLASSES[variant], className)}
    {...props}
  />
);

export type TCardHeaderProps = ComponentProps<"div"> & {
  /** Titre principal de la carte. */
  title: ReactNode;
  /** Texte secondaire affiché sous le titre. */
  description?: ReactNode;
  /** Zone d'actions alignée à droite (bouton, menu, ...). */
  action?: ReactNode;
};

/** En-tête de carte : titre, description et actions. */
export const CardHeader = ({
  title,
  description,
  action,
  className,
  ...props
}: TCardHeaderProps) => (
  <div
    className={cn(
      "flex items-start justify-between gap-4 px-6 pt-6 pb-4",
      className,
    )}
    {...props}
  >
    <div className="space-y-1">
      <h3 className="text-base font-medium text-ink-900">{title}</h3>
      {description ? <p className="text-sm text-muted">{description}</p> : null}
    </div>
    {action}
  </div>
);

/** Corps de carte : contenu principal. */
export const CardBody = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("px-6 pb-6", className)} {...props} />
);

/** Pied de carte : actions secondaires, séparées par un filet. */
export const CardFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex items-center justify-end gap-3 border-t border-border px-6 py-4",
      className,
    )}
    {...props}
  />
);
