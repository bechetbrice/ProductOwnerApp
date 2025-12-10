/**
 * needEnrichment.js - Utilitaire d'enrichissement des besoins pour l'analyse
 * 
 * Ce module transforme les besoins utilisateurs bruts en besoins enrichis
 * avec des métadonnées calculées pour faciliter l'analyse et la priorisation.
 * 
 * @module utils/analysis/needEnrichment
 * @version 2.5.1
 * @since 2025-10-04
 */

/**
 * Mappe l'importance vers un score numérique (1-4)
 * Utilisé pour les calculs de score d'impact et la priorisation
 */
const IMPORTANCE_SCORES = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1
};

/**
 * Mappe l'importance vers une valeur business (0-100)
 * Utilisé pour la matrice de priorisation
 */
const IMPORTANCE_TO_VALUE = {
  critical: 100,
  high: 75,
  medium: 50,
  low: 25
};

/**
 * Estime l'effort requis pour un besoin
 * Utilise UNIQUEMENT le champ storyPoints renseigné manuellement par l'équipe.
 * Si non renseigné, retourne 0 pour indiquer l'absence d'estimation.
 * 
 * @param {Object} need - Le besoin utilisateur
 * @returns {number} Score d'effort (0-21)
 *   - 0: Non estimé
 *   - 1: Très faible
 *   - 2: Faible
 *   - 3: Moyen
 *   - 5: Élevé
 *   - 8, 13, 21: Très élevé
 */
export const estimateEffort = (need) => {
  // Utiliser UNIQUEMENT le champ storyPoints renseigné manuellement
  if (need.storyPoints) {
    return need.storyPoints; // Retourner directement les story points
  }
  
  // Rétrocompatibilité : si ancien format "effort" existe
  if (need.effort) {
    switch (need.effort) {
      case 'low':
        return 1;
      case 'medium':
        return 3;
      case 'high':
        return 5;
      default:
        return 0; // Non estimé
    }
  }
  
  // Si non renseigné, retourner 0 (non estimé)
  return 0;
};

/**
 * Calcule le score d'impact d'un besoin
 * Formule: (importance_score * 10) + (nombre_stakeholders * 5) + (20 si critique)
 * 
 * @param {Object} need - Le besoin utilisateur
 * @returns {number} Score d'impact (0-100+)
 *   - Plus le score est élevé, plus le besoin est impactant
 *   - Prend en compte l'importance ET le nombre de stakeholders
 */
export const calculateImpactScore = (need) => {
  const importanceScore = IMPORTANCE_SCORES[need.importance] || 2;
  const stakeholderCount = (need.stakeholderIds || []).length;
  
  // Bonus si contact privilégié défini
  const primaryContactBonus = need.primaryContactId ? 5 : 0;
  
  // Bonus si besoin critique
  const criticalBonus = need.importance === 'critical' ? 20 : 0;
  
  return (importanceScore * 10) + (stakeholderCount * 5) + primaryContactBonus + criticalBonus;
};

/**
 * Calcule l'âge d'un besoin en jours
 * 
 * @param {Object} need - Le besoin utilisateur
 * @returns {number} Nombre de jours depuis la création
 */
