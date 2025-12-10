import { createContext, useContext, useMemo } from 'react';
import { useSprints } from '../hooks/useSprints';
import { useOthers } from '../hooks/useOthers';
import { useBacklogContext } from './BacklogContext';

const ExecutionContext = createContext(null);

/**
 * ExecutionProvider - Contexte pour l'exécution des sprints
 * Gère les sprints, tâches, sprint reviews et rétrospectives
 * 
 * ⚠️ ATTENTION : Nécessite BacklogProvider en parent (dépendance à userStories)
 * 
 * @param {Function} addToast - Fonction pour afficher des toasts (nécessaire pour useSprints)
 */
export const ExecutionProvider = ({ children, showNotification, addToast }) => {
  // Dépendance au BacklogContext pour useSprints
  const { userStories, userStoriesActions } = useBacklogContext();
  
  const sprints = useSprints(
    showNotification, 
    addToast, 
    userStories, 
    userStoriesActions.set
  );
  const others = useOthers(showNotification);

  const value = useMemo(() => ({
    // Données
    sprints: sprints.sprints,
    tasks: others.tasks,
    sprintReviews: others.sprintReviews,
    sprintRetrospectives: others.sprintRetrospectives,
    
    // Actions
    sprintsActions: {
      add: sprints.addSprint,
      update: sprints.updateSprint,
      delete: sprints.deleteSprint,
      refresh: sprints.refreshSprints
    },
    tasksActions: {
      add: others.addTask,
      update: others.updateTask,
      delete: others.deleteTask,
      refresh: others.refreshAll
    },
    sprintReviewsActions: {
      add: others.addSprintReview,
      update: others.updateSprintReview,
      delete: others.deleteSprintReview,
      refresh: others.refreshAll
    },
    sprintRetrosActions: {
      add: others.addSprintRetro,
      update: others.updateSprintRetro,
      delete: others.deleteSprintRetro,
      refresh: others.refreshAll
    }
  }), [
    sprints.sprints,
    others.tasks,
    others.sprintReviews,
    others.sprintRetrospectives,
    sprints.addSprint,
    sprints.updateSprint,
    sprints.deleteSprint,
    sprints.refreshSprints,
    others.addTask,
    others.updateTask,
    others.deleteTask,
    others.addSprintReview,
    others.updateSprintReview,
    others.deleteSprintReview,
    others.addSprintRetro,
    others.updateSprintRetro,
    others.deleteSprintRetro,
    others.refreshAll
  ]);

  return (
    <ExecutionContext.Provider value={value}>
      {children}
    </ExecutionContext.Provider>
  );
};

/**
 * Hook pour consommer le ExecutionContext
 * Utilisation : const { sprints, tasks, sprintReviews, sprintRetrospectives, sprintsActions, tasksActions, sprintReviewsActions, sprintRetrosActions } = useExecutionContext();
 */
export const useExecutionContext = () => {
  const context = useContext(ExecutionContext);
  if (!context) {
    throw new Error('useExecutionContext must be used within ExecutionProvider');
  }
  return context;
};
