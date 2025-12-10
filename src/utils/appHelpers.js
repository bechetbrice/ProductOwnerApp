import { exportData, importData } from './exportImport';

/**
 * Initialise l'application
 * Les migrations ont été supprimées - elles sont désormais gérées dans storage.js
 */
export const initializeApp = (showNotification) => {
  // Migrations automatiques gérées par le module storage
  // Aucune action nécessaire ici
};

/**
 * Gère l'export des données
 */
export const handleExportData = (showNotification) => {
  try {
    exportData();
    showNotification('Données exportées avec succès', 'success');
  } catch (error) {
    showNotification('Erreur lors de l\'export', 'error');
  }
};

/**
 * Gère l'import des données et le rafraîchissement des contextes
 */
export const handleImportData = (allActions, showNotification) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const result = await importData(file);
      
      if (result.success) {
        // Message de succès détaillé
        const parts = buildImportSuccessMessage(result);
        
        const confirmReload = window.confirm(
          `✅ Import réussi !\n\n` +
          `${parts.join(', ')} importés.\n\n` +
          `⚠️ Pour afficher les données, la page doit être rechargée.\n\n` +
          `Recharger maintenant ?`
        );
        
        if (confirmReload) {
          window.location.reload();
        }
      }
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };
  
  input.click();
};

/**
 * Construit le message de succès pour l'import
 */
const buildImportSuccessMessage = (result) => {
  const parts = [
    `${result.userNeeds} besoins`,
    `${result.userStories} stories`
  ];
  
  if (result.contacts) parts.push(`${result.contacts} contacts`);
  if (result.interviews) parts.push(`${result.interviews} entretiens`);
  if (result.Objectives) parts.push(`${result.Objectives} objectifs`);
  if (result.products) parts.push(`${result.products} produits`);
  
  return parts;
};

/**
 * Configure les événements globaux pour la navigation
 */
export const setupGlobalNavigation = (handlers) => {
  const handleNavigate = (e) => {
    handlers.setCurrentView(e.detail);
  };

  window.addEventListener('navigate', handleNavigate);
  
  window.createNeedFromInsight = (insight, contact, interview) => {
    handlers.handleCreateNeedFromInsight(insight, contact, interview);
  };
  
  window.navigateToNeed = (needId) => {
    handlers.handleNavigate('need', needId, { specificId: needId });
  };
  
  return () => {
    window.removeEventListener('navigate', handleNavigate);
    delete window.createNeedFromInsight;
    delete window.navigateToNeed;
  };
};

/**
 * Configure l'avertissement avant fermeture si autoSave désactivé
 */
export const setupBeforeUnloadWarning = (autoSave) => {
  const handleBeforeUnload = (e) => {
    if (!autoSave) {
      e.preventDefault();
      e.returnValue = 'Êtes-vous sûr de vouloir quitter ? Les données non sauvegardées seront perdues.';
      return e.returnValue;
    }
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};
