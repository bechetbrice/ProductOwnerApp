import PropTypes from 'prop-types';
import {
  getModuleIcon,
  getActionIcon,
  getStatusIcon,
  getSectionIcon,
  convertLucideToEmoji
} from './index';

/**
 * 🎨 Composant Icon
 * 
 * Composant wrapper pour afficher des icônes emoji de manière cohérente
 * Supporte plusieurs types d'icônes : modules, actions, statuts, sections
 * 
 * @example
 * // Icône de module
 * <Icon type="module" name="dashboard" />
 * 
 * @example
 * // Icône d'action avec taille personnalisée
 * <Icon type="action" name="add" size="lg" />
 * 
 * @example
 * // Icône de statut avec titre
 * <Icon type="status" name="active" title="Actif" />
 * 
 * @example
 * // Migration depuis Lucide
 * <Icon lucide="Home" />
 */
const Icon = ({
  type = 'module',
  name = '',
  lucide = null,
  emoji = null,
  size = 'md',
  className = '',
  title = '',
  onClick = null,
  ariaLabel = null
}) => {
  // ==============================================
  // DÉTERMINER L'EMOJI À AFFICHER
  // ==============================================
  
  let displayEmoji = '📦'; // Fallback par défaut
  
  if (emoji) {
    // Emoji fourni directement
    displayEmoji = emoji;
  } else if (lucide) {
    // Conversion depuis Lucide
    displayEmoji = convertLucideToEmoji(lucide);
  } else if (name) {
    // Récupération selon le type
    switch (type) {
      case 'module':
        displayEmoji = getModuleIcon(name);
        break;
      case 'action':
        displayEmoji = getActionIcon(name);
        break;
      case 'status':
        displayEmoji = getStatusIcon(name);
        break;
      case 'section':
        displayEmoji = getSectionIcon(name);
        break;
      default:
        displayEmoji = getModuleIcon(name);
    }
  }
  
  // ==============================================
  // TAILLES
  // ==============================================
  
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl',
    '3xl': 'text-4xl',
    '4xl': 'text-5xl'
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  // ==============================================
  // CLASSES CSS
  // ==============================================
  
  const baseClasses = 'inline-block';
  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-110 transition-transform' : '';
  const combinedClasses = `${baseClasses} ${sizeClass} ${interactiveClasses} ${className}`.trim();
  
  // ==============================================
  // ACCESSIBILITÉ
  // ==============================================
  
  const accessibilityProps = {
    role: onClick ? 'button' : 'img',
    'aria-label': ariaLabel || title || displayEmoji,
    ...(title && { title }),
    ...(onClick && { tabIndex: 0 })
  };
  
  // ==============================================
  // GESTION DU CLIC
  // ==============================================
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  
  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };
  
  // ==============================================
  // RENDU
  // ==============================================
  
  return (
    <span
      className={combinedClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...accessibilityProps}
    >
      {displayEmoji}
    </span>
  );
};

// ==============================================
// PROP TYPES
// ==============================================

Icon.propTypes = {
  /** Type d'icône : 'module', 'action', 'status', 'section' */
  type: PropTypes.oneOf(['module', 'action', 'status', 'section']),
  
  /** Nom de l'icône à récupérer depuis le mapping */
  name: PropTypes.string,
  
  /** Nom de l'icône Lucide à convertir (pour migration) */
  lucide: PropTypes.string,
  
  /** Emoji à afficher directement (override tout le reste) */
  emoji: PropTypes.string,
  
  /** Taille de l'icône */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
  
  /** Classes CSS supplémentaires */
  className: PropTypes.string,
  
  /** Titre au survol */
  title: PropTypes.string,
  
  /** Fonction de clic (rend l'icône interactive) */
  onClick: PropTypes.func,
  
  /** Label ARIA pour l'accessibilité */
  ariaLabel: PropTypes.string
};

export default Icon;
