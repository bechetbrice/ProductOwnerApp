/**
 * Storage API - Point d'entrée principal
 * 
 * @module storage
 * @description
 * Architecture basée sur Factory Pattern pour CRUD localStorage
 * 
 * @version 1.0.0
 * @date 2025-12-08
 */

import entities from './storage/entities';
import { STORAGE_KEYS, DATA_VERSION, EXCLUDED_KEYS } from './storage/constants';

// ============================================================================
// EXPORT DES ENTITÉS
// ============================================================================

// Export direct des API CRUD pour chaque entité
export const {
  Products,
  Objectives,
  Contacts,
  Teams,
  Interviews,
  UserNeeds,
  Personas,
  UserStories,
  Sprints,
  Tasks,
  SprintReviews,
  Retrospectives,
  BudgetItems,
  WikiPages,
  FAQItems,
} = entities;

// ============================================================================
// FONCTIONS RÉTROCOMPATIBLES (anciennes API)
// ============================================================================

/**
 * Fonctions rétrocompatibles pour ne pas casser les hooks existants
 * Ces fonctions wrappent les nouvelles API du factory
 */

// PRODUCTS
export const getProducts = () => Products.get();
export const saveProducts = (products) => Products.save(products);
export const addProduct = (data) => Products.add(data);
export const updateProduct = (id, updates) => Products.update(id, updates);
export const deleteProduct = (id) => Products.remove(id);

// PRODUCT GOALS / OBJECTIVES
export const getObjectives = () => Objectives.get();
export const saveObjectives = (goals) => Objectives.save(goals);
export const addObjectives = (data) => Objectives.add(data);
export const updateObjectives = (id, updates) => Objectives.update(id, updates);
export const deleteObjectives = (id) => Objectives.remove(id);

// Alias au singulier pour compatibilité
export const addObjective = addObjectives;
export const updateObjective = updateObjectives;
export const deleteObjective = deleteObjectives;

// CONTACTS
export const getContacts = () => Contacts.get();
export const saveContacts = (contacts) => Contacts.save(contacts);
export const addContact = (data) => Contacts.add(data);
export const updateContact = (id, updates) => Contacts.update(id, updates);
export const deleteContact = (id) => Contacts.remove(id);

// TEAMS
export const getTeams = () => Teams.get();
export const saveTeams = (teams) => Teams.save(teams);
export const addTeam = (data) => Teams.add(data);
export const updateTeam = (id, updates) => Teams.update(id, updates);
export const deleteTeam = (id) => Teams.remove(id);

// INTERVIEWS
export const getInterviews = () => Interviews.get();
export const saveInterviews = (interviews) => Interviews.save(interviews);
export const addInterview = (data) => Interviews.add(data);
export const updateInterview = (id, updates) => Interviews.update(id, updates);
export const deleteInterview = (id) => Interviews.remove(id);

// USER NEEDS
export const getUserNeeds = () => UserNeeds.get();
export const saveUserNeeds = (needs) => UserNeeds.save(needs);
export const addUserNeed = (data) => UserNeeds.add(data);
export const updateUserNeed = (id, updates) => UserNeeds.update(id, updates);
export const deleteUserNeed = (id) => UserNeeds.remove(id);

// PERSONAS
export const getPersonas = () => Personas.get();
export const savePersonas = (personas) => Personas.save(personas);
export const addPersona = (data) => Personas.add(data);
export const updatePersona = (id, updates) => Personas.update(id, updates);
export const deletePersona = (id) => Personas.remove(id);

// USER STORIES
export const getUserStories = () => UserStories.get();
export const saveUserStories = (stories) => UserStories.save(stories);
export const addUserStory = (data) => UserStories.add(data);
export const updateUserStory = (id, updates) => UserStories.update(id, updates);
export const deleteUserStory = (id) => UserStories.remove(id);
export const updateUserStoryStatus = (id, status) => UserStories.update(id, { status });

