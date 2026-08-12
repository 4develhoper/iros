import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type TInputProps = ComponentProps<"input"> & {
  /** Applique le style d'erreur et marque le champ comme invalide. @default false */
  hasError?: boolean;
  /** Icône décorative affichée à gauche, à l'intérieur du champ. */
  startIcon?: ReactNode;
  /** Élément interactif affiché à droite (bouton d'action, unité, ...). */
  endAdornment?: ReactNode;
};

/**
 * Classes du conteneur de champ, partagées par `Input`, `Select` et `TextArea`
 * afin que tous les contrôles aient la même hauteur, le même rayon et le même
 * comportement au focus.
 */
export const FIELD_BASE_CLASSES =
  "w-full rounded-field border bg-background text-sm text-ink-900 transition-colors placeholder:text-ink-400 disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400";

export const FIELD_STATE_CLASSES = {
  default: "border-border hover:border-ink-300 focus:border-primary",
  error: "border-danger focus:border-danger",
} as const;

/**
 * Champ de saisie sur une ligne.
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="Adresse e-mail"
 *   hasError={Boolean(errors.email)}
 *   {...register("email")}
 * />
 * ```
 */
export const Input = ({
  hasError = false,
  startIcon,
  endAdornment,
  className,
  type = "text",
  ...props
}: TInputProps) => (
  <div className="relative flex items-center">
    {startIcon ? (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 flex text-ink-400 [&_svg]:size-4.5"
      >
        {startIcon}
      </span>
    ) : null}

    <input
      type={type}
      aria-invalid={hasError || undefined}
      className={cn(
        FIELD_BASE_CLASSES,
        hasError ? FIELD_STATE_CLASSES.error : FIELD_STATE_CLASSES.default,
        "h-12 px-4 outline-none focus-visible:outline-none",
        startIcon && "pl-11",
        endAdornment && "pr-12",
        className,
      )}
      {...props}
    />

    {endAdornment ? (
      <span className="absolute right-2 flex items-center">{endAdornment}</span>
    ) : null}
  </div>
);
