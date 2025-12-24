import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { ClipboardList } from "lucide-react";

export default function TaskList() {
  const { items, filter, search } = useSelector(state => state.tasks);

  const filtered = items.filter(t => {
    const f = filter === "All" || t.status === filter;
    const s = t.title.toLowerCase().includes(search.toLowerCase());
    return f && s;
  });

  if (!filtered.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center">
            <ClipboardList className="w-12 h-12 text-slate-400" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            {items.length === 0 ? "No tasks yet" : "No tasks found"}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm">
            {items.length === 0 
              ? "Get started by adding your first task above!" 
              : "Try changing your filters or search term"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-2 mb-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-indigo-600 dark:text-indigo-400">{filtered.length}</span> task{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>
      {filtered.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}