/** Entrée du sommaire : elle pointe vers l'ancre d'une section de la page. */
export type TDocsNavItem = {
  /** Identifiant de l'ancre, sans le `#`. Doit exister comme `id` de section. */
  id: string;
  /** Libellé affiché dans le sommaire. */
  label: string;
};

/** Groupe d'entrées du sommaire, affiché sous un intertitre. */
export type TDocsNavGroup = {
  /** Intertitre du groupe. */
  title: string;
  /** Sections du groupe, dans l'ordre de lecture. */
  items: readonly TDocsNavItem[];
};
