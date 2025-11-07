import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '/public/68712ea0-bc68-4bc6-b983-b3985a37a71c-removebg-preview.png';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Главная', href: '/', isExternal: false },
    { name: 'Преимущества', href: '#benefits', isExternal: false },
    { name: 'Портфолио', href: '#portfolio', isExternal: false },
    { name: 'Отзывы', href: '#reviews', isExternal: false },
    { name: 'О компании', href: '#about', isExternal: false },
    { name: 'FAQ', href: '#faq', isExternal: false },
    { name: 'Контакты', href: '#contacts', isExternal: false }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white/95 backdrop-blur-md border-b border-gray-200'
      : 'bg-white/5 backdrop-blur-[2px] border-b border-white/10'
  }`;

  const textClasses = isScrolled ? 'text-primary' : 'text-white';

  return (
    <header className={headerClasses}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logoImage}
              alt="Надежный Контакт"
              className="h-14 w-auto object-contain transition-all duration-300"
              style={{
                filter: isScrolled
                  ? 'brightness(0) saturate(100%) invert(17%) sepia(51%) saturate(1549%) hue-rotate(188deg) brightness(93%) contrast(93%)'
                  : 'brightness(0) invert(1)'
              }}
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              item.href.startsWith('/') ? (
                <Link
                  key={index}
                  to={item.href}
                  className={`relative font-sans font-semibold text-sm px-3 py-2 rounded-full transition-all duration-300 ease-out active:scale-95 ${textClasses} group hover:bg-gray-100/70`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#FF7F50] transition-all duration-300 ease-out group-hover:w-[75%]"></span>
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className={`relative font-sans font-semibold text-sm px-3 py-2 rounded-full transition-all duration-300 ease-out active:scale-95 ${textClasses} group hover:bg-gray-100/70`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#FF7F50] transition-all duration-300 ease-out group-hover:w-[75%]"></span>
                </a>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${textClasses}`}
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 bg-white/10 backdrop-blur-md border-t border-white/10">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={index}
                    to={item.href}
                    className="relative font-sans font-semibold text-sm text-primary px-6 py-2 rounded-full transition-all duration-300 ease-out hover:bg-primary/10 active:scale-95 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#FF7F50] transition-all duration-300 ease-out group-hover:w-[75%]"></span>
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    className="relative font-sans font-semibold text-sm text-primary px-6 py-2 rounded-full transition-all duration-300 ease-out hover:bg-primary/10 active:scale-95 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#FF7F50] transition-all duration-300 ease-out group-hover:w-[75%]"></span>
                  </a>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;