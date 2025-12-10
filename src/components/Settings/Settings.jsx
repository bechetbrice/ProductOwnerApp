import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  ListOrdered,
  Scale
} from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import CustomListsSettings from './CustomListsSettings';
import LegalSettings from './LegalSettings';

const Settings = ({ 
  settings: propsSettings,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState('general');
  
  const settings = propsSettings || { roles: [], companies: [], departments: [] };

  const tabs = [
    { 
      id: 'general', 
      label: 'Général', 
      icon: SettingsIcon,
      tooltip: 'Préférences et export automatique'
    },
    { 
      id: 'customLists', 
      label: 'Listes Personnalisées', 
      icon: ListOrdered,
      tooltip: 'Gestion des référentiels personnalisés'
    },
    { 
      id: 'legal', 
      label: 'Mentions Légales', 
      icon: Scale,
      tooltip: 'Informations légales, droits d\'auteur et licence'
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general':
        return <GeneralSettings />;
        
      case 'customLists':
        return (
          <CustomListsSettings 
            settings={settings}
            onUpdateSettings={onUpdateSettings}
          />
        );
        
      case 'legal':
        return <LegalSettings />;
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex gap-4 sm:gap-8 overflow-x-auto pb-px scrollbar-hide">
              {tabs.map(tab => {
                const Icon = tab.icon;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    title={tab.tooltip}
                    className={`
                      py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                      flex items-center gap-2 flex-shrink-0
                      ${activeTab === tab.id
                        ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">
                      {tab.id === 'customLists' ? 'Listes' : tab.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
