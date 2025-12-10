import CustomSelect from '../ui/CustomSelect';

/**
 * FilterSelect - Select harmonisé pour les filtres
 * Version 2.0 - Migration vers CustomSelect (style émeraude)
 * 
 * @component
 * @param {string} value - Valeur sélectionnée
 * @param {Function} onChange - Callback de changement
 * @param {Array<{value: string, label: string}>} options - Options du select
 * @param {string} [placeholder] - Texte placeholder
 * @param {string} [label] - Label du champ
 * @param {string} [className] - Classes CSS additionnelles
 */
const FilterSelect = ({ 
  value, 
  onChange, 
  options = [],
  placeholder = "Sélectionner...",
  label,
  className = "" 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <CustomSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        aria-label={label || placeholder}
      />
    </div>
  );
};

export default FilterSelect;

/**
 * Notes de développement - Migration CustomSelect:
 * 
 * Version 2.0 - Changements :
 * - ✅ Remplacement du <select> natif par CustomSelect
 * - ✅ Style émeraude cohérent avec le design system
 * - ✅ Navigation clavier (↑↓, Enter, Escape)
 * - ✅ Fermeture auto au clic extérieur
 * - ✅ Accessibilité ARIA complète
 * - ✅ Responsive design préservé (text-xs sm:text-sm dans CustomSelect)
 * 
 * CustomSelect gère automatiquement :
 * - Padding responsive: px-2 sm:px-3 / py-1.5 sm:py-2
 * - Typography responsive: text-xs sm:text-sm
 * - Bordure hover: hover:border-emerald-400
 * - Focus ring: focus:ring-2 focus:ring-emerald-500
 * 
 * Usage (identique à la v1.0) :
 * <FilterSelect
 *   label="Type"
 *   value={filterType}
 *   onChange={(e) => setFilterType(e.target.value)}
 *   options={[
 *     { value: 'all', label: 'Tous les types' },
 *     { value: 'internal', label: '🏢 Internes' },
 *     { value: 'external', label: '🌐 Externes' }
 *   ]}
 * />
 */
