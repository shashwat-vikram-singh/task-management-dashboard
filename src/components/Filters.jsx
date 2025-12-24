import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearch } from "../features/tasks/tasksSlice";
import { Search } from "lucide-react";

export default function Filters() {
  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.tasks);

  const filters = [
    { key: "All", emoji: "📋" },
    { key: "Pending", emoji: "⏳" },
    { key: "Completed", emoji: "✅" }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center">
      <div className="flex flex-wrap gap-2">
        {filters.map(({ key, emoji }) => (
          <button
            key={key}
            onClick={() => dispatch(setFilter(key))}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium
                       flex items-center gap-2 transition-all duration-300
                       ${filter === key
                         ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25"
                         : "glass hover:bg-white/90 dark:hover:bg-slate-800/90"
                       }`}
          >
            <span>{emoji}</span>
            {key}
          </button>
        ))}
      </div>

      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          placeholder="Search tasks..."
          onChange={e => dispatch(setSearch(e.target.value))}
          className="w-full pl-12 pr-4 py-2.5 rounded-xl glass
                     border border-transparent
                     focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20
                     outline-none transition-all duration-300"
        />
      </div>
    </div>
  );
}