import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * SprintsDetailPage - Documentation TECHNIQUE du Module Sprints Management
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const SprintsDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Sprints Management</h1>
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
              Le <strong>Module Sprints Management</strong> gère le cycle complet des itérations Scrum : 
              planification, exécution, suivi et clôture. Il permet de créer des sprints time-boxés (7-28 jours), 
              d'associer des user stories, de suivre la progression en temps réel et d'analyser la vélocité de l'équipe.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local. 
              Il s'intègre étroitement avec les modules Produits, Équipes, User Stories et Sprint Board 
              pour offrir une expérience Scrum complète.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Sprint</h3>
              <p className="text-sm text-gray-700 mb-3">
                Période time-boxée (durée fixe) pendant laquelle une équipe s'engage à livrer un ensemble 
                de user stories. Durée recommandée : 7-28 jours (max 4 semaines selon Scrum).
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Statuts :</span> planned, active, completed</p>
                <p><span className="font-medium">Validation :</span> Max 28 jours (bloquant), recommandé 7-14 jours</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Sprint Goal</h3>
              <p className="text-sm text-gray-700 mb-3">
                Objectif principal que l'équipe souhaite atteindre pendant le sprint. 
                Doit être clair, mesurable et atteignable en une itération.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Format :</span> Texte libre (textarea)</p>
                <p><span className="font-medium">Recommandation :</span> 1-2 phrases concises</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📋 Backlog de Sprint</h3>
              <p className="text-sm text-gray-700 mb-3">
                Liste des user stories sélectionnées pour le sprint. Une story ne peut être assignée 
                qu'à un seul sprint à la fois. L'équipe du sprint est automatiquement assignée aux stories.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Filtrage :</span> Stories du produit uniquement</p>
                <p><span className="font-medium">Exclusion :</span> Stories déjà assignées à un autre sprint</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📈 Progression Dual</h3>
              <p className="text-sm text-gray-700 mb-3">
                Système de double progression pour anticiper les retards : 
                % de stories complétées vs % de temps écoulé. Alerte si temps &gt; progression stories.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Stories :</span> completedStories / totalStories × 100</p>
                <p><span className="font-medium">Temps :</span> daysElapsed / totalDays × 100</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Architecture modulaire :</strong> Le module Sprints Management fonctionne en coordination 
              avec le Sprint Board (suivi quotidien To Do/In Progress/Done), les Retrospectives (amélioration continue) 
              et les Sprint Reviews (démonstration).
            </p>
          </div>
        </div>

        {/* Utilisation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture et Composants</h2>

          {/* Composant principal */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Composant Principal : SprintTracking.jsx</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📱 Interface Principale</p>
                <p className="text-sm text-gray-700 mb-2">
                  Composant conteneur qui orchestre tous les sous-composants :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><strong>SprintTips</strong> : Module conseils et astuces (optionnel, prop <code>showTips</code>)</li>
                  <li><strong>SprintFilters</strong> : Barre de filtrage standardisée (FilterBar + filtres spécifiques)</li>
                  <li><strong>SprintCard</strong> : Carte d'affichage individuelle (grille 3/2/1 colonnes responsive)</li>
                  <li><strong>SprintForm</strong> : Formulaire modal création/édition</li>
                  <li><strong>SprintDetail</strong> : Modal de visualisation détaillée</li>
                  <li><strong>ConfirmDialog</strong> : Modale de confirmation suppression</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔄 Gestion d'État</p>
                <p className="text-sm text-gray-700 mb-2">
                  États locaux gérés par le composant :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><strong>showForm / editingSprint</strong> : Affichage formulaire et mode édition</li>
                  <li><strong>viewingSprint</strong> : Sprint actuellement visualisé en détail</li>
                  <li><strong>formData</strong> : Données du formulaire (7 champs + storyIds[])</li>
                  <li><strong>Filtres</strong> : filterStatus, filterProduct, filterTeam, filterDateRange, sortBy</li>
                  <li><strong>Pagination</strong> : currentPage (9 sprints par page)</li>
                  <li><strong>Modales</strong> : showTeamRequiredModal, showShortSprintWarning, showInvalidDatesModal</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">⚙️ Logique Métier</p>
                <p className="text-sm text-gray-700 mb-2">
                  Fonctions principales :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><strong>getSprintStats()</strong> : Calcule progression stories (totalStories, completedStories, progressPercentage)</li>
                  <li><strong>filterByDateRange()</strong> : Filtre par période (current, upcoming, past)</li>
                  <li><strong>handleSubmit()</strong> : Validation formulaire + validations Scrum (durée, dates, équipe)</li>
                  <li><strong>toggleStory()</strong> : Ajoute/retire une story du sprint</li>
                  <li><strong>handleImportCSV() / handleExportCSV()</strong> : Import/Export avec validation format</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulaire de sprint */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Formulaire : SprintForm.jsx</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📝 7 Sections du Formulaire</p>
                <ol className="text-sm text-gray-700 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">📦 Produit associé</span> (indigo) - ProductDropdown, obligatoire</li>
                  <li><span className="font-medium">👥 Équipe responsable</span> (blue) - Select équipes actives, obligatoire</li>
                  <li><span className="font-medium">#️⃣ Identification</span> (indigo) - sprintNumber (optionnel) + name (obligatoire)</li>
                  <li><span className="font-medium">📊 Statut</span> (blue) - Select planned/active/completed</li>
                  <li><span className="font-medium">📅 Dates</span> (indigo) - startDate + endDate (input type="date"), obligatoire</li>
                  <li><span className="font-medium">🎯 Objectif</span> (blue) - Textarea goal (optionnel mais recommandé)</li>
                  <li><span className="font-medium">📋 User Stories</span> (indigo) - Liste checkbox des stories disponibles</li>
                </ol>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">✅ Validations Frontend</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><strong>Champs requis :</strong> productId, teamId, name, startDate, endDate</li>
                  <li><strong>Date cohérente :</strong> endDate &gt; startDate (modal showInvalidDatesModal si erreur)</li>
                  <li><strong>Durée max :</strong> 28 jours (alert bloquant)</li>
                  <li><strong>Durée recommandée :</strong> ≥7 jours (modal showShortSprintWarning si &lt;7)</li>
                  <li><strong>Stories filtrées :</strong> Uniquement du produit + non assignées à un autre sprint</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">💡 Panel d'Aide Contextuel</p>
                <p className="text-sm text-gray-700 mb-2">
                  Bouton "?" dans FormHeader → Affiche <code>HelpContent</code> avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Explication de chaque section</li>
                  <li>Bonnes pratiques Scrum (durée 1-4 semaines, objectif mesurable...)</li>
                  <li>Recommandations sur la sélection des stories</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Affichage et filtrage */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Affichage : SprintCard.jsx + SprintFilters.jsx</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎴 SprintCard - Carte d'Affichage</p>
                <p className="text-sm text-gray-700 mb-2">
                  Carte standardisée avec CardHeader + CardFooter :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><strong>Header :</strong> Nom du sprint uniquement</li>
                  <li><strong>Corps :</strong> Objectif (emoji 🎯), équipe (emoji 👥), dates + durée, 2 barres de progression</li>
                  <li><strong>Footer :</strong> Badge produit + badge statut + 3 boutons (Voir, Modifier, Supprimer)</li>
                  <li><strong>2 Progressions :</strong> 
                    <ul className="ml-4 mt-1">
                      <li>→ <strong>Stories</strong> (verte/bleue) : % stories done</li>
                      <li>→ <strong>Temps</strong> (indigo/orange/rouge si alerte) : % sprint écoulé</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 SprintFilters - Barre de Filtrage</p>
                <p className="text-sm text-gray-700 mb-2">
                  Utilise le composant standardisé <code>FilterBar</code> avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><strong>topLeftContent :</strong> ProductSelector (si plusieurs produits)</li>
                  <li><strong>Filtres :</strong> Statut (avec compteurs), Équipe, Période (current/upcoming/past)</li>
                  <li><strong>Tri :</strong> 4 boutons (Date début, Date fin, Nom, Progression)</li>
                  <li><strong>Actions :</strong> Bouton "Nouveau Sprint" + bouton "Réinitialiser" si filtres actifs</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔢 Pagination</p>
                <p className="text-sm text-gray-700">
                  Composant standardisé <code>Pagination</code> : 9 sprints par page. 
                  Réinitialisation automatique à la page 1 lors du changement de filtres (via useMemo).
                </p>
              </div>
            </div>
          </div>

          {/* Modal de détails */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Visualisation : SprintDetail.jsx</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">👁️ Modal de Détails</p>
              <p className="text-sm text-gray-700 mb-2">
                Utilise <code>DetailModal</code> standardisé avec 3 sections :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li>
                  <strong>En-tête (bg-teal-50) :</strong> 
                  <ul className="ml-4 mt-1">
                    <li>→ Ligne 1 : Badge #sprintNumber + nom</li>
                    <li>→ Ligne 2 : Badges statut + équipe + produit (code + nom)</li>
                  </ul>
                </li>
                <li>
                  <strong>Période (bg-cyan-50) :</strong> 
                  <ul className="ml-4 mt-1">
                    <li>→ Date début / Date fin formatées en français</li>
                    <li>→ Durée totale calculée</li>
                    <li>→ Si sprint actif : indicateur jours restants (normal/orange/rouge)</li>
                  </ul>
                </li>
                <li>
                  <strong>Objectif (bg-teal-50) :</strong> Affichage du sprint goal avec whitespace-pre-wrap
                </li>
                <li>
                  <strong>User Stories (bg-cyan-50) :</strong> Liste des stories avec titre en italique. 
                  État vide si aucune story.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'un Sprint</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs principaux</p>
                  <div className="bg-white rounded border border-gray-300 p-3 overflow-x-auto">
                    <code className="text-xs">
{`{
  id: string,              // UUID généré
  sprintNumber: string,    // Numéro optionnel (ex: "Sprint-01")
  name: string,            // Nom obligatoire
  goal: string,            // Objectif du sprint
  startDate: string,       // Format YYYY-MM-DD
  endDate: string,         // Format YYYY-MM-DD
  status: string,          // "planned" | "active" | "completed"
  productId: string,       // Référence produit (obligatoire)
  teamId: string,          // Référence équipe (obligatoire)
  storyIds: string[],      // IDs des user stories
  createdAt: string,       // ISO timestamp
  updatedAt: string        // ISO timestamp
}`}
                    </code>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Validations métier</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div><strong>name :</strong> required, trim()</div>
                    <div><strong>startDate :</strong> required, date valide</div>
                    <div><strong>endDate :</strong> required, &gt; startDate</div>
                    <div><strong>Durée :</strong> max 28 jours</div>
                    <div><strong>productId :</strong> required, produit actif</div>
                    <div><strong>teamId :</strong> required, équipe active</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique Métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>📊 <span className="font-medium">Calcul progression stories :</span> 
                  <code className="bg-white px-1 rounded text-xs ml-1">
                    Math.round((completedStories / totalStories) × 100)
                  </code>
                </li>
                <li>⏱️ <span className="font-medium">Calcul progression temps :</span> 
                  <code className="bg-white px-1 rounded text-xs ml-1">
                    Math.min(100, Math.max(0, (daysElapsed / totalDays) × 100))
                  </code>
                </li>
                <li>🔴 <span className="font-medium">Alerte retard :</span> 
                  <code className="bg-white px-1 rounded text-xs ml-1">
                    isOverdue = daysRemaining &lt; 0
                  </code>
                </li>
                <li>🟠 <span className="font-medium">Alerte fin imminente :</span> 
                  <code className="bg-white px-1 rounded text-xs ml-1">
                    isEndingSoon = daysRemaining ≥ 0 AND daysRemaining ≤ 3
                  </code>
                </li>
                <li>📋 <span className="font-medium">Stories disponibles :</span> Filtrées par productId + non assignées à un autre sprint (sauf édition)</li>
                <li>👥 <span className="font-medium">Auto-assignation équipe :</span> L'équipe du sprint est automatiquement assignée aux stories ajoutées</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les sprints sont sauvegardés localement dans le navigateur sous la clé <code>"sprints"</code>. 
                Sauvegarde automatique via le Factory Pattern Storage à chaque opération CRUD.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">🔒 Confidentialité :</span> Vos données restent 100% privées et ne sont jamais envoyées vers un serveur externe.
              </p>
            </div>
          </div>
        </div>

        {/* Import/Export CSV */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Import/Export CSV</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📥 Import CSV</h3>
              <p className="text-sm text-gray-700 mb-2">
                Fonction <code>handleImportCSV()</code> avec parsing robuste :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li><strong>Format attendu :</strong> 6 colonnes minimum (Nom, Produit, Objectif, Date début, Date fin, Statut)</li>
                <li><strong>Parsing produit :</strong> Extraction du code entre crochets "[PROD1]" → recherche produit par code</li>
                <li><strong>Parsing statut :</strong> Détection mots-clés ("cours" → active, "termin" → completed, sinon planned)</li>
                <li><strong>Validation :</strong> Vérification champs requis (name, startDate, endDate)</li>
                <li><strong>Gestion erreurs :</strong> Log des lignes invalides + option d'importer les lignes valides uniquement</li>
                <li><strong>Post-import :</strong> teamId vide par défaut → l'utilisateur doit éditer pour assigner une équipe</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📤 Export CSV</h3>
              <p className="text-sm text-gray-700 mb-2">
                Fonction <code>handleExportCSV()</code> avec 9 colonnes :
              </p>
              <div className="bg-white rounded border border-gray-300 p-3 mb-3 overflow-x-auto">
                <code className="text-xs">
                  Nom,Produit,Objectif,Date début,Date fin,Statut,Stories totales,Stories complétées,Progression (%)
                </code>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li><strong>Filtre respecté :</strong> Exporte uniquement les sprints affichés (filtres + tri appliqués)</li>
                <li><strong>Format produit :</strong> "[CODE] Nom du produit"</li>
                <li><strong>Stats calculées :</strong> Nombre total stories, stories complétées, progression % inclus</li>
                <li><strong>Nom fichier :</strong> sprints-YYYY-MM-DD.csv</li>
                <li><strong>Encodage :</strong> UTF-8 avec BOM pour Excel</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700">
                Les sprints sont obligatoirement associés à un produit actif. 
                Le ProductSelector filtre les sprints par produit. 
                Les stories disponibles sont filtrées par productId du sprint.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Équipes</h3>
              <p className="text-sm text-gray-700">
                Chaque sprint est assigné à une équipe responsable (teamId obligatoire). 
                L'équipe est automatiquement assignée à toutes les user stories du sprint. 
                Filtrage des équipes actives uniquement dans le formulaire.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                Les sprints contiennent un tableau storyIds[] référençant les user stories. 
                Contrainte : une story ne peut être assignée qu'à un seul sprint à la fois. 
                Le statut "done" des stories détermine la progression du sprint.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📋 Module Sprint Board</h3>
              <p className="text-sm text-gray-700">
                Le Sprint Board affiche les stories d'un sprint en colonnes Kanban (To Do / In Progress / Done). 
                Lien bidirectionnel : le Sprint Board peut être ouvert depuis le module Sprints Management 
                (via initialFilters.sprintId si implémenté).
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🔄 Module Sprint Retrospective</h3>
              <p className="text-sm text-gray-700">
                Les rétrospectives sont liées à un sprint via sprintId. 
                À la fin d'un sprint (statut "completed"), l'équipe peut créer une rétro pour amélioration continue.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎬 Module Sprint Reviews</h3>
              <p className="text-sm text-gray-700">
                Les reviews sont associées à un sprint pour documenter la démonstration et recueillir les feedbacks. 
                Permet de valider l'atteinte du Sprint Goal.
              </p>
            </div>
          </div>
        </div>

        {/* Conseils pratiques */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-600 flex-shrink-0" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Conseils Pratiques</h2>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>🎯 <span className="font-medium">Sprint Goal clair :</span> Rédigez un objectif précis et mesurable. 
              Évitez "Avancer sur le projet", préférez "Livrer le module de paiement avec tests E2E"</li>
              <li>⏰ <span className="font-medium">Durée optimale :</span> 2 semaines (14 jours) est le sweet spot pour la plupart des équipes. 
              Ni trop court (pression), ni trop long (perte de focus)</li>
              <li>📊 <span className="font-medium">Vélocité :</span> Suivez la vélocité sur 3-5 sprints pour affiner vos estimations. 
              Ne planifiez jamais plus que la capacité prouvée</li>
              <li>🔴 <span className="font-medium">Alertes visuelles :</span> La double progression (stories vs temps) permet d'anticiper. 
              Si temps &gt; stories, équipe en retard → Daily Scrum pour identifier obstacles</li>
              <li>👥 <span className="font-medium">Équipe stable :</span> Évitez les changements d'équipe pendant un sprint. 
              La stabilité est clé pour la vélocité</li>
              <li>🚫 <span className="font-medium">Dates fixes :</span> NE modifiez JAMAIS les dates d'un sprint actif (principe Scrum). 
              Si nécessaire, clôturez et créez un nouveau sprint</li>
              <li>📋 <span className="font-medium">Stories bien définies :</span> Assurez-vous que toutes les stories sont "Ready" 
              (critères d'acceptation clairs) avant le Sprint Planning</li>
              <li>💾 <span className="font-medium">Export régulier :</span> Exportez en CSV tous les mois pour garder un historique 
              externe et analyser les tendances (vélocité, durée moyenne, taux de complétion)</li>
            </ul>
          </div>
        </div>

        {/* Module Tips */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Module Conseils : SprintTips.jsx</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-3">
              Composant pédagogique optionnel (prop <code>show</code>) affiché au-dessus de la FilterBar. 
              Conçu pour guider les nouveaux utilisateurs avec :
            </p>
            <ul className="text-sm text-gray-600 space-y-2 ml-4 list-disc">
              <li><strong>🎯 Qu'est-ce qu'un Sprint ?</strong> Définition, durée recommandée, cycle Scrum</li>
              <li><strong>📋 Création d'un sprint</strong> Importance du produit, équipe, objectif et sélection stories</li>
              <li><strong>🔄 Cycle de vie</strong> Explication des 3 statuts (planifié, en cours, terminé)</li>
              <li><strong>📊 Indicateurs clés</strong> Double progression (stories vs temps) et alerte rouge</li>
              <li><strong>⚠️ Validations Scrum</strong> Durée max 28j, recommandation 7-14j, avertissement si &lt;7j</li>
              <li><strong>💡 Bonnes pratiques</strong> Durée fixe, capacité réaliste, Daily Scrum, Sprint Board, Review + Rétro</li>
            </ul>
            <p className="text-sm text-gray-700 mt-3">
              <span className="font-medium">Design :</span> Dégradé jaune-ambre avec icône Lightbulb. 
              6 cartes blanches avec bordure de couleur (indigo, emerald, purple, blue, yellow, amber).
            </p>
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

export default SprintsDetailPage;
