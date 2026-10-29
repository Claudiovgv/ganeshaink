import type { Metadata } from 'next';

export const SITE_ORIGIN = 'https://ganeshaink.pt';
export const SITE_NAME = 'Ganesha Ink';
export const SITE_PHONE = '+351913570454';
export const SITE_EMAIL = 'ricardo.vieira@ganeshaink.pt';
export const SITE_LOGO_PATH = '/images/logo/ganesha-logo-gold-white.webp';
export const SITE_LOGO = `${SITE_ORIGIN}${SITE_LOGO_PATH}`;
export const SITE_MAPS =
  'https://maps.google.com/?q=R.+Eng.+Duarte+Pacheco+33,+3730-254+Vale+de+Cambra';

export const SITE_ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: 'Rua Eng. Duarte Pacheco n.º 33',
  addressLocality: 'Vale de Cambra',
  addressRegion: 'Aveiro',
  postalCode: '3730-254',
  addressCountry: 'PT',
};

export const SITE_AREA_SERVED = [
  'Vale de Cambra',
  'Oliveira de Azeméis',
  'São João da Madeira',
  'Arouca',
  'Distrito de Aveiro',
];

export const SITE_SAME_AS = [
  'https://www.instagram.com/ganeshaink',
  'https://www.instagram.com/ganeshainktattoostudio',
];

export const SITE_OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:30',
    closes: '12:30',
  },
  {
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '14:00',
    closes: '18:00',
  },
];

export const PATHS = {
  home: '/',
  tattoo: '/tattoo',
  barbearia: '/barbearia',
  beauty: '/beauty',
  nailsLegacy: '/nails',
  servicos: '/servicos',
  artistas: '/artistas',
  galeria: '/galeria',
  blog: '/blog',
  marcar: '/marcar',
  consulta: '/consulta',
  contacto: '/contacto',
  privacidade: '/politica-de-privacidade',
  cookies: '/politica-de-cookies',
} as const;

export const STUDIO_NAV = [
  { href: PATHS.tattoo, label: 'Tattoostudio' },
  { href: PATHS.barbearia, label: 'Barbearia' },
  { href: PATHS.beauty, label: 'Beauty' },
] as const;

export const SITEMAP_STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
}> = [
  { path: PATHS.home, changeFrequency: 'weekly', priority: 1 },
  { path: PATHS.tattoo, changeFrequency: 'weekly', priority: 0.95 },
  { path: PATHS.barbearia, changeFrequency: 'weekly', priority: 0.95 },
  { path: PATHS.beauty, changeFrequency: 'weekly', priority: 0.95 },
  { path: PATHS.servicos, changeFrequency: 'weekly', priority: 0.85 },
  { path: PATHS.artistas, changeFrequency: 'weekly', priority: 0.8 },
  { path: PATHS.galeria, changeFrequency: 'monthly', priority: 0.7 },
  { path: PATHS.blog, changeFrequency: 'weekly', priority: 0.75 },
  { path: PATHS.marcar, changeFrequency: 'monthly', priority: 0.85 },
  { path: PATHS.consulta, changeFrequency: 'monthly', priority: 0.7 },
  { path: PATHS.contacto, changeFrequency: 'monthly', priority: 0.7 },
  { path: PATHS.privacidade, changeFrequency: 'monthly', priority: 0.2 },
  { path: PATHS.cookies, changeFrequency: 'monthly', priority: 0.2 },
];

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path === '/') return SITE_ORIGIN;
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  index?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = ogTitle || title;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url,
      locale: 'pt_PT',
      type: 'website',
      siteName: SITE_NAME,
      images: [{ url: SITE_LOGO, width: 640, height: 640, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [SITE_LOGO],
    },
  };
}

const nap = {
  image: SITE_LOGO,
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
  address: SITE_ADDRESS,
  hasMap: SITE_MAPS,
  areaServed: SITE_AREA_SERVED,
  openingHoursSpecification: SITE_OPENING_HOURS,
  sameAs: SITE_SAME_AS,
};

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    inLanguage: 'pt-PT',
    publisher: { '@id': `${SITE_ORIGIN}/#business` },
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#business`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description:
      'Estúdio de tatuagem, barbearia e salão de beauty em Vale de Cambra. Tatuagens personalizadas, cortes e estética de unhas no mesmo espaço.',
    ...nap,
    department: [
      {
        '@type': 'TattooParlor',
        name: 'Ganesha Ink Tattoostudio',
        url: absoluteUrl(PATHS.tattoo),
      },
      {
        '@type': 'HairSalon',
        name: 'Ganesha Ink Barbearia',
        url: absoluteUrl(PATHS.barbearia),
      },
      {
        '@type': 'NailSalon',
        name: 'Ganesha Ink Beauty',
        url: absoluteUrl(PATHS.beauty),
      },
    ],
  };
}

export function tattooParlorJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    '@id': `${absoluteUrl(PATHS.tattoo)}#parlor`,
    name: SITE_NAME,
    alternateName: 'Ganesha Ink Tattoostudio',
    description:
      'Estúdio de tatuagem e body piercing em Vale de Cambra. Tatuagens personalizadas, consulta e higiene profissional.',
    url: absoluteUrl(PATHS.tattoo),
    ...nap,
    parentOrganization: { '@id': `${SITE_ORIGIN}/#business` },
  };
}

export function hairSalonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `${absoluteUrl(PATHS.barbearia)}#salon`,
    name: 'Ganesha Ink Barbearia',
    description: 'Barbearia Ganesha Ink em Vale de Cambra — cortes, barba e degradê.',
    url: absoluteUrl(PATHS.barbearia),
    ...nap,
    parentOrganization: { '@id': `${SITE_ORIGIN}/#business` },
  };
}

export function nailSalonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    '@id': `${absoluteUrl(PATHS.beauty)}#salon`,
    name: 'Ganesha Ink Beauty',
    description: 'Salão de beauty e estética de unhas Ganesha Ink em Vale de Cambra.',
    url: absoluteUrl(PATHS.beauty),
    ...nap,
    parentOrganization: { '@id': `${SITE_ORIGIN}/#business` },
  };
}
