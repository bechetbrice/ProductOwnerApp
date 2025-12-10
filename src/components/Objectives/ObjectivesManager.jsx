import { useState, useMemo } from 'react';
import { Plus, Target, Edit2, Trash2, Search, Filter, Calendar, Clock, CheckCircle2, XCircle, Archive, Eye, FileText, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import ObjectiveForm from './ObjectiveForm';
import ObjectiveDetail from './ObjectiveDetail';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, VirtualizedList, CustomSelect } from '../ui';
import { CardHeader } from '../ui/Card/index';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

const ObjectivesManager = ({ 
  objectives,
  products,
  userNeeds,
  userStories,
  onAdd,
  onUpdate,
  onDelete,
  initialFilters = {}
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingObjective, setEditingObjective] = useState(null);
  const [viewingObjective, setViewingObjective] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(initialFilters.productId || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const objectivesPerPage = 500; // Virtualisation active au-delà de 20 items
  
  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Gestion des objectifs
  const handleAdd = () => {
    setEditingObjective(null);
    setShowForm(true);
  };

  const handleEdit = (objective) => {
    setEditingObjective(objective);
    setShowForm(true);
  };

  const handleSave = (objectiveData) => {
    if (editingObjective) {
      onUpdate(editingObjective.id, objectiveData);
    } else {
      onAdd(objectiveData);
    }
    setShowForm(false);
    setEditingObjective(null);
  };

  const handleDelete = (objectiveId) => {
    const objective = objectives.find(g => g.id === objectiveId);
    
    // Compter les relations
    const relatedNeeds = userNeeds?.filter(n => n.linkedGoalId === objectiveId).length || 0;
    const relatedStories = userStories?.filter(s => s.linkedGoalId === objectiveId).length || 0;
    
    const hasRelations = relatedNeeds > 0 || relatedStories > 0;
    
    let message = `Êtes-vous sûr de vouloir supprimer l'objectif "${objective?.title}" ?`;
    
    if (hasRelations) {
      message += '\n\nCet objectif est lié à :';
      if (relatedNeeds > 0) message += `\n• ${relatedNeeds} besoin${relatedNeeds > 1 ? 's' : ''} utilisateur${relatedNeeds > 1 ? 's' : ''}`;
      if (relatedStories > 0) message += `\n• ${relatedStories} user stor${relatedStories > 1 ? 'ies' : 'y'}`;
      message += '\n\nCes relations seront supprimées.';
    }
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer l\'objectif',
      message: message,
      onConfirm: () => {
        onDelete(objectiveId);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  // Filtrage et tri des objectifs
  const filteredObjectives = useMemo(() => {
    // Filtrer d'abord les objectifs invalides
    let filtered = (objectives || []).filter(objective => objective && objective.title).filter(objective => {
      const matchesProduct = selectedProductId === 'all' || objective.productId === selectedProductId;
      const matchesSearch = objective.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (objective.description && objective.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || objective.status === statusFilter;
      return matchesProduct && matchesSearch && matchesStatus;
    });

    // Tri
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      if (sortBy === 'priority') {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); // date
    });

    return filtered;
  }, [objectives, selectedProductId, searchTerm, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredObjectives.length / objectivesPerPage);
  const startIndex = (currentPage - 1) * objectivesPerPage;
  const endIndex = startIndex + objectivesPerPage;
  const paginatedObjectives = filteredObjectives.slice(startIndex, endIndex);

  // Grouper objectifs par lignes de 3 pour virtualisation grid
  const objectiveRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < paginatedObjectives.length; i += 3) {
      rows.push(paginatedObjectives.slice(i, i + 3));
    }
    return rows;
  }, [paginatedObjectives]);

  // Réinitialiser la page lors du changement de filtre
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedProductId, searchTerm, statusFilter, sortBy]);

  // Réinitialiser les filtres
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSelectedProductId('all');
    setSortBy('date');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'planned': return 'Planifié';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      case 'archived': return 'Archivé';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'planned': return <Clock size={14} />;
      case 'active': return <CheckCircle2 size={14} />;
      case 'completed': return <CheckCircle2 size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      case 'archived': return <Archive size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'critical': return 'Critique';
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  // Vérifier si un objectif est en retard
  const isOverdue = (objective) => {
    if (!objective.targetDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(objective.targetDate);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate < today && objective.status !== 'completed' && objective.status !== 'cancelled';
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || selectedProductId !== 'all' || sortBy !== 'date';

  return (
    <div className="flex-1 overflow-auto bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* BARRE DE FILTRES ET ACTIONS */}
        {objectives && objectives.length > 0 && (
          <FilterBar
            isExpanded={isFiltersExpanded}
            onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
            onAdd={handleAdd}
            addLabel="Nouvel Objectif"
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
            topLeftContent={
              /* Sélecteur Produit - Toujours visible */
              products && products.length > 0 && (
                <ProductSelector
                  products={products.filter(p => p.status === 'active').sort((a, b) => a.name.localeCompare(b.name))}
                  value={selectedProductId}
                  onChange={(productId) => setSelectedProductId(productId)}
                  placeholder="Tous les produits"
                  className="w-full sm:w-64"
                  showCount={true}
                  getCount={(productId) => objectives.filter(g => g.productId === productId).length}
                />
              )
            }
            topRightContent={
              /* Barre de recherche - Toujours visible */
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher par titre, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
            }
            filters={
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {/* Filtre Statut */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <CustomSelect
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous les statuts' },
                      { value: 'planned', label: 'Planifiés' },
                      { value: 'active', label: 'Actifs' },
                      { value: 'completed', label: 'Terminés' },
                      { value: 'cancelled', label: 'Annulés' },
                      { value: 'archived', label: 'Archivés' }
                    ]}
                    aria-label="Filtrer par statut"
                  />
                </div>

                {/* Filtre Tri */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Trier par</label>
                  <CustomSelect
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    options={[
                      { value: 'date', label: 'Date de création' },
                      { value: 'name', label: 'Nom' },
                      { value: 'status', label: 'Statut' },
                      { value: 'priority', label: 'Priorité' }
                    ]}
                    aria-label="Trier les objectifs"
                  />
                </div>
              </div>
            }
          />
        )}

        {/* Content */}
        <div>
          {(() => {
            // Vérifier d'abord les dépendances (produits ACTIFS requis)
            const activeProductsCount = products.filter(p => p.status === 'active').length;
            const { canCreate, missingDependency } = checkModuleDependencies('objectives', {
              products: activeProductsCount
            });
            
            // État vide avec dépendance manquante - PRIORITAIRE
            if (!canCreate && missingDependency) {
              return (
                <EmptyState
                  icon={Target}
                  message={missingDependency.message}
                  description="Utilisez le menu de gauche pour accéder au module correspondant."
                />
              );
            }
            
            // État vide avec filtres actifs
            if (filteredObjectives.length === 0 && objectives && objectives.length > 0) {
              return (
                <EmptyState
                  icon={Target}
                  message="Aucun objectif ne correspond à vos critères de recherche"
                  onAction={handleResetFilters}
                  actionLabel="Réinitialiser les filtres"
                />
              );
            }
            
            // État vide normal - pas d'objectifs
            if (filteredObjectives.length === 0) {
              return (
                <EmptyState
                  icon={Target}
                  message="Aucun objectif pour le moment"
                  onAction={handleAdd}
                  actionLabel="Créer votre premier objectif"
                />
              );
            }
            
            // Affichage normal avec objectifs
            return (
            <>
              <VirtualizedList
                items={objectiveRows}
                itemHeight={190}
                height={Math.min(window.innerHeight - 300, objectiveRows.length * 190)}
                renderItem={({ item: row, style }) => (
                  <div 
                    key={row[0].id} 
                    style={style}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2"
                  >
                    {row.map(objective => {
                      const product = products.find(p => p.id === objective.productId);
                      const objectiveIsOverdue = isOverdue(objective);
                      
                      return (
                        <div
                          key={objective.id}
                          className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full"
                        >
                          {/* Header standardisé - UNIQUEMENT le titre */}
                          <CardHeader title={objective.title} />

                          {/* Corps de la carte */}
                          <div className="p-5 flex-1 space-y-3">
                            {/* Objectif avec emoji 🎯 et label en gras */}
                            {objective.description && (
                              <div className="text-sm">
                                <p className="text-gray-700 font-medium mb-1">
                                  🎯 Objectif
                                </p>
                                <p className="text-gray-600">
                                  {objective.description}
                                </p>
                              </div>
                            )}

                            {/* Date d'échéance */}
                            {objective.targetDate && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="flex-shrink-0">📅</span>
                                <span className="text-gray-600">Date d'échéance :</span>
                                <span className={objectiveIsOverdue ? 'text-red-600 font-semibold' : 'text-indigo-600'}>
                                  {new Date(objective.targetDate).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                            {/* Badges à gauche */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {/* Badge produit */}
                              {product && (
                                <span 
                                  className="px-2 py-1 rounded text-xs font-bold text-white inline-block"
                                  style={{ backgroundColor: product.color }}
                                  title={product.name}
                                >
                                  {product.code}
                                </span>
                              )}
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(objective.status)}`}>
                                {getStatusIcon(objective.status)}
                                {getStatusLabel(objective.status)}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(objective.priority)}`}>
                                {getPriorityLabel(objective.priority)}
                              </span>
                              {objectiveIsOverdue && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                  ⚠️ Retard
                                </span>
                              )}
                            </div>

                            {/* Boutons à droite */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => setViewingObjective(objective)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Voir détails"
                                aria-label={`Voir l'objectif ${objective.title}`}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(objective)}
                                className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                title="Modifier"
                                aria-label={`Modifier l'objectif ${objective.title}`}
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(objective.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                                aria-label={`Supprimer l'objectif ${objective.title}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              />

              {/* Pagination - Désactivée avec virtualisation */}
            </>
            );
          })()}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <ObjectiveForm
          objective={editingObjective}
          userNeeds={userNeeds}
          userStories={userStories}
          products={products}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingObjective(null);
          }}
        />
      )}

      {/* Modal Detail */}
      {viewingObjective && (
        <ObjectiveDetail
          objective={viewingObjective}
          product={products.find(p => p.id === viewingObjective.productId)}
          userNeeds={userNeeds}
          userStories={userStories}
          onClose={() => setViewingObjective(null)}
          onEdit={(objective) => {
            setViewingObjective(null);
            handleEdit(objective);
          }}
          onNavigate={(view, filters) => {
            console.log('Navigate to', view, filters);
          }}
        />
      )}
      
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

export default ObjectivesManager;
