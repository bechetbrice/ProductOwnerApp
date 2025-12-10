import { memo } from 'react';
import { Users } from 'lucide-react';
import { CONTACT_TYPES } from '../../utils/constants';
import { CardHeader, CardFooter } from '../ui/Card/index';

/**
 * ContactCard - Carte d'affichage d'un contact
 * Optimisée pour responsive mobile-first
 * 
 * @param {Object} props
 * @param {Object} props.contact - Données du contact
 * @param {Array} props.products - Liste des produits
 * @param {Function} props.hasTeamFields - Fonction pour vérifier si c'est un membre d'équipe
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const ContactCard = ({ 
  contact, 
  products, 
  hasTeamFields,
  onView, 
  onEdit, 
  onDelete 
}) => {
  const isTeamMember = hasTeamFields ? hasTeamFields(contact) : false;

  // Récupérer le produit principal (premier produit assigné)
  const primaryProduct = contact.productIds && contact.productIds.length > 0
    ? products.find(p => p.id === contact.productIds[0])
    : null;

  // Récupérer tous les produits assignés
  const assignedProducts = contact.productIds
    ? contact.productIds.map(id => products.find(p => p.id === id)).filter(Boolean)
    : [];

  // Badges supplémentaires du footer (SANS les produits - ils sont dans le corps)
  const footerBadges = (
    <>
      {/* Badge membre équipe */}
      {isTeamMember && contact.isActive && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
          <Users size={14} />
          <span>Équipe</span>
        </span>
      )}
      
      {/* Badge disponibilité */}
      {isTeamMember && contact.isActive && contact.isAvailable && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
          <span>✓</span>
          <span>Disponible</span>
        </span>
      )}
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le nom */}
      <CardHeader title={contact.name} />

      {/* Corps de la carte */}
      <div className="p-5 flex-1 space-y-3">
        {/* Rôle */}
        <p className="text-sm font-medium text-gray-800 line-clamp-2">
          💼 {contact.role}
        </p>

        {/* Entreprise ou département avec badge type */}
        {contact.type === CONTACT_TYPES.EXTERNAL && contact.company && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block px-2 py-1 rounded text-sm font-medium bg-purple-100 text-purple-800">
              Externe
            </span>
            <p className="text-sm text-gray-600 truncate">
              {contact.company}
            </p>
          </div>
        )}
        
        {contact.type === CONTACT_TYPES.INTERNAL && contact.department && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
              Interne
            </span>
            <p className="text-sm text-gray-600 truncate">
              {contact.department}
            </p>
          </div>
        )}

        {/* Produits assignés (si plusieurs) */}
        {assignedProducts.length > 1 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              📦 Produits ({assignedProducts.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {assignedProducts.map(product => (
                <span
                  key={product.id}
                  className="px-2 py-1 rounded text-sm font-bold text-white"
                  style={{ backgroundColor: product.color }}
                  title={product.name}
                >
                  {product.code}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Coordonnées */}
        <div className="space-y-2">
          {contact.email && (
            <a 
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors group"
              aria-label={`Envoyer un email à ${contact.name}`}
            >
              <span className="flex-shrink-0">📧</span>
              <span className="truncate group-hover:underline">{contact.email}</span>
            </a>
          )}
          
          {contact.phone && (
            <a 
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors group"
              aria-label={`Appeler ${contact.name}`}
            >
              <span className="flex-shrink-0">📞</span>
              <span className="group-hover:underline truncate">{contact.phone}</span>
            </a>
          )}
        </div>
      </div>

      {/* Footer standardisé - Badge produit + autres badges + 3 boutons */}
      <CardFooter
        product={primaryProduct}
        badges={footerBadges}
        onView={() => onView(contact)}
        onEdit={() => onEdit(contact)}
        onDelete={() => onDelete(contact.id)}
        viewLabel={`Voir détails de ${contact.name}`}
        editLabel={`Modifier ${contact.name}`}
        deleteLabel={`Supprimer ${contact.name}`}
      />
    </div>
  );
};

export default memo(ContactCard);
