import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * CardHeader - En-tête standardisé pour les cards
 * 
 * Affiche UNIQUEMENT le titre/nom de l'entité de manière cohérente
 * Aucun autre élément (pas d'icône, pas de badge, pas de sous-titre)
 * 
 * HARMONISATION : text-sm font-medium text-gray-800 line-clamp-2
 * 
 * @param {Object} props
 * @param {string} props.title - Titre/nom à afficher
 * @param {boolean} [props.noClamp=false] - Désactive la troncature du titre (affichage complet)
 */
const CardHeader = ({ title, noClamp = false }) => {
  return (
    <div className="p-5 border-b border-gray-100">
      <h3 className={`text-sm font-medium text-gray-800 ${noClamp ? '' : 'line-clamp-2'}`}>
        {title}
      </h3>
    </div>
  );
};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  noClamp: PropTypes.bool,
};

export default memo(CardHeader);
