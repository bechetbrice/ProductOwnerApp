/**
 * AutoExportContext - Export automatique intelligent
 * 
 * Fonctionnalités :
 * - Export automatique périodique (configurable)
 * - Détection des modifications
 * - Limite quotidienne d'exports
 * - Statistiques détaillées
 * - Notifications avant export
 */

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AutoExportContext = createContext(null);

export const useAutoExport = () => {
  const context = useContext(AutoExportContext);
  if (!context) {
    throw new Error('useAutoExport doit être utilisé dans AutoExportProvider');
  }
  return context;
};

// Configuration par défaut
const DEFAULT_CONFIG = {
  enabled: false,
  interval: 30, // minutes
  maxExportsPerDay: 10,
  notifyBeforeExport: true,
  notifyDelay: 10 // secondes
};

// Clés localStorage
const STORAGE_KEYS = {
  config: 'productOwnerApp_autoExport_config',
  stats: 'productOwnerApp_autoExport_stats'
};

export const AutoExportProvider = ({ children }) => {
  // Configuration
  const [config, setConfigState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.config);
    if (saved) {
      try {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      } catch (error) {
        console.error('Erreur chargement config AutoExport:', error);
      }
    }
    return DEFAULT_CONFIG;
  });

  // Statistiques
  const [stats, setStatsState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.stats);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Réinitialiser si nouveau jour
        const lastExportDate = parsed.lastExportDate ? new Date(parsed.lastExportDate) : null;
        const today = new Date().toDateString();
        
        if (!lastExportDate || lastExportDate.toDateString() !== today) {
          return {
            lastExportDate: null,
            exportsToday: 0,
            totalExports: parsed.totalExports || 0,
            lastExportSuccess: true
          };
        }
        return parsed;
      } catch (error) {
        console.error('Erreur chargement stats AutoExport:', error);
      }
    }
    return {
      lastExportDate: null,
      exportsToday: 0,
      totalExports: 0,
      lastExportSuccess: true
    };
  });

  // Détection des modifications
  const lastDataSnapshot = useRef(null);
  const [hasChanges, setHasChanges] = useState(false);
  const exportTimerRef = useRef(null);
  const notificationTimerRef = useRef(null);

  /**
   * Sauvegarder la configuration
   */
  const saveConfig = useCallback((newConfig) => {
    setConfigState(newConfig);
    localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(newConfig));
  }, []);

  /**
   * Sauvegarder les statistiques
   */
  const saveStats = useCallback((newStats) => {
    setStatsState(newStats);
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(newStats));
  }, []);

  /**
   * Mettre à jour la configuration
   */
  const updateConfig = useCallback((updates) => {
    saveConfig({ ...config, ...updates });
  }, [config, saveConfig]);

  /**
   * Créer un snapshot des données
   */
  const createDataSnapshot = useCallback(() => {
    const keys = [
      'productOwnerApp_products',
      'productOwnerApp_objectives',
      'productOwnerApp_userStories',
      'productOwnerApp_userNeeds',
      'productOwnerApp_sprints',
      'productOwnerApp_tasks',
      'productOwnerApp_contacts',
      'productOwnerApp_interviews',
      'productOwnerApp_personas',
      'productOwnerApp_teams',
      'productOwnerApp_budgetEntries',
      'productOwnerApp_sprintReviews',
      'productOwnerApp_sprintRetrospectives'
    ];
    
    const data = {};
    keys.forEach(key => {
      data[key] = localStorage.getItem(key) || '';
    });
    
    return JSON.stringify(data);
  }, []);

  /**
   * Vérifier si les données ont changé
   */
  const checkForChanges = useCallback(() => {
    const currentSnapshot = createDataSnapshot();
    
    if (lastDataSnapshot.current === null) {
      lastDataSnapshot.current = currentSnapshot;
      return false;
    }

    const changed = lastDataSnapshot.current !== currentSnapshot;
    setHasChanges(changed);
    return changed;
  }, [createDataSnapshot]);

  /**
   * Exporter les données
   */
  const performExport = useCallback(() => {
    try {
      // Vérifier les limites
      if (stats.exportsToday >= config.maxExportsPerDay) {
        console.log('❌ Limite d\'exports journaliers atteinte');
        return false;
      }

      // Récupérer toutes les données
      const exportData = {
        version: '2.0.0',
        exportDate: new Date().toISOString(),
        exportType: 'auto',
        metadata: {
          appName: 'ProductOwnerApp',
          exportedBy: 'AutoExport'
        },
        data: {
          products: JSON.parse(localStorage.getItem('productOwnerApp_products') || '[]'),
          objectives: JSON.parse(localStorage.getItem('productOwnerApp_objectives') || '[]'),
          userStories: JSON.parse(localStorage.getItem('productOwnerApp_userStories') || '[]'),
          userNeeds: JSON.parse(localStorage.getItem('productOwnerApp_userNeeds') || '[]'),
          sprints: JSON.parse(localStorage.getItem('productOwnerApp_sprints') || '[]'),
          tasks: JSON.parse(localStorage.getItem('productOwnerApp_tasks') || '[]'),
          contacts: JSON.parse(localStorage.getItem('productOwnerApp_contacts') || '[]'),
          interviews: JSON.parse(localStorage.getItem('productOwnerApp_interviews') || '[]'),
          personas: JSON.parse(localStorage.getItem('productOwnerApp_personas') || '[]'),
          teams: JSON.parse(localStorage.getItem('productOwnerApp_teams') || '[]'),
          budgetEntries: JSON.parse(localStorage.getItem('productOwnerApp_budgetEntries') || '[]'),
          sprintReviews: JSON.parse(localStorage.getItem('productOwnerApp_sprintReviews') || '[]'),
          sprintRetrospectives: JSON.parse(localStorage.getItem('productOwnerApp_sprintRetrospectives') || '[]'),
          settings: JSON.parse(localStorage.getItem('productOwnerApp_settings') || '{}')
        }
      };

      // Créer le nom de fichier
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
      const filename = `productownerapp_auto_${dateStr}_${timeStr}.json`;

      // Télécharger le fichier
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);

      // Mettre à jour les statistiques
      const newStats = {
        lastExportDate: now.toISOString(),
        exportsToday: stats.exportsToday + 1,
        totalExports: stats.totalExports + 1,
        lastExportSuccess: true
      };
      saveStats(newStats);

      // Réinitialiser le snapshot et le flag de changements
      lastDataSnapshot.current = createDataSnapshot();
      setHasChanges(false);

      console.log('✅ Export automatique réussi:', filename);
      return true;
    } catch (error) {
      console.error('❌ Erreur export automatique:', error);
      
      const newStats = {
        ...stats,
        lastExportSuccess: false
      };
      saveStats(newStats);

      return false;
    }
  }, [stats, config, saveStats, createDataSnapshot]);

  /**
   * Déclencher un export avec notification préalable
   */
  const triggerExport = useCallback(() => {
    // Annuler toute notification en cours
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }

    if (config.notifyBeforeExport) {
      console.log(`🔔 Export automatique dans ${config.notifyDelay} secondes...`);
      
      // Programmer l'export après le délai
      notificationTimerRef.current = setTimeout(() => {
        performExport();
      }, config.notifyDelay * 1000);
    } else {
      // Export immédiat sans notification
      performExport();
    }
  }, [config, performExport]);

  /**
   * Planifier le prochain export
   */
  const scheduleNextExport = useCallback(() => {
    // Annuler le timer existant
    if (exportTimerRef.current) {
      clearInterval(exportTimerRef.current);
    }

    if (!config.enabled) {
      return;
    }

    // Créer un nouveau timer
    const intervalMs = config.interval * 60 * 1000;

    exportTimerRef.current = setInterval(() => {
      console.log('⏰ Timer export déclenché');
      
      // Vérifier s'il y a des modifications
      const changed = checkForChanges();
      
      if (changed) {
        console.log('✅ Modifications détectées - Export déclenché');
        triggerExport();
      } else {
        console.log('ℹ️ Aucune modification - Export ignoré');
      }
    }, intervalMs);

    console.log(`⏱️ Export automatique programmé toutes les ${config.interval} minutes`);
  }, [config, checkForChanges, triggerExport]);

  /**
   * Export manuel (accessible depuis l'interface)
   */
  const manualExport = useCallback(() => {
    return performExport();
  }, [performExport]);

  /**
   * Réinitialiser les statistiques du jour
   */
  const resetDailyStats = useCallback(() => {
    const newStats = {
      ...stats,
      exportsToday: 0,
      lastExportDate: null
    };
    saveStats(newStats);
  }, [stats, saveStats]);

  /**
   * Effet : Détecter les changements dans les données
   */
  useEffect(() => {
    if (config.enabled) {
      checkForChanges();
    }
  }, [config.enabled, checkForChanges]);

  /**
   * Effet : Gérer le timer d'export
   */
  useEffect(() => {
    scheduleNextExport();

    // Cleanup
    return () => {
      if (exportTimerRef.current) {
        clearInterval(exportTimerRef.current);
      }
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, [scheduleNextExport]);

  /**
   * Effet : Réinitialiser les stats à minuit
   */
  useEffect(() => {
    const checkMidnight = setInterval(() => {
      const now = new Date();
      const lastExport = stats.lastExportDate ? new Date(stats.lastExportDate) : null;
      
      if (lastExport && lastExport.toDateString() !== now.toDateString()) {
        resetDailyStats();
      }
    }, 60000); // Vérifier chaque minute

    return () => clearInterval(checkMidnight);
  }, [stats.lastExportDate, resetDailyStats]);

  const value = {
    config,
    updateConfig,
    stats,
    hasChanges,
    manualExport,
    resetDailyStats
  };

  return (
    <AutoExportContext.Provider value={value}>
      {children}
    </AutoExportContext.Provider>
  );
};
