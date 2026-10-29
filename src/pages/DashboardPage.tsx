import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  ListTodo,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

export const DashboardPage: React.FC = () => {
  const { stats } = useTaskContext();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome to your To-Do Dashboard
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
          Here is an overview of your tasks. Use the navigation buttons below or the menu above to manage your tasks and categories.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-5">
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-xs transition-colors"
          >
            <ListTodo className="w-4 h-4" />
            <span>Go to All Tasks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/groups"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-lg transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>View Task Groups</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Tasks
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tabular-nums">
              {stats.total}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <ListTodo className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Completed Tasks
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-emerald-700 mt-2 tabular-nums">
              {stats.done}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Pending Tasks
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-amber-700 mt-2 tabular-nums">
              {stats.pending}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};