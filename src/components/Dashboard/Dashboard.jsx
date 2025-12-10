import { useState, useEffect, useMemo } from 'react';
import DashboardHeader from './Common/DashboardHeader';
import { OverviewTab } from './Overview';
import Roadmap from './Roadmap/Roadmap';
import BudgetManager from './Budget/BudgetManager';
import SprintAnalytics from './SprintAnalytics/SprintAnalytics';
import { useDashboardMetrics } from './Hooks';

/**
 * Dashboard Principal - Orchestrateur
 * Gère la navigation entre onglets et délègue l'affichage aux composants spécialisés
 */
const Dashboard = ({
  userNeeds = [],
  userStories = [],
  interviews = [],
  contacts = [],
  Objectives = [],
  products = [],
  personas = [],
  sprints = [],
  tasks = [],
  teams = [],
  budgetEntries = [],
  onNavigateToInterview,
  onNavigateToView,
  onAddBudgetEntry,
  onUpdateBudgetEntry,
  onDeleteBudgetEntry
}) => {
  // ============================================
  // ÉTATS NAVIGATION
  // ============================================
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProductId, setSelectedProductId] = useState('all');
  const [selectedSprintId, setSelectedSprintId] = useState(null);

  // États pour les filtres Budget
  const [budgetFiltersExpanded, setBudgetFiltersExpanded] = useState(false);
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [budgetFilters, setBudgetFilters] = useState({
    sprintId: '',
    category: '',
    periodType: '',
    status: ''
  });

  // Réinitialiser les filtres budget lors du changement d'onglet
  useEffect(() => {
    if (activeTab !== 'budget') {
      setBudgetFilters({ sprintId: '', category: '', periodType: '', status: '' });
      setBudgetFiltersExpanded(false);
      setIsBudgetFormOpen(false);
    }
  }, [activeTab]);

  const resetBudgetFilters = () => {
    setBudgetFilters({ sprintId: '', category: '', periodType: '', status: '' });
  };

  // ============================================
  // MÉTRIQUES GLOBALES (HOOK)
  // ============================================
  
  const metrics = useDashboardMetrics({
    products,
    sprints,
    userStories,
    contacts,
    tasks,
    teams,
    interviews,
    Objectives,
    userNeeds,
    budgetEntries,
    selectedProductId
  });

  // Ajouter selectedSprintId et handler au metrics
  const enrichedMetrics = {
    ...metrics,
    selectedSprintId,
    onSprintSelect: setSelectedSprintId,
    contacts,
    teams,
    interviews
  };

  // ============================================
  // DONNÉES FILTRÉES POUR AUTRES ONGLETS
  // ============================================
  
  const filteredBudgetEntries = useMemo(() => {
    let entries = metrics.filtered.budgetEntries;

    if (budgetFilters.sprintId) {
      entries = entries.filter(e => e.sprintId === budgetFilters.sprintId);
    }
    if (budgetFilters.category) {
      entries = entries.filter(e => e.category === budgetFilters.category);
    }
    if (budgetFilters.periodType) {
      entries = entries.filter(e => e.periodType === budgetFilters.periodType);
    }
    if (budgetFilters.status) {
      entries = entries.filter(e => e.status === budgetFilters.status);
    }

    return entries.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [metrics.filtered.budgetEntries, budgetFilters]);

  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-gray-50 min-h-screen p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* HEADER */}
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        products={products}
        selectedProductId={selectedProductId}
        onProductChange={setSelectedProductId}
        budgetFilters={budgetFilters}
        onBudgetFiltersChange={setBudgetFilters}
        budgetFiltersExpanded={budgetFiltersExpanded}
        onBudgetFiltersExpandChange={setBudgetFiltersExpanded}
        onBudgetAdd={() => setIsBudgetFormOpen(true)}
        onBudgetResetFilters={resetBudgetFilters}
        sprints={metrics.filtered.sprints}
      />

      {/* ONGLETS */}
      {activeTab === 'overview' && (
        <OverviewTab
          metrics={enrichedMetrics}
          onNavigateToView={onNavigateToView}
          onNavigateToInterview={onNavigateToInterview}
        />
      )}

      {activeTab === 'roadmap' && (
        <div className="bg-white rounded-lg shadow p-6">
          <Roadmap
            sprints={metrics.filtered.sprints}
            userStories={metrics.filtered.userStories}
            products={metrics.filtered.products}
            teamMembers={tasks}
            teams={teams}
            contacts={contacts}
            interviews={interviews}
            Objectives={Objectives}
            personas={personas}
            userNeeds={userNeeds}
            tasks={tasks}
            hideProductFilter={true}
            onEdit={(sprint) => onNavigateToView && onNavigateToView('sprints')}
            onUpdateStory={(storyId, updates) => console.log('Story update:', storyId, updates)}
          />
        </div>
      )}

      {activeTab === 'budget' && (
        <BudgetManager
          budgetEntries={filteredBudgetEntries}
          products={metrics.filtered.products}
          sprints={metrics.filtered.sprints}
          onAddBudgetEntry={onAddBudgetEntry}
          onUpdateBudgetEntry={onUpdateBudgetEntry}
          onDeleteBudgetEntry={onDeleteBudgetEntry}
          isFormOpen={isBudgetFormOpen}
          setIsFormOpen={setIsBudgetFormOpen}
        />
      )}

      {activeTab === 'sprintAnalytics' && (
        <SprintAnalytics
          sprints={metrics.filtered.sprints}
          userStories={metrics.filtered.userStories}
          products={metrics.filtered.products}
        />
      )}
    </div>
  );
};

export default Dashboard;
