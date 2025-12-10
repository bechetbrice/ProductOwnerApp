import { useState, useMemo } from 'react';
import { Edit2, Trash2, Package } from 'lucide-react';
import {
  BUDGET_CATEGORY_CONFIG,
  BUDGET_STATUS_CONFIG,
  BUDGET_PERIOD_TYPE_CONFIG,
  CURRENCY_CONFIG
} from '../../utils/constants';

/**
 * BudgetEntriesList - Liste des lignes budgétaires avec pagination
 * Harmonisé avec le style Teams (v4.3+)
 */
const BudgetEntriesList = ({ entries, products, sprints, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;

  // Pagination
  const totalPages = Math.ceil(entries.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedEntries = entries.slice(startIndex, endIndex);

  // Reset page si filtres changent
  useMemo(() => {
    setCurrentPage(1);
  }, [entries.length]);

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 sm:p-8 md:p-12 text-center">
        <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
        <p className="text-gray-500 text-base sm:text-lg mb-2">
          Aucune ligne budgétaire pour le moment
        </p>
        <p className="text-gray-400 text-xs sm:text-sm">
          Commencez par créer une ligne budgétaire pour suivre vos dépenses
        </p>
      </div>
    );
  }

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Produit inconnu';
  };

  const getSprintName = (sprintId) => {
    if (!sprintId) return null;
    const sprint = sprints.find(s => s.id === sprintId);
    return sprint ? sprint.name : 'Sprint inconnu';
  };

  const formatAmount = (amount, currency) => {
    const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.EUR;
    return config.format(amount);
  };

  const handleDelete = (entry) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${entry.title}" ?`)) {
      onDelete(entry.id);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-600 uppercase">
            <div className="col-span-3">Ligne Budgétaire</div>
            <div className="col-span-2">Produit/Sprint</div>
            <div className="col-span-2">Période</div>
            <div className="col-span-2">Prévu</div>
            <div className="col-span-2">Réel</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* Lignes */}
        <div className="divide-y divide-gray-200">
          {paginatedEntries.map(entry => {
            const categoryConfig = BUDGET_CATEGORY_CONFIG[entry.category];
            const statusConfig = BUDGET_STATUS_CONFIG[entry.status];
            const periodConfig = BUDGET_PERIOD_TYPE_CONFIG[entry.periodType];
            const variance = entry.plannedAmount - entry.actualAmount;
            const isOverBudget = variance < 0;
            const sprintName = getSprintName(entry.sprintId);

            return (
              <div 
                key={entry.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Titre & Catégorie */}
                  <div className="col-span-3">
                    <div className="font-medium text-gray-900 mb-1">
                      {entry.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${categoryConfig.bgColor} ${categoryConfig.color}`}>
                        {categoryConfig.icon}
                        <span className="hidden lg:inline">{categoryConfig.label}</span>
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span className="hidden lg:inline">{statusConfig.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Produit/Sprint */}
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-gray-900">
                      {getProductName(entry.productId)}
                    </div>
                    {sprintName && (
                      <div className="text-xs text-gray-500 mt-1">
                        🏃 {sprintName}
                      </div>
                    )}
                  </div>

                  {/* Période */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      {periodConfig.icon}
                      <span className="hidden lg:inline">{periodConfig.label}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(entry.startDate).toLocaleDateString('fr-FR')} →{' '}
                      {new Date(entry.endDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  {/* Montant Prévu */}
                  <div className="col-span-2">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatAmount(entry.plannedAmount, entry.currency)}
                    </div>
                  </div>

                  {/* Montant Réel */}
                  <div className="col-span-2">
                    <div className={`text-sm font-semibold ${
                      isOverBudget ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {formatAmount(entry.actualAmount, entry.currency)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {variance >= 0 ? '✓' : '!'}{' '}
                      {formatAmount(Math.abs(variance), entry.currency)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center gap-2">
                    <button
                      onClick={() => onEdit(entry)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Notes */}
                {entry.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 italic">
                      💬 {entry.notes}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PAGINATION */}
      {entries.length > entriesPerPage && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-600">
              Affichage de <strong className="text-gray-800">{startIndex + 1}</strong> à <strong className="text-gray-800">{Math.min(endIndex, entries.length)}</strong> sur <strong className="text-gray-800">{entries.length}</strong> ligne{entries.length > 1 ? 's' : ''}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                « Précédent
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  const showPage = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return <span key={page} className="px-2 text-gray-400">…</span>;
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Suivant »
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetEntriesList;
