import { createContext, useContext, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useObjectives } from '../hooks/useObjectives';

const ProductsContext = createContext(null);

/**
 * ProductsProvider - Contexte pour les produits et objectifs
 * Gère les produits et leurs objectifs (OKR)
 */
export const ProductsProvider = ({ children, showNotification }) => {
  const products = useProducts(showNotification);
  const objectives = useObjectives(showNotification);

  const value = useMemo(() => ({
    // Données
    products: products.products,
    objectives: objectives.objectives,
    
    // Actions
    productsActions: {
      add: products.addProduct,
      update: products.updateProduct,
      delete: products.deleteProduct,
      import: products.importProducts,
      refresh: products.refreshProducts
    },
    objectivesActions: {
      add: objectives.addObjective,
      update: objectives.updateObjective,
      delete: objectives.deleteObjective,
      import: objectives.importObjectives,
      refresh: objectives.refreshObjectives
    }
  }), [
    products.products,
    objectives.objectives,
    products.addProduct,
    products.updateProduct,
    products.deleteProduct,
    products.importProducts,
    products.refreshProducts,
    objectives.addObjective,
    objectives.updateObjective,
    objectives.deleteObjective,
    objectives.importObjectives,
    objectives.refreshObjectives
  ]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

/**
 * Hook pour consommer le ProductsContext
 * Utilisation : const { products, objectives, productsActions, objectivesActions } = useProductsContext();
 */
export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within ProductsProvider');
  }
  return context;
};