export const calculateAge = (need) => {
  if (!need.createdAt) return 0;
  const createdDate = new Date(need.createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Enrichit un besoin avec des métadonnées calculées
 * 
 * @param {Object} need - Le besoin utilisateur brut
 * @param {Object} context - Contexte nécessaire pour l'enrichissement
 * @param {Array} context.contacts - Liste complète des contacts
 * @param {Array} context.products - Liste complète des produits
 * @param {Array} context.userStories - Liste complète des user stories
 * @returns {Object} Besoin enrichi avec métadonnées
 */
export const enrichNeed = (need, { contacts = [], products = [], userStories = [] }) => {
  // Récupérer les informations liées
  const product = products.find(p => p.id === need.productId);
  const primaryContact = contacts.find(c => c.id === (need.primaryContactId || need.contactId));
  const stakeholders = (need.stakeholderIds || [])
    .map(id => contacts.find(c => c.id === id))
    .filter(Boolean);
  
  // Récupérer les stories liées
  const linkedStories = userStories.filter(story => 
    story.linkedNeedIds && story.linkedNeedIds.includes(need.id)
  );
  
  const completedStories = linkedStories.filter(s => s.status === 'done');
  const inProgressStories = linkedStories.filter(s => s.status === 'inProgress');
  
  // Calculer les métriques
  const impactScore = calculateImpactScore(need);
  const effortScore = estimateEffort(need);
  const age = calculateAge(need);
  const isAddressed = linkedStories.length > 0;
  const isFullyAddressed = linkedStories.length > 0 && completedStories.length === linkedStories.length;
  
  // Calculer la valeur business
  const businessValue = IMPORTANCE_TO_VALUE[need.importance] || 50;
  
  // Calculer le ratio valeur/effort (seulement si effort > 0)
  const valueEffortRatio = effortScore > 0 ? (businessValue / effortScore).toFixed(2) : 'N/A';
  
  // Déterminer le quadrant de la matrice (pour priorisation)
  // Si pas de story points, considérer comme "non estimé" -> fillIns par défaut
  const highImportance = IMPORTANCE_SCORES[need.importance] >= 3;
  const lowEffort = effortScore > 0 && effortScore <= 3; // Ajusté pour Fibonacci (1-3 = faible)
  
  let quadrant = 'fillIns'; // Par défaut pour besoins non estimés
  if (effortScore > 0) {
    // Seulement calculer le quadrant si le besoin est estimé
    if (highImportance && lowEffort) quadrant = 'quickWins';
    else if (highImportance && !lowEffort) quadrant = 'strategic';
    else if (!highImportance && lowEffort) quadrant = 'fillIns';
    else quadrant = 'timeSinks';
  }
  
  // Retourner le besoin enrichi
  return {
    ...need,
    
    // Métadonnées calculées
    enrichment: {
      // Scores
      impactScore,
      effortScore,
      businessValue,
      valueEffortRatio,
      
      // État
      age,
      isAddressed,
      isFullyAddressed,
      
      // Priorisation
      quadrant,
      recommendedAction: getRecommendedAction({ 
        quadrant, 
        age, 
        isAddressed, 
        importance: need.importance 
      }),
      
      // Informations liées
      product: product ? {
        id: product.id,
        code: product.code,
        name: product.name,
        color: product.color
      } : null,
      
      primaryContact: primaryContact ? {
        id: primaryContact.id,
        name: primaryContact.name,
        type: primaryContact.type,
        role: primaryContact.role
      } : null,
      
      stakeholders: stakeholders.map(s => ({
        id: s.id,
        name: s.name,
        type: s.type,
        role: s.role
      })),
      
      stakeholderCount: stakeholders.length,
      
      // Stories liées
      linkedStories: linkedStories.map(s => ({
        id: s.id,
        title: s.title,
        status: s.status,
        priority: s.priority
      })),
      
      storyMetrics: {
        total: linkedStories.length,
        completed: completedStories.length,
        inProgress: inProgressStories.length,
        coverage: linkedStories.length > 0 
          ? ((completedStories.length / linkedStories.length) * 100).toFixed(1)
          : 0
      }
    }
  };
};

/**
 * Détermine l'action recommandée pour un besoin
 * 
 * @param {Object} params - Paramètres
 * @param {string} params.quadrant - Quadrant de la matrice
 * @param {number} params.age - Âge du besoin en jours
 * @param {boolean} params.isAddressed - Si le besoin est adressé
 * @param {string} params.importance - Importance du besoin
 * @returns {string} Action recommandée
 */
const getRecommendedAction = ({ quadrant, age, isAddressed, importance }) => {
  // Si besoin déjà adressé
  if (isAddressed) {
    return 'Suivi et validation';
  }
  
  // Besoins critiques non adressés
  if (importance === 'critical' && !isAddressed) {
    return '⚠️ URGENT : Créer une story immédiatement';
  }
  
  // Besoins anciens non adressés (> 30 jours)
  if (age > 30 && !isAddressed) {
    return '⏰ Ancien : Réévaluer la pertinence ou créer une story';
  }
  
  // Recommandations par quadrant
  switch (quadrant) {
    case 'quickWins':
      return '🎯 Quick Win : Créer une story rapidement';
    case 'strategic':
      return '🚀 Stratégique : Planifier et découper si nécessaire';
    case 'fillIns':
      return '📋 Fill-in : Créer si temps disponible';
    case 'timeSinks':
      return '⏳ Time Sink : Éviter ou redéfinir le scope';
    default:
      return 'Analyser et décider';
  }
};

/**
 * Enrichit un tableau de besoins
 * 
 * @param {Array} needs - Tableau de besoins utilisateurs
 * @param {Object} context - Contexte nécessaire pour l'enrichissement
 * @returns {Array} Tableau de besoins enrichis
 */
export const enrichNeeds = (needs, context) => {
  return needs.map(need => enrichNeed(need, context));
};

/**
 * Filtre les besoins enrichis selon des critères
 * 
 * @param {Array} enrichedNeeds - Besoins enrichis
 * @param {Object} filters - Critères de filtrage
 * @param {string} filters.importance - Filtrer par importance
 * @param {string} filters.quadrant - Filtrer par quadrant
 * @param {string} filters.productId - Filtrer par produit
 * @param {boolean} filters.onlyUnaddressed - Uniquement besoins non adressés
 * @param {number} filters.minAge - Âge minimum en jours
 * @param {number} filters.maxAge - Âge maximum en jours
 * @returns {Array} Besoins filtrés
 */
export const filterEnrichedNeeds = (enrichedNeeds, filters = {}) => {
  return enrichedNeeds.filter(need => {
    const { enrichment } = need;
    
    // Filtre importance
    if (filters.importance && filters.importance !== 'all' && need.importance !== filters.importance) {
      return false;
    }
    
    // Filtre quadrant
    if (filters.quadrant && enrichment.quadrant !== filters.quadrant) {
      return false;
    }
    
    // Filtre produit
    if (filters.productId && filters.productId !== 'all' && need.productId !== filters.productId) {
      return false;
    }
    
    // Filtre besoins non adressés
    if (filters.onlyUnaddressed && enrichment.isAddressed) {
      return false;
    }
    
    // Filtre âge minimum
    if (filters.minAge !== undefined && enrichment.age < filters.minAge) {
      return false;
    }
    
    // Filtre âge maximum
    if (filters.maxAge !== undefined && enrichment.age > filters.maxAge) {
      return false;
    }
    
    return true;
  });
};

/**
 * Trie les besoins enrichis selon un critère
 * 
 * @param {Array} enrichedNeeds - Besoins enrichis
 * @param {string} sortBy - Critère de tri
 *   - 'impactScore': Score d'impact décroissant
 *   - 'effortScore': Score d'effort croissant
 *   - 'valueEffortRatio': Ratio valeur/effort décroissant
 *   - 'age': Âge décroissant
 *   - 'importance': Importance décroissante
 * @returns {Array} Besoins triés
 */
export const sortEnrichedNeeds = (enrichedNeeds, sortBy = 'impactScore') => {
  const sorted = [...enrichedNeeds];
  
  switch (sortBy) {
    case 'impactScore':
      return sorted.sort((a, b) => b.enrichment.impactScore - a.enrichment.impactScore);
    
    case 'effortScore':
      return sorted.sort((a, b) => a.enrichment.effortScore - b.enrichment.effortScore);
    
    case 'valueEffortRatio':
      return sorted.sort((a, b) => b.enrichment.valueEffortRatio - a.enrichment.valueEffortRatio);
    
    case 'age':
      return sorted.sort((a, b) => b.enrichment.age - a.enrichment.age);
    
    case 'importance':
      return sorted.sort((a, b) => {
        const scoreA = IMPORTANCE_SCORES[a.importance] || 2;
        const scoreB = IMPORTANCE_SCORES[b.importance] || 2;
        return scoreB - scoreA;
      });
    
    default:
      return sorted;
  }
};

/**
 * Exporte les statistiques globales des besoins enrichis
 * 
 * @param {Array} enrichedNeeds - Besoins enrichis
 * @returns {Object} Statistiques globales
 */
export const getEnrichedStats = (enrichedNeeds) => {
  const total = enrichedNeeds.length;
  
  // Par quadrant
  const byQuadrant = {
    quickWins: enrichedNeeds.filter(n => n.enrichment.quadrant === 'quickWins').length,
    strategic: enrichedNeeds.filter(n => n.enrichment.quadrant === 'strategic').length,
    fillIns: enrichedNeeds.filter(n => n.enrichment.quadrant === 'fillIns').length,
    timeSinks: enrichedNeeds.filter(n => n.enrichment.quadrant === 'timeSinks').length
  };
  
  // Par état d'adressage
  const addressed = enrichedNeeds.filter(n => n.enrichment.isAddressed).length;
  const fullyAddressed = enrichedNeeds.filter(n => n.enrichment.isFullyAddressed).length;
  const unaddressed = total - addressed;
  
  // Scores moyens
  const avgImpactScore = total > 0
    ? (enrichedNeeds.reduce((sum, n) => sum + n.enrichment.impactScore, 0) / total).toFixed(1)
    : 0;
  
  const avgEffortScore = total > 0
    ? (enrichedNeeds.reduce((sum, n) => sum + n.enrichment.effortScore, 0) / total).toFixed(1)
    : 0;
  
  const avgAge = total > 0
    ? Math.round(enrichedNeeds.reduce((sum, n) => sum + n.enrichment.age, 0) / total)
    : 0;
  
  // Besoins critiques non adressés
  const criticalUnaddressed = enrichedNeeds.filter(n => 
    n.importance === 'critical' && !n.enrichment.isAddressed
  ).length;
  
  // Besoins anciens non adressés (> 30 jours)
  const oldUnaddressed = enrichedNeeds.filter(n => 
    n.enrichment.age > 30 && !n.enrichment.isAddressed
  ).length;
  
  // Taux de conversion
  const conversionRate = total > 0 ? ((addressed / total) * 100).toFixed(1) : 0;
  
  return {
    total,
    byQuadrant,
    addressed,
    fullyAddressed,
    unaddressed,
    avgImpactScore,
    avgEffortScore,
    avgAge,
    criticalUnaddressed,
    oldUnaddressed,
    conversionRate
  };
};

/**
 * Exporte toutes les fonctions utiles
 */
export default {
  enrichNeed,
  enrichNeeds,
  filterEnrichedNeeds,
  sortEnrichedNeeds,
  getEnrichedStats,
  calculateImpactScore,
  estimateEffort,
  calculateAge
};
