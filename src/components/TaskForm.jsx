import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";
import { Plus } from "lucide-react";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submit = e => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      addTask({
        id: Date.now(),
        title,
        status: "Pending"
      })
    );

    setTitle("");
  };

  return (
    <form onSubmit={submit} className="relative group">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 relative">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What needs to be done today?"
            className="w-full px-6 py-4 rounded-2xl glass
                       border-2 border-transparent
                       focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20
                       placeholder:text-slate-400 dark:placeholder:text-slate-500
                       outline-none transition-all duration-300
                       text-lg"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            ✏️
          </div>
        </div>
        
        <button
          type="submit"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r
                     from-indigo-600 to-purple-600
                     text-white font-semibold 
                     hover:shadow-xl hover:shadow-indigo-500/25
                     hover:scale-[1.03] active:scale-[0.98]
                     transition-all duration-300
                     flex items-center gap-3 group/btn"
          disabled={!title.trim()}
        >
          <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
          <span>Add Task</span>
        </button>
      </div>
      
      {/* Subtle hint */}
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 ml-2">
        Press Enter to add task
      </p>
    </form>
  );
}