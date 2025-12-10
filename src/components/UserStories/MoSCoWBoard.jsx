import { useState, useMemo, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import MoSCoWColumn from './MoSCoWColumn';
import StoryDetailModal from './StoryDetailModal';
import UserStoryForm from './UserStoryForm';
import { EmptyState, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';

import { checkModuleDependencies } from '../../utils/moduleDependencies';

/**
 * MoSCoWBoard - Vue MoSCoW enrichie avec recherche et filtres (v3.2.3)
 */
const MoSCoWBoard = ({ 
  userStories, 
  userNeeds,
  contacts,
  products,
  Objectives,
  interviews = [],
  personas = [],
  teamMembers = [],
  teams = [],
  onAddStory,
  onUpdateStory,
  onDeleteStory,
  onNavigate,
  prefilledData,
  onClearPrefilled,
  productFilter,
  setProductFilter,
  statusFilter,
  setStatusFilter,
  specificIdFilter,
  setSpecificIdFilter,
  showTips = false
}) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  useEffect(() => {
    if (prefilledData && !isFormOpen) {
      setEditingStory({ ...prefilledData, isNew: true });
      setIsFormOpen(true);
    }
  }, [prefilledData]);

  // Configuration colonnes MoSCoW
  const moscowColumns = [
    {
      id: 'must',
      label: 'Must Have',
      description: 'Indispensable pour cette version',
      icon: '🔴',
      color: '#EF4444',
      bgColor: '#FEE2E2',
      borderColor: '#DC2626',
      maxRecommended: 60
    },
    {
      id: 'should',
      label: 'Should Have',
      description: 'Important mais contournable',
      icon: '🟠',
      color: '#F97316',
      bgColor: '#FFEDD5',
      borderColor: '#EA580C',
      maxRecommended: 20
    },
    {
      id: 'could',
      label: 'Could Have',
      description: 'Souhaitable si possible',
      icon: '🟡',
      color: '#EAB308',
      bgColor: '#FEF9C3',
      borderColor: '#CA8A04',
      maxRecommended: 20
    },
    {
      id: 'wont',
      label: "Won't Have",
      description: 'Exclu de cette version',
      icon: '⚪',
      color: '#9CA3AF',
      bgColor: '#F3F4F6',
      borderColor: '#6B7280',
      maxRecommended: null
    }
  ];

  // Filtrer et grouper stories
  const storiesByPriority = useMemo(() => {
    let filtered = userStories;

    // Filtre ID spécifique (depuis navigation)
    if (specificIdFilter) {
      filtered = filtered.filter(s => s.id === specificIdFilter);
    } else {
      // Filtre produit
      if (productFilter && productFilter !== 'all') {
        filtered = filtered.filter(s => s.productId === productFilter);
      }

      // Filtre statut
      if (statusFilter && statusFilter !== 'all') {
        filtered = filtered.filter(s => s.status === statusFilter);
      }
    }

    // Grouper par priorité
    const grouped = {
      must: filtered.filter(s => s.priority === 'must'),
      should: filtered.filter(s => s.priority === 'should'),
      could: filtered.filter(s => s.priority === 'could'),
      wont: filtered.filter(s => s.priority === 'wont')
    };

    // Trier par date création décroissante dans chaque colonne
    Object.keys(grouped).forEach(priority => {
      grouped[priority].sort((a, b) => 
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    });

    return grouped;
  }, [userStories, productFilter, statusFilter, specificIdFilter]);



  const handleResetFilters = () => {
    setProductFilter('all');
    setStatusFilter('all');
    setSpecificIdFilter(null);
  };

  const hasActiveFilters = productFilter !== 'all' || statusFilter !== 'all';

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const handleEdit = (story) => {
    setSelectedStory(null); // Fermer le modal de détail
    setEditingStory(story);
    setIsFormOpen(true);
  };

  const handleSubmit = (storyData) => {
    if (editingStory && !editingStory.isNew) {
      onUpdateStory(editingStory.id, storyData);
    } else {
      onAddStory(storyData);
    }
    setIsFormOpen(false);
    setEditingStory(null);
    if (onClearPrefilled) {
      onClearPrefilled();
    }
  };

  const totalStories = Object.values(storiesByPriority).flat().length;

  return (
    <div className="space-y-6">
      {/* État vide */}
      {(() => {
        // ÉTAPE 1: Vérifier les dépendances avec pattern officiel
        const activeProductsCount = products.filter(p => p.status === 'active').length;
        const { canCreate, missingDependency } = checkModuleDependencies('userStories', {
          products: activeProductsCount
        });
        
        // ÉTAPE 2: Dépendance manquante - PRIORITAIRE
        if (!canCreate && missingDependency) {
          return (
            <EmptyState
              icon={AlertCircle}
              message={missingDependency.message}
              description="Utilisez le menu de gauche pour accéder au module correspondant."
            />
          );
        }
        
        // ÉTAPE 3: Filtres actifs
        const totalFilteredStories = Object.values(storiesByPriority).flat().length;
        if (totalFilteredStories === 0 && userStories.length > 0) {
          return (
            <EmptyState
              icon={AlertCircle}
              message="Aucune user story ne correspond à vos critères de filtrage"
              onAction={handleResetFilters}
              actionLabel="Réinitialiser les filtres"
            />
          );
        }
        
        // ÉTAPE 4: État vide normal
        if (userStories.length === 0) {
          return (
            <EmptyState
              icon={AlertCircle}
              message="Aucune user story pour le moment"
              onAction={() => {
                setEditingStory(null);
                setIsFormOpen(true);
              }}
              actionLabel="Créer votre première user story"
            />
          );
        }
        
        // ÉTAPE 5: Affichage normal
        return (
          <>
      {/* BARRE DE FILTRES ET ACTIONS */}
      <FilterBar
        isExpanded={isFiltersExpanded}
        onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
        onAdd={() => {
          setEditingStory(null);
          setIsFormOpen(true);
        }}
        addLabel="Nouvelle Story"
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
        topLeftContent={
          /* Sélecteur Produit - Toujours visible */
          products.length > 0 && (
            <ProductSelector
              products={products}
              value={productFilter}
              onChange={setProductFilter}
              placeholder="Tous les produits"
              className="w-full sm:w-64"
            />
          )
        }
        filters={
          <>
            {/* Filtre Statut */}
            <CustomSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Tous les statuts' },
                { value: 'todo', label: 'À faire' },
                { value: 'inProgress', label: 'En cours' },
                { value: 'done', label: 'Terminées' }
              ]}
              aria-label="Filtrer par statut"
            />
          </>
        }
      />



      {/* Grille 4 colonnes MoSCoW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6">
        {moscowColumns.map(column => {
          const stories = storiesByPriority[column.id] || [];

          return (
            <MoSCoWColumn
              key={column.id}
              column={column}
              stories={stories}
              products={products}
              onStoryClick={handleStoryClick}
              onEdit={handleEdit}
              onDelete={onDeleteStory}
            />
          );
        })}
      </div>
          </>
        );
      })()}

      {/* Modal détail story */}
      {selectedStory && (
        <StoryDetailModal
          story={selectedStory}
          userNeeds={userNeeds}
          contacts={contacts}
          products={products}
          Objectives={Objectives}
          teams={teams}
          onClose={() => setSelectedStory(null)}
          onEdit={handleEdit}
          onNavigate={onNavigate}
        />
      )}

      {/* Formulaire création/édition */}
      {isFormOpen && (
        <UserStoryForm
          story={editingStory}
          userNeeds={userNeeds}
          userStories={userStories}
          products={products}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingStory(null);
            if (onClearPrefilled) {
              onClearPrefilled();
            }
          }}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};

export default MoSCoWBoard;
