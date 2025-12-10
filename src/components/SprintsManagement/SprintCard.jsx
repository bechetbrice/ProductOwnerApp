import { memo } from 'react';
import { Clock, Play, CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { CardHeader, CardFooter } from '../ui/Card/index';

/**
 * SprintCard - Carte d'affichage d'un sprint
 * 
 * @param {Object} props
 * @param {Object} props.sprint - Données du sprint
 * @param {Object} props.stats - Statistiques du sprint
 * @param {number} props.stats.totalStories - Nombre total stories
 * @param {number} props.stats.completedStories - Nombre stories complétées
 * @param {number} props.stats.progressPercentage - Progression (%)
 * @param {Object} props.product - Produit associé
 * @param {number} props.timeProgress - Progression temps (%)
 * @param {number} props.totalDuration - Durée totale (jours)
 * @param {number} props.daysRemaining - Jours restants
 * @param {boolean} props.isOverdue - Sprint en retard
 * @param {boolean} props.isEndingSoon - Sprint bientôt terminé
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const SprintCard = ({
  sprint,
  stats,
  product,
  team,
  timeProgress,
  totalDuration,
  daysRemaining,
  isOverdue,
  isEndingSoon,
  onView,
  onEdit,
  onDelete
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'planned': return <Clock className="w-3.5 h-3.5" />;
      case 'active': return <Play className="w-3.5 h-3.5" />;
      case 'completed': return <CheckCircle className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planned': return 'Planifié';
      case 'active': return 'En cours';
      case 'completed': return 'Terminé';
      default: return 'Inconnu';
    }
  };

  // Badges du footer
  const footerBadges = (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${
      sprint.status === 'completed' ? 'bg-slate-100 text-slate-800' :
      sprint.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
      'bg-sky-100 text-sky-800'
    }`}>
      {getStatusIcon(sprint.status)}
      {getStatusLabel(sprint.status)}
    </span>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le nom */}
      <CardHeader title={sprint.name} />

      {/* Corps */}
      <div className="p-5 flex-1 space-y-3">
        {/* Objectif */}
        {sprint.goal && (
          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">🎯 Objectif du sprint</p>
              <p className="text-sm text-gray-600">
                {sprint.goal}
              </p>
            </div>
            {team && (
              <p className="text-sm text-gray-600">
                👥 <span className="font-semibold text-gray-700">Équipe responsable :</span> <span className="font-medium text-gray-900">{team.name}</span>
              </p>
            )}
          </div>
        )}

        {/* Dates et durée */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0">📅</span>
            <span className="text-sm text-gray-600">
              {new Date(sprint.startDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
              {' → '}
              {new Date(sprint.endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{totalDuration} jours</span>
        </div>

        {/* Progression Stories */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Stories</span>
            <span className="text-sm font-bold text-gray-900">
              {stats.completedStories}/{stats.totalStories} • {stats.progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 transition-all ${
                sprint.status === 'completed' ? 'bg-gray-500' :
                sprint.status === 'active' ? 'bg-green-500' :
                'bg-blue-500'
              }`}
              style={{ width: `${stats.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Progression Temps (seulement si actif) */}
        {sprint.status === 'active' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Temps</span>
              <span className="text-sm">
                {isOverdue ? (
                  <span className="text-red-600">
                    ⚠️ {Math.abs(daysRemaining)}j retard
                  </span>
                ) : isEndingSoon ? (
                  <span className="text-orange-600">
                    ⏱️ {daysRemaining}j restant{daysRemaining > 1 ? 's' : ''}
                  </span>
                ) : (
                  <span className="text-gray-600">
                    {daysRemaining}j restant{daysRemaining > 1 ? 's' : ''}
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 transition-all ${
                  isOverdue ? 'bg-red-500' :
                  isEndingSoon ? 'bg-orange-500' :
                  'bg-indigo-500'
                }`}
                style={{ width: `${timeProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer standardisé - Badge produit + statut + 3 boutons */}
      <CardFooter
        product={product}
        badges={footerBadges}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        viewLabel={`Voir le sprint ${sprint.name}`}
        editLabel={`Modifier le sprint ${sprint.name}`}
        deleteLabel={`Supprimer ${sprint.name}`}
      />
    </div>
  );
};

const MemoizedSprintCard = memo(SprintCard);

MemoizedSprintCard.propTypes = {
  sprint: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    goal: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['planned', 'active', 'completed']).isRequired
  }).isRequired,
  stats: PropTypes.shape({
    totalStories: PropTypes.number.isRequired,
    completedStories: PropTypes.number.isRequired,
    progressPercentage: PropTypes.number.isRequired
  }).isRequired,
  product: PropTypes.shape({
    code: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  team: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  timeProgress: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  daysRemaining: PropTypes.number.isRequired,
  isOverdue: PropTypes.bool.isRequired,
  isEndingSoon: PropTypes.bool.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default MemoizedSprintCard;
