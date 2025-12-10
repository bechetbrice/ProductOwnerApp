import { useState, useMemo } from 'react';
import { Package } from 'lucide-react';
import ProductForm from './ProductForm';
import ProductDetail from './ProductDetail';
import ProductCard from './ProductCard';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, VirtualizedList, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

const ProductsManager = ({ 
  products, 
  Objectives,
  userNeeds,
  userStories,
  contacts,
  interviews,
  onAdd, 
  onUpdate, 
  onDelete,
  onNavigateToView
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const productsPerPage = 500; // Virtualisation active au-delà de 20 items
  
  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = (productData) => {
    if (editingProduct) {
      onUpdate(editingProduct.id, productData);
    } else {
      onAdd(productData);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = (productId) => {
    const hasGoals = Objectives?.some(g => g.productId === productId);
    const product = products.find(p => p.id === productId);
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer le produit',
      message: hasGoals
        ? `Ce produit contient des objectifs. Êtes-vous sûr de vouloir le supprimer ?\n\nTous les objectifs liés seront également supprimés.`
        : `Êtes-vous sûr de vouloir supprimer le produit "${product?.name}" ?`,
      onConfirm: () => {
        onDelete(productId);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const productsWithStats = useMemo(() => {
    return products.map(product => {
      const needsCount = userNeeds?.filter(n => n.productId === product.id).length || 0;
      const storiesCount = userStories?.filter(s => s.productId === product.id).length || 0;
      const contactsCount = contacts?.filter(c => c.productIds?.includes(product.id)).length || 0;
      const interviewsCount = interviews?.filter(i => i.productId === product.id).length || 0;
      const goalsCount = Objectives?.filter(g => g.productId === product.id).length || 0;
      const activeGoalsCount = Objectives?.filter(g => g.productId === product.id && g.status === 'active').length || 0;

      return {
        ...product,
        stats: {
          needs: needsCount,
          stories: storiesCount,
          contacts: contactsCount,
          interviews: interviewsCount,
          goals: goalsCount,
          activeGoals: activeGoalsCount,
          total: needsCount + storiesCount + interviewsCount + goalsCount
        }
      };
    });
  }, [products, userNeeds, userStories, contacts, interviews, Objectives]);

  const filteredProducts = useMemo(() => {
    let filtered = productsWithStats.filter(product => {
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      return matchesStatus;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return filtered;
  }, [productsWithStats, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Grouper produits par lignes de 3 pour virtualisation grid
  const productRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < paginatedProducts.length; i += 3) {
      rows.push(paginatedProducts.slice(i, i + 3));
    }
    return rows;
  }, [paginatedProducts]);

  useMemo(() => {
    setCurrentPage(1);
  }, [statusFilter, sortBy]);

  const handleResetFilters = () => {
    setStatusFilter('all');
    setSortBy('date');
  };

  const hasActiveFilters = statusFilter !== 'all' || sortBy !== 'date';

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* BARRE DE FILTRES ET ACTIONS */}
        {products.length > 0 && (
          <FilterBar
            isExpanded={isFiltersExpanded}
            onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
            onAdd={handleAdd}
            addLabel="Nouveau Produit"
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
            filters={
              <>
                {/* Filtre Statut */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <CustomSelect
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous les statuts' },
                      { value: 'draft', label: 'Brouillon' },
                      { value: 'active', label: 'Actifs' },
                      { value: 'archived', label: 'Archivés' }
                    ]}
                    aria-label="Filtrer par statut"
                  />
                </div>

                {/* Tri */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy('date')}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      sortBy === 'date' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Date
                  </button>
                  <button
                    onClick={() => setSortBy('name')}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      sortBy === 'name' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Nom
                  </button>
                  <button
                    onClick={() => setSortBy('status')}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      sortBy === 'status' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Statut
                  </button>
                </div>
              </>
            }
          />
        )}

        {/* Content */}
        <div>
          {(() => {
            // Vérifier d'abord les dépendances (contacts requis)
            const { canCreate, missingDependency } = checkModuleDependencies('products', {
              contacts: contacts.length
            });
            
            // État vide avec dépendance manquante - PRIORITAIRE
            if (!canCreate && missingDependency) {
              return (
                <EmptyState
                  icon={Package}
                  message={missingDependency.message}
                  description="Utilisez le menu de gauche pour accéder au module correspondant."
                />
              );
            }
            
            // État vide avec filtres actifs
            if (filteredProducts.length === 0 && products.length > 0) {
              return (
                <EmptyState
                  icon={Package}
                  message="Aucun produit ne correspond à vos critères de filtrage"
                  onAction={handleResetFilters}
                  actionLabel="Réinitialiser les filtres"
                />
              );
            }
            
            // État vide normal - pas de produits
            if (filteredProducts.length === 0 && products.length === 0) {
              return (
                <EmptyState
                  icon={Package}
                  message="Aucun produit pour le moment"
                  onAction={handleAdd}
                  actionLabel="Créer votre premier produit"
                />
              );
            }
            
            // Affichage normal avec produits
            return (
            <>
              <VirtualizedList
                items={productRows}
                itemHeight={170}
                height={Math.min(window.innerHeight - 300, productRows.length * 170)}
                renderItem={({ item: row, style }) => (
                  <div 
                    key={row[0].id} 
                    style={style}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2"
                  >
                    {row.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        contacts={contacts}
                        onView={() => setViewingProduct(product)}
                        onEdit={() => handleEdit(product)}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              />

              {/* Pagination - Désactivée avec virtualisation */}
            </>
            );
          })()}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          contacts={contacts}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Modal Detail */}
      {viewingProduct && (
        <ProductDetail
          product={viewingProduct}
          contacts={contacts}
          onClose={() => setViewingProduct(null)}
          onEdit={(product) => {
            setViewingProduct(null);
            handleEdit(product);
          }}
        />
      )}
      
      {/* Modale de confirmation */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null })}
      />
    </div>
  );
};

export default ProductsManager;
