/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/(.*)$': ['<rootDir>/app/$1'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest/setupTeardown.ts'],
};
