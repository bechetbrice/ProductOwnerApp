/**
 * Gestionnaire centralisé des erreurs localStorage
 * 
 * @module storageErrorHandler
 * @description Gestion robuste des erreurs localStorage avec notifications utilisateur
 * @version 1.0.0
 * @date 2025-12-08
 * 
 * Fonctionnalités :
 * - Détection automatique des erreurs localStorage
 * - Messages utilisateur clairs et actionnables
 * - Backup automatique avant opérations critiques
 * - Gestion quota exceeded (5-10 MB)
 * - Logs détaillés pour debugging
 * - Récupération automatique si possible
 */

// ============================================================================
// TYPES D'ERREURS LOCALSTORAGE
// ============================================================================

/**
 * Types d'erreurs gérées
 */
export const StorageErrorType = {
  QUOTA_EXCEEDED: 'QuotaExceededError',
  SECURITY_ERROR: 'SecurityError',
  NOT_SUPPORTED: 'NotSupportedError',
  DATA_CLONE: 'DataCloneError',
  INVALID_STATE: 'InvalidStateError',
  PARSE_ERROR: 'ParseError',
  UNKNOWN: 'UnknownError',
};

/**
 * Messages utilisateur pour chaque type d'erreur
 */
const ERROR_MESSAGES = {
  [StorageErrorType.QUOTA_EXCEEDED]: {
    title: '💾 Espace de stockage saturé',
    message: 'Votre navigateur a atteint la limite de stockage (5-10 MB). Veuillez libérer de l\'espace ou exporter vos données.',
    actions: [
      'Exporter vos données',
      'Supprimer des éléments anciens',
      'Vider le cache du navigateur',
    ],
    severity: 'critical',
  },
  [StorageErrorType.SECURITY_ERROR]: {
    title: '🔒 Erreur de sécurité',
    message: 'Le navigateur bloque l\'accès au stockage local. Cela peut arriver en navigation privée ou avec certaines restrictions de sécurité.',
    actions: [
      'Désactiver le mode navigation privée',
      'Vérifier les paramètres de sécurité du navigateur',
      'Autoriser le stockage local pour ce site',
    ],
    severity: 'critical',
  },
  [StorageErrorType.NOT_SUPPORTED]: {
    title: '⚠️ Fonctionnalité non supportée',
    message: 'Votre navigateur ne supporte pas le stockage local. Veuillez utiliser un navigateur moderne (Chrome, Firefox, Safari, Edge).',
    actions: [
      'Mettre à jour votre navigateur',
      'Utiliser un navigateur moderne',
    ],
    severity: 'critical',
  },
  [StorageErrorType.DATA_CLONE]: {
    title: '❌ Erreur de données',
    message: 'Les données ne peuvent pas être stockées (format invalide). Veuillez contacter le support.',
    actions: [],
    severity: 'error',
  },
  [StorageErrorType.INVALID_STATE]: {
    title: '⚠️ État invalide',
    message: 'Le stockage est dans un état invalide. Veuillez rafraîchir la page.',
    actions: ['Rafraîchir la page (F5)'],
    severity: 'error',
  },
  [StorageErrorType.PARSE_ERROR]: {
    title: '🔧 Erreur de lecture des données',
    message: 'Les données stockées sont corrompues. Une restauration depuis un backup peut être nécessaire.',
    actions: [
      'Restaurer depuis un backup',
      'Contacter le support',
    ],
    severity: 'error',
  },
  [StorageErrorType.UNKNOWN]: {
    title: '❓ Erreur inconnue',
    message: 'Une erreur inattendue s\'est produite lors de l\'accès au stockage.',
    actions: [
      'Rafraîchir la page',
      'Vider le cache du navigateur',
      'Contacter le support',
    ],
    severity: 'error',
  },
};

// ============================================================================
// DÉTECTION ET CLASSIFICATION DES ERREURS
// ============================================================================

/**
 * Détecte le type d'erreur localStorage
 * @param {Error} error - Erreur capturée
 * @returns {string} Type d'erreur (StorageErrorType)
 */
export const detectErrorType = (error) => {
  if (!error) return StorageErrorType.UNKNOWN;
  
  // QuotaExceededError (Firefox, Chrome, Safari)
  if (
    error.name === 'QuotaExceededError' ||
    error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    error.code === 22 ||
    error.code === 1014
  ) {
    return StorageErrorType.QUOTA_EXCEEDED;
  }
  
  // SecurityError
  if (error.name === 'SecurityError') {
    return StorageErrorType.SECURITY_ERROR;
  }
  
  // NotSupportedError
  if (error.name === 'NotSupportedError') {
    return StorageErrorType.NOT_SUPPORTED;
  }
  
  // DataCloneError
  if (error.name === 'DataCloneError') {
    return StorageErrorType.DATA_CLONE;
  }
  
  // InvalidStateError
  if (error.name === 'InvalidStateError') {
    return StorageErrorType.INVALID_STATE;
  }
  
  // JSON.parse errors
  if (error instanceof SyntaxError) {
    return StorageErrorType.PARSE_ERROR;
  }
  
  return StorageErrorType.UNKNOWN;
};

