import { authenticatedClient } from '@/core/lib/api';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types';

/**
 * @service TaskService
 * @domain Task
 */
export const taskService = {
  async list(): Promise<Task[]> {
    const { data } = await authenticatedClient.get('/task');
    return data.data;
  },

  async create(payload: CreateTaskDto): Promise<Task> {
    const { data } = await authenticatedClient.post('/task', payload);
    return data.data;
  },

  async update(id: string, payload: UpdateTaskDto): Promise<Task> {
    const { data } = await authenticatedClient.put(`/task/${id}`, payload);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/task/${id}`);
  },
};
