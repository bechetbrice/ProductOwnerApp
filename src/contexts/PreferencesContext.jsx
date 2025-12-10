// src/contexts/PreferencesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initBackupService } from '../utils/autoBackupService';

const PreferencesContext = createContext();

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

const DEFAULT_PREFERENCES = {
  theme: 'system',
  language: 'fr',
  dateFormat: 'DD/MM/YYYY', // Format fixe non modifiable
  timeFormat: '24h',
  startOfWeek: 'monday',
  defaultView: 'dashboard',
  autoSave: true, // Toujours activé
  notifications: true, // Toujours activé
  compactMode: false,
  showTooltips: true,
  confirmDelete: true,
  animationsEnabled: true,
  keyboardShortcuts: true,
  autoBackup: false,
  backupFrequency: 'daily'
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [actualTheme, setActualTheme] = useState('light');

  // Charger les préférences au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('productOwnerApp_preferences');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Forcer les valeurs par défaut pour dateFormat, autoSave et notifications
      const enforcedPreferences = {
        ...parsed,
        dateFormat: 'DD/MM/YYYY',
        autoSave: true,
        notifications: true
      };
      setPreferences(enforcedPreferences);
      // Sauvegarder les préférences forcées
      localStorage.setItem('productOwnerApp_preferences', JSON.stringify(enforcedPreferences));
      applyTheme(enforcedPreferences.theme);
      applyCompactMode(enforcedPreferences.compactMode);
      applyAnimations(enforcedPreferences.animationsEnabled);
      applyTooltips(enforcedPreferences.showTooltips);
      // Initialiser le service de backup
      initBackupService(enforcedPreferences);
    } else {
      applyTheme(DEFAULT_PREFERENCES.theme);
      applyCompactMode(DEFAULT_PREFERENCES.compactMode);
      applyAnimations(DEFAULT_PREFERENCES.animationsEnabled);
      applyTooltips(DEFAULT_PREFERENCES.showTooltips);
      initBackupService(DEFAULT_PREFERENCES);
    }
  }, []);

  // Détecter le thème système
  useEffect(() => {
    if (preferences.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        setActualTheme(e.matches ? 'dark' : 'light');
        applyThemeToDOM(e.matches ? 'dark' : 'light');
      };

      handleChange(mediaQuery);
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setActualTheme(preferences.theme);
      applyThemeToDOM(preferences.theme);
    }
  }, [preferences.theme]);

  // Appliquer le thème au DOM
  const applyThemeToDOM = (theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Appliquer le mode compact au DOM
  const applyCompactMode = (enabled) => {
    const root = document.documentElement;
    const body = document.body;
    if (enabled) {
      root.classList.add('compact-mode');
      body.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
      body.classList.remove('compact-mode');
    }
  };

  // Appliquer les animations au DOM
  const applyAnimations = (enabled) => {
    const body = document.body;
    if (enabled) {
      body.classList.add('animations-enabled');
    } else {
      body.classList.remove('animations-enabled');
    }
  };

  // Appliquer l'affichage des tooltips
  const applyTooltips = (enabled) => {
    const body = document.body;
    if (enabled) {
      body.classList.add('show-tooltips');
    } else {
      body.classList.remove('show-tooltips');
    }
  };

  // Fonction pour appliquer le thème
  const applyTheme = (theme) => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setActualTheme(isDark ? 'dark' : 'light');
      applyThemeToDOM(isDark ? 'dark' : 'light');
    } else {
      setActualTheme(theme);
      applyThemeToDOM(theme);
    }
  };

  // Mettre à jour une préférence
  const updatePreference = (key, value) => {
    // Empêcher la modification de dateFormat, autoSave et notifications
    if (key === 'dateFormat' || key === 'autoSave' || key === 'notifications') {
      console.warn(`La préférence "${key}" ne peut pas être modifiée.`);
      return preferences;
    }
    
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem('productOwnerApp_preferences', JSON.stringify(newPreferences));

    // Actions spécifiques selon la préférence
    if (key === 'theme') {
      applyTheme(value);
    } else if (key === 'compactMode') {
      applyCompactMode(value);
    } else if (key === 'animationsEnabled') {
      applyAnimations(value);
    } else if (key === 'showTooltips') {
      applyTooltips(value);
    }
    
    // Mettre à jour le service de backup si nécessaire
    if (key === 'autoBackup' || key === 'backupFrequency') {
      const backupService = initBackupService(newPreferences);
      if (backupService) {
        backupService.updatePreferences(newPreferences);
      }
    }

    return newPreferences;
  };

  // Formater une date selon les préférences
  const formatDate = (date) => {
    if (!date) return '';
    
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    switch (preferences.dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD.MM.YYYY':
        return `${day}.${month}.${year}`;
      default:
        return `${day}/${month}/${year}`;
    }
  };

  // Formater l'heure selon les préférences
  const formatTime = (date) => {
    if (!date) return '';
    
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');

    if (preferences.timeFormat === '24h') {
      return `${String(hours).padStart(2, '0')}:${minutes}`;
    } else {
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes} ${period}`;
    }
  };

  // Formater date et heure complètes
  const formatDateTime = (date) => {
    if (!date) return '';
    return `${formatDate(date)} ${formatTime(date)}`;
  };

  // Obtenir le jour de début de semaine
  const getWeekStartDay = () => {
    switch (preferences.startOfWeek) {
      case 'sunday': return 0;
      case 'saturday': return 6;
      default: return 1; // monday
    }
  };

  // Afficher une notification améliorée
  const showNotification = (message, type = 'info', duration = 4000) => {
    if (!preferences.notifications) return;

    // Créer l'élément de notification
    const notification = document.createElement('div');
    const notificationId = `notification-${Date.now()}`;
    notification.id = notificationId;
    
    // Classes de base + classes spécifiques au type
    const baseClasses = 'fixed top-4 right-4 z-[9999] p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full pointer-events-auto';
    const typeClasses = {
      success: 'bg-green-500 text-white border-l-4 border-green-700',
      error: 'bg-red-500 text-white border-l-4 border-red-700',
      warning: 'bg-yellow-500 text-black border-l-4 border-yellow-700',
      info: 'bg-blue-500 text-white border-l-4 border-blue-700'
    };
    
    notification.className = `${baseClasses} ${typeClasses[type] || typeClasses.info}`;
    
    // Icône selon le type
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    notification.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-lg flex-shrink-0">${icons[type] || icons.info}</span>
        <div class="flex-1">
          <p class="text-sm font-medium">${message}</p>
        </div>
        <button class="ml-2 text-current opacity-70 hover:opacity-100 transition-opacity" onclick="this.closest('.fixed').remove()">
          ✕
        </button>
      </div>
    `;
    
    // Ajouter les classes d'animation si activées
    if (preferences.animationsEnabled) {
      notification.classList.add('notification-enter');
    }
    
    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto-suppression
    const autoRemove = setTimeout(() => {
      if (document.body.contains(notification)) {
        if (preferences.animationsEnabled) {
          notification.classList.add('notification-exit');
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 300);
        } else {
          document.body.removeChild(notification);
        }
      }
    }, duration);

    // Pause au survol
    notification.addEventListener('mouseenter', () => {
      clearTimeout(autoRemove);
    });
    
    notification.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.style.transform = 'translateX(110%)';
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 300);
        }
      }, 1000);
    });

    return notificationId;
  };

  // Gérer les raccourcis clavier
  useEffect(() => {
    if (!preferences.keyboardShortcuts) return;

    const handleKeyPress = (e) => {
      // Ctrl + S : Sauvegarder (déjà géré par autoSave)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showNotification('Données sauvegardées', 'success');
      }
      // Ctrl + F : Rechercher
      else if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        // Activer la recherche globale
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="Rechercher"]');
        if (searchInput) searchInput.focus();
      }
      // Alt + D : Dashboard
      else if (e.altKey && e.key === 'd') {
        e.preventDefault();
        navigateToPage('dashboard');
      }
      // Alt + B : Backlog
      else if (e.altKey && e.key === 'b') {
        e.preventDefault();
        navigateToPage('backlogList');
      }
      // Alt + C : Contacts
      else if (e.altKey && e.key === 'c') {
        e.preventDefault();
        navigateToPage('contacts');
      }
      // Alt + I : Entretiens (Interviews)
      else if (e.altKey && e.key === 'i') {
        e.preventDefault();
        navigateToPage('interviews');
      }
      // Alt + N : Nouveau besoin
      else if (e.altKey && e.key === 'n') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('create-new', { detail: 'userNeed' }));
      }
      // Alt + S : Paramètres
      else if (e.altKey && e.key === 's') {
        e.preventDefault();
        navigateToPage('settings');
      }
      // Échap : Fermer les modales
      else if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[class*="fixed"][class*="inset-0"]');
        if (modals.length > 0) {
          e.preventDefault();
          const lastModal = modals[modals.length - 1];
          const closeButton = lastModal.querySelector('button[class*="cancel"], button[class*="fermer"], button[class*="annuler"]');
          if (closeButton) closeButton.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [preferences.keyboardShortcuts]);

  // Fonction de navigation pour les raccourcis clavier
  const navigateToPage = (page) => {
    // Émettre un événement personnalisé que l'App.jsx peut écouter
    window.dispatchEvent(new CustomEvent('keyboard-navigate', { detail: { page } }));
    showNotification(`Navigation vers ${getPageLabel(page)}`, 'info', 2000);
  };

  // Obtenir le label d'une page
  const getPageLabel = (page) => {
    const labels = {
      dashboard: 'Tableau de bord',
      userNeeds: 'Besoins Utilisateurs',
      backlogList: 'Backlog',
      backlogKanban: 'Kanban',
      contacts: 'Contacts',
      interviews: 'Entretiens',
      settings: 'Paramètres'
    };
    return labels[page] || page;
  };

  const value = {
    preferences,
    actualTheme,
    updatePreference,
    formatDate,
    formatTime,
    formatDateTime,
    getWeekStartDay,
    showNotification
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesContext;
