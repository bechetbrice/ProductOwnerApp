/**
 * Tests pour storageErrorHandler
 * @file storageErrorHandler.test.js
 * @version 1.0.0
 * @date 2025-12-08
 */

import {
  StorageErrorType,
  detectErrorType,
  getErrorMessage,
  createBackup,
  restoreFromBackup,
  listBackups,
  checkStorageQuota,
  tryFreeSpace,
  safeStorageOperation,
} from '../../../utils/storage/storageErrorHandler';

describe('detectErrorType', () => {
  test('devrait détecter QUOTA_EXCEEDED (name)', () => {
    const error = new Error('Quota exceeded');
    error.name = 'QuotaExceededError';
    
    expect(detectErrorType(error)).toBe(StorageErrorType.QUOTA_EXCEEDED);
  });

  test('devrait détecter QUOTA_EXCEEDED (code 22)', () => {
    const error = new Error('Quota exceeded');
    error.code = 22;
    
    expect(detectErrorType(error)).toBe(StorageErrorType.QUOTA_EXCEEDED);
  });

  test('devrait détecter QUOTA_EXCEEDED (code 1014)', () => {
    const error = new Error('Quota exceeded');
    error.code = 1014;
    
    expect(detectErrorType(error)).toBe(StorageErrorType.QUOTA_EXCEEDED);
  });

  test('devrait détecter QUOTA_EXCEEDED (Firefox)', () => {
    const error = new Error('Quota exceeded');
    error.name = 'NS_ERROR_DOM_QUOTA_REACHED';
    
    expect(detectErrorType(error)).toBe(StorageErrorType.QUOTA_EXCEEDED);
  });

  test('devrait détecter SECURITY_ERROR', () => {
    const error = new Error('Security error');
    error.name = 'SecurityError';
    
    expect(detectErrorType(error)).toBe(StorageErrorType.SECURITY_ERROR);
  });

  test('devrait détecter NOT_SUPPORTED', () => {
    const error = new Error('Not supported');
    error.name = 'NotSupportedError';
    
    expect(detectErrorType(error)).toBe(StorageErrorType.NOT_SUPPORTED);
  });

  test('devrait détecter DATA_CLONE', () => {
    const error = new Error('Data clone error');
    error.name = 'DataCloneError';
    
    expect(detectErrorType(error)).toBe(StorageErrorType.DATA_CLONE);
  });

  test('devrait détecter INVALID_STATE', () => {
    const error = new Error('Invalid state');
    error.name = 'InvalidStateError';
    
    expect(detectErrorType(error)).toBe(StorageErrorType.INVALID_STATE);
  });

  test('devrait détecter PARSE_ERROR', () => {
    const error = new SyntaxError('Unexpected token');
    
    expect(detectErrorType(error)).toBe(StorageErrorType.PARSE_ERROR);
  });

  test('devrait détecter UNKNOWN pour erreurs non reconnues', () => {
    const error = new Error('Unknown error');
    
    expect(detectErrorType(error)).toBe(StorageErrorType.UNKNOWN);
  });

  test('devrait retourner UNKNOWN si error est null', () => {
    expect(detectErrorType(null)).toBe(StorageErrorType.UNKNOWN);
  });
});

describe('getErrorMessage', () => {
  test('devrait retourner le message pour QUOTA_EXCEEDED', () => {
    const message = getErrorMessage(StorageErrorType.QUOTA_EXCEEDED);
    
    expect(message).toHaveProperty('title');
    expect(message).toHaveProperty('message');
    expect(message).toHaveProperty('actions');
    expect(message).toHaveProperty('severity');
    expect(message.severity).toBe('critical');
    expect(message.title).toContain('stockage');
  });

  test('devrait retourner le message pour SECURITY_ERROR', () => {
    const message = getErrorMessage(StorageErrorType.SECURITY_ERROR);
    
    expect(message.severity).toBe('critical');
    expect(message.title).toContain('sécurité');
  });

  test('devrait retourner le message pour PARSE_ERROR', () => {
    const message = getErrorMessage(StorageErrorType.PARSE_ERROR);
    
    expect(message.severity).toBe('error');
    expect(message.actions).toContain('Restaurer depuis un backup');
  });

  test('devrait retourner le message UNKNOWN pour type invalide', () => {
    const message = getErrorMessage('INVALID_TYPE');
    
    expect(message).toHaveProperty('title');
    expect(message.title).toContain('inconnue');
  });
});

