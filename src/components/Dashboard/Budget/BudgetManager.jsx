import { useState } from 'react';
import BudgetEntryForm from './BudgetEntryForm';
import BudgetTable from './BudgetTable';

/**
 * BudgetManager - Gestion du budget
 * Affichage simple des données budget déjà filtrées par le Dashboard
 * 
 * ✅ RESPONSIVE : Structure cohérente avec les autres onglets Dashboard
 */
const BudgetManager = ({ 
  budgetEntries, 
  onAddBudgetEntry, 
  onUpdateBudgetEntry, 
  onDeleteBudgetEntry,
  products,
  sprints,
  isFormOpen,
  setIsFormOpen
}) => {
  const [editingEntry, setEditingEntry] = useState(null);

  const handleSaveEntry = (entryData) => {
    if (editingEntry) {
      onUpdateBudgetEntry(editingEntry.id, entryData);
    } else {
      onAddBudgetEntry(entryData);
    }
    setIsFormOpen(false);
    setEditingEntry(null);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingEntry(null);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Tableau budgétaire - Grid responsive */}
      <BudgetTable
        entries={budgetEntries}
        products={products}
        sprints={sprints}
        onEdit={handleEditEntry}
        onDelete={onDeleteBudgetEntry}
        onUpdateBudgetEntry={onUpdateBudgetEntry}
      />
          
      {/* Formulaire Modal */}
      {isFormOpen && (
        <BudgetEntryForm
          entry={editingEntry}
          products={products}
          sprints={sprints}
          onSave={handleSaveEntry}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default BudgetManager;
