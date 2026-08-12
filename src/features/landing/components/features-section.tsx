import type { ReactNode } from "react";
import { Database, Layers, Lock, Zap } from "react-feather";
import { Card, CardBody } from "@/components/ui/card";

/** Argument mis en avant sur la page d'accueil. */
type TFeatureItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const FEATURES: readonly TFeatureItem[] = [
  {
    title: "Architecture par features",
    description:
      "Chaque domaine regroupe ses schémas, ses actions serveur et ses composants. Ajouter une fonctionnalité, c'est créer un dossier.",
    icon: <Layers />,
  },
  {
    title: "Authentification prête",
    description:
      "Better Auth gère les sessions, les mots de passe et les fournisseurs OAuth. Les écrans de connexion et d'inscription sont déjà là.",
    icon: <Lock />,
  },
  {
    title: "Base de données typée",
    description:
      "Drizzle et SQLite : un schéma TypeScript, des migrations générées, aucune requête non typée.",
    icon: <Database />,
  },
  {
    title: "Formulaires sûrs",
    description:
      "React Hook Form, Zod et next-safe-form valident les mêmes règles côté client et côté serveur.",
    icon: <Zap />,
  },
] as const;

/** Grille des arguments principaux du boilerplate. */
export const FeaturesSection = () => (
  <section id="features" className="mx-auto w-full max-w-6xl px-6 py-24">
    <div className="mx-auto max-w-2xl space-y-3 text-center">
      <h2 className="text-3xl font-medium tracking-tight text-ink-900">
        Tout est déjà branché
      </h2>
      <p className="text-ink-600">
        Les décisions structurantes sont prises : concentrez-vous sur votre
        métier dès la première heure.
      </p>
    </div>

    <div className="mt-14 grid gap-5 sm:grid-cols-2">
      {FEATURES.map((feature) => (
        <Card key={feature.title} variant="outlined">
          <CardBody className="space-y-3 pt-6">
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-field bg-primary-50 text-primary [&_svg]:size-5"
            >
              {feature.icon}
            </span>
            <h3 className="font-medium text-ink-900">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-ink-600">
              {feature.description}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  </section>
);
