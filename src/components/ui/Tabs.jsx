import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Tabs - Système d'onglets réutilisable
 * 
 * Composant qui gère l'affichage et la navigation entre onglets.
 * Conserve le style Tailwind existant de l'application.
 * 
 * @component
 * @example
 * <Tabs defaultTab="tab1">
 *   <Tab id="tab1" label="Premier onglet" icon={Icon}>
 *     Contenu du premier onglet
 *   </Tab>
 *   <Tab id="tab2" label="Deuxième onglet">
 *     Contenu du deuxième onglet
 *   </Tab>
 * </Tabs>
 */

/**
 * Tab - Composant individuel d'onglet
 * Utilisé comme enfant du composant Tabs
 * @param {boolean} disabled - Si true, l'onglet est désactivé
 */
export const Tab = ({ children }) => {
  return <>{children}</>;
};

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  disabledMessage: PropTypes.string,
  children: PropTypes.node.isRequired
};

/**
 * Tabs - Conteneur principal des onglets
 */
export const Tabs = ({ children, defaultTab, onChange }) => {
  const tabs = Array.isArray(children) ? children : [children];
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.props.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const activeTabContent = tabs.find(tab => tab.props.id === activeTab);

  return (
    <div className="w-full">
      {/* En-têtes des onglets */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.props.icon;
            const isActive = activeTab === tab.props.id;
            const badge = tab.props.badge;
            const isDisabled = tab.props.disabled;
            const disabledMessage = tab.props.disabledMessage;

            return (
              <button
                key={tab.props.id}
                type="button"
                onClick={() => !isDisabled && handleTabChange(tab.props.id)}
                disabled={isDisabled}
                title={isDisabled ? disabledMessage : undefined}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                  border-b-2 transition-colors
                  ${isDisabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed opacity-50'
                    : isActive
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                  }
                `}
              >
                {Icon && <Icon size={16} className="flex-shrink-0" />}
                <span>{tab.props.label}</span>
                {badge && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded-full font-medium">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="pt-6">
        {activeTabContent?.props.children}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTab: PropTypes.string,
  onChange: PropTypes.func
};

export default Tabs;
