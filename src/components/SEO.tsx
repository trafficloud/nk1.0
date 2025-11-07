import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Монтаж электрики в Беларуси | Профессиональные услуги электромонтажа в Бресте',
  description = 'Профессиональный монтаж электропроводки в новостройках Бреста и области. 15 лет на рынке РБ, гарантия 24 месяца, бесплатный замер. Лицензированная компания с сертификатами.',
  canonicalUrl = typeof window !== 'undefined' ? window.location.origin : 'https://надежныйконтакт.рф',
  ogImage = typeof window !== 'undefined' ? `${window.location.origin}/68712ea0-bc68-4bc6-b983-b3985a37a71c.png` : 'https://надежныйконтакт.рф/68712ea0-bc68-4bc6-b983-b3985a37a71c.png',
  ogType = 'website',
  structuredData
}) => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = 'ru';

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: 'монтаж электрики Брест, электромонтаж Беларусь, электропроводка новостройка, электрик Брест, установка розеток, электромонтажные работы, штробление стен, сборка электрощита' },
      { name: 'author', content: 'Надежный Контакт' },
      { name: 'revisit-after', content: '7 days' },
      { property: 'og:type', content: ogType },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Надежный Контакт - Профессиональный электромонтаж' },
      { property: 'og:locale', content: 'ru_BY' },
      { property: 'og:site_name', content: 'Надежный Контакт - Электромонтаж' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: 'Надежный Контакт - Профессиональный электромонтаж' },
      { name: 'format-detection', content: 'telephone=yes' },
      { name: 'geo.region', content: 'BY-BR' },
      { name: 'geo.placename', content: 'Брест' },
      { name: 'geo.position', content: '52.097621;23.734050' },
      { name: 'ICBM', content: '52.097621, 23.734050' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const value = name || property;
      let meta = document.querySelector(`meta[${attr}="${value}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, value!);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, canonicalUrl, ogImage, ogType, structuredData]);

  return null;
};

export default SEO;
