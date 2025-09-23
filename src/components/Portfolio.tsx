import React, { useState } from 'react';
import { Image, CheckCircle2 } from 'lucide-react';

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
  const [activeStates, setActiveStates] = useState<{ [key: number]: 'before' | 'after' }>({});

  const portfolioData: PortfolioItem[] = [
    {
      id: 1,
      title: 'ЖК "Минск Мир"',
      address: 'ул. Дзержинского, 104',
      timeline: '5 дней',
      points: 28,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      imageAfter: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'ЖК "Маяк Минска"',
      address: 'пр. Независимости, 177',
      timeline: '7 дней',
      points: 35,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      imageAfter: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'ЖК "Брест Сити"',
      address: 'ул. Московская, 267',
      timeline: '4 дня',
      points: 22,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: 'https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      imageAfter: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'ЖК "Riverside"',
      address: 'ул. Притыцкого, 156',
      timeline: '6 дней',
      points: 31,
      gesAct: 'Акт сдан в ЖЭС',
      imageBefore: 'https://images.pexels.com/photos/1396128/pexels-photo-1396128.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      imageAfter: 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    }
  ];

  const toggleState = (id: number) => {
    setActiveStates(prev => ({
      ...prev,
      [id]: prev[id] === 'after' ? 'before' : 'after'
    }));
  };

  const getState = (id: number): 'before' | 'after' => {
    return activeStates[id] || 'before';
  };

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

        <div className="grid gap-8 lg:grid-cols-2">
          {portfolioData.map((item, index) => {
            const currentState = getState(item.id);
            const currentImage = currentState === 'before' ? item.imageBefore : item.imageAfter;
            const CurrentIcon = currentState === 'before' ? Image : CheckCircle2;
            const iconColor = currentState === 'before' ? 'text-gray-500' : 'text-icon';
            
            return (
              <div
                key={item.id}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Заголовок */}
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                  {item.title}
                </h3>

                {/* Детали проекта */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-text">
                  <div>
                    <p className="font-medium">Адрес:</p>
                    <p>{item.address}</p>
                  </div>
                  <div>
                    <p className="font-medium">Сроки:</p>
                    <p>{item.timeline}</p>
                  </div>
                  <div>
                    <p className="font-medium">Точки:</p>
                    <p>{item.points} шт.</p>
                  </div>
                  <div>
                    <p className="font-medium">Статус:</p>
                    <p>{item.gesAct}</p>
                  </div>
                </div>

                {/* Блок изображения */}
                <div className="relative mb-4">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
                    <img
                      src={currentImage}
                      alt={`${item.title} - ${currentState === 'before' ? 'До' : 'После'}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  </div>
                  
                  {/* Индикатор состояния */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <CurrentIcon className={`w-4 h-4 ${iconColor}`} strokeWidth={1.5} />
                    <span className="text-sm font-medium text-gray-700">
                      {currentState === 'before' ? 'До' : 'После'}
                    </span>
                  </div>
                </div>

                {/* Кнопка переключения */}
                <button
                  onClick={() => toggleState(item.id)}
                  className="w-full bg-icon text-white font-medium py-3 px-6 rounded-xl 
                           hover:brightness-90 hover:scale-105 transition-all duration-200
                           flex items-center justify-center gap-2"
                >
                  <span>
                    {currentState === 'before' ? 'Показать После' : 'Показать До'}
                  </span>
                </button>
              </div>
            );
          })}
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