/**
 * Types utilitaires transverses.
 *
 * Réservés à ce qui ne se rattache à aucune feature : tout type métier doit
 * vivre dans `src/features/<feature>/types`.
 */

/** Rend optionnelles les clés `K` d'un type `T`. */
export type TPartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Rend obligatoires les clés `K` d'un type `T`. */
export type TRequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/** Valeur pouvant être nulle ou absente. */
export type TNullable<T> = T | null | undefined;

/** Union des valeurs d'un objet constant. */
export type TValueOf<T> = T[keyof T];

/** Résultat normalisé d'une opération pouvant échouer. */
export type TResult<TData, TError = string> =
  | { success: true; data: TData }
  | { success: false; error: TError };
