// src/components/PuzzleBoard.jsx
import React, { useEffect, useRef } from 'react';
import './PuzzleBoard.css';

const PuzzleBoard = ({ image, gridSize, onWin }) => {
  const boardRef = useRef(null);
  const positionsRef = useRef([]);

  useEffect(() => {
    const total = gridSize * gridSize;
    const positions = Array.from({ length: total }, (_, i) => i).sort(() => Math.random() - 0.5);
    positionsRef.current = positions;
    renderPuzzle(positions);
  }, [image, gridSize]);

  const renderPuzzle = (positions) => {
    const board = boardRef.current;
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    const total = gridSize * gridSize;

    positions.forEach((tileIndex, i) => {
      const piece = document.createElement('div');
      const row = Math.floor(tileIndex / gridSize);
      const col = tileIndex % gridSize;

      piece.className = 'puzzle-piece';
      piece.style.backgroundImage = `url(${image})`;
      piece.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
      piece.style.backgroundPosition = `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`;
      piece.draggable = true;

      // Desktop drag
      piece.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', i);
      });

      piece.addEventListener('drop', (e) => {
        e.preventDefault();
        const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const to = i;
        swap(from, to);
      });

      piece.addEventListener('dragover', (e) => e.preventDefault());

      // Mobile touch drag
      piece.addEventListener('touchstart', () => {
        piece.classList.add('dragging');
        piece.dataset.dragging = i;
      });

      piece.addEventListener('touchend', (e) => {
        piece.classList.remove('dragging');
        const touch = e.changedTouches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        if (el && el.classList.contains('puzzle-piece')) {
          const from = parseInt(piece.dataset.dragging, 10);
          const to = Array.from(board.children).indexOf(el);
          swap(from, to);
        }
      });

      board.appendChild(piece);
    });
  };

  const swap = (from, to) => {
    const temp = positionsRef.current[from];
    positionsRef.current[from] = positionsRef.current[to];
    positionsRef.current[to] = temp;
    renderPuzzle(positionsRef.current);
    checkWin();
  };

  const checkWin = () => {
    const isSolved = positionsRef.current.every((val, idx) => val === idx);
    if (isSolved) onWin?.();
  };

  return <div className="puzzle-container" ref={boardRef}></div>;
};

export default PuzzleBoard;
