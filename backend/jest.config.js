module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'],
  testTimeout: 15000,
  testMatch: ['**/tests/**/*.test.js'],
};
