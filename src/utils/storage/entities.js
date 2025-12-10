/**
 * Définition de toutes les entités avec leurs valeurs par défaut
 * Utilise le factory pattern pour éliminer la duplication
 * 
 * @module entities
 * @description 
 * SYNCHRONISÉ avec fields-documentation.json v1.1.0
 * Dernière mise à jour: 2025-01-21
 * 
 * @version 5.0.0
 * 
 * AVANT: 600 lignes de CRUD répétitif
 * APRÈS: 150 lignes déclaratives
 * 
 * Ajout d'une nouvelle entité:
 * AVANT: 40 lignes de code CRUD
 * APRÈS: 8 lignes de configuration
 */

import { createStorageAPI, createMultiKeyStorageAPI } from './storageFactory';
import { STORAGE_KEYS } from './constants';

// ============================================================================
// STRATÉGIE
// ============================================================================

/**
 * Produits
 * @typedef {Object} Product
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} name - Nom du produit
 * @property {string} code - Code court (2-6 caractères majuscules)
 * @property {string} color - Couleur d'identification (#hex)
 * @property {string} description - Informations complémentaires
 * @property {string} status - Statut: draft|active|archived
 * @property {string[]} clientIds - IDs des contacts clients
 * @property {string} ownerId - ID du Product Owner
 * @property {string} startDate - Date de début
 * @property {string} plannedEndDate - Date de fin prévue
 * @property {string} expectedEndDate - Date de fin attendue
 * @property {string} actualEndDate - Date de fin réelle
 */
export const Products = createStorageAPI(STORAGE_KEYS.PRODUCTS, {
  name: '',
  code: '',
  color: '#6366f1',
  description: '',
  status: 'active',
  clientIds: [],
  ownerId: '',
  startDate: '',
  plannedEndDate: '',
  expectedEndDate: '',
  actualEndDate: '',
});

/**
 * Objectifs Produit
 * @typedef {Object} Objective
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} productId - ID du produit associé
 * @property {string} title - Titre de l'objectif
 * @property {string} description - Description contextuelle
 * @property {string} priority - Priorité: critical|high|medium|low
 * @property {string} status - Statut: planned|active|completed|cancelled
 * @property {string} targetDate - Date d'échéance cible
 * @property {string} successCriteria - Critères de succès qualitatifs
 * @property {string} kpis - Indicateurs de performance quantifiables
 */
export const Objectives = createMultiKeyStorageAPI(STORAGE_KEYS.PRODUCT_GOALS, {
  productId: '',
  title: '',
  description: '',
  priority: 'medium',
  status: 'planned',
  targetDate: '',
  successCriteria: '',
  kpis: '',
});

/**
 * Contacts / Stakeholders
 * @typedef {Object} Contact
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} name - Nom complet
 * @property {string} role - Rôle / Poste
 * @property {string} type - Type: internal|external|client
 * @property {string} company - Entreprise (pour external/client)
 * @property {string} department - Département (pour internal)
 * @property {string} email - Email
 * @property {string} phone - Téléphone
 * @property {string} notes - Notes complémentaires
 * @property {string[]} productIds - IDs des produits associés
 * @property {string} seniority - Niveau: na|junior|intermediate|senior|expert
 * @property {string[]} skills - Compétences techniques
 * @property {number} capacity - Capacité (pts/sprint)
 * @property {number} availability - Disponibilité (%)
 * @property {number} workload - % Temps produit
 * @property {string} contractType - Type de contrat
 * @property {string} dailyRate - Taux horaire brut chargé
 * @property {string} currency - Devise: EUR|USD|GBP
 * @property {string} location - Localisation
 * @property {string} timezone - Fuseau horaire
 * @property {string} workingHours - Horaires de travail
 * @property {string} startDate - Date d'arrivée
 * @property {string} endDate - Date de départ
 * @property {boolean} isActive - Membre actif dans l'équipe
 * @property {boolean} isAvailable - Disponible pour nouvelles assignations
 * @property {string} preferences - Préférences de travail
 */
export const Contacts = createMultiKeyStorageAPI(STORAGE_KEYS.CONTACTS, {
  name: '',
  role: '',
  type: 'internal',
  company: '',
  department: '',
  email: '',
  phone: '',
  notes: '',
  productIds: [],
  // Champs Équipe
  seniority: 'na',
  skills: [],
  capacity: 0,
  availability: 100,
  workload: 100,
  contractType: 'full_time',
  dailyRate: '',
  currency: 'EUR',
  location: '',
  timezone: 'Europe/Paris',
  workingHours: '9h-18h',
  startDate: '',
  endDate: '',
  isActive: false,
  isAvailable: false,
  preferences: '',
});

