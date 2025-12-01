/**
 * @summary
 * Type definitions for Task entity.
 *
 * @module services/task/taskTypes
 */

import { TaskStatus } from '@/constants/task';

/**
 * @interface TaskEntity
 * @description Represents a task entity
 */
export interface TaskEntity {
  id: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * @interface TaskCreateRequest
 * @description Request payload for creating a task
 */
export interface TaskCreateRequest {
  description: string;
}

/**
 * @interface TaskUpdateRequest
 * @description Request payload for updating a task
 */
export interface TaskUpdateRequest {
  description?: string;
  status?: TaskStatus;
}

/**
 * @interface TaskListResponse
 * @description Response structure for listing tasks
 */
export type TaskListResponse = TaskEntity;
