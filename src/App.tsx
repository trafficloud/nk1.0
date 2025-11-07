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
import CookieBanner from './components/CookieBanner';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { combineSchemas, generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema, generateOrganizationSchema, generateFAQSchema, generateVideoObjectSchema } from './utils/seo';

function App() {
  useScrollAnimation();

  const structuredData = combineSchemas(
    generateLocalBusinessSchema(),
    generateServiceSchema(),
    generateBreadcrumbSchema(),
    generateOrganizationSchema(),
    generateFAQSchema(),
    generateVideoObjectSchema()
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO structuredData={structuredData} />
      <CookieBanner />
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
    </div>
  );
}

export default App;