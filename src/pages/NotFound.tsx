import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <AlertCircle
              className="w-32 h-32 text-[#FF7F50] opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              strokeWidth={1}
            />
            <h1 className="font-heading font-bold text-9xl text-[#1A3A63] relative z-10">
              404
            </h1>
          </div>
        </div>

        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1A3A63] mb-4">
          Страница не найдена
        </h2>

        <p className="font-sans text-lg text-gray-600 mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена.
          Возможно, вы перешли по устаревшей ссылке или ошиблись в адресе.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1A3A63] text-white font-sans font-semibold px-8 py-3.5 rounded-2xl hover:bg-[#1A3A63]/90 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#1A3A63] focus:ring-offset-2"
          >
            <Home className="w-5 h-5" strokeWidth={1.75} />
            На главную страницу
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white text-[#1A3A63] font-sans font-semibold px-8 py-3.5 rounded-2xl border-2 border-gray-300 hover:border-[#1A3A63] hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A3A63] focus:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
            Вернуться назад
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="font-sans text-sm text-gray-500 mb-4">
            Нужна помощь? Свяжитесь с нами:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <a
              href="tel:+375162351390"
              className="text-[#FF7F50] hover:underline font-medium"
            >
              Тел: 35-13-90
            </a>
            <span className="hidden sm:inline text-gray-300">|</span>
            <a
              href="mailto:brestproing@tut.by"
              className="text-[#FF7F50] hover:underline font-medium"
            >
              Email: brestproing@tut.by
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
