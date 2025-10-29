import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('[data-reveal]');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    const timer1 = setTimeout(observeElements, 500);
    const timer2 = setTimeout(observeElements, 1500);
    const timer3 = setTimeout(observeElements, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      const elements = document.querySelectorAll('[data-reveal]');
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};
