import { TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle } from 'lucide-react';
import { CURRENCY_CONFIG } from '../../../utils/constants';
import { MetricCard } from '../../ui';

/**
 * BudgetStatsDashboard - 5 colonnes stats responsive
 * Style identique aux autres sections Dashboard (Overview, Teams)
 * Progressive Enhancement : 1 col → 2 cols → 3 cols → 5 cols
 * 
 * ✅ RESPONSIVE : Grid adaptatif unifié
 */
const BudgetStatsDashboard = ({ stats, currency = 'EUR', entries = [] }) => {
  const currencyConfig = CURRENCY_CONFIG[currency];
  const isOverBudget = stats.variance < 0;

  const formatAmount = (amount) => {
    return currencyConfig.format(amount);
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
      {/* Card 1 : Budget Prévu */}
      <MetricCard
        icon={DollarSign}
        title="Budget Prévu"
        value={formatAmount(stats.totalPlanned)}
        subtitle={`${stats.entriesCount} ligne${stats.entriesCount > 1 ? 's' : ''}`}
        color="#10b981"
        tooltipText="Montant total du budget alloué pour l'ensemble des lignes budgétaires. Ce montant représente le budget initial prévu avant toute dépense."
      />

      {/* Card 2 : Budget Consommé */}
      <MetricCard
        icon={Package}
        title="Budget consommé"
        value={formatAmount(stats.totalActual)}
        subtitle={stats.totalPlanned > 0 ? `${((stats.totalActual / stats.totalPlanned) * 100).toFixed(1)}% du prévu` : '-'}
        color="#14b8a6"
        tooltipText={`Montant total des dépenses effectuées à date (${new Date().toLocaleDateString('fr-FR')}). Ce montant reflète les coûts réellement engagés sur les différentes lignes budgétaires.`}
      />

      {/* Card 3 : Montant Disponible */}
      <MetricCard
        icon={isOverBudget ? TrendingUp : TrendingDown}
        title="Montant disponible"
        value={formatAmount(Math.abs(stats.variance))}
        subtitle={isOverBudget ? 'Dépassement' : 'Économie'}
        color={isOverBudget ? '#EF4444' : '#10B981'}
        tooltipText={`Différence entre le budget prévu et le budget consommé. Un montant positif indique une économie (${formatAmount(Math.abs(stats.variance))} non dépensés), tandis qu'un montant négatif signale un dépassement budgétaire.`}
      />

      {/* Card 4 : Budget Attendu */}
      <MetricCard
        icon={DollarSign}
        title="Budget Attendu"
        value={formatAmount(stats.totalExpected || 0)}
        subtitle={`${entries.filter(e => e.manualExpectedAmount && e.manualExpectedAmount > 0).length} ligne${entries.filter(e => e.manualExpectedAmount && e.manualExpectedAmount > 0).length > 1 ? 's' : ''}`}
        color="#06b6d4"
        tooltipText="Budget attendu suite aux réévaluations manuelles. Ce montant représente le coût final estimé après ajustements et prévisions actualisées pour chaque ligne budgétaire. Si non renseigné, le budget prévu est utilisé par défaut."
      />

      {/* Card 5 : Écart Attendu vs Prévu */}
      {(() => {
        const ecart = (stats.totalExpected || 0) - stats.totalPlanned;
        const isPositive = ecart > 0;
        return (
          <MetricCard
            icon={isPositive ? AlertTriangle : TrendingDown}
            title="Écart Attendu vs Prévu"
            value={formatAmount(Math.abs(ecart))}
            subtitle={stats.totalPlanned > 0 ? `${(ecart / stats.totalPlanned * 100).toFixed(1)}%` : '-'}
            color={isPositive ? '#F97316' : '#10B981'}
            tooltipText="Variance entre le budget attendu (réévalué) et le budget prévu (initial). Un écart positif indique un dépassement potentiel, tandis qu'un écart négatif signale une économie anticipée sur les estimations initiales."
          />
        );
      })()}
    </div>
  );
};

export default BudgetStatsDashboard;