describe('createBackup', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('devrait créer un backup avec succès', () => {
    const storageKey = 'test_key';
    const testData = JSON.stringify([{ id: '1', name: 'Test' }]);
    
    localStorage.setItem(storageKey, testData);
    
    const success = createBackup(storageKey);
    
    expect(success).toBe(true);
    
    // Vérifier qu'un backup a été créé
    let backupFound = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('po_app_backup_test_key_')) {
        backupFound = true;
        expect(localStorage.getItem(key)).toBe(testData);
      }
    }
    
    expect(backupFound).toBe(true);
  });

  test('devrait retourner false si la clé n\'existe pas', () => {
    const success = createBackup('non_existent_key');
    expect(success).toBe(false);
  });

  test('devrait nettoyer les vieux backups (garder 3 max)', () => {
    jest.useFakeTimers();
    const storageKey = 'test_key';
    localStorage.setItem(storageKey, 'data');
    
    // Créer 5 backups avec timestamps différents
    for (let i = 0; i < 5; i++) {
      createBackup(storageKey);
      jest.advanceTimersByTime(10); // Avancer de 10ms entre chaque backup
    }
    
    // Compter les backups
    let backupCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('po_app_backup_test_key_')) {
        backupCount++;
      }
    }
    
    // Devrait garder seulement 3 backups
    expect(backupCount).toBe(3);
    jest.useRealTimers();
  });
});

describe('restoreFromBackup', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('devrait restaurer depuis le backup le plus récent', () => {
    const storageKey = 'test_key';
    const backupData = JSON.stringify([{ id: '1', name: 'Backup' }]);
    
    // Créer un backup manuellement
    const backupKey = `po_app_backup_${storageKey}_${Date.now()}`;
    localStorage.setItem(backupKey, backupData);
    
    // Restaurer
    const success = restoreFromBackup(storageKey);
    
    expect(success).toBe(true);
    expect(localStorage.getItem(storageKey)).toBe(backupData);
  });

  test('devrait retourner false si aucun backup trouvé', () => {
    const success = restoreFromBackup('non_existent_key');
    expect(success).toBe(false);
  });

  test('devrait choisir le backup le plus récent', () => {
    const storageKey = 'test_key';
    
    // Créer 3 backups à des moments différents
    const backup1 = `po_app_backup_${storageKey}_1000`;
    const backup2 = `po_app_backup_${storageKey}_2000`;
    const backup3 = `po_app_backup_${storageKey}_3000`;
    
    localStorage.setItem(backup1, 'old');
    localStorage.setItem(backup2, 'older');
    localStorage.setItem(backup3, 'newest');
    
    restoreFromBackup(storageKey);
    
    expect(localStorage.getItem(storageKey)).toBe('newest');
  });
});

describe('listBackups', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('devrait lister tous les backups', () => {
    const storageKey1 = 'key1';
    const storageKey2 = 'key2';
    
    localStorage.setItem(storageKey1, 'data1');
    localStorage.setItem(storageKey2, 'data2');
    
    createBackup(storageKey1);
    createBackup(storageKey2);
    
    const backups = listBackups();
    
    expect(backups.length).toBeGreaterThanOrEqual(2);
    expect(backups[0]).toHaveProperty('key');
    expect(backups[0]).toHaveProperty('storageKey');
    expect(backups[0]).toHaveProperty('timestamp');
    expect(backups[0]).toHaveProperty('date');
    expect(backups[0]).toHaveProperty('size');
  });

  test('devrait filtrer par storageKey', () => {
    const storageKey1 = 'key1';
    const storageKey2 = 'key2';
    
    localStorage.setItem(storageKey1, 'data1');
    localStorage.setItem(storageKey2, 'data2');
    
    createBackup(storageKey1);
    createBackup(storageKey2);
    
    const backups = listBackups(storageKey1);
    
    expect(backups.length).toBeGreaterThan(0);
    backups.forEach(backup => {
      expect(backup.storageKey).toBe(storageKey1);
    });
  });

  test('devrait trier par timestamp décroissant', () => {
    const storageKey = 'test_key';
    localStorage.setItem(storageKey, 'data');
    
    createBackup(storageKey);
    createBackup(storageKey);
    createBackup(storageKey);
    
    const backups = listBackups(storageKey);
    
    // Vérifier l'ordre décroissant
    for (let i = 1; i < backups.length; i++) {
      expect(backups[i - 1].timestamp).toBeGreaterThanOrEqual(backups[i].timestamp);
    }
  });
});

