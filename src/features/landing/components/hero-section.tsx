import { ArrowRight } from "react-feather";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/config/routes.config";
import { siteConfig } from "@/config/site.config";

/**
 * Section d'accroche de la page d'accueil.
 *
 * Entièrement statique : aucune donnée dynamique n'y est lue, elle est donc
 * prérendue au build sous `cacheComponents`.
 */
export const HeroSection = () => (
  <section className="relative overflow-hidden bg-vanilla">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
    />

    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-7 px-6 py-24 text-center sm:py-32">
      <Badge variant="primary">Next.js 16 · React 19 · Tailwind 4</Badge>

      <h1 className="text-4xl font-medium tracking-tight text-balance text-ink-900 sm:text-6xl">
        Démarrez vite,{" "}
        <span className="text-primary">construisez sereinement</span>
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed text-pretty text-ink-600">
        {siteConfig.description}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <LinkButton
          href={routes.auth.register}
          size="lg"
          rightIcon={<ArrowRight className="size-4" />}
        >
          Créer un compte
        </LinkButton>
        <LinkButton href={routes.app.starter} size="lg" variant="outline">
          Voir la page starter
        </LinkButton>
      </div>
    </div>
  </section>
);
