# 🎨 Système d'Icônes ProductOwnerApp

## 📋 Vue d'ensemble

Ce système centralise tous les icônes de l'application, en utilisant des **emojis** pour une identité visuelle unique et cohérente.

**État actuel :** 80% migré vers emojis  
**Objectif :** 100% emojis (abandon complet de Lucide React)

---

## 🚀 Utilisation

### Méthode 1 : Composant Icon (recommandé)

```jsx
import { Icon } from '../icons/Icon';

// Icône de module
<Icon type="module" name="dashboard" size="lg" />

// Icône d'action
<Icon type="action" name="add" size="md" onClick={handleAdd} />

// Icône de statut
<Icon type="status" name="active" size="sm" />
```

### Méthode 2 : Composants spécialisés (plus simple)

```jsx
import { ModuleIcon, ActionIcon, StatusIcon } from '../icons/IconComponents';

// Icônes de modules
<ModuleIcon name="dashboard" size="lg" />
<ModuleIcon name="userStories" size="md" />

// Icônes d'actions
<ActionIcon name="add" onClick={handleAdd} />
<ActionIcon name="edit" onClick={handleEdit} />

// Icônes de statuts
<StatusIcon name="active" />
<StatusIcon name="completed" />
```

### Méthode 3 : Emoji direct (rapide)

```jsx
import { QuickIcon } from '../icons/IconComponents';

<QuickIcon emoji="🎉" size="2xl" />
<QuickIcon emoji="📊" size="lg" />
```

### Méthode 4 : Import direct des mappings

```jsx
import { moduleIcons, actionIcons, statusIcons } from '../icons';

// Affichage simple
<span className="text-2xl">{moduleIcons.dashboard}</span>
<span className="text-xl">{actionIcons.add}</span>
<span className="text-lg">{statusIcons.active}</span>
```

---

## 📦 Catégories d'icônes

### Modules & Vues (`moduleIcons`)

```jsx
import { moduleIcons } from '../icons';

moduleIcons.dashboard          // 🏠
moduleIcons.contacts           // 👤
moduleIcons.teams              // 👥
moduleIcons.products           // 📦
moduleIcons.objectives         // 🎯
moduleIcons.interviews         // 💬
moduleIcons.userNeeds          // 💡
moduleIcons.personas           // 🧑
moduleIcons.userStories        // 📝
moduleIcons.sprintsManagement  // 📅
moduleIcons.tasksManagement    // ✅
moduleIcons.sprintBoard        // 🗂️
moduleIcons.taskBoard          // ✅
moduleIcons.sprintReviews      // 📅
moduleIcons.sprintRetrospectives // 🔄
```

### Actions (`actionIcons`)

```jsx
import { actionIcons } from '../icons';

// CRUD
actionIcons.add       // ➕
actionIcons.edit      // ✏️
actionIcons.delete    // 🗑️
actionIcons.save      // 💾
actionIcons.cancel    // ❌

// Navigation
actionIcons.back      // ◀️
actionIcons.next      // ▶️
actionIcons.menu      // ☰

// Interactions
actionIcons.search    // 🔍
actionIcons.filter    // 🔽
actionIcons.refresh   // 🔄
actionIcons.export    // 📤
actionIcons.import    // 📥

// Flèches
actionIcons.chevronUp    // 🔼
actionIcons.chevronDown  // 🔽
actionIcons.chevronLeft  // ◀️
actionIcons.chevronRight // ▶️
```

### Statuts (`statusIcons`)

```jsx
import { statusIcons } from '../icons';

// États génériques
statusIcons.active      // ✅
statusIcons.inactive    // ⭕
statusIcons.pending     // ⏳
statusIcons.completed   // ✅
statusIcons.blocked     // 🚫

// Priorités
statusIcons.high        // 🔴
statusIcons.medium      // 🟡
statusIcons.low         // 🟢

// MoSCoW
statusIcons.mustHave    // 🔴
statusIcons.shouldHave  // 🟡
statusIcons.couldHave   // 🟢
statusIcons.wontHave    // ⭕
```

### Sections de navigation (`sectionIcons`)

```jsx
import { sectionIcons } from '../icons';

sectionIcons.overview     // 🏠
sectionIcons.organization // 👥
sectionIcons.strategy     // 🎯
sectionIcons.exploration  // 🧭
sectionIcons.refinement   // 📝
sectionIcons.planning     // 🚀
sectionIcons.daily        // ⚡
sectionIcons.review       // 🔄
```

---

## 🎨 Tailles disponibles

```jsx
<Icon size="xs" />   // text-xs
<Icon size="sm" />   // text-sm
<Icon size="md" />   // text-base (défaut)
<Icon size="lg" />   // text-xl
<Icon size="xl" />   // text-2xl
<Icon size="2xl" />  // text-3xl
<Icon size="3xl" />  // text-4xl
<Icon size="4xl" />  // text-5xl
```

---

## 🔄 Migration depuis Lucide React

### Option 1 : Utiliser LucideIcon (temporaire)

```jsx
import { LucideIcon } from '../icons/IconComponents';

// Avant
<Home className="w-5 h-5" />

// Après (transition)
<LucideIcon name="Home" size="lg" />
```

### Option 2 : Conversion directe

```jsx
import { convertLucideToEmoji } from '../icons';

// Avant
import { Home, Settings, Users } from 'lucide-react';

// Après
const homeIcon = convertLucideToEmoji('Home');        // 🏠
const settingsIcon = convertLucideToEmoji('Settings'); // ⚙️
const usersIcon = convertLucideToEmoji('Users');      // 👥
```

### Option 3 : Migration complète (recommandé)

