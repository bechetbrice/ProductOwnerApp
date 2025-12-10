import { useState, useEffect } from 'react';
import { X, TrendingUp, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { CURRENCY_CONFIG } from '../../../utils/constants';
import { Button } from '../../ui/Button';

/**
 * BudgetExpectedModal - Modal pour définir le budget attendu
 */
const BudgetExpectedModal = ({ entry, onSave, onCancel }) => {
  const [expectedAmount, setExpectedAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (entry) {
      setExpectedAmount(entry.manualExpectedAmount || '');
      setNotes(entry.expectedNotes || '');
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(expectedAmount);
    
    if (isNaN(amount) || amount < 0) {
      setError('Le montant doit être un nombre positif');
      return;
    }

    // Pas de restriction sur le montant maximum

    onSave({
      manualExpectedAmount: amount,
      expectedNotes: notes.trim()
    });
  };

  const formatAmount = (amount) => {
    const config = CURRENCY_CONFIG[entry.currency] || CURRENCY_CONFIG.EUR;
    return config.format(amount);
  };

  const isValid = expectedAmount !== '' && !isNaN(parseFloat(expectedAmount)) && parseFloat(expectedAmount) >= 0;
  const variance = entry.plannedAmount - parseFloat(expectedAmount || 0);
  const isOverBudget = variance < 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ✅ FIX 1: En-tête responsive */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <TrendingUp className="text-cyan-600 flex-shrink-0" size={20} />
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  Budget Attendu
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {entry.title}
              </p>
            </div>
            <button
              onClick={onCancel}
              className="ml-2 sm:ml-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* ✅ FIX 2: Formulaire responsive */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
          <style>{`
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          `}</style>
          
          {/* Info Budget Prévisionnel */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-900">
                Budget prévisionnel :
              </span>
              <span className="text-lg font-bold text-emerald-900">
                {formatAmount(entry.plannedAmount)}
              </span>
            </div>
          </div>

          {/* Montant Attendu */}
          <div>
            <label htmlFor="expectedAmount" className="block text-sm font-semibold text-gray-700 mb-2">
              Budget attendu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="expectedAmount"
                value={expectedAmount}
                onChange={(e) => {
                  setExpectedAmount(e.target.value);
                  setError('');
                }}
                step="0.01"
                min="0"

                placeholder="0.00"
                className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                style={{
                  MozAppearance: 'textfield'
                }}
                onWheel={(e) => e.target.blur()}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                {CURRENCY_CONFIG[entry.currency].symbol}
              </span>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle size={14} />
                {error}
              </p>
            )}
          </div>

          {/* Écart avec budget prévisionnel */}
          {expectedAmount && isValid && (
            <div className={`p-4 rounded-lg border-2 ${
              isOverBudget 
                ? 'bg-red-50 border-red-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {isOverBudget ? '⚠️ Dépassement budgétaire :' : 'Écart avec budget prévisionnel :'}
                </span>
                <span className={`text-lg font-bold ${
                  isOverBudget ? 'text-red-700' : 'text-gray-900'
                }`}>
                  {formatAmount(Math.abs(variance))}
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${
                    isOverBudget ? 'bg-red-600' : 'bg-cyan-600'
                  }`}
                  style={{ width: `${Math.min((parseFloat(expectedAmount) / entry.plannedAmount) * 100, 100)}%` }}
                />
              </div>
              <p className={`text-xs mt-1 ${
                isOverBudget ? 'text-red-600' : 'text-gray-600'
              }`}>
                {((parseFloat(expectedAmount) / entry.plannedAmount) * 100).toFixed(1)}% du budget prévisionnel
              </p>
              {isOverBudget && (
                <p className="text-xs text-red-600 mt-2">
                  Le budget attendu dépasse le budget prévisionnel de {formatAmount(Math.abs(variance))}
                </p>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
              Notes / Justification
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              placeholder="Contexte, justification de la valeur saisie..."
              className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>

          {/* Footer avec boutons */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex justify-end gap-2 sm:gap-3 -mx-3 sm:-mx-4 md:-mx-6 -mb-3 sm:-mb-4 md:-mb-6 mt-4 sm:mt-6">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onCancel}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="gradient"
              size="md"
              icon={Save}
              disabled={!isValid}
            >
              Sauvegarder
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetExpectedModal;
