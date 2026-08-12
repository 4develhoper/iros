/**
 * Couche formulaire du boilerplate, bâtie sur `next-safe-form`.
 *
 * - `create-action` : fabriques de Server Actions validées (serveur).
 * - `use-safe-form` : pont React Hook Form ↔ Server Action (client).
 * - `form-schema`   : fabriques Zod compatibles `FormData`.
 *
 * `create-action` n'est pas réexporté ici : il importe `server-only` et ne doit
 * jamais suivre un composant client dans le graphe de dépendances.
 */
export * from "./form-schema";
export * from "./use-safe-form";
