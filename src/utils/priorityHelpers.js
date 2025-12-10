/**
 * Fonctions utilitaires pour la priorisation et le calcul de scores d'impact
 * ProductOwnerApp - v1.9.2
 */

/**
 * Calcule le score d'impact d'une user story pour aider à la priorisation
 * 
 * @param {Object} story - La user story à évaluer
 * @param {Array} userNeeds - Liste des besoins utilisateurs
 * @param {Array} contacts - Liste des contacts
 * @param {Array} Objectives - Liste des objectifs produit (optionnel)
 * @returns {number} Score d'impact calculé
 */
export const calculateImpactScore = (story, userNeeds = [], contacts = [], Objectives = []) => {
  // Poids pour les priorités MoSCoW
  const priorityWeights = { 
    must: 4,    // Must have - Critique
    should: 3,  // Should have - Important
    could: 2,   // Could have - Souhaitable
    wont: 1     // Won't have - Non prioritaire
  };

  // Poids pour l'importance des besoins
  const importanceWeights = { 
    critical: 4, // Critique
    high: 3,     // Haute
    medium: 2,   // Moyenne
    low: 1       // Basse
  };

  // Poids pour les priorités des objectifs produit
  const goalPriorityWeights = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
  };

  // Score de base selon la priorité de la story
  const priorityScore = priorityWeights[story.priority] || 1;

  // Score selon le besoin lié
  let needScore = 1;
  const linkedNeed = userNeeds.find(need => need.id === story.linkedNeedId);
  if (linkedNeed) {
    needScore = importanceWeights[linkedNeed.importance] || 1;
  }

  // Score selon l'objectif produit lié
  let goalScore = 1;
  if (story.linkedGoalId && Objectives.length > 0) {
    const linkedGoal = Objectives.find(goal => goal.id === story.linkedGoalId);
    if (linkedGoal) {
      goalScore = goalPriorityWeights[linkedGoal.priority] || 1;
    }
  }

  // Multiplicateur selon le nombre de stakeholders
  let stakeholderMultiplier = 1;
  if (story.stakeholders && Array.isArray(story.stakeholders)) {
    stakeholderMultiplier = Math.max(1, story.stakeholders.length);
  }

  // Bonus si la story est liée à un contact externe (impact client)
  let clientBonus = 1;
  if (linkedNeed && linkedNeed.contactId) {
    const linkedContact = contacts.find(contact => contact.id === linkedNeed.contactId);
    if (linkedContact && linkedContact.type === 'external') {
      clientBonus = 1.5; // Bonus 50% pour les besoins clients externes
    }
  }

  // Calcul final du score
  const finalScore = Math.round(
    priorityScore * needScore * goalScore * stakeholderMultiplier * clientBonus
  );

  return finalScore;
};

/**
 * Calcule le score d'impact pour toutes les stories et retourne les données enrichies
 * 
 * @param {Array} stories - Liste des user stories
 * @param {Array} userNeeds - Liste des besoins utilisateurs
 * @param {Array} contacts - Liste des contacts
 * @param {Array} Objectives - Liste des objectifs produit
 * @returns {Array} Stories avec scores d'impact ajoutés
 */
export const enrichStoriesWithImpactScore = (stories, userNeeds, contacts, Objectives = []) => {
  return stories.map(story => ({
    ...story,
    impactScore: calculateImpactScore(story, userNeeds, contacts, Objectives)
  }));
};

/**
 * Trie les stories selon différents critères
 * 
 * @param {Array} stories - Liste des user stories
 * @param {string} sortBy - Critère de tri
 * @param {Array} userNeeds - Liste des besoins utilisateurs
 * @param {Array} contacts - Liste des contacts
 * @param {Array} Objectives - Liste des objectifs produit
 * @returns {Array} Stories triées
 */
