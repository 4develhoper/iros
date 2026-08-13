# Installation & prise en main

Guide complet pour installer le boilerplate **Iros** et démarrer un nouveau
projet. Pour la structure du code et les conventions, voir le [README](../README.md).

---

## 1. Prérequis

| Outil    | Version    | Vérification      | Note                                                     |
| -------- | ---------- | ----------------- | -------------------------------------------------------- |
| Bun      | ≥ 1.3.14   | `bun --version`   | Gestionnaire de paquets et runtime des scripts            |
| Node.js  | ≥ 20       | `node --version`  | Requis par Next.js 16 et par la compilation de `better-sqlite3` |
| Git      | quelconque | `git --version`   | Récupération du dépôt                                     |

`package.json` épingle `packageManager: "bun@1.3.14"` : utiliser `bun`, pas
`npm` ni `pnpm`, sous peine d'un arbre de dépendances différent.

### Windows

`better-sqlite3` est un module natif. Bun télécharge un binaire précompilé pour
la plupart des combinaisons Node/OS ; si la compilation se déclenche malgré
tout, installer les **Visual Studio Build Tools** avec la charge de travail
« Développement Desktop en C++ ». Sur macOS, `xcode-select --install` suffit.

---

## 2. Installation

```bash
git clone <url-du-depot> mon-projet
cd mon-projet
bun install
```

`better-sqlite3` figure dans `trustedDependencies` : son script
d'installation est autorisé à s'exécuter, contrairement à `sharp` et
`unrs-resolver` qui sont ignorés volontairement (`ignoreScripts`).

---

## 3. Variables d'environnement

```bash
cp .env.example .env
```

Puis générer un secret et le coller dans `BETTER_AUTH_SECRET` :

```bash
openssl rand -base64 32
# sans openssl (Windows / PowerShell) :
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

| Variable                | Obligatoire | Rôle                                                        |
| ----------------------- | ----------- | ----------------------------------------------------------- |
| `DATABASE_URL`          | oui         | Chemin du fichier SQLite, relatif à la racine du projet      |
| `BETTER_AUTH_SECRET`    | oui         | Signature des sessions. **Le changer invalide les sessions existantes** |
| `BETTER_AUTH_URL`       | oui         | URL d'origine du serveur d'authentification                  |
| `NEXT_PUBLIC_APP_URL`   | oui         | URL publique, exposée au navigateur — n'y mettre aucun secret |
| `GOOGLE_CLIENT_ID` / `_SECRET` | non  | Active le bouton « Continuer avec Google » si renseignés     |
| `GITHUB_CLIENT_ID` / `_SECRET` | non  | Idem pour GitHub                                             |

Les fournisseurs OAuth sont facultatifs : laissés vides, leurs boutons
affichent une erreur explicite et l'authentification par e-mail continue de
fonctionner normalement.

> `.gitignore` exclut `.env*` : le fichier `.env.example` est le seul contrat
> versionné. Toute nouvelle variable doit y être ajoutée.

---

## 4. Base de données

Le dossier `data/` est ignoré par Git et **n'existe pas après un clone**.
`better-sqlite3` ne crée pas les dossiers manquants : le créer avant la première
migration.

```bash
mkdir -p data          # PowerShell : New-Item -ItemType Directory -Force data
bun run db:migrate     # applique src/lib/drizzle/migrations/ -> ./data/app.db
```

Les tables d'authentification (`user`, `session`, `account`, `verification`) et
la table de la feature `starter` sont créées par la migration initiale.

### Repartir de zéro

```bash
rm -rf data && mkdir -p data && bun run db:migrate
```

Les cookies de session du navigateur survivent à cette remise à zéro. Ce cas est
prévu : `requireUser()` redirige vers `/login?session_expired=1`, et `proxy.ts`
purge le cookie fantôme — aucune boucle de redirection.

---

## 5. Démarrage

```bash
bun run dev
```

Application sur **http://localhost:3017** (port défini dans les scripts `dev` et
`start`). Pour en changer, modifier `package.json` **et** les URL de `.env`,
qui doivent rester cohérentes avec le port réel — Better Auth rejette les
requêtes dont l'origine ne correspond pas à `BETTER_AUTH_URL`.

Parcours de vérification :

1. `/` — landing publique.
2. `/register` — créer un compte.
3. Redirection automatique vers `/starter`, l'espace protégé de démonstration.
4. Créer une tâche : le trajet formulaire → Server Action → DAL → SQLite est
   validé de bout en bout.

---

## 6. Scripts

| Commande              | Rôle                                            |
| --------------------- | ----------------------------------------------- |
| `bun run dev`         | Serveur de développement (Turbopack, port 3017) |
| `bun run build`       | Build de production                             |
| `bun run start`       | Sert le build de production                     |
| `bun run typecheck`   | `tsc --noEmit`                                  |
| `bun run lint`        | Biome (lint + format, lecture seule)            |
| `bun run format`      | Biome, écriture des corrections                 |
| `bun run db:generate` | Génère les migrations SQL depuis les schémas TS |
| `bun run db:migrate`  | Applique les migrations en attente              |
| `bun run db:push`     | Synchronise le schéma sans fichier de migration |
| `bun run db:studio`   | Explorateur de base de données                  |

`db:push` écrase le schéma sans trace : réservé au prototypage local, jamais sur
une base contenant des données à conserver.

---

## 7. Personnaliser le projet

Dans l'ordre, après le clone :

1. **`package.json`** — `name`, `version`, et le port dans `dev` / `start`.
2. **`src/config/site.config.ts`** — `name`, `shortName`, `description`,
   `author`, `copyrightYear`. Ces valeurs alimentent le logo, les métadonnées
   SEO et le pied de page.
3. **`src/app/globals.css`**, bloc `@theme` — couleurs (steam blue `#1E56CD`,
   vanilla `#FDF8F2`) et police (Poppins).
