import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import {
  BUTTON_BASE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  type TButtonVariant,
} from "./button";
import { Spinner } from "./spinner";

/** Gabarits carrés de l'`IconButton`. */
export type TIconButtonSize = "sm" | "md" | "lg";

export type TIconButtonProps = Omit<ComponentProps<"button">, "children"> & {
  /** Icône affichée au centre du bouton. */
  icon: ReactNode;
  /**
   * Libellé accessible : obligatoire car le bouton n'a pas de texte visible.
   * Il est également utilisé comme `title` au survol.
   */
  label: string;
  /** Style visuel. @default "ghost" */
  variant?: TButtonVariant;
  /** Gabarit. @default "md" */
  size?: TIconButtonSize;
  /** Affiche un spinner et désactive le bouton. @default false */
  isLoading?: boolean;
};

const SIZE_CLASSES: Record<TIconButtonSize, string> = {
  sm: "size-9 [&_svg]:size-4",
  md: "size-11 [&_svg]:size-5",
  lg: "size-13 [&_svg]:size-6",
};

/**
 * Bouton carré ne contenant qu'une icône.
 *
 * @example
 * ```tsx
 * <IconButton icon={<Trash2 />} label="Supprimer" variant="danger" />
 * ```
 */
export const IconButton = ({
  icon,
  label,
  variant = "ghost",
  size = "md",
  isLoading = false,
  className,
  disabled,
  type = "button",
  ...props
}: TIconButtonProps) => (
  <button
    type={type}
    aria-label={label}
    title={label}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    className={cn(
      BUTTON_BASE_CLASSES,
      BUTTON_VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      "shrink-0 p-0",
      className,
    )}
    {...props}
  >
    {isLoading ? <Spinner size="sm" /> : icon}
  </button>
);
