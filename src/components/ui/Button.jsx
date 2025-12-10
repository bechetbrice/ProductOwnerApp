import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Button générique avec variants et tailles
 * 
 * ✅ RESPONSIVE : Touch targets optimisés pour mobile
 * - Padding vertical augmenté sur mobile pour atteindre 44px minimum
 * - Tailles d'icônes adaptatives
 * 
 * @component
 * @example
 * // Bouton primaire
 * <Button onClick={handleClick}>Sauvegarder</Button>
 * 
 * // Bouton danger avec taille large
 * <Button variant="danger" size="lg" onClick={handleDelete}>
 *   Supprimer
 * </Button>
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {string} [props.variant='primary'] - Style du bouton (primary, gradient, secondary, success, danger, outline, ghost)
 * @param {string} [props.size='md'] - Taille du bouton (sm, md, lg)
 * @param {boolean} [props.fullWidth=false] - Bouton pleine largeur
 * @param {boolean} [props.disabled=false] - Bouton désactivé
 * @param {Function} [props.onClick] - Fonction appelée au clic
 * @param {string} [props.type='button'] - Type HTML du bouton
 * @param {string} [props.className=''] - Classes CSS additionnelles
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md',
    gradient: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-sm hover:shadow-md',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-sm hover:shadow-md',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500 bg-white',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };
  
  // ✅ RESPONSIVE : Touch targets optimisés (44px minimum mobile)
  const sizes = {
    sm: 'px-3 sm:px-3 py-2.5 sm:py-1.5 text-xs sm:text-sm gap-1.5',
    md: 'px-4 sm:px-4 py-3 sm:py-2 text-sm sm:text-base gap-2',
    lg: 'px-5 sm:px-6 py-3 sm:py-3 text-base sm:text-lg gap-2.5',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `.trim()}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
      )}
      
      {children}
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary', 'gradient', 'secondary', 'success', 
    'danger', 'warning', 'outline', 'ghost'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string
};

export default Button;
