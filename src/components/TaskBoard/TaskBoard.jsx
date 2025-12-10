import { useState, useMemo, useEffect } from 'react';
import { CheckSquare, Clock, Eye, Lightbulb } from 'lucide-react';
import TaskDetail from '../TasksManagement/TaskDetail';
import TaskOutcomeBadge from '../TasksManagement/TaskOutcomeBadge';
import TaskOutcomeManager from '../TasksManagement/TaskOutcomeManager';
import { EmptyState, BoardCard, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';

/**
 * TaskBoard - Tableau Kanban des tâches techniques du sprint actif (v4.3.0)
 * Drag & Drop natif HTML5 + FilterBar standardisé
 */
const TaskBoard = ({ 
  tasks = [],
  userStories = [],
  sprints = [],
  contacts = [],
  teams = [],
  products = [],
  onUpdateTask,
  onNavigate,
  showTips = false,
  initialTaskId = null  // Ajout du paramètre pour ouvrir une tâche au chargement
}) => {
  const [viewingTask, setViewingTask] = useState(null);
  const [selectedSprintId, setSelectedSprintId] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [outcomeTask, setOutcomeTask] = useState(null);
  
  const [filterProduct, setFilterProduct] = useState('all');
  const [filterStory, setFilterStory] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const activeSprint = selectedSprintId 
    ? sprints?.find(s => s.id === selectedSprintId)
    : sprints?.find(s => s.status === 'active');

  useMemo(() => {
    if (!selectedSprintId && sprints && sprints.length > 0) {
      const activeSprintFound = sprints.find(s => s.status === 'active');
      if (activeSprintFound) {
        setSelectedSprintId(activeSprintFound.id);
      }
    }
  }, [sprints, selectedSprintId]);

  // Ouvrir automatiquement une tâche spécifique si initialTaskId est fourni
  useEffect(() => {
    if (initialTaskId && tasks && tasks.length > 0) {
      const taskToOpen = tasks.find(t => t.id === initialTaskId);
      if (taskToOpen) {
        setViewingTask(taskToOpen);
      }
    }
  }, [initialTaskId, tasks]);

  const sprintTasks = useMemo(() => {
    if (!activeSprint) return [];
    const sprintStoryIds = activeSprint.storyIds || [];
    return tasks.filter(t => 
      t.sprintId === activeSprint.id || 
      (t.userStoryId && sprintStoryIds.includes(t.userStoryId))
    );
  }, [tasks, activeSprint]);

  const filteredTasks = useMemo(() => {
    let filtered = [...sprintTasks];

    if (filterProduct !== 'all') {
      filtered = filtered.filter(t => {
        const story = userStories.find(s => s.id === t.userStoryId);
        return story?.productId === filterProduct;
      });
    }

    if (filterStory !== 'all') {
      filtered = filtered.filter(t => t.userStoryId === filterStory);
    }

    if (filterAssignee !== 'all') {
      filtered = filtered.filter(t => t.assignedTo === filterAssignee);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    return filtered;
  }, [sprintTasks, filterProduct, filterStory, filterAssignee, filterType, userStories]);

  const sprintStories = useMemo(() => {
    if (!activeSprint || !activeSprint.storyIds) return [];
    return userStories.filter(s => activeSprint.storyIds.includes(s.id));
  }, [userStories, activeSprint]);

  const filteredSprintStories = useMemo(() => {
    if (filterProduct === 'all') return sprintStories;
    return sprintStories.filter(s => s.productId === filterProduct);
  }, [sprintStories, filterProduct]);

  const sprintDevelopers = useMemo(() => {
    const developerIds = new Set(sprintTasks.map(t => t.assignedTo).filter(Boolean));
    return contacts.filter(c => developerIds.has(c.id) && c.type === 'internal');
  }, [sprintTasks, contacts]);

  const columns = useMemo(() => ({
    planned: {
      id: 'planned',
      title: '📋 À faire',
      tasks: filteredTasks.filter(t => t.status === 'planned'),
      color: 'border-blue-500 bg-blue-50'
    },
    inProgress: {
      id: 'inProgress',
      title: '🔄 En cours',
      tasks: filteredTasks.filter(t => t.status === 'inProgress'),
      color: 'border-orange-500 bg-orange-50'
    },
    outcome: {
      id: 'outcome',
      title: '🎯 Outcome',
      tasks: filteredTasks.filter(t => t.outcome || t.status === 'done'),
      color: 'border-purple-500 bg-purple-50',
      isOutcome: true
    }
  }), [filteredTasks]);

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact?.name || 'Non assigné';
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    
    if (!draggedTask) {
      setDraggedTask(null);
      return;
    }

    if (targetStatus === 'outcome') {
      setOutcomeTask(draggedTask);
      setDraggedTask(null);
      return;
    }

    if (draggedTask.outcome && targetStatus !== 'outcome') {
      onUpdateTask(draggedTask.id, { 
        status: targetStatus,
        outcome: null,
        outcomeReason: null,
        outcomeNote: null,
        outcomeDate: null
      });
    } else if (draggedTask.status !== targetStatus) {
      onUpdateTask(draggedTask.id, { status: targetStatus });
    }
    
    setDraggedTask(null);
  };

  const handleTaskClick = (task) => {
    setViewingTask(task);
  };

  const handleCloseDetail = () => {
    setViewingTask(null);
  };

  const handleEditFromDetail = (task) => {
    setViewingTask(null);
    sessionStorage.setItem('taskToEdit', JSON.stringify(task));
    onNavigate && onNavigate('tasks');
  };

  const handleResetFilters = () => {
    setFilterProduct('all');
    setFilterStory('all');
    setFilterAssignee('all');
    setFilterType('all');
  };

  const hasActiveFilters = filterProduct !== 'all' || filterStory !== 'all' || filterAssignee !== 'all' || filterType !== 'all';

  // États vides avec gestion intelligente des dépendances
  if (products.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <EmptyState
            icon={CheckSquare}
            message="Créez d'abord des produits pour constituer votre task board"
            description="Utilisez le menu de gauche pour accéder au module correspondant."
          />
        </div>
      </div>
    );
  }

  if (userStories.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <EmptyState
            icon={CheckSquare}
            message="Créez d'abord des User Stories pour constituer votre task board"
            description="Utilisez le menu de gauche pour accéder au module correspondant."
          />
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <EmptyState
            icon={CheckSquare}
            message="Créez d'abord des tâches pour constituer votre task board"
            description="Utilisez le menu de gauche pour accéder au module correspondant."
          />
        </div>
      </div>
    );
  }

  if (!activeSprint) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <EmptyState
            icon={CheckSquare}
            message="Aucun sprint actif"
            description="Activez un sprint existant depuis Sprints Management pour suivre vos tâches techniques quotidiennement."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {showTips && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg shadow-lg p-4 sm:p-5 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-200 rounded-lg">
                <Lightbulb size={24} className="text-yellow-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Conseils et astuces</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Organisation du travail quotidien</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Le <strong>Task Board</strong> affiche uniquement les tâches du <strong>sprint actif</strong></li>
                  <li>Glissez-déposez les tâches entre les colonnes pour mettre à jour leur statut</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* MODULE FILTRES */}
        <FilterBar
          isExpanded={isFiltersExpanded}
          onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
          topLeftContent={
            /* Sélecteur Produit - Toujours visible */
            <ProductSelector
              products={products}
              value={filterProduct}
              onChange={setFilterProduct}
              placeholder="Tous les produits"
              className="w-full sm:w-64"
            />
          }
          filters={
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Sprint</label>
                  <CustomSelect
                    value={selectedSprintId || ''}
                    onChange={(e) => setSelectedSprintId(e.target.value)}
                    options={sprints.map(sprint => ({
                      value: sprint.id,
                      label: sprint.name
                    }))}
                    aria-label="Sélectionner un sprint"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">User Story</label>
                  <CustomSelect
                    value={filterStory}
                    onChange={(e) => setFilterStory(e.target.value)}
                    options={[
                      { value: 'all', label: 'Toutes' },
                      ...filteredSprintStories.map(story => ({
                        value: story.id,
                        label: story.title
                      }))
                    ]}
                    aria-label="Filtrer par user story"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Développeur</label>
                  <CustomSelect
                    value={filterAssignee}
                    onChange={(e) => setFilterAssignee(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous' },
                      ...sprintDevelopers.map(dev => ({
                        value: dev.id,
                        label: dev.name
                      }))
                    ]}
                    aria-label="Filtrer par développeur"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type</label>
                  <CustomSelect
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous' },
                      { value: 'development', label: '💻 Développement' },
                      { value: 'testing', label: '🧪 Tests' },
                      { value: 'review', label: '👀 Revue' },
                      { value: 'deployment', label: '🚀 Déploiement' },
                      { value: 'documentation', label: '📚 Documentation' },
                      { value: 'other', label: '🔧 Autre' }
                    ]}
                    aria-label="Filtrer par type"
                  />
                </div>
              </div>
            </>
          }
        />

        {/* KANBAN BOARD */}
        <div className="mt-6">
        {filteredTasks.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            message="Aucune tâche ne correspond à vos critères de filtrage"
            onAction={handleResetFilters}
            actionLabel="Réinitialiser les filtres"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {Object.values(columns).map((column) => (
              <div key={column.id} className="flex flex-col" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.id)}>
                {/* En-tête avec couleur */}
                <div 
                  className={`rounded-t-lg px-3 sm:px-4 py-2 sm:py-3 shadow-md ${
                    column.id === 'planned' ? 'bg-blue-100' : 
                    column.id === 'inProgress' ? 'bg-orange-100' : 
                    'bg-purple-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">{column.title}</h3>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{column.tasks.length}</span>
                  </div>
                </div>
                {/* Corps avec couleur de fond claire */}
                <div 
                  className={`flex-1 rounded-b-lg p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 shadow-md overflow-y-auto ${
                    column.id === 'planned' ? 'bg-blue-50' : 
                    column.id === 'inProgress' ? 'bg-orange-50' : 
                    'bg-purple-50'
                  }`}
                  style={{
                    maxHeight: 'calc(100vh - 450px)',
                    minHeight: '300px'
                  }}
                >
                  {column.tasks.length === 0 ? (
                    <div className="text-center py-8 sm:py-10 md:py-12 text-gray-400 text-xs sm:text-sm">Aucune tâche</div>
                  ) : (
                    column.tasks.map((task) => {
                      const story = userStories.find(s => s.id === task.userStoryId);
                      const product = story?.productId ? products.find(p => p.id === story.productId) : null;
                      
                      // Badges
                      const badges = [];
                      if (product) {
                        badges.push(
                          <span key="product" className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold text-white" style={{ backgroundColor: product.color }}>
                            {product.code}
                          </span>
                        );
                      }
                      if (task.outcome) {
                        badges.push(<TaskOutcomeBadge key="outcome" outcome={task.outcome} size="small" />);
                      }
                      
                      // Actions
                      const actions = [
                        <button 
                          key="view"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleTaskClick(task); 
                          }} 
                          className="p-1.5 sm:p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      ];
                      
                      return (
                        <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task)} className="cursor-move">
                          <BoardCard
                            badges={badges}
                            actions={actions}
                          >
                            <div className="space-y-2">
                              <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">{task.title}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0 text-xs text-gray-600">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs sm:text-sm flex-shrink-0">👤</span>
                                  <span className="truncate max-w-[120px] sm:max-w-none">{getContactName(task.assignedTo)}</span>
                                </div>
                                {task.estimatedHours > 0 && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                    <span>{task.estimatedHours}h</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </BoardCard>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {viewingTask && <TaskDetail task={viewingTask} userStories={userStories} contacts={contacts} teams={teams} onEdit={handleEditFromDetail} onClose={handleCloseDetail} />}
      {outcomeTask && <TaskOutcomeManager task={outcomeTask} onUpdateOutcome={(taskId, outcomeData) => { onUpdateTask(taskId, outcomeData); setOutcomeTask(null); }} onClose={() => setOutcomeTask(null)} />}
    </div>
  );
};

export default TaskBoard;
