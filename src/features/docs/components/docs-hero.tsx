import { ArrowRight, BookOpen } from "react-feather";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/config/routes.config";
import { siteConfig } from "@/config/site.config";

/** Accroche de la page de documentation. */
export const DocsHero = () => (
  <section className="border-b border-border bg-vanilla">
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16 sm:py-20">
      <Badge variant="primary">
        <BookOpen aria-hidden="true" className="size-3.5" />
        Documentation
      </Badge>

      <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-balance text-ink-900 sm:text-5xl">
        Prendre en main {siteConfig.name}
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed text-pretty text-ink-600">
        De l'installation au déploiement : tout ce qu'il faut savoir pour
        démarrer un projet sur cette base, comprendre ses conventions et éviter
        ses pièges.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <LinkButton
          href={routes.auth.register}
          rightIcon={<ArrowRight className="size-4" />}
        >
          Essayer l'application
        </LinkButton>
        <LinkButton href={routes.public.landing} variant="outline">
          Retour à l'accueil
        </LinkButton>
      </div>
    </div>
  </section>
);
