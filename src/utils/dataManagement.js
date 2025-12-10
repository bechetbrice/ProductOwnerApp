// src/utils/dataManagement.js
/**
 * Service de gestion avancée des données
 * Gère l'export/import sélectif, la validation et les statistiques
 */

// Clés de stockage
const STORAGE_KEYS = {
  userNeeds: 'productOwnerApp_userNeeds',
  userStories: 'productOwnerApp_userStories',
  contacts: 'productOwnerApp_contacts',
  interviews: 'productOwnerApp_interviews',
  templates: 'productOwnerApp_templates',
  settings: 'productOwnerApp_settings',
  preferences: 'productOwnerApp_preferences',
  products: 'productOwnerApp_products',
  Objectives: 'productOwnerApp_Objectives',
  sprints: 'productOwnerApp_sprints'
};

// Labels pour l'affichage
const DATA_LABELS = {
  userNeeds: 'Besoins Utilisateurs',
  userStories: 'User Stories',
  contacts: 'Contacts',
  interviews: 'Entretiens',
  templates: 'Templates',
  settings: 'Paramètres',
  preferences: 'Préférences',
  products: 'Produits',
  Objectives: 'Objectifs Produit',
  sprints: 'Sprints'
};

/**
 * ✅ CORRECTION v1.3.4 : Normaliser la structure d'un template
 * Convertit les questions de string[] en {id, text}[] si nécessaire
 */
const normalizeTemplate = (template) => {
  if (!template || !template.sections) {
    return template;
  }

  // Créer une copie profonde du template
  const normalized = { ...template };
  
  // Normaliser chaque section
  normalized.sections = template.sections.map(section => {
    if (!section.questions || !Array.isArray(section.questions)) {
      return section;
    }

    // Vérifier si les questions sont des strings ou des objets
    const firstQuestion = section.questions[0];
    
    // Si c'est déjà un objet avec id et text, pas besoin de normaliser
    if (typeof firstQuestion === 'object' && firstQuestion !== null && 'text' in firstQuestion) {
      return section;
    }

    // Si ce sont des strings, convertir en objets
    if (typeof firstQuestion === 'string') {
      return {
        ...section,
        questions: section.questions.map((q, index) => ({
          id: `${index + 1}`,
          text: q
        }))
      };
    }

    // Si c'est un format inconnu, garder tel quel
    return section;
  });

  return normalized;
};

/**
 * Calculer les statistiques détaillées du stockage
 */
export const getStorageStats = () => {
  const stats = {
    totalSize: 0,
    details: {},
    counts: {},
    lastModified: {}
  };

  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    const data = localStorage.getItem(storageKey);
    if (data) {
      const size = new Blob([data]).size;
      stats.details[key] = size;
      stats.totalSize += size;

      // Compter les éléments
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          stats.counts[key] = parsed.length;
          // Trouver la dernière modification
          if (parsed.length > 0) {
            const dates = parsed
              .map(item => item.updatedAt || item.createdAt)
              .filter(date => date)
              .map(date => new Date(date));
            if (dates.length > 0) {
              stats.lastModified[key] = new Date(Math.max(...dates));
            }
          }
        } else if (typeof parsed === 'object') {
          stats.counts[key] = Object.keys(parsed).length;
        }
      } catch (e) {
        stats.counts[key] = 0;
      }
    } else {
      stats.details[key] = 0;
      stats.counts[key] = 0;
    }
  });

  // Calculer le pourcentage d'utilisation (limite de 5MB pour localStorage)
  const maxSize = 5 * 1024 * 1024; // 5MB
  stats.percentageUsed = ((stats.totalSize / maxSize) * 100).toFixed(2);

  return stats;
};

/**
 * Export sélectif des données
 */
export const exportSelectedData = (selectedTypes) => {
  const exportData = {
    version: '1.3.2',
    exportDate: new Date().toISOString(),
    data: {}
  };

  let totalCount = 0;

  Object.entries(selectedTypes).forEach(([key, isSelected]) => {
    if (isSelected && STORAGE_KEYS[key]) {
      const data = localStorage.getItem(STORAGE_KEYS[key]);
      if (data) {
        exportData.data[key] = JSON.parse(data);
        
        // Compter les éléments
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          totalCount += parsed.length;
        }
      }
    }
  });

  // Créer le fichier
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  a.href = url;
  a.download = `productOwnerApp-export-selective-${timestamp}.json`;
  a.click();
  URL.revokeObjectURL(url);

  return {
    success: true,
    itemsExported: totalCount,
    types: Object.keys(selectedTypes).filter(k => selectedTypes[k])
  };
};

