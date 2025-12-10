import { useState, useEffect, useCallback } from 'react';
import { Products } from '../utils/storage';

export const useProducts = (showNotification) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(() => {
    const data = Products.get();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddProduct = useCallback((productData) => {
    const newProduct = Products.add(productData);
    setProducts(prev => [...prev, newProduct]);
    if (showNotification) {
      showNotification('Produit créé avec succès', 'success');
    }
    return newProduct;
  }, [showNotification]);

  const handleUpdateProduct = useCallback((id, updates) => {
    const updated = Products.update(id, updates);
    if (updated) {
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
      if (showNotification) {
        showNotification('Produit mis à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteProduct = useCallback((id) => {
    Products.remove(id);
    setProducts(prev => prev.filter(p => p.id !== id));
    if (showNotification) {
      showNotification('Produit supprimé', 'success');
    }
  }, [showNotification]);

  const handleImportProducts = useCallback(async (productsToImport) => {
    try {
      const newProducts = Products.addMany(productsToImport);
      setProducts(Products.get());
      
      if (newProducts.length > 0 && showNotification) {
        showNotification(`${newProducts.length} produit(s) importé(s) avec succès`, 'success');
      }
      
      return newProducts.length;
    } catch (error) {
      console.error('Erreur lors de l\'import des produits:', error);
      if (showNotification) {
        showNotification('Erreur lors de l\'import', 'error');
      }
      return 0;
    }
  }, [showNotification]);

  return {
    products,
    loading,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    importProducts: handleImportProducts,
    refreshProducts: loadProducts
  };
};