/**
 * Obtient le message utilisateur pour une erreur
 * @param {string} errorType - Type d'erreur
 * @returns {object} { title, message, actions, severity }
 */
export const getErrorMessage = (errorType) => {
  return ERROR_MESSAGES[errorType] || ERROR_MESSAGES[StorageErrorType.UNKNOWN];
};

// ============================================================================
// BACKUP AUTOMATIQUE
// ============================================================================

const BACKUP_KEY_PREFIX = 'po_app_backup_';
const MAX_BACKUPS = 3; // Garder les 3 derniers backups

/**
 * Crée un backup automatique avant une opération critique
 * @param {string} storageKey - Clé localStorage à backuper
 * @returns {boolean} true si backup réussi
 */
export const createBackup = (storageKey) => {
  try {
    const data = localStorage.getItem(storageKey);
    if (!data) return false;
    
    const backupKey = `${BACKUP_KEY_PREFIX}${storageKey}_${Date.now()}`;
    localStorage.setItem(backupKey, data);
    
    // Nettoyer les vieux backups
    cleanOldBackups(storageKey);
    
    console.log(`✅ Backup créé: ${backupKey}`);
    return true;
  } catch (error) {
    console.error('[Backup] Erreur création backup:', error);
    return false;
  }
};

/**
 * Nettoie les vieux backups (garde les MAX_BACKUPS plus récents)
 * @param {string} storageKey - Clé localStorage concernée
 */
const cleanOldBackups = (storageKey) => {
  try {
    const backupKeys = [];
    
    // Trouver tous les backups de cette clé avec timestamps
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${BACKUP_KEY_PREFIX}${storageKey}_`)) {
        // Extraire timestamp du nom de clé
        const parts = key.split('_');
        const timestamp = parseInt(parts[parts.length - 1]);
        backupKeys.push({ key, timestamp });
      }
    }
    
    // Trier par timestamp décroissant (plus récent en premier)
    backupKeys.sort((a, b) => b.timestamp - a.timestamp);
    
    // Supprimer les vieux backups (garder les MAX_BACKUPS plus récents)
    if (backupKeys.length > MAX_BACKUPS) {
      backupKeys.slice(MAX_BACKUPS).forEach(({ key }) => {
        localStorage.removeItem(key);
        console.log(`🗑️  Backup supprimé: ${key}`);
      });
    }
  } catch (error) {
    console.error('[Backup] Erreur nettoyage backups:', error);
  }
};

/**
 * Restaure depuis le backup le plus récent
 * @param {string} storageKey - Clé localStorage à restaurer
 * @returns {boolean} true si restauration réussie
 */
export const restoreFromBackup = (storageKey) => {
  try {
    const backupKeys = [];
    
    // Trouver tous les backups de cette clé
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${BACKUP_KEY_PREFIX}${storageKey}_`)) {
        backupKeys.push(key);
      }
    }
    
    if (backupKeys.length === 0) {
      console.warn('[Backup] Aucun backup trouvé');
      return false;
    }
    
    // Trier et prendre le plus récent
    backupKeys.sort().reverse();
    const latestBackup = backupKeys[0];
    
    const backupData = localStorage.getItem(latestBackup);
    if (!backupData) return false;
    
    localStorage.setItem(storageKey, backupData);
    console.log(`✅ Restauration depuis: ${latestBackup}`);
    
    return true;
  } catch (error) {
    console.error('[Backup] Erreur restauration:', error);
    return false;
  }
};

/**
 * Liste tous les backups disponibles
 * @param {string} storageKey - Clé localStorage (optionnel, sinon tous)
 * @returns {Array} Liste des backups avec métadonnées
 */
export const listBackups = (storageKey = null) => {
  const backups = [];
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(BACKUP_KEY_PREFIX)) continue;
      
      if (storageKey && !key.startsWith(`${BACKUP_KEY_PREFIX}${storageKey}_`)) {
        continue;
      }
      
      const parts = key.split('_');
      const timestamp = parseInt(parts[parts.length - 1]);
      const data = localStorage.getItem(key);
      
      backups.push({
        key,
        storageKey: key.substring(BACKUP_KEY_PREFIX.length, key.lastIndexOf('_')),
        timestamp,
        date: new Date(timestamp).toISOString(),
        size: data ? data.length : 0,
      });
    }
    
    return backups.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('[Backup] Erreur liste backups:', error);
    return [];
  }
};

// ============================================================================
// GESTION QUOTA EXCEEDED
// ============================================================================

/**
 * Vérifie l'espace disponible (approximatif)
 * @returns {object} { used, available, percentage, isAlmostFull, isFull }
 */
