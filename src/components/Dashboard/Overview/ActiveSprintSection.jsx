import { Zap, Calendar, Activity, TrendingUp, ListChecks, Kanban, AlertTriangle } from 'lucide-react';
import { InfoTooltip } from '../../ui';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';

/**
 * Section Sprint en Cours
 * Affiche les détails complets du sprint actif avec ses user stories
 */
const ActiveSprintSection = ({ sprint, stories = [], analytics, products = [], onNavigateToView }) => {
  // Calculer les métriques du sprint
  const sprintMetrics = sprint ? {
    totalPoints: stories.reduce((sum, s) => sum + (s.estimation || 0), 0),
    completedPoints: stories
      .filter(s => s.status === 'done' && (!s.outcome || s.outcome === 'completed'))
      .reduce((sum, s) => sum + (s.estimation || 0), 0),
    inProgressPoints: stories.filter(s => s.status === 'inProgress').reduce((sum, s) => sum + (s.estimation || 0), 0),
  } : null;

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
        <Zap size={18} className="sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
        <span className="truncate">Sprint en cours</span>
        <InfoTooltip text="Détails du sprint actuellement actif avec les user stories, leur statut et leurs outcomes. Suivez la progression en temps réel." />
      </h3>
      {sprint ? (
        <div className="space-y-4 sm:space-y-6">
          {/* En-tête Sprint */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 sm:p-4 border border-emerald-200">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{sprint.name}</h4>
              </div>
              <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-bold rounded-full flex items-center gap-1 flex-shrink-0">
                ▶️ Actif
              </span>
            </div>
            
            {/* Dates et progression */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Calendar size={14} className="sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-600">Dates</p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                    {new Date(sprint.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    {' → '}
                    {new Date(sprint.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
              {analytics && (
                <>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Activity size={14} className="sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Jours restants</p>
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                        {analytics.remainingDays}j / {analytics.totalDays}j
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <TrendingUp size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-gray-600">Vélocité</p>
                        <InfoTooltip text="Nombre moyen de story points complétés par jour depuis le début du sprint actuel. Cette métrique permet d'estimer le nombre de jours nécessaires pour terminer les points restants et détecter les baisses de productivité." size={10} className="flex-shrink-0" />
                      </div>
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm">{analytics.velocity} pts/jour</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Barre de progression */}
            {sprintMetrics && (
              <div className="mt-3 sm:mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progression</span>
                  <span className="flex-shrink-0">{sprintMetrics.completedPoints} / {sprintMetrics.totalPoints} pts • {sprintMetrics.totalPoints > 0 ? Math.round((sprintMetrics.completedPoints / sprintMetrics.totalPoints) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${sprintMetrics.totalPoints > 0 ? (sprintMetrics.completedPoints / sprintMetrics.totalPoints) * 100 : 0}%` }}
                  />
                </div>
              </div>
            )}

            {/* Alerte si retard */}
            {analytics && !analytics.isOnTrack && (
              <div className="mt-2 sm:mt-3 bg-orange-50 border border-orange-200 rounded-lg p-2 sm:p-3 flex items-start gap-1.5 sm:gap-2">
                <AlertTriangle size={14} className="sm:w-4 sm:h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm min-w-0">
                  <p className="font-semibold text-orange-900">Sprint en retard</p>
                  <p className="text-orange-700 text-xs mt-1">
                    Estimation : {analytics.daysLate} jour{analytics.daysLate > 1 ? 's' : ''} de retard supplémentaire{analytics.daysLate > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* User Stories du Sprint */}
          <div>
            <h5 className={`${DASHBOARD_TEXT.h3} mb-2 sm:mb-3 flex items-center gap-2`}>
              <ListChecks size={14} className="sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
              <span>User Stories ({stories.length})</span>
            </h5>
            {stories.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-h-80 sm:max-h-96 overflow-y-auto">
                  {stories
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3)
                    .map(story => {
                      // Déterminer le badge de statut
                      const statusConfig = {
                        planned: { label: 'À faire', color: 'bg-blue-100 text-blue-700' },
                        inProgress: { label: 'En cours', color: 'bg-yellow-100 text-yellow-700' },
                        done: { label: 'Terminée', color: 'bg-green-100 text-green-700' },
                        unassigned: { label: 'Non assignée', color: 'bg-gray-100 text-gray-700' }
                      };

                      // Déterminer le badge d'outcome si présent
                      const outcomeConfig = {
                        completed: { label: 'Complétée', color: 'bg-green-100 text-green-700 border-green-300' },
                        paused: { label: 'Pausée', color: 'bg-gray-100 text-gray-700 border-gray-300' },
                        blocked: { label: 'Bloquée', color: 'bg-red-100 text-red-700 border-red-300' },
                        cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700 border-red-300' },
                        to_review: { label: 'À réviser', color: 'bg-purple-100 text-purple-700 border-purple-300' }
                      };

                      const statusInfo = statusConfig[story.status] || statusConfig.unassigned;
                      const outcomeInfo = story.outcome ? outcomeConfig[story.outcome] : null;

                      // Récupérer le produit pour le badge
                      const product = products.find(p => p.id === story.productId);

                      return (
                        <div 
                          key={story.id}
                          className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 transition-all"
                        >
                          {/* Titre de la story */}
                          <div className="mb-2">
                            <p className="text-xs sm:text-sm text-gray-900 italic leading-tight line-clamp-3">
                              {story.userRole && story.userAction && story.userBenefit
                                ? `En tant que ${story.userRole}, je veux ${story.userAction} afin de ${story.userBenefit}`
                                : story.title || 'Sans titre'
                              }
                            </p>
                          </div>

                          {/* Identification si présente */}
                          {(story.storyNumber || story.storyTitle) && (
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 text-xs">
                              {story.storyNumber && (
                                <span className="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-mono text-xs flex-shrink-0">
                                  #{story.storyNumber}
                                </span>
                              )}
                              {story.storyTitle && (
                                <span className="text-gray-600 truncate">{story.storyTitle}</span>
                              )}
                            </div>
                          )}

                          <div className="border-t border-gray-100 my-1.5 sm:my-2"></div>

                          {/* Pied de carte : Badges */}
                          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              {/* Badge Produit */}
                              {product && (
                                <span 
                                  className="px-1.5 sm:px-2 py-0.5 rounded text-xs font-bold text-white flex-shrink-0"
                                  style={{ backgroundColor: product.color }}
                                >
                                  {product.code}
                                </span>
                              )}

                              {/* Badge Statut */}
                              <span className={`px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>

                              {/* Badge Outcome (si présent) */}
                              {outcomeInfo && (
                                <span className={`px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium border ${outcomeInfo.color}`}>
                                  {outcomeInfo.label}
                                </span>
                              )}

                              {/* Badge Estimation */}
                              {story.estimation && story.estimation > 0 && (
                                <span className="px-1.5 sm:px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium flex-shrink-0">
                                  {story.estimation} pts
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {stories.length > 3 && (
                  <div className="mt-2 sm:mt-3 text-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Et <strong>{stories.length - 3}</strong> autre{stories.length - 3 > 1 ? 's' : ''} story{stories.length - 3 > 1 ? 's' : ''}...
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-400 text-xs sm:text-sm">
                <ListChecks className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
                <p>Aucune story dans ce sprint</p>
              </div>
            )}
          </div>

          {/* Actions rapides */}
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
            <button
              onClick={() => onNavigateToView && onNavigateToView('sprintBoard')}
              className="flex-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <Kanban className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Voir le Sprint Board</span>
              <span className="sm:hidden">Sprint Board</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Aucun sprint actif</h4>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Créez et activez un sprint pour commencer à travailler</p>
          <button
            onClick={() => onNavigateToView && onNavigateToView('sprints')}
            className="px-4 sm:px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm font-medium"
          >
            Créer un Sprint
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveSprintSection;
