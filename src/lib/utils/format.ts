/**
 * Formate une date en français lisible.
 *
 * @param value - Date ou timestamp à formater.
 * @param options - Surcharge des options `Intl.DateTimeFormat`.
 *
 * @example
 * ```ts
 * formatDate(new Date()); // "12 août 2026"
 * ```
 */
export const formatDate = (
  value: Date | number | string,
  options?: Intl.DateTimeFormatOptions,
): string =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(new Date(value));

/**
 * Construit les initiales d'un nom pour les avatars de repli.
 *
 * @param name - Nom complet de l'utilisateur.
 * @returns Une ou deux lettres majuscules.
 *
 * @example
 * ```ts
 * getInitials("Alesia Karapova"); // "AK"
 * ```
 */
export const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

/**
 * Tronque un texte au-delà d'une longueur donnée.
 *
 * @param value - Texte source.
 * @param maxLength - Longueur maximale avant troncature.
 */
export const truncate = (value: string, maxLength: number): string =>
  value.length <= maxLength ? value : `${value.slice(0, maxLength).trimEnd()}…`;
