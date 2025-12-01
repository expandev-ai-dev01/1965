import { ClipboardListIcon } from 'lucide-react';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from '@/core/components/empty';
import { useTaskList } from '../../hooks/useTaskList';
import { TaskItem } from '../TaskItem';

function TaskList() {
  const { data: tasks, isLoading, isError } = useTaskList();

  if (isLoading) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <LoadingSpinner className="size-8 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-destructive flex h-40 w-full items-center justify-center">
        Erro ao carregar tarefas. Tente novamente.
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <ClipboardListIcon className="text-muted-foreground size-10" />
        </EmptyMedia>
        <EmptyContent>
          <EmptyTitle>Nenhuma tarefa encontrada</EmptyTitle>
          <EmptyDescription>
            Você ainda não tem tarefas. Que tal adicionar uma acima?
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    );
  }

  // Sort tasks by creation date descending (newest first)
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col gap-3">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export { TaskList };
