/**
 * Setup global pour les tests Jest
 * @file setup.js
 * @version 1.0.0
 * @date 2025-12-08
 */

import '@testing-library/jest-dom';

// Mock de localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
    get length() {
      return Object.keys(store).length;
    },
  };
})();

global.localStorage = localStorageMock;

// Mock de console pour éviter les logs pendant les tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

// Réinitialiser localStorage avant chaque test
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});
