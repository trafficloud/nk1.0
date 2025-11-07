import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = async () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());

    try {
      await supabase.from('cookie_consents').insert({
        consent_type: 'accepted',
        user_agent: navigator.userAgent,
        consent_date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving consent:', error);
    }

    setIsVisible(false);
    document.body.style.overflow = '';
  };

  const handleDecline = async () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());

    try {
      await supabase.from('cookie_consents').insert({
        consent_type: 'declined',
        user_agent: navigator.userAgent,
        consent_date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving consent:', error);
    }

    setIsVisible(false);
    document.body.style.overflow = '';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 p-8 md:p-10 animate-zoom-in"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-modal="true"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            <Cookie
              className="w-14 h-14 text-[#FF7F50]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </div>

          <div className="flex-1">
            <h2
              id="cookie-banner-title"
              className="font-heading font-bold text-2xl md:text-3xl text-[#1A3A63] mb-4"
            >
              Зачем вам принимать cookies?
            </h2>

            <p className="font-sans text-gray-600 mb-4 leading-relaxed">
              Они помогают:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#FF7F50] mt-1 flex-shrink-0">—</span>
                <span className="font-sans text-gray-700">
                  Быстрее найти нужный продукт, сервис или отделение банка на сайте
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF7F50] mt-1 flex-shrink-0">—</span>
                <span className="font-sans text-gray-700">
                  Выявлять и устранять проблемы в работе сайта
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF7F50] mt-1 flex-shrink-0">—</span>
                <span className="font-sans text-gray-700">
                  Защищать ваши персональные данные
                </span>
              </li>
            </ul>

            <p className="font-sans text-sm text-gray-600">
              Подробную информацию вы найдете в{' '}
              <Link
                to="/cookie-policy"
                className="text-[#FF7F50] underline hover:text-[#FF5722] transition-colors"
                onClick={() => {
                  setIsVisible(false);
                  document.body.style.overflow = '';
                }}
              >
                Политике обработки файлов cookie
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleAccept}
            className="flex-1 bg-[#1A3A63] text-white font-sans font-semibold px-8 py-3.5 rounded-2xl hover:bg-[#1A3A63]/90 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#1A3A63] focus:ring-offset-2"
            aria-label="Принять использование cookies"
          >
            Принять
          </button>

          <button
            onClick={handleDecline}
            className="flex-1 bg-white text-[#1A3A63] font-sans font-semibold px-8 py-3.5 rounded-2xl border-2 border-gray-300 hover:border-[#1A3A63] hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A3A63] focus:ring-offset-2"
            aria-label="Отклонить использование cookies"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
