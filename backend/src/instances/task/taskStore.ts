/**
 * @summary
 * In-memory store instance for Task entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/task/taskStore
 */

import { TaskStatus } from '@/constants/task';

/**
 * Task record structure
 */
export interface TaskRecord {
  id: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * In-memory store for Task records
 */
class TaskStore {
  private records: Map<string, TaskRecord> = new Map();

  /**
   * Get all records
   */
  getAll(): TaskRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: string): TaskRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: TaskRecord): TaskRecord {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: string, data: Partial<TaskRecord>): TaskRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: string): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: string): boolean {
    return this.records.has(id);
  }

  /**
   * Clear all records (useful for testing)
   */
  clear(): void {
    this.records.clear();
  }
}

/**
 * Singleton instance of TaskStore
 */
export const taskStore = new TaskStore();
