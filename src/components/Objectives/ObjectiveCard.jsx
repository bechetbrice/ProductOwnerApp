import { memo } from 'react';
import { CardHeader, CardFooter } from '../ui/Card/index';

/**
 * ObjectiveCard - Carte d'affichage d'un objectif produit
 * 
 * @param {Object} props
 * @param {Object} props.objective - Données de l'objectif
 * @param {Object} props.product - Produit associé
 * @param {number} props.linkedNeedsCount - Nombre de besoins liés
 * @param {number} props.linkedStoriesCount - Nombre de stories liées
 * @param {number} props.progressPercentage - Pourcentage de progression
 * @param {boolean} props.objectiveIsOverdue - Indicateur de retard
 * @param {Function} props.getStatusColor - Fonction pour obtenir la couleur du statut
 * @param {Function} props.getStatusLabel - Fonction pour obtenir le label du statut
 * @param {Function} props.getPriorityColor - Fonction pour obtenir la couleur de la priorité
 * @param {Function} props.getPriorityLabel - Fonction pour obtenir le label de la priorité
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const ObjectiveCard = ({
  objective,
  product,
  linkedNeedsCount,
  linkedStoriesCount,
  progressPercentage,
  objectiveIsOverdue,
  getStatusColor,
  getStatusLabel,
  getPriorityColor,
  getPriorityLabel,
  onView,
  onEdit,
  onDelete
}) => {
  // Badges du footer
  const footerBadges = (
    <>
      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(objective.status)}`}>
        {getStatusLabel(objective.status)}
      </span>
      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(objective.priority)}`}>
        {getPriorityLabel(objective.priority)}
      </span>
      {objectiveIsOverdue && (
        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
          ⚠️ Retard
        </span>
      )}
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le titre */}
      <CardHeader title={objective.title} />

      {/* Corps de la carte */}
      <div className="p-5 flex-1 space-y-3">
        {/* Métriques */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0">🎯</span>
            <span className="text-sm font-semibold text-gray-700">Besoins :</span>
            <span className="text-sm font-bold text-gray-900">{linkedNeedsCount}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0">📊</span>
            <span className="text-sm font-semibold text-gray-700">Stories :</span>
            <span className="text-sm font-bold text-gray-900">{linkedStoriesCount}</span>
          </div>
          
          {objective.targetDate && (
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0">📅</span>
              <span className="text-sm text-gray-600">
                {new Date(objective.targetDate).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          )}
        </div>

        {/* Barre de progression */}
        {objective.status === 'active' && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Progression</span>
              <span className="text-sm font-bold text-gray-900">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-green-500 transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer standardisé - Badge produit + autres badges + 3 boutons */}
      <CardFooter
        product={product}
        badges={footerBadges}
        onView={() => onView(objective)}
        onEdit={() => onEdit(objective)}
        onDelete={() => onDelete(objective.id)}
        viewLabel={`Voir l'objectif ${objective.title}`}
        editLabel={`Modifier l'objectif ${objective.title}`}
        deleteLabel={`Supprimer l'objectif ${objective.title}`}
      />
    </div>
  );
};

export default memo(ObjectiveCard);
