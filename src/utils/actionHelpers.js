/**
 * actionHelpers.js
 * Fonctions utilitaires pour la conversion des actions en User Stories ou User Needs
 * Version: 1.4.0
 */

/**
 * Mappe la priorité d'une action vers une priorité MoSCoW pour User Story
 * @param {string} actionPriority - Priorité de l'action ('critical' | 'high' | 'medium' | 'low')
 * @returns {string} Priorité MoSCoW ('must' | 'should' | 'could' | 'wont')
 */
export const mapActionPriorityToMoSCoW = (actionPriority) => {
  const priorityMap = {
    critical: 'must',
    high: 'should',
    medium: 'could',
    low: 'wont'
  };
  
  return priorityMap[actionPriority] || 'should';
};

/**
 * Mappe la priorité d'une action vers une importance de User Need
 * @param {string} actionPriority - Priorité de l'action ('critical' | 'high' | 'medium' | 'low')
 * @returns {string} Importance ('critical' | 'high' | 'medium' | 'low')
 */
export const mapActionPriorityToImportance = (actionPriority) => {
  // Mapping direct 1:1
  const validPriorities = ['critical', 'high', 'medium', 'low'];
  return validPriorities.includes(actionPriority) ? actionPriority : 'medium';
};

/**
 * Génère un titre de User Story basé sur la catégorie de l'action
 * @param {string} actionDescription - Description de l'action
 * @param {string} category - Catégorie de l'action
 * @returns {string} Titre généré pour la User Story
 */
export const generateStoryTitleFromAction = (actionDescription, category) => {
  // Préfixes selon la catégorie
  const categoryPrefixes = {
    development: 'Développer',
    design: 'Concevoir',
    research: 'Rechercher',
    business: 'Mettre en place',
    other: 'Implémenter'
  };
  
  const prefix = categoryPrefixes[category] || 'Implémenter';
  
  // Tronquer la description si trop longue (max 60 caractères)
  const truncatedDescription = actionDescription.length > 60 
    ? actionDescription.substring(0, 57) + '...'
    : actionDescription;
  
  return `${prefix}: ${truncatedDescription}`;
};

/**
 * Génère des critères d'acceptation basés sur la catégorie de l'action
 * @param {string} actionDescription - Description de l'action
 * @param {string} category - Catégorie de l'action
 * @param {string} notes - Notes complémentaires de l'action
 * @returns {string} Critères d'acceptation formatés
 */
export const generateAcceptanceCriteriaFromAction = (actionDescription, category, notes = '') => {
  // Templates par catégorie
  const templates = {
    development: [
      `✓ Le code pour "${actionDescription}" est développé`,
      '✓ Les tests unitaires sont écrits et passent',
      '✓ Le code est reviewé et mergé',
      '✓ La fonctionnalité est déployée en environnement de test'
    ],
    design: [
      `✓ Les maquettes pour "${actionDescription}" sont créées`,
      '✓ Les maquettes sont validées par les stakeholders',
      '✓ Le design system est respecté',
      '✓ Les assets sont exportés et prêts pour développement'
    ],
    research: [
      `✓ La recherche sur "${actionDescription}" est complétée`,
      '✓ Les findings sont documentés',
      '✓ Les recommandations sont formulées',
      '✓ Les résultats sont partagés avec l\'équipe'
    ],
    business: [
      `✓ "${actionDescription}" est mis en place`,
      '✓ Les processus sont documentés',
      '✓ Les équipes concernées sont formées',
      '✓ Les KPIs de succès sont définis'
    ],
    other: [
      `✓ L'action "${actionDescription}" est réalisée`,
      '✓ Le résultat est validé par les parties prenantes',
      '✓ La documentation est à jour',
      '✓ Les prochaines étapes sont identifiées'
    ]
  };
  
  const criteria = templates[category] || templates.other;
  
  // Ajouter les notes si présentes
  if (notes && notes.trim()) {
    criteria.push(`\n📝 Notes:\n${notes}`);
  }
  
  return criteria.join('\n');
};

