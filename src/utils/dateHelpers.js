/**
 * Helpers pour la manipulation et le formatage des dates
 * 
 * Centralise toutes les fonctions de formatage de dates
 * utilisées dans le module Interviews.
 */

/**
 * Formate une date en format long français
 * Ex: "3 décembre 2024 à 14:30"
 */
export const formatDateLong = (dateString) => {
  if (!dateString) return 'Non planifié';
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formate une date en format court français
 * Ex: "03/12/2024"
 */
export const formatDateShort = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formate une date en format moyen français
 * Ex: "3 déc. 2024"
 */
export const formatDateMedium = (dateString) => {
  if (!dateString) return 'Non planifié';
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric'
  });
};

/**
 * Extrait uniquement l'heure d'une date
 * Ex: "14:30"
 */
export const formatTime = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Vérifie si une date correspond à une plage donnée
 * @param {string} dateString - Date à vérifier
 * @param {string} range - Plage ('all', 'today', 'week', 'month', 'past')
 * @returns {boolean}
 */
export const isDateInRange = (dateString, range) => {
  if (range === 'all' || !dateString) return true;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  
  switch (range) {
    case 'today':
      return date.getTime() === today.getTime();
      
    case 'week': {
      const weekFromNow = new Date(today);
      weekFromNow.setDate(today.getDate() + 7);
      return date >= today && date <= weekFromNow;
    }
    
    case 'month': {
      const monthFromNow = new Date(today);
      monthFromNow.setMonth(today.getMonth() + 1);
      return date >= today && date <= monthFromNow;
    }
    
    case 'past':
      return date < today;
      
    default:
      return true;
  }
};

/**
 * Normalise une date (sans heures) pour comparaison
 * @param {string|Date} dateInput - Date à normaliser
 * @returns {Date}
 */
export const normalizeDate = (dateInput) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  date.setHours(0, 0, 0, 0);
  return date;
};
