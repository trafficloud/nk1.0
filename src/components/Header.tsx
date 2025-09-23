import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import logoImage from '/public/68712ea0-bc68-4bc6-b983-b3985a37a71c-removebg-preview.png';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    'Главная',
    'Преимущества', 
    'Портфолио',
    'О компании',
    'Отзывы',
    'Процесс',
    'Гарантии',
    'FAQ',
    'Контакты'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white shadow-lg' 
      : 'bg-primary/50 backdrop-blur-sm'
  }`;

  const textClasses = isScrolled ? 'text-primary' : 'text-white';
  const logoClasses = `text-2xl font-tektur font-medium ${textClasses}`;

  return (
    <header className={headerClasses}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="Надежный Контакт" 
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-accent ${textClasses}`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${textClasses}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 bg-white border-t border-gray-200 shadow-lg">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-primary hover:text-accent transition-colors px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;