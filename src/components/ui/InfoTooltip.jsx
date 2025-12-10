import { useState } from 'react';
import PropTypes from 'prop-types';
import { Info } from 'lucide-react';

/**
 * InfoTooltip - Composant tooltip responsive centré sur mobile
 * Version: 2.2 - Centrage mobile simple
 * 
 * @param {string} text - Texte à afficher dans le tooltip
 * @param {number} size - Taille de l'icône (défaut: 18, 16 sur mobile)
 * @param {string} position - Position du tooltip sur desktop: 'left' | 'right' | 'top' | 'bottom' (défaut: 'bottom')
 * @param {string} iconClassName - Classes CSS additionnelles pour l'icône
 */
const InfoTooltip = ({ 
  text, 
  size = 18, 
  position = 'bottom',
  iconClassName = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Configuration des positions
  // Mobile : TOUJOURS centré horizontalement + en bas
  // Desktop : selon la prop position
  const positionClasses = {
    bottom: `
      fixed left-1/2 -translate-x-1/2 bottom-4
      sm:absolute sm:left-0 sm:translate-x-0 sm:top-full sm:bottom-auto sm:mt-2
    `,
    top: `
      fixed left-1/2 -translate-x-1/2 bottom-4
      sm:absolute sm:left-0 sm:translate-x-0 sm:bottom-full sm:top-auto sm:mb-2
    `,
    right: `
      fixed left-1/2 -translate-x-1/2 bottom-4
      sm:absolute sm:left-full sm:translate-x-0 sm:ml-2 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto
    `,
    left: `
      fixed left-1/2 -translate-x-1/2 bottom-4
      sm:absolute sm:right-full sm:translate-x-0 sm:mr-2 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto
    `
  };

  // Configuration des flèches
  const arrowClasses = {
    bottom: `
      hidden
      sm:block sm:-top-1.5 sm:left-4 
      sm:border-b-white sm:border-l-transparent sm:border-r-transparent sm:border-t-transparent sm:border-[6px]
    `,
    top: `
      hidden
      sm:block sm:-bottom-1.5 sm:left-4 
      sm:border-t-white sm:border-l-transparent sm:border-r-transparent sm:border-b-transparent sm:border-[6px]
    `,
    right: `
      hidden
      sm:block sm:-left-1.5 sm:top-1/2 sm:-translate-y-1/2 
      sm:border-r-white sm:border-t-transparent sm:border-b-transparent sm:border-l-transparent sm:border-[6px]
    `,
    left: `
      hidden
      sm:block sm:-right-1.5 sm:top-1/2 sm:-translate-y-1/2 
      sm:border-l-white sm:border-t-transparent sm:border-b-transparent sm:border-r-transparent sm:border-[6px]
    `
  };

  return (
    <div className="relative inline-block">
      {/* Bouton icône - Touch-friendly sur mobile */}
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(!isVisible);
        }}
        className={`
          p-1 -m-1
          text-gray-400 hover:text-emerald-600 
          transition-colors 
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 rounded
          ${iconClassName}
        `}
        type="button"
        aria-label="Plus d'informations"
        aria-expanded={isVisible}
      >
        <Info size={size} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </button>
      
      {/* Tooltip - Responsive */}
      {isVisible && (
        <>
          {/* Overlay mobile pour fermer au clic */}
          <div 
            className="fixed inset-0 z-40 bg-black/10 sm:hidden" 
            onClick={() => setIsVisible(false)}
          />
          
          {/* Contenu tooltip */}
          <div 
            className={`
              z-50 
              ${positionClasses[position]}
              w-[calc(100vw-2rem)]
              sm:w-80 
              sm:max-w-sm
              bg-white 
              border border-gray-200 
              rounded-lg 
              shadow-xl
              p-3 sm:p-4
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Texte */}
            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal pr-6 sm:pr-0">
              {text}
            </div>
            
            {/* Flèche (masquée sur mobile) */}
            <div className={arrowClasses[position]} />
            
            {/* Bouton fermer mobile */}
            <button
              onClick={() => setIsVisible(false)}
              className="
                sm:hidden
                absolute top-2 right-2
                w-6 h-6
                flex items-center justify-center
                text-gray-400 hover:text-gray-600
                rounded-full hover:bg-gray-100
                transition-colors
                text-lg
                leading-none
              "
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </>
      )}
    </div>
  );
};

InfoTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  iconClassName: PropTypes.string,
};

export default InfoTooltip;
