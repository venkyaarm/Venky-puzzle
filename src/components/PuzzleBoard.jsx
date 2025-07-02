import React, { useEffect, useState } from 'react';
import './PuzzleBoard.css';

const PuzzleBoard = ({ image, gridSize, onWin }) => {
  const [tiles, setTiles] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const total = gridSize * gridSize;
    const indices = Array.from({ length: total }, (_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    setTiles(shuffled);
  }, [image, gridSize]);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.setData('dragIndex', index);
  };

  const handleDrop = (e, index) => {
    const fromIndex = draggedIndex ?? parseInt(e.dataTransfer.getData('dragIndex'), 10);
    swapTiles(fromIndex, index);
  };

  const handleTouchStart = (index) => {
    setDraggedIndex(index);
  };

  const handleTouchEnd = (index) => {
    if (draggedIndex !== null) {
      swapTiles(draggedIndex, index);
      setDraggedIndex(null);
    }
  };

  const swapTiles = (from, to) => {
    const newTiles = [...tiles];
    [newTiles[from], newTiles[to]] = [newTiles[to], newTiles[from]];
    setTiles(newTiles);

    // ✅ WIN CHECK
    const isComplete = newTiles.every((val, i) => val === i);
    if (isComplete && onWin) {
      onWin();
    }
  };

  return (
    <div
      className="puzzle-container"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`
      }}
    >
      {tiles.map((tileIndex, i) => {
        const row = Math.floor(tileIndex / gridSize);
        const col = tileIndex % gridSize;

        return (
          <div
            key={i}
            className="puzzle-piece"
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
            onTouchStart={() => handleTouchStart(i)}
            onTouchEnd={() => handleTouchEnd(i)}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
              backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default PuzzleBoard;
