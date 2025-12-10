import { Target, BarChart, Calendar } from 'lucide-react';
import { InfoTooltip } from '../../ui';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';

/**
 * Section Indicateurs Stratégiques + Sprints en cours
 */
const StrategicKPIsSection = ({ 
  kpis, 
  uncoveredNeeds,
  criticalUncoveredNeeds,
  filtered, 
  activeSprints, 
  selectedSprintId, 
  onSprintSelect,
  onNavigateToView 
}) => {
  return (
    <div className="lg:col-span-1">
      <h2 className={`${DASHBOARD_TEXT.h2} mb-2 sm:mb-3 flex items-center gap-2`}>
        <Target size={18} className="sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
        <span className="truncate">Indicateurs Stratégiques</span>
        <InfoTooltip text="Vue d'ensemble des indicateurs clés de performance (KPIs) de votre produit. Ces métriques permettent de suivre rapidement l'état des produits actifs, la couverture des besoins utilisateurs et le suivi budgétaire." />
      </h2>
      <div className="space-y-2">
        {/* Card 1 : Produits Actifs - Format uniforme */}
        <div 
          className="bg-white rounded-lg shadow px-2.5 sm:px-3 py-2 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => onNavigateToView && onNavigateToView('products')}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg flex-shrink-0">📦</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-bold text-gray-800">Produits Actifs</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-600 mt-0.5">
                <span>{kpis.totalProducts} total</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
              <span className="text-lg sm:text-xl font-bold text-green-600">{kpis.activeProducts}</span>
            </div>
          </div>
        </div>

        {/* Card 2 : Besoins → Stories - Format uniforme */}
        <div 
          className="bg-white rounded-lg shadow px-2.5 sm:px-3 py-2 cursor-pointer hover:shadow-lg transition-all relative"
          onClick={() => onNavigateToView && onNavigateToView('userNeeds')}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg flex-shrink-0">💡</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-bold text-gray-800">Besoins → Stories</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-600 mt-0.5">
                <span className="truncate">{uncoveredNeeds > 0 ? `${uncoveredNeeds} sans story` : 'Tous couverts'}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
              <span className="text-xs text-gray-500">{filtered.userNeeds.length - uncoveredNeeds}/{filtered.userNeeds.length}</span>
            </div>
          </div>
          {criticalUncoveredNeeds > 0 && (
            <div className="absolute top-1 right-1">
              <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                {criticalUncoveredNeeds}
              </span>
            </div>
          )}
        </div>

        {/* Sprints en cours */}
        <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
          <h3 className={`${DASHBOARD_TEXT.h3} flex items-center gap-1.5 sm:gap-2`}>
            <BarChart size={14} className="sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
            <span>Sprints en cours</span>
          </h3>
          {(() => {
            const activeSprintsList = filtered.sprints.filter(s => s.status === 'active');
            return activeSprintsList.length > 0 ? (
              <div className="space-y-3">
                {activeSprintsList
                  .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
                  .map((sprint) => {
                    const startDate = new Date(sprint.startDate);
                    const endDate = new Date(sprint.endDate);
                    const today = new Date();
                    const product = filtered.products.find(p => p.id === sprint.productId);
                    const remainingDays = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
                    const isSelected = sprint.id === selectedSprintId;
                    
                    return (
                      <div 
                        key={sprint.id}
                        className={`bg-white rounded-lg shadow px-2.5 sm:px-3 py-2 cursor-pointer hover:shadow-lg transition-all ${
                          isSelected ? 'ring-2 ring-emerald-500 border-emerald-500' : ''
                        }`}
                        onClick={() => onSprintSelect(sprint.id)}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-1.5 sm:gap-2">
                              <span className="text-xs sm:text-sm font-bold text-gray-800 truncate">{sprint.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-600 mt-0.5 flex-wrap">
                              {/* Badge Produit */}
                              {product && (
                                <span 
                                  className="px-1.5 py-0.5 rounded text-xs font-bold text-white flex-shrink-0"
                                  style={{ backgroundColor: product.color }}
                                >
                                  {product.code}
                                </span>
                              )}
                              <Calendar size={10} className="flex-shrink-0" />
                              <span className="truncate">
                                {startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                {' → '}
                                {endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                              </span>
                              <span className="text-emerald-600 font-semibold flex-shrink-0">
                                ({remainingDays}j)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-3 sm:py-4 text-gray-400 text-xs">
                <BarChart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1.5 sm:mb-2 opacity-50" />
                <p>Aucun sprint en cours</p>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default StrategicKPIsSection;
