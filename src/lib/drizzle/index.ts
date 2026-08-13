import "server-only";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schemas from "./schemas";

/**
 * Cache global de la connexion SQLite.
 *
 * Next.js recharge les modules serveur à chaque changement en développement :
 * sans ce cache, chaque rechargement ouvrirait un nouveau handle de fichier.
 */
const globalForDatabase = globalThis as unknown as {
  sqlite: Database.Database | undefined;
};

const createConnection = (): Database.Database => {
  const connection = new Database(process.env.DATABASE_URL ?? "./data/app.db");

  // Attendre le verrou plutôt qu'échouer aussitôt. `next build` collecte les
  // pages dans plusieurs workers : sur une base fraîchement migrée, encore en
  // mode `delete`, ils demandent tous le verrou exclusif que réclame le
  // passage en WAL, et tous sauf un partiraient en `SQLITE_BUSY`.
  connection.pragma("busy_timeout = 5000");
  // WAL : lectures concurrentes pendant les écritures.
  connection.pragma("journal_mode = WAL");
  // Indispensable en SQLite : les clés étrangères sont désactivées par défaut.
  connection.pragma("foreign_keys = ON");

  return connection;
};

const sqlite = globalForDatabase.sqlite ?? createConnection();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.sqlite = sqlite;
}

/**
 * Client Drizzle typé avec l'ensemble des schémas de l'application.
 *
 * Réservé au serveur : ne jamais l'importer depuis un composant client.
 *
 * @example
 * ```ts
 * const tasks = await database.select().from(schemas.task);
 * ```
 */
export const database = drizzle(sqlite, { schema: schemas });

export { schemas };
