import { Avatar } from "@/components/ui/avatar";
import { LinkButton } from "@/components/ui/link-button";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/config/routes.config";
import { getCurrentUser } from "@/features/auth/server/dal/session.dal";
import { SignOutButton } from "./sign-out-button";

/**
 * Bloc d'identité affiché dans les en-têtes.
 *
 * Composant serveur asynchrone : il lit la session, donc la requête, et doit
 * impérativement être rendu dans une frontière `<Suspense>` sous
 * `cacheComponents`, avec `<UserMenuSkeleton />` comme repli.
 *
 * @example
 * ```tsx
 * <Suspense fallback={<UserMenuSkeleton />}>
 *   <UserMenu />
 * </Suspense>
 * ```
 */
export const UserMenu = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <LinkButton href={routes.auth.login} variant="ghost" size="sm">
          Connexion
        </LinkButton>
        <LinkButton href={routes.auth.register} size="sm">
          Créer un compte
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar name={user.name} src={user.image} size="sm" />
      <div className="hidden leading-tight sm:block">
        <p className="text-sm font-medium text-ink-900">{user.name}</p>
        <p className="text-xs text-muted">{user.email}</p>
      </div>
      <SignOutButton />
    </div>
  );
};

/** Repli de `UserMenu` pendant la résolution de la session. */
export const UserMenuSkeleton = () => (
  <div className="flex items-center gap-3">
    <Skeleton className="size-9 rounded-full" />
    <Skeleton className="hidden h-8 w-32 sm:block" />
  </div>
);
