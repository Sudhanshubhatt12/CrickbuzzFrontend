import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Teams from './pages/Teams';
import MatchDetails from './pages/MatchDetails';
import TeamDetails from './pages/TeamDetails';
import PlayerDetails from './pages/PlayerDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches/:id" element={<MatchDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/players/:id" element={<PlayerDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
