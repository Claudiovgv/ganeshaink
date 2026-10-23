export const FLASH_COUNT = 54;

export const SHEET_FLASHES = Array.from({ length: FLASH_COUNT }, (_, index) => {
  const n = String(index + 1).padStart(2, '0');
  return {
    id: `flash-${n}`,
    src: `/images/halloween-flashes/flash-${n}.webp`,
    label: `Flash ${n}`,
  };
});

export const OWN_FLASH_ID = 'own';

export const FLASH_PRICES = {
  1: 40,
  2: 70,
  3: 99,
} as const;

export type FlashQuantity = keyof typeof FLASH_PRICES;
