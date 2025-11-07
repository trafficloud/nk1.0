import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'accent' | 'white';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'accent',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-6 h-6 border-2',
    large: 'w-10 h-10 border-3'
  };

  const colorClasses = {
    primary: 'border-[#1A3A63] border-t-transparent',
    accent: 'border-[#FF7F50] border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Загрузка"
    >
      <span className="sr-only">Загрузка...</span>
    </div>
  );
};

export default Spinner;
