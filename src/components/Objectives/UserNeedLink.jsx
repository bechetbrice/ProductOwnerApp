import { ExternalLink } from 'lucide-react';

const UserNeedLink = ({ needId, userNeeds, onNavigate }) => {
  const need = userNeeds.find(n => n.id === needId);
  
  if (!need) {
    return (
      <div className="text-gray-500 text-xs italic break-words">
        Besoin non trouvé (ID: {needId})
      </div>
    );
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('need', needId);
    }
  };

  const getImportanceIcon = (importance) => {
    switch (importance) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '⚪';
      default: return '⚪';
    }
  };

  return (
    /* FIX 1: min-w-0 pour permettre troncature, wrapping responsive */
    <div className="flex items-center gap-1 text-xs min-w-0">
      <span className="text-gray-400 flex-shrink-0">
        {getImportanceIcon(need.importance)}
      </span>
      <button
        onClick={handleClick}
        className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors flex items-center gap-1 min-w-0 flex-1"
        title={`${need.client} - ${need.Objectives}`}
      >
        {/* FIX 2: Troncature ajustée pour mobile (80px) et desktop (120px) */}
        <span className="truncate max-w-[80px] sm:max-w-[120px]">
          {need.client} - {need.Objectives}
        </span>
        <ExternalLink size={10} className="flex-shrink-0" />
      </button>
    </div>
  );
};

export default UserNeedLink;
