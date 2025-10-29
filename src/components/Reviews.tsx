import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReviewForm from './ReviewForm';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  created_at: string;
  avatar_url?: string;
}

const Reviews: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const desktopReviewsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviewsData(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check scroll position for desktop navigation
  useEffect(() => {
    const checkScrollPosition = () => {
      const container = desktopReviewsContainerRef.current;
      if (!container || isMobile) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    const container = desktopReviewsContainerRef.current;
    if (container && !isMobile) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [isMobile]);
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

  const scrollDesktopReviews = (direction: 'left' | 'right') => {
    const container = desktopReviewsContainerRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;
    container.scrollBy({
      left: scrollAmount * (direction === 'right' ? 1 : -1),
      behavior: 'smooth'
    });
  };
  const handleLeaveReview = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    fetchReviews();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderReviewCard = (review: Review, index: number) => (
    <div
      key={review.id}
      className="bg-white rounded-2xl border-2 border-[#1A3A63]/40 shadow-[0_6px_24px_-8px_rgba(10,20,40,0.25)] nk-hover p-6 flex flex-col h-full"
      data-reveal
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-icon opacity-60" />
      </div>

      {/* Review Text */}
      <p className="text-text text-sm leading-relaxed mb-4 flex-grow">
        {review.text}
      </p>

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
        <div className="w-12 h-12 rounded-full bg-icon/20 flex items-center justify-center border-2 border-icon overflow-hidden">
          {review.avatar_url ? (
            <img
              src={review.avatar_url}
              alt={review.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = 'text-icon font-semibold text-sm';
                  span.textContent = getInitials(review.name);
                  parent.appendChild(span);
                }
              }}
            />
          ) : (
            <span className="text-icon font-semibold text-sm">
              {getInitials(review.name)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-primary text-sm">
            {review.name}
          </h4>
          <p className="text-xs text-text">
            {new Date(review.created_at).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <section id="reviews" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <ReviewForm isOpen={isFormOpen} onClose={handleCloseForm} />
      <section id="reviews" className="bg-soft py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in" data-reveal>
          <h2 className="nk-headline text-[#1A3A63] font-bold text-3xl md:text-4xl mb-4">
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
          <div className="mb-12 relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollDesktopReviews('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-primary transition-all duration-300 z-10 ${
                canScrollLeft 
                  ? 'hover:bg-gray-50 hover:shadow-lg' 
                  : 'opacity-50 cursor-not-allowed'
              } hidden sm:flex`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollDesktopReviews('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-primary transition-all duration-300 z-10 ${
                canScrollRight 
                  ? 'hover:bg-gray-50 hover:shadow-lg' 
                  : 'opacity-50 cursor-not-allowed'
              } hidden sm:flex`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={desktopReviewsContainerRef}
              className="flex gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide"
            >
              {reviewsData.map((review, index) => (
                <div 
                  key={review.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.333px)]"
                >
                  {renderReviewCard(review, index)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleLeaveReview}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF7F50] text-white px-6 sm:px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 min-w-[200px] justify-center"
          >
            Оставить отзыв
          </button>
          <p className="mt-3 text-sm text-text">
            Ваш отзыв помогает нам становиться лучше
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Reviews;