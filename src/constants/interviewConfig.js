/**
 * Configuration centralisée du module Interviews
 * 
 * Tous les statuts, types et configurations visuelles
 * des entretiens sont définis ici pour éviter la duplication.
 */

// ====== STATUTS D'ENTRETIEN ======
export const INTERVIEW_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const STATUS_CONFIG = {
  [INTERVIEW_STATUS.SCHEDULED]: {
    label: 'Planifié',
    emoji: '📅',
    description: 'En attente',
    color: '#3B82F6',
    badgeClass: 'bg-blue-100 text-blue-800',
    colorClass: 'blue'
  },
  [INTERVIEW_STATUS.IN_PROGRESS]: {
    label: 'En cours',
    emoji: '⏳',
    description: 'En cours',
    color: '#F59E0B',
    badgeClass: 'bg-yellow-100 text-yellow-800',
    colorClass: 'yellow'
  },
  [INTERVIEW_STATUS.COMPLETED]: {
    label: 'Terminé',
    emoji: '✅',
    description: 'Réalisé',
    color: '#10B981',
    badgeClass: 'bg-green-100 text-green-800',
    colorClass: 'green'
  },
  [INTERVIEW_STATUS.CANCELLED]: {
    label: 'Annulé',
    emoji: '❌',
    description: 'Annulé',
    color: '#EF4444',
    badgeClass: 'bg-red-100 text-red-800',
    colorClass: 'red'
  }
};

// Options pour les formulaires
export const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, config]) => ({
  value,
  label: config.label,
  emoji: config.emoji,
  description: config.description,
  colorClass: config.colorClass
}));

// ====== TYPES D'ENTRETIEN ======
export const INTERVIEW_TYPE = {
  DISCOVERY: 'discovery',
  VALIDATION: 'validation',
  FEEDBACK: 'feedback',
  RESEARCH: 'research',
  CUSTOM: 'custom'
};

export const TYPE_CONFIG = {
  [INTERVIEW_TYPE.DISCOVERY]: {
    label: 'Découverte',
    emoji: '🔍',
    color: '#3B82F6',
    badgeClass: 'bg-blue-100 text-blue-700'
  },
  [INTERVIEW_TYPE.VALIDATION]: {
    label: 'Validation',
    emoji: '✅',
    color: '#10B981',
    badgeClass: 'bg-green-100 text-green-700'
  },
  [INTERVIEW_TYPE.FEEDBACK]: {
    label: 'Feedback',
    emoji: '💬',
    color: '#8B5CF6',
    badgeClass: 'bg-purple-100 text-purple-700'
  },
  [INTERVIEW_TYPE.RESEARCH]: {
    label: 'Recherche',
    emoji: '📊',
    color: '#6366F1',
    badgeClass: 'bg-indigo-100 text-indigo-700'
  },
  [INTERVIEW_TYPE.CUSTOM]: {
    label: 'Personnalisé',
    emoji: '✏️',
    color: '#6B7280',
    badgeClass: 'bg-gray-100 text-gray-700'
  }
};

// Options pour les formulaires
export const TYPE_OPTIONS = Object.entries(TYPE_CONFIG).map(([value, config]) => ({
  value,
  label: `${config.emoji} ${config.label}`
}));

// ====== PLAGES DE DATES POUR FILTRES ======
export const DATE_RANGES = {
  ALL: 'all',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  PAST: 'past'
};

export const DATE_RANGE_OPTIONS = [
  { value: DATE_RANGES.ALL, label: 'Toutes les périodes' },
  { value: DATE_RANGES.TODAY, label: 'Aujourd\'hui' },
  { value: DATE_RANGES.WEEK, label: 'Cette semaine' },
  { value: DATE_RANGES.MONTH, label: 'Ce mois' },
  { value: DATE_RANGES.PAST, label: 'Passés' }
];
