import React from 'react';

const FooterSection: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <section className="-mt-6 relative overflow-hidden bg-gradient-to-b from-white via-neutral-100/70 to-[#0A1F44] dark:from-neutral-900 dark:via-neutral-900/80 dark:to-[#0A1F44]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Реквизиты и контакты
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {/* Левая колонка: реквизиты (dl без коробок) */}
          <dl className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            <div className="grid grid-cols-[120px_1fr] items-baseline gap-x-4 gap-y-2">
              <dt className="text-neutral-500">Наименование</dt>
              <dd className="font-medium text-neutral-900 dark:text-neutral-100">ООО «ФамТим»</dd>

              <dt className="text-neutral-500">УНП</dt>
              <dd>123456789</dd>

              <dt className="text-neutral-500">Юр. адрес</dt>
              <dd>220000, г. Минск, ул. Примерная, д. 1, оф. 10</dd>

            </div>
          </dl>

          {/* Правая колонка: контакты (лаконично) */}
          <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            <p>
              <span className="text-neutral-500">Телефон: </span>
              <a className="font-medium text-neutral-900 underline-offset-2 hover:underline dark:text-neutral-100"
                 href="tel:+375290000000">+375 (29) 000-00-00</a>
            </p>
            <p className="mt-2">
              <span className="text-neutral-500">Email: </span>
              <a className="underline-offset-2 hover:underline" href="mailto:hello@famteam.pro">hello@famteam.pro</a>
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              <a href="https://t.me/yourusername" className="text-neutral-900 underline-offset-2 hover:underline dark:text-neutral-100">Telegram</a>
              <a href="viber://chat?number=%2B375290000000" className="underline-offset-2 hover:underline">Viber</a>
              <a href="https://wa.me/375290000000" className="underline-offset-2 hover:underline">WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Нижняя тонкая линия и копирайт (микро) */}
        <div className="mt-10 border-t border-neutral-200/40 pt-4 text-xs text-neutral-600 dark:border-neutral-700/60 dark:text-neutral-400">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <div>© {year} f(Am)team. Все права защищены.</div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
  )
}