import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils/cn";

/** Barres du graphique décoratif, hauteurs exprimées en pourcentage. */
const CHART_BARS = [
  { id: "lun", height: 38 },
  { id: "mar", height: 62 },
  { id: "mer", height: 45 },
  { id: "jeu", height: 78 },
  { id: "ven", height: 52 },
  { id: "sam", height: 88 },
  { id: "dim", height: 66 },
] as const;

export type TAuthShowcaseProps = {
  /** Accroche affichée en bas du panneau. */
  title: string;
  /** Paragraphe descriptif sous l'accroche. */
  description: string;
  className?: string;
};

/**
 * Panneau de marque affiché à gauche des écrans d'authentification.
 *
 * L'illustration est composée uniquement de div stylées : aucun asset externe
 * n'est requis, et le rendu reste net sur tous les écrans. Remplacer le bloc
 * « aperçu produit » par une capture réelle lors de l'adaptation du projet.
 */
export const AuthShowcase = ({
  title,
  description,
  className,
}: TAuthShowcaseProps) => (
  <aside
    className={cn(
      "relative isolate hidden flex-col justify-between overflow-hidden rounded-card bg-primary p-10 text-white lg:flex",
      className,
    )}
  >
    {/* Motifs décoratifs de fond. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10" />
      <div className="absolute top-1/3 -left-16 size-56 rounded-full bg-white/5" />
      <div className="absolute right-10 bottom-16 size-40 rounded-3xl bg-white/5" />
    </div>

    <Logo isInverted />

    {/*
      Aperçu produit factice : à remplacer par une capture du projet.

      Cette carte reste blanche dans les deux thèmes : ses couleurs sont donc
      figées sur la palette `slate` plutôt que sur les jetons `ink`, qui
      s'inversent en thème sombre et deviendraient illisibles ici.
    */}
    <div aria-hidden="true" className="relative my-10 flex justify-center">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-400">Revenus</p>
            <p className="text-lg font-medium text-slate-900">24 908,00 €</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Dépenses</p>
            <p className="text-lg font-medium text-slate-900">1 028,00 €</p>
          </div>
        </div>

        <div className="mt-6 flex h-24 items-end gap-2">
          {CHART_BARS.map((bar) => (
            <div
              key={bar.id}
              style={{ height: `${bar.height}%` }}
              className="flex-1 rounded-full bg-primary-100 last:bg-primary"
            />
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Virement reçu</span>
            <span className="font-medium text-emerald-600">+523,10 €</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Abonnement</span>
            <span className="font-medium text-slate-900">−600,00 €</span>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-md space-y-4 text-center lg:text-left">
      <h2 className="text-3xl font-medium tracking-tight">{title}</h2>
      <p className="text-sm leading-relaxed text-white/75">{description}</p>
    </div>
  </aside>
);
