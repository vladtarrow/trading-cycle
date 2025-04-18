module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['tests/**/*.ts', '!**/node_modules/**', '!**/dist/**'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  // Настроим Jest искать только в папке tests
  roots: ['<rootDir>/src/tests'],
  // Включаем только файлы с расширением .ts и только из папки tests
  testMatch: ['**/tests/**/*.ts'],
};
