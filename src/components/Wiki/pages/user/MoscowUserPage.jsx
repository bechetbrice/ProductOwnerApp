import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * MoscowUserPage - Guide UTILISATEUR de la Vue Priorités MoSCoW
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const MoscowUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">🎯 Guide Vue Priorités MoSCoW</h1>
              <p className="text-teal-100 text-lg">Visualisez et priorisez vos besoins utilisateurs</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert la Vue MoSCoW ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              La vue <strong>MoSCoW</strong> est un <strong>tableau Kanban visuel</strong> qui organise 
              automatiquement vos besoins utilisateurs selon leur niveau de priorité. 
              Elle vous aide à prendre des décisions éclairées sur ce qu'il faut développer en premier.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🔴</div>
                <h3 className="font-semibold text-gray-900 mb-2">Critique</h3>
                <p className="text-sm text-gray-600">
                  Besoins bloquants qui doivent être traités en urgence absolue. Sans eux, le produit ne fonctionne pas.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🟠</div>
                <h3 className="font-semibold text-gray-900 mb-2">Haute</h3>
                <p className="text-sm text-gray-600">
                  Besoins très importants à traiter rapidement, généralement dans le prochain sprint.
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🟡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Moyenne</h3>
                <p className="text-sm text-gray-600">
                  Besoins souhaitables mais pouvant attendre. Valeur ajoutée modérée.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <div className="text-3xl mb-2">⚪</div>
                <h3 className="font-semibold text-gray-900 mb-2">Basse</h3>
                <p className="text-sm text-gray-600">
                  Besoins "nice-to-have" de faible priorité, à faire si temps disponible.
                </p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 Méthode MoSCoW :</span> Cette méthode de priorisation vient de l'acronyme 
                <strong> M</strong>ust have, <strong>S</strong>hould have, <strong>C</strong>ould have, <strong>W</strong>on't have. 
                Adaptée ici en 4 niveaux de priorité pour plus de clarté.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visualiser vos besoins par priorité</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Ouvrez la vue <span className="font-medium text-teal-600">"Vue Priorités MoSCoW"</span> depuis le menu</p>
                  <p className="text-sm text-gray-700">• Vos besoins sont automatiquement classés dans 4 colonnes selon leur priorité</p>
                  <p className="text-sm text-gray-700">• Le badge en haut de chaque colonne indique le <span className="font-medium">nombre de besoins</span></p>
                  <p className="text-sm text-gray-700">• Chaque carte affiche le code produit et l'objectif du besoin</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Consulter les détails d'un besoin</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur l'icône <span className="font-medium">👁️ (œil)</span> sur n'importe quelle carte</p>
                  <p className="text-sm text-gray-700">• Une fenêtre détaillée s'ouvre avec toutes les informations du besoin</p>
                  <p className="text-sm text-gray-700">• Vous pouvez voir : persona lié, stakeholders, stories créées, entretien source...</p>
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium">"Modifier"</span> pour changer la priorité ou d'autres champs</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Utiliser les filtres pour cibler</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">Sélecteur Produit :</span> Affichez uniquement les besoins d'un produit spécifique</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Filtre Stakeholder :</span> Voir les besoins d'un contact précis (cliquez sur "Filtres")</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Couverture Stories :</span> Identifiez les besoins "Sans stories" pour créer des stories</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔥 Scénario 1 : "Que dois-je développer en priorité ce sprint ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Identifier rapidement les besoins les plus urgents pour planifier le prochain sprint.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez la vue MoSCoW</li>
                  <li>Concentrez-vous sur la colonne <span className="font-medium">🔴 Critique</span> (rouge)</li>
                  <li>Ces besoins DOIVENT être traités en urgence</li>
                  <li>Cliquez sur 👁️ pour voir les détails et créer des user stories immédiatement</li>
                  <li>Passez ensuite à la colonne <span className="font-medium">🟠 Haute</span> (orange)</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Règle d'or :</span> Limitez les besoins critiques à 
                    <span className="font-medium"> 10-15% maximum</span> de votre backlog. Trop de "critiques" = aucune réelle priorité !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 2 : "Je veux identifier les besoins non couverts par des stories"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Trouver les besoins qui n'ont pas encore été transformés en user stories pour les prioriser.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur "Filtres" pour déplier la section</li>
                  <li>Dans "Couverture Stories", sélectionnez <span className="font-medium">"Sans stories"</span></li>
                  <li>Seuls les besoins non couverts s'affichent dans les colonnes</li>
                  <li>Priorisez les critiques et hauts en créant des stories immédiatement</li>
                  <li>Pour les moyennes et basses, ajoutez-les au backlog pour plus tard</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Tous les besoins 🔴 Critiques et 🟠 Hauts 
                    devraient avoir au moins une story. Vérifiez régulièrement avec ce filtre !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🤝 Scénario 3 : "Un stakeholder demande où en est son besoin"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Retrouver rapidement tous les besoins d'un stakeholder spécifique pour faire un point.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur "Filtres"</li>
                  <li>Dans "Stakeholder", sélectionnez le contact concerné</li>
                  <li>La vue affiche uniquement ses besoins classés par priorité</li>
                  <li>Cliquez sur 👁️ sur chaque carte pour voir l'avancement (stories créées, sprint planifié...)</li>
                  <li>Vous pouvez lui faire un rapport visuel : "2 critiques en cours, 3 hautes prévues sprint prochain..."</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Gain de temps :</span> Cette vue permet de répondre instantanément 
                    aux questions "Où en êtes-vous avec mes demandes ?" en quelques secondes !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🗓️ Scénario 4 : "Réunion de priorisation hebdomadaire avec l'équipe"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Utiliser la vue MoSCoW comme support de discussion pour prioriser le backlog.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Partagez votre écran avec la vue MoSCoW ouverte</li>
                  <li>Passez en revue la colonne 🔴 Critique : est-elle cohérente ? Trop remplie ?</li>
                  <li>Discutez des besoins 🟠 Hauts pour le prochain sprint</li>
                  <li>Pour chaque besoin discuté, cliquez sur 👁️ puis "Modifier" pour changer sa priorité en temps réel</li>
                  <li>L'équipe voit immédiatement la carte se déplacer dans la bonne colonne</li>
                </ol>

                <div className="bg-white border border-emerald-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎨 Atout visuel :</span> Cette vue Kanban colorée facilite les discussions 
                    d'équipe et crée un consensus visuel sur les priorités !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 5 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📦 Scénario 5 : "Gestion multi-produits : prioriser par projet"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Voir les priorités d'un seul produit quand vous en gérez plusieurs.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>En haut de la page, utilisez le <span className="font-medium">sélecteur de produit</span></li>
                  <li>Choisissez le produit qui vous intéresse</li>
                  <li>La vue se filtre automatiquement : vous voyez UNIQUEMENT les besoins de ce produit</li>
                  <li>Faites votre priorisation produit par produit</li>
                  <li>Sélectionnez "Tous les produits" pour avoir une vue d'ensemble</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Organisation :</span> Cette approche évite de mélanger les priorités 
                    de différents projets et permet des priorisations cohérentes par produit !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements de la vue MoSCoW</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Limiter les critiques à 10-15% maximum</p>
                <p className="text-sm text-gray-700">Si tout est critique, rien n'est critique ! Réservez ce niveau aux véritables urgences bloquantes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Réviser les priorités chaque semaine</p>
                <p className="text-sm text-gray-700">Les priorités changent ! Réunion hebdomadaire pour réévaluer avec l'équipe et les stakeholders.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Vérifier la couverture stories régulièrement</p>
                <p className="text-sm text-gray-700">Filtrez par "Sans stories" pour identifier les besoins critiques/hauts non traités et créez des stories immédiatement.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Transformer les critiques en stories immédiatement</p>
                <p className="text-sm text-gray-700">Un besoin critique doit être dans le sprint en cours ou le prochain. Créez des stories dès qu'un besoin passe en critique.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Utiliser les filtres pour des vues ciblées</p>
                <p className="text-sm text-gray-700">Combinez produit + stakeholder + couverture pour des analyses précises et répondre aux questions des parties prenantes.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Documenter les décisions de priorisation</p>
                <p className="text-sm text-gray-700">Utilisez les notes dans les besoins pour expliquer POURQUOI un besoin est critique/haute. Évite les débats répétés !</p>
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
                ❓ Comment changer la priorité d'un besoin ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Pour modifier la priorité d'un besoin :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Cliquez sur l'icône 👁️ (œil) sur la carte du besoin</li>
                  <li>Dans la fenêtre détaillée, cliquez sur "Modifier"</li>
                  <li>Changez le champ "Priorité" dans le formulaire</li>
                  <li>Sauvegardez : la carte se déplace automatiquement vers la bonne colonne</li>
                </ol>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Quelle est la différence entre MoSCoW et la méthode RICE ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3"><span className="font-medium">MoSCoW :</span> Méthode qualitative simple basée sur 4 niveaux de priorité. 
                Rapide à utiliser, idéale pour discussions d'équipe et décisions rapides.</p>
                <p className="mt-2"><span className="font-medium">RICE :</span> Méthode quantitative calculant un score (Reach × Impact × Confidence / Effort). 
                Plus objective, nécessite plus de données, utilisée pour priorisations complexes.</p>
                <p className="mt-2 font-medium">Conseil : Utilisez MoSCoW pour les revues hebdomadaires, RICE pour les décisions stratégiques !</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Que signifie "Avec/Sans stories" dans les filtres ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">"Avec stories" :</span> Besoins pour lesquels au moins une user story a été créée. 
                Ces besoins sont en cours de traitement ou déjà couverts.</p>
                <p className="mt-2"><span className="font-medium">"Sans stories" :</span> Besoins qui n'ont encore aucune story associée. 
                Ce sont des besoins identifiés mais pas encore transformés en développement.</p>
                <p className="mt-2">💡 Utilisez "Sans stories" pour identifier les besoins à traiter en priorité !</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Puis-je créer un besoin directement depuis cette vue ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Non, cette vue est en <span className="font-medium">lecture et modification uniquement</span>. 
                Elle ne permet pas de créer de nouveaux besoins.</p>
                <p className="mt-2">Pour créer un besoin :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Allez dans le module "Besoins Utilisateurs" via le menu</li>
                  <li>Cliquez sur "Nouveau Besoin"</li>
                  <li>Remplissez le formulaire et définissez sa priorité</li>
                  <li>Revenez à la vue MoSCoW : votre nouveau besoin apparaît dans la bonne colonne !</li>
                </ol>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Combien de besoins "critiques" devrais-je avoir ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">Règle générale : 10-15% maximum du backlog total.</span></p>
                <p className="mt-2">Exemple : Si vous avez 50 besoins au total, vous ne devriez pas avoir plus de 5-7 besoins critiques.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
                  <p className="text-xs text-yellow-900">
                    <span className="font-medium">⚠️ Attention :</span> Trop de critiques = perte de sens de la priorité. 
                    Si tout est critique, l'équipe ne sait plus par où commencer !
                  </p>
                </div>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment utiliser cette vue en réunion d'équipe ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3"><span className="font-medium">Workflow recommandé :</span></p>
                <ol className="mt-2 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">Début de réunion :</span> Partagez la vue MoSCoW à l'écran</li>
                  <li><span className="font-medium">Revue critique :</span> Passez en revue les besoins 🔴 - sont-ils tous vraiment bloquants ?</li>
                  <li><span className="font-medium">Priorisation sprint :</span> Discutez des 🟠 pour décider lesquels intégrer</li>
                  <li><span className="font-medium">Ajustements en direct :</span> Modifiez les priorités en temps réel (👁️ → Modifier)</li>
                  <li><span className="font-medium">Vérification couverture :</span> Filtrez "Sans stories" pour identifier les gaps</li>
                </ol>
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
                et pour comprendre en profondeur le fonctionnement de la vue MoSCoW (architecture, composants, logique métier...).
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

export default MoscowUserPage;
