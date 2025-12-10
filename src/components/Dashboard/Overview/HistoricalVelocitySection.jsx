import { TrendingUp, TrendingDown } from 'lucide-react';
import { InfoTooltip } from '../../ui';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';
import { 
  BarChart as RechartsBarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

/**
 * Section Vélocité Historique
 * Affiche le graphique de vélocité des 6 derniers sprints
 */
const HistoricalVelocitySection = ({ velocityData }) => {
  const { completedSprints = [], averageVelocity = 0, velocityTrend = 0 } = velocityData;

  return (
    <div>
      <h2 className={`${DASHBOARD_TEXT.h2} mb-2 sm:mb-3 flex items-center gap-2`}>
        <TrendingUp size={18} className="sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
        <span className="truncate">Vélocité Historique</span>
        <InfoTooltip text="Graphique des 6 derniers sprints complétés montrant les story points complétés (émeraude) vs planifiés (gris). La vélocité moyenne et la tendance (hausse ou baisse) vous aident à prévoir la capacité des prochains sprints et à améliorer vos estimations." />
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Graphique */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          {completedSprints.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180} className="sm:h-[200px]">
                <RechartsBarChart data={completedSprints}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 9 }}
                    className="sm:text-xs"
                    angle={-45}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis tick={{ fontSize: 9 }} className="sm:text-xs" />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="completed" fill="#10B981" name="Complété" />
                  <Bar dataKey="planned" fill="#D1D5DB" name="Planifié" />
                </RechartsBarChart>
              </ResponsiveContainer>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Moyenne</span>
                  <span className="font-bold text-emerald-600">{averageVelocity} pts</span>
                </div>
                {velocityTrend !== 0 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Tendance</span>
                    <span className={`font-bold flex items-center gap-1 ${velocityTrend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {velocityTrend > 0 ? <TrendingUp size={12} className="sm:w-3.5 sm:h-3.5" /> : <TrendingDown size={12} className="sm:w-3.5 sm:h-3.5" />}
                      {velocityTrend > 0 ? '+' : ''}{velocityTrend} pts
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
              <p className="text-xs sm:text-sm">Terminez des sprints pour voir la vélocité</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricalVelocitySection;
