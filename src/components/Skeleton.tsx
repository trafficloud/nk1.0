import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = ''
}) => {
  const baseClasses = 'bg-gray-200 animate-pulse';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      role="status"
      aria-label="Загрузка содержимого"
    >
      <span className="sr-only">Загрузка...</span>
    </div>
  );
};

export default Skeleton;
