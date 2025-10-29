import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isTop: boolean;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'Сколько стоит электромонтаж в новостройке?',
      answer: 'Стоимость зависит от количества точек (розетки/выключатели/свет), щита, штроб и материалов. Выезд, замер и смета — бесплатно. Точную цену фиксируем в договоре после замера.',
      isTop: true
    },
    {
      id: 2,
      question: 'Какая гарантия на работы?',
      answer: 'Официально 24 месяца на все работы. При дефекте — устраним за наш счёт. Передаём договор, акт и исполнительную схему.',
      isTop: true
    },
    {
      id: 3,
      question: 'Нужно ли разрешение/согласование?',
      answer: 'Спецразрешение не требуется. Работы выполняем по ПУЭ и СТБ; для ЖЭС передаём акт и схему при необходимости.',
      isTop: true
    },
    {
      id: 4,
      question: 'Можно ли использовать свои материалы?',
      answer: 'Да, если материалы сертифицированы (ABB/Schneider/ЕКФ и т.п.). Проверим на замере, согласуем по спецификации.',
      isTop: true
    },
    {
      id: 5,
      question: 'Как проходит оплата?',
      answer: 'Оплата по факту после приёмки. Доступно: ЕРИП, карта, безнал, наличные. Без скрытых доплат.',
      isTop: false
    },
    {
      id: 6,
      question: 'Сколько времени занимает монтаж?',
      answer: 'Типовая 2-к квартира: ~5–7 дней. Дом 100 м²: ~10–14 дней. Уточняем сроки после замера и сметы.',
      isTop: false
    },
    {
      id: 7,
      question: 'Что включено в смету?',
      answer: 'Работы, кабели/автоматы/щит согласно спецификации, логистика. Доп. работы (например, штробление) — по согласованию.',
      isTop: false
    },
    {
      id: 8,
      question: 'Кто делает документы?',
      answer: 'Мы готовим договор, акт, при необходимости — исполнительную схему для ЖЭС; всё передаём заказчику.',
      isTop: false
    }
  ];

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const openChat = () => {
    const elevenLabsWidget = document.querySelector('elevenlabs-convai') as any;
    if (elevenLabsWidget) {
      const shadowRoot = elevenLabsWidget.shadowRoot;
      if (shadowRoot) {
        const button = shadowRoot.querySelector('button');
        if (button) {
          button.click();
        }
      }
    }
  };

  const visibleItems = showAll ? faqData : faqData.filter(item => item.isTop);

  return (
    <section id="faq" className="bg-white py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in" data-reveal>
          <h2 className="nk-headline text-[#1A3A63] font-bold text-3xl md:text-4xl mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-text max-w-2xl mx-auto text-center">
            От заявки до гарантии — в 1–2 шага
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2 mb-8">
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl ring-1 ring-[#1A3A63]/18 shadow-[0_6px_24px_-8px_rgba(10,20,40,0.25)] nk-hover p-4 md:p-5"
              data-reveal
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between text-left"
                aria-expanded={openItems.has(item.id)}
                aria-controls={`faq-answer-${item.id}`}
              >
                <h3 className="text-lg font-bold text-primary pr-4">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-ctaButton flex-shrink-0 transition-transform duration-300 ${
                    openItems.has(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                id={`faq-answer-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.has(item.id) ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-text leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center mb-12">
          <button
            onClick={toggleShowAll}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF7F50] text-white px-6 sm:px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 min-w-[180px] justify-center"
          >
            {showAll ? 'Свернуть' : 'Показать ещё'}
          </button>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-text mb-4">
            Не нашли ответ? Задайте вопрос — ответим за 5 минут
          </p>
          <button
            onClick={openChat}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF7F50] text-white px-6 sm:px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 min-w-[200px] justify-center"
          >
            <MessageSquare className="w-5 h-5" strokeWidth={1.75} />
            <span>Задать вопрос</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;