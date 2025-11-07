import React from 'react';
import { Calculator, Phone } from 'lucide-react';
import { openElevenLabsWidget } from '../utils/elevenLabsWidget';

const Hero: React.FC = () => {
  const handleConsultationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openElevenLabsWidget();
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Видео демонстрация электромонтажных работ"
        >
          <source src="/Cinematic_Electrical_Installation_Sequence.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 nk-hero-overlay" role="presentation" />

        {/* Scroll Indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 md:bottom-8 z-20" aria-hidden="true">
          <div className="w-6 h-10 rounded-full border-2 border-white/70 flex items-start justify-center">
            <span className="block w-1 h-2 rounded-full bg-white/70 mt-1 animate-bounce"></span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100svh] flex items-center justify-center">
        <div className="w-full text-center animate-fade-in mt-24">
          <h1
            className="font-heading font-bold tracking-tight text-white leading-tight mb-4 text-[clamp(1.5rem,4vw,2.2rem)] md:text-[clamp(2.5rem,5vw,4rem)]"
          >
            Профессиональный монтаж электрики в новостройках
          </h1>

          <p
            className="font-sans font-normal text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed text-[clamp(0.9rem,2.5vw,1.1rem)]"
          >
            Работаем на рынке РБ 15 лет как официальная компания, а не ИП. Ответственность закреплена договором и гарантией 24 месяца. Бесплатный выезд на замер по Бресту и Брестской области
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <a
              href="#calc"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7F50] text-white font-sans font-semibold px-6 sm:px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto min-w-[240px] justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Перейти к калькулятору стоимости"
            >
              <Calculator className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" /> <span>Рассчитать стоимость</span>
            </a>

            <a
              href="#consult"
              onClick={handleConsultationClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7F50] text-white font-sans font-semibold px-6 sm:px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto min-w-[240px] justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Получить бесплатную консультацию"
            >
              <Phone className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" /> <span>Бесплатная консультация</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;