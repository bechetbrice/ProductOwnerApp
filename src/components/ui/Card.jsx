import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Card container générique pour encapsuler du contenu
 * 
 * @component
 * @example
 * // Card simple
 * <Card>
 *   <h3>Titre</h3>
 *   <p>Contenu de la carte</p>
 * </Card>
 * 
 * // Card avec header et footer
 * <Card
 *   header={<h2 className="text-xl font-bold">Titre</h2>}
 *   footer={<Button>Action</Button>}
 * >
 *   Contenu principal
 * </Card>
 * 
 * // Card cliquable
 * <Card hoverable onClick={handleClick}>
 *   Cliquez-moi
 * </Card>
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu de la carte
 * @param {React.ReactNode} [props.header] - En-tête de la carte
 * @param {React.ReactNode} [props.footer] - Pied de page de la carte
 * @param {boolean} [props.hoverable=false] - Effet hover
 * @param {Function} [props.onClick] - Fonction appelée au clic (rend la carte cliquable)
 * @param {string} [props.variant='default'] - Style de la carte (default, outlined, elevated)
 * @param {string} [props.padding='md'] - Padding interne (none, sm, md, lg)
 * @param {string} [props.className=''] - Classes CSS additionnelles
 */
export const Card = ({
  children,
  header,
  footer,
  hoverable = false,
  onClick,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const isClickable = !!onClick;

  const variants = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white shadow-md',
  };

  const paddings = {
    none: '',
    sm: 'p-2 sm:p-3',
    md: 'p-3 sm:p-4',
    lg: 'p-4 sm:p-6',
  };

  const hoverClass = (hoverable || isClickable) 
    ? 'transition-all duration-200 hover:shadow-lg hover:scale-[1.02]' 
    : '';

  const clickableClass = isClickable 
    ? 'cursor-pointer' 
    : '';

  const CardWrapper = isClickable ? 'button' : 'div';
  const wrapperProps = isClickable 
    ? { onClick, type: 'button' } 
    : {};

  return (
    <CardWrapper
      className={`
        rounded-lg overflow-hidden
        ${variants[variant]}
        ${hoverClass}
        ${clickableClass}
        ${className}
      `.trim()}
      {...wrapperProps}
      {...props}
    >
      {header && (
        <div className={`border-b border-gray-200 ${paddings[padding]}`}>
          {header}
        </div>
      )}
      
      <div className={paddings[padding]}>
        {children}
      </div>
      
      {footer && (
        <div className={`border-t border-gray-200 ${paddings[padding]} bg-gray-50`}>
          {footer}
        </div>
      )}
    </CardWrapper>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Card;
