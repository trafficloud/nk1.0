import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <section className="border-t border-gray-200 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-semibold tracking-tight text-center text-lg text-primary">
          Реквизиты и контакты
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-16 md:grid-cols-2 text-sm leading-relaxed">
          {/* Левая колонка (для мобильных и десктопных реквизитов) */}
          <dl className="font-sans font-normal space-y-2 text-neutral-700 dark:text-neutral-300 md:text-left">
            <div className="flex gap-2 items-baseline">
              <dt className="w-28 text-neutral-500">Наименование</dt>
              <dd className="font-medium text-neutral-900 dark:text-neutral-100 flex-1">ОДО «Брестское предприятие производственных и инжиниринговых услуг»</dd>
            </div>
            <div className="flex gap-2 items-baseline">
              <dt className="w-28 text-neutral-500">УНП</dt>
              <dd className="flex-1">290484521</dd>
            </div>
            <div className="flex gap-2 items-baseline">
              <dt className="w-28 text-neutral-500">Юр. адрес</dt>
              <dd className="flex-1">224030, г.Брест, ул. Гоголя, 3</dd>
            </div>

            {/* Контакты в мобильной версии (отображаются только на мобильных, интегрированы в левую колонку) */}
            <div className="md:hidden mt-4 space-y-2">
              <div className="flex gap-2 items-baseline">
                <div className="w-28 text-neutral-500">Тел./факс:</div>
                <div className="flex-1">
                  <a className="font-medium text-neutral-900 underline-offset-2 hover:underline dark:text-neutral-100" href="tel:+375162351390">
                    35-13-90
                  </a>
                  <span className="text-neutral-500">, </span>
                  <a className="font-medium text-neutral-900 underline-offset-2 hover:underline dark:text-neutral-100" href="tel:+375162215997">
                    21-59-97
                  </a>
                </div>
              </div>
              <div className="flex gap-2 items-baseline">
                <div className="w-28 text-neutral-500">Email:</div>
                <div className="flex-1">
                  <a className="underline-offset-2 hover:underline" href="mailto:brestproing@tut.by">
                    brestproing@tut.by
                  </a>
                </div>
              </div>
            </div>
          </dl>
          {/* Правая колонка (только для десктопа) */}
          <div className="font-sans font-normal hidden md:block space-y-2 text-neutral-700 dark:text-neutral-300 text-right">
            <p>
              <span className="text-neutral-500">Тел./факс: </span>
              <a className="font-medium text-neutral-900 underline-offset-2 hover:underline dark:text-neutral-100"
                 href="tel:+375162351390">35-13-90</a>
              <span className="text-neutral-500">, </span>
              <a className="font-medium text-neutral-900 underline-offset-2 hover:underline dark:text-neutral-100"
                 href="tel:+375162215997">21-59-97</a>
            </p>
            <p>
              <span className="text-neutral-500">Email: </span>
              <a className="underline-offset-2 hover:underline" href="mailto:brestproing@tut.by">brestproing@tut.by</a>
            </p>
          </div>
        </div>

        <div className="font-sans font-normal mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400 text-center">
          <p className="mb-2">© {year} f(Am)team. Все права защищены.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/privacy-policy"
              className="underline-offset-2 hover:underline hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <span className="text-neutral-300 dark:text-neutral-600">|</span>
            <Link
              to="/terms"
              className="underline-offset-2 hover:underline hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;