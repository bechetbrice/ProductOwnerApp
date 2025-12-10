import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * TasksManagementDetailPage - Documentation TECHNIQUE du Module Tasks Management
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const TasksManagementDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Tasks Management</h1>
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
              Le <strong>Module Tasks Management</strong> permet la décomposition technique des User Stories en tâches 
              assignables et estimables. C'est l'outil clé du Sprint Planning pour transformer les stories 
              en actions concrètes pour l'équipe de développement.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local. 
              Il s'intègre étroitement avec les modules User Stories, Sprints, Teams et Contacts pour offrir 
              une gestion complète du cycle Scrum : Sprint Planning → Daily Scrum → Task Board → Sprint Review.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📋 Tâche Technique</h3>
              <p className="text-sm text-gray-700 mb-3">
                Unité de travail technique découlant d'une User Story. Estimée en heures (0.5 à 8h idéalement), 
                assignée à un membre spécifique, avec un type précis (dev, test, review...).
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Statuts :</span> todo (À faire) / inProgress (En cours) / done (Terminée)</p>
                <p><span className="font-medium">Identification :</span> taskNumber unique (ex: T-123, TASK-042)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Outcomes (Résultats)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Système de gestion bienveillant des tâches non terminées. Permet de documenter pourquoi une tâche 
                n'a pas été complétée (pause, blocage, annulation...) avec raison et historique.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">5 outcomes :</span> completed, paused, blocked, cancelled, to_review</p>
                <p><span className="font-medium">Historique :</span> Toutes les transitions sont enregistrées</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💻 Types de Tâches</h3>
              <p className="text-sm text-gray-700 mb-3">
                6 types prédéfinis pour classifier le travail technique : development, testing, review, 
                deployment, documentation, other. Chaque type a son emoji et couleur associés.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>💻 Development • 🧪 Testing • 👀 Review</p>
                <p>🚀 Deployment • 📚 Documentation • 🔧 Other</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Décomposition Sprint Planning</h3>
              <p className="text-sm text-gray-700 mb-3">
                Lors du Sprint Planning, chaque User Story du sprint doit être décomposée en tâches. 
                Une alerte affiche les stories non décomposées avec bouton "Décomposer" rapide.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Alerte automatique :</span> Stories sans tâches détectées</p>
                <p><span className="font-medium">Pré-remplissage :</span> Story ID déjà sélectionnée</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> Les tâches héritent automatiquement du sprintId de leur User Story parente. 
              L'assignation est limitée aux membres de l'équipe de la story (si définie), sinon à tous les contacts internes.
            </p>
          </div>
        </div>

        {/* Utilisation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Utilisation pas-à-pas</h2>

          {/* Interface principale */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Interface Principale</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">💡 Module Conseils et astuces</p>
                <p className="text-sm text-gray-700 mb-2">
                  Activable via props showTips. Guide l'utilisateur sur :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Décomposition Sprint Planning et alerte stories non décomposées</li>
                  <li>6 types de tâches techniques (dev, test, review, deploy, doc, other)</li>
                  <li>Système Outcomes pour gérer les tâches non terminées</li>
                  <li>Suivi Daily Scrum avec Task Board</li>
                  <li>Bonnes pratiques : granularité 2-8h, clarté, mise à jour quotidienne</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📱 Grille de Tâches Responsive</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation en 3 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile). 
                  Chaque tâche est présentée sous forme de carte (TaskCard) avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Titre de la tâche</li>
                  <li><span className="font-medium">Corps :</span> Description (multi-lignes), Type, Assigné, Estimation</li>
                  <li><span className="font-medium">Footer :</span> Badge produit, Badge statut/outcome, 3 boutons (Voir, Modifier, Supprimer)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">⚠️ Alerte Stories sans tâches</p>
                <p className="text-sm text-gray-700 mb-2">
                  Encart orange affichant le nombre de stories dans un sprint mais sans tâches. 
                  Liste les 5 premières avec bouton "Décomposer" pour création rapide.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Détection automatique : stories avec sprintId mais sans tasks</li>
                  <li>Bouton "Décomposer" pré-remplit le formulaire avec la story</li>
                  <li>Affiche : titre, estimation pts, priorité MoSCoW</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📄 Pagination</p>
                <p className="text-sm text-gray-700">
                  9 tâches par page. Composant Pagination standardisé avec navigation et compteur. 
                  Tri automatique : En cours &gt; À faire &gt; Terminée, puis date création décroissante.
                </p>
              </div>
            </div>
          </div>

          {/* Filtres et actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Barre de Filtres et Actions</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔧 En-tête de la FilterBar (toujours visible)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Contient les actions principales :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Sélecteur Produit :</span> Filtre par produit (via story)</li>
                  <li><span className="font-medium">Nouvelle tâche :</span> Bouton gradient bleu-violet</li>
                  <li><span className="font-medium">Réinitialiser :</span> Efface tous les filtres actifs</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (Repliable)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Par défaut repliée. Une fois dépliée, affiche 5 filtres :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Sprint :</span> Tous / Liste sprints (avec compteur tâches et statut)</li>
                  <li><span className="font-medium">User Story :</span> Toutes / Liste stories (avec # et emoji sprint)</li>
                  <li><span className="font-medium">Type :</span> Tous / 6 types avec emojis</li>
                  <li><span className="font-medium">Assigné à :</span> Tous / Liste contacts internes</li>
                  <li><span className="font-medium">Outcome :</span> Tous / Aucun / 5 outcomes avec emojis</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎯 Logique de filtrage</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Filtre Produit :</span> Via story.productId</li>
                  <li><span className="font-medium">Filtre Sprint :</span> Via sprint.storyIds.includes(task.userStoryId)</li>
                  <li><span className="font-medium">Filtres combinables :</span> Tous les filtres s'appliquent en AND</li>
                  <li><span className="font-medium">Compteur actif :</span> Badge indiquant nombre de filtres appliqués</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulaire de tâche - condensé */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Formulaire de Tâche (TaskForm)</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">📝 Structure générale</p>
              <p className="text-sm text-gray-700 mb-3">
                Modale plein écran (FormModal) avec 5 sections et validation temps réel :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><span className="font-medium">📄 User Story associée</span> - Sélection via UserStorySelector (obligatoire, peut être pré-remplie)</li>
                <li><span className="font-medium">#️⃣ Identification & Type</span> - taskNumber + type (6 options)</li>
                <li><span className="font-medium">✏️ Titre de la tâche</span> - Titre court et explicite (obligatoire)</li>
                <li><span className="font-medium">📝 Description détaillée</span> - Détails techniques (optionnel, multi-lignes)</li>
                <li><span className="font-medium">👤 Assignation & Estimation</span> - Contact + heures estimées (obligatoires)</li>
              </ol>
              
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">✅ Validation du formulaire</p>
                <p className="text-xs text-gray-700 mb-2">
                  Champs requis : taskNumber, title, userStoryId, assignedTo, estimatedHours &gt; 0. 
                  Le bouton "Sauvegarder" est désactivé si formulaire invalide.
                </p>
                <p className="text-xs text-gray-700">
                  <span className="font-medium">Logique assignation :</span> Si la story a une équipe, seuls ses membres sont proposés. 
                  Sinon, tous les contacts internes sont disponibles.
                </p>
              </div>
            </div>
          </div>

          {/* Modal détail */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Modal Détail (TaskDetail)</h3>
            
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">👁️ Structure complète</p>
              <p className="text-sm text-gray-700 mb-3">
                Modal DetailModal avec design sobre et standardisé :
              </p>
              <ul className="text-sm text-gray-600 space-y-2 ml-4 list-disc">
                <li><span className="font-medium">En-tête indigo :</span> #taskNumber, titre, badges (outcome/statut, type, estimation)</li>
                <li><span className="font-medium">Section 1 - Description :</span> Texte préformaté (fond bleu)</li>
                <li><span className="font-medium">Section 2 - User Story :</span> #storyNumber + titre en italique (fond indigo)</li>
                <li><span className="font-medium">Section 3 - Assignation :</span> Nom + rôle du contact (fond bleu)</li>
                <li><span className="font-medium">Section 4 - Outcome & Historique :</span> Outcome actuel + transitions (fond indigo)</li>
                <li><span className="font-medium">Section 5 - Dates :</span> Création + dernière modification (fond bleu)</li>
              </ul>
            </div>
          </div>

          {/* Gestionnaire Outcomes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">5️⃣ Gestionnaire d'Outcomes (TaskOutcomeManager)</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">🎯 Interface bienveillante</p>
              <p className="text-sm text-gray-700 mb-3">
                Modal plein écran pour définir l'outcome d'une tâche avec approche positive :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><span className="font-medium">Sélection outcome :</span> 5 cartes cliquables (completed, paused, blocked, cancelled, to_review)</li>
                <li><span className="font-medium">Raison :</span> Champ texte pour documenter (optionnel)</li>
                <li><span className="font-medium">Notes :</span> Textarea pour détails additionnels (optionnel)</li>
                <li><span className="font-medium">Actions suggérées :</span> Liste contextuelles selon outcome choisi</li>
                <li><span className="font-medium">Historique :</span> Affichage des transitions passées</li>
              </ol>
              
              <div className="mt-3 bg-green-50 border border-green-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">💾 Sauvegarde automatique</p>
                <p className="text-xs text-gray-700">
                  L'outcome est ajouté à task.history[] avec date, statut, raison. 
                  Si outcome='completed', le statut passe automatiquement à 'done'.
                </p>
              </div>
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
              <li>📋 <span className="font-medium">Sprint Planning :</span> Décomposez TOUTES les stories d'un sprint en tâches - l'alerte vous guide</li>
              <li>⏱️ <span className="font-medium">Granularité :</span> Visez 2-8h par tâche pour un suivi Daily Scrum efficace</li>
              <li>🎯 <span className="font-medium">Outcomes :</span> Utilisez-les pour documenter POURQUOI (pas de jugement, juste des faits)</li>
              <li>👥 <span className="font-medium">Assignation :</span> Respectez les équipes définies sur les stories (filtrage automatique)</li>
              <li>🔄 <span className="font-medium">Daily Scrum :</span> Mettez à jour les statuts quotidiennement (todo → inProgress → done)</li>
              <li>📊 <span className="font-medium">Task Board :</span> Utilisez le module TaskBoard pour visualisation Kanban</li>
              <li>✏️ <span className="font-medium">Clarté :</span> Titre explicite + description détaillée = moins de questions</li>
              <li>🔢 <span className="font-medium">Numérotation :</span> Adoptez une convention (T-XXX, TASK-XXX) et restez cohérent</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données - condensé */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'une Task</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs obligatoires</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>id, taskNumber, title</div>
                    <div>type, status, userStoryId</div>
                    <div>assignedTo, estimatedHours</div>
                    <div>createdAt, updatedAt</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs optionnels</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>description</div>
                    <div>sprintId (hérité de story)</div>
                    <div>outcome, outcomeReason</div>
                    <div>outcomeNote, outcomeDate</div>
                    <div>history[] (transitions)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>📊 <span className="font-medium">Types énumérés :</span> 'development' | 'testing' | 'review' | 'deployment' | 'documentation' | 'other'</li>
                <li>🎯 <span className="font-medium">Statuts énumérés :</span> 'todo' | 'inProgress' | 'done'</li>
                <li>🔄 <span className="font-medium">Outcomes énumérés :</span> 'completed' | 'paused' | 'blocked' | 'cancelled' | 'to_review'</li>
                <li>🏃 <span className="font-medium">Héritage sprintId :</span> Récupéré automatiquement depuis userStories.find(s =&gt; s.id === task.userStoryId)?.sprintId</li>
                <li>📝 <span className="font-medium">Historique :</span> Array d'objets {sprintId, status, outcome, reason, date}</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les tâches sont sauvegardées localement sous la clé "tasks". 
                Sauvegarde automatique via Factory Pattern Storage à chaque opération CRUD.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">🔒 Confidentialité :</span> Données 100% privées, jamais envoyées vers serveur externe.
              </p>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules - condensé */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                Chaque tâche est obligatoirement liée à une User Story (task.userStoryId). 
                Le UserStorySelector affiche stories avec #storyNumber + titre + indicateur sprint.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏃 Module Sprints</h3>
              <p className="text-sm text-gray-700">
                Le sprintId est hérité de la User Story. Filtrage des tâches par sprint via sprint.storyIds[].
                Alerte automatique pour stories dans sprint mais sans tâches.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                Assignation via task.assignedTo (contactId). Filtrage automatique selon équipe de la story : 
                si story.teamId existe, seuls team.memberContactIds sont proposés, sinon tous contacts internes.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700">
                Filtrage par produit via story.productId. ProductSelector en haut de TasksList 
                permet de visualiser uniquement les tâches d'un produit spécifique.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📊 Module Task Board</h3>
              <p className="text-sm text-gray-700">
                Le Task Board offre une vue Kanban des tâches (todo | inProgress | done). 
                Possibilité d'éditer une tâche depuis le Board : stockage dans sessionStorage puis ouverture TasksList avec formulaire pré-rempli.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📈 Module Dashboard</h3>
              <p className="text-sm text-gray-700">
                Le Dashboard peut ouvrir une tâche spécifique via initialTaskId (props). 
                La tâche s'ouvre automatiquement en modal détail au chargement.
              </p>
            </div>
          </div>
        </div>

        {/* Architecture technique */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture Technique</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🧩 Composants principaux</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li><span className="font-medium">TasksList.jsx :</span> Liste principale avec filtres, pagination, alerts (v4.5.0)</li>
                <li><span className="font-medium">TaskCard.jsx :</span> Carte memoized avec CardHeader/CardFooter standardisés</li>
                <li><span className="font-medium">TaskForm.jsx :</span> Formulaire avec FormModal, FormSection, validation temps réel (v3.6.0)</li>
                <li><span className="font-medium">TaskDetail.jsx :</span> Modal DetailModal sobre avec SectionGroup</li>
                <li><span className="font-medium">TaskOutcomeBadge.jsx :</span> Badge avec icônes Lucide, tailles small/normal/large</li>
                <li><span className="font-medium">TaskOutcomeManager.jsx :</span> Modal gestion outcomes (v4.4.0)</li>
                <li><span className="font-medium">UserStorySelector.jsx :</span> Dropdown personnalisé multi-lignes avec recherche (v1.0.0)</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎨 Design System</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li><span className="font-medium">Composants UI :</span> FormModal, DetailModal, EmptyState, Pagination, FilterBar, ProductSelector</li>
                <li><span className="font-medium">Composants Form :</span> Input, Textarea, Select, FormSection, FormGrid, FormHeader, FormFooter</li>
                <li><span className="font-medium">Composants Card :</span> CardHeader, CardFooter standardisés</li>
                <li><span className="font-medium">ConfirmDialog :</span> Pour suppression avec message personnalisé</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">⚡ Optimisations</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li><span className="font-medium">React.memo :</span> TaskCard memoized pour éviter re-renders inutiles</li>
                <li><span className="font-medium">useMemo :</span> Calculs de filteredTasks, storiesWithTasks, tri et pagination</li>
                <li><span className="font-medium">useEffect :</span> Gestion sessionStorage pour édition depuis TaskBoard</li>
                <li><span className="font-medium">PropTypes :</span> Validation des props pour TaskCard</li>
              </ul>
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

export default TasksManagementDetailPage;
