import { Smartphone, Download, Check, X } from 'lucide-react';
import { useState } from 'react';
import useInstallPrompt from '../../hooks/useInstallPrompt';
import InstallInstructionsModal from './InstallInstructionsModal';

/**
 * Bouton pour installer la PWA
 * S'adapte automatiquement selon la plateforme (iOS/Android/Desktop)
 * 
 * @param {Object} props
 * @param {boolean} props.compact - Affichage compact (icône seulement) ou normal (avec texte)
 * @param {string} props.variant - Style du bouton ('header', 'card', 'minimal')
 */
const InstallButton = ({ compact = false, variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, platform, install, dismissPrompt, isReady } = useInstallPrompt();
  const [isIOSModalOpen, setIsIOSModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDismissConfirm, setShowDismissConfirm] = useState(false);

  // Ne rien afficher si l'app est déjà installée ou non installable
  if (isInstalled || !isInstallable) {
    return null;
  }

  /**
   * Gère le clic sur le bouton d'installation
   */
  const handleInstallClick = async () => {
    if (isIOS) {
      // iOS: ouvrir le modal avec instructions
      setIsIOSModalOpen(true);
    } else {
      // Android/Desktop: déclencher le prompt natif
      const success = await install();
      
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        // Prompt pas disponible - afficher un message d'erreur
        alert(
          "Installation impossible\n\n" +
          "Le navigateur n'a pas encore détecté que l'application peut être installée.\n\n" +
          "Solutions :\n" +
          "• Rechargez la page et réessayez dans quelques secondes\n" +
          "• Vérifiez que vous êtes sur la version production (pas en mode dev)\n" +
          "• Utilisez Chrome DevTools > Application > Manifest > 'Add to homescreen'"
        );
      }
    }
  };

  /**
   * Gère le dismiss du prompt
   */
  const handleDismiss = () => {
    dismissPrompt(7); // Masquer pour 7 jours
    setShowDismissConfirm(false);
  };

  // Styles selon le variant
  const getButtonClasses = () => {
    const baseClasses = "flex items-center gap-2 transition-all duration-200 rounded-lg font-medium";
    
    switch (variant) {
      case 'header':
        return `${baseClasses} px-3 py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-sm`;
      
      case 'card':
        return `${baseClasses} px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl`;
      
      case 'minimal':
        return `${baseClasses} p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`;
      
      default:
        return `${baseClasses} px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm`;
    }
  };

  // Message success
  if (showSuccess) {
    return (
      <div className={getButtonClasses()}>
        <Check size={18} className="text-green-400" />
        {!compact && <span>Installé !</span>}
      </div>
    );
  }

  // Bouton principal
  return (
    <>
      <div className="relative flex items-center gap-1">
        {/* Bouton Install */}
        <button
          onClick={handleInstallClick}
          className={getButtonClasses()}
          title={isIOS 
            ? "Installer l'app sur votre écran d'accueil" 
            : "Installer ProductOwnerApp sur cet appareil"
          }
          aria-label="Installer l'application"
        >
          {isIOS ? (
            <Smartphone size={18} />
          ) : (
            <Download size={18} />
          )}
          {!compact && (
            <span className="hidden sm:inline">
              Installer l'app
            </span>
          )}
        </button>

        {/* Bouton dismiss (desktop uniquement) */}
        {!compact && variant === 'header' && (
          <button
            onClick={() => setShowDismissConfirm(true)}
            className="p-2 text-white/60 hover:text-white/90 hover:bg-white/10 rounded-lg transition-colors"
            title="Ne plus afficher"
            aria-label="Masquer le bouton d'installation"
          >
            <X size={16} />
          </button>
        )}

        {/* Confirmation dismiss */}
        {showDismissConfirm && (
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 w-64 z-50">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Masquer ce bouton pendant 7 jours ?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="flex-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
              >
                Oui
              </button>
              <button
                onClick={() => setShowDismissConfirm(false)}
                className="flex-1 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal iOS Instructions */}
      <InstallInstructionsModal
        isOpen={isIOSModalOpen}
        onClose={() => setIsIOSModalOpen(false)}
      />
    </>
  );
};

export default InstallButton;
