import { TaskForm } from '@/domain/task/components/TaskForm';
import { TaskList } from '@/domain/task/components/TaskList';

function HomePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Minhas Tarefas</h1>
        <p className="text-muted-foreground">Gerencie suas atividades diárias com facilidade.</p>
      </div>

      <div className="space-y-6">
        <section className="bg-card rounded-xl border p-6 shadow-sm">
          <TaskForm />
        </section>

        <section>
          <TaskList />
        </section>
      </div>
    </div>
  );
}

export { HomePage };
