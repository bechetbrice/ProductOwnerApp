import { lazy } from 'react';
import { enrichNeeds } from '../../utils/analysis/needEnrichment';

// Lazy loading de tous les modules
const Dashboard = lazy(() => import('../Dashboard'));
const UserNeedsList = lazy(() => import('../UserNeeds/UserNeedsList'));
const TeamsList = lazy(() => import('../Teams').then(m => ({ default: m.TeamsList })));
const TasksList = lazy(() => import('../TasksManagement').then(m => ({ default: m.TasksList })));
const Moscow = lazy(() => import('../Moscow').then(m => ({ default: m.Moscow })));
const Rice = lazy(() => import('../Rice').then(m => ({ default: m.Rice })));
const UserStoriesList = lazy(() => import('../UserStories').then(m => ({ default: m.UserStoriesList })));
const PersonasList = lazy(() => import('../Personas').then(m => ({ default: m.PersonasList })));
const PlanningPoker = lazy(() => import('../PlanningPoker/PlanningPoker'));
const SprintReviewList = lazy(() => import('../SprintReviews').then(m => ({ default: m.SprintReviewList })));
const SprintRetroList = lazy(() => import('../SprintRetrospective').then(m => ({ default: m.SprintRetroList })));
const ContactsList = lazy(() => import('../Contacts').then(m => ({ default: m.ContactsList })));
const Wiki = lazy(() => import('../Wiki/Wiki'));
const FAQ = lazy(() => import('../FAQ/FAQ'));
const InterviewsList = lazy(() => import('../Interviews/InterviewsList'));
const ProductsManager = lazy(() => import('../Products').then(m => ({ default: m.ProductsManager })));
const ObjectivesManager = lazy(() => import('../Objectives').then(m => ({ default: m.ObjectivesManager })));
const BudgetManager = lazy(() => import('../Dashboard/Budget/BudgetManager'));
const SprintTracking = lazy(() => import('../SprintsManagement/SprintTracking'));
const SprintBoard = lazy(() => import('../SprintBoard').then(m => ({ default: m.SprintBoard })));
const TaskBoard = lazy(() => import('../TaskBoard').then(m => ({ default: m.TaskBoard })));
const SprintTimeline = lazy(() => import('../Dashboard/Roadmap').then(m => ({ default: m.Roadmap })));
const Roadmap = lazy(() => import('../Roadmap'));
const Settings = lazy(() => import('../Settings').then(m => ({ default: m.Settings })));

/**
 * ViewRenderer - Composant centralisé pour le rendu des vues
 * Gère le switch géant de renderView() de manière plus maintenable
 */
