/**
 * InfoCard.jsx
 * Composant réutilisable pour les sections informatives du Dashboard
 * (Jalons, Objectifs, Sprints actifs, etc.)
 */

const InfoCard = ({ 
  title, 
  icon: Icon, 
  children, 
  color = 'emerald',  // emerald|teal|cyan|green|red|gray
  compact = false,
  className = ''
}) => {
  // Mapping des couleurs de fond et bordures
  const colorClasses = {
    emerald: 'bg-emerald-50 border-emerald-100',
    teal: 'bg-teal-50 border-teal-100',
    cyan: 'bg-cyan-50 border-cyan-100',
    green: 'bg-green-50 border-green-100',
    red: 'bg-red-50 border-red-100',
    gray: 'bg-gray-50 border-gray-100',
    white: 'bg-white border-gray-200',
  };

  // Mapping des couleurs d'icônes
  const iconColorClasses = {
    emerald: 'text-emerald-600',
    teal: 'text-teal-600',
    cyan: 'text-cyan-600',
    green: 'text-green-600',
    red: 'text-red-600',
    gray: 'text-gray-600',
    white: 'text-gray-700',
  };

  const bgClass = colorClasses[color] || colorClasses.white;
  const iconColor = iconColorClasses[color] || iconColorClasses.white;
  const paddingClass = compact ? 'p-3' : 'p-4 sm:p-6';

  return (
    <div className={`rounded-lg shadow border ${bgClass} ${paddingClass} ${className}`}>
      {title && (
        <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
          {Icon && <Icon size={18} className={iconColor} />}
          <span>{title}</span>
        </h3>
      )}
      {children}
    </div>
  );
};

export default InfoCard;
