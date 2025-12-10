import { createContext, useContext, useMemo } from 'react';
import { useUserStories } from '../hooks/useUserStories';

const BacklogContext = createContext(null);

/**
 * BacklogProvider - Contexte pour la gestion du backlog
 * Gère les user stories et leur priorisation
 * 
 * @param {Function} addToast - Fonction pour afficher des toasts (nécessaire pour useUserStories)
 */
export const BacklogProvider = ({ children, showNotification, addToast }) => {
  const userStories = useUserStories(showNotification, addToast);

  const value = useMemo(() => ({
    // Données
    userStories: userStories.userStories,
    
    // Actions
    userStoriesActions: {
      add: userStories.addUserStory,
      update: userStories.updateUserStory,
      delete: userStories.deleteUserStory,
      updateStatus: userStories.updateUserStoryStatus,
      refresh: userStories.refreshUserStories,
      set: userStories.setUserStories
    }
  }), [
    userStories.userStories,
    userStories.addUserStory,
    userStories.updateUserStory,
    userStories.deleteUserStory,
    userStories.updateUserStoryStatus,
    userStories.refreshUserStories,
    userStories.setUserStories
  ]);

  return (
    <BacklogContext.Provider value={value}>
      {children}
    </BacklogContext.Provider>
  );
};

/**
 * Hook pour consommer le BacklogContext
 * Utilisation : const { userStories, userStoriesActions } = useBacklogContext();
 */
export const useBacklogContext = () => {
  const context = useContext(BacklogContext);
  if (!context) {
    throw new Error('useBacklogContext must be used within BacklogProvider');
  }
  return context;
};
