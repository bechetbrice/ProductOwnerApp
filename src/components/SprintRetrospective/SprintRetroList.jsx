import { useState, useMemo } from 'react';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import SprintRetroCard from './SprintRetroCard';
import SprintRetroDetail from './SprintRetroDetail';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';

/**
 * SprintRetroList - Liste des Sprint Retrospectives (v4.1.0)
 * Migration vers ProductSelector + SprintRetroCard standardisé
 */
const SprintRetroList = ({ 
  sprintRetrospectives, 
  sprints, 
  contacts,
  products,
  onEdit, 
  onDelete, 
  onNew,
  initialFilters = {}
}) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSprint, setFilterSprint] = useState(initialFilters.sprintId || 'all');
  const [filterProduct, setFilterProduct] = useState(initialFilters.productId || 'all');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [selectedRetro, setSelectedRetro] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const retrosPerPage = 9;

  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Filtrage
  const filteredRetros = useMemo(() => {
    return sprintRetrospectives
      .filter(retro => {
        const sprint = sprints.find(s => s.id === retro.sprintId);
        
        const matchesStatus = filterStatus === 'all' || retro.status === filterStatus;
        const matchesSprint = filterSprint === 'all' || retro.sprintId === filterSprint;
        
        let matchesProduct = filterProduct === 'all';
        if (!matchesProduct && sprint) {
          matchesProduct = sprint.productId === filterProduct;
        }
        
        return matchesStatus && matchesSprint && matchesProduct;
      })
      .sort((a, b) => new Date(b.retroDate || b.createdAt) - new Date(a.retroDate || a.createdAt));
  }, [sprintRetrospectives, sprints, filterStatus, filterSprint, filterProduct]);

  const totalPages = Math.ceil(filteredRetros.length / retrosPerPage);
  const startIndex = (currentPage - 1) * retrosPerPage;
  const endIndex = startIndex + retrosPerPage;
  const paginatedRetros = filteredRetros.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [filterStatus, filterSprint, filterProduct]);

  const handleDelete = (retro) => {
    const sprint = sprints.find(s => s.id === retro.sprintId);
    const message = `Êtes-vous sûr de vouloir supprimer la rétrospective du "${sprint?.name || 'Sprint'}" ?`;
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer la rétrospective',
      message: message,
      onConfirm: () => {
        onDelete(retro.id);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const resetFilters = () => {
    setFilterStatus('all');
    setFilterSprint('all');
    setFilterProduct('all');
  };

  const hasActiveFilters = filterStatus !== 'all' || filterSprint !== 'all' || filterProduct !== 'all';

  // États vides avec gestion intelligente des dépendances
  if (products.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8">
          <EmptyState
            icon={RefreshCw}
            message="Créez d'abord des produits pour constituer vos rétrospectives"
            description="Utilisez le menu de gauche pour accéder au module correspondant."
          />
        </div>
      </div>
    );
  }

  if (sprints.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8">
          <EmptyState
            icon={RefreshCw}
            message="Créez d'abord des sprints pour constituer vos rétrospectives"
            description="Utilisez le menu de gauche pour accéder au module correspondant."
          />
        </div>
      </div>
    );
  }

  if (sprintRetrospectives.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8">
          <EmptyState
            icon={RefreshCw}
            message="Aucune rétrospective pour le moment"
            onAction={onNew}
            actionLabel="Créer votre première rétrospective"
          />
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: { label: 'Planifiée', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      completed: { label: 'Terminée', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700', icon: XCircle }
    };
    const badge = badges[status] || badges.scheduled;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon size={12} />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 min-h-screen">
      {/* Padding responsive */}
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* FilterBar */}
        <FilterBar
          isExpanded={isFiltersExpanded}
          onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
          onAdd={onNew}
          addLabel="Nouvelle Rétrospective"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          topLeftContent={
            <ProductSelector
              products={products}
              value={filterProduct}
              onChange={setFilterProduct}
              placeholder="Tous les produits"
              className="w-full sm:w-64"
            />
          }
          filters={
            <>
              <CustomSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { value: 'all', label: 'Tous les statuts' },
                  { value: 'scheduled', label: 'Planifiées' },
                  { value: 'completed', label: 'Terminées' },
                  { value: 'cancelled', label: 'Annulées' }
                ]}
                aria-label="Filtrer par statut"
              />
              <CustomSelect
                value={filterSprint}
                onChange={(e) => setFilterSprint(e.target.value)}
                options={[
                  { value: 'all', label: 'Tous les sprints' },
                  ...sprints.map(sprint => ({
                    value: sprint.id,
                    label: sprint.name
                  }))
                ]}
                aria-label="Filtrer par sprint"
              />
            </>
          }
        />

        {/* Liste des rétrospectives avec SprintRetroCard standardisé */}
        {filteredRetros.length === 0 ? (
          <EmptyState
            icon={RefreshCw}
            message={hasActiveFilters ? "Aucune rétrospective ne correspond aux filtres" : "Aucune rétrospective"}
            onAction={hasActiveFilters ? resetFilters : onNew}
            actionLabel={hasActiveFilters ? "Réinitialiser les filtres" : "Créer votre première rétrospective"}
          />
        ) : (
          <>
            {/* Grille de cards avec SprintRetroCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {paginatedRetros.map(retro => {
                const sprint = sprints.find(s => s.id === retro.sprintId);
                const product = products.find(p => p.id === sprint?.productId);

                return (
                  <SprintRetroCard
                    key={retro.id}
                    retro={retro}
                    sprint={sprint}
                    product={product}
                    getStatusBadge={getStatusBadge}
                    onView={setSelectedRetro}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredRetros.length}
              itemsPerPage={retrosPerPage}
              onPageChange={setCurrentPage}
              itemLabel="rétrospective"
            />
          </>
        )}
      </div>

      {/* Modal détail */}
      {selectedRetro && (
        <SprintRetroDetail
          retro={selectedRetro}
          sprint={sprints.find(s => s.id === selectedRetro.sprintId)}
          product={products.find(p => p.id === sprints.find(s => s.id === selectedRetro.sprintId)?.productId)}
          contacts={contacts}
          onClose={() => setSelectedRetro(null)}
          onEdit={onEdit}
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

export default SprintRetroList;
