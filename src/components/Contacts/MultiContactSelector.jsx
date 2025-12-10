import { User, Building2 } from 'lucide-react';
import { CONTACT_TYPES } from '../../utils/constants';
import MultiSelector from '../ui/MultiSelector';

/**
 * MultiContactSelector - Sélecteur multiple de contacts
 * Utilise maintenant le pattern moderne MultiSelector avec checkboxes
 * 
 * Compatible avec l'ancienne API pour éviter de casser le code existant
 */
const MultiContactSelector = ({ 
  contacts, 
  selectedContactIds, 
  onChange, 
  label = "Stakeholders", 
  required = false, 
  helperText,
  placeholder = "Rechercher un contact..."
}) => {
  // Render custom pour afficher les contacts avec leurs icônes
  const renderItem = (contact, isSelected) => {
    return (
      <label
        key={contact.id}
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            if (isSelected) {
              onChange(selectedContactIds.filter(id => id !== contact.id));
            } else {
              onChange([...selectedContactIds, contact.id]);
            }
          }}
          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
        />
        <div className="flex-1 min-w-0 flex items-center gap-2">
          {contact.type === CONTACT_TYPES.INTERNAL ? (
            <User size={16} className="text-gray-600 flex-shrink-0" />
          ) : (
            <Building2 size={16} className="text-gray-600 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-800 truncate">
              {contact.name}
            </div>
            <div className="text-xs text-gray-600 truncate">
              {contact.role}
              {contact.company && contact.type === CONTACT_TYPES.EXTERNAL && (
                <span className="ml-1">• {contact.company}</span>
              )}
            </div>
          </div>
        </div>
      </label>
    );
  };

  // Render custom des badges
  const renderBadge = (contact) => {
    return (
      <span
        key={contact.id}
        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
      >
        {contact.type === CONTACT_TYPES.INTERNAL ? (
          <User size={14} />
        ) : (
          <Building2 size={14} />
        )}
        {contact.name}
        <button
          type="button"
          onClick={() => onChange(selectedContactIds.filter(id => id !== contact.id))}
          className="ml-1 hover:text-indigo-900"
          aria-label={`Retirer ${contact.name}`}
        >
          ✕
        </button>
      </span>
    );
  };

  return (
    <div>
      <MultiSelector
        items={contacts}
        selectedIds={selectedContactIds}
        onChange={onChange}
        label={label}
        required={required}
        emptyMessage="Aucun contact disponible"
        placeholder={placeholder}
        searchable={true}
        renderItem={renderItem}
        renderBadge={renderBadge}
        getItemKey={(contact) => contact.id}
        getItemLabel={(contact) => contact.name}
        getItemSubLabel={(contact) => contact.role}
      />
      
      {helperText && (
        <p className="mt-2 text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default MultiContactSelector;
