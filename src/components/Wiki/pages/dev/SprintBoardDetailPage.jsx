import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * SprintBoardDetailPage - Documentation TECHNIQUE du Module Sprint Board
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const SprintBoardDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Sprint Board</h1>
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
              Le <strong>Module Sprint Board</strong> est un tableau Kanban interactif pour le suivi quotidien 
              du sprint actif. Il implémente un système de drag & drop natif HTML5 avec 3 colonnes : 
              À faire (planned), En cours (inProgress), et Outcome (résultats finaux).
            </p>
            <p>
              Composant principal utilisé lors du <strong>Daily Scrum</strong> (réunion quotidienne de 15 minutes), 
              il offre une vue en temps réel de l'avancement avec gestion des outcomes (terminée, en pause, bloquée, annulée, à revoir), 
              filtrage par produit, et calcul automatique des statistiques de progression.
            </p>
            <div className="bg-teal-50 border border-teal-100 rounded p-3 mt-3">
              <p className="text-xs font-medium text-teal-900">
                📦 Fichiers : SprintBoard.jsx (505 lignes), SprintBoardCard.jsx (75 lignes), index.js
              </p>
            </div>
          </div>
        </div>

        {/* Architecture technique */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture Technique</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🏗️ Structure des Composants</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-white rounded border border-cyan-200 p-3">
                  <p className="font-medium text-gray-900 mb-2">SprintBoard.jsx (Composant Principal)</p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Gestion de l'état : selectedStory, selectedSprintId, draggedStory, outcomeStory</li>
                    <li>Filtres : filterProduct, isFiltersExpanded</li>
                    <li>Hooks : useState, useMemo pour optimisation</li>
                    <li>Props : 13 props (sprints, userStories, products, contacts, etc.)</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded border border-cyan-200 p-3">
                  <p className="font-medium text-gray-900 mb-2">SprintBoardCard.jsx (Carte Story)</p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Composant mémoïsé avec React.memo pour performance</li>
                    <li>Utilise BoardCard du UI kit (composant standardisé)</li>
                    <li>Affiche : titre story, stakeholders, badges produit/outcome</li>
                    <li>1 seul bouton d'action : View (Eye icon)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔄 Système Drag & Drop</h3>
              <p className="text-sm text-gray-700 mb-3">
                Implémentation native HTML5 (pas de librairie externe) avec 4 handlers :
              </p>
              <div className="bg-white rounded border border-teal-200 p-3 mb-2">
                <code className="text-xs block mb-2">
                  <span className="text-emerald-600">handleDragStart</span>(e, story) : Stocke la story draggée + effectAllowed='move'
                </code>
                <code className="text-xs block mb-2">
                  <span className="text-emerald-600">handleDragOver</span>(e) : preventDefault() + dropEffect='move'
                </code>
                <code className="text-xs block mb-2">
                  <span className="text-emerald-600">handleDrop</span>(e, targetStatus) : Met à jour le statut ou ouvre modal Outcome
                </code>
                <code className="text-xs block">
                  <span className="text-emerald-600">draggable</span> : Attribut HTML5 sur chaque carte
                </code>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                <span className="font-medium">Logique spéciale :</span> Si drop dans colonne "outcome" → ouvre UserStoryOutcomeManager. 
                Si story avec outcome est déplacée hors de outcome → efface tous les champs outcome.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📊 Calculs et Statistiques</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Calculs en temps réel (useMemo) :</p>
                <div className="bg-white rounded border border-cyan-200 p-3">
                  <code className="text-xs block">totalStories = sprintStories.length</code>
                  <code className="text-xs block">doneStories = stories.filter(s =&gt; s.status === 'done').length</code>
                  <code className="text-xs block">progressPercentage = (doneStories / totalStories) × 100</code>
                  <code className="text-xs block">totalPoints = Σ(story.estimation)</code>
                  <code className="text-xs block">donePoints = Σ(done stories.estimation)</code>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  ⚡ Optimisation : useMemo sur filteredStories et columns pour éviter recalculs inutiles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts Clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🔋 Colonne "À faire" (Planned)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Stories avec status 'planned', 'todo' ou 'unassigned' ET sans outcome défini.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Couleur :</span> Bleu (#EFF6FF)</p>
                <p><span className="font-medium">ID colonne :</span> 'planned'</p>
                <p><span className="font-medium">Filtre :</span> (s.status === 'planned' || 'todo' || 'unassigned') && !s.outcome</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🔄 Colonne "En cours" (InProgress)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Stories avec status 'inProgress' ET sans outcome défini. Travail actif en cours.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Couleur :</span> Orange (#FFF7ED)</p>
                <p><span className="font-medium">ID colonne :</span> 'inProgress'</p>
                <p><span className="font-medium">Filtre :</span> s.status === 'inProgress' && !s.outcome</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Colonne "Outcome"</h3>
              <p className="text-sm text-gray-700 mb-3">
                Stories avec outcome défini OU status 'done'. État final avec résultat documenté.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Couleur :</span> Violet (#F5F3FF)</p>
                <p><span className="font-medium">ID colonne :</span> 'outcome'</p>
                <p><span className="font-medium">Filtre :</span> s.outcome || s.status === 'done'</p>
                <p><span className="font-medium">Flag spécial :</span> isOutcome: true</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">✨ Outcomes (5 types)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Résultats finaux possibles pour une story terminée.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>✅ <span className="font-medium">done</span> : Terminée avec succès</p>
                <p>⏸️ <span className="font-medium">paused</span> : En pause temporaire</p>
                <p>🚫 <span className="font-medium">blocked</span> : Bloquée (dépendance)</p>
                <p>❌ <span className="font-medium">cancelled</span> : Annulée</p>
                <p>🔍 <span className="font-medium">needsReview</span> : À revoir</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fonctionnement détaillé */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fonctionnement Détaillé</h2>

          <div className="space-y-6">
            {/* Initialisation */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Initialisation et Sélection du Sprint</h3>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Logique de sélection automatique</p>
                <div className="bg-white rounded border border-teal-200 p-3 mb-3">
                  <code className="text-xs block mb-2">
                    const activeSprint = selectedSprintId 
                  </code>
                  <code className="text-xs block mb-2">
                    &nbsp;&nbsp;? sprints?.find(s =&gt; s.id === selectedSprintId)
                  </code>
                  <code className="text-xs block">
                    &nbsp;&nbsp;: sprints?.find(s =&gt; s.status === 'active');
                  </code>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Au montage, useMemo initialise selectedSprintId avec le premier sprint 'active' trouvé.
                </p>
                <p className="text-xs text-gray-600">
                  ⚠️ Si aucun sprint actif : affiche EmptyState "Aucun sprint actif"
                </p>
              </div>
            </div>

            {/* Filtrage */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Système de Filtrage</h3>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔎 Pipeline de filtrage en cascade</p>
                <ol className="text-sm text-gray-700 space-y-2 ml-4 list-decimal">
                  <li>
                    <span className="font-medium">Filtre Sprint :</span> 
                    <code className="text-xs bg-white px-2 py-1 rounded ml-2">
                      sprintStories = userStories.filter(s =&gt; activeSprint.storyIds.includes(s.id))
                    </code>
                  </li>
                  <li>
                    <span className="font-medium">Filtre Produit (optionnel) :</span>
                    <code className="text-xs bg-white px-2 py-1 rounded ml-2">
                      if (filterProduct !== 'all') filter(s =&gt; s.productId === filterProduct)
                    </code>
                  </li>
                  <li>
                    <span className="font-medium">Groupement par colonne :</span> useMemo sur columns avec filteredStories
                  </li>
                </ol>
                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900 font-medium mb-1">⚡ Optimisation :</p>
                  <p className="text-xs text-gray-700">
                    filteredStories utilise useMemo avec dépendances [sprintStories, filterProduct] 
                    pour éviter recalculs inutiles lors des re-renders
                  </p>
                </div>
              </div>
            </div>

            {/* Drag & Drop workflow */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Workflow Drag & Drop Complet</h3>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-3">📋 Séquence complète</p>
                
                <div className="space-y-3">
                  <div className="bg-white rounded border border-green-200 p-3">
                    <p className="text-sm font-medium text-gray-900 mb-2">Étape 1 : dragStart</p>
                    <code className="text-xs block">setDraggedStory(story)</code>
                    <code className="text-xs block">e.dataTransfer.effectAllowed = 'move'</code>
                  </div>

                  <div className="bg-white rounded border border-green-200 p-3">
                    <p className="text-sm font-medium text-gray-900 mb-2">Étape 2 : dragOver (sur colonne cible)</p>
                    <code className="text-xs block">e.preventDefault() // Permet le drop</code>
                    <code className="text-xs block">e.dataTransfer.dropEffect = 'move'</code>
                  </div>

                  <div className="bg-white rounded border border-green-200 p-3">
                    <p className="text-sm font-medium text-gray-900 mb-2">Étape 3 : drop</p>
                    <code className="text-xs block mb-2">if (targetStatus === 'outcome') {'{'}</code>
                    <code className="text-xs block ml-4 mb-2">setOutcomeStory(draggedStory) // Ouvre modal</code>
                    <code className="text-xs block mb-2">{'}'} else if (draggedStory.outcome && targetStatus !== 'outcome') {'{'}</code>
                    <code className="text-xs block ml-4 mb-2">onUpdateStory(id, {'{'}status, outcome: null, ...{'}'}) // Efface outcome</code>
                    <code className="text-xs block mb-2">{'}'} else {'{'}</code>
                    <code className="text-xs block ml-4 mb-2">onUpdateStory(id, {'{'}status: targetStatus{'}'}) // Simple changement statut</code>
                    <code className="text-xs block">{'}'}
</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Modals */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Modals et Interactions</h3>
              
              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-2">🎯 UserStoryOutcomeManager</p>
                  <p className="text-sm text-gray-700 mb-2">
                    Modal dédié pour définir l'outcome d'une story. Apparaît quand story droppée dans colonne "Outcome".
                  </p>
                  <div className="bg-white rounded border border-emerald-200 p-3">
                    <p className="text-xs text-gray-900 font-medium mb-1">Props :</p>
                    <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                      <li>story : Story concernée</li>
                      <li>onUpdateOutcome : Callback mise à jour avec outcomeData</li>
                      <li>onClose : Fermeture modal</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-2">👁️ StoryDetailModal</p>
                  <p className="text-sm text-gray-700 mb-2">
                    Modal plein écran pour afficher et modifier tous les détails d'une story. 
                    Ouvert via le bouton Eye sur chaque carte.
                  </p>
                  <div className="bg-white rounded border border-cyan-200 p-3">
                    <p className="text-xs text-gray-900 font-medium mb-1">Props (11) :</p>
                    <code className="text-xs block">
                      story, userNeeds, contacts, Objectives, products, interviews, personas, teamMembers, teams, onUpdate, onClose, onNavigate
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Composants UI utilisés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Composants UI Utilisés</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 FilterBar (Common)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Barre de filtres standardisée avec section repliable.
              </p>
              <div className="bg-white rounded border border-cyan-200 p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">Props utilisées :</p>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>isExpanded, onToggleExpand</li>
                  <li>hasActiveFilters (filterProduct !== 'all')</li>
                  <li>onResetFilters</li>
                  <li>topLeftContent : ProductSelector</li>
                  <li>filters : Sélecteur de sprint</li>
                </ul>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏷️ ProductSelector (Common)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Sélecteur de produit standardisé avec compteurs.
              </p>
              <div className="bg-white rounded border border-teal-200 p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">Props :</p>
                <code className="text-xs block">products, value, onChange, placeholder, showCount: true</code>
                <code className="text-xs block">getCount: (productId) =&gt; sprintStories.filter(...).length</code>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎴 BoardCard (ui)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Carte standardisée utilisée dans SprintBoardCard. Composant réutilisable du UI kit.
              </p>
              <div className="bg-white rounded border border-cyan-200 p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">Props :</p>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>badges : Array de badges (produit, outcome)</li>
                  <li>actions : Array de boutons (View)</li>
                  <li>children : Contenu de la carte</li>
                </ul>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏷️ StoryOutcomeBadge (UserStories)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Badge visuel pour afficher l'outcome d'une story avec icône et label.
              </p>
              <div className="bg-white rounded border border-teal-200 p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">Props :</p>
                <code className="text-xs block">outcome, size: "small", showLabel: true</code>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🚫 EmptyState (ui)</h3>
              <p className="text-sm text-gray-700 mb-2">
                État vide standardisé avec icône, message et action optionnelle.
              </p>
              <div className="bg-white rounded border border-cyan-200 p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">Utilisé dans 4 cas :</p>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Aucun produit créé</li>
                  <li>Aucun sprint créé</li>
                  <li>Aucun sprint actif</li>
                  <li>Aucune story ne correspond aux filtres</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Dépendances */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dépendances et Intégrations</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📦 Modules Requis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white rounded border border-cyan-200 p-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">🏃 Sprints</p>
                  <p className="text-xs text-gray-700">
                    Source des sprints affichés. Sprint actif (status='active') sélectionné par défaut.
                  </p>
                </div>
                <div className="bg-white rounded border border-cyan-200 p-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">📖 User Stories</p>
                  <p className="text-xs text-gray-700">
                    Stories filtrées par sprint.storyIds[]. Mise à jour du status via onUpdateStory.
                  </p>
                </div>
                <div className="bg-white rounded border border-cyan-200 p-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">📦 Products</p>
                  <p className="text-xs text-gray-700">
                    Filtrage et affichage des badges produit sur les cartes.
                  </p>
                </div>
                <div className="bg-white rounded border border-cyan-200 p-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">👥 Contacts</p>
                  <p className="text-xs text-gray-700">
                    Affichage des stakeholders sur les cartes (limité à 3).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔗 Dépendances Optionnelles (pour StoryDetailModal)</h3>
              <div className="bg-white rounded border border-teal-200 p-3">
                <code className="text-xs block">
                  userNeeds, Objectives, interviews, personas, teamMembers, teams
                </code>
                <p className="text-xs text-gray-600 mt-2">
                  Passées au modal de détail pour affichage complet des relations de la story
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Handlers Requis</h3>
              <div className="space-y-2">
                <div className="bg-white rounded border border-green-200 p-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">onUpdateStory(storyId, updates)</p>
                  <p className="text-xs text-gray-700">
                    Callback principal pour mise à jour d'une story. Utilisé pour changement de status 
                    et définition/suppression d'outcome.
                  </p>
                </div>
                <div className="bg-white rounded border border-green-200 p-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">onNavigate(view)</p>
                  <p className="text-xs text-gray-700">
                    Callback de navigation depuis le modal de détail vers d'autres vues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* États vides et validations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">États Vides et Validations</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🚫 Vérifications de dépendances (ordre d'exécution)</h3>
              <ol className="text-sm text-gray-700 space-y-2 ml-4 list-decimal">
                <li>
                  <span className="font-medium">products.length === 0</span> → EmptyState 
                  "Créez d'abord des produits"
                </li>
                <li>
                  <span className="font-medium">sprints.length === 0</span> → EmptyState 
                  "Créez d'abord des sprints"
                </li>
                <li>
                  <span className="font-medium">!activeSprint</span> → EmptyState 
                  "Aucun sprint actif" (sprints existent mais aucun actif)
                </li>
                <li>
                  <span className="font-medium">sprintStories.length === 0</span> → EmptyState 
                  "Aucune story dans ce sprint"
                </li>
                <li>
                  <span className="font-medium">filteredStories.length === 0</span> → EmptyState 
                  "Aucune story ne correspond aux filtres" + bouton réinitialiser
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">⚠️ Gestion des cas limites</h3>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li>
                  <span className="font-medium">Sprint sans stories :</span> activeSprint.storyIds peut être undefined → 
                  sprintStories = []
                </li>
                <li>
                  <span className="font-medium">Story sans stakeholders :</span> story.stakeholderIds?.map()...filter(Boolean) 
                  gère les undefined
                </li>
                <li>
                  <span className="font-medium">Produit supprimé :</span> products.find() retourne undefined → 
                  badge produit non affiché
                </li>
                <li>
                  <span className="font-medium">Drag sans story :</span> handleDrop vérifie !draggedStory avant toute action
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conseils d'implémentation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-600 flex-shrink-0" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Conseils d'Implémentation</h2>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>⚡ <span className="font-medium">Performance :</span> Utilisez React.memo sur SprintBoardCard pour éviter re-renders inutiles des cartes</li>
              <li>🎯 <span className="font-medium">useMemo stratégique :</span> Appliquez useMemo sur filteredStories et columns car recalculés à chaque render</li>
              <li>🔄 <span className="font-medium">Drag & Drop natif :</span> Préférer HTML5 natif plutôt qu'une lib externe (moins de dépendances, performances)</li>
              <li>📊 <span className="font-medium">Statistiques :</span> Calculer totalStories/doneStories en dehors du useMemo pour éviter dépendances circulaires</li>
              <li>🎨 <span className="font-medium">Couleurs des colonnes :</span> Utiliser style inline pour backgroundColor plutôt que classes Tailwind dynamiques</li>
              <li>🔍 <span className="font-medium">Filtrage cascade :</span> Sprint → Produit → Groupement. Ne pas inverser l'ordre pour performance</li>
              <li>📱 <span className="font-medium">Responsive :</span> Grid 3 colonnes (lg) / 2 colonnes (md) / 1 colonne (mobile) avec gap adaptatif</li>
              <li>♿ <span className="font-medium">Accessibilité :</span> Attributs aria-label sur boutons + cursor:move sur cartes draggables</li>
              <li>🧹 <span className="font-medium">Cleanup :</span> Toujours reset draggedStory dans handleDrop même en cas d'erreur</li>
              <li>💾 <span className="font-medium">Sauvegarde :</span> onUpdateStory est appelé immédiatement lors du drop (pas de debounce)</li>
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
                qui veulent juste apprendre à utiliser le module au quotidien.
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

export default SprintBoardDetailPage;
