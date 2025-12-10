import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ListChecks, Target, Clock, Play, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import {
  STATUS_COLORS,
  STORY_STATUS_COLORS,
  STORY_STATUS_ICONS,
  TASK_STATUS_COLORS,
  TASK_STATUS_ICONS,
  LAYOUT
} from './RoadmapConstants';
import { getSprintStats, filterSprintStories } from './RoadmapUtils';

/**
 * Calcule la position d'un sprint sur la timeline responsive
 */
const calculateSprintPosition = (sprintStart, sprintEnd, timelineStart, timelineEnd, timelineWidth) => {
  const totalDays = Math.ceil((timelineEnd - timelineStart) / (1000 * 60 * 60 * 24));
  const dayWidth = timelineWidth / totalDays;
  
  const startOffset = Math.max(0, Math.floor((sprintStart - timelineStart) / (1000 * 60 * 60 * 24)));
  const sprintDuration = Math.ceil((sprintEnd - sprintStart) / (1000 * 60 * 60 * 24)) + 1;
  const endOffset = Math.min(totalDays, startOffset + sprintDuration);
  
  return {
    left: startOffset * dayWidth,
    width: Math.max(dayWidth, (endOffset - startOffset) * dayWidth)
  };
};

/**
 * Génère un identifiant d'affichage pour une story
 */
const getStoryDisplayId = (story) => {
  if (story.storyNumber) {
    return `#${story.storyNumber}`;
  }
  return `#${story.id.substring(0, 8)}`;
};

/**
 * Génère un titre court pour affichage
 */
const getStoryDisplayTitle = (story) => {
  if (story.storyTitle) {
    return story.storyTitle;
  }
  
  if (story.title && story.title.length > 40) {
    return story.title.substring(0, 40) + '...';
  }
  
  return story.title || 'Sans titre';
};

/**
 * Génère un identifiant d'affichage pour une tâche
 */
const getTaskDisplayId = (task) => {
  if (task.taskNumber) {
    return `#${task.taskNumber}`;
  }
  return `#${task.id.substring(0, 8)}`;
};