/**
 * Import avec options avancées
 */
export const importDataWithOptions = async (file, options = {}) => {
  const {
    merge = false,           // Fusionner au lieu de remplacer
    selectedTypes = null,    // Types à importer
    validate = true,         // Valider les données
    backup = true           // Créer une sauvegarde avant import
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Validation basique
        if (validate && !validateImportData(importedData)) {
          reject(new Error('Format de fichier invalide'));
          return;
        }

        // Créer une sauvegarde si demandé
        if (backup) {
          createQuickBackup();
        }

        const results = {
          imported: {},
          merged: {},
          errors: []
        };

        // Traiter chaque type de données
        Object.entries(importedData.data || importedData).forEach(([key, data]) => {
          // Vérifier si ce type doit être importé
          if (selectedTypes && !selectedTypes[key]) {
            return;
          }

          const storageKey = STORAGE_KEYS[key];
          if (!storageKey) {
            results.errors.push(`Type inconnu: ${key}`);
            return;
          }

          try {
            if (merge) {
              // Mode fusion
              // Pour settings, on part d'un objet par défaut vide
              const defaultValue = (key === 'settings') ? '{"roles": [], "companies": [], "departments": []}' : '[]';
              const existingData = JSON.parse(localStorage.getItem(storageKey) || defaultValue);
              const mergedData = mergeData(existingData, data, key);
              localStorage.setItem(storageKey, JSON.stringify(mergedData));
              // Compter les éléments fusionnés
              if (Array.isArray(mergedData)) {
                results.merged[key] = mergedData.length;
              } else if (typeof mergedData === 'object') {
                // Pour settings, compter le total des listes
                results.merged[key] = (mergedData.roles?.length || 0) + 
                                      (mergedData.companies?.length || 0) + 
                                      (mergedData.departments?.length || 0);
              } else {
                results.merged[key] = 1;
              }
            } else {
              // Mode remplacement
              // ✅ CORRECTION v1.3.4 : Normaliser les templates avant stockage
              if (key === 'templates' && Array.isArray(data)) {
                const normalizedTemplates = data.map(template => normalizeTemplate(template));
                localStorage.setItem(storageKey, JSON.stringify(normalizedTemplates));
                results.imported[key] = normalizedTemplates.length;
              } else {
                localStorage.setItem(storageKey, JSON.stringify(data));
                if (Array.isArray(data)) {
                  results.imported[key] = data.length;
                } else if (typeof data === 'object' && data !== null) {
                  // Pour settings, compter le total des listes
                  results.imported[key] = (data.roles?.length || 0) + 
                                          (data.companies?.length || 0) + 
                                          (data.departments?.length || 0);
                } else {
                  results.imported[key] = 1;
                }
              }
            }
          } catch (error) {
            results.errors.push(`Erreur pour ${key}: ${error.message}`);
          }
        });

        resolve({
          success: results.errors.length === 0,
          results,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        reject(new Error(`Erreur lors de l'import: ${error.message}`));
      }
    };

    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsText(file);
  });
};

/**
 * Valider les données d'import
 */
const validateImportData = (data) => {
  // Vérifier la structure de base
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Si c'est un export avec métadonnées
  if (data.version && data.data) {
    return typeof data.data === 'object';
  }

  // Si c'est un export direct
  return true;
};

/**
 * Fusionner les données existantes avec les nouvelles
 * ✅ CORRECTION v1.3.4 : Amélioration de la fusion pour Settings et Templates
 */
