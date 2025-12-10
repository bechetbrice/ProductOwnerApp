import { Lightbulb } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * SprintTips - Module Conseils et astuces pour la gestion des sprints
 * 
 * @param {Object} props
 * @param {boolean} props.show - Afficher le module
 */
const SprintTips = ({ show }) => {
  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-200 rounded-lg">
          <Lightbulb size={24} className="text-yellow-700" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Conseils et astuces</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
          <h4 className="font-semibold text-gray-900 mb-2">🎯 Qu'est-ce qu'un Sprint ?</h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Itération <strong>time-boxée</strong> (durée fixe) pour livrer de la valeur incrémentale</li>
            <li>Durée Scrum recommandée : <strong>1 à 4 semaines</strong> (7-28 jours)</li>
            <li>Commence par un <strong>Sprint Planning</strong>, se termine par Review + Rétro</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
          <h4 className="font-semibold text-gray-900 mb-2">📋 Création d'un sprint</h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li><strong>Produit</strong> : obligatoire, détermine quelles stories sont disponibles</li>
            <li><strong>Équipe</strong> : obligatoire, assignée automatiquement à toutes les stories du sprint</li>
            <li><strong>Objectif (Sprint Goal)</strong> : claire, mesurable, atteignable en 1 sprint</li>
            <li><strong>Stories</strong> : sélectionnez uniquement ce que l'équipe peut réaliser</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
          <h4 className="font-semibold text-gray-900 mb-2">🔄 Cycle de vie d'un sprint</h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li><strong>Planifié</strong> : Sprint préparé, pas encore démarré</li>
            <li><strong>En cours</strong> : Sprint actif, équipe travaille sur les stories</li>
            <li><strong>Terminé</strong> : Sprint achevé, stories livrées (ou non)</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-900 mb-2">📊 Indicateurs clés</h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li><strong>Progression stories</strong> : % de stories terminées (status "done")</li>
            <li><strong>Progression temps</strong> : % du sprint écoulé (jours passés / durée totale)</li>
            <li><strong>Alerte rouge</strong> : si temps écoulé &gt; progression stories (risque de non-livraison)</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
          <h4 className="font-semibold text-gray-900 mb-2">⚠️ Validations Scrum</h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li><strong>Durée max</strong> : 28 jours (4 semaines) - au-delà, c'est bloqué</li>
            <li><strong>Durée recommandée</strong> : 7-14 jours (2 semaines) pour agilité optimale</li>
            <li><strong>Avertissement</strong> : si &lt;7 jours, l'app suggère d'allonger</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
          <h4 className="font-semibold text-gray-900 mb-2">💡 Bonnes pratiques</h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li><strong>Durée fixe</strong> : ne changez jamais les dates d'un sprint en cours</li>
            <li><strong>Capacité réaliste</strong> : ne surchargez pas le sprint, laissez de la marge</li>
            <li><strong>Daily Scrum</strong> : synchronisation quotidienne de 15min max</li>
            <li><strong>Sprint Board</strong> : utilisez le module pour suivre visuellement l'avancement</li>
            <li><strong>Review + Rétro</strong> : célébrez les succès et améliorez-vous continuellement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

SprintTips.propTypes = {
  show: PropTypes.bool.isRequired
};

export default SprintTips;
