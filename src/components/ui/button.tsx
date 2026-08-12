import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "./spinner";

/** Styles visuels du bouton. */
export type TButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

/** Gabarits de taille du bouton. */
export type TButtonSize = "sm" | "md" | "lg";

export type TButtonProps = ComponentProps<"button"> & {
  /** Style visuel. @default "primary" */
  variant?: TButtonVariant;
  /** Gabarit. @default "md" */
  size?: TButtonSize;
  /** Affiche un spinner et désactive le bouton. @default false */
  isLoading?: boolean;
  /** Occupe toute la largeur disponible. @default false */
  fullWidth?: boolean;
  /** Élément décoratif affiché avant le libellé. */
  leftIcon?: ReactNode;
  /** Élément décoratif affiché après le libellé. */
  rightIcon?: ReactNode;
};

/**
 * Classes partagées par tous les éléments cliquables du design system.
 *
 * Réutilisées par `IconButton` et `LinkButton` afin que les trois composants
 * restent visuellement alignés.
 */
export const BUTTON_BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-field font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

export const BUTTON_VARIANT_CLASSES: Record<TButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-600 active:bg-primary-700",
  secondary:
    "bg-vanilla-200 text-ink-800 hover:bg-vanilla-300 active:bg-vanilla-400",
  outline:
    "border border-border bg-background text-ink-800 hover:bg-ink-50 active:bg-ink-100",
  ghost: "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
  danger: "bg-danger text-white hover:brightness-95 active:brightness-90",
};

export const BUTTON_SIZE_CLASSES: Record<TButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

/**
 * Bouton principal de l'application.
 *
 * Pendant le chargement, le libellé reste visible pour éviter tout saut de
 * mise en page ; seul un spinner s'ajoute et le bouton devient inactif.
 *
 * @example
 * ```tsx
 * <Button variant="primary" isLoading={isPending} fullWidth>
 *   Se connecter
 * </Button>
 * ```
 */
export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: TButtonProps) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    className={cn(
      BUTTON_BASE_CLASSES,
      BUTTON_VARIANT_CLASSES[variant],
      BUTTON_SIZE_CLASSES[size],
      fullWidth && "w-full",
      className,
    )}
    {...props}
  >
    {isLoading ? <Spinner size="sm" /> : leftIcon}
    {children}
    {!isLoading && rightIcon}
  </button>
);
