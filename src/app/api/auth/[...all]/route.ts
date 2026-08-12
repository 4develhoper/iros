import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/better-auth/auth";

/**
 * Point d'entrée HTTP de Better Auth.
 *
 * Toutes les routes `/api/auth/*` (connexion, inscription, rappels OAuth,
 * déconnexion) sont traitées par ce handler unique.
 */
export const { GET, POST } = toNextJsHandler(auth);
