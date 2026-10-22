const emojiSet = [
  "🍎",
  "🐶",
  "🚀",
  "🎈",
  "🏀",
  "🌟",
  "🍕",
  "🐸",
  "🎸",
  "🚲",
  "🐧",
  "🎁",
  "🧩",
  "📚",
  "🦄",
  "🍩",
  "📱",
  "🎮",
  "🍔",
  "🐱",
  "🎯",
  "🥇",
  "💡",
  "🧠",
  "🌍",
  "🎨",
  "🎵",
  "⚽",
  "🛸",
  "🍪",
  "🐼",
  "🎃",
  "🕹️",
  "🎬",
  "📷",
  "🍣",
];

const generateIcons = (count) => {
  const shuffled = [...emojiSet].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default generateIcons;
