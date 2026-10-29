import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Layers, Trash2 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

export const GroupsPage: React.FC = () => {
  const { groups, tasks, addGroup, deleteGroup } = useTaskContext();
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    addGroup(newGroupName, newGroupDesc || 'Custom task group');
    setNewGroupName('');
    setNewGroupDesc('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Groups</h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize tasks by categories. Click any group to view only its tasks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel' : 'New Group'}</span>
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3"
        >
          <h3 className="text-sm font-bold text-slate-900">Create a New Category</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Group name (e.g. Exams, Chores, Coding)..."
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900"
            />
            <input
              type="text"
              value={newGroupDesc}
              onChange={(e) => setNewGroupDesc(e.target.value)}
              placeholder="Short description (optional)..."
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer whitespace-nowrap"
            >
              Save Group
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {groups.map((group) => {
          const groupTasks = tasks.filter((t) => t.groupId === group.id);
          const done = groupTasks.filter((t) => t.status === 'done').length;
          const pending = groupTasks.length - done;

          return (
            <div
              key={group.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-bold text-slate-900">{group.name}</h2>
                  </div>

                  {groups.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteGroup(group.id)}
                      className="text-slate-300 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete category"
                      aria-label="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-2">{group.description}</p>

                <div className="mt-4 flex items-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="text-emerald-700 font-semibold">{done} Done</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-amber-700 font-semibold">{pending} Pending</span>
                  <span className="text-slate-300">·</span>
                  <span>{groupTasks.length} Total</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                <Link
                  to={`/groups/${group.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  <span>View Group Tasks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};