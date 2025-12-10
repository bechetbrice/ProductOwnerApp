import { useMemo } from 'react';
import { useSprintAnalytics } from './useSprintAnalytics';
import { useHealthScore } from './useHealthScore';
import { useMilestones } from './useMilestones';
import { useTeamCapacity } from './useTeamCapacity';

/**
 * Hook centralisant tous les calculs de métriques du Dashboard
 * @param {Object} params - Toutes les données nécessaires
 * @returns {Object} - Objet consolidé avec toutes les métriques
 */
export const useDashboardMetrics = ({
  products = [],
  sprints = [],
  userStories = [],
  contacts = [],
  tasks = [],
  teams = [],
  interviews = [],
  Objectives = [],
  userNeeds = [],
  budgetEntries = [],
  selectedProductId = 'all'
}) => {
  
  // ============================================
  // FILTRAGE PAR PRODUIT
  // ============================================
  
  const filtered = useMemo(() => {
    if (selectedProductId === 'all') {
      return {
        products,
        sprints,
        userStories,
        objectives: Objectives,
        userNeeds,
        budgetEntries
      };
    }
    
    return {
      products: products.filter(p => p.id === selectedProductId),
      sprints: sprints.filter(s => s.productId === selectedProductId),
      userStories: userStories.filter(s => s.productId === selectedProductId),
      objectives: Objectives.filter(g => g.productId === selectedProductId),
      userNeeds: userNeeds.filter(n => n.productId === selectedProductId),
      budgetEntries: budgetEntries.filter(b => b.productId === selectedProductId)
    };
  }, [selectedProductId, products, sprints, userStories, Objectives, userNeeds, budgetEntries]);

  // ============================================
  // PRODUITS ACTIFS
  // ============================================
  
  const activeProducts = useMemo(() => 
    filtered.products.filter(p => p.status === 'active'),
    [filtered.products]
  );

  // ============================================
  // OBJECTIFS
  // ============================================
  
  const activeGoals = useMemo(() => 
    filtered.objectives.filter(g => g.status === 'active'),
    [filtered.objectives]
  );

  const getGoalProgress = useMemo(() => (goal) => {
    const linkedStories = filtered.userStories.filter(story => story.linkedGoalId === goal.id);
    if (linkedStories.length === 0) return 0;
    const completedStories = linkedStories.filter(story => story.status === 'done');
    return Math.round((completedStories.length / linkedStories.length) * 100);
  }, [filtered.userStories]);

  const averageGoalProgress = useMemo(() => {
    if (activeGoals.length === 0) return 0;
    return Math.round(
      activeGoals.reduce((sum, goal) => sum + getGoalProgress(goal), 0) / activeGoals.length
    );
  }, [activeGoals, getGoalProgress]);

  // ============================================
  // BESOINS NON COUVERTS
  // ============================================
  
  const uncoveredNeeds = useMemo(() => 
    filtered.userNeeds.filter(need => 
      !filtered.userStories.some(story => story.linkedNeedId === need.id)
    ).length,
    [filtered.userNeeds, filtered.userStories]
  );

  const criticalUncoveredNeeds = useMemo(() => 
    filtered.userNeeds.filter(n => 
      (n.importance === 'critical' || n.importance === 'high') &&
      !filtered.userStories.some(story => story.linkedNeedId === n.id)
    ).length,
    [filtered.userNeeds, filtered.userStories]
  );

  // ============================================
  // SPRINT ACTIF
  // ============================================
  
  const activeSprints = useMemo(() => 
    filtered.sprints.filter(s => s.status === 'active'),
    [filtered.sprints]
  );

  const activeSprint = activeSprints[0] || null;

  const sprintStories = useMemo(() => 
    activeSprint 
      ? filtered.userStories.filter(s => s.sprintId === activeSprint.id)
      : [],
    [activeSprint, filtered.userStories]
  );

  const sprintAnalytics = useSprintAnalytics(activeSprint, sprintStories);

  // ============================================
  // BUDGET
  // ============================================
  
  const budgetMetrics = useMemo(() => {
    const totalAllocated = filtered.budgetEntries.reduce((sum, b) => sum + (b.plannedAmount || 0), 0);
    const totalConsumed = filtered.budgetEntries.reduce((sum, b) => sum + (b.consumedAmount || 0), 0);
    const totalExpected = filtered.budgetEntries.reduce((sum, b) => sum + (b.manualExpectedAmount || 0), 0);
    
    const variance = totalExpected - totalAllocated;
    const variancePercent = totalAllocated > 0 ? Math.round((variance / totalAllocated) * 100) : 0;
    
    return {
      totalAllocated,
      totalConsumed,
      totalExpected,
      variance,
      variancePercent,
      consumptionRate: totalAllocated > 0 ? Math.round((totalConsumed / totalAllocated) * 100) : 0
    };
  }, [filtered.budgetEntries]);

  // ============================================
  // VÉLOCITÉ HISTORIQUE
  // ============================================
  
  const velocityData = useMemo(() => {
    const completedSprints = filtered.sprints
      .filter(s => s.status === 'completed')
      .slice(-6)
      .map(sprint => {
        const stories = filtered.userStories.filter(s => s.sprintId === sprint.id);
        const completed = stories.filter(s => s.status === 'done').reduce((sum, s) => sum + (s.estimation || 0), 0);
        const planned = stories.reduce((sum, s) => sum + (s.estimation || 0), 0);
        return { name: sprint.name, completed, planned };
      });

    const averageVelocity = completedSprints.length > 0
      ? Math.round(completedSprints.reduce((sum, s) => sum + s.completed, 0) / completedSprints.length)
      : 0;

    const velocityTrend = completedSprints.length >= 2
      ? completedSprints[completedSprints.length - 1].completed - completedSprints[completedSprints.length - 2].completed
      : 0;

    return { completedSprints, averageVelocity, velocityTrend };
  }, [filtered.sprints, filtered.userStories]);

  // ============================================
  // CAPACITÉ ÉQUIPES
  // ============================================
  
  const teamCapacity = useTeamCapacity({ teams, contacts, activeSprint });

  // ============================================
  // HEALTH SCORE
  // ============================================
  
  const healthScore = useHealthScore({
    activeGoals,
    averageGoalProgress,
    userNeeds: filtered.userNeeds,
    uncoveredNeeds,
    sprintAnalytics,
    velocityTrend: velocityData.velocityTrend,
    budgetMetrics
  });

  // ============================================
  // ACTIONS & ALERTES
  // ============================================

  const allActions = useMemo(() => 
    interviews.flatMap(i => i.actionItems || []),
    [interviews]
  );

  const overdueActions = useMemo(() => 
    allActions.filter(action => {
      if (!action.dueDate || action.isCompleted) return false;
      return new Date(action.dueDate) < new Date();
    }),
    [allActions]
  );

  const criticalActions = useMemo(() => 
    allActions.filter(action => 
      !action.isCompleted && action.priority === 'critical'
    ),
    [allActions]
  );

  // ============================================
  // PROCHAINS JALONS (30 JOURS)
  // ============================================
  
  const upcomingMilestones = useMilestones({
    activeSprint,
    objectives: filtered.objectives,
    interviews,
    contacts,
    criticalActions
  });

  // ============================================
  // TÂCHES PROBLÉMATIQUES
  // ============================================
  
  const problematicTasks = useMemo(() => 
    tasks.filter(t => ['blocked', 'to_review', 'paused'].includes(t.outcome)),
    [tasks]
  );

  // ============================================
  // ALERTES
  // ============================================
  
  const alerts = useMemo(() => {
    return {
      hasAlerts: overdueActions.length > 0 || 
                 criticalUncoveredNeeds > 0 || 
                 (sprintAnalytics && !sprintAnalytics.isOnTrack),
      overdueActions,
      criticalUncoveredNeeds,
      sprintDelay: sprintAnalytics?.isOnTrack ? null : sprintAnalytics?.daysLate
    };
  }, [overdueActions, criticalUncoveredNeeds, sprintAnalytics]);

  // ============================================
  // ÉTAT VIDE
  // ============================================
  
  const isEmpty = useMemo(() =>
    contacts.length === 0 && 
    products.length === 0 && 
    userNeeds.length === 0 && 
    userStories.length === 0,
    [contacts, products, userNeeds, userStories]
  );

  // ============================================
  // TOP 3 OBJECTIFS EN DIFFICULTÉ
  // ============================================

  const strugglingGoals = useMemo(() => {
    const today = new Date();
    const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    return activeGoals
      .map(goal => {
        const progress = getGoalProgress(goal);
        const targetDate = goal.targetDate ? new Date(goal.targetDate) : null;
        const isNearDeadline = targetDate && targetDate <= twoWeeksFromNow;
        const daysUntilDeadline = targetDate ? Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)) : null;
        
        return {
          ...goal,
          progress,
          isNearDeadline,
          daysUntilDeadline,
          urgencyScore: (progress < 50 ? 2 : 0) + (isNearDeadline ? 3 : 0)
        };
      })
      .filter(goal => goal.progress < 70 || goal.isNearDeadline)
      .sort((a, b) => b.urgencyScore - a.urgencyScore)
      .slice(0, 3);
  }, [activeGoals, getGoalProgress]);

  // ============================================
  // RETOUR CONSOLIDÉ
  // ============================================
  
  return {
    // État général
    isEmpty,
    alerts,
    
    // Données filtrées
    filtered,
    
    // Produits & Équipes
    activeProducts,
    teamCapacity,
    
    // Sprint actif
    activeSprint,
    activeSprints,
    sprintStories,
    sprintAnalytics,
    
    // Objectifs
    activeGoals,
    averageGoalProgress,
    getGoalProgress,
    strugglingGoals,
    
    // Besoins
    uncoveredNeeds,
    criticalUncoveredNeeds,
    
    // Budget
    budgetMetrics,
    
    // Vélocité
    velocityData,
    
    // Health Score
    healthScore,
    
    // Jalons & Tâches
    upcomingMilestones,
    problematicTasks,
    
    // KPIs stratégiques
    strategicKPIs: {
      activeProducts: activeProducts.length,
      totalProducts: filtered.products.length,
      uncoveredNeeds,
      criticalUncoveredNeeds
    }
  };
};
