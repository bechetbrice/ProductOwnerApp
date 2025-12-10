import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant EmptyState pour afficher un état vide avec icône et action
 * Design inspiré du module Contacts (fond blanc, icône grise, bouton gradient)
 * 
 * @component
 * @example
 * // État vide simple avec action
 * <EmptyState
 *   icon={Users}
 *   message="Aucune équipe pour le moment"
 *   onAction={handleCreate}
 *   actionLabel="Créer votre première équipe"
 * />
 * 
 * // État vide avec description (compatible ancien format)
 * <EmptyState
 *   icon={Package}
 *   title="Aucun produit"
 *   description="Commencez par créer votre premier produit"
 * />
 * 
 * // État vide avec message personnalisé (format Teams)
 * <EmptyState
 *   icon={Users}
 *   message="Aucune équipe ne correspond à vos critères"
 *   onAction={resetFilters}
 *   actionLabel="Réinitialiser les filtres"
 * />
 * 
 * @param {Object} props
 * @param {Component} [props.icon] - Icône à afficher (composant Lucide React)
 * @param {string} [props.message] - Message principal (format Teams - prioritaire)
 * @param {string} [props.title] - Titre (format ancien - fallback si pas de message)
 * @param {string|node} [props.description] - Description optionnelle (string ou élément React)
 * @param {string} [props.actionLabel] - Label du bouton d'action
 * @param {Function} [props.onAction] - Fonction appelée au clic sur l'action
 * @param {string} [props.className=''] - Classes CSS additionnelles
 */
export const EmptyState = ({
  icon: Icon,
  message,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  // Gestion de la compatibilité : message (nouveau) ou title (ancien)
  const mainText = message || title;

  return (
    <div className={`bg-white rounded-lg shadow p-6 sm:p-8 lg:p-12 text-center ${className}`}>
      {Icon && (
        <Icon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
      )}
      
      <div className="text-gray-500 text-sm sm:text-base lg:text-lg mb-2">
        {mainText}
      </div>
      
      {description && (
        <div className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
          {description}
        </div>
      )}
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all flex items-center gap-2 mx-auto text-sm sm:text-base"
          aria-label={actionLabel}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  message: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.node, // Accepte string ou élément React
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

export default EmptyState;