// SPRINTS
export const getSprints = () => Sprints.get();
export const saveSprints = (sprints) => Sprints.save(sprints);
export const addSprint = (data) => Sprints.add(data);
export const updateSprint = (id, updates) => Sprints.update(id, updates);
export const deleteSprint = (id) => Sprints.remove(id);

// TASKS
export const getTasks = () => Tasks.get();
export const saveTasks = (tasks) => Tasks.save(tasks);
export const addTask = (data) => Tasks.add(data);
export const updateTask = (id, updates) => Tasks.update(id, updates);
export const deleteTask = (id) => Tasks.remove(id);

// SPRINT REVIEWS
export const getSprintReviews = () => SprintReviews.get();
export const saveSprintReviews = (reviews) => SprintReviews.save(reviews);
export const addSprintReview = (data) => SprintReviews.add(data);
export const updateSprintReview = (id, updates) => SprintReviews.update(id, updates);
export const deleteSprintReview = (id) => SprintReviews.remove(id);

// RETROSPECTIVES
export const getSprintRetrospectives = () => Retrospectives.get();
export const saveSprintRetrospectives = (retros) => Retrospectives.save(retros);
export const addSprintRetrospective = (data) => Retrospectives.add(data);
export const updateSprintRetrospective = (id, updates) => Retrospectives.update(id, updates);
export const deleteSprintRetrospective = (id) => Retrospectives.remove(id);

// BUDGET
export const getBudgetEntries = () => BudgetItems.get();
export const saveBudgetEntries = (entries) => BudgetItems.save(entries);
export const addBudgetEntry = (data) => BudgetItems.add(data);
export const updateBudgetEntry = (id, updates) => BudgetItems.update(id, updates);
export const deleteBudgetEntry = (id) => BudgetItems.remove(id);

// WIKI PAGES (nouvelles entités, pas de rétrocompatibilité nécessaire)
export const getWikiPages = () => WikiPages.get();
export const addWikiPage = (data) => WikiPages.add(data);
export const updateWikiPage = (id, updates) => WikiPages.update(id, updates);
export const deleteWikiPage = (id) => WikiPages.remove(id);

// FAQ ITEMS (nouvelles entités)
export const getFAQItems = () => FAQItems.get();
export const addFAQItem = (data) => FAQItems.add(data);
export const updateFAQItem = (id, updates) => FAQItems.update(id, updates);
export const deleteFAQItem = (id) => FAQItems.remove(id);

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Exporte toutes les données de l'application
 * @returns {Object} Objet contenant toutes les données + métadonnées
 */
export const exportAllData = () => {
  const data = {};
  
  Object.entries(entities).forEach(([entityName, entityAPI]) => {
    data[entityName] = entityAPI.get();
  });
  
  return {
    version: DATA_VERSION,
    exportDate: new Date().toISOString(),
    appVersion: '1.0.0',
    data,
  };
};

/**
 * Importe des données exportées
 * @param {Object} importedData - Données exportées précédemment
 * @returns {number} Nombre d'entités importées
 */
export const importAllData = (importedData) => {
  if (!importedData || !importedData.data) {
    console.error('[Import] Format invalide');
    return 0;
  }
  
  console.log(`🔄 Import données v${importedData.version}...`);
  
  let importedCount = 0;
  
  Object.entries(importedData.data).forEach(([entityName, items]) => {
    if (entities[entityName] && Array.isArray(items)) {
      try {
        entities[entityName].save(items);
        importedCount += items.length;
        console.log(`  ✅ ${entityName}: ${items.length} items`);
      } catch (error) {
        console.error(`  ❌ Erreur import ${entityName}:`, error);
      }
    } else {
      console.warn(`  ⚠️  Entité inconnue: ${entityName}`);
    }
  });
  
  console.log(`✅ Import terminé : ${importedCount} items importés`);
  return importedCount;
};

/**
 * Efface toutes les données de l'application
 * ⚠️ ATTENTION: Action irréversible !
 */
