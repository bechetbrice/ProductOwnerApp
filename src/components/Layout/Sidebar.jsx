import { useState, useEffect } from 'react';
import { 
  Home, Target, Package, UserCircle, MessageSquare, User, Users,
  ListChecks, Columns, Grid, Calculator, ListIcon, 
  CalendarRange, Zap, TrendingUp, BookOpen, ListOrdered, 
  Settings, Menu, X, Compass, Calendar, RotateCcw, Kanban, HelpCircle,
  Lightbulb, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  ChevronsLeft, ChevronsRight
} from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, isCollapsed, setIsCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(() => {
    // Charger l'état depuis localStorage
    const saved = localStorage.getItem('sidebarExpandedSections');
    if (saved) {
      return JSON.parse(saved);
    }
    // Par défaut, toutes les sections sont ouvertes
    return {
      overview: true,
      organization: true,
      strategy: true,
      exploration: true,
      refinement: true,
      planning: true,
      daily: true,
      review: true
    };
  });

  // Structure Scrum : 10 sections alignées sur le flux Product Owner
  const menuItems = [
    // 1. Vue d'ensemble
    { id: 'dashboard', icon: Home, label: 'Dashboard', section: 'overview' },
    
    // 2. Organisation
    { id: 'contacts', icon: UserCircle, label: 'Contacts', section: 'organization' },
    { id: 'teams', icon: Users, label: 'Équipes', section: 'organization' },
    
    // 3. Stratégie Produit
    { id: 'products', icon: Package, label: 'Produits', section: 'strategy' },
    { id: 'objectives', icon: Target, label: 'Objectifs', section: 'strategy' },
    
    // 4. Exploration (ex-Recherche utilisateur)
    { id: 'interviews', icon: MessageSquare, label: 'Entretiens', section: 'exploration' },
    { id: 'userNeeds', icon: Lightbulb, label: 'Besoins', section: 'exploration' },
    { id: 'personas', icon: User, label: 'Personas', section: 'exploration' },
    
    // 5. Backlog Refinement
    { id: 'priorityView', icon: Columns, label: 'MoSCoW', section: 'refinement' },
    { id: 'estimationSession', icon: Calculator, label: 'Planning Poker', section: 'refinement' },
    { id: 'prioritizationMatrix', icon: Grid, label: 'RICE', section: 'refinement' },
    { id: 'userStories', icon: ListIcon, label: 'User Stories', section: 'refinement' },
    
    // 6. Sprint Planning
    { id: 'sprints', icon: CalendarRange, label: 'Sprints Management', section: 'planning' },
    { id: 'tasks', icon: ListChecks, label: 'Tasks Management', section: 'planning' },
    
    // 7. Daily Scrum
    { id: 'sprintBoard', icon: Kanban, label: 'Sprint Board', section: 'daily' },
    { id: 'taskBoard', icon: ListChecks, label: 'Task Board', section: 'daily' },
    
    // 8. Review & Retrospective
    { id: 'sprintReviews', icon: Calendar, label: 'Sprint Reviews', section: 'review' },
    { id: 'sprintRetrospectives', icon: RotateCcw, label: 'Rétrospectives', section: 'review' }
  ];

  // Sauvegarder l'état des sections dans localStorage
  useEffect(() => {
    localStorage.setItem('sidebarExpandedSections', JSON.stringify(expandedSections));
  }, [expandedSections]);

  // Fonction pour toggle une section
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Fermer la sidebar sur mobile lors du changement de vue
  useEffect(() => {
    setIsOpen(false);
  }, [currentView]);

  // Fermer la sidebar lors du clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.getElementById('hamburger-button');
      const collapseBtn = document.getElementById('collapse-button');
      
      if (sidebar && hamburger && collapseBtn &&
          !sidebar.contains(e.target) && 
          !hamburger.contains(e.target) && 
          !collapseBtn.contains(e.target)) {
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

  const handleMenuClick = (viewId) => {
    setCurrentView(viewId);
    setIsOpen(false);
  };

  // Sections avec icônes et labels
  const sections = [
    { 
      id: 'overview', 
      icon: Home,
      items: menuItems.filter(item => item.section === 'overview') 
    },
    { 
      id: 'organization', 
      label: '👥 Organisation', 
      icon: Users,
      items: menuItems.filter(item => item.section === 'organization') 
    },
    { 
      id: 'strategy', 
      label: '🎯 Stratégie Produit', 
      icon: Target,
      items: menuItems.filter(item => item.section === 'strategy') 
    },
    { 
      id: 'exploration', 
      label: '🧭 Exploration', 
      icon: Compass,
      items: menuItems.filter(item => item.section === 'exploration') 
    },
    { 
      id: 'refinement', 
      label: '📝 Backlog Refinement', 
      icon: ListChecks,
      items: menuItems.filter(item => item.section === 'refinement') 
    },
    { 
      id: 'planning', 
      label: '🚀 Sprint Planning', 
      icon: Calendar,
      items: menuItems.filter(item => item.section === 'planning') 
    },
    { 
      id: 'daily', 
      label: '⚡ Daily Scrum', 
      icon: Zap,
      items: menuItems.filter(item => item.section === 'daily') 
    },
    { 
      id: 'review', 
      label: '🔄 Review & Rétro', 
      icon: RotateCcw,
      items: menuItems.filter(item => item.section === 'review') 
    }
  ];

  return (
    <>
      {/* Bouton hamburger (mobile) - Responsive */}
      <button
        id="hamburger-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2 sm:top-3 left-2 sm:left-3 z-50 md:hidden bg-emerald-600 text-white p-2.5 sm:p-3 rounded-lg shadow-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>



      {/* Overlay mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Mobile full-width, Desktop collapsible */}
      <div
        id="sidebar"
        className={`
          bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 
          dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
          text-white h-full flex flex-col
          fixed md:static inset-y-0 left-0 z-40
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isOpen ? 'w-64' : 'w-0'}
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
          p-2.5 sm:p-3 md:p-4
        `}
      >
        {/* Logo/Titre - Responsive */}
        <div className={`mb-3 sm:mb-4 md:mb-6 mt-12 sm:mt-14 md:mt-0 transition-all duration-300 ${isCollapsed ? 'md:opacity-0 md:h-0 md:overflow-hidden' : 'opacity-100'}`}>
          <a 
            href="/productownerapp.html" 
            className="flex flex-col items-center group cursor-pointer"
            title="Retour à la page d'accueil"
          >
            <img 
              src="./productownerapp_logo.png" 
              alt="ProductOwnerApp Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-1.5 sm:mb-2 md:mb-3 object-contain transition-transform group-hover:scale-105"
            />
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center text-white group-hover:text-emerald-100 transition-colors px-2 leading-tight">ProductOwnerApp</h1>
          </a>
        </div>

        {/* Logo réduit (mode collapsed) - Desktop uniquement */}
        {isCollapsed && (
          <div className="mb-3 sm:mb-4 md:mb-6 mt-12 sm:mt-14 md:mt-0 text-center">
            <a 
              href="/productownerapp.html" 
              className="block group"
              title="Retour à la page d'accueil"
            >
              <img 
                src="./productownerapp_logo.png" 
                alt="ProductOwnerApp" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>
          </div>
        )}

        {/* Bouton collapse/expand - Desktop uniquement - Sous le logo */}
        <div className="hidden md:flex justify-center mb-3 sm:mb-4 md:mb-6">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-10 h-10 sm:w-12 sm:h-12 hover:bg-emerald-600 dark:hover:bg-gray-800 active:bg-emerald-700 rounded-lg transition-all duration-300 ease-in-out group flex items-center justify-center"
            aria-label={isCollapsed ? "Agrandir la sidebar" : "Réduire la sidebar"}
            title={isCollapsed ? "Agrandir la sidebar" : "Réduire la sidebar"}
          >
            {isCollapsed ? (
              <ChevronsRight 
                className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-100 dark:text-gray-300 group-hover:text-white group-hover:scale-110 transition-all" 
              />
            ) : (
              <ChevronsLeft 
                className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-100 dark:text-gray-300 group-hover:text-white group-hover:scale-110 transition-all" 
              />
            )}
          </button>
        </div>

        {/* Menu principal - Responsive scroll */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-invisible">
          <ul className="space-y-0.5 sm:space-y-1 md:space-y-2">
            {sections.map((section, sectionIndex) => (
              <li key={section.id}>
                {/* Label de section (sauf overview) - Visible sur mobile */}
                {section.label && (
                  <>
                    {/* Séparateur responsive */}
                    {sectionIndex > 0 && !isCollapsed && <div className="border-t border-emerald-400/20 dark:border-gray-600/30 my-1.5 sm:my-2 md:my-3"></div>}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full px-2 sm:px-3 md:px-4 py-1.5 md:py-2 text-[10px] sm:text-xs font-semibold text-white dark:text-gray-200 uppercase tracking-wider hover:text-emerald-50 dark:hover:text-white active:text-emerald-50 transition-colors flex items-center justify-between group text-left min-h-[36px] ${
                        !isOpen && isCollapsed ? 'md:hidden' : ''
                      }`}
                    >
                      <span className="truncate">{section.label}</span>
                      {expandedSections[section.id] ? (
                        <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white dark:text-gray-300 group-hover:text-emerald-50 dark:group-hover:text-white flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white dark:text-gray-300 group-hover:text-emerald-50 dark:group-hover:text-white flex-shrink-0" />
                      )}
                    </button>
                  </>
                )}
                
                {/* Séparateur visuel en mode collapsed - Desktop uniquement */}
                {section.label && !isOpen && isCollapsed && sectionIndex > 0 && (
                  <div className="hidden md:block border-t border-emerald-400/20 dark:border-gray-600/30 my-1.5 sm:my-2 mx-auto w-12"></div>
                )}
                
                {/* Items de la section - Affichés seulement si expanded ou pas de label */}
                {(!section.label || expandedSections[section.id] || (!isOpen && isCollapsed)) && (
                  <ul className="space-y-0.5 sm:space-y-0.5 md:space-y-1">
                    {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        {/* Touch targets et padding responsive */}
                        <button
                          onClick={() => handleMenuClick(item.id)}
                          className={`w-full flex items-center rounded-lg transition-colors min-h-[44px] ${
                            currentView === item.id
                              ? 'bg-emerald-700 dark:bg-emerald-900/50 text-white shadow-lg'
                              : 'text-white dark:text-gray-200 hover:bg-emerald-600 dark:hover:bg-gray-800 hover:text-emerald-50 dark:hover:text-white active:bg-emerald-700'
                          } ${!isOpen && isCollapsed ? 'md:justify-center md:p-2.5 md:p-3 justify-between px-2.5 sm:px-3 py-2.5' : 'justify-between px-2.5 sm:px-3 py-2.5 md:px-4 md:py-3'}`}
                          title={!isOpen && isCollapsed ? item.label : ''}
                        >
                          <div className={`flex items-center ${!isOpen && isCollapsed ? 'md:space-x-0 space-x-1.5 sm:space-x-2 md:space-x-3' : 'space-x-1.5 sm:space-x-2 md:space-x-3'}`}>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className={`text-xs sm:text-sm truncate ${!isOpen && isCollapsed ? 'md:hidden' : ''}`}>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[10px] sm:text-xs bg-emerald-700 dark:bg-emerald-800 px-1.5 sm:px-2 py-0.5 md:py-1 rounded flex-shrink-0 ${!isOpen && isCollapsed ? 'md:hidden' : ''}`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
