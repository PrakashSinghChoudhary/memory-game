import Card from "./Card";

const GameBoard = ({ cards, gridSize, onCardClick, lockBoard }) => {
  // Determine optimal grid classes and sizing
  const gridClasses =
    gridSize === 4
      ? "grid-cols-4 max-w-md"
      : gridSize === 6
        ? "grid-cols-6 max-w-xl"
        : "grid-cols-8 max-w-2xl";

  const gapClasses = gridSize === 8 ? "gap-1.5 sm:gap-2" : "gap-2 sm:gap-3";

  return (
    <div className="w-full flex items-center justify-center my-auto py-2">
      <div
        className={`w-full grid ${gridClasses} ${gapClasses} transition-all duration-300`}
      >
        {cards.map((card, idx) => (
          <Card
            key={card.id}
            card={card}
            gridSize={gridSize}
            disabled={lockBoard}
            onClick={() => onCardClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
