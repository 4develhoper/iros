import type { Metadata } from "next";
import { DocsHero } from "@/features/docs/components/docs-hero";
import { DocsMobileNav } from "@/features/docs/components/docs-mobile-nav";
import { DocsToc } from "@/features/docs/components/docs-toc";
import { ConventionsSection } from "@/features/docs/components/sections/conventions-section";
import { CustomizationSection } from "@/features/docs/components/sections/customization-section";
import { DatabaseSection } from "@/features/docs/components/sections/database-section";
import { DeploymentSection } from "@/features/docs/components/sections/deployment-section";
import { EnvironmentSection } from "@/features/docs/components/sections/environment-section";
import { FeatureSection } from "@/features/docs/components/sections/feature-section";
import { FormsSection } from "@/features/docs/components/sections/forms-section";
import { InstallationSection } from "@/features/docs/components/sections/installation-section";
import { OverviewSection } from "@/features/docs/components/sections/overview-section";
import { PrerequisitesSection } from "@/features/docs/components/sections/prerequisites-section";
import { ScriptsSection } from "@/features/docs/components/sections/scripts-section";
import { SecuritySection } from "@/features/docs/components/sections/security-section";
import { StructureSection } from "@/features/docs/components/sections/structure-section";
import { ThemeSection } from "@/features/docs/components/sections/theme-section";
import { TroubleshootingSection } from "@/features/docs/components/sections/troubleshooting-section";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Guide de prise en main du boilerplate : installation, configuration, architecture, conventions et déploiement.",
};

/**
 * Page de documentation du boilerplate.
 *
 * Composant serveur entièrement statique : aucune API dynamique n'y est lue,
 * elle est donc prérendue au build sous `cacheComponents`. Seuls le sommaire
 * (suivi de lecture) et les boutons de copie sont des îlots clients.
 */
const DocsPage = () => (
  <>
    <DocsHero />

    <div className="mx-auto flex w-full max-w-6xl gap-12 px-6 py-12 lg:py-16">
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="scrollbar-thin sticky top-26 max-h-[calc(100dvh-8rem)] overflow-y-auto pr-2">
          <DocsToc />
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-12">
        <DocsMobileNav />

        <OverviewSection />
        <PrerequisitesSection />
        <InstallationSection />
        <EnvironmentSection />
        <DatabaseSection />
        <ScriptsSection />
        <StructureSection />
        <ConventionsSection />
        <FormsSection />
        <SecuritySection />
        <ThemeSection />
        <CustomizationSection />
        <FeatureSection />
        <DeploymentSection />
        <TroubleshootingSection />
      </div>
    </div>
  </>
);

export default DocsPage;
