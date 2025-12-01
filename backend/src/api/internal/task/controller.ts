/**
 * @summary
 * API controller for Task entity.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/task/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { taskCreate, taskList, taskGet, taskUpdate, taskDelete } from '@/services/task';

/**
 * @api {get} /api/internal/task List Tasks
 * @apiName ListTasks
 * @apiGroup Task
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of tasks
 * @apiSuccess {String} data.id Unique identifier (UUID)
 * @apiSuccess {String} data.description Task description
 * @apiSuccess {String} data.status Task status ('pendente' | 'concluída')
 * @apiSuccess {String} data.createdAt ISO 8601 timestamp
 * @apiSuccess {String} data.updatedAt ISO 8601 timestamp
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await taskList();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 *
 * @apiBody {String} description Task description (1-500 chars)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Unique identifier (UUID)
 * @apiSuccess {String} data.description Task description
 * @apiSuccess {String} data.status Task status ('pendente')
 * @apiSuccess {String} data.createdAt ISO 8601 timestamp
 * @apiSuccess {String} data.updatedAt ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await taskCreate(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/task/:id Get Task
 * @apiName GetTask
 * @apiGroup Task
 *
 * @apiParam {String} id Task UUID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Unique identifier (UUID)
 * @apiSuccess {String} data.description Task description
 * @apiSuccess {String} data.status Task status
 * @apiSuccess {String} data.createdAt ISO 8601 timestamp
 * @apiSuccess {String} data.updatedAt ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await taskGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/task/:id Update Task
 * @apiName UpdateTask
 * @apiGroup Task
 *
 * @apiParam {String} id Task UUID
 *
 * @apiBody {String} [description] Task description (1-500 chars)
 * @apiBody {String} [status] Task status ('pendente' | 'concluída')
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Unique identifier (UUID)
 * @apiSuccess {String} data.description Task description
 * @apiSuccess {String} data.status Task status
 * @apiSuccess {String} data.createdAt ISO 8601 timestamp
 * @apiSuccess {String} data.updatedAt ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await taskUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/task/:id Delete Task
 * @apiName DeleteTask
 * @apiGroup Task
 *
 * @apiParam {String} id Task UUID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await taskDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
