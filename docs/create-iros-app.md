# Publier `create-iros-app`

Comment transformer ce boilerplate en starter distribuable, utilisable comme
`create-next-app` :

```bash
bun create iros-app mon-projet
npm  create iros-app@latest mon-projet
pnpm create iros-app mon-projet
```

---

## 1. Comprendre le mécanisme

Il n'y a aucune magie ni aucun enregistrement à faire auprès de npm. Tous les
gestionnaires appliquent la même convention :

| Commande tapée              | Paquet réellement exécuté |
| --------------------------- | ------------------------- |
| `npm create iros-app`       | `create-iros-app`         |
| `bun create iros-app`       | `create-iros-app`         |
| `pnpm create iros-app`      | `create-iros-app`         |
| `npm create @iros/app`      | `@iros/create-app`        |

Le gestionnaire préfixe le nom par `create-`, télécharge le paquet depuis le
registre npm, puis exécute son `bin`. **Publier un paquet nommé
`create-iros-app` suffit donc à rendre `bun create iros-app` fonctionnel.**

Il y a donc deux artefacts distincts :

1. **Le template** — ce dépôt, le code copié dans le projet de l'utilisateur.
2. **La CLI** — un petit paquet npm qui récupère le template, le personnalise et
   installe les dépendances.

---

## 2. Choisir où vit le template

| Stratégie                                       | Avantages                                                         | Inconvénients                                              |
| ----------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| **A. Téléchargé depuis GitHub** (recommandé)    | Une seule source de vérité ; mettre à jour le boilerplate suffit ; versionnable par tag | Nécessite le réseau et un dépôt accessible                  |
| **B. Embarqué dans le paquet npm**              | Hors-ligne, atomique, dépôt privé possible — c'est le choix de `create-next-app` | Il faut republier la CLI à chaque évolution du template     |

La suite décrit la **stratégie A**. Le § 8 donne le delta pour la stratégie B.

### Préparer ce dépôt comme template

1. Pousser le boilerplate sur GitHub — ici `4develhoper/iros`.
2. Marquer une version : `git tag v1.0.2 && git push --follow-tags`. La CLI
   cible `#v1.0.2` plutôt que `#main`, et les utilisateurs cessent ainsi de
   subir les commits en cours.
3. Vérifier `.gitignore` : `/data`, `/node_modules`, `/.next` et les `.env` en
   sont exclus, donc absents de l'archive téléchargée. C'est exactement ce
   qu'on veut — la CLI reconstruit ces éléments.

   **Sauf `.env.example`**, qui doit rester versionné : la CLI en dérive le
   `.env` du projet généré. Le motif `.env*` de `create-next-app` l'emporte
   avec lui, d'où la ré-inclusion explicite :

   ```gitignore
   .env*
   !.env.example
   ```

   Contrôle : `git ls-tree -r --name-only HEAD | grep env` doit retourner
   `.env.example`. Sinon, `create-iros-app` échoue sur
   `ENOENT: .env.example`.
4. Optionnel : cocher « Template repository » dans les réglages GitHub, pour
   permettre aussi le clonage manuel.

---

## 3. Créer le paquet CLI

Dans un dépôt séparé (ou un dossier `packages/create-iros-app/` si vous passez
en monorepo) :

```
create-iros-app/
├── package.json
├── index.mjs
└── README.md
```

### `package.json`

```json
{
  "name": "create-iros-app",
  "version": "1.0.0",
  "description": "Crée un projet Next.js à partir du boilerplate Iros.",
  "type": "module",
  "license": "MIT",
  "bin": { "create-iros-app": "./index.mjs" },
  "files": ["index.mjs", "README.md"],
  "engines": { "node": ">=20" },
  "keywords": ["iros", "nextjs", "boilerplate", "starter"],
  "repository": { "type": "git", "url": "git+https://github.com/4develhoper/create-iros-app.git" },
  "dependencies": {
    "giget": "^2.0.0",
    "picocolors": "^1.1.1",
    "prompts": "^2.4.2"
  }
}
```

Laisser l'installateur fixer les versions plutôt que de recopier celles
ci-dessus : `npm install giget picocolors prompts`.

