import { useMemo } from 'react';

/**
 * Calcule la capacité totale, allouée et disponible des équipes
 * @param {Object} params - Données nécessaires
 * @returns {Object} - Métriques de capacité
 */
export const useTeamCapacity = ({
  teams = [],
  contacts = [],
  activeSprint = null
}) => {
  return useMemo(() => {
    let totalCapacity = 0;
    let allocatedCapacity = 0;

    const activeTeams = teams.filter(t => t.status === 'active');

    activeTeams.forEach(team => {
      const teamMembers = contacts.filter(c => team.memberContactIds?.includes(c.id));
      teamMembers.forEach(member => {
        if (member.capacity) {
          const adjusted = (member.capacity * (member.availability || 100) * (member.workload || 100)) / 10000;
          totalCapacity += adjusted;

          if (activeSprint && team.id === activeSprint.teamId) {
            allocatedCapacity += adjusted;
          }
        }
      });
    });

    const utilizationRate = totalCapacity > 0 ? Math.round((allocatedCapacity / totalCapacity) * 100) : 0;

    return {
      totalCapacity: Math.round(totalCapacity),
      allocatedCapacity: Math.round(allocatedCapacity),
      availableCapacity: Math.round(totalCapacity - allocatedCapacity),
      utilizationRate,
      activeTeams: activeTeams.length
    };
  }, [teams, contacts, activeSprint]);
};
