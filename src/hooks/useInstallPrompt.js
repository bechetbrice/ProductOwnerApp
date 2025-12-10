import { useState, useEffect } from 'react';

/**
 * Hook pour gérer l'installation PWA
 * Détecte la plateforme, capture le prompt d'installation, et fournit les méthodes d'installation
 * 
 * @returns {Object} État et méthodes pour l'installation PWA
 * @property {boolean} isInstallable - L'app peut être installée (beforeinstallprompt disponible)
 * @property {boolean} isInstalled - L'app est déjà installée
 * @property {boolean} isIOS - Détection iOS (nécessite instructions manuelles)
 * @property {string|null} platform - Plateforme détectée ('ios', 'android', 'desktop', null)
 * @property {Function} install - Fonction pour déclencher l'installation
 * @property {Function} dismissPrompt - Fonction pour masquer le bouton temporairement
 */
const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [platform, setPlatform] = useState(null);
  const [isReady, setIsReady] = useState(false); // Nouveau: Attendre que la détection soit complète

  useEffect(() => {
    // Détection de la plateforme
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();
    
    // Détection iOS plus robuste
    // Vérifier à la fois le UA et la plateforme réelle
    const isIOSUA = /iphone|ipad|ipod/.test(userAgent);
    const isIOSPlatform = /iphone|ipad|ipod|ios/.test(platform) || 
                          (/mac/.test(platform) && 'ontouchend' in document);
    const isIOSDevice = isIOSUA && isIOSPlatform;
    
    // Détection Android
    const isAndroid = /android/.test(userAgent);
    
    // Détection mobile générique
    const isMobile = /mobile/.test(userAgent);
    
    // Protection contre le mode responsive des DevTools
    const isDevToolsEmulation = !('ontouchstart' in window) && isMobile;
    
    setIsIOS(isIOSDevice && !isDevToolsEmulation);
    
    if (isIOSDevice && !isDevToolsEmulation) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else if (isMobile) {
      setPlatform('mobile');
    } else {
      setPlatform('desktop');
    }

    // Vérifier si l'app est déjà installée
    const checkIfInstalled = () => {
      // Mode standalone = app installée
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // iOS specific check
      const isIOSInstalled = window.navigator.standalone === true;
      
      setIsInstalled(isStandalone || isIOSInstalled);
    };

    checkIfInstalled();

    // Vérifier localStorage pour voir si l'utilisateur a déjà dismissé le prompt
    const dismissedUntil = localStorage.getItem('pwa_install_dismissed_until');
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil)) {
      return;
    }

    // Capturer l'événement beforeinstallprompt (Android/Desktop uniquement)
    const handleBeforeInstallPrompt = (e) => {
      // Empêcher le prompt automatique du navigateur
      e.preventDefault();
      
      // Stocker l'événement pour l'utiliser plus tard
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      console.log('📱 PWA: beforeinstallprompt event captured');
    };

    // Écouter l'événement d'installation réussie
    const handleAppInstalled = () => {
      console.log('✅ PWA: App successfully installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      
      // Nettoyer le localStorage
      localStorage.removeItem('pwa_install_dismissed_until');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // iOS: Afficher le bouton si pas en mode standalone et pas déjà dismissé
    if (isIOSDevice && !window.navigator.standalone) {
      setIsInstallable(true);
      setIsReady(true);
    } else {
      // Desktop/Android: Attendre un peu pour laisser le temps à beforeinstallprompt de se déclencher
      const readyTimer = setTimeout(() => {
        setIsReady(true);
        // Si après 2 secondes, toujours pas de prompt, on considère que c'est pas installable
        if (!deferredPrompt) {
          console.log('⚠️ PWA: beforeinstallprompt not captured after timeout');
        }
      }, 2000);
      
      return () => {
        clearTimeout(readyTimer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  /**
   * Déclenche l'installation de la PWA
   * Pour Android/Desktop: affiche le prompt natif
   * Pour iOS: retourne false (nécessite instructions manuelles)
   * 
   * @returns {Promise<boolean>} true si installation acceptée, false sinon
   */
  const install = async () => {
    if (!deferredPrompt) {
      // iOS ou prompt pas disponible
      if (isIOS) {
        console.log('📱 iOS detected: manual installation required');
        return false;
      }
      console.warn('⚠️ PWA: No installation prompt available');
      return false;
    }

    try {
      // Afficher le prompt d'installation
      deferredPrompt.prompt();
      
      // Attendre la réponse de l'utilisateur
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`📱 PWA: User response: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('✅ PWA: User accepted the install prompt');
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      } else {
        console.log('❌ PWA: User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('❌ PWA: Error during installation:', error);
      return false;
    }
  };

  /**
   * Masque temporairement le bouton d'installation
   * L'utilisateur peut toujours l'installer via les paramètres du navigateur
   * 
   * @param {number} days - Nombre de jours avant de réafficher (défaut: 7)
   */
  const dismissPrompt = (days = 7) => {
    const dismissUntil = Date.now() + (days * 24 * 60 * 60 * 1000);
    localStorage.setItem('pwa_install_dismissed_until', dismissUntil.toString());
    setIsInstallable(false);
    console.log(`📱 PWA: Install prompt dismissed for ${days} days`);
  };

  return {
    isInstallable,
    isInstalled,
    isIOS,
    platform,
    install,
    dismissPrompt,
    isReady
  };
};

export default useInstallPrompt;
