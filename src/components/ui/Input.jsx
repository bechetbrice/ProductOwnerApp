import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Input générique avec label, validation et messages d'erreur
 * 
 * @component
 * @example
 * // Input simple
 * <Input
 *   label="Nom du produit"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   placeholder="Ex: Application Mobile"
 * />
 * 
 * // Input requis avec erreur
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   required
 *   error="Email invalide"
 * />
 * 
 * @param {Object} props
 * @param {string} [props.label] - Label du champ
 * @param {string} [props.id] - ID du champ (auto-généré si non fourni)
 * @param {string} [props.type='text'] - Type d'input HTML
 * @param {string} props.value - Valeur du champ
 * @param {Function} props.onChange - Fonction appelée lors du changement
 * @param {string} [props.placeholder] - Texte placeholder
 * @param {boolean} [props.required=false] - Champ obligatoire
 * @param {string} [props.error] - Message d'erreur
 * @param {string} [props.helpText] - Texte d'aide
 * @param {boolean} [props.disabled=false] - Champ désactivé
 * @param {string} [props.className=''] - Classes CSS additionnelles
 */
export const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  disabled = false,
  className = '',
  autoComplete,
  maxLength,
  min,
  max,
  step,
  pattern,
  icon: Icon,
  ...props
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : null;

  return (
    <div className="mb-3">
      {label && (
        <label 
          htmlFor={inputId}
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
        
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          className={`
            w-full rounded-lg px-3 py-2 text-sm bg-white
            ${Icon ? 'pl-10' : ''}
            ${hasError ? 'border border-red-500 focus:ring-red-500' : 'border border-gray-300 focus:ring-emerald-500'}
            focus:ring-1 focus:border-transparent focus:bg-white
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
            [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgb(255,255,255)]
            ${className}
          `.trim()}
          {...props}
        />
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

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf([
    'text', 'email', 'password', 'number', 
    'date', 'time', 'tel', 'url', 'search'
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.number,
  pattern: PropTypes.string,
  icon: PropTypes.elementType
};

export default Input;
