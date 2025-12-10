import React from 'react';
import { ArrowLeft, Calendar, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * SprintReviewsUserPage - Guide UTILISATEUR du Module Sprint Reviews
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const SprintReviewsUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">📅 Guide Sprint Reviews</h1>
              <p className="text-teal-100 text-lg">Documentez vos démonstrations et capturez le feedback stakeholder</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Sprint Reviews ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Sprint Reviews</strong> documente vos <strong>cérémonies de démonstration</strong> en fin de sprint. 
              C'est le moment clé où vous présentez les fonctionnalités terminées aux stakeholders et recueillez leur feedback.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Démonstration</h3>
                <p className="text-sm text-gray-600">
                  Présentez les stories terminées, notez les réactions et documentez ce qui a été montré
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-gray-900 mb-2">Feedback Stakeholders</h3>
                <p className="text-sm text-gray-600">
                  Capturez chaque retour avec sa priorité et catégorie pour créer de nouvelles stories
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-gray-900 mb-2">Ajustement Backlog</h3>
                <p className="text-sm text-gray-600">
                  Documentez les décisions et les prochaines actions sur le Product Backlog
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : la documentation immédiate.</span> Notez tout pendant ou juste après la review 
                pour capturer les insights à chaud et maintenir l'alignement avec les stakeholders.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre première Sprint Review</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouvelle Review"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• Sélectionnez le sprint concerné (obligatoire)</p>
                  <p className="text-sm text-gray-700">• Définissez la date et heure de la review</p>
                  <p className="text-sm text-gray-700">• Choisissez le statut : ⏱️ Planifiée, ✅ Terminée ou ❌ Annulée</p>
                  <p className="text-sm text-gray-700">• Ajoutez les stakeholders présents pour faciliter le feedback</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Documenter pendant la review</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cochez les <span className="font-medium">stories démontrées</span> (seules les stories "terminées" du sprint sont affichées)</p>
                  <p className="text-sm text-gray-700">• Notez les <span className="font-medium">réactions et questions</span> dans les notes de démonstration</p>
                  <p className="text-sm text-gray-700">• Capturez chaque <span className="font-medium">feedback stakeholder</span> avec priorité et catégorie</p>
                  <p className="text-sm text-gray-700">• Documentez les <span className="font-medium">décisions importantes</span> prises pendant la review</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Exploiter le feedback</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Notez les <span className="font-medium">prochaines étapes</span> pour le Product Backlog</p>
                  <p className="text-sm text-gray-700">• Filtrez par <span className="font-medium">produit</span> pour voir les reviews d'un projet spécifique</p>
                  <p className="text-sm text-gray-700">• Filtrez par <span className="font-medium">sprint</span> pour retrouver une review précise</p>
                  <p className="text-sm text-gray-700">• Cliquez sur une review pour voir tous les détails documentés</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 1 : "Je prépare ma Sprint Review de demain"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Créer la review et avoir une vue claire de ce qui sera démontré.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez une nouvelle review en sélectionnant votre sprint</li>
                  <li>Définissez date/heure et mettez le statut sur "⏱️ Planifiée"</li>
                  <li>Ajoutez la liste des stakeholders qui seront présents</li>
                  <li>Cochez les stories terminées que vous allez démontrer</li>
                  <li>Préparez vos notes de démonstration (points clés à présenter)</li>
                  <li>Sauvegardez → Votre review est prête !</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Seules les stories avec le statut "Done" du sprint sélectionné 
                    sont affichées. Assurez-vous d'avoir mis à jour vos stories avant !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">💬 Scénario 2 : "Je capture le feedback pendant la review"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Capturer tous les retours stakeholders en temps réel pour ne rien perdre.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez votre review en mode édition</li>
                  <li>Pour chaque feedback reçu, cliquez sur "Ajouter un feedback"</li>
                  <li>Sélectionnez le stakeholder qui donne le retour</li>
                  <li>Choisissez la priorité : 🔴 Critique / 🟠 Haute / 🟡 Moyenne / ⚪ Basse</li>
                  <li>Définissez la catégorie : ✨ Fonctionnalité / 🐛 Bug / 🎨 Ergonomie / ⚡ Performance / 🔧 Autre</li>
                  <li>Notez le commentaire détaillé du stakeholder</li>
                  <li>Répétez pour chaque retour → Tous les feedbacks sont organisés et priorisés !</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Un feedback capturé = une story potentielle ! 
                    Utilisez priorité et catégorie pour organiser votre prochain sprint planning.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📋 Scénario 3 : "Je finalise ma review après la démo"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Compléter la documentation juste après la review pour garder une trace complète.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ajoutez les notes de démonstration (ce qui a bien fonctionné, les questions posées)</li>
                  <li>Documentez les <span className="font-medium">décisions prises</span> pendant la review</li>
                  <li>Notez les <span className="font-medium">prochaines étapes</span> pour le Product Backlog</li>
                  <li>Changez le statut à "✅ Terminée"</li>
                  <li>Sauvegardez → La review est documentée et archivée !</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⏰ Timing idéal :</span> Complétez la review dans l'heure qui suit la démo 
                    pendant que tout est encore frais dans votre mémoire !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 4 : "Je veux retrouver une review passée"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Consulter les feedbacks et décisions d'une review précédente.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Utilisez le <span className="font-medium">filtre Produit</span> en haut si vous gérez plusieurs produits</li>
                  <li>Cliquez sur "Filtres" puis sélectionnez le <span className="font-medium">sprint</span> concerné</li>
                  <li>Filtrez par <span className="font-medium">statut</span> si besoin (Planifiées, Terminées, Annulées)</li>
                  <li>Cliquez sur la review pour voir tous les détails documentés</li>
                  <li>Consultez les feedbacks, décisions et prochaines étapes</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📊 Historique complet :</span> Les reviews sont triées par date décroissante. 
                    Vous voyez toujours les plus récentes en premier !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du module Sprint Reviews</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Documenter pendant ou immédiatement après</p>
                <p className="text-sm text-gray-700">Plus vous attendez, plus vous perdez des détails. Capturez à chaud !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Prioriser et catégoriser chaque feedback</p>
                <p className="text-sm text-gray-700">Utilisez les priorités et catégories pour transformer les feedbacks en stories organisées</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Cocher uniquement ce qui a été démontré</p>
                <p className="text-sm text-gray-700">Ne cochez que les stories réellement présentées, pas toutes celles terminées</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Documenter les décisions stratégiques</p>
                <p className="text-sm text-gray-700">Les décisions prises en review sont cruciales - notez-les systématiquement</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Lister les prochaines actions backlog</p>
                <p className="text-sm text-gray-700">Définissez clairement ce qui doit être ajusté dans le Product Backlog suite à la review</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Inviter tous les stakeholders clés</p>
                <p className="text-sm text-gray-700">Plus vous avez de perspectives différentes, plus le feedback est riche et actionnable</p>
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
                <p className="mt-3"><span className="font-medium">Sprint Review :</span> Démo du produit aux stakeholders, 
                focus sur "QUOI" a été livré et collecte du feedback externe.</p>
                <p className="mt-2"><span className="font-medium">Rétrospective :</span> Discussion interne de l'équipe, 
                focus sur "COMMENT" le sprint s'est passé et amélioration continue.</p>
                <p className="mt-2">Ce module documente les <strong>Sprint Reviews</strong>. Les rétrospectives sont dans un module séparé.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Pourquoi catégoriser et prioriser les feedbacks ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Chaque feedback devient potentiellement une nouvelle story. En ajoutant priorité et catégorie dès la review, vous :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Facilitez le tri et la priorisation pour le prochain sprint planning</li>
                  <li>Identifiez rapidement les bugs critiques vs les améliorations futures</li>
                  <li>Montrez aux stakeholders que leur retour est pris au sérieux</li>
                  <li>Gardez une trace organisée de tous les retours reçus</li>
                </ul>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Je peux ajouter des feedbacks de plusieurs stakeholders ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Oui ! Pour chaque feedback :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Sélectionnez le stakeholder parmi ceux présents à la review</li>
                  <li>Ajoutez son commentaire avec priorité et catégorie</li>
                  <li>Cliquez sur "Ajouter"</li>
                  <li>Répétez pour chaque retour de chaque stakeholder</li>
                </ol>
                <p className="mt-2">Tous les feedbacks sont sauvegardés et affichés avec le nom du stakeholder.</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Quelles stories apparaissent dans la liste des "Stories démontrées" ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">Seules les stories qui répondent à ces 3 critères :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Assignées au sprint que vous avez sélectionné</li>
                  <li>Avec le statut "Done" (terminées)</li>
                  <li>Correspondant au produit du sprint</li>
                </ul>
                <p className="mt-2"><span className="font-medium">💡 Important :</span> Mettez à jour vos stories à "Done" 
                AVANT de créer la review pour les voir apparaître dans la liste !</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime une Sprint Review ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">La suppression est <span className="font-medium">définitive et irréversible</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Tous les feedbacks stakeholders documentés sont perdus</li>
                  <li>Les notes de démonstration sont supprimées</li>
                  <li>Les décisions et prochaines étapes disparaissent</li>
                </ul>
                <p className="mt-3">⚠️ Une confirmation vous est demandée avant suppression. Soyez certain de votre choix !</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Comment annuler une Sprint Review si elle n'a pas eu lieu ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Vous avez 2 options :</p>
                <p className="mt-2"><span className="font-medium">Option 1 - Changer le statut :</span></p>
                <ul className="mt-1 space-y-1 ml-4 list-disc">
                  <li>Éditez la review</li>
                  <li>Changez le statut à "❌ Annulée"</li>
                  <li>Sauvegardez → La review reste visible mais marquée comme annulée</li>
                </ul>
                <p className="mt-3"><span className="font-medium">Option 2 - Supprimer :</span></p>
                <ul className="mt-1 space-y-1 ml-4 list-disc">
                  <li>Si vous n'avez aucune donnée à conserver, supprimez la review</li>
                  <li>Elle disparaîtra complètement de l'historique</li>
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

export default SprintReviewsUserPage;
