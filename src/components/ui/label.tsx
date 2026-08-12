import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export type TLabelProps = ComponentProps<"label"> & {
  /** Ajoute un astérisque signalant un champ obligatoire. @default false */
  isRequired?: boolean;
};

/**
 * Libellé de champ de formulaire.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" isRequired>Adresse e-mail</Label>
 * ```
 */
export const Label = ({
  isRequired = false,
  className,
  children,
  ...props
}: TLabelProps) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: primitive générique, le `htmlFor` est fourni par l'appelant (voir `FormField`)
  <label
    className={cn("text-sm font-medium text-ink-700", className)}
    {...props}
  >
    {children}
    {isRequired ? (
      <span className="ml-0.5 text-danger" aria-hidden="true">
        *
      </span>
    ) : null}
  </label>
);
