/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  // roots: ['<rootDir>/src'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],  
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  // snapshotSerializers: [],
};