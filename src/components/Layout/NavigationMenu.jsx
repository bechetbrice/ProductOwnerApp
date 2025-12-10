import { useState, useRef, useEffect } from 'react';
import { Settings, HelpCircle, BookOpen, Map, ChevronDown } from 'lucide-react';

/**
 * NavigationMenu - Menu de navigation principal du Header
 * Permet d'accéder aux sections FAQ, Wiki et Paramètres
 */
const NavigationMenu = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const menuItems = [
    { 
      id: 'roadmap', 
      label: 'Roadmap', 
      icon: Map,
      description: 'Vision et planification produit'
    },
    { 
      id: 'wiki', 
      label: 'Wiki', 
      icon: BookOpen,
      description: 'Documentation des modules'
    },
    { 
      id: 'faq', 
      label: 'FAQ', 
      icon: HelpCircle,
      description: 'Questions fréquentes'
    },
    { 
      id: 'settings', 
      label: 'Paramètres', 
      icon: Settings,
      description: 'Configuration de l\'application'
    }
  ];

  const handleItemClick = (viewId) => {
    onNavigate(viewId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Bouton Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors text-white"
        aria-label="Menu de navigation"
        aria-expanded={isOpen}
      >
        <Settings size={18} className="md:w-5 md:h-5" />
        <span className="hidden md:inline text-sm font-medium">Menu</span>
        <ChevronDown 
          size={16} 
          className={`hidden md:inline transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                    isActive ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`flex-shrink-0 mt-0.5 ${
                      isActive 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      isActive 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
