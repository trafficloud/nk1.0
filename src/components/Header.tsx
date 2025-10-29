import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white backdrop-blur shadow-sm border-b border-[rgba(26,58,99,.08)]'
      : 'bg-primary/40 backdrop-blur-md'
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
              className={`h-14 w-auto object-contain transition-all duration-300 ${
                !isScrolled ? 'brightness-0 invert' : ''
              }`}
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              item.href.startsWith('/') ? (
                <Link
                  key={index}
                  to={item.href}
                  className={`relative text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:text-white active:scale-95 ${textClasses} group`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#FF7F50] transition-all duration-300 ease-out group-hover:w-[75%]"></span>
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className={`relative text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:text-white active:scale-95 ${textClasses} group`}
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
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 bg-white border-t border-gray-200 shadow-lg">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={index}
                    to={item.href}
                    className="relative text-sm font-medium text-primary px-4 py-2 rounded-md transition-all duration-300 ease-out hover:bg-primary/10 hover:text-white hover:backdrop-blur-md active:scale-95 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#FF7F50] transition-all duration-300 ease-out group-hover:w-[75%]"></span>
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    className="relative text-sm font-medium text-primary px-4 py-2 rounded-md transition-all duration-300 ease-out hover:bg-primary/10 hover:text-white hover:backdrop-blur-md active:scale-95 group"
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