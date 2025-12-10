import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Modal générique avec overlay et animations
 * 
 * @component
 * @example
 * // Modal simple
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Créer un produit"
 * >
 *   <p>Contenu du modal</p>
 * </Modal>
 * 
 * // Modal avec footer custom
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Confirmation"
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={handleClose}>Annuler</Button>
 *       <Button variant="danger" onClick={handleDelete}>Supprimer</Button>
 *     </>
 *   }
 * >
 *   Êtes-vous sûr de vouloir supprimer cet élément ?
 * </Modal>
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - État d'ouverture du modal
 * @param {Function} props.onClose - Fonction appelée à la fermeture
 * @param {string} [props.title] - Titre du modal
 * @param {React.ReactNode} props.children - Contenu du modal
 * @param {React.ReactNode} [props.footer] - Footer personnalisé
 * @param {string} [props.size='md'] - Taille du modal (sm, md, lg, xl, full)
 * @param {boolean} [props.closeOnOverlayClick=true] - Fermer en cliquant sur l'overlay
 * @param {boolean} [props.closeOnEscape=true] - Fermer avec la touche Escape
 * @param {boolean} [props.showCloseButton=true] - Afficher le bouton de fermeture
 * @param {string} [props.className=''] - Classes CSS additionnelles pour le contenu
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
}) => {
  // Gestion de la touche Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ RESPONSIVE : Tailles adaptatives avec breakpoints
  const sizes = {
    sm: 'w-full max-w-xs sm:max-w-sm md:max-w-md',
    md: 'w-full max-w-sm sm:max-w-md md:max-w-lg',
    lg: 'w-full max-w-md sm:max-w-lg md:max-w-2xl',
    xl: 'w-full max-w-lg sm:max-w-2xl md:max-w-4xl',
    full: 'w-full max-w-full',
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        className={`
          bg-white rounded-lg shadow-xl ${sizes[size]}
          max-h-[90vh] flex flex-col
          animate-slideUp
          ${className}
        `.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Fermer"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string
};

export default Modal;