```jsx
// Avant
import { Home } from 'lucide-react';
<Home className="w-5 h-5" />

// Après
import { ModuleIcon } from '../icons/IconComponents';
<ModuleIcon name="dashboard" size="lg" />
```

---

## 🛠️ Fonctions utilitaires

```jsx
import {
  getModuleIcon,
  getActionIcon,
  getStatusIcon,
  getSectionIcon,
  convertLucideToEmoji
} from '../icons';

// Récupérer une icône par nom
const dashboardIcon = getModuleIcon('dashboard');  // 🏠
const addIcon = getActionIcon('add');              // ➕
const activeIcon = getStatusIcon('active');        // ✅

// Conversion Lucide
const homeIcon = convertLucideToEmoji('Home');     // 🏠

// Avec fallback
const customIcon = getModuleIcon('nonExistent', '❓'); // ❓
```

---

## 📚 Exemples d'utilisation

### Dans un bouton

```jsx
import { ActionIcon } from '../icons/IconComponents';

<button className="flex items-center gap-2">
  <ActionIcon name="add" size="sm" />
  <span>Ajouter</span>
</button>
```

### Dans un header de carte

```jsx
import { ModuleIcon } from '../icons/IconComponents';

<div className="flex items-center gap-3">
  <ModuleIcon name="userStories" size="2xl" />
  <h2 className="text-xl font-bold">User Stories</h2>
</div>
```

### Dans un menu de navigation

```jsx
import { ModuleIcon } from '../icons/IconComponents';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'contacts', label: 'Contacts', icon: 'contacts' },
  { id: 'teams', label: 'Équipes', icon: 'teams' }
];

{menuItems.map(item => (
  <button key={item.id}>
    <ModuleIcon name={item.icon} size="md" />
    <span>{item.label}</span>
  </button>
))}
```

### Badge avec statut

```jsx
import { StatusIcon } from '../icons/IconComponents';

<span className="flex items-center gap-1">
  <StatusIcon name="active" size="xs" />
  <span>Actif</span>
</span>
```

### Icône interactive

```jsx
import { ActionIcon } from '../icons/IconComponents';

<ActionIcon 
  name="delete"
  size="lg"
  onClick={handleDelete}
  title="Supprimer"
  className="text-red-500 hover:text-red-700"
/>
```

---

## ✅ Checklist de migration

Pour migrer un composant de Lucide vers le système d'icônes :

1. **Identifier les icônes Lucide utilisées**
   ```jsx
   import { Home, Settings, Users } from 'lucide-react';
   ```

2. **Remplacer les imports**
   ```jsx
   import { ModuleIcon, ActionIcon } from '../icons/IconComponents';
   ```

3. **Remplacer les composants Lucide**
   ```jsx
   // Avant
   <Home className="w-5 h-5" />
   
   // Après
   <ModuleIcon name="dashboard" size="lg" />
   ```

4. **Ajuster les tailles si nécessaire**
   - `w-4 h-4` → `size="sm"`
   - `w-5 h-5` → `size="md"`
   - `w-6 h-6` → `size="lg"`

5. **Tester visuellement**
   - Vérifier l'alignement
   - Vérifier la taille
   - Vérifier les interactions

---

## 🎯 Objectifs de migration

### Phase actuelle : 80% migré

**Composants déjà migrés (emojis) :**
- ✅ Dashboard sections
- ✅ FormHeader
- ✅ CardHeader (17 modules)
- ✅ EmptyState
- ✅ La plupart des badges

**Composants à migrer (Lucide restant) :**
- ⚠️ Sidebar (navigation principale)
- ⚠️ Quelques actions dans les boutons
- ⚠️ Certains indicateurs de statut

### Phase suivante : 100% migration

**Plan de migration :**
1. Migrer Sidebar.jsx
2. Migrer les actions restantes
3. Supprimer toutes les dépendances Lucide
4. Nettoyer les imports inutilisés

---

## 💡 Bonnes pratiques

### ✅ À FAIRE

- Utiliser les composants `ModuleIcon`, `ActionIcon`, etc.
- Définir explicitement la taille avec `size`
- Utiliser les noms depuis les mappings existants
- Ajouter des `title` pour l'accessibilité
- Grouper les icônes similaires

### ❌ À ÉVITER

- Ne pas mélanger Lucide et emojis dans un même composant
- Ne pas utiliser des emojis en dur dans le JSX
- Ne pas oublier les propriétés d'accessibilité
- Ne pas créer de nouveaux mappings d'icônes ailleurs

---

## 📖 API Complète

### Composant `Icon`

```jsx
<Icon
  type="module"           // 'module' | 'action' | 'status' | 'section'
  name="dashboard"        // Nom depuis le mapping
  lucide="Home"          // Nom Lucide (pour migration)
  emoji="🏠"             // Emoji direct
  size="md"              // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  className=""           // Classes CSS supplémentaires
  title=""               // Titre au survol
  onClick={handler}      // Fonction de clic
  ariaLabel=""           // Label ARIA
/>
```

### Composants spécialisés

```jsx
<ModuleIcon name="dashboard" size="lg" />
<ActionIcon name="add" onClick={handleAdd} />
<StatusIcon name="active" size="sm" />
<SectionIcon name="overview" size="md" />
<QuickIcon emoji="🎉" size="2xl" />
<LucideIcon name="Home" size="md" /> // Temporaire
```

---

## 🔗 Ressources

- **Fichier principal :** `src/icons/index.js`
- **Composants :** `src/icons/Icon.jsx`, `src/icons/IconComponents.jsx`
- **Documentation :** `src/icons/README.md` (ce fichier)

---

**Dernière mise à jour :** 8 décembre 2025  
**Version :** 1.0.0 (80% migration complète)
