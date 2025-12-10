/**
 * Tests pour storageFactory
 * @file storageFactory.test.js
 * @version 1.0.0
 * @date 2025-12-08
 */

import {
  generateId,
  createStorageAPI,
  createMultiKeyStorageAPI,
  migrateStorage,
} from '../../../utils/storage/storageFactory';
import * as storageErrorHandler from '../../../utils/storage/storageErrorHandler';

// Mock du module storageErrorHandler
jest.mock('../../../utils/storage/storageErrorHandler', () => ({
  createBackup: jest.fn(() => true),
  restoreFromBackup: jest.fn(() => false),
  detectErrorType: jest.fn(() => 'UNKNOWN'),
  getErrorMessage: jest.fn(() => ({
    title: 'Erreur',
    message: 'Une erreur est survenue',
  })),
  tryFreeSpace: jest.fn(() => ({
    success: false,
    freedSpace: 0,
    freedMB: '0',
    actions: [],
  })),
  checkStorageQuota: jest.fn(() => ({
    percentage: 50,
    isFull: false,
  })),
}));

describe('generateId', () => {
  test('devrait générer un ID unique', () => {
    const id1 = generateId();
    const id2 = generateId();

    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    expect(id1).not.toBe(id2);
  });

  test('devrait générer un ID au format "timestamp_random"', () => {
    const id = generateId();
    const parts = id.split('_');

    expect(parts).toHaveLength(2);
    expect(parseInt(parts[0])).toBeGreaterThan(0);
    expect(parts[1]).toMatch(/^[a-z0-9]+$/);
  });
});

