import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * TasksManagementUserPage - Guide UTILISATEUR du Module Tasks Management
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const TasksManagementUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">📋 Guide Tasks Management</h1>
              <p className="text-teal-100 text-lg">Décomposez vos User Stories en tâches concrètes</p>
            </div>
            {onSwitchToDev && (
              <button
                onClick={onSwitchToDev}
                className="flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                <Code size={18} />
                Doc Technique
              </button>
            )}
          </div>
        </div>

        {/* À quoi ça sert ? */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-teal-100 rounded-full">
              <Users className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Tasks Management ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Tasks Management</strong> est votre <strong>outil de Sprint Planning</strong> : 
              il transforme vos User Stories en tâches techniques concrètes que votre équipe peut réaliser.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-gray-900 mb-2">Décomposition Sprint</h3>
                <p className="text-sm text-gray-600">
                  Transformez chaque User Story en tâches de 2-8h pour un suivi précis et réaliste
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold text-gray-900 mb-2">Assignation Claire</h3>
                <p className="text-sm text-gray-600">
                  Chaque tâche a un responsable unique avec estimation en heures
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Suivi Daily Scrum</h3>
                <p className="text-sm text-gray-600">
                  Mettez à jour quotidiennement et visualisez l'avancement sur le Task Board
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La différence clé : User Stories vs Tâches.</span> Les User Stories représentent 
                la valeur business (estimées en Story Points), tandis que les Tâches sont le travail technique pour les réaliser 
                (estimées en heures). Une story = plusieurs tâches !
              </p>
            </div>
          </div>
        </div>

        {/* Démarrage rapide */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <Rocket className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Démarrage rapide (5 min)</h2>
          </div>

          {/* Étape 1 */}
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre première tâche</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouvelle tâche"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• Sélectionnez la User Story à décomposer (obligatoire)</p>
                  <p className="text-sm text-gray-700">• Renseignez un numéro unique (ex: T-001, TASK-042)</p>
                  <p className="text-sm text-gray-700">• Choisissez le type : 💻 Dev, 🧪 Tests, 👀 Review, 🚀 Deploy, 📚 Doc ou 🔧 Autre</p>
                  <p className="text-sm text-gray-700">• Écrivez un titre clair et une description technique détaillée</p>
                  <p className="text-sm text-gray-700">• Assignez à un membre d'équipe et estimez en heures (0.5 à 8h idéalement)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Décomposer toutes les stories d'un sprint</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">⚠️ Alerte intelligente :</span> L'app détecte les stories dans un sprint mais sans tâches</p>
                  <p className="text-sm text-gray-700">• Consultez la liste des stories non décomposées affichée en orange</p>
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium">"Décomposer"</span> pour créer rapidement une tâche pré-remplie</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Objectif Sprint Planning :</span> Toutes les stories du sprint doivent avoir des tâches !</p>
                </div>
              </div>
            </div>
          </div>

          {/* Étape 3 */}
          <div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Suivre et mettre à jour les tâches</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Filtrez par produit, sprint, story, type ou membre d'équipe</p>
                  <p className="text-sm text-gray-700">• Cliquez sur "Voir" pour consulter tous les détails d'une tâche</p>
                  <p className="text-sm text-gray-700">• Cliquez sur "Modifier" pour changer le statut (À faire → En cours → Terminée)</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Daily Scrum :</span> Mettez à jour quotidiennement pour refléter l'avancement réel</p>
                  <p className="text-sm text-gray-700">• Utilisez le <span className="font-medium">Task Board</span> pour une vue Kanban visuelle</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cas d'usage concrets */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Cas d'usage : comment utiliser au quotidien ?</h2>
          </div>

          <div className="space-y-6">
            {/* Cas 1 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📋 Scénario 1 : "Je prépare mon Sprint Planning"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Décomposer toutes les User Stories du prochain sprint en tâches techniques.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Sélectionnez votre sprint dans le filtre "Sprint"</li>
                  <li>Regardez l'alerte orange : "X User Stories sans tâches techniques"</li>
                  <li>Pour chaque story listée, cliquez sur <span className="font-medium">"Décomposer"</span></li>
                  <li>Le formulaire s'ouvre avec la story déjà sélectionnée</li>
                  <li>Créez toutes les tâches nécessaires (développement, tests, review, déploiement...)</li>
                  <li>Visez 2-8h par tâche pour un suivi fin</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Bonne pratique :</span> Lors du Sprint Planning, impliquez toute l'équipe 
                    pour décomposer ensemble. Chacun estime les tâches sur lesquelles il va travailler !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🏃 Scénario 2 : "C'est le Daily Scrum, je mets à jour mes tâches"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Partager mon avancement avec l'équipe en mettant à jour mes tâches.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Filtrez par "Assigné à" → Sélectionnez votre nom</li>
                  <li>Pour les tâches commencées hier : cliquez "Modifier" → Statut "En cours"</li>
                  <li>Pour les tâches terminées : cliquez "Modifier" → Statut "Terminée"</li>
                  <li>Si une tâche est bloquée : utilisez les <span className="font-medium">Outcomes</span> (voir scénario 4)</li>
                  <li>Partagez oralement : "Hier j'ai fait X, aujourd'hui je fais Y, pas de blocage"</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Astuce :</span> Utilisez le <span className="font-medium">Task Board</span> 
                    pendant le Daily Scrum pour une visualisation Kanban en temps réel (colonnes : À faire | En cours | Terminée).
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 3 : "Je veux voir l'avancement d'une User Story"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Comprendre où en est une story spécifique en consultant ses tâches.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur "Filtres" pour déplier la section</li>
                  <li>Sélectionnez la User Story dans le filtre "User Story"</li>
                  <li>Vous voyez toutes les tâches liées à cette story</li>
                  <li>Observez les statuts : combien sont terminées ? En cours ? À faire ?</li>
                  <li>Consultez les détails de chaque tâche pour voir qui fait quoi</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📊 Indicateurs visuels :</span> Les cartes affichent des badges de statut 
                    (🔵 À faire, 🟢 En cours, ⚪ Terminée) pour un coup d'œil rapide.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🚧 Scénario 4 : "Une tâche est bloquée, que faire ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Documenter pourquoi une tâche ne peut pas avancer et alerter l'équipe.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur "Modifier" sur la tâche bloquée</li>
                  <li>En bas du formulaire, section <span className="font-medium">"Outcomes"</span></li>
                  <li>Sélectionnez le statut approprié :
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>🚫 <span className="font-medium">Bloquée</span> : dépendance externe non prête</li>
                      <li>⏸️ <span className="font-medium">En pause</span> : priorité changée temporairement</li>
                      <li>❌ <span className="font-medium">Annulée</span> : plus nécessaire</li>
                      <li>🔍 <span className="font-medium">À revoir</span> : approche technique à repenser</li>
                    </ul>
                  </li>
                  <li>Ajoutez une raison détaillée (obligatoire pour que l'équipe comprenne)</li>
                  <li>Optionnel : notes additionnelles avec contexte ou liens</li>
                  <li>Validez → L'outcome apparaît comme badge sur la carte</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💬 Approche bienveillante :</span> Les Outcomes ne sont pas des "échecs" ! 
                    C'est un outil pour documenter la réalité du sprint et prendre les bonnes décisions en toute transparence.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 5 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 5 : "Je veux voir la charge de travail de mon équipe"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Visualiser qui a combien de tâches et qui est disponible.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Filtrez par sprint actuel</li>
                  <li>Utilisez le filtre "Assigné à" pour voir tâche par tâche</li>
                  <li>Regardez les estimations en heures sur chaque carte</li>
                  <li>Additionnez mentalement pour chaque membre (ou exportez en CSV)</li>
                  <li>Si déséquilibré : réassignez des tâches en modifiant l'assignation</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Répartition équilibrée :</span> Visez une charge équilibrée en tenant compte 
                    de la capacité ajustée de chaque membre (voir module Contacts).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 types de tâches */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎨 Les 6 types de tâches expliqués</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">💻</div>
              <div>
                <p className="font-medium text-gray-900">Développement</p>
                <p className="text-sm text-gray-700">Implémentation de fonctionnalités, écriture de code, création d'APIs, développement front/back</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">🧪</div>
              <div>
                <p className="font-medium text-gray-900">Tests</p>
                <p className="text-sm text-gray-700">Tests unitaires, tests d'intégration, tests E2E, validation QA, correction de bugs</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">👀</div>
              <div>
                <p className="font-medium text-gray-900">Revue de code</p>
                <p className="text-sm text-gray-700">Code review, pair programming, revue d'architecture, audit de sécurité</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">🚀</div>
              <div>
                <p className="font-medium text-gray-900">Déploiement</p>
                <p className="text-sm text-gray-700">Mise en production, configuration CI/CD, gestion d'environnements, monitoring post-déploiement</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">📚</div>
              <div>
                <p className="font-medium text-gray-900">Documentation</p>
                <p className="text-sm text-gray-700">Rédaction README, documentation API, guides utilisateur, documentation technique</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">🔧</div>
              <div>
                <p className="font-medium text-gray-900">Autre</p>
                <p className="text-sm text-gray-700">Configuration, refactoring, optimisation performance, gestion dépendances, setup environnement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Les 5 Outcomes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Les 5 Outcomes (Résultats) expliqués</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">✅</div>
              <div>
                <p className="font-medium text-gray-900">Terminée (completed)</p>
                <p className="text-sm text-gray-700">La tâche a été complétée avec succès. Fonctionnalité implémentée, tests validés, code revu et approuvé.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">⏸️</div>
              <div>
                <p className="font-medium text-gray-900">En pause (paused)</p>
                <p className="text-sm text-gray-700">Mise en pause temporaire pour traiter d'autres priorités. En attente de validation, focus sur autre sprint.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">🚫</div>
              <div>
                <p className="font-medium text-gray-900">Bloquée (blocked)</p>
                <p className="text-sm text-gray-700">Bloquée par une dépendance externe ou interne. API indisponible, ressource manquante, problème technique bloquant.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">❌</div>
              <div>
                <p className="font-medium text-gray-900">Annulée (cancelled)</p>
                <p className="text-sm text-gray-700">Cette tâche n'est plus nécessaire. Changement de scope, fonctionnalité abandonnée, solution alternative trouvée.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
              <div className="text-2xl flex-shrink-0">🔍</div>
              <div>
                <p className="font-medium text-gray-900">À revoir (to_review)</p>
                <p className="text-sm text-gray-700">Nécessite une refonte ou nouvelle approche. Complexité sous-estimée, approche technique à revoir, scope trop large.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium">💡 Utilisation intelligente :</span> Les Outcomes créent un historique complet. 
              Lors de la Sprint Retrospective, consultez les tâches avec outcomes pour identifier les patterns récurrents 
              (blocages fréquents ? complexités sous-estimées ?) et améliorer continuellement votre processus.
            </p>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements des Tâches</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Toujours lier à une User Story</p>
                <p className="text-sm text-gray-700">Chaque tâche découle d'une User Story. Pas de tâche orpheline !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Viser 2-8h par tâche</p>
                <p className="text-sm text-gray-700">Trop petit = micro-management, trop gros = difficile à suivre. La bonne granularité = Daily Scrum efficace</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Titre clair + description détaillée</p>
                <p className="text-sm text-gray-700">Le titre résume, la description explique : fichiers à modifier, approche technique, dépendances</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Une tâche = un responsable unique</p>
                <p className="text-sm text-gray-700">Pas de dilution de responsabilité. Assignez clairement pour accountability</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Mettre à jour quotidiennement</p>
                <p className="text-sm text-gray-700">Daily Scrum = ritual de mise à jour. Statut reflète toujours la réalité actuelle</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Utiliser les Outcomes sans jugement</p>
                <p className="text-sm text-gray-700">Pas d'échec, que des apprentissages ! Documentez transparemment pour améliorer continuellement</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-cyan-100 rounded-full">
              <HelpCircle className="w-8 h-8 text-cyan-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Questions fréquentes (FAQ)</h2>
          </div>

          <div className="space-y-4">
            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Quelle différence entre User Story et Tâche ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">User Story :</span> Représente une fonctionnalité du point de vue utilisateur. 
                Estimée en Story Points (complexité relative). Valeur business.</p>
                <p className="mt-2"><span className="font-medium">Tâche :</span> Travail technique pour réaliser la story. 
                Estimée en heures (temps réel). Une story = plusieurs tâches (dev, tests, review, deploy...).</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Combien de tâches par User Story ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Ça dépend de la taille de la story ! Règle empirique :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Petite story (1-3 pts) :</span> 2-4 tâches</li>
                  <li><span className="font-medium">Story moyenne (5-8 pts) :</span> 5-8 tâches</li>
                  <li><span className="font-medium">Grande story (13+ pts) :</span> À découper d'abord en stories plus petites</li>
                </ul>
                <p className="mt-2">L'important : chaque tâche reste entre 2-8h pour un suivi fin.</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Quand utiliser les Outcomes ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Utilisez un Outcome quand une tâche ne peut PAS être terminée normalement :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>🚫 <span className="font-medium">Bloquée :</span> Dépendance externe pas prête → Escalader, créer ticket</li>
                  <li>⏸️ <span className="font-medium">En pause :</span> Priorité changée → Planifier reprise ultérieure</li>
                  <li>❌ <span className="font-medium">Annulée :</span> Plus nécessaire → Archiver et communiquer décision</li>
                  <li>🔍 <span className="font-medium">À revoir :</span> Approche technique fausse → Organiser session de refinement</li>
                </ul>
                <p className="mt-2">Toujours avec raison détaillée pour que l'équipe comprenne !</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment gérer les tâches non finies en fin de sprint ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">3 options selon la situation :</p>
                <ol className="mt-2 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">Presque finie (80%+) :</span> Outcome "completed" si fonctionnelle, 
                  ou rebasculer au sprint suivant</li>
                  <li><span className="font-medium">Bloquée :</span> Outcome "blocked" avec raison, à reprendre quand débloquée</li>
                  <li><span className="font-medium">Complexité sous-estimée :</span> Outcome "to_review", découper en sous-tâches 
                  pour le prochain sprint</li>
                </ol>
                <p className="mt-2">Lors de la Sprint Review, discutez en équipe de chaque tâche non terminée.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Puis-je modifier une tâche après le Sprint Planning ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Oui, absolument ! L'agilité = adaptation continue.</p>
                <p className="mt-2"><span className="font-medium">Ce que vous POUVEZ modifier :</span></p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Statut (todo → inProgress → done) : quotidiennement</li>
                  <li>Description : si vous découvrez de nouvelles contraintes</li>
                  <li>Estimation : si vous réalisez que c'est plus/moins long</li>
                  <li>Assignation : si besoin de répartir la charge</li>
                </ul>
                <p className="mt-2"><span className="font-medium">Ce que vous DEVRIEZ éviter :</span> Changer la nature fondamentale 
                de la tâche (= créez plutôt une nouvelle tâche).</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Comment utiliser le Task Board ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Le Task Board est la vue Kanban de vos tâches :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>3 colonnes : À faire | En cours | Terminée</li>
                  <li>Visualisation en temps réel de l'avancement du sprint</li>
                  <li>Idéal pour le Daily Scrum (tout le monde voit la même chose)</li>
                  <li>Glisser-déposer pour changer les statuts (à venir)</li>
                  <li>Filtres par membre d'équipe pour voir sa charge</li>
                </ul>
                <p className="mt-2">Accédez-y via le menu de gauche → "Task Board".</p>
              </div>
            </details>
          </div>
        </div>

        {/* Footer avec lien vers version technique */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-teal-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">🔧 Vous cherchez plus de détails techniques ?</h3>
              <p className="text-sm text-gray-700">
                Une <span className="font-medium">documentation technique complète</span> est disponible pour les développeurs 
                et pour comprendre en profondeur le fonctionnement du module (modèle de données, composants, intégrations...).
              </p>
            </div>
            {onSwitchToDev && (
              <button
                onClick={onSwitchToDev}
                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-md whitespace-nowrap ml-4"
              >
                <Code size={20} />
                Documentation Technique
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TasksManagementUserPage;
