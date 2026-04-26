import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "d 'de' MMMM 'de' yyyy", { locale: pt });
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), 'dd/MM/yyyy', { locale: pt });
}

export function formatPrice(price: number | string | null): string {
  if (price === null || price === undefined) return 'Sob consulta';
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(n);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${m}min`;
}

export const SERVICE_CATEGORIES: Record<string, string> = {
  barbershop: 'Barbearia',
  tattoo: 'Tatuagem',
  piercing: 'Piercing',
  nails: 'Unhas',
};
