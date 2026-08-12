import type { TSafeActionResult } from "next-safe-form";

/**
 * Signature d'une Server Action produite par `createAction` /
 * `createAuthAction`, compatible avec `useActionState`.
 *
 * `createSafeAction` type sa charge utile de succès en `any` : les fabriques du
 * boilerplate rétablissent `TData` afin que `onSuccess` reste typé de bout en
 * bout, du handler serveur jusqu'au composant.
 *
 * @template TData - Charge utile renvoyée par le handler en cas de succès.
 */
export type TSafeAction<TData> = (
  state: unknown,
  formData: FormData,
) => Promise<TSafeActionResult<TData>>;

export type { TSafeActionResult };
