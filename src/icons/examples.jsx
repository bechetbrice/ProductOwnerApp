/**
 * 🎨 Exemples d'utilisation du système d'icônes
 * 
 * Ce fichier contient des exemples concrets d'utilisation
 * du système d'icônes dans différents contextes.
 */

import React from 'react';
import { 
  Icon, 
  ModuleIcon, 
  ActionIcon, 
  StatusIcon,
  QuickIcon 
} from './icons';
import { moduleIcons, actionIcons, statusIcons } from './icons';

// ==============================================
// EXEMPLE 1 : BOUTON AVEC ICÔNE
// ==============================================

export const ExampleButton = () => (
  <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
    <ActionIcon name="add" size="sm" />
    <span>Ajouter un élément</span>
  </button>
);

// ==============================================
// EXEMPLE 2 : HEADER DE CARTE
// ==============================================

export const ExampleCardHeader = () => (
  <div className="flex items-center gap-4 mb-4">
    <ModuleIcon name="userStories" size="2xl" />
    <div className="flex-1">
      <h2 className="text-xl font-bold">User Stories</h2>
      <p className="text-sm text-gray-600">Gérez vos user stories</p>
    </div>
    <StatusIcon name="active" size="lg" />
  </div>
);

// ==============================================
// EXEMPLE 3 : LISTE DE NAVIGATION
// ==============================================

export const ExampleNavMenu = () => {
  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'contacts', icon: 'contacts', label: 'Contacts' },
    { id: 'teams', icon: 'teams', label: 'Équipes' },
    { id: 'userStories', icon: 'userStories', label: 'User Stories' }
  ];

  return (
    <nav>
      <ul className="space-y-2">
        {menuItems.map(item => (
          <li key={item.id}>
            <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg">
              <ModuleIcon name={item.icon} size="md" />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// ==============================================
// EXEMPLE 4 : BADGES DE STATUT
// ==============================================

export const ExampleStatusBadge = ({ status }) => {
  const statusConfig = {
    active: { emoji: statusIcons.active, label: 'Actif', color: 'bg-green-100 text-green-800' },
    inactive: { emoji: statusIcons.inactive, label: 'Inactif', color: 'bg-gray-100 text-gray-800' },
    pending: { emoji: statusIcons.pending, label: 'En attente', color: 'bg-yellow-100 text-yellow-800' }
  };

  const config = statusConfig[status] || statusConfig.inactive;

  return (
    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <QuickIcon emoji={config.emoji} size="xs" />
      <span>{config.label}</span>
    </span>
  );
};

// ==============================================
// EXEMPLE 5 : ACTIONS DE CARTE
// ==============================================

export const ExampleCardActions = ({ onEdit, onDelete }) => (
  <div className="flex items-center gap-2">
    <button 
      onClick={onEdit}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      title="Modifier"
    >
      <ActionIcon name="edit" size="sm" />
    </button>
    <button 
      onClick={onDelete}
      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
      title="Supprimer"
    >
      <ActionIcon name="delete" size="sm" />
    </button>
  </div>
);

// ==============================================
// EXEMPLE 6 : ÉTAT VIDE
// ==============================================

export const ExampleEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <QuickIcon emoji="📭" size="4xl" className="mb-4 opacity-50" />
    <h3 className="text-lg font-semibold text-gray-700 mb-2">
      Aucun élément
    </h3>
    <p className="text-sm text-gray-500 mb-4">
      Commencez par créer votre premier élément
    </p>
    <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
      <ActionIcon name="add" size="sm" />
      <span>Créer un élément</span>
    </button>
  </div>
);

// ==============================================
// EXEMPLE 7 : PRIORITÉS MOSCOW
// ==============================================

export const ExampleMoscowPriority = ({ priority }) => {
  const priorityConfig = {
    mustHave: { emoji: statusIcons.mustHave, label: 'Must Have', color: 'text-red-600' },
    shouldHave: { emoji: statusIcons.shouldHave, label: 'Should Have', color: 'text-yellow-600' },
    couldHave: { emoji: statusIcons.couldHave, label: 'Could Have', color: 'text-green-600' },
    wontHave: { emoji: statusIcons.wontHave, label: "Won't Have", color: 'text-gray-600' }
  };

  const config = priorityConfig[priority];

  return (
    <div className={`flex items-center gap-2 font-medium ${config.color}`}>
      <QuickIcon emoji={config.emoji} size="md" />
      <span>{config.label}</span>
    </div>
  );
};

// ==============================================
// EXEMPLE 8 : MÉTRIQUES DASHBOARD
// ==============================================

export const ExampleMetricCard = ({ title, value, trend }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <QuickIcon emoji="📈" size="lg" className="text-gray-400" />
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">
      {value}
    </div>
    <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
      <QuickIcon emoji={trend > 0 ? '⬆️' : '⬇️'} size="xs" />
      <span>{Math.abs(trend)}%</span>
    </div>
  </div>
);

// ==============================================
// EXEMPLE 9 : FILTRES
// ==============================================

export const ExampleFilterBar = ({ search, onSearchChange }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex items-center gap-3">
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <ActionIcon name="search" size="sm" className="text-gray-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <ActionIcon name="filter" size="md" />
      </button>
    </div>
  </div>
);

// ==============================================
// EXEMPLE 10 : TABS
// ==============================================

export const ExampleTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', emoji: '🏠', count: 12 },
    { id: 'details', label: 'Détails', emoji: '📄', count: 5 },
    { id: 'history', label: 'Historique', emoji: '⏱️', count: 8 }
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <QuickIcon emoji={tab.emoji} size="sm" />
            <span className="font-medium">{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id
                ? 'bg-indigo-100 text-indigo-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ==============================================
// EXEMPLE 11 : DRAG & DROP CARD
// ==============================================

export const ExampleDraggableCard = ({ item, isDragging }) => (
  <div
    className={`bg-white rounded-lg shadow p-4 cursor-move ${
      isDragging ? 'opacity-50 rotate-2' : ''
    }`}
  >
    <div className="flex items-start gap-3 mb-3">
      <QuickIcon emoji={item.emoji} size="xl" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <ExampleStatusBadge status={item.status} />
      <ExampleCardActions onEdit={() => {}} onDelete={() => {}} />
    </div>
  </div>
);

// ==============================================
// EXEMPLE 12 : TIMELINE
// ==============================================

export const ExampleTimeline = ({ events }) => (
  <div className="space-y-4">
    {events.map((event, index) => (
      <div key={index} className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <QuickIcon emoji={event.emoji} size="md" />
          </div>
          {index < events.length - 1 && (
            <div className="w-0.5 h-full bg-gray-200 my-2"></div>
          )}
        </div>
        <div className="flex-1 pb-8">
          <h4 className="font-semibold text-gray-900">{event.title}</h4>
          <p className="text-sm text-gray-600">{event.description}</p>
          <span className="text-xs text-gray-400">{event.date}</span>
        </div>
      </div>
    ))}
  </div>
);

// ==============================================
// EXPORT DES EXEMPLES
// ==============================================

export default {
  ExampleButton,
  ExampleCardHeader,
  ExampleNavMenu,
  ExampleStatusBadge,
  ExampleCardActions,
  ExampleEmptyState,
  ExampleMoscowPriority,
  ExampleMetricCard,
  ExampleFilterBar,
  ExampleTabs,
  ExampleDraggableCard,
  ExampleTimeline
};
