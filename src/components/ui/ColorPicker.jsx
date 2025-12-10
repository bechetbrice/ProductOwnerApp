import PropTypes from 'prop-types';

/**
 * ColorPicker - Sélecteur de couleurs avec palette prédéfinie
 * Affiche les couleurs disponibles avec aperçu
 */

const PRESET_COLORS = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Bleu', value: '#3b82f6' },
  { name: 'Vert', value: '#10b981' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Rouge', value: '#ef4444' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Rose', value: '#ec4899' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Émeraude', value: '#059669' },
  { name: 'Ambre', value: '#d97706' }
];

const ColorPicker = ({ 
  label = 'Couleur',
  value,
  onChange,
  required = false,
  previewCode,
  previewName,
  colors = PRESET_COLORS,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Palette de couleurs */}
      <div className="flex gap-2 flex-wrap mb-3">
        {colors.map(color => (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className={`w-10 h-10 rounded-lg border-2 transition-all ${
              value === color.value 
                ? 'border-gray-900 scale-110 ring-2 ring-emerald-500' 
                : 'border-gray-300 hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Sélectionner la couleur ${color.name}`}
          />
        ))}
      </div>
      
      {/* Aperçu du badge */}
      {(previewCode || previewName) && (
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-xs font-medium text-gray-600 mb-2">✨ Aperçu du badge</p>
          <div className="flex items-center gap-2">
            <span 
              className="px-3 py-1 rounded text-sm font-bold text-white"
              style={{ backgroundColor: value }}
            >
              {previewCode || 'CODE'}
            </span>
            <span className="text-sm text-gray-700">{previewName || 'Nom du produit'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  previewCode: PropTypes.string,
  previewName: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })),
  className: PropTypes.string
};

export default ColorPicker;
