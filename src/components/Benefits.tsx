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
    <section id="benefits" className="bg-soft py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in" data-reveal>
          <h2 className="nk-headline font-heading font-bold tracking-tight text-[#1A3A63] text-3xl md:text-4xl mb-4">
            Почему нам доверяют
          </h2>
          <p className="font-sans font-normal text-gray-600 max-w-2xl mx-auto text-center">
            Честная смета, безопасность по стандартам и официальная гарантия на работы
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="bg-white rounded-2xl ring-1 ring-[#1A3A63]/18 shadow-[0_6px_24px_-8px_rgba(10,20,40,0.25)] nk-hover p-6 md:p-7"
                data-reveal
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF7F50]/10 flex items-center justify-center">
                    <IconComponent className="w-12 h-12 text-[#FF7F50]" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading font-semibold tracking-tight text-lg md:text-xl text-primary">
                    {benefit.title}
                  </h3>
                </div>
                <p className="font-sans font-normal text-sm text-text leading-relaxed">
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