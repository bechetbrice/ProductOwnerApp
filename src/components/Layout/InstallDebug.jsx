import { Info } from 'lucide-react';
import { useState } from 'react';
import useInstallPrompt from '../../hooks/useInstallPrompt';

/**
 * Composant de debug pour l'installation PWA
 * À utiliser uniquement en développement pour diagnostiquer les problèmes
 */
const InstallDebug = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isInstallable, isInstalled, isIOS, platform, install, dismissPrompt, isReady } = useInstallPrompt();

  // Vérifier localStorage
  const dismissedUntil = localStorage.getItem('pwa_install_dismissed_until');
  const isDismissed = dismissedUntil && Date.now() < parseInt(dismissedUntil);

  // Vérifier Service Worker
  const hasServiceWorker = 'serviceWorker' in navigator;
  const hasManifest = document.querySelector('link[rel="manifest"]') !== null;

  // Vérifier mode standalone
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone = window.navigator.standalone === true;

  // Infos de débogage plateforme
  const userAgent = window.navigator.userAgent;
  const navigatorPlatform = window.navigator.platform;
  const hasTouch = 'ontouchstart' in window;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
        title="PWA Debug Info"
      >
        <Info size={20} />
      </button>

      {/* Panel de debug */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-80 max-h-[80vh] overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              🔍 PWA Debug
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 text-sm">
            {/* État Installation */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                📱 État Installation
              </h4>
              <div className="space-y-1">
                <DebugLine 
                  label="Ready" 
                  value={isReady} 
                  good={isReady}
                />
                <DebugLine 
                  label="Installable" 
                  value={isInstallable} 
                  good={isInstallable}
                />
                <DebugLine 
                  label="Déjà installée" 
                  value={isInstalled}
                  good={!isInstalled}
                />
                <DebugLine 
                  label="Plateforme" 
                  value={platform || 'unknown'}
                />
                <DebugLine 
                  label="iOS" 
                  value={isIOS}
                />
              </div>
            </div>

            {/* État PWA */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                ⚙️ Configuration PWA
              </h4>
              <div className="space-y-1">
                <DebugLine 
                  label="Service Worker" 
                  value={hasServiceWorker}
                  good={hasServiceWorker}
                />
                <DebugLine 
                  label="Manifest" 
                  value={hasManifest}
                  good={hasManifest}
                />
                <DebugLine 
                  label="Mode Standalone" 
                  value={isStandalone || isIOSStandalone}
                />
              </div>
            </div>

            {/* Infos Navigateur (NOUVEAU) */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🔍 Infos Navigateur
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 dark:text-gray-400">Platform:</span>
                  <code className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded break-all">
                    {navigatorPlatform}
                  </code>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-gray-500 dark:text-gray-400">User Agent:</span>
                  <code className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded break-all text-[10px]">
                    {userAgent}
                  </code>
                </div>
                <DebugLine 
                  label="Touch Support" 
                  value={hasTouch}
                />
              </div>
            </div>

            {/* État Dismiss */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🔕 Dismiss Status
              </h4>
              <div className="space-y-1">
                <DebugLine 
                  label="Dismissed" 
                  value={isDismissed}
                  good={!isDismissed}
                />
                {dismissedUntil && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Jusqu'à: {new Date(parseInt(dismissedUntil)).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🛠️ Actions
              </h4>
              
              {dismissedUntil && (
                <button
                  onClick={() => {
                    localStorage.removeItem('pwa_install_dismissed_until');
                    window.location.reload();
                  }}
                  className="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition-colors"
                >
                  Clear Dismiss & Reload
                </button>
              )}
              
              {isInstallable && !isInstalled && (
                <button
                  onClick={async () => {
                    const success = await install();
                    alert(success ? 'Installation lancée !' : 'Installation impossible');
                  }}
                  className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                >
                  {isIOS ? 'Voir Instructions iOS' : 'Installer Maintenant'}
                </button>
              )}
            </div>

            {/* Diagnostic */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 text-xs">
                💡 Diagnostic
              </h4>
              <div className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                {!isReady && (
                  <div>• Détection en cours... (attendre 2 secondes)</div>
                )}
                {isReady && !isInstallable && !isInstalled && (
                  <div>• Bouton invisible : beforeinstallprompt non capturé</div>
                )}
                {isInstalled && (
                  <div>• Bouton invisible : app déjà installée</div>
                )}
                {isDismissed && (
                  <div>• Bouton invisible : dismiss actif</div>
                )}
                {!hasServiceWorker && (
                  <div>• Service Worker non supporté par le navigateur</div>
                )}
                {!hasManifest && (
                  <div>• Manifest manquant dans le HTML</div>
                )}
                {isReady && isInstallable && !isInstalled && !isDismissed && (
                  <div className="text-green-600 dark:text-green-400">
                    ✅ Le bouton devrait être visible dans le header !
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant helper pour afficher une ligne de debug
const DebugLine = ({ label, value, good = null }) => {
  const displayValue = typeof value === 'boolean' ? (value ? '✅' : '❌') : value;
  
  let colorClass = 'text-gray-600 dark:text-gray-400';
  if (good !== null) {
    colorClass = good 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  }

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700 dark:text-gray-300">{label}:</span>
      <span className={`font-mono ${colorClass}`}>{displayValue}</span>
    </div>
  );
};

export default InstallDebug;
