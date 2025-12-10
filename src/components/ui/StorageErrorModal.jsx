/**
 * Composant d'affichage des erreurs de stockage localStorage
 * 
 * @component StorageErrorModal
 * @description Modal d'alerte pour les erreurs localStorage avec actions utilisateur
 * @version 1.0.0
 */

import PropTypes from 'prop-types';
import { X, AlertTriangle, AlertCircle, XCircle, Info } from 'lucide-react';

/**
 * Modal d'erreur localStorage
 * @param {object} props
 * @param {boolean} props.isOpen - Modal ouverte/fermée
 * @param {function} props.onClose - Callback fermeture
 * @param {object} props.error - Objet erreur { type, title, message, actions, severity }
 * @param {function} props.onAction - Callback actions utilisateur (actionIndex)
 */
const StorageErrorModal = ({ 
  isOpen, 
  onClose, 
  error,
  onAction 
}) => {
  if (!isOpen || !error) return null;

  // Icône selon severity
  const getIcon = () => {
    switch (error.severity) {
      case 'critical':
        return <XCircle className="h-12 w-12 text-red-600" />;
      case 'error':
        return <AlertCircle className="h-12 w-12 text-orange-600" />;
      case 'warning':
        return <AlertTriangle className="h-12 w-12 text-yellow-600" />;
      default:
        return <Info className="h-12 w-12 text-blue-600" />;
    }
  };

  // Couleur selon severity
  const getBorderColor = () => {
    switch (error.severity) {
      case 'critical':
        return 'border-red-600';
      case 'error':
        return 'border-orange-600';
      case 'warning':
        return 'border-yellow-600';
      default:
        return 'border-blue-600';
    }
  };

  const handleActionClick = (index) => {
    if (onAction) {
      onAction(index);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className={`bg-white rounded-lg shadow-2xl max-w-md w-full border-t-4 ${getBorderColor()} animate-slideIn`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                {getIcon()}
                <h2 className="text-2xl font-bold text-gray-900">
                  {error.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-4">
            {/* Message */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {error.message}
              </p>
            </div>

            {/* Actions recommandées */}
            {error.actions && error.actions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Solutions recommandées :
                </h3>
                <ul className="space-y-2">
                  {error.actions.map((action, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Détails techniques (si mode dev) */}
            {process.env.NODE_ENV !== 'production' && error.originalError && (
              <details className="mb-4">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                  Détails techniques (dev)
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                  {error.originalError.stack || error.originalError.toString()}
                </pre>
              </details>
            )}

            {/* Quota info si pertinent */}
            {error.quota && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Espace de stockage :
                </h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Utilisé :</span>
                    <span className="font-mono">{error.quota.usedMB} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disponible :</span>
                    <span className="font-mono">{error.quota.availableMB} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total :</span>
                    <span className="font-mono">{error.quota.quotaMB} MB</span>
                  </div>
                  {/* Barre de progression */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${error.quota.percentage > 90 ? 'bg-red-600' : error.quota.percentage > 80 ? 'bg-orange-600' : 'bg-blue-600'} transition-all`}
                        style={{ width: `${Math.min(error.quota.percentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {error.quota.percentage}% utilisé
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
            
            {/* Bouton action principale si définie */}
            {error.actions && error.actions.length > 0 && (
              <button
                onClick={() => handleActionClick(0)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {error.actions[0].includes('Export') ? 'Exporter maintenant' : 
                 error.actions[0].includes('Rafraîchir') ? 'Rafraîchir' :
                 'Action'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

StorageErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.string),
    severity: PropTypes.oneOf(['info', 'warning', 'error', 'critical']),
    originalError: PropTypes.object,
    quota: PropTypes.shape({
      usedMB: PropTypes.number,
      availableMB: PropTypes.number,
      quotaMB: PropTypes.number,
      percentage: PropTypes.number,
    }),
  }),
  onAction: PropTypes.func,
};

export default StorageErrorModal;
