import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Zap, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Напишите адрес/площадь и что нужно сделать — подскажем сроки и стоимость.',
      role: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  };

  // Open chat
  const openChat = () => {
    setIsAnimating(false);
    setIsOpen(true);
    setShowBadge(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Close chat
  const closeChat = () => {
    setIsOpen(false);
  };

  // Send message
  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    const newMessage: Message = {
      id: Date.now(),
      text,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Auto-resize after clearing
    setTimeout(adjustTextareaHeight, 0);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: 'Спасибо! Мы ответим здесь и в Telegram, если укажете ник.',
        role: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    if (e.key === 'Escape') {
      closeChat();
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  // Stop animation on interaction
  const stopAnimation = () => {
    setIsAnimating(false);
  };

  // Track scroll position for transparency effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Open Telegram
  const openTelegram = () => {
    window.open('https://t.me/USERNAME_OF_YOUR_BOT', '_blank');
  };

  return (
    <>
      {/* Chat Button/Pill */}
      <button
        type="button"
        aria-label="Открыть онлайн-чат"
        onClick={openChat}
        onMouseEnter={stopAnimation}
        onFocus={stopAnimation}
        onTouchStart={stopAnimation}
        className={`fixed z-[60] bottom-5 right-5 md:bottom-8 md:right-8
                   w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:shadow-xl
                   flex items-center justify-center text-white
                   transition-all duration-200 hover:translate-y-[-2px]
                   ${isAnimating ? 'animate-soft-blink' : ''}`}
        style={{ 
          background: isScrolled 
            ? 'var(--accent, #FF6A3D)' 
            : 'rgba(255, 106, 61, 0.7)' 
        }}
      >
        <MessageSquare className="w-5 h-5" strokeWidth={2} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[59] bg-black/30 transition-opacity"
          onClick={closeChat}
        />
      )}

      {/* Chat Panel */}
      <aside
        className={`fixed z-[60] bottom-5 right-5 md:bottom-8 md:right-8 w-[92vw] max-w-[380px]
                   rounded-2xl border border-gray-200 bg-white shadow-2xl
                   transition-all duration-300 ${
                     isOpen 
                       ? 'translate-y-0 opacity-100 pointer-events-auto' 
                       : 'translate-y-4 opacity-0 pointer-events-none'
                   }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-icon">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2} />
            </span>
            <div>
              <div className="text-sm font-semibold text-primary">Онлайн-чат</div>
              <div className="text-xs text-text/70">Отвечаем в течение ~5 минут</div>
            </div>
          </div>
          <button 
            onClick={closeChat}
            aria-label="Закрыть чат" 
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
          </button>
        </div>

        {/* Messages Feed */}
        <div 
          ref={feedRef}
          className="px-3 py-3 h-[52vh] max-h-[420px] overflow-y-auto space-y-2"
        >
          {messages.map((message) => (
            <div 
              key={message.id}
              className={message.role === 'user' ? 'ml-auto flex gap-2 justify-end' : 'flex gap-2'}
            >
              {message.role === 'bot' && (
                <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-icon" />
              )}
              <div 
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'rounded-br-sm text-white'
                    : 'rounded-tl-sm border border-gray-200 bg-white text-text'
                }`}
                style={message.role === 'user' ? { background: 'var(--accent, #FF6A3D)' } : {}}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="px-3 pt-2 pb-3 border-t border-gray-200">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Напишите сообщение… (Enter — отправить, Shift+Enter — новая строка)"
              className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none
                       focus:border-accent transition-colors"
            />
            <button
              onClick={sendMessage}
              aria-label="Отправить"
              className="h-10 w-10 rounded-xl text-white shadow-md hover:shadow-lg transition-shadow
                       flex items-center justify-center"
              style={{ background: 'var(--accent, #FF6A3D)' }}
            >
              <Send className="w-4.5 h-4.5" strokeWidth={2} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <button 
              onClick={openTelegram}
              className="text-xs text-primary underline underline-offset-2 hover:text-accent transition-colors"
            >
              Открыть в Telegram
            </button>
            <span className="text-[11px] text-text/60">Консультация бесплатна</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FloatingChat;