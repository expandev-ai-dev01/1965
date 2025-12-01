import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/core/components/form';

import { createTaskSchema } from '../../validations/task';
import type { TaskFormInput, TaskFormOutput } from '../../types/forms';
import { useTaskActions } from '../../hooks/useTaskActions';

function TaskForm() {
  const { createTask } = useTaskActions();

  const form = useForm<TaskFormInput, any, TaskFormOutput>({
    resolver: zodResolver(createTaskSchema),
    mode: 'onBlur',
    defaultValues: {
      description: '',
    },
  });

  const onSubmit = (data: TaskFormOutput) => {
    const sanitizedDescription = DOMPurify.sanitize(data.description);
    createTask.mutate(
      { description: sanitizedDescription },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start gap-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Adicione uma nova tarefa..."
                  disabled={createTask.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createTask.isPending}>
          <PlusIcon className="size-4 mr-2" />
          Adicionar
        </Button>
      </form>
    </Form>
  );
}

export { TaskForm };
