import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreatePuzzle from './components/CreatePuzzle';
import PlayPuzzle from './components/PlayPuzzle'; // 👈 new

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePuzzle />} />
        <Route path="/play" element={<PlayPuzzle />} /> {/* 👈 add this */}
      </Routes>
    </Router>
  );
}

export default App;
