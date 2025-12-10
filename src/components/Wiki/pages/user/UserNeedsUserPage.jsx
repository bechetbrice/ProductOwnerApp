import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * UserNeedsUserPage - Guide UTILISATEUR du Module Besoins Utilisateurs
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.2.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const UserNeedsUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">🎯 Guide Besoins Utilisateurs</h1>
              <p className="text-teal-100 text-lg">Transformez les insights en besoins priorisés et actionnables</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Besoins Utilisateurs ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Besoins Utilisateurs</strong> est le <strong>cœur de votre backlog produit</strong>. 
              Il centralise tous les besoins exprimés par vos utilisateurs lors des entretiens, vous permettant de les 
              prioriser, estimer et transformer en fonctionnalités développables.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Centraliser les besoins</h3>
                <p className="text-sm text-gray-600">
                  Regroupez tous les besoins identifiés en entretien ou créés manuellement dans un seul endroit
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Prioriser intelligemment</h3>
                <p className="text-sm text-gray-600">
                  Classez par importance (Critique → Basse) et estimez la complexité pour des décisions éclairées
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📖</div>
                <h3 className="font-semibold text-gray-900 mb-2">Transformer en stories</h3>
                <p className="text-sm text-gray-600">
                  Suivez l'avancement avec le tracking automatique des User Stories créées à partir de chaque besoin
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : la traçabilité complète.</span> Chaque besoin garde le lien 
                vers l'entretien source, les stakeholders impliqués et les personas concernés. Vous savez toujours 
                qui a demandé quoi et pourquoi.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre premier besoin</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur le bouton <span className="font-medium text-teal-600">"Nouveau Besoin"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• Sélectionnez le produit concerné (obligatoire)</p>
                  <p className="text-sm text-gray-700">• Rédigez l'objectif du besoin clairement (obligatoire, sera immutable)</p>
                  <p className="text-sm text-gray-700">• Ajoutez le contexte pour expliquer la situation</p>
                  <p className="text-sm text-gray-700">• Choisissez l'importance : 🔴 Critique / 🟠 Haute / 🟡 Moyenne / ⚪ Basse</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Associez au moins 1 stakeholder</span> (contact impliqué)</p>
                  <p className="text-sm text-gray-700">• Définissez un contact privilégié si besoin (pour validation)</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Filtrer et organiser vos besoins</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Utilisez le <span className="font-medium">sélecteur de produit</span> en haut pour voir les besoins d'un produit spécifique</p>
                  <p className="text-sm text-gray-700">• Cliquez sur "Filtres" pour affiner : importance, story points, stakeholder</p>
                  <p className="text-sm text-gray-700">• Triez par Date / Importance / Complexité / Stakeholder selon votre besoin</p>
                  <p className="text-sm text-gray-700">• Bouton <span className="font-medium">"Réinitialiser"</span> pour effacer tous les filtres</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Estimer et transformer</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Utilisez le <span className="font-medium">Planning Poker</span> pour estimer la complexité en équipe</p>
                  <p className="text-sm text-gray-700">• L'échelle Fibonacci (1, 2, 3, 5, 8, 13, 21) permet d'affiner l'estimation</p>
                  <p className="text-sm text-gray-700">• Créez des <span className="font-medium">User Stories</span> à partir des besoins priorisés</p>
                  <p className="text-sm text-gray-700">• Le badge "X story(ies)" s'affiche automatiquement sur les besoins transformés</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">💬 Scénario 1 : "Je viens de terminer 5 entretiens utilisateurs"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Transformer rapidement tous les insights "besoins" identifiés en besoins formalisés dans mon backlog.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Allez dans le module <span className="font-medium">Entretiens</span></li>
                  <li>Pour chaque entretien terminé, cliquez sur "Voir détails"</li>
                  <li>Dans la section "Insights", identifiez ceux de type "Besoin" (🎯)</li>
                  <li>Cliquez sur "Créer besoin" sur chaque insight pertinent</li>
                  <li>Le formulaire se pré-remplit automatiquement avec : objectif, stakeholder, importance, entretien source</li>
                  <li>Ajoutez juste le produit concerné et des personas si nécessaire</li>
                  <li>Sauvegardez → Votre besoin est créé et lié à l'entretien !</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Les insights déjà convertis en besoins n'apparaissent 
                    plus dans la liste pour éviter les doublons. Vous gardez la traçabilité vers l'entretien source !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 2 : "Je veux préparer mon prochain sprint"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Identifier les besoins les plus critiques et estimés pour les transformer en User Stories développables.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur "Filtres" puis sélectionnez "🔴 Critique" (ou "🟠 Haute")</li>
                  <li>Dans la liste, regardez les badges de complexité (Story Points)</li>
                  <li>Évitez les besoins avec "❓ Non estimé" - planifiez d'abord une session Planning Poker</li>
                  <li>Pour les besoins estimés, regardez le badge "X story(ies)"</li>
                  <li>Les besoins "Sans Stories" sont ceux à transformer en priorité</li>
                  <li>Cliquez sur "👁️ Voir détails" pour comprendre le contexte complet</li>
                  <li>Créez les User Stories correspondantes dans le module User Stories</li>
                  <li>Le badge "X story(ies)" s'affiche automatiquement sur le besoin !</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Priorisez toujours les besoins 
                    Critiques/Haute importance + Story Points faibles (1-3) pour des victoires rapides et impactantes !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 3 : "Je dois présenter le backlog aux stakeholders"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Montrer clairement l'état d'avancement : besoins identifiés, estimés, et transformés en développement.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Utilisez le <span className="font-medium">sélecteur produit</span> pour isoler un produit spécifique</li>
                  <li>Triez par "Importance" pour montrer les priorités en premier</li>
                  <li>Dans chaque carte, les badges montrent instantanément :
                    <ul className="ml-4 mt-1 space-y-0.5">
                      <li>- L'importance (🔴/🟠/🟡/⚪)</li>
                      <li>- La complexité estimée (🟢 1-2 pts → ⚫ 21 pts)</li>
                      <li>- Le nombre de stories créées (badge vert)</li>
                    </ul>
                  </li>
                  <li>Cliquez sur "👁️ Voir détails" pour afficher les stakeholders et personas concernés</li>
                  <li>Naviguez de besoin en besoin pour expliquer le contexte et l'état d'avancement</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💼 Pro tip :</span> Les stakeholders et personas affichés permettent 
                    de rappeler QUI a exprimé le besoin et POUR QUEL profil utilisateur - très puissant en présentation !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">⚡ Scénario 4 : "Un besoin critique non estimé vient d'être identifié"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Estimer rapidement la complexité avec l'équipe pour décider si on peut l'intégrer au sprint en cours.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Repérez le besoin avec badge "❓ Non estimé" + importance "🔴 Critique"</li>
                  <li>Cliquez sur "👁️ Voir détails" pour comprendre le contexte complet</li>
                  <li>Allez dans le module <span className="font-medium">Planning Poker</span></li>
                  <li>Sélectionnez ce besoin dans la liste</li>
                  <li>Lancez une session d'estimation rapide avec l'équipe</li>
                  <li>Chacun vote avec sa carte Fibonacci (1, 2, 3, 5, 8, 13, 21)</li>
                  <li>Discutez des écarts, convergez vers un consensus</li>
                  <li>Validez → Le badge "❓ Non estimé" devient "🟢 X pts" automatiquement !</li>
                  <li>Retournez aux Besoins Utilisateurs : vous pouvez maintenant décider de l'intégrer ou non</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Rapidité :</span> Une session Planning Poker prend 5-15 minutes. 
                    C'est souvent plus rapide que de développer sans estimation et découvrir des surprises !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements des Besoins Utilisateurs</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Toujours partir des entretiens</p>
                <p className="text-sm text-gray-700">Les meilleurs besoins viennent des insights d'entretiens utilisateurs. Créez les besoins directement depuis les insights type "Besoin" pour conserver la traçabilité.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Formuler l'objectif avec soin</p>
                <p className="text-sm text-gray-700">L'objectif est immutable après création. Prenez le temps de bien le rédiger : clair, concis, actionnable. Il restera visible partout et pour toujours.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Associer TOUS les stakeholders</p>
                <p className="text-sm text-gray-700">Ne vous limitez pas au contact principal. Listez TOUTES les personnes impliquées pour faciliter communication, validation et alignement futur.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Estimer avant de planifier</p>
                <p className="text-sm text-gray-700">Ne planifiez jamais un besoin "Non estimé" en sprint. Utilisez Planning Poker pour une estimation d'équipe fiable avant toute décision.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Prioriser via Vue Priorités</p>
                <p className="text-sm text-gray-700">L'importance ne se modifie pas dans le formulaire. Utilisez la Vue Priorités (drag & drop MoSCoW) pour revoir la priorisation de manière visuelle et cohérente.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Transformer progressivement</p>
                <p className="text-sm text-gray-700">Ne transformez pas tous les besoins en stories d'un coup. Concentrez-vous sur les Critiques/Haute importance + Story Points faibles. Le badge "Sans Stories" vous guide.</p>
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
                ❓ Pourquoi l'objectif est-il en lecture seule en mode édition ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">L'objectif représente le <span className="font-medium">besoin initial exprimé par l'utilisateur</span>. 
                Il doit rester immutable pour maintenir la traçabilité et la cohérence :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Les User Stories créées référencent cet objectif</li>
                  <li>Les entretiens sources pointent vers cet objectif</li>
                  <li>Les stakeholders ont validé cet objectif précis</li>
                </ul>
                <p className="mt-2">Si le besoin évolue fondamentalement, créez un nouveau besoin et archivez l'ancien.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Comment modifier l'importance d'un besoin ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">L'importance ne se modifie <span className="font-medium">PAS dans le formulaire</span> pour éviter les changements incohérents. 
                Utilisez plutôt la <strong>Vue Priorités</strong> :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Allez dans le module "Vue Priorités" (menu de gauche)</li>
                  <li>Vous verrez 4 colonnes : Must / Should / Could / Won't</li>
                  <li>Glissez-déposez les besoins entre colonnes</li>
                  <li>L'importance s'ajuste automatiquement (Must=Critique, Should=Haute, etc.)</li>
                </ol>
                <p className="mt-2">Cette approche visuelle garantit une priorisation cohérente de tout le backlog.</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ C'est quoi l'échelle Fibonacci pour les Story Points ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">L'échelle Fibonacci (1, 2, 3, 5, 8, 13, 21) reflète l'<span className="font-medium">incertitude croissante</span> 
                avec la complexité :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><strong>1-2 pts</strong> 🟢 : Très simple, quasi certain</li>
                  <li><strong>3 pts</strong> 🟡 : Simple mais nécessite réflexion</li>
                  <li><strong>5 pts</strong> 🔴 : Complexe, incertitude modérée</li>
                  <li><strong>8 pts</strong> 🔴 : Très complexe, incertitude élevée</li>
                  <li><strong>13 pts</strong> 🟣 : Extrêmement complexe, décomposer si possible</li>
                  <li><strong>21 pts</strong> ⚫ : Epic - DOIT être découpé en plus petits besoins</li>
                </ul>
                <p className="mt-2">Les écarts entre valeurs reflètent l'incertitude : difficile de différencier 7 de 8, mais facile de voir qu'un besoin est "environ 8" vs "environ 13".</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Quelle est la différence entre stakeholders et contact privilégié ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">
                  <strong>Stakeholders :</strong> TOUTES les personnes impliquées dans le besoin (minimum 1 requis). 
                  Cela peut inclure : utilisateurs finaux, sponsors, décideurs, experts métier...
                </p>
                <p className="mt-2">
                  <strong>Contact privilégié :</strong> Le contact à solliciter EN PRIORITÉ pour validation, questions ou suivi (optionnel). 
                  C'est souvent le "référent métier" ou "sponsor principal" du besoin.
                </p>
                <p className="mt-2 font-medium">Exemple pratique :</p>
                <ul className="mt-1 space-y-1 ml-4 list-disc text-xs">
                  <li>Stakeholders : Marie (utilisatrice), Jean (manager), Sophie (IT), Thomas (finance)</li>
                  <li>Contact privilégié : Marie (c'est elle qu'on contactera pour valider les specs)</li>
                </ul>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime un besoin ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">Avant suppression, l'app affiche une <span className="font-medium">confirmation avec détail des relations</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Nombre de User Stories liées</li>
                  <li>Nombre d'entretiens sources</li>
                </ul>
                <p className="mt-3">
                  Si vous confirmez, le besoin ET toutes les liaisons sont supprimés. 
                  <span className="font-medium text-red-600"> Cette action est irréversible !</span>
                </p>
                <p className="mt-2">
                  💡 <strong>Alternative :</strong> Plutôt que supprimer, envisagez de le déplacer en "Won't" 
                  (via Vue Priorités) pour le conserver dans l'historique sans qu'il pollue le backlog actif.
                </p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Mes données sont-elles en sécurité ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">🔒 100% sécurisé et privé !</p>
                <p className="mt-2">ProductOwnerApp fonctionne entièrement offline. Tous vos besoins sont stockés localement dans votre navigateur. 
                Aucune donnée n'est jamais envoyée vers un serveur externe.</p>
                <p className="mt-2">
                  💡 <strong>Conseil :</strong> Vos données persistent tant que vous ne videz pas le cache de votre navigateur. 
                  Pour une sécurité maximale, travaillez toujours dans le même navigateur sur le même appareil.
                </p>
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

export default UserNeedsUserPage;
