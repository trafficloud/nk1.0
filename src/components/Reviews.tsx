import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  photo: string;
  text: string;
  badges: string[];
  rating: number;
}

const Reviews: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const reviewsData: Review[] = [
    {
      id: 1,
      name: 'Анна Петрова',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      text: 'Ребята сделали электрику в нашей двушке быстро и качественно. Все точки работают идеально, документы оформили для ЖЭС. Очень довольны результатом!',
      badges: ['Цена не выросла', 'Уложились в срок'],
      rating: 5
    },
    {
      id: 2,
      name: 'Дмитрий Козлов',
      photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      text: 'Заказывал монтаж электрики в новостройке. Мастера работали аккуратно, убирали за собой. Гарантию дали на 2 года, все документы в порядке.',
      badges: ['Работали чисто', 'Официальная гарантия'],
      rating: 5
    },
    {
      id: 3,
      name: 'Елена Сидорова',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      text: 'Отличная команда! Сделали электрику под ключ в трёхкомнатной квартире. Смета была честная, без скрытых доплат. Рекомендую!',
      badges: ['Без доплат', 'Под ключ'],
      rating: 5
    },
    {
      id: 4,
      name: 'Максим Волков',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      text: 'Обращался для монтажа электрики в студии. Ребята приехали точно в срок, работали профессионально. Все розетки и выключатели установлены идеально.',
      badges: ['Точно в срок', 'Профессионально'],
      rating: 5
    },
    {
      id: 5,
      name: 'Ольга Морозова',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      text: 'Заказывала электромонтаж в новой квартире. Мастера объяснили каждый этап работы, использовали качественные материалы. Очень довольна сервисом!',
      badges: ['Качественные материалы', 'Объяснили все'],
      rating: 5
    },
    {
      id: 6,
      name: 'Андрей Лебедев',
      photo: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      text: 'Сделали электрику в доме площадью 120 м². Работа выполнена на высшем уровне, все согласно ПУЭ. Акт приняли в ЖЭС без замечаний.',
      badges: ['По ПУЭ', 'Акт принят'],
      rating: 5
    }
  ];

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviewsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, reviewsData.length]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviewsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleLeaveReview = () => {
    window.open('https://yandex.by/maps/', '_blank');
  };

  const renderReviewCard = (review: Review, index: number) => (
    <div
      key={review.id}
      className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-icon opacity-60" />
      </div>

      {/* Review Text */}
      <p className="text-text text-sm leading-relaxed mb-4">
        {review.text}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {review.badges.map((badge, badgeIndex) => (
          <span
            key={badgeIndex}
            className="inline-block px-3 py-1 text-xs font-medium bg-accent text-white rounded-full"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(review.rating)].map((_, starIndex) => (
          <Star
            key={starIndex}
            className="w-4 h-4 text-accent fill-current"
          />
        ))}
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-icon overflow-hidden">
          <img
            src={review.photo}
            alt={review.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-primary text-sm">
            {review.name}
          </h4>
        </div>
      </div>
    </div>
  );

  return (
    <section id="reviews" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Отзывы клиентов
          </h2>
          <p className="text-text max-w-2xl mx-auto text-center">
            Нам доверяют новосёлы и застройщики
          </p>
        </div>

        {/* Reviews Grid/Slider */}
        {isMobile ? (
          /* Mobile Slider */
          <div className="relative mb-12">
            <div 
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {reviewsData.map((review, index) => (
                  <div key={review.id} className="w-full flex-shrink-0 px-2">
                    {renderReviewCard(review, index)}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-primary hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {reviewsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-icon' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop/Tablet Grid */
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {reviewsData.map((review, index) => renderReviewCard(review, index))}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleLeaveReview}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-[200px]
                       rounded-xl min-h-[48px] px-8 py-3
                       text-sm sm:text-base font-semibold
                       bg-ctaButton text-white hover:bg-accent transition-colors duration-300"
          >
            Оставить отзыв
          </button>
          <p className="mt-3 text-sm text-text">
            Ваш отзыв помогает нам становиться лучше
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;