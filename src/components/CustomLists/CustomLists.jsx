import { useState } from 'react';
import { Plus, Edit2, Trash2, Download, Filter, List, Users, Building2, FolderKanban, Upload } from 'lucide-react';

const CustomLists = ({ settings, onUpdateSettings }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [addingTo, setAddingTo] = useState(null);
  const [newItemValue, setNewItemValue] = useState('');

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

  const totalItems = stats.roles + stats.companies + stats.departments;

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

  // Export CSV - Toutes les listes
  const handleExportCSV = () => {
    const allItems = [];
    Object.entries(listTypes).forEach(([key, list]) => {
      const items = settings[key] || [];
      items.forEach(item => {
        allItems.push({ type: list.label, value: item });
      });
    });

    const csv = [
      ['Type', 'Valeur'].join(','),
      ...allItems.map(item => [item.type, `"${item.value}"`].join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `listes-personnalisees-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Import CSV
  const handleImportCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          alert('Le fichier CSV est vide ou invalide');
          return;
        }
        
        // Ignorer la ligne d'en-tête
        const dataLines = lines.slice(1);
        const newItems = {
          roles: [],
          companies: [],
          departments: []
        };
        const errors = [];
        
        dataLines.forEach((line, index) => {
          try {
            // Parser la ligne CSV (gérer les guillemets)
            const values = [];
            let inQuotes = false;
            let currentValue = '';
            
            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
              } else {
                currentValue += char;
              }
            }
            values.push(currentValue.trim());
            
            if (values.length < 2) {
              errors.push(`Ligne ${index + 2}: Nombre de colonnes insuffisant`);
              return;
            }
            
            const [type, value] = values;
            
            if (!value || !value.trim()) {
              errors.push(`Ligne ${index + 2}: Valeur manquante`);
              return;
            }
            
            const cleanValue = value.replace(/^"|"$/g, '').trim();
            
            // Mapper le type vers la clé
            let targetKey = null;
            const typeLower = type.toLowerCase();
            
            if (typeLower.includes('rôle') || typeLower.includes('poste')) {
              targetKey = 'roles';
            } else if (typeLower.includes('entreprise') || typeLower.includes('organisation')) {
              targetKey = 'companies';
            } else if (typeLower.includes('département') || typeLower.includes('service')) {
              targetKey = 'departments';
            }
            
            if (!targetKey) {
              errors.push(`Ligne ${index + 2}: Type "${type}" non reconnu`);
              return;
            }
            
            // Ajouter l'élément s'il n'existe pas déjà
            if (!newItems[targetKey].includes(cleanValue)) {
              newItems[targetKey].push(cleanValue);
            }
          } catch (err) {
            errors.push(`Ligne ${index + 2}: Erreur de parsing - ${err.message}`);
          }
        });
        
        const totalNew = newItems.roles.length + newItems.companies.length + newItems.departments.length;
        
        if (errors.length > 0) {
          const showErrors = confirm(
            `${errors.length} erreur(s) détectée(s):\n${errors.slice(0, 5).join('\n')}${errors.length > 5 ? '\n...' : ''}\n\nVoulez-vous importer les éléments valides (${totalNew}) ?`
          );
          if (!showErrors) return;
        }
        
        if (totalNew === 0) {
          alert('Aucun élément valide trouvé dans le fichier');
          return;
        }
        
        // Fusionner avec les listes existantes
        const updatedSettings = { ...settings };
        let addedCount = 0;
        
        Object.keys(newItems).forEach(key => {
          const existingItems = settings[key] || [];
          const itemsToAdd = newItems[key].filter(item => !existingItems.includes(item));
          
          if (itemsToAdd.length > 0) {
            updatedSettings[key] = [...existingItems, ...itemsToAdd].sort();
            addedCount += itemsToAdd.length;
          }
        });
        
        if (addedCount === 0) {
          alert('ℹ️ Aucun nouvel élément ajouté.\n\nTous les éléments du fichier existent déjà dans vos listes.');
          return;
        }
        
        onUpdateSettings(updatedSettings);
        
        const summary = [
          `✅ Import réussi !`,
          ``,
          `${addedCount} nouvel/nouveaux élément(s) ajouté(s) :`,
          newItems.roles.length > 0 ? `  • Rôles: ${newItems.roles.length}` : '',
          newItems.companies.length > 0 ? `  • Entreprises: ${newItems.companies.length}` : '',
          newItems.departments.length > 0 ? `  • Départements: ${newItems.departments.length}` : '',
          ``,
          totalNew - addedCount > 0 ? `🔄 ${totalNew - addedCount} doublon(s) ignoré(s)` : '',
          errors.length > 0 ? `⚠️ ${errors.length} ligne(s) en erreur` : ''
        ].filter(Boolean).join('\n');
        
        alert(summary);
        
      } catch (err) {
        console.error('Erreur lors de l\'import CSV:', err);
        alert('❌ Erreur lors de la lecture du fichier CSV\n\nAssurez-vous que le fichier est au bon format.');
      }
    };
    
    input.click();
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, onClick }) => (
    <div 
      className="bg-white rounded-lg shadow p-6 border-l-4 cursor-pointer transition-all hover:shadow-lg hover:scale-102"
      style={{ borderLeftColor: color }}
      onClick={onClick}
      title={`${title}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  // Composant pour afficher une liste dans une card
  const ListCard = ({ listKey, icon: Icon, title, color, badgeColor, borderColor }) => {
    const items = settings[listKey] || [];
    const count = items.length;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Icon size={20} style={{ color }} />
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          <span className={`px-3 py-1 ${badgeColor} rounded-full text-sm font-bold`}>
            {count}
          </span>
        </div>
        
        {count === 0 ? (
          <p className="text-gray-500 text-sm italic">Aucun élément défini</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {items.map((item, index) => (
              <li 
                key={index}
                className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                {editingItem === item ? (
                  // Mode édition inline
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className={`flex-1 px-2 py-1 border-2 ${borderColor} rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(item, listKey);
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                    />
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => handleSaveEdit(item, listKey)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Enregistrer"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Annuler"
                      >
                        ×
                      </button>
                    </div>
                  </>
                ) : (
                  // Mode affichage
                  <>
                    <span className="text-gray-700 font-medium text-sm flex items-center gap-2 flex-1">
                      {listKey !== 'roles' && <Icon size={14} style={{ color }} />}
                      {item}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item, listKey)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
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
        
        {/* Bouton/Formulaire Ajouter */}
        {addingTo === listKey ? (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              placeholder={`Ex: ${listKey === 'roles' ? 'Product Owner...' : listKey === 'companies' ? 'Acme Corp...' : 'IT, Marketing...'}`}
              className={`flex-1 px-3 py-2 border-2 ${borderColor} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveNewItem(listKey);
                if (e.key === 'Escape') handleCancelAdding();
              }}
            />
            <button
              onClick={() => handleSaveNewItem(listKey)}
              className={`px-3 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm`}
              style={{ backgroundColor: color }}
              title="Enregistrer"
            >
              ✓
            </button>
            <button
              onClick={handleCancelAdding}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
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
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-6">
          <StatCard
            icon={Users}
            title="Rôles / Postes"
            value={stats.roles}
            subtitle="Fonctions contacts"
            color="#6366f1"
            onClick={() => {}}
          />
          <StatCard
            icon={Building2}
            title="Entreprises"
            value={stats.companies}
            subtitle="Organisations"
            color="#8b5cf6"
            onClick={() => {}}
          />
          <StatCard
            icon={FolderKanban}
            title="Départements"
            value={stats.departments}
            subtitle="Services internes"
            color="#06b6d4"
            onClick={() => {}}
          />
          <StatCard
            icon={List}
            title="Total"
            value={totalItems}
            subtitle="Tous éléments"
            color="#10b981"
            onClick={() => {}}
          />
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* MODULE ACTIONS */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Filter size={20} />
              Actions
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleImportCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                aria-label="Importer des listes depuis un fichier CSV"
              >
                <Upload size={18} />
                Import CSV
              </button>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                disabled={totalItems === 0}
              >
                <Download size={18} />
                Export CSV ({totalItems})
              </button>
            </div>
          </div>
        </div>

        {/* LISTES PERSONNALISÉES : 3 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <ListCard
            listKey="roles"
            icon={Users}
            title="Rôles / Postes"
            color="#6366f1"
            badgeColor="bg-blue-100 text-blue-800"
            borderColor="border-indigo-300"
          />
          <ListCard
            listKey="companies"
            icon={Building2}
            title="Entreprises"
            color="#8b5cf6"
            badgeColor="bg-purple-100 text-purple-800"
            borderColor="border-purple-300"
          />
          <ListCard
            listKey="departments"
            icon={FolderKanban}
            title="Départements"
            color="#06b6d4"
            badgeColor="bg-teal-100 text-teal-800"
            borderColor="border-teal-300"
          />
        </div>

        {/* Note d'information */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">
                À propos des listes personnalisées
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Ces listes sont utilisées dans les formulaires de <strong>contacts</strong> et d'<strong>entretiens</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Les modifications sont <strong>automatiquement sauvegardées</strong> dans le LocalStorage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Les éléments supprimés <strong>restent dans les enregistrements existants</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Les listes sont <strong>exportées avec vos autres données</strong> lors d'une sauvegarde</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLists;
