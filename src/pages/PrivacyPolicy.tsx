import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import FooterSection from '../components/FooterSection';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = '07.11.2025';

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Политика конфиденциальности | ОДО Брестское предприятие"
        description="Политика конфиденциальности и обработки персональных данных ОДО Брестское предприятие производственных и инжиниринговых услуг."
      />
      <Header />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Вернуться на главную
        </Link>

        <article className="prose prose-neutral max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            Политика конфиденциальности
          </h1>
          <p className="text-sm text-neutral-500 mb-8">
            Последнее обновление: {lastUpdated}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">1. Общие положения</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Настоящая Политика конфиденциальности персональных данных (далее – Политика) действует в отношении всей информации,
              которую ОДО «Брестское предприятие производственных и инжиниринговых услуг» (далее – Компания) может получить
              о пользователе во время использования им сайта Компании.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Использование сайта означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней
              условиями обработки его персональной информации. В случае несогласия с этими условиями пользователь должен
              воздержаться от использования сайта.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">2. Персональная информация пользователей</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              В рамках настоящей Политики под «персональной информацией пользователя» понимаются:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Информация, предоставленная пользователем самостоятельно при заполнении форм на сайте, включая имя, номер телефона, адрес электронной почты</li>
              <li>Данные, которые автоматически передаются в процессе использования сайта, включая IP-адрес, информацию из cookies, данные о браузере и технические характеристики оборудования</li>
              <li>Информация о взаимодействии пользователя с сайтом, включая просмотренные страницы и время пребывания</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">3. Цели сбора и обработки информации</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Компания собирает и хранит только ту персональную информацию, которая необходима для:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Предоставления услуг и выполнения заказов пользователей</li>
              <li>Связи с пользователем, включая направление уведомлений, запросов и информации, касающихся использования услуг</li>
              <li>Улучшения качества сайта, удобства его использования, разработки новых сервисов и услуг</li>
              <li>Проведения статистических и иных исследований на основе обезличенных данных</li>
              <li>Информирования пользователя об акциях, специальных предложениях и новых услугах (при наличии согласия)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">4. Условия обработки персональной информации</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Компания обрабатывает персональную информацию пользователя:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>С согласия пользователя на обработку его персональной информации</li>
              <li>В соответствии с законодательством Республики Беларусь</li>
              <li>С использованием средств автоматизации или без использования таких средств</li>
              <li>В течение срока, необходимого для достижения целей обработки, если иной срок не предусмотрен законодательством</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив
              соответствующее уведомление на адрес электронной почты: brestproing@tut.by
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">5. Защита персональной информации</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Компания принимает необходимые и достаточные организационные и технические меры для защиты персональной
              информации пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования,
              копирования, распространения, а также от иных неправомерных действий с ней третьих лиц.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Компания обеспечивает:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Шифрование данных при передаче через интернет</li>
              <li>Ограничение доступа к персональным данным только для уполномоченных сотрудников</li>
              <li>Регулярное обновление систем безопасности</li>
              <li>Проведение внутренних проверок процессов сбора, хранения и обработки данных</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">6. Передача персональной информации третьим лицам</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Компания не передает персональную информацию пользователей третьим лицам, за исключением случаев:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Когда пользователь выразил свое согласие на такие действия</li>
              <li>Когда передача необходима для использования пользователем определенного сервиса либо для выполнения определенного договора или соглашения</li>
              <li>Когда передача предусмотрена законодательством Республики Беларусь или иным применимым законодательством</li>
              <li>В случае продажи сайта к приобретателю переходят все обязательства по соблюдению условий настоящей Политики</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">7. Использование cookies</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Сайт использует cookies (небольшие текстовые файлы, размещаемые на устройстве пользователя) для:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Обеспечения функционирования сайта</li>
              <li>Улучшения качества работы сайта</li>
              <li>Сбора статистики использования сайта</li>
              <li>Запоминания предпочтений пользователя</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Пользователь может настроить свой браузер таким образом, чтобы он отклонял все cookies или уведомлял
              об их отправке. Однако в этом случае некоторые разделы и функции сайта могут работать некорректно.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">8. Права пользователя</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Пользователь имеет право:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Получать информацию, касающуюся обработки его персональных данных</li>
              <li>Требовать уточнения, блокирования или удаления своих персональных данных в случае, если они являются неполными, устаревшими, недостоверными</li>
              <li>Отзывать согласие на обработку персональных данных</li>
              <li>Обжаловать действия или бездействие Компании в уполномоченный орган по защите прав субъектов персональных данных</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Для реализации своих прав пользователь может обратиться в Компанию по адресу электронной почты: brestproing@tut.by
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">9. Изменение Политики конфиденциальности</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Компания имеет право вносить изменения в настоящую Политику конфиденциальности. При внесении изменений
              в заголовке Политики указывается дата последнего обновления. Новая редакция Политики вступает в силу
              с момента ее размещения на сайте, если иное не предусмотрено новой редакцией Политики.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Действующая редакция Политики постоянно доступна на странице по адресу:
              <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 ml-1">
                /privacy-policy
              </Link>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mt-8 mb-4">10. Контактная информация</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              По всем вопросам, касающимся настоящей Политики конфиденциальности, пользователь может обращаться:
            </p>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="text-neutral-700 mb-2">
                <strong>ОДО «Брестское предприятие производственных и инжиниринговых услуг»</strong>
              </p>
              <p className="text-neutral-700 mb-2">
                Юридический адрес: 224030, г. Брест, ул. Гоголя, 3
              </p>
              <p className="text-neutral-700 mb-2">
                УНП: 290484521
              </p>
              <p className="text-neutral-700 mb-2">
                Телефон: <a href="tel:+375162351390" className="text-blue-600 hover:text-blue-800">+375 162 35-13-90</a>,
                <a href="tel:+375162215997" className="text-blue-600 hover:text-blue-800 ml-1">+375 162 21-59-97</a>
              </p>
              <p className="text-neutral-700">
                Email: <a href="mailto:brestproing@tut.by" className="text-blue-600 hover:text-blue-800">brestproing@tut.by</a>
              </p>
            </div>
          </section>
        </article>
      </main>

      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;