4. **`src/config/routes.config.ts`** — routes de l'application ; `typedRoutes`
   vérifie chaque `href` à la compilation.
5. **`src/components/layouts/app-sidebar.tsx`** — navigation de l'espace
   applicatif.
6. **`src/features/starter/`** — feature de démonstration : la supprimer une
   fois le modèle compris, en retirant sa table de
   `src/lib/drizzle/schemas/index.ts`, sa route de `routes.config.ts` et son
   dossier de `src/app/(app)/`.

---

## 8. Ajouter une feature

```
src/features/<nom>/
├── components/      # composants de la feature
├── schemas/         # schémas Zod partagés client/serveur
├── server/
│   ├── actions/     # Server Actions (createAction / createAuthAction)
│   └── dal/         # accès Drizzle, toujours filtré par userId
└── types/
```

1. Créer l'arborescence ci-dessus.
2. Déclarer la table dans `src/lib/drizzle/schemas/<nom>.schema.ts` et
   l'exporter depuis `schemas/index.ts`.
3. `bun run db:generate && bun run db:migrate`.
4. Ajouter la route dans `src/config/routes.config.ts`, puis la page dans
   `src/app/`.

La feature `starter` est le modèle complet de référence.

---

## 9. Déploiement

Le boilerplate utilise SQLite via `better-sqlite3`, un **fichier local** : il
suppose un système de fichiers persistant. Les plateformes à conteneurs
éphémères (Vercel, Netlify) perdent la base à chaque déploiement.

| Cible                                 | Verdict                                       |
| ------------------------------------- | --------------------------------------------- |
| VPS, Docker avec volume, Fly.io       | Fonctionne tel quel                            |
| Vercel / Netlify                      | Remplacer la couche base par Turso, Neon ou Postgres |

### VPS / Docker

```bash
bun install --production=false
bun run db:migrate
bun run build
bun run start
```

`serverExternalPackages: ["better-sqlite3"]` (dans `next.config.ts`) empêche le
bundler d'embarquer le binaire natif : il doit rester dans `node_modules` du
serveur. Monter `data/` sur un volume persistant et le sauvegarder — c'est
l'intégralité de la base.

### Migrer vers Postgres

1. `drizzle.config.ts` : `dialect: "postgresql"`.
2. `src/lib/drizzle/index.ts` : remplacer `better-sqlite3` par `postgres-js`.
3. `src/lib/drizzle/schemas/*` : `sqliteTable` → `pgTable`, ajuster les types.
4. `src/lib/better-auth/` : adapter le `drizzleAdapter` au provider `pg`.
5. Regénérer les migrations depuis zéro.

---

## 10. Avant de livrer

```bash
bun run lint
bun run typecheck
bun run build
```

Ces trois commandes doivent passer avant tout commit.

---

## 11. Dépannage

| Symptôme                                             | Cause & correctif                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| `SQLITE_CANTOPEN: unable to open database file`       | Le dossier `data/` n'existe pas → `mkdir -p data`                                  |
| `no such table: user`                                 | Migrations non appliquées → `bun run db:migrate`                                   |
| `SqliteError: database is locked` pendant `build`     | Un autre processus tient la base — arrêter `db:studio` ou un `dev` resté ouvert. Le `busy_timeout` de `lib/drizzle/index.ts` absorbe déjà la concurrence des workers de build |
| `Cannot find name 'LayoutProps'` au typecheck         | Types de routes non générés. `bun run typecheck` appelle `next typegen` avant `tsc` ; l'erreur signale un script `typecheck` modifié |
| Déconnexion à chaque redémarrage                      | `BETTER_AUTH_SECRET` absent ou modifié entre deux lancements                        |
| Boucle entre `/login` et une page protégée            | Une redirection manuelle vers `/login` a court-circuité `requireUser()` — toujours appeler `requireUser()` |
| `Route "/x" used cookies inside a component…`         | `cacheComponents` : isoler la lecture dynamique derrière un `<Suspense fallback>`   |
| `Type '"/x"' is not assignable to type 'Route'`       | `typedRoutes` : la route n'existe pas, ou elle manque dans `routes.config.ts`       |
| Erreur de compilation `better-sqlite3` à l'install    | Build Tools C++ manquants (voir § Prérequis)                                        |
| Bouton OAuth en erreur                                | Identifiants du fournisseur absents de `.env` (comportement attendu)                |
