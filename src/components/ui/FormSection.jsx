import PropTypes from 'prop-types';

/**
 * FormSection - Section de formulaire avec titre et bordure optionnelle
 * Permet d'organiser les champs en sections logiques
 */
const FormSection = ({ 
  title,
  subtitle,
  emoji,
  children,
  withBorder = false,
  required = false
}) => {
  return (
    <div className={withBorder ? 'border-t border-gray-200 pt-4' : ''}>
      {title && (
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {emoji && <span>{emoji}</span>}
            {title}
            {required && <span className="text-red-500">*</span>}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

FormSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  emoji: PropTypes.string,
  children: PropTypes.node.isRequired,
  withBorder: PropTypes.bool,
  required: PropTypes.bool
};

export default FormSection;
