import { 
  getUserNeeds, 
  getUserStories, 
  getContacts, 
  getInterviews,
  getObjectives,
  getSprints,
  getProducts,
  getSettings,
  getPersonas,
  getTeams,
  getTasks,
  getBudgetEntries,
  getSprintReviews,
  getSprintRetrospectives,
  saveUserNeeds, 
  saveUserStories, 
  saveContacts,
  saveInterviews,
  saveObjectives,
  saveSprints,
  saveProducts,
  saveSettings,
  savePersonas,
  saveTeams,
  saveTasks,
  saveBudgetEntries,
  saveSprintReviews,
  saveSprintRetrospectives
} from './storage';

// Helper pour fusionner des tableaux d'objets avec ID
const mergeArrays = (existing, newData) => {
  if (!Array.isArray(existing) || !Array.isArray(newData)) {
    return newData;
  }

  const merged = [...existing];
  const existingIds = new Set(existing.map(item => item.id));

  newData.forEach(item => {
    if (!existingIds.has(item.id)) {
      merged.push(item);
    } else {
      const index = merged.findIndex(m => m.id === item.id);
      if (index !== -1) {
        const existingDate = new Date(merged[index].updatedAt || merged[index].createdAt || 0);
        const newDate = new Date(item.updatedAt || item.createdAt || 0);
        if (newDate > existingDate) {
          merged[index] = item;
        }
      }
    }
  });

  return merged;
};

