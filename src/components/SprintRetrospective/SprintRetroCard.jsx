import { memo } from 'react';
import { CardHeader, CardFooter } from '../ui/Card/index';

/**
 * SprintRetroCard - Carte d'affichage d'une Rétrospective
 * 
 * @param {Object} props
 * @param {Object} props.retro - Données de la rétro
 * @param {Object} props.sprint - Sprint associé
 * @param {Object} props.product - Produit associé
 * @param {Function} props.getStatusBadge - Fonction pour obtenir le badge de statut
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const SprintRetroCard = ({
  retro,
  sprint,
  product,
  getStatusBadge,
  onView,
  onEdit,
  onDelete
}) => {
  // Badges du footer
  const footerBadges = getStatusBadge(retro.status);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le nom du sprint */}
      <CardHeader title={sprint?.name || 'Sprint inconnu'} />

      {/* Corps */}
      <div className="p-5 flex-1 space-y-3">
        {/* Engagements pour le Prochain Sprint */}
        {retro.nextSprintCommitments && retro.nextSprintCommitments.trim() && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex-shrink-0">🎯</span>
              <span className="text-sm font-semibold text-gray-700">Engagements pour le Prochain Sprint</span>
            </div>
            <div className="space-y-2">
              {retro.nextSprintCommitments.split('\n').filter(line => line.trim()).map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-gray-600 mt-0.5">✓</span>
                  <p className="text-sm text-gray-600 flex-1">{line.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date et durée */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex-shrink-0">📅</span>
          {retro.retroDate && (
            <span className="text-sm text-gray-600">
              {new Date(retro.retroDate).toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
          )}
          
          {retro.duration && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">{retro.duration} min</span>
            </>
          )}
        </div>
      </div>

      {/* Footer standardisé - Badge produit + statut + 3 boutons */}
      <CardFooter
        product={product}
        badges={footerBadges}
        onView={() => onView(retro)}
        onEdit={() => onEdit(retro)}
        onDelete={() => onDelete(retro)}
        viewLabel="Voir les détails de la rétro"
        editLabel="Modifier la rétro"
        deleteLabel={`Supprimer la rétro du ${sprint?.name}`}
      />
    </div>
  );
};

export default memo(SprintRetroCard);
