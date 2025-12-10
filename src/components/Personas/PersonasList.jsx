import { useState, useEffect, useMemo } from 'react';
import { usePreferences } from '../../contexts/PreferencesContext';
import { Users } from 'lucide-react';
import PersonaForm from './PersonaForm';
import PersonaCard from './PersonaCard';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, VirtualizedList, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

const PersonasList = ({ 
  personas, 
  contacts, 
  userNeeds,
  userStories,
  interviews,
  products,
  Objectives = [],
  onAdd, 
  onUpdate, 
  onDelete,
  onView,
  initialFilters = {},
  showTips = false
}) => {
  const { preferences } = usePreferences();
  const [showForm, setShowForm] = useState(false);
  const [editingPersona, setEditingPersona] = useState(null);
  const [filterPrimary, setFilterPrimary] = useState('all');
  const [filterProduct, setFilterProduct] = useState(initialFilters.productId || 'all');
  const [filterTechLevel, setFilterTechLevel] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const personasPerPage = 500; // Virtualisation active au-delà de 20 items
  
  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Appliquer les filtres initiaux
  useEffect(() => {
    if (initialFilters.productId) {
      setFilterProduct(initialFilters.productId);
    }
    if (initialFilters.primary !== undefined) {
      setFilterPrimary(initialFilters.primary);
    }
  }, [initialFilters]);

  // Liste des produits actifs pour le filtre
  const activeProducts = useMemo(() => {
    return products.filter(p => p.status === 'active');
  }, [products]);

  // Filtrage des personas
  const filteredPersonas = useMemo(() => {
    return personas.filter(persona => {
      // Filtre type (primary/secondary)
      if (filterPrimary !== 'all') {
        if (filterPrimary === 'primary' && !persona.isPrimary) return false;
        if (filterPrimary === 'secondary' && persona.isPrimary) return false;
      }

      // Filtre produit
      if (filterProduct !== 'all') {
        if (persona.productId !== filterProduct) return false;
      }

      // Filtre niveau technique
      if (filterTechLevel !== 'all') {
        if (persona.techLevel !== filterTechLevel) return false;
      }

      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [personas, filterPrimary, filterProduct, filterTechLevel]);

  // Pagination
  const totalPages = Math.ceil(filteredPersonas.length / personasPerPage);
  const startIndex = (currentPage - 1) * personasPerPage;
  const endIndex = startIndex + personasPerPage;
  const paginatedPersonas = filteredPersonas.slice(startIndex, endIndex);

  // Grouper personas par lignes de 3 pour virtualisation grid
  const personaRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < paginatedPersonas.length; i += 3) {
      rows.push(paginatedPersonas.slice(i, i + 3));
    }
    return rows;
  }, [paginatedPersonas]);

  // Réinitialiser la page lors du changement de filtre
  useMemo(() => {
    setCurrentPage(1);
  }, [filterPrimary, filterProduct, filterTechLevel]);

  const handleEdit = (persona) => {
    setEditingPersona(persona);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingPersona(null);
    setShowForm(true);
  };

  const handleSubmit = (personaData) => {
    if (editingPersona) {
      onUpdate(editingPersona.id, personaData);
    } else {
      onAdd(personaData);
    }
    setShowForm(false);
    setEditingPersona(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPersona(null);
  };

  const handleDelete = (persona) => {
    // Compter les relations
    const relatedNeeds = userNeeds?.filter(n => n.personaIds?.includes(persona.id)).length || 0;
    const relatedStories = userStories?.filter(s => s.personaId === persona.id).length || 0;
    const relatedContacts = persona.linkedContactIds?.length || 0;
    const relatedInterviews = persona.linkedInterviewIds?.length || 0;
    
    const hasRelations = relatedNeeds > 0 || relatedStories > 0 || relatedContacts > 0 || relatedInterviews > 0;
    
    let message = `Êtes-vous sûr de vouloir supprimer le persona "${persona.name}" ?`;
    
    if (hasRelations) {
      message += '\n\nCe persona est lié à :';
      if (relatedNeeds > 0) message += `\n• ${relatedNeeds} besoin${relatedNeeds > 1 ? 's' : ''}`;
      if (relatedStories > 0) message += `\n• ${relatedStories} user stor${relatedStories > 1 ? 'ies' : 'y'}`;
      if (relatedContacts > 0) message += `\n• ${relatedContacts} contact${relatedContacts > 1 ? 's' : ''}`;
      if (relatedInterviews > 0) message += `\n• ${relatedInterviews} entretien${relatedInterviews > 1 ? 's' : ''}`;
      message += '\n\nCes relations seront supprimées.';
    }
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer le persona',
      message: message,
      onConfirm: () => {
        onDelete(persona.id);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilterPrimary('all');
    setFilterProduct('all');
    setFilterTechLevel('all');
  };

  const hasActiveFilters = filterPrimary !== 'all' || filterProduct !== 'all' || filterTechLevel !== 'all';

  const getTechLevelBadge = (level) => {
    const badges = {
      novice: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Débutant' },
      intermediate: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Intermédiaire' },
      expert: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Expert' }
    };
    const badge = badges[level] || badges.intermediate;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const getUsageFrequencyBadge = (frequency) => {
    const badges = {
      daily: { bg: 'bg-green-100', text: 'text-green-800', label: 'Quotidien' },
      weekly: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Hebdomadaire' },
      monthly: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Mensuel' },
      occasional: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Occasionnel' }
    };
    const badge = badges[frequency] || badges.weekly;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  if (showForm) {
    return (
      <PersonaForm
        persona={editingPersona}
        contacts={contacts}
        userNeeds={userNeeds}
        interviews={interviews}
        products={products}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* BARRE DE FILTRES ET ACTIONS */}
        {personas.length > 0 && (
          <FilterBar
            isExpanded={isFiltersExpanded}
            onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
            onAdd={handleAdd}
            addLabel="Nouveau Persona"
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
            topLeftContent={
              /* Sélecteur Produit - Toujours visible */
              activeProducts.length > 0 && (
                <ProductSelector
                  products={activeProducts}
                  value={filterProduct}
                  onChange={setFilterProduct}
                  placeholder="Tous les produits"
                  className="w-full sm:w-64"
                />
              )
            }
            filters={
              <>
                {/* Filtre Type */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type</label>
                  <CustomSelect
                    value={filterPrimary}
                    onChange={(e) => setFilterPrimary(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous les types' },
                      { value: 'primary', label: '⭐ Primaires' },
                      { value: 'secondary', label: '👤 Secondaires' }
                    ]}
                    aria-label="Filtrer par type de persona"
                  />
                </div>

                {/* Filtre Niveau Technique */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Niveau Technique</label>
                  <CustomSelect
                    value={filterTechLevel}
                    onChange={(e) => setFilterTechLevel(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous les niveaux' },
                      { value: 'novice', label: 'Débutant' },
                      { value: 'intermediate', label: 'Intermédiaire' },
                      { value: 'expert', label: 'Expert' }
                    ]}
                    aria-label="Filtrer par niveau technique"
                  />
                </div>
              </>
            }
          />
        )}

        {/* LISTE DES PERSONAS */}
        {filteredPersonas.length === 0 ? (
          (() => {
            // ÉTAPE 1: Comptage des produits ACTIFS uniquement
            const activeProductsCount = products.filter(p => p.status === 'active').length;
            const { canCreate, missingDependency } = checkModuleDependencies('personas', {
              products: activeProductsCount
            });
            
            // ÉTAPE 2: Dépendance manquante - PRIORITAIRE
            if (!canCreate && missingDependency) {
              return (
                <EmptyState
                  icon={Users}
                  message={missingDependency.message}
                  description="Utilisez le menu de gauche pour accéder au module correspondant."
                />
              );
            }
            
            // ÉTAPE 3: Filtres actifs
            if (personas.length > 0) {
              return (
                <EmptyState
                  icon={Users}
                  message="Aucun persona ne correspond à vos critères de filtrage"
                  onAction={resetFilters}
                  actionLabel="Réinitialiser les filtres"
                />
              );
            }
            
            // ÉTAPE 4: État vide normal
            return (
              <EmptyState
                icon={Users}
                message="Aucun persona pour le moment"
                onAction={handleAdd}
                actionLabel="Créer votre premier persona"
              />
            );
          })()
        ) : (
          <div className="mt-6 space-y-4 md:space-y-6">
            {/* Liste virtualisée des personas */}
            <VirtualizedList
              items={personaRows}
              itemHeight={170}
              height={Math.min(window.innerHeight - 300, personaRows.length * 170)}
              renderItem={({ item: row, style }) => (
                <div 
                  key={row[0].id} 
                  style={{ ...style, paddingBottom: '1.5rem' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {row.map(persona => (
                      <PersonaCard
                        key={persona.id}
                        persona={persona}
                        products={products}
                        onView={() => onView(persona)}
                        onEdit={() => handleEdit(persona)}
                        onDelete={() => handleDelete(persona)}
                      />
                    ))}
                  </div>
                </div>
              )}
            />
            {/* Pagination - Désactivée avec virtualisation */}
          </div>
        )}
      </div>
      
      {/* Modale de confirmation */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null })}
      />
    </div>
  );
};

export default PersonasList;
