import PropTypes from 'prop-types';

/**
 * LoadingScreen - Écran de chargement pour lazy loading
 * 
 * Affiche un indicateur de chargement élégant pendant que
 * les contexts ou composants sont chargés de manière asynchrone.
 * 
 * Utilisé avec React.lazy() et Suspense pour améliorer les performances
 * en réduisant le bundle initial.
 * 
 * @component
 * @example
 * <Suspense fallback={<LoadingScreen message="Chargement des données..." />}>
 *   <LazyComponent />
 * </Suspense>
 */
const LoadingScreen = ({ message = 'Chargement...', size = 'default' }) => {
  // Tailles du spinner
  const sizes = {
    small: 'h-6 w-6',
    default: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const spinnerSize = sizes[size] || sizes.default;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner animé */}
        <div className={`${spinnerSize} relative`}>
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
        </div>

        {/* Message de chargement */}
        {message && (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">{message}</p>
            <p className="text-sm text-gray-500 mt-1">Veuillez patienter...</p>
          </div>
        )}

        {/* Indicateur de progression (optionnel) */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  /** Message à afficher pendant le chargement */
  message: PropTypes.string,
  /** Taille du spinner (small, default, large) */
  size: PropTypes.oneOf(['small', 'default', 'large'])
};

export default LoadingScreen;
