import { useMemo } from 'react';

/**
 * Calcule les analytics d'un sprint actif
 * @param {Object} sprint - Sprint à analyser
 * @param {Array} stories - User stories du sprint
 * @returns {Object|null} - Analytics ou null si pas de sprint
 */
export const useSprintAnalytics = (sprint, stories = []) => {
  return useMemo(() => {
    if (!sprint) return null;

    // Métriques de points
    const totalPoints = stories.reduce((sum, s) => sum + (s.estimation || 0), 0);
    const completedPoints = stories
      .filter(s => s.status === 'done' && (!s.outcome || s.outcome === 'completed'))
      .reduce((sum, s) => sum + (s.estimation || 0), 0);
    const inProgressPoints = stories
      .filter(s => s.status === 'inProgress')
      .reduce((sum, s) => sum + (s.estimation || 0), 0);

    // Calculs temporels
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const today = new Date();
    
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const elapsedDays = Math.max(0, Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)));
    const remainingDays = Math.max(0, totalDays - elapsedDays);

    // Vélocité
    const velocity = elapsedDays > 0 ? (completedPoints / elapsedDays).toFixed(1) : 0;
    const pointsRemaining = totalPoints - completedPoints;
    const predictedDaysToComplete = velocity > 0 ? Math.ceil(pointsRemaining / velocity) : 0;

    // Prédiction
    const isOnTrack = predictedDaysToComplete <= remainingDays;
    const daysLate = isOnTrack ? 0 : predictedDaysToComplete - remainingDays;

    return {
      totalPoints,
      completedPoints,
      inProgressPoints,
      totalDays,
      elapsedDays,
      remainingDays,
      velocity,
      isOnTrack,
      daysLate
    };
  }, [sprint, stories]);
};
