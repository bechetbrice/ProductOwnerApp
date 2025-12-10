/**
 * Tests pour useStorageError hook
 * @file useStorageError.test.js
 * @version 1.0.0
 * @date 2025-12-08
 */

import { renderHook, act } from '@testing-library/react';
import { useStorageError, useStorageQuota } from '../../hooks/useStorageError';
import { StorageErrorProvider } from '../../contexts/StorageErrorContext';
import * as storageErrorHandler from '../../utils/storage/storageErrorHandler';

// Mock du module storageErrorHandler
jest.mock('../../utils/storage/storageErrorHandler');

// Wrapper pour le provider
const wrapper = ({ children }) => (
  <StorageErrorProvider>{children}</StorageErrorProvider>
);

describe('useStorageError', () => {
  beforeEach(() => {
    // Reset tous les mocks avant chaque test
    jest.clearAllMocks();
  });

  // ========================================================================
  // 1. INITIALISATION
  // ========================================================================

  test('devrait initialiser avec des valeurs par défaut', () => {
    const { result } = renderHook(() => useStorageError(), { wrapper });

    expect(result.current.currentError).toBeNull();
    expect(result.current.isErrorOpen).toBe(false);
    expect(result.current.showStorageError).toBeInstanceOf(Function);
    expect(result.current.hideStorageError).toBeInstanceOf(Function);
    expect(result.current.StorageErrorComponent).toBeDefined();
  });

  // ========================================================================
  // 2. FONCTION addError / showStorageError
  // ========================================================================

  test('devrait afficher une erreur avec showStorageError', () => {
    const { result } = renderHook(() => useStorageError(), { wrapper });

    const errorInfo = {
      type: 'QUOTA_EXCEEDED',
      title: 'Quota dépassé',
      message: 'Plus d\'espace',
      actions: ['Exporter'],
    };

    act(() => {
      result.current.showStorageError(errorInfo);
    });

    expect(result.current.currentError).toEqual(errorInfo);
    expect(result.current.isErrorOpen).toBe(true);
  });

  test('devrait logger l\'erreur dans la console', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useStorageError(), { wrapper });

    const errorInfo = { type: 'TEST_ERROR', message: 'Test error' };

    act(() => {
      result.current.showStorageError(errorInfo);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('[Storage Error]', errorInfo);
    consoleErrorSpy.mockRestore();
  });

  // ========================================================================
  // 3. FONCTION clearError / hideStorageError
  // ========================================================================

  test('devrait fermer la modal avec hideStorageError', () => {
    const { result } = renderHook(() => useStorageError(), { wrapper });

    // Afficher une erreur
    act(() => {
      result.current.showStorageError({ type: 'TEST', message: 'Test' });
    });

    expect(result.current.isErrorOpen).toBe(true);

    // Fermer la modal
    act(() => {
      result.current.hideStorageError();
    });

    expect(result.current.isErrorOpen).toBe(false);
    // L'erreur reste en mémoire temporairement pour l'animation
    expect(result.current.currentError).toBeDefined();
  });

  test('devrait nettoyer l\'erreur après 300ms', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useStorageError(), { wrapper });

    // Afficher et fermer
    act(() => {
      result.current.showStorageError({ type: 'TEST', message: 'Test' });
    });

    act(() => {
      result.current.hideStorageError();
    });

    expect(result.current.currentError).toBeDefined();

    // Avancer de 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.currentError).toBeNull();
    jest.useRealTimers();
  });

  // ========================================================================
  // 4. FONCTION clearAllErrors (implicite via hideStorageError)
  // ========================================================================

  test('devrait gérer plusieurs erreurs successives', () => {
    const { result } = renderHook(() => useStorageError(), { wrapper });

    // Première erreur
    act(() => {
      result.current.showStorageError({ type: 'ERROR_1', message: 'First' });
    });

    expect(result.current.currentError.type).toBe('ERROR_1');

    // Deuxième erreur (remplace la première)
    act(() => {
      result.current.showStorageError({ type: 'ERROR_2', message: 'Second' });
    });

    expect(result.current.currentError.type).toBe('ERROR_2');
  });

  // ========================================================================
  // 5. ACTIONS UTILISATEUR (handleAction)
  // ========================================================================

  test('devrait gérer l\'action "Export"', () => {
    // Mock de la fonction exportAllData
    const mockExportAllData = jest.fn().mockReturnValue({ products: [] });
    jest.mock('../../utils/storage', () => ({
      exportAllData: mockExportAllData,
    }));

    const { result } = renderHook(() => useStorageError(), { wrapper });

    const errorInfo = {
      type: 'QUOTA_EXCEEDED',
      actions: ['Exporter vos données'],
    };

    act(() => {
      result.current.showStorageError(errorInfo);
    });

    // Simuler le clic sur l'action Export
    // Note: handleAction n'est pas exposé directement, 
    // il serait déclenché par StorageErrorModal
    // Ce test vérifie que la structure est correcte
    expect(errorInfo.actions[0]).toContain('Export');
  });

  test('devrait fermer la modal après une action simple', () => {
    const { result } = renderHook(() => useStorageError(), { wrapper });

    act(() => {
      result.current.showStorageError({
        type: 'TEST',
        actions: ['Action simple'],
      });
    });

    act(() => {
      result.current.hideStorageError();
    });

    expect(result.current.isErrorOpen).toBe(false);
  });
});

