import { Heart } from 'lucide-react';
import { InfoTooltip } from '../../ui';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';
import { getFactorTooltip } from '../Utils';

/**
 * Section Product Health Score
 * Affiche le score global de santé du produit avec jauge radiale et détails des 4 facteurs
 */
const HealthScoreSection = ({ healthScore }) => {
  if (!healthScore) return null;

  const { score, factors, color, textColor } = healthScore;

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
        <Heart size={18} className="sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
        <span className="truncate">Product Health Score</span>
        <InfoTooltip text="Score global de santé du produit sur 100 points, basé sur 4 facteurs : Objectifs (25%, progression moyenne des objectifs actifs), Besoins (25%, taux de couverture des besoins par des stories), Sprint (25%, performance du sprint actif), et Budget (25%, respect du budget alloué). Score vert ≥80 = excellent, orange 60-79 = attention, rouge <60 = risque." />
      </h3>

      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row lg:gap-8">
        {/* Jauge radiale */}
        <div className="flex-shrink-0 relative">
          <svg width="160" height="160" viewBox="0 0 200 200" className="sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px]">
            <circle cx="100" cy="100" r="70" fill="none" stroke="#E5E7EB" strokeWidth="20" strokeDasharray="220" strokeDashoffset="0" strokeLinecap="round" transform="rotate(180 100 100)" />
            <circle cx="100" cy="100" r="70" fill="none" stroke={color} strokeWidth="20" strokeDasharray="220" strokeDashoffset={220 - (220 * score) / 100} strokeLinecap="round" transform="rotate(180 100 100)" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className={`${DASHBOARD_TEXT.valueLarge} ${textColor}`} style={{ fontSize: '2rem' }}>{score}</p>
              <p className={DASHBOARD_TEXT.caption}>/ 100</p>
            </div>
          </div>
        </div>

        {/* Détail des facteurs */}
        <div className="flex-1 w-full">
          <div className="space-y-2 sm:space-y-3">
            {factors.map((factor, idx) => (
              <div key={idx}>
                <div className="flex items-start justify-between mb-1 gap-2">
                  <div className="flex items-center gap-1 min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{factor.name}</span>
                    <InfoTooltip text={getFactorTooltip(factor.name)} size={12} className="flex-shrink-0" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 flex-shrink-0">
                    {factor.score}/{factor.max}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-1">
                  <div
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      factor.score / factor.max >= 0.8 ? 'bg-emerald-500' :
                      factor.score / factor.max >= 0.6 ? 'bg-orange-500' :
                      factor.score / factor.max >= 0.4 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(factor.score / factor.max) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{factor.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreSection;
