/**
 * userStoryHelpers.js
 * Fonctions utilitaires pour la validation et manipulation des User Stories
 */

/**
 * Vérifie si une User Story respecte le format standard
 * Format attendu : "En tant que... Je veux... Afin de..."
 * @param {Object} story - La user story à vérifier
 * @returns {boolean} - True si le format est respecté, false sinon
 */
export const hasProperUserStoryFormat = (story) => {
  if (!story || !story.description) {
    return false;
  }

  const description = story.description;
  
  return (
    description.includes('En tant que') &&
    description.includes('Je veux') &&
    description.includes('Afin de')
  );
};

/**
 * Génère un message d'alerte pour une story sans format correct
 * @param {string} variant - 'compact' | 'full'
 * @returns {Object} - Objet avec les propriétés du message
 */
export const getFormatWarning = (variant = 'compact') => {
  if (variant === 'compact') {
    return {
      title: 'User Story à mettre à jour',
      description: null
    };
  }
  
  return {
    title: 'User Story à mettre à jour',
    description: 'Le format standard "En tant que... Je veux... Afin de..." n\'est pas détecté'
  };
};

/**
 * Valide qu'une story a tous les champs requis
 * @param {Object} story - La user story à valider
 * @returns {Object} - { isValid: boolean, missingFields: string[] }
 */
export const validateUserStory = (story) => {
  const missingFields = [];
  
  if (!story.title) missingFields.push('Titre');
  if (!story.description) missingFields.push('Description');
  if (!story.productId) missingFields.push('Produit');
  if (!story.priority) missingFields.push('Priorité');
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Génère le titre automatique d'une user story selon le format standard
 * @param {Object} data - { userRole, userAction, userBenefit }
 * @returns {string} - Le titre formaté
 */
export const generateUserStoryTitle = (data) => {
  const { userRole, userAction, userBenefit } = data;
  
  if (!userRole || !userAction || !userBenefit) {
    return '';
  }
  
  return `En tant que ${userRole}, je veux ${userAction} afin de ${userBenefit}`;
};

/**
 * Parse une description en format libre pour extraire les composants
 * Tente de détecter les patterns "En tant que... Je veux... Afin de..."
 * @param {string} description - La description à parser
 * @returns {Object|null} - { userRole, userAction, userBenefit } ou null
 */
export const parseUserStoryDescription = (description) => {
  if (!description) return null;
  
  const roleMatch = description.match(/En tant que\s+(.+?)(?:,|\.|je veux)/i);
  const actionMatch = description.match(/je veux\s+(.+?)(?:,|\.|afin de)/i);
  const benefitMatch = description.match(/afin de\s+(.+?)(?:\.|$)/i);
  
  if (roleMatch && actionMatch && benefitMatch) {
    return {
      userRole: roleMatch[1].trim(),
      userAction: actionMatch[1].trim(),
      userBenefit: benefitMatch[1].trim()
    };
  }
  
  return null;
};

/**
 * Nettoie et formate une description de user story
 * @param {string} description - La description à nettoyer
 * @returns {string} - La description formatée
 */
export const cleanUserStoryDescription = (description) => {
  if (!description) return '';
  
  return description
    .trim()
    .replace(/\s+/g, ' ') // Normaliser les espaces multiples
    .replace(/\n{3,}/g, '\n\n'); // Limiter les sauts de ligne multiples
};
