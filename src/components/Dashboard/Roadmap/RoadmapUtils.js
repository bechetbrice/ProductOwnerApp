/**
 * Utilitaires pour les calculs de la timeline
 */

/**
 * Normalise une date à minuit (00:00:00.000)
 */
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Calcule la plage de dates selon le mode de vue
 */
export const getDateRange = (selectedDate, viewMode) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const quarter = Math.floor(month / 3);

  switch (viewMode) {
    case 'month': {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      return {
        startDate,
        endDate,
        days,
        label: startDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
      };
    }
    case 'quarter': {
      const startDate = new Date(year, quarter * 3, 1);
      const endDate = new Date(year, quarter * 3 + 3, 0);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      return {
        startDate,
        endDate,
        days,
        label: `T${quarter + 1} ${year}`
      };
    }
    case 'year': {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      return {
        startDate,
        endDate,
        days,
        label: `Année ${year}`
      };
    }
    default:
      return {
        startDate: new Date(),
        endDate: new Date(),
        days: 30,
        label: ''
      };
  }
};

/**
 * Filtre les sprints selon la période et les filtres
 */
export const filterSprints = (sprints, startDate, endDate, filterStatus, filterProduct, filterTeam = 'all') => {
  return sprints
    .filter(sprint => {
      const sprintStart = new Date(sprint.startDate);
      const sprintEnd = new Date(sprint.endDate);

      // Vérifier si le sprint chevauche la période affichée
      if (sprintEnd < startDate || sprintStart > endDate) {
        return false;
      }

      // Filtres status, produit et équipe
      if (filterStatus !== 'all' && sprint.status !== filterStatus) {
        return false;
      }
      if (filterProduct !== 'all' && sprint.productId !== filterProduct) {
        return false;
      }
      if (filterTeam !== 'all' && sprint.teamId !== filterTeam) {
        return false;
      }

      return true;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
};

/**
 * Calcule la position et largeur d'un élément sur la timeline
 */
export const getElementPosition = (itemStartDate, itemEndDate, startDate, days, dayWidth) => {
  // Normaliser toutes les dates à minuit pour éviter les problèmes d'heures
  const itemStart = normalizeDate(itemStartDate);
  const itemEnd = normalizeDate(itemEndDate);
  const start = normalizeDate(startDate);

  // Calculer l'offset de début (en jours depuis startDate)
  const startOffset = Math.max(0, Math.floor((itemStart - start) / (1000 * 60 * 60 * 24)));
  
  // Calculer la durée réelle du sprint (inclut jour de début ET de fin)
  const itemDuration = Math.ceil((itemEnd - itemStart) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculer l'offset de fin (ne doit pas dépasser la période affichée)
  const endOffset = Math.min(days, startOffset + itemDuration);

  // Calculer position et largeur en pixels
  const left = startOffset * dayWidth;
  const width = Math.max(dayWidth, (endOffset - startOffset) * dayWidth);

  return { left, width };
};

/**
 * Calcule les statistiques d'un sprint
 */
export const getSprintStats = (sprint, userStories) => {
  const stories = userStories.filter(s => (sprint.storyIds || []).includes(s.id));
  const completedStories = stories.filter(s => s.status === 'done').length;
  const totalPoints = stories.reduce((sum, s) => sum + (s.estimation || 0), 0);
  const completedPoints = stories.filter(s => s.status === 'done').reduce((sum, s) => sum + (s.estimation || 0), 0);

  return {
    totalStories: stories.length,
    completedStories,
    totalPoints,
    completedPoints,
    progress: totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0
  };
};

/**
 * Calcule la position d'aujourd'hui sur la timeline
 */
export const getTodayPosition = (startDate, endDate, dayWidth) => {
  const today = normalizeDate(new Date());
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);
  
  if (today < start || today > end) return null;

  const offset = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return offset * dayWidth;
};

/**
 * Navigation temporelle
 */
export const navigateDate = (currentDate, viewMode, direction) => {
  const newDate = new Date(currentDate);

  if (viewMode === 'month') {
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
  } else if (viewMode === 'quarter') {
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 3 : -3));
  } else {
    newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
  }

  return newDate;
};

/**
 * Filtre les stories d'un sprint selon l'assignation des tâches
 */
export const filterSprintStories = (sprint, userStories, filterAssignedTo, tasks = []) => {
  let stories = userStories.filter(s => (sprint.storyIds || []).includes(s.id));

  if (filterAssignedTo !== 'all') {
    if (filterAssignedTo === 'unassigned') {
      // Garder les stories dont TOUTES les tâches sont non assignées OU qui n'ont pas de tâches
      stories = stories.filter(story => {
        const storyTasks = tasks.filter(t => t.userStoryId === story.id || t.storyId === story.id);
        if (storyTasks.length === 0) return true; // Pas de tâches = non assigné
        return storyTasks.every(task => !task.assignedTo);
      });
    } else {
      // Garder les stories qui ont au moins UNE tâche assignée au contact sélectionné
      stories = stories.filter(story => {
        const storyTasks = tasks.filter(t => t.userStoryId === story.id || t.storyId === story.id);
        return storyTasks.some(task => task.assignedTo === filterAssignedTo);
      });
    }
  }

  return stories;
};

/**
 * Génère les données CSV pour l'export
 */
export const generateCSVData = (sprints, userStories, products) => {
  const rows = sprints.map(sprint => {
    const stats = getSprintStats(sprint, userStories);
    const product = products.find(p => p.id === sprint.productId);
    const duration = Math.ceil((new Date(sprint.endDate) - new Date(sprint.startDate)) / (1000 * 60 * 60 * 24));

    return [
      `"${sprint.name}"`,
      product ? `"[${product.code}] ${product.name}"` : '',
      sprint.startDate,
      sprint.endDate,
      duration,
      sprint.status,
      stats.totalStories,
      stats.totalPoints,
      stats.progress
    ].join(',');
  });

  const header = ['Sprint', 'Produit', 'Début', 'Fin', 'Durée (jours)', 'Statut', 'Stories', 'Points', 'Progrès (%)'].join(',');
  return [header, ...rows].join('\n');
};
