import React from 'react';
import { Zap } from 'lucide-react';

interface LogoProps {
  isScrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ isScrolled }) => {
  const colorClass = isScrolled ? 'text-primary' : 'text-white';

  return (
    <div className="flex items-center gap-2">
      <Zap
        size={32}
        className={`transition-all duration-300 ${colorClass}`}
        strokeWidth={2.5}
        fill="currentColor"
      />
      <span className={`text-xl font-tektur font-bold transition-all duration-300 ${colorClass}`}>
        Надежный Контакт
      </span>
    </div>
  );
};

export default Logo;
