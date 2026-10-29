import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskGroup, Developer } from '../types';

interface TaskContextType {
  tasks: Task[];
  groups: TaskGroup[];
  developers: Developer[];
  addTask: (title: string, groupId: string, priority?: Task['priority'], dueDate?: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  clearCompletedTasks: (groupId?: string) => void;
  addGroup: (name: string, description: string, color?: string, icon?: string) => TaskGroup;
  deleteGroup: (groupId: string) => void;
  updateDevelopers: (updatedDevs: Developer[]) => void;
  resetToSampleData: () => void;
  getGroupById: (groupId: string) => TaskGroup | undefined;
  getTasksByGroup: (groupId: string) => Task[];
  stats: {
    total: number;
    done: number;
    pending: number;
    completionRate: number;
  };
}

const DEFAULT_GROUPS: TaskGroup[] = [
  {
    id: 'school-activities',
    name: 'School Activities',
    description: 'Course lab exercises, lectures, and academic tasks',
    color: '#059669',
    icon: 'GraduationCap',
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Application development, coding milestones, and repositories',
    color: '#0284c7',
    icon: 'FolderKanban',
  },
  {
    id: 'personal-tasks',
    name: 'Personal Tasks',
    description: 'Personal development, appointments, and errands',
    color: '#d97706',
    icon: 'User',
  },
  {
    id: 'daily-tasks',
    name: 'Daily Tasks',
    description: 'Routine check-ins, study schedules, and habits',
    color: '#7c3aed',
    icon: 'CalendarDays',
  },
];

const DEFAULT_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Complete Laboratory 3: To-Do List with React Router',
    groupId: 'school-activities',
    status: 'done',
    priority: 'high',
    createdAt: '2026-10-28T09:00:00Z',
    dueDate: '2026-10-30',
  },
  {
    id: 'task-2',
    title: 'Review React State Management and Event Handling lecture notes',
    groupId: 'school-activities',
    status: 'done',
    priority: 'medium',
    createdAt: '2026-10-28T10:15:00Z',
    dueDate: '2026-10-31',
  },
  {
    id: 'task-3',
    title: 'Submit Laboratory 3 Live Deployed URL & GitHub Repository',
    groupId: 'school-activities',
    status: 'not-done',
    priority: 'high',
    createdAt: '2026-10-28T11:00:00Z',
    dueDate: '2026-11-02',
  },
  {
    id: 'task-4',
    title: 'Prepare project demonstration walkthrough',
    groupId: 'projects',
    status: 'not-done',
    priority: 'high',
    createdAt: '2026-10-28T11:30:00Z',
    dueDate: '2026-11-03',
  },
  {
    id: 'task-5',
    title: 'Setup Tailwind CSS responsive breakpoints for mobile & tablet',
    groupId: 'projects',
    status: 'done',
    priority: 'medium',
    createdAt: '2026-10-28T12:00:00Z',
    dueDate: '2026-10-29',
  },
  {
    id: 'task-6',
    title: 'Pick up campus student ID validation sticker',
    groupId: 'personal-tasks',
    status: 'not-done',
    priority: 'low',
    createdAt: '2026-10-28T13:00:00Z',
    dueDate: '2026-11-05',
  },
  {
    id: 'task-7',
    title: '30-minute daily algorithm problem solving practice',
    groupId: 'daily-tasks',
    status: 'done',
    priority: 'medium',
    createdAt: '2026-10-28T07:30:00Z',
    dueDate: '2026-10-28',
  },
  {
    id: 'task-8',
    title: 'Check student portal for announcement updates',
    groupId: 'daily-tasks',
    status: 'not-done',
    priority: 'low',
    createdAt: '2026-10-28T08:00:00Z',
    dueDate: '2026-10-29',
  },
];

