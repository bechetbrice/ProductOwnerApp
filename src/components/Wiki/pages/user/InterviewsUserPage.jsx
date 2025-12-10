import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * InterviewsUserPage - Guide UTILISATEUR du Module Entretiens
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const InterviewsUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">💬 Guide Entretiens</h1>
              <p className="text-teal-100 text-lg">Préparez, conduisez et analysez vos entretiens utilisateurs</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Entretiens ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Entretiens</strong> vous permet de <strong>structurer vos entretiens utilisateurs</strong> 
              de bout en bout : préparation des questions, prise de notes pendant l'entretien, et analyse des insights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold text-gray-900 mb-2">Préparation</h3>
                <p className="text-sm text-gray-600">
                  Préparez vos questions à l'avance avec des templates selon le type d'entretien (découverte, validation, feedback...)
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-gray-900 mb-2">Conduite</h3>
                <p className="text-sm text-gray-600">
                  Pendant l'entretien, remplissez les réponses directement dans l'app pour garder une trace structurée
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Analyse</h3>
                <p className="text-sm text-gray-600">
                  Transformez vos insights en besoins utilisateurs concrets et suivez vos actions d'amélioration
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 Pourquoi c'est important ?</span> Des entretiens bien préparés et structurés 
                vous permettent de capter des insights actionnables et de construire des produits qui répondent vraiment aux besoins utilisateurs.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Préparer votre premier entretien</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur le bouton <span className="font-medium text-teal-600">"Nouvel Entretien"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Onglet 1 - Infos pratiques :</span></p>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm text-gray-600">→ Sélectionnez le produit concerné (obligatoire)</p>
                    <p className="text-sm text-gray-600">→ Donnez un titre clair (ex: "Entretien découverte - Marie Dupont")</p>
                    <p className="text-sm text-gray-600">→ Choisissez le type : 🔍 Découverte, ✅ Validation, 💬 Feedback ou 📊 Recherche</p>
                    <p className="text-sm text-gray-600">→ Ajoutez les participants (au moins 1 contact)</p>
                    <p className="text-sm text-gray-600">→ Fixez date, heure et lieu</p>
                    <p className="text-sm text-gray-600">→ Décrivez votre objectif (ce que vous cherchez à apprendre)</p>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">• <span className="font-medium">Onglet 2 - Questions :</span></p>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm text-gray-600">→ Un template de questions s'affiche selon le type choisi</p>
                    <p className="text-sm text-gray-600">→ Personnalisez, ajoutez ou supprimez des questions</p>
                    <p className="text-sm text-gray-600">→ Organisez-les en sections thématiques</p>
                  </div>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Conduire l'entretien</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Le jour J, ouvrez votre entretien depuis la liste</p>
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium">"Modifier le suivi de l'entretien"</span> (sur l'onglet 3)</p>
                  <p className="text-sm text-gray-700">• Changez le statut en <span className="font-medium text-yellow-700">⏳ En cours</span></p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Pendant l'entretien :</span></p>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm text-gray-600">→ Remplissez les réponses aux questions préparées</p>
                    <p className="text-sm text-gray-600">→ Ajoutez des notes libres dans "Notes générales"</p>
                    <p className="text-sm text-gray-600">→ Sauvegardez régulièrement</p>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">• <span className="font-medium">À la fin :</span> Cliquez sur <span className="font-medium text-green-700">"Marquer comme terminé"</span></p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Analyser et créer des besoins</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Relisez vos notes à tête reposée</p>
                  <p className="text-sm text-gray-700">• Identifiez les <span className="font-medium">besoins utilisateurs</span> émergents</p>
                  <p className="text-sm text-gray-700">• Créez-les dans le module "Besoins Utilisateurs"</p>
                  <p className="text-sm text-gray-700">• Liez-les à l'entretien source pour traçabilité</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Bonus :</span> Exportez en CSV pour partager avec votre équipe</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 1 : "Je lance un nouveau produit et je veux comprendre les besoins"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Explorer le contexte utilisateur et identifier les problèmes à résoudre.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez un entretien de type <span className="font-medium">🔍 Découverte</span></li>
                  <li>Le template propose automatiquement des questions comme :
                    <ul className="ml-4 mt-1 list-disc">
                      <li>"Pouvez-vous me parler de votre contexte de travail ?"</li>
                      <li>"Quelles sont vos principales frustrations aujourd'hui ?"</li>
                      <li>"Comment gérez-vous actuellement cette situation ?"</li>
                    </ul>
                  </li>
                  <li>Personnalisez selon votre domaine</li>
                  <li>Pendant l'entretien, notez les verbatims clés</li>
                  <li>Après, créez des besoins utilisateurs basés sur les insights</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Prévoyez 60-90 min pour un entretien de découverte. 
                    Posez des questions ouvertes et laissez parler l'utilisateur !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">✅ Scénario 2 : "J'ai une solution en tête et je veux la valider"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Vérifier que votre solution répond bien au problème et qu'elle est utilisable.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez un entretien de type <span className="font-medium">✅ Validation</span></li>
                  <li>Le template inclut des questions comme :
                    <ul className="ml-4 mt-1 list-disc">
                      <li>"Que pensez-vous de cette approche ?"</li>
                      <li>"Est-ce que cela résoudrait votre problème ?"</li>
                      <li>"Utiliseriez-vous cette fonctionnalité ?"</li>
                    </ul>
                  </li>
                  <li>Présentez des maquettes ou prototypes pendant l'entretien</li>
                  <li>Notez les réactions et suggestions d'amélioration</li>
                  <li>Ajustez votre solution selon les retours</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Validez tôt et souvent ! 
                    5 entretiens de validation suffisent généralement pour identifier les problèmes majeurs.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">💬 Scénario 3 : "Mon produit est en prod, je veux recueillir du feedback"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Comprendre l'expérience réelle des utilisateurs et identifier des pistes d'amélioration.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez un entretien de type <span className="font-medium">💬 Feedback</span></li>
                  <li>Questions proposées :
                    <ul className="ml-4 mt-1 list-disc">
                      <li>"Comment s'est passée votre expérience avec [fonctionnalité] ?"</li>
                      <li>"Qu'est-ce qui fonctionne bien ? Qu'est-ce qui est frustrant ?"</li>
                      <li>"Si vous pouviez changer une chose, ce serait quoi ?"</li>
                    </ul>
                  </li>
                  <li>Filtrez par statut "✅ Terminés" pour retrouver vos feedbacks facilement</li>
                  <li>Identifiez les patterns récurrents entre plusieurs entretiens</li>
                  <li>Priorisez les améliorations selon leur impact</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📊 Analyse :</span> Compilez les retours de plusieurs utilisateurs 
                    pour identifier les vrais problèmes vs. les cas particuliers.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📆 Scénario 4 : "J'organise une série d'entretiens ce mois-ci"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Planifier et suivre facilement plusieurs entretiens en parallèle.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez tous vos entretiens à l'avance avec statut <span className="font-medium text-cyan-700">📅 Planifié</span></li>
                  <li>Utilisez les filtres pour voir vos entretiens par période :
                    <ul className="ml-4 mt-1 list-disc">
                      <li>"Aujourd'hui" pour vos entretiens du jour</li>
                      <li>"Cette semaine" pour avoir une vue d'ensemble</li>
                      <li>"Ce mois" pour la planification mensuelle</li>
                    </ul>
                  </li>
                  <li>Changez le statut au fur et à mesure : Planifié → En cours → Terminé</li>
                  <li>Triez par date pour voir l'ordre chronologique</li>
                  <li>Exportez en CSV en fin de mois pour votre reporting</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⏱️ Gain de temps :</span> Préparez vos questions une seule fois dans un template, 
                    puis dupliquez-le pour les entretiens similaires !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements des Entretiens</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Toujours avoir un objectif clair</p>
                <p className="text-sm text-gray-700">Avant chaque entretien, définissez précisément ce que vous cherchez à apprendre. Un objectif flou = insights flous !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Choisir le bon type d'entretien</p>
                <p className="text-sm text-gray-700">🔍 Découverte pour explorer, ✅ Validation pour tester, 💬 Feedback pour améliorer, 📊 Recherche pour approfondir</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Préparer les questions à l'avance</p>
                <p className="text-sm text-gray-700">Utilisez les templates puis personnalisez. Un entretien structuré = meilleure qualité d'insights</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Noter pendant ou juste après</p>
                <p className="text-sm text-gray-700">Remplissez les réponses immédiatement, tant que c'est frais. Les détails oubliés = insights perdus</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Transformer les insights en besoins</p>
                <p className="text-sm text-gray-700">Ne laissez pas vos notes dormir ! Créez des besoins utilisateurs concrets à partir de vos découvertes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Identifier les patterns</p>
                <p className="text-sm text-gray-700">Relisez vos entretiens passés régulièrement. Les tendances émergent après 5-10 entretiens</p>
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
                ❓ Quelle est la différence entre les types d'entretien ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <ul className="mt-3 space-y-2">
                  <li><span className="font-medium">🔍 Découverte :</span> Pour explorer et comprendre le contexte utilisateur (début de projet)</li>
                  <li><span className="font-medium">✅ Validation :</span> Pour tester des hypothèses ou valider une solution (avant développement)</li>
                  <li><span className="font-medium">💬 Feedback :</span> Pour recueillir des retours sur l'existant (post-lancement)</li>
                  <li><span className="font-medium">📊 Recherche :</span> Pour étudier en profondeur un sujet spécifique</li>
                </ul>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Combien de temps doit durer un entretien ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">La durée par défaut est 60 minutes, mais adaptez selon le type :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Découverte :</span> 60-90 min (besoin de creuser)</li>
                  <li><span className="font-medium">Validation :</span> 30-45 min (focus sur la solution)</li>
                  <li><span className="font-medium">Feedback :</span> 20-30 min (retours rapides)</li>
                  <li><span className="font-medium">Recherche :</span> 60-120 min (étude approfondie)</li>
                </ul>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Puis-je modifier les questions après avoir créé l'entretien ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Oui ! Vous pouvez :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Modifier la préparation à tout moment avant l'entretien (bouton "Modifier la préparation")</li>
                  <li>Ajouter ou supprimer des questions</li>
                  <li>Réorganiser les sections</li>
                  <li>Ajuster l'objectif si nécessaire</li>
                </ul>
                <p className="mt-2">Par contre, une fois l'entretien marqué comme "Terminé", vous ne pouvez plus modifier les questions (mais vous pouvez ajouter des notes).</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment lier un entretien à un besoin utilisateur ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">Il y a 2 façons :</p>
                <ol className="mt-2 space-y-2 ml-6 list-decimal">
                  <li><span className="font-medium">Depuis l'entretien :</span> Créez un besoin depuis les insights de l'entretien, il sera automatiquement lié</li>
                  <li><span className="font-medium">Depuis le besoin :</span> Lors de la création d'un besoin, vous pouvez sélectionner l'entretien source</li>
                </ol>
                <p className="mt-2">Cette traçabilité permet de remonter aux sources de chaque besoin.</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime un entretien ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">Avant suppression, l'app vérifie automatiquement les relations :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Besoins utilisateurs liés à l'entretien</li>
                  <li>Personas référençant cet entretien</li>
                </ul>
                <p className="mt-3">
                  Vous êtes averti du nombre de relations. Les liens seront supprimés mais pas les entités elles-mêmes 
                  (les besoins continueront d'exister, juste sans référence à l'entretien).
                  <span className="font-medium"> Cette action est irréversible !</span>
                </p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Mes données sont-elles en sécurité ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">🔒 100% sécurisé et privé !</p>
                <p className="mt-2">ProductOwnerApp fonctionne entièrement offline. Vos entretiens et notes sont stockés localement dans votre navigateur. Aucune donnée n'est jamais envoyée vers un serveur externe.</p>
                <p className="mt-2"><span className="font-medium">💡 Conseil :</span> Exportez régulièrement en CSV pour une sauvegarde externe supplémentaire.</p>
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

export default InterviewsUserPage;
