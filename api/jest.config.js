module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'js'],
  rootDir: './src',
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    '**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/*.d.ts',
    '!app.ts'
  ]
};