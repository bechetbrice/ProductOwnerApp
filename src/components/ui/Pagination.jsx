import PropTypes from 'prop-types';

/**
 * Composant de pagination réutilisable
 * 
 * @param {Object} props - Propriétés du composant
 * @param {number} props.currentPage - Page actuelle (1-indexed)
 * @param {number} props.totalItems - Nombre total d'éléments
 * @param {number} [props.itemsPerPage=9] - Nombre d'éléments par page (défaut: 9)
 * @param {function} props.onPageChange - Callback appelé lors du changement de page
 * @param {string} [props.itemLabel='élément'] - Label pour les éléments (ex: 'page', 'élément', 'story')
 */
const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage = 9,
  onPageChange,
  itemLabel = 'élément'
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Ne rien afficher si tous les éléments tiennent sur une page
  if (totalItems <= itemsPerPage) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Information de pagination */}
        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left w-full sm:w-auto">
          Affichage de{' '}
          <strong className="text-gray-800 dark:text-gray-100">{startIndex + 1}</strong>
          {' '}à{' '}
          <strong className="text-gray-800 dark:text-gray-100">{endIndex}</strong>
          {' '}sur{' '}
          <strong className="text-gray-800 dark:text-gray-100">{totalItems}</strong>
          {' '}{itemLabel}{totalItems > 1 ? 's' : ''}
        </div>

        {/* Contrôles de pagination */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {/* Bouton Précédent */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
              currentPage === 1
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-500 dark:to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 dark:hover:from-emerald-600 dark:hover:to-cyan-600 shadow-lg hover:shadow-xl'
            }`}
          >
            <span className="hidden sm:inline">« Précédent</span>
            <span className="sm:hidden">«</span>
          </button>

          {/* Numéros de page */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Logique d'affichage des pages : toujours la première, dernière, et pages autour de la page actuelle
              const showPage = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1);
              
              const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
              const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span 
                    key={page} 
                    className="px-1 sm:px-2 text-gray-400 dark:text-gray-500 text-xs sm:text-sm"
                  >
                    …
                  </span>
                );
              }

              if (!showPage) return null;

              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all text-xs sm:text-sm flex-shrink-0 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-500 dark:to-cyan-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Bouton Suivant */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
              currentPage === totalPages
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-500 dark:to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 dark:hover:from-emerald-600 dark:hover:to-cyan-600 shadow-lg hover:shadow-xl'
            }`}
          >
            <span className="hidden sm:inline">Suivant »</span>
            <span className="sm:hidden">»</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  itemLabel: PropTypes.string
};

export default Pagination;
