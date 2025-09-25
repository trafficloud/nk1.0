import React from 'react';

const FooterSection: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <section className="border-t border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-primary">
          Реквизиты и контакты
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-16 md:grid-cols-2 text-sm leading-relaxed">
          {/* Левая колонка */}
          <dl className="space-y-2 text-neutral-700 dark:text-neutral-300">
            <div className="flex gap-2">
              <dt className="w-28 text-neutral-500">Наименование</dt>
              <dd className="font-medium text-neutral-900 dark:text-neutral-100">ООО «ФамТим»</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 text-neutral-500">УНП</dt>
              <dd>123456789</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-28 text-neutral-500">Юр. адрес</dt>
              <dd>220000, г. Минск, ул. Примерная, д. 1, оф. 10</dd>
            </div>
          </dl>

          {/* Правая колонка */}
          <div className="space-y-2 text-neutral-700 dark:text-neutral-300 text-right">
            <p>
              <span className="text-neutral-500">Телефон: </span>
              <a className="font-medium text-neutral-900 underline-offset-2 hover:underline dark:text-neutral-100"
                 href="tel:+375290000000">+375 (29) 000-00-00</a>
            </p>
            <p>
              <span className="text-neutral-500">Email: </span>
              <a className="underline-offset-2 hover:underline" href="mailto:hello@famteam.pro">hello@famteam.pro</a>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400 text-center">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <div>© {year} f(Am)team. Все права защищены.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;