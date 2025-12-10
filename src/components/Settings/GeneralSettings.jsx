import { useState, useMemo } from 'react';
import { 
  Database,
  Shield,
  Trash2,
  ChevronDown,
  ChevronRight,
  Check,
  Lock,
  AlertTriangle,
  Clock,
  Download,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { useAutoExport } from '../../contexts/AutoExportContext';

const GeneralSettings = () => {
  const { config, updateConfig, stats, hasChanges, manualExport, resetDailyStats } = useAutoExport();

  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('productOwnerApp_preferences');
    if (saved) {
      try {
        const parsedPreferences = JSON.parse(saved);
        return {
          compactMode: parsedPreferences.compactMode || false
        };
      } catch (error) {
        console.error('Erreur lors du chargement des préférences:', error);
      }
    }
    return {
      compactMode: false
    };
  });

  const [expandedSections, setExpandedSections] = useState({
    autoExport: true,
    storage: false,
    privacy: false,
    danger: false
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (key, value) => {
    const newPreferences = { 
      ...preferences, 
      [key]: value
    };
    setPreferences(newPreferences);
    localStorage.setItem('productOwnerApp_preferences', JSON.stringify(newPreferences));
  };

  // Gestion export automatique
  const handleToggleAutoExport = () => {
    updateConfig({ enabled: !config.enabled });
  };

  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 5 && value <= 120) {
      updateConfig({ interval: value });
    }
  };

  const handleMaxExportsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 50) {
      updateConfig({ maxExportsPerDay: value });
    }
  };

  const handleNotifyToggle = () => {
    updateConfig({ notifyBeforeExport: !config.notifyBeforeExport });
  };

  const handleNotifyDelayChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 60) {
      updateConfig({ notifyDelay: value });
    }
  };

  const handleManualExport = () => {
    const success = manualExport();
    if (success) {
      alert('✅ Export manuel réussi !');
    } else {
      alert('❌ Erreur lors de l\'export manuel');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Jamais';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculer l'utilisation du stockage
  const storageStats = useMemo(() => {
    let totalSize = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      totalSize += key.length + (value ? value.length : 0);
    }
    
    // Convertir en KB
    const sizeKB = (totalSize / 1024).toFixed(1);
    const maxSizeMB = 5; // localStorage limite généralement à 5-10 MB
    const percentage = ((totalSize / 1024 / 1024) / maxSizeMB * 100).toFixed(2);
    
    return {
      used: sizeKB,
      total: maxSizeMB,
      percentage: parseFloat(percentage)
    };
  }, []);

  const handleDeleteAllData = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    // Confirmation finale
    const finalConfirm = window.confirm(
      '⚠️ ATTENTION : Cette action est IRRÉVERSIBLE !\n\n' +
      'Vous êtes sur le point de supprimer DÉFINITIVEMENT :\n' +
      '• Toutes vos données\n' +
      '• Tous vos paramètres\n' +
      '• Toutes vos préférences\n' +
      '• L\'intégralité du localStorage\n\n' +
      'Voulez-vous vraiment continuer ?'
    );

    if (finalConfirm) {
      // Effacer toutes les données
      localStorage.clear();
      
      // Recharger la page pour réinitialiser l'application
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Section Export automatique */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('autoExport')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 flex items-center justify-between hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900 dark:hover:to-emerald-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Export automatique
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                {config.enabled ? `🟢 Actif - Export toutes les ${config.interval} min` : '⚪ Désactivé'}
              </p>
            </div>
          </div>
          {expandedSections.autoExport ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.autoExport && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            {/* Statut actuel */}
            <div className={`p-4 rounded-lg ${config.enabled ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700'}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${config.enabled ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Statut : {config.enabled ? '🟢 Actif' : '⚪ Désactivé'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {config.enabled 
                      ? `Export automatique toutes les ${config.interval} minutes si des modifications sont détectées.`
                      : 'L\'export automatique est actuellement désactivé.'
                    }
                  </p>
                  {hasChanges && config.enabled && (
                    <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                      ⚠️ Modifications détectées - Export prévu au prochain cycle
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Configuration</h4>
              
              {/* Activer/Désactiver */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Activer l'export automatique
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Démarre la sauvegarde automatique périodique
                  </p>
                </div>
                <button
                  onClick={handleToggleAutoExport}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.enabled ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Fréquence */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Fréquence d'export
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={config.interval}
                    onChange={handleIntervalChange}
                    disabled={!config.enabled}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="w-24 text-right">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {config.interval}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">min</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  L'export se déclenche uniquement si des modifications sont détectées
                </p>
              </div>

              {/* Limite quotidienne */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Limite quotidienne
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={config.maxExportsPerDay}
                    onChange={handleMaxExportsChange}
                    disabled={!config.enabled}
                    className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    exports maximum par jour
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Protection contre les exports trop fréquents
                </p>
              </div>

              {/* Notification */}
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Notification avant export
                  </label>
                  <button
                    onClick={handleNotifyToggle}
                    disabled={!config.enabled}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${config.notifyBeforeExport ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.notifyBeforeExport ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                {config.notifyBeforeExport && (
                  <div className="flex items-center gap-4 mt-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Délai :
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={config.notifyDelay}
                      onChange={handleNotifyDelayChange}
                      disabled={!config.enabled}
                      className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">secondes</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Affiche un message dans la console avant chaque export
                </p>
              </div>
            </div>

            {/* Statistiques */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                Statistiques
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">Exports aujourd'hui</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.exportsToday}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      /{config.maxExportsPerDay}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-xs text-green-600 dark:text-green-400 mb-1">Total exports</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.totalExports}
                  </div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Dernier export</div>
                  <div className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    {formatDate(stats.lastExportDate)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                <div className={`w-3 h-3 rounded-full ${stats.lastExportSuccess ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Dernier statut : {stats.lastExportSuccess ? 'Succès' : 'Échec'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleManualExport}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                Export manuel maintenant
              </button>
              <button
                onClick={resetDailyStats}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Réinitialiser les stats du jour
              </button>
            </div>

            {/* Info box */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex gap-3">
                <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">💡</div>
                <div className="text-xs text-blue-800 dark:text-blue-300">
                  <p className="font-semibold mb-1">Comment ça marche ?</p>
                  <ul className="space-y-1">
                    <li>• Le système vérifie les modifications à chaque intervalle</li>
                    <li>• Un export se déclenche uniquement si des changements sont détectés</li>
                    <li>• Les fichiers sont téléchargés automatiquement dans votre dossier Téléchargements</li>
                    <li>• Format : <code className="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">productownerapp_auto_YYYY-MM-DD_HH-MM-SS.json</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section Utilisation du stockage */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('storage')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 flex items-center justify-between hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900 dark:hover:to-blue-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Utilisation du stockage
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Vue d'ensemble de l'espace utilisé
              </p>
            </div>
          </div>
          {expandedSections.storage ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.storage && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Espace utilisé</span>
                <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{storageStats.used} KB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Capacité totale</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{storageStats.total}.00 MB</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Progression</span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">{storageStats.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(storageStats.percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section Confidentialité */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('privacy')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-between hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900 dark:hover:to-teal-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Confidentialité
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Vos données sont 100% privées
              </p>
            </div>
          </div>
          {expandedSections.privacy ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.privacy && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">Stockage 100% local</p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">sur votre appareil</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">Aucune transmission</p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">vers des serveurs</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">Contrôle total</p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">de vos données</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">Fonctionnement offline</p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">complet</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section Effacer toutes les données */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-red-200 dark:border-red-800">
        <button
          onClick={() => toggleSection('danger')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 flex items-center justify-between hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900 dark:hover:to-pink-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-red-900 dark:text-red-100">
                Effacer toutes les données
              </h3>
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 mt-0.5 sm:mt-1">
                Suppression définitive
              </p>
            </div>
          </div>
          {expandedSections.danger ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.danger && (
          <div className="p-4 sm:p-6 border-t border-red-200 dark:border-red-800 space-y-4">
            {/* Avertissement */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <h4 className="text-sm font-bold text-red-900 dark:text-red-100">Zone dangereuse</h4>
              </div>
              <p className="text-xs text-red-800 dark:text-red-200 mb-3">
                Action <strong>IRRÉVERSIBLE</strong> qui supprimera :
              </p>
              <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 ml-4 list-disc">
                <li>Toutes vos données</li>
                <li>Tous vos paramètres</li>
                <li>Toutes vos préférences</li>
                <li>L'intégralité du localStorage</li>
              </ul>
            </div>

            {/* Message d'export */}
            <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-3 flex items-start gap-2">
              <Lock className="w-4 h-4 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-pink-800 dark:text-pink-200">
                Exportez vos données avant de continuer
              </p>
            </div>

            {/* Bouton de suppression */}
            {!showDeleteConfirm ? (
              <button
                onClick={handleDeleteAllData}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Effacer définitivement
              </button>
            ) : (
              <div className="space-y-2">
                <div className="bg-red-100 dark:bg-red-900/40 border-2 border-red-600 dark:border-red-400 rounded-lg p-3 text-center">
                  <p className="text-sm font-bold text-red-900 dark:text-red-100 mb-1">
                    ⚠️ CONFIRMATION REQUISE
                  </p>
                  <p className="text-xs text-red-800 dark:text-red-200">
                    Cliquez à nouveau pour confirmer la suppression
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-all text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteAllData}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Confirmer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralSettings;
