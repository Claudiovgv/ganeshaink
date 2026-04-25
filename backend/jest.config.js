module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'],
  testTimeout: 30000,
  testMatch: ['**/tests/**/*.test.js'],
  // Ensure tests run sequentially
  maxWorkers: 1,
};
