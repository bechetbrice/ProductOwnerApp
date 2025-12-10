import { useState } from 'react';
import { Filter, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * AnalysisFilters - Composant de filtres pour les modules d'analyse
 * Permet de filtrer par produit, stakeholder et couverture stories
 */
const AnalysisFilters = ({
  products,
  contacts,
  productFilter,
  setProductFilter,
  stakeholderFilter,
  setStakeholderFilter,
  coverageFilter,
  setCoverageFilter,
  onResetFilters,
  filteredCount,
  totalCount,
  showStakeholderFilter = true,
  showCoverageFilter = true
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const hasActiveFilters = 
    productFilter !== 'all' || 
    (showStakeholderFilter && stakeholderFilter !== 'all') || 
    (showCoverageFilter && coverageFilter !== 'all');

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        <button
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors"
          aria-expanded={isFiltersExpanded}
          aria-controls="analysis-filters-section"
        >
          <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Filtre et Actions</span>
          <span className="sm:hidden">Filtres</span>
          {isFiltersExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
        <div className="flex gap-1.5 sm:gap-2">
          <button
            onClick={onResetFilters}
            className="px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5 sm:gap-2"
            aria-label="Réinitialiser tous les filtres"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Section repliable */}
      {isFiltersExpanded && (
        <div id="analysis-filters-section">
          {/* Filtres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Filtre Produit */}
        {products.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Filtrer par produit"
            >
              <option value="all">Tous les produits</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  [{product.code}] {product.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtre Stakeholder */}
        {showStakeholderFilter && contacts.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stakeholder</label>
            <select
              value={stakeholderFilter}
              onChange={(e) => setStakeholderFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Filtrer par stakeholder"
            >
              <option value="all">Tous les stakeholders</option>
              {contacts.map(contact => (
                <option key={contact.id} value={contact.id}>
                  {contact.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtre Couverture Stories */}
        {showCoverageFilter && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couverture Stories</label>
            <select
              value={coverageFilter}
              onChange={(e) => setCoverageFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Filtrer par couverture stories"
            >
              <option value="all">Tous</option>
              <option value="with">Avec stories</option>
              <option value="without">Sans stories</option>
            </select>
          </div>
        )}
      </div>

      {/* Compteur de résultats */}
      {hasActiveFilters && filteredCount < totalCount && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
          <strong className="text-emerald-600">{filteredCount}</strong> besoin{filteredCount > 1 ? 's' : ''} affiché{filteredCount > 1 ? 's' : ''} sur <strong className="text-gray-800">{totalCount}</strong>
        </div>
      )}
        </div>
      )}
    </div>
  );
};

export default AnalysisFilters;
