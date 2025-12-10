import { AlertTriangle, X } from 'lucide-react';

/**
 * ConfirmDialog - Modale de confirmation personnalisée
 * Remplace le confirm() natif du navigateur
 */
const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
  variant = "danger" // "danger" | "warning" | "info"
}) => {
  if (!isOpen) return null;

  const variantConfig = {
    danger: {
      icon: <AlertTriangle className="text-red-600" size={48} />,
      confirmClass: "bg-red-600 hover:bg-red-700 text-white",
      titleClass: "text-red-900"
    },
    warning: {
      icon: <AlertTriangle className="text-orange-600" size={48} />,
      confirmClass: "bg-orange-600 hover:bg-orange-700 text-white",
      titleClass: "text-orange-900"
    },
    info: {
      icon: <AlertTriangle className="text-blue-600" size={48} />,
      confirmClass: "bg-blue-600 hover:bg-blue-700 text-white",
      titleClass: "text-blue-900"
    }
  };

  const config = variantConfig[variant] || variantConfig.danger;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm sm:max-w-md w-full">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-start justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-shrink-0">{config.icon}</div>
            <h2 className={`text-base sm:text-lg font-bold ${config.titleClass}`}>
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 rounded-b-lg">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg transition-colors ${config.confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
