import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#1A3A63] hover:text-[#FF7F50] transition-colors mb-8 font-sans font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Вернуться на главную
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <Cookie className="w-12 h-12 text-[#FF7F50]" strokeWidth={1.75} />
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#1A3A63]">
              Политика обработки файлов cookie
            </h1>
          </div>

          <div className="space-y-8 font-sans text-gray-700 leading-relaxed">
            <section>
              <h2 className="font-heading font-semibold text-2xl text-[#1A3A63] mb-4">
                Что такое cookies?
              </h2>
              <p className="mb-4">
                Cookies (куки) — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайтов. Они помогают сайту запомнить информацию о вашем визите, что делает ваше следующее посещение более удобным и продуктивным.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-2xl text-[#1A3A63] mb-4">
                Зачем мы используем cookies?
              </h2>
              <p className="mb-4">
                Мы используем cookies для следующих целей:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF7F50] mt-1 flex-shrink-0">•</span>
                  <span>
                    <strong className="text-[#1A3A63]">Функциональность сайта:</strong> для обеспечения корректной работы сайта и запоминания ваших предпочтений
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF7F50] mt-1 flex-shrink-0">•</span>
                  <span>
                    <strong className="text-[#1A3A63]">Аналитика:</strong> для понимания того, как посетители используют наш сайт, чтобы улучшить его работу
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF7F50] mt-1 flex-shrink-0">•</span>
                  <span>
                    <strong className="text-[#1A3A63]">Персонализация:</strong> для предоставления вам релевантной информации и услуг
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF7F50] mt-1 flex-shrink-0">•</span>
                  <span>
                    <strong className="text-[#1A3A63]">Безопасность:</strong> для защиты вашего аккаунта и персональных данных от несанкционированного доступа
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-2xl text-[#1A3A63] mb-4">
                Типы используемых cookies
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-heading font-semibold text-lg text-[#1A3A63] mb-2">
                    Обязательные cookies
                  </h3>
                  <p>
                    Эти cookies необходимы для работы сайта и не могут быть отключены. Они устанавливаются в ответ на ваши действия, такие как заполнение форм или настройка параметров конфиденциальности.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-heading font-semibold text-lg text-[#1A3A63] mb-2">
                    Аналитические cookies
                  </h3>
                  <p>
                    Эти cookies позволяют нам подсчитывать посещения и источники трафика, чтобы измерять и улучшать производительность нашего сайта. Все собранные данные являются агрегированными и анонимными.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-heading font-semibold text-lg text-[#1A3A63] mb-2">
                    Функциональные cookies
                  </h3>
                  <p>
                    Эти cookies позволяют сайту предоставлять расширенную функциональность и персонализацию. Они могут быть установлены нами или сторонними поставщиками, чьи услуги мы добавили на наши страницы.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-2xl text-[#1A3A63] mb-4">
                Как управлять cookies?
              </h2>
              <p className="mb-4">
                Вы можете контролировать и управлять cookies различными способами:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF7F50] mt-1 flex-shrink-0">•</span>
                  <span>
                    <strong className="text-[#1A3A63]">Настройки браузера:</strong> большинство браузеров позволяют вам контролировать cookies через настройки. Вы можете настроить браузер так, чтобы он блокировал все cookies или оповещал вас, когда cookies устанавливаются.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF7F50] mt-1 flex-shrink-0">•</span>
                  <span>
                    <strong className="text-[#1A3A63]">Удаление cookies:</strong> вы можете удалить cookies, которые уже находятся на вашем устройстве, через настройки браузера.
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <strong>Обратите внимание:</strong> если вы заблокируете или удалите cookies, некоторые функции нашего сайта могут работать некорректно.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-2xl text-[#1A3A63] mb-4">
                Срок действия cookies
              </h2>
              <p>
                Мы используем как сессионные cookies (которые удаляются после закрытия браузера), так и постоянные cookies (которые остаются на вашем устройстве в течение определенного периода времени или до момента их удаления).
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-2xl text-[#1A3A63] mb-4">
                Изменения в политике cookies
              </h2>
              <p>
                Мы можем периодически обновлять эту политику для отражения изменений в наших практиках или по другим операционным, юридическим или нормативным причинам. Пожалуйста, регулярно проверяйте эту страницу для получения актуальной информации.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-2xl text-[#1A3A63] mb-4">
                Контактная информация
              </h2>
              <p className="mb-4">
                Если у вас есть вопросы по поводу нашей политики использования cookies, пожалуйста, свяжитесь с нами:
              </p>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="mb-2">
                  <strong className="text-[#1A3A63]">Наименование:</strong> ОДО «Брестское предприятие производственных и инжиниринговых услуг»
                </p>
                <p className="mb-2">
                  <strong className="text-[#1A3A63]">УНП:</strong> 290484521
                </p>
                <p className="mb-2">
                  <strong className="text-[#1A3A63]">Юридический адрес:</strong> 224030, г. Брест, ул. Гоголя, 3
                </p>
                <p className="mb-2">
                  <strong className="text-[#1A3A63]">Тел./факс:</strong>{' '}
                  <a href="tel:+375162351390" className="text-[#FF7F50] hover:underline">
                    35-13-90
                  </a>
                  {', '}
                  <a href="tel:+375162215997" className="text-[#FF7F50] hover:underline">
                    21-59-97
                  </a>
                </p>
                <p>
                  <strong className="text-[#1A3A63]">Email:</strong>{' '}
                  <a href="mailto:brestproing@tut.by" className="text-[#FF7F50] hover:underline">
                    brestproing@tut.by
                  </a>
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-gray-500">
                Дата последнего обновления: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#1A3A63] hover:text-[#FF7F50] transition-colors font-sans font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
