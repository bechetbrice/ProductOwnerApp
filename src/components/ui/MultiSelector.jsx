import { useState } from 'react';
import { Search, X, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * MultiSelector - Composant universel de sélection multiple
 * Pattern moderne : Checkboxes + Badges cliquables
 * 
 * @param {Array} items - Liste des items disponibles
 * @param {Array} selectedIds - IDs des items sélectionnés
 * @param {Function} onChange - Callback quand la sélection change
 * @param {String} label - Label du champ
 * @param {Boolean} required - Champ obligatoire
 * @param {String} emptyMessage - Message si liste vide
 * @param {String} placeholder - Placeholder pour la recherche
 * @param {Boolean} searchable - Activer la recherche
 * @param {Function} renderItem - Fonction custom pour render un item (optionnel)
 * @param {Function} renderBadge - Fonction custom pour render un badge (optionnel)
 * @param {Function} getItemKey - Fonction pour obtenir la clé unique (par défaut: item.id)
 * @param {Function} getItemLabel - Fonction pour obtenir le label principal
 * @param {Function} getItemSubLabel - Fonction pour obtenir le sous-label (optionnel)
 * @param {Function} getItemMetadata - Fonction pour obtenir les métadonnées (optionnel)
 * @param {Number} maxHeight - Hauteur max de la zone scrollable (en pixels)
 * @param {String} className - Classes CSS additionnelles
 */
const MultiSelector = ({
  items = [],
  selectedIds = [],
  onChange,
  label,
  required = false,
  emptyMessage = "Aucun élément disponible",
  placeholder = "Rechercher...",
  searchable = false,
  renderItem = null,
  renderBadge = null,
  getItemKey = (item) => item.id,
  getItemLabel = (item) => item.name,
  getItemSubLabel = null,
  getItemMetadata = null,
  maxHeight = 256, // 16rem par défaut
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Gestion toggle sélection
  const handleToggle = (itemId) => {
    if (selectedIds.includes(itemId)) {
      onChange(selectedIds.filter(id => id !== itemId));
    } else {
      onChange([...selectedIds, itemId]);
    }
  };

  // Filtrage par recherche
  const filteredItems = searchable
    ? items.filter(item => {
        const label = getItemLabel(item).toLowerCase();
        const subLabel = getItemSubLabel ? getItemSubLabel(item)?.toLowerCase() || '' : '';
        const query = searchQuery.toLowerCase();
        return label.includes(query) || subLabel.includes(query);
      })
    : items;

  // Items sélectionnés pour les badges
  const selectedItems = selectedIds
    .map(id => items.find(item => getItemKey(item) === id))
    .filter(Boolean);

  // Render par défaut d'un item
  const defaultRenderItem = (item, isSelected) => {
    const key = getItemKey(item);
    const label = getItemLabel(item);
    const subLabel = getItemSubLabel ? getItemSubLabel(item) : null;
    const metadata = getItemMetadata ? getItemMetadata(item) : null;

    return (
      <label
        key={key}
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleToggle(key)}
          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-800 truncate">
            {label}
          </div>
          {(subLabel || metadata) && (
            <div className="text-xs text-gray-600">
              {subLabel}
              {metadata && (
                <span className="ml-2 text-emerald-600 font-semibold">
                  {metadata}
                </span>
              )}
            </div>
          )}
        </div>
      </label>
    );
  };

  // Render par défaut d'un badge
  const defaultRenderBadge = (item) => {
    const key = getItemKey(item);
    const label = getItemLabel(item);

    return (
      <span
        key={key}
        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700"
      >
        {label}
        <button
          type="button"
          onClick={() => handleToggle(key)}
          className="ml-1 hover:text-emerald-900"
          aria-label={`Retirer ${label}`}
        >
          <X size={14} />
        </button>
      </span>
    );
  };

  const itemRenderer = renderItem || defaultRenderItem;
  const badgeRenderer = renderBadge || defaultRenderBadge;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Zone des badges sélectionnés */}
      {selectedItems.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2 p-3 bg-white border border-emerald-200 rounded-lg">
          {selectedItems.map(item => badgeRenderer(item))}
        </div>
      )}

      {/* Compteur */}
      {selectedItems.length > 0 && (
        <div className="mb-2">
          <span className="text-emerald-600 font-semibold text-sm">
            {selectedItems.length} élément{selectedItems.length > 1 ? 's' : ''} sélectionné{selectedItems.length > 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Message si liste vide */}
      {items.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{emptyMessage}</span>
          </p>
        </div>
      ) : (
        <>
          {/* Barre de recherche optionnelle */}
          {searchable && (
            <div className="mb-3 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
          )}

          {/* Liste des items avec checkboxes */}
          <div
            className="space-y-2 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white"
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {filteredItems.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Aucun résultat pour "{searchQuery}"
              </p>
            ) : (
              filteredItems.map(item => {
                const key = getItemKey(item);
                const isSelected = selectedIds.includes(key);
                return itemRenderer(item, isSelected);
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

MultiSelector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  emptyMessage: PropTypes.string,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  renderItem: PropTypes.func,
  renderBadge: PropTypes.func,
  getItemKey: PropTypes.func,
  getItemLabel: PropTypes.func,
  getItemSubLabel: PropTypes.func,
  getItemMetadata: PropTypes.func,
  maxHeight: PropTypes.number,
  className: PropTypes.string
};

export default MultiSelector;