describe('createStorageAPI', () => {
  let storageKey;
  let API;
  
  beforeEach(() => {
    // Nettoyer localStorage avant chaque test
    localStorage.clear();
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    storageKey = 'test_storage_key';
    const defaults = {
      name: '',
      status: 'draft',
    };
    
    // Réinitialiser les mocks
    storageErrorHandler.createBackup.mockReturnValue(true);
    storageErrorHandler.restoreFromBackup.mockReturnValue(false);
    storageErrorHandler.detectErrorType.mockReturnValue('UNKNOWN');
    storageErrorHandler.getErrorMessage.mockReturnValue({
      title: 'Erreur',
      message: 'Une erreur est survenue',
    });
    storageErrorHandler.tryFreeSpace.mockReturnValue({
      success: false,
      freedSpace: 0,
      freedMB: '0',
      actions: [],
    });
    storageErrorHandler.checkStorageQuota.mockReturnValue({
      percentage: 50,
      isFull: false,
    });
    
    API = createStorageAPI(storageKey, defaults);
  });

  afterEach(() => {
    localStorage.clear();
    jest.useRealTimers();
  });

  // ========================================================================
  // 1. FONCTION get()
  // ========================================================================

  test('get() - devrait retourner un tableau vide si aucune donnée', () => {
    const items = API.get();
    expect(items).toEqual([]);
  });

  test('get() - devrait retourner les données stockées', () => {
    const testData = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    
    localStorage.setItem(storageKey, JSON.stringify(testData));
    
    const items = API.get();
    expect(items).toEqual(testData);
  });

  test('get() - devrait gérer les erreurs de parsing', () => {
    // Données corrompues
    localStorage.setItem(storageKey, 'invalid JSON {{{');
    
    const items = API.get();
    expect(items).toEqual([]);
    expect(storageErrorHandler.restoreFromBackup).toHaveBeenCalledWith(storageKey);
  });

  test('get() - devrait appeler errorCallback en cas d\'erreur', () => {
    const errorCallback = jest.fn();
    const APIWithCallback = createStorageAPI(storageKey, {}, errorCallback);
    
    localStorage.setItem(storageKey, 'invalid JSON');
    
    APIWithCallback.get();
    
    expect(errorCallback).toHaveBeenCalled();
    expect(errorCallback.mock.calls[0][0]).toHaveProperty('type');
    expect(errorCallback.mock.calls[0][0]).toHaveProperty('originalError');
  });

  // ========================================================================
  // 2. FONCTION getById(id)
  // ========================================================================

  test('getById() - devrait retourner l\'item correspondant', () => {
    const testData = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    
    localStorage.setItem(storageKey, JSON.stringify(testData));
    
    const item = API.getById('1');
    expect(item).toEqual({ id: '1', name: 'Item 1' });
  });

  test('getById() - devrait retourner null si non trouvé', () => {
    const testData = [{ id: '1', name: 'Item 1' }];
    localStorage.setItem(storageKey, JSON.stringify(testData));
    
    const item = API.getById('999');
    expect(item).toBeNull();
  });

  // ========================================================================
  // 3. FONCTION add(data)
  // ========================================================================

  test('add() - devrait ajouter un nouvel item avec ID et timestamps', () => {
    const newItem = API.add({ name: 'New Item' });
    
    expect(newItem).toBeDefined();
    expect(newItem.id).toBeDefined();
    expect(newItem.name).toBe('New Item');
    expect(newItem.status).toBe('draft'); // Valeur par défaut
    expect(newItem.createdAt).toBeDefined();
    expect(newItem.updatedAt).toBeDefined();
  });

  test('add() - devrait persister l\'item dans localStorage', () => {
    API.add({ name: 'Item 1' });
    
    const stored = JSON.parse(localStorage.getItem(storageKey));
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Item 1');
  });

  test('add() - devrait créer un backup avant ajout', () => {
    API.add({ name: 'Item 1' });
    
    expect(storageErrorHandler.createBackup).toHaveBeenCalledWith(storageKey);
  });

  test('add() - devrait retourner null en cas d\'erreur', () => {
    // Simuler une erreur localStorage (quota exceeded)
    const saveError = new Error('QuotaExceededError');
    saveError.name = 'QuotaExceededError';
    saveError.code = 22;
    
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = jest.fn(() => {
      throw saveError;
    });
    
    storageErrorHandler.tryFreeSpace.mockReturnValue({
      success: false,
      freedSpace: 0,
      freedMB: '0',
      actions: [],
    });
    storageErrorHandler.detectErrorType.mockReturnValue('QuotaExceededError');
    storageErrorHandler.checkStorageQuota.mockReturnValue({
      percentage: 95,
      isFull: true,
    });
    
    const newItem = API.add({ name: 'Item' });
    expect(newItem).toBeNull();
    
    // Restaurer setItem
    Storage.prototype.setItem = originalSetItem;
  });

  // ========================================================================
  // 4. FONCTION update(id, updates)
  // ========================================================================

  test('update() - devrait mettre à jour un item existant', () => {
    const item = API.add({ name: 'Original' });
    
    // Attendre 1ms pour garantir un timestamp différent
    jest.advanceTimersByTime(1);
    
    const updated = API.update(item.id, { name: 'Updated' });
    
    expect(updated).toBeDefined();
    expect(updated.name).toBe('Updated');
    expect(updated.updatedAt).not.toBe(item.updatedAt);
  });

  test('update() - devrait retourner null si item non trouvé', () => {
    const updated = API.update('non_existent_id', { name: 'Test' });
    expect(updated).toBeNull();
  });

  test('update() - devrait créer un backup avant mise à jour', () => {
    const item = API.add({ name: 'Item' });
    
    storageErrorHandler.createBackup.mockClear();
    API.update(item.id, { name: 'Updated' });
    
    expect(storageErrorHandler.createBackup).toHaveBeenCalledWith(storageKey);
  });

  // ========================================================================
  // 5. FONCTION remove(id)
  // ========================================================================

  test('remove() - devrait supprimer un item', () => {
    const item = API.add({ name: 'To Delete' });
    
    const success = API.remove(item.id);
    
    expect(success).toBe(true);
    
    const items = API.get();
    expect(items).toHaveLength(0);
  });

  test('remove() - devrait retourner false si item non trouvé', () => {
    const success = API.remove('non_existent_id');
    expect(success).toBe(false);
  });

  test('remove() - devrait créer un backup avant suppression', () => {
    const item = API.add({ name: 'Item' });
    
    storageErrorHandler.createBackup.mockClear();
    API.remove(item.id);
    
    expect(storageErrorHandler.createBackup).toHaveBeenCalledWith(storageKey);
  });

  // ========================================================================
  // 6. FONCTION save(items)
  // ========================================================================

  test('save() - devrait sauvegarder un tableau complet', () => {
    const items = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    
    const success = API.save(items);
    
    expect(success).toBe(true);
    
    const stored = JSON.parse(localStorage.getItem(storageKey));
    expect(stored).toEqual(items);
  });

  test('save() - devrait créer un backup par défaut', () => {
    API.save([{ id: '1', name: 'Item' }]);
    
    expect(storageErrorHandler.createBackup).toHaveBeenCalledWith(storageKey);
  });

  test('save() - ne devrait pas créer de backup si createBackupFirst=false', () => {
    storageErrorHandler.createBackup.mockClear();
    
    API.save([{ id: '1', name: 'Item' }], false);
    
    expect(storageErrorHandler.createBackup).not.toHaveBeenCalled();
  });

  // ========================================================================
  // 7. FONCTION addMany(items)
  // ========================================================================

  test('addMany() - devrait ajouter plusieurs items en batch', () => {
    const itemsData = [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' },
    ];
    
    const result = API.addMany(itemsData);
    
    expect(result.success).toBe(true);
    expect(result.items).toHaveLength(3);
    expect(result.error).toBeNull();
    
    // Vérifier que chaque item a un ID et timestamps
    result.items.forEach(item => {
      expect(item.id).toBeDefined();
      expect(item.createdAt).toBeDefined();
      expect(item.updatedAt).toBeDefined();
      expect(item.status).toBe('draft'); // Valeur par défaut
    });
  });

  test('addMany() - devrait retourner erreur si input invalide', () => {
    const result = API.addMany('invalid');
    
    expect(result.success).toBe(false);
    expect(result.items).toEqual([]);
    expect(result.error).toBe('Invalid input');
  });

  test('addMany() - devrait retourner erreur si tableau vide', () => {
    const result = API.addMany([]);
    
    expect(result.success).toBe(false);
    expect(result.items).toEqual([]);
    expect(result.error).toBe('Invalid input');
  });

  test('addMany() - devrait conserver les items existants', () => {
    API.add({ name: 'Existing Item' });
    
    const result = API.addMany([
      { name: 'New Item 1' },
      { name: 'New Item 2' },
    ]);
    
    expect(result.success).toBe(true);
    
    const allItems = API.get();
    expect(allItems).toHaveLength(3);
  });

  // ========================================================================
  // 8. GÉNÉRATION ID & DEFAULTS
  // ========================================================================

  test('devrait appliquer les valeurs par défaut', () => {
    const item = API.add({ name: 'Test' });
    
    expect(item.status).toBe('draft');
  });

  test('devrait permettre de surcharger les defaults', () => {
    const item = API.add({ name: 'Test', status: 'active' });
    
    expect(item.status).toBe('active');
  });

  // ========================================================================
  // 9. ERROR CALLBACK
  // ========================================================================

  test('devrait appeler errorCallback en cas d\'erreur QUOTA_EXCEEDED', () => {
    const errorCallback = jest.fn();
    
    // Simuler quota exceeded
    const quotaError = new Error('QuotaExceededError');
    quotaError.name = 'QuotaExceededError';
    quotaError.code = 22;
    
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = jest.fn(() => {
      throw quotaError;
    });
    
    storageErrorHandler.tryFreeSpace.mockReturnValue({
      success: false,
      freedSpace: 0,
      freedMB: '0',
      actions: [],
    });
    
    storageErrorHandler.checkStorageQuota.mockReturnValue({
      percentage: 95,
      isFull: true,
    });
    
    storageErrorHandler.detectErrorType.mockReturnValue('QuotaExceededError');
    
    const APIWithCallback = createStorageAPI(storageKey, {}, errorCallback);
    APIWithCallback.add({ name: 'Test' });
    
    expect(errorCallback).toHaveBeenCalled();
    
    // Restaurer setItem
    Storage.prototype.setItem = originalSetItem;
  });
});

