# FilterSelect Component

Composant de select harmonisé pour les filtres, utilisant les mêmes styles que ProductSelector.

## 📋 Description

`FilterSelect` fournit un select standardisé et responsive qui :
- Utilise exactement les mêmes dimensions et styles que `ProductSelector`
- Garantit une cohérence visuelle parfaite dans les sections de filtres
- Applique automatiquement le design responsive mobile-first
- Simplifie la maintenance des filtres

## 🎯 Usage

```jsx
import { FilterSelect } from '../Common';

<FilterSelect
  label="Type"
  value={filterType}
  onChange={(e) => setFilterType(e.target.value)}
  options={[
    { value: 'all', label: 'Tous les types' },
    { value: 'internal', label: '🏢 Internes' },
    { value: 'external', label: '🌐 Externes' }
  ]}
/>
```

## 📦 Props

| Prop | Type | Obligatoire | Description |
|------|------|-------------|-------------|
| `value` | `string` | ✅ | Valeur sélectionnée |
| `onChange` | `Function` | ✅ | Callback appelé lors du changement (reçoit l'événement) |
| `options` | `Array<{value, label}>` | ✅ | Liste des options à afficher |
| `label` | `string` | ❌ | Label affiché au-dessus du select |
| `placeholder` | `string` | ❌ | Placeholder (défaut: "Sélectionner...") |
| `className` | `string` | ❌ | Classes CSS additionnelles pour le wrapper |

## 🎨 Caractéristiques techniques

### Dimensions
- **Largeur minimale** : `min-w-[150px]` sur mobile, `sm:min-w-[200px]` sur desktop
- Identique à `ProductSelector` pour une harmonie visuelle parfaite

### Padding
- **Horizontal** : `px-2.5` sur mobile → `sm:px-3` sur desktop
- **Vertical** : `py-1.5` sur mobile → `sm:py-2` sur desktop

### Typography
- **Taille** : `text-xs` sur mobile → `sm:text-sm` sur desktop
- **Label** : `text-xs sm:text-sm` avec `font-medium`

### États interactifs
- **Hover** : `hover:border-gray-400` - Bordure plus foncée au survol
- **Focus** : `focus:ring-2 focus:ring-indigo-500` - Anneau bleu au focus
- **Border** : `border-gray-300` par défaut

## 💡 Exemples

### Exemple basique
```jsx
<FilterSelect
  label="Statut"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={[
    { value: 'all', label: 'Tous' },
    { value: 'active', label: '✓ Actifs' },
    { value: 'inactive', label: 'Inactifs' }
  ]}
/>
```

### Exemple avec données dynamiques
```jsx
const companies = ['Acme Corp', 'TechStart', 'Innovation Labs'];

<FilterSelect
  label="Entreprise"
  value={filterCompany}
  onChange={(e) => setFilterCompany(e.target.value)}
  options={[
    { value: 'all', label: 'Toutes les entreprises' },
    ...companies.map(company => ({
      value: company,
      label: company
    }))
  ]}
/>
```

### Exemple avec emojis
```jsx
<FilterSelect
  label="Disponibilité"
  value={availability}
  onChange={(e) => setAvailability(e.target.value)}
  options={[
    { value: 'all', label: 'Tous' },
    { value: 'available', label: '✓ Disponibles' },
    { value: 'busy', label: '⚡ Occupés' },
    { value: 'away', label: '⏸️ Absents' }
  ]}
/>
```

### Utilisation dans FilterBar
```jsx
<FilterBar
  isExpanded={isFiltersExpanded}
  onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
  // ... autres props
  filters={
    <>
      <FilterSelect
        label="Type"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        options={typeOptions}
      />
      
      <FilterSelect
        label="Catégorie"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        options={categoryOptions}
      />
      
      <FilterSelect
        label="Priorité"
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        options={priorityOptions}
      />
    </>
  }
/>
```

## 📱 Responsive Design

Le composant s'adapte automatiquement selon la taille de l'écran :

### Mobile (< 640px)
- Padding compact : `px-2.5 py-1.5`
- Typography réduite : `text-xs`
- Largeur minimale : `min-w-[150px]`

### Desktop (≥ 640px)
- Padding confortable : `px-3 py-2`
- Typography standard : `text-sm`
- Largeur minimale : `min-w-[200px]`

## ✅ Avantages vs Select HTML natif

| Aspect | Select HTML natif | FilterSelect |
|--------|-------------------|--------------|
| **Cohérence visuelle** | ❌ Classes à dupliquer | ✅ Automatique |
| **Responsive** | ❌ Classes manuelles | ✅ Intégré |
| **Maintenance** | ❌ Modifications partout | ✅ Un seul fichier |
| **Label** | ❌ Markup additionnel | ✅ Prop simple |
| **Harmonisation** | ❌ Risque d'incohérence | ✅ Identique à ProductSelector |

## 🔗 Composants liés

- **ProductSelector** : Sélecteur de produits avec badges colorés (même design)
- **FilterBar** : Barre de filtres qui contient les FilterSelect
- **Button** : Boutons d'actions dans FilterBar

## 📚 Voir aussi

- [FilterBar.md](./FilterBar.md) - Documentation du composant parent
- [ProductSelector](./ProductSelector.jsx) - Composant avec design identique

## 🆕 Changelog

### Version 1.0 (Décembre 2024)
- ✅ Création du composant avec design harmonisé
- ✅ Responsive mobile-first (150px → 200px)
- ✅ Padding progressif (2.5 → 3 / 1.5 → 2)
- ✅ Typography adaptive (xs → sm)
- ✅ États hover et focus cohérents
- ✅ Support du label optionnel
- ✅ Documentation complète
