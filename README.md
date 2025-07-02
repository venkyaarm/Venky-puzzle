# 🧩 @venky Puzzle App

Welcome to the **@venky Puzzle App** – a fun and interactive puzzle game where you can either play random puzzles with nature images (via Pexels API) or create and export your own puzzles using any image of your choice!

---

## 🌟 Features

- 🎮 **Play Puzzle**  
  - Random nature image puzzles fetched via [Pexels API](https://www.pexels.com/api/)
  - Supports 3x3, 4x4, 5x5 grid sizes
  - Touch drag support for mobile devices
  - Puzzle preview option
  - Win animation with congratulatory message and completed image preview

-✏️ **Create Puzzle**  
  - Upload your own image
  - Select grid size (2x2 to 5x5)
  - Export as standalone playable HTML file

- 💅 Attractive UI with animations and responsive design

---

## 🖼️ Screenshots

| Play Puzzle | Create Puzzle |
|-------------|---------------|
| ![Play](./screenshots/play.png) | ![Create](./screenshots/create.png) |

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/image-puzzle-app.git
cd image-puzzle-app
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start the Development Server
bash
Copy
Edit
npm run dev
4. Build for Production
bash
Copy
Edit
npm run build
🔑 Pexels API Setup
This app uses the Pexels API to fetch random images for the play mode.

Sign up and get your API key.

Replace the placeholder API key in the code:

js
Copy
Edit
const API_KEY = 'YOUR_PEXELS_API_KEY_HERE';
📁 Folder Structure
pgsql
Copy
Edit
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── PuzzleBoard.jsx
│   ├── pages/
│   │   ├── CreatePuzzle.jsx
│   │   ├── PlayPuzzle.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── README.md
├── package.json
└── vite.config.js
🛠️ Tech Stack
React.js

Vite

Pexels API

CSS (custom, no Tailwind or Bootstrap)

HTML5 drag & drop + touch support

📦 Exported Puzzle Feature
Create your own puzzle and export it as a .html file that works offline — simply upload an image, select grid size, click Export Puzzle, and share with friends.

📱 Mobile Support
The app is fully mobile responsive and supports touch drag functionality for puzzle playing. Preview and interactions work beautifully on all screen sizes.

🙌 Credits
API: Pexels

Developed by Venky K
Author: venkyaarm@gmail.com"# Venky-puzzle" 
