import { IconClose, IconSparkles } from "./Icons";

const RulesModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl border shadow-2xl transition-all
        bg-white/95 border-slate-200/80
        dark:bg-slate-900/95 dark:border-slate-800 dark:shadow-cyan-500/10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close rules"
          className="absolute top-5 right-5 p-2 rounded-xl border text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <IconClose className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
            <IconSparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Game Guide
          </h2>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <p>
              Tap any face-down card to reveal its icon. The game timer begins on your first flip.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <p>
              Flip a second card. If they match, they stay locked in emerald green. If not, they smoothly turn back.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <p>
              Aim for a 3-star rating by matching all pairs in minimal moves and time!
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white shadow-md transition-all cursor-pointer
              bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:brightness-110 active:scale-95"
          >
            Got it, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
