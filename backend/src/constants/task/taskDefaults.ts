/**
 * @summary
 * Default values and constants for Task entity.
 * Provides centralized configuration for entity creation, validation limits,
 * and status definitions.
 *
 * @module constants/task/taskDefaults
 */

/**
 * @interface TaskStatusType
 * @description Available status values for Task entities.
 *
 * @property {string} PENDING - Pending status ('pendente')
 * @property {string} COMPLETED - Completed status ('concluída')
 */
export const TASK_STATUS = {
  PENDING: 'pendente',
  COMPLETED: 'concluída',
} as const;

/** Type representing the TASK_STATUS constant */
export type TaskStatusType = typeof TASK_STATUS;

/** Union type of all valid status values */
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

/**
 * @interface TaskLimitsType
 * @description Validation constraints for Task entity fields.
 *
 * @property {number} DESCRIPTION_MIN_LENGTH - Minimum characters for description (1)
 * @property {number} DESCRIPTION_MAX_LENGTH - Maximum characters for description (500)
 */
export const TASK_LIMITS = {
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

/** Type representing the TASK_LIMITS constant */
export type TaskLimitsType = typeof TASK_LIMITS;
