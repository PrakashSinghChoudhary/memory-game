const Card = ({ card, gridSize, onClick, disabled }) => {
  const { icon, isFlipped, isMatched, isShaking } = card;
  const isRevealed = isFlipped || isMatched;

  // Responsive font size calculation based on grid complexity
  const fontSize =
    gridSize === 4
      ? "text-4xl sm:text-6xl"
      : gridSize === 6
        ? "text-2xl sm:text-4xl"
        : "text-lg sm:text-2xl";

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled && !isRevealed) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={isRevealed ? -1 : 0}
      aria-label={
        isRevealed
          ? `Card revealed: ${icon}`
          : "Hidden card. Press to reveal."
      }
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (!disabled && !isRevealed) {
          onClick();
        }
      }}
      className={`relative w-full aspect-square select-none card-perspective focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl group ${isRevealed ? "cursor-default" : "cursor-pointer"
        }`}
    >
      <div
        className={`card-inner w-full h-full rounded-2xl transition-all duration-500 ${isRevealed ? "is-flipped" : ""
          } ${isShaking ? "animate-card-shake" : ""} ${isMatched ? "animate-card-match" : ""
          }`}
      >
        {/* BACK FACE (Hidden state - displayed initially) */}
        <div
          className={`card-face rounded-2xl transition-all duration-300 overflow-hidden
            bg-white/80 border border-slate-200/90 shadow-sm
            dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-md
            group-hover:-translate-y-0.5 group-hover:shadow-md
            dark:group-hover:border-indigo-500/50 dark:group-hover:shadow-indigo-500/10
            group-active:scale-95`}
        >
          {/* Subtle geometric background pattern */}
          <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Shimmer / light beam on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Sleek center glyph */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border border-dashed border-slate-300 dark:border-slate-700/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 shadow-xs shadow-cyan-400/50" />
          </div>
        </div>

        {/* FRONT FACE (Revealed / Matched state) */}
        <div
          className={`card-face card-face-front rounded-2xl transition-all duration-300 shadow-md ${isMatched
              ? "bg-emerald-500/15 border-2 border-emerald-400/90 dark:border-emerald-400 text-emerald-950 dark:text-emerald-100 shadow-emerald-500/20"
              : "bg-white/95 dark:bg-slate-800/95 border-2 border-indigo-400/80 dark:border-cyan-400/80 shadow-indigo-500/15"
            }`}
        >
          {/* Matched badge icon */}
          {isMatched && (
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <svg
                className="w-2.5 h-2.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          {/* Icon with drop shadow */}
          <span
            className={`${fontSize} transform transition-transform duration-300 filter drop-shadow-md select-none`}
          >
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
