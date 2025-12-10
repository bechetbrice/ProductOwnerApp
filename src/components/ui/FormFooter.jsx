import { AlertCircle, Save } from 'lucide-react';
import { Button } from './Button';
import PropTypes from 'prop-types';

/**
 * FormFooter - Footer sticky standardisé pour les formulaires
 * Gère les boutons d'action et les messages d'erreur
 */
const FormFooter = ({ 
  onCancel,
  onSubmit,
  submitLabel = 'Enregistrer',
  submitIcon: SubmitIcon = Save,
  cancelLabel = 'Annuler',
  isSubmitting = false,
  submitDisabled = false,
  variant = 'primary', // primary, danger
  errorMessage,
  className = ''
}) => {
  return (
    <div className={`sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 py-3 md:px-6 md:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${className}`}>
      <div className="text-xs text-gray-600">
        {errorMessage && (
          <div className="flex items-start gap-1 text-amber-600">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <div>{errorMessage}</div>
          </div>
        )}
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onCancel}
          className="flex-1 sm:flex-none"
        >
          {cancelLabel}
        </Button>
        <Button
          type="submit"
          variant={variant === 'danger' ? 'danger' : 'gradient'}
          size="md"
          icon={SubmitIcon}
          onClick={onSubmit}
          disabled={submitDisabled || isSubmitting}
          className="flex-1 sm:flex-none"
        >
          {isSubmitting ? 'Enregistrement...' : submitLabel}
        </Button>
      </div>
    </div>
  );
};

FormFooter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  submitIcon: PropTypes.elementType,
  cancelLabel: PropTypes.string,
  isSubmitting: PropTypes.bool,
  submitDisabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'danger']),
  errorMessage: PropTypes.string,
  className: PropTypes.string
};

export default FormFooter;
