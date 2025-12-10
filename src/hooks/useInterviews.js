import { useState, useEffect, useCallback } from 'react';
import { Interviews } from '../utils/storage';

export const useInterviews = (showNotification) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInterviews = useCallback(() => {
    const data = Interviews.get();
    setInterviews(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadInterviews();
  }, [loadInterviews]);

  const handleAddInterview = useCallback((interviewData) => {
    const newInterview = Interviews.add(interviewData);
    setInterviews(prev => [...prev, newInterview]);
    if (showNotification) {
      showNotification('Entretien créé avec succès', 'success');
    }
    return newInterview;
  }, [showNotification]);

  const handleUpdateInterview = useCallback((id, interviewData) => {
    const updated = Interviews.update(id, interviewData);
    if (updated) {
      setInterviews(prev => prev.map(i => i.id === id ? updated : i));
      if (showNotification) {
        showNotification('Entretien mis à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteInterview = useCallback((id) => {
    Interviews.remove(id);
    setInterviews(prev => prev.filter(i => i.id !== id));
    if (showNotification) {
      showNotification('Entretien supprimé', 'success');
    }
  }, [showNotification]);

  const handleImportInterviews = useCallback(async (interviewsToImport) => {
    try {
      const newInterviews = Interviews.addMany(interviewsToImport);
      setInterviews(Interviews.get());
      
      if (newInterviews.length > 0 && showNotification) {
        showNotification(`${newInterviews.length} entretien(s) importé(s) avec succès`, 'success');
      }
      
      return newInterviews.length;
    } catch (error) {
      console.error('Erreur lors de l\'import des entretiens:', error);
      if (showNotification) {
        showNotification('Erreur lors de l\'import', 'error');
      }
      return 0;
    }
  }, [showNotification]);

  return {
    interviews,
    loading,
    addInterview: handleAddInterview,
    updateInterview: handleUpdateInterview,
    deleteInterview: handleDeleteInterview,
    importInterviews: handleImportInterviews,
    refreshInterviews: loadInterviews
  };
};
