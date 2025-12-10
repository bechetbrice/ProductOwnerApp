import React, { useEffect } from 'react';
import { X, CheckCircle, Info, AlertCircle, AlertTriangle } from 'lucide-react';

/**
 * Toast - Composant de notification temporaire
 * Affiche des messages discrets en haut à droite de l'écran
 */
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600'
    },
    info: {
      icon: Info,
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-800',
      iconColor: 'text-cyan-600'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      iconColor: 'text-orange-600'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md animate-slide-in-right`}>
      <div className={`${bgColor} border-2 ${borderColor} rounded-lg shadow-lg p-4 flex items-start gap-3`}>
        <Icon className={`${iconColor} flex-shrink-0 mt-0.5`} size={20} />
        <p className={`${textColor} text-sm flex-1`}>{message}</p>
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-70 transition-opacity flex-shrink-0`}
          aria-label="Fermer la notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

/**
 * ToastContainer - Conteneur pour gérer plusieurs toasts
 */
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <div className="pointer-events-auto space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Toast;
