# FilterBar Component

Composant réutilisable pour afficher une barre de filtres et d'actions standardisée dans toute l'application.

## 📋 Description

`FilterBar` (v2.1) fournit une interface cohérente et **100% responsive** avec :
- Une ligne d'actions avec support de contenu personnalisé en haut à gauche
- Une section repliable avec fond gris pour les filtres
- Un bouton de réinitialisation automatique
- Design mobile-first avec breakpoints optimisés

## 🎯 Usage basique

```jsx
import FilterBar from '../Common/FilterBar';

<FilterBar
  isExpanded={isFiltersExpanded}
  onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
  onAdd={handleAdd}
  addLabel="Nouvelle Équipe"
  hasActiveFilters={hasActiveFilters}
  onResetFilters={resetFilters}
  filters={
    <>
      <FilterSelect
        label="Statut"
        value={filter1}
        onChange={(e) => handleFilter1(e)}
        options={[
          { value: 'all', label: 'Tous' },
          { value: 'active', label: 'Actifs' }
        ]}
      />
      
      <FilterSelect
        label="Catégorie"
        value={filter2}
        onChange={(e) => handleFilter2(e)}
        options={[
          { value: 'all', label: 'Toutes les catégories' },
          { value: 'cat1', label: 'Catégorie 1' }
        ]}
      />
    </>
  }
/>
```

## 📦 Props

| Prop | Type | Obligatoire | Description |
|------|------|-------------|-------------|
| `isExpanded` | `boolean` | ✅ | État d'expansion de la section filtres |
| `onToggleExpand` | `Function` | ✅ | Callback appelé au clic sur le bouton "Filtres" |
| `onAdd` | `Function` | ❌ | Callback pour le bouton d'ajout (si absent, le bouton n'est pas affiché) |
| `addLabel` | `string` | ❌ | Label du bouton d'ajout (défaut: "Nouveau") |
| `hasActiveFilters` | `boolean` | ❌ | Indique si des filtres sont actifs (affiche le bouton "Réinitialiser") |
| `onResetFilters` | `Function` | ✅ | Callback pour réinitialiser les filtres |
| `filters` | `React.ReactNode` | ✅ | Composants de filtres (select, input, etc.) |
| `topLeftContent` | `React.ReactNode` | ❌ | Contenu à afficher en haut à gauche (ex: ProductSelector) |
| `additionalActions` | `React.ReactNode` | ❌ | Actions supplémentaires à afficher (ex: Import/Export) |

## ⚙️ FilterSelect - Composant compagnon

`FilterSelect` est un composant de select harmonisé qui utilise exactement les mêmes styles que `ProductSelector` pour une cohérence visuelle parfaite.

### Caractéristiques
- **Dimensions identiques** : `min-w-[150px] sm:min-w-[200px]`
- **Padding harmonieux** : `px-2.5 sm:px-3 / py-1.5 sm:py-2`
- **Typography responsive** : `text-xs sm:text-sm`
- **Focus et hover** : Styles identiques à ProductSelector

### Usage

```jsx
import { FilterSelect } from '../Common';

<FilterSelect
  label="Type"
  value={filterType}
  onChange={(e) => setFilterType(e.target.value)}
  options={[
    { value: 'all', label: 'Tous les types' },
    { value: 'internal', label: '🏫 Internes' },
    { value: 'external', label: '🌐 Externes' }
  ]}
/>
```

### Pourquoi utiliser FilterSelect ?

Au lieu d'utiliser des `<select>` HTML natifs avec des classes Tailwind personnalisées, `FilterSelect` garantit :
1. ✅ **Cohérence visuelle** avec `ProductSelector`
2. ✅ **Responsive design** automatique
3. ✅ **Maintenance simplifiée** (un seul composant à mettre à jour)
4. ✅ **Code plus propre** dans les pages

## 🎨 Exemple avec topLeftContent (Contacts)

