import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

/** Tailles disponibles pour l'indicateur de chargement. */
export type TSpinnerSize = "sm" | "md" | "lg";

export type TSpinnerProps = ComponentProps<"output"> & {
  /** Diamètre du cercle. @default "md" */
  size?: TSpinnerSize;
};

const SIZE_CLASSES: Record<TSpinnerSize, string> = {
  sm: "size-3.5 border-2",
  md: "size-4.5 border-2",
  lg: "size-6 border-[3px]",
};

/**
 * Indicateur de chargement circulaire.
 *
 * Rendu via l'élément natif `<output>`, qui porte déjà le rôle `status` : les
 * lecteurs d'écran annoncent l'attente sans interrompre l'utilisateur.
 * Il hérite de la couleur du texte parent (`border-current`) et s'intègre donc
 * à n'importe quel bouton ou surface sans configuration.
 *
 * @example
 * ```tsx
 * <Spinner size="sm" />
 * ```
 */
export const Spinner = ({
  size = "md",
  className,
  ...props
}: TSpinnerProps) => (
  <output
    aria-label="Chargement en cours"
    className={cn(
      "inline-block animate-spin rounded-full border-current border-r-transparent",
      SIZE_CLASSES[size],
      className,
    )}
    {...props}
  />
);
