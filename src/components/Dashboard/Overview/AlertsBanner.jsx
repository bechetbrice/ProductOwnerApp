import { AlertTriangle, AlertCircle } from 'lucide-react';

/**
 * Bannière d'alertes critiques
 */
const AlertsBanner = ({ alerts, onNavigateToView }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 sm:p-4 shadow">
      <div className="flex items-start gap-2 sm:gap-3">
        <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
        <div className="flex-1 min-w-0">
          <h3 className="text-red-900 font-semibold text-xs sm:text-sm mb-2">⚠️ Attention Requise</h3>
          <div className="space-y-1">
            {alerts.overdueActions?.length > 0 && (
              <button
                onClick={() => onNavigateToView && onNavigateToView('interviews', { actionStatus: 'overdue' })}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-red-800 hover:text-red-900 hover:underline"
              >
                <AlertCircle size={14} className="flex-shrink-0" />
                <span className="truncate">
                  <strong>{alerts.overdueActions.length}</strong> action{alerts.overdueActions.length > 1 ? 's' : ''} en retard
                </span>
              </button>
            )}
            {alerts.criticalUncoveredNeeds > 0 && (
              <button
                onClick={() => onNavigateToView && onNavigateToView('userNeeds', { importance: 'critical' })}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-orange-800 hover:text-orange-900 hover:underline"
              >
                <AlertCircle size={14} className="flex-shrink-0" />
                <span className="truncate">
                  <strong>{alerts.criticalUncoveredNeeds}</strong> besoin{alerts.criticalUncoveredNeeds > 1 ? 's' : ''} critique{alerts.criticalUncoveredNeeds > 1 ? 's' : ''} sans story
                </span>
              </button>
            )}
            {alerts.sprintDelay && (
              <button
                onClick={() => onNavigateToView && onNavigateToView('sprints')}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-orange-800 hover:text-orange-900 hover:underline"
              >
                <AlertCircle size={14} className="flex-shrink-0" />
                <span className="truncate">
                  Sprint actif : <strong>{alerts.sprintDelay} jour{alerts.sprintDelay > 1 ? 's' : ''} de retard</strong> estimé{alerts.sprintDelay > 1 ? 's' : ''}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsBanner;