const mergeData = (existingData, newData, type) => {
  // Cas spécial : settings (objet avec listes)
  if (type === 'settings' && typeof existingData === 'object' && typeof newData === 'object') {
    return {
      roles: [...new Set([...(existingData.roles || []), ...(newData.roles || [])])].sort(),
      companies: [...new Set([...(existingData.companies || []), ...(newData.companies || [])])].sort(),
      departments: [...new Set([...(existingData.departments || []), ...(newData.departments || [])])].sort()
    };
  }

  // ✅ CORRECTION v1.3.4 : Cas spécial pour les templates
  // Les templates sont fusionnés différemment : par type + nom, pas par ID
  if (type === 'templates' && Array.isArray(existingData) && Array.isArray(newData)) {
    const merged = [...existingData];
    
    // Créer une Map avec clé = type + nom pour identifier les templates identiques
    const existingTemplatesMap = new Map();
    existingData.forEach(template => {
      const key = `${template.type}_${template.name}`;
      existingTemplatesMap.set(key, template);
    });

    newData.forEach(newTemplate => {
      // ✅ Normaliser le template avant fusion
      const normalizedTemplate = normalizeTemplate(newTemplate);
      
      const key = `${normalizedTemplate.type}_${normalizedTemplate.name}`;
      
      if (!existingTemplatesMap.has(key)) {
        // Nouveau template (type + nom différent) : ajouter
        merged.push(normalizedTemplate);
      } else {
        // Template existant avec même type + nom : mettre à jour si plus récent
        const existingTemplate = existingTemplatesMap.get(key);
        const existingIndex = merged.findIndex(t => 
          t.type === existingTemplate.type && t.name === existingTemplate.name
        );
        
        if (existingIndex !== -1) {
          // Si le template existant est par défaut et l'importé aussi, prendre l'importé (plus complet)
          if (existingTemplate.isDefault && normalizedTemplate.isDefault) {
            // Remplacer avec le template importé (plus récent ou plus complet)
            merged[existingIndex] = normalizedTemplate;
          } else if (existingTemplate.isDefault) {
            // Garder le template par défaut existant
            // Ne rien faire
          } else {
            // Templates personnalisés : remplacer si plus récent
            const existingDate = new Date(existingTemplate.updatedAt || existingTemplate.createdAt || 0);
            const newDate = new Date(normalizedTemplate.updatedAt || normalizedTemplate.createdAt || 0);
            if (newDate >= existingDate) {
              merged[existingIndex] = normalizedTemplate;
            }
          }
        }
      }
    });

    return merged;
  }

  // Cas standard : tableaux d'objets avec ID
  if (!Array.isArray(existingData) || !Array.isArray(newData)) {
    return newData; // Si pas des tableaux, remplacer
  }

  const merged = [...existingData];
  const existingIds = new Set(existingData.map(item => item.id));

  newData.forEach(item => {
    if (!existingIds.has(item.id)) {
      merged.push(item);
    } else {
      // Remplacer l'élément existant si plus récent
      const index = merged.findIndex(m => m.id === item.id);
      if (index !== -1) {
        const existingDate = new Date(merged[index].updatedAt || merged[index].createdAt);
        const newDate = new Date(item.updatedAt || item.createdAt);
        if (newDate > existingDate) {
          merged[index] = item;
        }
      }
    }
  });

  return merged;
};

/**
 * Créer une sauvegarde rapide avant import
 */
const createQuickBackup = () => {
  const backup = {};
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    const data = localStorage.getItem(storageKey);
    if (data) {
      backup[key] = JSON.parse(data);
    }
  });

  const timestamp = new Date().toISOString();
  localStorage.setItem(`productOwnerApp_backup_preImport`, JSON.stringify({
    timestamp,
    data: backup
  }));

  return timestamp;
};

/**
 * Nettoyer les données (supprimer les éléments orphelins)
 */
