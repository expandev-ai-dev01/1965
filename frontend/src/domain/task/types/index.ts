export interface Task {
  id: string;
  description: string;
  status: 'pendente' | 'concluída';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  description: string;
}

export interface UpdateTaskDto {
  description?: string;
  status?: 'pendente' | 'concluída';
}