describe('createMultiKeyStorageAPI', () => {
  let storageKey;
  let MultiAPI;
  
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    
    storageKey = 'test_multi_key';
    MultiAPI = createMultiKeyStorageAPI(storageKey, {
      name: '',
      productId: null,
    });
    
    storageErrorHandler.createBackup.mockReturnValue(true);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('devrait hériter de toutes les méthodes de base', () => {
    expect(MultiAPI.get).toBeInstanceOf(Function);
    expect(MultiAPI.add).toBeInstanceOf(Function);
    expect(MultiAPI.update).toBeInstanceOf(Function);
    expect(MultiAPI.remove).toBeInstanceOf(Function);
  });

  test('getByForeignKey() - devrait filtrer par clé étrangère', () => {
    MultiAPI.add({ name: 'Item 1', productId: 'prod_1' });
    MultiAPI.add({ name: 'Item 2', productId: 'prod_1' });
    MultiAPI.add({ name: 'Item 3', productId: 'prod_2' });
    
    const items = MultiAPI.getByForeignKey('productId', 'prod_1');
    
    expect(items).toHaveLength(2);
    expect(items[0].productId).toBe('prod_1');
    expect(items[1].productId).toBe('prod_1');
  });

  test('removeByForeignKey() - devrait supprimer tous les items associés', () => {
    MultiAPI.add({ name: 'Item 1', productId: 'prod_1' });
    MultiAPI.add({ name: 'Item 2', productId: 'prod_1' });
    MultiAPI.add({ name: 'Item 3', productId: 'prod_2' });
    
    const deletedCount = MultiAPI.removeByForeignKey('productId', 'prod_1');
    
    expect(deletedCount).toBe(2);
    
    const remaining = MultiAPI.get();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].productId).toBe('prod_2');
  });
});