export const ViewRenderer = ({
  currentView,
  viewFilters,
  contexts,
  handlers,
  onNavigateToView,
  setCurrentView,
  setPrefilledStoryData,
  setIsStoryFormModalOpen
}) => {
  const {
    products,
    objectives,
    contacts,
    userNeeds,
    userStories,
    interviews,
    personas,
    sprints,
    tasks,
    teams,
    teamMembers,
    budgetEntries,
    sprintReviews,
    sprintRetrospectives,
    settings,
    othersActions
  } = contexts;

  // Dashboard
  if (currentView === 'dashboard') {
    return (
      <Dashboard 
        userNeeds={userNeeds} 
        userStories={userStories} 
        interviews={interviews}
        contacts={contacts}
        objectives={objectives}
        products={products}
        personas={personas}
        sprints={sprints}
        tasks={tasks}
        teams={teams}
        budgetEntries={budgetEntries}
        onNavigateToInterview={(interviewId) => {
          setCurrentView('interviews');
          const interview = interviews.find(i => i.id === interviewId);
          if (interview) handlers.handleViewInterview(interview);
        }}
        onNavigateToView={onNavigateToView}
        onAddBudgetEntry={othersActions.addBudgetEntry}
        onUpdateBudgetEntry={othersActions.updateBudgetEntry}
        onDeleteBudgetEntry={othersActions.deleteBudgetEntry}
      />
    );
  }

  // Helper pour créer story depuis besoin
  const createStoryFromNeed = (need) => {
    const storyData = {
      title: `Story pour: ${need.objective || need.context || 'Besoin'}`,
      description: '',
      linkedNeedId: need.id,
      stakeholderIds: need.stakeholderIds || [],
      productId: need.productId || '',
      estimation: need.storyPoints || 0,
      priority: need.importance === 'critical' ? 'must' 
        : need.importance === 'high' ? 'should'
        : need.importance === 'low' ? 'wont'
        : 'could'
    };
    setPrefilledStoryData(storyData);
    setIsStoryFormModalOpen(true);
  };

  // Mappage des vues
  const viewsMap = {
    // Produits & Objectifs
    products: () => (
      <ProductsManager
        products={products}
        objectives={objectives}
        userNeeds={userNeeds}
        userStories={userStories}
        contacts={contacts}
        interviews={interviews}
        onAdd={contexts.productsActions.add}
        onUpdate={contexts.productsActions.update}
        onDelete={contexts.productsActions.delete}
        onNavigateToView={onNavigateToView}
        onImportProducts={contexts.productsActions.import}
      />
    ),

    objectives: () => (
      <ObjectivesManager
        objectives={objectives}
        products={products}
        userNeeds={userNeeds}
        userStories={userStories}
        onAdd={contexts.objectivesActions.add}
        onUpdate={contexts.objectivesActions.update}
        onDelete={contexts.objectivesActions.delete}
        onImportGoals={contexts.objectivesActions.import}
        initialFilters={viewFilters}
      />
    ),

    // Contacts & Interviews
    contacts: () => (
      <ContactsList
        contacts={contacts}
        userNeeds={userNeeds}
        userStories={userStories}
        interviews={interviews}
        products={products}
        onEdit={handlers.handleOpenContactForm}
        onDelete={contexts.contactsActions.delete}
        onNew={() => handlers.handleOpenContactForm(null)}
        onNavigate={handlers.handleNavigate}
        onImportContacts={contexts.contactsActions.import}
        initialFilters={viewFilters}
      />
    ),

    interviews: () => (
      <InterviewsList
        interviews={interviews}
        contacts={contacts}
        userNeeds={userNeeds}
        products={products}
        onAdd={handlers.handleAddInterview}
        onUpdate={handlers.handleEditInterview}
        onDelete={contexts.interviewsActions.delete}
        onView={handlers.handleViewInterview}
        onImportInterviews={contexts.interviewsActions.import}
        initialFilters={viewFilters}
      />
    ),

    // Personas
    personas: () => (
      <PersonasList
        personas={personas}
        contacts={contacts}
        userNeeds={userNeeds}
        userStories={userStories}
        interviews={interviews}
        products={products}
        onAdd={contexts.personasActions.add}
        onUpdate={handlers.handleUpdatePersona}
        onDelete={contexts.personasActions.delete}
        onView={handlers.handleViewPersona}
        onImportPersonas={contexts.personasActions.import}
      />
    ),

    // User Needs - Découverte
    userNeeds: () => (
      <UserNeedsList
        userNeeds={userNeeds}
        userStories={userStories}
        contacts={contacts}
        interviews={interviews}
        objectives={objectives}
        products={products}
        personas={personas}
        onAdd={handlers.handleAddUserNeed}
        onUpdate={contexts.userNeedsActions.update}
        onDelete={contexts.userNeedsActions.delete}
        prefilledData={null}
        onClearPrefilled={() => {}}
        onNavigate={handlers.handleNavigate}
        onImportNeeds={contexts.userNeedsActions.import}
        initialFilters={viewFilters}
      />
    ),

    estimationSession: () => (
      <PlanningPoker
        userNeeds={userNeeds}
        contacts={contacts}
        products={products}
        personas={personas}
        userStories={userStories}
        interviews={interviews}
        objectives={objectives}
        onUpdateNeed={contexts.userNeedsActions.update}
        onNavigate={handlers.handleNavigate}
        onImportNeeds={contexts.userNeedsActions.import}
      />
    ),

    // Priorisation
    priorityView: () => (
      <Moscow
        userNeeds={userNeeds}
        userStories={userStories}
        contacts={contacts}
        personas={personas}
        products={products}
        interviews={interviews}
        objectives={objectives}
        onUpdateNeed={contexts.userNeedsActions.update}
        onCreateStory={createStoryFromNeed}
        onNavigate={handlers.handleNavigate}
        onImportNeeds={contexts.userNeedsActions.import}
      />
    ),

    prioritizationMatrix: () => (
      <Rice
        enrichedNeeds={enrichNeeds(userNeeds, { contacts, products, userStories })}
        userNeeds={userNeeds}
        userStories={userStories}
        contacts={contacts}
        personas={personas}
        products={products}
        interviews={interviews}
        objectives={objectives}
        onCreateStory={createStoryFromNeed}
        onNavigate={handlers.handleNavigate}
        onUpdateNeed={contexts.userNeedsActions.update}
        onImportNeeds={contexts.userNeedsActions.import}
      />
    ),

    // User Stories & Backlog
    userStories: () => (
      <UserStoriesList
        userStories={userStories}
        userNeeds={userNeeds}
        contacts={contacts}
        objectives={objectives}
        products={products}
        interviews={interviews}
        personas={personas}
        teamMembers={teamMembers}
        teams={teams}
        onAdd={handlers.handleAddUserStory}
        onUpdate={contexts.userStoriesActions.update}
        onDelete={contexts.userStoriesActions.delete}
        onNavigate={handlers.handleNavigate}
        initialFilters={viewFilters}
      />
    ),

    // Teams & Tasks
    teams: () => (
      <TeamsList
        teams={teams}
        contacts={contacts}
        products={products}
        onAdd={handlers.handleAddTeam}
        onUpdate={handlers.handleUpdateTeam}
        onDelete={othersActions.deleteTeam}
        onImportTeams={othersActions.importTeams}
      />
    ),

    tasks: () => (
      <TasksList
        tasks={tasks}
        userStories={userStories}
        sprints={sprints}
        contacts={contacts}
        teams={teams}
        products={products}
        onAdd={othersActions.addTask}
        onUpdate={othersActions.updateTask}
        onDelete={othersActions.deleteTask}
        initialTaskId={viewFilters?.taskId}
      />
    ),

    // Sprints
    sprints: () => (
      <SprintTracking
        sprints={sprints}
        userStories={userStories}
        interviews={interviews}
        contacts={contacts}
        products={products}
        teamMembers={teamMembers}
        teams={teams}
        onAdd={contexts.sprintsActions.add}
        onUpdate={contexts.sprintsActions.update}
        onDelete={contexts.sprintsActions.delete}
        initialFilters={viewFilters}
      />
    ),

    sprintBoard: () => (
      <SprintBoard
        sprints={sprints}
        userStories={userStories}
        userNeeds={userNeeds}
        contacts={contacts}
        products={products}
        objectives={objectives}
        interviews={interviews}
        personas={personas}
        teamMembers={teamMembers}
        teams={teams}
        onUpdateStory={contexts.userStoriesActions.update}
        onNavigate={setCurrentView}
      />
    ),

    taskBoard: () => (
      <TaskBoard
        tasks={tasks}
        userStories={userStories}
        sprints={sprints}
        contacts={contacts}
        teams={teams}
        products={products}
        onUpdateTask={othersActions.updateTask}
        onNavigate={setCurrentView}
      />
    ),

    'sprint-timeline': () => (
      <SprintTimeline
        sprints={sprints}
        userStories={userStories}
        products={products}
        teamMembers={teamMembers}
        teams={teams}
        contacts={contacts}
        interviews={interviews}
        objectives={objectives}
        personas={personas}
        userNeeds={userNeeds}
        tasks={tasks}
        onEdit={() => setCurrentView('sprints')}
        onUpdateStory={contexts.userStoriesActions.update}
      />
    ),

    // Roadmap du projet
    roadmap: () => <Roadmap />,

    // Reviews & Retros
    sprintReviews: () => (
      <SprintReviewList
        sprintReviews={sprintReviews}
        sprints={sprints}
        userStories={userStories}
        contacts={contacts}
        products={products}
        onEdit={handlers.handleEditSprintReview}
        onDelete={othersActions.deleteSprintReview}
        onNew={handlers.handleAddSprintReview}
        initialFilters={viewFilters}
      />
    ),

    sprintRetrospectives: () => (
      <SprintRetroList
        sprintRetrospectives={sprintRetrospectives}
        sprints={sprints}
        contacts={contacts}
        products={products}
        onEdit={handlers.handleEditSprintRetro}
        onDelete={othersActions.deleteSprintRetro}
        onNew={handlers.handleAddSprintRetro}
        initialFilters={viewFilters}
      />
    ),

    // Budget
    budget: () => (
      <BudgetManager
        budgetEntries={budgetEntries}
        products={products}
        sprints={sprints}
        contacts={contacts}
        onAddBudgetEntry={othersActions.addBudgetEntry}
        onUpdateBudgetEntry={othersActions.updateBudgetEntry}
        onDeleteBudgetEntry={othersActions.deleteBudgetEntry}
        selectedProductId={viewFilters.productId || ''}
      />
    ),

    // Wiki & FAQ
    wiki: () => <Wiki />,
    faq: () => <FAQ />,

    // Settings
    settings: () => (
      <Settings 
        onExport={handlers.handleExport}
        onImport={handlers.handleImport}
        userNeeds={userNeeds}
        userStories={userStories}
        contacts={contacts}
        interviews={interviews}
        products={products}
        objectives={objectives}
        sprints={sprints}
        teams={teams}
        personas={personas}
        tasks={tasks}
        sprintReviews={sprintReviews}
        sprintRetrospectives={sprintRetrospectives}
        budgetEntries={budgetEntries}
        settings={settings}
        onUpdateSettings={othersActions.updateSettings}
      />
    )
  };

  // Rendu de la vue ou fallback sur Dashboard
  const renderView = viewsMap[currentView];
  
  if (renderView) {
    return renderView();
  }

  // Fallback
  return (
    <Dashboard 
      userNeeds={userNeeds} 
      userStories={userStories} 
      interviews={interviews} 
      objectives={objectives} 
      products={products} 
    />
  );
};
