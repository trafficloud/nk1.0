import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    ym?: (counterId: number, action: string, url?: string, options?: Record<string, any>) => void;
  }
}

const YANDEX_METRIKA_ID = 105203719;

export const useYandexMetrika = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.ym === 'function') {
      const url = window.location.pathname + window.location.search + window.location.hash;
      window.ym(YANDEX_METRIKA_ID, 'hit', url);
    }
  }, [location]);
};
