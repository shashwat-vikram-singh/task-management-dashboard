import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./features/tasks/tasksSlice";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.tasks);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    const completed = items.filter(t => t.status === "Completed").length;
    const pending = items.filter(t => t.status === "Pending").length;
    const total = items.length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    setStats({
      total,
      completed,
      pending,
      completionRate
    });
  }, [items]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl dark:bg-purple-900/10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl dark:bg-indigo-900/10"></div>
      </div>

      {/* Enhanced Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/30 dark:border-slate-800/30 shadow-sm shadow-black/5 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo and App Name with Animation */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Achieve more every day
                </p>
              </div>
            </div>

            {/* Enhanced Stats Display */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Completion Rate */}
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-white">
                  {stats.completionRate}<span className="text-sm">%</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Complete</div>
                <div className="mt-2 w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${stats.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Total Tasks */}
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-white">{stats.total}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total Tasks</div>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>

              {/* Theme Toggle */}
              <div className="relative">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Right Side */}
            <div className="flex lg:hidden items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800 dark:text-white">{stats.total}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Tasks</div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Welcome Hero Section */}
        <div className="mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 mb-4">
            <span className="text-3xl">🎯</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-3">
            {stats.total === 0 ? "Ready to Conquer Your Day?" : "Today's Mission"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-lg">
            {stats.total === 0 
              ? "Start by adding your first task and watch your productivity soar!" 
              : `You're ${stats.completionRate}% done with your tasks. Keep going!`
            }
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Stats & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Card */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-xl">📊</span> Progress Overview
              </h3>
              
              {/* Completion Circle */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" 
                    className="stroke-slate-200 dark:stroke-slate-700"/>
                  <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" 
                    strokeDasharray={`${stats.completionRate * 2.83} 283`}
                    className="stroke-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-1000 ease-out"
                    strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-slate-800 dark:text-white">{stats.completionRate}%</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Complete</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.completed}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Completed</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">Pending</div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-2xl p-5 border border-indigo-200/30 dark:border-indigo-800/30">
              <h4 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-lg">💡</span> Quick Tip
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {stats.pending > 0 
                  ? "Focus on completing 3 key tasks today for maximum impact."
                  : "Great job! All tasks completed. Take a moment to celebrate!"
                }
              </p>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Task Card */}
            <div className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.002]">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-lg">+</span>
                    </div>
                    Add New Task
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Press Enter to add</span>
                </div>
                <TaskForm />
              </div>
            </div>

            {/* Task Management Card */}
            <div className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <div className="relative p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                        <span className="text-white text-lg">✓</span>
                      </div>
                      Manage Your Tasks
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-2">
                      Filter, search, and organize your workflow
                    </p>
                  </div>
                  <div className="text-sm px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {stats.completed}/{stats.total} completed
                  </div>
                </div>

                <div className="space-y-6">
                  <Filters />
                  <div className="mt-8">
                    <TaskList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    \
    </div>
  );
}