// ============================================================================
// ÉQUIPES
// ============================================================================

/**
 * Équipes
 * @typedef {Object} Team
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} name - Nom de l'équipe
 * @property {string} description - Description de l'équipe
 * @property {string} status - Statut: active|inactive
 * @property {string[]} productIds - IDs des produits associés
 * @property {string[]} memberContactIds - IDs des membres
 * @property {string} leadContactId - ID du Team Lead
 */
export const Teams = createMultiKeyStorageAPI(STORAGE_KEYS.TEAMS, {
  name: '',
  description: '',
  status: 'active',
  productIds: [],
  memberContactIds: [],
  leadContactId: '',
});

// ============================================================================
// DÉCOUVERTE
// ============================================================================

/**
 * Personas
 * @typedef {Object} Persona
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} productId - ID du produit associé
 * @property {string} avatar - Avatar / Emoji
 * @property {string} name - Nom du Persona
 * @property {string} role - Rôle / Métier
 * @property {string} age - Tranche d'âge
 * @property {string} demographic - Démographie
 * @property {string} company - Type d'entreprise
 * @property {string} seniority - Ancienneté
 * @property {string} teamSize - Taille équipe
 * @property {string[]} goals - Objectifs principaux
 * @property {string[]} frustrations - Frustrations
 * @property {string[]} motivations - Motivations
 * @property {string} techLevel - Niveau: novice|intermediate|expert
 * @property {string[]} preferredChannels - Canaux de communication
 * @property {string} usageFrequency - Fréquence: daily|weekly|monthly|occasional
 * @property {string} environment - Environnement d'utilisation
 * @property {string[]} devices - Appareils utilisés
 * @property {string} quote - Citation signature
 * @property {boolean} isPrimary - Persona primaire
 * @property {string[]} linkedContactIds - IDs des contacts sources
 * @property {string[]} linkedNeedIds - IDs des besoins liés
 * @property {string[]} linkedInterviewIds - IDs des entretiens sources
 */
export const Personas = createStorageAPI(STORAGE_KEYS.PERSONAS, {
  productId: '',
  avatar: '👤',
  name: '',
  role: '',
  age: '',
  demographic: '',
  company: '',
  seniority: '',
  teamSize: '',
  goals: [],
  frustrations: [],
  motivations: [],
  techLevel: 'intermediate',
  preferredChannels: [],
  usageFrequency: 'weekly',
  environment: '',
  devices: [],
  quote: '',
  isPrimary: false,
  linkedContactIds: [],
  linkedNeedIds: [],
  linkedInterviewIds: [],
});

/**
 * Entretiens utilisateurs
 * @typedef {Object} Interview
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} productId - ID du produit associé
 * @property {string} title - Titre de l'entretien
 * @property {string} type - Type: discovery|validation|feedback|research|custom
 * @property {string[]} interviewedContactIds - IDs des interviewés
 * @property {string} scheduledDate - Date et heure de l'entretien
 * @property {number} duration - Durée en minutes
 * @property {string} location - Lieu de l'entretien
 * @property {string} objectives - Objectif de l'entretien
 * @property {string} status - Statut: scheduled|in_progress|completed|cancelled
 * @property {Array} sections - Sections de questions structurées
 * @property {string} generalNotes - Notes générales
 * @property {string[]} linkedNeedIds - IDs des besoins liés
 */
export const Interviews = createMultiKeyStorageAPI(STORAGE_KEYS.INTERVIEWS, {
  productId: '',
  title: '',
  type: 'custom',
  interviewedContactIds: [],
  scheduledDate: '',
  duration: 60,
  location: '',
  objectives: '',
  status: 'scheduled',
  sections: [],
  generalNotes: '',
  linkedNeedIds: [],
});

/**
 * Besoins utilisateurs
 * @typedef {Object} UserNeed
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} productId - ID du produit associé
 * @property {string[]} stakeholderIds - IDs des stakeholders
 * @property {string} primaryContactId - ID du contact privilégié
 * @property {string[]} personaIds - IDs des personas concernés
 * @property {string} context - Contexte du besoin
 * @property {string} objective - Objectif du besoin
 * @property {string} importance - Importance: critical|high|medium|low
 * @property {number} storyPoints - Story points (estimés via Planning Poker)
 * @property {string} linkedGoalId - ID de l'objectif lié
 */
