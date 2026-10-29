import React from 'react';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Task } from '../type';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
  showGroupBadge?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, showGroupBadge = true }) => {
  const { toggleTaskStatus, deleteTask, getGroupById } = useTaskContext();
  const group = getGroupById(task.groupId);
  const isDone = task.status === 'done';

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border transition-colors gap-3 ${
        isDone
          ? 'bg-slate-50 border-slate-200 text-slate-500'
          : 'bg-white border-slate-200 shadow-xs'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => toggleTaskStatus(task.id)}
          className="text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
          title={isDone ? 'Mark as Not Done' : 'Mark as Done'}
        >
          {isDone ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={`text-sm sm:text-base font-medium break-words ${
              isDone ? 'line-through text-slate-400 font-normal' : 'text-slate-900'
            }`}
          >
            {task.title}
          </p>

          <div className="flex items-center gap-2 mt-0.5 text-xs">
            <span
              className={`font-semibold ${
                isDone ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {isDone ? 'Done' : 'Not Done'}
            </span>

            {showGroupBadge && group && (
              <>
                <span className="text-slate-300">·</span>
                <Link
                  to={`/groups/${group.id}`}
                  className="text-slate-600 hover:text-emerald-700 font-medium underline underline-offset-2"
                >
                  {group.name}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <button
          type="button"
          onClick={() => toggleTaskStatus(task.id)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            isDone
              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
          }`}
        >
          {isDone ? 'Mark Not Done' : 'Mark Done'}
        </button>

        <button
          type="button"
          onClick={() => deleteTask(task.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};