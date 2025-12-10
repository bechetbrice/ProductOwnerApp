import { useMemo } from 'react';
import { DAY_WIDTH_CONSTRAINTS } from './RoadmapConstants';

/**
 * Hook simplifié qui calcule SEULEMENT la largeur minimum nécessaire
 * pour activer le scroll horizontal si besoin.
 * Le responsive est géré par CSS Flexbox.
 * 
 * @param {string} viewMode - Mode de vue (month/quarter/year)
 * @param {number} days - Nombre de jours à afficher
 * @returns {number} Largeur minimale de la timeline en pixels
 */
export const useMinTimelineWidth = (viewMode, days) => {
  return useMemo(() => {
    const constraints = DAY_WIDTH_CONSTRAINTS[viewMode];
    // Largeur minimale = nombre de jours × largeur min par jour
    return days * constraints.min;
  }, [viewMode, days]);
};

/**
 * Calcule la largeur d'un jour pour les calculs de positionnement
 * (utilisé pour sprints qui ne sont pas en flex)
 * Cette fonction est appelée dynamiquement pour chaque calcul
 * 
 * @param {HTMLElement} timelineElement - L'élément DOM de la timeline
 * @param {number} days - Nombre de jours
 * @returns {number} Largeur effective d'un jour en pixels
 */
export const calculateDayWidth = (timelineElement, days) => {
  if (!timelineElement || days === 0) return 0;
  
  // Mesurer la largeur réelle de la timeline
  const timelineWidth = timelineElement.offsetWidth;
  
  // Diviser par nombre de jours
  return timelineWidth / days;
};
