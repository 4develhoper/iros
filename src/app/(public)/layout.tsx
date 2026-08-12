import { PublicLayout } from "@/components/layouts/public-layout";

/**
 * Layout du groupe de routes publiques.
 *
 * Toutes les pages de `(public)` héritent de l'en-tête et du pied de page du
 * site vitrine.
 */
const PublicRoutesLayout = ({ children }: LayoutProps<"/">) => (
  <PublicLayout>{children}</PublicLayout>
);

export default PublicRoutesLayout;
