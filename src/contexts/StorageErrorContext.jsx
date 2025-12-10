/**
 * Context Provider pour la gestion d'erreurs localStorage
 * 
 * @module StorageErrorContext
 * @description Fournit la gestion d'erreurs localStorage à toute l'application
 * @version 1.0.0
 */

import React, { createContext, useContext, useEffect } from 'react';
import { useStorageError, useStorageQuota } from '../hooks/useStorageError';

/**
 * Context pour les erreurs storage
 */
const StorageErrorContext = createContext(null);

/**
 * Provider pour la gestion d'erreurs localStorage
 * À wrapper autour de l'app dans App.jsx
 * 
 * @param {object} props
 * @param {ReactNode} props.children - Composants enfants
 */
export const StorageErrorProvider = ({ children }) => {
  const { 
    showStorageError, 
    hideStorageError, 
    StorageErrorComponent,
    currentError,
    isErrorOpen,
  } = useStorageError();

  const {
    quota,
    isAlmostFull,
    isFull,
    checkQuota,
  } = useStorageQuota((quotaInfo) => {
    // Alerte automatique si quota > 80%
    if (quotaInfo && quotaInfo.isAlmostFull && !isErrorOpen) {
      showStorageError({
        type: 'warning',
        title: '⚠️ Espace de stockage limité',
        message: `Vous avez utilisé ${quotaInfo.percentage}% de l'espace disponible. Pensez à exporter vos données régulièrement.`,
        actions: [
          'Exporter mes données maintenant',
          'Supprimer des éléments anciens',
        ],
        severity: 'warning',
        quota: quotaInfo,
      });
    }
  });

  // Vérifier le quota au montage et périodiquement
  useEffect(() => {
    checkQuota();
    
    // Vérifier toutes les 5 minutes
    const interval = setInterval(checkQuota, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkQuota]);

  const value = {
    showStorageError,
    hideStorageError,
    currentError,
    isErrorOpen,
    quota,
    isAlmostFull,
    isFull,
    checkQuota,
  };

  return (
    <StorageErrorContext.Provider value={value}>
      {children}
      {StorageErrorComponent}
    </StorageErrorContext.Provider>
  );
};

/**
 * Hook pour accéder au context d'erreurs storage
 * @returns {object} Context value
 * @throws {Error} Si utilisé hors du Provider
 */
export const useStorageErrorContext = () => {
  const context = useContext(StorageErrorContext);
  
  if (!context) {
    throw new Error('useStorageErrorContext must be used within StorageErrorProvider');
  }
  
  return context;
};

export default StorageErrorContext;
