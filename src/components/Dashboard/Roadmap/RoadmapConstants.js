/**
 * Constantes pour le module Timeline
 */

// Dimensions de visualisation
export const VIEW_MODES = {
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year'
};

// Contraintes de largeur par mode (min/max/default en pixels)
export const DAY_WIDTH_CONSTRAINTS = {
  month: { min: 15, max: 80, default: 30 },
  quarter: { min: 4, max: 30, default: 8 },
  year: { min: 2, max: 10, default: 3 }
};

// Niveaux de zoom
export const ZOOM = {
  MIN: 0.5,
  MAX: 2.5,
  STEP: 0.1,
  DEFAULT: 1
};

// Layout responsive basé sur window.innerWidth
export const getResponsiveLayout = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  
  if (width < 640) {
    // Mobile
    return {
      SPRINT_ROW_HEIGHT: 60,
      STORY_HEIGHT: 20,
      TASK_HEIGHT: 16,
      MARGIN_LEFT: 100,
      TIME_MARKERS_HEIGHT: 40,
      SIDEBAR_WIDTH: 48,
      PADDING_HORIZONTAL: 12
    };
  } else if (width < 1024) {
    // Tablet
    return {
      SPRINT_ROW_HEIGHT: 70,
      STORY_HEIGHT: 22,
      TASK_HEIGHT: 17,
      MARGIN_LEFT: 160,
      TIME_MARKERS_HEIGHT: 45,
      SIDEBAR_WIDTH: 56,
      PADDING_HORIZONTAL: 20
    };
  } else {
    // Desktop
    return {
      SPRINT_ROW_HEIGHT: 80,
      STORY_HEIGHT: 24,
      TASK_HEIGHT: 18,
      MARGIN_LEFT: 300,
      TIME_MARKERS_HEIGHT: 50,
      SIDEBAR_WIDTH: 64,
      PADDING_HORIZONTAL: 32
    };
  }
};

// Export statique pour rétrocompatibilité (desktop par défaut)
export const LAYOUT = {
  SPRINT_ROW_HEIGHT: 80,
  STORY_HEIGHT: 24,
  TASK_HEIGHT: 18,
  MARGIN_LEFT: 300,
  TIME_MARKERS_HEIGHT: 50,
  SIDEBAR_WIDTH: 64,
  PADDING_HORIZONTAL: 32
};

// Couleurs par statut
export const STATUS_COLORS = {
  planned: {
    bg: 'bg-cyan-100 hover:bg-cyan-200',
    border: 'border-cyan-400',
    text: 'text-cyan-800'
  },
  active: {
    bg: 'bg-emerald-100 hover:bg-emerald-200',
    border: 'border-emerald-500',
    text: 'text-emerald-800'
  },
  completed: {
    bg: 'bg-gray-100 hover:bg-gray-200',
    border: 'border-gray-400',
    text: 'text-gray-700'
  },
  cancelled: {
    bg: 'bg-red-100 hover:bg-red-200',
    border: 'border-red-400',
    text: 'text-red-700'
  }
};

// Couleurs par statut de story
export const STORY_STATUS_COLORS = {
  done: 'bg-emerald-50 border-emerald-300 text-emerald-800',
  inProgress: 'bg-yellow-50 border-yellow-300 text-yellow-800',
  planned: 'bg-cyan-50 border-cyan-300 text-cyan-800',
  unassigned: 'bg-gray-50 border-gray-300 text-gray-700'
};

// Icônes par statut de story
export const STORY_STATUS_ICONS = {
  done: '✓',
  inProgress: '▶',
  planned: '○',
  unassigned: '○'
};

// Couleurs par statut de tâche
export const TASK_STATUS_COLORS = {
  done: 'bg-emerald-100 border-emerald-400 text-emerald-900',
  inProgress: 'bg-orange-100 border-orange-400 text-orange-900',
  planned: 'bg-cyan-100 border-cyan-400 text-cyan-900',
  blocked: 'bg-red-100 border-red-400 text-red-900'
};

// Icônes par statut de tâche
export const TASK_STATUS_ICONS = {
  done: '☑',
  inProgress: '◐',
  planned: '☐',
  blocked: '⊗'
};

// Labels de statut
export const STATUS_LABELS = {
  planned: '📅 Planifiés',
  active: '▶️ En cours',
  completed: '✓ Terminés',
  cancelled: '❌ Annulés'
};