const RoadmapRow = ({
  sprint,
  userStories,
  products,
  filterAssignedTo,
  startDate,
  endDate,
  todayPosition,
  onSprintClick,
  onStoryClick,
  onTaskClick,
  tasks = [],
  contacts = []
}) => {
  const timelineRef = useRef(null);
  const sprintHeaderRef = useRef(null);
  const [sprintPosition, setSprintPosition] = useState({ left: 0, width: 0 });
  const [sprintHeaderHeight, setSprintHeaderHeight] = useState(LAYOUT.SPRINT_ROW_HEIGHT);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // États pour pliage/dépliage
  const [isSprintExpanded, setIsSprintExpanded] = useState(true);
  const [expandedStories, setExpandedStories] = useState(new Set());

  const stats = getSprintStats(sprint, userStories);
  const colors = STATUS_COLORS[sprint.status] || STATUS_COLORS.planned;
  const product = products.find(p => p.id === sprint.productId);
  const stories = filterSprintStories(sprint, userStories, filterAssignedTo, tasks);
  
  // Calculer hauteur avec tâches et état plié/déplié
  const storiesWithTasks = stories.map(story => {
    const storyTasks = tasks.filter(t => t.userStoryId === story.id || t.storyId === story.id);
    return { story, tasks: storyTasks };
  });
  
  // Calculer hauteur selon état plié/déplié
  let rowHeight = sprintHeaderHeight;
  
  if (isSprintExpanded) {
    storiesWithTasks.forEach(({ story, tasks: storyTasks }) => {
      rowHeight += LAYOUT.STORY_HEIGHT + 4;
      
      if (expandedStories.has(story.id)) {
        rowHeight += storyTasks.length * (LAYOUT.TASK_HEIGHT + 2);
      }
    });
  }

  const StatusIcon = sprint.status === 'planned' ? Clock
    : sprint.status === 'active' ? Play
    : sprint.status === 'completed' ? CheckCircle
    : Clock;

  // ✅ FIX: Mémoïser les dates normalisées pour éviter la boucle infinie
  const sprintStart = useMemo(() => {
    const d = new Date(sprint.startDate);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [sprint.startDate]);

  const sprintEnd = useMemo(() => {
    const d = new Date(sprint.endDate);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [sprint.endDate]);

  const timelineStart = useMemo(() => {
    const d = new Date(startDate);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [startDate]);

  const timelineEnd = useMemo(() => {
    const d = new Date(endDate);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [endDate]);

  // ✅ Responsive: Observer window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mesurer la hauteur du header du sprint
  useEffect(() => {
    if (sprintHeaderRef.current) {
      const height = sprintHeaderRef.current.offsetHeight;
      setSprintHeaderHeight(Math.max(LAYOUT.SPRINT_ROW_HEIGHT, height));
    }
  }, [sprint.name, sprint.productId, products]);

  // Calculer position initiale et au resize
  useEffect(() => {
    const updatePosition = () => {
      if (timelineRef.current) {
        const timelineWidth = timelineRef.current.offsetWidth;
        const position = calculateSprintPosition(
          sprintStart,
          sprintEnd,
          timelineStart,
          timelineEnd,
          timelineWidth
        );
        setSprintPosition(position);
      }
    };

    updatePosition();
    const resizeObserver = new ResizeObserver(updatePosition);
    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [sprintStart, sprintEnd, timelineStart, timelineEnd, windowWidth]);

  // Handlers pliage/dépliage
  const toggleSprint = (e) => {
    e.stopPropagation();
    setIsSprintExpanded(!isSprintExpanded);
  };

  const toggleStory = (storyId, e) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedStories);
    if (newExpanded.has(storyId)) {
      newExpanded.delete(storyId);
    } else {
      newExpanded.add(storyId);
    }
    setExpandedStories(newExpanded);
  };

  // ✅ Largeur colonne gauche responsive
  const leftColumnWidth = windowWidth < 640 ? 120 : windowWidth < 768 ? 160 : LAYOUT.MARGIN_LEFT;

  return (
    <div className="border-b" style={{ height: `${rowHeight}px` }}>
      <div className="flex h-full">
        {/* ✅ FIX 1: Colonne gauche responsive */}
        <div
          className="flex-shrink-0 border-r bg-gray-50 flex flex-col"
          style={{ width: `${leftColumnWidth}px` }}
        >
          {/* ✅ FIX 2: Info sprint responsive */}
          <div ref={sprintHeaderRef} className="p-2 sm:p-3 md:p-4 flex items-start gap-1 sm:gap-2 min-h-[80px]">
            {/* Bouton plier/déplier sprint */}
            <button
              onClick={toggleSprint}
              className="flex-shrink-0 p-0.5 sm:p-1 hover:bg-gray-200 rounded transition-colors"
              title={isSprintExpanded ? 'Plier' : 'Déplier'}
            >
              {isSprintExpanded ? (
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                {/* ✅ FIX 3: Titre sprint responsive */}
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm break-words flex-1 line-clamp-2">
                  {sprint.name}
                </h3>
                {product && (
                  <span
                    className="px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.code}
                  </span>
                )}
              </div>
              {/* ✅ FIX 4: Stats responsive */}
              <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-600">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <ListChecks className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span className="hidden sm:inline">{stats.completedStories}/{stats.totalStories} stories</span>
                  <span className="sm:hidden">{stats.completedStories}/{stats.totalStories}</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span className="hidden sm:inline">{stats.completedPoints}/{stats.totalPoints} pts</span>
                  <span className="sm:hidden">{stats.completedPoints}/{stats.totalPoints}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stories + Tasks (si sprint déplié) */}
          {isSprintExpanded && storiesWithTasks.map(({ story, tasks: storyTasks }) => {
            const statusIcon = STORY_STATUS_ICONS[story.status] || STORY_STATUS_ICONS.unassigned;
            const statusColor = story.status === 'done'
              ? 'text-green-600'
              : story.status === 'inProgress'
              ? 'text-yellow-600'
              : 'text-gray-400';
            
            const hasTask = storyTasks.length > 0;
            const isStoryExpanded = expandedStories.has(story.id);

            return (
              <div key={`left-${story.id}`}>
                {/* ✅ FIX 5: Story row responsive */}
                <div
                  className="px-2 sm:px-3 md:px-4 border-t flex items-center gap-1 sm:gap-2 hover:bg-gray-100 cursor-pointer"
                  style={{ height: `${LAYOUT.STORY_HEIGHT + 4}px` }}
                >
                  {hasTask ? (
                    <button
                      onClick={(e) => toggleStory(story.id, e)}
                      className="flex-shrink-0 p-0.5 hover:bg-gray-300 rounded transition-colors"
                      title={isStoryExpanded ? 'Masquer tâches' : 'Afficher tâches'}
                    >
                      {isStoryExpanded ? (
                        <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                      )}
                    </button>
                  ) : (
                    <span className="w-3 sm:w-4" />
                  )}

                  <span className={`text-[10px] sm:text-xs ${statusColor} flex-shrink-0`}>
                    {statusIcon}
                  </span>
                  
                  {/* ✅ FIX 6: Story ID responsive */}
                  <span 
                    className="text-[10px] sm:text-xs text-gray-700 truncate flex-1"
                    onClick={() => onStoryClick(story.id)}
                    title={`${getStoryDisplayId(story)} - ${getStoryDisplayTitle(story)}`}
                  >
                    <span className="font-medium">{getStoryDisplayId(story)}</span>
                    <span className="hidden md:inline"> • {getStoryDisplayTitle(story)}</span>
                  </span>
                  
                  {story.estimation && (
                    <span className="text-[10px] sm:text-xs font-bold text-gray-500 flex-shrink-0">
                      {story.estimation}pt
                    </span>
                  )}
                </div>

                {/* Tasks (si story dépliée) */}
                {isStoryExpanded && storyTasks.map(task => {
                  const taskIcon = TASK_STATUS_ICONS[task.status] || TASK_STATUS_ICONS.planned;
                  const taskColorClass = task.status === 'done'
                    ? 'text-green-700'
                    : task.status === 'inProgress'
                    ? 'text-orange-600'
                    : task.status === 'blocked'
                    ? 'text-red-600'
                    : 'text-blue-600';
                  
                  const assignedContact = task.assignedTo ? contacts.find(c => c.id === task.assignedTo) : null;

                  return (
                    // ✅ FIX 7: Task row responsive
                    <div
                      key={`task-left-${task.id}`}
                      className="px-4 sm:px-6 md:px-8 flex items-center gap-1 sm:gap-2 hover:bg-gray-200 cursor-pointer bg-gray-100"
                      style={{ height: `${LAYOUT.TASK_HEIGHT + 2}px` }}
                      onClick={() => onTaskClick(task.id)}
                      title={assignedContact ? `${task.title} - Assigné à ${assignedContact.name}` : task.title}
                    >
                      <span className={`text-[10px] sm:text-xs ${taskColorClass} flex-shrink-0`}>
                        {taskIcon}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-600 truncate flex-1">
                        <span className="font-medium">{getTaskDisplayId(task)}</span>
                        <span className="hidden lg:inline"> • {task.title.length > 25 ? task.title.substring(0, 25) + '...' : task.title}</span>
                      </span>
                      {assignedContact && (
                        <span className="text-[9px] sm:text-xs text-gray-400 flex-shrink-0 hidden sm:inline" title={assignedContact.name}>
                          {assignedContact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Colonne droite - Timeline responsive */}
        <div ref={timelineRef} className="flex-1 relative">
          {/* Marque aujourd'hui */}
          {todayPosition !== null && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
              style={{ left: `${todayPosition}%` }}
            />
          )}

          {/* ✅ FIX 8: Barre sprint responsive */}
          <div
            className={`absolute h-10 sm:h-12 rounded-lg border-2 ${colors.bg} ${colors.border} cursor-pointer transition-all shadow-sm hover:shadow-md`}
            style={{
              top: windowWidth < 640 ? '8px' : '16px',
              left: `${sprintPosition.left}px`,
              width: `${sprintPosition.width}px`
            }}
            onClick={() => onSprintClick(sprint.id)}
          >
            <div className="h-full px-2 sm:px-3 flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                <StatusIcon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${colors.text} flex-shrink-0`} />
                <span className={`text-[10px] sm:text-xs font-medium ${colors.text} truncate`}>
                  {sprint.goal || sprint.name}
                </span>
              </div>

              <div className="flex-shrink-0 ml-1 sm:ml-2">
                <div className="text-[10px] sm:text-xs font-bold text-gray-700">
                  {stats.progress}%
                </div>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gray-200 rounded-b-lg overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>

          {/* Stories + Tasks sur timeline (si sprint déplié) */}
          {isSprintExpanded && storiesWithTasks.length > 0 && (
            <div className="absolute" style={{ top: `${sprintHeaderHeight}px`, left: 0, right: 0 }}>
              {storiesWithTasks.map(({ story, tasks: storyTasks }) => {
                const storyColors = STORY_STATUS_COLORS[story.status] || STORY_STATUS_COLORS.unassigned;
                const isStoryExpanded = expandedStories.has(story.id);
                const visibleTasksCount = isStoryExpanded ? storyTasks.length : 0;
                const storyWithTasksHeight = LAYOUT.STORY_HEIGHT + 4 + (visibleTasksCount * (LAYOUT.TASK_HEIGHT + 2));

                return (
                  <div
                    key={story.id}
                    className="relative border-t"
                    style={{ height: `${storyWithTasksHeight}px` }}
                  >
                    {/* ✅ FIX 9: Story bar responsive */}
                    <div
                      className={`absolute rounded border-2 px-2 sm:px-3 flex items-center justify-between text-[10px] sm:text-xs cursor-pointer hover:shadow-md transition-all ${storyColors}`}
                      onClick={() => onStoryClick(story.id)}
                      style={{
                        left: `${sprintPosition.left}px`,
                        width: `${sprintPosition.width}px`,
                        height: `${LAYOUT.STORY_HEIGHT}px`,
                        top: '2px'
                      }}
                    >
                      <span className="truncate font-medium">
                        {getStoryDisplayId(story)}
                        <span className="hidden md:inline"> • {getStoryDisplayTitle(story)}</span>
                      </span>
                      {story.estimation && (
                        <span className="ml-1 sm:ml-2 font-bold flex-shrink-0">{story.estimation}pt</span>
                      )}
                    </div>

                    {/* Tasks bars (si story dépliée) */}
                    {isStoryExpanded && storyTasks.map((task, taskIndex) => {
                      const taskColors = TASK_STATUS_COLORS[task.status] || TASK_STATUS_COLORS.planned;
                      const taskTop = LAYOUT.STORY_HEIGHT + 4 + (taskIndex * (LAYOUT.TASK_HEIGHT + 2));

                      return (
                        <div
                          key={task.id}
                          className={`absolute rounded border px-1 sm:px-2 flex items-center justify-between text-[10px] sm:text-xs cursor-pointer hover:shadow-sm transition-all ${taskColors}`}
                          onClick={() => onTaskClick(task.id)}
                          style={{
                            left: `${sprintPosition.left}px`,
                            width: `${sprintPosition.width}px`,
                            height: `${LAYOUT.TASK_HEIGHT}px`,
                            top: `${taskTop}px`
                          }}
                          title={task.title}
                        >
                          <span className="truncate">
                            {getTaskDisplayId(task)}
                            <span className="hidden lg:inline"> • {task.title.length > 20 ? task.title.substring(0, 20) + '...' : task.title}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapRow;
