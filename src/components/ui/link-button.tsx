import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import {
  BUTTON_BASE_CLASSES,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  type TButtonSize,
  type TButtonVariant,
} from "./button";

export type TLinkButtonProps = ComponentProps<typeof Link> & {
  /** Style visuel, identique à celui de `Button`. @default "primary" */
  variant?: TButtonVariant;
  /** Gabarit. @default "md" */
  size?: TButtonSize;
  /** Occupe toute la largeur disponible. @default false */
  fullWidth?: boolean;
  /** Élément décoratif affiché avant le libellé. */
  leftIcon?: ReactNode;
  /** Élément décoratif affiché après le libellé. */
  rightIcon?: ReactNode;
};

/**
 * Lien de navigation avec l'apparence d'un bouton.
 *
 * À privilégier sur `Button` dès qu'un clic mène à une autre page : la
 * navigation reste native (ouverture dans un nouvel onglet, préchargement).
 * Grâce à `typedRoutes`, `href` est vérifié à la compilation.
 *
 * @example
 * ```tsx
 * <LinkButton href="/register" variant="outline">Créer un compte</LinkButton>
 * ```
 */
export const LinkButton = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: TLinkButtonProps) => (
  <Link
    className={cn(
      BUTTON_BASE_CLASSES,
      BUTTON_VARIANT_CLASSES[variant],
      BUTTON_SIZE_CLASSES[size],
      fullWidth && "w-full",
      className,
    )}
    {...props}
  >
    {leftIcon}
    {children}
    {rightIcon}
  </Link>
);
