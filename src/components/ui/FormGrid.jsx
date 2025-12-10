import PropTypes from 'prop-types';

/**
 * FormGrid - Grille responsive pour organiser les champs de formulaire
 * S'adapte automatiquement selon la taille d'écran
 */
const FormGrid = ({ 
  children, 
  columns = 2 // 1, 2, 3, 4
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-3 md:gap-4`}>
      {children}
    </div>
  );
};

FormGrid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4])
};

export default FormGrid;