const DEFAULT_DEVELOPERS: Developer[] = [
  {
    id: 'dev-1',
    name: 'Angeline San Juan',
    role: 'Lead Developer & UI Designer',
    contribution: 'React Router architecture, state orchestration, and responsive design with Tailwind CSS.',
    email: 'sanjuanangeline008@gmail.com',
    studentId: '2023-10482',
  },
  {
    id: 'dev-2',
    name: 'Christian Dave Reyes',
    role: 'Frontend Developer',
    contribution: 'Task group dynamic routing (:groupId), CRUD state operations, and event handling.',
    email: 'cd.reyes@cvsu.edu.ph',
    studentId: '2023-10741',
  },
  {
    id: 'dev-3',
    name: 'Maria Nicole Bautista',
    role: 'Component Architect',
    contribution: 'Component modularization, filter controls, dashboard metrics calculation, and layout.',
    email: 'mn.bautista@cvsu.edu.ph',
    studentId: '2023-10993',
  },
  {
    id: 'dev-4',
    name: 'Joshua Kyle Mendoza',
    role: 'QA & Documentation Engineer',
    contribution: 'Testing across mobile & desktop, user manual documentation, and verification.',
    email: 'jk.mendoza@cvsu.edu.ph',
    studentId: '2023-11204',
  },
];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('cvsu_tasks_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_TASKS;
  });

  const [groups, setGroups] = useState<TaskGroup[]>(() => {
    try {
      const saved = localStorage.getItem('cvsu_groups_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_GROUPS;
  });

  const [developers, setDevelopers] = useState<Developer[]>(() => {
    try {
      const saved = localStorage.getItem('cvsu_devs_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_DEVELOPERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('cvsu_tasks_v1', JSON.stringify(tasks));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('cvsu_groups_v1', JSON.stringify(groups));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [groups]);

  useEffect(() => {
    try {
      localStorage.setItem('cvsu_devs_v1', JSON.stringify(developers));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [developers]);

  const addTask = (title: string, groupId: string, priority: Task['priority'] = 'medium', dueDate?: string) => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: title.trim(),
      groupId: groupId || (groups[0]?.id ?? 'school-activities'),
      status: 'not-done',
      priority,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || undefined,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: task.status === 'done' ? 'not-done' : 'done',
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const clearCompletedTasks = (groupId?: string) => {
    setTasks(prev =>
      prev.filter(task => {
        if (groupId) {
          return !(task.groupId === groupId && task.status === 'done');
        }
        return task.status !== 'done';
      })
    );
  };

  const addGroup = (name: string, description: string, color = '#059669', icon = 'Folder'): TaskGroup => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `group-${Date.now()}`;
    const id = `${slug}-${Date.now().toString(36)}`;
    const newGroup: TaskGroup = {
      id,
      name: name.trim(),
      description: description.trim() || 'Custom group category',
      color,
      icon,
    };
    setGroups(prev => [...prev, newGroup]);
    return newGroup;
  };

  const deleteGroup = (groupId: string) => {
    if (groups.length <= 1) return;
    setGroups(prev => prev.filter(g => g.id !== groupId));
    const fallbackGroupId = groups.find(g => g.id !== groupId)?.id || 'school-activities';
    setTasks(prev => prev.map(t => (t.groupId === groupId ? { ...t, groupId: fallbackGroupId } : t)));
  };

  const updateDevelopers = (updatedDevs: Developer[]) => {
    setDevelopers(updatedDevs);
  };

  const resetToSampleData = () => {
    setTasks(DEFAULT_TASKS);
    setGroups(DEFAULT_GROUPS);
    setDevelopers(DEFAULT_DEVELOPERS);
    try {
      localStorage.setItem('cvsu_tasks_v1', JSON.stringify(DEFAULT_TASKS));
      localStorage.setItem('cvsu_groups_v1', JSON.stringify(DEFAULT_GROUPS));
      localStorage.setItem('cvsu_devs_v1', JSON.stringify(DEFAULT_DEVELOPERS));
    } catch {}
  };

  const getGroupById = (groupId: string) => {
    return groups.find(g => g.id === groupId);
  };

  const getTasksByGroup = (groupId: string) => {
    return tasks.filter(task => task.groupId === groupId);
  };

  const doneCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;
  const pendingCount = totalCount - doneCount;
  const completionRate = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        groups,
        developers,
        addTask,
        toggleTaskStatus,
        deleteTask,
        clearCompletedTasks,
        addGroup,
        deleteGroup,
        updateDevelopers,
        resetToSampleData,
        getGroupById,
        getTasksByGroup,
        stats: {
          total: totalCount,
          done: doneCount,
          pending: pendingCount,
          completionRate,
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};