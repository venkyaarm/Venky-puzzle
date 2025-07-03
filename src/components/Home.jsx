import React from 'react';
import './Home.css';
import bgVideo from '../assets/bg.mp4'; // Update path as needed
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <video className="bg-video" autoPlay muted loop>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="home-title">
        🧩 <span className="venky">@venky</span> puzzle
      </h1>

      <button className="play-btn" onClick={() => navigate('/play')}>▶️ Play Puzzle</button>
      <button className="create-btn" onClick={() => navigate('/create')}>✏️ Create Puzzle</button>
    </div>
  );
};

export default Home;
