<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Conventions du projet

Architecture par features. Voir `README.md` pour la structure détaillée.

## Règles de codage

- Fonctions fléchées uniquement (composants, pages, utilitaires).
- Fichiers en kebab-case, suffixés par leur rôle : `nom.schema.ts`,
  `nom.action.ts`, `nom.dal.ts`, `nom.store.ts`, `nom.types.ts`.
- Types préfixés `T`, reste en PascalCase : `TButtonProps`.
- JSDoc en français sur chaque export public, avec `@example` quand l'usage
  n'est pas évident.
- Imports absolus via `@/`.
- `page.tsx` et `layout.tsx` en composants serveur ; `"use client"` réservé aux
  îlots réellement interactifs.

## Contraintes techniques

- `cacheComponents` est activé : toute lecture de `cookies()`, `headers()` ou
  de la base de données doit vivre derrière un `<Suspense>` avec `fallback`.
  Ne pas appeler `new Date()` pendant le rendu.
- `typedRoutes` est activé : les routes passent par
  `src/config/routes.config.ts`.
- La garde d'accès est dans `src/proxy.ts` (convention Next 16, remplace
  `middleware.ts`) et reste **optimiste** ; l'autorité est `requireUser()`
  (DAL) et `createAuthAction` (Server Actions).
- Les formulaires passent par `next-safe-form` : action créée avec
  `createAction`/`createAuthAction` (`lib/safe-form/create-action.ts`),
  composant branché avec `useSafeForm` (`lib/safe-form/use-safe-form.ts`).
  Les données transitent en `FormData` : pour tout champ non textuel, utiliser
  `formBoolean()` / `formOptionalString()` de `lib/safe-form/form-schema.ts`.
- Les messages d'erreur destinés à l'utilisateur passent par `ActionError` ;
  les autres exceptions sont masquées.
- Ne jamais rediriger « à la main » vers `/login` depuis un composant serveur :
  appeler `requireUser()`, qui pose le marqueur `session_expired` attendu par le
  proxy. Sans lui, un cookie obsolète provoque une boucle de redirections entre
  `/login` et la route protégée.
- Les requêtes Drizzle filtrent toujours par `userId`.
- Thème sombre : ne jamais écrire de variante `dark:` pour les couleurs de base.
  L'échelle `ink` est inversée dans le bloc `.dark` de `globals.css`, donc
  `text-ink-700` reste correct partout. Pour un état, utiliser les jetons
  sémantiques en transparence (`bg-danger/12 text-danger`) et non la palette
  Tailwind figée ; pour un voile, `bg-black/50`.
- Après modification d'un schéma : `bun run db:generate && bun run db:migrate`.

## Avant de conclure

```bash
bun run lint
bun run typecheck
bun run build
```