describe('migrateStorage', () => {
  let storageKey;
  
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    
    storageKey = 'test_migration';
    storageErrorHandler.createBackup.mockReturnValue(true);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('devrait migrer les données avec succès', () => {
    const oldData = [
      { id: '1', oldField: 'value1' },
      { id: '2', oldField: 'value2' },
    ];
    
    localStorage.setItem(storageKey, JSON.stringify(oldData));
    
    const migrationFn = (item) => ({
      ...item,
      newField: item.oldField,
    });
    
    const result = migrateStorage(storageKey, migrationFn);
    
    expect(result.success).toBe(true);
    expect(result.migratedCount).toBe(2);
    expect(result.error).toBeNull();
    
    const migrated = JSON.parse(localStorage.getItem(storageKey));
    expect(migrated[0]).toHaveProperty('newField');
  });

  test('devrait créer un backup avant migration', () => {
    const oldData = [{ id: '1', name: 'Item' }];
    localStorage.setItem(storageKey, JSON.stringify(oldData));
    
    migrateStorage(storageKey, (item) => item);
    
    expect(storageErrorHandler.createBackup).toHaveBeenCalledWith(storageKey);
  });

  test('devrait gérer une clé vide sans erreur', () => {
    const result = migrateStorage(storageKey, (item) => item);
    
    expect(result.success).toBe(true);
    expect(result.migratedCount).toBe(0);
  });

  test('devrait appeler errorCallback en cas d\'erreur', () => {
    const errorCallback = jest.fn();
    
    // Données corrompues
    localStorage.setItem(storageKey, 'invalid JSON');
    
    const result = migrateStorage(storageKey, (item) => item, errorCallback);
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(errorCallback).toHaveBeenCalled();
  });
});
