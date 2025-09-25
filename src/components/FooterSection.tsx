import React from 'react';

const FooterSection: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-100 via-neutral-200 to-[#0A1F44] dark:from-neutral-900 dark:via-neutral-900 dark:to-[#0A1F44]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Реквизиты и контакты
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Левая колонка: реквизиты */}
          <div className="rounded-2xl bg-white/80 p-6 shadow-sm dark:bg-neutral-800/70">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Реквизиты компании
            </h3>
            <dl className="grid grid-cols-1 gap-y-3 text-neutral-700 dark:text-neutral-300">
              <div>
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">Наименование</dt>
                <dd className="font-medium text-neutral-900 dark:text-neutral-100">
                  ООО «ФамТим»
                </dd>
              </div>

              <div>
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">УНП</dt>
                <dd className="font-medium">123456789</dd>
              </div>

              <div>
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">Юр. адрес</dt>
                <dd className="font-medium">220000, г. Минск, ул. Примерная, д. 1, оф. 10</dd>
              </div>

              <div>
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">Банк</dt>
                <dd className="font-medium">ОАО «Банк Пример», BIC PPRBBY2X</dd>
              </div>

              <div>
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">Р/с</dt>
                <dd className="font-medium">BY00PPRB00000000000000000000</dd>
              </div>

              <div>
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">Директор</dt>
                <dd className="font-medium">Сергей Романовский, действует на основании устава</dd>
              </div>
            </dl>
          </div>

          {/* Правая колонка: контакты */}
          <div className="rounded-2xl bg-white/80 p-6 shadow-sm dark:bg-neutral-800/70">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              Контакты
            </h3>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <li>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  Телефон:
                </span>
                <a
                  className="ml-2 underline-offset-2 hover:underline"
                  href="tel:+375290000000"
                >
                  +375 (29) 000-00-00
                </a>
              </li>
              <li>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  Email:
                </span>
                <a
                  className="ml-2 underline-offset-2 hover:underline"
                  href="mailto:hello@famteam.pro"
                >
                  hello@famteam.pro
                </a>
              </li>
              <li>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  Адрес офиса:
                </span>{" "}
                Минск, ул. Примерная, 1
              </li>
              <li>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  График работы:
                </span>{" "}
                Пн–Пт 09:00–19:00, Сб 10:00–16:00
              </li>
            </ul>

            {/* Кнопки мессенджеров */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://t.me/yourusername"
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 dark:bg-white dark:text-neutral-900 transition-opacity"
              >
                Telegram
              </a>
              <a
                href="viber://chat?number=%2B375290000000"
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                Viber
              </a>
              <a
                href="https://wa.me/375290000000"
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neutral-200/30 pt-6 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-400 md:flex-row">
          <div>© {year} f(Am)team. Все права защищены.</div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="underline-offset-2 hover:underline transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/offer" className="underline-offset-2 hover:underline transition-colors">
              Публичная оферта
            </a>
            <a href="/about" className="underline-offset-2 hover:underline transition-colors">
              О компании
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;