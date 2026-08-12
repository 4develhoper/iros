import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type TSeparatorProps = Omit<ComponentProps<"div">, "children"> & {
  /** Orientation du trait. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Texte centré sur le trait, comme « Ou avec un e-mail ». */
  label?: ReactNode;
};

/**
 * Filet de séparation, avec libellé centré optionnel.
 *
 * Le trait s'appuie sur l'élément natif `<hr>`, qui porte déjà le rôle
 * `separator` : aucun attribut ARIA n'a besoin d'être ajouté.
 *
 * @example
 * ```tsx
 * <Separator label="Ou avec un e-mail" />
 * <Separator orientation="vertical" />
 * ```
 */
export const Separator = ({
  orientation = "horizontal",
  label,
  className,
  ...props
}: TSeparatorProps) => {
  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)} {...props}>
        <hr className="h-px flex-1 border-0 bg-border" />
        <span className="text-sm text-muted">{label}</span>
        <hr className="h-px flex-1 border-0 bg-border" />
      </div>
    );
  }

  return (
    <hr
      aria-orientation={orientation}
      className={cn(
        "border-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
};
