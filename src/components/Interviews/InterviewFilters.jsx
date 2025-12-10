import { INTERVIEW_STATUS, TYPE_CONFIG, DATE_RANGE_OPTIONS } from '../../constants/interviewConfig';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';
import { CustomSelect } from '../ui';

/**
 * InterviewFilters - Barre de filtres standardisée
 * 
 * Composant responsable de :
 * - Filtres : statut, type, contact, produit, période
 * - Tri (date, statut, contact, type, insights)
 * - Actions : Nouvel entretien
 * 
 * @component
 */
const InterviewFilters = ({
  // États de filtrage
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
  filterContact,
  setFilterContact,
  productFilter,
  setProductFilter,
  filterDateRange,
  setFilterDateRange,
  sortBy,
  setSortBy,
  
  // Données pour les filtres
  interviews,
  contacts,
  products,
  
  // État d'affichage
  isFiltersExpanded,
  setIsFiltersExpanded,
  
  // Actions
  onResetFilters,
  onAdd
}) => {
  // Calculer si des filtres sont actifs
  const hasActiveFilters = 
    filterStatus !== 'all' || 
    filterType !== 'all' || 
    filterContact !== 'all' || 
    filterDateRange !== 'all' || 
    productFilter !== 'all' || 
    sortBy !== 'date';

  return (
    <FilterBar
      isExpanded={isFiltersExpanded}
      onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
      onAdd={onAdd}
      addLabel="Préparer un entretien"
      hasActiveFilters={hasActiveFilters}
      onResetFilters={onResetFilters}
      topLeftContent={
        /* Sélecteur Produit - Toujours visible */
        products.length > 0 && (
          <ProductSelector
            products={products}
            value={productFilter}
            onChange={setProductFilter}
            placeholder="Tous les produits"
            className="w-full sm:w-64"
          />
        )
      }
      filters={
        <>
          {/* Filtre Période */}
          <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Période</label>
            <CustomSelect
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              options={DATE_RANGE_OPTIONS.map(option => ({
                value: option.value,
                label: option.label
              }))}
              aria-label="Filtrer par période"
            />
          </div>

          {/* Filtre Contact */}
          <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Contact</label>
            <CustomSelect
              value={filterContact}
              onChange={(e) => setFilterContact(e.target.value)}
              options={[
                { value: 'all', label: 'Tous les contacts' },
                ...contacts.map(contact => ({
                  value: contact.id,
                  label: contact.name
                }))
              ]}
              aria-label="Filtrer par contact"
            />
          </div>

          {/* Filtre Type d'entretien */}
          <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type</label>
            <CustomSelect
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              options={[
                { value: 'all', label: 'Tous les types' },
                ...Object.entries(TYPE_CONFIG).map(([key, config]) => ({
                  value: key,
                  label: `${config.emoji} ${config.label}`
                }))
              ]}
              aria-label="Filtrer par type d'entretien"
            />
          </div>

          {/* Filtre Statut */}
          <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Statut</label>
            <CustomSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: 'all', label: `Tous les statuts (${interviews.length})` },
                { 
                  value: INTERVIEW_STATUS.SCHEDULED, 
                  label: `Planifiés (${interviews.filter(i => i.status === INTERVIEW_STATUS.SCHEDULED).length})` 
                },
                { 
                  value: INTERVIEW_STATUS.IN_PROGRESS, 
                  label: `En cours (${interviews.filter(i => i.status === INTERVIEW_STATUS.IN_PROGRESS).length})` 
                },
                { 
                  value: INTERVIEW_STATUS.COMPLETED, 
                  label: `Terminés (${interviews.filter(i => i.status === INTERVIEW_STATUS.COMPLETED).length})` 
                },
                { 
                  value: INTERVIEW_STATUS.CANCELLED, 
                  label: `Annulés (${interviews.filter(i => i.status === INTERVIEW_STATUS.CANCELLED).length})` 
                }
              ]}
              aria-label="Filtrer par statut"
            />
          </div>

          {/* Boutons de tri */}
          <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
            <button
              onClick={() => setSortBy('date')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === 'date' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Trier par date"
            >
              Date
            </button>
            <button
              onClick={() => setSortBy('status')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === 'status' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Trier par statut"
            >
              Statut
            </button>
            <button
              onClick={() => setSortBy('type')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === 'type' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Trier par type"
            >
              Type
            </button>
            <button
              onClick={() => setSortBy('contact')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === 'contact' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Trier par contact"
            >
              Contact
            </button>
          </div>
        </>
      }
    />
  );
};

export default InterviewFilters;
