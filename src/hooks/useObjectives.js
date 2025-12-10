import { useState, useEffect, useCallback } from 'react';
import { Objectives } from '../utils/storage';

export const useObjectives = (showNotification) => {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadObjectives = useCallback(() => {
    const data = Objectives.get();
    setObjectives(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadObjectives();
  }, [loadObjectives]);

  const handleAddObjective = useCallback((objectiveData) => {
    const newObjective = Objectives.add(objectiveData);
    setObjectives(prev => [...prev, newObjective]);
    if (showNotification) {
      showNotification('Objectif créé avec succès', 'success');
    }
    return newObjective;
  }, [showNotification]);

  const handleUpdateObjective = useCallback((id, updates) => {
    const updated = Objectives.update(id, updates);
    if (updated) {
      setObjectives(prev => prev.map(objective => objective.id === id ? updated : objective));
      if (showNotification) {
        showNotification('Objectif mis à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteObjective = useCallback((id) => {
    Objectives.remove(id);
    setObjectives(prev => prev.filter(objective => objective.id !== id));
    if (showNotification) {
      showNotification('Objectif supprimé', 'success');
    }
  }, [showNotification]);

  const handleImportObjectives = useCallback(async (objectivesToImport) => {
    try {
      const newObjectives = Objectives.addMany(objectivesToImport);
      setObjectives(Objectives.get());
      
      if (newObjectives.length > 0 && showNotification) {
        showNotification(`${newObjectives.length} objectif(s) importé(s) avec succès`, 'success');
      }
      
      return newObjectives.length;
    } catch (error) {
      console.error('Erreur lors de l\'import des objectifs:', error);
      if (showNotification) {
        showNotification('Erreur lors de l\'import', 'error');
      }
      return 0;
    }
  }, [showNotification]);

  return {
    objectives,
    loading,
    addObjective: handleAddObjective,
    updateObjective: handleUpdateObjective,
    deleteObjective: handleDeleteObjective,
    importObjectives: handleImportObjectives,
    refreshObjectives: loadObjectives
  };
};
