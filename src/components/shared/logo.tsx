import Link from "next/link";
import { routes } from "@/config/routes.config";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils/cn";

export type TLogoProps = {
  /** Adapte les couleurs à un fond sombre. @default false */
  isInverted?: boolean;
  /** Rend le logo cliquable vers la page d'accueil. @default true */
  isLinked?: boolean;
  className?: string;
};

/**
 * Marque de l'application : pastille + nom.
 *
 * Le nom provient de `siteConfig`, il n'y a donc qu'un seul endroit à modifier
 * lors du démarrage d'un nouveau projet.
 *
 * @example
 * ```tsx
 * <Logo isInverted />
 * ```
 */
export const Logo = ({
  isInverted = false,
  isLinked = true,
  className,
}: TLogoProps) => {
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xl font-medium tracking-tight",
        isInverted ? "text-white" : "text-ink-900",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-8 items-center justify-center rounded-full",
          isInverted ? "bg-white text-primary" : "bg-primary text-white",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22Z" opacity="0.9" />
          <path d="M12 2a10 10 0 0 0-10 10a10 10 0 0 0 10 10Z" opacity="0.5" />
        </svg>
      </span>
      {siteConfig.shortName}
    </span>
  );

  return isLinked ? (
    <Link href={routes.public.landing} aria-label={siteConfig.name}>
      {content}
    </Link>
  ) : (
    content
  );
};
