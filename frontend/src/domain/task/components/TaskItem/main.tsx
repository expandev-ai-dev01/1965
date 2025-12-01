import { useState } from 'react';
import { Trash2Icon, PencilIcon, CheckIcon, XIcon } from 'lucide-react';
import DOMPurify from 'dompurify';

import { cn } from '@/core/lib/utils';
import { Checkbox } from '@/core/components/checkbox';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/core/components/alert-dialog';

import type { Task } from '../../types';
import { useTaskActions } from '../../hooks/useTaskActions';

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask } = useTaskActions();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.description);

  const handleToggleStatus = () => {
    const newStatus = task.status === 'pendente' ? 'concluída' : 'pendente';
    updateTask.mutate({ id: task.id, data: { status: newStatus } });
  };

  const handleSaveEdit = () => {
    if (!editValue.trim()) return;
    const sanitizedDescription = DOMPurify.sanitize(editValue);
    updateTask.mutate(
      { id: task.id, data: { description: sanitizedDescription } },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const handleCancelEdit = () => {
    setEditValue(task.description);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') handleCancelEdit();
  };

  return (
    <div className="bg-card flex items-center justify-between gap-4 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-1 items-center gap-3">
        <Checkbox
          checked={task.status === 'concluída'}
          onCheckedChange={handleToggleStatus}
          className="mt-0.5"
        />

        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="h-8"
            />
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={handleSaveEdit}
              className="text-green-600 hover:text-green-700"
            >
              <CheckIcon className="size-4" />
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={handleCancelEdit}
              className="text-red-600 hover:text-red-700"
            >
              <XIcon className="size-4" />
            </Button>
          </div>
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={cn(
              'flex-1 cursor-pointer text-sm transition-all',
              task.status === 'concluída' && 'text-muted-foreground line-through'
            )}
          >
            {task.description}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1">
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="text-muted-foreground hover:text-primary"
          >
            <PencilIcon className="size-4" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2Icon className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir tarefa</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTask.mutate(task.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}

export { TaskItem };
