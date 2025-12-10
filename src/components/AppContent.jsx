import { useState, useEffect, Suspense } from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import QuotaAlert from './ui/QuotaAlert';
// ✅ MIGRATION : Remplacer useApp par les 7 nouveaux contexts
import { 
  useProductsContext,
  useContactsContext,
  useDiscoveryContext,
  useBacklogContext,
  useExecutionContext,
  useBudgetContext,
  useSettingsContext
} from '../contexts';
import { NavigateProvider } from '../contexts/NavigateContext';
import PageWrapper from './Layout/PageWrapper';
import Sidebar from './Layout/Sidebar';
import { ViewRenderer } from './Layout/ViewRenderer';
import { LoadingSpinner } from './Layout/LoadingSpinner';
import { ContactForm } from './Contacts';
import InterviewForm from './Interviews/InterviewForm';
import InterviewDetail from './Interviews/InterviewDetail';
import UserNeedForm from './UserNeeds/UserNeedForm';
import { UserStoryForm } from './UserStories';
import PersonaDetail from './Personas/PersonaDetail';
import { TeamForm } from './Teams';
import { SprintReviewForm } from './SprintReviews';
import { SprintRetroForm } from './SprintRetrospective';
import { useModalStates } from '../hooks/useModalStates';
import {
  useContactHandlers,
  useInterviewHandlers,
  useStoryHandlers,
  useInsightHandlers,
  useNavigationHandlers,
  useOthersHandlers
} from '../hooks/handlers';
import {
  initializeApp,
  handleExportData,
  handleImportData,
  setupGlobalNavigation,
  setupBeforeUnloadWarning
} from '../utils/appHelpers';

/**
 * AppContent - Composant principal de l'application
 * Gère l'orchestration des vues, modals et navigation
 * 
 * ✅ MIGRÉ : Utilise les 7 contexts spécialisés au lieu d'AppContext monolithique
 */
