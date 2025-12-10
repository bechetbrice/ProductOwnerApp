import { useState, useEffect } from 'react';
import { X, AlertTriangle, AlertCircle, Download } from 'lucide-react';
import { getQuotaAlert, getQuotaStats } from '../../utils/storageQuota';

/**
 * QuotaAlert - Alerte de quota localStorage
 * 
 * Affiche une bannière persistante quand le quota localStorage
 * dépasse 80% (warning) ou 90% (critique).
 * 
 * @component
 */
const QuotaAlert = ({ onExport }) => {
  const [alert, setAlert] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Vérification initiale
    const checkQuota = () => {
      const currentAlert = getQuotaAlert();
      if (currentAlert && !dismissed) {
        setAlert(currentAlert);
      } else {
        setAlert(null);
      }
    };

    checkQuota();

    // Vérification toutes les 5 minutes
    const interval = setInterval(checkQuota, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dismissed]);

  // Réinitialiser dismissed si alerte critique (ne peut pas être dismissée)
  useEffect(() => {
    if (alert?.level === 'critical') {
      setDismissed(false);
    }
  }, [alert]);

  if (!alert || dismissed) return null;

  const isCritical = alert.level === 'critical';
  const bgColor = isCritical ? 'bg-red-50' : 'bg-yellow-50';
  const borderColor = isCritical ? 'border-red-200' : 'border-yellow-200';
  const textColor = isCritical ? 'text-red-900' : 'text-yellow-900';
  const iconColor = isCritical ? 'text-red-600' : 'text-yellow-600';
  const Icon = isCritical ? AlertCircle : AlertTriangle;

  return (
    <div className={`${bgColor} border-b ${borderColor} px-4 py-3`}>
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <Icon className={`${iconColor} flex-shrink-0 mt-0.5`} size={20} />
        
        <div className="flex-1 min-w-0">
          <p className={`font-medium ${textColor} mb-1`}>
            {alert.title}
          </p>
          <p className={`text-sm ${textColor} opacity-90 mb-2`}>
            {alert.message}
          </p>
          
          <div className="flex items-center gap-4 text-xs">
            <div className={`${textColor} opacity-75`}>
              <span className="font-medium">Utilisé :</span> {alert.stats.usedFormatted}
            </div>
            <div className={`${textColor} opacity-75`}>
              <span className="font-medium">Restant :</span> {alert.stats.remainingFormatted}
            </div>
            <div className={`${textColor} opacity-75`}>
              <span className="font-medium">Quota total :</span> {alert.stats.quotaFormatted}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {onExport && (
            <button
              onClick={onExport}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                transition-colors
                ${isCritical 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                }
              `}
            >
              <Download size={14} />
              Exporter
            </button>
          )}
          
          {!isCritical && (
            <button
              onClick={() => setDismissed(true)}
              className={`p-1.5 rounded-lg ${textColor} hover:bg-black/5 transition-colors`}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotaAlert;
