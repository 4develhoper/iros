import type { Metadata } from "next";
import { CtaSection } from "@/features/landing/components/cta-section";
import { FeaturesSection } from "@/features/landing/components/features-section";
import { HeroSection } from "@/features/landing/components/hero-section";
import { StackSection } from "@/features/landing/components/stack-section";

export const metadata: Metadata = {
  title: "Accueil",
};

/**
 * Page d'accueil (landing page).
 *
 * Composant serveur entièrement statique : elle n'accède à aucune API
 * dynamique et est donc prérendue au build.
 */
const LandingPage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <StackSection />
    <CtaSection />
  </>
);

export default LandingPage;