// Exporter toutes les données en JSON avec métadonnées étendues
export const exportData = () => {
  const data = {
    version: '2.0.0',
    exportDate: new Date().toISOString(),
    metadata: {
      appName: 'ProductOwnerApp',
      exportedBy: 'User',
      counts: {}
    },
    data: {
      userNeeds: getUserNeeds(),
      userStories: getUserStories(),
      contacts: getContacts(),
      interviews: getInterviews(),
      Objectives: getObjectives(),
      sprints: getSprints(),
      products: getProducts(),
      personas: getPersonas(),
      teams: getTeams(),
      tasks: getTasks(),
      budgetEntries: getBudgetEntries(),
      sprintReviews: getSprintReviews(),
      sprintRetrospectives: getSprintRetrospectives(),
      settings: getSettings(),
      preferences: JSON.parse(localStorage.getItem('productOwnerApp_preferences') || '{}')
    }
  };

  Object.entries(data.data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      data.metadata.counts[key] = value.length;
    }
  });

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' + 
                    new Date().toISOString().split('T')[1].slice(0, 5).replace(':', '-');
  link.download = `productOwnerApp-backup-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Exporter uniquement getAllData (utilisé par ExportImportMenu pour "Sauvegarder sous")
export const getAllData = () => {
  return {
    products: getProducts(),
    Objectives: getObjectives(),
    userStories: getUserStories(),
    userNeeds: getUserNeeds(),
    sprints: getSprints(),
    tasks: getTasks(),
    contacts: getContacts(),
    interviews: getInterviews(),
    personas: getPersonas(),
    teams: getTeams(),
    budgetEntries: getBudgetEntries(),
    sprintReviews: getSprintReviews(),
    sprintRetrospectives: getSprintRetrospectives(),
    settings: getSettings()
  };
};

// Importer des données depuis un fichier JSON avec options avancées
export const importData = (file, options = {}) => {
  const { merge = false } = options;
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        const data = imported.data || imported;
        
        if (!data.userNeeds && !data.userStories) {
          throw new Error('Format de fichier invalide : userNeeds ou userStories requis');
        }
        
        const contacts = data.contacts || [];
        const interviews = data.interviews || [];
        const Objectives = data.Objectives || [];
        const sprints = data.sprints || [];
        const products = data.products || [];
        const personas = data.personas || [];
        const teams = data.teams || [];
        const tasks = data.tasks || [];
        const budgetEntries = data.budgetEntries || [];
        const sprintReviews = data.sprintReviews || [];
        const sprintRetrospectives = data.sprintRetrospectives || [];
        const settings = data.settings || imported.settings || null;

        const currentCounts = {
          needs: getUserNeeds().length,
          stories: getUserStories().length,
          contacts: getContacts().length,
          interviews: getInterviews().length,
          Objectives: getObjectives().length,
          sprints: getSprints().length,
          products: getProducts().length,
          personas: getPersonas().length,
          teams: getTeams().length,
          tasks: getTasks().length,
          budgetEntries: getBudgetEntries().length,
          sprintReviews: getSprintReviews().length,
          sprintRetrospectives: getSprintRetrospectives().length
        };
        
        const newCounts = {
          needs: data.userNeeds?.length || 0,
          stories: data.userStories?.length || 0,
          contacts: contacts.length,
          interviews: interviews.length,
          Objectives: Objectives.length,
          sprints: sprints.length,
          products: products.length,
          personas: personas.length,
          teams: teams.length,
          tasks: tasks.length,
          budgetEntries: budgetEntries.length,
          sprintReviews: sprintReviews.length,
          sprintRetrospectives: sprintRetrospectives.length
        };

        const lines = merge ? [
          'Cette action va fusionner les données importées avec vos données actuelles.\n',
          `Données actuelles : ${currentCounts.products} produits, ${currentCounts.Objectives} objectifs, ${currentCounts.contacts} contacts, ${currentCounts.teams} équipes`,
          `                     ${currentCounts.interviews} entretiens, ${currentCounts.needs} besoins, ${currentCounts.personas} personas`,
          `                     ${currentCounts.stories} stories, ${currentCounts.sprints} sprints, ${currentCounts.tasks} tâches`,
          `                     ${currentCounts.sprintReviews} reviews, ${currentCounts.sprintRetrospectives} rétros, ${currentCounts.budgetEntries} budget\n`,
          `Données à importer : ${newCounts.products} produits, ${newCounts.Objectives} objectifs, ${newCounts.contacts} contacts, ${newCounts.teams} équipes`,
          `                      ${newCounts.interviews} entretiens, ${newCounts.needs} besoins, ${newCounts.personas} personas`,
          `                      ${newCounts.stories} stories, ${newCounts.sprints} sprints, ${newCounts.tasks} tâches`,
          `                      ${newCounts.sprintReviews} reviews, ${newCounts.sprintRetrospectives} rétros, ${newCounts.budgetEntries} budget\n`,
          'Les éléments avec des IDs identiques seront mis à jour si plus récents.',
          'Voulez-vous continuer ?'
        ] : [
          'Cette action va remplacer vos données actuelles.\n',
          `Données actuelles : ${currentCounts.products} produits, ${currentCounts.Objectives} objectifs, ${currentCounts.contacts} contacts, ${currentCounts.teams} équipes`,
          `                     ${currentCounts.interviews} entretiens, ${currentCounts.needs} besoins, ${currentCounts.personas} personas`,
          `                     ${currentCounts.stories} stories, ${currentCounts.sprints} sprints, ${currentCounts.tasks} tâches`,
          `                     ${currentCounts.sprintReviews} reviews, ${currentCounts.sprintRetrospectives} rétros, ${currentCounts.budgetEntries} budget\n`,
          `Nouvelles données : ${newCounts.products} produits, ${newCounts.Objectives} objectifs, ${newCounts.contacts} contacts, ${newCounts.teams} équipes`,
          `                    ${newCounts.interviews} entretiens, ${newCounts.needs} besoins, ${newCounts.personas} personas`,
          `                    ${newCounts.stories} stories, ${newCounts.sprints} sprints, ${newCounts.tasks} tâches`,
          `                    ${newCounts.sprintReviews} reviews, ${newCounts.sprintRetrospectives} rétros, ${newCounts.budgetEntries} budget\n`,
          'Voulez-vous continuer ?'
        ];
        
        const confirmMessage = lines.join('\n');
        
        if (window.confirm(confirmMessage)) {
          let finalCounts = {};
          
          if (merge) {
            const mergedNeeds = mergeArrays(getUserNeeds(), data.userNeeds);
            const mergedStories = mergeArrays(getUserStories(), data.userStories);
            const mergedContacts = mergeArrays(getContacts(), contacts);
            const mergedInterviews = mergeArrays(getInterviews(), interviews);
            const mergedObjectives = mergeArrays(getObjectives(), Objectives);
            const mergedSprints = mergeArrays(getSprints(), sprints);
            const mergedProducts = mergeArrays(getProducts(), products);
            const mergedPersonas = mergeArrays(getPersonas(), personas);
            const mergedTeams = mergeArrays(getTeams(), teams);
            const mergedTasks = mergeArrays(getTasks(), tasks);
            const mergedBudgetEntries = mergeArrays(getBudgetEntries(), budgetEntries);
            const mergedSprintReviews = mergeArrays(getSprintReviews(), sprintReviews);
            const mergedSprintRetrospectives = mergeArrays(getSprintRetrospectives(), sprintRetrospectives);
            
            saveUserNeeds(mergedNeeds);
            saveUserStories(mergedStories);
            saveContacts(mergedContacts);
            saveInterviews(mergedInterviews);
            saveObjectives(mergedObjectives);
            saveSprints(mergedSprints);
            saveProducts(mergedProducts);
            savePersonas(mergedPersonas);
            saveTeams(mergedTeams);
            saveTasks(mergedTasks);
            saveBudgetEntries(mergedBudgetEntries);
            saveSprintReviews(mergedSprintReviews);
            saveSprintRetrospectives(mergedSprintRetrospectives);
            
            if (settings) {
              const currentSettings = getSettings();
              const mergedSettings = {
                roles: [...new Set([...currentSettings.roles, ...settings.roles])].sort(),
                companies: [...new Set([...currentSettings.companies, ...settings.companies])].sort(),
                departments: [...new Set([...currentSettings.departments, ...settings.departments])].sort()
              };
              saveSettings(mergedSettings);
            }
            
            finalCounts = {
              needs: mergedNeeds.length,
              stories: mergedStories.length,
              contacts: mergedContacts.length,
              interviews: mergedInterviews.length,
              Objectives: mergedObjectives.length,
              sprints: mergedSprints.length,
              products: mergedProducts.length,
              personas: mergedPersonas.length,
              teams: mergedTeams.length,
              tasks: mergedTasks.length,
              budgetEntries: mergedBudgetEntries.length,
              sprintReviews: mergedSprintReviews.length,
              sprintRetrospectives: mergedSprintRetrospectives.length
            };
          } else {
            saveUserNeeds(data.userNeeds || []);
            saveUserStories(data.userStories || []);
            saveContacts(contacts);
            saveInterviews(interviews);
            saveObjectives(Objectives);
            saveSprints(sprints);
            saveProducts(products);
            savePersonas(personas);
            saveTeams(teams);
            saveTasks(tasks);
            saveBudgetEntries(budgetEntries);
            saveSprintReviews(sprintReviews);
            saveSprintRetrospectives(sprintRetrospectives);
            
            if (settings) {
              saveSettings(settings);
            }
            
            finalCounts = newCounts;
          }
          
          if (data.preferences) {
            localStorage.setItem('productOwnerApp_preferences', JSON.stringify(data.preferences));
          }
          
          resolve({
            success: true,
            userNeeds: finalCounts.needs,
            userStories: finalCounts.stories,
            contacts: finalCounts.contacts,
            interviews: finalCounts.interviews,
            Objectives: finalCounts.Objectives,
            sprints: finalCounts.sprints,
            products: finalCounts.products,
            personas: finalCounts.personas,
            teams: finalCounts.teams,
            tasks: finalCounts.tasks,
            budgetEntries: finalCounts.budgetEntries,
            sprintReviews: finalCounts.sprintReviews,
            sprintRetrospectives: finalCounts.sprintRetrospectives,
            mode: merge ? 'merged' : 'replaced'
          });
        } else {
          resolve({ success: false, cancelled: true });
        }
      } catch (error) {
        reject(new Error(`Erreur lors de l'importation : ${error.message}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsText(file);
  });
};

