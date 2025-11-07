import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Calculator from './components/Calculator';
import SEO from './components/SEO';
import CookieBanner from './components/CookieBanner';
import Spinner from './components/Spinner';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { combineSchemas, generateLocalBusinessSchema, generateServiceSchema, generateBreadcrumbSchema, generateOrganizationSchema, generateFAQSchema, generateVideoObjectSchema } from './utils/seo';

const Portfolio = lazy(() => import('./components/Portfolio'));
const Reviews = lazy(() => import('./components/Reviews'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const FAQ = lazy(() => import('./components/FAQ'));
const FooterSection = lazy(() => import('./components/FooterSection'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#FF7F50] focus:text-white focus:rounded-lg focus:shadow-lg focus:font-semibold"
      >
        Перейти к основному содержимому
      </a>
      <SEO structuredData={structuredData} />
      <CookieBanner />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="large" color="accent" />
        </div>
      }>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main id="main-content">
                <Hero />
                <Benefits />
                <Calculator />
                <Suspense fallback={<div className="py-20 flex justify-center"><Spinner size="large" color="accent" /></div>}>
                  <Portfolio />
                  <AboutUs />
                  <Reviews />
                  <FAQ />
                  <FooterSection />
                </Suspense>
              </main>
            </>
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;