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
import FooterSection from './components/FooterSection';
import SEO from './components/SEO';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { combineSchemas, generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema, generateOrganizationSchema } from './utils/seo';

function App() {
  useScrollAnimation();

  const structuredData = combineSchemas(
    generateLocalBusinessSchema(),
    generateServiceSchema(),
    generateBreadcrumbSchema(),
    generateOrganizationSchema()
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO structuredData={structuredData} />
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
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;