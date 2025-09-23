import React, { useEffect, useRef } from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  address: string;
  timeline: string;
  points: number;
  gesAct: string;
  imageBefore: string;
  imageAfter: string;
}

const Portfolio: React.FC = () => {
  const portfolioData: PortfolioItem[] = [
    {
      id: 1,
      title: 'ЖК "Минск Мир"',
      address: 'ул. Дзержинского, 104',
      timeline: '5 дней',
      points: 28,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: '/after1.png',
      imageAfter: '/before1.png'
    },
    {
      id: 2,
      title: 'ЖК "Маяк Минска"',
      address: 'пр. Независимости, 177',
      timeline: '7 дней',
      points: 35,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: '/before.png',
      imageAfter: '/after.png'
    },
    {
      id: 3,
      title: 'ЖК "Брест Сити"',
      address: 'ул. Московская, 267',
      timeline: '4 дня',
      points: 22,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: '/before.png',
      imageAfter: '/after.png'
    },
    {
      id: 4,
      title: 'ЖК "Riverside"',
      address: 'ул. Притыцкого, 156',
      timeline: '6 дней',
      points: 31,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: '/before.png',
      imageAfter: '/after.png'
    },
    {
      id: 5,
      title: 'ЖК "Green City"',
      address: 'ул. Сурганова, 24',
      timeline: '8 дней',
      points: 42,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: '/before.png',
      imageAfter: '/after.png'
    },
    {
      id: 6,
      title: 'ЖК "Столичный"',
      address: 'пр. Победителей, 65',
      timeline: '6 дней',
      points: 29,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: '/before.png',
      imageAfter: '/after.png'
    }
  ];

  const sliderRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const afterWrapperRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const containerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const setupSlider = (id: number) => {
      const slider = sliderRefs.current[id];
      const afterWrapper = afterWrapperRefs.current[id];
      const container = containerRefs.current[id];

      if (!slider || !afterWrapper || !container) return;

      let isDragging = false;

      const move = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        
        const rect = container.getBoundingClientRect();
        let x = (e.type.includes('touch') ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX) - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        
        afterWrapper.style.width = x + 'px';
        slider.style.left = x + 'px';
      };

      const startDrag = () => {
        isDragging = true;
        document.addEventListener('mousemove', move);
        document.addEventListener('touchmove', move);
      };

      const stopDrag = () => {
        isDragging = false;
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
      };

      slider.addEventListener('mousedown', startDrag);
      slider.addEventListener('touchstart', startDrag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchend', stopDrag);

      return () => {
        slider.removeEventListener('mousedown', startDrag);
        slider.removeEventListener('touchstart', startDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
      };
    };

    portfolioData.forEach(item => {
      setupSlider(item.id);
    });
  }, []);

  return (
    <section id="portfolio" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-16 md:pb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Наши работы — До и После
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            Смотрите реальные примеры монтажа электрики в новостройках
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.map((item, index) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Заголовок */}
              <h3 className="text-lg md:text-xl font-bold text-primary mb-3">
                {item.title}
              </h3>

              {/* Детали проекта */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-text">
                <div>
                  <p className="font-medium">Адрес:</p>
                  <p className="text-xs">{item.address}</p>
                </div>
                <div>
                  <p className="font-medium">Сроки:</p>
                  <p className="text-xs">{item.timeline}</p>
                </div>
                <div>
                  <p className="font-medium">Точки:</p>
                  <p className="text-xs">{item.points} шт.</p>
                </div>
                <div>
                  <p className="font-medium">Статус:</p>
                  <p className="text-xs">{item.gesAct}</p>
                </div>
              </div>

              {/* Слайдер До/После */}
              <div className="mb-4">
                <div 
                  ref={el => containerRefs.current[item.id] = el}
                  className="relative w-full h-48 overflow-hidden rounded-xl bg-gray-200"
                >
                  {/* Фото ДО */}
                  <img 
                    src={item.imageBefore} 
                    alt="До" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Фото ПОСЛЕ (сверху, обрезаем ширину) */}
                  <div 
                    ref={el => afterWrapperRefs.current[item.id] = el}
                    className="absolute inset-0 overflow-hidden" 
                    style={{ width: '50%' }}
                  >
                    <img 
                      src={item.imageAfter} 
                      alt="После" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Ползунок */}
                  <div 
                    ref={el => sliderRefs.current[item.id] = el}
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize flex items-center justify-center select-none"
                    style={{ left: '50%' }}
                  >
                    <div className="w-6 h-6 bg-icon rounded-full shadow-md hover:scale-110 transition-transform"></div>
                  </div>

                  {/* Метки До/После */}
                  <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    ДО
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    ПОСЛЕ
                  </div>
                </div>
              </div>

              {/* Инструкция */}
              <p className="text-xs text-gray-500 text-center">
                Перетащите ползунок для сравнения
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Все работы выполнены с соблюдением ПУЭ и СТБ, сданы с актами в ЖЭС
          </p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;