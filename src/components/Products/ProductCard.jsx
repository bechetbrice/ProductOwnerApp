import { memo } from 'react';
import { CheckCircle2, Archive, FileText, Clock } from 'lucide-react';
import { CardHeader, CardFooter } from '../ui/Card/index';

/**
 * ProductCard - Carte d'affichage d'un produit
 * 
 * @param {Object} props
 * @param {Object} props.product - Données du produit avec stats
 * @param {Array} props.contacts - Liste des contacts
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const ProductCard = ({ product, contacts, onView, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'draft': return 'Brouillon';
      case 'active': return 'Actif';
      case 'archived': return 'Archivé';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'archived': return <Archive className="w-3.5 h-3.5" />;
      case 'draft': return <FileText className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  // Badges du footer (badge produit sera affiché automatiquement)
  const footerBadges = (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
      {getStatusIcon(product.status)}
      {getStatusLabel(product.status)}
    </span>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le nom */}
      <CardHeader title={product.name} />

      {/* Corps de la carte */}
      <div className="p-5 flex-1 space-y-3">
        {/* Client(s) */}
        <div className="text-sm text-gray-600">
          <span className="flex-shrink-0">🏬</span> Client(s) : {product.clientIds && product.clientIds.length > 0
            ? product.clientIds
                .map(id => contacts?.find(c => c.id === id)?.name)
                .filter(Boolean)
                .join(', ') || 'Non défini'
            : 'Non défini'}
        </div>

        {/* Product Owner */}
        <div className="text-sm text-gray-600">
          <span className="flex-shrink-0">👤</span> Product Owner : {product.ownerId
            ? contacts?.find(c => c.id === product.ownerId)?.name || 'Non défini'
            : 'Non défini'}
        </div>
      </div>

      {/* Footer standardisé - Badge produit (code + couleur) + statut + 3 boutons */}
      <CardFooter
        product={product}
        badges={footerBadges}
        onView={() => onView(product)}
        onEdit={() => onEdit(product)}
        onDelete={() => onDelete(product.id)}
        viewLabel={`Voir le produit ${product.name}`}
        editLabel={`Modifier le produit ${product.name}`}
        deleteLabel={`Supprimer le produit ${product.name}`}
      />
    </div>
  );
};

export default memo(ProductCard);
