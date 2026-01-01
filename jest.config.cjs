module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.{cjs,ts}'],
  collectCoverageFrom: ['dist/useKeyboardShortcut.js', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/.github/'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  testPathIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest'
};