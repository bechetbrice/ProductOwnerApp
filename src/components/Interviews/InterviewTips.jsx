import { Lightbulb } from 'lucide-react';

/**
 * InterviewTips - Module Conseils et Astuces
 * 
 * Composant responsable de l'affichage des conseils pour l'utilisation
 * du module Entretiens :
 * - Préparation d'entretien
 * - Capture d'insights
 * - Actions de suivi
 * - Traçabilité
 * - Bonnes pratiques
 */
const InterviewTips = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg shadow-lg p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-200 rounded-lg">
          <Lightbulb size={20} className="md:w-6 md:h-6 text-yellow-700" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-900">Conseils et astuces</h3>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        <div className="bg-white rounded-lg p-3 md:p-4 border-l-4 border-indigo-500">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">🎯 Préparation d'entretien</h4>
          <ul className="text-xs md:text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Définissez un <strong>objectif clair</strong> pour chaque entretien</li>
            <li>Choisissez le <strong>bon type</strong> : Découverte, Validation, Feedback ou Recherche</li>
            <li>Préparez vos <strong>questions</strong> à l'avance avec les templates intégrés</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-3 md:p-4 border-l-4 border-emerald-500">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">📝 Capture d'insights</h4>
          <ul className="text-xs md:text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Utilisez les <strong>6 types d'insights</strong> : Besoin, Point de friction, Opportunité, Citation, Comportement, Feedback</li>
            <li>Ajoutez une <strong>priorité</strong> à chaque insight (Critique/Haute/Moyenne/Basse)</li>
            <li>Créez des <strong>besoins utilisateurs</strong> directement depuis les insights type "Besoin"</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-3 md:p-4 border-l-4 border-purple-500">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">📊 Actions de suivi</h4>
          <ul className="text-xs md:text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Créez des <strong>actions de suivi</strong> pour chaque insight important</li>
            <li>Assignez les actions aux <strong>bons contacts</strong> avec des dates limites</li>
            <li>Catégorisez : Développement, Design, Recherche, Business, Autre</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-3 md:p-4 border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">🔗 Traçabilité</h4>
          <ul className="text-xs md:text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Liez les entretiens aux <strong>produits</strong> concernés pour une meilleure organisation</li>
            <li>Associez les <strong>besoins utilisateurs</strong> identifiés lors de l'entretien</li>
            <li>Utilisez l'<strong>export CSV</strong> pour partager avec les stakeholders</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-3 md:p-4 border-l-4 border-yellow-500">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">💡 Bonnes pratiques</h4>
          <ul className="text-xs md:text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Planifiez <strong>régulièrement</strong> des entretiens (hebdomadaire/mensuel)</li>
            <li>Synthétisez les insights <strong>immédiatement</strong> après l'entretien</li>
            <li>Partagez les <strong>learnings clés</strong> avec l'équipe rapidement</li>
            <li>Revisitez les <strong>insights passés</strong> pour identifier les tendances</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterviewTips;
