/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { TasksPage } from './pages/TasksPage.tsx';
import { GroupsPage } from './pages/GroupsPage.tsx';
import { GroupDetailPage } from './pages/GroupDetailPage.tsx';
import { GuidePage } from './pages/GuidePage.tsx';
import { DevelopersPage } from './pages/DevelopersPage.tsx';
import './App.css';

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Navbar />

          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/groups" element={<GroupsPage />} />
              <Route path="/groups/:groupId" element={<GroupDetailPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/developers" element={<DevelopersPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}