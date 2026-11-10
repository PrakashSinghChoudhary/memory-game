import {
  IconMoon,
  IconSun,
  IconVolume,
  IconVolumeMute,
  IconHelp,
} from "./Icons";

const Header = ({
  darkMode,
  onToggleTheme,
  isMuted,
  onToggleMute,
  onOpenRules,
}) => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-200/40 dark:border-slate-800/60 transition-colors">
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black dark:text-white">
              Memory Game
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Test your recall with visual card pairs
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMute}
          title={isMuted ? "Unmute audio" : "Mute audio"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="p-2.5 rounded-xl border transition-all duration-200 cursor-pointer
            bg-white/70 hover:bg-white text-slate-700 border-slate-200 shadow-xs hover:shadow-sm
            dark:bg-slate-900/70 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
        >
          {isMuted ? (
            <IconVolumeMute className="w-4 h-4 text-rose-500" />
          ) : (
            <IconVolume className="w-4 h-4 text-emerald-500" />
          )}
        </button>

        <button
          onClick={onToggleTheme}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
          className="p-2.5 rounded-xl border transition-all duration-200 cursor-pointer
            bg-white/70 hover:bg-white text-slate-700 border-slate-200 shadow-xs hover:shadow-sm
            dark:bg-slate-900/70 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
        >
          {darkMode ? (
            <IconSun className="w-4 h-4 text-amber-400" />
          ) : (
            <IconMoon className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        <button
          onClick={onOpenRules}
          title="How to play"
          aria-label="How to play"
          className="p-2.5 rounded-xl border transition-all duration-200 cursor-pointer
            bg-white/70 hover:bg-white text-slate-700 border-slate-200 shadow-xs hover:shadow-sm
            dark:bg-slate-900/70 dark:hover:bg-slate-800 dark:text-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
        >
          <IconHelp className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
