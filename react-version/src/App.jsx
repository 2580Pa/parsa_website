import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Atelier from '../../src/demos/atelier/Atelier';
import './App.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Demo Gallery</h1>
      <div className="demo-grid">
        <Link to="/atelier" className="demo-card">
          <div className="demo-card-content">
            <h2>Atelier</h2>
            <p>Premium 3D fashion showcase with soft, realistic garments</p>
            <span className="demo-tag">3D • Three.js • Fashion</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atelier" element={<Atelier />} />
      </Routes>
    </Router>
  );
}

export default App;
