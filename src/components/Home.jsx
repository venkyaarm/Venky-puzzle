import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Main background video (optional, if you already have) */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="home-card">
        {/* Card background video */}
        <video className="card-bg-video" autoPlay loop muted playsInline>
          <source src="/card-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
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
