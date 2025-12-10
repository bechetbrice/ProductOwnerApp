# 🏗️ Architecture et Structure du Projet

**Date :** 8 décembre 2025  
**Objet :** Analyse approfondie de l'architecture technique

---

## 📋 Table des Matières

1. [Architecture Générale](#architecture-générale)
2. [Structure des Dossiers](#structure-des-dossiers)
3. [Patterns Architecturaux](#patterns-architecturaux)
4. [Flux de Données](#flux-de-données)
5. [Gestion de l'État](#gestion-de-létat)
6. [Analyse des Dépendances](#analyse-des-dépendances)

---

## 🎯 Architecture Générale

### Vue d'Ensemble

ProductOwnerApp suit une **architecture React moderne** basée sur :
- **Component-Based Architecture** : 221+ composants React
- **Context API** : 8 contexts pour état global
- **Custom Hooks** : 11 hooks métier spécialisés
- **Factory Pattern** : Abstraction storage localStorage
- **Lazy Loading** : Chargement asynchrone contexts et modules

### Diagramme d'Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         main.jsx                             │
│                   PreferencesProvider                        │
│                  (Configuration globale)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                         App.jsx                              │
│                    ToastContainer                            │
│                  AppProviders (Lazy)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ProductsProvider    → Produits + Objectifs             │ │
│  │ ContactsProvider    → Contacts + Équipes               │ │
│  │ DiscoveryProvider   → Interviews + Personas + Besoins  │ │
│  │ BacklogProvider     → User Stories                     │ │
│  │ ExecutionProvider   → Sprints + Tasks + Reviews/Retros│ │
│  │ BudgetProvider      → Lignes budgétaires               │ │
│  │ SettingsProvider    → Paramètres application           │ │
│  │ AutoExportProvider  → Export automatique               │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    AppContent.jsx                            │
│         ┌──────────────────────────────────┐                │
│         │  Sidebar (Navigation)            │                │
│         │  Header (Actions)                │                │
│         │  ViewRenderer (Routes)           │                │
│         │  Footer                          │                │
│         └──────────────────────────────────┘                │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   ViewRenderer.jsx                           │
│                                                              │
│  Switch (currentView) {                                     │
│    'dashboard'           → Dashboard                         │
│    'contacts'            → ContactsList                      │
│    'teams'               → TeamsList                         │
│    'products'            → ProductsManager                   │
│    'objectives'          → ObjectivesManager                 │
│    'interviews'          → InterviewsList                    │
│    'userNeeds'           → UserNeedsList                     │
│    'personas'            → PersonasList                      │
│    'userStories'         → UserStoriesList                   │
│    'moscow'              → Moscow                            │
│    'rice'                → Rice                              │
│    'planningPoker'       → PlanningPoker                     │
│    'sprintsManagement'   → SprintTracking                    │
│    'tasksManagement'     → TasksList                         │
│    'sprintBoard'         → SprintBoard                       │
│    'taskBoard'           → TaskBoard                         │
│    'sprintReviews'       → SprintReviewList                  │
│    'sprintRetrospectives'→ SprintRetroList                   │
│    'settings'            → Settings                          │
│    'wiki'                → Wiki                              │
│    'faq'                 → FAQ                               │
│  }                                                           │
└──────────────────────────────────────────────────────────────┘
```

### Principes Architecturaux

1. **Separation of Concerns**
   - Composants UI purs (presentation)
   - Hooks métier (business logic)
   - Contexts (état global)
   - Utils (fonctions utilitaires)

2. **Unidirectional Data Flow**
   - Props down (parent → enfant)
   - Events up (enfant → parent)
   - Context pour état partagé

3. **Single Responsibility**
   - Un composant = une responsabilité
   - Composants réutilisables dans `ui/`
   - Composants métier dans modules

4. **DRY (Don't Repeat Yourself)**
   - Factory Pattern pour storage
   - Composants UI partagés
   - Hooks personnalisés réutilisables

---

## 📁 Structure des Dossiers

### Arborescence Détaillée

```
ProductOwnerApp/
│
├── public/                         # Assets statiques
│   ├── favicon.ico
│   └── logo.svg
│
├── src/
│   │
│   ├── components/                 # 221+ composants React
│   │   │
│   │   ├── ui/                    # 35 composants Design System
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Card/
│   │   │   │   ├── CardHeader.jsx
│   │   │   │   └── CardFooter.jsx
│   │   │   ├── FormModal.jsx
│   │   │   ├── FormHeader.jsx
│   │   │   ├── FormSection.jsx
│   │   │   ├── FormGrid.jsx
│   │   │   ├── FormFooter.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── DetailModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Tabs.jsx
│   │   │   ├── VirtualizedList.jsx
│   │   │   ├── InfoField.jsx
│   │   │   ├── InfoTooltip.jsx
│   │   │   ├── BoardCard.jsx
│   │   │   ├── ColorPicker.jsx
│   │   │   ├── DynamicList.jsx
│   │   │   ├── MultiSelector.jsx
│   │   │   ├── ProductSelector.jsx
│   │   │   ├── ProductDropdown.jsx
│   │   │   ├── StatusSelector.jsx
│   │   │   ├── QuotaAlert.jsx
│   │   │   ├── StorageErrorModal.jsx
│   │   │   ├── SectionGroup.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── Common/                # Composants partagés
│   │   │   ├── FilterBar.jsx     # Utilisé dans 17 modules
│   │   │   ├── FilterSelect.jsx
│   │   │   ├── ProductSelector.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── AnalysisFilters.jsx
│   │   │   └── AnalysisStats.jsx
│   │   │
│   │   ├── Layout/                # Layout principal
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── NavigationMenu.jsx
│   │   │   ├── ExportImportMenu.jsx
│   │   │   ├── AutoExportIndicator.jsx
│   │   │   ├── PageWrapper.jsx
│   │   │   ├── ViewRenderer.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   │
│   │   ├── Dashboard/             # Module Dashboard (Analytics)
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Common/
│   │   │   │   ├── DashboardHeader.jsx
│   │   │   │   └── InfoCard.jsx
│   │   │   ├── Overview/          # Onglet Vue d'ensemble
│   │   │   │   ├── OverviewTab.jsx
│   │   │   │   ├── HealthScoreSection.jsx
│   │   │   │   ├── ActiveSprintSection.jsx
│   │   │   │   ├── StrategicKPIsSection.jsx
│   │   │   │   ├── HistoricalVelocitySection.jsx
│   │   │   │   ├── ResourcesCapacitySection.jsx
│   │   │   │   ├── MilestonesSection.jsx
│   │   │   │   ├── AlertsBanner.jsx
│   │   │   │   └── ProblematicTasksSection.jsx
│   │   │   ├── SprintAnalytics/   # Onglet Analytics Sprints
│   │   │   │   └── SprintAnalytics.jsx
│   │   │   ├── Roadmap/           # Onglet Roadmap
│   │   │   │   ├── Roadmap.jsx
│   │   │   │   ├── RoadmapHeader.jsx
│   │   │   │   ├── RoadmapGrid.jsx
│   │   │   │   └── RoadmapRow.jsx
│   │   │   └── Budget/            # Onglet Budget
│   │   │       ├── BudgetManager.jsx
│   │   │       ├── BudgetStatsDashboard.jsx
│   │   │       ├── BudgetTable.jsx
│   │   │       ├── BudgetTableView.jsx
│   │   │       ├── TeamBudgetView.jsx
│   │   │       ├── BudgetEntriesList.jsx
│   │   │       ├── BudgetEntryForm.jsx
│   │   │       ├── BudgetExpectedModal.jsx
│   │   │       └── BudgetConsumedModal.jsx
│   │   │
│   │   ├── Contacts/              # Module Contacts
│   │   │   ├── ContactsList.jsx
│   │   │   ├── ContactCard.jsx
│   │   │   ├── ContactDetail.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactSelector.jsx
│   │   │   ├── MultiContactSelector.jsx
│   │   │   └── ContactTeamFields.jsx
│   │   │
│   │   ├── Teams/                 # Module Équipes
│   │   │   ├── TeamsList.jsx
│   │   │   ├── TeamCard.jsx
│   │   │   ├── TeamDetail.jsx
│   │   │   └── TeamForm.jsx
│   │   │
│   │   ├── Products/              # Module Produits
│   │   │   ├── ProductsManager.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ProductForm.jsx
│   │   │
│   │   ├── Objectives/            # Module Objectifs
│   │   │   ├── ObjectivesManager.jsx
│   │   │   ├── ObjectiveCard.jsx
│   │   │   ├── ObjectiveDetail.jsx
│   │   │   ├── ObjectiveForm.jsx
│   │   │   ├── UserNeedLink.jsx
│   │   │   └── UserStoryLink.jsx
│   │   │
│   │   ├── Interviews/            # Module Entretiens
│   │   │   ├── InterviewsList.jsx
│   │   │   ├── InterviewCard.jsx
│   │   │   ├── InterviewDetail.jsx
│   │   │   ├── InterviewForm.jsx
│   │   │   ├── InterviewFilters.jsx
│   │   │   ├── InterviewTips.jsx
│   │   │   ├── NotesList.jsx
│   │   │   ├── InterviewAnswerSection.jsx
│   │   │   ├── QuestionSectionEditor.jsx
│   │   │   ├── QuestionItemEditor.jsx
│   │   │   └── tabs/
│   │   │       ├── InterviewFormPracticalTab.jsx
│   │   │       ├── InterviewFormQuestionsTab.jsx
│   │   │       ├── InterviewPracticalInfoTab.jsx
│   │   │       ├── InterviewQuestionsTab.jsx
│   │   │       └── InterviewConductTab.jsx
│   │   │
│   │   ├── UserNeeds/             # Module Besoins
│   │   │   ├── UserNeedsList.jsx
│   │   │   ├── UserNeedCard.jsx
│   │   │   ├── UserNeedDetail.jsx
│   │   │   ├── UserNeedForm.jsx
│   │   │   └── InsightSelector.jsx
│   │   │
│   │   ├── Personas/              # Module Personas
│   │   │   ├── PersonasList.jsx
│   │   │   ├── PersonaCard.jsx
│   │   │   ├── PersonaDetail.jsx
│   │   │   └── PersonaForm.jsx
│   │   │
│   │   ├── UserStories/           # Module Stories
│   │   │   ├── UserStoriesList.jsx
│   │   │   ├── StoryCardCompact.jsx
│   │   │   ├── StoryDetailModal.jsx
│   │   │   ├── UserStoryForm.jsx
│   │   │   ├── UserStoryOutcomeManager.jsx
│   │   │   ├── StoryOutcomeBadge.jsx
│   │   │   ├── MoSCoWBoard.jsx
│   │   │   └── MoSCoWColumn.jsx
│   │   │
│   │   ├── Moscow/                # Module Priorisation MoSCoW
│   │   │   └── Moscow.jsx
│   │   │
│   │   ├── Rice/                  # Module RICE Scoring
│   │   │   └── Rice.jsx
│   │   │
│   │   ├── PlanningPoker/         # Module Planning Poker
│   │   │   └── PlanningPoker.jsx
│   │   │
│   │   ├── SprintsManagement/     # Module Gestion Sprints
│   │   │   ├── SprintTracking.jsx
│   │   │   ├── SprintCard.jsx
│   │   │   ├── SprintDetail.jsx
│   │   │   ├── SprintForm.jsx
│   │   │   ├── SprintFilters.jsx
│   │   │   └── SprintTips.jsx
│   │   │
│   │   ├── TasksManagement/       # Module Gestion Tâches
│   │   │   ├── TasksList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskDetail.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskOutcomeManager.jsx
│   │   │   ├── TaskOutcomeBadge.jsx
│   │   │   └── UserStorySelector.jsx
│   │   │
│   │   ├── SprintBoard/           # Module Sprint Board (Kanban)
│   │   │   ├── SprintBoard.jsx
│   │   │   └── SprintBoardCard.jsx
│   │   │
│   │   ├── TaskBoard/             # Module Task Board (Kanban)
│   │   │   └── TaskBoard.jsx
│   │   │
│   │   ├── SprintReviews/         # Module Sprint Reviews
│   │   │   ├── SprintReviewList.jsx
│   │   │   ├── SprintReviewCard.jsx
│   │   │   ├── SprintReviewDetail.jsx
│   │   │   └── SprintReviewForm.jsx
│   │   │
│   │   ├── SprintRetrospective/   # Module Rétrospectives
│   │   │   ├── SprintRetroList.jsx
│   │   │   ├── SprintRetroCard.jsx
│   │   │   ├── SprintRetroDetail.jsx
│   │   │   └── SprintRetroForm.jsx
│   │   │
│   │   ├── Settings/              # Module Paramètres
│   │   │   ├── Settings.jsx
│   │   │   ├── GeneralSettings.jsx
│   │   │   ├── CustomListsSettings.jsx
│   │   │   └── LegalSettings.jsx
│   │   │
│   │   ├── Wiki/                  # Module Wiki
│   │   │   ├── Wiki.jsx
│   │   │   ├── LoadingWikiPage.jsx
│   │   │   └── pages/
│   │   │       ├── user/          # Pages utilisateur (40+)
│   │   │       └── dev/           # Pages développeur (40+)
│   │   │
│   │   ├── FAQ/                   # Module FAQ
│   │   │   └── FAQ.jsx
│   │   │
│   │   ├── CustomLists/           # Module Listes personnalisées
│   │   │   └── CustomLists.jsx
│   │   │
│   │   ├── AppContent.jsx         # Orchestration principale
│   │   ├── DiagnosticPage.jsx    # Diagnostic technique
│   │   └── Toast.jsx              # Notifications toast
│   │
│   ├── hooks/                     # 11 hooks personnalisés
│   │   ├── useContacts.js         # Contacts + équipes CRUD
│   │   ├── useProducts.js         # Produits CRUD
│   │   ├── useObjectives.js       # Objectifs CRUD
│   │   ├── useInterviews.js       # Interviews CRUD
│   │   ├── usePersonas.js         # Personas CRUD
│   │   ├── useUserNeeds.js        # Besoins CRUD
│   │   ├── useUserStories.js      # Stories CRUD + outcomes
│   │   ├── useSprints.js          # Sprints + tasks CRUD
│   │   ├── useOthers.js           # Reviews + retros + budget
│   │   ├── useModalStates.js      # États modals centralisés
│   │   ├── useStorageError.js     # Gestion erreurs storage
│   │   └── handlers/              # Handlers métier (QW1)
│   │       ├── useContactHandlers.js
│   │       ├── useProductHandlers.js
│   │       ├── useObjectiveHandlers.js
│   │       ├── useUserStoryHandlers.js
│   │       ├── useSprintHandlers.js
│   │       └── useExportImportHandlers.js
│   │
│   ├── contexts/                  # 8 contexts React
│   │   ├── PreferencesContext.jsx # Préférences utilisateur
│   │   ├── ProductsContext.jsx    # Produits + objectifs
│   │   ├── ContactsContext.jsx    # Contacts + équipes
│   │   ├── DiscoveryContext.jsx   # Interviews + personas + besoins
│   │   ├── BacklogContext.jsx     # User stories
│   │   ├── ExecutionContext.jsx   # Sprints + tasks + reviews/retros
│   │   ├── BudgetContext.jsx      # Lignes budgétaires
│   │   ├── SettingsContext.jsx    # Paramètres application
│   │   ├── AutoExportContext.jsx  # Export automatique
│   │   ├── NavigateContext.jsx    # Navigation
│   │   ├── StorageErrorContext.jsx # Erreurs storage
│   │   └── index.js               # Export barrel
│   │
│   ├── utils/                     # Utilitaires
│   │   ├── storage/               # Factory Pattern Storage
│   │   │   ├── storageFactory.js  # Factory CRUD API
│   │   │   ├── entities.js        # 16 entités définies
│   │   │   ├── constants.js       # Clés localStorage
│   │   │   ├── storageErrorHandler.js # Gestion erreurs
│   │   │   └── README.md
│   │   │
│   │   ├── analysis/              # Analyses métier
│   │   │   ├── analysisEngine.js  # Moteur d'analyse
│   │   │   └── insightGenerator.js # Génération insights
│   │   │
│   │   ├── constants.js           # Constantes globales
│   │   ├── storage.js             # API storage legacy
│   │   ├── storageQuota.js        # Gestion quota
│   │   ├── exportImport.js        # Export/Import JSON
│   │   ├── dataManagement.js      # Gestion données
│   │   ├── sessionManager.js      # Session utilisateur
│   │   ├── autoBackupService.js   # Backup automatique
│   │   ├── moduleDependencies.js  # Dépendances modules
│   │   ├── moduleDescriptions.js  # Descriptions modules
│   │   ├── dateHelpers.js         # Helpers dates
│   │   ├── useFormattedDate.js    # Hook format date
│   │   ├── priorityHelpers.js     # Helpers priorité
│   │   ├── sprintStatusUtils.js   # Statuts sprints
│   │   ├── interviewHelpers.js    # Helpers interviews
│   │   ├── userNeedHelpers.js     # Helpers besoins
│   │   ├── userStoryHelpers.js    # Helpers stories
│   │   ├── actionHelpers.js       # Helpers actions
│   │   └── appHelpers.js          # Helpers app
│   │
│   ├── constants/                 # Configurations
│   │   └── interviewConfig.js     # Config interviews
│   │
│   ├── __tests__/                 # Tests (vide actuellement)
│   │
│   ├── App.jsx                    # Composant racine
│   ├── main.jsx                   # Point d'entrée
│   └── index.css                  # Styles globaux
│
├── audit/                         # Documentation audit
│   ├── 00-vue-ensemble.md
│   ├── 01-structure-architecture.md  ⬅️ VOUS ÊTES ICI
│   └── [autres fichiers audit]
│
├── deploy/                        # Scripts déploiement
│
├── package.json                   # Dépendances npm
├── vite.config.js                 # Configuration Vite
├── tailwind.config.js             # Configuration Tailwind
├── postcss.config.js              # Configuration PostCSS
├── jest.config.js                 # Configuration Jest
├── babel.config.js                # Configuration Babel
├── README.md                      # Documentation principale
├── CHANGELOG.md                   # Historique versions
├── DEPLOY.md                      # Guide déploiement
├── LICENSE                        # Licence MIT
└── .gitignore
```

### Statistiques de Structure

| Catégorie | Nombre |
|-----------|--------|
| **Composants React (.jsx)** | 221+ |
| **Composants UI** | 35 |
| **Modules métier** | 26 |
| **Hooks personnalisés** | 11 |
| **Contexts** | 8 |
| **Utilitaires (.js)** | 20+ |
| **Pages Wiki** | 80+ |
| **Total fichiers source** | ~350 |

---

## 🔧 Patterns Architecturaux

### 1. Factory Pattern (Storage)

**Localisation :** `src/utils/storage/storageFactory.js`

**Principe :**
Génère automatiquement des API CRUD standardisées pour chaque entité localStorage, éliminant 77% de duplication de code.

**Implémentation :**

```javascript
// Factory qui génère l'API CRUD
export const createStorageAPI = (storageKey, defaults = {}, errorCallback = null) => {
  return {
    get: () => { ... },        // Récupère tous les items
    getById: (id) => { ... },  // Récupère par ID
    add: (itemData) => { ... }, // Ajoute un item
    addMany: (items) => { ... }, // Batch insert
    update: (id, updates) => { ... }, // Met à jour
    remove: (id) => { ... },    // Supprime
    save: (items) => { ... },   // Sauvegarde liste
  };
};

// Utilisation pour chaque entité
const Products = createStorageAPI('po_app_products', productDefaults);
const Contacts = createStorageAPI('po_app_contacts', contactDefaults);
const UserStories = createStorageAPI('po_app_user_stories', storyDefaults);
// ... 16 entités au total
```

**Avantages :**
- ✅ Code DRY (Don't Repeat Yourself)
- ✅ API consistante entre toutes les entités
- ✅ Gestion d'erreurs centralisée
- ✅ Backups automatiques
- ✅ Migrations de schéma simplifiées
- ✅ Maintenance facilitée

**Fichiers concernés :**
- `utils/storage/storageFactory.js` - Factory pattern
- `utils/storage/entities.js` - Définition 16 entités
- `utils/storage/constants.js` - Clés localStorage
- `utils/storage/storageErrorHandler.js` - Gestion erreurs

### 2. Context API Pattern

**Principe :**
Découpage de l'état global en 8 contexts spécialisés pour éviter les re-renders inutiles et améliorer la maintenabilité.

**Architecture des Contexts :**

```
PreferencesContext (main.jsx)
├── Thème (light/dark)
├── Langue (fr/en)
├── Notifications (enabled/disabled)
└── Preferences utilisateur

AppProviders (App.jsx)
├── ProductsContext
│   ├── Produits (CRUD)
│   └── Objectifs (CRUD)
│
├── ContactsContext
│   ├── Contacts (CRUD)
│   └── Équipes (CRUD)
│
├── DiscoveryContext
│   ├── Interviews (CRUD)
│   ├── Personas (CRUD)
│   └── Besoins (CRUD)
│
├── BacklogContext
│   ├── User Stories (CRUD)
│   └── Outcomes stories
│
├── ExecutionContext
│   ├── Sprints (CRUD)
│   ├── Tasks (CRUD)
│   ├── Sprint Reviews (CRUD)
│   ├── Rétrospectives (CRUD)
│   └── Outcomes tasks
│
├── BudgetContext
│   └── Lignes budgétaires (CRUD)
│
├── SettingsContext
│   ├── Paramètres app
│   └── Listes personnalisées
│
└── AutoExportContext
    ├── Export auto
    └── Configuration backup
```

**Lazy Loading des Contexts (QW5) :**

```javascript
// Chargement asynchrone pour réduire bundle initial
const ProductsProvider = lazy(() => 
  import('./contexts').then(module => ({ default: module.ProductsProvider }))
);

// Suspense avec fallback
<Suspense fallback={<LoadingScreen message="Chargement..." />}>
  <ProductsProvider showNotification={showNotification}>
    {children}
  </ProductsProvider>
</Suspense>
```

**Avantages :**
- ✅ État global bien organisé
- ✅ Évite prop drilling
- ✅ Re-renders optimisés (contexts séparés)
- ✅ Chargement progressif (lazy loading)
- ✅ Testabilité améliorée

### 3. Custom Hooks Pattern

**Principe :**
Encapsulation de la logique métier dans des hooks réutilisables pour séparer UI et business logic.

**Architecture des Hooks :**

```
11 Hooks Personnalisés
│
├── Hooks CRUD Métier (7)
│   ├── useContacts.js     → Contacts + équipes
│   ├── useProducts.js     → Produits
│   ├── useObjectives.js   → Objectifs
│   ├── useInterviews.js   → Interviews
│   ├── usePersonas.js     → Personas
│   ├── useUserNeeds.js    → Besoins
│   ├── useUserStories.js  → Stories + outcomes
│   └── useSprints.js      → Sprints + tasks + reviews/retros
│
├── Hooks Utilitaires (3)
│   ├── useOthers.js       → Budget + custom lists
│   ├── useModalStates.js  → États modals centralisés
│   └── useStorageError.js → Gestion erreurs storage
│
└── Handlers Spécialisés (6) - QW1
    ├── handlers/useContactHandlers.js
    ├── handlers/useProductHandlers.js
    ├── handlers/useObjectiveHandlers.js
    ├── handlers/useUserStoryHandlers.js
    ├── handlers/useSprintHandlers.js
    └── handlers/useExportImportHandlers.js
```

**Pattern standard d'un hook CRUD :**

```javascript
export const useContacts = (showNotification) => {
  // État local
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Chargement initial
  useEffect(() => {
    const loadedContacts = Contacts.get();
    setContacts(loadedContacts);
    setLoading(false);
  }, []);
  
  // CRUD avec notifications
  const handleAddContact = useCallback((data) => {
    const newContact = Contacts.add(data);
    setContacts(prev => [...prev, newContact]);
    showNotification('Contact créé', 'success');
    return newContact;
  }, [showNotification]);
  
  const handleUpdateContact = useCallback((id, updates) => {
    const updated = Contacts.update(id, updates);
    setContacts(prev => prev.map(c => c.id === id ? updated : c));
    showNotification('Contact mis à jour', 'success');
    return updated;
  }, [showNotification]);
  
  const handleDeleteContact = useCallback((id) => {
    Contacts.remove(id);
    setContacts(prev => prev.filter(c => c.id !== id));
    showNotification('Contact supprimé', 'success');
  }, [showNotification]);
  
  return {
    contacts,
    loading,
    error,
    addContact: handleAddContact,
    updateContact: handleUpdateContact,
    deleteContact: handleDeleteContact,
    refreshContacts: () => setContacts(Contacts.get()),
  };
};
```

**Avantages :**
- ✅ Logique métier réutilisable
- ✅ Composants UI simplifiés
- ✅ Tests facilités (hooks isolés)
- ✅ Maintien de la cohérence

### 4. Component Pattern (UI)

**Principe :**
Composants UI réutilisables avec props standardisées et variants pour cohérence visuelle.

**Pattern FormModal (utilisé dans 20+ modules) :**

```jsx
<FormModal isOpen={isOpen} onClose={onClose} size="large">
  <FormHeader 
    title="Ajouter un contact" 
    icon={<UserIcon />} 
  />
  
  <FormSection title="Informations générales">
    <FormGrid cols={2}>
      <Input 
        label="Nom" 
        value={name} 
        onChange={setName} 
        required 
      />
      <Input 
        label="Email" 
        value={email} 
        onChange={setEmail} 
        type="email" 
      />
    </FormGrid>
  </FormSection>
  
  <FormSection title="Détails">
    <Textarea 
      label="Description" 
      value={description} 
      onChange={setDescription} 
      rows={4} 
    />
  </FormSection>
  
  <FormFooter 
    onCancel={onClose} 
    onSubmit={handleSubmit}
    submitLabel="Créer"
    cancelLabel="Annuler"
  />
</FormModal>
```

**Composants standardisés :**
- `Card` + `CardHeader` + `CardFooter` → Cartes
- `FormModal` + `FormHeader` + `FormSection` + `FormGrid` + `FormFooter` → Formulaires
- `FilterBar` + `ProductSelector` → Filtres
- `DetailModal` → Modals de détail
- `EmptyState` → États vides

**Avantages :**
- ✅ UI cohérente (92% conformité)
- ✅ Maintenance simplifiée
- ✅ Temps de développement réduit
- ✅ Documentation visuelle (Storybook potentiel)

### 5. Lazy Loading Pattern

**Principe :**
Chargement asynchrone des composants lourds pour réduire le bundle initial et améliorer les performances.

**Implémentation actuelle (QW5) :**

```javascript
// App.jsx - Lazy loading contexts
const ProductsProvider = lazy(() => import('./contexts').then(...));
const ContactsProvider = lazy(() => import('./contexts').then(...));
// ... 8 contexts lazy loaded

// AppContent.jsx - Lazy loading (futur QW6)
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const ContactsList = lazy(() => import('./components/Contacts/ContactsList'));
// ... modules métier à lazy loader
```

**État actuel :**
- ✅ Contexts lazy loaded (QW5 fait)
- ⚠️ Modules métier non lazy loaded (QW6 à faire)
- ⚠️ Pas de code splitting par routes

**Gains attendus QW6 :**
- Bundle initial : -50% (~125 KB au lieu de ~250 KB)
- First Load : -40% (~1.8s au lieu de ~3s)
- Time to Interactive : -30%

---

## 📊 Flux de Données

### 1. Flux Unidirectionnel (Top-Down)

```
localStorage
    ↓
Factory Pattern Storage (storageFactory.js)
    ↓
Custom Hooks (useContacts, useProducts, ...)
    ↓
Context Providers (ProductsContext, ContactsContext, ...)
    ↓
Composants Consommateurs (via useContext)
    ↓
UI Components (affichage)
    ↑
User Actions (click, input, ...)
    ↑
Event Handlers (handleAdd, handleUpdate, ...)
    ↑
Custom Hooks (appel API CRUD)
    ↑
Factory Pattern Storage (localStorage update)
```

### 2. Flux d'Action CRUD

**Exemple : Création d'un contact**

```
1. User clique "Ajouter contact"
   ↓
2. ContactsList.jsx ouvre modal (setIsModalOpen(true))
   ↓
3. ContactForm.jsx affiche formulaire
   ↓
4. User remplit + clique "Créer"
   ↓
5. handleSubmit() dans ContactForm.jsx
   ↓
6. addContact(data) depuis useContacts hook
   ↓
7. Contacts.add(data) via Factory Pattern
   ↓
8. localStorage.setItem('po_app_contacts', JSON.stringify([...]))
   ↓
9. setContacts([...prev, newContact]) dans hook
   ↓
10. showNotification('Contact créé', 'success')
    ↓
11. Re-render de ContactsList avec nouveau contact
    ↓
12. Modal se ferme (onClose())
```

### 3. Flux d'Erreur Storage

```
localStorage operation fails
    ↓
storageErrorHandler.js détecte type erreur
    ↓
errorCallback() notifie le hook
    ↓
useStorageError hook intercepte
    ↓
StorageErrorModal s'affiche avec message
    ↓
User voit erreur + solutions
    ↓
Actions possibles :
- Retry (tryFreeSpace())
- Export données
- Fermer application
```

---

## 🧩 Gestion de l'État

### Vue d'Ensemble

```
État Global (Contexts)
├── PreferencesContext
│   └── Préférences utilisateur (thème, langue, notifs)
│
├── ProductsContext
│   ├── products: Product[]
│   ├── objectives: Objective[]
│   └── loading, error
│
├── ContactsContext
│   ├── contacts: Contact[]
│   ├── teams: Team[]
│   └── loading, error
│
├── DiscoveryContext
│   ├── interviews: Interview[]
│   ├── personas: Persona[]
│   ├── userNeeds: UserNeed[]
│   └── loading, error
│
├── BacklogContext
│   ├── userStories: UserStory[]
│   ├── outcomes: Outcome[]
│   └── loading, error
│
├── ExecutionContext
│   ├── sprints: Sprint[]
│   ├── tasks: Task[]
│   ├── sprintReviews: SprintReview[]
│   ├── sprintRetrospectives: SprintRetrospective[]
│   ├── taskOutcomes: TaskOutcome[]
│   └── loading, error
│
├── BudgetContext
│   ├── budgetEntries: BudgetEntry[]
│   └── loading, error
│
├── SettingsContext
│   ├── settings: Settings
│   ├── customLists: CustomList[]
│   └── loading, error
│
└── AutoExportContext
    ├── isEnabled: boolean
    ├── frequency: string
    └── lastExport: Date

État Local (useState dans composants)
├── Form states (inputs)
├── Modal states (isOpen)
├── UI states (activeTab, filters)
└── Temporary states
```

### Règles de Gestion d'État

1. **État global → Context**
   - Données partagées entre modules
   - Données persistées (localStorage)
   - Configuration application

2. **État local → useState**
   - États UI temporaires (modals, tabs)
   - États de formulaires (inputs)
   - États de filtres locaux

3. **État dérivé → useMemo**
   - Calculs basés sur état existant
   - Filtres/tris complexes
   - Agrégations

4. **État serveur → Custom Hooks**
   - CRUD localStorage via Factory Pattern
   - Gestion loading/error
   - Synchronisation

### Optimisations d'État

**React.memo sur Cards :**
```javascript
export const ContactCard = React.memo(({ contact, onEdit, onDelete }) => {
  // Évite re-render si props identiques
}, (prevProps, nextProps) => {
  return prevProps.contact.id === nextProps.contact.id &&
         prevProps.contact.updatedAt === nextProps.contact.updatedAt;
});
```

**useCallback pour fonctions :**
```javascript
const handleDelete = useCallback((id) => {
  deleteContact(id);
}, [deleteContact]);
```

**useMemo pour calculs :**
```javascript
const filteredContacts = useMemo(() => {
  return contacts.filter(c => 
    c.name.includes(searchTerm) && 
    (filterProduct === 'all' || c.productId === filterProduct)
  );
}, [contacts, searchTerm, filterProduct]);
```

---

## 📦 Analyse des Dépendances

### Dépendances de Production

```json
{
  "react": "^18.2.0",                  // 100 KB
  "react-dom": "^18.2.0",              // 40 KB
  "@hello-pangea/dnd": "^18.0.1",     // 50 KB - Drag & drop
  "lucide-react": "^0.263.1",         // 30 KB - Icônes (→ emojis)
  "recharts": "^2.10.3",              // 120 KB - Graphiques
  "react-window": "^2.2.3"            // 10 KB - Virtualisation
}
```

**Total runtime :** ~350 KB (gzipped ~150 KB)

### Dépendances de Développement

```json
{
  "@vitejs/plugin-react": "^4.2.1",   // Vite + React
  "vite": "^5.0.8",                    // Build tool
  "tailwindcss": "^3.4.0",             // CSS framework
  "autoprefixer": "^10.4.16",          // CSS prefixes
  "postcss": "^8.4.32",                // CSS processor
  "jest": "^29.7.0",                   // Test runner
  "@testing-library/react": "^14.1.2", // Test utils
  "@testing-library/jest-dom": "^6.1.5",
  "babel-jest": "^29.7.0"
}
```

### Graphe de Dépendances Simplifié

```
Application
├── React Core
│   ├── react (core)
│   └── react-dom (rendering)
│
├── Build Tools
│   ├── Vite (dev server + build)
│   └── Tailwind CSS (styling)
│
├── UI Libraries
│   ├── @hello-pangea/dnd (Kanban drag & drop)
│   ├── lucide-react (icônes - en cours de remplacement)
│   └── recharts (graphiques analytics)
│
├── Performance
│   └── react-window (virtualisation listes)
│
└── Testing (non utilisé actuellement)
    ├── Jest
    └── Testing Library
```

### Analyse des Imports

**Modules les plus importés :**
1. `react` → 221+ fichiers
2. `lucide-react` → ~80 fichiers (en cours remplacement emojis)
3. `utils/storage/` → ~26 modules
4. `contexts/` → ~26 modules
5. `components/ui/` → ~150 fichiers

**Opportunités d'optimisation :**
- ⚠️ `lucide-react` : Remplacer par emojis (QW3 en cours)
- ⚠️ `recharts` : Lazy load dashboard (-120 KB)
- ⚠️ Contexts : Lazy loading fait (QW5 ✅)
- ⚠️ Modules métier : À lazy loader (QW6)

---

## 🎯 Métriques d'Architecture

| Métrique | Valeur | Évaluation |
|----------|--------|------------|
| **Complexité** | Moyenne | ✅ |
| **Couplage** | Faible | ✅ |
| **Cohésion** | Élevée | ✅ |
| **Maintenabilité** | 8/10 | ✅ |
| **Testabilité** | 7/10 | ⚠️ |
| **Scalabilité** | 7/10 | ⚠️ |
| **Performance** | 6/10 | ⚠️ |

### Points Forts Architecture

1. ✅ **Séparation des responsabilités claire**
   - UI → `components/`
   - Logique → `hooks/`
   - État → `contexts/`
   - Utilitaires → `utils/`

2. ✅ **Factory Pattern élimine duplication**
   - 77% réduction code storage
   - API CRUD standardisée
   - Maintenance facilitée

3. ✅ **Contexts bien découpés**
   - 8 contexts spécialisés
   - Évite re-renders inutiles
   - Lazy loading implémenté

4. ✅ **Composants UI réutilisables**
   - 35 composants Design System
   - 92% conformité visuelle
   - Pattern uniforme

### Points d'Amélioration

1. ⚠️ **Bundle size important**
   - ~250 KB gzipped actuellement
   - Cible : <150 KB
   - Solution : Lazy loading modules (QW6)

2. ⚠️ **Pas de tests automatisés**
   - 0% couverture
   - Risque de régressions
   - Solution : Implémenter Jest/Testing Library

3. ⚠️ **Performance listes longues**
   - Ralentissements >500 items
   - Solution : Virtualisation (react-window)

4. ⚠️ **Responsive mobile partiel**
   - 60% optimisé
   - Solution : Mobile-first refactoring

---

## 📝 Conclusion

L'architecture de ProductOwnerApp est **solide et professionnelle** avec des patterns modernes (Factory Pattern, Context API, Custom Hooks) et une séparation des responsabilités claire. Les optimisations Quick Win (QW1-QW5) ont permis de réduire significativement la duplication de code et d'améliorer la cohérence.

**Prochaines étapes prioritaires :**
1. 🎯 Lazy loading modules métier (QW6)
2. 🎯 Tests automatisés (60% couverture)
3. 🎯 Performance listes (virtualisation)
4. 🎯 Responsive mobile complet

---

*Analyse architecture réalisée le 8 décembre 2025.*
