/**
 * Retourne le tooltip pour un facteur du Health Score
 * @param {string} factorName - Nom du facteur
 * @returns {string} - Texte du tooltip
 */
export const getFactorTooltip = (factorName) => {
  const tooltips = {
    'Objectifs': "Score basé sur la progression moyenne de vos objectifs actifs. 25 points maximum si tous les objectifs progressent bien vers leur cible. Le calcul prend en compte le pourcentage de stories complétées liées à chaque objectif.",
    'Besoins': "Score basé sur le taux de couverture des besoins utilisateurs par des stories. 25 points maximum si tous les besoins identifiés sont couverts par au moins une user story. Les besoins non couverts réduisent ce score proportionnellement.",
    'Sprint': "Score basé sur la performance du sprint actif. 25 points si le sprint est dans les temps ET la vélocité est positive. Le score diminue en cas de retard ou de baisse de vélocité. 0 point s'il n'y a pas de sprint actif.",
    'Budget': "Score basé sur le respect du budget alloué. 25 points si le budget est respecté ou qu'il y a une économie. Le score diminue proportionnellement en cas de dépassement budgétaire. 0 point si aucun budget n'est défini."
  };
  return tooltips[factorName] || '';
};

/**
 * Calcule le nombre de jours entre deux dates
 * @param {Date} date1 - Première date
 * @param {Date} date2 - Deuxième date
 * @returns {number} - Nombre de jours
 */
export const daysBetween = (date1, date2) => {
  return Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
};

/**
 * Formate une date en format court français
 * @param {Date|string} date - Date à formater
 * @returns {string} - Date formatée
 */
export const formatShortDate = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};
