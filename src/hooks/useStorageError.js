/**
 * Hook de gestion centralisée des erreurs localStorage
 * 
 * @hook useStorageError
 * @description Gère l'affichage des erreurs localStorage et les actions utilisateur
 * @version 1.0.0
 * 
 * Usage:
 * const { showStorageError, StorageErrorComponent } = useStorageError();
 * 
 * // Dans le code métier
 * const result = Products.add(data); // Si erreur, modal s'affiche automatiquement
 * 
 * // Dans le JSX
 * return (
 *   <>
 *     {StorageErrorComponent}
 *     {/* Reste du composant *\/}
 *   </>
 * );
 */

import { useState, useCallback } from 'react';
import StorageErrorModal from '../components/ui/StorageErrorModal';
import { 
  checkStorageQuota, 
  restoreFromBackup,
  StorageErrorType 
} from '../utils/storage/storageErrorHandler';

/**
 * Hook de gestion des erreurs localStorage
 * @returns {object} { showStorageError, hideStorageError, StorageErrorComponent, currentError }
 */
export const useStorageError = () => {
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Affiche une erreur localStorage
   * @param {object} errorInfo - Informations sur l'erreur
   */
  const showStorageError = useCallback((errorInfo) => {
    console.error('[Storage Error]', errorInfo);
    setError(errorInfo);
    setIsOpen(true);
  }, []);

  /**
   * Ferme la modal d'erreur
   */
  const hideStorageError = useCallback(() => {
    setIsOpen(false);
    // Garder l'erreur en mémoire un instant pour l'animation
    setTimeout(() => setError(null), 300);
  }, []);

  /**
   * Gère les actions utilisateur depuis la modal
   * @param {number} actionIndex - Index de l'action cliquée
   */
  const handleAction = useCallback((actionIndex) => {
    if (!error || !error.actions || !error.actions[actionIndex]) return;
    
    const action = error.actions[actionIndex];
    
    // Actions prédéfinies
    if (action.includes('Export')) {
      // Trigger export de toutes les données
      const { exportAllData } = require('../utils/storage');
      const exportedData = exportAllData();
      
      // Créer un blob et déclencher téléchargement
      const blob = new Blob([JSON.stringify(exportedData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `productownerapp_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      hideStorageError();
    } 
    else if (action.includes('Rafraîchir') || action.includes('page')) {
      // Rafraîchir la page
      window.location.reload();
    }
    else if (action.includes('Restaurer') || action.includes('backup')) {
      // Tenter restauration depuis backup
      if (error.storageKey) {
        const restored = restoreFromBackup(error.storageKey);
        if (restored) {
          alert('✅ Données restaurées depuis le backup. La page va se rafraîchir.');
          window.location.reload();
        } else {
          alert('❌ Aucun backup disponible pour restaurer.');
        }
      }
    }
    else if (action.includes('espace') || action.includes('Supprimer')) {
      // Rediriger vers les paramètres ou ouvrir modal de gestion
      // TODO: Implémenter page de gestion du stockage
      alert('⚙️ Fonctionnalité de gestion du stockage à venir. Veuillez exporter vos données manuellement.');
    }
    else {
      // Action non gérée, juste fermer
      hideStorageError();
    }
  }, [error, hideStorageError]);

  // Composant à rendre dans l'app
  const StorageErrorComponent = (
    <StorageErrorModal
      isOpen={isOpen}
      onClose={hideStorageError}
      error={error}
      onAction={handleAction}
    />
  );

  return {
    showStorageError,
    hideStorageError,
    StorageErrorComponent,
    currentError: error,
    isErrorOpen: isOpen,
  };
};

/**
 * Hook pour surveiller le quota de stockage
 * Affiche une alerte si quota > 80%
 * 
 * @param {function} onQuotaWarning - Callback si quota élevé
 * @returns {object} { quota, isAlmostFull, isFull, checkQuota }
 */
export const useStorageQuota = (onQuotaWarning = null) => {
  const [quota, setQuota] = useState(null);

  const checkQuota = useCallback(() => {
    const quotaInfo = checkStorageQuota();
    setQuota(quotaInfo);
    
    if (quotaInfo && quotaInfo.isAlmostFull && onQuotaWarning) {
      onQuotaWarning(quotaInfo);
    }
    
    return quotaInfo;
  }, [onQuotaWarning]);

  return {
    quota,
    isAlmostFull: quota?.isAlmostFull || false,
    isFull: quota?.isFull || false,
    checkQuota,
  };
};

export default useStorageError;