export const sortStories = (stories, sortBy, userNeeds = [], contacts = [], Objectives = []) => {
  const storiesCopy = [...stories];

  switch (sortBy) {
    case 'impact':
      return storiesCopy.sort((a, b) => {
        const scoreA = calculateImpactScore(a, userNeeds, contacts, Objectives);
        const scoreB = calculateImpactScore(b, userNeeds, contacts, Objectives);
        return scoreB - scoreA; // Tri décroissant (score le plus élevé en premier)
      });

    case 'priority':
      const priorityOrder = ['must', 'should', 'could', 'wont'];
      return storiesCopy.sort((a, b) => {
        const indexA = priorityOrder.indexOf(a.priority);
        const indexB = priorityOrder.indexOf(b.priority);
        return indexA - indexB;
      });

    case 'status':
      const statusOrder = ['todo', 'inProgress', 'done'];
      return storiesCopy.sort((a, b) => {
        const indexA = statusOrder.indexOf(a.status);
        const indexB = statusOrder.indexOf(b.status);
        return indexA - indexB;
      });

    case 'recent':
      return storiesCopy.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    case 'oldest':
      return storiesCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    case 'title':
      return storiesCopy.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return storiesCopy;
  }
};

/**
 * Obtient le badge de couleur selon le niveau de score d'impact
 * 
 * @param {number} score - Score d'impact
 * @returns {Object} Classe CSS et label pour le badge
 */
export const getImpactScoreBadge = (score) => {
  if (score >= 32) {
    return {
      className: 'bg-red-100 text-red-800 border border-red-200',
      label: 'Impact Critique',
      icon: '🔥'
    };
  } else if (score >= 16) {
    return {
      className: 'bg-orange-100 text-orange-800 border border-orange-200',
      label: 'Impact Élevé',
      icon: '⚡'
    };
  } else if (score >= 8) {
    return {
      className: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      label: 'Impact Moyen',
      icon: '📊'
    };
  } else {
    return {
      className: 'bg-gray-100 text-gray-800 border border-gray-200',
      label: 'Impact Faible',
      icon: '📋'
    };
  }
};

/**
 * Génère des statistiques sur les scores d'impact du backlog
 * 
 * @param {Array} stories - Liste des user stories
 * @param {Array} userNeeds - Liste des besoins utilisateurs
 * @param {Array} contacts - Liste des contacts
 * @param {Array} Objectives - Liste des objectifs produit
 * @returns {Object} Statistiques des scores d'impact
 */
export const getImpactScoreStats = (stories, userNeeds = [], contacts = [], Objectives = []) => {
  if (!stories || stories.length === 0) {
    return {
      averageScore: 0,
      maxScore: 0,
      minScore: 0,
      distribution: { critical: 0, high: 0, medium: 0, low: 0 }
    };
  }

  const scores = stories.map(story => calculateImpactScore(story, userNeeds, contacts, Objectives));
  
  const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);

  // Distribution par niveau d'impact
  const distribution = {
    critical: scores.filter(score => score >= 32).length,
    high: scores.filter(score => score >= 16 && score < 32).length,
    medium: scores.filter(score => score >= 8 && score < 16).length,
    low: scores.filter(score => score < 8).length
  };

  return {
    averageScore,
    maxScore,
    minScore,
    distribution,
    totalStories: stories.length
  };
};

/**
 * Valide les données nécessaires pour le calcul du score d'impact
 * 
 * @param {Object} story - User story à valider  
 * @returns {Array} Liste des avertissements/erreurs
 */
export const validateStoryForImpactScore = (story) => {
  const warnings = [];

  if (!story.priority) {
    warnings.push('Priorité MoSCoW manquante - score d\'impact réduit');
  }

  if (!story.linkedNeedId) {
    warnings.push('Aucun besoin utilisateur lié - impact difficile à évaluer');
  }

  if (!story.stakeholders || story.stakeholders.length === 0) {
    warnings.push('Aucun stakeholder défini - multiplicateur par défaut appliqué');
  }

  return warnings;
};