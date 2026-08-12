import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/config/routes.config";

/** Page affichée pour toute URL inconnue. */
const NotFoundPage = () => (
  <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-vanilla px-6 text-center">
    <p className="text-6xl font-medium text-primary">404</p>
    <div className="space-y-2">
      <h1 className="text-2xl font-medium text-ink-900">Page introuvable</h1>
      <p className="max-w-md text-ink-600">
        La page que vous cherchez a été déplacée ou n'existe plus.
      </p>
    </div>
    <LinkButton href={routes.public.landing}>Retour à l'accueil</LinkButton>
  </main>
);

export default NotFoundPage;
