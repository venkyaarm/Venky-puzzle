import React, { useEffect, useState } from 'react';
import PuzzleBoard from '../components/PuzzleBoard';
import './PlayPuzzle.css';

const API_KEY = 'OXU8cwkMcaVyOXum4Y02FgiUSbnlxUKygSyerIVnK6JBU6VtwkvIoHvd';
const API_URL = 'https://api.pexels.com/v1/search?query=nature&per_page=30';

const PlayPuzzle = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [gridSize, setGridSize] = useState(3);
  const [key, setKey] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fetchRandomImage = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: API_KEY }
      });
      const data = await res.json();
      const random = data.photos[Math.floor(Math.random() * data.photos.length)];
      if (random?.src?.large2x) {
        setImageUrl(random.src.large2x);
        setKey(prev => prev + 1);
        setIsWin(false);
      }
    } catch (err) {
      console.error('Error fetching from Pexels:', err);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <div className="play-container">
      <h2 className="play-title">🎮 @venky Puzzle Arena</h2>

      <div className="play-controls">
        <label>
          Grid Size:&nbsp;
          <select
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
          >
            {[3, 4, 5].map(size => (
              <option key={size} value={size}>{size}x{size}</option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={showPreview}
            onChange={() => setShowPreview(!showPreview)}
          />&nbsp;Show Preview
        </label>

        <button onClick={fetchRandomImage}>🔁 New Puzzle</button>
      </div>

      {imageUrl && showPreview && (
        <img src={imageUrl} alt="Preview" className="preview-image" />
      )}

      {imageUrl && (
        <PuzzleBoard
          key={key}
          image={imageUrl}
          gridSize={gridSize}
          onWin={() => setIsWin(true)}
        />
      )}

      {isWin && (
        <div className="win-overlay">
          <h1>🎉 Congratulations! 🎉</h1>
          <p>You successfully completed the puzzle!</p>
          <img className="win-image" src={imageUrl} alt="Completed" />
          <button className="play-again" onClick={fetchRandomImage}>
            🔁 Play Another
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayPuzzle;
