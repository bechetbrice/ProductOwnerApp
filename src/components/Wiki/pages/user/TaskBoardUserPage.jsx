import React from 'react';
import { ArrowLeft, CheckSquare, Rocket, Zap, HelpCircle, Code, Target } from 'lucide-react';

/**
 * TaskBoardUserPage - Guide UTILISATEUR du Module Task Board
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const TaskBoardUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">📋 Guide Task Board</h1>
              <p className="text-teal-100 text-lg">Suivez l'avancement de vos tâches quotidiennes</p>
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
              <CheckSquare className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le Task Board ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le <strong>Task Board</strong> est votre <strong>tableau Kanban quotidien</strong> pour suivre 
              l'avancement des tâches techniques de votre sprint actif. C'est l'outil parfait pour les rituels 
              Daily Scrum et pour visualiser en un coup d'œil qui fait quoi.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-gray-900 mb-2">À faire</h3>
                <p className="text-sm text-gray-600">
                  Toutes les tâches planifiées qui attendent d'être prises en charge par l'équipe
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold text-gray-900 mb-2">En cours</h3>
                <p className="text-sm text-gray-600">
                  Les tâches actuellement en développement par vos développeurs
                </p>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Outcome</h3>
                <p className="text-sm text-gray-600">
                  Tâches terminées ou avec un état final (en pause, bloquée, annulée...)
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La magie du drag & drop :</span> Déplacez les cartes entre les colonnes 
                d'un simple glisser-déposer pour mettre à jour leur statut instantanément !
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visualiser votre sprint actif</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Le Task Board affiche automatiquement les tâches du <span className="font-medium">sprint actif</span></p>
                  <p className="text-sm text-gray-700">• Les 3 colonnes représentent les 3 états d'avancement : À faire, En cours, Outcome</p>
                  <p className="text-sm text-gray-700">• Chaque carte affiche : titre, développeur assigné, temps estimé et produit associé</p>
                  <p className="text-sm text-gray-700">• Le compteur en haut de chaque colonne indique le nombre de tâches</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Déplacer une tâche (drag & drop)</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur une carte et maintenez le bouton de la souris enfoncé</p>
                  <p className="text-sm text-gray-700">• Glissez la carte vers la colonne souhaitée (À faire → En cours → Outcome)</p>
                  <p className="text-sm text-gray-700">• Relâchez : le statut de la tâche est mis à jour automatiquement !</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Spécial Outcome :</span> En déposant dans cette colonne, une fenêtre s'ouvre pour documenter l'état final</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Filtrer pour mieux organiser</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Utilisez le <span className="font-medium">sélecteur de produit</span> en haut pour isoler un produit</p>
                  <p className="text-sm text-gray-700">• Cliquez sur "Filtres" pour accéder aux filtres avancés (Sprint, Story, Développeur, Type)</p>
                  <p className="text-sm text-gray-700">• Filtrez par <span className="font-medium">développeur</span> pour le Daily Scrum individuel</p>
                  <p className="text-sm text-gray-700">• Bouton <span className="font-medium">"Réinitialiser"</span> pour effacer tous les filtres d'un coup</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🌅 Scénario 1 : "Daily Scrum - Préparer la réunion du matin"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Avoir une vue claire de l'avancement pour animer efficacement le Daily Scrum.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez le Task Board au début de la réunion</li>
                  <li>Regardez la colonne "En cours" : combien de tâches ? Qui travaille sur quoi ?</li>
                  <li>Vérifiez la colonne "À faire" : reste-t-il beaucoup de tâches à prendre ?</li>
                  <li>Consultez la colonne "Outcome" : y a-t-il des bloqueurs ou des tâches annulées ?</li>
                  <li>Utilisez le filtre <span className="font-medium">"Développeur"</span> pour passer la parole à chaque membre</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce Daily :</span> Filtrez par développeur pour voir uniquement ses tâches 
                    pendant qu'il parle. Changez de filtre pour passer au suivant !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🚀 Scénario 2 : "Une tâche passe en développement"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Un développeur prend une nouvelle tâche. Vous devez mettre à jour son statut.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Trouvez la carte dans la colonne "📋 À faire"</li>
                  <li>Cliquez dessus et maintenez le bouton enfoncé</li>
                  <li>Glissez la carte vers la colonne "🔄 En cours"</li>
                  <li>Relâchez : le statut passe automatiquement à "inProgress" !</li>
                  <li>Le développeur peut maintenant voir sa tâche dans "En cours"</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Super rapide :</span> Plus besoin d'ouvrir un formulaire ! Le drag & drop 
                    met à jour le statut en temps réel.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">⛔ Scénario 3 : "Une tâche est bloquée"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Documenter qu'une tâche est bloquée et ne peut pas avancer.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Glissez la carte bloquée vers la colonne "🎯 Outcome"</li>
                  <li>Une fenêtre s'ouvre automatiquement : <span className="font-medium">"Définir l'outcome"</span></li>
                  <li>Sélectionnez "🔴 Bloquée" dans la liste des outcomes</li>
                  <li>Choisissez une raison : "Dépendance externe", "Bug bloquant", "Attente validation"...</li>
                  <li>Ajoutez une note pour expliquer le bloqueur (ex: "En attente API tierce")</li>
                  <li>Validez : la tâche apparaît dans Outcome avec un badge rouge 🔴</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📊 Suivi des bloqueurs :</span> La colonne Outcome devient votre journal des 
                    problèmes. Parfait pour la rétro de fin de sprint !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">✅ Scénario 4 : "Une tâche est terminée"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Marquer une tâche comme terminée et validée.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Glissez la carte depuis "En cours" vers "🎯 Outcome"</li>
                  <li>Dans la fenêtre, sélectionnez "✅ Terminée"</li>
                  <li>Choisissez la raison : "Tests validés", "Code review OK", "Déployé en prod"...</li>
                  <li>Ajoutez une note si besoin (ex: "Déployé en recette le 10/12")</li>
                  <li>Validez : la tâche a maintenant un badge vert ✅</li>
                </ol>

                <div className="bg-white border border-emerald-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 5 outcomes disponibles :</span> Terminée ✅, En pause ⏸️, Bloquée 🔴, 
                    Annulée ❌, À revoir 🔄
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 5 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 5 : "Je gère plusieurs produits"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Voir uniquement les tâches d'un produit spécifique pendant le Daily.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>En haut de la page, utilisez le <span className="font-medium">sélecteur de produit</span></li>
                  <li>Choisissez le produit concerné (ex: "MonApp Mobile")</li>
                  <li>Le board se filtre instantanément : seules les tâches de ce produit apparaissent</li>
                  <li>Les 3 colonnes affichent maintenant uniquement ce produit</li>
                  <li>Pour revenir à la vue complète, sélectionnez "Tous les produits"</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Organisation multi-produits :</span> Le filtre produit est persistant. 
                    Changez-le selon le contexte de la réunion !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du Task Board</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Un seul sprint actif à la fois</p>
                <p className="text-sm text-gray-700">Le Task Board affiche UNIQUEMENT le sprint actif. Activez le bon sprint dans Sprints Management avant de lancer votre Daily.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Limiter le "En cours"</p>
                <p className="text-sm text-gray-700">Évitez d'avoir trop de tâches en cours simultanément. Règle d'or : nombre de tâches ≤ nombre de développeurs actifs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Documenter les outcomes</p>
                <p className="text-sm text-gray-700">Glissez TOUJOURS une tâche dans Outcome plutôt que de la laisser traîner. Documentez pourquoi elle n'est pas "done".</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Utiliser les filtres au Daily</p>
                <p className="text-sm text-gray-700">Filtrez par développeur pour donner la parole à chacun. Changez de filtre entre chaque personne pour garder le focus.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Cliquer pour plus de détails</p>
                <p className="text-sm text-gray-700">L'icône 👁️ sur chaque carte ouvre les détails complets (description, notes, historique). Utilisez "Modifier" pour éditer la tâche.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Nettoyer régulièrement</p>
                <p className="text-sm text-gray-700">À la fin du sprint, assurez-vous que toutes les tâches sont dans Outcome avec le bon statut final. Prépare la rétro !</p>
              </div>
            </div>
          </div>
        </div>

        {/* Les 5 Outcomes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Comprendre les 5 Outcomes</h2>
          
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">✅</span>
                <h3 className="font-bold text-gray-900">Terminée (Completed)</h3>
              </div>
              <p className="text-sm text-gray-700 ml-11">
                La tâche est 100% finie : développée, testée, validée et intégrée. 
                C'est le happy path ! Utilisez les raisons pour préciser : "Tests OK", "Déployé prod", "Code review validée"...
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⏸️</span>
                <h3 className="font-bold text-gray-900">En pause (Paused)</h3>
              </div>
              <p className="text-sm text-gray-700 ml-11">
                La tâche est mise en pause temporairement. Raisons fréquentes : "Priorité changée", "Attente ressources", 
                "Besoin clarification PO". Elle reviendra dans un prochain sprint.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔴</span>
                <h3 className="font-bold text-gray-900">Bloquée (Blocked)</h3>
              </div>
              <p className="text-sm text-gray-700 ml-11">
                Un bloqueur empêche la tâche d'avancer. Raisons : "Dépendance externe", "Bug bloquant", "API indisponible", 
                "Attente validation". CRITICAL : Documentez bien le bloqueur pour le débloquer rapidement !
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">❌</span>
                <h3 className="font-bold text-gray-900">Annulée (Cancelled)</h3>
              </div>
              <p className="text-sm text-gray-700 ml-11">
                La tâche ne sera jamais faite. Raisons : "Fonctionnalité abandonnée", "Doublon détecté", "Plus pertinent", 
                "Décision métier". Gardez la trace pour comprendre pourquoi lors de la rétro.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔄</span>
                <h3 className="font-bold text-gray-900">À revoir (To Review)</h3>
              </div>
              <p className="text-sm text-gray-700 ml-11">
                La tâche nécessite une revue ou une discussion. Raisons : "Approche à valider", "Besoin avis archi", 
                "Point avec le PO". C'est un signal pour organiser une discussion.
              </p>
            </div>
          </div>

          <div className="mt-4 bg-teal-50 border border-teal-200 rounded-lg p-4">
            <p className="text-sm text-gray-900">
              <span className="font-medium">💡 Conseil rétro :</span> Lors de la rétrospective, filtrez par outcome pour analyser : 
              Combien de bloquées ? Pourquoi ces annulations ? Qu'a-t-on appris ?
            </p>
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
                ❓ Pourquoi je ne vois aucune tâche ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Plusieurs raisons possibles :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Pas de sprint actif :</span> Allez dans Sprints Management et activez un sprint</li>
                  <li><span className="font-medium">Pas de tâches dans le sprint :</span> Créez des tâches dans Tasks Management et liez-les au sprint</li>
                  <li><span className="font-medium">Filtres trop restrictifs :</span> Cliquez sur "Réinitialiser" pour effacer les filtres</li>
                </ul>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Quelle est la différence avec le Sprint Board ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">2 boards différents pour 2 usages :</p>
                <p className="mt-2"><span className="font-medium">Sprint Board :</span> Affiche les <strong>User Stories</strong> du sprint. 
                Vue macro pour suivre les fonctionnalités business.</p>
                <p className="mt-2"><span className="font-medium">Task Board :</span> Affiche les <strong>tâches techniques</strong> du sprint. 
                Vue micro pour le suivi quotidien des développeurs.</p>
                <p className="mt-2 text-xs text-teal-900 bg-teal-100 rounded p-2">
                  💡 En pratique : Sprint Board pour Sprint Planning/Review, Task Board pour Daily Scrum.
                </p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Puis-je revenir en arrière sur un outcome ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Oui, totalement ! Le drag & drop fonctionne dans les 2 sens :</p>
                <ol className="mt-2 space-y-1 ml-6 list-decimal">
                  <li>Glissez une carte depuis "Outcome" vers "À faire" ou "En cours"</li>
                  <li>L'outcome est automatiquement retiré</li>
                  <li>La tâche revient dans le flux normal de travail</li>
                </ol>
                <p className="mt-2 text-xs text-cyan-900 bg-cyan-100 rounded p-2">
                  💡 Cas typique : Une tâche bloquée est débloquée → glissez-la vers "À faire" pour la reprendre.
                </p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment modifier une tâche depuis le Task Board ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">2 façons de modifier :</p>
                <ol className="mt-2 space-y-2 ml-6 list-decimal">
                  <li>
                    <span className="font-medium">Changement de statut :</span> Glissez-déposez la carte entre colonnes
                  </li>
                  <li>
                    <span className="font-medium">Modification complète :</span>
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      <li>Cliquez sur l'icône 👁️ pour ouvrir les détails</li>
                      <li>Cliquez sur "Modifier" en bas de la fenêtre</li>
                      <li>Vous êtes redirigé vers Tasks Management avec la tâche pré-chargée</li>
                      <li>Modifiez ce que vous voulez (titre, description, temps, assigné...)</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </details>

            <details className="bg-emerald-50 border border-emerald-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-emerald-100 transition-colors">
                ❓ Les filtres sont-ils sauvegardés ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-emerald-100">
                <p className="mt-3">Les filtres sont <span className="font-medium">persistants pendant la session</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Si vous changez de module puis revenez au Task Board, les filtres restent actifs</li>
                  <li>Si vous rechargez la page, les filtres sont réinitialisés</li>
                  <li>Le filtre Produit reste actif tant que vous ne le changez pas</li>
                </ul>
                <p className="mt-2 text-xs text-emerald-900 bg-emerald-100 rounded p-2">
                  💡 Pensez à cliquer sur "Réinitialiser" si vous ne voyez pas toutes vos tâches !
                </p>
              </div>
            </details>

            <details className="bg-orange-50 border border-orange-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-orange-100 transition-colors">
                ❓ Puis-je utiliser le Task Board sur mobile ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-orange-100">
                <p className="mt-3">Le Task Board est responsive mais <span className="font-medium">optimisé pour desktop</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Sur tablette : Les 3 colonnes s'empilent verticalement, reste utilisable</li>
                  <li>Sur smartphone : Le drag & drop est plus difficile sur petit écran</li>
                  <li>Recommandation : Utilisez un ordinateur ou une tablette pour les Daily Scrum</li>
                </ul>
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
                et pour comprendre en profondeur le fonctionnement du module (architecture, intégrations, composants...).
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

export default TaskBoardUserPage;
