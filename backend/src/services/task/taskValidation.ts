/**
 * @summary
 * Validation schemas for Task entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/task/taskValidation
 */

import { z } from 'zod';
import { TASK_LIMITS, TASK_STATUS } from '@/constants/task';

/**
 * Schema for create request validation
 */
export const taskCreateSchema = z.object({
  description: z
    .string()
    .trim()
    .min(TASK_LIMITS.DESCRIPTION_MIN_LENGTH)
    .max(TASK_LIMITS.DESCRIPTION_MAX_LENGTH),
});

/**
 * Schema for update request validation
 */
export const taskUpdateSchema = z.object({
  description: z
    .string()
    .trim()
    .min(TASK_LIMITS.DESCRIPTION_MIN_LENGTH)
    .max(TASK_LIMITS.DESCRIPTION_MAX_LENGTH)
    .optional(),
  status: z.enum([TASK_STATUS.PENDING, TASK_STATUS.COMPLETED]).optional(),
});

/**
 * Schema for ID parameter validation
 */
export const taskParamsSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Inferred types from schemas
 */
export type TaskCreateInput = z.infer<typeof taskCreateSchema>;
export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>;
export type TaskParamsInput = z.infer<typeof taskParamsSchema>;
