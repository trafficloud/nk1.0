import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Calculator from './components/Calculator';
import Portfolio from './components/Portfolio';
import FullPortfolioPage from './pages/FullPortfolioPage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <Benefits />
            <Portfolio />
            <Calculator />
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
  );
}

export default App;