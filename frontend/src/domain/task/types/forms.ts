import { z } from 'zod';
import { createTaskSchema } from '../validations/task';

export type TaskFormInput = z.input<typeof createTaskSchema>;
export type TaskFormOutput = z.output<typeof createTaskSchema>;
