import { useState, useMemo, Suspense } from 'react';
import { BookOpen, Target, Users, MessageSquare, ClipboardList, CalendarRange, CheckSquare, Search, Filter, Eye, Book, Crosshair, UserCircle, TrendingUp, LayoutGrid, BarChart3, Clock, Activity, List, Settings, Home, Kanban, Calendar, RotateCcw, Euro } from 'lucide-react';
import { Pagination } from '../ui';
import LoadingWikiPage from './LoadingWikiPage';
import {
  ProductsDetailPage,
  ProductsUserPage,
  ObjectivesDetailPage,
  ObjectivesUserPage,
  ContactsDetailPage,
  ContactsUserPage,
  TeamsDetailPage,
  TeamsUserPage,
  InterviewsDetailPage,
  InterviewsUserPage,
  UserNeedsDetailPage,
  UserNeedsUserPage,
  PersonasDetailPage,
  PersonasUserPage,
  PlanningPokerDetailPage,
  PlanningPokerUserPage,
  MoscowDetailPage,
  MoscowUserPage,
  RiceDetailPage,
  RiceUserPage,
  UserStoriesDetailPage,
  UserStoriesUserPage,
  SprintsDetailPage,
  SprintsUserPage,
  SprintReviewsDetailPage,
  SprintReviewsUserPage,
  SprintRetrospectiveDetailPage,
  SprintRetrospectiveUserPage,
  SprintBoardUserPage,
  SprintBoardDetailPage,
  TasksManagementDetailPage,
  TasksManagementUserPage,
  SettingsDetailPageNew,
  SettingsUserPage,
  DashboardDetailPage,
  DashboardUserPage,
  TaskBoardDetailPage,
  TaskBoardUserPage
} from './pages';

