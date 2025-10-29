import React from 'react';
import { Calculator, Phone } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/после copy.png')`
          }}
        />
        <div className="absolute inset-0 bg-[rgba(26,58,99,0.3)]" />
        
        {/* Scroll Indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 md:bottom-8 z-20">
          <div className="w-6 h-10 rounded-full border-2 border-white/70 flex items-start justify-center">
            <span className="block w-1 h-2 rounded-full bg-white/70 mt-1 animate-bounce"></span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100svh] flex items-center justify-center">
        <div className="w-full text-center animate-fade-in">
          <h1 
            className="font-bold text-white leading-tight mb-4 text-[clamp(1.5rem,4vw,2.2rem)] md:text-[clamp(2.5rem,5vw,4rem)]"
          >
            Профессиональный монтаж электрики в новостройках
          </h1>
          
          <p
            className="text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed text-[clamp(0.9rem,2.5vw,1.1rem)]"
          >
            ⚡ Работаем как <span className="font-semibold text-white">ООО «Надежный Контакт»</span> — официальная компания, а не ИП. Ответственность закреплена договором и гарантией 24 месяца.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-slide-up">
            <a
              href="#calc"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-[240px]
                         rounded-xl min-h-[48px] px-8 py-3
                         text-sm sm:text-base font-semibold
                         bg-[#FF7F50] text-white hover:brightness-110 transition"
            >
              <Calculator className="w-5 h-5" /> <span>Рассчитать стоимость</span>
            </a>

            <a
              href="#consult"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-[240px]
                         rounded-xl min-h-[48px] px-8 py-3
                         text-sm sm:text-base font-semibold
                         border border-white text-white hover:bg-white/10 transition"
            >
              <Phone className="w-5 h-5" /> <span>Бесплатная консультация</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;