export const checkStorageQuota = () => {
  let totalSize = 0;
  
  try {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage[key];
        totalSize += key.length + (value ? value.length : 0);
      }
    }
    
    // Estimation quota: 5-10 MB selon navigateur
    const estimatedQuota = 5 * 1024 * 1024; // 5 MB conservateur
    const percentage = Math.round((totalSize / estimatedQuota) * 100);
    
    return {
      used: totalSize,
      available: estimatedQuota - totalSize,
      percentage,
      usedMB: (totalSize / (1024 * 1024)).toFixed(2),
      availableMB: ((estimatedQuota - totalSize) / (1024 * 1024)).toFixed(2),
      quotaMB: (estimatedQuota / (1024 * 1024)).toFixed(0),
      isAlmostFull: percentage > 80,
      isFull: percentage > 95,
    };
  } catch (error) {
    console.error('[Quota] Erreur vérification quota:', error);
    return {
      used: 0,
      available: 0,
      percentage: 0,
      usedMB: '0',
      availableMB: '0',
      quotaMB: '5',
      isAlmostFull: false,
      isFull: false,
    };
  }
};

/**
 * Tente de libérer de l'espace automatiquement
 * @returns {object} { success, freedSpace, actions }
 */
export const tryFreeSpace = () => {
  const freedActions = [];
  let initialSize = 0;
  
  try {
    // Calculer taille initiale
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        initialSize += key.length + (value ? value.length : 0);
      }
    }
    
    // 1. Supprimer les vieux backups (garder seulement les 2 plus récents)
    const backupKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(BACKUP_KEY_PREFIX)) {
        const parts = key.split('_');
        const timestamp = parseInt(parts[parts.length - 1]);
        backupKeys.push({ key, timestamp });
      }
    }
    
    // Trier par timestamp décroissant et supprimer les vieux
    if (backupKeys.length > 2) {
      backupKeys.sort((a, b) => b.timestamp - a.timestamp);
      const toDelete = backupKeys.slice(2);
      toDelete.forEach(({ key }) => {
        localStorage.removeItem(key);
      });
      freedActions.push(`Supprimé ${toDelete.length} vieux backups`);
    }
    
    // 2. Supprimer les clés de migration obsolètes
    const migrationKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('po_app_migration_')) {
        migrationKeys.push(key);
      }
    }
    
    if (migrationKeys.length > 0) {
      migrationKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      freedActions.push(`Supprimé ${migrationKeys.length} clés de migration`);
    }
    
    // Calculer taille finale
    let currentSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        currentSize += key.length + (value ? value.length : 0);
      }
    }
    
    const freedSpace = initialSize - currentSize;
    
    return {
      success: freedSpace > 0,
      freedSpace,
      freedMB: (freedSpace / (1024 * 1024)).toFixed(2),
      actions: freedActions,
    };
  } catch (error) {
    console.error('[Quota] Erreur libération espace:', error);
    return {
      success: false,
      freedSpace: 0,
      freedMB: '0',
      actions: [],
    };
  }
};

// ============================================================================
// WRAPPER DE GESTION D'ERREURS
// ============================================================================

/**
 * Exécute une opération localStorage avec gestion d'erreurs complète
 * @param {Function} operation - Fonction à exécuter
 * @param {object} options - Options { backup, storageKey, operationName, notifyCallback }
 * @returns {object} { success, data, error }
 */
export const safeStorageOperation = async (operation, options = {}) => {
  const {
    backup = false,
    storageKey = null,
    operationName = 'Opération',
    notifyCallback = null,
  } = options;
  
  try {
    // Créer backup si demandé (avant l'opération)
    if (backup && storageKey) {
      createBackup(storageKey);
    }
    
    // Exécuter l'opération
    const data = await operation();
    
    return { success: true, data, error: null };
    
  } catch (error) {
    console.error(`[Storage] Erreur ${operationName}:`, error);
    
    const errorType = detectErrorType(error);
    const errorInfo = {
      type: errorType,
      ...getErrorMessage(errorType),
      originalError: error,
      operationName,
    };
    
    // Tenter récupération automatique pour QUOTA_EXCEEDED
    if (errorType === StorageErrorType.QUOTA_EXCEEDED) {
      console.log('[Storage] Quota exceeded, tentative libération espace...');
      const freed = tryFreeSpace();
      
      if (freed.success) {
        console.log(`[Storage] Espace libéré: ${freed.freedMB} MB, retry opération...`);
        
        // Retry une fois après libération
        try {
          const data = await operation();
          console.log(`✅ [Storage] Opération réussie après libération espace`);
          return { success: true, data, error: null };
        } catch (retryError) {
          console.error('[Storage] Retry échoué:', retryError);
          // Continue avec notification d'erreur
        }
      }
    }
    
    // Notification callback
    if (notifyCallback) {
      notifyCallback(errorInfo);
    }
    
    return { success: false, data: null, error: errorInfo };
  }
};

// ============================================================================
// EXPORT PAR DÉFAUT
// ============================================================================

export default {
  StorageErrorType,
  detectErrorType,
  getErrorMessage,
  createBackup,
  restoreFromBackup,
  listBackups,
  checkStorageQuota,
  tryFreeSpace,
  safeStorageOperation,
};
