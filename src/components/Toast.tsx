import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full mx-4 sm:mx-0 p-4 border rounded-xl shadow-lg ${colors[type]} animate-slide-in-right flex items-start gap-3`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">
        {icons[type]}
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors"
        aria-label="Закрыть уведомление"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