export const UserNeeds = createMultiKeyStorageAPI(STORAGE_KEYS.USER_NEEDS, {
  productId: '',
  stakeholderIds: [],
  primaryContactId: '',
  personaIds: [],
  context: '',
  objective: '',
  importance: 'medium',
  storyPoints: null,
  linkedGoalId: '',
});

// ============================================================================
// BACKLOG
// ============================================================================

/**
 * User Stories
 * @typedef {Object} UserStory
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} productId - ID du produit associé
 * @property {string} linkedNeedId - ID du besoin utilisateur lié
 * @property {string} storyNumber - Numéro d'identification (ex: US-001)
 * @property {string} storyTitle - Titre court
 * @property {string} userRole - En tant que (rôle utilisateur)
 * @property {string} userAction - Je veux (action/fonctionnalité)
 * @property {string} userBenefit - Afin de (bénéfice/valeur)
 * @property {string} title - Titre auto-généré complet
 * @property {string} description - Description complémentaire
 * @property {string} acceptanceCriteria - Critères d'acceptation
 * @property {string} priority - Priorité MoSCoW: must|should|could|wont
 * @property {string} teamId - ID de l'équipe responsable
 * @property {string} assignedTo - ID du membre assigné
 * @property {number} estimation - Estimation en story points
 * @property {string} status - Statut: todo|inProgress|done
 * @property {string} outcome - Résultat: completed|cancelled|postponed
 * @property {string} outcomeReason - Raison du résultat
 * @property {string} outcomeNote - Note sur le résultat
 * @property {string} outcomeDate - Date du résultat
 */
export const UserStories = createMultiKeyStorageAPI(STORAGE_KEYS.USER_STORIES, {
  productId: '',
  linkedNeedId: '',
  storyNumber: '',
  storyTitle: '',
  userRole: '',
  userAction: '',
  userBenefit: '',
  title: '',
  description: '',
  acceptanceCriteria: '',
  priority: 'should',
  teamId: '',
  assignedTo: '',
  estimation: 0,
  status: 'todo',
  outcome: null,
  outcomeReason: '',
  outcomeNote: '',
  outcomeDate: '',
});

// ============================================================================
// SPRINTS
// ============================================================================

/**
 * Sprints
 * @typedef {Object} Sprint
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} productId - ID du produit associé
 * @property {string} teamId - ID de l'équipe responsable
 * @property {string} sprintNumber - Numéro d'identification
 * @property {string} name - Nom du sprint
 * @property {string} status - Statut: planned|active|completed
 * @property {string} startDate - Date de début
 * @property {string} endDate - Date de fin
 * @property {string} goal - Objectif du sprint
 * @property {string[]} storyIds - IDs des user stories
 */
export const Sprints = createMultiKeyStorageAPI(STORAGE_KEYS.SPRINTS, {
  productId: '',
  teamId: '',
  sprintNumber: '',
  name: '',
  status: 'planned',
  startDate: '',
  endDate: '',
  goal: '',
  storyIds: [],
});

/**
 * Tâches
 * @typedef {Object} Task
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} userStoryId - ID de la user story associée
 * @property {string} taskNumber - Numéro d'identification (ex: T-123)
 * @property {string} type - Type: development|testing|review|deployment|documentation|other
 * @property {string} title - Titre de la tâche
 * @property {string} description - Description détaillée
 * @property {string} assignedTo - ID du membre assigné
 * @property {number} estimatedHours - Estimation en heures
 * @property {string} status - Statut: todo|inProgress|done
 * @property {string} sprintId - ID du sprint (hérité de la story)
 * @property {string} outcome - Résultat: todo|completed|cancelled
 * @property {string} outcomeReason - Raison du résultat
 * @property {string} outcomeNote - Note sur le résultat
 */
export const Tasks = createMultiKeyStorageAPI(STORAGE_KEYS.TASKS, {
  userStoryId: '',
  taskNumber: '',
  type: 'development',
  title: '',
  description: '',
  assignedTo: '',
  estimatedHours: 0,
  status: 'todo',
  sprintId: '',
  outcome: 'todo',
  outcomeReason: '',
  outcomeNote: '',
});

