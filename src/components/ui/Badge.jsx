import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Badge générique pour afficher des statuts, tags ou labels
 * 
 * @component
 * @example
 * // Badge simple
 * <Badge>Nouveau</Badge>
 * 
 * // Badge avec couleur
 * <Badge variant="success">Actif</Badge>
 * <Badge variant="danger">Urgent</Badge>
 * 
 * // Badge avec icône
 * <Badge variant="warning" icon={AlertTriangle}>
 *   En attente
 * </Badge>
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du badge
 * @param {string} [props.variant='default'] - Style du badge (default, primary, success, warning, danger, info)
 * @param {string} [props.size='md'] - Taille du badge (sm, md, lg)
 * @param {boolean} [props.rounded=false] - Badge arrondi (pilule)
 * @param {Function} [props.onRemove] - Fonction pour rendre le badge supprimable
 * @param {Component} [props.icon] - Icône à afficher
 * @param {string} [props.className=''] - Classes CSS additionnelles
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  onRemove,
  icon: Icon,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-emerald-100 text-emerald-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-700',
    teal: 'bg-teal-100 text-teal-700',
    pink: 'bg-pink-100 text-pink-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-0.5 text-sm gap-1.5',
    lg: 'px-3 py-1 text-base gap-2',
  };

  const roundedClass = rounded ? 'rounded-full' : 'rounded';

  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${roundedClass}
        ${className}
      `.trim()}
      {...props}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 inline-flex items-center justify-center hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
          aria-label="Supprimer"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'teal',
    'pink',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.bool,
  onRemove: PropTypes.func,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

export default Badge;
