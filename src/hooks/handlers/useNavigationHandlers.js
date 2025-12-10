/**
 * useNavigationHandlers
 * 
 * Hook pour gérer les handlers de navigation inter-modules
 * - Navigation vers une vue avec filtres
 * - Navigation vers une entité spécifique (contact, need, story, interview)
 */
export const useNavigationHandlers = ({
  modalStates,
  contexts,
  setCurrentView,
  setViewFilters
}) => {
  const {
    setSelectedContact,
    setSelectedNeedId,
    setSelectedStoryId,
    setViewingInterview,
    setPrefilledNeedData,
    setIsNeedFormModalOpen
  } = modalStates;

  const { contacts, userNeeds, interviews } = contexts;

  /**
   * Navigue vers une vue avec des filtres optionnels
   * @param {string} view - Identifiant de la vue
   * @param {Object} filters - Filtres à appliquer
   */
  const handleNavigateToView = (view, filters = {}) => {
    setViewFilters(filters);
    setCurrentView(view);
  };

  /**
   * Navigue vers une entité spécifique
   * Gère les différents types d'entités et leurs actions associées
   * @param {string} entity - Type d'entité (contact, need, story, interview, actions)
   * @param {string} id - ID de l'entité
   * @param {Object} filters - Filtres/options supplémentaires
   */
  const handleNavigate = (entity, id, filters = {}) => {
    switch(entity) {
      case 'contact': {
        const contact = contacts.find(c => c.id === id);
        if (contact) {
          setSelectedContact(contact);
          setCurrentView('contacts');
        }
        break;
      }
      case 'need': {
        const need = userNeeds.find(n => n.id === id);
        if (need && filters.edit) {
          setPrefilledNeedData(need);
          setIsNeedFormModalOpen(true);
        } else {
          setSelectedNeedId(id);
          if (filters.specificId) {
            setViewFilters({ specificId: filters.specificId });
          } else {
            setViewFilters({});
          }
          setCurrentView('userNeeds');
        }
        break;
      }
      case 'story': {
        setSelectedStoryId(id);
        if (filters.specificId) {
          setViewFilters({ specificId: filters.specificId });
        } else {
          setViewFilters({});
        }
        setCurrentView('userStories');
        break;
      }
      case 'interview': {
        const interview = interviews.find(i => i.id === id);
        if (interview) {
          setViewingInterview(interview);
          setCurrentView('interviews');
        }
        break;
      }
      case 'actions': {
        setCurrentView('actions');
        break;
      }
      default:
        console.warn(`Type d'entité inconnu: ${entity}`);
    }
  };

  return {
    handleNavigateToView,
    handleNavigate
  };
};
