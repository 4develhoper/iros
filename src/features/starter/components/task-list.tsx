import { Inbox } from "react-feather";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge, type TBadgeVariant } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/table";
import { requireUser } from "@/features/auth/server/dal/session.dal";
import { listTasksByUser } from "@/features/starter/server/dal/task.dal";
import type { TTaskPriority } from "@/features/starter/types/task.types";
import { formatDate } from "@/lib/utils/format";
import { TaskRowActions } from "./task-row-actions";

/** Correspondance entre priorité stockée et présentation du badge. */
const PRIORITY_BADGE: Record<
  TTaskPriority,
  { label: string; variant: TBadgeVariant }
> = {
  low: { label: "Basse", variant: "neutral" },
  medium: { label: "Moyenne", variant: "primary" },
  high: { label: "Haute", variant: "warning" },
};

/**
 * Tableau des tâches de l'utilisateur connecté.
 *
 * Composant serveur asynchrone : il lit la session puis la base de données.
 * Sous `cacheComponents`, il doit être rendu dans un `<Suspense>` avec
 * `<TaskListSkeleton />` comme repli.
 */
export const TaskList = async () => {
  const user = await requireUser();
  const tasks = await listTasksByUser(user.id);

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<Inbox />}
        title="Aucune tâche pour le moment"
        description="Utilisez le formulaire ci-dessus pour créer votre première tâche."
      />
    );
  }

  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Tâche</TableHeaderCell>
            <TableHeaderCell>Priorité</TableHeaderCell>
            <TableHeaderCell>État</TableHeaderCell>
            <TableHeaderCell>Créée le</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <p className="font-medium text-ink-900">{task.title}</p>
                {task.description ? (
                  <p className="mt-0.5 text-xs text-muted">
                    {task.description}
                  </p>
                ) : null}
              </TableCell>

              <TableCell>
                <Badge variant={PRIORITY_BADGE[task.priority].variant}>
                  {PRIORITY_BADGE[task.priority].label}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge variant={task.completed ? "success" : "neutral"}>
                  {task.completed ? "Terminée" : "À faire"}
                </Badge>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-muted">
                {formatDate(task.createdAt)}
              </TableCell>

              <TableCell>
                <TaskRowActions task={task} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
};

/** Repli de `TaskList` pendant le chargement des données. */
export const TaskListSkeleton = () => (
  <div className="space-y-3 rounded-card border border-border p-5">
    {[0, 1, 2].map((row) => (
      <Skeleton key={row} className="h-12 w-full" />
    ))}
  </div>
);
