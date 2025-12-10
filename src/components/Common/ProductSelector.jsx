import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * ProductSelector - Sélecteur de produits avec badges colorés
 * Version: 2.1 - Responsive flexible
 */
const ProductSelector = ({ 
  products = [], 
  value, 
  onChange, 
  placeholder = "Tous les produits",
  showCount = false,
  getCount = null,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedProduct = value !== 'all' ? products.find(p => p.id === value) : null;

  const handleSelect = (productId) => {
    onChange(productId);
    setIsOpen(false);
  };

  return (
    <div ref={selectorRef} className={`relative w-full ${className}`}>
      {/* Bouton de sélection - Full width */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white flex items-center justify-between hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
          {selectedProduct ? (
            <>
              <span 
                className="px-1.5 sm:px-2 py-0.5 rounded text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: selectedProduct.color }}
              >
                {selectedProduct.code}
              </span>
              <span className="truncate text-xs sm:text-sm">
                {selectedProduct.name}
                {showCount && getCount && <span className="hidden sm:inline ml-1">({getCount(selectedProduct.id)})</span>}
              </span>
            </>
          ) : (
            <span className="text-gray-600 text-xs sm:text-sm truncate">{placeholder}</span>
          )}
        </div>
        <ChevronDown 
          size={14} 
          className={`sm:w-4 sm:h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown des options */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-auto">
          {/* Option "Tous les produits" */}
          <button
            type="button"
            onClick={() => handleSelect('all')}
            className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center gap-1.5 sm:gap-2 ${
              value === 'all' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
            }`}
          >
            <span className="flex-1 truncate">{placeholder}</span>
          </button>

          {/* Ligne de séparation */}
          <div className="border-t border-gray-200" />

          {/* Options produits */}
          {products.map(product => (
            <button
              key={product.id}
              type="button"
              onClick={() => handleSelect(product.id)}
              className={`w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center gap-1.5 sm:gap-2 ${
                value === product.id ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
              }`}
            >
              <span 
                className="px-1.5 sm:px-2 py-0.5 rounded text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: product.color }}
              >
                {product.code}
              </span>
              <span className="flex-1 truncate">
                {product.name}
                {showCount && getCount && <span className="ml-1">({getCount(product.id)})</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSelector;
