import { useState, useEffect, useCallback } from 'react';
import { getUserStories, addUserStory, updateUserStory, deleteUserStory, updateUserStoryStatus } from '../utils/storage';

export const useUserStories = (showNotification, addToast) => {
  const [userStories, setUserStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUserStories = useCallback(() => {
    const data = getUserStories();
    setUserStories(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUserStories();
  }, [loadUserStories]);

  const handleAddUserStory = useCallback((storyData) => {
    const newStory = addUserStory(storyData);
    setUserStories(prev => [...prev, newStory]);
    if (showNotification) {
      showNotification('Story créée avec succès', 'success');
    }
    return newStory;
  }, [showNotification]);

  const handleUpdateUserStory = useCallback((id, updates) => {
    setUserStories(prev => {
      const oldStory = prev.find(s => s.id === id);
      const updateData = typeof updates === 'string' ? { status: updates } : updates;
      
      const updated = updateUserStory(id, updateData);
      if (updated) {
        // Toast spécifique pour changement de statut
        if (updateData.status && updateData.status !== oldStory?.status && addToast) {
          const statusLabels = {
            unassigned: '❓ Non statué',
            planned: '📋 Planifié',
            inProgress: '🔄 En cours',
            done: '✅ Terminé'
          };
          const newLabel = statusLabels[updateData.status] || updateData.status;
          const shortTitle = updated.storyTitle || updated.title.substring(0, 30) + (updated.title.length > 30 ? '...' : '');
          addToast(`${newLabel} : ${shortTitle}`, 'success', 2500);
        } else if (Object.keys(updateData).length > 1 || updateData.status === undefined) {
          if (showNotification) {
            showNotification('Story mise à jour', 'success');
          }
        }
        
        return prev.map(story => story.id === id ? updated : story);
      }
      return prev;
    });
    
    return updateUserStory(id, typeof updates === 'string' ? { status: updates } : updates);
  }, [showNotification, addToast]);

  const handleDeleteUserStory = useCallback((id) => {
    deleteUserStory(id);
    setUserStories(prev => prev.filter(story => story.id !== id));
    if (showNotification) {
      showNotification('Story supprimée', 'success');
    }
  }, [showNotification]);

  const handleUpdateUserStoryStatus = useCallback((id, status) => {
    const updated = updateUserStoryStatus(id, status);
    if (updated) {
      setUserStories(prev => prev.map(story => story.id === id ? updated : story));
    }
    return updated;
  }, []);

  return {
    userStories,
    loading,
    addUserStory: handleAddUserStory,
    updateUserStory: handleUpdateUserStory,
    deleteUserStory: handleDeleteUserStory,
    updateUserStoryStatus: handleUpdateUserStoryStatus,
    refreshUserStories: loadUserStories,
    setUserStories
  };
};
