import { useState, useEffect, useMemo } from 'react';
import { MessageSquare } from 'lucide-react';
import { INTERVIEW_STATUS } from '../../constants/interviewConfig';
import { isDateInRange } from '../../utils/dateHelpers';
import { getInterviewedContacts } from '../../utils/interviewHelpers';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, VirtualizedList } from '../ui';
import { checkModuleDependencies } from '../../utils/moduleDependencies';
import InterviewCard from './InterviewCard';
import InterviewFilters from './InterviewFilters';
import InterviewTips from './InterviewTips';

/**
 * InterviewsList - Orchestration du module Entretiens
 * 
 * Composant principal responsable de :
 * - Gestion de l'état global (filtres, recherche, pagination)
 * - Logique de filtrage et tri
 * - Coordination des sous-composants
 * 
 * @component
 */
const InterviewsList = ({ 
  interviews, 
  contacts, 
  products = [], 
  onAdd, 
  onUpdate, 
  onDelete, 
  onView, 
  initialFilters = {}, 
  showTips = false
}) => {
  
  // États de filtrage
  const [filterStatus, setFilterStatus] = useState(initialFilters.status || 'all');
  const [filterType, setFilterType] = useState('all');
  const [filterContact, setFilterContact] = useState('all');
  const [productFilter, setProductFilter] = useState(initialFilters.productId || 'all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const interviewsPerPage = 500; // Virtualisation active au-delà de 20 items
  
  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Appliquer le filtre initial depuis Dashboard
  useEffect(() => {
    if (initialFilters.status) {
      setFilterStatus(initialFilters.status);
    }
    if (initialFilters.productId) {
      setProductFilter(initialFilters.productId);
    }
  }, [initialFilters]);

  // Filtrer et trier les entretiens
  const filteredAndSortedInterviews = useMemo(() => {
    let filtered = [...interviews];

    // Filtres
    if (filterStatus !== 'all') {
      filtered = filtered.filter(i => i.status === filterStatus);
    }
    if (filterType !== 'all') {
      filtered = filtered.filter(i => i.type === filterType);
    }
    if (filterContact !== 'all') {
      const contactIds = getInterviewedContacts({ interviewedContactIds: [filterContact] }, contacts)
        .map(c => c.id);
      filtered = filtered.filter(i => {
        const interviewContactIds = getInterviewedContacts(i, contacts).map(c => c.id);
        return interviewContactIds.some(id => contactIds.includes(id));
      });
    }
    if (productFilter !== 'all') {
      filtered = filtered.filter(i => i.productId === productFilter);
    }
    
    // Filtre par plage de dates (utilise le helper)
    filtered = filtered.filter(i => isDateInRange(i.scheduledDate, filterDateRange));

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.scheduledDate) - new Date(a.scheduledDate);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'contact': {
          const contactsA = getInterviewedContacts(a, contacts);
          const contactsB = getInterviewedContacts(b, contacts);
          const nameA = contactsA[0]?.name || 'ZZZ';
          const nameB = contactsB[0]?.name || 'ZZZ';
          return nameA.localeCompare(nameB);
        }
        case 'type':
          return (a.type || '').localeCompare(b.type || '');

        default:
          return 0;
      }
    });

    return filtered;
  }, [interviews, filterStatus, filterType, filterContact, filterDateRange, productFilter, sortBy, contacts]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedInterviews.length / interviewsPerPage);
  const startIndex = (currentPage - 1) * interviewsPerPage;
  const endIndex = startIndex + interviewsPerPage;
  const paginatedInterviews = filteredAndSortedInterviews.slice(startIndex, endIndex);

  // Grouper interviews par lignes de 3 pour virtualisation grid
  const interviewRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < paginatedInterviews.length; i += 3) {
      rows.push(paginatedInterviews.slice(i, i + 3));
    }
    return rows;
  }, [paginatedInterviews]);

  // Réinitialiser la page lors du changement de filtre
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterType, filterContact, filterDateRange, productFilter, sortBy]);

  // Réinitialiser tous les filtres
  const handleResetFilters = () => {
    setFilterStatus('all');
    setFilterType('all');
    setFilterContact('all');
    setFilterDateRange('all');
    setProductFilter('all');
    setSortBy('date');
  };

  // Suppression avec confirmation
  const handleDelete = (interviewId) => {
    const interview = interviews.find(i => i.id === interviewId);
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer l\'entretien',
      message: `Êtes-vous sûr de vouloir supprimer l'entretien "${interview?.title}" ?`,
      onConfirm: () => {
        onDelete(interviewId);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* Conseils et astuces */}
        {showTips && <InterviewTips />}

        {/* Filtres et Actions */}
        {interviews.length > 0 && (
          <InterviewFilters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterType={filterType}
            setFilterType={setFilterType}
            filterContact={filterContact}
            setFilterContact={setFilterContact}
            productFilter={productFilter}
            setProductFilter={setProductFilter}
            filterDateRange={filterDateRange}
            setFilterDateRange={setFilterDateRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            interviews={interviews}
            contacts={contacts}
            products={products}
            isFiltersExpanded={isFiltersExpanded}
            setIsFiltersExpanded={setIsFiltersExpanded}
            filteredCount={filteredAndSortedInterviews.length}
            totalCount={interviews.length}
            onResetFilters={handleResetFilters}
            onAdd={onAdd}
          />
        )}

        {/* Liste des entretiens */}
        {filteredAndSortedInterviews.length === 0 ? (
          (() => {
            // ÉTAPE 1: Vérifier les dépendances EN PREMIER
            const { canCreate, missingDependency } = checkModuleDependencies('interviews', {
              contacts: contacts.length
            });
            
            // ÉTAPE 2: Dépendance manquante - PRIORITAIRE
            if (!canCreate && missingDependency) {
              return (
                <EmptyState
                  icon={MessageSquare}
                  message={missingDependency.message}
                  description="Utilisez le menu de gauche pour accéder au module correspondant."
                />
              );
            }
            
            // ÉTAPE 3: Filtres actifs
            if (interviews.length > 0) {
              return (
                <EmptyState
                  icon={MessageSquare}
                  message="Aucun entretien ne correspond à vos critères de filtrage"
                  onAction={handleResetFilters}
                  actionLabel="Réinitialiser les filtres"
                />
              );
            }
            
            // ÉTAPE 4: État vide normal
            return (
              <EmptyState
                icon={MessageSquare}
                message="Aucun entretien pour le moment"
                onAction={() => onAdd()}
                actionLabel="Préparer votre premier entretien"
              />
            );
          })()
        ) : (
          <div className="mt-6 space-y-4 md:space-y-6">
            {/* Liste virtualisée des entretiens */}
            <VirtualizedList
              items={interviewRows}
              itemHeight={170}
              height={Math.min(window.innerHeight - 300, interviewRows.length * 170)}
              renderItem={({ item: row, style }) => (
                <div 
                  key={row[0].id} 
                  style={{ ...style, paddingBottom: '1.5rem' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {row.map(interview => {
                      const interviewedContacts = getInterviewedContacts(interview, contacts);
                      const product = products.find(p => p.id === interview.productId);

                      return (
                        <InterviewCard
                          key={interview.id}
                          interview={interview}
                          interviewedContacts={interviewedContacts}
                          product={product}
                          onView={onView}
                          onUpdate={onUpdate}
                          onDelete={handleDelete}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            />
            {/* Pagination - Désactivée avec virtualisation */}
          </div>
        )}
      </div>
      
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

export default InterviewsList;
