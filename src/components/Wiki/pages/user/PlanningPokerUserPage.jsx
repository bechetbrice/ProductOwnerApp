import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * PlanningPokerUserPage - Guide UTILISATEUR du Module Planning Poker
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const PlanningPokerUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">🎲 Guide Planning Poker</h1>
              <p className="text-teal-100 text-lg">Estimez la complexité de vos besoins en équipe avec l'échelle Fibonacci</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Planning Poker ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Planning Poker</strong> est votre <strong>outil d'estimation collaborative</strong> 
              pour évaluer la complexité de vos besoins utilisateurs. Il utilise l'échelle de Fibonacci 
              (1, 2, 3, 5, 8, 13, 21) pour assigner des Story Points à chaque besoin.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold text-gray-900 mb-2">Estimation en équipe</h3>
                <p className="text-sm text-gray-600">
                  Chaque membre vote avec une carte Fibonacci pour éviter les biais et obtenir un consensus collectif
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Complexité mesurée</h3>
                <p className="text-sm text-gray-600">
                  L'échelle Fibonacci reflète l'incertitude croissante : plus un besoin est complexe, moins on peut l'estimer précisément
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Planification réaliste</h3>
                <p className="text-sm text-gray-600">
                  Les Story Points permettent de calculer votre vélocité d'équipe et planifier des sprints atteignables
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : l'estimation relative.</span> Plutôt que de deviner "combien d'heures ?", 
                vous comparez : "Ce besoin est-il plus simple ou plus complexe que celui-ci ?" L'échelle Fibonacci force cette relativité.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Préparer vos besoins</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Créez d'abord vos <span className="font-medium">besoins utilisateurs</span> dans le module dédié</p>
                  <p className="text-sm text-gray-700">• Associez chaque besoin à un produit et définissez son importance (Critique/Haute/Moyenne/Basse)</p>
                  <p className="text-sm text-gray-700">• Allez dans le module <span className="font-medium text-teal-600">"Planning Poker"</span></p>
                  <p className="text-sm text-gray-700">• Vous voyez 3 colonnes : <strong>À estimer</strong> (gauche) | <strong>Sélection</strong> (centre) | <strong>Estimés</strong> (droite)</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sélectionner et estimer</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Dans la colonne gauche "À estimer", <span className="font-medium">cliquez sur un besoin</span></p>
                  <p className="text-sm text-gray-700">• Il apparaît au centre avec son objectif complet et son produit</p>
                  <p className="text-sm text-gray-700">• Discutez en équipe de sa complexité</p>
                  <p className="text-sm text-gray-700">• Chaque membre choisit mentalement une carte (1, 2, 3, 5, 8, 13, 21)</p>
                  <p className="text-sm text-gray-700">• Révélez tous ensemble, discutez des écarts, convergez vers un consensus</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Cliquez sur la carte validée</span> → Le besoin est estimé !</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Continuer et réestimer</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Après estimation, le <span className="font-medium">besoin suivant se sélectionne automatiquement</span></p>
                  <p className="text-sm text-gray-700">• Les besoins estimés passent dans la colonne droite "Estimés"</p>
                  <p className="text-sm text-gray-700">• Si besoin de <span className="font-medium">réestimer</span>, cliquez sur 🔄 (bouton RotateCcw) dans la colonne droite</p>
                  <p className="text-sm text-gray-700">• Le badge "X pt" s'affiche automatiquement sur chaque besoin estimé</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 1 : "Je viens d'identifier 10 nouveaux besoins en entretiens"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Estimer rapidement tous ces besoins pour les prioriser et planifier les prochains sprints.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Réunissez votre équipe pour une <span className="font-medium">session Planning Poker</span> (15-30 min)</li>
                  <li>Allez dans le module Planning Poker</li>
                  <li>Si vous avez plusieurs produits, utilisez le <span className="font-medium">filtre produit</span> en haut</li>
                  <li>Les 10 besoins apparaissent dans la colonne "À estimer", triés par importance (Critiques en premier)</li>
                  <li>Pour chaque besoin :
                    <ul className="ml-4 mt-1 space-y-0.5">
                      <li>- Cliquez dessus pour le sélectionner</li>
                      <li>- Lisez l'objectif ensemble</li>
                      <li>- Cliquez sur 👁️ si besoin de voir le contexte complet</li>
                      <li>- Chacun vote mentalement avec sa carte</li>
                      <li>- Révélez ensemble, discutez, convergez</li>
                      <li>- Validez en cliquant sur la carte consensus</li>
                    </ul>
                  </li>
                  <li>Le besoin suivant se sélectionne automatiquement → Gagnez du temps !</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> L'auto-sélection du besoin suivant accélère le workflow. 
                    Vous pouvez estimer 10-15 besoins en 20 minutes avec une équipe rodée !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">⚡ Scénario 2 : "Un besoin critique non estimé vient d'arriver"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Estimer rapidement pour décider si on peut l'intégrer au sprint en cours.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Allez dans Planning Poker</li>
                  <li>Repérez le besoin avec badge "❓ Non estimé" + importance "🔴 Critique" en haut de la colonne gauche</li>
                  <li>Cliquez dessus → Il s'affiche au centre avec son objectif</li>
                  <li>Cliquez sur 👁️ pour voir le contexte complet (stakeholders, entretien source)</li>
                  <li>Session Planning Poker express (5-10 min) :
                    <ul className="ml-4 mt-1 space-y-0.5">
                      <li>- Chaque membre vote avec sa carte Fibonacci</li>
                      <li>- Si écarts &gt; 3 points : discussion obligatoire</li>
                      <li>- Re-vote jusqu'à consensus (2 tours max)</li>
                    </ul>
                  </li>
                  <li>Validez la carte → Badge "X pt" s'affiche instantanément</li>
                  <li>Vous pouvez maintenant décider : intégrer au sprint si capacité disponible !</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Si le consensus donne 8+ points, 
                    c'est trop complexe pour le sprint en cours. Planifiez-le pour le prochain ou découpez-le en sous-besoins.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔄 Scénario 3 : "On découvre qu'un besoin estimé est plus complexe que prévu"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Réestimer le besoin après avoir découvert des complexités cachées pendant le développement.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Allez dans Planning Poker</li>
                  <li>Regardez la colonne droite "Besoins estimés"</li>
                  <li>Trouvez le besoin concerné (ils sont triés par Story Points décroissants)</li>
                  <li>Cliquez sur le bouton 🔄 (RotateCcw) sur la carte du besoin</li>
                  <li>Le besoin devient actif au centre, prêt pour réestimation</li>
                  <li>Expliquez à l'équipe ce qui a changé</li>
                  <li>Re-votez avec les cartes Fibonacci</li>
                  <li>Validez la nouvelle estimation → Mise à jour automatique</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💼 Pro tip :</span> Notez ces réestimations dans les rétrospectives. 
                    Si vous devez souvent réestimer à la hausse, c'est un signal : vos estimations initiales sont trop optimistes !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 4 : "Je veux calculer ma vélocité d'équipe"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Utiliser les Story Points pour connaître la capacité réelle de l'équipe par sprint.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Estimez tous vos besoins en Planning Poker</li>
                  <li>Créez des User Stories à partir des besoins estimés</li>
                  <li>Les Story Points sont automatiquement copiés sur les stories</li>
                  <li>Pendant le sprint, suivez les stories complétées</li>
                  <li>À la fin du sprint, additionnez les Story Points des stories terminées</li>
                  <li>Répétez sur 3-4 sprints pour obtenir une <span className="font-medium">moyenne stable</span></li>
                  <li>Cette moyenne = votre <strong>vélocité</strong> (ex: 25 pts/sprint)</li>
                  <li>Planifiez les prochains sprints en respectant cette vélocité</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📈 Analyse avancée :</span> Si votre vélocité varie beaucoup (±5 pts), 
                    c'est normal les 2-3 premiers sprints. Après, une variation importante signale un problème : 
                    estimations imprécises, équipe instable, ou obstacles récurrents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du Planning Poker</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Toujours estimer en équipe</p>
                <p className="text-sm text-gray-700">Jamais d'estimation solo ! Le Planning Poker tire sa force du consensus collectif. 
                Chaque membre apporte sa perspective (dev, test, UX...) pour une estimation complète.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Penser "complexité" pas "temps"</p>
                <p className="text-sm text-gray-700">Les Story Points mesurent la complexité relative, PAS le temps. 
                Un besoin à 5 pts peut prendre 2 jours ou 1 semaine selon l'équipe. L'important : il est "environ 5x plus complexe qu'un besoin à 1 pt".</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Discuter les écarts importants</p>
                <p className="text-sm text-gray-700">Si un membre vote "2" et un autre "8", ARRÊTEZ et discutez ! 
                Un écart &gt; 3 points signale une incompréhension. Celui qui vote "2" a peut-être oublié des aspects, celui qui vote "8" en surestime peut-être.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Découper les besoins à 13+ points</p>
                <p className="text-sm text-gray-700">Un besoin à 13 ou 21 pts est trop gros et incertain. 
                C'est un "Epic" qu'il faut découper en sous-besoins plus petits (objectif : 3-5 pts chacun). Plus petit = mieux compris = livré plus vite.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Comparer avec des références</p>
                <p className="text-sm text-gray-700">Gardez 2-3 besoins "références" bien estimés (ex: "La connexion utilisateur = 3 pts"). 
                Pour tout nouveau besoin, demandez "Plus simple ou plus complexe que la connexion ?" pour calibrer l'équipe.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Réestimer sans hésiter</p>
                <p className="text-sm text-gray-700">Si vous découvrez en développement que l'estimation était fausse, réestimez IMMÉDIATEMENT avec 🔄. 
                Mettez à jour votre vélocité pour les planifications futures. Pas de honte : estimer c'est apprendre !</p>
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
                ❓ Pourquoi utiliser Fibonacci et pas 1, 2, 3, 4, 5, 6... ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">L'échelle Fibonacci <span className="font-medium">reflète l'incertitude croissante</span> avec la complexité :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Entre 1 et 2 pts : différence minime, facile à distinguer</li>
                  <li>Entre 5 et 8 pts : différence plus floue, normal</li>
                  <li>Entre 13 et 21 pts : très incertain, impossible de préciser</li>
                </ul>
                <p className="mt-2">Les "trous" dans l'échelle (pas de 4, 6, 7, 9...) vous forcent à choisir : 
                "C'est environ 3" ou "plutôt 5". Pas de fausse précision !</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ C'est quoi la différence entre 1 pt et 2 pts ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Règle simple :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><strong>1 pt</strong> 🟢 : Modification mineure, quasi certain qu'on sait faire (ex: changer un texte, ajouter un bouton)</li>
                  <li><strong>2 pts</strong> 🟢 : Tâche simple mais demande réflexion (ex: formulaire basique, requête API simple)</li>
                  <li><strong>3 pts</strong> 🟡 : Développement standard avec quelques incertitudes (ex: page avec plusieurs composants)</li>
                </ul>
                <p className="mt-2">Si vous hésitez entre 1 et 2, choisissez 2. Mieux vaut surestimer légèrement que sous-estimer !</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Que faire si personne n'est d'accord sur l'estimation ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Processus en 4 étapes :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li><span className="font-medium">Écouter</span> : Celui qui a voté le PLUS BAS et le PLUS HAUT expliquent leur raisonnement</li>
                  <li><span className="font-medium">Clarifier</span> : Posez des questions jusqu'à ce que tout le monde ait la même compréhension</li>
                  <li><span className="font-medium">Re-voter</span> : Nouveau tour avec les nouvelles informations</li>
                  <li><span className="font-medium">Trancher</span> : Si toujours pas consensus après 2 tours, le Product Owner tranche (en choisissant la médiane)</li>
                </ol>
                <p className="mt-2 font-medium">💡 Si ça arrive souvent, c'est que le besoin est mal défini. Retravaillez l'objectif et le contexte !</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Mon besoin fait 21 points, c'est grave ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">Oui et non :</p>
                <p className="mt-2"><span className="font-medium">📛 Grave pour le planning :</span> Un besoin à 21 pts est un "Epic". 
                Trop gros, trop incertain, impossible à livrer en un sprint. Vous DEVEZ le découper.</p>
                <p className="mt-2"><span className="font-medium">✅ Pas grave pour l'apprentissage :</span> Avoir identifié un Epic est positif ! 
                Maintenant vous savez qu'il faut le décomposer.</p>
                <p className="mt-3 font-medium">🔪 Comment découper :</p>
                <ul className="mt-1 space-y-1 ml-4 list-disc text-xs">
                  <li>Par étapes (MVP → V1 → V2)</li>
                  <li>Par personas (d'abord admin, puis utilisateur, puis invité)</li>
                  <li>Par fonctionnalités (affichage → édition → suppression)</li>
                </ul>
                <p className="mt-2 text-xs">Objectif : 3-5 pts par sous-besoin. Si vous obtenez encore des 8+ pts, re-découpez !</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ On peut estimer en heures plutôt qu'en Story Points ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3"><span className="font-medium">❌ Non recommandé</span> pour plusieurs raisons :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Variabilité</span> : Marie met 2h, Jean 5h pour la même tâche</li>
                  <li><span className="font-medium">Fausse précision</span> : Dire "12h37" donne une illusion de contrôle</li>
                  <li><span className="font-medium">Pression</span> : Si on dit "8h" et qu'on prend 12h, on se sent coupable</li>
                  <li><span className="font-medium">Comparaison impossible</span> : 8h Marie ≠ 8h Jean</li>
                </ul>
                <p className="mt-3"><span className="font-medium">✅ Les Story Points résolvent tout ça :</span></p>
                <ul className="mt-1 space-y-1 ml-4 list-disc text-xs">
                  <li>Mesurent la complexité, pas le temps → comparables entre personnes</li>
                  <li>Échelle relative → pas de fausse précision</li>
                  <li>Pas de pression temporelle → focus sur la livraison de valeur</li>
                </ul>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Combien de temps prend une session Planning Poker ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Dépend du nombre de besoins et de l'expérience de l'équipe :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Débutants</span> : 5-10 min par besoin (beaucoup de discussions)</li>
                  <li><span className="font-medium">Intermédiaire</span> : 2-5 min par besoin</li>
                  <li><span className="font-medium">Experts</span> : 1-2 min par besoin (consensus rapide)</li>
                </ul>
                <p className="mt-3"><span className="font-medium">📅 Sessions typiques :</span></p>
                <ul className="mt-1 space-y-1 ml-4 list-disc text-xs">
                  <li>Backlog grooming : 5-8 besoins en 30-45 min</li>
                  <li>Session express (besoin urgent) : 1 besoin en 5-10 min</li>
                  <li>Grooming complet (nouveau produit) : 20 besoins en 2h</li>
                </ul>
                <p className="mt-2 text-xs font-medium">💡 Astuce : Timeboxez à 5 min max par besoin. 
                Si pas de consensus après 2 tours, mettez "?" et revenez-y plus tard avec plus d'infos.</p>
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

export default PlanningPokerUserPage;
