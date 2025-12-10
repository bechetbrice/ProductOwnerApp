import React, { useState, useMemo, useEffect } from 'react';
import { Target, Info, Calendar, Users, TrendingUp } from 'lucide-react';
import { DASHBOARD_TEXT, DASHBOARD_SPACING } from '../Common/DashboardConstants';
import SprintDetail from '../../SprintsManagement/SprintDetail';
import StoryDetailModal from '../../UserStories/StoryDetailModal';
import TaskDetail from '../../TasksManagement/TaskDetail';
import RoadmapHeader from './RoadmapHeader';
import RoadmapGrid from './RoadmapGrid';
import RoadmapRow from './RoadmapRow';
import { useMinTimelineWidth } from './useMinRoadmapWidth';
import {
  getDateRange,
  filterSprints,
  navigateDate,
  getSprintStats
} from './RoadmapUtils';
import { VIEW_MODES, getResponsiveLayout, ZOOM, STATUS_COLORS } from './RoadmapConstants';

/**
 * RoadmapMobileCard - Carte sprint pour mobile
 */
const RoadmapMobileCard = ({ sprint, userStories, products, onSprintClick }) => {
  const stats = getSprintStats(sprint, userStories);
  const colors = STATUS_COLORS[sprint.status] || STATUS_COLORS.planned;
  const product = products.find(p => p.id === sprint.productId);
  
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const today = new Date();
  
  const isActive = sprint.status === 'active';
  const isPast = endDate < today;
  const isFuture = startDate > today;
  
  return (
    <div 
      className="bg-white rounded-lg shadow border-l-4 cursor-pointer hover:shadow-md transition-all"
      style={{ borderLeftColor: colors.border.replace('border-', '#') }}
      onClick={() => onSprintClick(sprint.id)}
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-start gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className={`${DASHBOARD_TEXT.h3} truncate`}>
              {sprint.name}
            </h3>
            {sprint.goal && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {sprint.goal}
              </p>
            )}
          </div>
          {product && (
            <span 
              className="flex-shrink-0 px-2 py-1 rounded text-xs font-bold text-white"
              style={{ backgroundColor: product.color }}
            >
              {product.code}
            </span>
          )}
        </div>
        
        {/* Dates */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span>
            {startDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
            {' → '}
            {endDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="p-3 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className={`${DASHBOARD_TEXT.caption} mb-1`}>Stories</div>
          <div className={DASHBOARD_TEXT.valueSmall}>
            {stats.completedStories}/{stats.totalStories}
          </div>
        </div>
        <div className="text-center">
          <div className={`${DASHBOARD_TEXT.caption} mb-1`}>Points</div>
          <div className={DASHBOARD_TEXT.valueSmall}>
            {stats.completedPoints}/{stats.totalPoints}
          </div>
        </div>
        <div className="text-center">
          <div className={`${DASHBOARD_TEXT.caption} mb-1`}>Progression</div>
          <div className="text-sm font-bold text-emerald-600">
            {stats.progress}%
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="px-3 pb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </div>
      
      {/* Badge statut */}
      <div className="px-3 pb-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
          {sprint.status === 'planned' && '📅 Planifié'}
          {sprint.status === 'active' && '▶️ En cours'}
          {sprint.status === 'completed' && '✅ Terminé'}
        </span>
      </div>
    </div>
  );
};

/**
 * Roadmap - Vue Timeline/Roadmap des Sprints (100% Responsive)
 * Vue cartes sur mobile, timeline Gantt sur desktop
 */
const Roadmap = ({
  sprints = [],
  userStories = [],
  products = [],
  teamMembers = [],
  teams = [],
  contacts = [],
  interviews = [],
  onSprintClick,
  onStoryClick,
  onEdit,
  onUpdateStory,
  Objectives = [],
  personas = [],
  userNeeds = [],
  tasks = [],
  hideProductFilter = false
}) => {
  // États de vue et filtres
  const [viewMode, setViewMode] = useState(VIEW_MODES.QUARTER);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterAssignedTo, setFilterAssignedTo] = useState('all');

  // État zoom
  const [zoomLevel, setZoomLevel] = useState(ZOOM.DEFAULT);

  // États pour les modals
  const [viewingSprintId, setViewingSprintId] = useState(null);
  const [viewingStoryId, setViewingStoryId] = useState(null);
  const [viewingTaskId, setViewingTaskId] = useState(null);

  // ✅ État responsive layout
  const [layout, setLayout] = useState(getResponsiveLayout());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // ✅ Observer window resize
  useEffect(() => {
    const handleResize = () => {
      setLayout(getResponsiveLayout());
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculer la plage de dates
  const { startDate, endDate, days, label } = useMemo(
    () => getDateRange(selectedDate, viewMode),
    [selectedDate, viewMode]
  );

  // Calculer largeur minimale (pour activer scroll si besoin)
  const minTimelineWidth = useMinTimelineWidth(viewMode, days);

  // Filtrer les sprints
  const filteredSprints = useMemo(
    () => filterSprints(sprints, startDate, endDate, filterStatus, 'all', filterTeam),
    [sprints, startDate, endDate, filterStatus, filterTeam]
  );

  // Calculer position "aujourd'hui" en pourcentage
  const todayPosition = useMemo(() => {
    const normalizeDate = (date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    const today = normalizeDate(new Date());
    const start = normalizeDate(startDate);
    const end = normalizeDate(endDate);

    if (today < start || today > end) return null;

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((today - start) / (1000 * 60 * 60 * 24));

    return (daysPassed / totalDays) * 100;
  }, [startDate, endDate]);

  // Handlers de navigation
  const handleNavigatePrevious = () => {
    setSelectedDate(navigateDate(selectedDate, viewMode, 'previous'));
  };

  const handleNavigateNext = () => {
    setSelectedDate(navigateDate(selectedDate, viewMode, 'next'));
  };

  const handleGoToToday = () => {
    setSelectedDate(new Date());
  };

  // Handlers de zoom
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(ZOOM.MAX, prev + ZOOM.STEP));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(ZOOM.MIN, prev - ZOOM.STEP));
  };

  const handleResetZoom = () => {
    setZoomLevel(ZOOM.DEFAULT);
  };

  // Handlers de modals
  const handleSprintClick = (sprintId) => {
    setViewingSprintId(sprintId);
    if (onSprintClick) onSprintClick(sprints.find(s => s.id === sprintId));
  };

  const handleStoryClick = (storyId) => {
    setViewingStoryId(storyId);
    if (onStoryClick) onStoryClick(userStories.find(s => s.id === storyId));
  };

  const handleTaskClick = (taskId) => {
    setViewingTaskId(taskId);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {/* Header avec stats et filtres */}
        <RoadmapHeader
          filteredSprints={filteredSprints}
          userStories={userStories}
          viewMode={viewMode}
          setViewMode={setViewMode}
          label={label}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterTeam={filterTeam}
          setFilterTeam={setFilterTeam}
          filterAssignedTo={filterAssignedTo}
          setFilterAssignedTo={setFilterAssignedTo}
          products={products}
          teams={teams}
          teamMembers={teamMembers}
          hideProductFilter={hideProductFilter}
          contacts={contacts}
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          onNavigatePrevious={handleNavigatePrevious}
          onNavigateNext={handleNavigateNext}
          onGoToToday={handleGoToToday}
        />

        {/* Empty state */}
        {filteredSprints.length === 0 ? (
          <div className="p-6 sm:p-8 md:p-12 text-center bg-white rounded-lg shadow">
            <Target className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className={`${DASHBOARD_TEXT.label} text-gray-500`}>Aucun sprint sur cette période</p>
            <p className={`${DASHBOARD_TEXT.caption} mt-2`}>
              Modifiez les filtres ou la période pour afficher des sprints
            </p>
          </div>
        ) : (
          <>
            {/* ============================================ */}
            {/* VUE MOBILE/TABLET : CARTES (< 1024px) */}
            {/* ============================================ */}
            {isMobile && (
              <div className="space-y-3">
                {filteredSprints.map(sprint => (
                  <RoadmapMobileCard
                    key={sprint.id}
                    sprint={sprint}
                    userStories={userStories}
                    products={products}
                    onSprintClick={handleSprintClick}
                  />
                ))}
                
                {/* Footer compteur mobile */}
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <span className={DASHBOARD_TEXT.caption}>
                    <strong className="text-emerald-600">{filteredSprints.length}</strong> sprint{filteredSprints.length > 1 ? 's' : ''} affiché{filteredSprints.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* VUE DESKTOP : TIMELINE GANTT (≥ 1024px) */}
            {/* ============================================ */}
            {!isMobile && (
              <div className="bg-white rounded-lg shadow overflow-hidden">

                {/* Scroll horizontal avec timeline */}
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {/* Container avec zoom */}
                  <div
                    style={{
                      minWidth: `${layout.MARGIN_LEFT + minTimelineWidth}px`,
                      transform: `scaleX(${zoomLevel})`,
                      transformOrigin: 'left',
                      transition: 'transform 0.2s ease-out'
                    }}
                  >
                    {/* En-tête timeline */}
                    <div
                      className="bg-gray-50 border-b sticky top-0 z-10 flex"
                      style={{ height: `${layout.TIME_MARKERS_HEIGHT}px` }}
                    >
                      <div
                        className="flex-shrink-0 border-r bg-gray-50"
                        style={{ width: `${layout.MARGIN_LEFT}px` }}
                      />
                      <div className="flex-1">
                        <RoadmapGrid
                          days={days}
                          viewMode={viewMode}
                          startDate={startDate}
                        />
                      </div>
                    </div>

                    {/* Sprints */}
                    {filteredSprints.map((sprint) => (
                      <RoadmapRow
                        key={sprint.id}
                        sprint={sprint}
                        userStories={userStories}
                        products={products}
                        filterAssignedTo={filterAssignedTo}
                        startDate={startDate}
                        endDate={endDate}
                        todayPosition={todayPosition}
                        onSprintClick={handleSprintClick}
                        onStoryClick={handleStoryClick}
                        onTaskClick={handleTaskClick}
                        tasks={tasks}
                        contacts={contacts}
                        layout={layout}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <div className={`flex items-center justify-between ${DASHBOARD_TEXT.caption}`}>
                    <span>
                      <strong className="text-emerald-600">{filteredSprints.length}</strong> sprint{filteredSprints.length > 1 ? 's' : ''} affiché{filteredSprints.length > 1 ? 's' : ''}
                    </span>
                    <span className="text-gray-500">
                      Zoom: {Math.round(zoomLevel * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de détail du sprint */}
      {viewingSprintId && (
        <SprintDetail
          sprint={sprints.find(s => s.id === viewingSprintId)}
          userStories={userStories}
          interviews={interviews}
          contacts={contacts}
          products={products}
          teams={teams}
          onClose={() => setViewingSprintId(null)}
          onEdit={(sprint) => {
            setViewingSprintId(null);
            if (onEdit) onEdit(sprint);
          }}
        />
      )}

      {/* Modal de détail de la story */}
      {viewingStoryId && (
        <StoryDetailModal
          story={userStories.find(s => s.id === viewingStoryId)}
          userNeeds={userNeeds}
          contacts={contacts}
          products={products}
          Objectives={Objectives}
          userStories={userStories}
          interviews={interviews}
          personas={personas}
          teamMembers={teamMembers}
          onClose={() => setViewingStoryId(null)}
          onUpdate={(storyId, updates) => {
            if (onUpdateStory) onUpdateStory(storyId, updates);
            setViewingStoryId(null);
          }}
          onDelete={() => {
            setViewingStoryId(null);
          }}
          onNavigate={(entity, id, filters) => {
            setViewingStoryId(null);
          }}
        />
      )}

      {/* Modal de détail de la tâche */}
      {viewingTaskId && (
        <TaskDetail
          task={tasks.find(t => t.id === viewingTaskId)}
          userStories={userStories}
          contacts={contacts}
          teams={teams}
          onEdit={(task) => {
            setViewingTaskId(null);
          }}
          onClose={() => setViewingTaskId(null)}
        />
      )}
    </div>
  );
};

export default Roadmap;
