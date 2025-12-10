/**
 * Utilitaire de gestion du quota localStorage
 * Détecte l'utilisation et affiche des alertes préventives
 * 
 * @module storageQuota
 * @version 1.0.0
 */

/**
 * Estime la taille utilisée dans localStorage (en octets)
 * @returns {number} Taille en octets
 */
export const getStorageSize = () => {
  let total = 0;
  
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const value = localStorage.getItem(key);
      total += key.length + (value ? value.length : 0);
    }
  }
  
  return total;
};

/**
 * Convertit des octets en format lisible
 * @param {number} bytes - Nombre d'octets
 * @returns {string} Format lisible (ex: "2.5 MB")
 */
export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Estime le quota maximum localStorage (5MB ou 10MB selon navigateur)
 * @returns {number} Quota estimé en octets
 */
export const getEstimatedQuota = () => {
  // Test en écrivant des données pour détecter la limite
  // La plupart des navigateurs : 5MB (5 * 1024 * 1024)
  // Certains permettent 10MB
  
  // On estime de manière conservative : 5MB
  return 5 * 1024 * 1024;
};

/**
 * Calcule le pourcentage d'utilisation du quota
 * @returns {number} Pourcentage (0-100)
 */
export const getQuotaUsagePercent = () => {
  const used = getStorageSize();
  const quota = getEstimatedQuota();
  
  return Math.round((used / quota) * 100);
};

/**
 * Vérifie si le quota approche de la limite (> 80%)
 * @returns {boolean} true si > 80%
 */
export const isQuotaWarning = () => {
  return getQuotaUsagePercent() >= 80;
};

/**
 * Vérifie si le quota est critique (> 90%)
 * @returns {boolean} true si > 90%
 */
export const isQuotaCritical = () => {
  return getQuotaUsagePercent() >= 90;
};

/**
 * Obtient les statistiques complètes du quota
 * @returns {object} Statistiques { used, quota, percent, formatted }
 */
export const getQuotaStats = () => {
  const used = getStorageSize();
  const quota = getEstimatedQuota();
  const percent = getQuotaUsagePercent();
  
  return {
    used,
    quota,
    percent,
    usedFormatted: formatBytes(used),
    quotaFormatted: formatBytes(quota),
    remaining: quota - used,
    remainingFormatted: formatBytes(quota - used),
    isWarning: percent >= 80,
    isCritical: percent >= 90,
  };
};

/**
 * Teste si on peut écrire dans localStorage
 * @returns {boolean} true si écriture possible
 */
export const canWriteToStorage = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Obtient un message d'alerte basé sur l'utilisation
 * @returns {object|null} { level: 'warning'|'critical', message, stats } ou null
 */
export const getQuotaAlert = () => {
  const stats = getQuotaStats();
  
  if (stats.isCritical) {
    return {
      level: 'critical',
      title: '⚠️ Quota localStorage critique !',
      message: `Vous utilisez ${stats.percent}% du quota (${stats.usedFormatted}/${stats.quotaFormatted}). Exportez vos données et nettoyez l'historique pour éviter la perte de données.`,
      stats,
    };
  }
  
  if (stats.isWarning) {
    return {
      level: 'warning',
      title: '⚠️ Quota localStorage élevé',
      message: `Vous utilisez ${stats.percent}% du quota (${stats.usedFormatted}/${stats.quotaFormatted}). Pensez à exporter régulièrement vos données.`,
      stats,
    };
  }
  
  return null;
};

// Note: useStorageQuota hook disponible dans un composant React séparé
// Utiliser getQuotaAlert() et getQuotaStats() dans les composants
