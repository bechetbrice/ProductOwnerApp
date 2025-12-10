import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users, CheckSquare, Clock, Eye, RefreshCw } from 'lucide-react';

/**
 * TaskBoardDetailPage - Documentation TECHNIQUE du Module Task Board
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 4.3.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const TaskBoardDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Task Board</h1>
              <p className="text-teal-100">Version complète pour développeurs et IA • v4.3.0</p>
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
              Le <strong>Task Board</strong> est un tableau Kanban pour gérer les tâches techniques du sprint actif. 
              Il utilise le <strong>drag & drop natif HTML5</strong> et permet de suivre l'avancement quotidien 
              des développements avec un système de colonnes visuelles.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Il affiche uniquement les tâches du sprint actif et s'intègre avec les modules Tasks Management, 
              Sprints, User Stories et Products pour une vue d'ensemble cohérente.
            </p>
          </div>

          <div className="mt-4 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
            <h3 className="font-semibold text-cyan-900 mb-2">🎯 Fonctionnalités Principales</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li><strong>Kanban 3 colonnes</strong> : 📋 À faire, 🔄 En cours, 🎯 Outcome</li>
              <li><strong>Drag & Drop HTML5</strong> : Déplacement fluide des tâches entre colonnes</li>
              <li><strong>Gestion Outcomes</strong> : 5 états finaux (completed, paused, blocked, cancelled, to_review)</li>
              <li><strong>Filtres avancés</strong> : Produit, Sprint, User Story, Développeur, Type</li>
              <li><strong>FilterBar standardisée</strong> : Module repliable avec ProductSelector intégré</li>
              <li><strong>Cartes tâches optimisées</strong> : BoardCard avec badges et actions</li>
            </ul>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📋 Colonne "À faire"</h3>
              <p className="text-sm text-gray-700 mb-3">
                Contient toutes les tâches avec <code className="bg-white px-1 py-0.5 rounded text-xs">status: 'planned'</code> 
                et sans outcome. Représente le backlog du sprint actif à traiter.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Couleur :</span> bg-cyan-50 / bg-cyan-100</p>
                <p><span className="font-medium">Filtre :</span> t.status === 'planned' && !t.outcome</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🔄 Colonne "En cours"</h3>
              <p className="text-sm text-gray-700 mb-3">
                Tâches en développement actif avec <code className="bg-white px-1 py-0.5 rounded text-xs">status: 'inProgress'</code>. 
                Limite implicite suggérée = capacité de l'équipe.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Couleur :</span> bg-orange-50 / bg-orange-100</p>
                <p><span className="font-medium">Filtre :</span> t.status === 'inProgress' && !t.outcome</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Colonne "Outcome"</h3>
              <p className="text-sm text-gray-700 mb-3">
                Tâches avec un état final défini (completed, paused, blocked, cancelled, to_review) 
                OU <code className="bg-white px-1 py-0.5 rounded text-xs">status: 'done'</code>. 
                Permet de documenter pourquoi une tâche n'est pas terminée normalement.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Couleur :</span> bg-emerald-50 / bg-emerald-100</p>
                <p><span className="font-medium">Filtre :</span> t.outcome || t.status === 'done'</p>
                <p><span className="font-medium">Drop :</span> Ouvre TaskOutcomeManager</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Sprint Actif</h3>
              <p className="text-sm text-gray-700 mb-3">
                Le Task Board affiche UNIQUEMENT les tâches du sprint avec <code className="bg-white px-1 py-0.5 rounded text-xs">status: 'active'</code>. 
                Sélection automatique au chargement ou via le filtre Sprint.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Source :</span> sprints.find(s =&gt; s.status === 'active')</p>
                <p><span className="font-medium">Tâches :</span> t.sprintId === activeSprint.id</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> Le Task Board est un outil de suivi quotidien, contrairement au Sprint Board 
              qui affiche les User Stories. Ici, on gère les tâches techniques de manière granulaire.
            </p>
          </div>
        </div>

        {/* Architecture technique */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture technique</h2>

          {/* Props du composant */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Props du Composant TaskBoard</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📊 Props de Données (Arrays)</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="grid grid-cols-3 gap-2">
                    <code className="bg-white px-2 py-1 rounded text-xs">tasks[]</code>
                    <code className="bg-white px-2 py-1 rounded text-xs">userStories[]</code>
                    <code className="bg-white px-2 py-1 rounded text-xs">sprints[]</code>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <code className="bg-white px-2 py-1 rounded text-xs">contacts[]</code>
                    <code className="bg-white px-2 py-1 rounded text-xs">teams[]</code>
                    <code className="bg-white px-2 py-1 rounded text-xs">products[]</code>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">⚡ Props de Callbacks</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li><code className="bg-white px-2 py-1 rounded text-xs">onUpdateTask(taskId, updates)</code> - Mise à jour tâche (status, outcome...)</li>
                  <li><code className="bg-white px-2 py-1 rounded text-xs">onNavigate(view)</code> - Navigation vers autre module</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎛️ Props de Configuration</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li><code className="bg-white px-2 py-1 rounded text-xs">showTips: boolean</code> - Affichage module conseils (défaut: false)</li>
                  <li><code className="bg-white px-2 py-1 rounded text-xs">initialTaskId: string</code> - ID tâche à ouvrir au chargement (optionnel)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* États locaux */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ États Locaux (useState)</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎯 États Modales</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><code className="bg-white px-2 py-1 rounded text-xs">viewingTask</code> - Tâche affichée dans TaskDetail (null par défaut)</p>
                  <p><code className="bg-white px-2 py-1 rounded text-xs">outcomeTask</code> - Tâche en édition d'outcome dans TaskOutcomeManager</p>
                </div>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔄 États Drag & Drop</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><code className="bg-white px-2 py-1 rounded text-xs">draggedTask</code> - Tâche en cours de déplacement (null quand pas de drag)</p>
                  <p><code className="bg-white px-2 py-1 rounded text-xs">selectedSprintId</code> - ID du sprint sélectionné (auto = sprint actif)</p>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📊 États Filtres</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <code className="bg-white px-2 py-1 rounded text-xs">filterProduct: 'all'</code>
                  <code className="bg-white px-2 py-1 rounded text-xs">filterStory: 'all'</code>
                  <code className="bg-white px-2 py-1 rounded text-xs">filterAssignee: 'all'</code>
                  <code className="bg-white px-2 py-1 rounded text-xs">filterType: 'all'</code>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <code className="bg-white px-2 py-1 rounded">isFiltersExpanded: false</code> - État du module filtres (replié par défaut)
                </p>
              </div>
            </div>
          </div>

          {/* Calculs useMemo */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Calculs Mémorisés (useMemo)</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎯 sprintTasks</p>
                <p className="text-sm text-gray-700 mb-2">
                  Filtre les tâches appartenant au sprint actif (via sprintId ou userStoryId dans sprint.storyIds).
                </p>
                <div className="bg-white rounded border border-gray-300 p-3 overflow-x-auto">
                  <code className="text-xs">
                    tasks.filter(t =&gt; t.sprintId === activeSprint.id || 
                    (t.userStoryId && sprintStoryIds.includes(t.userStoryId)))
                  </code>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 filteredTasks</p>
                <p className="text-sm text-gray-700 mb-2">
                  Applique les 4 filtres sur sprintTasks : produit (via story), story, assigné, type.
                </p>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  <li>filterProduct : Filtre via userStory.productId</li>
                  <li>filterStory : Filtre direct sur t.userStoryId</li>
                  <li>filterAssignee : Filtre sur t.assignedTo</li>
                  <li>filterType : Filtre sur t.type (development, testing, review...)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📋 columns</p>
                <p className="text-sm text-gray-700 mb-2">
                  Structure des 3 colonnes Kanban avec filtrage des tâches par statut/outcome.
                </p>
                <div className="bg-white rounded border border-gray-300 p-3 overflow-x-auto">
                  <code className="text-xs">
                    {`{
  planned: { tasks: filteredTasks.filter(t => t.status === 'planned'), ... },
  inProgress: { tasks: filteredTasks.filter(t => t.status === 'inProgress'), ... },
  outcome: { tasks: filteredTasks.filter(t => t.outcome || t.status === 'done'), ... }
}`}
                  </code>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">👥 sprintDevelopers</p>
                <p className="text-sm text-gray-700 mb-2">
                  Liste des développeurs assignés aux tâches du sprint (filtre type='internal').
                </p>
                <div className="bg-white rounded border border-gray-300 p-3 overflow-x-auto">
                  <code className="text-xs">
                    contacts.filter(c =&gt; developerIds.has(c.id) && c.type === 'internal')
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drag & Drop */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🖱️ Système Drag & Drop HTML5</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">1️⃣ handleDragStart(e, task)</h3>
              <p className="text-sm text-gray-700 mb-2">Stocke la tâche en cours de déplacement :</p>
              <div className="bg-white rounded border border-gray-300 p-3 overflow-x-auto">
                <code className="text-xs">
                  {`setDraggedTask(task);
e.dataTransfer.effectAllowed = 'move';`}
                </code>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">2️⃣ handleDragOver(e)</h3>
              <p className="text-sm text-gray-700 mb-2">Autorise le drop sur les colonnes :</p>
              <div className="bg-white rounded border border-gray-300 p-3 overflow-x-auto">
                <code className="text-xs">
                  {`e.preventDefault();
e.dataTransfer.dropEffect = 'move';`}
                </code>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">3️⃣ handleDrop(e, targetStatus)</h3>
              <p className="text-sm text-gray-700 mb-2">Gère 3 cas de drop différents :</p>
              
              <div className="space-y-3 mt-3">
                <div className="bg-white border border-gray-200 rounded p-3">
                  <p className="font-medium text-emerald-600 text-sm mb-1">Cas 1 : Drop dans 'outcome'</p>
                  <p className="text-xs text-gray-700">Ouvre TaskOutcomeManager pour définir l'outcome (completed, paused, blocked...)</p>
                  <div className="bg-gray-50 rounded border border-gray-300 p-2 mt-2 overflow-x-auto">
                    <code className="text-xs">
                      {`if (targetStatus === 'outcome') {
  setOutcomeTask(draggedTask);
  setDraggedTask(null);
  return;
}`}
                    </code>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded p-3">
                  <p className="font-medium text-orange-600 text-sm mb-1">Cas 2 : Tâche avec outcome sortie de 'outcome'</p>
                  <p className="text-xs text-gray-700">Retire automatiquement l'outcome + raison + notes + date</p>
                  <div className="bg-gray-50 rounded border border-gray-300 p-2 mt-2 overflow-x-auto">
                    <code className="text-xs">
                      {`if (draggedTask.outcome && targetStatus !== 'outcome') {
  onUpdateTask(draggedTask.id, { 
    status: targetStatus,
    outcome: null,
    outcomeReason: null,
    outcomeNote: null,
    outcomeDate: null
  });
}`}
                    </code>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded p-3">
                  <p className="font-medium text-cyan-600 text-sm mb-1">Cas 3 : Changement de statut normal</p>
                  <p className="text-xs text-gray-700">Update simple du status si différent (planned ↔ inProgress)</p>
                  <div className="bg-gray-50 rounded border border-gray-300 p-2 mt-2 overflow-x-auto">
                    <code className="text-xs">
                      {`else if (draggedTask.status !== targetStatus) {
  onUpdateTask(draggedTask.id, { status: targetStatus });
}`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">🎨 Curseur & Style Visuel</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Cartes tâches : <code className="bg-white px-2 py-1 rounded text-xs">draggable + cursor-move</code></li>
              <li>Drop zones : <code className="bg-white px-2 py-1 rounded text-xs">onDragOver + onDrop</code> sur chaque colonne</li>
              <li>Effet hover : <code className="bg-white px-2 py-1 rounded text-xs">hover:shadow-lg transition-all</code></li>
            </ul>
          </div>
        </div>

        {/* Composants enfants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🧩 Composants Enfants</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📊 FilterBar</h3>
              <p className="text-sm text-gray-700 mb-2">
                Module filtres standardisé avec section repliable.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">topLeftContent :</span> ProductSelector (toujours visible)</p>
                <p><span className="font-medium">filters :</span> Sprint, Story, Développeur, Type (repliable)</p>
                <p><span className="font-medium">Props :</span> isExpanded, onToggleExpand, hasActiveFilters, onResetFilters</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎴 BoardCard</h3>
              <p className="text-sm text-gray-700 mb-2">
                Composant UI standardisé pour les cartes Kanban.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">badges :</span> Badges produit + outcome en haut à gauche</p>
                <p><span className="font-medium">actions :</span> Bouton voir (Eye icon) en haut à droite</p>
                <p><span className="font-medium">children :</span> Contenu de la carte (titre, assigné, heures)</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👁️ TaskDetail</h3>
              <p className="text-sm text-gray-700 mb-2">
                Modal de visualisation des détails d'une tâche.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">Ouverture :</span> Clic sur bouton Eye dans carte</p>
                <p><span className="font-medium">Props :</span> task, userStories, contacts, teams, onEdit, onClose</p>
                <p><span className="font-medium">Action Edit :</span> Stocke tâche en sessionStorage + Navigate vers 'tasks'</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 TaskOutcomeManager</h3>
              <p className="text-sm text-gray-700 mb-2">
                Modal pour définir l'outcome d'une tâche.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">Ouverture :</span> Drop tâche dans colonne Outcome</p>
                <p><span className="font-medium">5 Outcomes :</span> completed, paused, blocked, cancelled, to_review</p>
                <p><span className="font-medium">Data :</span> outcome + outcomeReason + outcomeNote + outcomeDate</p>
                <p><span className="font-medium">Props :</span> task, onUpdateOutcome, onClose</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🏷️ TaskOutcomeBadge</h3>
              <p className="text-sm text-gray-700 mb-2">
                Badge visuel pour afficher l'outcome avec couleur et icône.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">Props :</span> outcome, size ('small' | 'medium')</p>
                <p><span className="font-medium">Couleurs :</span> completed=green, paused=yellow, blocked=red, cancelled=gray, to_review=blue</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎭 EmptyState</h3>
              <p className="text-sm text-gray-700 mb-2">
                Composant UI pour les états vides avec gestion intelligente des dépendances.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">Cas 1 :</span> Pas de produits → Message + lien vers Products</p>
                <p><span className="font-medium">Cas 2 :</span> Pas de stories → Message + lien vers User Stories</p>
                <p><span className="font-medium">Cas 3 :</span> Pas de tâches → Message + lien vers Tasks</p>
                <p><span className="font-medium">Cas 4 :</span> Pas de sprint actif → Message + lien vers Sprints</p>
                <p><span className="font-medium">Cas 5 :</span> Aucun résultat filtré → Message + bouton Reset</p>
              </div>
            </div>
          </div>
        </div>

        {/* Types de tâches */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎨 Types de Tâches</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-center">
              <div className="text-3xl mb-2">💻</div>
              <p className="text-sm font-semibold text-gray-800">Développement</p>
              <code className="text-xs text-gray-600">development</code>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <div className="text-3xl mb-2">🧪</div>
              <p className="text-sm font-semibold text-gray-800">Tests</p>
              <code className="text-xs text-gray-600">testing</code>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <div className="text-3xl mb-2">👀</div>
              <p className="text-sm font-semibold text-gray-800">Revue</p>
              <code className="text-xs text-gray-600">review</code>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-sm font-semibold text-gray-800">Déploiement</p>
              <code className="text-xs text-gray-600">deployment</code>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <div className="text-3xl mb-2">📚</div>
              <p className="text-sm font-semibold text-gray-800">Documentation</p>
              <code className="text-xs text-gray-600">documentation</code>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-3xl mb-2">🔧</div>
              <p className="text-sm font-semibold text-gray-800">Autre</p>
              <code className="text-xs text-gray-600">other</code>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📋 Module Tasks Management</h3>
              <p className="text-sm text-gray-700">
                Source des tâches affichées. Bouton "Modifier" dans TaskDetail redirige vers Tasks Management 
                avec la tâche pré-chargée en sessionStorage.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏃 Module Sprints Management</h3>
              <p className="text-sm text-gray-700">
                Le Task Board affiche uniquement les tâches du sprint actif (status='active'). 
                Filtre Sprint permet de changer de sprint.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                Les tâches sont liées aux stories via task.userStoryId. 
                Filtre Story et filtre Produit (via story.productId) permettent un filtrage croisé.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Products</h3>
              <p className="text-sm text-gray-700">
                ProductSelector en haut de la FilterBar. Badge produit coloré sur chaque carte. 
                Filtre Product affecte la liste des Stories disponibles.
              </p>
            </div>
          </div>
        </div>

        {/* Conseils pratiques */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-600 flex-shrink-0" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Conseils Techniques</h2>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>🎯 <span className="font-medium">useMemo pour performances :</span> Tous les calculs de filtrage sont mémorisés (sprintTasks, filteredTasks, columns)</li>
              <li>🖱️ <span className="font-medium">Drag & Drop natif HTML5 :</span> Pas de dépendance externe, fonctionne offline, accessible</li>
              <li>🎨 <span className="font-medium">BoardCard réutilisable :</span> Composant UI standardisé utilisé aussi dans SprintBoard</li>
              <li>🔄 <span className="font-medium">FilterBar standardisée :</span> Pattern réutilisé dans plusieurs modules (Contacts, Sprints, Stories...)</li>
              <li>⚡ <span className="font-medium">Sprint actif auto :</span> Détection automatique au chargement via sprints.find(s =&gt; s.status === 'active')</li>
              <li>📊 <span className="font-medium">Filtres en cascade :</span> Produit → Stories → Tâches pour un filtrage cohérent</li>
              <li>🎭 <span className="font-medium">États vides intelligents :</span> 5 cas gérés avec messages adaptés et liens contextuels</li>
              <li>💾 <span className="font-medium">SessionStorage pour navigation :</span> Tâche stockée en session avant redirect vers Tasks</li>
            </ul>
          </div>
        </div>

        {/* Footer avec lien vers version utilisateur */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">📘 Vous cherchez une version simplifiée ?</h3>
              <p className="text-sm text-gray-700">
                Un <span className="font-medium">guide utilisateur</span> plus court et pédagogique est disponible pour les Product Owners 
                qui veulent juste apprendre à utiliser le module.
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

export default TaskBoardDetailPage;
