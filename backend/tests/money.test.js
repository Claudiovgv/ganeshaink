const { asFiniteNumber, tradePayout } = require('../src/lib/money');

describe('asFiniteNumber', () => {
  it('reads Prisma Decimal-like objects via toNumber or toString', () => {
    expect(asFiniteNumber({ toNumber: () => 30, toString: () => '30.00' })).toBe(30);
    expect(asFiniteNumber({ toString: () => '1.00' })).toBe(1);
  });

  it('reads string amounts saved from the backoffice', () => {
    expect(asFiniteNumber('1')).toBe(1);
    expect(asFiniteNumber('30')).toBe(30);
  });

  it('treats empty values as not configured', () => {
    expect(asFiniteNumber(null)).toBeNull();
    expect(asFiniteNumber('')).toBeNull();
  });
});

describe('tradePayout', () => {
  it('uses configured studio % even when Prisma sent Decimal objects', () => {
    const row = tradePayout({
      revenue: 235,
      count: 20,
      materialCostPerUnit: { toString: () => '1.00' },
      studioPercent: { toString: () => '30.00' },
    });
    expect(row.hasConfig).toBe(true);
    expect(row.materialCost).toBe(20);
    expect(row.netRevenue).toBe(215);
    expect(row.studioPercent).toBe(30);
    expect(row.studioAmount).toBeCloseTo(64.5);
    expect(row.barberAmount).toBeCloseTo(150.5);
  });

  it('treats missing material as 0 when the studio % is set', () => {
    const row = tradePayout({
      revenue: 100,
      count: 4,
      materialCostPerUnit: null,
      studioPercent: '30',
    });
    expect(row.hasConfig).toBe(true);
    expect(row.materialCost).toBe(0);
    expect(row.studioAmount).toBeCloseTo(30);
    expect(row.barberAmount).toBeCloseTo(70);
  });
});
