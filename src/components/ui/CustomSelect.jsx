import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * CustomSelect - Composant Select personnalisé avec styling émeraude
 * Version 2.1 - Support des options désactivées
 * 
 * Remplace les selects natifs pour une cohérence visuelle totale.
 * Supporte les options désactivées (disabled: true) pour simuler les optgroups.
 * 
 * @param {Array<{value: string, label: string, disabled?: boolean}>} options - Options du select
 */
const CustomSelect = ({
  value,
  onChange,
  options = [],
  placeholder = "Sélectionner...",
  className = "",
  disabled = false,
  id,
  "aria-label": ariaLabel
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);
  const optionsRef = useRef([]);

  // Fermer le dropdown au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Navigation au clavier (skip disabled options)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => {
            let next = prev + 1;
            // Sauter les options désactivées
            while (next < options.length && options[next]?.disabled) {
              next++;
            }
            return next < options.length ? next : prev;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => {
            let next = prev - 1;
            // Sauter les options désactivées
            while (next >= 0 && options[next]?.disabled) {
              next--;
            }
            return next >= 0 ? next : 0;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && !options[highlightedIndex]?.disabled) {
            handleSelect(options[highlightedIndex].value, false);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, options]);

  // Scroll vers l'option highlightée
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (newValue, optionDisabled) => {
    // Ne pas sélectionner si l'option est désactivée
    if (optionDisabled) return;
    
    onChange({ target: { value: newValue } });
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div 
      ref={selectRef}
      className={`relative ${className}`}
      id={id}
    >
      {/* Bouton principal */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`
          w-full px-2 sm:px-3 py-1.5 sm:py-2 
          text-xs sm:text-sm text-left
          bg-white border-2 rounded-lg
          flex items-center justify-between gap-2
          transition-all duration-150
          ${disabled 
            ? 'opacity-50 cursor-not-allowed bg-gray-100' 
            : 'cursor-pointer hover:border-emerald-400'
          }
          ${isOpen 
            ? 'border-emerald-500 ring-2 ring-emerald-500 ring-opacity-50' 
            : 'border-gray-300'
          }
        `}
      >
        <span className={`truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
          {displayText}
        </span>
        <ChevronDown 
          className={`w-4 h-4 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border-2 border-emerald-500 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          role="listbox"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;
            const isDisabled = option.disabled || false;

            return (
              <div
                key={option.value}
                ref={el => optionsRef.current[index] = el}
                role="option"
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                onClick={() => handleSelect(option.value, isDisabled)}
                onMouseEnter={() => !isDisabled && setHighlightedIndex(index)}
                className={`
                  px-3 py-2 text-xs sm:text-sm
                  flex items-center justify-between gap-2
                  transition-colors duration-100
                  ${isDisabled
                    ? 'cursor-default opacity-50 text-gray-500 bg-gray-50 font-medium'
                    : isSelected 
                      ? 'bg-emerald-500 text-white font-semibold cursor-pointer' 
                      : isHighlighted
                        ? 'bg-emerald-50 text-emerald-900 cursor-pointer'
                        : 'text-gray-900 hover:bg-emerald-50 cursor-pointer'
                  }
                `}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && !isDisabled && (
                  <Check className="w-4 h-4 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
