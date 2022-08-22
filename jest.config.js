

/** @type {import('ts-jest/dist/types' ).InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@modules/(.*)": "<rootDir>/src/modules/$1",
    "@shared/(.*)": "<rootDir>/src/shared/$1"
    },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: "coverage",
  coverageReporters: ['text-summary', 'lcov'],

};