export const cleanupData = () => {
  const results = {
    orphanedItems: 0,
    invalidItems: 0,
    duplicates: 0
  };

  // Nettoyer les besoins orphelins (contact supprimé)
  const contacts = JSON.parse(localStorage.getItem(STORAGE_KEYS.contacts) || '[]');
  const contactIds = new Set(contacts.map(c => c.id));
  
  let userNeeds = JSON.parse(localStorage.getItem(STORAGE_KEYS.userNeeds) || '[]');
  const originalNeedsCount = userNeeds.length;
  userNeeds = userNeeds.filter(need => {
    if (need.contactId && !contactIds.has(need.contactId)) {
      results.orphanedItems++;
      return false;
    }
    return true;
  });
  
  if (userNeeds.length !== originalNeedsCount) {
    localStorage.setItem(STORAGE_KEYS.userNeeds, JSON.stringify(userNeeds));
  }

  // Nettoyer les stories orphelines
  const needIds = new Set(userNeeds.map(n => n.id));
  let userStories = JSON.parse(localStorage.getItem(STORAGE_KEYS.userStories) || '[]');
  const originalStoriesCount = userStories.length;
  
  userStories = userStories.map(story => {
    // Nettoyer les références invalides
    if (story.linkedNeedId && !needIds.has(story.linkedNeedId)) {
      results.orphanedItems++;
      story.linkedNeedId = '';
    }
    
    if (story.stakeholderIds) {
      const validStakeholders = story.stakeholderIds.filter(id => contactIds.has(id));
      if (validStakeholders.length !== story.stakeholderIds.length) {
        results.orphanedItems += story.stakeholderIds.length - validStakeholders.length;
        story.stakeholderIds = validStakeholders;
      }
    }
    
    return story;
  });
  
  localStorage.setItem(STORAGE_KEYS.userStories, JSON.stringify(userStories));

  // Supprimer les doublons
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    if (key === 'settings' || key === 'preferences') return; // Skip non-array data
    
    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(data)) {
      const seen = new Set();
      const unique = data.filter(item => {
        if (seen.has(item.id)) {
          results.duplicates++;
          return false;
        }
        seen.add(item.id);
        return true;
      });
      
      if (unique.length !== data.length) {
        localStorage.setItem(storageKey, JSON.stringify(unique));
      }
    }
  });

  return results;
};

/**
 * Analyser la santé des données
 */
export const analyzeDataHealth = () => {
  const health = {
    score: 100,
    issues: [],
    recommendations: []
  };

  const stats = getStorageStats();

  // Vérifier l'utilisation du stockage
  if (stats.percentageUsed > 80) {
    health.score -= 20;
    health.issues.push('Stockage presque plein');
    health.recommendations.push('Exportez vos données anciennes');
  } else if (stats.percentageUsed > 60) {
    health.score -= 10;
    health.issues.push('Stockage élevé');
    health.recommendations.push('Surveillez l\'espace disponible');
  }

  // Vérifier les références orphelines
  const cleanup = cleanupData();
  if (cleanup.orphanedItems > 0) {
    health.score -= 15;
    health.issues.push(`${cleanup.orphanedItems} références orphelines trouvées`);
    health.recommendations.push('Nettoyage effectué automatiquement');
  }

  if (cleanup.duplicates > 0) {
    health.score -= 10;
    health.issues.push(`${cleanup.duplicates} doublons supprimés`);
  }

  // Vérifier l'âge des données
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  let hasOldData = false;
  Object.values(stats.lastModified).forEach(date => {
    if (date && date < oneMonthAgo) {
      hasOldData = true;
    }
  });

  if (hasOldData) {
    health.recommendations.push('Certaines données n\'ont pas été modifiées depuis plus d\'un mois');
  }

  // Score de santé global
  if (health.score === 100) {
    health.status = 'Excellent';
    health.color = 'green';
  } else if (health.score >= 80) {
    health.status = 'Bon';
    health.color = 'blue';
  } else if (health.score >= 60) {
    health.status = 'Moyen';
    health.color = 'yellow';
  } else {
    health.status = 'Attention requise';
    health.color = 'red';
  }

  return health;
};

/**
 * Obtenir un aperçu des données pour l'import
 */
export const getImportPreview = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const preview = {
          version: data.version || 'unknown',
          exportDate: data.exportDate || null,
          dataTypes: {},
          totalItems: 0
        };

        const dataToAnalyze = data.data || data;
        
        Object.entries(dataToAnalyze).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            preview.dataTypes[key] = {
              count: value.length,
              label: DATA_LABELS[key] || key
            };
            preview.totalItems += value.length;
          } else if (typeof value === 'object') {
            preview.dataTypes[key] = {
              count: Object.keys(value).length,
              label: DATA_LABELS[key] || key
            };
            preview.totalItems += 1;
          }
        });

        resolve(preview);
      } catch (error) {
        reject(new Error('Fichier invalide'));
      }
    };

    reader.onerror = () => reject(new Error('Erreur de lecture'));
    reader.readAsText(file);
  });
};
