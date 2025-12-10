import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Select générique avec label et validation
 * 
 * @component
 * @example
 * // Select simple
 * <Select
 *   label="Statut"
 *   value={status}
 *   onChange={(e) => setStatus(e.target.value)}
 *   options={[
 *     { value: 'active', label: 'Actif' },
 *     { value: 'paused', label: 'En pause' },
 *     { value: 'archived', label: 'Archivé' }
 *   ]}
 * />
 * 
 * // Select avec groupes
 * <Select
 *   label="Catégorie"
 *   value={category}
 *   onChange={(e) => setCategory(e.target.value)}
 *   options={[
 *     { label: 'Frontend', options: [
 *       { value: 'react', label: 'React' },
 *       { value: 'vue', label: 'Vue' }
 *     ]},
 *     { label: 'Backend', options: [
 *       { value: 'node', label: 'Node.js' },
 *       { value: 'python', label: 'Python' }
 *     ]}
 *   ]}
 * />
 * 
 * @param {Object} props
 * @param {string} [props.label] - Label du champ
 * @param {string} [props.id] - ID du champ (auto-généré si non fourni)
 * @param {string} props.value - Valeur sélectionnée
 * @param {Function} props.onChange - Fonction appelée lors du changement
 * @param {Array} props.options - Options du select
 * @param {string} [props.placeholder] - Texte placeholder (première option)
 * @param {boolean} [props.required=false] - Champ obligatoire
 * @param {string} [props.error] - Message d'erreur
 * @param {string} [props.helpText] - Texte d'aide
 * @param {boolean} [props.disabled=false] - Champ désactivé
 * @param {string} [props.className=''] - Classes CSS additionnelles
 */
export const Select = ({
  label,
  id,
  value,
  onChange,
  options = [],
  placeholder = 'Sélectionner...',
  required = false,
  error,
  helpText,
  disabled = false,
  className = '',
  icon: Icon,
  children,
  ...props
}) => {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : null;

  // Détermine si options contient des groupes
  const hasGroups = options.some(opt => opt.options);

  const renderOption = (option, index) => {
    return (
      <option 
        key={option.value || index} 
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </option>
    );
  };

  const renderOptions = () => {
    if (hasGroups) {
      return options.map((group, groupIndex) => (
        <optgroup key={group.label || groupIndex} label={group.label}>
          {group.options.map((option, optIndex) => renderOption(option, `${groupIndex}-${optIndex}`))}
        </optgroup>
      ));
    }
    
    return options.map((option, index) => renderOption(option, index));
  };

  return (
    <div className="mb-3">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-normal text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`
            w-full rounded-lg px-3 py-2 text-sm bg-white
            ${Icon ? 'pl-10' : ''}
            ${hasError ? 'border border-red-500 focus:ring-red-500' : 'border border-gray-300 focus:ring-emerald-500'}
            focus:ring-1 focus:border-transparent focus:bg-white
            disabled:bg-gray-100 disabled:cursor-not-allowed
            appearance-none
            transition-all duration-200
            ${className}
          `.trim()}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children || renderOptions()}
        </select>
        
        {/* Flèche custom */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {helpText && !errorMessage && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      // Option simple
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool
      }),
      // Groupe d'options
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          disabled: PropTypes.bool
        })).isRequired
      })
    ])
  ),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.elementType,
  children: PropTypes.node
};

export default Select;
