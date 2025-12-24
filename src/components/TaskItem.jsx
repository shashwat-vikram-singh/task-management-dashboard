import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../features/tasks/tasksSlice";
import { Check, Pencil, Trash2, Save } from "lucide-react";

export default function TaskItem({ task }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(task.title);
  const dispatch = useDispatch();

  const save = () => {
    if (text.trim()) {
      dispatch(updateTask({ ...task, title: text }));
      setEdit(false);
    }
  };

  const toggleStatus = () => {
    dispatch(updateTask({
      ...task,
      status: task.status === "Pending" ? "Completed" : "Pending"
    }));
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl p-6 glass hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Status indicator dot */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-12 rounded-r-full transition-all duration-300 ${
        task.status === "Completed" 
          ? "bg-emerald-500" 
          : "bg-amber-500"
      }`} />

      <div className="relative flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Checkbox */}
        <button
          onClick={toggleStatus}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
            task.status === "Completed"
              ? "bg-emerald-500 border-emerald-500"
              : "border-slate-300 dark:border-slate-600 hover:border-indigo-400"
          }`}
        >
          {task.status === "Completed" && (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          )}
        </button>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          {edit ? (
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && save()}
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border-2 border-indigo-300 dark:border-indigo-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
            />
          ) : (
            <div className="cursor-pointer" onClick={() => setEdit(true)}>
              <p className={`text-lg leading-relaxed transition-all duration-300 ${
                task.status === "Completed" 
                  ? "line-through text-slate-400 dark:text-slate-500" 
                  : "text-slate-700 dark:text-slate-200"
              }`}>
                {task.title}
              </p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                task.status === "Completed"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
              }`}>
                {task.status}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {edit ? (
            <button
              onClick={save}
              className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-105 active:scale-95"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={() => dispatch(deleteTask(task.id))}
            className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-all duration-300 hover:scale-105 active:scale-95 group"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}