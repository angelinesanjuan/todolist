import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CheckSquare, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-emerald-600 text-white'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
      isActive
        ? 'bg-emerald-600 text-white'
        : 'text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span>TaskFlow</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5">
            <NavLink to="/" end className={getNavLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/tasks" className={getNavLinkClass}>
              All Tasks
            </NavLink>
            <NavLink to="/groups" className={getNavLinkClass}>
              Task Groups
            </NavLink>
            <NavLink to="/guide" className={getNavLinkClass}>
              User Guide
            </NavLink>
            <NavLink to="/developers" className={getNavLinkClass}>
              Developers
            </NavLink>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-slate-200 px-4 py-3 space-y-1 bg-white">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={getMobileLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/tasks" onClick={() => setMenuOpen(false)} className={getMobileLinkClass}>
            All Tasks
          </NavLink>
          <NavLink to="/groups" onClick={() => setMenuOpen(false)} className={getMobileLinkClass}>
            Task Groups
          </NavLink>
          <NavLink to="/guide" onClick={() => setMenuOpen(false)} className={getMobileLinkClass}>
            User Guide
          </NavLink>
          <NavLink to="/developers" onClick={() => setMenuOpen(false)} className={getMobileLinkClass}>
            Developers
          </NavLink>
        </div>
      )}
    </nav>
  );
};