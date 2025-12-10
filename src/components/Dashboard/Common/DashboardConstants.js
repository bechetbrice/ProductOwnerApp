/**
 * DashboardConstants.js
 * Design System standardisé pour tous les composants du Dashboard
 * Version 1.0 - Décembre 2024
 */

// ============================================
// TYPOGRAPHIE
// ============================================
export const DASHBOARD_TEXT = {
  // Titres
  h1: 'text-lg sm:text-xl font-semibold text-gray-900',
  h2: 'text-base sm:text-lg font-semibold text-gray-800',
  h3: 'text-sm font-semibold text-gray-800',
  
  // Labels et textes
  label: 'text-xs sm:text-sm font-normal text-gray-700',
  labelUppercase: 'text-xs font-medium uppercase tracking-wide text-gray-600',
  
  // Valeurs et métriques
  valueLarge: 'text-xl sm:text-2xl font-bold text-gray-900',
  valueMedium: 'text-lg sm:text-xl font-bold text-gray-900',
  valueSmall: 'text-sm font-medium text-gray-900',
  
  // Descriptions et info
  description: 'text-xs sm:text-sm text-gray-600',
  caption: 'text-xs text-gray-500',
};

// ============================================
// ESPACEMENTS
// ============================================
export const DASHBOARD_SPACING = {
  // Conteneurs
  containerMain: 'p-4 md:p-6 lg:p-8',
  containerSection: 'space-y-4 md:space-y-6',
  
  // Cards et conteneurs internes
  cardCompact: 'p-2 sm:p-3',      // Stats compactes (Budget)
  cardStandard: 'p-3 sm:p-4',     // Cards normales
  cardLarge: 'p-4 sm:p-6',        // Cards importantes
  
  // Espacements verticaux
  sectionGap: 'space-y-4 sm:space-y-6',  // Entre sections principales
  elementGap: 'space-y-3 sm:space-y-4',  // Entre éléments d'une section
  itemGap: 'space-y-2 sm:space-y-3',     // Entre items d'une liste
  
  // Grilles
  gridStatsCompact: 'gap-2 sm:gap-3',    // Stats Dashboard (5 colonnes)
  gridCardsStandard: 'gap-3 sm:gap-4',   // Cards normales (2-3 colonnes)
  gridSections: 'gap-4 sm:gap-6',        // Sections principales
};

// ============================================
// COULEURS DE FOND
// ============================================
export const DASHBOARD_BACKGROUNDS = {
  // Hiérarchie
  level1: 'bg-gray-50',        // Fond principal page
  level2: 'bg-white',          // Cards et conteneurs
  
  // Highlights (alternance emerald/teal)
  highlight1: 'bg-emerald-50 border border-emerald-100',
  highlight2: 'bg-teal-50 border border-teal-100',
  
  // Alertes et états
  alert: 'bg-red-50 border-l-4 border-red-500',
  success: 'bg-green-50 border border-green-200',
  warning: 'bg-orange-50 border border-orange-200',
  info: 'bg-cyan-50 border border-cyan-200',
};

// ============================================
// BORDURES
// ============================================
export const DASHBOARD_BORDERS = {
  normal: 'border border-gray-200',           // Bordure standard
  subtle: 'border border-gray-100',           // Bordure légère
  accent: 'border-l-4',                       // Accent coloré (gauche)
  highlight: 'border border-emerald-100',      // Highlight emerald
  highlightAlt: 'border border-teal-100',     // Highlight teal
  rounded: 'rounded-lg',                      // Coins arrondis standard
};

// ============================================
// CLASSES COMPOSÉES FRÉQUENTES
// ============================================
export const DASHBOARD_COMPOSED = {
  // Cards standard
  cardWhite: 'bg-white rounded-lg shadow',
  cardHighlight1: 'bg-emerald-50 rounded-lg border border-emerald-100',
  cardHighlight2: 'bg-teal-50 rounded-lg border border-teal-100',
  
  // Sections conteneurs
  sectionMain: 'p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6',
  sectionContent: 'space-y-3 sm:space-y-4',
  
  // Grilles responsive
  gridStats: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3',
  gridCards2Col: 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6',
  gridCards3Col: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4',
};
