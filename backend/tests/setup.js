// Set env vars BEFORE requiring any modules that depend on them
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'mysql://root:@localhost:3306/ganeshaink_test';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '7d';

const prisma = require('../src/config/database');

// Global teardown — runs after ALL tests in ALL files complete
afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // allow local afterAll hooks to finish
  await prisma.$disconnect();
});
