/**
 * Point d'entrée unique des schémas Drizzle.
 *
 * Drizzle Kit lit ce fichier (cf. `drizzle.config.ts`) : toute nouvelle table
 * doit être réexportée ici pour être prise en compte par les migrations.
 */
export * from "./auth.schema";
export * from "./starter.schema";
