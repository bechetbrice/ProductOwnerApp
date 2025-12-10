import React from 'react';
import { BookOpen } from 'lucide-react';

/**
 * LoadingWikiPage - Écran de chargement pour les pages Wiki
 * Affiché pendant le lazy loading d'une page de documentation
 * 
 * @component
 * @version 1.0.0 - QW4 Optimisation performances
 */
const LoadingWikiPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        {/* Icône animée */}
        <div className="relative inline-block">
          <div className="absolute inset-0 animate-ping">
            <div className="w-20 h-20 bg-teal-400 rounded-full opacity-20"></div>
          </div>
          <div className="relative bg-teal-600 p-5 rounded-full">
            <BookOpen className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>

        {/* Texte de chargement */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Chargement de la documentation...
          </h3>
          <p className="text-sm text-gray-600">
            La page sera prête dans un instant
          </p>
        </div>

        {/* Barre de progression indéterminée */}
        <div className="w-64 mx-auto">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
            width: 30%;
          }
          50% {
            width: 50%;
          }
          100% {
            transform: translateX(400%);
            width: 30%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingWikiPage;
