import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/cn";

export type TFormFieldProps = {
  /** Identifiant HTML du contrôle, relié au libellé et au message d'erreur. */
  name: string;
  /** Libellé visible du champ. */
  label?: string;
  /** Message d'erreur de validation ; masque l'aide contextuelle. */
  error?: string;
  /** Aide contextuelle affichée sous le champ. */
  hint?: string;
  /** Marque le champ comme obligatoire. @default false */
  isRequired?: boolean;
  /** Contrôle de saisie (`Input`, `Select`, `TextArea`, ...). */
  children: ReactNode;
  className?: string;
};

/**
 * Enveloppe standard d'un champ de formulaire : libellé, contrôle, message.
 *
 * Centralise le câblage d'accessibilité (`aria-describedby`, `role="alert"`)
 * pour que chaque formulaire n'ait pas à le refaire.
 *
 * @example
 * ```tsx
 * <FormField name="email" label="E-mail" error={errors.email?.message} isRequired>
 *   <Input id="email" hasError={Boolean(errors.email)} {...register("email")} />
 * </FormField>
 * ```
 */
export const FormField = ({
  name,
  label,
  error,
  hint,
  isRequired = false,
  children,
  className,
}: TFormFieldProps) => (
  <div className={cn("space-y-1.5", className)}>
    {label ? (
      <Label htmlFor={name} isRequired={isRequired}>
        {label}
      </Label>
    ) : null}

    {children}

    {error ? (
      <p id={`${name}-error`} role="alert" className="text-xs text-danger">
        {error}
      </p>
    ) : hint ? (
      <p id={`${name}-hint`} className="text-xs text-muted">
        {hint}
      </p>
    ) : null}
  </div>
);
