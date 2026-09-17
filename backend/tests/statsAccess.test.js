const { canViewTradeStats, publicStatsFields } = require('../src/lib/statsAccess');

describe('canViewTradeStats', () => {
  it('allows general viewers (superadmin / Ricardo) for every trade', () => {
    const ctx = { canViewGeneralStats: true, categorySlugs: [], employeeId: null };
    expect(canViewTradeStats(ctx, 'barbershop')).toBe(true);
    expect(canViewTradeStats(ctx, 'tattoo')).toBe(true);
    expect(canViewTradeStats(ctx, 'nails')).toBe(true);
  });

  it('allows other staff only for their own trade slugs', () => {
    const ctx = { canViewGeneralStats: false, categorySlugs: ['tattoo'], employeeId: 9 };
    expect(canViewTradeStats(ctx, 'tattoo')).toBe(true);
    expect(canViewTradeStats(ctx, 'barbershop')).toBe(false);
  });
});

describe('publicStatsFields', () => {
  it('exposes all trade slugs for general viewers so the backoffice can split the menus', () => {
    expect(publicStatsFields({ canViewGeneralStats: true, categorySlugs: [], employeeId: null })).toEqual({
      canViewGeneralStats: true,
      statsCategories: ['barbershop', 'tattoo', 'nails'],
      employeeId: null,
    });
  });

  it('keeps staff limited to their own slugs', () => {
    expect(publicStatsFields({ canViewGeneralStats: false, categorySlugs: ['barbershop'], employeeId: 4 })).toEqual({
      canViewGeneralStats: false,
      statsCategories: ['barbershop'],
      employeeId: 4,
    });
  });
});