// Charger les données exemple directement sans confirmation
export const loadSampleDataDirectly = (sampleData) => {
  try {
    const data = sampleData.data || sampleData;
    
    if (!data.userNeeds && !data.userStories) {
      throw new Error('Format de fichier invalide : userNeeds ou userStories requis');
    }
    
    const contacts = data.contacts || [];
    const interviews = data.interviews || [];
    const Objectives = data.Objectives || [];
    const sprints = data.sprints || [];
    const products = data.products || [];
    const personas = data.personas || [];
    const teams = data.teams || [];
    const tasks = data.tasks || [];
    const budgetEntries = data.budgetEntries || [];
    const sprintReviews = data.sprintReviews || [];
    const sprintRetrospectives = data.sprintRetrospectives || [];
    const settings = data.settings || sampleData.settings || null;

    saveUserNeeds(data.userNeeds || []);
    saveUserStories(data.userStories || []);
    saveContacts(contacts);
    saveInterviews(interviews);
    saveObjectives(Objectives);
    saveSprints(sprints);
    saveProducts(products);
    savePersonas(personas);
    saveTeams(teams);
    saveTasks(tasks);
    saveBudgetEntries(budgetEntries);
    saveSprintReviews(sprintReviews);
    saveSprintRetrospectives(sprintRetrospectives);
    
    if (settings) {
      saveSettings(settings);
    }
    
    if (data.preferences) {
      localStorage.setItem('productOwnerApp_preferences', JSON.stringify(data.preferences));
    }
    
    return {
      success: true,
      userNeeds: data.userNeeds?.length || 0,
      userStories: data.userStories?.length || 0,
      contacts: contacts.length,
      interviews: interviews.length,
      Objectives: Objectives.length,
      sprints: sprints.length,
      products: products.length,
      personas: personas.length,
      teams: teams.length,
      tasks: tasks.length,
      budgetEntries: budgetEntries.length,
      sprintReviews: sprintReviews.length,
      sprintRetrospectives: sprintRetrospectives.length
    };
  } catch (error) {
    throw new Error(`Erreur lors du chargement des données exemple : ${error.message}`);
  }
};
