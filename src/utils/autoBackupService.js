// src/utils/autoBackupService.js

const BACKUP_KEY_PREFIX = 'productOwnerApp_backup_';
const MAX_BACKUPS = 5;

export class AutoBackupService {
  constructor(preferences) {
    this.preferences = preferences;
    this.backupInterval = null;
    this.initBackup();
  }

  initBackup() {
    if (this.preferences?.autoBackup) {
      this.startBackup();
    }
  }

  startBackup() {
    // Arrêter l'ancien interval s'il existe
    this.stopBackup();

    // Déterminer la fréquence en millisecondes
    const frequency = this.getFrequencyInMs(this.preferences.backupFrequency);
    
    // Créer une sauvegarde immédiatement
    this.createBackup();
    
    // Puis programmer les sauvegardes régulières
    this.backupInterval = setInterval(() => {
      this.createBackup();
    }, frequency);
  }

  stopBackup() {
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
      this.backupInterval = null;
    }
  }

  getFrequencyInMs(frequency) {
    switch (frequency) {
      case 'hourly':
        return 60 * 60 * 1000; // 1 heure
      case 'daily':
        return 24 * 60 * 60 * 1000; // 24 heures
      case 'weekly':
        return 7 * 24 * 60 * 60 * 1000; // 7 jours
      case 'monthly':
        return 30 * 24 * 60 * 60 * 1000; // 30 jours
      default:
        return 24 * 60 * 60 * 1000; // Par défaut : quotidien
    }
  }

  createBackup() {
    try {
      const timestamp = new Date().toISOString();
      const backupData = {
        timestamp,
        version: '1.3.4',
        userNeeds: JSON.parse(localStorage.getItem('productOwnerApp_userNeeds') || '[]'),
        userStories: JSON.parse(localStorage.getItem('productOwnerApp_userStories') || '[]'),
        contacts: JSON.parse(localStorage.getItem('productOwnerApp_contacts') || '[]'),
        interviews: JSON.parse(localStorage.getItem('productOwnerApp_interviews') || '[]'),
        templates: JSON.parse(localStorage.getItem('productOwnerApp_templates') || '[]'),
        settings: JSON.parse(localStorage.getItem('productOwnerApp_settings') || '{}'),
        preferences: JSON.parse(localStorage.getItem('productOwnerApp_preferences') || '{}')
      };

      // Calculer la taille de la backup
      const backupSize = JSON.stringify(backupData).length;

      // Sauvegarder la backup comme "latest"
      localStorage.setItem(BACKUP_KEY_PREFIX + 'latest', JSON.stringify(backupData));
      
      // Gérer la rotation des backups historiques
      this.rotateBackups(backupData, backupSize);
      
      console.log('Backup automatique créée:', timestamp, `(${this.formatSize(backupSize)})`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la création de la backup:', error);
      return false;
    }
  }

  rotateBackups(newBackup, backupSize) {
    try {
      // Récupérer l'historique des backups
      const history = JSON.parse(localStorage.getItem(BACKUP_KEY_PREFIX + 'history') || '[]');
      
      // Créer l'entrée pour la nouvelle backup
      const newEntry = {
        timestamp: newBackup.timestamp,
        size: backupSize,
        version: newBackup.version || '1.3.4'
      };
      
      // Ajouter la nouvelle backup au début
      history.unshift(newEntry);
      
      // Sauvegarder d'abord les données avant de supprimer les anciennes
      history.forEach((item, index) => {
        if (index < MAX_BACKUPS) {
          // Sauvegarder les backups dans la limite
          const key = BACKUP_KEY_PREFIX + index;
          if (index === 0) {
            // La première (nouvelle) backup
            localStorage.setItem(key, JSON.stringify(newBackup));
          } else {
            // Vérifier si la backup existe déjà
            const existingKey = BACKUP_KEY_PREFIX + (index - 1);
            const existingBackup = localStorage.getItem(existingKey);
            if (existingBackup) {
              localStorage.setItem(key, existingBackup);
            }
          }
        } else {
          // Supprimer les backups au-delà de la limite
          const keyToRemove = BACKUP_KEY_PREFIX + index;
          localStorage.removeItem(keyToRemove);
        }
      });
      
      // Limiter l'historique à MAX_BACKUPS
      if (history.length > MAX_BACKUPS) {
        history.splice(MAX_BACKUPS);
      }
      
      // Sauvegarder l'historique mis à jour
      localStorage.setItem(BACKUP_KEY_PREFIX + 'history', JSON.stringify(history));
      
    } catch (error) {
      console.error('Erreur lors de la rotation des backups:', error);
    }
  }

  getLatestBackup() {
    try {
      const backup = localStorage.getItem(BACKUP_KEY_PREFIX + 'latest');
      return backup ? JSON.parse(backup) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la backup:', error);
      return null;
    }
  }

  getBackupHistory() {
    try {
      const history = localStorage.getItem(BACKUP_KEY_PREFIX + 'history');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }

  getBackupByTimestamp(timestamp) {
    try {
      const history = this.getBackupHistory();
      const index = history.findIndex(item => item.timestamp === timestamp);
      
      if (index !== -1) {
        const backupKey = BACKUP_KEY_PREFIX + index;
        const backupData = localStorage.getItem(backupKey);
        return backupData ? JSON.parse(backupData) : null;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la backup par timestamp:', error);
      return null;
    }
  }

  restoreBackup(timestamp = null) {
    try {
      let backup;
      
      if (timestamp) {
        // Chercher une backup spécifique par timestamp
        backup = this.getBackupByTimestamp(timestamp);
        if (!backup) {
          throw new Error(`Backup avec timestamp ${timestamp} introuvable`);
        }
      } else {
        // Restaurer la dernière backup
        backup = this.getLatestBackup();
        if (!backup) {
          throw new Error('Aucune backup disponible');
        }
      }

      // Créer une backup de sécurité avant restauration
      const preRestoreBackup = {
        timestamp: new Date().toISOString(),
        version: '1.3.4',
        userNeeds: JSON.parse(localStorage.getItem('productOwnerApp_userNeeds') || '[]'),
        userStories: JSON.parse(localStorage.getItem('productOwnerApp_userStories') || '[]'),
        contacts: JSON.parse(localStorage.getItem('productOwnerApp_contacts') || '[]'),
        interviews: JSON.parse(localStorage.getItem('productOwnerApp_interviews') || '[]'),
        templates: JSON.parse(localStorage.getItem('productOwnerApp_templates') || '[]'),
        settings: JSON.parse(localStorage.getItem('productOwnerApp_settings') || '{}'),
        preferences: JSON.parse(localStorage.getItem('productOwnerApp_preferences') || '{}')
      };
      
      localStorage.setItem(BACKUP_KEY_PREFIX + 'preRestore', JSON.stringify(preRestoreBackup));

      // Restaurer toutes les données
      localStorage.setItem('productOwnerApp_userNeeds', JSON.stringify(backup.userNeeds || []));
      localStorage.setItem('productOwnerApp_userStories', JSON.stringify(backup.userStories || []));
      localStorage.setItem('productOwnerApp_contacts', JSON.stringify(backup.contacts || []));
      localStorage.setItem('productOwnerApp_interviews', JSON.stringify(backup.interviews || []));
      localStorage.setItem('productOwnerApp_templates', JSON.stringify(backup.templates || []));
      
      if (backup.settings) {
        localStorage.setItem('productOwnerApp_settings', JSON.stringify(backup.settings));
      }
      if (backup.preferences) {
        localStorage.setItem('productOwnerApp_preferences', JSON.stringify(backup.preferences));
      }

      console.log('Backup restaurée avec succès:', backup.timestamp);

      return {
        success: true,
        timestamp: backup.timestamp,
        version: backup.version || 'unknown',
        counts: {
          userNeeds: backup.userNeeds?.length || 0,
          userStories: backup.userStories?.length || 0,
          contacts: backup.contacts?.length || 0,
          interviews: backup.interviews?.length || 0,
          templates: backup.templates?.length || 0
        }
      };
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  clearBackups() {
    try {
      // Supprimer toutes les backups
      const keys = Object.keys(localStorage);
      const backupKeys = keys.filter(key => key.startsWith(BACKUP_KEY_PREFIX));
      
      backupKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      console.log(`${backupKeys.length} backups supprimées`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression des backups:', error);
      return false;
    }
  }

  getBackupStats() {
    try {
      const history = this.getBackupHistory();
      const totalSize = history.reduce((sum, backup) => sum + (backup.size || 0), 0);
      
      return {
        count: history.length,
        totalSize,
        averageSize: history.length > 0 ? Math.round(totalSize / history.length) : 0,
        oldest: history.length > 0 ? history[history.length - 1].timestamp : null,
        newest: history.length > 0 ? history[0].timestamp : null
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      return {
        count: 0,
        totalSize: 0,
        averageSize: 0,
        oldest: null,
        newest: null
      };
    }
  }

  formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  updatePreferences(newPreferences) {
    const wasEnabled = this.preferences?.autoBackup;
    const isEnabled = newPreferences?.autoBackup;
    const oldFrequency = this.preferences?.backupFrequency;
    const newFrequency = newPreferences?.backupFrequency;
    
    this.preferences = newPreferences;
    
    // Si l'état a changé
    if (wasEnabled !== isEnabled) {
      if (isEnabled) {
        console.log('Activation des sauvegardes automatiques');
        this.startBackup();
      } else {
        console.log('Désactivation des sauvegardes automatiques');
        this.stopBackup();
      }
    }
    // Si toujours activé mais la fréquence a changé
    else if (isEnabled && oldFrequency !== newFrequency) {
      console.log(`Changement de fréquence: ${oldFrequency} → ${newFrequency}`);
      this.startBackup(); // Redémarrer avec la nouvelle fréquence
    }
  }

  // Méthode de debug pour vérifier l'état du service
  debugStatus() {
    const stats = this.getBackupStats();
    console.log('=== AutoBackupService Debug ===');
    console.log('Service actif:', !!this.backupInterval);
    console.log('Préférences:', this.preferences);
    console.log('Statistiques:', stats);
    console.log('Historique:', this.getBackupHistory());
    console.log('===============================');
  }
}

// Instance singleton
let backupServiceInstance = null;

export const getBackupService = (preferences = null) => {
  if (!backupServiceInstance && preferences) {
    backupServiceInstance = new AutoBackupService(preferences);
  }
  return backupServiceInstance;
};

export const initBackupService = (preferences) => {
  if (backupServiceInstance) {
    backupServiceInstance.updatePreferences(preferences);
  } else {
    backupServiceInstance = new AutoBackupService(preferences);
  }
  return backupServiceInstance;
};

// Export des constantes pour les tests
export { BACKUP_KEY_PREFIX, MAX_BACKUPS };
