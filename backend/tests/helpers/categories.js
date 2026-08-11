// A base de dados de testes arranca vazia (sync de schema, sem dados) — os
// testes que precisam de uma categoria pedem-na aqui em vez de assumirem
// que já existe.
const prisma = require('../../src/config/database');

async function ensureCategory(slug, name) {
  return prisma.category.upsert({
    where: { slug },
    update: {},
    create: { slug, name },
  });
}

module.exports = { ensureCategory };