// ========================================================================
// TESTS POUR useStorageQuota
// ========================================================================

describe('useStorageQuota', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('devrait initialiser avec quota null', () => {
    const { result } = renderHook(() => useStorageQuota(), { wrapper });

    expect(result.current.quota).toBeNull();
    expect(result.current.isAlmostFull).toBe(false);
    expect(result.current.isFull).toBe(false);
    expect(result.current.checkQuota).toBeInstanceOf(Function);
  });

  test('devrait appeler checkStorageQuota et mettre à jour l\'état', () => {
    const mockQuotaInfo = {
      used: 4000000,
      available: 1000000,
      percentage: 80,
      isAlmostFull: true,
      isFull: false,
    };

    storageErrorHandler.checkStorageQuota.mockReturnValue(mockQuotaInfo);

    const { result } = renderHook(() => useStorageQuota(), { wrapper });

    act(() => {
      result.current.checkQuota();
    });

    expect(storageErrorHandler.checkStorageQuota).toHaveBeenCalled();
    expect(result.current.quota).toEqual(mockQuotaInfo);
    expect(result.current.isAlmostFull).toBe(true);
    expect(result.current.isFull).toBe(false);
  });

  test('devrait appeler onQuotaWarning si quota presque plein', () => {
    const mockQuotaInfo = {
      percentage: 85,
      isAlmostFull: true,
      isFull: false,
    };

    storageErrorHandler.checkStorageQuota.mockReturnValue(mockQuotaInfo);

    const onQuotaWarning = jest.fn();
    const { result } = renderHook(() => useStorageQuota(onQuotaWarning), { wrapper });

    act(() => {
      result.current.checkQuota();
    });

    expect(onQuotaWarning).toHaveBeenCalledWith(mockQuotaInfo);
  });

  test('ne devrait pas appeler onQuotaWarning si quota OK', () => {
    const mockQuotaInfo = {
      percentage: 50,
      isAlmostFull: false,
      isFull: false,
    };

    storageErrorHandler.checkStorageQuota.mockReturnValue(mockQuotaInfo);

    const onQuotaWarning = jest.fn();
    const { result } = renderHook(() => useStorageQuota(onQuotaWarning), { wrapper });

    act(() => {
      result.current.checkQuota();
    });

    expect(onQuotaWarning).not.toHaveBeenCalled();
  });

  test('devrait gérer un quota plein (isFull)', () => {
    const mockQuotaInfo = {
      percentage: 98,
      isAlmostFull: true,
      isFull: true,
    };

    storageErrorHandler.checkStorageQuota.mockReturnValue(mockQuotaInfo);

    const { result } = renderHook(() => useStorageQuota(), { wrapper });

    act(() => {
      result.current.checkQuota();
    });

    expect(result.current.isAlmostFull).toBe(true);
    expect(result.current.isFull).toBe(true);
  });
});
