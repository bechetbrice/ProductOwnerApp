import { memo } from 'react';
import { CardHeader, CardFooter } from '../ui/Card/index';
import { InfoTooltip } from '../ui';

/**
 * TeamCard - Carte d'affichage d'une équipe avec InfoTooltips
 * 
 * @param {Object} props
 * @param {Object} props.team - Données de l'équipe
 * @param {Array} props.contacts - Liste des contacts
 * @param {Array} props.products - Liste des produits
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const TeamCard = ({ team, contacts, products, onView, onEdit, onDelete }) => {
  // Récupérer les membres de l'équipe
  const teamMembers = team.memberContactIds
    ? contacts.filter(c => team.memberContactIds.includes(c.id))
    : [];

  // Récupérer les produits associés
  const teamProducts = team.productIds
    ? products.filter(p => team.productIds.includes(p.id))
    : [];

  // Calculer la capacité de l'équipe
  const teamCapacity = teamMembers.reduce((sum, member) => {
    if (!member.capacity) return sum;
    const adjustedCapacity = (member.capacity * (member.availability ?? 100) * (member.workload ?? 100)) / 10000;
    return sum + adjustedCapacity;
  }, 0);

  // Badges du footer (SANS badge produit pour Teams)
  const footerBadges = (
    <>
      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
        team.status === 'active' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        {team.status === 'active' ? '✓ Active' : 'Inactive'}
      </span>
      {teamMembers.length > 0 && (
        <span className="px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
          {teamMembers.length} membre{teamMembers.length > 1 ? 's' : ''}
        </span>
      )}
      {teamCapacity > 0 && (
        <span className="px-2 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
          {Math.round(teamCapacity)} pts/sprint
        </span>
      )}
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le nom */}
      <CardHeader title={team.name} />

      {/* Corps */}
      <div className="p-5 flex-1 space-y-3">
        {/* Description */}
        {team.description && (
          <p className="text-sm text-gray-600">
            {team.description}
          </p>
        )}

        {/* Membres avec InfoTooltip */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <p className="text-sm font-semibold text-gray-700">
              👥 Membres ({teamMembers.length})
            </p>
            <InfoTooltip 
              text="Nombre de membres actifs dans l'équipe. Seuls les contacts internes marqués comme 'membre d'équipe' peuvent être ajoutés."
              size={12}
            />
          </div>
          {teamMembers.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {teamMembers.slice(0, 3).map(member => (
                <span
                  key={member.id}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm truncate"
                  title={member.name}
                >
                  {member.name}
                </span>
              ))}
              {teamMembers.length > 3 && (
                <span className="px-2 py-1 text-sm text-gray-500">
                  +{teamMembers.length - 3}
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Aucun membre</p>
          )}
        </div>

        {/* Capacité avec InfoTooltip */}
        {teamMembers.length > 0 && teamCapacity > 0 && (
          <div>
            <div className="flex items-center gap-1 mb-2">
              <p className="text-sm font-semibold text-gray-700">
                ⚡ Capacité
              </p>
              <InfoTooltip 
                text="Capacité calculée automatiquement en fonction de la disponibilité et de la charge de travail de chaque membre. Utilisée pour planifier le nombre de story points par sprint."
                size={12}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-indigo-600">
                {Math.round(teamCapacity)}
              </span>
              <span className="text-sm text-gray-500">story points / sprint</span>
            </div>
          </div>
        )}

        {/* Produits */}
        {teamProducts.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              📦 Produits ({teamProducts.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {teamProducts.slice(0, 2).map(product => (
                <span
                  key={product.id}
                  className="px-2 py-1 rounded text-sm font-bold text-white"
                  style={{ backgroundColor: product.color }}
                  title={product.name}
                >
                  {product.code}
                </span>
              ))}
              {teamProducts.length > 2 && (
                <span className="text-sm text-gray-500">
                  +{teamProducts.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer standardisé - SANS badge produit (exception Teams) + badges + 3 boutons */}
      <CardFooter
        showProductBadge={false}
        badges={footerBadges}
        onView={() => onView(team)}
        onEdit={() => onEdit(team)}
        onDelete={() => onDelete(team.id)}
        viewLabel={`Voir les détails de ${team.name}`}
        editLabel={`Modifier ${team.name}`}
        deleteLabel={`Supprimer ${team.name}`}
      />
    </div>
  );
};

export default memo(TeamCard);
