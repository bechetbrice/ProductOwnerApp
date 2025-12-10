import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import InfoTooltip from './InfoTooltip';

/**
 * MetricCard - Carte de métrique pour afficher KPIs et statistiques
 * 
 * @param {React.Component} icon - Composant icône Lucide React
 * @param {string} title - Titre de la métrique
 * @param {string|number} value - Valeur principale
 * @param {string} subtitle - Texte secondaire (optionnel)
 * @param {string} color - Couleur de l'accent (bordure gauche et icône)
 * @param {string|number} badge - Badge affiché en haut à droite (optionnel)
 * @param {function} onClick - Callback au clic (rend la carte cliquable)
 * @param {object} trend - Objet { positive: boolean, text: string } pour afficher une tendance (optionnel)
 * @param {string} tooltipText - Texte d'aide affiché dans un InfoTooltip (optionnel)
 * @param {string} tooltipPosition - Position du tooltip ('top' | 'bottom' | 'left' | 'right'), défaut 'bottom'
 * @param {string} className - Classes CSS additionnelles
 */
const MetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  color = '#10b981', 
  badge, 
  onClick, 
  trend,
  tooltipText,
  tooltipPosition = 'bottom',
  className = ''
}) => {
  return (
    <div 
      className={`w-full min-w-0 bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 relative transition-all ${
        onClick ? 'cursor-pointer hover:shadow-lg' : ''
      } ${className}`}
      style={{ borderLeftColor: color }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="flex items-start justify-between gap-1.5 sm:gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wide truncate">
              {title}
            </p>
            {tooltipText && (
              <InfoTooltip 
                text={tooltipText} 
                size={10}
                iconClassName="flex-shrink-0"
                position={tooltipPosition}
              />
            )}
          </div>
          <p className="text-lg sm:text-xl font-bold text-gray-800 mt-0.5 sm:mt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-gray-500 text-xs mt-0.5 truncate">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-0.5 text-xs ${
              trend.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              <span className="truncate">{trend.text}</span>
            </div>
          )}
        </div>
        <div className="bg-gray-50 p-1 sm:p-1.5 rounded-lg flex-shrink-0">
          <Icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color }} />
        </div>
      </div>
      {badge && (
        <div className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5">
          <span className="px-1 sm:px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
};

MetricCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  badge: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
  trend: PropTypes.shape({
    positive: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }),
  tooltipText: PropTypes.string,
  tooltipPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
};

export default MetricCard;
