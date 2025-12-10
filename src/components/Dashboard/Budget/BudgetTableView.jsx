import { useMemo, useState } from 'react';
import { 
  Edit2, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react';
import { 
  BUDGET_CATEGORY_CONFIG,
  CURRENCY_CONFIG 
} from '../../../utils/constants';

/**
 * BudgetTableView - Vue tableau synthétique avec sous-totaux
 * Colonnes: Produit, Sprint, Catégorie, Période, Budget Prévu, Réalisé, Attendu, Écart
 */
const BudgetTableView = ({ 
  entries, 
  products, 
  sprints, 
  onEdit, 
  onDelete,
  currency = 'EUR'
}) => {
  console.log('🔵 BudgetTableView chargé avec', entries.length, 'entrées');
  const [expandedProducts, setExpandedProducts] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const currencyConfig = CURRENCY_CONFIG[currency];

  const formatAmount = (amount) => {
    return currencyConfig.format(amount);
  };

  // Calculer le budget attendu basé sur la progression temporelle
  const calculateExpectedBudget = (entry) => {
    const start = new Date(entry.startDate);
    const end = new Date(entry.endDate);
    const today = new Date();

    if (today < start) return 0;
    if (today > end) return entry.plannedAmount;

    const totalDuration = end - start;
    const elapsed = today - start;
    const progression = elapsed / totalDuration;

    return entry.plannedAmount * progression;
  };

  // Calculer l'écart et son pourcentage
  const calculateVariance = (actual, expected) => {
    if (expected === 0) return { amount: actual, percent: actual > 0 ? 100 : 0 };
    
    const variance = actual - expected;
    const percent = (variance / expected) * 100;
    
    return { amount: variance, percent };
  };

  // Obtenir l'indicateur visuel de l'écart
  const getVarianceIndicator = (percent) => {
    if (Math.abs(percent) < 5) return { color: 'text-green-600', icon: '🟢', label: 'Conforme' };
    if (Math.abs(percent) < 15) return { color: 'text-yellow-600', icon: '🟡', label: 'Surveillance' };
    return { color: 'text-red-600', icon: '🔴', label: 'Dépassement' };
  };

  // Enrichir les données avec calculs
  const enrichedEntries = useMemo(() => {
    return entries.map(entry => {
      const product = products.find(p => p.id === entry.productId);
      const sprint = entry.sprintId ? sprints.find(s => s.id === entry.sprintId) : null;
      const expectedBudget = calculateExpectedBudget(entry);
      const variance = calculateVariance(entry.actualAmount, expectedBudget);
      const indicator = getVarianceIndicator(variance.percent);

      return {
        ...entry,
        product,
        sprint,
        expectedBudget,
        variance,
        indicator
      };
    });
  }, [entries, products, sprints]);

  // Grouper par produit puis par sprint
  const groupedData = useMemo(() => {
    const groups = {};

    enrichedEntries.forEach(entry => {
      const productId = entry.productId;
      const sprintId = entry.sprintId || 'no-sprint';

      if (!groups[productId]) {
        groups[productId] = {
          product: entry.product,
          sprints: {},
          totals: {
            planned: 0,
            actual: 0,
            expected: 0
          }
        };
      }

      if (!groups[productId].sprints[sprintId]) {
        groups[productId].sprints[sprintId] = {
          sprint: entry.sprint,
          entries: [],
          totals: {
            planned: 0,
            actual: 0,
            expected: 0
          }
        };
      }

      groups[productId].sprints[sprintId].entries.push(entry);
      groups[productId].sprints[sprintId].totals.planned += entry.plannedAmount;
      groups[productId].sprints[sprintId].totals.actual += entry.actualAmount;
      groups[productId].sprints[sprintId].totals.expected += entry.expectedBudget;

      groups[productId].totals.planned += entry.plannedAmount;
      groups[productId].totals.actual += entry.actualAmount;
      groups[productId].totals.expected += entry.expectedBudget;
    });

    return groups;
  }, [enrichedEntries]);

  // Calculer le total général
  const grandTotal = useMemo(() => {
    return Object.values(groupedData).reduce((acc, productGroup) => ({
      planned: acc.planned + productGroup.totals.planned,
      actual: acc.actual + productGroup.totals.actual,
      expected: acc.expected + productGroup.totals.expected
    }), { planned: 0, actual: 0, expected: 0 });
  }, [groupedData]);

  const toggleProduct = (productId) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Tri des colonnes
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 sm:p-8 md:p-12 text-center">
        <AlertCircle className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
          Aucune ligne budgétaire
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          Commencez par créer une ligne budgétaire pour suivre vos dépenses.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* En-têtes */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-8">
                {/* Expand/Collapse */}
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('product')}
              >
                Produit {getSortIcon('product')}
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('sprint')}
              >
                Sprint {getSortIcon('sprint')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Période
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('planned')}
              >
                Budget Prévu {getSortIcon('planned')}
              </th>
              <th 
                className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('actual')}
              >
                Réalisé {getSortIcon('actual')}
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Attendu
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Écart
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(groupedData).map(([productId, productGroup]) => {
              const isExpanded = expandedProducts[productId];
              const productVariance = calculateVariance(
                productGroup.totals.actual,
                productGroup.totals.expected
              );
              const productIndicator = getVarianceIndicator(productVariance.percent);

              return (
                <tbody key={productId}>
                  {/* Ligne Produit (En-tête niveau 1) */}
                  <tr 
                    className="bg-indigo-50 font-semibold cursor-pointer hover:bg-indigo-100 transition-colors"
                    onClick={() => toggleProduct(productId)}
                  >
                    <td className="px-4 py-3">
                      {isExpanded ? (
                        <ChevronDown size={18} className="text-gray-600" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-600" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: productGroup.product?.color || '#6366f1' }}
                        />
                        <span className="text-gray-900">
                          {productGroup.product?.name || 'Produit inconnu'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600" colSpan="3">
                      {Object.keys(productGroup.sprints).length} sprint(s)
                    </td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {formatAmount(productGroup.totals.planned)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {formatAmount(productGroup.totals.actual)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {formatAmount(productGroup.totals.expected)}
                    </td>
                    <td className={`px-4 py-3 text-right font-semibold ${productIndicator.color}`}>
                      <div className="flex items-center justify-end gap-1">
                        <span>{productIndicator.icon}</span>
                        <span>{formatAmount(Math.abs(productVariance.amount))}</span>
                        <span className="text-xs">
                          ({productVariance.amount >= 0 ? '+' : ''}{productVariance.percent.toFixed(1)}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>

                  {/* Lignes des Sprints et Entrées (si déplié) */}
                  {isExpanded && Object.entries(productGroup.sprints).map(([sprintId, sprintGroup]) => {
                    const sprintVariance = calculateVariance(
                      sprintGroup.totals.actual,
                      sprintGroup.totals.expected
                    );
                    const sprintIndicator = getVarianceIndicator(sprintVariance.percent);

                    return (
                      <tbody key={sprintId}>
                        {/* Sous-total Sprint (niveau 2) */}
                        <tr className="bg-gray-50 font-medium">
                          <td className="px-4 py-2"></td>
                          <td className="px-4 py-2"></td>
                          <td className="px-4 py-2 text-gray-800">
                            {sprintGroup.sprint?.name || 'Sans sprint'}
                          </td>
                          <td className="px-4 py-2 text-gray-600" colSpan="2">
                            {sprintGroup.entries.length} ligne(s)
                          </td>
                          <td className="px-4 py-2 text-right text-gray-900">
                            {formatAmount(sprintGroup.totals.planned)}
                          </td>
                          <td className="px-4 py-2 text-right text-gray-900">
                            {formatAmount(sprintGroup.totals.actual)}
                          </td>
                          <td className="px-4 py-2 text-right text-gray-600">
                            {formatAmount(sprintGroup.totals.expected)}
                          </td>
                          <td className={`px-4 py-2 text-right font-medium ${sprintIndicator.color}`}>
                            <div className="flex items-center justify-end gap-1">
                              <span>{sprintIndicator.icon}</span>
                              <span>{formatAmount(Math.abs(sprintVariance.amount))}</span>
                              <span className="text-xs">
                                ({sprintVariance.amount >= 0 ? '+' : ''}{sprintVariance.percent.toFixed(1)}%)
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2"></td>
                        </tr>

                        {/* Lignes individuelles */}
                        {sprintGroup.entries.map(entry => {
                          const categoryConfig = BUDGET_CATEGORY_CONFIG[entry.category] || {};
                          
                          return (
                            <tr 
                              key={entry.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3"></td>
                              <td className="px-4 py-3"></td>
                              <td className="px-4 py-3"></td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <span>{categoryConfig.icon}</span>
                                  <span className="text-gray-700">{entry.title}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {new Date(entry.startDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                {' → '}
                                {new Date(entry.endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-gray-900">
                                {formatAmount(entry.plannedAmount)}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-gray-900">
                                {formatAmount(entry.actualAmount)}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-gray-600">
                                {formatAmount(entry.expectedBudget)}
                              </td>
                              <td className={`px-4 py-3 text-right text-sm font-medium ${entry.indicator.color}`}>
                                <div className="flex items-center justify-end gap-1">
                                  <span>{entry.indicator.icon}</span>
                                  <span>{formatAmount(Math.abs(entry.variance.amount))}</span>
                                  <span className="text-xs">
                                    ({entry.variance.amount >= 0 ? '+' : ''}{entry.variance.percent.toFixed(1)}%)
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => onEdit(entry)}
                                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                                    title="Modifier"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`Supprimer "${entry.title}" ?`)) {
                                        onDelete(entry.id);
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                    title="Supprimer"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    );
                  })}
                </tbody>
              );
            })}

            {/* TOTAL GÉNÉRAL */}
            <tr className="bg-indigo-100 font-bold border-t-2 border-indigo-300">
              <td className="px-4 py-4" colSpan="5">
                <span className="text-indigo-900 text-base">TOTAL GÉNÉRAL</span>
              </td>
              <td className="px-4 py-4 text-right text-indigo-900 text-base">
                {formatAmount(grandTotal.planned)}
              </td>
              <td className="px-4 py-4 text-right text-indigo-900 text-base">
                {formatAmount(grandTotal.actual)}
              </td>
              <td className="px-4 py-4 text-right text-indigo-700 text-base">
                {formatAmount(grandTotal.expected)}
              </td>
              <td className="px-4 py-4 text-right text-base">
                {(() => {
                  const totalVariance = calculateVariance(grandTotal.actual, grandTotal.expected);
                  const totalIndicator = getVarianceIndicator(totalVariance.percent);
                  return (
                    <div className={`flex items-center justify-end gap-1 ${totalIndicator.color}`}>
                      <span>{totalIndicator.icon}</span>
                      <span>{formatAmount(Math.abs(totalVariance.amount))}</span>
                      <span className="text-sm">
                        ({totalVariance.amount >= 0 ? '+' : ''}{totalVariance.percent.toFixed(1)}%)
                      </span>
                    </div>
                  );
                })()}
              </td>
              <td className="px-4 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Légende des indicateurs */}
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">Légende :</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-1">
              <span>🟢</span>
              <span className="whitespace-nowrap">Écart &lt; 5%</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🟡</span>
              <span className="whitespace-nowrap">Écart 5-15%</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🔴</span>
              <span className="whitespace-nowrap">Écart &gt; 15%</span>
            </div>
          </div>
          <div className="sm:ml-auto text-gray-500 text-[10px] sm:text-xs">
            Budget Attendu = Budget Prévu × (Jours écoulés / Durée totale)
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTableView;
