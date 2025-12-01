/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as initExampleController from '@/api/internal/init-example/controller';
import * as taskController from '@/api/internal/task/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Init-Example routes - /api/internal/init-example
 */
router.get('/init-example', initExampleController.listHandler);
router.post('/init-example', initExampleController.createHandler);
router.get('/init-example/:id', initExampleController.getHandler);
router.put('/init-example/:id', initExampleController.updateHandler);
router.delete('/init-example/:id', initExampleController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Task routes - /api/internal/task
 */
router.get('/task', taskController.listHandler);
router.post('/task', taskController.createHandler);
router.get('/task/:id', taskController.getHandler);
router.put('/task/:id', taskController.updateHandler);
router.delete('/task/:id', taskController.deleteHandler);

export default router;
