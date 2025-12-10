/**
 * Configuration Jest pour ProductOwnerApp
 * 
 * Tests pour hooks, storage, et composants React
 */

export default {
  // Environnement de test
  testEnvironment: 'jsdom',

  // Racine du projet
  roots: ['<rootDir>/src'],

  // Extensions de fichiers à tester
  moduleFileExtensions: ['js', 'jsx', 'json'],

  // Patterns de fichiers de tests
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],

  // Transformation des fichiers
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Setup après environnement
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],

  // Résolution des modules (alias Vite)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Fichiers à ignorer
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/'
  ],

  // Couverture de code
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**',
  ],

  // Seuils de couverture (objectif 75%)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 75,
      statements: 75,
    },
  },

  // Dossier de couverture
  coverageDirectory: 'coverage',

  // Reporters de couverture
  coverageReporters: ['text', 'lcov', 'html'],

  // Verbose pour plus de détails
  verbose: true,

  // Timeout des tests (5 secondes)
  testTimeout: 5000,

  // Clear mocks entre chaque test
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
