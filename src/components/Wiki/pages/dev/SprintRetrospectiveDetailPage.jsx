import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Calendar } from 'lucide-react';

/**
 * SprintRetrospectiveDetailPage - Documentation TECHNIQUE du Module Sprint Retrospectives
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const SprintRetrospectiveDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Sprint Retrospectives</h1>
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
              Le <strong>Module Sprint Retrospectives</strong> permet de documenter les cérémonies d'amélioration continue en fin de sprint. 
              Il capture ce qui s'est bien passé, les points d'amélioration avec dot-voting, les actions concrètes avec assignation, 
              et les engagements collectifs pour le prochain sprint.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Il s'intègre étroitement avec les modules Sprints, Contacts et Produits pour une documentation 
              complète et contextualisée des rétrospectives.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📅 Sprint Retrospective</h3>
              <p className="text-sm text-gray-700 mb-3">
                Cérémonie Scrum d'amélioration continue en fin de sprint. L'équipe analyse le sprint écoulé pour identifier 
                les bonnes pratiques à renforcer et les points d'amélioration à traiter.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Statuts :</span> scheduled, completed, cancelled</p>
                <p><span className="font-medium">Durée recommandée :</span> Max 3h pour un sprint de 4 semaines</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👍 Ce qui s'est bien passé</h3>
              <p className="text-sm text-gray-700 mb-3">
                Liste des succès du sprint : bonnes pratiques, collaboration efficace, victoires techniques. 
                Chaque item possède un système de votes pour prioriser les pratiques à renforcer.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Structure :</span> {"{ id, description, votes }"}</p>
                <p><span className="font-medium">Dot-voting :</span> Boutons +/- pour voter (min: 0)</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💡 À améliorer</h3>
              <p className="text-sm text-gray-700 mb-3">
                Points de friction et obstacles rencontrés pendant le sprint. Système de votes identique 
                pour prioriser les améliorations les plus importantes à traiter.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Structure :</span> {"{ id, description, votes }"}</p>
                <p><span className="font-medium">Usage :</span> Base pour créer les actions d'amélioration</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Actions d'Amélioration</h3>
              <p className="text-sm text-gray-700 mb-3">
                Actions concrètes et mesurables avec priorité (critical/high/medium/low), catégorie 
                (process/tools/communication/technical/other), assignation et échéance.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Limite recommandée :</span> 3-5 actions max par rétro</p>
                <p><span className="font-medium">Statut :</span> todo (défaut), inProgress, done</p>
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
                <div>src/components/SprintRetrospective/</div>
                <div className="ml-4">├── index.js (exports centralisés)</div>
                <div className="ml-4">├── SprintRetroList.jsx (composant principal)</div>
                <div className="ml-4">├── SprintRetroCard.jsx (carte rétro)</div>
                <div className="ml-4">├── SprintRetroDetail.jsx (modal détail)</div>
                <div className="ml-4">└── SprintRetroForm.jsx (formulaire création/édition)</div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔷 SprintRetroList (Composant Principal)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Liste responsive avec filtres, pagination et gestion des états vides intelligents.
              </p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Props requises</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block">
                    sprintRetrospectives, sprints, contacts, products, onEdit, onDelete, onNew
                  </code>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Props optionnelles</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block">
                    initialFilters ({"{ sprintId?, productId? }"})
                  </code>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Composants utilisés</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">FilterBar</span> - Filtres avec ProductSelector intégré</li>
                    <li>• <span className="font-medium">SprintRetroCard</span> - Affichage carte (memoized)</li>
                    <li>• <span className="font-medium">SprintRetroDetail</span> - Modal de visualisation</li>
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
                    <li>• Détecte si sprintRetrospectives.length === 0 → Bouton "Créer première rétrospective"</li>
                    <li>• Aucun résultat après filtrage → Bouton "Réinitialiser filtres"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📝 SprintRetroForm (Formulaire)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Formulaire modal fullscreen avec 6 sections et validation temps réel.
              </p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Structure des 6 sections</p>
                  <ol className="text-xs text-gray-600 ml-4 mt-1 space-y-1 list-decimal">
                    <li><span className="font-medium">🎯 Informations de base</span> - Sprint, Date/heure, Statut (fond indigo)</li>
                    <li><span className="font-medium">👥 Participants</span> - MultiContactSelector (fond blue)</li>
                    <li><span className="font-medium">👍 Ce qui s'est bien passé</span> - Liste dynamique + dot-voting (fond indigo)</li>
                    <li><span className="font-medium">💡 À améliorer</span> - Liste dynamique + dot-voting (fond blue)</li>
                    <li><span className="font-medium">🎯 Actions d'Amélioration</span> - Formulaire complet (fond indigo)</li>
                    <li><span className="font-medium">🎯 Engagements pour le Prochain Sprint</span> - Textarea libre (fond blue)</li>
                  </ol>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Validation formulaire</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">Champs requis :</span> sprintId, retroDate</li>
                    <li>• Validation temps réel via useEffect</li>
                    <li>• Bouton sauvegarder désactivé si formulaire invalide</li>
                    <li>• Message d'erreur affiché dans FormFooter</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Gestion du dot-voting</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• Boutons +/- pour voter sur chaque item (whatWentWell / whatNeedsImprovement)</li>
                    <li>• Votes min = 0 (bouton - désactivé si votes === 0)</li>
                    <li>• Tri automatique par votes décroissants dans l'affichage</li>
                    <li>• Mode édition : surlignage bleu + bouton "Valider" au lieu de "Ajouter"</li>
                    <li>• Bouton "Annuler" en mode édition pour revenir à l'ajout</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Gestion des actions d'amélioration</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• Champs : description (requis), priority, category, assignedTo, dueDate, notes, status</li>
                    <li>• Priorités : critical (red), high (orange), medium (yellow), low (gray)</li>
                    <li>• Catégories : process (blue), tools (purple), communication (green), technical (orange), other (gray)</li>
                    <li>• assignedTo filtré sur les participants disponibles (contacts du produit)</li>
                    <li>• Mode édition : fond bleu + bouton "Mettre à jour"</li>
                    <li>• Affichage : badges colorés pour priorité et catégorie</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Composants UI utilisés</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block">
                    FormModal, FormHeader, FormSection, FormGrid, FormFooter, Input, Textarea, Select, MultiContactSelector
                  </code>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Help Panel intégré</p>
                  <p className="text-xs text-gray-600 ml-4 mt-1">
                    FormHeader avec showHelp toggle affichant un panneau d'aide détaillé pour chaque section 
                    (informations de base, participants, whatWentWell, whatNeedsImprovement, actions, engagements, bonnes pratiques).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔍 SprintRetroDetail (Modal Détail)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Modal de visualisation complète avec DetailModal et sections standardisées.
              </p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Structure d'affichage</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">En-tête unifié</span> - Titre + Badges (statut, date, sprint, produit)</li>
                    <li>• <span className="font-medium">Section Sprint Info</span> - Objectif sprint + dates si disponibles (fond blue)</li>
                    <li>• <span className="font-medium">Section Participants</span> - Liste badges contacts avec nom + rôle (fond indigo)</li>
                    <li>• <span className="font-medium">Section Bien passé</span> - Items triés par votes avec 🗳️ affichage votes (fond blue)</li>
                    <li>• <span className="font-medium">Section À améliorer</span> - Items triés par votes avec 🗳️ affichage votes (fond indigo)</li>
                    <li>• <span className="font-medium">Section Actions</span> - Cards complètes avec badges + détails assignation (fond blue)</li>
                    <li>• <span className="font-medium">Section Engagements</span> - Liste à puces (fond indigo)</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Badges et couleurs</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">Statuts :</span> scheduled (yellow), completed (green), cancelled (red)</li>
                    <li>• <span className="font-medium">Priorités :</span> critical (red), high (orange), medium (yellow), low (gray)</li>
                    <li>• <span className="font-medium">Catégories :</span> process (blue), tools (purple), communication (green), technical (orange), other (gray)</li>
                    <li>• <span className="font-medium">Actions status :</span> todo (📝 À faire), inProgress (🔄 En cours), done (✅ Terminé)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎴 SprintRetroCard</h3>
              <p className="text-sm text-gray-700 mb-3">
                Composant carte memoized avec React.memo pour optimisation performances.
              </p>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Structure</p>
                  <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                    <li>• <span className="font-medium">CardHeader</span> - Nom du sprint uniquement</li>
                    <li>• <span className="font-medium">Corps</span> - Engagements prochain sprint (liste à puces) + Date/durée si présente</li>
                    <li>• <span className="font-medium">CardFooter</span> - Badge produit + badge statut + 3 boutons actions</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Props</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block">
                    retro, sprint, product, getStatusBadge, onView, onEdit, onDelete
                  </code>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-800 mb-1">Affichage des engagements</p>
                  <p className="text-xs text-gray-600 ml-4 mt-1">
                    nextSprintCommitments split sur \n avec affichage liste à puces (✓) uniquement si non vide.
                  </p>
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
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'une Sprint Retrospective</h3>
              
              <div className="bg-white rounded border border-gray-300 p-3 font-mono text-xs mb-3">
                <div className="text-gray-900 font-semibold mb-2">interface SprintRetrospective {'{'}</div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-cyan-600">id</span>: string; <span className="text-gray-500">// UUID généré automatiquement</span></div>
                  <div><span className="text-cyan-600">sprintId</span>: string; <span className="text-gray-500">// ID du sprint (requis)</span></div>
                  <div><span className="text-cyan-600">retroDate</span>: string; <span className="text-gray-500">// ISO datetime (requis)</span></div>
                  <div><span className="text-cyan-600">status</span>: 'scheduled' | 'completed' | 'cancelled';</div>
                  <div><span className="text-cyan-600">duration</span>?: number; <span className="text-gray-500">// Durée en minutes (optionnel)</span></div>
                  <div className="mt-2"><span className="text-cyan-600">participants</span>: string[]; <span className="text-gray-500">// IDs contacts présents</span></div>
                  <div className="mt-2"><span className="text-cyan-600">whatWentWell</span>: WhatWentWellItem[];</div>
                  <div><span className="text-cyan-600">whatNeedsImprovement</span>: ImprovementItem[];</div>
                  <div><span className="text-cyan-600">actionItems</span>: ActionItem[];</div>
                  <div><span className="text-cyan-600">nextSprintCommitments</span>: string; <span className="text-gray-500">// Multiligne</span></div>
                  <div className="mt-2"><span className="text-cyan-600">createdAt</span>: string; <span className="text-gray-500">// ISO datetime</span></div>
                  <div><span className="text-cyan-600">updatedAt</span>: string; <span className="text-gray-500">// ISO datetime</span></div>
                </div>
                <div className="text-gray-900 font-semibold">{'}'}</div>
              </div>

              <div className="bg-white rounded border border-gray-300 p-3 font-mono text-xs mb-3">
                <div className="text-gray-900 font-semibold mb-2">interface WhatWentWellItem {'{'}</div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-cyan-600">id</span>: string; <span className="text-gray-500">// Timestamp généré</span></div>
                  <div><span className="text-cyan-600">description</span>: string;</div>
                  <div><span className="text-cyan-600">votes</span>: number; <span className="text-gray-500">// Dot-voting (min: 0)</span></div>
                </div>
                <div className="text-gray-900 font-semibold">{'}'}</div>
              </div>

              <div className="bg-white rounded border border-gray-300 p-3 font-mono text-xs mb-3">
                <div className="text-gray-900 font-semibold mb-2">interface ImprovementItem {'{'}</div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-cyan-600">id</span>: string; <span className="text-gray-500">// Timestamp généré</span></div>
                  <div><span className="text-cyan-600">description</span>: string;</div>
                  <div><span className="text-cyan-600">votes</span>: number; <span className="text-gray-500">// Dot-voting (min: 0)</span></div>
                </div>
                <div className="text-gray-900 font-semibold">{'}'}</div>
              </div>

              <div className="bg-white rounded border border-gray-300 p-3 font-mono text-xs">
                <div className="text-gray-900 font-semibold mb-2">interface ActionItem {'{'}</div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-cyan-600">id</span>: string; <span className="text-gray-500">// Timestamp généré</span></div>
                  <div><span className="text-cyan-600">description</span>: string; <span className="text-gray-500">// Requis</span></div>
                  <div><span className="text-cyan-600">priority</span>: 'critical' | 'high' | 'medium' | 'low';</div>
                  <div><span className="text-cyan-600">category</span>: 'process' | 'tools' | 'communication' | 'technical' | 'other';</div>
                  <div><span className="text-cyan-600">assignedTo</span>: string; <span className="text-gray-500">// contactId optionnel</span></div>
                  <div><span className="text-cyan-600">dueDate</span>: string; <span className="text-gray-500">// Date optionnelle</span></div>
                  <div><span className="text-cyan-600">notes</span>: string; <span className="text-gray-500">// Optionnel</span></div>
                  <div><span className="text-cyan-600">status</span>: 'todo' | 'inProgress' | 'done'; <span className="text-gray-500">// Défaut: todo</span></div>
                </div>
                <div className="text-gray-900 font-semibold">{'}'}</div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>📅 <span className="font-medium">Tri par défaut :</span> retroDate ou createdAt décroissante (plus récentes en premier)</li>
                <li>🗳️ <span className="font-medium">Dot-voting :</span> votes triés décroissants dans l'affichage, votes min = 0</li>
                <li>👥 <span className="font-medium">Participants disponibles :</span> Contacts associés au produit du sprint</li>
                <li>🎯 <span className="font-medium">Actions :</span> Limitées à 3-5 recommandées, status par défaut = 'todo'</li>
                <li>📊 <span className="font-medium">Statuts :</span> scheduled par défaut, completed après la rétro, cancelled si annulée</li>
                <li>📝 <span className="font-medium">Engagements :</span> Texte libre multiligne, split sur \n pour affichage liste</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les sprint retrospectives sont sauvegardées localement dans le navigateur sous la clé "sprintRetrospectives". 
                Sauvegarde automatique à chaque opération via le hook useSprintRetrospectives et le Factory Pattern Storage.
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
                Chaque rétrospective est liée à un produit via le sprint. ProductSelector permet de filtrer les rétros par produit. 
                Le badge produit (code + couleur) est affiché dans le footer de chaque carte.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏃 Module Sprints</h3>
              <p className="text-sm text-gray-700">
                Relation forte : chaque rétrospective documente UN sprint (sprintId obligatoire). Le nom du sprint, ses dates et son objectif 
                sont affichés dans la rétrospective. Le filtre Sprint permet de retrouver une rétro par sprint.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                participants[] : liste des membres de l'équipe présents. MultiContactSelector filtre automatiquement les contacts 
                du produit concerné. Les actions peuvent être assignées à ces participants via assignedTo.
              </p>
            </div>
          </div>
        </div>

        {/* Hooks personnalisés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hooks Personnalisés</h2>
          
          <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">🔧 useSprintRetrospectives</h3>
            <p className="text-sm text-gray-700 mb-3">
              Hook principal pour la gestion CRUD des sprint retrospectives avec Factory Pattern Storage.
            </p>
            
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-gray-800 mb-1">Méthodes disponibles</p>
                <ul className="text-xs text-gray-600 ml-4 mt-1 space-y-1">
                  <li>• <span className="font-medium">sprintRetrospectives</span> - Array de toutes les rétros</li>
                  <li>• <span className="font-medium">addSprintRetrospective(retroData)</span> - Crée une nouvelle rétro</li>
                  <li>• <span className="font-medium">updateSprintRetrospective(id, retroData)</span> - Met à jour une rétro</li>
                  <li>• <span className="font-medium">deleteSprintRetrospective(id)</span> - Supprime une rétro</li>
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
              <li>📅 <span className="font-medium">Validation formulaire :</span> Uniquement sprintId et retroDate requis, tout le reste est optionnel</li>
              <li>🗳️ <span className="font-medium">Dot-voting :</span> Système de votes +/- pour prioriser items whatWentWell et whatNeedsImprovement</li>
              <li>🎯 <span className="font-medium">Actions limitées :</span> Recommandation de 3-5 actions max pour rester réaliste</li>
              <li>🎨 <span className="font-medium">Design system :</span> Alternance fonds indigo/blue pour distinguer les sections</li>
              <li>🔍 <span className="font-medium">États vides :</span> Messages intelligents selon dépendances manquantes (produits, sprints)</li>
              <li>📊 <span className="font-medium">Performance :</span> SprintRetroCard memoized avec React.memo pour éviter re-renders inutiles</li>
              <li>🎯 <span className="font-medium">UX cohérente :</span> Utilisation systématique des composants UI standardisés (FormModal, DetailModal, FilterBar, etc.)</li>
              <li>📱 <span className="font-medium">Responsive :</span> Grille 3 cols → 2 cols → 1 col selon viewport, padding adaptatif</li>
              <li>🔄 <span className="font-medium">Pagination :</span> 9 rétros par page, reset automatique à page 1 si changement de filtres</li>
              <li>✏️ <span className="font-medium">Mode édition inline :</span> Pour whatWentWell, whatNeedsImprovement et actions avec surlignage visuel</li>
            </ul>
          </div>
        </div>

        {/* Évolutions futures */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Évolutions Futures Possibles</h2>
          
          <div className="space-y-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📊 Tendances d'Amélioration Continue</h3>
              <p className="text-sm text-gray-700">
                Graphiques d'évolution : nombre d'actions par sprint, répartition par catégorie/priorité, 
                taux de complétion des actions, tendances des votes sur plusieurs rétros.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🔗 Suivi Actions Inter-Sprints</h3>
              <p className="text-sm text-gray-700">
                Tableau de bord des actions en cours avec filtrage par assigné, rappels échéances, 
                report automatique des actions non terminées vers la prochaine rétro.
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📥 Export Rapport Rétro</h3>
              <p className="text-sm text-gray-700">
                Générer un PDF ou Markdown de compte-rendu formaté avec whatWentWell, whatNeedsImprovement, 
                actions et engagements pour archivage ou partage équipe.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Templates Formats Rétro</h3>
              <p className="text-sm text-gray-700">
                Support de différents formats de rétro : Start/Stop/Continue, Glad/Sad/Mad, 4Ls (Liked/Learned/Lacked/Longed for), 
                Speedboat avec sélection du format au moment de la création.
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

export default SprintRetrospectiveDetailPage;
