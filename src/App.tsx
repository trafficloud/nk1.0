import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Calculator from './components/Calculator';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <div className="min-h-screen bg-white font-space">
      <Header />
      <Hero />
      <Benefits />
      <Calculator />
      <Portfolio />
    </div>
  );
}

export default App;