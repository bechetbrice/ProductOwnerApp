import PropTypes from 'prop-types';

/**
 * SectionGroup - Conteneur de section avec titre et séparateur
 * Utilisé dans les modales de détail pour structurer l'information
 * 
 * @param {Object} props
 * @param {string} props.title - Titre de la section
 * @param {string} props.emoji - Emoji à afficher avant le titre (optionnel)
 * @param {React.ReactNode} props.icon - Icône React à afficher avant le titre (optionnel, prioritaire sur emoji)
 * @param {string} props.iconColor - Couleur de l'icône (ex: 'text-blue-600')
 * @param {React.ReactNode} props.children - Contenu de la section
 * @param {string} props.variant - Style: 'bordered' (avec bordure top) | 'plain' (sans bordure)
 * @param {string} props.className - Classes CSS additionnelles
 */
const SectionGroup = ({
  title,
  emoji,
  icon: Icon,
  iconColor = 'text-gray-600',
  children,
  variant = 'bordered',
  className = ''
}) => {
  const borderClass = variant === 'bordered' ? 'border-t border-gray-200 pt-4' : '';
  
  return (
    <div className={`${borderClass} ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
        {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
        {!Icon && emoji && <span>{emoji}</span>}
        <span>{title}</span>
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

SectionGroup.propTypes = {
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['bordered', 'plain']),
  className: PropTypes.string
};

export default SectionGroup;
