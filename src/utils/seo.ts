interface Review {
  rating: number;
  created_at: string;
}

export const generateLocalBusinessSchema = (reviewsData?: Review[]) => {
  const averageRating = reviewsData && reviewsData.length > 0
    ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
    : 5;

  const reviewCount = reviewsData?.length || 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://yourdomain.com/#business',
    name: 'ОДО «Брестское предприятие производственных и инжиниринговых услуг»',
    alternateName: 'Надежный Контакт',
    description: 'Профессиональный монтаж электропроводки в новостройках. 15 лет опыта, сертифицированные материалы, гарантия 24 месяца.',
    url: 'https://yourdomain.com',
    telephone: '+375-29-000-00-00',
    email: 'hello@famteam.pro',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Гоголя',
      addressLocality: 'Брест',
      postalCode: '224030',
      addressCountry: 'BY'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.0975,
      longitude: 23.7340
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    priceRange: '$$',
    image: 'https://yourdomain.com/68712ea0-bc68-4bc6-b983-b3985a37a71c.png',
    logo: 'https://yourdomain.com/68712ea0-bc68-4bc6-b983-b3985a37a71c-removebg-preview.png',
    sameAs: [
      'https://www.facebook.com/yourpage',
      'https://www.instagram.com/yourpage'
    ],
    aggregateRating: reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviewCount,
      bestRating: '5',
      worstRating: '1'
    } : undefined
  };
};

export const generateServiceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://yourdomain.com/#service',
    serviceType: 'Электромонтажные работы',
    provider: {
      '@id': 'https://yourdomain.com/#business'
    },
    areaServed: {
      '@type': 'City',
      name: 'Брест',
      '@id': 'https://www.wikidata.org/wiki/Q181055'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги электромонтажа',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Монтаж электропроводки в новостройках',
            description: 'Полный комплекс работ по электромонтажу в новых квартирах и домах'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Сборка и установка электрощитов',
            description: 'Профессиональная сборка распределительных щитов с УЗО и автоматами'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Штробление стен под проводку',
            description: 'Штробление кирпича, бетона, газосиликатных блоков'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Установка розеток и выключателей',
            description: 'Монтаж электроустановочных изделий любых брендов'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Монтаж освещения',
            description: 'Установка светильников, люстр, светодиодной подсветки'
          }
        }
      ]
    }
  };
};

export const generateBreadcrumbSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: 'https://yourdomain.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Услуги',
        item: 'https://yourdomain.com#benefits'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Калькулятор',
        item: 'https://yourdomain.com#calc'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Отзывы',
        item: 'https://yourdomain.com#reviews'
      }
    ]
  };
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://yourdomain.com/#organization',
    name: 'ОДО «Брестское предприятие производственных и инжиниринговых услуг»',
    legalName: 'ОДО «Брестское предприятие производственных и инжиниринговых услуг»',
    url: 'https://yourdomain.com',
    logo: 'https://yourdomain.com/68712ea0-bc68-4bc6-b983-b3985a37a71c-removebg-preview.png',
    foundingDate: '2009',
    taxID: '290484521',
    telephone: '+375-29-000-00-00',
    email: 'hello@famteam.pro',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Гоголя',
      addressLocality: 'Брест',
      postalCode: '224030',
      addressCountry: 'BY'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+375-29-000-00-00',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'Belarusian'],
      areaServed: 'BY'
    }
  };
};

export const combineSchemas = (...schemas: object[]) => {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  };
};
