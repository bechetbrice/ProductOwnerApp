import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SplashScreen - Écran de chargement moderne avec animations
 * 
 * Affiche un splash screen élégant pendant le chargement initial
 * de l'application avec logo animé, gradient de la charte et
 * message de bienvenue.
 * 
 * Features :
 * - Logo POA avec animation de pulse
 * - Gradient emerald → teal → cyan
 * - Messages de chargement progressifs
 * - Barre de progression animée
 * - Message de remerciement
 * - Lien vers coolabflow.fr
 * 
 * @component
 * @example
 * <SplashScreen message="Chargement des données..." />
 */
const SplashScreen = ({ message = 'Chargement...', progress = 0 }) => {
  const [dots, setDots] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Animation des points de chargement
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Afficher le message après 1s
  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Fond avec gradient animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 animate-gradient-slow">
        {/* Overlay pour adoucir */}
        <div className="absolute inset-0 bg-white/5"></div>
        
        {/* Cercles décoratifs animés */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-md mx-auto">
        
        {/* Logo POA animé */}
        <div className="mb-8 relative">
          {/* Cercle de fond pulsant */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full animate-ping-slow"></div>
          </div>
          
          {/* Logo principal */}
          <div className="relative w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              POA
            </div>
          </div>

          {/* Badge "Agile" flottant */}
          <div className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce-slow">
            Agile
          </div>
        </div>

        {/* Titre principal */}
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg animate-fade-in">
            ProductOwnerApp
          </h1>
          <p className="text-white/90 text-lg font-medium drop-shadow animate-fade-in-delayed">
            Votre compagnon Agile
          </p>
        </div>

        {/* Powered by CoolabFlow */}
        <div className="mb-8 animate-fade-in-delayed-2">
          <a 
            href="https://coolabflow.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/80 text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
          >
            <span className="inline-block w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"></span>
            coolabflow.fr
            <span className="inline-block w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"></span>
          </a>
        </div>

        {/* Message de chargement */}
        <div className="mb-6 text-center min-h-[3rem]">
          <p className="text-white/90 font-medium text-base">
            {message}{dots}
          </p>
        </div>

        {/* Barre de progression */}
        <div className="w-full max-w-xs mb-8">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              {/* Effet de brillance */}
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Message de remerciement */}
        {showMessage && (
          <div className="text-center animate-slide-up">
            <p className="text-white/95 text-sm md:text-base font-medium leading-relaxed px-4">
              Merci de faire partie de l&apos;aventure ProductOwnerApp ! 💙
            </p>
          </div>
        )}

        {/* Version (optionnel) */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/50 text-xs">
            v1.0.0 • 100% offline
          </p>
        </div>
      </div>

      {/* Styles d'animation personnalisés */}
      <style jsx>{`
        @keyframes gradient-slow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(-10px); }
          30% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-delayed-2 {
          0% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-gradient-slow {
          animation: gradient-slow 6s ease infinite;
          background-size: 200% 200%;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 1.2s ease-out forwards;
        }

        .animate-fade-in-delayed-2 {
          animation: fade-in-delayed-2 1.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

SplashScreen.propTypes = {
  /** Message à afficher pendant le chargement */
  message: PropTypes.string,
  /** Progression du chargement (0-100) */
  progress: PropTypes.number
};

export default SplashScreen;
