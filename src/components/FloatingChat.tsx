import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

const FloatingChat: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  const openChat = () => {
    // Останавливаем анимацию после первого взаимодействия
    setIsAnimating(false);
    
    // Скроллим к секции контактов
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Временная заглушка если секция контактов еще не создана
      alert('Открыть чат: подключи виджет или якорь на форму.');
    }
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Открыть онлайн-чат"
        onClick={openChat}
        onMouseEnter={stopAnimation}
        onFocus={stopAnimation}
        onTouchStart={stopAnimation}
        className={`fixed z-[60] bottom-5 right-5 md:bottom-8 md:right-8
                   h-14 w-14 md:h-16 md:w-16 rounded-full
                   shadow-lg hover:shadow-xl focus:outline-none
                   flex items-center justify-center
                   text-white transition-transform duration-200 hover:scale-105
                   ${isAnimating ? 'animate-soft-blink' : ''}`}
        style={{ background: 'var(--accent, #FF6A3D)' }}
      >
        <MessageSquare className="w-6 h-6" strokeWidth={2} />
      </button>
    </>
  );
};

export default FloatingChat;