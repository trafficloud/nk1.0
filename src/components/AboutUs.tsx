import React, { useState } from 'react';
import { Briefcase, Building, ShieldCheck, Zap, Users, Award, FileText, CheckCircle, X } from 'lucide-react';

const AboutUs: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

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
      preview: '/сертификат исо.png',
      fullImage: '/сертификат исо.png'
    },
    {
      id: 3,
      title: 'Допуск СРО',
      preview: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      fullImage: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 4,
      title: 'Страховой полис',
      preview: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      fullImage: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    }
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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