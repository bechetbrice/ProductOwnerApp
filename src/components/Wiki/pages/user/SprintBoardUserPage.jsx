import React from 'react';
import { ArrowLeft, Trello, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * SprintBoardUserPage - Guide UTILISATEUR du Module Sprint Board
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const SprintBoardUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">🎯 Guide Sprint Board</h1>
              <p className="text-teal-100 text-lg">Suivez visuellement l'avancement quotidien de votre sprint</p>
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
              <Trello className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le Sprint Board ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le <strong>Sprint Board</strong> est votre <strong>tableau Kanban quotidien</strong> pour suivre visuellement 
              l'avancement des user stories pendant le sprint actif. C'est l'outil central du Daily Scrum (synchro quotidienne de 15 minutes).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🔋</div>
                <h3 className="font-semibold text-gray-900 mb-2">À faire</h3>
                <p className="text-sm text-gray-600">
                  Stories planifiées pour ce sprint qui n'ont pas encore démarré. Prêtes à être prises par l'équipe.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold text-gray-900 mb-2">En cours</h3>
                <p className="text-sm text-gray-600">
                  Stories actuellement en développement. L'équipe y travaille activement aujourd'hui.
                </p>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Outcome</h3>
                <p className="text-sm text-gray-600">
                  Stories finalisées avec un résultat : terminée, en pause, bloquée, annulée ou à revoir.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : le drag & drop.</span> Glissez-déposez les cartes entre les colonnes 
                pour mettre à jour l'état en temps réel. Utilisé quotidiennement lors du Daily Scrum pour synchroniser l'équipe.
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
            <h2 className="text-2xl font-bold text-gray-900">Démarrage rapide (3 min)</h2>
          </div>

          {/* Étape 1 */}
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sélectionner votre sprint</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Le Sprint Board affiche par défaut le <span className="font-medium text-teal-600">sprint actif</span> 🟢</p>
                  <p className="text-sm text-gray-700">• Pour voir un autre sprint : cliquez sur "Filtres" puis sélectionnez le sprint souhaité</p>
                  <p className="text-sm text-gray-700">• Les sprints sont triés par date (plus récent en premier)</p>
                  <p className="text-sm text-gray-700">• Le code produit [XXX] est affiché pour chaque sprint</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Faire avancer une story</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">Cliquez et maintenez</span> sur une carte de story</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Glissez-la</span> vers la colonne cible (À faire → En cours → Outcome)</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Relâchez</span> : la story change automatiquement de statut</p>
                  <p className="text-sm text-gray-700">• Si vous déposez dans "Outcome", un modal s'ouvre pour définir le résultat final</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Définir un outcome</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">Glissez une story</span> dans la colonne "🎯 Outcome"</p>
                  <p className="text-sm text-gray-700">• Choisissez le résultat : ✅ Terminée, ⏸️ En pause, 🚫 Bloquée, ❌ Annulée, 🔍 À revoir</p>
                  <p className="text-sm text-gray-700">• Ajoutez une raison et une note explicative (recommandé)</p>
                  <p className="text-sm text-gray-700">• La date est automatiquement enregistrée</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 1 : "Daily Scrum de 15 minutes"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Synchroniser l'équipe chaque matin sur l'avancement et les blocages.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez le Sprint Board avant la réunion (9h précises !)</li>
                  <li>Chaque membre répond tour à tour : <span className="font-medium">"Hier / Aujourd'hui / Blocages"</span></li>
                  <li>En temps réel, glissez les stories dans la bonne colonne pendant que chacun parle</li>
                  <li>Si une story est bloquée : glissez-la dans "Outcome" → sélectionnez "🚫 Bloquée" → notez le blocage</li>
                  <li>Vérifiez que la colonne "En cours" n'est pas surchargée (WIP limit)</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⏱️ Time-boxed :</span> Le Daily Scrum doit durer exactement 15 minutes. 
                    Si des discussions détaillées sont nécessaires, planifiez-les après avec les personnes concernées uniquement.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔥 Scénario 2 : "Une story est bloquée depuis 2 jours"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Identifier et lever rapidement le blocage pour débloquer l'équipe.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Repérez visuellement les stories qui restent dans "En cours" trop longtemps</li>
                  <li>Pendant le Daily, demandez : "Qu'est-ce qui bloque cette story ?"</li>
                  <li>Glissez la story dans "Outcome" → choisissez "🚫 Bloquée"</li>
                  <li>Dans la note, documentez : <span className="font-medium">QUI doit faire QUOI pour débloquer</span></li>
                  <li>Le Product Owner doit intervenir immédiatement pour lever le blocage (après le Daily)</li>
                  <li>Une fois débloquée : replacez la story dans "À faire" en la déplaçant hors de "Outcome"</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🚨 Règle d'or :</span> Aucune story ne doit rester bloquée plus de 24h. 
                    C'est le rôle du Product Owner de casser les blocages rapidement !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 3 : "Vérifier la progression du sprint"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Savoir si le sprint est sur les rails pour atteindre l'objectif à temps.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Regardez l'<span className="font-medium">encadré bleu en haut</span> : progression % + barre verte</li>
                  <li>Vérifiez les story points : X/Y pts terminés</li>
                  <li>Comparez les stories : X/Y stories terminées</li>
                  <li>Si moins de 50% de progression à mi-parcours du sprint → alerte 🔴</li>
                  <li>Priorisez les stories restantes : glissez les must-have en haut de "À faire"</li>
                  <li>Envisagez de retirer certaines stories could/should du sprint si nécessaire</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📈 Vélocité réaliste :</span> Si vous terminez systématiquement 60% du sprint, 
                    ajustez votre estimation pour les prochains sprints. Mieux vaut sous-promettre et sur-livrer !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 4 : "Filtrer par produit dans un sprint multi-produits"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Voir uniquement les stories d'un produit spécifique dans un sprint qui en contient plusieurs.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>En haut de la page, utilisez le <span className="font-medium">sélecteur de produit</span></li>
                  <li>Choisissez le produit qui vous intéresse</li>
                  <li>Le board se filtre automatiquement : seules les stories de ce produit sont visibles</li>
                  <li>Les compteurs de stories et points s'ajustent automatiquement</li>
                  <li>Bouton "Réinitialiser les filtres" pour revenir à la vue complète</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> En Daily Scrum, si vous gérez plusieurs produits, 
                    faites un tour de table par produit en filtrant pour garder le focus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 7 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 7 commandements du Sprint Board</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Mettre à jour en temps réel pendant le Daily</p>
                <p className="text-sm text-gray-700">Le board doit refléter la réalité actuelle. Glissez les cartes pendant que chacun parle pour synchroniser l'équipe.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Limiter le WIP (Work In Progress)</p>
                <p className="text-sm text-gray-700">Pas plus de 2-3 stories "En cours" par membre d'équipe. Mieux vaut finir que multiplier les chantiers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Documenter tous les outcomes</p>
                <p className="text-sm text-gray-700">Toujours ajouter une raison et une note quand vous définissez un outcome (surtout pour Bloquée/Annulée/À revoir)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Casser les blocages immédiatement</p>
                <p className="text-sm text-gray-700">Une story bloquée doit être débloquée en moins de 24h. C'est la priorité #1 du Product Owner.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Utiliser le système Pull, pas Push</p>
                <p className="text-sm text-gray-700">L'équipe "tire" une nouvelle story de "À faire" uniquement quand la précédente est terminée. Ne pas pousser des tâches.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Célébrer les victories</p>
                <p className="text-sm text-gray-700">Quand une story passe en "Terminée", prenez 10 secondes pour reconnaître le travail accompli. Cela booste la motivation !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">7</div>
              <div>
                <p className="font-medium text-gray-900">Ne jamais déplacer une story à la place de l'équipe</p>
                <p className="text-sm text-gray-700">Le Product Owner facilite, mais c'est l'équipe qui met à jour ses propres stories pendant le Daily. Respectez l'auto-organisation.</p>
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
                ❓ Quelle est la différence entre "En cours" et "Outcome" ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">En cours :</span> L'équipe travaille activement sur cette story AUJOURD'HUI. 
                Elle n'est pas encore finie.</p>
                <p className="mt-2"><span className="font-medium">Outcome :</span> La story a atteint un état final : soit elle est terminée (✅), 
                soit elle est en pause/bloquée/annulée/à revoir. Un résultat clair est défini.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Que faire si je déplace une story dans "Outcome" par erreur ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Pas de panique ! Vous pouvez annuler en glissant la story hors de la colonne "Outcome" 
                vers "À faire" ou "En cours".</p>
                <p className="mt-2">Quand vous déplacez une story hors de "Outcome", tous les champs d'outcome 
                (résultat, raison, note, date) sont automatiquement effacés. La story redevient "normale".</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Quels sont les 5 types d'outcomes possibles ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Voici les 5 outcomes disponibles :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>✅ <span className="font-medium">Terminée</span> : Story livrée avec succès (done)</li>
                  <li>⏸️ <span className="font-medium">En pause</span> : Mise de côté temporairement (reprise plus tard)</li>
                  <li>🚫 <span className="font-medium">Bloquée</span> : Impossible de continuer (dépendance externe, blocage technique)</li>
                  <li>❌ <span className="font-medium">Annulée</span> : Story abandonnée (changement de priorité, plus nécessaire)</li>
                  <li>🔍 <span className="font-medium">À revoir</span> : Nécessite correction, validation ou redéfinition</li>
                </ul>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment utiliser efficacement le Sprint Board pendant le Daily Scrum ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <div className="bg-cyan-100 border border-cyan-200 rounded p-3 mt-3 mb-4">
                  <p className="text-xs font-medium text-cyan-900 mb-1">🎯 WORKFLOW DAILY SCRUM :</p>
                  <ol className="text-xs space-y-1 ml-4 list-decimal">
                    <li>Ouvrez le Sprint Board avant la réunion (projeté sur écran partagé)</li>
                    <li>Chaque membre prend la parole à tour de rôle</li>
                    <li>Pendant qu'il parle, glissez ses stories dans la bonne colonne en temps réel</li>
                    <li>Si blocage → glissez immédiatement dans "Outcome" → "Bloquée"</li>
                    <li>Vérifiez le WIP : pas trop de stories "En cours"</li>
                    <li>Fin du Daily : tout le monde a une vision claire et actualisée</li>
                  </ol>
                </div>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que signifie "WIP Limit" et pourquoi c'est important ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3"><span className="font-medium">WIP = Work In Progress</span> (travail en cours)</p>
                <p className="mt-2">Le WIP Limit est le <span className="font-medium">nombre maximum de stories simultanément "En cours"</span>. 
                Règle recommandée : <span className="font-medium">2-3 stories max par membre d'équipe</span>.</p>
                <p className="mt-2"><span className="font-medium">Pourquoi ?</span></p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Évite la fragmentation de l'attention</li>
                  <li>Réduit le temps de cycle (finir plus vite)</li>
                  <li>Identifie rapidement les blocages</li>
                  <li>Augmente la qualité (focus sur moins de choses)</li>
                </ul>
                <p className="mt-3 font-medium">Si la colonne "En cours" déborde → c'est un signal d'alerte 🚨</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Comment voir les détails d'une story depuis le Sprint Board ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Sur chaque carte de story, vous voyez un <span className="font-medium">bouton violet avec une icône œil 👁️</span>.</p>
                <p className="mt-2">Cliquez dessus pour ouvrir le modal de détail complet de la story : description, critères d'acceptation, 
                besoins liés, stakeholders, historique, etc.</p>
                <p className="mt-2">Vous pouvez aussi modifier la story directement depuis ce modal si nécessaire.</p>
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
                et pour comprendre en profondeur le fonctionnement du module (architecture, drag & drop, gestion d'état...).
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

export default SprintBoardUserPage;
