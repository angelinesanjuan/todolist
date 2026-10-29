export type TaskStatus = 'done' | 'not-done';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  groupId: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dueDate?: string;
}

export interface TaskGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface Developer {
  id: string;
  name: string;
  email: string;
  studentId: string;
}