```jsx
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';

<FilterBar
  isExpanded={isFiltersExpanded}
  onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
  onAdd={handleAdd}
  addLabel="Nouveau Contact"
  hasActiveFilters={hasActiveFilters}
  onResetFilters={resetFilters}
  topLeftContent={
    <ProductSelector
      products={activeProducts}
      value={filterProduct}
      onChange={setFilterProduct}
      includeAllOption
      allOptionLabel="Tous les produits"
    />
  }
  additionalActions={
    <>
      <Button
        variant="outline"
        size="sm"
        icon={Upload}
        onClick={handleImport}
      >
        Import CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        icon={Download}
        onClick={handleExport}
      >
        Export CSV
      </Button>
    </>
  }
  filters={
    <>
      {/* Filtres personnalisés */}
    </>
  }
/>
```

## 💡 Exemple complet avec filtrage

```jsx
import { useState, useMemo } from 'react';
import FilterBar from '../Common/FilterBar';

const MyList = ({ items, onAdd }) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [filterStatus, setFilterStatus] = useState('active');
  const [filterCategory, setFilterCategory] = useState('all');

  // Logique de filtrage
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      return matchesStatus && matchesCategory;
    });
  }, [items, filterStatus, filterCategory]);

  // Détection des filtres actifs
  const hasActiveFilters = filterStatus !== 'active' || filterCategory !== 'all';

  // Réinitialisation
  const resetFilters = () => {
    setFilterStatus('active');
    setFilterCategory('all');
  };

  return (
    <div>
      <FilterBar
        isExpanded={isFiltersExpanded}
        onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
        onAdd={onAdd}
        addLabel="Nouvel Item"
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetFilters}
        filters={
          <>
            {/* Filtre Statut */}
            <FilterSelect
              label="Statut"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: 'active', label: '✓ Actifs' },
                { value: 'inactive', label: 'Inactifs' },
                { value: 'all', label: 'Tous les statuts' }
              ]}
            />

            {/* Filtre Catégorie */}
            <FilterSelect
              label="Catégorie"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              options={[
                { value: 'all', label: 'Toutes les catégories' },
                { value: 'cat1', label: 'Catégorie 1' },
                { value: 'cat2', label: 'Catégorie 2' }
              ]}
            />
          </>
        }
      />

      {/* Liste des items filtrés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredItems.map(item => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 🎨 Design System

### Couleurs et styles
- **Ligne principale** : Fond blanc, padding progressif, alignement responsive
- **Section filtres** : Fond gris léger (`bg-gray-50`), bordure supérieure
- **Bouton "Filtres"** : Fond gris (`bg-gray-100`), survol gris plus foncé
- **Bouton d'ajout** : Gradient bleu-violet (`variant="gradient"`)
- **Bouton "Réinitialiser"** : Gris, visible uniquement si filtres actifs

### Espacement
- **Mobile (< 640px)** : `p-3`, `gap-3`
- **Tablet (640px-1024px)** : `p-4`, `gap-4`
- **Desktop (> 1024px)** : `p-5`, `gap-4`

## 📱 Responsive Design

Le composant s'adapte automatiquement selon la taille de l'écran :

### Mobile (< 640px)
- Layout vertical (flex-col)
- Espacement réduit (p-3, gap-3)
- Labels courts : "Nouveau", "Filtrer", "Reset"
- Typography compacte (text-xs)
- Wrapping automatique des actions

### Tablet (640px-1024px)
- Layout horizontal (flex-row)
- Espacement moyen (p-4, gap-4)
- Labels complets visibles
- Typography standard (text-sm)
- Actions alignées horizontalement

### Desktop (> 1024px)
- Layout horizontal optimisé
- Espacement généreux (p-5, gap-4/5)
- Tous les labels visibles
- Actions sur une seule ligne
- Utilisation optimale de l'espace

### Labels adaptatifs

```jsx
// Bouton d'ajout
<span className="hidden sm:inline">{addLabel}</span>  // Desktop: "Nouvelle Équipe"
<span className="sm:hidden">Nouveau</span>            // Mobile: "Nouveau"

