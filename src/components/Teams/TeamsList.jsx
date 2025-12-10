import { useState, useMemo } from 'react';
import { Users } from 'lucide-react';
import TeamDetail from './TeamDetail';
import TeamCard from './TeamCard';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, InfoTooltip, VirtualizedList, CustomSelect } from '../ui';
import FilterBar from '../Common/FilterBar';
import ProductSelector from '../Common/ProductSelector';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

const TeamsList = ({ 
  teams, 
  contacts, 
  products,
  onAdd, 
  onUpdate, 
  onDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('active');
  const [filterProduct, setFilterProduct] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingTeam, setViewingTeam] = useState(null);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const teamsPerPage = 500; // Virtualisation active au-delà de 20 items

  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });



  const activeProducts = useMemo(() => {
    return products.filter(p => p.status === 'active');
  }, [products]);

  // Filtrer les équipes
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      const matchesStatus = filterStatus === 'all' || team.status === filterStatus;
      
      const matchesProduct = filterProduct === 'all' || 
        (team.productIds && team.productIds.includes(filterProduct));
      
      return matchesStatus && matchesProduct;
    });
  }, [teams, filterStatus, filterProduct]);

  // Pagination
  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);
  const startIndex = (currentPage - 1) * teamsPerPage;
  const endIndex = startIndex + teamsPerPage;
  const paginatedTeams = filteredTeams.slice(startIndex, endIndex);

  // Grouper teams par lignes de 3 pour virtualisation grid
  const teamRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < paginatedTeams.length; i += 3) {
      rows.push(paginatedTeams.slice(i, i + 3));
    }
    return rows;
  }, [paginatedTeams]);

  useMemo(() => {
    setCurrentPage(1);
  }, [filterStatus, filterProduct]);

  // Obtenir nom contact
  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact?.name || 'Inconnu';
  };

  // Calculer capacité équipe
  const getTeamCapacity = (team) => {
    if (!team.memberContactIds) return 0;
    
    return team.memberContactIds.reduce((sum, contactId) => {
      const contact = contacts.find(c => c.id === contactId);
      if (!contact || !contact.capacity) return sum;
      
      const adjustedCapacity = (contact.capacity * (contact.availability ?? 100) * (contact.workload ?? 100)) / 10000;
      return sum + adjustedCapacity;
    }, 0);
  };

  const resetFilters = () => {
    setFilterStatus('active');
    setFilterProduct('all');
  };

  const hasActiveFilters = filterStatus !== 'active' || filterProduct !== 'all';



  const handleDelete = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;
    
    const message = `Êtes-vous sûr de vouloir supprimer l'équipe "${team.name}" ?`;
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer l\'équipe',
      message: message,
      onConfirm: () => {
        onDelete(teamId);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };



  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* BARRE DE FILTRES ET ACTIONS */}
        {teams.length > 0 && (
          <FilterBar
            isExpanded={isFiltersExpanded}
            onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
            onAdd={onAdd}
            addLabel="Nouvelle Équipe"
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
            topLeftContent={
              /* Sélecteur Produit - Toujours visible */
              activeProducts.length > 0 && (
                <ProductSelector
                  products={activeProducts}
                  value={filterProduct}
                  onChange={setFilterProduct}
                  placeholder="Tous les produits"
                  className="w-full sm:w-64"
                />
              )
            }
            filters={
              <>
                {/* Filtre Statut */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <CustomSelect
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    options={[
                      { value: 'active', label: '✓ Actives' },
                      { value: 'inactive', label: 'Inactives' },
                      { value: 'all', label: 'Tous les statuts' }
                    ]}
                    aria-label="Filtrer par statut"
                  />
                </div>
              </>
            }
          />
        )}

        {/* LISTE DES ÉQUIPES SUR 3 COLONNES */}
        {filteredTeams.length === 0 ? (
          (() => {
            // ÉTAPE 1: Vérifier les dépendances EN PREMIER
            const { canCreate, missingDependency } = checkModuleDependencies('teams', {
              contacts: contacts.length
            });
            
            // ÉTAPE 2: Dépendance manquante - PRIORITAIRE
            if (!canCreate && missingDependency) {
              return (
                <EmptyState
                  icon={Users}
                  message={missingDependency.message}
                  description="Utilisez le menu de gauche pour accéder au module correspondant."
                />
              );
            }
            
            // ÉTAPE 3: Filtres actifs
            if (teams.length > 0) {
              return (
                <EmptyState
                  icon={Users}
                  message="Aucune équipe ne correspond à vos critères de filtrage"
                  onAction={resetFilters}
                  actionLabel="Réinitialiser les filtres"
                />
              );
            }
            
            // ÉTAPE 4: État vide normal
            return (
              <EmptyState
                icon={Users}
                message="Aucune équipe pour le moment"
                onAction={onAdd}
                actionLabel="Créer votre première équipe"
              />
            );
          })()
        ) : (
          <div className="space-y-4 md:space-y-6">
            <VirtualizedList
              items={teamRows}
              itemHeight={160}
              height={Math.min(window.innerHeight - 300, teamRows.length * 160)}
              renderItem={({ item: row, style }) => (
                <div 
                  key={row[0].id} 
                  style={{ ...style, paddingBottom: '1.5rem' }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {row.map(team => (
                      <TeamCard
                        key={team.id}
                        team={team}
                        contacts={contacts}
                        products={products}
                        onView={() => setViewingTeam(team)}
                        onEdit={() => onUpdate(team)}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}
            />

            {/* Pagination - Désactivée avec virtualisation */}
          </div>
        )}
      </div>

      {/* Modal détail équipe */}
      {viewingTeam && (
        <TeamDetail
          team={viewingTeam}
          contacts={contacts}
          products={products}
          onClose={() => setViewingTeam(null)}
          onEdit={() => {
            onUpdate(viewingTeam);
            setViewingTeam(null);
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

export default TeamsList;
