import {
  DocCode,
  DocParagraph,
  DocSection,
  DocSubtitle,
} from "@/features/docs/components/doc-section";
import { DocTable } from "@/features/docs/components/doc-table";

/** Technologies retenues, avec le rôle de chacune. */
const STACK_ROWS = [
  ["Framework", "Next.js 16 — App Router, Turbopack, cacheComponents"],
  ["Interface", "React 19, Tailwind CSS 4"],
  ["Langage", "TypeScript en mode strict"],
  ["Authentification", "Better Auth — e-mail/mot de passe, Google, GitHub"],
  ["Base de données", "Drizzle ORM sur SQLite (better-sqlite3)"],
  ["État client", "Zustand"],
  ["Formulaires", "React Hook Form + Zod + next-safe-form"],
  ["Notifications", "react-hot-toast"],
  ["Icônes", "react-feather"],
  ["Qualité", "Biome (lint et formatage)"],
] as const;

/** Présentation générale du boilerplate et de sa stack. */
export const OverviewSection = () => (
  <DocSection
    id="overview"
    title="Vue d'ensemble"
    description="Une base Next.js organisée en architecture par features : chaque domaine métier regroupe ses schémas, ses actions serveur, son accès aux données et ses composants dans un dossier unique."
  >
    <DocParagraph>
      Les décisions structurantes sont déjà prises et câblées entre elles :
      authentification, base de données typée, formulaires validés des deux
      côtés, thème clair/sombre et garde d'accès. La feature{" "}
      <DocCode>starter</DocCode> sert de modèle complet et parcourt tout le
      trajet formulaire → Server Action → DAL → base.
    </DocParagraph>

    <DocSubtitle>Stack</DocSubtitle>

    <DocTable columns={["Domaine", "Choix"]} rows={STACK_ROWS} />
  </DocSection>
);
