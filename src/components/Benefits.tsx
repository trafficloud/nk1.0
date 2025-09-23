import React from 'react';
import { FileText, Shield, Award, Receipt } from 'lucide-react';

const iconMap = {
  invoice: Receipt,
  shield: Shield,
  certificate: Award
};

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: 'invoice',
      title: 'Без скрытых платежей',
      text: 'Прозрачная смета: все работы и материалы прописаны заранее. Цена фиксируется в договоре.'
    },
    {
      icon: 'shield',
      title: 'Безопасность и качество',
      text: 'Работаем по ПУЭ и СТБ, используем только сертифицированные материалы.'
    },
    {
      icon: 'certificate',
      title: 'Официальная гарантия',
      text: '24 месяца на все работы, подтверждено договором и актами.'
    }
  ];

  return (
    <section id="benefits" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Почему нам доверяют
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            Честная смета, безопасность по стандартам и официальная гарантия на работы
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-icon/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-icon" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg md:text-xl text-primary font-semibold">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-sm text-text leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Benefits;