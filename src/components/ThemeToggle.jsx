import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setIsAnimating(true);
    setDark(!dark);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    
    // Add animation class to body for smooth transition
    document.body.classList.add('theme-transition');
    setTimeout(() => document.body.classList.remove('theme-transition'), 300);
  }, [dark]);

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-2xl 
                 bg-gradient-to-br from-slate-100 to-slate-200 
                 dark:from-slate-800 dark:to-slate-900
                 border border-slate-200/50 dark:border-slate-700/50
                 shadow-lg hover:shadow-xl
                 transition-all duration-500
                 hover:scale-105 active:scale-95
                 overflow-hidden group
                 ${isAnimating ? 'ring-4 ring-indigo-500/20' : ''}`}
      aria-label="Toggle theme"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
      
      {/* Icons container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun Icon */}
        <Sun className={`absolute w-5 h-5 transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
          dark 
            ? "opacity-0 rotate-90 scale-50" 
            : "opacity-100 rotate-0 scale-100"
        } text-amber-500 drop-shadow-sm`} />
        
        {/* Moon Icon */}
        <Moon className={`absolute w-5 h-5 transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
          !dark 
            ? "opacity-0 -rotate-90 scale-50" 
            : "opacity-100 rotate-0 scale-100"
        } text-indigo-400 drop-shadow-sm`} />
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 
                     bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     pointer-events-none z-50">
        {dark ? 'Switch to light' : 'Switch to dark'}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 
                       bg-slate-900 rotate-45"></div>
      </div>
    </button>
  );
}