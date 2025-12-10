import { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  Building2, 
  FolderKanban, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const CustomListsSettings = ({ settings, onUpdateSettings }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [addingTo, setAddingTo] = useState(null);
  const [newItemValue, setNewItemValue] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    lists: true,
    info: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Configuration des listes
  const listTypes = {
    roles: {
      id: 'roles',
      label: 'Rôles / Postes',
      icon: Users,
      color: '#6366f1',
      key: 'roles'
    },
    companies: {
      id: 'companies',
      label: 'Entreprises',
      icon: Building2,
      color: '#8b5cf6',
      key: 'companies'
    },
    departments: {
      id: 'departments',
      label: 'Départements',
      icon: FolderKanban,
      color: '#06b6d4',
      key: 'departments'
    }
  };

  // Statistiques
  const stats = {
    roles: settings.roles?.length || 0,
    companies: settings.companies?.length || 0,
    departments: settings.departments?.length || 0
  };

  // Gestion ajout depuis les cards
  const handleStartAdding = (listKey) => {
    setAddingTo(listKey);
    setNewItemValue('');
  };

  const handleCancelAdding = () => {
    setAddingTo(null);
    setNewItemValue('');
  };

  const handleSaveNewItem = (listKey) => {
    if (newItemValue.trim()) {
      const currentItems = settings[listKey] || [];
      const updatedItems = [...currentItems, newItemValue.trim()].sort();
      const newSettings = { ...settings, [listKey]: updatedItems };
      onUpdateSettings(newSettings);
      setAddingTo(null);
      setNewItemValue('');
    }
  };

  // Gestion édition
  const handleEditItem = (item) => {
    setEditingItem(item);
    setEditValue(item);
  };

  const handleSaveEdit = (oldItem, listKey) => {
    if (editValue.trim() && editValue.trim() !== oldItem) {
      const currentItems = settings[listKey] || [];
      const updatedItems = currentItems.map(i => i === oldItem ? editValue.trim() : i).sort();
      const newSettings = { ...settings, [listKey]: updatedItems };
      onUpdateSettings(newSettings);
    }
    setEditingItem(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditValue('');
  };

  // Gestion suppression
  const handleDeleteItem = (item, listKey) => {
    if (window.confirm(`Supprimer "${item}" ?\n\nCet élément sera retiré de la liste mais restera dans les enregistrements existants.`)) {
      const currentItems = settings[listKey] || [];
      const updatedItems = currentItems.filter(i => i !== item);
      const newSettings = { ...settings, [listKey]: updatedItems };
      onUpdateSettings(newSettings);
    }
  };



  // Composant ListCard
  const ListCard = ({ listKey, icon: Icon, title, color, badgeColor, borderColor }) => {
    const items = settings[listKey] || [];
    const count = items.length;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Icon size={20} style={{ color }} />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
          </div>
          <span className={`px-3 py-1 ${badgeColor} dark:bg-opacity-20 rounded-full text-sm font-bold`}>
            {count}
          </span>
        </div>
        
        {count === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">Aucun élément défini</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {items.map((item, index) => (
              <li 
                key={index}
                className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
              >
                {editingItem === item ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className={`flex-1 px-2 py-1 border-2 ${borderColor} dark:border-opacity-50 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(item, listKey);
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                    />
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => handleSaveEdit(item, listKey)}
                        className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                        title="Enregistrer"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Annuler"
                      >
                        ×
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-gray-700 dark:text-gray-200 font-medium text-sm flex items-center gap-2 flex-1">
                      {listKey !== 'roles' && <Icon size={14} style={{ color }} />}
                      {item}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item, listKey)}
                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        
        {addingTo === listKey ? (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              placeholder={`Ex: ${listKey === 'roles' ? 'Product Owner...' : listKey === 'companies' ? 'Acme Corp...' : 'IT, Marketing...'}`}
              className={`flex-1 px-3 py-2 border-2 ${borderColor} dark:border-opacity-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveNewItem(listKey);
                if (e.key === 'Escape') handleCancelAdding();
              }}
            />
            <button
              onClick={() => handleSaveNewItem(listKey)}
              className={`px-3 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm shadow-md`}
              style={{ backgroundColor: color }}
              title="Enregistrer"
            >
              ✓
            </button>
            <button
              onClick={handleCancelAdding}
              className="px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm"
              title="Annuler"
            >
              ×
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleStartAdding(listKey)}
            className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium`}
            style={{ color, backgroundColor: `${color}15` }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${color}25`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${color}15`}
          >
            <Plus size={16} />
            Ajouter {listKey === 'roles' ? 'un rôle' : listKey === 'companies' ? 'une entreprise' : 'un département'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Listes Personnalisées */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('lists')}
          className="w-full p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-between hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900 dark:hover:to-teal-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Listes personnalisées
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Gérez vos référentiels : rôles, entreprises, départements
              </p>
            </div>
          </div>
          {expandedSections.lists ? (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
        
        {expandedSections.lists && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ListCard
                listKey="roles"
                icon={Users}
                title="Rôles / Postes"
                color="#6366f1"
                badgeColor="bg-blue-100 text-blue-800 dark:text-blue-200"
                borderColor="border-indigo-300 dark:border-indigo-600"
              />
              <ListCard
                listKey="companies"
                icon={Building2}
                title="Entreprises"
                color="#8b5cf6"
                badgeColor="bg-purple-100 text-purple-800 dark:text-purple-200"
                borderColor="border-purple-300 dark:border-purple-600"
              />
              <ListCard
                listKey="departments"
                icon={FolderKanban}
                title="Départements"
                color="#06b6d4"
                badgeColor="bg-teal-100 text-teal-800 dark:text-teal-200"
                borderColor="border-teal-300 dark:border-teal-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* Note d'information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('info')}
          className="w-full p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 flex items-center justify-between hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900 dark:hover:to-cyan-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="text-2xl">💡</div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                À propos des listes personnalisées
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Informations utiles sur le fonctionnement des listes
              </p>
            </div>
          </div>
          {expandedSections.info ? (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
        
        {expandedSections.info && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span>Ces listes sont utilisées dans les formulaires de <strong>contacts</strong> et d'<strong>entretiens</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span>Les modifications sont <strong>automatiquement sauvegardées</strong> dans le LocalStorage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span>Les éléments supprimés <strong>restent dans les enregistrements existants</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span>Les listes sont <strong>exportées avec vos autres données</strong> lors d'une sauvegarde</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomListsSettings;
