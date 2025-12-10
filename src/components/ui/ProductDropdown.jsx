import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, X } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * ProductDropdown - Sélecteur dropdown de produit(s)
 * Version 2.0 - Harmonisation style émeraude
 * 
 * Format: Badge coloré + Nom produit + Owner (dans liste déroulante)
 * Supporte sélection simple ET multiple
 * 
 * @param {string} label - Label du champ
 * @param {Array} products - Liste des produits [{id, code, name, color, owner}]
 * @param {string|Array} value - ID(s) du/des produit(s) sélectionné(s)
 * @param {Function} onChange - Callback (productId|productIds) => void
 * @param {boolean} multiple - Mode sélection multiple (défaut: false)
 * @param {boolean} required - Champ requis
 * @param {string} placeholder - Texte si aucune sélection
 * @param {string} emptyMessage - Message si aucun produit disponible
 * @param {string} error - Message d'erreur
 */
const ProductDropdown = ({
  label,
  products = [],
  value = null,
  onChange,
  multiple = false,
  required = false,
  placeholder = '-- Sélectionner un produit --',
  emptyMessage = 'Aucun produit disponible',
  error,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Gérer la sélection
  const selectedIds = multiple 
    ? (Array.isArray(value) ? value : (value ? [value] : []))
    : (value ? [value] : []);

  // Produits sélectionnés
  const selectedProducts = products.filter(p => selectedIds.includes(p.id));

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (productId) => {
    if (multiple) {
      const isSelected = selectedIds.includes(productId);
      const newSelection = isSelected
        ? selectedIds.filter(id => id !== productId)
        : [...selectedIds, productId];
      onChange(newSelection);
      // Ne pas fermer le dropdown en mode multiple
    } else {
      onChange(productId);
      setIsOpen(false);
    }
  };

  const handleRemoveBadge = (productId, e) => {
    e.stopPropagation();
    if (multiple) {
      const newSelection = selectedIds.filter(id => id !== productId);
      onChange(newSelection);
    }
  };

  const isSelected = (productId) => selectedIds.includes(productId);
  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : null;

  return (
    <div className={className} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-normal text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {multiple && selectedIds.length > 0 && (
            <span className="text-emerald-600 font-semibold text-xs ml-2">
              ({selectedIds.length} sélectionné{selectedIds.length > 1 ? 's' : ''})
            </span>
          )}
        </label>
      )}

      {/* Bouton principal */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full min-h-[48px] flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 bg-white ${
            hasError
              ? 'border border-red-500 hover:border-red-600'
              : isOpen 
                ? 'border border-emerald-500 ring-1 ring-emerald-200' 
                : 'border border-gray-300 hover:border-gray-400'
          }`}
        >
          {/* Contenu sélectionné */}
          <div className="flex-1 flex items-center gap-2 flex-wrap min-h-[32px]">
            {selectedProducts.length > 0 ? (
              multiple ? (
                // Mode multiple : afficher les badges
                selectedProducts.map(product => (
                  <span
                    key={product.id}
                    className="inline-flex items-center gap-2 text-sm"
                  >
                    <span
                      className="px-2 py-1 rounded text-xs font-bold text-white"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.code}
                    </span>
                    <span className="text-gray-900">{product.name}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleRemoveBadge(product.id, e)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleRemoveBadge(product.id, e);
                        }
                      }}
                      className="ml-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                      aria-label={`Retirer ${product.name}`}
                    >
                      <X size={14} />
                    </span>
                  </span>
                ))
              ) : (
                // Mode simple : afficher le produit sélectionné
                <div className="flex items-center gap-3">
                  <span
                    className="px-2 py-1 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: selectedProducts[0].color }}
                  >
                    {selectedProducts[0].code}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedProducts[0].name}
                  </span>
                </div>
              )
            ) : (
              <span className="text-sm text-gray-500">{placeholder}</span>
            )}
          </div>

          {/* Icône dropdown */}
          <div className="ml-2 shrink-0">
            {isOpen ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
        </button>

        {/* Liste déroulante */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {products.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {emptyMessage}
              </div>
            ) : (
              <div className="py-2">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelect(product.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                      isSelected(product.id)
                        ? 'bg-emerald-50 hover:bg-emerald-100'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Badge produit */}
                    <span
                      className="shrink-0 px-2 py-1 rounded text-xs font-bold text-white"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.code}
                    </span>

                    {/* Nom + Owner */}
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">
                        {product.name}
                      </div>
                      {product.owner && (
                        <div className="text-xs text-gray-500 truncate">
                          {product.owner}
                        </div>
                      )}
                    </div>

                    {/* Icône sélection */}
                    {isSelected(product.id) && (
                      <CheckCircle2 
                        size={20} 
                        className="shrink-0 text-emerald-600"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message d'erreur */}
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

ProductDropdown.propTypes = {
  label: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    owner: PropTypes.string
  })),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  emptyMessage: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string
};

export default ProductDropdown;

/**
 * Notes de développement - Harmonisation émeraude:
 * 
 * Version 2.0 - Changements de style :
 * - ✅ text-indigo-600 → text-emerald-600 (compteur multi-sélection)
 * - ✅ border-indigo-500 ring-1 ring-indigo-200 → border-emerald-500 ring-1 ring-emerald-200 (focus)
 * - ✅ bg-indigo-50 hover:bg-indigo-100 → bg-emerald-50 hover:bg-emerald-100 (sélection)
 * - ✅ text-indigo-600 → text-emerald-600 (checkmark)
 * 
 * Fonctionnalités préservées :
 * - ✅ Mode simple et multiple
 * - ✅ Badges colorés produits
 * - ✅ Affichage owner
 * - ✅ Bouton remove en mode multiple
 * - ✅ Fermeture auto extérieur
 * - ✅ Gestion erreurs
 * - ✅ PropTypes validation
 * 
 * Usage (identique à v1.0) :
 * // Mode simple
 * <ProductDropdown
 *   label="Produit"
 *   products={products}
 *   value={selectedProductId}
 *   onChange={(id) => setSelectedProductId(id)}
 *   required
 * />
 * 
 * // Mode multiple
 * <ProductDropdown
 *   label="Produits"
 *   products={products}
 *   value={selectedProductIds}
 *   onChange={(ids) => setSelectedProductIds(ids)}
 *   multiple
 * />
 */
