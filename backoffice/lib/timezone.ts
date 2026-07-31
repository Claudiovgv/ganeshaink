import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

// Ganesha Ink is a single physical location — every date/time in the backoffice
// must show Portugal time, regardless of the viewing device's own timezone.
export const LISBON_TZ = 'Europe/Lisbon';

/** Converts a UTC date/ISO-string into a Date whose get*() methods read as Lisbon wall-clock time. */
export function toLisbon(date: Date | string): Date {
  return toZonedTime(date, LISBON_TZ);
}

/** Formats a UTC date/ISO-string as Lisbon local time using a date-fns format string. */
export function formatLisbon(date: Date | string, formatStr: string): string {
  return format(toLisbon(date), formatStr);
}

/** "yyyy-MM-dd" bucket key in Lisbon time — for grouping appointments by calendar day. */
export function lisbonDateKey(date: Date | string): string {
  return formatLisbon(date, 'yyyy-MM-dd');
}
