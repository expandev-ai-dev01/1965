/**
 * @summary
 * Business logic for Task entity.
 * Handles CRUD operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/task/taskService
 */

import { randomUUID } from 'crypto';
import { taskStore } from '@/instances/task';
import { ServiceError } from '@/utils';
import { TASK_STATUS } from '@/constants/task';
import { TaskEntity } from './taskTypes';
import { taskCreateSchema, taskUpdateSchema, taskParamsSchema } from './taskValidation';

/**
 * @summary
 * Lists all tasks from the in-memory store, ordered by creation date descending.
 *
 * @function taskList
 * @module services/task
 *
 * @returns {Promise<TaskEntity[]>} List of task entities
 */
export async function taskList(): Promise<TaskEntity[]> {
  const tasks = taskStore.getAll();
  // Sort by createdAt descending (newest first)
  return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * @summary
 * Creates a new task entity with validated data.
 *
 * @function taskCreate
 * @module services/task
 *
 * @param {unknown} body - Raw request body to validate against taskCreateSchema
 * @returns {Promise<TaskEntity>} The newly created task entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 */
export async function taskCreate(body: unknown): Promise<TaskEntity> {
  const validation = taskCreateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const { description } = validation.data;
  const now = new Date().toISOString();

  const newTask: TaskEntity = {
    id: randomUUID(),
    description,
    status: TASK_STATUS.PENDING,
    createdAt: now,
    updatedAt: now,
  };

  taskStore.add(newTask);
  return newTask;
}

/**
 * @summary
 * Retrieves a specific task by its unique identifier.
 *
 * @function taskGet
 * @module services/task
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<TaskEntity>} The found task entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 */
export async function taskGet(params: unknown): Promise<TaskEntity> {
  const validation = taskParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const record = taskStore.getById(id);

  if (!record) {
    throw new ServiceError('NOT_FOUND', 'Task not found', 404);
  }

  return record as TaskEntity;
}

/**
 * @summary
 * Updates an existing task entity with new data.
 *
 * @function taskUpdate
 * @module services/task
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @param {unknown} body - Raw request body with update data to validate
 * @returns {Promise<TaskEntity>} The updated task entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 */
export async function taskUpdate(params: unknown, body: unknown): Promise<TaskEntity> {
  const paramsValidation = taskParamsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = taskUpdateSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = taskStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Task not found', 404);
  }

  const updateData = bodyValidation.data;
  const updated = taskStore.update(id, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

  return updated as TaskEntity;
}

/**
 * @summary
 * Permanently deletes a task entity by its ID.
 *
 * @function taskDelete
 * @module services/task
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When entity with given ID does not exist
 */
export async function taskDelete(params: unknown): Promise<{ message: string }> {
  const validation = taskParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;

  if (!taskStore.exists(id)) {
    throw new ServiceError('NOT_FOUND', 'Task not found', 404);
  }

  taskStore.delete(id);
  return { message: 'Task deleted successfully' };
}
