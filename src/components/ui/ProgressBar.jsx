import PropTypes from 'prop-types';

/**
 * ProgressBar - Barre de progression réutilisable
 * 
 * @param {number} value - Valeur actuelle
 * @param {number} max - Valeur maximale
 * @param {string} color - Couleur de la barre: 'indigo' | 'green' | 'blue' | 'red' | 'orange' | 'purple' (défaut: 'indigo')
 * @param {boolean} showPercentage - Afficher le pourcentage (défaut: true)
 * @param {string} label - Label optionnel à gauche
 * @param {string} size - Taille: 'sm' | 'md' | 'lg' (défaut: 'md')
 * @param {string} className - Classes CSS additionnelles
 */
const ProgressBar = ({ 
  value, 
  max, 
  color = 'emerald', 
  showPercentage = true, 
  label,
  size = 'md',
  className = ''
}) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
  
  // Configuration des couleurs
  const colorClasses = {
    emerald: 'bg-emerald-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-500'
  };

  // Configuration des tailles
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between text-xs text-gray-600">
        {label && <span className="truncate">{label}</span>}
        <span className="flex-shrink-0 ml-2">
          {value} / {max}
          {showPercentage && <span className="hidden sm:inline"> • {percentage}%</span>}
        </span>
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div 
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['emerald', 'teal', 'cyan', 'green', 'red', 'orange', 'gray']),
  showPercentage: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default ProgressBar;
