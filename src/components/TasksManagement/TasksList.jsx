import { useState, useEffect, useMemo } from 'react';
import { ListChecks, AlertCircle, Plus } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskDetail from './TaskDetail';
import TaskCard from './TaskCard';
import TaskOutcomeBadge from './TaskOutcomeBadge';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';

/**
 * TasksList - Module de gestion des tâches techniques (Scrum-compliant)
 * Version v4.5.0 : Intégration du composant FilterBar standardisé
 */
const TasksList = ({ 
  tasks = [], 
  userStories = [], 
  sprints = [], 
  contacts = [],
  teams = [],
  products = [],
  onAdd, 
  onUpdate, 
  onDelete,
  initialTaskId = null  // Ajout du paramètre pour ouvrir une tâche au chargement
}) => {
  const [filterProduct, setFilterProduct] = useState('all');
  const [filterSprint, setFilterSprint] = useState('all');
  const [filterStory, setFilterStory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [filterOutcome, setFilterOutcome] = useState('all');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;
  
  // États pour le formulaire et détail
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [prefilledStoryId, setPrefilledStoryId] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Vérifier si une tâche doit être éditée au chargement (depuis TaskBoard)
  useEffect(() => {
    const taskToEditJson = sessionStorage.getItem('taskToEdit');
    if (taskToEditJson) {
      try {
        const taskToEdit = JSON.parse(taskToEditJson);
        setEditingTask(taskToEdit);
        setShowForm(true);
        sessionStorage.removeItem('taskToEdit'); // Nettoyer après utilisation
      } catch (error) {
        console.error('Erreur lors de la récupération de la tâche à éditer:', error);
        sessionStorage.removeItem('taskToEdit');
      }
    }
  }, []);

  // Ouvrir automatiquement une tâche spécifique si initialTaskId est fourni (depuis Dashboard)
  useEffect(() => {
    if (initialTaskId && tasks && tasks.length > 0) {
      const taskToOpen = tasks.find(t => t.id === initialTaskId);
      if (taskToOpen) {
        setViewingTask(taskToOpen);
      }
    }
  }, [initialTaskId, tasks]);

  // Fonction pour obtenir le nom du contact assigné
  const getAssigneeName = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact?.name || 'Non assigné';
  };

  // Fonction pour obtenir le produit d'une story
  const getStoryProduct = (storyId) => {
    const story = userStories.find(s => s.id === storyId);
    if (!story || !story.productId) return null;
    return products.find(p => p.id === story.productId);
  };

  // Filtrage des tâches avec useMemo
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Filtre Produit
      let matchesProduct = filterProduct === 'all';
      if (!matchesProduct) {
        const story = userStories.find(s => s.id === task.userStoryId);
        matchesProduct = story?.productId === filterProduct;
      }
      
      // Filtre Sprint - basé sur storyIds du sprint
      let matchesSprint = filterSprint === 'all';
      if (!matchesSprint) {
        const sprint = sprints.find(s => s.id === filterSprint);
        if (sprint && sprint.storyIds) {
          matchesSprint = sprint.storyIds.includes(task.userStoryId);
        }
      }
      
      const matchesStory = filterStory === 'all' || task.userStoryId === filterStory;
      const matchesType = filterType === 'all' || task.type === filterType;
      const matchesAssignee = filterAssignee === 'all' || task.assignedTo === filterAssignee;
      const matchesOutcome = filterOutcome === 'all' || 
                            (filterOutcome === 'none' && !task.outcome) || 
                            task.outcome === filterOutcome;
      
      return matchesProduct && matchesSprint && matchesStory && matchesType && matchesAssignee && matchesOutcome;
    }).sort((a, b) => {
      // Tri : en cours > à faire > terminé, puis par date création décroissante
      const statusOrder = { inProgress: 0, todo: 1, done: 2 };
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, userStories, sprints, filterProduct, filterSprint, filterStory, filterType, filterAssignee, filterOutcome]);

  // Stories avec tâches vs sans tâches
  const storiesWithTasks = useMemo(() => {
    // Stories qui sont dans un sprint (via storyIds du sprint)
    const storiesInSprints = userStories.filter(story => 
      sprints.some(sprint => sprint.storyIds?.includes(story.id))
    );
    const withTasks = new Set(tasks.map(t => t.userStoryId));
    return {
      total: storiesInSprints.length,
      withTasks: storiesInSprints.filter(s => withTasks.has(s.id)).length,
      withoutTasks: storiesInSprints.filter(s => !withTasks.has(s.id)).length
    };
  }, [userStories, tasks, sprints]);

  // Pagination
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  // Réinitialiser la page lors du changement de filtre
  useMemo(() => {
    setCurrentPage(1);
  }, [filterProduct, filterSprint, filterStory, filterType, filterAssignee, filterOutcome]);

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilterProduct('all');
    setFilterSprint('all');
    setFilterStory('all');
    setFilterType('all');
    setFilterAssignee('all');
    setFilterOutcome('all');
  };

  const hasActiveFilters = filterProduct !== 'all' || filterSprint !== 'all' || filterStory !== 'all' || filterType !== 'all' || filterAssignee !== 'all' || filterOutcome !== 'all';

  const handleDelete = (task) => {
    const message = `Êtes-vous sûr de vouloir supprimer la tâche "${task.title}" ?`;
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer la tâche',
      message: message,
      onConfirm: () => {
        onDelete(task.id);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const handleAdd = () => {
    setEditingTask(null);
    setPrefilledStoryId(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setPrefilledStoryId(null);
    setViewingTask(null);
    setShowForm(true);
  };

  const handleView = (task) => {
    setViewingTask(task);
  };

  const handleCloseDetail = () => {
    setViewingTask(null);
  };

  const handleEditFromDetail = (task) => {
    setViewingTask(null);
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSave = (taskData) => {
    if (editingTask) {
      onUpdate(editingTask.id, taskData);
    } else {
      onAdd(taskData);
    }
    setShowForm(false);
    setEditingTask(null);
    setPrefilledStoryId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
    setPrefilledStoryId(null);
  };

  // Créer une tâche depuis une story
  const handleCreateTaskForStory = (storyId) => {
    setEditingTask(null);
    setPrefilledStoryId(storyId);
    setShowForm(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* État vide avec gestion intelligente des dépendances */}
        {products.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            message="Créez d'abord des produits pour constituer vos tâches"
            description="Utilisez le menu de gauche pour accéder au module correspondant."
          />
        ) : userStories.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            message="Créez d'abord des User Stories pour constituer vos tâches"
            description="Utilisez le menu de gauche pour accéder au module correspondant."
          />
        ) : tasks.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            message="Aucune tâche pour le moment"
            onAction={handleAdd}
            actionLabel="Créer votre première tâche"
          />
        ) : (
          <>
        {/* ALERTE : Stories sans tâches */}
        {storiesWithTasks.withoutTasks > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-amber-900 mb-1">
                  ⚠️ {storiesWithTasks.withoutTasks} User {storiesWithTasks.withoutTasks > 1 ? 'Stories' : 'Story'} sans tâches techniques
                </h3>
                <p className="text-sm text-amber-700 mb-3">
                  Ces stories sont dans un sprint mais n'ont pas encore été décomposées en tâches. C'est le moment du Sprint Planning !
                </p>
                <div className="space-y-2">
                  {userStories
                    .filter(s => {
                      // Vérifier si la story est dans un sprint (via storyIds)
                      const isInSprint = sprints.some(sprint => sprint.storyIds?.includes(s.id));
                      const hasTasks = tasks.some(t => t.userStoryId === s.id);
                      return isInSprint && !hasTasks;
                    })
                    .slice(0, 5)
                    .map(story => (
                      <div key={story.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-amber-200">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{story.title}</p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {story.estimation > 0 && `${story.estimation} pts • `}
                            Priorité : {story.priority === 'must' ? 'Must Have' : story.priority === 'should' ? 'Should Have' : story.priority === 'could' ? 'Could Have' : "Won't Have"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCreateTaskForStory(story.id)}
                          className="ml-3 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-1 shadow-sm"
                        >
                          <Plus size={16} />
                          Décomposer
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE FILTRES ET ACTIONS */}
        <FilterBar
          isExpanded={isFiltersExpanded}
          onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
          onAdd={handleAdd}
          addLabel="Nouvelle tâche"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          topLeftContent={
            /* Sélecteur Produit - Toujours visible */
            products.length > 0 && (
              <ProductSelector
                products={products.sort((a, b) => a.name.localeCompare(b.name))}
                value={filterProduct}
                onChange={setFilterProduct}
                placeholder="Tous les produits"
                className="w-full sm:w-64"
              />
            )
          }
          filters={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
              {/* Filtre Sprint */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sprint</label>
                <CustomSelect
                  value={filterSprint}
                  onChange={(e) => setFilterSprint(e.target.value)}
                  options={[
                    { value: 'all', label: 'Tous les sprints' },
                    ...sprints
                      .filter(sprint => {
                        if (filterProduct === 'all') return true;
                        return sprint.productId === filterProduct;
                      })
                      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                      .map(sprint => {
                        const product = products.find(p => p.id === sprint.productId);
                        const taskCount = tasks.filter(t => sprint.storyIds?.includes(t.userStoryId)).length;
                        return {
                          value: sprint.id,
                          label: `${sprint.name} ${product ? `[${product.code}]` : ''} (${taskCount} tâches)${sprint.status === 'active' ? ' 🟢' : ''}${sprint.status === 'completed' ? ' ✓' : ''}`
                        };
                      })
                  ]}
                  aria-label="Filtrer par sprint"
                />
              </div>

              {/* Filtre User Story */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Story</label>
                <CustomSelect
                  value={filterStory}
                  onChange={(e) => setFilterStory(e.target.value)}
                  options={[
                    { value: 'all', label: 'Toutes les stories' },
                    ...userStories
                      .filter(story => {
                        if (filterSprint === 'all') return true;
                        const sprint = sprints.find(s => s.id === filterSprint);
                        return sprint?.storyIds?.includes(story.id);
                      })
                      .map(story => {
                        const isInSprint = sprints.some(s => s.storyIds?.includes(story.id));
                        return {
                          value: story.id,
                          label: `${story.storyNumber ? `#${story.storyNumber} - ` : ''}${story.title}${isInSprint ? ' 🏃' : ''}`
                        };
                      })
                  ]}
                  aria-label="Filtrer par user story"
                />
              </div>

              {/* Filtre Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <CustomSelect
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  options={[
                    { value: 'all', label: 'Tous les types' },
                    { value: 'development', label: '💻 Développement' },
                    { value: 'testing', label: '🧪 Tests' },
                    { value: 'review', label: '👀 Revue de code' },
                    { value: 'deployment', label: '🚀 Déploiement' },
                    { value: 'documentation', label: '📚 Documentation' },
                    { value: 'other', label: '🔧 Autre' }
                  ]}
                  aria-label="Filtrer par type"
                />
              </div>

              {/* Filtre Assigné à */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigné à</label>
                <CustomSelect
                  value={filterAssignee}
                  onChange={(e) => setFilterAssignee(e.target.value)}
                  options={[
                    { value: 'all', label: 'Tous les collaborateurs' },
                    ...contacts.filter(c => c.type === 'internal').map(contact => ({
                      value: contact.id,
                      label: contact.name
                    }))
                  ]}
                  aria-label="Filtrer par assignation"
                />
              </div>

              {/* Filtre Outcome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outcome</label>
                <CustomSelect
                  value={filterOutcome}
                  onChange={(e) => setFilterOutcome(e.target.value)}
                  options={[
                    { value: 'all', label: 'Tous les outcomes' },
                    { value: 'none', label: 'Aucun (En cours normal)' },
                    { value: 'completed', label: '✅ Terminée' },
                    { value: 'paused', label: '⏸️ En pause' },
                    { value: 'blocked', label: '🚫 Bloquée' },
                    { value: 'cancelled', label: '❌ Annulée' },
                    { value: 'to_review', label: '🔍 À revoir' }
                  ]}
                  aria-label="Filtrer par outcome"
                />
              </div>
            </div>
          }
        />

        {/* LISTE DES TÂCHES SUR 3 COLONNES */}
        <div className="mt-6">
        {filteredTasks.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            message="Aucune tâche ne correspond à vos critères de filtrage"
            onAction={resetFilters}
            actionLabel="Réinitialiser les filtres"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {paginatedTasks.map(task => {
                const product = getStoryProduct(task.userStoryId);
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    product={product}
                    getAssigneeName={getAssigneeName}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                );
              })}
            </div>

            {/* PAGINATION */}
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredTasks.length}
              itemsPerPage={tasksPerPage}
              onPageChange={setCurrentPage}
              itemLabel="tâche"
            />
          </>
        )}
        </div>
          </>
        )}
      </div>

      {/* Formulaire de tâche */}
      {showForm && (
        <TaskForm
          task={editingTask}
          userStories={userStories}
          contacts={contacts}
          teams={teams}
          prefilledStoryId={prefilledStoryId}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Détail de tâche */}
      {viewingTask && (
        <TaskDetail
        task={viewingTask}
        userStories={userStories}
        contacts={contacts}
        onEdit={handleEditFromDetail}
        onClose={handleCloseDetail}
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

export default TasksList;
