// Descriptions des modules affichées dans le Header
export const moduleDescriptions = {
  dashboard: "Vue d'ensemble de votre activité produit et accès rapides",
  
  // Stratégie
  products: "Gérez votre portefeuille de produits et leurs caractéristiques",
  objectives: "Définissez et suivez les objectifs stratégiques de vos produits",
  
  // Recherche utilisateur
  contacts: "Centralisez vos contacts internes et externes",
  teams: "Organisez vos équipes et collaborateurs projet",
  interviews: "Créez, gérez et menez vos entretiens pour identifier les besoins utilisateurs",
  userNeeds: "Recensez et priorisez les besoins exprimés par vos utilisateurs",
  personas: "Créez des profils utilisateurs types pour guider vos décisions",
  
  // Analyse & Décision
  estimationSession: "Estimez vos stories en équipe avec le Planning Poker",
  priorityView: "Priorisez vos stories avec la méthode MoSCoW",
  prioritizationMatrix: "Évaluez et comparez vos stories avec les méthodes RICE et ICE",
  
  // Backlog & Sprints
  userStories: "Rédigez et organisez vos user stories",
  sprints: "Planifiez et gérez vos sprints de développement",
  sprintBoard: "Suivez l'avancement du sprint actif en temps réel",
  sprintAnalytics: "Analysez les performances de vos sprints avec métriques et graphiques",
  tasks: "Décomposez et suivez les tâches techniques de vos stories",
  taskBoard: "Tableau Kanban pour le suivi quotidien des tâches",
  
  // Suivi & Rétrospective
  budget: "Suivez les coûts et l'allocation des ressources",
  sprintReviews: "Documentez les démonstrations et retours de sprint",
  sprintRetrospectives: "Animez et suivez vos rétrospectives d'amélioration continue",
  'sprint-timeline': "Visualisez la roadmap et planification long terme",
  
  // Paramètres
  roadmap: "Découvrez la vision et l'évolution de ProductOwnerApp",
  wiki: "Centralisez la documentation et connaissances produit",
  faq: "Questions fréquentes et ressources d'aide",
  customLists: "Personnalisez les listes déroulantes de l'application",
  settings: "Configurez l'application et gérez vos données"
};

// Fonction helper pour obtenir la description
export const getModuleDescription = (viewId) => {
  return moduleDescriptions[viewId] || "";
};
