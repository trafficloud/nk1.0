import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  canonicalUrl = 'https://yourdomain.com',
  ogImage = 'https://yourdomain.com/og-image.jpg',
  ogType = 'website',
  structuredData
}) => {
  return (
    <Helmet>
      <html lang="ru" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="монтаж электрики Брест, электромонтаж Беларусь, электропроводка новостройка, электрик Брест, установка розеток, электромонтажные работы, штробление стен, сборка электрощита" />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ru_BY" />
      <meta property="og:site_name" content="Надежный Контакт - Электромонтаж" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="BY-BR" />
      <meta name="geo.placename" content="Брест" />

      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' blob:; connect-src 'self' https://*.supabase.co wss://*.supabase.co; frame-src 'self'; object-src 'none';" />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
