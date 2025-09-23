import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-white font-space">
      <Header />
      <Hero />
      <Benefits />
      <Calculator />
    </div>
  );
}

export default App;