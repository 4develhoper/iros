import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import { FIELD_BASE_CLASSES, FIELD_STATE_CLASSES } from "./input";

export type TTextAreaProps = ComponentProps<"textarea"> & {
  /** Applique le style d'erreur et marque le champ comme invalide. @default false */
  hasError?: boolean;
};

/**
 * Zone de saisie multiligne.
 *
 * @example
 * ```tsx
 * <TextArea rows={5} placeholder="Description" {...register("description")} />
 * ```
 */
export const TextArea = ({
  hasError = false,
  className,
  rows = 4,
  ...props
}: TTextAreaProps) => (
  <textarea
    rows={rows}
    aria-invalid={hasError || undefined}
    className={cn(
      FIELD_BASE_CLASSES,
      hasError ? FIELD_STATE_CLASSES.error : FIELD_STATE_CLASSES.default,
      "resize-y px-4 py-3 outline-none focus-visible:outline-none",
      className,
    )}
    {...props}
  />
);
