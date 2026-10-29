import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

export const Footer: React.FC = () => {
  const { resetToSampleData } = useTaskContext();

  return (
    <footer className="border-t border-slate-200 bg-white mt-auto py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span className="font-semibold text-slate-700">TaskFlow</span> — DCIT 26 Laboratory 3
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-emerald-700">Dashboard</Link>
          <Link to="/tasks" className="hover:text-emerald-700">All Tasks</Link>
          <Link to="/groups" className="hover:text-emerald-700">Task Groups</Link>
          <Link to="/guide" className="hover:text-emerald-700">Guide</Link>
          <Link to="/developers" className="hover:text-emerald-700">Developers</Link>
          <button
            type="button"
            onClick={resetToSampleData}
            className="text-slate-400 hover:text-slate-600 underline cursor-pointer"
          >
            Reset Data
          </button>
        </div>
      </div>
    </footer>
  );
};