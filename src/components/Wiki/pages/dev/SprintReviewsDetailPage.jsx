import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Calendar } from 'lucide-react';

/**
 * SprintReviewsDetailPage - Documentation TECHNIQUE du Module Sprint Reviews
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const SprintReviewsDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Sprint Reviews</h1>
              <p className="text-teal-100">Version complète pour développeurs et IA • v1.0.0</p>
            </div>
            {onSwitchToUser && (
              <button
                onClick={onSwitchToUser}
                className="flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                <Calendar size={18} />
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
              Le <strong>Module Sprint Reviews</strong> documente les cérémonies de démonstration en fin de sprint. 
              Il capture les stories démontrées, les feedbacks des stakeholders avec priorisation, les décisions prises 
              et les actions à mener sur le Product Backlog.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Il s'intègre étroitement avec les modules Sprints, User Stories, Contacts et Produits pour une documentation 
              complète et contextualisée des reviews.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📅 Sprint Review</h3>
              <p className="text-sm text-gray-700 mb-3">
                Cérémonie Scrum de démonstration du travail terminé aux stakeholders. Chaque review documente 
                ce qui a été montré, les retours reçus et les décisions prises pour ajuster le backlog.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Statuts :</span> scheduled, completed, cancelled</p>
                <p><span className="font-medium">Durée recommandée :</span> Max 4h pour un sprint de 4 semaines</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💬 Feedback Stakeholder</h3>
              <p className="text-sm text-gray-700 mb-3">
                Retour structuré d'un stakeholder avec contact source, priorité (critical, high, medium, low), 
                catégorie (feature, bug, usability, performance, other) et commentaire détaillé.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Usage :</span> Base pour créer de nouvelles stories</p>
                <p><span className="font-medium">Traçabilité :</span> Lien avec le contact émetteur</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📋 Stories Démontrées</h3>
              <p className="text-sm text-gray-700 mb-3">
                Liste des user stories avec statut "done" qui ont été effectivement présentées pendant la review. 
                Permet de tracer précisément ce qui a été démontré vs ce qui était terminé.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Filtrage :</span> Uniquement stories done du sprint</p>
                <p><span className="font-medium">Stockage :</span> Array d'IDs (completedStoryIds)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Décisions & Actions</h3>
              <p className="text-sm text-gray-700 mb-3">
                Documentation des décisions stratégiques prises pendant la review et des actions à mener 
                sur le Product Backlog (nouvelles stories, repriorisations, suppressions).
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Format :</span> Texte libre multiligne</p>
                <p><span className="font-medium">Usage :</span> Base pour le prochain sprint planning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture des composants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture des Composants</h2>

          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📁 Structure du Module</h3>
              <div className="bg-white rounded border border-gray-300 p-3 font-mono text-xs">
                <div>src/components/SprintReviews/</div>
                <div className="ml-4">├── index.js (exports centralisés)</div>
                <div className="ml-4">├── SprintReviewList.jsx (composant principal)</div>
                <div className="ml-4">├── SprintReviewCard.jsx (carte review)</div>
                <div className="ml-4">├── SprintReviewDetail.jsx (modal détail)</div>
                <div className="ml-4">└── SprintReviewForm.jsx (formulaire création/édition)</div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔷 SprintReviewList (Composant Principal)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Liste responsive avec filtres, pagination et gestion des états vides intelligents.
              </p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Props requises</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block">
                    sprintReviews, sprints, userStories, contacts, products, onEdit, onDelete, onNew
                  </code>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Props optionnelles</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block">
                    initialFilters, showTips (boolean)
                  </code>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Composants utilisés</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">FilterBar</span> - Filtres avec ProductSelector intégré</li>
                    <li>• <span className="font-medium">SprintReviewCard</span> - Affichage carte (memoized)</li>
                    <li>• <span className="font-medium">SprintReviewDetail</span> - Modal de visualisation</li>
                    <li>• <span className="font-medium">ConfirmDialog</span> - Confirmation suppression</li>
                    <li>• <span className="font-medium">EmptyState</span> - États vides intelligents</li>
                    <li>• <span className="font-medium">Pagination</span> - Navigation 9 items/page</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Filtres disponibles</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">Produit</span> - Via ProductSelector (toujours visible)</li>
                    <li>• <span className="font-medium">Sprint</span> - Liste déroulante tous sprints</li>
                    <li>• <span className="font-medium">Statut</span> - scheduled / completed / cancelled</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">États vides intelligents</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• Détecte si products.length === 0 → Message "Créez d'abord des produits"</li>
                    <li>• Détecte si sprints.length === 0 → Message "Créez d'abord des sprints"</li>
                    <li>• Détecte si sprintReviews.length === 0 → Bouton "Créer première review"</li>
                    <li>• Aucun résultat après filtrage → Bouton "Réinitialiser filtres"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📝 SprintReviewForm (Formulaire)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Formulaire modal fullscreen avec 7 sections et validation temps réel.
              </p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Structure des 7 sections</p>
                  <ol className="text-xs text-gray-600 ml-4 mt-1 space-y-1 list-decimal">
                    <li><span className="font-medium">📦 Informations de base</span> - Sprint, Date/heure, Statut (fond indigo)</li>
                    <li><span className="font-medium">👥 Participants</span> - MultiContactSelector (fond blue)</li>
                    <li><span className="font-medium">📈 Stories démontrées</span> - Checkboxes stories done (fond indigo)</li>
                    <li><span className="font-medium">📝 Notes de démonstration</span> - Textarea libre (fond blue)</li>
                    <li><span className="font-medium">💬 Feedback stakeholders</span> - Liste dynamique + formulaire (fond indigo)</li>
                    <li><span className="font-medium">🎯 Décisions prises</span> - Textarea libre (fond blue)</li>
                    <li><span className="font-medium">📋 Prochaines étapes</span> - Textarea Product Backlog (fond indigo)</li>
                  </ol>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Validation formulaire</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">Champs requis :</span> sprintId, reviewDate</li>
                    <li>• Validation temps réel via useEffect</li>
                    <li>• Bouton sauvegarder désactivé si formulaire invalide</li>
                    <li>• Message d'erreur affiché dans FormFooter</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Gestion des feedbacks stakeholders</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• Formulaire inline pour ajouter/modifier feedback</li>
                    <li>• Champs : contactId, feedback (texte), priority, category</li>
                    <li>• Mode édition : surlignage bleu + bouton "Mettre à jour"</li>
                    <li>• Bouton "Annuler" en mode édition pour revenir à l'ajout</li>
                    <li>• Liste des feedbacks existants avec boutons Modifier/Supprimer</li>
                    <li>• Badges colorés pour priorité et catégorie</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Composants UI utilisés</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block">
                    FormModal, FormHeader, FormSection, FormGrid, FormFooter, Input, Textarea, Select, MultiContactSelector
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔍 SprintReviewDetail (Modal Détail)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Modal de visualisation complète avec DetailModal et sections standardisées.
              </p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Structure d'affichage</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">En-tête unifié</span> - Titre + Badges (statut, date, sprint, produit)</li>
                    <li>• <span className="font-medium">Section Sprint Info</span> - Objectif sprint + dates (fond blue)</li>
                    <li>• <span className="font-medium">Section Participants</span> - Liste badges contacts (fond indigo)</li>
                    <li>• <span className="font-medium">Section Stories</span> - Titre stories démontrées (fond blue)</li>
                    <li>• <span className="font-medium">Section Notes démo</span> - Liste à puces (fond indigo)</li>
                    <li>• <span className="font-medium">Section Feedbacks</span> - Cards avec badges priorité/catégorie (fond blue)</li>
                    <li>• <span className="font-medium">Section Décisions</span> - Liste à puces (fond indigo)</li>
                    <li>• <span className="font-medium">Section Prochaines étapes</span> - Liste à puces (fond blue)</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Badges et couleurs</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">Statuts :</span> scheduled (yellow), completed (green), cancelled (red)</li>
                    <li>• <span className="font-medium">Priorités :</span> critical (red), high (orange), medium (yellow), low (gray)</li>
                    <li>• <span className="font-medium">Catégories :</span> feature (blue), bug (red), usability (purple), performance (green), other (gray)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎴 SprintReviewCard</h3>
              <p className="text-sm text-gray-700 mb-3">
                Composant carte memoized avec React.memo pour optimisation performances.
              </p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Structure</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">CardHeader</span> - Nom du sprint uniquement</li>
                    <li>• <span className="font-medium">Corps</span> - Décisions prises (liste à puces) + Date/durée</li>
                    <li>• <span className="font-medium">CardFooter</span> - Badge produit + badge statut + 3 boutons actions</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Props</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block">
                    review, sprint, product, completedStories, participants, getStatusBadge, onView, onEdit, onDelete
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'une Sprint Review</h3>
              
              <div className="bg-white rounded border border-gray-300 p-3 font-mono text-xs mb-3">
                <div className="text-gray-900 font-semibold mb-2">interface SprintReview {'{'}</div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-cyan-600">id</span>: string; <span className="text-gray-500">// UUID généré automatiquement</span></div>
                  <div><span className="text-cyan-600">sprintId</span>: string; <span className="text-gray-500">// ID du sprint (requis)</span></div>
                  <div><span className="text-cyan-600">reviewDate</span>: string; <span className="text-gray-500">// ISO datetime (requis)</span></div>
                  <div><span className="text-cyan-600">status</span>: 'scheduled' | 'completed' | 'cancelled';</div>
                  <div><span className="text-cyan-600">duration</span>?: number; <span className="text-gray-500">// Durée en minutes</span></div>
                  <div className="mt-2"><span className="text-cyan-600">participants</span>: string[]; <span className="text-gray-500">// IDs contacts présents</span></div>
                  <div><span className="text-cyan-600">completedStoryIds</span>: string[]; <span className="text-gray-500">// Stories démontrées</span></div>
                  <div className="mt-2"><span className="text-cyan-600">demoNotes</span>: string; <span className="text-gray-500">// Notes démonstration</span></div>
                  <div><span className="text-cyan-600">decisions</span>: string; <span className="text-gray-500">// Décisions prises</span></div>
                  <div><span className="text-cyan-600">nextStepsProductBacklog</span>: string; <span className="text-gray-500">// Actions backlog</span></div>
                  <div className="mt-2"><span className="text-cyan-600">stakeholderFeedback</span>: StakeholderFeedback[];</div>
                  <div className="mt-2"><span className="text-cyan-600">createdAt</span>: string; <span className="text-gray-500">// ISO datetime</span></div>
                  <div><span className="text-cyan-600">updatedAt</span>: string; <span className="text-gray-500">// ISO datetime</span></div>
                </div>
                <div className="text-gray-900 font-semibold">{'}'}</div>
              </div>

              <div className="bg-white rounded border border-gray-300 p-3 font-mono text-xs">
                <div className="text-gray-900 font-semibold mb-2">interface StakeholderFeedback {'{'}</div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-cyan-600">contactId</span>: string; <span className="text-gray-500">// ID du stakeholder</span></div>
                  <div><span className="text-cyan-600">feedback</span>: string; <span className="text-gray-500">// Commentaire</span></div>
                  <div><span className="text-cyan-600">priority</span>: 'critical' | 'high' | 'medium' | 'low';</div>
                  <div><span className="text-cyan-600">category</span>: 'feature' | 'bug' | 'usability' | 'performance' | 'other';</div>
                </div>
                <div className="text-gray-900 font-semibold">{'}'}</div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>📅 <span className="font-medium">Tri par défaut :</span> reviewDate décroissante (plus récentes en premier)</li>
                <li>🔍 <span className="font-medium">Filtrage stories :</span> Seules les stories done du sprint sélectionné apparaissent</li>
                <li>👥 <span className="font-medium">Participants disponibles :</span> Contacts associés au produit du sprint</li>
                <li>💬 <span className="font-medium">Feedbacks :</span> Peuvent être ajoutés/modifiés/supprimés dynamiquement</li>
                <li>📊 <span className="font-medium">Statuts :</span> scheduled par défaut, completed après la review, cancelled si annulée</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les sprint reviews sont sauvegardées localement dans le navigateur sous la clé "sprintReviews". 
                Sauvegarde automatique à chaque opération via le hook useSprintReviews et le Factory Pattern Storage.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">🔒 Confidentialité :</span> Vos données restent 100% privées et ne sont jamais envoyées vers un serveur externe.
              </p>
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
                Chaque review est liée à un produit via le sprint. ProductSelector permet de filtrer les reviews par produit. 
                Le badge produit (code + couleur) est affiché dans le footer de chaque carte.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏃 Module Sprints</h3>
              <p className="text-sm text-gray-700">
                Relation forte : chaque review documente UN sprint (sprintId obligatoire). Le nom du sprint, ses dates et son objectif 
                sont affichés dans la review. Le filtre Sprint permet de retrouver une review par sprint.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                completedStoryIds[] stocke les IDs des stories démontrées. Filtrage automatique : seules les stories done du sprint 
                sont proposées dans le formulaire. Les titres des stories sont affichés dans le détail de la review.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                participants[] : liste des stakeholders présents. MultiContactSelector filtre automatiquement les contacts 
                du produit concerné. Chaque feedback est lié à un contact (contactId) pour traçabilité.
              </p>
            </div>
          </div>
        </div>

        {/* Hooks personnalisés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hooks Personnalisés</h2>
          
          <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">🔧 useSprintReviews</h3>
            <p className="text-sm text-gray-700 mb-3">
              Hook principal pour la gestion CRUD des sprint reviews avec Factory Pattern Storage.
            </p>
            
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-gray-800 mb-1">Méthodes disponibles</p>
                <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                  <li>• <span className="font-medium">sprintReviews</span> - Array de toutes les reviews</li>
                  <li>• <span className="font-medium">addSprintReview(reviewData)</span> - Crée une nouvelle review</li>
                  <li>• <span className="font-medium">updateSprintReview(id, reviewData)</span> - Met à jour une review</li>
                  <li>• <span className="font-medium">deleteSprintReview(id)</span> - Supprime une review</li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-800 mb-1">Logique automatique</p>
                <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                  <li>• Génération automatique de l'ID (UUID)</li>
                  <li>• Ajout automatique de createdAt et updatedAt (ISO datetime)</li>
                  <li>• Sauvegarde immédiate dans localStorage via Factory Pattern</li>
                  <li>• Mise à jour du state React pour re-render</li>
                </ul>
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
              <li>📅 <span className="font-medium">Validation formulaire :</span> Uniquement sprintId et reviewDate requis, tout le reste est optionnel</li>
              <li>💬 <span className="font-medium">Gestion feedbacks :</span> Possibilité d'ajouter/modifier/supprimer en mode édition dans le formulaire</li>
              <li>🎨 <span className="font-medium">Design system :</span> Alternance fonds indigo/blue pour distinguer les sections</li>
              <li>🔍 <span className="font-medium">États vides :</span> Messages intelligents selon dépendances manquantes (produits, sprints)</li>
              <li>📊 <span className="font-medium">Performance :</span> SprintReviewCard memoized avec React.memo pour éviter re-renders inutiles</li>
              <li>🎯 <span className="font-medium">UX cohérente :</span> Utilisation systématique des composants UI standardisés (FormModal, DetailModal, FilterBar, etc.)</li>
              <li>📱 <span className="font-medium">Responsive :</span> Grille 3 cols → 2 cols → 1 col selon viewport, padding adaptatif</li>
              <li>🔄 <span className="font-medium">Pagination :</span> 9 reviews par page, reset automatique à page 1 si changement de filtres</li>
            </ul>
          </div>
        </div>

        {/* Évolutions futures */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Évolutions Futures Possibles</h2>
          
          <div className="space-y-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📊 Statistiques Reviews</h3>
              <p className="text-sm text-gray-700">
                Ajouter des stats agrégées : nombre total de feedbacks par priorité, taux de completion des sprints, 
                durée moyenne des reviews, évolution du nombre de stories démontrées par sprint.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🔗 Lien automatique vers Stories</h3>
              <p className="text-sm text-gray-700">
                Créer automatiquement des user stories depuis les feedbacks stakeholders avec pré-remplissage de la priorité, 
                catégorie et description basée sur le commentaire du feedback.
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📥 Export PDF</h3>
              <p className="text-sm text-gray-700">
                Générer un PDF de compte-rendu de review formaté et professionnel pour partage avec stakeholders 
                ou archivage externe.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Templates de Review</h3>
              <p className="text-sm text-gray-700">
                Permettre de créer des templates de review pré-configurés (participants types, durée standard, sections à compléter) 
                pour accélérer la création.
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
                qui veulent juste apprendre à utiliser le module.
              </p>
            </div>
            {onSwitchToUser && (
              <button
                onClick={onSwitchToUser}
                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-md whitespace-nowrap ml-4"
              >
                <Calendar size={20} />
                Voir le Guide Utilisateur
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SprintReviewsDetailPage;
