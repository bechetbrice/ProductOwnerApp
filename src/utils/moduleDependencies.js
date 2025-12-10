/**
 * Configuration des dépendances entre modules
 * 
 * Définit quelle donnée doit exister avant de pouvoir créer un élément dans un autre module
 */

export const MODULE_DEPENDENCIES = {
  // Produits : nécessite des Contacts (Product Owner + Clients)
  products: {
    requiredModule: 'contacts',
    requiredModuleName: 'Contacts',
    requiredRoute: 'contacts',
    emptyMessage: "Créez d'abord des contacts (Product Owner, clients) pour définir vos produits"
  },
  
  // Équipes : nécessite des Contacts
  teams: {
    requiredModule: 'contacts',
    requiredModuleName: 'Contacts',
    requiredRoute: 'contacts',
    emptyMessage: "Créez d'abord des contacts pour constituer vos équipes"
  },
  
  // Objectifs Produits : nécessite des Produits
  objectives: {
    requiredModule: 'products',
    requiredModuleName: 'Produits',
    requiredRoute: 'products',
    emptyMessage: "Créez d'abord un produit pour définir ses objectifs"
  },
  
  // Personas : nécessite des Produits
  personas: {
    requiredModule: 'products',
    requiredModuleName: 'Produits',
    requiredRoute: 'products',
    emptyMessage: "Créez d'abord un produit pour définir vos personas"
  },
  
  // Entretiens : nécessite des Contacts
  interviews: {
    requiredModule: 'contacts',
    requiredModuleName: 'Contacts', 
    requiredRoute: 'contacts',
    emptyMessage: "Créez d'abord des contacts pour planifier des entretiens"
  },
  
  // Besoins Utilisateurs : nécessite des Produits (recommandé)
  userNeeds: {
    requiredModule: 'products',
    requiredModuleName: 'Produits',
    requiredRoute: 'products',
    emptyMessage: "Créez d'abord un produit pour identifier les besoins utilisateurs",
    optional: false // Obligatoire maintenant
  },
  
  // Vue Priorités MoSCoW : nécessite des Besoins Utilisateurs
  priorityView: {
    requiredModule: 'userNeeds',
    requiredModuleName: 'Besoins',
    requiredRoute: 'user-needs',
    emptyMessage: "Créez d'abord des besoins utilisateurs pour les prioriser"
  },
  
  // User Stories : nécessite des Produits
  userStories: {
    requiredModule: 'products',
    requiredModuleName: 'Produits',
    requiredRoute: 'products',
    emptyMessage: "Créez d'abord un produit pour gérer son backlog"
  },
  
  // Sprints : nécessite Produits + Équipes + User Stories
  sprints: {
    requiredModule: 'products',
    requiredModuleName: 'Produits',
    requiredRoute: 'products',
    emptyMessage: "Créez d'abord un produit, une équipe et des user stories",
    additionalChecks: [
      {
        module: 'teams',
        name: 'Équipes',
        route: 'teams',
        message: "Créez d'abord une équipe pour lancer un sprint"
      },
      {
        module: 'userStories',
        name: 'User Stories',
        route: 'user-stories',
        message: "Créez d'abord des user stories à intégrer au sprint"
      }
    ]
  },
  
  // Tâches : nécessite Sprints
  tasks: {
    requiredModule: 'sprints',
    requiredModuleName: 'Sprints',
    requiredRoute: 'sprints',
    emptyMessage: "Créez d'abord un sprint pour gérer ses tâches"
  }
};

/**
 * Vérifie si un module a toutes ses dépendances satisfaites
 * 
 * @param {string} moduleName - Nom du module (ex: 'teams')
 * @param {Object} dataCounts - Objet contenant le nombre d'éléments de chaque module
 * @returns {Object} { canCreate: boolean, missingDependency: Object|null }
 */
export const checkModuleDependencies = (moduleName, dataCounts) => {
  const dependency = MODULE_DEPENDENCIES[moduleName];
  
  if (!dependency) {
    // Pas de dépendance configurée, peut créer
    return { canCreate: true, missingDependency: null };
  }
  
  // Vérifier la dépendance principale
  const requiredCount = dataCounts[dependency.requiredModule] || 0;
  
  if (requiredCount === 0 && !dependency.optional) {
    return {
      canCreate: false,
      missingDependency: {
        name: dependency.requiredModuleName,
        route: dependency.requiredRoute,
        message: dependency.emptyMessage
      }
    };
  }
  
  // Vérifier les dépendances additionnelles si elles existent
  if (dependency.additionalChecks) {
    for (const check of dependency.additionalChecks) {
      const checkCount = dataCounts[check.module] || 0;
      if (checkCount === 0) {
        return {
          canCreate: false,
          missingDependency: {
            name: check.name,
            route: check.route,
            message: check.message
          }
        };
      }
    }
  }
  
  return { canCreate: true, missingDependency: null };
};

/**
 * Génère un message d'état vide intelligent basé sur les dépendances
 * 
 * @param {string} moduleName - Nom du module
 * @param {Object} dataCounts - Nombre d'éléments de chaque module
 * @param {number} currentCount - Nombre actuel d'éléments dans ce module
 * @param {string} defaultMessage - Message par défaut si aucune dépendance
 * @returns {Object} { message: string, actionRoute: string|null, actionLabel: string }
 */
export const getEmptyStateConfig = (moduleName, dataCounts, currentCount, defaultMessage) => {
  if (currentCount > 0) {
    // Des éléments existent, on filtre juste
    return {
      message: `Aucun résultat pour vos critères de recherche`,
      actionRoute: null,
      actionLabel: 'Réinitialiser les filtres'
    };
  }
  
  const { canCreate, missingDependency } = checkModuleDependencies(moduleName, dataCounts);
  
  if (!canCreate && missingDependency) {
    return {
      message: missingDependency.message,
      actionRoute: missingDependency.route,
      actionLabel: `Aller à ${missingDependency.name}`
    };
  }
  
  return {
    message: defaultMessage,
    actionRoute: null,
    actionLabel: `Créer votre premier élément`
  };
};
