import type { NextConfig } from "next";

/**
 * Configuration Next.js du boilerplate.
 *
 * - `typedRoutes` : génère les types des routes pour que `<Link href="...">`
 *   et `redirect()` soient vérifiés à la compilation.
 * - `cacheComponents` : active le modèle de cache explicite (PPR + `use cache`).
 *   Toute lecture d'API dynamique (cookies, headers, searchParams) doit être
 *   isolée dans une frontière `<Suspense>`.
 * - `reactCompiler` : mémoïsation automatique des composants React.
 */
const nextConfig: NextConfig = {
  typedRoutes: true,
  cacheComponents: true,
  reactCompiler: true,
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
