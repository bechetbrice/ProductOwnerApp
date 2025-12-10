import { AlertCircle, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

/**
 * AnalysisStats - Composant de statistiques pour les modules d'analyse
 * Affiche 7 cards KPI sur les besoins utilisateurs
 */
const AnalysisStats = ({ 
  userNeeds, 
  userStories, 
  productFilter
}) => {
  // Filtrer les besoins selon le produit sélectionné
  const filteredNeeds = productFilter === 'all' 
    ? userNeeds 
    : userNeeds.filter(n => n.productId === productFilter);

  // Statistiques par importance
  const needsByImportance = {
    critical: filteredNeeds.filter(n => n.importance === 'critical').length,
    high: filteredNeeds.filter(n => n.importance === 'high').length,
    medium: filteredNeeds.filter(n => n.importance === 'medium').length,
    low: filteredNeeds.filter(n => n.importance === 'low').length
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 mb-6">
      {/* Card 1 : Total Besoins */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-emerald-500">
        <div className="flex items-center justify-between mb-2">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{filteredNeeds.length}</p>
        </div>
        <p className="text-xs text-gray-600 font-medium">Total Besoins</p>
      </div>

      {/* Card 2 : Critiques */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-2">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{needsByImportance.critical}</p>
        </div>
        <p className="text-xs text-gray-600 font-medium">Critiques</p>
      </div>

      {/* Card 3 : Haute priorité */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-orange-500">
        <div className="flex items-center justify-between mb-2">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{needsByImportance.high}</p>
        </div>
        <p className="text-xs text-gray-600 font-medium">Haute priorité</p>
      </div>

      {/* Card 4 : Priorité moyenne */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-yellow-500">
        <div className="flex items-center justify-between mb-2">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{needsByImportance.medium}</p>
        </div>
        <p className="text-xs text-gray-600 font-medium">Priorité moyenne</p>
      </div>

      {/* Card 5 : Basse priorité */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-green-500">
        <div className="flex items-center justify-between mb-2">
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{needsByImportance.low}</p>
        </div>
        <p className="text-xs text-gray-600 font-medium">Basse priorité</p>
      </div>

      {/* Card 6 : Réservé */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6"></div>
          <p className="text-xl sm:text-2xl font-bold text-gray-400">-</p>
        </div>
        <p className="text-xs text-gray-600 font-medium">Réservé</p>
      </div>

      {/* Card 7 : Réservé */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6"></div>
          <p className="text-xl sm:text-2xl font-bold text-gray-400">-</p>
        </div>
        <p className="text-xs text-gray-600 font-medium">Réservé</p>
      </div>
    </div>
  );
};

export default AnalysisStats;
