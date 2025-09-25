import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Calculator from './components/Calculator';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import FloatingChat from './components/FloatingChat';
import FooterSection from './components/FooterSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <Benefits />
            <Calculator />
            <Portfolio />
            <AboutUs />
            <Reviews />
            <FAQ />
            <FooterSection />
            <FloatingChat />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;