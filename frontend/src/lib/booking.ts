import type { Category, Service } from '@/lib/api';

export const BOOKABLE_TRADES = ['barbershop', 'nails'] as const;
export type BookableTrade = (typeof BOOKABLE_TRADES)[number];
export type BookingArea = BookableTrade | 'tattoo';

export const STUDIO_PHONE = '+351913570454';
export const STUDIO_WHATSAPP = '351913570454';

const TATTOO_ROOTS = new Set(['tattoo', 'piercing']);

export function isBookableTrade(slug?: string | null): slug is BookableTrade {
  return slug === 'barbershop' || slug === 'nails';
}

export function bookingRootSlug(service: Service, categories: Category[]): BookableTrade | null {
  const slug = service.category?.slug;
  const parentSlug = service.category?.parent?.slug;
  if (isBookableTrade(slug)) return slug;
  if (isBookableTrade(parentSlug)) return parentSlug;
  for (const cat of categories) {
    if (!isBookableTrade(cat.slug)) continue;
    if (cat.children?.some((child) => child.slug === slug)) return cat.slug;
  }
  return null;
}

export function isBookableService(service: Service, categories: Category[]): boolean {
  return bookingRootSlug(service, categories) !== null;
}

export function isTattooLikeSlug(slug?: string | null, parentSlug?: string | null): boolean {
  return !!(slug && (TATTOO_ROOTS.has(slug) || (parentSlug && TATTOO_ROOTS.has(parentSlug))));
}

export function parseBookingArea(value?: string | null): BookingArea | null {
  if (isBookableTrade(value)) return value;
  if (value === 'tattoo' || value === 'piercing') return 'tattoo';
  return null;
}

export function servicesForTrade(
  services: Service[],
  categories: Category[],
  trade: BookableTrade,
): Service[] {
  return services.filter((service) => bookingRootSlug(service, categories) === trade);
}

export function tattooWhatsAppUrl(intent: 'talk' | 'call'): string {
  const text =
    intent === 'call'
      ? 'Olá, queria agendar uma chamada para falar de uma tatuagem na Ganesha Ink.'
      : 'Olá, queria falar sobre uma tatuagem na Ganesha Ink.';
  return `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function marcarHrefForPath(pathname: string): string {
  if (pathname.startsWith('/tattoo')) return '/marcar?area=tattoo';
  if (pathname.startsWith('/barbearia')) return '/marcar?area=barbershop';
  if (pathname.startsWith('/nails')) return '/marcar?area=nails';
  return '/marcar';
}
