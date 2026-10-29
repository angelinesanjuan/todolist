import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { TaskItem } from '../components/TaskItem';

export const GroupDetailPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { getGroupById, getTasksByGroup, addTask } = useTaskContext();

  const group = groupId ? getGroupById(groupId) : undefined;
  const groupTasks = groupId ? getTasksByGroup(groupId) : [];

  const [title, setTitle] = useState('');

  if (!group) {
    return (
      <div className="text-center py-12 bg-white border border-slate-200 rounded-xl p-6 max-w-md mx-auto">
        <h2 className="text-lg font-bold text-slate-800">Group Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">This task group does not exist.</p>
        <Link
          to="/groups"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Groups</span>
        </Link>
      </div>
    );
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !groupId) return;
    addTask(title, groupId);
    setTitle('');
  };

  const doneCount = groupTasks.filter((t) => t.status === 'done').length;
  const pendingCount = groupTasks.length - doneCount;

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/groups"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Groups</span>
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{group.name}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{group.description}</p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 font-medium">
          <span className="text-emerald-700 font-semibold">{doneCount} Done</span>
          <span className="text-slate-300">·</span>
          <span className="text-amber-700 font-semibold">{pendingCount} Pending</span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-600 font-semibold">{groupTasks.length} Total</span>
        </div>
      </div>

      <form
        onSubmit={handleAddTask}
        className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`Add a new task to ${group.name}...`}
          className="flex-1 px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Group</span>
        </button>
      </form>

      {groupTasks.length === 0 ? (
        <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-xl">
          <p className="text-sm font-medium text-slate-600">No tasks in this group yet.</p>
          <p className="text-xs text-slate-400 mt-1">Add a task using the input above.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {groupTasks.map((task) => (
            <TaskItem key={task.id} task={task} showGroupBadge={false} />
          ))}
        </div>
      )}
    </div>
  );
};