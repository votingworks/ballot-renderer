module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/{src,renderers}/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/expect.ts'],
  collectCoverageFrom: ['src/**/*.ts', 'renderers/**/*.ts', '!**/*.d.ts'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      lines: 100,
      functions: 100,
    },
  },
}
