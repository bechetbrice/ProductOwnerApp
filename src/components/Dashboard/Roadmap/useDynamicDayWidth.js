import { useState, useEffect } from 'react';
import { DAY_WIDTH_CONSTRAINTS, LAYOUT } from './RoadmapConstants';

/**
 * Hook personnalisé pour calculer dynamiquement la largeur d'un jour
 * en fonction de la taille de l'écran et du niveau de zoom
 * 
 * @param {string} viewMode - Mode de vue (month/quarter/year)
 * @param {number} days - Nombre de jours à afficher
 * @param {number} zoomLevel - Niveau de zoom (1 = 100%)
 * @returns {number} Largeur d'un jour en pixels
 */
export const useDynamicDayWidth = (viewMode, days, zoomLevel = 1) => {
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      // Calculer la largeur disponible
      // viewport - sidebar - padding gauche - padding droit - margin left timeline
      const availableWidth = 
        window.innerWidth - 
        LAYOUT.SIDEBAR_WIDTH - 
        LAYOUT.PADDING_HORIZONTAL * 2 - 
        LAYOUT.MARGIN_LEFT;
      
      setContainerWidth(Math.max(0, availableWidth));
    };

    // Calcul initial
    updateWidth();

    // Recalculer lors du redimensionnement
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const constraints = DAY_WIDTH_CONSTRAINTS[viewMode];

  // Si pas encore de largeur container, utiliser la valeur par défaut
  if (containerWidth === 0 || days === 0) {
    return constraints.default * zoomLevel;
  }

  // Calculer la largeur idéale pour remplir l'espace disponible
  const idealWidth = (containerWidth / days) * zoomLevel;

  // Appliquer les contraintes min/max
  const finalWidth = Math.max(
    constraints.min,
    Math.min(constraints.max, idealWidth)
  );

  return finalWidth;
};
