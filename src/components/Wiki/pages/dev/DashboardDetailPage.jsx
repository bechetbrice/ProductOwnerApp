import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * DashboardDetailPage - Documentation TECHNIQUE du Module Dashboard
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const DashboardDetailPage = ({ onBack, onSwitchToUser }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-8 space-y-6">
        
        {/* Bouton retour */}
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Retour au Wiki
        </button>

        {/* Header principal */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Dashboard</h1>
              <p className="text-teal-100">Version complète pour développeurs et IA • v1.0.0</p>
            </div>
            {onSwitchToUser && (
              <button
                onClick={onSwitchToUser}
                className="flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                <Users size={18} />
                Guide Utilisateur
              </button>
            )}
          </div>
        </div>

        {/* Vue d'ensemble */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Le <strong>Module Dashboard</strong> est le cockpit de pilotage centralisé de ProductOwnerApp. 
              Il agrège et visualise toutes les données des autres modules pour offrir une vision 360° du projet : 
              santé globale, progression des sprints, objectifs, budget, capacité d'équipe et jalons à venir.
            </p>
            <p>
              Le Dashboard est structuré en 4 onglets principaux : <strong>Vue d'ensemble</strong> (métriques synthétiques), 
              <strong>Roadmap</strong> (planification des sprints), <strong>Budget</strong> (suivi financier) et 
              <strong>Sprint Analytics</strong> (analyse approfondie avec graphiques). Il utilise un système de filtrage 
              par produit pour permettre une analyse globale ou ciblée.
            </p>
          </div>
        </div>

        {/* Architecture */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture du Module</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📁 Structure des fichiers</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-mono bg-gray-100 px-2 py-1 rounded">Dashboard.jsx</span> - Orchestrateur principal, gère la navigation et délègue aux composants spécialisés</p>
                <p><span className="font-mono bg-gray-100 px-2 py-1 rounded">Common/DashboardHeader.jsx</span> - Navigation entre onglets (tabs) + filtres produit/budget</p>
                <p><span className="font-mono bg-gray-100 px-2 py-1 rounded">Hooks/useDashboardMetrics.js</span> - Hook centralisant TOUS les calculs de métriques</p>
                <p><span className="font-mono bg-gray-100 px-2 py-1 rounded">Overview/OverviewTab.jsx</span> - Onglet Vue d'ensemble avec 7 sections</p>
                <p><span className="font-mono bg-gray-100 px-2 py-1 rounded">Roadmap/Roadmap.jsx</span> - Timeline des sprints et user stories</p>
                <p><span className="font-mono bg-gray-100 px-2 py-1 rounded">Budget/BudgetManager.jsx</span> - Gestion budgétaire (stats + tableau + formulaire)</p>
                <p><span className="font-mono bg-gray-100 px-2 py-1 rounded">SprintAnalytics/SprintAnalytics.jsx</span> - Graphiques d'analyse (Burndown, Burnup, CFD, Health Score)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Principe de fonctionnement</h3>
              <ol className="space-y-2 text-sm text-gray-700 ml-4 list-decimal">
                <li><span className="font-medium">Dashboard.jsx</span> reçoit TOUTES les données via props (userStories, sprints, contacts, etc.)</li>
                <li>Le hook <span className="font-medium">useDashboardMetrics</span> calcule toutes les métriques en fonction du produit sélectionné</li>
                <li><span className="font-medium">DashboardHeader</span> gère la navigation entre onglets et le filtre produit</li>
                <li>Chaque onglet reçoit les métriques filtrées et affiche ses composants spécialisés</li>
                <li>Les modifications (ex: ajout ligne budget) remontent via callbacks vers App.jsx</li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔄 Flux de données</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Sens descendant (top-down) :</p>
                <p className="ml-4">App.jsx → Dashboard → useDashboardMetrics → filtrage par produit → calculs métriques → composants fils</p>
                <p className="font-medium mt-3">Sens remontant (callbacks) :</p>
                <p className="ml-4">BudgetEntryForm → BudgetManager → Dashboard → App.jsx (onAddBudgetEntry)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets détaillés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Les 4 Onglets du Dashboard</h2>

          {/* Vue d'ensemble */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Vue d'ensemble (OverviewTab)</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📊 Sections affichées (dans l'ordre)</p>
                <ol className="text-sm text-gray-700 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">AlertsBanner</span> - Bannière d'alertes critiques (conditionnelle si alerts.hasAlerts)</li>
                  <li><span className="font-medium">HealthScoreSection</span> - Jauge de santé globale 0-100 + détail des 4 facteurs</li>
                  <li><span className="font-medium">MilestonesSection</span> - Prochains jalons sur 30 jours (fin sprint, objectifs, actions)</li>
                  <li><span className="font-medium">StrategicKPIsSection</span> - 4 KPIs clés : produits actifs, besoins non couverts, etc.</li>
                  <li><span className="font-medium">ActiveSprintSection</span> - Sprint en cours avec progression et métriques</li>
                  <li><span className="font-medium">ProblematicTasksSection</span> - Tâches bloquées/à revoir/en pause</li>
                  <li><span className="font-medium">ResourcesCapacitySection</span> - Capacité d'équipe et surcharge</li>
                  <li><span className="font-medium">HistoricalVelocitySection</span> - Vélocité des 6 derniers sprints (graphique)</li>
                </ol>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎯 EmptyState si aucune donnée</p>
                <p className="text-sm text-gray-700">
                  Condition : <span className="font-mono bg-white px-2 py-1 rounded">contacts.length === 0 && products.length === 0 && userNeeds.length === 0 && userStories.length === 0</span>
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Affiche 3 options : Charger données exemple, Ouvrir sauvegarde, Créer premier contact
                </p>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Roadmap</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                Composant <span className="font-mono bg-white px-2 py-1 rounded">Roadmap/Roadmap.jsx</span> réutilisé depuis le module Sprints.
              </p>
              <p className="font-medium text-gray-900 mb-2">Fonctionnalités :</p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li>Timeline chronologique de tous les sprints filtrés</li>
                <li>Affichage des user stories associées à chaque sprint</li>
                <li>Visualisation de la charge (story points) par sprint</li>
                <li>Props spécifique : <span className="font-mono bg-white px-1 rounded">hideProductFilter={true}</span> (filtre déjà géré par le header)</li>
              </ul>
            </div>
          </div>

          {/* Budget */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Budget</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">💰 Structure BudgetManager</p>
                <ol className="text-sm text-gray-700 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">BudgetStatsDashboard</span> - 7 colonnes : Total Planifié, Consommé, Attendu, Écart €, Écart %, Nombre lignes, Actions</li>
                  <li><span className="font-medium">BudgetTable</span> - Tableau mensuel avec colonnes : Nom, Catégorie, Sprint, Période, Montants, Statut, Actions</li>
                  <li><span className="font-medium">BudgetEntryForm</span> - Modal de création/édition (ouvert via isFormOpen/setIsFormOpen)</li>
                </ol>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Filtres Budget (dans DashboardHeader)</p>
                <p className="text-sm text-gray-700 mb-2">
                  État géré dans Dashboard.jsx : <span className="font-mono bg-white px-2 py-1 rounded">budgetFilters</span> avec 4 champs
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">sprintId :</span> Filtrer par sprint spécifique</li>
                  <li><span className="font-medium">category :</span> Salaires, Outils, Marketing, Infrastructure, Formation, Autre</li>
                  <li><span className="font-medium">periodType :</span> Mensuel, Trimestriel, Annuel, Ponctuel</li>
                  <li><span className="font-medium">status :</span> Planifié, En cours, Terminé, Annulé</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sprint Analytics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Sprint Analytics</h3>
            
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📈 Graphiques disponibles</p>
                <ol className="text-sm text-gray-700 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">Sprint Health Score</span> - Jauge radiale SVG sur 100 pts (4 facteurs : Vélocité 30, Progression 30, Flux 20, Scope 20)</li>
                  <li><span className="font-medium">Distribution Stories</span> - 3 barres de progression : À faire, En cours, Terminé</li>
                  <li><span className="font-medium">Burndown Chart</span> - LineChart (Recharts) avec ligne idéale (grise pointillée) et réelle (bleue)</li>
                  <li><span className="font-medium">Burnup Chart</span> - LineChart montrant progression vers le scope total (détection scope creep)</li>
                  <li><span className="font-medium">Cumulative Flow Diagram (CFD)</span> - AreaChart empilé (zones todo/inProgress/done)</li>
                </ol>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">⚙️ Sélecteur de sprint</p>
                <p className="text-sm text-gray-700">
                  Menu déroulant en haut permettant de choisir le sprint à analyser. 
                  Par défaut : premier sprint actif trouvé, sinon le plus récent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hook useDashboardMetrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hook useDashboardMetrics - Cœur du système</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📥 Paramètres d'entrée</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-mono bg-white px-2 py-1 rounded">products, sprints, userStories, contacts, tasks, teams</span></p>
                <p><span className="font-mono bg-white px-2 py-1 rounded">interviews, Objectives, userNeeds, budgetEntries</span></p>
                <p><span className="font-mono bg-white px-2 py-1 rounded">selectedProductId</span> - Filtre actif ("all" ou ID produit)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📤 Retourne (objet consolidé)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium mb-1">État général :</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>isEmpty</li>
                    <li>alerts</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Données filtrées :</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>filtered.products</li>
                    <li>filtered.sprints</li>
                    <li>filtered.userStories</li>
                    <li>filtered.objectives</li>
                    <li>filtered.userNeeds</li>
                    <li>filtered.budgetEntries</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Sprint & Objectifs :</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>activeSprint</li>
                    <li>activeSprints</li>
                    <li>sprintStories</li>
                    <li>sprintAnalytics</li>
                    <li>activeGoals</li>
                    <li>averageGoalProgress</li>
                    <li>strugglingGoals</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Besoins & Budget :</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>uncoveredNeeds</li>
                    <li>criticalUncoveredNeeds</li>
                    <li>budgetMetrics</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Équipe & Vélocité :</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>teamCapacity</li>
                    <li>velocityData</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Autres :</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>healthScore</li>
                    <li>upcomingMilestones</li>
                    <li>problematicTasks</li>
                    <li>strategicKPIs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🧮 Calculs principaux</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-900">1. Filtrage par produit</p>
                  <p className="ml-4">Si <span className="font-mono bg-white px-1 rounded">selectedProductId === 'all'</span> → toutes les données</p>
                  <p className="ml-4">Sinon → filtre sur productId de chaque entité</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900">2. Objectifs actifs & progression</p>
                  <p className="ml-4"><span className="font-mono bg-white px-1 rounded">activeGoals</span> = objectifs avec status === 'active'</p>
                  <p className="ml-4"><span className="font-mono bg-white px-1 rounded">getGoalProgress(goal)</span> = (stories terminées / stories totales liées) × 100</p>
                  <p className="ml-4"><span className="font-mono bg-white px-1 rounded">averageGoalProgress</span> = moyenne de tous les progrès actifs</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">3. Besoins non couverts</p>
                  <p className="ml-4"><span className="font-mono bg-white px-1 rounded">uncoveredNeeds</span> = besoins sans aucune story avec linkedNeedId</p>
                  <p className="ml-4"><span className="font-mono bg-white px-1 rounded">criticalUncoveredNeeds</span> = idem mais importance === 'critical' | 'high'</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">4. Métriques Budget</p>
                  <p className="ml-4">totalAllocated = somme plannedAmount</p>
                  <p className="ml-4">totalConsumed = somme consumedAmount</p>
                  <p className="ml-4">totalExpected = somme manualExpectedAmount</p>
                  <p className="ml-4">variance = totalExpected - totalAllocated</p>
                  <p className="ml-4">variancePercent = (variance / totalAllocated) × 100</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">5. Vélocité historique</p>
                  <p className="ml-4">Derniers 6 sprints complétés</p>
                  <p className="ml-4">Pour chaque sprint : completed = points des stories done, planned = total points</p>
                  <p className="ml-4">averageVelocity = moyenne des completed</p>
                  <p className="ml-4">velocityTrend = completed[dernier] - completed[avant-dernier]</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚠️ Hooks internes appelés</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li><span className="font-mono bg-white px-2 py-1 rounded">useSprintAnalytics(activeSprint, sprintStories)</span> - Analyse détaillée du sprint actif</li>
                <li><span className="font-mono bg-white px-2 py-1 rounded">{'useHealthScore({...})'}</span> - Calcul du Health Score global</li>
                <li><span className="font-mono bg-white px-2 py-1 rounded">{'useMilestones({...})'}</span> - Prochains jalons sur 30 jours</li>
                <li><span className="font-mono bg-white px-2 py-1 rounded">{'useTeamCapacity({ teams, contacts, activeSprint })'}</span> - Capacité et surcharge équipe</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Formules de calcul */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Formules de Calcul Clés</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📊 Health Score (0-100)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Facteur 1 : Progression Objectifs (30 pts max)</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">score = (averageGoalProgress / 100) × 30</p>
                
                <p className="font-medium mt-3">Facteur 2 : Couverture Besoins (25 pts max)</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">score = ((totalNeeds - uncoveredNeeds) / totalNeeds) × 25</p>
                
                <p className="font-medium mt-3">Facteur 3 : Santé Sprint (25 pts max)</p>
                <p className="ml-4">Si sprint en avance/dans les temps : 25 pts</p>
                <p className="ml-4">Si retard : 25 - (écart progressPercentage vs timeProgressPercentage)</p>
                
                <p className="font-medium mt-3">Facteur 4 : Budget (20 pts max)</p>
                <p className="ml-4">Si écart &lt;5% : 20 pts</p>
                <p className="ml-4">Si écart 5-10% : 15 pts</p>
                <p className="ml-4">Si écart &gt;10% : 10 pts</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📉 Sprint Analytics - Burndown</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Ligne idéale (linéaire)</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">idealRemaining[jour_i] = totalPoints - (totalPoints / totalDays) × i</p>
                
                <p className="font-medium mt-3">Ligne réelle (estimation)</p>
                <p className="ml-4">Pour jours passés : basé sur progressPercentage actuel</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">actualRemaining = totalPoints - (totalPoints × (currentProgress / dayProgress) × dayProgress)</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📈 Sprint Health Score (0-100)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Facteur 1 : Vélocité vs Moyenne (30 pts max)</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">score = min(30, (currentVelocity / avgVelocity) × 30)</p>
                
                <p className="font-medium mt-3">Facteur 2 : Progression vs Temps (30 pts max)</p>
                <p className="ml-4">Si progressPercentage ≥ timeProgressPercentage : 30 pts</p>
                <p className="ml-4">Sinon : max(0, 30 - écart)</p>
                
                <p className="font-medium mt-3">Facteur 3 : Flux de travail (20 pts max)</p>
                <p className="ml-4">Si inProgressRatio &gt; 50% : 10 pts (trop de WIP)</p>
                <p className="ml-4">Si inProgressRatio &gt; 30% : 15 pts</p>
                <p className="ml-4">Sinon : 20 pts</p>
                
                <p className="font-medium mt-3">Facteur 4 : Stabilité scope (20 pts max)</p>
                <p className="ml-4">Par défaut : 20 pts (pas de détection scope creep actuellement)</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚡ Vélocité & Prédiction</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Vélocité moyenne</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">velocity = completedPoints / elapsedDays</p>
                
                <p className="font-medium mt-3">Prédiction fin de sprint</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">predictedDays = (totalPoints - completedPoints) / velocity</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">predictedEndDate = today + predictedDays</p>
                
                <p className="font-medium mt-3">Sprint on track ?</p>
                <p className="ml-4 font-mono bg-white px-2 py-1 rounded inline-block">isOnTrack = predictedEndDate ≤ endDate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conseils pratiques */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-600 flex-shrink-0" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Conseils Pratiques pour Développeurs</h2>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>🔧 <span className="font-medium">Optimisation useMemo :</span> Tous les calculs coûteux dans useDashboardMetrics sont memoïsés pour éviter les recalculs inutiles</li>
              <li>📊 <span className="font-medium">Recharts :</span> Utilisé pour tous les graphiques. Penser à ResponsiveContainer pour le responsive</li>
              <li>🎨 <span className="font-medium">Tailwind :</span> Classes utilitaires uniquement. Pas de CSS custom</li>
              <li>⚙️ <span className="font-medium">État local minimal :</span> Dashboard.jsx gère uniquement activeTab, selectedProductId et budgetFilters</li>
              <li>🔄 <span className="font-medium">Callbacks :</span> Toutes les actions de modification (ajout/update/delete budget) remontent vers App.jsx</li>
              <li>📱 <span className="font-medium">Responsive :</span> Tabs deviennent dropdown sur mobile. Grid 2 cols devient 1 col</li>
              <li>🎯 <span className="font-medium">EmptyState :</span> Toujours prévoir un état vide avec CTA clair</li>
              <li>🚨 <span className="font-medium">Alertes :</span> Bannière conditionnelle uniquement si alerts.hasAlerts</li>
              <li>📈 <span className="font-medium">Graphiques SVG :</span> Sprint Health Score utilise SVG natif (cercles) pour contrôle total</li>
              <li>🔍 <span className="font-medium">Filtres Budget :</span> État séparé qui se réinitialise au changement d'onglet</li>
            </ul>
          </div>
        </div>

        {/* Intégrations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégrations avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🔗 Tous les modules</h3>
              <p className="text-sm text-gray-700">
                Le Dashboard agrège les données de TOUS les modules : Contacts, Teams, Products, Objectives, 
                User Needs, User Stories, Sprints, Tasks, Interviews, Budget. C'est le seul module à avoir une vision complète.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🔀 Navigation inter-modules</h3>
              <p className="text-sm text-gray-700">
                Props <span className="font-mono bg-white px-2 py-1 rounded">onNavigateToView</span> et 
                <span className="font-mono bg-white px-2 py-1 rounded ml-1">onNavigateToInterview</span> permettent 
                de naviguer depuis le Dashboard vers les modules concernés (ex: clic sur "Voir sprint" → module Sprints).
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">💾 Aucun stockage local direct</h3>
              <p className="text-sm text-gray-700">
                Le Dashboard ne modifie jamais directement le localStorage. Toutes les modifications 
                (ex: budget) remontent via callbacks vers App.jsx qui gère la persistence.
              </p>
            </div>
          </div>
        </div>

        {/* Points d'attention */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚠️ Points d'Attention & Limitations</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">1. Performance avec gros volumes</h3>
              <p className="text-sm text-gray-700">
                useDashboardMetrics calcule TOUTES les métriques à chaque render. 
                Avec 1000+ user stories, peut devenir lent. Optimisation future : pagination ou lazy loading.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">2. Burndown/Burnup = Estimations</h3>
              <p className="text-sm text-gray-700">
                Les lignes "réelles" des graphiques sont des ESTIMATIONS basées sur la progression actuelle. 
                Ne pas les confondre avec un tracking quotidien réel des points restants.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">3. Sprint Health Score simplifié</h3>
              <p className="text-sm text-gray-700">
                Le facteur "Stabilité scope" est toujours à 20 pts car il n'y a pas encore de détection 
                de scope creep (ajout stories en cours de sprint). À améliorer.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">4. Roadmap = Composant externe</h3>
              <p className="text-sm text-gray-700">
                L'onglet Roadmap réutilise le composant du module Sprints. 
                Toute modification du composant Roadmap impactera les deux endroits.
              </p>
            </div>
          </div>
        </div>

        {/* Footer avec lien vers version utilisateur */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">📘 Vous cherchez une version simplifiée ?</h3>
              <p className="text-sm text-gray-700">
                Un <span className="font-medium">guide utilisateur</span> plus court et pédagogique est disponible pour les Product Owners 
                qui veulent juste apprendre à utiliser le Dashboard.
              </p>
            </div>
            {onSwitchToUser && (
              <button
                onClick={onSwitchToUser}
                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-md whitespace-nowrap ml-4"
              >
                <Users size={20} />
                Voir le Guide Utilisateur
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardDetailPage;
