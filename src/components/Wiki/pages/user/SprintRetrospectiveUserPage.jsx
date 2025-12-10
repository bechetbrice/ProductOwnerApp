import React from 'react';
import { ArrowLeft, Calendar, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * SprintRetrospectiveUserPage - Guide UTILISATEUR du Module Sprint Retrospectives
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const SprintRetrospectiveUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">🔄 Guide Sprint Retrospectives</h1>
              <p className="text-teal-100 text-lg">Améliorez continuellement vos pratiques d'équipe sprint après sprint</p>
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
              <Calendar className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Sprint Retrospectives ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Sprint Retrospectives</strong> documente vos <strong>cérémonies d'amélioration continue</strong> en fin de sprint. 
              C'est le moment où l'équipe se réunit pour analyser comment le sprint s'est passé et identifier des actions concrètes d'amélioration.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">👍</div>
                <h3 className="font-semibold text-gray-900 mb-2">Ce qui marche bien</h3>
                <p className="text-sm text-gray-600">
                  Identifiez et renforcez les bonnes pratiques avec un système de votes pour prioriser
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Points d'amélioration</h3>
                <p className="text-sm text-gray-600">
                  Capturez les obstacles et frictions rencontrés avec dot-voting pour prioriser collectivement
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Actions concrètes</h3>
                <p className="text-sm text-gray-600">
                  Définissez 3-5 actions réalistes avec priorité, catégorie et assignation claire
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : l'amélioration continue.</span> Chaque rétro doit produire des actions concrètes 
                que vous allez réellement mettre en place au prochain sprint. Pas de démagogie, de l'action !
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre première Rétrospective</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouvelle Rétrospective"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• Sélectionnez le sprint concerné (obligatoire)</p>
                  <p className="text-sm text-gray-700">• Définissez la date et heure de la rétro</p>
                  <p className="text-sm text-gray-700">• Choisissez le statut : ⏱️ Planifiée, ✅ Terminée ou ❌ Annulée</p>
                  <p className="text-sm text-gray-700">• Ajoutez les membres de l'équipe présents</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Animer la rétrospective</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">👍 Ce qui s'est bien passé :</span> Chacun propose des points positifs</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">💡 À améliorer :</span> Listez les obstacles et frictions rencontrés</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">🗳️ Dot-voting :</span> Chacun vote (+/-) pour prioriser collectivement</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">🎯 Actions :</span> Créez 3-5 actions concrètes basées sur les points prioritaires</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">🚀 Engagements :</span> Notez ce que l'équipe s'engage à faire au prochain sprint</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Suivre et retrouver vos rétros</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Changez le statut à "✅ Terminée" après la cérémonie</p>
                  <p className="text-sm text-gray-700">• Filtrez par <span className="font-medium">produit</span> pour voir les rétros d'un projet spécifique</p>
                  <p className="text-sm text-gray-700">• Filtrez par <span className="font-medium">sprint</span> pour retrouver une rétro précise</p>
                  <p className="text-sm text-gray-700">• Consultez l'historique pour voir l'évolution de vos pratiques d'équipe</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 1 : "Je prépare ma rétrospective de demain"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Créer la rétro et avoir tout prêt pour animer efficacement la cérémonie.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez une nouvelle rétro en sélectionnant votre sprint</li>
                  <li>Définissez date/heure et mettez le statut sur "⏱️ Planifiée"</li>
                  <li>Ajoutez la liste des membres de l'équipe qui seront présents</li>
                  <li>Optionnel : pré-remplissez quelques points positifs ou négatifs observés</li>
                  <li>Sauvegardez → Votre rétro est prête à être animée !</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Vous pouvez pré-créer la rétro et la compléter pendant la cérémonie 
                    en mode édition. Cela évite de perdre des idées et garde tout structuré.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🗳️ Scénario 2 : "J'anime une rétro avec dot-voting"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Utiliser le dot-voting pour prioriser collectivement les points à traiter.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Phase 1 : Collecte - Chaque participant propose des points positifs et négatifs</li>
                  <li>Ajoutez chaque idée dans "👍 Ce qui s'est bien passé" ou "💡 À améliorer"</li>
                  <li>Phase 2 : Dot-voting - Chaque participant a 3-5 votes à répartir</li>
                  <li>Utilisez les boutons +/- pour voter sur chaque item</li>
                  <li>Les items sont automatiquement triés par votes → Focus sur le top 3-5</li>
                  <li>Phase 3 : Actions - Créez des actions concrètes basées sur les items prioritaires</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Le dot-voting évite les discussions infinies. 
                    L'équipe vote, vous vous concentrez sur ce qui compte vraiment !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 3 : "Je définis les actions d'amélioration"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Transformer les insights de la rétro en actions concrètes et mesurables.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Pour chaque point prioritaire (top 3-5 des votes), créez une action</li>
                  <li>Rédigez une description claire et actionnable</li>
                  <li>Choisissez la priorité : 🔴 Critique / 🟠 Haute / 🟡 Moyenne / ⚪ Basse</li>
                  <li>Définissez la catégorie : 🔄 Processus / 🛠️ Outils / 💬 Communication / ⚙️ Technique / 🔧 Autre</li>
                  <li>Assignez à un membre de l'équipe présent</li>
                  <li>Fixez une échéance (idéalement dans le prochain sprint)</li>
                  <li>Limitez-vous à 3-5 actions → Mieux vaut terminer 3 actions que démarrer 10 !</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚠️ Important :</span> Chaque action doit avoir un responsable clair. 
                    "L'équipe" n'est pas un responsable - assignez à une personne précise !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 4 : "Je consulte les rétros passées"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Analyser l'évolution des pratiques d'équipe sur plusieurs sprints.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Utilisez le <span className="font-medium">filtre Produit</span> si vous gérez plusieurs produits</li>
                  <li>Regardez les dernières rétros : sont-elles sur les mêmes thèmes ?</li>
                  <li>Identifiez les points récurrents dans "À améliorer" → Problème systémique à traiter</li>
                  <li>Vérifiez que les actions définies ont été mises en œuvre</li>
                  <li>Consultez les engagements passés : ont-ils été tenus ?</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🔍 Analyse :</span> Si les mêmes problèmes reviennent sprint après sprint, 
                    c'est que vos actions ne sont pas assez fortes ou pas appliquées. Escaladez !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements de la Rétrospective efficace</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Environnement sûr et bienveillant</p>
                <p className="text-sm text-gray-700">Tout le monde doit se sentir libre de s'exprimer sans jugement. Focus sur les processus, pas les personnes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Prioriser avec le dot-voting</p>
                <p className="text-sm text-gray-700">Évitez les discussions infinies. Votez collectivement pour identifier les 3-5 points les plus importants.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">3-5 actions maximum</p>
                <p className="text-sm text-gray-700">Mieux vaut terminer 3 actions que démarrer 10 et n'en finir aucune. Soyez réaliste et actionnable.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Chaque action a un responsable et une échéance</p>
                <p className="text-sm text-gray-700">"L'équipe" n'est pas responsable. Assignez à une personne précise avec date limite claire.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Suivre les actions du sprint précédent</p>
                <p className="text-sm text-gray-700">Commencez chaque rétro en vérifiant si les actions précédentes ont été réalisées. Accountability !</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Documenter immédiatement</p>
                <p className="text-sm text-gray-700">Complétez la rétro pendant ou juste après la cérémonie. Plus vous attendez, plus vous perdez de détails.</p>
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
                ❓ Quelle est la différence entre Sprint Review et Rétrospective ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">Sprint Review (module séparé) :</span> Démo du produit aux stakeholders, 
                focus sur "QUOI" a été livré et collecte du feedback externe.</p>
                <p className="mt-2"><span className="font-medium">Rétrospective (ce module) :</span> Discussion interne de l'équipe, 
                focus sur "COMMENT" le sprint s'est passé et amélioration continue des pratiques.</p>
                <p className="mt-2">La review regarde le <strong>produit</strong>, la rétro regarde l'<strong>équipe et ses processus</strong>.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Comment fonctionne le dot-voting ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Le dot-voting est une technique de priorisation collective :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Chaque participant reçoit un nombre limité de votes (ex: 5 votes)</li>
                  <li>Il peut répartir ses votes librement sur les items proposés</li>
                  <li>Utilisez les boutons +/- pour voter sur chaque point</li>
                  <li>Les items sont automatiquement triés par nombre de votes</li>
                  <li>L'équipe se concentre ensuite sur le top 3-5</li>
                </ol>
                <p className="mt-2">✅ <span className="font-medium">Avantage :</span> Priorisation rapide et consensuelle sans débat infini.</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Pourquoi limiter à 3-5 actions d'amélioration ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Les études montrent que :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Les équipes qui définissent trop d'actions n'en terminent aucune</li>
                  <li>3-5 actions bien exécutées &gt; 10 actions non terminées</li>
                  <li>Un sprint dure 2-4 semaines, le temps disponible est limité</li>
                  <li>Mieux vaut traiter les vrais problèmes que disperser ses efforts</li>
                </ul>
                <p className="mt-3"><span className="font-medium">🎯 Règle d'or :</span> Si vous avez plus de 5 actions prioritaires, 
                c'est que vous n'avez pas assez priorisé. Utilisez le dot-voting !</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Qui doit participer à la rétrospective ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">La rétrospective est une cérémonie <span className="font-medium">100% interne à l'équipe</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>✅ Toute l'équipe de développement</li>
                  <li>✅ Le Product Owner</li>
                  <li>✅ Le Scrum Master / Coach Agile</li>
                  <li>❌ Pas de stakeholders externes</li>
                  <li>❌ Pas de managers (sauf s'ils font partie de l'équipe)</li>
                </ul>
                <p className="mt-2"><span className="font-medium">💡 Pourquoi ?</span> Pour créer un environnement sûr où chacun 
                peut s'exprimer librement sans crainte de jugement externe.</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime une Rétrospective ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">La suppression est <span className="font-medium">définitive et irréversible</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Tous les points positifs et négatifs documentés sont perdus</li>
                  <li>Tous les votes sont supprimés</li>
                  <li>Toutes les actions d'amélioration disparaissent</li>
                  <li>Les engagements pour le prochain sprint sont effacés</li>
                </ul>
                <p className="mt-3">⚠️ Une confirmation vous est demandée avant suppression. Réfléchissez bien !</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Que faire si les mêmes problèmes reviennent à chaque rétro ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Si les mêmes obstacles reviennent sprint après sprint :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Consultez l'historique des rétros passées</li>
                  <li>Identifiez les patterns récurrents</li>
                  <li>Vérifiez si les actions précédentes ont vraiment été appliquées</li>
                  <li>Si oui et que ça persiste → Le problème est systémique</li>
                  <li>Escaladez au management ou changez d'approche radicalement</li>
                </ol>
                <p className="mt-3"><span className="font-medium">🚨 Signal d'alarme :</span> Des rétros sans amélioration visible 
                = processus en échec. Agissez !</p>
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
                et pour comprendre en profondeur le fonctionnement du module (modèle de données, intégrations, composants...).
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

export default SprintRetrospectiveUserPage;
