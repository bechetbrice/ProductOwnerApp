import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, AlertCircle } from 'lucide-react';

/**
 * UserStorySelector - Composant de sélection personnalisé pour User Stories
 * Version 2.0 - Harmonisation style émeraude
 * 
 * Permet l'affichage multi-lignes des User Stories longues avec recherche intégrée.
 * 
 * @component
 * @param {Array} userStories - Liste des user stories disponibles
 * @param {string} value - ID de la story sélectionnée
 * @param {Function} onChange - Callback de changement
 * @param {boolean} [disabled] - Champ désactivé
 * @param {string} [error] - Message d'erreur
 */
const UserStorySelector = ({ 
  userStories = [], 
  value, 
  onChange, 
  disabled = false,
  error = null 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Fermer le dropdown si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Trouver la story sélectionnée
  const selectedStory = userStories.find(s => s.id === value);

  // Filtrer les stories selon la recherche
  const filteredStories = userStories.filter(story => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = story.title?.toLowerCase().includes(searchLower);
    const numberMatch = story.storyNumber?.toLowerCase().includes(searchLower);
    return titleMatch || numberMatch;
  });

  const handleSelect = (storyId) => {
    onChange({ target: { name: 'userStoryId', value: storyId } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ target: { name: 'userStoryId', value: '' } });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton de sélection */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-2 text-left border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
          error ? 'border-red-500 bg-white' : 'border-emerald-300 bg-white'
        } ${disabled ? 'opacity-75 cursor-not-allowed bg-gray-50' : 'hover:border-emerald-400 cursor-pointer'}`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            {selectedStory ? (
              <div className="space-y-1">
                {/* Ligne 1 : Numéro */}
                {selectedStory.storyNumber && (
                  <div className="text-xs font-mono text-emerald-600 font-semibold">
                    #{selectedStory.storyNumber}
                  </div>
                )}
                {/* Ligne 2 : Titre (tronqué) */}
                <div className="text-sm text-gray-900 truncate" title={selectedStory.title}>
                  {selectedStory.title}
                </div>
                {/* Ligne 3 : Badge sprint */}
                <div className="text-xs text-gray-500">
                  {selectedStory.sprintId ? (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      🏃 Dans un sprint
                    </span>
                  ) : (
                    <span className="text-amber-600">Hors sprint</span>
                  )}
                </div>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Sélectionner une User Story</span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {selectedStory && !disabled && (
              <div
                role="button"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => e.key === 'Enter' && handleClear(e)}
                className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                title="Effacer la sélection"
              >
                <X size={16} className="text-gray-400" />
              </div>
            )}
            <ChevronDown 
              size={20} 
              className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-emerald-300 rounded-lg shadow-xl max-h-96 overflow-hidden">
          {/* Barre de recherche */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par titre ou numéro..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                autoFocus
              />
            </div>
            {searchTerm && (
              <div className="mt-2 text-xs text-gray-600">
                {filteredStories.length} résultat{filteredStories.length > 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Liste des options */}
          <div className="overflow-y-auto max-h-80">
            {filteredStories.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                {searchTerm ? (
                  <>
                    <Search size={32} className="mx-auto mb-2 text-gray-300" />
                    Aucune User Story trouvée
                  </>
                ) : (
                  <>
                    <AlertCircle size={32} className="mx-auto mb-2 text-amber-400" />
                    Aucune User Story disponible
                    <p className="mt-2 text-xs text-amber-600">
                      Créez d'abord des user stories dans le module User Stories
                    </p>
                  </>
                )}
              </div>
            ) : (
              filteredStories.map((story) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => handleSelect(story.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                    value === story.id ? 'bg-emerald-100' : ''
                  }`}
                >
                  <div className="space-y-2">
                    {/* Ligne 1 : Numéro + Badge sprint */}
                    <div className="flex items-center justify-between gap-2">
                      {story.storyNumber && (
                        <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          #{story.storyNumber}
                        </span>
                      )}
                      <span className="text-xs">
                        {story.sprintId ? (
                          <span className="text-green-600">🏃</span>
                        ) : (
                          <span className="text-amber-600">(Hors sprint)</span>
                        )}
                      </span>
                    </div>

                    {/* Ligne 2-3 : Titre (multi-lignes) */}
                    <div className="text-sm text-gray-900 leading-relaxed break-words">
                      {story.title}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default UserStorySelector;

/**
 * Notes de développement - Harmonisation émeraude:
 * 
 * Version 2.0 - Changements de style :
 * - ✅ focus:ring-indigo-500 → focus:ring-emerald-500
 * - ✅ border-indigo-300 → border-emerald-300
 * - ✅ hover:border-indigo-400 → hover:border-emerald-400
 * - ✅ text-indigo-600 → text-emerald-600
 * - ✅ hover:bg-indigo-50 → hover:bg-emerald-50
 * - ✅ bg-indigo-100 → bg-emerald-100
 * - ✅ bg-indigo-50 → bg-emerald-50
 * 
 * Fonctionnalités préservées :
 * - ✅ Recherche par titre ou numéro
 * - ✅ Affichage multi-lignes des titres longs
 * - ✅ Badge numéro story
 * - ✅ Badge statut sprint
 * - ✅ Bouton clear
 * - ✅ États empty/search
 * - ✅ Accessibilité clavier
 * 
 * Usage (identique à v1.0) :
 * <UserStorySelector
 *   userStories={userStories}
 *   value={formData.userStoryId}
 *   onChange={(e) => setFormData({...formData, userStoryId: e.target.value})}
 *   error={errors.userStoryId}
 * />
 */
