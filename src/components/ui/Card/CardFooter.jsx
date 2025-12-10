import { memo } from 'react';
import PropTypes from 'prop-types';
import { Eye, Edit2, Trash2 } from 'lucide-react';

/**
 * CardFooter - Footer standardisé pour les cards
 * 
 * Structure standardisée :
 * - À gauche : Badge produit (obligatoire sauf pour Teams) + autres badges optionnels
 * - À droite : TOUJOURS les 3 boutons d'action (View, Edit, Delete)
 * 
 * ✅ RESPONSIVE : Touch targets optimisés pour mobile (44px minimum)
 * - Mobile : padding p-3 (12px) + icône 20px = 44px total ✅
 * - Desktop : padding sm:p-2 (8px) + icône réduite = compact
 * 
 * @param {Object} props
 * @param {Object} [props.product] - Produit associé { code, name, color }
 * @param {React.ReactNode} [props.badges] - Badges supplémentaires (statut, priorité, etc.)
 * @param {boolean} [props.showProductBadge=true] - Afficher le badge produit (false uniquement pour Teams)
 * @param {Function} props.onView - Callback pour voir les détails (obligatoire)
 * @param {Function} props.onEdit - Callback pour modifier (obligatoire)
 * @param {Function} props.onDelete - Callback pour supprimer (obligatoire)
 * @param {string} props.viewLabel - Label aria pour le bouton View
 * @param {string} props.editLabel - Label aria pour le bouton Edit
 * @param {string} props.deleteLabel - Label aria pour le bouton Delete
 */
const CardFooter = ({
  product,
  badges,
  showProductBadge = true,
  onView,
  onEdit,
  onDelete,
  viewLabel = "Voir détails",
  editLabel = "Modifier",
  deleteLabel = "Supprimer"
}) => {
  return (
    <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      {/* Badges à gauche */}
      <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
        {/* Badge produit (par défaut affiché, sauf exception Teams) */}
        {showProductBadge && product && (
          <span 
            className="px-2 py-1 rounded text-sm font-bold text-white"
            style={{ backgroundColor: product.color }}
            title={product.name}
          >
            {product.code}
          </span>
        )}
        
        {/* Autres badges */}
        {badges}
      </div>

      {/* Boutons d'action à droite - TOUJOURS les 3 */}
      {/* ✅ RESPONSIVE : Touch targets 44px mobile, compact desktop */}
      <div className="flex gap-1.5 sm:gap-2 flex-shrink-0 self-end sm:self-auto">
        <button
          onClick={onView}
          className="p-3 sm:p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors active:scale-95"
          title="Voir détails"
          aria-label={viewLabel}
        >
          <Eye className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>
        
        <button
          onClick={onEdit}
          className="p-3 sm:p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors active:scale-95"
          title="Modifier"
          aria-label={editLabel}
        >
          <Edit2 className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>
        
        <button
          onClick={onDelete}
          className="p-3 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
          title="Supprimer"
          aria-label={deleteLabel}
        >
          <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

CardFooter.propTypes = {
  product: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  badges: PropTypes.node,
  showProductBadge: PropTypes.bool,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  viewLabel: PropTypes.string,
  editLabel: PropTypes.string,
  deleteLabel: PropTypes.string,
};

export default memo(CardFooter);
