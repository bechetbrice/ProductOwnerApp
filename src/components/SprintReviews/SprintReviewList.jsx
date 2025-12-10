import { useState, useMemo } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Lightbulb } from 'lucide-react';
import SprintReviewCard from './SprintReviewCard';
import SprintReviewDetail from './SprintReviewDetail';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';

/**
 * SprintReviewList - Liste des Sprint Reviews (v4.5.0)
 * Migration vers ProductSelector pour harmonisation UI
 */
const SprintReviewList = ({ 
  sprintReviews, 
  sprints, 
  userStories,
  contacts,
  products,
  onEdit, 
  onDelete, 
  onNew,
  initialFilters = {},
  showTips = false
}) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSprint, setFilterSprint] = useState(initialFilters.sprintId || 'all');
  const [filterProduct, setFilterProduct] = useState(initialFilters.productId || 'all');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 9;

  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });



  // Filtrage
  const filteredReviews = useMemo(() => {
    return sprintReviews
      .filter(review => {
        const sprint = sprints.find(s => s.id === review.sprintId);
        
        const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
        const matchesSprint = filterSprint === 'all' || review.sprintId === filterSprint;
        
        let matchesProduct = filterProduct === 'all';
        if (!matchesProduct && sprint) {
          matchesProduct = sprint.productId === filterProduct;
        }
        
        return matchesStatus && matchesSprint && matchesProduct;
      })
      .sort((a, b) => new Date(b.reviewDate || b.createdAt) - new Date(a.reviewDate || a.createdAt));
  }, [sprintReviews, sprints, filterStatus, filterSprint, filterProduct]);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [filterStatus, filterSprint, filterProduct]);

  const handleDelete = (review) => {
    const sprint = sprints.find(s => s.id === review.sprintId);
    const message = `Êtes-vous sûr de vouloir supprimer la review du "${sprint?.name || 'Sprint'}" ?`;
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer la Sprint Review',
      message: message,
      onConfirm: () => {
        onDelete(review.id);
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

  // États vides avec gestion intelligente des dépendances
  if (products.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8">
          <EmptyState
            icon={Calendar}
            message="Créez d'abord des produits pour constituer vos sprint reviews"
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
            icon={Calendar}
            message="Créez d'abord des sprints pour constituer vos sprint reviews"
            description="Utilisez le menu de gauche pour accéder au module correspondant."
          />
        </div>
      </div>
    );
  }

  if (sprintReviews.length === 0) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8">
          <EmptyState
            icon={Calendar}
            message="Aucune sprint review pour le moment"
            onAction={onNew}
            actionLabel="Créer votre première sprint review"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50 min-h-screen">
      {/* Padding responsive */}
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* Conseils responsive */}
        {showTips && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-yellow-200 rounded-lg flex-shrink-0">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-700" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Conseils et astuces</h3>
            </div>
            
            {/* Grid conseils responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-indigo-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🎯 Objectif de la Sprint Review</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>La Sprint Review est une <strong>cérémonie de démonstration</strong> du travail terminé</li>
                  <li>Elle réunit l'équipe et les <strong>stakeholders</strong> pour recueillir du feedback</li>
                  <li>Elle permet d'<strong>ajuster le Product Backlog</strong> selon les retours</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">📝 Documenter efficacement</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Sélectionnez les <strong>stories terminées</strong> qui ont été démontrées</li>
                  <li>Capturez les <strong>feedbacks des stakeholders</strong> en temps réel</li>
                  <li>Notez les <strong>décisions prises</strong> et les <strong>prochaines étapes</strong></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">📊 Statistiques et suivi</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Les <strong>statistiques en haut</strong> montrent le nombre total de reviews et leur statut</li>
                  <li>Suivez les <strong>stories démontrées</strong> et les <strong>feedbacks reçus</strong></li>
                  <li>Utilisez les filtres pour retrouver rapidement une review par produit ou sprint</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-yellow-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">💡 Bonnes pratiques</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Préparez la démo à l'avance avec les <strong>stories terminées</strong></li>
                  <li>Limitez la durée à <strong>maximum 4h pour un sprint de 4 semaines</strong></li>
                  <li>Concentrez-vous sur le <strong>feedback actionnable</strong> pour le Product Backlog</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* MODULE FILTRES */}
        <FilterBar
          isExpanded={isFiltersExpanded}
          onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
          onAdd={onNew}
          addLabel="Nouvelle Review"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          topLeftContent={
            /* Sélecteur Produit - Toujours visible avec ProductSelector */
            products.length > 0 && (
              <ProductSelector
                products={products}
                value={filterProduct}
                onChange={setFilterProduct}
                placeholder="Tous les produits"
                className="w-full sm:w-64"
              />
            )
          }
          filters={
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Filtre Sprint */}
              {sprints.length > 0 && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Sprint</label>
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
                </div>
              )}

              {/* Filtre Statut */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Statut</label>
                <CustomSelect
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  options={[
                    { value: 'all', label: 'Tous les statuts' },
                    { value: 'scheduled', label: '⏱️ Planifiées' },
                    { value: 'completed', label: '✅ Terminées' },
                    { value: 'cancelled', label: '❌ Annulées' }
                  ]}
                  aria-label="Filtrer par statut"
                />
              </div>
            </div>
          }
        />

        {/* LISTE DES REVIEWS responsive */}
        <div className="mt-6">
        {filteredReviews.length === 0 ? (
          <EmptyState
            icon={Calendar}
            message="Aucune review ne correspond à vos critères de filtrage"
            onAction={resetFilters}
            actionLabel="Réinitialiser les filtres"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {paginatedReviews.map(review => {
                const sprint = sprints.find(s => s.id === review.sprintId);
                const product = products.find(p => p.id === sprint?.productId);
                const completedStories = userStories.filter(s => review.completedStoryIds?.includes(s.id));
                const participants = contacts.filter(c => review.participants?.includes(c.id));

                return (
                  <SprintReviewCard
                    key={review.id}
                    review={review}
                    sprint={sprint}
                    product={product}
                    completedStories={completedStories}
                    participants={participants}
                    getStatusBadge={getStatusBadge}
                    onView={() => setSelectedReview(review)}
                    onEdit={() => onEdit(review)}
                    onDelete={() => handleDelete(review)}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredReviews.length}
              itemsPerPage={reviewsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="review"
            />
          </>
        )}
        </div>

        {/* Modal détail */}
        {selectedReview && (
          <SprintReviewDetail
            review={selectedReview}
            sprint={sprints.find(s => s.id === selectedReview.sprintId)}
            product={products.find(p => p.id === sprints.find(s => s.id === selectedReview.sprintId)?.productId)}
            userStories={userStories}
            contacts={contacts}
            onClose={() => setSelectedReview(null)}
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
    </div>
  );
};

export default SprintReviewList;
