import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Calculator from './components/Calculator';
import Portfolio from './components/Portfolio';
import FullPortfolioPage from './pages/FullPortfolioPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-space">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <Benefits />
              <Calculator />
              <Portfolio />
            </>
          } />
          <Route path="/portfolio" element={
            <>
              <Header />
              <FullPortfolioPage />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;