import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import VictoryModal from "./components/VictoryModal";
import RulesModal from "./components/RulesModal";
import { soundManager } from "./utils/soundEffects";
import { getDeckForTheme } from "./utils/themes";

function App() {
  // Theme state (Dark mode default for sleek look)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("memory_game_theme");
    return saved ? saved === "dark" : true;
  });

  // Sound mute state
  const [isMuted, setIsMuted] = useState(() => soundManager.isMuted());

  // Rules modal state
  const [showRules, setShowRules] = useState(false);

  // Game configuration
  const [gridSize, setGridSize] = useState(4);
  const [activeCategory, setActiveCategory] = useState("space");

  // Game state
  const [cards, setCards] = useState(() => {
    const totalPairs = (4 * 4) / 2;
    const initialDeck = getDeckForTheme("space", totalPairs);
    return initialDeck.map((c) => ({
      ...c,
      isFlipped: false,
      isMatched: false,
      isShaking: false,
    }));
  });

  const [flippedIndices, setFlippedIndices] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Victory & records state
  const [isVictory, setIsVictory] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [bestScores, setBestScores] = useState(() => {
    try {
      const saved = localStorage.getItem("memory_game_best_scores");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const mismatchTimeoutRef = useRef(null);

  // Toggle dark/light theme class on html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("memory_game_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Timer interval effect
  useEffect(() => {
    let interval = null;
    if (timerActive && !isVictory) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isVictory]);

  // Clean up any pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (mismatchTimeoutRef.current) {
        clearTimeout(mismatchTimeoutRef.current);
      }
    };
  }, []);

  // Initialize or reset game
  const initializeGame = (newSize = gridSize, newCategory = activeCategory) => {
    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }

    const totalPairs = (newSize * newSize) / 2;
    const freshDeck = getDeckForTheme(newCategory, totalPairs);

    setGridSize(newSize);
    setActiveCategory(newCategory);
    setCards(
      freshDeck.map((c) => ({
        ...c,
        isFlipped: false,
        isMatched: false,
        isShaking: false,
      }))
    );
    setFlippedIndices([]);
    setLockBoard(false);
    setMoves(0);
    setMatches(0);
    setSeconds(0);
    setTimerActive(false);
    setIsVictory(false);
    setIsNewBest(false);
  };

  // Card click handler
  const handleCardClick = (clickedIndex) => {
    if (lockBoard) return;

    const clickedCard = cards[clickedIndex];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Start timer on first move
    if (!timerActive) {
      setTimerActive(true);
    }

    soundManager.playFlip();

    // Flip the clicked card
    const updatedCards = [...cards];
    updatedCards[clickedIndex] = {
      ...clickedCard,
      isFlipped: true,
    };
    setCards(updatedCards);

    // Case 1: First card of the pair
    if (flippedIndices.length === 0) {
      setFlippedIndices([clickedIndex]);
      return;
    }

    // Case 2: Second card of the pair
    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const firstCard = updatedCards[firstIndex];
      const newMoves = moves + 1;
      setMoves(newMoves);

      // Check match
      if (firstCard.icon === clickedCard.icon) {
        // MATCH!
        soundManager.playMatch();

        const matchedCards = updatedCards.map((c, i) =>
          i === firstIndex || i === clickedIndex
            ? { ...c, isMatched: true, isFlipped: false }
            : c
        );
        setCards(matchedCards);
        setFlippedIndices([]);

        const newMatches = matches + 1;
        setMatches(newMatches);

        const totalPairs = (gridSize * gridSize) / 2;
        if (newMatches === totalPairs) {
          // Game Completed
          setTimerActive(false);
          soundManager.playWin();

          // Check Best Score record
          const currentBest = bestScores[gridSize];
          let isBest = false;
          if (
            !currentBest ||
            newMoves < currentBest.moves ||
            (newMoves === currentBest.moves && seconds < currentBest.time)
          ) {
            isBest = true;
            const updatedBest = {
              ...bestScores,
              [gridSize]: { moves: newMoves, time: seconds },
            };
            setBestScores(updatedBest);
            try {
              localStorage.setItem(
                "memory_game_best_scores",
                JSON.stringify(updatedBest)
              );
            } catch {
              // ignore
            }
          }

          setIsNewBest(isBest);
          setIsVictory(true);
        }
      } else {
        // MISMATCH!
        soundManager.playMismatch();
        setLockBoard(true);

        // Add shake animation
        const shakenCards = updatedCards.map((c, i) =>
          i === firstIndex || i === clickedIndex ? { ...c, isShaking: true } : c
        );
        setCards(shakenCards);

        // Turn back after 700ms
        mismatchTimeoutRef.current = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c, i) =>
              i === firstIndex || i === clickedIndex
                ? { ...c, isFlipped: false, isShaking: false }
                : c
            )
          );
          setFlippedIndices([]);
          setLockBoard(false);
          mismatchTimeoutRef.current = null;
        }, 700);
      }
    }
  };

  const totalPairs = (gridSize * gridSize) / 2;
  const currentBest = bestScores[gridSize] || null;

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Sleek ambient backdrop glow orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 dark:bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 dark:bg-cyan-500/15 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col flex-1">
        {/* Header Bar */}
        <Header
          darkMode={darkMode}
          onToggleTheme={() => {
            soundManager.playClick();
            setDarkMode(!darkMode);
          }}
          isMuted={isMuted}
          onToggleMute={() => {
            const next = !isMuted;
            soundManager.setMuted(next);
            setIsMuted(next);
            if (!next) {
              soundManager.playClick();
            }
          }}
          onOpenRules={() => {
            soundManager.playClick();
            setShowRules(true);
          }}
        />

        {/* Heads Up Display (HUD) */}
        <ScoreBoard
          moves={moves}
          matches={matches}
          total={totalPairs}
          seconds={seconds}
          bestScore={currentBest}
        />

        {/* Controls: Difficulty & Category & Restart */}
        <Controls
          gridSize={gridSize}
          onGridChange={(size) => {
            soundManager.playClick();
            initializeGame(size, activeCategory);
          }}
          activeCategory={activeCategory}
          onCategoryChange={(catId) => {
            soundManager.playClick();
            initializeGame(gridSize, catId);
          }}
          onReset={() => {
            soundManager.playClick();
            initializeGame(gridSize, activeCategory);
          }}
        />

        {/* The Game Board */}
        <div className="flex-1 flex items-center justify-center min-h-[360px] sm:min-h-[440px] my-3">
          <GameBoard
            cards={cards}
            gridSize={gridSize}
            onCardClick={handleCardClick}
            lockBoard={lockBoard}
          />
        </div>

        {/* Subtle Footer */}
        <footer className="pt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          Tip: Flip 2 cards to discover matching pairs · Can you beat your best time?
        </footer>
      </div>

      {/* Victory Celebration Modal */}
      {isVictory && (
        <VictoryModal
          moves={moves}
          seconds={seconds}
          gridSize={gridSize}
          isNewBest={isNewBest}
          onPlayAgain={() => {
            soundManager.playClick();
            initializeGame(gridSize, activeCategory);
          }}
          onChangeDifficulty={(nextSize) => {
            soundManager.playClick();
            initializeGame(nextSize, activeCategory);
          }}
        />
      )}

      {/* Rules Modal */}
      {showRules && (
        <RulesModal
          onClose={() => {
            soundManager.playClick();
            setShowRules(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
