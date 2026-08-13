import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/table";

export type TDocTableProps = {
  /** Libellés des colonnes. */
  columns: readonly string[];
  /** Lignes du tableau ; chaque ligne compte autant de cellules que `columns`. */
  rows: readonly (readonly ReactNode[])[];
};

/**
 * Tableau de référence de la documentation, construit depuis des données.
 *
 * S'appuie sur les primitives `ui/table` : le conteneur gère déjà le
 * défilement horizontal, la page ne déborde donc jamais sur mobile.
 *
 * @example
 * ```tsx
 * <DocTable
 *   columns={["Commande", "Rôle"]}
 *   rows={[["bun run dev", "Serveur de développement"]]}
 * />
 * ```
 */
export const DocTable = ({ columns, rows }: TDocTableProps) => (
  <TableRoot className="max-w-3xl">
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column}>{column}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row, rowIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: tableau statique, jamais réordonné
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell
                // biome-ignore lint/suspicious/noArrayIndexKey: tableau statique, jamais réordonné
                key={cellIndex}
                className="align-top text-sm leading-relaxed"
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableRoot>
);
