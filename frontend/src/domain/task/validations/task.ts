import { z } from 'zod';

export const createTaskSchema = z.object({
  description: z.string('A descrição é obrigatória').min(1, 'A descrição não pode estar vazia'),
});

export const updateTaskSchema = z.object({
  description: z.string().min(1, 'A descrição não pode estar vazia').optional(),
  status: z.enum(['pendente', 'concluída'], 'Status inválido').optional(),
});
