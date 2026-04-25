process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';

const prisma = require('../src/config/database');

afterAll(async () => {
  await prisma.$disconnect();
});
