import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, CalendarRange } from 'lucide-react';
import SprintDetail from './SprintDetail';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination } from '../ui';
import { SprintFilters, SprintCard, SprintForm } from './index';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

const SprintTracking = ({ 
  sprints = [], 
  onAdd, 
  onUpdate, 
  onDelete,
  userStories = [],
  interviews = [],
  contacts = [],
  products = [],
  teamMembers = [],
  teams = [],
  initialFilters = {}
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSprint, setEditingSprint] = useState(null);
  const [viewingSprint, setViewingSprint] = useState(null);
  const [showTeamRequiredModal, setShowTeamRequiredModal] = useState(false);
  const [showShortSprintWarning, setShowShortSprintWarning] = useState(null);
  const [showInvalidDatesModal, setShowInvalidDatesModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false); // État pour l'aide du formulaire
  
  // États de filtrage
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProduct, setFilterProduct] = useState('all');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('startDate');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const sprintsPerPage = 9;
  
  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });
  
  // État du formulaire
  const [formData, setFormData] = useState({
    sprintNumber: '',
    name: '',
    goal: '',
    startDate: '',
    endDate: '',
    status: 'planned',
    storyIds: [],
    productId: '',
    teamId: ''
  });

  // Ouvrir automatiquement le modal de détails si un sprintId est passé dans les filtres
  useEffect(() => {
    if (initialFilters?.sprintId) {
      const sprint = sprints.find(s => s.id === initialFilters.sprintId);
      if (sprint) {
        setViewingSprint(sprint);
      }
    }
  }, [initialFilters, sprints]);

  // Pré-sélectionner le premier produit actif lors de l'ouverture du formulaire
  useEffect(() => {
    if (showForm && !editingSprint) {
      const defaultProduct = products.find(p => p.status === 'active');
      if (defaultProduct && !formData.productId) {
        setFormData(prev => ({ ...prev, productId: defaultProduct.id }));
      }
    }
  }, [showForm, editingSprint, products]);

  // Fonction pour ouvrir le formulaire (stable avec useCallback)
  const handleOpenForm = React.useCallback(() => {
    console.log('🔥 Opening sprint form via handleOpenForm...');
    setShowForm(true);
  }, []);

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      sprintNumber: '',
      name: '',
      goal: '',
      startDate: '',
      endDate: '',
      status: 'planned',
      storyIds: [],
      productId: '',
      teamId: ''
    });
    setEditingSprint(null);
    setShowForm(false);
  };

  // Charger un sprint pour édition
  const handleEdit = (sprint) => {
    setFormData({
      sprintNumber: sprint.sprintNumber || '',
      name: sprint.name || '',
      goal: sprint.goal || '',
      startDate: sprint.startDate || '',
      endDate: sprint.endDate || '',
      status: sprint.status || 'planned',
      storyIds: sprint.storyIds || [],
      productId: sprint.productId || '',
      teamId: sprint.teamId || ''
    });
    setEditingSprint(sprint);
    setShowForm(true);
  };

  // Gestion de la suppression avec confirmation
  const handleDelete = (sprint) => {
    const message = `Êtes-vous sûr de vouloir supprimer le sprint "${sprint.name}" ?`;
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer le sprint',
      message: message,
      onConfirm: () => {
        onDelete(sprint.id);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Le nom du sprint est obligatoire');
      return;
    }
    
    if (!formData.startDate || !formData.endDate) {
      alert('Les dates de début et de fin sont obligatoires');
      return;
    }
    
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (startDate > endDate) {
      setShowInvalidDatesModal(true);
      return;
    }
    
    // Validation Scrum : durée du sprint
    const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const maxDurationInDays = 28;
    const minRecommendedDays = 7;
    
    if (durationInDays > maxDurationInDays) {
      alert(`⚠️ Un sprint Scrum ne peut pas durer plus de 4 semaines (28 jours).\n\nDurée actuelle : ${durationInDays} jour${durationInDays > 1 ? 's' : ''}\n\nVeuillez ajuster les dates.`);
      return;
    }
    
    if (durationInDays < minRecommendedDays) {
      setShowShortSprintWarning({ durationInDays });
      return;
    }

    if (!formData.productId) {
      alert('Veuillez sélectionner un produit');
      return;
    }
    
    if (!formData.teamId) {
      setShowTeamRequiredModal(true);
      return;
    }
    
    if (editingSprint) {
      onUpdate(editingSprint.id, formData);
    } else {
      onAdd(formData);
    }
    
    resetForm();
  };

  // Basculer la sélection d'une story
  const toggleStory = (storyId) => {
    setFormData(prev => ({
      ...prev,
      storyIds: prev.storyIds.includes(storyId)
        ? prev.storyIds.filter(id => id !== storyId)
        : [...prev.storyIds, storyId]
    }));
  };

  // Calculer les statistiques d'un sprint
  const getSprintStats = (sprint) => {
    const stories = userStories.filter(s => sprint.storyIds.includes(s.id));
    const storiesCompleted = stories.filter(s => s.status === 'done').length;
    const totalPoints = stories.length;
    const completedPoints = storiesCompleted;
    const progressPercentage = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;
    
    return {
      totalStories: stories.length,
      completedStories: storiesCompleted,
      progressPercentage
    };
  };

  // Filtrer les sprints en fonction de la plage de dates
  const filterByDateRange = (sprint) => {
    if (filterDateRange === 'all') return true;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(sprint.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(sprint.endDate);
    endDate.setHours(0, 0, 0, 0);
    
    switch (filterDateRange) {
      case 'current':
        return startDate <= today && endDate >= today;
      case 'upcoming':
        return startDate > today;
      case 'past':
        return endDate < today;
      default:
        return true;
    }
  };

  // Filtrer et trier les sprints avec useMemo pour optimisation
  const filteredAndSortedSprints = useMemo(() => {
    let filtered = [...sprints];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }

    if (filterProduct !== 'all') {
      filtered = filtered.filter(s => s.productId === filterProduct);
    }

    if (filterTeam !== 'all') {
      filtered = filtered.filter(s => s.teamId === filterTeam);
    }

    filtered = filtered.filter(filterByDateRange);

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'startDate':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'endDate':
          return new Date(a.endDate) - new Date(b.endDate);
        case 'progress': {
          const progressA = getSprintStats(a).progressPercentage;
          const progressB = getSprintStats(b).progressPercentage;
          return progressB - progressA;
        }
        default:
          if (a.status === 'active' && b.status !== 'active') return -1;
          if (a.status !== 'active' && b.status === 'active') return 1;
          return new Date(b.startDate) - new Date(a.startDate);
      }
    });

    return filtered;
  }, [sprints, filterStatus, filterProduct, filterTeam, filterDateRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedSprints.length / sprintsPerPage);
  const startIndex = (currentPage - 1) * sprintsPerPage;
  const endIndex = startIndex + sprintsPerPage;
  const paginatedSprints = filteredAndSortedSprints.slice(startIndex, endIndex);

  // Réinitialiser la page lors du changement de filtre
  useMemo(() => {
    setCurrentPage(1);
  }, [filterStatus, filterProduct, filterTeam, filterDateRange, sortBy]);

  // Réinitialiser tous les filtres
  const handleResetFilters = () => {
    setFilterStatus('all');
    setFilterProduct('all');
    setFilterTeam('all');
    setFilterDateRange('all');
    setSortBy('startDate');
  };

  const hasActiveFilters = filterStatus !== 'all' || filterProduct !== 'all' || filterTeam !== 'all' || filterDateRange !== 'all' || sortBy !== 'startDate';

  // Import CSV des sprints
  const handleImportCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          alert('Le fichier CSV est vide ou invalide');
          return;
        }
        
        const dataLines = lines.slice(1);
        const importedSprints = [];
        const errors = [];
        
        dataLines.forEach((line, index) => {
          try {
            const values = [];
            let inQuotes = false;
            let currentValue = '';
            
            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
              } else {
                currentValue += char;
              }
            }
            values.push(currentValue.trim());
            
            if (values.length < 6) {
              errors.push(`Ligne ${index + 2}: Nombre de colonnes insuffisant`);
              return;
            }
            
            const [name, productInfo, goal, startDate, endDate, statusLabel] = values;
            
            if (!name || !startDate || !endDate) {
              errors.push(`Ligne ${index + 2}: Nom, date début ou date fin manquant`);
              return;
            }
            
            let productId = '';
            if (productInfo) {
              const productMatch = productInfo.match(/\[([^\]]+)\]/);
              if (productMatch) {
                const productCode = productMatch[1];
                const product = products.find(p => p.code === productCode);
                if (product) {
                  productId = product.id;
                }
              }
            }
            
            let status = 'planned';
            if (statusLabel) {
              const statusLower = statusLabel.toLowerCase();
              if (statusLower.includes('cours') || statusLower === 'en cours') {
                status = 'active';
              } else if (statusLower.includes('termin') || statusLower === 'terminé') {
                status = 'completed';
              }
            }
            
            importedSprints.push({
              name: name.replace(/^"|"$/g, ''),
              productId: productId,
              goal: goal.replace(/^"|"$/g, ''),
              startDate: startDate,
              endDate: endDate,
              status: status,
              storyIds: [],
              teamId: ''
            });
          } catch (err) {
            errors.push(`Ligne ${index + 2}: Erreur de parsing - ${err.message}`);
          }
        });
        
        if (errors.length > 0) {
          const showErrors = confirm(
            `${errors.length} erreur(s) détectée(s):\n${errors.slice(0, 5).join('\n')}${errors.length > 5 ? '\n...' : ''}\n\nVoulez-vous importer les sprints valides (${importedSprints.length}) ?`
          );
          if (!showErrors) return;
        }
        
        if (importedSprints.length === 0) {
          alert('Aucun sprint valide trouvé dans le fichier');
          return;
        }
        
        importedSprints.forEach(sprint => {
          onAdd(sprint);
        });
        
        alert(`✅ ${importedSprints.length} sprint(s) importé(s) avec succès !${errors.length > 0 ? `\n⚠️ ${errors.length} ligne(s) ignorée(s)` : ''}`);
      } catch (err) {
        console.error('Erreur lors de l\'import CSV:', err);
        alert('Erreur lors de la lecture du fichier CSV');
      }
    };
    
    input.click();
  };

  // Export CSV des sprints
  const handleExportCSV = () => {
    const getStatusLabel = (status) => {
      switch (status) {
        case 'planned': return 'Planifié';
        case 'active': return 'En cours';
        case 'completed': return 'Terminé';
        default: return 'Inconnu';
      }
    };

    const csv = [
      ['Nom', 'Produit', 'Objectif', 'Date début', 'Date fin', 'Statut', 'Stories totales', 'Stories complétées', 'Progression (%)'].join(','),
      ...filteredAndSortedSprints.map(sprint => {
        const stats = getSprintStats(sprint);
        const product = products.find(p => p.id === sprint.productId);
        return [
          `"${sprint.name || ''}"`,
          product ? `"[${product.code}] ${product.name}"` : '',
          `"${sprint.goal || ''}"`,
          sprint.startDate || '',
          sprint.endDate || '',
          getStatusLabel(sprint.status),
          stats.totalStories,
          stats.completedStories,
          stats.progressPercentage
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sprints-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Statistiques retirées pour simplification
  // Conservé uniquement sprintsByStatus pour SprintFilters
  const sprintsByStatus = {
    planned: sprints.filter(s => s.status === 'planned').length,
    active: sprints.filter(s => s.status === 'active').length,
    completed: sprints.filter(s => s.status === 'completed').length
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* 🔥 COMPOSANT EXTRACTÉ : SprintForm - Placé en dehors de toutes les conditions */}
        {showForm && (
          <SprintForm
            formData={formData}
            setFormData={setFormData}
            editingSprint={editingSprint}
            products={products}
            teams={teams}
            userStories={userStories}
            sprints={sprints}
            showHelp={showHelp}
            setShowHelp={setShowHelp}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            toggleStory={toggleStory}
          />
        )}

        {/* États vides */}
        {(() => {
          // ÉTAPE 1: Vérifier les dépendances EN PREMIER
          const { canCreate, missingDependency } = checkModuleDependencies('sprints', {
            products: products.length,
            teams: teams.length,
            userStories: userStories.length
          });
          
          // ÉTAPE 2: Dépendance manquante - PRIORITAIRE
          if (!canCreate && missingDependency) {
            return (
              <EmptyState
                icon={CalendarRange}
                message={missingDependency.message}
                description="Utilisez le menu de gauche pour accéder au module correspondant."
              />
            );
          }
          
          // ÉTAPE 3: Filtres actifs
          if (filteredAndSortedSprints.length === 0 && sprints.length > 0) {
            return (
              <EmptyState
                icon={CalendarRange}
                message="Aucun sprint ne correspond à vos critères de filtrage"
                onAction={handleResetFilters}
                actionLabel="Réinitialiser les filtres"
              />
            );
          }
          
          // ÉTAPE 4: État vide normal
          if (sprints.length === 0) {
            return (
              <EmptyState
                icon={CalendarRange}
                message="Aucun sprint pour le moment"
                onAction={handleOpenForm}
                actionLabel="Créer votre premier sprint"
              />
            );
          }
          
          // ÉTAPE 5: Affichage normal
          return (
            <>

            {/* 🔥 COMPOSANT EXTRACTÉ : SprintFilters */}
            <SprintFilters
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterProduct={filterProduct}
              setFilterProduct={setFilterProduct}
              filterTeam={filterTeam}
              setFilterTeam={setFilterTeam}
              filterDateRange={filterDateRange}
              setFilterDateRange={setFilterDateRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isFiltersExpanded={isFiltersExpanded}
              setIsFiltersExpanded={setIsFiltersExpanded}
              filteredCount={filteredAndSortedSprints.length}
              totalCount={sprints.length}
              products={products}
              teams={teams}
              sprintsByStatus={sprintsByStatus}
              onResetFilters={handleResetFilters}
              onImport={handleImportCSV}
              onExport={handleExportCSV}
              onAdd={() => setShowForm(true)}
            />

            {/* Grille des sprints */}
            {filteredAndSortedSprints.length === 0 ? (
              <EmptyState
                icon={CalendarRange}
                message="Aucun sprint ne correspond à vos critères de filtrage"
                onAction={handleResetFilters}
                actionLabel="Réinitialiser les filtres"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                  {paginatedSprints.map((sprint) => {
                    const stats = getSprintStats(sprint);
                    const product = products.find(p => p.id === sprint.productId);
                    const team = teams.find(t => t.id === sprint.teamId);
                    
                    const today = new Date();
                    const startDate = new Date(sprint.startDate);
                    const endDate = new Date(sprint.endDate);
                    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
                    const isOverdue = daysRemaining < 0;
                    const isEndingSoon = daysRemaining >= 0 && daysRemaining <= 3;
                    
                    const totalDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                    const elapsed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
                    const timeProgress = sprint.status === 'completed' ? 100 : Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

                    return (
                      <SprintCard
                        key={sprint.id}
                        sprint={sprint}
                        stats={stats}
                        product={product}
                        team={team}
                        timeProgress={timeProgress}
                        totalDuration={totalDuration}
                        daysRemaining={daysRemaining}
                        isOverdue={isOverdue}
                        isEndingSoon={isEndingSoon}
                        onView={() => setViewingSprint(sprint)}
                        onEdit={() => handleEdit(sprint)}
                        onDelete={() => handleDelete(sprint)}
                      />
                    );
                  })}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredAndSortedSprints.length}
                  itemsPerPage={sprintsPerPage}
                  onPageChange={setCurrentPage}
                  itemLabel="sprint"
                />
              </>
            )}
          </>
          );
        })()}
      </div>

      {/* Modal de détails du sprint */}
      {viewingSprint && (
        <SprintDetail
          sprint={viewingSprint}
          userStories={userStories}
          interviews={interviews}
          contacts={contacts}
          products={products}
          teams={teams}
          onClose={() => setViewingSprint(null)}
          onEdit={handleEdit}
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

      {/* Modal équipe requise */}
      {showTeamRequiredModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-3 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-full sm:max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-lg font-bold text-orange-900">
                  Équipe requise
                </h2>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-sm text-gray-700">
                Veuillez sélectionner une équipe responsable du sprint avant de continuer.
              </p>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  💡 L'équipe assignée au sprint sera automatiquement appliquée aux stories ajoutées.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
              <button
                onClick={() => setShowTeamRequiredModal(false)}
                className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                OK, j'ai compris
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal sprint très court */}
      {showShortSprintWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-3 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-full sm:max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-yellow-100">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-lg font-bold text-yellow-900">
                  Sprint très court
                </h2>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-sm text-gray-700 mb-3">
                Votre sprint ne dure que <strong>{showShortSprintWarning.durationInDays} jour{showShortSprintWarning.durationInDays > 1 ? 's' : ''}</strong>.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <p className="text-xs text-blue-800">
                  💡 <strong>Recommandation Scrum :</strong> La durée recommandée est de 1 à 4 semaines (7 à 28 jours).
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  ⚠️ Un sprint trop court peut ne pas permettre de livrer de la valeur incrémentale.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
              <button
                onClick={() => setShowShortSprintWarning(null)}
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setShowShortSprintWarning(null);
                  if (!formData.productId) {
                    alert('Veuillez sélectionner un produit');
                    return;
                  }
                  if (!formData.teamId) {
                    setShowTeamRequiredModal(true);
                    return;
                  }
                  if (editingSprint) {
                    onUpdate(editingSprint.id, formData);
                  } else {
                    onAdd(formData);
                  }
                  resetForm();
                }}
                className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Continuer quand même
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal dates invalides */}
      {showInvalidDatesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-3 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-full sm:max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-100">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-red-900">
                  Dates invalides
                </h2>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-sm text-gray-700 mb-3">
                La date de fin doit être postérieure à la date de début.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  💡 Veuillez ajuster vos dates pour que le sprint ait une durée cohérente.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
              <button
                onClick={() => setShowInvalidDatesModal(false)}
                className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                OK, j'ai compris
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintTracking;
