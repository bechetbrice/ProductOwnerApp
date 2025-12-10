import { Download, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { getModuleDescription } from '../../utils/moduleDescriptions';
import NavigationMenu from './NavigationMenu';
import ExportImportMenu from './ExportImportMenu';
import InstallButton from './InstallButton';

const Header = ({ 
  title, 
  subtitle, 
  compact = false, 
  currentView, 
  onNavigate
}) => {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportButtonRef = useRef(null);

  // Mapping des vues vers leurs titres
  const viewTitles = {
    dashboard: 'Dashboard',
    contacts: 'Contacts',
    teams: 'Équipes',
    products: 'Produits',
    objectives: 'Objectifs',
    interviews: 'Entretiens',
    userNeeds: 'Besoins',
    personas: 'Personas',
    priorityView: 'MoSCoW',
    estimationSession: 'Planning Poker',
    prioritizationMatrix: 'RICE',
    userStories: 'User Stories',
    sprints: 'Sprints Management',
    tasks: 'Tasks Management',
    budget: 'Budget',
    sprintBoard: 'Sprint Board',
    taskBoard: 'Task Board',
    sprintAnalytics: 'Sprint Analytics',
    sprintReviews: 'Sprint Reviews',
    sprintRetrospectives: 'Rétrospectives',
    'sprint-timeline': 'Sprint Timeline',
    roadmap: 'Roadmap',
    wiki: 'Wiki',
    faq: 'FAQ',
    customLists: 'Listes Personnalisées',
    settings: 'Paramétrage'
  };

  // Si currentView est fourni, utiliser le titre correspondant
  const displayTitle = currentView ? viewTitles[currentView] || title : title;
  const displayDescription = currentView ? getModuleDescription(currentView) : subtitle;

  return (
    <div className="py-3 md:py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white border-b border-emerald-700 dark:border-gray-700 px-4 md:px-6 lg:px-8">
      {/* Version Mobile : Titre et boutons sur la même ligne */}
      <div className="flex md:hidden items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white truncate">{displayTitle}</h2>
        </div>
        
        {/* Boutons à droite */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Install Button - Mobile */}
          <InstallButton compact variant="header" />
          
          {/* Export/Import Menu - Mobile */}
          <div className="relative">
            <button
              ref={exportButtonRef}
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="p-1.5 text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-colors"
              title="Export / Import"
              aria-label="Exporter / Importer"
            >
              <Download size={18} />
            </button>
            
            <ExportImportMenu
              isOpen={exportMenuOpen}
              onClose={() => setExportMenuOpen(false)}
              buttonRef={exportButtonRef}
            />
          </div>
          
          {/* Menu Navigation */}
          {onNavigate && (
            <NavigationMenu
              onNavigate={onNavigate}
              currentView={currentView}
            />
          )}
        </div>
      </div>

      {/* Sous-titre mobile (optionnel, réduit) */}
      {displayDescription && (
        <p className="text-xs text-emerald-100 dark:text-gray-400 mt-1.5 line-clamp-1 md:hidden">
          {displayDescription}
        </p>
      )}

      {/* Version Desktop : Layout actuel */}
      <div className="hidden md:flex md:items-center md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white truncate">{displayTitle}</h2>
          </div>
          {displayDescription && (
            <p className="text-base text-emerald-100 dark:text-gray-400 mt-1.5 line-clamp-2">
              {displayDescription}
            </p>
          )}
        </div>
        
        {/* Boutons desktop */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Install Button - Desktop */}
          <InstallButton variant="header" />
          
          {/* Export/Import Menu - Desktop */}
          <div className="relative">
            <button
              ref={exportButtonRef}
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors text-white text-sm font-medium"
              title="Exporter / Importer"
              aria-expanded={exportMenuOpen}
            >
              <Download size={18} />
              <span>Export / Import</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${exportMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            <ExportImportMenu
              isOpen={exportMenuOpen}
              onClose={() => setExportMenuOpen(false)}
              buttonRef={exportButtonRef}
            />
          </div>
          
          {/* Menu Navigation */}
          {onNavigate && (
            <NavigationMenu
              onNavigate={onNavigate}
              currentView={currentView}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
