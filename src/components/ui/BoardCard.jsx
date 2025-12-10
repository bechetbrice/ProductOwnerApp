import React from 'react';
import PropTypes from 'prop-types';

/**
 * BoardCard - Composant de card standardisé pour les tableaux Kanban
 * 
 * Structure unifiée :
 * - Contenu principal (titre/description)
 * - Trait horizontal séparateur
 * - Footer avec badges à gauche et actions à droite
 * 
 * @param {Object} props
 * @param {string} props.title - Titre ou contenu principal
 * @param {React.ReactNode} props.children - Contenu personnalisé (alternative au title)
 * @param {Array} props.badges - Liste des badges à afficher à gauche du footer
 * @param {Array} props.actions - Liste des boutons d'action à droite du footer
 * @param {function} props.onClick - Handler pour le click sur la card
 * @param {string} props.className - Classes CSS additionnelles
 * @param {boolean} props.isSelected - État sélectionné (bordure accentuée)
 */
const BoardCard = ({ 
  title,
  children,
  badges = [],
  actions = [],
  onClick,
  className = '',
  isSelected = false
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col ${
        onClick ? 'cursor-pointer' : ''
      } ${
        isSelected ? 'border-2 border-emerald-600 ring-2 ring-emerald-600' : 'border-2 border-transparent'
      } ${className}`}
    >
      {/* Contenu principal */}
      <div className="p-3 sm:p-4">
        {children ? (
          children
        ) : (
          <h3 className="text-sm font-medium text-gray-800 whitespace-normal break-words">
            {title || 'Titre non défini'}
          </h3>
        )}
      </div>

      {/* Trait horizontal séparateur */}
      <div className="border-t border-gray-200"></div>

      {/* Footer avec badges et actions */}
      <div className="p-4 flex justify-between items-center gap-2">
        {/* Badges à gauche */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
          {badges.map((badge, index) => (
            <React.Fragment key={index}>
              {badge}
            </React.Fragment>
          ))}
        </div>

        {/* Actions à droite */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions.map((action, index) => (
            <React.Fragment key={index}>
              {action}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

BoardCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  badges: PropTypes.arrayOf(PropTypes.node),
  actions: PropTypes.arrayOf(PropTypes.node),
  onClick: PropTypes.func,
  className: PropTypes.string,
  isSelected: PropTypes.bool,
};

export default BoardCard;
