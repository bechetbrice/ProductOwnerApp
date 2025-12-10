import { createContext, useContext, useMemo } from 'react';
import { useOthers } from '../hooks/useOthers';

const BudgetContext = createContext(null);

/**
 * BudgetProvider - Contexte pour la gestion budgétaire
 * Gère les lignes budgétaires et leur suivi
 */
export const BudgetProvider = ({ children, showNotification }) => {
  const others = useOthers(showNotification);

  const value = useMemo(() => ({
    // Données
    budgetEntries: others.budgetEntries,
    
    // Actions
    budgetActions: {
      add: others.addBudgetEntry,
      update: others.updateBudgetEntry,
      delete: others.deleteBudgetEntry,
      refresh: others.refreshAll
    }
  }), [
    others.budgetEntries,
    others.addBudgetEntry,
    others.updateBudgetEntry,
    others.deleteBudgetEntry,
    others.refreshAll
  ]);

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};

/**
 * Hook pour consommer le BudgetContext
 * Utilisation : const { budgetEntries, budgetActions } = useBudgetContext();
 */
export const useBudgetContext = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgetContext must be used within BudgetProvider');
  }
  return context;
};
