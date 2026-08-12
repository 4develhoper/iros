import { z } from "zod";
import { formBoolean } from "@/lib/safe-form/form-schema";

/**
 * Schémas de validation du tunnel d'authentification.
 *
 * Ils sont partagés entre le client (React Hook Form) et le serveur
 * (`createSafeAction`) : une seule source de vérité pour les règles métier.
 * Les valeurs arrivant du serveur provenant d'une `FormData`, les champs non
 * textuels utilisent les fabriques de `lib/safe-form/form-schema`.
 */

/** Contraintes appliquées au mot de passe, réutilisées par login et register. */
const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
  .max(128, "Le mot de passe ne peut pas dépasser 128 caractères.");

/** Adresse e-mail non vide et syntaxiquement valide. */
const emailSchema = z
  .string()
  .min(1, "L'adresse e-mail est requise.")
  .pipe(z.email("Adresse e-mail invalide."));

/** Payload du formulaire de connexion. */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Le mot de passe est requis."),
  /** Prolonge la session au-delà de la fermeture du navigateur. */
  rememberMe: formBoolean(),
});

/** Payload du formulaire d'inscription. */
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "Le prénom est requis.")
    .max(60, "Le prénom ne peut pas dépasser 60 caractères."),
  lastName: z
    .string()
    .min(1, "Le nom est requis.")
    .max(60, "Le nom ne peut pas dépasser 60 caractères."),
  email: emailSchema,
  password: passwordSchema,
});

/** Schéma vide de la déconnexion : aucune donnée à valider. */
export const logoutSchema = z.object({});

/** Valeurs attendues à la saisie (React Hook Form). */
export type TLoginInput = z.input<typeof loginSchema>;
export type TRegisterInput = z.input<typeof registerSchema>;

/** Valeurs normalisées après validation (handlers serveur). */
export type TLoginData = z.output<typeof loginSchema>;
export type TRegisterData = z.output<typeof registerSchema>;
