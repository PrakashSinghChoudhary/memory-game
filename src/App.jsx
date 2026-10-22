import { useState } from "react";
import generateIcons from "./utils/generateIcons.js";
import shuffleDeck from "./utils/shuffleDeck.js";

function App() {
  const [gridSize, setGridSize] = useState(4);

  const createNewDeck = (size) => {
    const iconCount = (size * size) / 2;
    const icons = generateIcons(iconCount);
    const newDeck = [...icons, ...icons];
    return shuffleDeck(newDeck);
  };

  const [deck, setDeck] = useState(() => createNewDeck(4));
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [resetCounter, setResetCounters] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">
        Janvi's Memory Game
      </h1>
    </div>
  );
}

export default App;
