/**
 * Constantes globales de l'application ProductOwnerApp
 * Version: 3.2.5
 */

// ============================================================================
// STATUTS USER STORIES
// ============================================================================

export const USER_STORY_STATUSES = {
  UNASSIGNED: 'unassigned',
  PLANNED: 'planned',
  IN_PROGRESS: 'inProgress',
  DONE: 'done'
};

export const USER_STORY_STATUS_CONFIG = {
  unassigned: {
    label: 'Non statué',
    color: 'bg-gray-100 text-gray-700',
    description: 'En attente d\'assignation au sprint',
    icon: '❓'
  },
  planned: {
    label: 'Planifié',
    color: 'bg-blue-100 text-blue-800',
    description: 'Story assignée au sprint, prête à démarrer',
    icon: '📋'
  },
  inProgress: {
    label: 'En cours',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Story en développement actif',
    icon: '🔄'
  },
  done: {
    label: 'Terminé',
    color: 'bg-green-100 text-green-800',
    description: 'Story complétée',
    icon: '✅'
  }
};

// ============================================================================
// PRIORITÉS MoSCoW
// ============================================================================

export const MOSCOW_PRIORITIES = {
  MUST: 'must',
  SHOULD: 'should',
  COULD: 'could',
  WONT: 'wont'
};

export const MOSCOW_PRIORITY_CONFIG = {
  must: {
    label: 'Must have',
    shortLabel: 'Must',
    description: 'Indispensable',
    color: 'bg-red-100 text-red-800',
    borderColor: 'border-red-300',
    selectedColor: 'bg-red-100 border-red-400 text-red-900',
    icon: '🔴'
  },
  should: {
    label: 'Should have',
    shortLabel: 'Should',
    description: 'Important',
    color: 'bg-orange-100 text-orange-800',
    borderColor: 'border-orange-300',
    selectedColor: 'bg-orange-100 border-orange-400 text-orange-900',
    icon: '🟠'
  },
  could: {
    label: 'Could have',
    shortLabel: 'Could',
    description: 'Souhaitable',
    color: 'bg-yellow-100 text-yellow-800',
    borderColor: 'border-yellow-300',
    selectedColor: 'bg-yellow-100 border-yellow-400 text-yellow-900',
    icon: '🟡'
  },
  wont: {
    label: "Won't have",
    shortLabel: "Won't",
    description: 'Exclu',
    color: 'bg-gray-100 text-gray-800',
    borderColor: 'border-gray-300',
    selectedColor: 'bg-gray-100 border-gray-400 text-gray-900',
    icon: '⚪'
  }
};

// ============================================================================
// TYPES DE CONTACTS
// ============================================================================

export const CONTACT_TYPES = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  CLIENT: 'client'
};

export const CONTACT_TYPE_LABELS = {
  internal: 'Interne',
  external: 'Externe',
  client: 'Client'
};

export const CONTACT_TYPE_COLORS = {
  internal: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    icon: '👤',
    label: 'Interne'
  },
  external: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    icon: '🏢',
    label: 'Externe'
  },
  client: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    icon: '👥',
    label: 'Client'
  }
};

// ============================================================================
// TYPES DE CONTRAT
// ============================================================================

export const CONTRACT_TYPES = {
  // Internes
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  INTERN: 'intern',
  APPRENTICE: 'apprentice',
  // Externes
  FREELANCE: 'freelance',
  CONTRACTOR: 'contractor',
  AGENCY: 'agency',
  CONSULTANT: 'consultant'
};

export const CONTRACT_TYPE_CONFIG = {
  // Contrats INTERNES
  full_time: {
    label: 'Temps plein (CDI)',
    type: 'internal',
    icon: '💼'
  },
  part_time: {
    label: 'Temps partiel',
    type: 'internal',
    icon: '⏰'
  },
  intern: {
    label: 'Stagiaire',
    type: 'internal',
    icon: '🎓'
  },
  apprentice: {
    label: 'Alternant',
    type: 'internal',
    icon: '🏫'
  },
  // Contrats EXTERNES
  freelance: {
    label: 'Freelance',
    type: 'external',
    icon: '💻'
  },
  contractor: {
    label: 'Prestataire',
    type: 'external',
    icon: '🤝'
  },
  agency: {
    label: 'Agence',
    type: 'external',
    icon: '🏢'
  },
  consultant: {
    label: 'Consultant',
    type: 'external',
    icon: '📈'
  }
};

