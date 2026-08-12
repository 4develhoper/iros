import { AppLayout } from "@/components/layouts/app-layout";

/**
 * Layout du groupe de routes protégées.
 *
 * L'accès est filtré en amont par `src/middleware.ts` ; ce layout ne fait donc
 * que poser la coquille (barre latérale et barre supérieure).
 */
const AppRoutesLayout = ({ children }: LayoutProps<"/">) => (
  <AppLayout>{children}</AppLayout>
);

export default AppRoutesLayout;
