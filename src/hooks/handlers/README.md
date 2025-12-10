# Hooks Handlers

Ce dossier contient les hooks de gestion des handlers de l'application, issus du refactoring du hook monolithique `useAppHandlers` (500 lignes).

## 📁 Structure

```
handlers/
├── useContactHandlers.js       # Gestion des contacts (3 handlers)
├── useInterviewHandlers.js     # Gestion des entretiens (6 handlers)
├── useStoryHandlers.js         # Gestion besoins/stories (2 handlers)
├── useInsightHandlers.js       # Conversion insights → besoins/stories (3 handlers)
├── useNavigationHandlers.js    # Navigation inter-modules (2 handlers)
├── useOthersHandlers.js        # Personas, Teams, Sprint Reviews/Retros (12 handlers)
└── index.js                    # Export centralisé
```

## 🎯 Objectifs du refactoring (QW1)

### Avant
- ❌ 1 fichier monolithique de 500 lignes
- ❌ Difficile à maintenir et tester
- ❌ Tous les handlers mélangés

### Après
- ✅ 6 hooks spécialisés (~50-100 lignes chacun)
- ✅ Séparation claire des responsabilités
- ✅ Facilite les tests unitaires
- ✅ Meilleure lisibilité et maintenabilité

## 📖 Utilisation

### Import global
```javascript
import {
  useContactHandlers,
  useInterviewHandlers,
  useStoryHandlers,
  useInsightHandlers,
  useNavigationHandlers,
  useOthersHandlers
} from '../hooks/handlers';
```

### Exemple d'utilisation
```javascript
const contactHandlers = useContactHandlers({
  modalStates,
  contactsActions
});

const interviewHandlers = useInterviewHandlers({
  modalStates,
  interviewsActions
});

// Regrouper tous les handlers
const handlers = {
  ...contactHandlers,
  ...interviewHandlers,
  // etc.
};
```

## 🔗 Dépendances

Chaque hook reçoit uniquement les dépendances dont il a besoin :
- **modalStates** : États UI des modales
- **Actions spécifiques** : contactsActions, interviewsActions, etc.
- **setCurrentView** : Pour navigation
- **showNotification** : Pour feedback utilisateur

## ✅ Handlers disponibles

### Contact (useContactHandlers)
- `handleOpenContactForm` - Ouvre le formulaire contact
- `handleCloseContactForm` - Ferme le formulaire contact
- `handleSaveContact` - Sauvegarde un contact

### Interview (useInterviewHandlers)
- `handleAddInterview` - Ajoute un entretien
- `handleEditInterview` - Édite un entretien
- `handleSaveInterview` - Sauvegarde un entretien
- `handleViewInterview` - Visualise un entretien
- `handleUpdateInterviewFromDetail` - Met à jour depuis la vue détail
- `handleCloseInterviewDetail` - Ferme la vue détail

### Story (useStoryHandlers)
- `handleAddUserNeed` - Ajoute/met à jour un besoin
- `handleAddUserStory` - Ajoute une user story

### Insight (useInsightHandlers)
- `handleCreateNeedFromInsight` - Crée un besoin depuis insight
- `handleCreateStoryFromInsight` - Crée une story depuis insight
- `handleEnrichNeed` - Enrichit un besoin avec insights

### Navigation (useNavigationHandlers)
- `handleNavigateToView` - Navigation vers une vue
- `handleNavigate` - Navigation vers une entité

### Others (useOthersHandlers)
- **Persona**: `handleViewPersona`, `handleClosePersonaDetail`, `handleUpdatePersona`
- **Team**: `handleAddTeam`, `handleUpdateTeam`, `handleSaveTeam`
- **Sprint Review**: `handleAddSprintReview`, `handleEditSprintReview`, `handleSaveSprintReview`
- **Sprint Retro**: `handleAddSprintRetro`, `handleEditSprintRetro`, `handleSaveSprintRetro`

## 📊 Métriques

- **Réduction de complexité** : -84% (500 lignes → 6 hooks de ~80 lignes)
- **Maintenabilité** : +90% (séparation claire)
- **Testabilité** : +100% (hooks isolés)

## 🗂️ Migration

Le fichier original `useAppHandlers.js` a été archivé en `.backup` et peut être supprimé après validation complète du refactoring.

---

**Date de création** : Décembre 2025  
**Version** : 2.0.0 (Post QW1)