// ============================================================================
// TYPES D'ENTRETIENS
// ============================================================================

export const INTERVIEW_TYPES = {
  DISCOVERY: 'discovery',
  VALIDATION: 'validation',
  FEEDBACK: 'feedback',
  RESEARCH: 'research'
};

// ============================================================================
// STATUTS SPRINTS
// ============================================================================

export const SPRINT_STATUSES = {
  PLANNED: 'planned',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const SPRINT_STATUS_CONFIG = {
  planned: {
    label: 'Planifié',
    color: 'bg-blue-100 text-blue-800',
    description: 'Sprint planifié, pas encore démarré',
    icon: '📅'
  },
  active: {
    label: 'En cours',
    color: 'bg-green-100 text-green-800',
    description: 'Sprint en cours d\'exécution',
    icon: '🟢'
  },
  completed: {
    label: 'Terminé',
    color: 'bg-gray-100 text-gray-800',
    description: 'Sprint terminé',
    icon: '✅'
  },
  cancelled: {
    label: 'Annulé',
    color: 'bg-red-100 text-red-800',
    description: 'Sprint annulé',
    icon: '❌'
  }
};

// ============================================================================
// IMPORTANCE BESOINS
// ============================================================================

export const NEED_IMPORTANCE = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

export const NEED_IMPORTANCE_CONFIG = {
  critical: {
    label: 'Critique',
    color: 'bg-red-500',
    textColor: 'text-red-800',
    icon: '🔴'
  },
  high: {
    label: 'Haute',
    color: 'bg-orange-500',
    textColor: 'text-orange-800',
    icon: '🟠'
  },
  medium: {
    label: 'Moyenne',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-800',
    icon: '🟡'
  },
  low: {
    label: 'Basse',
    color: 'bg-gray-400',
    textColor: 'text-gray-800',
    icon: '⚪'
  }
};

// ============================================================================
// EFFORT ESTIMATION
// ============================================================================

export const EFFORT_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const EFFORT_CONFIG = {
  low: {
    label: 'Faible',
    color: 'bg-green-100 text-green-800',
    icon: '🟢'
  },
  medium: {
    label: 'Moyen',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '🟡'
  },
  high: {
    label: 'Élevé',
    color: 'bg-red-100 text-red-800',
    icon: '🔴'
  }
};

// ============================================================================
// PRIORITÉS ACTIONS
// ============================================================================

export const ACTION_PRIORITIES = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

export const ACTION_PRIORITY_CONFIG = {
  critical: {
    label: 'Critique',
    badgeColor: 'bg-red-100 text-red-800',
    dotColor: 'bg-red-500'
  },
  high: {
    label: 'Haute',
    badgeColor: 'bg-orange-100 text-orange-800',
    dotColor: 'bg-orange-500'
  },
  medium: {
    label: 'Moyenne',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    dotColor: 'bg-yellow-500'
  },
  low: {
    label: 'Basse',
    badgeColor: 'bg-gray-100 text-gray-800',
    dotColor: 'bg-gray-500'
  }
};

// ============================================================================
// CATÉGORIES ACTIONS
// ============================================================================

export const ACTION_CATEGORIES = {
  DEVELOPMENT: 'development',
  DESIGN: 'design',
  RESEARCH: 'research',
  BUSINESS: 'business',
  OTHER: 'other'
};

export const ACTION_CATEGORY_CONFIG = {
  development: {
    label: 'Développement',
    icon: '💻',
    color: 'text-blue-600'
  },
  design: {
    label: 'Design',
    icon: '🎨',
    color: 'text-purple-600'
  },
  research: {
    label: 'Recherche',
    icon: '🔬',
    color: 'text-green-600'
  },
  business: {
    label: 'Business',
    icon: '💼',
    color: 'text-orange-600'
  },
  other: {
    label: 'Autre',
    icon: '📋',
    color: 'text-gray-600'
  }
};

// ============================================================================
// TYPES D'INSIGHTS
// ============================================================================

export const INSIGHT_TYPES = {
  NEED: 'need',
  PAIN_POINT: 'pain_point',
  OPPORTUNITY: 'opportunity',
  QUOTE: 'quote',
  BEHAVIOR: 'behavior',
  FEEDBACK: 'feedback'
};

export const INSIGHT_TYPE_CONFIG = {
  need: {
    label: 'Besoin',
    icon: '💡',
    color: 'text-blue-600'
  },
  pain_point: {
    label: 'Point de friction',
    icon: '⚠️',
    color: 'text-red-600'
  },
  opportunity: {
    label: 'Opportunité',
    icon: '🎯',
    color: 'text-green-600'
  },
  quote: {
    label: 'Citation',
    icon: '💬',
    color: 'text-purple-600'
  },
  behavior: {
    label: 'Comportement',
    icon: '👤',
    color: 'text-indigo-600'
  },
  feedback: {
    label: 'Feedback',
    icon: '📝',
    color: 'text-orange-600'
  }
};

// ============================================================================
// CATÉGORIES BUDGÉTAIRES
// ============================================================================

export const BUDGET_CATEGORIES = {
  DEVELOPMENT: 'development',
  HUMAN_RESOURCES: 'human_resources',
  INFRASTRUCTURE: 'infrastructure',
  LICENSES: 'licenses',
  EXTERNAL: 'external',
  MARKETING: 'marketing',
  OTHER: 'other'
};

export const BUDGET_CATEGORY_CONFIG = {
  development: {
    label: 'Développement',
    icon: '💻',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Développement produit, R&D'
  },
  human_resources: {
    label: 'Ressources Humaines',
    icon: '👥',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    description: 'Salaires, charges, formations'
  },
  infrastructure: {
    label: 'Infrastructure',
    icon: '🛠️',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Serveurs, cloud, hébergement'
  },
  licenses: {
    label: 'Licences & Logiciels',
    icon: '📦',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    description: 'SaaS, outils, licences'
  },
  external: {
    label: 'Prestataires Externes',
    icon: '🤝',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Freelances, agences, consultants'
  },
  marketing: {
    label: 'Marketing & Communication',
    icon: '📣',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    description: 'Publicité, communication, événements'
  },
  other: {
    label: 'Autres',
    icon: '📁',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    description: 'Dépenses diverses'
  }
};

// ============================================================================
// TYPES DE PÉRIODES BUDGÉTAIRES
// ============================================================================

export const BUDGET_PERIOD_TYPES = {
  SPRINT: 'sprint',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly'
};

export const BUDGET_PERIOD_TYPE_CONFIG = {
  sprint: {
    label: 'Sprint',
    icon: '🏃',
    description: 'Budget par sprint'
  },
  monthly: {
    label: 'Mensuel',
    icon: '📅',
    description: 'Budget mensuel'
  },
  quarterly: {
    label: 'Trimestriel',
    icon: '📆',
    description: 'Budget trimestriel (3 mois)'
  },
  yearly: {
    label: 'Annuel',
    icon: '📇',
    description: 'Budget annuel'
  }
};

// ============================================================================
// STATUTS BUDGÉTAIRES
// ============================================================================

export const BUDGET_STATUSES = {
  PLANNED: 'planned',
  ONGOING: 'ongoing',
  CLOSED: 'closed'
};

export const BUDGET_STATUS_CONFIG = {
  planned: {
    label: 'Planifié',
    color: 'bg-blue-100 text-blue-800',
    icon: '📈'
  },
  ongoing: {
    label: 'En cours',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⌛'
  },
  closed: {
    label: 'Clôturé',
    color: 'bg-gray-100 text-gray-800',
    icon: '✅'
  }
};

// ============================================================================
// DEVISES
// ============================================================================

export const CURRENCIES = {
  EUR: 'EUR',
  USD: 'USD',
  GBP: 'GBP'
};

export const CURRENCY_CONFIG = {
  EUR: {
    label: 'Euro',
    symbol: '€',
    format: (amount) => amount.toLocaleString('fr-FR') + ' €'
  },
  USD: {
    label: 'Dollar',
    symbol: '$',
    format: (amount) => '$' + amount.toLocaleString('en-US')
  },
  GBP: {
    label: 'Livre Sterling',
    symbol: '£',
    format: (amount) => '£' + amount.toLocaleString('en-GB')
  }
};
