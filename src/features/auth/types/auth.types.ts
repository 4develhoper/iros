import type { TAuthSession, TAuthUser } from "@/lib/better-auth/auth.types";

/** Utilisateur connecté, tel que consommé par les composants de la feature. */
export type TSessionUser = TAuthUser;

/** Session complète (session + utilisateur), ou `null` si visiteur anonyme. */
export type TCurrentSession = TAuthSession | null;

/** Mode d'affichage du formulaire d'authentification. */
export type TAuthMode = "login" | "register";
