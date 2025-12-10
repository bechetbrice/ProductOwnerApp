import { createContext, useContext, useMemo } from 'react';
import { useOthers } from '../hooks/useOthers';

const SettingsContext = createContext(null);

/**
 * SettingsProvider - Contexte pour les paramètres de l'application
 * Gère les rôles, entreprises, départements et autres configurations
 */
export const SettingsProvider = ({ children, showNotification }) => {
  const others = useOthers(showNotification);

  const value = useMemo(() => ({
    // Données
    settings: others.settings,
    
    // Actions
    settingsActions: {
      update: others.updateSettings,
      refresh: others.refreshAll
    }
  }), [
    others.settings,
    others.updateSettings,
    others.refreshAll
  ]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Hook pour consommer le SettingsContext
 * Utilisation : const { settings, settingsActions } = useSettingsContext();
 */
export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider');
  }
  return context;
};
