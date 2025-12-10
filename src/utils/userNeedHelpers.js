/**
 * Helpers pour le module UserNeeds
 * 
 * Fonctions utilitaires pour la gestion des besoins utilisateurs.
 */



/**
 * Récupère l'entretien source d'un besoin utilisateur
 * 
 * @param {Object} need - Le besoin utilisateur
 * @param {Array<Object>} interviews - Liste des entretiens
 * @returns {Object|null} - L'interview source ou null
 */
export const getSourceInterview = (need, interviews) => {
  if (!need.sourceInterviewId) {
    return null;
  }
  
  return interviews.find(interview => interview.id === need.sourceInterviewId) || null;
};
