// src/components/CreatePuzzle.jsx
import React, { useState } from 'react';
import PuzzleBoard from './PuzzleBoard';
import './CreatePuzzle.css';

const CreatePuzzle = () => {
  const [image, setImage] = useState(null);
  const [gridSize, setGridSize] = useState(3);
  const [imageData, setImageData] = useState('');

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImageData(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleExport = () => {
  const totalTiles = gridSize * gridSize;
  const shuffledIndices = Array.from({ length: totalTiles }, (_, i) => i).sort(() => Math.random() - 0.5);

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exported Puzzle</title>
  <style>
    body { font-family: sans-serif; text-align: center; background: linear-gradient(to right, #ffecd2, #fcb69f); margin: 0; padding: 20px; }
    h2 { font-size: 32px; color: #2c3e50; }
    .puzzle-container { display: flex; flex-wrap: wrap; margin: 0 auto; width: 90vmin; height: 90vmin; max-width: 500px; max-height: 500px; border: 3px solid #333; touch-action: none; }
    .puzzle-piece { box-sizing: border-box; border: 1px solid white; background-image: url(${imageData}); background-size: ${gridSize * 100}% ${gridSize * 100}%; background-repeat: no-repeat; flex: 1 0 calc(100% / ${gridSize}); aspect-ratio: 1 / 1; touch-action: none; }
    #congrats { font-size: 24px; color: green; font-weight: bold; margin-top: 20px; display: none; animation: fadeIn 1s ease forwards; }
    @keyframes fadeIn { from {opacity: 0;} to {opacity: 1;} }
  </style></head><body>

  <h2>🧩 Your Puzzle</h2>
  <div class="puzzle-container" id="puzzle">
    ${shuffledIndices.map((tileIndex, i) => {
      const row = Math.floor(tileIndex / gridSize);
      const col = tileIndex % gridSize;
      return `<div class="puzzle-piece" data-index="${tileIndex}" draggable="true" style="background-position: ${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%"></div>`;
    }).join('')}
  </div>

  <div id="congrats">🎉 Congratulations! You solved the puzzle! 🎉</div>

  <script>
    const container = document.getElementById('puzzle');
    let dragged = null;

    function checkWin() {
      const pieces = Array.from(container.children);
      const isSolved = pieces.every((el, i) => Number(el.dataset.index) === i);
      if (isSolved) {
        document.getElementById('congrats').style.display = 'block';
      }
    }

    // Drag events
    container.addEventListener('dragstart', e => dragged = e.target);
    container.addEventListener('dragover', e => e.preventDefault());
    container.addEventListener('drop', e => {
      e.preventDefault();
      if (e.target.classList.contains('puzzle-piece')) {
        container.insertBefore(dragged, e.target);
        checkWin();
      }
    });

    // Touch events
    let touchDragEl = null;
    container.addEventListener('touchstart', e => {
      const target = e.target;
      if (target.classList.contains('puzzle-piece')) {
        touchDragEl = target;
      }
    });

    container.addEventListener('touchend', e => {
      const touch = e.changedTouches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el && el.classList.contains('puzzle-piece') && el !== touchDragEl) {
        const all = Array.from(container.children);
        const from = all.indexOf(touchDragEl);
        const to = all.indexOf(el);
        if (from !== -1 && to !== -1) {
          if (from < to) {
            container.insertBefore(touchDragEl, el.nextSibling);
          } else {
            container.insertBefore(touchDragEl, el);
          }
          checkWin();
        }
      }
      touchDragEl = null;
    });
  </script>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-puzzle.html';
  a.click();
  URL.revokeObjectURL(url);
};


  return (
    <div className="create-container">
      <div className="create-box">
        <h2 className="create-title">🎨 Create Your Puzzle</h2>
        <input type="file" accept="image/*" onChange={handleUpload} className="upload-input" />

        <div className="dropdown">
          <label>Grid Size:</label>
          <select value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))}>
            {[2, 3, 4, 5].map(size => (
              <option key={size} value={size}>{size}x{size}</option>
            ))}
          </select>
        </div>

        {image && (
          <>
            <div className="preview">
              <PuzzleBoard image={image} gridSize={gridSize} />
            </div>
            <button className="export-btn" onClick={handleExport}>📤 Export Puzzle </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePuzzle;
