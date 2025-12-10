import { HelpCircle } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * FormHeader - En-tête standardisé pour les formulaires
 * Gère le titre, l'icône, le bouton fermer et l'aide contextuelle
 */
const FormHeader = ({ 
  title, 
  subtitle,
  icon: Icon,
  onClose,
  helpContent,
  showHelp,
  onToggleHelp,
  badge,
  extraAction
}) => {
  return (
    <div className="sticky top-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-4 md:px-6 py-3 md:py-4 z-10 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
            {Icon && <Icon className="text-white flex-shrink-0" size={20} />}
            <h2 className="text-lg md:text-xl font-bold text-white">
              {title}
            </h2>
            {helpContent && (
              <button
                type="button"
                onClick={onToggleHelp}
                className="p-1.5 text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Aide pour remplir le formulaire"
              >
                <HelpCircle size={18} />
              </button>
            )}
            {badge && (
              <span 
                className="px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap"
                style={{ backgroundColor: badge.color }}
              >
                {badge.text}
              </span>
            )}
            {extraAction && (
              <div className="ml-auto md:ml-2">
                {extraAction}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-white/90">{subtitle}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 md:ml-4 text-white/80 hover:text-white transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Panel d'aide */}
      {showHelp && helpContent && (
        <div className="mt-3 md:mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 md:p-4 text-xs max-h-60 md:max-h-80 overflow-y-auto">
          <h3 className="font-bold text-emerald-900 mb-2 md:mb-3 flex items-center gap-2">
            <HelpCircle size={14} />
            Guide de remplissage
          </h3>
          <div className="space-y-2 text-emerald-900">
            {helpContent}
          </div>
        </div>
      )}
    </div>
  );
};

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  onClose: PropTypes.func,
  helpContent: PropTypes.node,
  showHelp: PropTypes.bool,
  onToggleHelp: PropTypes.func,
  badge: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  extraAction: PropTypes.node
};

export default FormHeader;
