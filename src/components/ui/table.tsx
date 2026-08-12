import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Ensemble de primitives de tableau.
 *
 * Elles restent volontairement proches des balises HTML natives : la structure
 * `<table>/<thead>/<tbody>` est conservée, seul le style est appliqué. Pour un
 * rendu piloté par les données, voir `components/shared/data-table.tsx`.
 *
 * @example
 * ```tsx
 * <TableRoot>
 *   <Table>
 *     <TableHead>
 *       <TableRow><TableHeaderCell>Titre</TableHeaderCell></TableRow>
 *     </TableHead>
 *     <TableBody>
 *       <TableRow><TableCell>Ma tâche</TableCell></TableRow>
 *     </TableBody>
 *   </Table>
 * </TableRoot>
 * ```
 */

/** Conteneur défilant : évite tout débordement horizontal de la page. */
export const TableRoot = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "scrollbar-thin w-full overflow-x-auto rounded-card border border-border",
      className,
    )}
    {...props}
  />
);

export const Table = ({ className, ...props }: ComponentProps<"table">) => (
  <table
    className={cn("w-full border-collapse text-left text-sm", className)}
    {...props}
  />
);

export const TableHead = ({ className, ...props }: ComponentProps<"thead">) => (
  <thead className={cn("bg-vanilla", className)} {...props} />
);

export const TableBody = ({ className, ...props }: ComponentProps<"tbody">) => (
  <tbody className={cn("divide-y divide-border", className)} {...props} />
);

export type TTableRowProps = ComponentProps<"tr"> & {
  /** Applique un survol marqué pour les lignes cliquables. @default false */
  isInteractive?: boolean;
};

export const TableRow = ({
  isInteractive = false,
  className,
  ...props
}: TTableRowProps) => (
  <tr
    className={cn(
      isInteractive && "cursor-pointer transition-colors hover:bg-ink-50",
      className,
    )}
    {...props}
  />
);

export const TableHeaderCell = ({
  className,
  ...props
}: ComponentProps<"th">) => (
  <th
    scope="col"
    className={cn(
      "px-5 py-3.5 text-xs font-medium tracking-wide text-ink-500 uppercase",
      className,
    )}
    {...props}
  />
);

export const TableCell = ({ className, ...props }: ComponentProps<"td">) => (
  <td className={cn("px-5 py-4 text-ink-700", className)} {...props} />
);

export type TTableEmptyProps = {
  /** Nombre de colonnes à fusionner pour centrer le message. */
  colSpan: number;
  /** Message affiché lorsqu'aucune ligne n'est disponible. */
  message?: string;
};

/** Ligne de repli affichée quand le tableau ne contient aucune donnée. */
export const TableEmpty = ({
  colSpan,
  message = "Aucune donnée à afficher.",
}: TTableEmptyProps) => (
  <tr>
    <td colSpan={colSpan} className="px-5 py-12 text-center text-sm text-muted">
      {message}
    </td>
  </tr>
);
