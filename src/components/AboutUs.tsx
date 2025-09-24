import React, { useState } from 'react';
import { Briefcase, Building, ShieldCheck, Zap, Users, Award, FileText, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

const AboutUs: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const heroStats = [
    {
      icon: Briefcase,
      number: '10+',
      title: 'лет опыта',
      description: 'в электромонтаже'
    },
    {
      icon: Building,
      number: '500+',
      title: 'объектов выполнено',
      description: 'в новостройках'
    },
    {
      icon: ShieldCheck,
      number: '24',
      title: 'месяца гарантии',
      description: 'на все работы'
    },
    {
      icon: Zap,
      number: 'ABB',
      title: 'Schneider / EKF',
      description: 'сертифицированные бренды'
    }
  ];

  const advantages = [
    {
      icon: Users,
      title: 'Работаем с частными клиентами, ЖЭС и застройщиками',
      description: 'Опыт работы с различными типами заказчиков и требованиями'
    },
    {
      icon: Award,
      title: 'Используем только сертифицированные материалы',
      description: 'Качественные компоненты от проверенных производителей'
    },
    {
      icon: ShieldCheck,
      title: 'Официальная гарантия 24 месяца',
      description: 'Полная ответственность за качество выполненных работ'
    },
    {
      icon: FileText,
      title: 'Договор, акт, исполнительная схема',
      description: 'Полный пакет документов для сдачи в ЖЭС'
    }
  ];

  const documents = [
    {
      id: 1,
      title: 'Лицензия на работу',
      preview: '/лицензия.png',
      fullImage: '/лицензия.png'
    },
    {
      id: 2,
      title: 'Сертификат соответствия СТБ',
      preview: '/sertificat.png',
      fullImage: '/sertificat.png'
    },
    {
      id: 3,
      title: 'Аттестат СМР',
      preview: '/atestat CMP.png',
      fullImage: '/atestat CMP.png'
    },
    {
      id: 4,
      title: 'Аттестат ГП',
      preview: '/attestat GP.png',
      fullImage: '/attestat GP.png'
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
    setCurrentSlide((prev) => (prev + 1) % documents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + documents.length) % documents.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const openDocument = (imageUrl: string) => {
    setSelectedDocument(imageUrl);
  };

  const closeDocument = () => {
    setSelectedDocument(null);
  };

  return (
    <section id="about" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            О компании
          </h2>
          <p className="text-text max-w-2xl mx-auto text-center">
            Мы делаем электромонтаж в новостройках безопасным, аккуратным и прозрачным
          </p>
        </div>

        {/* Block 1: Hero Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {heroStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-icon/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-icon" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-primary mb-1">
                    {stat.title}
                  </div>
                  <div className="text-sm text-text">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Block 2: Advantages Checklist */}
        <div className="mb-16">
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl bg-primary/5 p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-icon/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-icon" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-sm text-text leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Block 3: Documents Gallery */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">
            Наши документы и сертификаты
          </h3>
          
          {/* Mobile: Horizontal Scroll */}
          <div className="sm:hidden">
            <div className="relative mb-6">
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
                  {documents.map((doc, index) => (
                    <div key={doc.id} className="w-full flex-shrink-0 px-2">
                      <div
                        className="group cursor-pointer animate-zoom-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => openDocument(doc.fullImage)}
                      >
                        <div className="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={doc.preview}
                              alt={doc.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4 min-h-[56px] flex items-center justify-center">
                            <h4 className="text-sm font-medium text-text text-center">
                              {doc.title}
                            </h4>
                          </div>
                        </div>
                      </div>
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
                {documents.map((_, index) => (
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
          </div>

          {/* Desktop/Tablet: Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map((doc, index) => (
              <div
                key={doc.id}
                className="group cursor-pointer animate-zoom-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openDocument(doc.fullImage)}
              >
                <div className="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={doc.preview}
                      alt={doc.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 min-h-[56px] flex items-center justify-center">
                    <h4 className="text-sm font-medium text-text text-center">
                      {doc.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedDocument && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
              <button
                onClick={closeDocument}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedDocument}
                alt="Документ"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutUs;