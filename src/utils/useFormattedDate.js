// src/utils/useFormattedDate.js
import { usePreferences } from '../contexts/PreferencesContext';

export const useFormattedDate = () => {
  const { formatDate, formatTime, formatDateTime } = usePreferences();
  
  return {
    formatDate,
    formatTime,
    formatDateTime
  };
};

// Hook pour utiliser les préférences de suppression
export const useDeleteConfirmation = () => {
  const { preferences, showNotification } = usePreferences();
  
  const confirmDelete = (message = 'Êtes-vous sûr de vouloir supprimer cet élément ?') => {
    if (preferences?.confirmDelete) {
      return confirm(message);
    }
    return true;
  };
  
  return { confirmDelete, showNotification };
};

// Hook pour gérer les tooltips
export const useTooltip = () => {
  const { preferences } = usePreferences();
  
  const shouldShowTooltip = preferences?.showTooltips ?? true;
  
  const tooltipProps = (text) => {
    if (!shouldShowTooltip) return {};
    
    return {
      'data-tooltip': text,
      className: 'tooltip'
    };
  };
  
  return { shouldShowTooltip, tooltipProps };
};

// Hook pour gérer les animations
export const useAnimations = () => {
  const { preferences } = usePreferences();
  
  const isAnimated = preferences?.animationsEnabled ?? true;
  
  const animationClass = (baseClass, animatedClass) => {
    if (!isAnimated) return baseClass;
    return `${baseClass} ${animatedClass}`;
  };
  
  return { isAnimated, animationClass };
};
