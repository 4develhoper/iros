import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { TaskForm } from "@/features/starter/components/task-form";
import {
  TaskList,
  TaskListSkeleton,
} from "@/features/starter/components/task-list";
import { UiShowcase } from "@/features/starter/components/ui-showcase";

export const metadata: Metadata = {
  title: "Starter",
  description: "Page de démonstration de la stack du boilerplate.",
};

/**
 * Page starter : point de départ pour développer une nouvelle fonctionnalité.
 *
 * Composant serveur. La liste des tâches lit la session et la base de données,
 * elle est donc placée derrière un `<Suspense>` : le reste de la page reste
 * prérendu conformément à `cacheComponents`.
 */
const StarterPage = () => (
  <div className="space-y-8">
    <PageHeader
      title="Starter"
      description="Formulaire, actions serveur, base de données et composants natifs réunis sur un seul écran."
    />

    <Card>
      <CardHeader
        title="Nouvelle tâche"
        description="React Hook Form + Zod + next-safe-form, du navigateur jusqu'à SQLite."
      />
      <CardBody>
        <TaskForm />
      </CardBody>
    </Card>

    <section className="space-y-4">
      <h2 className="text-lg font-medium text-ink-900">Vos tâches</h2>
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList />
      </Suspense>
    </section>

    <Card>
      <CardHeader
        title="Composants natifs"
        description="Aperçu des primitives disponibles dans src/components/ui."
      />
      <CardBody>
        <UiShowcase />
      </CardBody>
    </Card>
  </div>
);

export default StarterPage;
