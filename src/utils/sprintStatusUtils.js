/**
 * Utilitaires pour la gestion automatique des statuts User Stories dans les Sprints
 * Version: 3.2.5
 */

import { USER_STORY_STATUSES } from './constants';

/**
 * Met à jour automatiquement le statut des stories lors de l'assignation/retrait d'un sprint
 * @param {Array} storyIds - IDs des stories du sprint
 * @param {Array} previousStoryIds - IDs des stories du sprint avant modification
 * @param {Array} allStories - Toutes les stories
 * @param {string} sprintId - ID du sprint (obligatoire pour assigner le sprintId)
 * @returns {Object} - Résultat avec stories mises à jour { updatedStories: Array, count: number }
 */
export const autoUpdateStoryStatuses = (storyIds, previousStoryIds = [], allStories, sprintId = null) => {
  let updatedCount = 0;
  const updatedStories = [...allStories];

  // Nouvelles stories ajoutées au sprint
  const addedStories = storyIds.filter(id => !previousStoryIds.includes(id));
  
  // Stories retirées du sprint
  const removedStories = previousStoryIds.filter(id => !storyIds.includes(id));

  // Mettre à jour les stories ajoutées : unassigned/vide → planned + assigner sprintId
  addedStories.forEach(storyId => {
    const storyIndex = updatedStories.findIndex(s => s.id === storyId);
    if (storyIndex !== -1) {
      const story = updatedStories[storyIndex];
      if (story.status === USER_STORY_STATUSES.UNASSIGNED || !story.status) {
        updatedStories[storyIndex] = {
          ...story,
          status: USER_STORY_STATUSES.PLANNED,
          sprintId: sprintId, // ✅ FIX: Assigner le sprintId
          updatedAt: new Date().toISOString()
        };
        updatedCount++;
        console.log(`✅ Story "${story.title}" → status: planned + sprintId: ${sprintId} (ajoutée au sprint)`);
      }
    }
  });

  // Mettre à jour les stories retirées : tout statut → unassigned (sauf done) + retirer sprintId
  removedStories.forEach(storyId => {
    const storyIndex = updatedStories.findIndex(s => s.id === storyId);
    if (storyIndex !== -1) {
      const story = updatedStories[storyIndex];
      if (story.status !== USER_STORY_STATUSES.DONE) {
        updatedStories[storyIndex] = {
          ...story,
          status: USER_STORY_STATUSES.UNASSIGNED,
          sprintId: null, // ✅ FIX: Retirer le sprintId
          updatedAt: new Date().toISOString()
        };
        updatedCount++;
        console.log(`✅ Story "${story.title}" → status: unassigned + sprintId: null (retirée du sprint)`);
      }
    }
  });

  return { updatedStories, count: updatedCount };
};

/**
 * Prépare les stories pour l'assignation initiale à un sprint
 * @param {Array} storyIds - IDs des stories sélectionnées
 * @param {Array} allStories - Toutes les stories
 * @returns {Array} - IDs des stories qui seront mises à jour
 */
export const getStoriesToUpdate = (storyIds, allStories) => {
  return storyIds.filter(storyId => {
    const story = allStories.find(s => s.id === storyId);
    return story && (story.status === USER_STORY_STATUSES.UNASSIGNED || !story.status);
  });
};

/**
 * Obtient un message de notification pour les mises à jour de statut
 * @param {number} updated - Nombre de stories mises à jour
 * @param {string} action - 'added' ou 'removed'
 * @returns {string} - Message de notification
 */
export const getStatusUpdateMessage = (updated, action) => {
  if (updated === 0) return '';
  
  const actionLabel = action === 'added' ? 'planifiées' : 'retirées';
  const statusLabel = action === 'added' ? 'Planifié' : 'Non statué';
  
  return `${updated} story${updated > 1 ? 's' : ''} ${actionLabel} → Statut: ${statusLabel}`;
};