`bin` est le seul champ indispensable au fonctionnement de `bun create`.
`files` évite de publier des fichiers inutiles. `type: "module"` autorise la
syntaxe ESM sans étape de build : le fichier est exécuté tel quel par Node.

### `index.mjs`

```js
#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { downloadTemplate } from "giget";
import pc from "picocolors";
import prompts from "prompts";

/** Source du template. Épingler un tag évite de livrer un `main` instable. */
const TEMPLATE = process.env.IROS_TEMPLATE ?? "github:4develhoper/iros#v1.0.2";

/** Port de développement par défaut du boilerplate. */
const PORT = 3017;

/**
 * Analyse minimale de la ligne de commande.
 *
 * @example
 * ```bash
 * create-iros-app mon-app --pm bun --no-git
 * ```
 */
const parseArgv = (argv) => {
  const options = { dir: undefined, install: true, git: true, pm: undefined };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--no-install") options.install = false;
    else if (argument === "--no-git") options.git = false;
    else if (argument === "--pm") options.pm = argv[++index];
    else if (!argument.startsWith("-")) options.dir ??= argument;
  }

  return options;
};

/** Devine le gestionnaire de paquets depuis `npm_config_user_agent`. */
const detectPackageManager = () => {
  const agent = process.env.npm_config_user_agent ?? "";
  if (agent.startsWith("bun")) return "bun";
  if (agent.startsWith("pnpm")) return "pnpm";
  if (agent.startsWith("yarn")) return "yarn";
  return "npm";
};

/** Exécute une commande dans le projet et interrompt le script en cas d'échec. */
const run = (command, args, cwd) => {
  const result = spawnSync(command, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} a échoué.`);
};

/** Remplace une valeur de chaîne dans un fichier source, à clé constante. */
const replaceInFile = (path, replacements) => {
  let content = readFileSync(path, "utf8");
  for (const [pattern, value] of replacements) content = content.replace(pattern, value);
  writeFileSync(path, content);
};

