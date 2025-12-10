import { Activity, BarChart, DollarSign, TrendingUp } from 'lucide-react';
import ProductSelector from '../../Common/ProductSelector';
import { FilterBar } from '../../Common';
import { CustomSelect } from '../../ui';
import {
  BUDGET_CATEGORY_CONFIG,
  BUDGET_STATUS_CONFIG,
  BUDGET_PERIOD_TYPE_CONFIG
} from '../../../utils/constants';

/**
 * Header du Dashboard avec navigation tabs et filtres
 */
const DashboardHeader = ({
  activeTab,
  onTabChange,
  products,
  selectedProductId,
  onProductChange,
  // Props spécifiques Budget
  budgetFilters,
  onBudgetFiltersChange,
  budgetFiltersExpanded,
  onBudgetFiltersExpandChange,
  onBudgetAdd,
  onBudgetResetFilters,
  sprints
}) => {
  const isEmpty = products.length === 0;

  if (isEmpty) return null;

  return (
    <div className="w-full max-w-full bg-white rounded-lg shadow">
      {/* MOBILE : Dropdown responsive */}
      <div className="sm:hidden p-3 border-b border-gray-200">
        <CustomSelect
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value)}
          options={[
            { value: 'overview', label: '📈 Vue d\'ensemble' },
            { value: 'roadmap', label: '📉 Roadmap' },
            { value: 'budget', label: '💵 Budget' },
            { value: 'sprintAnalytics', label: '📈 Sprint Analytics' }
          ]}
          aria-label="Sélectionner un onglet"
        />
      </div>

      {/* DESKTOP : Tabs traditionnels */}
      <div className="hidden sm:flex items-center border-b border-gray-200">
        <div className="flex-1 flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => onTabChange('overview')}
            icon={Activity}
            label="Vue d'ensemble"
          />
          <TabButton
            active={activeTab === 'roadmap'}
            onClick={() => onTabChange('roadmap')}
            icon={BarChart}
            label="Roadmap"
          />
          <TabButton
            active={activeTab === 'budget'}
            onClick={() => onTabChange('budget')}
            icon={DollarSign}
            label="Budget"
          />
          <TabButton
            active={activeTab === 'sprintAnalytics'}
            onClick={() => onTabChange('sprintAnalytics')}
            icon={TrendingUp}
            label="Sprint Analytics"
            labelMobile="Analytics"
          />
        </div>
      </div>

      {/* Ligne 2 : Filtres */}
      {activeTab === 'budget' ? (
        <div className="border-t border-gray-200">
          <FilterBar
            isExpanded={budgetFiltersExpanded}
            onToggleExpand={onBudgetFiltersExpandChange}
            onAdd={onBudgetAdd}
            addLabel="Nouvelle Ligne"
            hasActiveFilters={budgetFilters.sprintId || budgetFilters.category || budgetFilters.periodType || budgetFilters.status}
            onResetFilters={onBudgetResetFilters}
            topLeftContent={
              <div className="w-full sm:w-auto max-w-xs">
                <ProductSelector
                  products={products}
                  value={selectedProductId}
                  onChange={onProductChange}
                  placeholder="Tous les produits"
                  className="w-full sm:w-64"
                />
              </div>
            }
            filters={
              <>
                <div className="w-full sm:w-auto sm:max-w-[200px] min-w-0">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Sprint</label>
                  <CustomSelect
                    value={budgetFilters.sprintId}
                    onChange={(e) => onBudgetFiltersChange({ ...budgetFilters, sprintId: e.target.value })}
                    options={[
                      { value: '', label: 'Tous les sprints' },
                      ...sprints.map(sprint => ({
                        value: sprint.id,
                        label: sprint.name
                      }))
                    ]}
                    aria-label="Filtrer par sprint"
                  />
                </div>

                <div className="w-full sm:w-auto sm:max-w-[200px] min-w-0">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <CustomSelect
                    value={budgetFilters.category}
                    onChange={(e) => onBudgetFiltersChange({ ...budgetFilters, category: e.target.value })}
                    options={[
                      { value: '', label: 'Toutes les catégories' },
                      ...Object.entries(BUDGET_CATEGORY_CONFIG).map(([key, config]) => ({
                        value: key,
                        label: `${config.icon} ${config.label}`
                      }))
                    ]}
                    aria-label="Filtrer par catégorie"
                  />
                </div>

                <div className="w-full sm:w-auto sm:max-w-[200px] min-w-0">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type de Période</label>
                  <CustomSelect
                    value={budgetFilters.periodType}
                    onChange={(e) => onBudgetFiltersChange({ ...budgetFilters, periodType: e.target.value })}
                    options={[
                      { value: '', label: 'Toutes les périodes' },
                      ...Object.entries(BUDGET_PERIOD_TYPE_CONFIG).map(([key, config]) => ({
                        value: key,
                        label: `${config.icon} ${config.label}`
                      }))
                    ]}
                    aria-label="Filtrer par type de période"
                  />
                </div>

                <div className="w-full sm:w-auto sm:max-w-[200px] min-w-0">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <CustomSelect
                    value={budgetFilters.status}
                    onChange={(e) => onBudgetFiltersChange({ ...budgetFilters, status: e.target.value })}
                    options={[
                      { value: '', label: 'Tous les statuts' },
                      ...Object.entries(BUDGET_STATUS_CONFIG).map(([key, config]) => ({
                        value: key,
                        label: `${config.icon} ${config.label}`
                      }))
                    ]}
                    aria-label="Filtrer par statut"
                  />
                </div>
              </>
            }
          />
        </div>
      ) : (
        <div className="px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg">
          <div className="w-full sm:w-auto max-w-xs">
            <ProductSelector
              products={products}
              value={selectedProductId}
              onChange={onProductChange}
              placeholder="Tous les produits"
              className="w-full sm:w-64"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Tab Button
const TabButton = ({ active, onClick, icon: Icon, label, labelMobile }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-4 sm:px-5 lg:px-6 py-3 font-medium transition-colors whitespace-nowrap flex-shrink-0 border-b-2 ${
      active
        ? 'border-emerald-600 text-emerald-600 bg-emerald-50/50'
        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
    }`}
  >
    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
    <span className="text-xs sm:text-sm font-medium hidden md:inline">{label}</span>
    {labelMobile && <span className="text-xs font-medium md:hidden">{labelMobile}</span>}
  </button>
);

export default DashboardHeader;
