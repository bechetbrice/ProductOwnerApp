import PropTypes from 'prop-types';

/**
 * FormModal - Wrapper modal standardisé pour les formulaires
 * Gère l'overlay, le positionnement, le responsive
 */
const FormModal = ({ 
  isOpen, 
  onClose, 
  children,
  size = 'lg', // sm, md, lg, xl, full
  noScroll = false // Si true, retire le scroll automatique
}) => {
  if (!isOpen) return null;

  // ✅ RESPONSIVE : Tailles adaptatives avec breakpoints
  const sizeClasses = {
    sm: 'w-full max-w-xs sm:max-w-sm md:max-w-md',
    md: 'w-full max-w-sm sm:max-w-lg md:max-w-2xl',
    lg: 'w-full max-w-md sm:max-w-2xl md:max-w-3xl',
    xl: 'w-full max-w-lg sm:max-w-3xl md:max-w-5xl',
    full: 'w-full max-w-full'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} max-h-[90vh] flex flex-col ${
        noScroll ? '' : 'overflow-y-auto'
      }`}>
        {children}
      </div>
    </div>
  );
};

FormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  noScroll: PropTypes.bool
};

export default FormModal;
