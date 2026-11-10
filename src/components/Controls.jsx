import { DIFFICULTY_PRESETS, CARD_CATEGORIES } from "../utils/themes";
import { IconRotate } from "./Icons";

const Controls = ({
  gridSize,
  onGridChange,
  activeCategory,
  onCategoryChange,
  onReset,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 rounded-2xl border backdrop-blur-md transition-all
      bg-white/70 border-slate-200/80 shadow-xs
      dark:bg-slate-900/60 dark:border-slate-800/80 dark:shadow-slate-950/40">
      
      {/* Grid Size / Difficulty selector */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
        {DIFFICULTY_PRESETS.map((preset) => {
          const isActive = gridSize === preset.size;
          return (
            <button
              key={preset.size}
              onClick={() => onGridChange(preset.size)}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-xs scale-[1.02]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <span>{preset.label}</span>
              <span className="hidden sm:inline opacity-70 ml-1 text-[10px]">
                ({preset.name})
              </span>
            </button>
          );
        })}
      </div>

      {/* Emoji Theme Picker */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
        {Object.values(CARD_CATEGORIES).map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-700 dark:text-indigo-300 dark:bg-indigo-500/20"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Reset / Restart Game button */}
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white tracking-wide transition-all duration-200 shadow-md cursor-pointer
          bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 hover:shadow-indigo-500/25 active:scale-95"
      >
        <IconRotate className="w-4 h-4" />
        <span>New Game</span>
      </button>
    </div>
  );
};

export default Controls;
