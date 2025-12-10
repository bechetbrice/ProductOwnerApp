import { useState, useEffect, useMemo } from 'react';
import { AlertCircle, Lightbulb } from 'lucide-react';
import UserNeedForm from './UserNeedForm';
import UserNeedDetail from './UserNeedDetail';
import UserNeedCard from './UserNeedCard';
import { CONTACT_TYPES } from '../../utils/constants';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, VirtualizedList, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

const UserNeedsList = ({ 
  userNeeds, 
  userStories, 
  contacts, 
  interviews = [],
  Objectives = [],
  products = [],
  personas = [],
  onAdd, 
  onUpdate, 
  onDelete, 
  prefilledData, 
  onClearPrefilled,
  onNavigate,
  initialFilters = {},
  showTips = false
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNeed, setEditingNeed] = useState(null);
  const [viewingNeed, setViewingNeed] = useState(null);
  const [filterImportance, setFilterImportance] = useState(initialFilters.importance || 'all');
  const [filterClient, setFilterClient] = useState('all');
  const [filterContact, setFilterContact] = useState('all');
  const [filterEffort, setFilterEffort] = useState('all');
  const [productFilter, setProductFilter] = useState(initialFilters.productId || 'all');
  const [specificIdFilter, setSpecificIdFilter] = useState(initialFilters.specificId || null);
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const needsPerPage = 500; // Virtualisation active au-delà de 20 items
  
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  useEffect(() => {
    if (prefilledData && !isFormOpen) {
      setEditingNeed({ ...prefilledData, isNew: true });
      setIsFormOpen(true);
    }
  }, [prefilledData]);

  useEffect(() => {
    if (initialFilters.importance) setFilterImportance(initialFilters.importance);
    if (initialFilters.productId) setProductFilter(initialFilters.productId);
    if (initialFilters.specificId) setSpecificIdFilter(initialFilters.specificId);
  }, [initialFilters]);

  const allStakeholderIds = [...new Set(userNeeds.flatMap(need => need.stakeholderIds || []))];
  const contactsWithNeeds = [...new Set(userNeeds.flatMap(need => [
    ...(need.stakeholderIds || []),
    need.primaryContactId,
    need.contactId
  ]).filter(Boolean))];

  const filteredNeeds = useMemo(() => {
    let filtered = userNeeds;

    if (specificIdFilter) {
      filtered = userNeeds.filter(need => need.id === specificIdFilter);
      return filtered;
    }

    filtered = filtered.filter(need => {
      const matchImportance = filterImportance === 'all' || need.importance === filterImportance;
      const matchProduct = productFilter === 'all' || need.productId === productFilter;
      const matchEffort = filterEffort === 'all' || 
        (filterEffort === '' && !need.storyPoints && !need.effort) ||
        (filterEffort && need.storyPoints && need.storyPoints.toString() === filterEffort) ||
        (filterEffort && need.effort === filterEffort);
      
      const matchContact = filterContact === 'all' || 
        (need.stakeholderIds && need.stakeholderIds.includes(filterContact)) ||
        need.primaryContactId === filterContact ||
        need.contactId === filterContact;
      
      return matchImportance && matchProduct && matchEffort && matchContact;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'importance') {
        const order = { critical: 0, high: 1, medium: 2, low: 3 };
        return (order[a.importance] || 2) - (order[b.importance] || 2);
      }
      if (sortBy === 'effort') {
        const aValue = a.storyPoints || (a.effort === 'high' ? 100 : a.effort === 'medium' ? 50 : a.effort === 'low' ? 10 : 0);
        const bValue = b.storyPoints || (b.effort === 'high' ? 100 : b.effort === 'medium' ? 50 : b.effort === 'low' ? 10 : 0);
        return bValue - aValue;
      }
      if (sortBy === 'client') {
        const aStakeholder = (a.stakeholderIds && a.stakeholderIds[0]) 
          ? contacts.find(c => c.id === a.stakeholderIds[0])?.name || a.client || ''
          : a.client || '';
        const bStakeholder = (b.stakeholderIds && b.stakeholderIds[0])
          ? contacts.find(c => c.id === b.stakeholderIds[0])?.name || b.client || ''
          : b.client || '';
        return aStakeholder.localeCompare(bStakeholder);
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return filtered;
  }, [userNeeds, filterImportance, productFilter, filterEffort, filterClient, filterContact, specificIdFilter, sortBy]);

  const totalPages = Math.ceil(filteredNeeds.length / needsPerPage);
  const startIndex = (currentPage - 1) * needsPerPage;
  const endIndex = startIndex + needsPerPage;
  const paginatedNeeds = filteredNeeds.slice(startIndex, endIndex);

  // Grouper besoins par lignes de 3 pour virtualisation grid
  const needRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < paginatedNeeds.length; i += 3) {
      rows.push(paginatedNeeds.slice(i, i + 3));
    }
    return rows;
  }, [paginatedNeeds]);

  useMemo(() => {
    setCurrentPage(1);
  }, [filterImportance, productFilter, filterEffort, filterClient, filterContact, sortBy]);

  const handleResetFilters = () => {
    setFilterImportance('all');
    setFilterClient('all');
    setFilterContact('all');
    setFilterEffort('all');
    setProductFilter('all');
    setSpecificIdFilter(null);
    setSortBy('date');
  };

  const hasActiveFilters = 
    filterImportance !== 'all' || 
    filterClient !== 'all' || 
    filterContact !== 'all' || 
    filterEffort !== 'all' || 
    productFilter !== 'all' || 
    sortBy !== 'date';

  const getLinkedStories = (needId) => {
    return userStories.filter(story => story.linkedNeedId === needId);
  };

  const getContactById = (contactId) => {
    return contacts.find(c => c.id === contactId);
  };

  const getSourceInterview = (needId) => {
    return interviews.find(interview => 
      interview.linkedNeedIds && interview.linkedNeedIds.includes(needId)
    );
  };

  const handleSubmit = (needData) => {
    if (editingNeed && !editingNeed.isNew) {
      onUpdate(editingNeed.id, needData);
    } else {
      onAdd(needData);
    }
    setIsFormOpen(false);
    setEditingNeed(null);
    if (onClearPrefilled) {
      onClearPrefilled();
    }
  };

  const handleEdit = (need) => {
    setEditingNeed(need);
    setIsFormOpen(true);
  };

  const handleDelete = (need) => {
    const relatedStories = userStories?.filter(s => s.linkedNeedId === need.id).length || 0;
    const relatedInterviews = interviews?.filter(i => 
      i.linkedNeedIds && i.linkedNeedIds.includes(need.id)
    ).length || 0;
    
    const hasRelations = relatedStories > 0 || relatedInterviews > 0;
    
    let message = `Supprimer le besoin "${need.Objectives || 'Sans objectif'}" ?`;
    
    if (hasRelations) {
      message += '\n\nLié à :';
      if (relatedStories > 0) message += `\n• ${relatedStories} story/ies`;
      if (relatedInterviews > 0) message += `\n• ${relatedInterviews} entretien(s)`;
    }
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer le besoin',
      message: message,
      onConfirm: () => {
        onDelete(need.id);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const handleNavigate = (entity, id) => {
    if (onNavigate) {
      onNavigate(entity, id);
    }
  };

  const importanceConfig = {
    critical: { label: 'Critique', badgeClass: 'bg-red-100 text-red-800', color: '#EF4444' },
    high: { label: 'Haute', badgeClass: 'bg-orange-100 text-orange-800', color: '#F97316' },
    medium: { label: 'Moyenne', badgeClass: 'bg-yellow-100 text-yellow-800', color: '#EAB308' },
    low: { label: 'Basse', badgeClass: 'bg-green-100 text-green-800', color: '#22C55E' }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* Conseils - RESPONSIVE */}
        {showTips && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg shadow-lg p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-200 rounded-lg">
                <Lightbulb size={20} className="md:w-6 md:h-6 text-yellow-700" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Conseils</h3>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white rounded-lg p-3 md:p-4 border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">🎯 Identification</h4>
                <ul className="text-xs md:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Proviennent des <strong>entretiens utilisateurs</strong></li>
                  <li>Formulez l'<strong>objectif</strong> clairement</li>
                  <li>Décrivez le <strong>contexte</strong></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 md:p-4 border-l-4 border-emerald-500">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">👥 Stakeholders</h4>
                <ul className="text-xs md:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Tous les stakeholders</strong> concernés</li>
                  <li><strong>Contact privilégié</strong> pour validation</li>
                  <li>Associez aux <strong>personas</strong></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* BARRE DE FILTRES ET ACTIONS */}
        {userNeeds.length > 0 && (
          <FilterBar
            isExpanded={isFiltersExpanded}
            onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
            onAdd={() => setIsFormOpen(true)}
            addLabel="Nouveau Besoin"
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
            topLeftContent={
              /* Sélecteur Produit - Toujours visible */
              products.length > 0 && (
                <ProductSelector
                  products={products}
                  value={productFilter}
                  onChange={(productId) => setProductFilter(productId)}
                  placeholder="Tous les produits"
                  className="w-full sm:w-64"
                  showCount={true}
                  getCount={(productId) => userNeeds.filter(n => n.productId === productId).length}
                />
              )
            }
            filters={
              <>
                {/* Filtre Contact */}
                {contactsWithNeeds.length > 0 && (
                  <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <CustomSelect
                      value={filterContact}
                      onChange={(e) => setFilterContact(e.target.value)}
                      options={[
                        { value: 'all', label: 'Tous les contacts' },
                        ...contactsWithNeeds.map(contactId => {
                          const contact = getContactById(contactId);
                          return contact ? {
                            value: contactId,
                            label: contact.name
                          } : null;
                        }).filter(Boolean)
                      ]}
                      aria-label="Filtrer par contact"
                    />
                  </div>
                )}

                {/* Filtre Importance */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Importance</label>
                  <CustomSelect
                    value={filterImportance}
                    onChange={(e) => setFilterImportance(e.target.value)}
                    options={[
                      { value: 'all', label: 'Toutes les importances' },
                      { value: 'critical', label: 'Critique' },
                      { value: 'high', label: 'Haute' },
                      { value: 'medium', label: 'Moyenne' },
                      { value: 'low', label: 'Basse' }
                    ]}
                    aria-label="Filtrer par importance"
                  />
                </div>

                {/* Filtre Story Points */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Story Points</label>
                  <CustomSelect
                    value={filterEffort}
                    onChange={(e) => setFilterEffort(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous les story points' },
                      { value: '1', label: '1 pt' },
                      { value: '2', label: '2 pts' },
                      { value: '3', label: '3 pts' },
                      { value: '5', label: '5 pts' },
                      { value: '8', label: '8 pts' },
                      { value: '13', label: '13 pts' },
                      { value: '21', label: '21 pts' },
                      { value: '', label: 'Non estimé' }
                    ]}
                    aria-label="Filtrer par story points"
                  />
                </div>

                {/* Boutons de tri */}
                <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
                  <button
                    onClick={() => setSortBy('date')}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      sortBy === 'date' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title="Trier par date"
                  >
                    Date
                  </button>
                  <button
                    onClick={() => setSortBy('importance')}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      sortBy === 'importance' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title="Trier par importance"
                  >
                    Importance
                  </button>
                  <button
                    onClick={() => setSortBy('effort')}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      sortBy === 'effort' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title="Trier par complexité"
                  >
                    Complexité
                  </button>
                  <button
                    onClick={() => setSortBy('client')}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      sortBy === 'client' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title="Trier par stakeholder"
                  >
                    Stakeholder
                  </button>
                </div>
              </>
            }
          />
        )}

        {/* GRILLE CARDS - RESPONSIVE */}
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
                  onAction={handleResetFilters}
                  actionLabel="Réinitialiser les filtres"
                />
              );
            }
            
            // ÉTAPE 4: État vide normal
            return (
              <EmptyState
                icon={AlertCircle}
                message="Aucun besoin pour le moment"
                onAction={() => setIsFormOpen(true)}
                actionLabel="Créer votre premier besoin"
              />
            );
          })()
        ) : (
          <div className="mt-6 space-y-4 md:space-y-6">
            {/* Liste virtualisée des besoins */}
            <VirtualizedList
              items={needRows}
              itemHeight={150}
              height={Math.min(window.innerHeight - 300, needRows.length * 150)}
              renderItem={({ item: row, style }) => (
                <div 
                  key={row[0].id} 
                  style={{ ...style, paddingBottom: '1.5rem' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {row.map(need => (
                      <UserNeedCard
                        key={need.id}
                        need={need}
                        products={products}
                        personas={personas}
                        importanceConfig={importanceConfig}
                        getContactById={getContactById}
                        getLinkedStories={getLinkedStories}
                        onView={() => setViewingNeed(need)}
                        onEdit={() => handleEdit(need)}
                        onDelete={() => handleDelete(need)}
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

      {isFormOpen && (
        <UserNeedForm
          need={editingNeed}
          contacts={contacts}
          userStories={userStories}
          interviews={interviews}
          Objectives={Objectives}
          products={products}
          personas={personas}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingNeed(null);
            if (onClearPrefilled) {
              onClearPrefilled();
            }
          }}
          onNavigate={handleNavigate}
        />
      )}

      {viewingNeed && (
        <UserNeedDetail
          need={viewingNeed}
          contacts={contacts}
          userStories={userStories}
          interviews={interviews}
          Objectives={Objectives}
          products={products}
          personas={personas}
          onClose={() => setViewingNeed(null)}
          onEdit={handleEdit}
          onNavigate={handleNavigate}
          getContactById={getContactById}
          getLinkedStories={getLinkedStories}
          getSourceInterview={getSourceInterview}
        />
      )}
      
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

export default UserNeedsList;
