# 🧠 Memory Game

A sleek, responsive, and tactile card-matching game designed to test and sharpen your visual recall. Flip cards to reveal emojis, find matching pairs, track your personal bests, and celebrate victories with custom confetti!

---

## ✨ Features

- **3 Difficulty Levels**:
  - **Casual (4 × 4)**: 8 pairs — quick & relaxing.
  - **Challenger (6 × 6)**: 18 pairs — a solid memory workout.
  - **Master (8 × 8)**: 32 pairs — the ultimate recall challenge.

- **4 Thematic Card Decks**:
  - 🚀 **Cosmic & Tech**: Space exploration, robots, and futuristic gadgets.
  - 🦊 **Fauna & Nature**: Animals, wildlife, and natural creatures.
  - 🍕 **Bites & Treats**: Tasty snacks, drinks, and desserts.
  - 🎮 **Arcade & Play**: Retro gaming, sports, and entertainment.

- **3D Card Animations**:
  - Smooth 3D flip transitions using CSS perspective transforms.
  - Shake feedback when cards don't match.
  - Pulse animations and emerald borders for successful matches.

- **Zero-Latency Web Audio**:
  - Built with the browser's **Web Audio API** synthesizer for crisp, instant audio feedback (flips, matches, mismatches, clicks, and victory fanfare).
  - Audio mute toggle with preference saved in local storage.

- **Dark & Light Themes**:
  - Seamless toggle between dark and light modes.
  - Theme preference persisted via `localStorage` with zero-flash initial loading.

- **Live Stats & Personal Bests**:
  - Real-time timer (begins automatically on your first card flip).
  - Move counter and pairs progress bar.
  - Best score tracker (fewest moves and fastest time per difficulty) saved to `localStorage`.

- **Victory Celebration & Rating**:
  - Multi-burst canvas particle confetti on game completion.
  - 1- to 3-star rating based on your move efficiency.
  - Performance breakdown showing total time, moves, and accuracy percentage.

- **Accessible & Responsive**:
  - Keyboard playable (`Enter` or `Space` to flip focused cards).
  - Fully responsive layout optimized for mobile screens, tablets, and desktop displays.

---

## 🎯 How to Play

1. **Choose Your Challenge**: Select a grid size (4×4, 6×6, or 8×8) and your favorite emoji category.
2. **Flip Cards**: Tap any face-down card to reveal its icon. The game timer begins on your first flip.
3. **Find the Match**: Flip a second card:
   - **Match**: The cards lock open in emerald green.
   - **Mismatch**: The cards briefly shake and flip back face-down.
4. **Win the Game**: Match all pairs on the board to win! Try to complete the board in the fewest moves to earn 3 stars and set a new personal record.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Audio**: Web Audio API (real-time oscillator synthesis with audio fallbacks)
- **Effects**: HTML5 Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `yarn` / `pnpm`

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/your-username/memory-game.git
   cd memory-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL shown in your terminal (typically `http://localhost:5173`).

---

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

To locally preview the production build:

```bash
npm run preview
```
