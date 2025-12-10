import { useState, useEffect } from 'react';
import { Target as TargetIcon, AlertCircle, Save } from 'lucide-react';
import {
  FormModal,
  FormHeader,
  FormSection,
  FormFooter,
  Input,
  Textarea,
  StatusSelector,
  ProductDropdown
} from '../ui';

// Configuration des statuts
const STATUS_OPTIONS = [
  {
    value: 'planned',
    label: '📋 Planifié',
    description: 'Objectif défini, pas encore démarré',
    color: 'border-teal-300 text-teal-800 hover:bg-teal-50',
    selectedColor: 'bg-teal-100 border-teal-400 text-teal-900',
    icon: '📋'
  },
  {
    value: 'active',
    label: '✅ Actif',
    description: 'En cours de réalisation',
    color: 'border-emerald-300 text-emerald-800 hover:bg-emerald-50',
    selectedColor: 'bg-emerald-100 border-emerald-400 text-emerald-900',
    icon: '✅'
  },
  {
    value: 'completed',
    label: '✔️ Terminé',
    description: 'Objectif atteint',
    color: 'border-cyan-300 text-cyan-800 hover:bg-cyan-50',
    selectedColor: 'bg-cyan-100 border-cyan-400 text-cyan-900',
    icon: '✔️'
  },
  {
    value: 'cancelled',
    label: '❌ Annulé',
    description: 'Objectif abandonné',
    color: 'border-red-300 text-red-800 hover:bg-red-50',
    selectedColor: 'bg-red-100 border-red-400 text-red-900',
    icon: '❌'
  }
];

// Configuration des priorités
const PRIORITY_OPTIONS = [
  {
    value: 'critical',
    label: '🔴 Critique',
    description: 'Impact majeur',
    color: 'border-red-300 text-red-800 hover:bg-red-50',
    selectedColor: 'bg-red-100 border-red-400 text-red-900',
    icon: '🔴'
  },
  {
    value: 'high',
    label: '🟠 Haute',
    description: 'Impact important',
    color: 'border-orange-300 text-orange-800 hover:bg-orange-50',
    selectedColor: 'bg-orange-100 border-orange-400 text-orange-900',
    icon: '🟠'
  },
  {
    value: 'medium',
    label: '🟡 Moyenne',
    description: 'Impact modéré',
    color: 'border-yellow-300 text-yellow-800 hover:bg-yellow-50',
    selectedColor: 'bg-yellow-100 border-yellow-400 text-yellow-900',
    icon: '🟡'
  },
  {
    value: 'low',
    label: '⚪ Basse',
    description: 'Impact faible',
    color: 'border-gray-300 text-gray-800 hover:bg-gray-50',
    selectedColor: 'bg-gray-100 border-gray-400 text-gray-900',
    icon: '⚪'
  }
];

// Contenu d'aide
const HelpContent = () => (
  <div className="space-y-2 text-emerald-900">
    <div>
      <p className="font-semibold">📦 Produit associé</p>
      <p className="text-emerald-800 ml-2">
        Sélectionnez le produit concerné par cet objectif. Chaque objectif doit être rattaché à un produit actif. 
        Si aucun produit n'est disponible, créez-en un d'abord dans le module Produits.
      </p>
    </div>

    <div>
      <p className="font-semibold">#️⃣ Identification</p>
      <p className="text-emerald-800 ml-2">
        <strong>Titre</strong> : Formulez un objectif clair et concis (ex: "Améliorer l'expérience mobile"). 
        <strong> Description</strong> : Détaillez le contexte, les enjeux et la raison d'être. 
        Expliquez pourquoi cet objectif est important pour le produit.
      </p>
    </div>

    <div>
      <p className="font-semibold">⚡ Priorité</p>
      <p className="text-emerald-800 ml-2">
        <strong>Critique</strong> : Impact majeur, urgent. <strong>Haute</strong> : Très important. 
        <strong>Moyenne</strong> : Important mais peut attendre. <strong>Basse</strong> : Impact limité. 
        La priorité guide l'allocation des ressources.
      </p>
    </div>

    <div>
      <p className="font-semibold">📊 Statut</p>
      <p className="text-emerald-800 ml-2">
        <strong>Planifié</strong> : Objectif défini, pas encore commencé. <strong>Actif</strong> : En cours de réalisation. 
        <strong>Terminé</strong> : Objectif atteint. <strong>Annulé</strong> : Abandonné. 
        Mettez à jour le statut régulièrement.
      </p>
    </div>

    <div>
      <p className="font-semibold">📅 Planning</p>
      <p className="text-emerald-800 ml-2">
        Définissez une date d'échéance réaliste. Cette date ne peut pas être dans le passé. 
        Elle sert de point de repère pour la planification des sprints et le suivi de progression.
      </p>
    </div>

    <div>
      <p className="font-semibold">📈 Métriques de succès</p>
      <p className="text-emerald-800 ml-2">
        <strong>Critères de succès</strong> : Définissez comment vous saurez que l'objectif est atteint (qualitatif). 
        <strong> KPIs</strong> : Listez les indicateurs mesurables (ex: "Taux de conversion +15%", "Score NPS &gt;50"). 
        Ces métriques permettront d'évaluer objectivement les résultats.
      </p>
    </div>

    <div className="pt-2 border-t border-emerald-300 mt-2">
      <p className="font-semibold">💡 Bonnes pratiques</p>
      <p className="text-emerald-800 ml-2">
        • Utilisez la méthode SMART (Spécifique, Mesurable, Atteignable, Réaliste, Temporel) 
        • Reliez besoins et stories à vos objectifs • Suivez la progression via les sprints 
        • Revoyez régulièrement vos objectifs • Priorisez selon la valeur business
      </p>
    </div>
  </div>
);

