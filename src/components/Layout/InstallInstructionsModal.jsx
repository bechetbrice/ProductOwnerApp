import { X, Share, Plus, Smartphone } from 'lucide-react';

/**
 * Modal affichant les instructions pour installer la PWA sur iOS
 * iOS ne supporte pas l'API beforeinstallprompt, donc installation manuelle requise
 */
const InstallInstructionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-auto animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Installer l'application
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sur votre écran d'accueil
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Introduction */}
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pour installer ProductOwnerApp sur votre iPhone ou iPad, suivez ces étapes simples :
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              {/* Étape 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Appuyez sur le bouton <strong>Partager</strong> <Share className="inline w-4 h-4 text-blue-500" /> dans la barre du bas de Safari
                  </p>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Faites défiler et sélectionnez <strong>"Sur l'écran d'accueil"</strong> <Plus className="inline w-4 h-4 text-blue-500" />
                  </p>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Appuyez sur <strong>"Ajouter"</strong> pour terminer l'installation
                  </p>
                </div>
              </div>
            </div>

            {/* Info complémentaire */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Note :</strong> Cette fonctionnalité n'est disponible que dans Safari sur iOS. Si vous utilisez un autre navigateur, veuillez ouvrir cette page dans Safari.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
              J'ai compris
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstallInstructionsModal;
