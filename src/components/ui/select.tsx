import type { ComponentProps } from "react";
import { ChevronDown } from "react-feather";
import { cn } from "@/lib/utils/cn";
import { FIELD_BASE_CLASSES, FIELD_STATE_CLASSES } from "./input";

/** Option affichée dans la liste déroulante. */
export type TSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type TSelectProps = Omit<ComponentProps<"select">, "children"> & {
  /** Options proposées. */
  options: readonly TSelectOption[];
  /** Libellé de l'option vide initiale (non sélectionnable une fois quittée). */
  placeholder?: string;
  /** Applique le style d'erreur et marque le champ comme invalide. @default false */
  hasError?: boolean;
};

/**
 * Liste déroulante native, stylée pour correspondre aux autres champs.
 *
 * Le `<select>` natif est conservé volontairement : il reste accessible au
 * clavier et affiche l'interface système sur mobile.
 *
 * @example
 * ```tsx
 * <Select
 *   options={[{ label: "Haute", value: "high" }]}
 *   placeholder="Choisir une priorité"
 *   {...register("priority")}
 * />
 * ```
 */
export const Select = ({
  options,
  placeholder,
  hasError = false,
  className,
  defaultValue,
  ...props
}: TSelectProps) => (
  <div className="relative flex items-center">
    <select
      aria-invalid={hasError || undefined}
      defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
      className={cn(
        FIELD_BASE_CLASSES,
        hasError ? FIELD_STATE_CLASSES.error : FIELD_STATE_CLASSES.default,
        "h-12 appearance-none px-4 pr-11 outline-none focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}

      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>

    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-4 size-4.5 text-ink-400"
    />
  </div>
);
