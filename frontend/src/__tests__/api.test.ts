import { formatPrice, formatDuration, formatDate } from '@/lib/utils';

describe('utils', () => {
  test('formatPrice formata EUR correctamente', () => {
    expect(formatPrice(15)).toBe('15,00 €');
    expect(formatPrice('25.50')).toBe('25,50 €');
    expect(formatPrice(null)).toBe('Sob consulta');
  });

  test('formatDuration converte minutos', () => {
    expect(formatDuration(30)).toBe('30 min');
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(90)).toBe('1h30min');
    expect(formatDuration(120)).toBe('2h');
  });
});
