const prisma = require('../config/database');

const TRADE_SLUGS = ['barbershop', 'tattoo', 'nails'];

function isGeneralStatsViewer(user) {
  if (!user) return false;
  if (user.role === 'superadmin') return true;
  return /ricardo\s+vieira/i.test(String(user.name || ''));
}

function rootCategorySlug(category) {
  if (!category) return null;
  return category.parent?.slug || category.slug;
}

async function loadUserStatsContext(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      employee: {
        include: {
          services: {
            include: {
              service: { include: { category: { include: { parent: true } } } },
            },
          },
        },
      },
    },
  });
  if (!user) {
    return {
      user: null,
      employeeId: null,
      categorySlugs: [],
      canViewGeneralStats: false,
    };
  }

  const slugs = new Set();
  for (const row of user.employee?.services || []) {
    const slug = rootCategorySlug(row.service?.category);
    if (slug) slugs.add(slug);
  }

  return {
    user,
    employeeId: user.employee?.id || null,
    categorySlugs: [...slugs],
    canViewGeneralStats: isGeneralStatsViewer(user),
  };
}

function canViewTradeStats(ctx, slug) {
  if (!ctx) return false;
  if (ctx.canViewGeneralStats) return TRADE_SLUGS.includes(slug);
  return ctx.categorySlugs.includes(slug);
}

function publicStatsFields(ctx) {
  return {
    canViewGeneralStats: Boolean(ctx.canViewGeneralStats),
    statsCategories: ctx.canViewGeneralStats ? [...TRADE_SLUGS] : ctx.categorySlugs,
    employeeId: ctx.employeeId,
  };
}

module.exports = {
  TRADE_SLUGS,
  isGeneralStatsViewer,
  rootCategorySlug,
  loadUserStatsContext,
  canViewTradeStats,
  publicStatsFields,
};
