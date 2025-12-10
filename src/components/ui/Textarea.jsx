import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Textarea générique avec label, compteur de caractères et validation
 * 
 * @component
 * @example
 * // Textarea simple
 * <Textarea
 *   label="Description"
 *   value={description}
 *   onChange={(e) => setDescription(e.target.value)}
 *   placeholder="Décrivez votre produit..."
 * />
 * 
 * // Textarea avec limite de caractères
 * <Textarea
 *   label="Notes"
 *   value={notes}
 *   onChange={(e) => setNotes(e.target.value)}
 *   maxLength={500}
 *   rows={6}
 *   showCharCount
 * />
 * 
 * @param {Object} props
 * @param {string} [props.label] - Label du champ
 * @param {string} [props.id] - ID du champ (auto-généré si non fourni)
 * @param {string} props.value - Valeur du champ
 * @param {Function} props.onChange - Fonction appelée lors du changement
 * @param {string} [props.placeholder] - Texte placeholder
 * @param {boolean} [props.required=false] - Champ obligatoire
 * @param {string} [props.error] - Message d'erreur
 * @param {string} [props.helpText] - Texte d'aide
 * @param {boolean} [props.disabled=false] - Champ désactivé
 * @param {number} [props.rows=4] - Nombre de lignes
 * @param {number} [props.maxLength] - Limite de caractères
 * @param {boolean} [props.showCharCount=false] - Afficher le compteur
 * @param {boolean} [props.autoResize=false] - Ajustement automatique de la hauteur
 * @param {string} [props.className=''] - Classes CSS additionnelles
 */
export const Textarea = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  disabled = false,
  rows = 4,
  maxLength,
  showCharCount = false,
  autoResize = false,
  className = '',
  ...props
}) => {
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : null;
  const charCount = value?.length || 0;
  const isNearLimit = maxLength && charCount > maxLength * 0.9;

  const handleChange = (e) => {
    if (autoResize) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
    onChange(e);
  };

  return (
    <div className="mb-3">
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label 
            htmlFor={textareaId}
            className="block text-sm font-normal text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {showCharCount && maxLength && (
            <span className={`text-xs ${isNearLimit ? 'text-yellow-600 font-medium' : 'text-gray-500'}`}>
              {charCount} / {maxLength}
            </span>
          )}
        </div>
      )}
      
      <textarea
        id={textareaId}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full rounded-lg px-3 py-2 text-sm bg-white
          ${hasError ? 'border border-red-500 focus:ring-red-500' : 'border border-gray-300 focus:ring-emerald-500'}
          focus:ring-1 focus:border-transparent focus:bg-white
          disabled:bg-gray-100 disabled:cursor-not-allowed
          resize-${autoResize ? 'none' : 'vertical'}
          transition-all duration-200
          ${className}
        `.trim()}
        {...props}
      />
      
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

Textarea.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  showCharCount: PropTypes.bool,
  autoResize: PropTypes.bool,
  className: PropTypes.string
};

export default Textarea;
