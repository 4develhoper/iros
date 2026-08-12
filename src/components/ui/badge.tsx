import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

/** Intentions sémantiques du badge. */
export type TBadgeVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export type TBadgeProps = ComponentProps<"span"> & {
  /** Couleur sémantique. @default "neutral" */
  variant?: TBadgeVariant;
};

/**
 * Les états s'appuient sur les jetons sémantiques en transparence plutôt que
 * sur la palette Tailwind : ils restent ainsi lisibles dans les deux thèmes,
 * sans variante `dark:`.
 */
const VARIANT_CLASSES: Record<TBadgeVariant, string> = {
  neutral: "bg-ink-100 text-ink-700",
  primary: "bg-primary-50 text-primary-700",
  success: "bg-success/12 text-success",
  warning: "bg-warning/12 text-warning",
  danger: "bg-danger/12 text-danger",
};

/**
 * Étiquette compacte pour qualifier un état ou une catégorie.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Terminée</Badge>
 * ```
 */
export const Badge = ({
  variant = "neutral",
  className,
  ...props
}: TBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
      VARIANT_CLASSES[variant],
      className,
    )}
    {...props}
  />
);
