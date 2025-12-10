import { Filter, Plus, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

/**
 * FilterBar - Barre de filtres et actions standard
 * Version: 2.2 - Responsive optimisé avec topLeftContent flexible
 */
const FilterBar = ({
  isExpanded,
  onToggleExpand,
  onAdd,
  addLabel = 'Nouveau',
  hasActiveFilters = false,
  onResetFilters,
  filters,
  topLeftContent,
  additionalActions
}) => {
  return (
    <div className="w-full max-w-full bg-white rounded-lg shadow">
      {/* Ligne supérieure : Actions */}
      <div className="px-3 py-3 sm:px-4 lg:px-5">
        {/* Layout responsive avec wrapping automatique */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Contenu gauche (ProductSelector) - Full width mobile, auto desktop */}
          {topLeftContent && (
            <div className="w-full sm:w-auto">
              {topLeftContent}
            </div>
          )}

          {/* Actions droite - Full width mobile si topLeftContent existe */}
          <div className={`flex items-center gap-2 sm:gap-3 flex-wrap ${topLeftContent ? 'w-full sm:w-auto' : ''}`}>
            {/* Actions supplémentaires */}
            {additionalActions && (
              <div className="flex items-center gap-2 flex-wrap">
                {additionalActions}
              </div>
            )}

            {/* Bouton Ajout */}
            {onAdd && (
              <Button
                variant="gradient"
                size="sm"
                onClick={onAdd}
                icon={Plus}
                iconPosition="left"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">{addLabel}</span>
                <span className="sm:hidden">Nouveau</span>
              </Button>
            )}

            {/* Bouton Filtres */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              icon={Filter}
              iconPosition="left"
              title="Afficher/masquer les filtres"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Filtres</span>
              <span className="sm:hidden">Filtrer</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Section filtres (repliable) */}
      {isExpanded && (
        <div className="bg-gray-50 border-t border-gray-200 px-3 py-3 sm:px-4 lg:px-5">
          <div className="flex flex-wrap items-stretch gap-2 sm:gap-3 lg:gap-4">
            {/* Filtres personnalisés */}
            <div className="contents">
              {filters}
            </div>

            {/* Bouton Réinitialiser */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                icon={RotateCcw}
                iconPosition="left"
                title="Réinitialiser les filtres"
                className="text-xs sm:text-sm whitespace-nowrap self-start"
              >
                <span className="hidden sm:inline">Réinitialiser</span>
                <span className="sm:hidden">Reset</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
