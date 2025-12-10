import { useMemo, useState } from 'react';
import { Edit2, Trash2, Package, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';
import { BUDGET_CATEGORY_CONFIG, CURRENCY_CONFIG } from '../../../utils/constants';
import BudgetConsumedModal from './BudgetConsumedModal';
import BudgetExpectedModal from './BudgetExpectedModal';
import ConfirmDialog from '../../Common/ConfirmDialog';
import InfoTooltip from '../../ui/InfoTooltip';

/**
 * BudgetTable - Tableau budgétaire responsive avec Progressive Enhancement
 * Une seule structure qui s'adapte à tous les breakpoints
 * 
 * ✅ RESPONSIVE : Approche unifiée comme Overview/SprintAnalytics
 * ✅ PROGRESSIVE : Grid adaptatif sans duplication de code
 */
const BudgetTable = ({ entries, products, sprints, onEdit, onDelete, onUpdateBudgetEntry }) => {
  const [consumedModalEntry, setConsumedModalEntry] = useState(null);
  const [expectedModalEntry, setExpectedModalEntry] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const today = new Date();
  const todayStr = today.toLocaleDateString('fr-FR');

  const getProduct = (productId) => {
    return products.find(p => p.id === productId);
  };

  const getSprintInfo = (sprintId) => {
    if (!sprintId) return { identifier: '-', duration: 0, startDate: null, endDate: null, daysRemaining: 0 };
    const sprint = sprints.find(s => s.id === sprintId);
    if (!sprint) return { identifier: 'Inconnu', duration: 0, startDate: null, endDate: null, daysRemaining: 0 };

    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDateNormalized = new Date(endDate);
    endDateNormalized.setHours(0, 0, 0, 0);
    
    let daysRemaining = 0;
    if (today <= endDateNormalized) {
      const remainingTime = endDateNormalized - today;
      daysRemaining = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)) + 1;
    }

    const match = sprint.name.match(/\d+/);
    const identifier = match ? match[0] : sprint.name;

    return {
      identifier,
      duration: diffDays,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      daysRemaining
    };
  };

  const formatAmount = (amount, currency = 'EUR') => {
    const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.EUR;
    return config.format(amount);
  };

  const getExpectedBudget = (entry) => {
    return entry.manualExpectedAmount || 0;
  };

  const getConsumedBudget = (entry) => {
    return entry.consumedAmount || 0;
  };

  const handleDelete = (entry) => {
    const product = getProduct(entry.productId);
    const sprintInfo = getSprintInfo(entry.sprintId);
    
    let message = `Êtes-vous sûr de vouloir supprimer la ligne budgétaire "${entry.title}" ?`;
    message += `\n\nCette ligne concerne :`;
    if (product) message += `\n• Produit : ${product.name}`;
    if (sprintInfo.identifier !== '-') message += `\n• Sprint : ${sprintInfo.identifier}`;
    message += `\n• Budget prévisionnel : ${formatAmount(entry.plannedAmount, entry.currency)}`;
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer la ligne budgétaire',
      message: message,
      onConfirm: () => {
        onDelete(entry.id);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const handleSaveConsumed = (data) => {
    onUpdateBudgetEntry(consumedModalEntry.id, {
      ...consumedModalEntry,
      consumedAmount: data.consumedAmount,
      consumedNotes: data.consumedNotes
    });
    setConsumedModalEntry(null);
  };

  const handleSaveExpected = (data) => {
    onUpdateBudgetEntry(expectedModalEntry.id, {
      ...expectedModalEntry,
      manualExpectedAmount: data.manualExpectedAmount,
      expectedNotes: data.expectedNotes
    });
    setExpectedModalEntry(null);
  };

  // Calculer les totaux
  const totals = useMemo(() => {
    return {
      planned: entries.reduce((sum, e) => sum + e.plannedAmount, 0),
      consumed: entries.reduce((sum, e) => sum + getConsumedBudget(e), 0),
      expected: entries.reduce((sum, e) => sum + getExpectedBudget(e), 0)
    };
  }, [entries]);

  const totalVariance = totals.expected - totals.planned;

  // Empty State
  if (entries.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-6 sm:p-8 md:p-12 text-center">
        <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
        <p className={`${DASHBOARD_TEXT.label} text-gray-500 mb-2`}>
          Aucune ligne budgétaire pour le moment
        </p>
        <p className={`${DASHBOARD_TEXT.caption} text-gray-400`}>
          Commencez par créer une ligne budgétaire pour suivre vos dépenses
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ============================================ */}
      {/* STRUCTURE UNIFIÉE RESPONSIVE */}
      {/* Progressive Enhancement : 1 seul rendu qui s'adapte */}
      {/* ============================================ */}
      <div className="w-full space-y-3 sm:space-y-4">
        {entries.map(entry => {
          const categoryConfig = BUDGET_CATEGORY_CONFIG[entry.category] || BUDGET_CATEGORY_CONFIG.other;
          const product = getProduct(entry.productId);
          const sprintInfo = getSprintInfo(entry.sprintId);
          const consumedBudget = getConsumedBudget(entry);
          const expectedBudget = getExpectedBudget(entry);
          const variance = expectedBudget - entry.plannedAmount;
          
          return (
            <div 
              key={entry.id} 
              className="w-full bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* ============================================ */}
              {/* HEADER - Identité de la ligne budgétaire */}
              {/* Responsive : Column mobile → Row desktop */}
              {/* ============================================ */}
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  {/* Ligne 1 : Badge produit + Titre + Catégorie */}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {/* Badge produit */}
                    {product && (
                      <span 
                        className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded text-xs font-bold text-white"
                        style={{ backgroundColor: product.color }}
                      >
                        {product.code}
                      </span>
                    )}
                    
                    {/* Titre */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`${DASHBOARD_TEXT.h3} truncate`}>
                        {entry.title}
                      </h4>
                    </div>

                    {/* Catégorie */}
                    <span 
                      className={`flex-shrink-0 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded text-sm sm:text-base ${categoryConfig.bgColor} ${categoryConfig.color}`}
                      title={categoryConfig.label}
                    >
                      {categoryConfig.icon}
                    </span>
                  </div>

                  {/* Ligne 2 mobile / Inline desktop : Sprint + Période + Actions */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                    {/* Sprint info */}
                    {sprintInfo.identifier !== '-' && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="font-medium text-gray-700">
                          Sprint {sprintInfo.identifier}
                        </span>
                        {sprintInfo.daysRemaining > 0 && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-orange-600 font-medium">
                              {sprintInfo.daysRemaining}j
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-1 ml-auto sm:ml-0">
                      <button
                        onClick={() => onEdit(entry)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded transition-colors active:scale-95"
                        title="Modifier"
                        aria-label={`Modifier ${entry.title}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors active:scale-95"
                        title="Supprimer"
                        aria-label={`Supprimer ${entry.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================ */}
              {/* BODY - Budgets en Grid Responsive */}
              {/* 1 col mobile → 2 cols tablet → 4 cols desktop */}
              {/* ============================================ */}
              <div className="p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3">
                  {/* Budget Prévisionnel */}
                  <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`${DASHBOARD_TEXT.caption} text-emerald-700 font-medium`}>
                        Budget prévu
                      </span>
                    </div>
                    <div className={`${DASHBOARD_TEXT.value} text-emerald-900`}>
                      {formatAmount(entry.plannedAmount, entry.currency)}
                    </div>
                  </div>

                  {/* Budget Consommé */}
                  <div 
                    className="p-2.5 sm:p-3 bg-teal-50 rounded-lg cursor-pointer hover:bg-teal-100 transition-colors"
                    onClick={() => setConsumedModalEntry(entry)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`${DASHBOARD_TEXT.caption} text-teal-700 font-medium`}>
                        Consommé <span className="hidden sm:inline">({todayStr})</span>
                      </span>
                      <Edit2 className="w-3 h-3 text-teal-600 flex-shrink-0" />
                    </div>
                    <div className={`${DASHBOARD_TEXT.value} text-teal-900`}>
                      {formatAmount(consumedBudget, entry.currency)}
                    </div>
                  </div>

                  {/* Budget Attendu */}
                  <div 
                    className="p-2.5 sm:p-3 bg-cyan-50 rounded-lg cursor-pointer hover:bg-cyan-100 transition-colors"
                    onClick={() => setExpectedModalEntry(entry)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`${DASHBOARD_TEXT.caption} text-cyan-700 font-medium`}>
                        Budget attendu
                      </span>
                      <Edit2 className="w-3 h-3 text-cyan-600 flex-shrink-0" />
                    </div>
                    <div className={`${DASHBOARD_TEXT.value} text-cyan-900`}>
                      {formatAmount(expectedBudget, entry.currency)}
                    </div>
                  </div>

                  {/* Écart */}
                  <div className="p-2.5 sm:p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`${DASHBOARD_TEXT.caption} text-amber-700 font-medium`}>
                        Écart <span className="hidden lg:inline">Attendu vs Prévu</span>
                      </span>
                      {variance > 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                      ) : variance < 0 ? (
                        <TrendingDown className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                      ) : null}
                    </div>
                    <div className={`${DASHBOARD_TEXT.value} ${
                      variance > 0 ? 'text-red-700' : 
                      variance < 0 ? 'text-green-700' : 
                      'text-gray-700'
                    }`}>
                      {formatAmount(Math.abs(variance), entry.currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ============================================ */}
        {/* TOTAUX - Carte récapitulative */}
        {/* Même structure Grid responsive */}
        {/* ============================================ */}
        <div className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg shadow-md border-2 border-emerald-200 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`${DASHBOARD_TEXT.h2} text-emerald-900`}>TOTAUX</h3>
            <span className={`${DASHBOARD_TEXT.caption} text-emerald-700`}>
              {entries.length} ligne{entries.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3">
            {/* Total Prévu */}
            <div className="p-2.5 sm:p-3 bg-white/80 rounded-lg">
              <div className="flex items-center gap-1 mb-1">
                <span className={`${DASHBOARD_TEXT.caption} text-gray-700 font-medium`}>
                  Budget prévu
                </span>
                <InfoTooltip
                  text="Montant total du budget alloué pour l'ensemble des lignes budgétaires. Ce montant représente le budget initial prévu avant toute dépense."
                  size={12}
                  position="top"
                />
              </div>
              <div className={`${DASHBOARD_TEXT.value} text-emerald-900`}>
                {formatAmount(totals.planned, 'EUR')}
              </div>
            </div>

            {/* Total Consommé */}
            <div className="p-2.5 sm:p-3 bg-white/80 rounded-lg">
              <div className="flex items-center gap-1 mb-1">
                <span className={`${DASHBOARD_TEXT.caption} text-gray-700 font-medium`}>
                  Consommé
                </span>
                <InfoTooltip
                  text={`Montant total des dépenses effectuées à date (${todayStr}). Ce montant reflète les coûts réellement engagés sur les différentes lignes budgétaires.`}
                  size={12}
                  position="top"
                />
              </div>
              <div className={`${DASHBOARD_TEXT.value} text-teal-900`}>
                {formatAmount(totals.consumed, 'EUR')}
              </div>
            </div>

            {/* Total Attendu */}
            <div className="p-2.5 sm:p-3 bg-white/80 rounded-lg">
              <div className="flex items-center gap-1 mb-1">
                <span className={`${DASHBOARD_TEXT.caption} text-gray-700 font-medium`}>
                  Attendu
                </span>
                <InfoTooltip
                  text="Budget attendu suite aux réévaluations manuelles. Ce montant représente le coût final estimé après ajustements et prévisions actualisées pour chaque ligne budgétaire. Si non renseigné, le budget prévu est utilisé par défaut."
                  size={12}
                  position="top"
                />
              </div>
              <div className={`${DASHBOARD_TEXT.value} text-cyan-900`}>
                {formatAmount(totals.expected, 'EUR')}
              </div>
            </div>

            {/* Écart Total */}
            <div className="p-2.5 sm:p-3 bg-white rounded-lg border-2 border-amber-300">
              <div className="flex items-center gap-1 mb-1">
                <span className={`${DASHBOARD_TEXT.caption} text-gray-900 font-bold`}>
                  Écart total
                </span>
                <InfoTooltip
                  text="Variance entre le budget attendu (réévalué) et le budget prévu (initial). Un écart positif indique un dépassement potentiel, tandis qu'un écart négatif signale une économie anticipée sur les estimations initiales."
                  size={12}
                  position="top"
                />
                {totalVariance > 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-600 ml-auto" />
                ) : totalVariance < 0 ? (
                  <TrendingDown className="w-4 h-4 text-green-600 ml-auto" />
                ) : null}
              </div>
              <div className={`${DASHBOARD_TEXT.value} ${
                totalVariance > 0 ? 'text-red-700' : 
                totalVariance < 0 ? 'text-green-700' : 
                'text-gray-700'
              }`}>
                {formatAmount(Math.abs(totalVariance), 'EUR')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* MODALS */}
      {/* ============================================ */}
      {consumedModalEntry && (
        <BudgetConsumedModal
          entry={consumedModalEntry}
          onSave={handleSaveConsumed}
          onCancel={() => setConsumedModalEntry(null)}
        />
      )}

      {expectedModalEntry && (
        <BudgetExpectedModal
          entry={expectedModalEntry}
          onSave={handleSaveExpected}
          onCancel={() => setExpectedModalEntry(null)}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null })}
      />
    </>
  );
};

export default BudgetTable;