const ObjectiveForm = ({ 
  objective, 
  userNeeds, 
  userStories, 
  products = [], 
  preselectedProductId = null, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'planned',
    targetDate: '',
    successCriteria: '',
    kpis: '',
    productId: ''
  });

  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);

  const isEditing = !!objective;

  useEffect(() => {
    if (objective) {
      setFormData({
        title: objective.title || '',
        description: objective.description || '',
        priority: objective.priority || 'medium',
        status: objective.status || 'planned',
        targetDate: objective.targetDate || '',
        successCriteria: objective.successCriteria || '',
        kpis: objective.kpis || '',
        productId: objective.productId || ''
      });
    } else {
      const productId = preselectedProductId || products.find(p => p.status === 'active')?.id || '';
      if (productId) {
        setFormData(prev => ({ ...prev, productId }));
      }
    }
  }, [objective, products, preselectedProductId]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};

    // Champs obligatoires (true seulement, pas de message)
    if (!formData.title.trim()) {
      newErrors.title = true;
    }

    if (!formData.description.trim()) {
      newErrors.description = true;
    }

    if (!formData.productId) {
      newErrors.productId = true;
    }

    // Validations de logique (avec message)
    if (formData.targetDate && new Date(formData.targetDate) < new Date()) {
      newErrors.targetDate = 'La date d\'échéance ne peut pas être dans le passé';
    }

    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Vérifier qu'il existe au moins un produit actif
    const activeProducts = products.filter(p => p.status === 'active');
    if (activeProducts.length === 0) {
      alert('⚠️ Impossible de créer un objectif : aucun produit actif disponible. Veuillez d\'abord créer un produit actif.');
      return;
    }

    const objectiveData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      successCriteria: formData.successCriteria.trim(),
      kpis: formData.kpis.trim()
    };

    onSave(objectiveData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.keys(errors).length === 0 && 
                      products && 
                      products.length > 0 && 
                      products.filter(p => p.status === 'active').length > 0;

  const activeProducts = products.filter(p => p.status === 'active');

  return (
    <FormModal isOpen={true} onClose={onCancel} size="lg">
      <FormHeader
        title={isEditing ? 'Modifier l\'objectif' : 'Nouvel objectif produit'}
        icon={TargetIcon}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* Section 1: Produit associé - Fond emerald */}
        <FormSection title="Produit associé" emoji="📦" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {activeProducts.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 flex items-center gap-1">
                  <AlertCircle size={16} />
                  <strong>Aucun produit actif disponible.</strong>
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Créez d'abord un produit dans le module <strong>Produits</strong> avant de créer un objectif.
                </p>
              </div>
            ) : (
              <>
                <ProductDropdown
                  products={activeProducts}
                  value={formData.productId}
                  onChange={(productId) => setFormData(prev => ({ ...prev, productId }))}
                  placeholder="-- Sélectionner un produit --"
                  emptyMessage="Aucun produit actif disponible"
                  required
                  error={errors.productId}
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 L'objectif sera rattaché au produit sélectionné
                </p>
              </>
            )}
          </div>
        </FormSection>

        {/* Section 2: Identification - Fond teal */}
        <FormSection title="Identification" emoji="#️⃣" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
            <Input
              label="Titre de l'objectif"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Améliorer l'expérience utilisateur mobile"
              required
              error={errors.title}
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez l'objectif, son contexte et sa raison d'être..."
              rows={4}
              required
              error={errors.description}
              helpText="Contexte, enjeux et raison d'être de cet objectif"
            />
          </div>
        </FormSection>

        {/* Section 3: Priorité - Fond emerald */}
        <FormSection title="Priorité" emoji="⚡">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <StatusSelector
              value={formData.priority}
              onChange={(priority) => setFormData(prev => ({ ...prev, priority }))}
              options={PRIORITY_OPTIONS}
              columns={4}
              compact={true}
            />
          </div>
        </FormSection>

        {/* Section 4: Statut - Fond teal */}
        <FormSection title="Statut" emoji="📊">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <StatusSelector
              value={formData.status}
              onChange={(status) => setFormData(prev => ({ ...prev, status }))}
              options={STATUS_OPTIONS}
              columns={2}
            />
          </div>
        </FormSection>

        {/* Section 5: Planning - Fond emerald */}
        <FormSection title="Planning" emoji="📅">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <Input
              label="Date d'échéance"
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              error={errors.targetDate}
              helpText="Date cible pour atteindre cet objectif"
            />
          </div>
        </FormSection>

        {/* Section 6: Métriques - Fond teal */}
        <FormSection title="Métriques de succès" emoji="📈">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
            <Textarea
              label="Critères de succès"
              name="successCriteria"
              value={formData.successCriteria}
              onChange={handleChange}
              placeholder="Comment mesurer le succès de cet objectif ?"
              rows={3}
              helpText="Définir comment mesurer l'atteinte de l'objectif (optionnel)"
            />

            <Textarea
              label="Indicateurs de performance (KPIs)"
              name="kpis"
              value={formData.kpis}
              onChange={handleChange}
              placeholder="Ex: Taux de conversion mobile +15%, Temps de chargement <2s, Score NPS >50"
              rows={3}
              helpText="Métriques quantifiables pour suivre la progression (optionnel)"
            />
          </div>
        </FormSection>
      </form>

      <FormFooter
        onCancel={onCancel}
        onSubmit={handleSubmit}
        submitLabel="Sauvegarder"
        submitIcon={Save}
        submitDisabled={!isFormValid}
        errorMessage={
          !isFormValid 
            ? activeProducts.length === 0 
              ? 'Veuillez d\'abord créer un produit actif'
              : 'Veuillez remplir tous les champs requis'
            : null
        }
      />
    </FormModal>
  );
};

export default ObjectiveForm;
