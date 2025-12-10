import { useState, useEffect, useCallback } from 'react';
import { UserNeeds } from '../utils/storage';

export const useUserNeeds = (showNotification) => {
  const [userNeeds, setUserNeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUserNeeds = useCallback(() => {
    const data = UserNeeds.get();
    setUserNeeds(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUserNeeds();
  }, [loadUserNeeds]);

  const handleAddUserNeed = useCallback((needData) => {
    const newNeed = UserNeeds.add(needData);
    setUserNeeds(prev => [...prev, newNeed]);
    if (showNotification) {
      showNotification('Besoin créé avec succès', 'success');
    }
    return newNeed;
  }, [showNotification]);

  const handleUpdateUserNeed = useCallback((id, updates) => {
    const updated = UserNeeds.update(id, updates);
    if (updated) {
      setUserNeeds(prev => prev.map(need => need.id === id ? updated : need));
      if (showNotification) {
        showNotification('Besoin mis à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteUserNeed = useCallback((id) => {
    UserNeeds.remove(id);
    setUserNeeds(prev => prev.filter(need => need.id !== id));
    if (showNotification) {
      showNotification('Besoin supprimé', 'success');
    }
  }, [showNotification]);

  const handleImportUserNeeds = useCallback(async (needsToImport) => {
    try {
      const newNeeds = UserNeeds.addMany(needsToImport);
      setUserNeeds(UserNeeds.get());
      
      if (newNeeds.length > 0 && showNotification) {
        showNotification(`${newNeeds.length} besoin(s) importé(s) avec succès`, 'success');
      }
      
      return newNeeds.length;
    } catch (error) {
      console.error('Erreur lors de l\'import des besoins:', error);
      if (showNotification) {
        showNotification('Erreur lors de l\'import', 'error');
      }
      return 0;
    }
  }, [showNotification]);

  return {
    userNeeds,
    loading,
    addUserNeed: handleAddUserNeed,
    updateUserNeed: handleUpdateUserNeed,
    deleteUserNeed: handleDeleteUserNeed,
    importUserNeeds: handleImportUserNeeds,
    refreshUserNeeds: loadUserNeeds
  };
};
