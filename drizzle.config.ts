import { defineConfig } from "drizzle-kit";

/**
 * Configuration Drizzle Kit : génération et application des migrations SQLite.
 *
 * Commandes disponibles :
 * - `bun run db:generate` : génère les fichiers SQL depuis les schémas TS.
 * - `bun run db:migrate`  : applique les migrations en attente.
 * - `bun run db:push`     : synchronise le schéma sans fichier de migration.
 * - `bun run db:studio`   : ouvre l'explorateur de base de données.
 */
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/drizzle/schemas/index.ts",
  out: "./src/lib/drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "./data/app.db",
  },
  verbose: true,
  strict: true,
});
