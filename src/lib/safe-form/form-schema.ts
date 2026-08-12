import { z } from "zod";

/**
 * Fabriques de schémas Zod compatibles avec `FormData`.
 *
 * `next-safe-form` transmet au serveur le contenu brut du formulaire : toutes
 * les valeurs y sont des **chaînes de caractères**. Or les mêmes schémas sont
 * réutilisés côté client par React Hook Form, qui manipule de vraies valeurs
 * JavaScript. Ces fabriques acceptent donc les deux représentations et
 * normalisent le résultat.
 */

/**
 * Booléen tolérant aux valeurs issues d'une case à cocher.
 *
 * Accepte `true`/`false` (React Hook Form) ainsi que `"true"`, `"false"` et
 * `"on"` (navigateur). Une case décochée n'étant pas envoyée dans la
 * `FormData`, la valeur par défaut est `false`.
 *
 * @example
 * ```ts
 * const schema = z.object({ rememberMe: formBoolean() });
 * ```
 */
export const formBoolean = () =>
  z
    .union([
      z.boolean(),
      z.literal("true"),
      z.literal("false"),
      z.literal("on"),
    ])
    .default(false)
    .transform((value) => value === true || value === "true" || value === "on");

/**
 * Chaîne optionnelle dont la valeur vide équivaut à une absence de valeur.
 *
 * Un champ texte laissé vide est transmis comme `""` : sans cette
 * normalisation, la base enregistrerait une chaîne vide au lieu de `NULL`.
 *
 * @param maxLength - Longueur maximale autorisée.
 * @param message - Message affiché lorsque la limite est dépassée.
 */
export const formOptionalString = (maxLength: number, message: string) =>
  z
    .string()
    .max(maxLength, message)
    .transform((value) => {
      const trimmed = value.trim();

      return trimmed.length === 0 ? undefined : trimmed;
    })
    .optional();

/**
 * Convertit les valeurs d'un formulaire React Hook Form en `FormData`.
 *
 * Les valeurs absentes sont ignorées, les booléens sérialisés en
 * `"true"`/`"false"` pour rester lisibles par `formBoolean()`.
 *
 * @param values - Valeurs validées côté client.
 */
export const toFormData = (values: Record<string, unknown>): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null) continue;

    // `String(true)` produit `"true"`, valeur reconnue par `formBoolean()`.
    formData.append(key, String(value));
  }

  return formData;
};
