import PropTypes from 'prop-types';

/**
 * InfoField - Champ d'affichage en lecture seule
 * Utilisé dans les modales de détail pour afficher des informations
 * 
 * @param {Object} props
 * @param {string} props.label - Label du champ (optionnel)
 * @param {string|React.ReactNode} props.value - Valeur à afficher
 * @param {React.Component} props.icon - Icône Lucide (optionnel)
 * @param {string} props.variant - Style: 'block' (sur fond gris) | 'inline' (sans fond) | 'badge' (badge coloré)
 * @param {string} props.asLink - Type de lien: 'mailto' | 'tel' | 'url' (optionnel)
 * @param {string} props.badgeColor - Classe de couleur pour variant='badge'
 * @param {string} props.emptyText - Texte si valeur vide (défaut: "Non renseigné")
 * @param {string} props.className - Classes CSS additionnelles
 */
const InfoField = ({
  label,
  value,
  icon: Icon,
  variant = 'block',
  asLink,
  badgeColor = 'bg-gray-100 text-gray-700',
  emptyText = 'Non renseigné',
  className = ''
}) => {
  // Gestion valeur vide
  if (!value || (typeof value === 'string' && !value.trim())) {
    return variant === 'block' ? (
      <div className={`bg-gray-50 p-3 rounded-lg ${className}`}>
        {label && (
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">
            {label}
          </label>
        )}
        <p className="text-sm text-gray-500 italic">{emptyText}</p>
      </div>
    ) : null;
  }

  // Rendu selon le variant
  if (variant === 'badge') {
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${badgeColor} ${className}`}>
        {Icon && <Icon size={14} />}
        {value}
      </span>
    );
  }

  if (variant === 'inline') {
    const content = (
      <>
        {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
        <span className="truncate">{value}</span>
      </>
    );

    if (asLink) {
      let href = value;
      if (asLink === 'mailto') href = `mailto:${value}`;
      if (asLink === 'tel') href = `tel:${value}`;

      return (
        <a 
          href={href}
          className={`flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors group ${className}`}
          aria-label={label || `Lien vers ${value}`}
        >
          {content}
        </a>
      );
    }

    return (
      <div className={`flex items-center gap-2 text-sm text-gray-700 ${className}`}>
        {content}
      </div>
    );
  }

  // variant === 'block' (défaut)
  const content = typeof value === 'string' ? (
    <p className="text-sm text-gray-900 whitespace-pre-wrap">{value}</p>
  ) : (
    value
  );

  if (asLink && typeof value === 'string') {
    let href = value;
    if (asLink === 'mailto') href = `mailto:${value}`;
    if (asLink === 'tel') href = `tel:${value}`;

    return (
      <div className={`bg-gray-50 p-3 rounded-lg ${className}`}>
        {label && (
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">
            {label}
          </label>
        )}
        <a 
          href={href}
          className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          {Icon && <Icon className="w-4 h-4" />}
          {value}
        </a>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 p-3 rounded-lg ${className}`}>
      {label && (
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">
          {label}
        </label>
      )}
      {content}
    </div>
  );
};

InfoField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  icon: PropTypes.elementType,
  variant: PropTypes.oneOf(['block', 'inline', 'badge']),
  asLink: PropTypes.oneOf(['mailto', 'tel', 'url']),
  badgeColor: PropTypes.string,
  emptyText: PropTypes.string,
  className: PropTypes.string,
};

export default InfoField;
