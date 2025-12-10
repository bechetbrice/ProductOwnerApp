import React from 'react';
import { 
  CheckCircle, 
  PauseCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw,
  Shield
} from 'lucide-react';

/**
 * TaskOutcomeBadge - Badge visuel pour afficher l'outcome d'une tâche
 * Affiché dans le coin supérieur droit des cartes
 */
const TaskOutcomeBadge = ({ outcome, size = 'normal', showLabel = true, className = '' }) => {
  if (!outcome) return null;

  const configs = {
    todo: {
      icon: AlertCircle,
      label: 'À faire',
      bgClass: 'bg-gray-100',
      borderClass: 'border-gray-300',
      textClass: 'text-gray-700',
      iconClass: 'text-gray-600'
    },
    inProgress: {
      icon: RefreshCw,
      label: 'En cours',
      bgClass: 'bg-blue-100',
      borderClass: 'border-blue-300',
      textClass: 'text-blue-800',
      iconClass: 'text-blue-600'
    },
    completed: {
      icon: CheckCircle,
      label: 'Terminé',
      bgClass: 'bg-green-100',
      borderClass: 'border-green-300',
      textClass: 'text-green-800',
      iconClass: 'text-green-600'
    },
    paused: {
      icon: PauseCircle,
      label: 'En pause',
      bgClass: 'bg-yellow-100',
      borderClass: 'border-yellow-300',
      textClass: 'text-yellow-800',
      iconClass: 'text-yellow-600'
    },
    blocked: {
      icon: Shield,
      label: 'Bloqué',
      bgClass: 'bg-orange-100',
      borderClass: 'border-orange-300',
      textClass: 'text-orange-800',
      iconClass: 'text-orange-600'
    },
    cancelled: {
      icon: XCircle,
      label: 'Annulé',
      bgClass: 'bg-gray-100',
      borderClass: 'border-gray-300',
      textClass: 'text-gray-700',
      iconClass: 'text-gray-600'
    },
    to_review: {
      icon: RefreshCw,
      label: 'À revoir',
      bgClass: 'bg-red-100',
      borderClass: 'border-red-300',
      textClass: 'text-red-800',
      iconClass: 'text-red-600'
    }
  };

  const config = configs[outcome];
  if (!config) return null;

  const Icon = config.icon;
  const iconSize = size === 'small' ? 12 : size === 'large' ? 18 : 14;

  // Version compacte (juste l'icône)
  if (!showLabel) {
    return (
      <div 
        className={`
          inline-flex items-center justify-center
          ${size === 'small' ? 'w-6 h-6' : size === 'large' ? 'w-10 h-10' : 'w-8 h-8'}
          ${config.bgClass} ${config.borderClass} 
          border rounded-full
          ${className}
        `}
        title={config.label}
      >
        <Icon size={iconSize} className={config.iconClass} />
      </div>
    );
  }

  // Version avec label
  return (
    <div 
      className={`
        inline-flex items-center gap-1.5
        ${size === 'small' ? 'px-2 py-0.5 text-sm' : size === 'large' ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-sm'}
        ${config.bgClass} ${config.borderClass} ${config.textClass}
        border rounded-full font-medium
        ${className}
      `}
    >
      <Icon size={iconSize} className={config.iconClass} />
      <span>{config.label}</span>
    </div>
  );
};

export default TaskOutcomeBadge;
