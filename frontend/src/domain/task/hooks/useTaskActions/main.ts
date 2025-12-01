import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { taskService } from '../../services/taskService';
import type { CreateTaskDto, UpdateTaskDto } from '../../types';

export const useTaskActions = () => {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: (data: CreateTaskDto) => taskService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar tarefa.');
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) => taskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar tarefa.');
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa excluída com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir tarefa.');
    },
  });

  return {
    createTask,
    updateTask,
    deleteTask,
  };
};
