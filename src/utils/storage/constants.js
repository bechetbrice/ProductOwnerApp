/**
 * Clés localStorage centralisées
 * Toutes les clés de stockage de l'application
 * 
 * @module storageConstants
 * @description Évite les magic strings et centralise la configuration du stockage
 */

/**
 * Préfixe global pour toutes les clés localStorage
 * Permet d'isoler les données de l'app et facilite le nettoyage
 */
export const STORAGE_PREFIX = 'po_app_';

/**
 * Clés localStorage pour toutes les entités
 * Format: po_app_{entityName}
 */
export const STORAGE_KEYS = {
  // STRATÉGIE
  PRODUCTS: `${STORAGE_PREFIX}products`,
  PRODUCT_GOALS: `${STORAGE_PREFIX}Objectives`,
  CONTACTS: `${STORAGE_PREFIX}contacts`,
  
  // ÉQUIPES
  TEAMS: `${STORAGE_PREFIX}teams`,
  TEAM_MEMBERS: `${STORAGE_PREFIX}teamMembers`,
  
  // DÉCOUVERTE
  INTERVIEWS: `${STORAGE_PREFIX}interviews`,
  USER_NEEDS: `${STORAGE_PREFIX}userNeeds`,
  PERSONAS: `${STORAGE_PREFIX}personas`,
  
  // BACKLOG
  USER_STORIES: `${STORAGE_PREFIX}userStories`,
  
  // SPRINTS
  SPRINTS: `${STORAGE_PREFIX}sprints`,
  TASKS: `${STORAGE_PREFIX}tasks`,
  SPRINT_REVIEWS: `${STORAGE_PREFIX}sprintReviews`,
  RETROSPECTIVES: `${STORAGE_PREFIX}retrospectives`,
  
  // AUTRES
  BUDGET_ITEMS: `${STORAGE_PREFIX}budgetItems`,
  WIKI_PAGES: `${STORAGE_PREFIX}wikiPages`,
  FAQ_ITEMS: `${STORAGE_PREFIX}faqItems`,
  
  // MÉTADONNÉES
  SETTINGS: `${STORAGE_PREFIX}settings`,
  APP_VERSION: `${STORAGE_PREFIX}version`,
};

/**
 * Version du schéma de données
 * Incrémente à chaque migration majeure
 */
export const DATA_VERSION = '1.0';

/**
 * Taille limite localStorage (approximative)
 * La plupart des navigateurs : 5-10 MB
 */
export const STORAGE_QUOTA = 5 * 1024 * 1024; // 5 MB

/**
 * Clés à exclure lors de l'export/import
 */
export const EXCLUDED_KEYS = [
  STORAGE_KEYS.SETTINGS,
  STORAGE_KEYS.APP_VERSION,
];
