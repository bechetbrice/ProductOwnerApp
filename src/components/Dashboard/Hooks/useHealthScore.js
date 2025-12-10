import { useMemo } from 'react';

/**
 * Calcule le Product Health Score sur 100 points (4 facteurs de 25 points)
 * @param {Object} params - Données nécessaires
 * @returns {Object} - Score + détails facteurs + couleurs
 */
export const useHealthScore = ({
  activeGoals = [],
  averageGoalProgress = 0,
  userNeeds = [],
  uncoveredNeeds = 0,
  sprintAnalytics = null,
  velocityTrend = 0,
  budgetMetrics = {}
}) => {
  return useMemo(() => {
    let score = 0;
    const factors = [];

    // 1. Progression Objectifs (25 pts)
    const goalScore = activeGoals.length > 0 
      ? (averageGoalProgress / 100) * 25 
      : 0;
    score += goalScore;
    factors.push({
      name: 'Objectifs',
      score: Math.round(goalScore),
      max: 25,
      detail: activeGoals.length > 0
        ? `${averageGoalProgress}% de progression moyenne sur ${activeGoals.length} objectif${activeGoals.length > 1 ? 's' : ''}`
        : 'Aucun objectif actif'
    });

    // 2. Couverture Besoins (25 pts)
    const coverageScore = userNeeds.length > 0 
      ? ((userNeeds.length - uncoveredNeeds) / userNeeds.length) * 25
      : 0;
    score += coverageScore;
    factors.push({
      name: 'Besoins',
      score: Math.round(coverageScore),
      max: 25,
      detail: userNeeds.length > 0
        ? `${userNeeds.length - uncoveredNeeds}/${userNeeds.length} besoins couverts par des stories`
        : 'Aucun besoin créé'
    });

    // 3. Sprint Performance (25 pts)
    let sprintScore = 0;
    let sprintDetail = 'Aucun sprint actif';
    
    if (sprintAnalytics) {
      if (sprintAnalytics.isOnTrack && velocityTrend >= 0) {
        sprintScore = 25;
        sprintDetail = '✓ Sprint dans les temps + vélocité positive';
      } else if (sprintAnalytics.isOnTrack || velocityTrend >= 0) {
        sprintScore = 18;
        sprintDetail = sprintAnalytics.isOnTrack 
          ? '✓ Sprint dans les temps (vélocité stable)'
          : '⚠ Sprint en retard mais vélocité positive';
      } else if (sprintAnalytics.velocity > 0) {
        sprintScore = 12;
        sprintDetail = '⚠ Sprint en retard + vélocité en baisse';
      } else {
        sprintScore = 5;
        sprintDetail = '⚠ Sprint bloqué (vélocité nulle)';
      }
    }
    score += sprintScore;
    factors.push({
      name: 'Sprint',
      score: sprintScore,
      max: 25,
      detail: sprintDetail
    });

    // 4. Budget (25 pts)
    const budgetScore = budgetMetrics.totalAllocated === 0
      ? 0
      : budgetMetrics.variance <= 0 
        ? 25 
        : Math.max(0, 25 - Math.abs(budgetMetrics.variancePercent) / 2);
    score += budgetScore;
    factors.push({
      name: 'Budget',
      score: Math.round(budgetScore),
      max: 25,
      detail: budgetMetrics.totalAllocated === 0
        ? 'Aucun budget défini'
        : budgetMetrics.variance <= 0
          ? `✓ Budget respecté (${Math.abs(budgetMetrics.variancePercent)}% économie)`
          : `⚠ Dépassement de ${budgetMetrics.variancePercent}%`
    });

    // Calcul final
    const finalScore = Math.max(0, Math.min(100, Math.round(score)));

    // Couleurs
    const color = finalScore >= 80 ? '#10B981' : 
                  finalScore >= 60 ? '#F59E0B' : 
                  finalScore >= 40 ? '#F97316' : '#EF4444';
    
    const textColor = finalScore >= 80 ? 'text-emerald-600' : 
                      finalScore >= 60 ? 'text-orange-600' : 
                      finalScore >= 40 ? 'text-orange-600' : 'text-red-600';

    return {
      score: finalScore,
      factors,
      color,
      textColor
    };
  }, [activeGoals, averageGoalProgress, userNeeds, uncoveredNeeds, sprintAnalytics, velocityTrend, budgetMetrics]);
};
