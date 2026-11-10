import { IconClock, IconRotate, IconTrophy, IconZap } from "./Icons";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const ScoreBoard = ({ moves, matches, total, seconds, bestScore }) => {
  const progressPercent = total > 0 ? Math.round((matches / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
      {/* Time Card */}
      <div className="flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-md transition-all
        bg-white/70 border-slate-200/80 shadow-xs
        dark:bg-slate-900/60 dark:border-slate-800/80 dark:shadow-slate-950/40">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400">
          <IconClock className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
            Time
          </div>
          <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100">
            {formatTime(seconds)}
          </div>
        </div>
      </div>

      {/* Moves Card */}
      <div className="flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-md transition-all
        bg-white/70 border-slate-200/80 shadow-xs
        dark:bg-slate-900/60 dark:border-slate-800/80 dark:shadow-slate-950/40">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
          <IconRotate className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
            Moves
          </div>
          <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100">
            {moves}
          </div>
        </div>
      </div>

      {/* Matches Progress Card */}
      <div className="flex flex-col justify-center p-3 rounded-2xl border backdrop-blur-md transition-all
        bg-white/70 border-slate-200/80 shadow-xs
        dark:bg-slate-900/60 dark:border-slate-800/80 dark:shadow-slate-950/40">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
            <IconZap className="w-3.5 h-3.5 text-amber-500" />
            <span>Pairs</span>
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {matches}/{total}
          </span>
        </div>
        {/* Sleek progress bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Best Score Card */}
      <div className="flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-md transition-all
        bg-white/70 border-slate-200/80 shadow-xs
        dark:bg-slate-900/60 dark:border-slate-800/80 dark:shadow-slate-950/40">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
          <IconTrophy className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
            Best
          </div>
          <div className="text-sm font-bold font-mono text-slate-800 dark:text-slate-100 truncate">
            {bestScore
              ? `${bestScore.moves}m · ${formatTime(bestScore.time)}`
              : "—"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
