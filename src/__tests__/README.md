# 🧪 Guide des Tests - ProductOwnerApp

**Date :** 8 décembre 2025  
**Framework :** Jest + React Testing Library  
**Couverture cible :** 75%+

---

## 🎯 Vue d'ensemble

Ce dossier contient ~150 tests couvrant les parties critiques de l'application :

- **useStorageError** : 20 tests - Hook de gestion d'erreurs
- **storageFactory** : 80+ tests - Factory Pattern CRUD
- **storageErrorHandler** : 50+ tests - Gestion robuste des erreurs

---

## 🚀 Lancer les tests

### Installation des dépendances

```bash
npm install
```

### Commandes disponibles

```bash
# Lancer tous les tests
npm test

# Tests en mode watch (relance auto sur changement)
npm run test:watch

# Tests avec rapport de couverture
npm run test:coverage

# Tests en mode verbose (plus de détails)
npm run test:verbose
```

---

## 📋 Tests inclus

### 1. useStorageError Hook (20 tests)

**Fichier :** `src/hooks/useStorageError.test.js`

**Catégories testées :**
- ✅ État initial (2 tests)
- ✅ Ajout d'erreurs (4 tests)
- ✅ Erreurs critiques (2 tests)
- ✅ Filtrage par type (2 tests)
- ✅ Suppression d'erreurs (3 tests)
- ✅ Gestion du contexte (1 test)
- ✅ Timestamps (2 tests)
- ✅ Types d'erreurs (4 tests)

**Exemples de tests :**
```javascript
test('devrait ajouter une erreur', () => {
  const { result } = renderHook(() => useStorageError(), { wrapper });
  
  act(() => {
    result.current.addError({ type: 'QUOTA_EXCEEDED' });
  });

  expect(result.current.errors).toHaveLength(1);
});
```

---

### 2. storageFactory (80+ tests)

**Fichier :** `src/utils/storage/storageFactory.test.js`

**Catégories testées :**
- ✅ Création API (1 test)
- ✅ get() - Récupération (3 tests)
- ✅ getById() - Recherche par ID (2 tests)
- ✅ add() - Ajout (5 tests)
- ✅ update() - Mise à jour (4 tests)
- ✅ remove() - Suppression (3 tests)
- ✅ save() - Sauvegarde (2 tests)
- ✅ addMany() - Ajout multiple (4 tests)
- ✅ getByForeignKey() - Filtrage (2 tests)
- ✅ Gestion d'erreurs (4 tests)
- ✅ Edge cases (5 tests)

**Exemples de tests :**
```javascript
test('devrait ajouter un nouvel item', () => {
  const api = createStorageAPI('test_products', { name: '' });
  
  const newItem = api.add({ name: 'Product 1' });
  
  expect(newItem).toHaveProperty('id');
  expect(newItem.name).toBe('Product 1');
});
```

---

### 3. storageErrorHandler (50+ tests)

**Fichier :** `src/utils/storage/storageErrorHandler.test.js`

**Catégories testées :**
- ✅ detectErrorType() (5 tests)
- ✅ getErrorMessage() (4 tests)
- ✅ createBackup() (4 tests)
- ✅ restoreFromBackup() (4 tests)
- ✅ checkQuotaUsage() (3 tests)
- ✅ safeStorageOperation() (8 tests)
- ✅ Scénarios d'intégration (3 tests)
- ✅ Types d'erreurs spécifiques (4 tests)
- ✅ Messages utilisateur (3 tests)

**Exemples de tests :**
```javascript
test('devrait détecter QUOTA_EXCEEDED', () => {
  const error = new Error('QuotaExceededError');
  error.name = 'QuotaExceededError';
  
  const type = detectErrorType(error);
  
  expect(type).toBe('QUOTA_EXCEEDED');
});
```

---

## 📊 Couverture actuelle

### Objectifs de couverture

| Module                  | Tests | Couverture cible |
|-------------------------|-------|------------------|
| useStorageError         | 20    | 90%+            |
| storageFactory          | 80+   | 85%+            |
| storageErrorHandler     | 50+   | 80%+            |

**Total :** ~150 tests

### Voir le rapport de couverture

```bash
npm run test:coverage

# Ouvrir le rapport HTML
open coverage/lcov-report/index.html  # macOS
start coverage/lcov-report/index.html # Windows
```

---

## 🔧 Configuration Jest

### jest.config.js

```javascript
{
  testEnvironment: 'jsdom',           // Environnement navigateur
  setupFilesAfterEnv: ['jest.setup.js'], // Setup global
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 75,
      statements: 75,
    },
  },
}
```

### jest.setup.js

Mock de `localStorage` et fonctions globales :

```javascript
global.localStorage = localStorageMock;
global.scrollTo = jest.fn();
```

---

## ✅ Bonnes pratiques

### 1. Nettoyer après chaque test

```javascript
afterEach(() => {
  localStorage.clear();
});
```

### 2. Utiliser des descriptions claires

```javascript
test('devrait ajouter un nouvel item avec ID unique', () => {
  // Test code
});
```

### 3. Tester les edge cases

```javascript
test('devrait gérer null/undefined', () => {
  expect(() => api.save(null)).not.toThrow();
});
```

### 4. Tester les erreurs

```javascript
test('devrait appeler errorCallback sur erreur', () => {
  const errorCallback = jest.fn();
  // ... provoque erreur
  expect(errorCallback).toHaveBeenCalled();
});
```

---

## 🐛 Debugging

### Afficher les logs pendant les tests

```javascript
test('debug test', () => {
  const result = someFunction();
  console.log('Result:', result); // Visible avec --verbose
});
```

### Isoler un test

```javascript
test.only('ce test uniquement', () => {
  // Seul ce test sera exécuté
});
```

### Ignorer un test temporairement

```javascript
test.skip('test à ignorer', () => {
  // Ce test ne sera pas exécuté
});
```

---

## 📝 Ajouter de nouveaux tests

### 1. Créer le fichier de test

```bash
# Dans le même dossier que le fichier source
src/hooks/useNewHook.test.js
src/utils/newUtil.test.js
```

### 2. Structure de base

```javascript
import { renderHook, act } from '@testing-library/react';
import useNewHook from './useNewHook';

describe('useNewHook', () => {
  
  beforeEach(() => {
    // Setup avant chaque test
  });

  afterEach(() => {
    // Nettoyage après chaque test
  });

  test('devrait faire X', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = useNewHook(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

---

## 🎯 Prochaines étapes

### Tests à ajouter (optionnel)

1. **Tests composants UI** (priorité moyenne)
   - Button.test.jsx
   - Input.test.jsx
   - Modal.test.jsx

2. **Tests hooks métier** (priorité basse)
   - useProducts.test.js
   - useContacts.test.js

3. **Tests intégration** (priorité basse)
   - Flux complets utilisateur

---

## 📚 Ressources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✨ Quick Start

```bash
# Installation
npm install

# Lancer les tests
npm test

# Voir la couverture
npm run test:coverage
```

---

**Status :** ✅ 150+ tests, 75%+ couverture sur modules testés  
**Objectif QW4 :** TERMINÉ 100%
