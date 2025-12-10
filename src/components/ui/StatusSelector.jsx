import { CheckCircle2 } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * StatusSelector - Sélecteur de statuts avec boutons visuels
 * Affiche les options de statut avec description et icône
 * 
 * @param {boolean} compact - Mode compact (sans description, plus petit)
 */
const StatusSelector = ({ 
  label,
  value,
  onChange,
  options,
  columns = 3,
  required = false,
  compact = false,
  className = ''
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };

  return (
    <div className={className}>
      {label && (
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      )}
      
      <div className={`grid ${gridClasses[columns]} gap-2`}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex items-center justify-center gap-2 rounded-lg transition-all bg-white ${
              compact 
                ? 'p-2 text-xs' 
                : 'p-3 text-xs'
            } ${
              value === option.value
                ? 'border-2 border-green-500 font-semibold'
                : 'border border-gray-300 hover:border-gray-400'
            }`}
          >
            {compact ? (
              // Mode compact : emoji + label côte à côte, centré
              <>
                <span className="text-sm">{option.emoji || option.icon}</span>
                <span className="font-bold text-gray-900">{option.label.replace(/^[^a-zA-ZÀ-ſ]+/g, '')}</span>
                {value === option.value && (
                  <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
                )}
              </>
            ) : (
              // Mode normal : layout actuel
              <>
                <div className="text-left flex-1">
                  <div className="font-bold text-gray-900">{option.label}</div>
                  <div className="text-[10px] text-gray-600">{option.description}</div>
                </div>
                {value === option.value && (
                  <CheckCircle2 size={14} className="text-green-500" />
                )}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

StatusSelector.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    emoji: PropTypes.string,
    icon: PropTypes.string
  })).isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  required: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string
};

export default StatusSelector;
