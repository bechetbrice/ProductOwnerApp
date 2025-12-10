import { Clock } from 'lucide-react';
import { useAutoExport } from '../../contexts/AutoExportContext';

/**
 * AutoExportIndicator - Indicateur visuel de l'export automatique
 * Affiche un badge discret dans le Header
 */
const AutoExportIndicator = () => {
  const { config, stats, hasChanges } = useAutoExport();

  if (!config.enabled) return null;

  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
      title={`Export auto actif - ${stats.exportsToday}/${config.maxExportsPerDay} exports aujourd'hui`}
    >
      <div className="relative">
        <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
        {hasChanges && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        )}
      </div>
      <span className="text-xs font-medium text-green-600 dark:text-green-400 hidden sm:inline">
        Auto {config.interval}min
      </span>
      <span className="text-xs text-green-600 dark:text-green-400">
        {stats.exportsToday}/{config.maxExportsPerDay}
      </span>
    </div>
  );
};

export default AutoExportIndicator;