const Wiki = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [wikiMode, setWikiMode] = useState('user'); // 'user' ou 'dev'
  const pagesPerPage = 9;

  const features = [
    // Vue d'ensemble
    { 
      id: 'dashboardDetail', 
      icon: Home, 
      title: 'Module Dashboard - Guide', 
      description: 'Cockpit de pilotage produit avec 3 modes : Vue d\'ensemble, Sprint Actif, Objectifs. Product Health Score inclus.',
      category: 'overview'
    },
    // Organisation
    { 
      id: 'contactsDetail', 
      icon: UserCircle, 
      title: 'Module Contacts - Guide', 
      description: 'Gestion contacts internes/externes avec capacités équipe : compétences, disponibilité, niveaux d\'expérience.',
      category: 'organization'
    },
    { 
      id: 'teamDetail', 
      icon: Users, 
      title: 'Module Équipes - Guide', 
      description: 'Organisez vos contacts en Squads, Chapters, Projets temporaires avec capacités collectives calculées.',
      category: 'organization'
    },
    // Stratégie Produit
    { 
      id: 'productsDetail', 
      icon: Book, 
      title: 'Module Produits - Guide', 
      description: 'Gestion multi-produits : codes, couleurs, statuts. Point d\'entrée de votre gestion produit.',
      category: 'strategy'
    },
    { 
      id: 'ObjectivesDetail', 
      icon: Crosshair, 
      title: 'Module Objectifs Produit - Guide', 
      description: 'Objectifs SMART avec KPIs, métriques de succès, suivi progression et alignement stratégique.',
      category: 'strategy'
    },
    // Exploration
    { 
      id: 'interviewsDetail', 
      icon: MessageSquare, 
      title: 'Module Entretiens - Guide', 
      description: 'Préparer et mener vos entretiens. Insights et actions de suivi intégrés.',
      category: 'exploration'
    },
    { 
      id: 'userNeedsDetail', 
      icon: Target, 
      title: 'Module Besoins Utilisateurs - Guide', 
      description: 'Capture besoins, priorisation par importance/effort, transformation en stories avec traçabilité.',
      category: 'exploration'
    },
    { 
      id: 'personasDetail', 
      icon: Users, 
      title: 'Module Personas - Guide', 
      description: 'Profils utilisateurs détaillés : objectifs, frustrations, comportements, citations et liaisons.',
      category: 'exploration'
    },
    // Backlog Refinement
    { 
      id: 'priorityViewDetail', 
      icon: LayoutGrid, 
      title: 'Module Vue Priorités - Guide', 
      description: 'Kanban 4 colonnes MoSCoW avec drag & drop pour prioriser vos User Stories visuellement.',
      category: 'refinement'
    },
    { 
      id: 'estimationDetail', 
      icon: TrendingUp, 
      title: 'Module Planning Poker - Guide', 
      description: 'Session d\'estimation Fibonacci collaborative : workflow 3 colonnes, consensus équipe, Story Points.',
      category: 'refinement'
    },
    { 
      id: 'prioritizationMatrixDetail', 
      icon: BarChart3, 
      title: 'Module Matrice Priorisation - Guide', 
      description: 'Matrice 2×2 Valeur/Effort avec calculs RICE/ICE automatiques et création rapide de stories.',
      category: 'refinement'
    },
    { 
      id: 'userStoriesDetail', 
      icon: ClipboardList, 
      title: 'Module User Stories - Guide', 
      description: 'Backlog complet avec méthode MoSCoW, équilibre 60/20/20, filtres avancés et actions en masse.',
      category: 'refinement'
    },
    // Sprint Planning
    { 
      id: 'sprintsDetail', 
      icon: CalendarRange, 
      title: 'Module Gestion Sprints - Guide', 
      description: 'Sprint Planning avec capacité équipe, buffer technique 20%, sélection stories et alertes surcharge.',
      category: 'planning'
    },
    { 
      id: 'tasksDetail', 
      icon: CheckSquare, 
      title: 'Module Tâches - Guide', 
      description: 'Décomposition User Stories en tâches techniques : types, estimation heures, assignation développeurs.',
      category: 'planning'
    },
    // Daily Scrum
    { 
      id: 'sprintBoardDetail', 
      icon: Kanban, 
      title: 'Module Sprint Board - Guide', 
      description: 'Kanban Daily sprint actif : drag & drop HTML5 natif, 3 colonnes (À faire/En cours/Outcome), gestion outcomes.',
      category: 'daily'
    },
    { 
      id: 'taskBoardDetail', 
      icon: CheckSquare, 
      title: 'Module Task Board - Guide', 
      description: 'Kanban tâches techniques sprint actif : glisser-déposer HTML5 natif, suivi heures quotidien.',
      category: 'daily'
    },
    // Review & Retrospective
    { 
      id: 'sprintReviewDetail', 
      icon: Calendar, 
      title: 'Module Sprint Reviews - Guide', 
      description: 'Présentation incrément produit aux stakeholders : démo stories, capture feedback, décisions.',
      category: 'review'
    },
    { 
      id: 'sprintRetrospectiveDetail', 
      icon: RotateCcw, 
      title: 'Module Rétrospectives - Guide', 
      description: 'Amélioration continue équipe : dot-voting interactif, actions d amélioration, engagements.',
      category: 'review'
    },
    // Paramètres
    { 
      id: 'settingsDetail', 
      icon: Settings, 
      title: 'Module Paramétrage - Guide', 
      description: 'Configuration app : export/import JSON, code PIN sécurité, verrouillage, thèmes.',
      category: 'settings'
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes les catégories', color: 'gray' },
    { id: 'overview', label: 'Vue d\'ensemble', color: 'teal' },
    { id: 'organization', label: 'Organisation', color: 'cyan' },
    { id: 'strategy', label: 'Stratégie Produit', color: 'emerald' },
    { id: 'exploration', label: 'Exploration', color: 'teal' },
    { id: 'refinement', label: 'Backlog Refinement', color: 'amber' },
    { id: 'planning', label: 'Sprint Planning', color: 'green' },
    { id: 'daily', label: 'Daily Scrum', color: 'orange' },
    { id: 'review', label: 'Review & Retro', color: 'pink' }
  ];

  // Filtrage et recherche
  const filteredFeatures = useMemo(() => {
    return features.filter(feature => {
      const matchesSearch = !searchTerm || 
        feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || feature.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory, features]);

  // Pagination
  const totalPages = Math.ceil(filteredFeatures.length / pagesPerPage);
  const startIndex = (currentPageNum - 1) * pagesPerPage;
  const endIndex = startIndex + pagesPerPage;
  const paginatedFeatures = filteredFeatures.slice(startIndex, endIndex);

  // Réinitialiser la page lors du changement de filtre
  useMemo(() => {
    setCurrentPageNum(1);
  }, [searchTerm, filterCategory]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
  };

  const hasActiveFilters = searchTerm || filterCategory !== 'all';

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'gray';
  };

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
  };

  const HomePage = () => (
    <>
      {/* Section Pourquoi */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950 rounded-xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 border border-teal-100 dark:border-teal-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">Pourquoi ProductOwnerApp ?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { title: '100% Gratuit et Open Source', desc: 'Aucun coût caché, aucun abonnement, utilisez-le librement.' },
            { title: 'Vos Données Vous Appartiennent', desc: 'Stockage 100% local, pas de serveur, pas de cloud imposé.' },
            { title: 'Utilisable Hors Ligne', desc: 'Travaillez partout, même sans connexion internet.' },
            { title: 'Interface Moderne et Intuitive', desc: 'Design épuré, responsive, adapté à tous les écrans.' },
            { title: 'Export/Import JSON', desc: 'Synchronisez facilement vos données entre plusieurs appareils.' }
          ].map((item, index) => (
            <div key={index} className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">✓</div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 text-sm sm:text-base">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 border-l-4 border-teal-500">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500 dark:text-teal-400" />
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{features.length}</p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium truncate">Pages</p>
        </div>

        {categories.filter(c => c.id !== 'all').map(cat => (
          <div 
            key={cat.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 border-l-4 border-${cat.color}-500 cursor-pointer transition-all ${
              filterCategory === cat.id ? 'ring-2 ring-teal-500 shadow-xl scale-105' : 'hover:shadow-lg'
            }`}
            onClick={() => setFilterCategory(filterCategory === cat.id ? 'all' : cat.id)}
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-${cat.color}-100 dark:bg-${cat.color}-900 rounded flex items-center justify-center`}>
                <span className="text-xs font-bold text-gray-800 dark:text-gray-100">{features.filter(f => f.category === cat.id).length}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium truncate">{cat.label}</p>
            {filterCategory === cat.id && <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1">✓ Actif</p>}
          </div>
        ))}
      </div>

      {/* Grille des pages */}
      {filteredFeatures.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 sm:p-12 text-center">
          <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-2">Aucune page ne correspond à vos critères de recherche</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm sm:text-base"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {paginatedFeatures.map((feature) => {
              const Icon = feature.icon;
              const categoryColor = getCategoryColor(feature.category);
              
              return (
                <div 
                  key={feature.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full cursor-pointer border border-gray-200 dark:border-gray-700"
                  onClick={() => setCurrentPage(feature.id)}
                >
                  <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-${categoryColor}-100 dark:bg-${categoryColor}-900 rounded-lg flex-shrink-0`}>
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${categoryColor}-600 dark:text-${categoryColor}-400`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-2">
                          {feature.title}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 dark:bg-${categoryColor}-900 text-${categoryColor}-700 dark:text-${categoryColor}-300 truncate max-w-full`}>
                          {getCategoryLabel(feature.category)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1">
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-3">{feature.description}</p>
                  </div>

                  <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-xs sm:text-sm">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      Consulter
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPageNum}
            totalItems={filteredFeatures.length}
            itemsPerPage={pagesPerPage}
            onPageChange={setCurrentPageNum}
            itemLabel="page"
          />
        </>
      )}
    </>
  );

  if (currentPage === 'home') {
    return (
      <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 lg:p-8">
        <HomePage />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 🚀 QW4 OPTIMISATION : Pages lazy loaded avec Suspense
  // Chaque page n'est chargée qu'au clic (30-40 KB)
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 lg:p-8">
      <Suspense fallback={<LoadingWikiPage />}>
        {currentPage === 'dashboardDetail' && (
          wikiMode === 'user' ? (
            <DashboardUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <DashboardDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'productsDetail' && (
          wikiMode === 'user' ? (
            <ProductsUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <ProductsDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'ObjectivesDetail' && (
          wikiMode === 'user' ? (
            <ObjectivesUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <ObjectivesDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'contactsDetail' && (
          wikiMode === 'user' ? (
            <ContactsUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <ContactsDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'teamDetail' && (
          wikiMode === 'user' ? (
            <TeamsUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <TeamsDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'interviewsDetail' && (
          wikiMode === 'user' ? (
            <InterviewsUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <InterviewsDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'personasDetail' && (
          wikiMode === 'user' ? (
            <PersonasUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <PersonasDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'userNeedsDetail' && (
          wikiMode === 'user' ? (
            <UserNeedsUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <UserNeedsDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'estimationDetail' && (
          wikiMode === 'user' ? (
            <PlanningPokerUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <PlanningPokerDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'priorityViewDetail' && (
          wikiMode === 'user' ? (
            <MoscowUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <MoscowDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'prioritizationMatrixDetail' && (
          wikiMode === 'user' ? (
            <RiceUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <RiceDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'userStoriesDetail' && (
          wikiMode === 'user' ? (
            <UserStoriesUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <UserStoriesDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'sprintsDetail' && (
          wikiMode === 'user' ? (
            <SprintsUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <SprintsDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'tasksDetail' && (
          wikiMode === 'user' ? (
            <TasksManagementUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <TasksManagementDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'sprintBoardDetail' && (
          wikiMode === 'user' ? (
            <SprintBoardUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <SprintBoardDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'taskBoardDetail' && (
          wikiMode === 'user' ? (
            <TaskBoardUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <TaskBoardDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'sprintReviewDetail' && (
          wikiMode === 'user' ? (
            <SprintReviewsUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <SprintReviewsDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'sprintRetrospectiveDetail' && (
          wikiMode === 'user' ? (
            <SprintRetrospectiveUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <SprintRetrospectiveDetailPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
        
        {currentPage === 'settingsDetail' && (
          wikiMode === 'user' ? (
            <SettingsUserPage 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToDev={() => setWikiMode('dev')}
            />
          ) : (
            <SettingsDetailPageNew 
              onBack={() => { setCurrentPage('home'); setWikiMode('user'); }}
              onSwitchToUser={() => setWikiMode('user')}
            />
          )
        )}
      </Suspense>
    </div>
  );
};

export default Wiki;
