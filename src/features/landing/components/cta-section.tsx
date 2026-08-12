import { ArrowRight } from "react-feather";
import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/config/routes.config";

/** Appel à l'action final de la page d'accueil. */
export const CtaSection = () => (
  <section className="mx-auto w-full max-w-6xl px-6 py-24">
    <div className="flex flex-col items-center gap-6 rounded-card bg-primary px-8 py-16 text-center text-white">
      <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-balance sm:text-4xl">
        Votre prochain projet commence maintenant
      </h2>
      <p className="max-w-xl text-white/80">
        Clonez le dépôt, renommez l'application dans <code>site.config.ts</code>{" "}
        et lancez-vous.
      </p>
      <LinkButton
        href={routes.auth.register}
        size="lg"
        className="bg-white text-primary hover:bg-vanilla-100"
        rightIcon={<ArrowRight className="size-4" />}
      >
        Créer un compte
      </LinkButton>
    </div>
  </section>
);
