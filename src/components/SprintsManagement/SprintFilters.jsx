import PropTypes from 'prop-types';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';
import { CustomSelect } from '../ui';

/**
 * SprintFilters - Interface de filtrage standardisée pour les sprints
 * 
 * @param {Object} props
 * @param {string} props.filterStatus - Filtre statut
 * @param {Function} props.setFilterStatus - Callback filtre statut
 * @param {string} props.filterProduct - Filtre produit
 * @param {Function} props.setFilterProduct - Callback filtre produit
 * @param {string} props.filterTeam - Filtre équipe
 * @param {Function} props.setFilterTeam - Callback filtre équipe
 * @param {string} props.filterDateRange - Filtre période
 * @param {Function} props.setFilterDateRange - Callback filtre période
 * @param {string} props.sortBy - Critère de tri
 * @param {Function} props.setSortBy - Callback tri
 * @param {boolean} props.isFiltersExpanded - État expansion filtres
 * @param {Function} props.setIsFiltersExpanded - Callback expansion
 * @param {Array} props.products - Liste produits
 * @param {Array} props.teams - Liste équipes
 * @param {Object} props.sprintsByStatus - Stats par statut
 * @param {Function} props.onResetFilters - Callback réinitialisation
 * @param {Function} props.onAdd - Callback création sprint
 */
const SprintFilters = ({
  filterStatus,
  setFilterStatus,
  filterProduct,
  setFilterProduct,
  filterTeam,
  setFilterTeam,
  filterDateRange,
  setFilterDateRange,
  sortBy,
  setSortBy,
  isFiltersExpanded,
  setIsFiltersExpanded,
  totalCount,
  products,
  teams,
  sprintsByStatus,
  onResetFilters,
  onAdd
}) => {
  const hasActiveFilters = 
    filterStatus !== 'all' || 
    filterProduct !== 'all' || 
    filterTeam !== 'all' || 
    filterDateRange !== 'all' || 
    sortBy !== 'startDate';

  // Options pour les selects CustomSelect
  const statusOptions = [
    { value: 'all', label: `Tous les statuts (${totalCount})` },
    { value: 'planned', label: `📅 Planifiés (${sprintsByStatus.planned})` },
    { value: 'active', label: `▶️ En cours (${sprintsByStatus.active})` },
    { value: 'completed', label: `✓ Terminés (${sprintsByStatus.completed})` }
  ];

  const teamOptions = [
    { value: 'all', label: 'Toutes les équipes' },
    ...teams.map(team => ({ value: team.id, label: team.name }))
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Toutes les périodes' },
    { value: 'current', label: '📍 En cours (aujourd\'hui)' },
    { value: 'upcoming', label: '➡️ À venir' },
    { value: 'past', label: '⬅️ Passés' }
  ];

  return (
    <FilterBar
      isExpanded={isFiltersExpanded}
      onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
      onAdd={onAdd}
      addLabel="Nouveau Sprint"
      hasActiveFilters={hasActiveFilters}
      onResetFilters={onResetFilters}
      topLeftContent={
        /* Sélecteur Produit - Toujours visible */
        products.length > 0 && (
          <ProductSelector
            products={products}
            value={filterProduct}
            onChange={setFilterProduct}
            placeholder="Tous les produits"
            className="w-full sm:w-64"
          />
        )
      }
      filters={
        <>
          {/* Filtre Statut */}
          <CustomSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={statusOptions}
            aria-label="Filtrer par statut"
          />

          {/* Filtre Équipe */}
          <CustomSelect
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
            options={teamOptions}
            aria-label="Filtrer par équipe"
          />

          {/* Filtre Période */}
          <CustomSelect
            value={filterDateRange}
            onChange={(e) => setFilterDateRange(e.target.value)}
            options={dateRangeOptions}
            aria-label="Filtrer par période"
          />

          {/* Boutons de tri */}
          <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
            <button
              onClick={() => setSortBy('startDate')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === 'startDate' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Trier par date de début"
            >
              Date début
            </button>
            <button
              onClick={() => setSortBy('endDate')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === 'endDate' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Trier par date de fin"
            >
              Date fin
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === 'name' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Trier par nom"
            >
              Nom
            </button>
            <button
              onClick={() => setSortBy('progress')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === 'progress' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Trier par progression"
            >
              Progression
            </button>
          </div>
        </>
      }
    />
  );
};

SprintFilters.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  filterProduct: PropTypes.string.isRequired,
  setFilterProduct: PropTypes.func.isRequired,
  filterTeam: PropTypes.string.isRequired,
  setFilterTeam: PropTypes.func.isRequired,
  filterDateRange: PropTypes.string.isRequired,
  setFilterDateRange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  isFiltersExpanded: PropTypes.bool.isRequired,
  setIsFiltersExpanded: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  products: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
  sprintsByStatus: PropTypes.shape({
    planned: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired
  }).isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default SprintFilters;