/**
 * Sprint Reviews
 * @typedef {Object} SprintReview
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} sprintId - ID du sprint concerné
 * @property {string} reviewDate - Date et heure de la review
 * @property {string} status - Statut: scheduled|completed|cancelled
 * @property {string[]} participants - IDs des participants
 * @property {string[]} completedStoryIds - IDs des stories démontrées
 * @property {string} demoNotes - Notes de démonstration
 * @property {Array} stakeholderFeedback - Feedback structuré des stakeholders
 * @property {string} decisions - Décisions prises
 * @property {string} nextStepsProductBacklog - Prochaines étapes backlog
 */
export const SprintReviews = createMultiKeyStorageAPI(STORAGE_KEYS.SPRINT_REVIEWS, {
  sprintId: '',
  reviewDate: '',
  status: 'scheduled',
  participants: [],
  completedStoryIds: [],
  demoNotes: '',
  stakeholderFeedback: [],
  decisions: '',
  nextStepsProductBacklog: '',
});

/**
 * Rétrospectives
 * @typedef {Object} Retrospective
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} sprintId - ID du sprint rétrospecté
 * @property {string} retroDate - Date et heure de la rétrospective
 * @property {string} status - Statut: scheduled|completed|cancelled
 * @property {string[]} participants - IDs des participants
 * @property {Array} whatWentWell - Ce qui s'est bien passé (avec votes)
 * @property {Array} whatNeedsImprovement - À améliorer (avec votes)
 * @property {Array} actionItems - Actions d'amélioration
 * @property {string} nextSprintCommitments - Engagements pour le prochain sprint
 */
export const Retrospectives = createMultiKeyStorageAPI(STORAGE_KEYS.RETROSPECTIVES, {
  sprintId: '',
  retroDate: '',
  status: 'scheduled',
  participants: [],
  whatWentWell: [],
  whatNeedsImprovement: [],
  actionItems: [],
  nextSprintCommitments: '',
});

// ============================================================================
// AUTRES
// ============================================================================

/**
 * Budget
 * @typedef {Object} BudgetItem
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} productId - ID du produit concerné
 * @property {string} category - Catégorie: development|marketing|infrastructure|other
 * @property {string} description - Description de l'élément budgétaire
 * @property {number} amount - Montant
 * @property {string} currency - Devise: EUR|USD|GBP
 * @property {string} date - Date de l'opération
 * @property {string} type - Type: expense|revenue
 * @property {string} status - Statut: planned|approved|spent
 * @property {string[]} tags - Tags
 */
export const BudgetItems = createMultiKeyStorageAPI(STORAGE_KEYS.BUDGET_ITEMS, {
  productId: '',
  category: '',
  description: '',
  amount: 0,
  currency: 'EUR',
  date: '',
  type: 'expense',
  status: 'planned',
  tags: [],
});

/**
 * Pages Wiki
 * @typedef {Object} WikiPage
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} title - Titre de la page
 * @property {string} content - Contenu de la page
 * @property {string} category - Catégorie
 * @property {string[]} tags - Tags
 * @property {string} productId - ID du produit associé
 * @property {boolean} isPublic - Page publique
 * @property {string} lastEditedBy - Dernière édition par
 */
export const WikiPages = createMultiKeyStorageAPI(STORAGE_KEYS.WIKI_PAGES, {
  title: '',
  content: '',
  category: '',
  tags: [],
  productId: '',
  isPublic: false,
  lastEditedBy: '',
});

/**
 * FAQ
 * @typedef {Object} FAQItem
 * @property {string} id - ID unique (auto-généré)
 * @property {string} createdAt - Date création (auto-généré)
 * @property {string} updatedAt - Date modification (auto-généré)
 * @property {string} question - Question
 * @property {string} answer - Réponse
 * @property {string} category - Catégorie
 * @property {string} productId - ID du produit associé
 * @property {number} order - Ordre d'affichage
 * @property {string[]} tags - Tags
 */
export const FAQItems = createMultiKeyStorageAPI(STORAGE_KEYS.FAQ_ITEMS, {
  question: '',
  answer: '',
  category: '',
  productId: '',
  order: 0,
  tags: [],
});

// ============================================================================
// EXPORT GLOBAL
// ============================================================================

/**
 * Export de toutes les entités
 * Permet un import groupé: import entities from './entities'
 */
export default {
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
};