function AppContent() {
  const { preferences, showNotification } = usePreferences();
  
  // ✅ MIGRATION : Récupérer depuis les 7 contexts spécialisés
  const { 
    products, 
    objectives, 
    productsActions, 
    objectivesActions 
  } = useProductsContext();
  
  const { 
    contacts, 
    teams, 
    teamMembers, 
    contactsActions, 
    teamsActions 
  } = useContactsContext();
  
  const { 
    interviews, 
    personas, 
    userNeeds, 
    interviewsActions, 
    personasActions, 
    userNeedsActions 
  } = useDiscoveryContext();
  
  const { 
    userStories, 
    userStoriesActions 
  } = useBacklogContext();
  
  const { 
    sprints, 
    tasks, 
    sprintReviews, 
    sprintRetrospectives, 
    sprintsActions, 
    tasksActions, 
    sprintReviewsActions,  // ✅ CORRECTION : Nom correct depuis ExecutionContext
    sprintRetrosActions     // ✅ CORRECTION : Nom correct depuis ExecutionContext
  } = useExecutionContext();
  
  const { 
    budgetEntries, 
    budgetActions 
  } = useBudgetContext();
  
  const { 
    settings, 
    settingsActions 
  } = useSettingsContext();
  
  // ✅ MIGRATION : Reconstruire l'objet appContexts pour compatibilité
  // avec le reste du code (handlers, ViewRenderer, modals)
  const appContexts = {
    // Data
    products,
    objectives,
    contacts,
    teams,
    teamMembers,
    interviews,
    personas,
    userNeeds,
    userStories,
    sprints,
    tasks,
    sprintReviews,
    sprintRetrospectives,
    budgetEntries,
    settings,
    
    // Actions
    productsActions,
    objectivesActions,
    contactsActions,
    interviewsActions,
    personasActions,
    userNeedsActions,
    userStoriesActions,
    sprintsActions,
    
    // Actions groupées pour compatibilité (othersActions)
    othersActions: {
      // Teams
      addTeam: teamsActions.add,
      updateTeam: teamsActions.update,
      deleteTeam: teamsActions.delete,
      
      // Tasks
      addTask: tasksActions.add,
      updateTask: tasksActions.update,
      deleteTask: tasksActions.delete,
      
      // Sprint Reviews
      addSprintReview: sprintReviewsActions.add,
      updateSprintReview: sprintReviewsActions.update,
      deleteSprintReview: sprintReviewsActions.delete,
      
      // Sprint Retros
      addSprintRetro: sprintRetrosActions.add,
      updateSprintRetro: sprintRetrosActions.update,
      deleteSprintRetro: sprintRetrosActions.delete,
      
      // Budget
      addBudgetEntry: budgetActions.add,
      updateBudgetEntry: budgetActions.update,
      deleteBudgetEntry: budgetActions.delete,
      
      // Settings
      updateSettings: settingsActions.update
    }
  };
  
  const [currentView, setCurrentView] = useState(preferences?.defaultView || 'dashboard');
  const [viewFilters, setViewFilters] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const modalStates = useModalStates();
  
  // ✅ QW1: Utilisation des hooks handlers spécialisés au lieu de useAppHandlers monolithique
  const contactHandlers = useContactHandlers({
    modalStates,
    contactsActions
  });
  
  const interviewHandlers = useInterviewHandlers({
    modalStates,
    interviewsActions
  });
  
  const storyHandlers = useStoryHandlers({
    modalStates,
    userNeedsActions,
    userStoriesActions,
    interviewsActions
  });
  
  const insightHandlers = useInsightHandlers({
    modalStates,
    userNeedsActions,
    setCurrentView,
    showNotification
  });
  
  const navigationHandlers = useNavigationHandlers({
    modalStates,
    contexts: appContexts,
    setCurrentView,
    setViewFilters
  });
  
  const othersHandlers = useOthersHandlers({
    modalStates,
    personasActions,
    othersActions: appContexts.othersActions
  });
  
  // Regrouper tous les handlers pour compatibilité avec le code existant
  const handlers = {
    ...contactHandlers,
    ...interviewHandlers,
    ...storyHandlers,
    ...insightHandlers,
    ...navigationHandlers,
    ...othersHandlers
  };

  // Handler pour éditer la préparation depuis InterviewDetail (onglet 1)
  const handleEditPreparation = (interview) => {
    modalStates.setViewingInterview(null);
    modalStates.setEditingInterview(interview);
    modalStates.setIsInterviewFormOpen(true);
  };

  // Handler pour éditer le suivi depuis InterviewDetail (onglet 3-4)
  const handleEditConduct = (interview) => {
    modalStates.setViewingInterview(null);
    setTimeout(() => {
      modalStates.setViewingInterview(interview);
      modalStates.setInterviewReadOnly('edit');
    }, 50);
  };

  // Initialisation + Migrations
  useEffect(() => {
    initializeApp(showNotification);
  }, []);

  // Avertissement avant fermeture
  useEffect(() => {
    return setupBeforeUnloadWarning(preferences?.autoSave);
  }, [preferences?.autoSave]);

  // Navigation globale
  useEffect(() => {
    return setupGlobalNavigation({
      setCurrentView,
      handleCreateNeedFromInsight: handlers.handleCreateNeedFromInsight,
      handleNavigate: handlers.handleNavigate
    });
  }, [handlers]);

  // Export/Import avec refresh
  const handleExport = () => handleExportData(showNotification);
  
  const handleImport = () => {
    handleImportData({
      userNeedsActions: appContexts.userNeedsActions,
      userStoriesActions: appContexts.userStoriesActions,
      contactsActions: appContexts.contactsActions,
      interviewsActions: appContexts.interviewsActions,
      objectivesActions: appContexts.objectivesActions,
      sprintsActions: appContexts.sprintsActions,
      productsActions: appContexts.productsActions,
      personasActions: appContexts.personasActions,
      othersActions: appContexts.othersActions
    }, showNotification);
  };

  return (
    <NavigateProvider navigate={setCurrentView}>
      {/* Alerte quota localStorage */}
      <QuotaAlert onExport={handleExport} />
      
      {/* Layout normal avec Sidebar et Header */}
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <PageWrapper 
            currentView={currentView}
            onExport={handleExport}
            onImport={handleImport}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <ViewRenderer
                currentView={currentView}
                viewFilters={viewFilters}
                contexts={appContexts}
                handlers={{...handlers, handleExport, handleImport}}
                onNavigateToView={handlers.handleNavigateToView}
                setCurrentView={setCurrentView}
                setPrefilledStoryData={modalStates.setPrefilledStoryData}
                setIsStoryFormModalOpen={modalStates.setIsStoryFormModalOpen}
              />
            </Suspense>
          </PageWrapper>
        </div>
      </div>

      {/* Modals - Contact */}
      {modalStates.isContactFormOpen && (
        <ContactForm
          contact={modalStates.editingContact}
          products={appContexts.products}
          onSave={handlers.handleSaveContact}
          onCancel={handlers.handleCloseContactForm}
        />
      )}

      {/* Modals - Interview */}
      {modalStates.isInterviewFormOpen && (
        <InterviewForm
          interview={modalStates.editingInterview}
          contacts={appContexts.contacts}
          userNeeds={appContexts.userNeeds}
          products={appContexts.products}
          onSave={handlers.handleSaveInterview}
          onCancel={() => {
            modalStates.setIsInterviewFormOpen(false);
            modalStates.setEditingInterview(null);
          }}
        />
      )}

      {modalStates.viewingInterview && (
        <InterviewDetail
          interview={modalStates.viewingInterview}
          contacts={appContexts.contacts}
          userNeeds={appContexts.userNeeds}
          products={appContexts.products}
          onUpdate={handlers.handleUpdateInterviewFromDetail}
          onClose={handlers.handleCloseInterviewDetail}
          onEditPreparation={handleEditPreparation}
          onEditConduct={handleEditConduct}
          mode={modalStates.interviewReadOnly}
          onNavigateToNeed={handlers.handleNavigateToNeed}
        />
      )}

      {/* Modals - UserNeed */}
      {modalStates.isNeedFormModalOpen && (
        <div style={{ zIndex: 60 }}>
          <UserNeedForm
            need={modalStates.prefilledNeedData}
            contacts={appContexts.contacts}
            userStories={appContexts.userStories}
            interviews={appContexts.interviews}
            objectives={appContexts.objectives}
            products={appContexts.products}
            personas={appContexts.personas}
            onSubmit={handlers.handleAddUserNeed}
            onCancel={() => {
              modalStates.setIsNeedFormModalOpen(false);
              modalStates.setPrefilledNeedData(null);
            }}
            onNavigate={handlers.handleNavigate}
          />
        </div>
      )}

      {/* Modals - UserStory */}
      {modalStates.isStoryFormModalOpen && (
        <div style={{ zIndex: 60 }}>
          <UserStoryForm
            story={modalStates.prefilledStoryData}
            userNeeds={appContexts.userNeeds}
            contacts={appContexts.contacts}
            objectives={appContexts.objectives}
            products={appContexts.products}
            teamMembers={appContexts.teamMembers}
            teams={appContexts.teams}
            onSubmit={handlers.handleAddUserStory}
            onCancel={() => {
              modalStates.setIsStoryFormModalOpen(false);
              modalStates.setPrefilledStoryData(null);
            }}
            onNavigate={handlers.handleNavigate}
          />
        </div>
      )}

      {/* Modals - Persona */}
      {modalStates.viewingPersona && (
        <PersonaDetail
          persona={modalStates.viewingPersona}
          contacts={appContexts.contacts}
          userNeeds={appContexts.userNeeds}
          userStories={appContexts.userStories}
          interviews={appContexts.interviews}
          products={appContexts.products}
          onClose={handlers.handleClosePersonaDetail}
          onEdit={() => {
            modalStates.setViewingPersona(null);
            setCurrentView('personas');
          }}
        />
      )}

      {/* Modals - Team */}
      {modalStates.showTeamsForm && (
        <TeamForm
          team={modalStates.editingTeam}
          contacts={appContexts.contacts}
          products={appContexts.products}
          onSave={handlers.handleSaveTeam}
          onCancel={() => {
            modalStates.setShowTeamsForm(false);
            modalStates.setEditingTeam(null);
          }}
        />
      )}

      {/* Modals - Sprint Review */}
      {modalStates.isSprintReviewFormOpen && (
        <SprintReviewForm
          review={modalStates.editingSprintReview}
          sprints={appContexts.sprints}
          userStories={appContexts.userStories}
          contacts={appContexts.contacts}
          products={appContexts.products}
          onSave={handlers.handleSaveSprintReview}
          onCancel={() => {
            modalStates.setIsSprintReviewFormOpen(false);
            modalStates.setEditingSprintReview(null);
          }}
        />
      )}

      {/* Modals - Sprint Retrospective */}
      {modalStates.isSprintRetroFormOpen && (
        <SprintRetroForm
          retro={modalStates.editingSprintRetro}
          sprints={appContexts.sprints}
          contacts={appContexts.contacts}
          products={appContexts.products}
          onSave={handlers.handleSaveSprintRetro}
          onCancel={() => {
            modalStates.setIsSprintRetroFormOpen(false);
            modalStates.setEditingSprintRetro(null);
          }}
        />
      )}


    </NavigateProvider>
  );
}

export default AppContent;