export const clearAllData = () => {
  console.warn('⚠️  Suppression de toutes les données...');
  
  Object.values(STORAGE_KEYS).forEach(key => {
    if (!EXCLUDED_KEYS.includes(key)) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('✅ Toutes les données ont été supprimées');
};

/**
 * Obtient la taille totale du stockage (approximatif)
 * @returns {Object} { used: number, total: number, percentage: number }
 */
export const getStorageSize = () => {
  let totalSize = 0;
  
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage[key].length + key.length;
    }
  }
  
  // Estimation: ~5MB pour la plupart des navigateurs
  const estimatedQuota = 5 * 1024 * 1024;
  
  return {
    used: totalSize,
    total: estimatedQuota,
    percentage: Math.round((totalSize / estimatedQuota) * 100),
    usedMB: (totalSize / (1024 * 1024)).toFixed(2),
    totalMB: (estimatedQuota / (1024 * 1024)).toFixed(0),
  };
};

/**
 * Vérifie si le stockage est proche de la limite
 * @returns {boolean} true si > 80% utilisé
 */
export const isStorageAlmostFull = () => {
  const { percentage } = getStorageSize();
  return percentage > 80;
};

// ============================================================================
// HELPERS RÉTROCOMPATIBLES (fonctions métier)
// ============================================================================

/**
 * Obtient les goals d'un produit spécifique
 */
export const getObjectivesByProduct = (productId) => {
  return Objectives.getByForeignKey('productId', productId);
};

/**
 * Obtient les stories d'un produit spécifique
 */
export const getUserStoriesByProduct = (productId) => {
  return UserStories.getByForeignKey('productId', productId);
};

/**
 * Obtient les sprints d'un produit spécifique
 */
export const getSprintsByProduct = (productId) => {
  return Sprints.getByForeignKey('productId', productId);
};

/**
 * Obtient les tasks d'un sprint spécifique
 */
export const getTasksBySprint = (sprintId) => {
  return Tasks.getByForeignKey('sprintId', sprintId);
};

/**
 * Obtient les reviews d'un sprint spécifique
 */
export const getSprintReviewsBySprint = (sprintId) => {
  return SprintReviews.getByForeignKey('sprintId', sprintId);
};

/**
 * Obtient les rétros d'un sprint spécifique
 */
export const getSprintRetrospectivesBySprint = (sprintId) => {
  return Retrospectives.getByForeignKey('sprintId', sprintId);
};

/**
 * Obtient les items budget d'un produit spécifique
 */
export const getBudgetEntriesByProduct = (productId) => {
  return BudgetItems.getByForeignKey('productId', productId);
};

// ============================================================================
// SETTINGS (paramètres app)
// ============================================================================

/**
 * Récupère les paramètres de l'application
 */
export const getSettings = () => {
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  const settings = data ? JSON.parse(data) : {};
  
  // Valeurs par défaut si manquantes
  return {
    roles: settings.roles || [],
    companies: settings.companies || [],
    departments: settings.departments || [],
    ...settings,
  };
};

/**
 * Sauvegarde les paramètres de l'application
 */
export const saveSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

/**
 * Initialise un produit par défaut si aucun n'existe
 */
export const initializeDefaultProduct = () => {
  const products = Products.get();
  
  if (products.length === 0) {
    const defaultProduct = Products.add({
      code: 'DEFAULT',
      name: 'Produit par défaut',
      description: 'Produit créé automatiquement',
      status: 'active',
      owner: '',
      tags: [],
    });
    
    console.log('✅ Produit par défaut créé:', defaultProduct.name);
    return defaultProduct;
  }
  
  return products[0];
};

// ============================================================================
// LOGS & DEBUG
// ============================================================================

// Log en dev uniquement
if (import.meta.env.DEV) {
  const storageInfo = getStorageSize();
  console.log(`📦 Storage: ${storageInfo.usedMB}MB / ${storageInfo.totalMB}MB (${storageInfo.percentage}%)`);
  
  if (isStorageAlmostFull()) {
    console.warn('⚠️  Stockage localStorage > 80% !');
  }
}

/**
 * Export par défaut de toutes les entités (nouvelle API)
 * Usage recommandé: import { Products, UserStories } from './storage'
 */
export default entities;