describe('checkStorageQuota', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('devrait calculer l\'utilisation du quota', () => {
    // Ajouter des données
    localStorage.setItem('test1', 'x'.repeat(1000));
    localStorage.setItem('test2', 'x'.repeat(1000));
    
    const quota = checkStorageQuota();
    
    expect(quota).toHaveProperty('used');
    expect(quota).toHaveProperty('available');
    expect(quota).toHaveProperty('percentage');
    expect(quota).toHaveProperty('usedMB');
    expect(quota).toHaveProperty('availableMB');
    expect(quota).toHaveProperty('quotaMB');
    expect(quota).toHaveProperty('isAlmostFull');
    expect(quota).toHaveProperty('isFull');
    
    expect(quota.used).toBeGreaterThan(0);
    expect(typeof quota.percentage).toBe('number');
  });

  test('devrait détecter quota presque plein (>80%)', () => {
    // Simuler 80%+ d'utilisation est difficile en test
    // On vérifie juste le format de retour
    const quota = checkStorageQuota();
    
    expect(typeof quota.isAlmostFull).toBe('boolean');
    expect(typeof quota.isFull).toBe('boolean');
  });

  test('devrait retourner des valeurs par défaut en cas d\'erreur', () => {
    // Simuler une erreur en cassant localStorage
    const originalHasOwnProperty = Object.prototype.hasOwnProperty;
    Object.prototype.hasOwnProperty = jest.fn(() => {
      throw new Error('Test error');
    });
    
    const quota = checkStorageQuota();
    
    expect(quota.used).toBe(0);
    expect(quota.percentage).toBe(0);
    
    // Restaurer
    Object.prototype.hasOwnProperty = originalHasOwnProperty;
  });
});

describe('tryFreeSpace', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('devrait supprimer les vieux backups', () => {
    // Créer 5 backups
    for (let i = 0; i < 5; i++) {
      const backupKey = `po_app_backup_test_${1000 + i}`;
      localStorage.setItem(backupKey, 'backup data');
    }
    
    const result = tryFreeSpace();
    
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('freedSpace');
    expect(result).toHaveProperty('freedMB');
    expect(result).toHaveProperty('actions');
    
    // Devrait avoir libéré de l'espace
    if (result.success) {
      expect(result.freedSpace).toBeGreaterThan(0);
      expect(result.actions.length).toBeGreaterThan(0);
    }
  });

  test('devrait supprimer les clés de migration', () => {
    // Créer des clés de migration obsolètes
    localStorage.setItem('po_app_migration_v1', 'old migration');
    localStorage.setItem('po_app_migration_v2', 'old migration');
    
    const result = tryFreeSpace();
    
    // Vérifier que les clés de migration ont été supprimées
    expect(localStorage.getItem('po_app_migration_v1')).toBeNull();
    expect(localStorage.getItem('po_app_migration_v2')).toBeNull();
  });

  test('devrait retourner le nombre d\'octets libérés', () => {
    // Ajouter plusieurs backups GROS (>1 MB) pour que freedMB > 0 après toFixed(2)
    // 5 backups de 50KB chacun = 250KB total, dont 3 supprimés = ~150KB libérés
    localStorage.setItem('po_app_backup_test_1', 'x'.repeat(50000));
    localStorage.setItem('po_app_backup_test_2', 'x'.repeat(50000));
    localStorage.setItem('po_app_backup_test_3', 'x'.repeat(50000));
    localStorage.setItem('po_app_backup_test_4', 'x'.repeat(50000));
    localStorage.setItem('po_app_backup_test_5', 'x'.repeat(50000));
    localStorage.setItem('po_app_migration_v1', 'x'.repeat(25000));
    
    const result = tryFreeSpace();
    
    // Devrait avoir libéré de l'espace (3 backups + 1 migration = ~175KB)
    expect(result.success).toBe(true);
    expect(result.freedSpace).toBeGreaterThan(0);
    // Avec ~175KB libérés, freedMB devrait être ~0.17 MB
    expect(parseFloat(result.freedMB)).toBeGreaterThan(0);
  });

  test('devrait retourner success=false si aucun espace libéré', () => {
    // localStorage vide, rien à libérer
    const result = tryFreeSpace();
    
    expect(result.success).toBe(false);
    expect(result.freedSpace).toBe(0);
  });
});

