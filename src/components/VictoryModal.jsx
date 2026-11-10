import { useEffect } from "react";
import { IconRotate, IconStar, IconTrophy, IconClock, IconZap } from "./Icons";
import { fireConfetti } from "../utils/confetti";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const VictoryModal = ({
  moves,
  seconds,
  gridSize,
  isNewBest,
  onPlayAgain,
  onChangeDifficulty,
}) => {
  const totalPairs = (gridSize * gridSize) / 2;
  const accuracy = Math.min(100, Math.round((totalPairs / Math.max(1, moves)) * 100));

  // Determine star rating based on move efficiency
  let stars = 1;
  if (moves <= totalPairs * 1.4) {
    stars = 3;
  } else if (moves <= totalPairs * 2.1) {
    stars = 2;
  }

  useEffect(() => {
    // Launch celebratory confetti burst
    fireConfetti();
    const timer = setTimeout(() => {
      fireConfetti();
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl border text-center shadow-2xl transition-all
        bg-white/95 border-slate-200/80
        dark:bg-slate-900/95 dark:border-slate-800 dark:shadow-cyan-500/10">
        
        {/* Glow halo in dark mode */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Trophy Header */}
        <div className="relative mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 animate-bounce">
          <IconTrophy className="w-8 h-8 text-amber-950" />
        </div>

        {isNewBest && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/40 animate-pulse">
            <IconZap className="w-3.5 h-3.5 text-amber-500" />
            <span>New Personal Best!</span>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          Spectacular Job!
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">
          You conquered the {gridSize}×{gridSize} board in record form.
        </p>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`transform transition-all duration-300 ${
                starIndex <= stars
                  ? "text-amber-400 scale-110 drop-shadow-md"
                  : "text-slate-300 dark:text-slate-700"
              }`}
            >
              <IconStar className="w-8 h-8" filled={starIndex <= stars} />
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl mb-6 bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1">
              <IconClock className="w-3.5 h-3.5" />
              <span>Time</span>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-slate-800 dark:text-slate-100">
              {formatTime(seconds)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1">
              <IconRotate className="w-3.5 h-3.5" />
              <span>Moves</span>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-slate-800 dark:text-slate-100">
              {moves}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1">
              <IconZap className="w-3.5 h-3.5" />
              <span>Accuracy</span>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onPlayAgain}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 cursor-pointer
              bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 active:scale-95"
          >
            <IconRotate className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          {gridSize < 8 && (
            <button
              onClick={() => onChangeDifficulty(gridSize === 4 ? 6 : 8)}
              className="py-3 px-4 rounded-xl font-semibold text-sm border transition-all duration-200 cursor-pointer
                bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200
                dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700"
            >
              <span>{gridSize === 4 ? "Try 6×6" : "Try 8×8"} →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VictoryModal;
