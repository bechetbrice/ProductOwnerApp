import { createContext, useContext, useMemo } from 'react';
import { useInterviews } from '../hooks/useInterviews';
import { usePersonas } from '../hooks/usePersonas';
import { useUserNeeds } from '../hooks/useUserNeeds';

const DiscoveryContext = createContext(null);

/**
 * DiscoveryProvider - Contexte pour la découverte produit
 * Gère les interviews, personas et besoins utilisateurs
 */
export const DiscoveryProvider = ({ children, showNotification }) => {
  const interviews = useInterviews(showNotification);
  const personas = usePersonas(showNotification);
  const userNeeds = useUserNeeds(showNotification);

  const value = useMemo(() => ({
    // Données
    interviews: interviews.interviews,
    personas: personas.personas,
    userNeeds: userNeeds.userNeeds,
    
    // Actions
    interviewsActions: {
      add: interviews.addInterview,
      update: interviews.updateInterview,
      delete: interviews.deleteInterview,
      import: interviews.importInterviews,
      refresh: interviews.refreshInterviews
    },
    personasActions: {
      add: personas.addPersona,
      update: personas.updatePersona,
      delete: personas.deletePersona,
      import: personas.importPersonas,
      refresh: personas.refreshPersonas
    },
    userNeedsActions: {
      add: userNeeds.addUserNeed,
      update: userNeeds.updateUserNeed,
      delete: userNeeds.deleteUserNeed,
      import: userNeeds.importUserNeeds,
      refresh: userNeeds.refreshUserNeeds
    }
  }), [
    interviews.interviews,
    personas.personas,
    userNeeds.userNeeds,
    interviews.addInterview,
    interviews.updateInterview,
    interviews.deleteInterview,
    interviews.importInterviews,
    interviews.refreshInterviews,
    personas.addPersona,
    personas.updatePersona,
    personas.deletePersona,
    personas.importPersonas,
    personas.refreshPersonas,
    userNeeds.addUserNeed,
    userNeeds.updateUserNeed,
    userNeeds.deleteUserNeed,
    userNeeds.importUserNeeds,
    userNeeds.refreshUserNeeds
  ]);

  return (
    <DiscoveryContext.Provider value={value}>
      {children}
    </DiscoveryContext.Provider>
  );
};

/**
 * Hook pour consommer le DiscoveryContext
 * Utilisation : const { interviews, personas, userNeeds, interviewsActions, personasActions, userNeedsActions } = useDiscoveryContext();
 */
export const useDiscoveryContext = () => {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error('useDiscoveryContext must be used within DiscoveryProvider');
  }
  return context;
};