// Bouton de réinitialisation
<span className="hidden sm:inline">Réinitialiser</span>  // Desktop: "Réinitialiser"
<span className="sm:hidden">Reset</span>                 // Mobile: "Reset"
```

## ✅ Bonnes pratiques

### 1. Calcul des filtres actifs
```jsx
const hasActiveFilters = useMemo(() => {
  return filterStatus !== 'active' || 
         filterCategory !== 'all' ||
         searchTerm !== '';
}, [filterStatus, filterCategory, searchTerm]);
```

### 2. Performance avec useMemo
```jsx
const filteredItems = useMemo(() => {
  return items.filter(item => {
    // Logique de filtrage
  });
}, [items, filterStatus, filterCategory, searchTerm]);
```

### 3. Réinitialisation complète
```jsx
const resetFilters = () => {
  setFilterStatus('active');
  setFilterCategory('all');
  setSearchTerm('');
  setCurrentPage(1); // Important pour la pagination !
};
```

### 4. Utiliser FilterSelect pour les filtres
```jsx
// ❌ NE PAS FAIRE - Select HTML natif
<select
  value={filter}
  onChange={handleChange}
  className="px-3 py-2 border border-gray-300 rounded-lg..."
>
  <option value="all">Tous</option>
</select>

// ✅ FAIRE - Utiliser FilterSelect
<FilterSelect
  label="Type"
  value={filter}
  onChange={(e) => handleChange(e)}
  options={[
    { value: 'all', label: 'Tous' },
    { value: 'active', label: 'Actifs' }
  ]}
/>
```

### 5. Champ de recherche responsive
```jsx
// Champ de recherche avec styles harmonisés
<div className="col-span-full mb-2">
  <div className="relative">
    <Search 
      className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
      size={16} 
    />
    <input
      type="text"
      placeholder="Rechercher..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
    />
  </div>
</div>
```

### 6. Actions supplémentaires responsive (Import/Export)
```jsx
import { Button } from '../ui';
import { Upload, Download } from 'lucide-react';

additionalActions={
  <>
    <Button
      variant="outline"
      size="sm"
      icon={Upload}
      iconPosition="left"
      onClick={handleImport}
      className="bg-green-50 text-green-700 hover:bg-green-100 border-green-300 text-xs sm:text-sm whitespace-nowrap"
    >
      <span className="hidden sm:inline">Import CSV</span>
      <span className="sm:hidden">Import</span>
    </Button>
    <Button
      variant="outline"
      size="sm"
      icon={Download}
      iconPosition="left"
      onClick={handleExport}
      className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-300 text-xs sm:text-sm whitespace-nowrap"
    >
      <span className="hidden sm:inline">Export CSV</span>
      <span className="sm:hidden">Export</span>
    </Button>
  </>
}
```

## 🔗 Modules utilisant FilterBar

- ✅ **Contacts** - Avec ProductSelector, FilterSelect et Import/Export (référence)
- ✅ **Teams** - Gestion des équipes
- ✅ **UserStories** - Avec ProductSelector
- ✅ **UserNeeds** - Avec ProductSelector
- ✅ **SprintsManagement** - Gestion des sprints
- ✅ **TasksManagement** - Gestion des tâches
- 🔜 **Products, Objectives, Wiki**, etc. - À migrer vers FilterSelect

## 🆕 Changelog

### Version 2.1 (Décembre 2024)
- ✅ Design 100% responsive avec mobile-first approach
- ✅ Support des breakpoints tablet (640px-1024px)
- ✅ Espacement progressif (p-3, p-4, p-5)
- ✅ Typography adaptative (text-xs, text-sm)
- ✅ Labels courts sur mobile, complets sur desktop
- ✅ Wrapping intelligent des actions
- ✅ **Nouveau composant FilterSelect** - Selects harmonisés avec ProductSelector
- ✅ **Champ de recherche responsive** - Padding, icon et typography adaptatifs
- ✅ **Boutons additionnels responsive** - Labels courts sur mobile (Import/Export)
- ✅ Documentation complète avec exemples responsive

### Version 2.0
- ✅ Ajout de `topLeftContent` pour ProductSelector
- ✅ Ajout de `additionalActions` pour Import/Export
- ✅ Amélioration de la structure du layout

### Version 1.0
- ✅ Version initiale avec filtres et actions de base
