import PropTypes from 'prop-types';
import { Plus, Trash2 } from 'lucide-react';

/**
 * DynamicList - Composant pour gérer une liste de champs texte dynamiques
 * avec ajout et suppression d'items
 * 
 * @param {string} label - Label du champ
 * @param {Array<string>} items - Tableau des valeurs
 * @param {Function} onChange - Callback appelé avec le nouveau tableau
 * @param {string} placeholder - Placeholder des champs
 * @param {ReactNode} icon - Icône optionnelle à afficher avant le label
 * @param {string} iconColor - Couleur de l'icône (tailwind class)
 * @param {boolean} required - Si true, affiche une étoile rouge
 * @param {string} error - Message d'erreur à afficher
 * @param {string} addButtonLabel - Label du bouton d'ajout
 */
const DynamicList = ({
  label,
  items = [''],
  onChange,
  placeholder = '',
  icon: Icon = null,
  iconColor = 'text-indigo-600',
  required = false,
  error = null,
  addButtonLabel = 'Ajouter un item'
}) => {
  
  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const addItem = () => {
    onChange([...items, '']);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center gap-2">
        {Icon && <Icon size={14} className={iconColor} />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder={placeholder}
            className={`flex-1 px-3 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              error && index === 0 ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Supprimer cet item"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}
      
      {error && (
        <p className="text-xs text-red-600 mb-2 flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-red-600 text-white text-[8px] leading-3 text-center">!</span>
          {error}
        </p>
      )}
      
      <button
        type="button"
        onClick={addItem}
        className="mt-2 flex items-center gap-1 px-3 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
      >
        <Plus size={14} />
        {addButtonLabel}
      </button>
    </div>
  );
};

DynamicList.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  addButtonLabel: PropTypes.string,
};

export default DynamicList;