const main = async () => {
  const options = parseArgv(process.argv.slice(2));

  const answers = await prompts(
    [
      {
        type: options.dir ? null : "text",
        name: "dir",
        message: "Nom du projet",
        initial: "mon-app",
      },
      {
        type: "text",
        name: "displayName",
        message: "Nom affiché dans l'application",
        initial: (_, values) => {
          const raw = options.dir ?? values.dir ?? "mon-app";
          return basename(raw).replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        },
      },
      { type: "text", name: "description", message: "Description", initial: "" },
    ],
    { onCancel: () => process.exit(1) },
  );

  const directory = options.dir ?? answers.dir;
  const target = resolve(process.cwd(), directory);
  const packageName = basename(target).toLowerCase().replace(/[^a-z0-9-~][^a-z0-9-._~]*/g, "-");

  if (existsSync(target) && readdirSync(target).length > 0) {
    console.error(pc.red(`Le dossier ${directory} existe déjà et n'est pas vide.`));
    process.exit(1);
  }

  console.log(pc.dim(`\nTéléchargement du template depuis ${TEMPLATE}…`));
  await downloadTemplate(TEMPLATE, { dir: target, force: true });

  // 1. package.json : nom du projet, version remise à zéro.
  const packageJsonPath = join(target, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  packageJson.name = packageName;
  packageJson.version = "0.1.0";
  packageJson.private = true;
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

  // 2. site.config.ts : identité de la marque.
  replaceInFile(join(target, "src/config/site.config.ts"), [
    [/name: "Boilerplate"/, `name: ${JSON.stringify(answers.displayName)}`],
    [/shortName: "Boilerplate\."/, `shortName: ${JSON.stringify(`${answers.displayName}.`)}`],
    [
      /description:\s*\n?\s*"[^"]*"/,
      `description: ${JSON.stringify(answers.description || `${answers.displayName}, propulsé par Iros.`)}`,
    ],
  ]);

  // 3. .env : secret d'authentification généré, URL alignées sur le port réel.
  const secret = randomBytes(32).toString("base64");
  const environment = readFileSync(join(target, ".env.example"), "utf8")
    .replace(/BETTER_AUTH_SECRET=".*"/, `BETTER_AUTH_SECRET="${secret}"`)
    .replace(/BETTER_AUTH_URL=".*"/, `BETTER_AUTH_URL="http://localhost:${PORT}"`)
    .replace(/NEXT_PUBLIC_APP_URL=".*"/, `NEXT_PUBLIC_APP_URL="http://localhost:${PORT}"`);
  writeFileSync(join(target, ".env"), environment);

  // 4. `better-sqlite3` n'ouvre pas un fichier dans un dossier absent.
  mkdirSync(join(target, "data"), { recursive: true });

  const packageManager = options.pm ?? detectPackageManager();

  if (options.install) {
    console.log(pc.dim("\nInstallation des dépendances…"));
    run(packageManager, ["install"], target);

    console.log(pc.dim("\nApplication des migrations…"));
    run(packageManager, ["run", "db:migrate"], target);
  }

  if (options.git && !existsSync(join(target, ".git"))) {
    run("git", ["init"], target);
    run("git", ["add", "-A"], target);
    run("git", ["commit", "-m", "chore: initialisation depuis create-iros-app"], target);
  }

  const runner = packageManager === "npm" ? "npm run" : packageManager === "yarn" ? "yarn" : `${packageManager} run`;

  console.log(`
${pc.green("✔")} Projet ${pc.bold(packageName)} créé.

  cd ${directory}${options.install ? "" : `\n  ${packageManager} install\n  ${runner} db:migrate`}
  ${runner} dev

  ${pc.dim(`http://localhost:${PORT}`)}
`);
};

main().catch((error) => {
  console.error(pc.red(error instanceof Error ? error.message : String(error)));
  process.exit(1);
});
```

Rendre le fichier exécutable sur les systèmes POSIX — le shebang ne suffit pas
sans le bit d'exécution, et Git doit le mémoriser :

```bash
chmod +x index.mjs
git update-index --chmod=+x index.mjs
```

---

## 4. Tester avant de publier

Trois niveaux, du plus rapide au plus fidèle :

```bash
# 1. Exécution directe
node index.mjs /tmp/essai-iros

# 2. Simuler l'installation globale du paquet
npm link
create-iros-app /tmp/essai-iros

# 3. Vérifier l'archive réellement publiée
npm pack                                 # produit create-iros-app-1.0.0.tgz
npm install -g ./create-iros-app-1.0.0.tgz
```

`npm pack --dry-run` liste le contenu de l'archive : y vérifier l'absence de
`node_modules` et la présence de `index.mjs`.

La variable `IROS_TEMPLATE` permet d'essayer une autre source sans toucher au
code — une branche de travail, un autre dépôt, ou une archive :

```bash
IROS_TEMPLATE=github:4develhoper/iros#ma-branche node index.mjs /tmp/essai-iros
IROS_TEMPLATE=https://exemple.com/iros.tar.gz  node index.mjs /tmp/essai-iros
```

`giget` accepte les fournisseurs Git (`github:`, `gitlab:`, `bitbucket:`,
`sourcehut:`) et les URL de tarball, **mais pas un chemin local**. Pour valider
un boilerplate non encore poussé, pousser une branche jetable, ou basculer
temporairement sur la copie locale de la stratégie B (§ 8).

---

## 5. Publier sur le registre npm public

```bash
npm adduser                 # ou npm login
npm whoami                  # confirme la session
npm publish --access public
```

`create-iros-app` est un nom non scopé : il doit être **libre**. Vérifier avec
`npm view create-iros-app` — une erreur 404 signifie qu'il est disponible. S'il
est pris, deux issues :

- **Nom scopé** : `@4develhoper/create-iros-app`, invoqué par
  `npm create @4develhoper/iros-app`. Un scope exige `--access public` à la
  première publication, sinon npm le suppose privé (payant).
- **Autre nom** : `create-iros`, `create-iros-next`…

### Publications suivantes

```bash
npm version patch     # ou minor / major — crée le commit et le tag
npm publish
git push --follow-tags
```

Chaque version de la CLI doit épingler un tag de template compatible : faire
évoluer `TEMPLATE` vers `#v1.1.0` **dans le même commit** que le `npm version`.

---

## 6. Publier sur un registre privé

Si le boilerplate est propriétaire, l'exposer sur un registre restreint.

### GitHub Packages

Le nom doit être scopé sur l'organisation propriétaire du dépôt :

```json
{
  "name": "@4develhoper/create-iros-app",
  "publishConfig": { "registry": "https://npm.pkg.github.com" }
}
```

```bash
npm login --registry=https://npm.pkg.github.com   # mot de passe = PAT `write:packages`
npm publish
```

Côté consommateur, un `~/.npmrc` est obligatoire — GitHub Packages n'autorise
aucune lecture anonyme :

```ini
@4develhoper:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Le template GitHub doit alors être privé lui aussi, et `giget` recevoir un
jeton : `GIGET_AUTH=<PAT read:packages/repo>`.

### Verdaccio (auto-hébergé)

```bash
npx verdaccio                                  # démarre sur http://localhost:4873
npm adduser --registry http://localhost:4873
npm publish --registry http://localhost:4873
npm create iros-app@latest mon-app --registry http://localhost:4873
```

Utile aussi comme bac à sable : on y publie et republie sans polluer npm.

---

## 7. Distribuer sans registre du tout

Si vous êtes le seul utilisateur, la CLI n'est pas indispensable :

```bash
# Copie du template, sans historique Git
bunx giget@latest github:4develhoper/iros mon-app
npx tiged 4develhoper/iros mon-app

# Exécution de la CLI directement depuis son dépôt
npx github:4develhoper/create-iros-app mon-app
```

Mais `bun create iros-app`, lui, exige bien une publication sur un registre.

---

## 8. Variante : template embarqué dans le paquet

Pour un fonctionnement hors-ligne, ou un boilerplate qui ne peut pas être
téléchargé publiquement.

1. Copier le boilerplate dans `create-iros-app/template/`.
2. Renommer les fichiers que npm traite spécialement à l'empaquetage :
   `.gitignore` → `gitignore`, `.env.example` → `env.example`. **npm exclut
   systématiquement un `.gitignore` d'une archive publiée** et le projet
   généré arriverait sans lui.
3. `package.json` : `"files": ["index.mjs", "template"]`.
4. Remplacer l'appel à `downloadTemplate` par une copie locale, puis restaurer
   les noms de fichiers :

```js
import { cp, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const templateDir = fileURLToPath(new URL("./template", import.meta.url));
await cp(templateDir, target, { recursive: true });
await rename(join(target, "gitignore"), join(target, ".gitignore"));
await rename(join(target, "env.example"), join(target, ".env.example"));
```

Cette variante impose de republier la CLI à chaque évolution du boilerplate. Un
script `sync` (`cp -r ../next-boilerplate/{src,public,...} template/`) ou un
workflow GitHub Actions déclenché sur les tags du template automatise la
synchronisation.

---

## 9. Aller plus loin

- **Plusieurs templates** — `--template minimal|full` mappé sur des branches
  (`github:4develhoper/iros#minimal`) ou des sous-dossiers
  (`github:4develhoper/iros/templates/minimal`), tous deux gérés par `giget`.
- **Options interactives** — proposer d'inclure ou non la feature `starter`,
  les fournisseurs OAuth, le thème sombre ; supprimer les dossiers
  correspondants après la copie.
- **Contrôle de version** — refuser les Node < 20 dès le démarrage :
  `engines` n'est qu'un avertissement chez npm, et est ignoré par Bun.
- **Publication automatisée** — un workflow GitHub Actions sur `push` de tag,
  avec `npm publish --provenance --access public` (nécessite
  `permissions: id-token: write`), qui attache l'attestation d'origine visible
  sur la page npm.

---

## 10. Récapitulatif

| Étape                                                | Commande                                     |
| ---------------------------------------------------- | -------------------------------------------- |
| 1. Pousser le boilerplate et le taguer                | `git tag v1.0.2 && git push --follow-tags`   |
| 2. Créer le dépôt de la CLI                           | `package.json` + `index.mjs` du § 3          |
| 3. Tester en local                                    | `node index.mjs /tmp/essai`                  |
| 4. Vérifier la disponibilité du nom                   | `npm view create-iros-app`                   |
| 5. Publier                                            | `npm publish --access public`                |
| 6. Utiliser                                           | `bun create iros-app mon-projet`             |
