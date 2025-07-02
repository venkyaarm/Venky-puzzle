import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1 className="home-title">
          🧩 <span className="venky">@venky</span> puzzle
        </h1>
        <button className="play-btn" onClick={() => navigate('/play')}>
          ▶️ Play Puzzle
        </button>
        <button className="create-btn" onClick={() => navigate('/create')}>
          ✏️ Create Puzzle
        </button>
      </div>
    </div>
  );
};

export default Home;
