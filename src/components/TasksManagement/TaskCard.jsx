import { memo } from 'react';
import PropTypes from 'prop-types';
import { CardHeader, CardFooter } from '../ui/Card/index';
import TaskOutcomeBadge from './TaskOutcomeBadge';

/**
 * TaskCard - Carte d'affichage d'une tâche
 * 
 * @param {Object} props
 * @param {Object} props.task - Données de la tâche
 * @param {Object} props.product - Produit associé
 * @param {Function} props.getAssigneeName - Fonction pour récupérer le nom de l'assigné
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const TaskCard = ({
  task,
  product,
  getAssigneeName,
  onView,
  onEdit,
  onDelete
}) => {
  // Fonction pour obtenir le label et emoji du type
  const getTypeDisplay = (type) => {
    const types = {
      development: '💻 Développement',
      testing: '🧪 Tests',
      review: '👀 Revue de code',
      deployment: '🚀 Déploiement',
      documentation: '📚 Documentation',
      other: '🔧 Autre'
    };
    return types[type] || '🔧 Autre';
  };

  // Fonction pour obtenir le label du statut
  const getStatusLabel = (status) => {
    switch (status) {
      case 'todo': return 'À faire';
      case 'inProgress': return 'En cours';
      case 'done': return 'Terminée';
      default: return 'Inconnu';
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-sky-100 text-sky-800';
      case 'inProgress': return 'bg-emerald-100 text-emerald-800';
      case 'done': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  // Badges du footer
  const footerBadges = (
    <>
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${getStatusColor(task.status)}`}>
        {getStatusLabel(task.status)}
      </span>
      {task.outcome && (
        <TaskOutcomeBadge outcome={task.outcome} size="small" />
      )}
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le titre */}
      <CardHeader title={task.title} />

      {/* Corps de la carte */}
      <div className="p-5 flex-1 space-y-3">
        {/* Description détaillée */}
        {task.description && (
          <div className="space-y-2">
            {task.description.split('\n').filter(line => line.trim() !== '').map((line, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-gray-600 flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-gray-600 flex-1">{line}</p>
              </div>
            ))}
          </div>
        )}

        {/* Type de tâche */}
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0">🏷️</span>
          <span className="text-sm font-semibold text-gray-700">Type :</span>
          <span className="text-sm font-medium text-gray-900">{getTypeDisplay(task.type)}</span>
        </div>

        {/* Assigné et estimation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0">👤</span>
            <span className="text-sm font-semibold text-gray-700">Assigné :</span>
            <span className="text-sm font-medium text-gray-900 truncate">{getAssigneeName(task.assignedTo)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex-shrink-0">⏱️</span>
            <span className="text-sm font-semibold text-gray-700">Estimation :</span>
            <span className="text-sm font-bold text-gray-900">{task.estimatedHours || 0}h</span>
          </div>
        </div>
      </div>

      {/* Footer standardisé - Badge produit + outcome + 3 boutons */}
      <CardFooter
        product={product}
        badges={footerBadges}
        onView={() => onView(task)}
        onEdit={() => onEdit(task)}
        onDelete={() => onDelete(task)}
        viewLabel={`Voir les détails de ${task.title}`}
        editLabel={`Modifier ${task.title}`}
        deleteLabel={`Supprimer ${task.title}`}
      />
    </div>
  );
};

const MemoizedTaskCard = memo(TaskCard);

MemoizedTaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['development', 'testing', 'review', 'deployment', 'documentation', 'other']).isRequired,
    status: PropTypes.oneOf(['todo', 'inProgress', 'done']).isRequired,
    assignedTo: PropTypes.string.isRequired,
    estimatedHours: PropTypes.number,
    outcome: PropTypes.string,
    userStoryId: PropTypes.string.isRequired
  }).isRequired,
  product: PropTypes.shape({
    code: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  getAssigneeName: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default MemoizedTaskCard;
