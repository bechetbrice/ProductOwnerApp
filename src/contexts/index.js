/**
 * Export centralisé de tous les contexts
 * Facilite les imports dans les composants
 * 
 * Usage :
 * import { useProductsContext, useContactsContext } from '../contexts';
 */

// Contexts existants (inchangés)
export { PreferencesProvider, usePreferences } from './PreferencesContext';
export { NavigateProvider, useNavigate } from './NavigateContext';
export { AutoExportProvider, useAutoExport } from './AutoExportContext';

// Nouveaux contexts (split de AppContext)
export { ProductsProvider, useProductsContext } from './ProductsContext';
export { ContactsProvider, useContactsContext } from './ContactsContext';
export { DiscoveryProvider, useDiscoveryContext } from './DiscoveryContext';
export { BacklogProvider, useBacklogContext } from './BacklogContext';
export { ExecutionProvider, useExecutionContext } from './ExecutionContext';
export { BudgetProvider, useBudgetContext } from './BudgetContext';
export { SettingsProvider, useSettingsContext } from './SettingsContext';

// AppContext supprimé - Migration Context Split terminée ✅
