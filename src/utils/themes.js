export const CARD_CATEGORIES = {
  space: {
    id: "space",
    name: "Cosmic & Tech",
    icon: "🚀",
    emojis: [
      "🚀", "🛸", "🪐", "🤖", "💻", "🛰️", "⚡", "🔭", 
      "👾", "🌌", "🔮", "📡", "🔋", "🧪", "🧬", "🕹️", 
      "💡", "🛡️", "☄️", "🌑", "💫", "🔬", "📡", "🥽",
      "🛰️", "⚙️", "🔌", "💥", "🧲", "⚛️", "📡", "🛸"
    ],
  },
  animals: {
    id: "animals",
    name: "Fauna & Nature",
    icon: "🦊",
    emojis: [
      "🦊", "🐼", "🦁", "🐨", "🦄", "🐸", "🐧", "🐙",
      "🦋", "🐢", "🦉", "🐬", "🐝", "🐰", "🦩", "🦔",
      "🐯", "🐵", "🦒", "🦓", "🦘", "🦚", "🦦", "🦈",
      "🐳", "🐺", "🦜", "🦥", "🐘", "🐆", "🐿️", "🦝"
    ],
  },
  food: {
    id: "food",
    name: "Bites & Treats",
    icon: "🍕",
    emojis: [
      "🍕", "🍔", "🌮", "🍣", "🍩", "🥑", "🍓", "🍦",
      "🥐", "🍜", "🍿", "🍪", "🍇", "🥞", "🧁", "🍫",
      "🍉", "🥨", "🍒", "🥝", "🥟", "🍧", "🥪", "🍳",
      "🍍", "🍑", "🍋", "🥭", "🥧", "🧀", "🌭", "🧇"
    ],
  },
  gaming: {
    id: "gaming",
    name: "Arcade & Play",
    icon: "🎮",
    emojis: [
      "🎮", "🕹️", "🎲", "🏆", "🎯", "👾", "💎", "⚔️",
      "🛡️", "🪙", "👑", "🧩", "🎪", "🎳", "🥊", "🥇",
      "🎭", "🎨", "🎪", "🃏", "🪄", "🔮", "🏹", "🏎️",
      "🏎️", "🛹", "⛸️", "⛳", "🧗", "🏂", "🏆", "🌟"
    ],
  },
};

export const DIFFICULTY_PRESETS = [
  { size: 4, label: "4 × 4", name: "Casual", pairs: 8, gridCols: "grid-cols-4" },
  { size: 6, label: "6 × 6", name: "Challenger", pairs: 18, gridCols: "grid-cols-6" },
  { size: 8, label: "8 × 8", name: "Master", pairs: 32, gridCols: "grid-cols-8" },
];

export function getDeckForTheme(categoryKey, count) {
  const category = CARD_CATEGORIES[categoryKey] || CARD_CATEGORIES.space;
  const uniquePool = [...new Set(category.emojis)];
  
  // Shuffle pool to pick random items each time
  const shuffledPool = [...uniquePool].sort(() => 0.5 - Math.random());
  const selected = shuffledPool.slice(0, count);

  // If count exceeds pool, fill with fallback
  while (selected.length < count) {
    selected.push("⭐");
  }

  // Duplicate for pairs and shuffle
  const deck = [...selected, ...selected];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck.map((icon, idx) => ({
    id: `${idx}-${icon}-${Math.random().toString(36).slice(2, 7)}`,
    icon,
  }));
}
