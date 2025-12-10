import { memo } from 'react';
import { CONTACT_TYPES } from '../../utils/constants';
import { CardHeader, CardFooter } from '../ui/Card/index';

/**
 * UserNeedCard - Carte d'affichage d'un besoin utilisateur
 * 
 * @param {Object} props
 * @param {Object} props.need - Données du besoin
 * @param {Array} props.products - Liste des produits
 * @param {Array} props.personas - Liste des personas
 * @param {Object} props.importanceConfig - Configuration des niveaux d'importance
 * @param {Function} props.getContactById - Fonction pour récupérer un contact par ID
 * @param {Function} props.getLinkedStories - Fonction pour récupérer les stories liées
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const UserNeedCard = ({
  need,
  products,
  personas,
  importanceConfig,
  getContactById,
  getLinkedStories,
  onView,
  onEdit,
  onDelete
}) => {
  const linkedStories = getLinkedStories(need.id);
  const stakeholders = (need.stakeholderIds || [])
    .map(id => getContactById(id))
    .filter(Boolean);
  const primaryContact = getContactById(need.primaryContactId || need.contactId);
  const importanceInfo = importanceConfig[need.importance] || importanceConfig.medium;
  const product = products.find(p => p.id === need.productId);
  const linkedPersonas = (need.personaIds || [])
    .map(id => personas.find(p => p.id === id))
    .filter(Boolean);

  // Badges du footer
  const footerBadges = (
    <>
      <span className={`px-2 py-1 rounded-full text-sm font-medium whitespace-nowrap ${importanceInfo.badgeClass}`}>
        {importanceInfo.label}
      </span>
      {(need.storyPoints || need.effort) ? (
        <span className={`px-2 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
          need.storyPoints ? (
            need.storyPoints <= 2 ? 'bg-green-100 text-green-800' :
            need.storyPoints === 3 ? 'bg-yellow-100 text-yellow-800' :
            need.storyPoints === 5 ? 'bg-orange-100 text-orange-800' :
            need.storyPoints === 8 ? 'bg-red-100 text-red-800' :
            need.storyPoints === 13 ? 'bg-purple-100 text-purple-800' :
            'bg-gray-800 text-white'
          ) : 'bg-gray-100 text-gray-800'
        }`}>
          {need.storyPoints ? `${need.storyPoints} SP` :
           need.effort === 'low' ? 'Faible' :
           need.effort === 'medium' ? 'Moyen' :
           need.effort === 'high' ? 'Élevé' : 'Non estimé'}
        </span>
      ) : (
        <span className="px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 whitespace-nowrap">
          Non estimé
        </span>
      )}
      {linkedStories.length > 0 && (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium whitespace-nowrap">
          {linkedStories.length} stor{linkedStories.length > 1 ? 'ies' : 'y'}
        </span>
      )}
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le titre */}
      <CardHeader title={need.objective || 'Objectif non défini'} />

      {/* Corps */}
      <div className="p-5 flex-1 space-y-3">
        {/* Stakeholders */}
        {stakeholders.length > 0 && (
          <div>
            <span className="text-sm text-gray-600">
              👥 Stakeholders : {stakeholders.slice(0, 2).map((contact, index) => (
                <span key={contact.id}>
                  {contact.name}{index < Math.min(stakeholders.length, 2) - 1 && ', '}
                </span>
              ))}
              {stakeholders.length > 2 && (
                <span className="text-sm text-gray-500"> +{stakeholders.length - 2}</span>
              )}
            </span>
          </div>
        )}

        {/* Contact */}
        {primaryContact && (
          <div>
            <span className="text-sm text-gray-600">
              {primaryContact.type === CONTACT_TYPES.INTERNAL ? '👤' : '🏢'} Contact : {primaryContact.name}
            </span>
          </div>
        )}

        {/* Personas */}
        {linkedPersonas.length > 0 && (
          <div>
            <span className="text-sm text-gray-600">
              🎭 Persona{linkedPersonas.length > 1 ? 's' : ''} : {linkedPersonas.slice(0, 2).map((persona, index) => (
                <span key={persona.id}>
                  {persona.name}{index < Math.min(linkedPersonas.length, 2) - 1 && ', '}
                </span>
              ))}
              {linkedPersonas.length > 2 && (
                <span className="text-sm text-gray-500"> +{linkedPersonas.length - 2}</span>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Footer standardisé - Badge produit + badges + 3 boutons */}
      <CardFooter
        product={product}
        badges={footerBadges}
        onView={() => onView(need)}
        onEdit={() => onEdit(need)}
        onDelete={() => onDelete(need.id)}
        viewLabel={`Voir les détails du besoin ${need.objective || 'sans titre'}`}
        editLabel={`Modifier le besoin ${need.objective || 'sans titre'}`}
        deleteLabel={`Supprimer le besoin ${need.objective || 'sans titre'}`}
      />
    </div>
  );
};

export default memo(UserNeedCard);