/**
 * Prépare les données pour créer une User Story depuis une action
 * @param {object} action - L'action source
 * @param {object} interview - L'entretien parent
 * @param {object} contact - Le contact de l'entretien
 * @param {string} linkedNeedId - ID du besoin lié (optionnel)
 * @returns {object} Données pré-remplies pour UserStoryForm
 */
export const prepareStoryFromAction = (action, interview, contact, linkedNeedId = null) => {
  const title = generateStoryTitleFromAction(
    action.description, 
    action.category || 'other'
  );
  
  const description = `Action identifiée lors de l'entretien "${interview.title}" avec ${contact.name}.

**Contexte:**
${action.description}

${action.notes ? `**Notes complémentaires:**
${action.notes}` : ''}

**Source:** Entretien du ${new Date(interview.date).toLocaleDateString('fr-FR')}`;

  const acceptanceCriteria = generateAcceptanceCriteriaFromAction(
    action.description,
    action.category || 'other',
    action.notes
  );
  
  const priority = mapActionPriorityToMoSCoW(action.priority || 'medium');
  
  // Stakeholders : contact de l'entretien + assigné si différent
  const stakeholders = [contact.id];
  if (action.assignedTo && action.assignedTo !== contact.id) {
    stakeholders.push(action.assignedTo);
  }
  
  return {
    title,
    description,
    acceptanceCriteria,
    priority,
    status: 'todo',
    linkedNeedId,
    stakeholders: [...new Set(stakeholders)] // Dédupliquer
  };
};

/**
 * Prépare les données pour créer un User Need depuis une action
 * @param {object} action - L'action source
 * @param {object} interview - L'entretien parent
 * @param {object} contact - Le contact de l'entretien
 * @returns {object} Données pré-remplies pour UserNeedForm
 */
export const prepareNeedFromAction = (action, interview, contact) => {
  const client = contact.name;
  
  const context = `Suite à l'entretien "${interview.title}" du ${new Date(interview.date).toLocaleDateString('fr-FR')}, une action a révélé un besoin utilisateur.

**Action identifiée:**
${action.description}

${action.notes ? `**Notes:**
${action.notes}` : ''}

**Type d'entretien:** ${getInterviewTypeLabel(interview.type)}`;

  const Objectives = `Répondre au besoin identifié: ${action.description}`;
  
  const importance = mapActionPriorityToImportance(action.priority || 'medium');
  
  return {
    client,
    context,
    Objectives,
    importance,
    contactId: contact.id
  };
};

/**
 * Obtient le label d'un type d'entretien
 * @param {string} type - Type d'entretien
 * @returns {string} Label français
 */
const getInterviewTypeLabel = (type) => {
  const labels = {
    discovery: 'Découverte',
    validation: 'Validation',
    feedback: 'Feedback',
    research: 'User Research'
  };
  
  return labels[type] || type;
};

/**
 * Valide qu'une action peut être convertie en User Story
 * @param {object} action - L'action à valider
 * @returns {object} { valid: boolean, error: string }
 */
export const validateActionForStory = (action) => {
  if (!action.description || action.description.trim() === '') {
    return { valid: false, error: 'L\'action doit avoir une description' };
  }
  
  if (action.completed) {
    return { valid: false, error: 'Les actions déjà complétées ne peuvent pas être converties en story' };
  }
  
  return { valid: true, error: null };
};

/**
 * Valide qu'une action peut être convertie en User Need
 * @param {object} action - L'action à valider
 * @returns {object} { valid: boolean, error: string }
 */
export const validateActionForNeed = (action) => {
  if (!action.description || action.description.trim() === '') {
    return { valid: false, error: 'L\'action doit avoir une description' };
  }
  
  if (action.completed) {
    return { valid: false, error: 'Les actions déjà complétées ne peuvent pas être converties en besoin' };
  }
  
  return { valid: true, error: null };
};
