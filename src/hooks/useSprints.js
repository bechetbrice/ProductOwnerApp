import { useState, useEffect, useCallback } from 'react';
import { getSprints, addSprint, updateSprint, deleteSprint } from '../utils/storage';
import { autoUpdateStoryStatuses } from '../utils/sprintStatusUtils';

export const useSprints = (showNotification, addToast, userStories, setUserStories) => {
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSprints = useCallback(() => {
    const data = getSprints();
    setSprints(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSprints();
  }, [loadSprints]);

  const handleAddSprint = useCallback((sprintData) => {
    const newSprint = addSprint(sprintData);
    setSprints(prev => [...prev, newSprint]);
    
    // Mise à jour automatique des statuts ET équipes des stories
    if (sprintData.storyIds && sprintData.storyIds.length > 0) {
      const result = autoUpdateStoryStatuses(
        sprintData.storyIds,
        [],
        userStories,
        newSprint.id
      );
      
      // Hériter l'équipe du sprint
      const updatedStories = result.updatedStories.map(story => {
        if (sprintData.storyIds.includes(story.id) && sprintData.teamId) {
          return { ...story, teamId: sprintData.teamId };
        }
        return story;
      });
      
      if (result.count > 0 || sprintData.teamId) {
        localStorage.setItem('userStories', JSON.stringify(updatedStories));
        setUserStories(updatedStories);
        if (addToast) {
          addToast(
            `✅ Sprint créé ! ${result.count} story${result.count > 1 ? 's' : ''} planifiée${result.count > 1 ? 's' : ''}${sprintData.teamId ? ' et assignée' + (result.count > 1 ? 's' : '') + ' à l\'\u00e9quipe' : ''}`,
            'success'
          );
        }
      } else if (addToast) {
        addToast('✅ Sprint créé avec succès', 'success');
      }
    } else if (addToast) {
      addToast('✅ Sprint créé avec succès', 'success');
    }
    
    return newSprint;
  }, [userStories, setUserStories, addToast]);

  const handleUpdateSprint = useCallback((id, updates) => {
    setSprints(prev => {
      const oldSprint = prev.find(s => s.id === id);
      const updated = updateSprint(id, updates);
      
      if (updated) {
        // Mise à jour automatique si stories ou équipe changées
        if (updates.storyIds || updates.teamId) {
          const previousStoryIds = oldSprint?.storyIds || [];
          const currentStoryIds = updates.storyIds || oldSprint?.storyIds || [];
          const newTeamId = updates.teamId || oldSprint?.teamId;
          
          const result = autoUpdateStoryStatuses(
            currentStoryIds,
            previousStoryIds,
            userStories,
            id
          );
          
          const updatedStories = result.updatedStories.map(story => {
            if (currentStoryIds.includes(story.id) && newTeamId) {
              return { ...story, teamId: newTeamId };
            }
            return story;
          });
          
          if (result.count > 0 || updates.teamId) {
            localStorage.setItem('userStories', JSON.stringify(updatedStories));
            setUserStories(updatedStories);
            
            const messages = [];
            if (result.count > 0) {
              messages.push(`${result.count} story${result.count > 1 ? 's' : ''} actualisée${result.count > 1 ? 's' : ''}`);
            }
            if (updates.teamId) {
              const affectedCount = currentStoryIds.length;
              messages.push(`${affectedCount} story${affectedCount > 1 ? 's' : ''} assignée${affectedCount > 1 ? 's' : ''} à l'équipe`);
            }
            
            if (addToast) {
              addToast(`✅ Sprint mis à jour ! ${messages.join(' et ')}`, 'success');
            }
          } else if (addToast) {
            addToast('✅ Sprint mis à jour', 'success');
          }
        } else if (addToast) {
          addToast('✅ Sprint mis à jour', 'success');
        }
        
        return prev.map(sprint => sprint.id === id ? updated : sprint);
      }
      return prev;
    });
    
    return updateSprint(id, updates);
  }, [userStories, setUserStories, addToast]);

  const handleDeleteSprint = useCallback((id) => {
    deleteSprint(id);
    setSprints(prev => prev.filter(sprint => sprint.id !== id));
    if (showNotification) {
      showNotification('Sprint supprimé', 'success');
    }
  }, [showNotification]);

  return {
    sprints,
    loading,
    addSprint: handleAddSprint,
    updateSprint: handleUpdateSprint,
    deleteSprint: handleDeleteSprint,
    refreshSprints: loadSprints
  };
};
