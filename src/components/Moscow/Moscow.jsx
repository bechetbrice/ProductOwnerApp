import { useState, useMemo } from 'react';
import { User, ExternalLink, ListChecks, MessageSquare, Eye, Lightbulb, AlertCircle } from 'lucide-react';
import UserNeedForm from '../UserNeeds/UserNeedForm';
import UserNeedDetail from '../UserNeeds/UserNeedDetail';

import { EmptyState, BoardCard, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

/**
 * Moscow - Module Vue Priorités MoSCoW
 * Vue Kanban des besoins utilisateurs organisés par priorité
 */
const Moscow = ({ 
  userNeeds, 
  userStories, 
  contacts,
  personas,
  products,
  interviews = [],
  Objectives = [],
  onUpdateNeed,
  onCreateStory,
  onNavigate,
  showTips = false
}) => {
  const [productFilter, setProductFilter] = useState('all');
  const [stakeholderFilter, setStakeholderFilter] = useState('all');
  const [coverageFilter, setCoverageFilter] = useState('all');
  const [filterImportance, setFilterImportance] = useState('all');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [editingNeed, setEditingNeed] = useState(null);
  const [viewingNeed, setViewingNeed] = useState(null);

  // Configuration des colonnes de priorité
  const priorityColumns = [
    {
      id: 'critical',
      label: 'Critique',
      color: '#EF4444',
      bgColor: '#FEE2E2',
      borderColor: '#DC2626',
      icon: '🔴',
      description: 'À traiter en urgence'
    },
    {
      id: 'high',
      label: 'Haute',
      color: '#F97316',
      bgColor: '#FFEDD5',
      borderColor: '#EA580C',
      icon: '🟠',
      description: 'Priorité importante'
    },
    {
      id: 'medium',
      label: 'Moyenne',
      color: '#EAB308',
      bgColor: '#FEF9C3',
      borderColor: '#CA8A04',
      icon: '🟡',
      description: 'Priorité modérée'
    },
    {
      id: 'low',
      label: 'Basse',
      color: '#6B7280',
      bgColor: '#F3F4F6',
      borderColor: '#4B5563',
      icon: '⚪',
      description: 'Faible priorité'
    }
  ];

  const getLinkedStories = (needId) => {
    return userStories.filter(story => story.linkedNeedId === needId);
  };

  const getProduct = (productId) => {
    return products.find(p => p.id === productId);
  };

  const getLinkedPersona = (need) => {
    if (!need.personaId) return null;
    return personas.find(p => p.id === need.personaId);
  };

  const getSourceInterview = (needId) => {
    return interviews.find(interview => 
      interview.linkedNeedIds && interview.linkedNeedIds.includes(needId)
    );
  };

  const filteredNeeds = useMemo(() => {
    let filtered = userNeeds;

    if (productFilter !== 'all') {
      filtered = filtered.filter(need => need.productId === productFilter);
    }

    if (stakeholderFilter !== 'all') {
      filtered = filtered.filter(need => 
        (need.stakeholderIds && need.stakeholderIds.includes(stakeholderFilter)) ||
        need.primaryContactId === stakeholderFilter ||
        need.contactId === stakeholderFilter
      );
    }

    if (coverageFilter === 'with') {
      filtered = filtered.filter(need => getLinkedStories(need.id).length > 0);
    } else if (coverageFilter === 'without') {
      filtered = filtered.filter(need => getLinkedStories(need.id).length === 0);
    }

    if (filterImportance !== 'all') {
      filtered = filtered.filter(need => need.importance === filterImportance);
    }

    return filtered;
  }, [userNeeds, productFilter, stakeholderFilter, coverageFilter, filterImportance]);

  const needsByPriority = useMemo(() => {
    const grouped = { critical: [], high: [], medium: [], low: [] };

    filteredNeeds.forEach(need => {
      const priority = need.importance || 'medium';
      if (grouped[priority]) {
        grouped[priority].push(need);
      }
    });

    Object.keys(grouped).forEach(priority => {
      grouped[priority].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    });

    return grouped;
  }, [filteredNeeds]);

  const allStakeholders = useMemo(() => {
    const stakeholderIds = new Set();
    userNeeds.forEach(need => {
      if (need.stakeholderIds) {
        need.stakeholderIds.forEach(id => stakeholderIds.add(id));
      }
      if (need.primaryContactId) stakeholderIds.add(need.primaryContactId);
      if (need.contactId) stakeholderIds.add(need.contactId);
    });
    return Array.from(stakeholderIds).map(id => contacts.find(c => c.id === id)).filter(Boolean);
  }, [userNeeds, contacts]);

  const importanceConfig = {
    critical: { label: 'Critique', badgeClass: 'bg-red-100 text-red-800' },
    high: { label: 'Haute', badgeClass: 'bg-orange-100 text-orange-800' },
    medium: { label: 'Moyenne', badgeClass: 'bg-yellow-100 text-yellow-800' },
    low: { label: 'Basse', badgeClass: 'bg-gray-100 text-gray-800' }
  };

  // Card harmonisée avec BoardCard
  const NeedCard = ({ need }) => {
    const product = getProduct(need.productId);

    // Badges
    const badges = [];
    if (product) {
      badges.push(
        <span 
          key="product"
          className="inline-block px-2 py-1 rounded text-sm font-bold text-white truncate max-w-[80px] sm:max-w-none"
          style={{ backgroundColor: product.color }}
          title={product.name}
        >
          {product.code}
        </span>
      );
    }

    // Actions
    const actions = [
      <button
        key="view"
        onClick={(e) => {
          e.stopPropagation();
          setViewingNeed(need);
        }}
        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        title="Voir détails"
        aria-label={`Voir le besoin ${need.objective}`}
      >
        <Eye className="w-4 h-4" />
      </button>
    ];

    return (
      <BoardCard
        badges={badges}
        actions={actions}
      >
        <p className="text-xs sm:text-sm text-gray-900 line-clamp-3">
          {need.objective || 'Objectif non défini'}
        </p>
      </BoardCard>
    );
  };

  // Modal de visualisation détaillée
  const ViewNeedModal = ({ need, onClose }) => {
    if (!need) return null;

    const getContactById = (contactId) => {
      return contacts.find(c => c.id === contactId);
    };

    const getLinkedStories = (needId) => {
      return userStories.filter(story => story.linkedNeedId === needId);
    };

    const getSourceInterview = (needId) => {
      return interviews.find(interview => 
        interview.linkedNeedIds && interview.linkedNeedIds.includes(needId)
      );
    };

    return (
      <UserNeedDetail
        need={need}
        contacts={contacts}
        userStories={userStories}
        interviews={interviews}
        Objectives={Objectives}
        products={products}
        personas={personas}
        onClose={onClose}
        onEdit={(need) => {
          onClose();
          setEditingNeed(need);
        }}
        onNavigate={onNavigate || (() => {})}
        getContactById={getContactById}
        getLinkedStories={getLinkedStories}
        getSourceInterview={getSourceInterview}
      />
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {showTips && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-yellow-200 rounded-lg flex-shrink-0">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-700" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Conseils et astuces</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-indigo-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🎯 Méthode MoSCoW</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Critique</strong> (🔴) : bloquant, urgence absolue, sans ça le produit ne fonctionne pas</li>
                  <li><strong>Haute</strong> (🟠) : très importante, à traiter rapidement dans le prochain sprint</li>
                  <li><strong>Moyenne</strong> (🟡) : souhaitable mais peut attendre, valeur ajoutée modérée</li>
                  <li><strong>Basse</strong> (⚪) : nice-to-have, faible priorité, à faire si temps disponible</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🔍 Actions rapides</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Cliquez sur l'icône <strong>👁️</strong> pour voir les détails d'un besoin</li>
                  <li>Modifiez la priorité depuis le <strong>formulaire d'édition</strong></li>
                  <li>Réorganisez les besoins pendant les <strong>réunions d'équipe</strong></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">📊 Filtres puissants</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Filtrez par <strong>produit</strong> pour se concentrer sur un projet spécifique</li>
                  <li>Filtrez par <strong>stakeholder</strong> pour voir uniquement ses besoins</li>
                  <li>"<strong>Avec/Sans stories</strong>" pour identifier les besoins non couverts</li>
                  <li>Cliquez sur les <strong>cartes stats</strong> en haut pour filtrage rapide par priorité</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🔍 Identifier les gaps</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Utilisez le filtre <strong>"Sans stories"</strong> pour voir les besoins non traités</li>
                  <li>Priorisez la création de <strong>user stories</strong> pour les besoins critiques/hauts</li>
                  <li>Vérifiez régulièrement la <strong>couverture</strong> des besoins par des stories</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-yellow-500 lg:col-span-2">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">💡 Bonnes pratiques</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Revue de priorisation <strong>hebdomadaire</strong> avec l'équipe</li>
                  <li>Limitez les besoins critiques à <strong>10-15%</strong> maximum</li>
                  <li>Transformez les critiques en <strong>stories immédiatement</strong> et intégrez au sprint</li>
                </ul>
              </div>
            </div>
          </div>
        )}



        {/* Module Filtres (masqué si aucun besoin) */}
        {userNeeds.length > 0 && (
        <FilterBar
          isExpanded={isFiltersExpanded}
          onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
          hasActiveFilters={productFilter !== 'all' || stakeholderFilter !== 'all' || coverageFilter !== 'all' || filterImportance !== 'all'}
          onResetFilters={() => {
            setProductFilter('all');
            setStakeholderFilter('all');
            setCoverageFilter('all');
            setFilterImportance('all');
          }}
          topLeftContent={
            /* Sélecteur Produit - Toujours visible */
            products.length > 0 && (
              <ProductSelector
                products={products}
                value={productFilter}
                onChange={(productId) => setProductFilter(productId)}
                placeholder="Tous les produits"
                className="w-full sm:w-64"
              />
            )
          }
          filters={
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {/* Filtre Stakeholder */}
              {allStakeholders.length > 0 && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Stakeholder</label>
                  <CustomSelect
                    value={stakeholderFilter}
                    onChange={(e) => setStakeholderFilter(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous les stakeholders' },
                      ...allStakeholders.map(contact => ({
                        value: contact.id,
                        label: contact.name
                      }))
                    ]}
                    aria-label="Filtrer par stakeholder"
                  />
                </div>
              )}

              {/* Filtre Couverture Stories */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Couverture Stories</label>
                <CustomSelect
                  value={coverageFilter}
                  onChange={(e) => setCoverageFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'Tous' },
                    { value: 'with', label: 'Avec stories' },
                    { value: 'without', label: 'Sans stories' }
                  ]}
                  aria-label="Filtrer par couverture stories"
                />
              </div>
            </div>
          }
        />
        )}

        {filteredNeeds.length === 0 ? (
          (() => {
            // ÉTAPE 1: Vérifier les dépendances EN PREMIER
            const { canCreate, missingDependency } = checkModuleDependencies('userNeeds', {
              products: products.length
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
            if (userNeeds.length > 0) {
              return (
                <EmptyState
                  icon={AlertCircle}
                  message="Aucun besoin ne correspond à vos critères de filtrage"
                  onAction={() => {
                    setProductFilter('all');
                    setStakeholderFilter('all');
                    setCoverageFilter('all');
                    setFilterImportance('all');
                  }}
                  actionLabel="Réinitialiser les filtres"
                />
              );
            }
            
            // ÉTAPE 4: État vide normal
            return (
              <EmptyState
                icon={AlertCircle}
                message="Aucun besoin pour le moment"
                description="Créez d'abord des besoins pour les classer selon leur priorité."
              />
            );
          })()
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {priorityColumns.map(column => {
            const needs = needsByPriority[column.id] || [];
            const needsCount = needs.length;

            return (
              <div key={column.id} className="flex flex-col">
                <div className="rounded-t-lg p-3 sm:p-4 shadow-md" style={{ backgroundColor: column.bgColor }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xl sm:text-2xl">{column.icon}</span>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg">{column.label}</h3>
                    </div>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold text-white" style={{ backgroundColor: column.color }}>{needsCount}</span>
                  </div>
                  <p className="text-xs text-gray-600">{column.description}</p>
                </div>

                <div className="flex-1 rounded-b-lg shadow-md p-2 sm:p-3 space-y-2 sm:space-y-3 overflow-y-auto"
                  style={{ 
                    backgroundColor: column.bgColor,
                    maxHeight: 'calc(100vh - 450px)', 
                    minHeight: '300px'
                  }}>
                  {needs.length === 0 ? (
                    <div className="text-center py-6 sm:py-8 text-gray-400">
                      <p className="text-xs sm:text-sm">Aucun besoin</p>
                    </div>
                  ) : (
                    needs.map(need => <NeedCard key={need.id} need={need} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>

      {/* Modal de visualisation */}
      {viewingNeed && (
        <ViewNeedModal need={viewingNeed} onClose={() => setViewingNeed(null)} />
      )}

      {/* Modal d'édition */}
      {editingNeed && (
        <UserNeedForm 
          need={editingNeed} 
          contacts={contacts} 
          userStories={userStories} 
          products={products} 
          personas={personas}
          interviews={interviews}
          onSubmit={(formData) => { 
            onUpdateNeed(editingNeed.id, formData); 
            setEditingNeed(null); 
          }}
          onCancel={() => setEditingNeed(null)} 
          onNavigate={onNavigate} 
        />
      )}
    </div>
  );
};

export default Moscow;
