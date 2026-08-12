import type { auth } from "./auth";

/** Session complète renvoyée par Better Auth (session + utilisateur). */
export type TAuthSession = typeof auth.$Infer.Session;

/** Utilisateur authentifié, tel que stocké en base et exposé au client. */
export type TAuthUser = TAuthSession["user"];

/** Identifiants des fournisseurs sociaux supportés par le boilerplate. */
export type TSocialProvider = "google" | "github";
