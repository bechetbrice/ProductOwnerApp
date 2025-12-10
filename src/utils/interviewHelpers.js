/**
 * Helpers pour le module Interviews
 * 
 * Fonctions utilitaires pour la gestion des entretiens,
 * notamment la migration des données et les transformations.
 * 
 * Note : Les fonctions liées aux insights et linkedNeedIds ont été supprimées
 * suite à la suppression de l'onglet Exploitation.
 */

/**
 * Migration automatique: contactId → interviewedContactIds
 * 
 * Gère la rétrocompatibilité avec l'ancien format où un entretien
 * n'avait qu'un seul contact (contactId).
 * 
 * @param {Object} interview - L'entretien à migrer
 * @returns {Array<string>} - Tableau des IDs de contacts interviewés
 */
export const getInterviewedContactIds = (interview) => {
  // Nouveau format (multi-contacts)
  if (interview.interviewedContactIds && Array.isArray(interview.interviewedContactIds)) {
    return interview.interviewedContactIds;
  }
  
  // Ancien format (contact unique) - Migration automatique
  if (interview.contactId) {
    return [interview.contactId];
  }
  
  // Aucun contact
  return [];
};

/**
 * Récupère les objets contacts complets depuis leurs IDs
 * 
 * @param {Object} interview - L'entretien
 * @param {Array<Object>} contacts - Liste de tous les contacts disponibles
 * @returns {Array<Object>} - Tableau des contacts interviewés
 */
export const getInterviewedContacts = (interview, contacts) => {
  const contactIds = getInterviewedContactIds(interview);
  
  return contacts.filter(contact => contactIds.includes(contact.id));
};



/**
 * Compte le nombre total de notes dans un entretien
 * 
 * @param {Object} interview - L'entretien
 * @returns {number}
 */
export const countNotes = (interview) => {
  return (interview.notes && Array.isArray(interview.notes)) 
    ? interview.notes.length 
    : 0;
};

/**
 * Compte le nombre de questions dans un entretien
 * 
 * @param {Object} interview - L'entretien
 * @returns {number}
 */
export const countQuestions = (interview) => {
  if (!interview.sections || !Array.isArray(interview.sections)) {
    return 0;
  }
  
  return interview.sections.reduce((total, section) => {
    return total + (section.questions?.length || 0);
  }, 0);
};

/**
 * Compte le nombre de questions répondues dans un entretien
 * 
 * @param {Object} interview - L'entretien
 * @returns {number}
 */
export const countAnsweredQuestions = (interview) => {
  if (!interview.sections || !Array.isArray(interview.sections)) {
    return 0;
  }
  
  return interview.sections.reduce((total, section) => {
    if (!section.questions || !Array.isArray(section.questions)) {
      return total;
    }
    
    return total + section.questions.filter(q => q.answer && q.answer.trim()).length;
  }, 0);
};

/**
 * Vérifie si un entretien a du contenu (réponses ou notes)
 * 
 * @param {Object} interview - L'entretien
 * @returns {boolean}
 */
export const hasInterviewContent = (interview) => {
  const hasAnswers = countAnsweredQuestions(interview) > 0;
  const hasNotes = countNotes(interview) > 0;
  
  return hasAnswers || hasNotes;
};

/**
 * Calcule les statistiques complètes d'un entretien
 * 
 * @param {Object} interview - L'entretien
 * @returns {Object} - Objet contenant toutes les statistiques
 */
export const getInterviewStats = (interview) => {
  return {
    totalQuestions: countQuestions(interview),
    answeredQuestions: countAnsweredQuestions(interview),
    totalNotes: countNotes(interview),
    hasContent: hasInterviewContent(interview)
  };
};

/**
 * Migre un entretien de l'ancien format vers le nouveau
 * (Migration permanente à appliquer dans le storage)
 * 
 * @param {Object} interview - L'entretien à migrer
 * @returns {Object} - L'entretien migré
 */
export const migrateInterview = (interview) => {
  const migrated = { ...interview };
  
  // Migration contactId → interviewedContactIds
  if (migrated.contactId && !migrated.interviewedContactIds) {
    migrated.interviewedContactIds = [migrated.contactId];
    delete migrated.contactId; // Supprimer l'ancien champ
  }
  
  // Initialiser notes si absent
  if (!migrated.notes) {
    migrated.notes = [];
  }
  
  // Initialiser sections si absent
  if (!migrated.sections) {
    migrated.sections = [];
  }
  
  return migrated;
};
