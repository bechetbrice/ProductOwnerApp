import { updateInterview } from '../../utils/storage';

/**
 * useStoryHandlers
 * 
 * Hook pour gérer les handlers liés aux besoins utilisateurs et user stories
 * - Ajout de besoins utilisateurs
 * - Ajout de user stories
 * - Liaison avec entretiens
 */
export const useStoryHandlers = ({
  modalStates,
  userNeedsActions,
  userStoriesActions,
  interviewsActions
}) => {
  const {
    setIsNeedFormModalOpen,
    setPrefilledNeedData,
    setIsStoryFormModalOpen,
    setPrefilledStoryData,
    setViewingInterview,
    isNeedFormModalOpen,
    isStoryFormModalOpen,
    viewingInterview
  } = modalStates;

  /**
   * Ajoute ou met à jour un besoin utilisateur
   * Si un entretien est en cours de visualisation, lie le besoin à l'entretien
   * @param {Object} needData - Données du besoin
   */
  const handleAddUserNeed = (needData) => {
    if (needData.id) {
      userNeedsActions.update(needData.id, needData);
    } else {
      const newNeed = userNeedsActions.add(needData);
      
      // Si on visualise un entretien, lier le besoin à cet entretien
      if (viewingInterview && newNeed) {
        const updatedLinkedNeedIds = [...(viewingInterview.linkedNeedIds || []), newNeed.id];
        const updatedInterview = updateInterview(viewingInterview.id, {
          ...viewingInterview,
          linkedNeedIds: updatedLinkedNeedIds
        });
        
        if (updatedInterview) {
          interviewsActions.refresh();
          setViewingInterview(updatedInterview);
        }
      }
    }
    
    // Fermer le formulaire si ouvert
    if (isNeedFormModalOpen) {
      setIsNeedFormModalOpen(false);
      setPrefilledNeedData(null);
    }
  };

  /**
   * Ajoute une user story
   * @param {Object} storyData - Données de la story
   */
  const handleAddUserStory = (storyData) => {
    userStoriesActions.add(storyData);
    
    // Fermer le formulaire si ouvert
    if (isStoryFormModalOpen) {
      setIsStoryFormModalOpen(false);
      setPrefilledStoryData(null);
    }
  };

  return {
    handleAddUserNeed,
    handleAddUserStory
  };
};
