import { useState, useEffect, useCallback } from 'react';
import { 
  getTeams, 
  addTeam, 
  updateTeam, 
  deleteTeam,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getBudgetEntries,
  addBudgetEntry,
  updateBudgetEntry,
  deleteBudgetEntry,
  getSprintReviews,
  addSprintReview,
  updateSprintReview,
  deleteSprintReview,
  getSprintRetrospectives,
  addSprintRetrospective,
  updateSprintRetrospective,
  deleteSprintRetrospective,
  getSettings,
  saveSettings
} from '../utils/storage';

export const useOthers = (showNotification) => {
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [sprintReviews, setSprintReviews] = useState([]);
  const [sprintRetrospectives, setSprintRetrospectives] = useState([]);
  const [settings, setSettings] = useState({ roles: [], companies: [], departments: [] });
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(() => {
    setTeams(getTeams());
    setTasks(getTasks());
    setBudgetEntries(getBudgetEntries());
    setSprintReviews(getSprintReviews());
    setSprintRetrospectives(getSprintRetrospectives());
    setSettings(getSettings());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Teams
  const handleAddTeam = useCallback((teamData) => {
    const newTeam = addTeam(teamData);
    setTeams(prev => [...prev, newTeam]);
    if (showNotification) {
      showNotification('Équipe créée avec succès', 'success');
    }
    return newTeam;
  }, [showNotification]);

  const handleUpdateTeam = useCallback((id, teamData) => {
    const updated = updateTeam(id, teamData);
    if (updated) {
      setTeams(prev => prev.map(team => team.id === id ? updated : team));
      if (showNotification) {
        showNotification('Équipe mise à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteTeam = useCallback((id) => {
    deleteTeam(id);
    setTeams(prev => prev.filter(team => team.id !== id));
    if (showNotification) {
      showNotification('Équipe supprimée', 'success');
    }
  }, [showNotification]);

  const handleImportTeams = useCallback(async (teamsToImport) => {
    let successCount = 0;
    for (const teamData of teamsToImport) {
      try {
        const newTeam = addTeam(teamData);
        if (newTeam) successCount++;
      } catch (error) {
        console.error('Erreur lors de l\'import de l\'équipe:', error);
      }
    }
    setTeams(getTeams());
    if (successCount > 0 && showNotification) {
      showNotification(`${successCount} équipe(s) importée(s) avec succès`, 'success');
    }
    return successCount;
  }, [showNotification]);

  // Tasks
  const handleAddTask = useCallback((taskData) => {
    const newTask = addTask(taskData);
    setTasks(prev => [...prev, newTask]);
    if (showNotification) {
      showNotification('Tâche créée avec succès', 'success');
    }
    return newTask;
  }, [showNotification]);

  const handleUpdateTask = useCallback((id, taskData) => {
    const updated = updateTask(id, taskData);
    if (updated) {
      setTasks(prev => prev.map(task => task.id === id ? updated : task));
      if (showNotification) {
        showNotification('Tâche mise à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteTask = useCallback((id) => {
    deleteTask(id);
    setTasks(getTasks());
    if (showNotification) {
      showNotification('Tâche supprimée', 'success');
    }
  }, [showNotification]);

  // Budget
  const handleAddBudgetEntry = useCallback((entryData) => {
    const newEntry = addBudgetEntry(entryData);
    setBudgetEntries(prev => [...prev, newEntry]);
    if (showNotification) {
      showNotification('Ligne budgétaire créée avec succès', 'success');
    }
    return newEntry;
  }, [showNotification]);

  const handleUpdateBudgetEntry = useCallback((id, entryData) => {
    const updated = updateBudgetEntry(id, entryData);
    if (updated) {
      setBudgetEntries(prev => prev.map(entry => entry.id === id ? updated : entry));
      if (showNotification) {
        showNotification('Ligne budgétaire mise à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteBudgetEntry = useCallback((id) => {
    deleteBudgetEntry(id);
    setBudgetEntries(prev => prev.filter(entry => entry.id !== id));
    if (showNotification) {
      showNotification('Ligne budgétaire supprimée', 'success');
    }
  }, [showNotification]);

  // Sprint Reviews
  const handleAddSprintReview = useCallback((reviewData) => {
    const newReview = addSprintReview(reviewData);
    setSprintReviews(prev => [...prev, newReview]);
    if (showNotification) {
      showNotification('Sprint Review créée avec succès', 'success');
    }
    return newReview;
  }, [showNotification]);

  const handleUpdateSprintReview = useCallback((id, reviewData) => {
    const updated = updateSprintReview(id, reviewData);
    if (updated) {
      setSprintReviews(prev => prev.map(r => r.id === id ? updated : r));
      if (showNotification) {
        showNotification('Sprint Review mise à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteSprintReview = useCallback((id) => {
    deleteSprintReview(id);
    setSprintReviews(prev => prev.filter(r => r.id !== id));
    if (showNotification) {
      showNotification('Sprint Review supprimée', 'success');
    }
  }, [showNotification]);

  // Sprint Retrospectives
  const handleAddSprintRetro = useCallback((retroData) => {
    const newRetro = addSprintRetrospective(retroData);
    setSprintRetrospectives(prev => [...prev, newRetro]);
    if (showNotification) {
      showNotification('Rétrospective créée avec succès', 'success');
    }
    return newRetro;
  }, [showNotification]);

  const handleUpdateSprintRetro = useCallback((id, retroData) => {
    const updated = updateSprintRetrospective(id, retroData);
    if (updated) {
      setSprintRetrospectives(prev => prev.map(r => r.id === id ? updated : r));
      if (showNotification) {
        showNotification('Rétrospective mise à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteSprintRetro = useCallback((id) => {
    deleteSprintRetrospective(id);
    setSprintRetrospectives(prev => prev.filter(r => r.id !== id));
    if (showNotification) {
      showNotification('Rétrospective supprimée', 'success');
    }
  }, [showNotification]);

  // Settings
  const handleUpdateSettings = useCallback((newSettings) => {
    saveSettings(newSettings);
    setSettings(newSettings);
  }, []);

  return {
    teams,
    tasks,
    budgetEntries,
    sprintReviews,
    sprintRetrospectives,
    settings,
    loading,
    // Teams
    addTeam: handleAddTeam,
    updateTeam: handleUpdateTeam,
    deleteTeam: handleDeleteTeam,
    importTeams: handleImportTeams,
    // Tasks
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    // Budget
    addBudgetEntry: handleAddBudgetEntry,
    updateBudgetEntry: handleUpdateBudgetEntry,
    deleteBudgetEntry: handleDeleteBudgetEntry,
    // Sprint Reviews
    addSprintReview: handleAddSprintReview,
    updateSprintReview: handleUpdateSprintReview,
    deleteSprintReview: handleDeleteSprintReview,
    // Sprint Retros
    addSprintRetro: handleAddSprintRetro,
    updateSprintRetro: handleUpdateSprintRetro,
    deleteSprintRetro: handleDeleteSprintRetro,
    // Settings
    updateSettings: handleUpdateSettings,
    refreshAll: loadAll
  };
};
