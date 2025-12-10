import { useState, useMemo } from 'react';
import { Target, Clock, RefreshCw } from 'lucide-react';
import SprintBoardCard from './SprintBoardCard';
import StoryDetailModal from '../UserStories/StoryDetailModal';
import UserStoryOutcomeManager from '../UserStories/UserStoryOutcomeManager';
import { EmptyState, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';

/**
 * SprintBoard - Tableau Kanban du sprint actif (v4.3.0)
 * Drag & Drop natif HTML5 + FilterBar standardisé
 */
const SprintBoard = ({ 
  sprints = [], 
  userStories = [], 
  userNeeds = [],
  contacts = [], 
  products = [],
  Objectives = [],
  interviews = [],
  personas = [],
  teamMembers = [],
  teams = [],
  onUpdateStory,
  onNavigate
}) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedSprintId, setSelectedSprintId] = useState(null);
  const [draggedStory, setDraggedStory] = useState(null);
  const [outcomeStory, setOutcomeStory] = useState(null); // Story pour laquelle on définit l'outcome
  
  // États de filtrage
  const [filterProduct, setFilterProduct] = useState('all');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  // Trouver le sprint actif ou sélectionné
  const activeSprint = selectedSprintId 
    ? sprints?.find(s => s.id === selectedSprintId)
    : sprints?.find(s => s.status === 'active');

  // Initialiser avec le sprint actif au chargement
  useMemo(() => {
    if (!selectedSprintId && sprints && sprints.length > 0) {
      const activeSprintFound = sprints.find(s => s.status === 'active');
      if (activeSprintFound) {
        setSelectedSprintId(activeSprintFound.id);
      }
    }
  }, [sprints, selectedSprintId]);

  // Filtrer les stories du sprint actif
  const sprintStories = activeSprint && activeSprint.storyIds
    ? userStories.filter(s => activeSprint.storyIds.includes(s.id))
    : [];

  // Appliquer les filtres
  const filteredStories = useMemo(() => {
    let filtered = [...sprintStories];

    if (filterProduct !== 'all') {
      filtered = filtered.filter(s => s.productId === filterProduct);
    }

    return filtered;
  }, [sprintStories, filterProduct]);

  // Grouper par statut (3 colonnes : À faire, En cours, Outcome)
  const columns = useMemo(() => ({
    planned: {
      id: 'planned',
      title: '🔋 À faire',
      stories: filteredStories.filter(s => (s.status === 'planned' || s.status === 'todo' || s.status === 'unassigned') && !s.outcome),
      color: 'border-blue-500 bg-blue-50'
    },
    inProgress: {
      id: 'inProgress',
      title: '🔄 En cours',
      stories: filteredStories.filter(s => s.status === 'inProgress' && !s.outcome),
      color: 'border-orange-500 bg-orange-50'
    },
    outcome: {
      id: 'outcome',
      title: '🎯 Outcome',
      stories: filteredStories.filter(s => s.outcome || s.status === 'done'),
      color: 'border-purple-500 bg-purple-50',
      isOutcome: true
    }
  }), [filteredStories]);

  // Statistiques pour la progression du sprint
  const totalStories = sprintStories.length;
  const doneStories = sprintStories.filter(s => s.status === 'done').length;
  const progressPercentage = totalStories > 0 ? Math.round((doneStories / totalStories) * 100) : 0;

  const totalPoints = sprintStories.reduce((sum, s) => sum + (s.estimation || 0), 0);
  const donePoints = sprintStories.filter(s => s.status === 'done').reduce((sum, s) => sum + (s.estimation || 0), 0);

  // Drag & Drop natif HTML5
  const handleDragStart = (e, story) => {
    setDraggedStory(story);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    
    if (!draggedStory) {
      setDraggedStory(null);
      return;
    }

    // Si on dépose dans la colonne Outcome, ouvrir le modal
    if (targetStatus === 'outcome') {
      setOutcomeStory(draggedStory);
      setDraggedStory(null);
      return;
    }

    // Si la story a un outcome et qu'on la déplace hors de Outcome, on retire l'outcome
    if (draggedStory.outcome && targetStatus !== 'outcome') {
      onUpdateStory(draggedStory.id, { 
        status: targetStatus,
        outcome: null,
        outcomeReason: null,
        outcomeNote: null,
        outcomeDate: null
      });
    } else if (draggedStory.status !== targetStatus) {
      onUpdateStory(draggedStory.id, { status: targetStatus });
    }
    
    setDraggedStory(null);
  };

  // Ouvrir détail story
  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  // Fermer détail
  const handleCloseDetail = () => {
    setSelectedStory(null);
  };

  // Mettre à jour story depuis le détail
  const handleUpdateFromDetail = (storyId, updates) => {
    onUpdateStory(storyId, updates);
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory({ ...selectedStory, ...updates });
    }
  };

  // Réinitialiser tous les filtres
  const handleResetFilters = () => {
    setFilterProduct('all');
  };

  const hasActiveFilters = filterProduct !== 'all';

  // États vides avec gestion intelligente des dépendances
  if (products.length === 0) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Target}
          message="Créez d'abord des produits pour constituer votre sprint board"
          description="Utilisez le menu de gauche pour accéder au module correspondant."
        />
      </div>
    );
  }

  if (sprints.length === 0) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Target}
          message="Créez d'abord des sprints pour constituer votre sprint board"
          description="Utilisez le menu de gauche pour accéder au module correspondant."
        />
      </div>
    );
  }

  // Aucun sprint actif (mais des sprints existent)
  if (!activeSprint) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Target}
          message="Aucun sprint actif"
          description="Activez un sprint existant depuis Sprints Management pour commencer à suivre vos stories quotidiennement."
        />
      </div>
    );
  }

  const sprintProduct = products.find(p => p.id === activeSprint.productId);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* MODULE FILTRES */}
        <FilterBar
          isExpanded={isFiltersExpanded}
          onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
          topLeftContent={
            /* Sélecteur Produit - Toujours visible */
            <ProductSelector
              products={products.sort((a, b) => a.name.localeCompare(b.name))}
              value={filterProduct}
              onChange={setFilterProduct}
              placeholder="Tous les produits"
              className="w-full sm:w-64"
              showCount={true}
              getCount={(productId) => sprintStories.filter(s => s.productId === productId).length}
            />
          }
          filters={
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 md:gap-4">
              {/* Filtre Sprint */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sprint</label>
                <CustomSelect
                  value={selectedSprintId || ''}
                  onChange={(e) => setSelectedSprintId(e.target.value)}
                  options={sprints
                    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                    .map(sprint => {
                      const sprintProduct = products.find(p => p.id === sprint.productId);
                      const storyCount = sprint.storyIds?.length || 0;
                      return {
                        value: sprint.id,
                        label: `${sprint.name} ${sprintProduct ? `[${sprintProduct.code}]` : ''} (${storyCount} stories)${sprint.status === 'active' ? ' 🟢' : ''}${sprint.status === 'completed' ? ' ✓' : ''}`
                      };
                    })}
                  aria-label="Sélectionner un sprint"
                />
              </div>
            </div>
          }
        />

        {/* Informations Sprint */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">{activeSprint.name}</h2>
                {sprintProduct && (
                  <span 
                    className="px-3 py-1 rounded text-sm font-bold text-white"
                    style={{ backgroundColor: sprintProduct.color }}
                  >
                    {sprintProduct.code}
                  </span>
                )}
              </div>
              {activeSprint.goal && (
                <p className="text-sm text-gray-700 mb-3">
                  🎯 {activeSprint.goal}
                </p>
              )}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>
                    {new Date(activeSprint.startDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    {' → '}
                    {new Date(activeSprint.endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progression</span>
                <span className="text-sm font-bold text-gray-900">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-green-500 to-green-600 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1 text-xs text-gray-600">
                <span>{doneStories}/{totalStories} stories</span>
                <span>{donePoints}/{totalPoints} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="mt-6">
        {sprintStories.length === 0 ? (
          <EmptyState
            icon={Target}
            message="Aucune story dans ce sprint"
            description="Ajoutez des stories à ce sprint depuis la vue User Stories ou la gestion des sprints."
          />
        ) : filteredStories.length === 0 ? (
          <EmptyState
            icon={Target}
            message="Aucune story ne correspond à vos critères de filtrage"
            onAction={handleResetFilters}
            actionLabel="Réinitialiser les filtres"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Object.values(columns).map((column) => (
              <div 
                key={column.id} 
                className="flex flex-col"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className={`rounded-t-lg px-3 py-2 md:px-4 md:py-3 shadow-md`} style={{ backgroundColor: column.color.split(' ').find(c => c.startsWith('bg-')).replace('bg-', '') === 'blue-50' ? '#EFF6FF' : column.color.split(' ').find(c => c.startsWith('bg-')).replace('bg-', '') === 'orange-50' ? '#FFF7ED' : '#F5F3FF' }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900">{column.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        {column.stories.length}
                      </span>
                      {column.stories.length > 0 && (
                        <span className="text-xs text-gray-500">
                          ({column.stories.reduce((sum, s) => sum + (s.estimation || 0), 0)} pts)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`flex-1 rounded-b-lg p-3 md:p-4 space-y-2 md:space-y-3 shadow-md overflow-y-auto`}
                  style={{ 
                    backgroundColor: column.color.split(' ').find(c => c.startsWith('bg-')).replace('bg-', '') === 'blue-50' ? '#EFF6FF' : column.color.split(' ').find(c => c.startsWith('bg-')).replace('bg-', '') === 'orange-50' ? '#FFF7ED' : '#F5F3FF',
                    maxHeight: 'calc(100vh - 450px)',
                    minHeight: '300px'
                  }}
                >
                  {column.stories.length === 0 ? (
                    <div className="text-center py-8 md:py-12 text-gray-400 text-xs md:text-sm">
                      {column.id === 'planned' && 'Glissez des stories ici'}
                      {column.id === 'inProgress' && 'Stories en cours'}
                      {column.id === 'outcome' && (
                        <div className="space-y-2">
                          <RefreshCw className="w-8 h-8 mx-auto text-purple-400" />
                          <p>Glissez une story ici pour définir son outcome</p>
                          <p className="text-xs">(Terminée, En pause, Bloquée, Annulée, À revoir)</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    column.stories.map((story) => (
                      <div
                        key={story.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, story)}
                        className="cursor-move"
                        style={{ cursor: 'move' }}
                      >
                        <SprintBoardCard
                          story={story}
                          contacts={contacts}
                          products={products}
                          onViewDetails={() => handleStoryClick(story)}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>

{/* Modal de détail de story */}
      {selectedStory && (
        <StoryDetailModal
          story={selectedStory}
          userNeeds={userNeeds}
          contacts={contacts}
          Objectives={Objectives}
          products={products}
          interviews={interviews}
          personas={personas}
          teamMembers={teamMembers}
          teams={teams}
          onUpdate={handleUpdateFromDetail}
          onClose={handleCloseDetail}
          onNavigate={onNavigate}
        />
      )}
      
      {/* Modal Outcome */}
      {outcomeStory && (
        <UserStoryOutcomeManager
          story={outcomeStory}
          onUpdateOutcome={(storyId, outcomeData) => {
            onUpdateStory(storyId, outcomeData);
            setOutcomeStory(null);
          }}
          onClose={() => setOutcomeStory(null)}
        />
      )}
    </div>
  );
};

export default SprintBoard;