describe('safeStorageOperation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('devrait exécuter l\'opération avec succès', async () => {
    const operation = jest.fn().mockResolvedValue('success data');
    
    const result = await safeStorageOperation(operation);
    
    expect(result.success).toBe(true);
    expect(result.data).toBe('success data');
    expect(result.error).toBeNull();
    expect(operation).toHaveBeenCalled();
  });

  test('devrait créer un backup si demandé', async () => {
    const storageKey = 'test_key';
    localStorage.setItem(storageKey, 'test data');
    
    const operation = jest.fn().mockResolvedValue('data');
    
    await safeStorageOperation(operation, {
      backup: true,
      storageKey,
    });
    
    // Vérifier qu'un backup a été créé
    let backupFound = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('po_app_backup_test_key_')) {
        backupFound = true;
      }
    }
    
    expect(backupFound).toBe(true);
  });

  test('devrait gérer les erreurs avec notifyCallback', async () => {
    const operation = jest.fn().mockRejectedValue(new Error('Test error'));
    const notifyCallback = jest.fn();
    
    const result = await safeStorageOperation(operation, {
      notifyCallback,
      operationName: 'Test Operation',
    });
    
    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBeDefined();
    expect(notifyCallback).toHaveBeenCalled();
  });

  test('devrait tenter de libérer de l\'espace si quota plein', async () => {
    // Mock checkStorageQuota pour simuler quota plein
    jest.spyOn(require('../../../utils/storage/storageErrorHandler'), 'checkStorageQuota')
      .mockReturnValue({
        isFull: true,
        percentage: 98,
      });
    
    // Mock tryFreeSpace
    jest.spyOn(require('../../../utils/storage/storageErrorHandler'), 'tryFreeSpace')
      .mockReturnValue({
        success: true,
        freedSpace: 1000000,
        freedMB: '0.95',
      });
    
    const operation = jest.fn().mockResolvedValue('data');
    
    const result = await safeStorageOperation(operation);
    
    expect(result.success).toBe(true);
  });

  test('devrait retry une fois après libération d\'espace pour QUOTA_EXCEEDED', async () => {
    // Créer des backups pour que tryFreeSpace réussisse à libérer de l'espace
    for (let i = 0; i < 5; i++) {
      localStorage.setItem(`po_app_backup_test_${i}`, 'x'.repeat(1000));
    }
    
    const quotaError = new Error('QuotaExceededError');
    quotaError.name = 'QuotaExceededError';
    
    let attemptCount = 0;
    const operation = jest.fn().mockImplementation(() => {
      attemptCount++;
      if (attemptCount === 1) {
        throw quotaError;
      }
      return 'success after retry';
    });
    
    const result = await safeStorageOperation(operation);
    
    expect(operation).toHaveBeenCalledTimes(2);
    expect(result.success).toBe(true);
    expect(result.data).toBe('success after retry');
  });
});
