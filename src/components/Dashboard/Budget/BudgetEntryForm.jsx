import { useState, useEffect } from 'react';
import { X, Euro, CheckCircle2, AlertCircle, HelpCircle, Save } from 'lucide-react';
import {
  BUDGET_CATEGORY_CONFIG,
  CURRENCY_CONFIG
} from '../../../utils/constants';
import { Button } from '../../ui/Button';

/**
 * BudgetEntryForm - Formulaire de création/édition d'une ligne budgétaire
 * Les dates sont automatiquement récupérées du sprint sélectionné
 */
const BudgetEntryForm = ({ entry, products, sprints, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'human_resources',
    productId: '',
    sprintId: '',
    plannedAmount: '',
    currency: 'EUR',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);

  const isEditMode = !!entry;

  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title || '',
        category: entry.category || 'human_resources',
        productId: entry.productId || '',
        sprintId: entry.sprintId || '',
        plannedAmount: entry.plannedAmount || '',
        currency: entry.currency || 'EUR',
        notes: entry.notes || ''
      });
    }
  }, [entry]);

  // Validation temps réel
  useEffect(() => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le libellé de la dépense est obligatoire';
    }

    if (!formData.productId) {
      newErrors.product = 'Le produit est obligatoire';
    }

    if (!formData.sprintId) {
      newErrors.sprint = 'Le sprint est obligatoire';
    }

    if (!formData.plannedAmount || parseFloat(formData.plannedAmount) <= 0) {
      newErrors.planned = 'Le budget prévisionnel doit être > 0';
    }

    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Récupérer les dates du sprint sélectionné
    const selectedSprint = sprints.find(s => s.id === formData.sprintId);
    if (!selectedSprint) {
      alert('Sprint introuvable');
      return;
    }

    const cleanData = {
      title: formData.title.trim(),
      category: formData.category,
      productId: formData.productId,
      sprintId: formData.sprintId,
      plannedAmount: parseFloat(formData.plannedAmount),
      currency: formData.currency,
      startDate: selectedSprint.startDate,
      endDate: selectedSprint.endDate,
      notes: formData.notes.trim()
    };

    onSave(cleanData);
  };

  const isFormValid = Object.keys(errors).length === 0;

  // Filtrer sprints par produit
  const filteredSprints = formData.productId
    ? sprints.filter(s => s.productId === formData.productId)
    : [];

  const activeProducts = products.filter(p => p.status === 'active');
  const hasNoActiveProducts = activeProducts.length === 0;

  // Afficher les dates du sprint sélectionné
  const selectedSprint = formData.sprintId 
    ? sprints.find(s => s.id === formData.sprintId)
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* ✅ FIX 1: En-tête responsive */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <Euro className="text-emerald-600 flex-shrink-0" size={20} />
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  {isEditMode ? 'Modifier la ligne budgétaire' : 'Nouvelle ligne prévisionnelle'}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="ml-1 sm:ml-2 p-1 sm:p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex-shrink-0"
                  title="Aide pour remplir le formulaire"
                >
                  <HelpCircle size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="ml-2 sm:ml-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* ✅ FIX 2: Panel d'aide responsive */}
          {showHelp && (
            <div className="mt-3 sm:mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 sm:p-4 text-xs">
              <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <HelpCircle size={16} />
                Guide de remplissage
              </h3>
              
              <div className="space-y-2 text-emerald-900">
                <div>
                  <p className="font-semibold">📦 Produit & Sprint</p>
                  <p className="text-emerald-800 ml-2">Obligatoires. Sélectionnez le produit concerné, puis le sprint associé. Les dates de début et fin sont automatiquement récupérées du sprint. Une ligne budgétaire est toujours rattachée à un sprint spécifique.</p>
                </div>

                <div>
                  <p className="font-semibold">📝 Libellé de la dépense</p>
                  <p className="text-emerald-800 ml-2">Obligatoire. Description claire de la dépense (ex: "Développeurs Q1 2025", "Licences Jira annuelles", "Formation TypeScript"). Soyez précis pour faciliter le suivi.</p>
                </div>

                <div>
                  <p className="font-semibold">🏷️ Catégorie</p>
                  <p className="text-emerald-800 ml-2">Choisissez le type de dépense : <strong>Ressources humaines</strong> (salaires, freelances), <strong>Infrastructure</strong> (serveurs, cloud), <strong>Logiciels</strong> (licences, SaaS), <strong>Formation</strong> (cours, certifications), <strong>Marketing</strong> (pub, comm), <strong>Autres</strong> (divers). Catégoriser aide à analyser la répartition du budget.</p>
                </div>

                <div>
                  <p className="font-semibold">💰 Budget Prévisionnel</p>
                  <p className="text-emerald-800 ml-2"><strong>Montant</strong> : Obligatoire, doit être &gt; 0. C'est le budget <strong>prévu</strong> pour cette dépense. Le budget <strong>réel consommé</strong> sera saisi plus tard. <strong>Devise</strong> : EUR, USD ou GBP. Le système calculera automatiquement l'écart entre prévu et réel.</p>
                </div>

                <div>
                  <p className="font-semibold">📝 Notes</p>
                  <p className="text-emerald-800 ml-2">Optionnel. Détails supplémentaires, contexte, justification, numéros de bon de commande, etc. Utile pour la traçabilité.</p>
                </div>

                <div className="pt-2 border-t border-emerald-300 mt-2">
                  <p className="font-semibold">💡 Bonnes pratiques</p>
                  <p className="text-emerald-800 ml-2">• Planifiez votre budget sprint par sprint • Catégorisez correctement pour l'analyse • Soyez réaliste dans les prévisions • Utilisez les notes pour documenter • Suivez régulièrement l'écart prévu/réel • Un budget prévisionnel bien défini facilite le pilotage</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ✅ FIX 3: Formulaire responsive */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
          
          {/* 1. Produit & Sprint */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">📦 Produit & Sprint</h3>
            
            {hasNoActiveProducts ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 flex items-center gap-1">
                  <AlertCircle size={16} />
                  <strong>Aucun produit actif disponible.</strong>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Produit */}
                <div>
                  <label htmlFor="productId" className="block text-xs font-medium text-gray-700 mb-1">
                    Produit <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="productId"
                    name="productId"
                    value={formData.productId}
                    onChange={(e) => {
                      handleChange(e);
                      setFormData(prev => ({ ...prev, sprintId: '' }));
                    }}
                    className={`w-full px-3 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.product ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Sélectionner un produit</option>
                    {activeProducts.map(product => (
                      <option key={product.id} value={product.id}>
                        [{product.code}] {product.name}
                      </option>
                    ))}
                  </select>
                  {errors.product && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.product}
                    </p>
                  )}
                </div>

                {/* Sprint */}
                <div>
                  <label htmlFor="sprintId" className="block text-xs font-medium text-gray-700 mb-1">
                    Sprint <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="sprintId"
                    name="sprintId"
                    value={formData.sprintId}
                    onChange={handleChange}
                    disabled={!formData.productId}
                    className={`w-full px-3 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 ${
                      errors.sprint ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Sélectionnez un sprint</option>
                    {filteredSprints.map(sprint => (
                      <option key={sprint.id} value={sprint.id}>
                        {sprint.name}
                      </option>
                    ))}
                  </select>
                  {errors.sprint && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.sprint}
                    </p>
                  )}
                  {formData.productId && filteredSprints.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Aucun sprint disponible pour ce produit
                    </p>
                  )}
                  {/* Affichage des dates du sprint */}
                  {selectedSprint && (
                    <div className="mt-2 p-2 bg-cyan-50 border border-cyan-200 rounded text-xs text-cyan-800">
                      📅 Période : {new Date(selectedSprint.startDate).toLocaleDateString('fr-FR')} → {new Date(selectedSprint.endDate).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 2. Titre */}
          <div className="border-t border-gray-200 pt-4">
            <div>
              <label htmlFor="title" className="block text-xs font-medium text-gray-700 mb-1">
                Libellé de la dépense <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Développeurs Q1 2025, Licences Jira annuelles..."
                className={`w-full px-3 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.title}
                </p>
              )}
            </div>
          </div>

          {/* 3. Catégorie */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">🏷️ Catégorie</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {Object.entries(BUDGET_CATEGORY_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: key }))}
                  className={`flex items-center gap-2 p-2 sm:p-3 border-2 rounded-lg transition-all text-xs ${
                    formData.category === key
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-semibold'
                      : 'border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base sm:text-lg flex-shrink-0">{config.icon}</span>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-bold truncate">{config.label}</div>
                    <div className="text-[10px] opacity-75 line-clamp-1">{config.description}</div>
                  </div>
                  {formData.category === key && (
                    <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Budget Prévisionnel */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">💰 Budget Prévisionnel</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="plannedAmount" className="block text-xs font-medium text-gray-700 mb-1">
                  Budget prévisionnel <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="plannedAmount"
                  name="plannedAmount"
                  value={formData.plannedAmount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={`w-full px-3 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.planned ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.planned && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.planned}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="currency" className="block text-xs font-medium text-gray-700 mb-1">
                  Devise
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.entries(CURRENCY_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.symbol} {config.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 5. Notes */}
          <div className="border-t border-gray-200 pt-4">
            <div>
              <label htmlFor="notes" className="block text-xs font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Détails supplémentaires, contexte, justification..."
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* ✅ FIX 5: Footer responsive */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 -mx-3 sm:-mx-4 md:-mx-6 -mb-3 sm:-mb-4 md:-mb-6 mt-4 sm:mt-6">
            <div className="text-xs text-gray-600 order-2 sm:order-1">
              {!isFormValid && (
                <span className="flex items-center gap-1 text-amber-600">
                  <AlertCircle size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Veuillez remplir tous les champs requis</span>
                  <span className="sm:hidden">Champs requis manquants</span>
                </span>
              )}
            </div>
            <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={onCancel}
                className="flex-1 sm:flex-none"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="gradient"
                size="md"
                icon={Save}
                disabled={!isFormValid}
                className="flex-1 sm:flex-none"
              >
                Sauvegarder
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetEntryForm;
