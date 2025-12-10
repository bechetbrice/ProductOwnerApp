import { useMemo } from 'react';

/**
 * Calcule les prochains jalons dans les 30 jours
 * @param {Object} params - Données nécessaires
 * @returns {Array} - Liste des jalons triés par date
 */
export const useMilestones = ({
  activeSprint = null,
  objectives = [],
  interviews = [],
  contacts = [],
  criticalActions = [],
  onNavigateToView = null,
  onNavigateToInterview = null
}) => {
  return useMemo(() => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const milestones = [];

    // Fin sprint actif
    if (activeSprint) {
      const endDate = new Date(activeSprint.endDate);
      if (endDate <= thirtyDaysFromNow) {
        milestones.push({
          type: 'sprint',
          date: endDate,
          title: `Fin Sprint ${activeSprint.name}`,
          icon: '🎯',
          label: 'Sprint',
          color: 'blue',
          onClick: () => onNavigateToView && onNavigateToView('sprints', { sprintId: activeSprint.id })
        });
      }
    }

    // Deadlines objectifs
    objectives.forEach(goal => {
      if (goal.status === 'active' && goal.targetDate) {
        const targetDate = new Date(goal.targetDate);
        if (targetDate <= thirtyDaysFromNow) {
          milestones.push({
            type: 'goal',
            date: targetDate,
            title: `Deadline: ${goal.title}`,
            icon: '🏁',
            label: 'Objectif',
            color: 'purple',
            onClick: () => onNavigateToView && onNavigateToView('products', { goalId: goal.id })
          });
        }
      }
    });

    // Entretiens planifiés
    interviews.forEach(interview => {
      if (interview.status === 'scheduled' && interview.scheduledDate) {
        const schedDate = new Date(interview.scheduledDate);
        if (schedDate <= thirtyDaysFromNow) {
          const contact = contacts.find(c => c.id === interview.contactId);
          milestones.push({
            type: 'interview',
            date: schedDate,
            title: `Entretien: ${contact?.name || 'Contact'}`,
            icon: '👤',
            label: 'Entretien',
            color: 'green',
            onClick: () => onNavigateToInterview && onNavigateToInterview(interview.id)
          });
        }
      }
    });

    // Actions critiques avec date limite
    if (criticalActions && criticalActions.length > 0) {
      criticalActions.forEach(action => {
        if (action.dueDate) {
          const dueDate = new Date(action.dueDate);
          if (dueDate <= thirtyDaysFromNow) {
            milestones.push({
              type: 'action',
              date: dueDate,
              title: `Action: ${action.description?.substring(0, 40)}...`,
              icon: '⚡',
              label: 'Action',
              color: 'red',
              onClick: () => onNavigateToView && onNavigateToView('interviews')
            });
          }
        }
      });
    }

    return milestones
      .sort((a, b) => a.date - b.date)
      .slice(0, 5);
  }, [activeSprint, objectives, interviews, criticalActions, contacts, onNavigateToView, onNavigateToInterview]);
};
