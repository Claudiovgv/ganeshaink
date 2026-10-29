import {
  PATHS,
  SITEMAP_STATIC_ROUTES,
  SITE_OPENING_HOURS,
  absoluteUrl,
  hairSalonJsonLd,
  localBusinessJsonLd,
  nailSalonJsonLd,
  tattooParlorJsonLd,
} from '@/lib/site';
import { marcarHrefForPath, parseBookingArea } from '@/lib/booking';

describe('SEO local e rotas públicas', () => {
  test('sitemap inclui as três páginas comerciais e omite /nails', () => {
    const paths = SITEMAP_STATIC_ROUTES.map((route) => route.path);
    expect(paths).toEqual(expect.arrayContaining(['/', '/tattoo', '/barbearia', '/beauty']));
    expect(paths).not.toContain('/nails');
  });

  test('horário JSON-LD tem intervalo de almoço igual ao de /contacto', () => {
    expect(SITE_OPENING_HOURS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ opens: '09:30', closes: '12:30' }),
        expect.objectContaining({ opens: '14:00', closes: '18:00' }),
      ]),
    );
  });

  test('canonicals das verticais apontam para o apex', () => {
    expect(absoluteUrl(PATHS.beauty)).toBe('https://ganeshaink.pt/beauty');
    expect(tattooParlorJsonLd().url).toBe('https://ganeshaink.pt/tattoo');
    expect(hairSalonJsonLd().url).toBe('https://ganeshaink.pt/barbearia');
    expect(nailSalonJsonLd().url).toBe('https://ganeshaink.pt/beauty');
  });

  test('homepage LocalBusiness liga as três actividades', () => {
    const departments = localBusinessJsonLd().department.map((item) => item.url);
    expect(departments).toEqual([
      'https://ganeshaink.pt/tattoo',
      'https://ganeshaink.pt/barbearia',
      'https://ganeshaink.pt/beauty',
    ]);
  });

  test('/beauty continua a marcar na área nails da API', () => {
    expect(parseBookingArea('beauty')).toBe('nails');
    expect(parseBookingArea('nails')).toBe('nails');
    expect(marcarHrefForPath('/beauty')).toBe('/marcar?area=nails');
    expect(marcarHrefForPath('/nails')).toBe('/marcar?area=nails');
  });
});
