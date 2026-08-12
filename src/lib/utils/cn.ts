import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind en résolvant les conflits.
 *
 * `clsx` gère les valeurs conditionnelles, `tailwind-merge` supprime les
 * classes redondantes pour que la dernière l'emporte réellement.
 *
 * @param inputs - Classes, tableaux ou objets conditionnels.
 * @returns La chaîne de classes finale.
 *
 * @example
 * ```ts
 * cn("px-2 py-1", isLarge && "px-4"); // -> "py-1 px-4"
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
