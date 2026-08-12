import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type TCheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  /** Texte affiché à droite de la case. */
  label?: ReactNode;
  /** Applique le style d'erreur. @default false */
  hasError?: boolean;
};

/**
 * Case à cocher accompagnée de son libellé cliquable.
 *
 * L'`<input>` natif est stylé via `accent-color` : le comportement clavier et
 * l'état indéterminé restent ceux du navigateur.
 *
 * @example
 * ```tsx
 * <Checkbox label="Se souvenir de moi" {...register("rememberMe")} />
 * ```
 */
export const Checkbox = ({
  label,
  hasError = false,
  className,
  ...props
}: TCheckboxProps) => (
  <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
    <input
      type="checkbox"
      aria-invalid={hasError || undefined}
      className={cn(
        "size-4.5 cursor-pointer rounded border-border accent-primary",
        hasError && "outline outline-danger",
        className,
      )}
      {...props}
    />
    {label ? <span>{label}</span> : null}
  </label>
);
