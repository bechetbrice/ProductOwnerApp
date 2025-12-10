import { useState, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import CustomSelect from '../ui/CustomSelect';
import { getAvailableInsights } from '../../utils/userNeedHelpers';
import { PRIORITY_CONFIG } from '../../constants/interviewConfig';

/**
 * InsightSelector - Composant pour sélectionner un insight depuis un entretien
 * Version 2.0 - Migration vers CustomSelect (style émeraude)
 * 
 * Permet de récupérer un besoin identifié lors d'un entretien pour le convertir
 * en UserNeed. Affiche uniquement les insights non encore convertis.
 * 
 * @component
 * @param {Array<Object>} interviews - Liste des entretiens
 * @param {Array<Object>} userNeeds - Liste des besoins existants
 * @param {string} currentProductId - Produit actuellement sélectionné (pour filtrage)
 * @param {Function} onSelect - Callback appelé avec les données pré-remplies
 */
const InsightSelector = ({ 
  interviews, 
  userNeeds, 
  currentProductId,
  onSelect 
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  // Récupérer les insights disponibles (filtré par produit si sélectionné)
  const availableInsights = useMemo(() => 
    getAvailableInsights(interviews, userNeeds, currentProductId),
    [interviews, userNeeds, currentProductId]
  );

  // Compter le total d'insights disponibles
  const totalAvailable = useMemo(() => 
    availableInsights.reduce((total, item) => total + item.availableInsights.length, 0),
    [availableInsights]
  );

  // Préparer les options pour CustomSelect (aplatir les optgroups)
  const options = useMemo(() => {
    const flatOptions = [
      { value: '', label: '-- Choisir un besoin identifié --' }
    ];

    availableInsights.forEach(({ interview, availableInsights: insights }) => {
      // Ajouter le header de groupe (option désactivée)
      flatOptions.push({
        value: `header-${interview.id}`,
        label: `─── ${interview.title} (${insights.length} besoin${insights.length > 1 ? 's' : ''}) ───`,
        disabled: true
      });

      // Ajouter les insights du groupe
      insights.forEach(insight => {
        const priorityConfig = PRIORITY_CONFIG[insight.priority] || PRIORITY_CONFIG.medium;
        const label = `${priorityConfig.icon} ${insight.content.substring(0, 80)}${insight.content.length > 80 ? '...' : ''}`;
        
        flatOptions.push({
          value: `${interview.id}|${insight.id}`,
          label: label
        });
      });
    });

    return flatOptions;
  }, [availableInsights]);

  // Handler de sélection
  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    if (!value || value.startsWith('header-')) {
      // Si désélection ou clic sur header, notifier avec null
      onSelect(null, null);
      return;
    }

    // Parser la valeur : "interviewId|insightId"
    const [interviewId, insightId] = value.split('|');

    // Trouver l'interview et l'insight correspondants
    const interviewWithInsights = availableInsights.find(
      item => item.interview.id === interviewId
    );

    if (!interviewWithInsights) {
      return;
    }

    const insight = interviewWithInsights.availableInsights.find(
      i => i.id === insightId
    );

    if (!insight) {
      return;
    }

    // Appeler le callback avec l'insight et l'interview
    onSelect(insight, interviewWithInsights.interview);
  };

  // Si aucun insight disponible, ne rien afficher
  if (totalAvailable === 0) {
    return null;
  }

  return (
    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
      <p className="text-xs text-gray-600 mb-3">
        {totalAvailable} besoin{totalAvailable > 1 ? 's' : ''} identifié{totalAvailable > 1 ? 's' : ''} disponible{totalAvailable > 1 ? 's' : ''}
      </p>

      <CustomSelect
        value={selectedValue}
        onChange={handleSelect}
        options={options}
        aria-label="Sélectionner un besoin identifié depuis un entretien"
      />

      {selectedValue && !selectedValue.startsWith('header-') && (
        <div className="mt-3 flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          <CheckCircle size={14} />
          <span>Les champs du formulaire vont être pré-remplis avec ce besoin</span>
        </div>
      )}
    </div>
  );
};

export default InsightSelector;

/**
 * Retourne le nombre total d'insights disponibles
 * Utilisé pour déterminer si la section doit être affichée
 */
export const getInsightsCount = (interviews, userNeeds, currentProductId) => {
  const availableInsights = getAvailableInsights(interviews, userNeeds, currentProductId);
  return availableInsights.reduce((total, item) => total + item.availableInsights.length, 0);
};

/**
 * Notes de développement - Migration CustomSelect:
 * 
 * Version 2.0 - Changements :
 * - ✅ Remplacement du <select> natif + <optgroup> par CustomSelect
 * - ✅ Style émeraude cohérent (bg-emerald-50, border-emerald-100, focus:ring-emerald-500)
 * - ✅ Simulation des optgroups via options désactivées (headers)
 * - ✅ Format des headers : "─── Titre Interview (X besoins) ───"
 * - ✅ Navigation clavier préservée
 * - ✅ Emojis de priorité préservés
 * - ✅ Troncature à 80 caractères préservée
 * 
 * Structure aplatie :
 * - Option vide : "-- Choisir un besoin identifié --"
 * - Header groupe (désactivé) : "─── Interview 1 (2 besoins) ───"
 * - Insights du groupe : "🔴 Besoin urgent..."
 * - Header groupe suivant...
 * 
 * Les headers sont visuellement distinctifs mais non sélectionnables.
 * Le CustomSelect gère automatiquement le disabled state avec opacity réduite.
 * 
 * Usage (identique à la v1.0) :
 * <InsightSelector
 *   interviews={interviews}
 *   userNeeds={userNeeds}
 *   currentProductId={selectedProductId}
 *   onSelect={(insight, interview) => {
 *     // Pré-remplir le formulaire
 *   }}
 * />
 */
