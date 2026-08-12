import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export type TSkeletonProps = ComponentProps<"div">;

/**
 * Bloc gris animé utilisé comme `fallback` de `<Suspense>`.
 *
 * Avec `cacheComponents`, toute portion dynamique d'une page doit fournir un
 * état de repli : ce composant en est le gabarit par défaut.
 *
 * @example
 * ```tsx
 * <Suspense fallback={<Skeleton className="h-11 w-40" />}>
 *   <UserMenu />
 * </Suspense>
 * ```
 */
export const Skeleton = ({ className, ...props }: TSkeletonProps) => (
  <div
    aria-hidden="true"
    className={cn("animate-pulse rounded-md bg-ink-100", className)}
    {...props}
  />
);
