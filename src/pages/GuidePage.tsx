import React from 'react';
import {
  FolderPlus,
  PlusCircle,
  CheckCircle2,
  Trash2,
  Navigation,
} from 'lucide-react';

export const GuidePage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Guide</h1>
        <p className="text-sm text-slate-500 mt-1">
          Simple step-by-step instructions on how to use the To-Do List application.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">1. How to Create a Task Group</h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Go to the <strong>Task Groups</strong> page using the navigation bar. Click the <strong>&quot;+ New Group&quot;</strong> button, type the group name and description, and click <strong>&quot;Save Group&quot;</strong>.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">2. How to Add a Task to a Group</h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              On the <strong>All Tasks</strong> page, enter the task description in the input box, select your preferred group from the dropdown, and click <strong>&quot;Add Task&quot;</strong>. You can also open any group directly from the <strong>Task Groups</strong> page and add tasks specifically into that group.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">3. How to Mark a Task as Done or Not Done</h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Each task card has a <strong>&quot;Mark Done&quot;</strong> button or a circular check icon. Clicking it marks the task as completed. Click <strong>&quot;Mark Not Done&quot;</strong> to change it back to pending.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">4. How to Delete a Task</h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Click the red <strong>trash icon</strong> on the right side of any task card. The task will be deleted immediately.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">5. How to Navigate Between Pages</h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Use the top navigation bar to move between <strong>Dashboard</strong>, <strong>All Tasks</strong>, <strong>Task Groups</strong>, <strong>User Guide</strong>, and <strong>Developers</strong>. All navigation happens instantly without reloading the website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};