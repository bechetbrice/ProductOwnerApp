import React from 'react';
import { ArrowLeft, BarChart3, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * DashboardUserPage - Guide UTILISATEUR du Module Dashboard
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const DashboardUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">📊 Guide Dashboard</h1>
              <p className="text-teal-100 text-lg">Pilotez votre produit avec une vision 360°</p>
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
              <BarChart3 className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Dashboard ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le <strong>Dashboard</strong> est votre <strong>cockpit de pilotage</strong> centralisé. Il agrège toutes les données 
              de vos produits pour vous donner une vision d'ensemble instantanée de votre projet : santé des sprints, 
              progression des objectifs, capacité d'équipe, budget et jalons à venir.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📈</div>
                <h3 className="font-semibold text-gray-900 mb-2">Vue d'ensemble</h3>
                <p className="text-sm text-gray-600">
                  Visualisez instantanément la santé globale de vos projets avec le Health Score, 
                  les KPIs stratégiques et les alertes critiques
                </p>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🗓️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Roadmap</h3>
                <p className="text-sm text-gray-600">
                  Planifiez vos sprints à venir et suivez la progression de vos user stories 
                  dans une vue chronologique claire
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold text-gray-900 mb-2">Budget</h3>
                <p className="text-sm text-gray-600">
                  Suivez vos dépenses planifiées, réelles et attendues avec une vision mensuelle 
                  et des statistiques détaillées
                </p>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📉</div>
                <h3 className="font-semibold text-gray-900 mb-2">Sprint Analytics</h3>
                <p className="text-sm text-gray-600">
                  Analysez vos sprints avec Burndown, Burnup, CFD et Sprint Health Score 
                  pour optimiser votre vélocité
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : la vision globale.</span> Le Dashboard centralise toutes les données 
                pour vous éviter de naviguer entre modules. En un coup d'œil, identifiez les risques et prenez les bonnes décisions.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Comprendre la Vue d'ensemble</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">Health Score :</span> Jauge de santé globale (0-100) basée sur 4 facteurs</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">KPIs Stratégiques :</span> Produits actifs, besoins non couverts, objectifs</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Sprint Actif :</span> Progression en temps réel de votre sprint en cours</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Jalons à venir :</span> Prochaines échéances sur 30 jours</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Capacité Équipe :</span> Disponibilité et surcharge de vos membres</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Filtrer par produit</h3>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• En haut de chaque onglet, utilisez le <span className="font-medium">sélecteur de produit</span></p>
                  <p className="text-sm text-gray-700">• Sélectionnez <span className="font-medium">"Tous les produits"</span> pour une vue consolidée</p>
                  <p className="text-sm text-gray-700">• Ou choisissez un produit spécifique pour voir uniquement ses données</p>
                  <p className="text-sm text-gray-700">• Toutes les métriques s'adaptent automatiquement au filtre actif</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Naviguer entre les onglets</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">📈 Vue d'ensemble :</span> Vision globale et alertes</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">📉 Roadmap :</span> Planification des sprints à venir</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">💵 Budget :</span> Suivi financier détaillé</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">📈 Sprint Analytics :</span> Analyse approfondie des sprints</p>
                  <p className="text-sm text-gray-700">• Sur mobile : menu déroulant en haut de page</p>
                  <p className="text-sm text-gray-700">• Sur desktop : onglets cliquables en haut</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🚨 Scénario 1 : "J'arrive le lundi matin, que se passe-t-il ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Avoir une vision instantanée de l'état du projet et identifier les urgences.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez le Dashboard → Onglet <span className="font-medium">"Vue d'ensemble"</span></li>
                  <li>Consultez la <span className="font-medium">bannière d'alertes</span> en haut (si présente) : actions en retard, besoins critiques non couverts, sprint en retard</li>
                  <li>Regardez le <span className="font-medium">Health Score</span> : &lt;60 = risque, 60-79 = attention, ≥80 = excellent</li>
                  <li>Vérifiez les <span className="font-medium">Prochains Jalons (30j)</span> : fin de sprint, objectifs à risque, actions critiques</li>
                  <li>Consultez le <span className="font-medium">Sprint Actif</span> : progression réelle vs. progression attendue</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Si vous voyez des alertes critiques ou un Health Score &lt;60, 
                    creusez immédiatement dans les sections concernées pour identifier les actions correctives.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 2 : "Mon sprint est-il en bonne voie ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Analyser la santé du sprint actif et anticiper les risques de non-livraison.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Dashboard → Onglet <span className="font-medium">"Sprint Analytics"</span></li>
                  <li>Sélectionnez le sprint actif dans le menu déroulant</li>
                  <li>Consultez le <span className="font-medium">Sprint Health Score</span> (jauge sur 100)</li>
                  <li>Analysez le <span className="font-medium">Burndown Chart</span> : ligne cyan au-dessus = retard, en dessous = avance</li>
                  <li>Vérifiez le <span className="font-medium">Burnup Chart</span> : la ligne scope doit rester stable (pas de scope creep)</li>
                  <li>Regardez le <span className="font-medium">CFD</span> : zone "En cours" qui s'élargit = trop de WIP</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Gain de temps :</span> Le Sprint Health Score résume tout en un chiffre. 
                    Score ≥80 = sprint sain, 60-79 = vigilance, &lt;60 = actions correctives urgentes.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">💰 Scénario 3 : "Suivre le budget mensuel"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Surveiller les dépenses réelles vs. planifiées et anticiper les dépassements.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Dashboard → Onglet <span className="font-medium">"Budget"</span></li>
                  <li>Consultez les <span className="font-medium">7 statistiques</span> en haut : Total Planifié, Consommé, Attendu, Écart, Pourcentage</li>
                  <li>Filtrez par <span className="font-medium">Sprint</span>, <span className="font-medium">Catégorie</span> (salaires, outils, etc.) ou <span className="font-medium">Statut</span></li>
                  <li>Dans le tableau, cliquez sur <span className="font-medium">"Modifier"</span> pour ajuster une ligne existante</li>
                  <li>Utilisez <span className="font-medium">"Nouvelle Ligne"</span> pour ajouter une nouvelle dépense</li>
                </ol>

                <div className="bg-white border border-emerald-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📈 Bonne pratique :</span> Mettez à jour le budget au moins une fois par semaine. 
                    Un écart &gt;10% nécessite une analyse approfondie.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🗓️ Scénario 4 : "Planifier les prochains sprints"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Visualiser la roadmap à moyen terme et répartir les user stories sur les sprints à venir.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Dashboard → Onglet <span className="font-medium">"Roadmap"</span></li>
                  <li>Visualisez tous vos sprints planifiés et en cours sur une timeline</li>
                  <li>Consultez les user stories associées à chaque sprint</li>
                  <li>Vérifiez la charge (story points) par sprint pour éviter la surcharge</li>
                  <li>Identifiez les sprints avec peu de stories = capacité disponible</li>
                </ol>

                <div className="bg-white border border-emerald-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Conseil :</span> Assurez-vous que la charge totale d'un sprint ne dépasse pas 
                    la vélocité moyenne de l'équipe pour éviter la surcharge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du Dashboard</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Consulter le Dashboard chaque matin</p>
                <p className="text-sm text-gray-700">5 minutes de revue quotidienne pour identifier les risques et prioriser vos actions de la journée</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Réagir immédiatement aux alertes critiques</p>
                <p className="text-sm text-gray-700">Bannière rouge = urgence. Ne pas attendre la fin de journée pour traiter ces alertes</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Analyser le Health Score chaque semaine</p>
                <p className="text-sm text-gray-700">Si le score descend sous 60, organisez une session d'analyse avec l'équipe pour identifier les causes</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Mettre à jour le budget régulièrement</p>
                <p className="text-sm text-gray-700">Au minimum une fois par semaine, idéalement en temps réel pour avoir des données budgétaires fiables</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Utiliser Sprint Analytics pour les rétrospectives</p>
                <p className="text-sm text-gray-700">Les graphiques (Burndown, CFD, Health Score) sont parfaits pour animer vos rétrospectives de sprint</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Filtrer par produit pour une analyse ciblée</p>
                <p className="text-sm text-gray-700">Si vous gérez plusieurs produits, utilisez le sélecteur de produit pour voir chaque projet individuellement</p>
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
                ❓ Que signifie le Health Score ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Le Health Score est une jauge de santé globale de votre projet sur 100 points, calculée à partir de 4 facteurs :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Progression des objectifs (30 pts) :</span> Avancement moyen de vos objectifs actifs</li>
                  <li><span className="font-medium">Couverture des besoins (25 pts) :</span> Pourcentage de besoins couverts par des stories</li>
                  <li><span className="font-medium">Santé du sprint (25 pts) :</span> Sprint en avance/retard par rapport au temps écoulé</li>
                  <li><span className="font-medium">Budget (20 pts) :</span> Écart entre budget planifié et consommé</li>
                </ul>
                <p className="mt-2"><span className="font-medium">Score ≥80 = Excellent</span> • <span className="font-medium">60-79 = Attention</span> • <span className="font-medium">&lt;60 = Risque</span></p>
              </div>
            </details>

            <details className="bg-emerald-50 border border-emerald-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-emerald-100 transition-colors">
                ❓ Comment lire le Burndown Chart ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-emerald-100">
                <p className="mt-3">Le Burndown Chart montre la diminution des story points restants au fil du sprint :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Ligne grise pointillée :</span> Rythme idéal (linéaire) pour terminer à 0 le dernier jour</li>
                  <li><span className="font-medium">Ligne cyan :</span> Burndown réel de votre équipe</li>
                  <li><span className="font-medium">Ligne cyan AU-DESSUS :</span> Vous êtes en retard (moins de points complétés que prévu)</li>
                  <li><span className="font-medium">Ligne cyan EN DESSOUS :</span> Vous êtes en avance (plus de points complétés que prévu)</li>
                </ul>
                <p className="mt-2"><span className="font-medium">Objectif :</span> Rejoindre 0 points le dernier jour du sprint</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Quelle est la différence entre Burndown et Burnup ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Ces deux graphiques mesurent l'avancement du sprint, mais de manière opposée :</p>
                <p className="mt-2"><span className="font-medium">Burndown (↓) :</span> Montre les points RESTANTS qui DIMINUENT vers 0</p>
                <p className="mt-2"><span className="font-medium">Burnup (↑) :</span> Montre les points COMPLÉTÉS qui MONTENT vers le scope total</p>
                <p className="mt-2">Le Burnup est plus utile pour détecter le <span className="font-medium">scope creep</span> : si la ligne "scope" monte, 
                c'est que vous ajoutez du travail en cours de sprint.</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ À quoi sert le Cumulative Flow Diagram (CFD) ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">Le CFD empile les zones "À faire", "En cours" et "Terminé" pour visualiser le flux de travail :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Zones parallèles :</span> Flux de travail régulier et sain</li>
                  <li><span className="font-medium">Zone "En cours" qui s'élargit :</span> Trop de travail en parallèle (WIP élevé)</li>
                  <li><span className="font-medium">Zone "À faire" qui monte :</span> Scope creep (ajout de stories en cours de sprint)</li>
                  <li><span className="font-medium">Zone "Terminé" qui stagne :</span> Blocages ou goulots d'étranglement</li>
                </ul>
              </div>
            </details>

            <details className="bg-emerald-50 border border-emerald-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-emerald-100 transition-colors">
                ❓ Comment fonctionne le filtre par produit ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-emerald-100">
                <p className="mt-3">Le sélecteur de produit en haut de chaque onglet filtre TOUTES les données affichées :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">"Tous les produits" :</span> Vue consolidée de tous vos projets</li>
                  <li><span className="font-medium">Sélection d'un produit spécifique :</span> Uniquement les données de ce produit</li>
                </ul>
                <p className="mt-2">Le filtre affecte : KPIs, sprints, user stories, objectifs, budget et toutes les métriques.</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que faire si mon Health Score est rouge (&lt;60) ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3 font-medium text-red-900">Un Health Score &lt;60 indique des risques sérieux. Actions recommandées :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Identifiez le(s) facteur(s) en rouge dans le détail du score</li>
                  <li>Consultez les alertes en haut de la Vue d'ensemble</li>
                  <li>Vérifiez le sprint actif : retard ? Trop de WIP ?</li>
                  <li>Regardez les objectifs : lesquels sont bloqués ?</li>
                  <li>Organisez une session d'urgence avec l'équipe</li>
                  <li>Mettez en place des actions correctives immédiates</li>
                </ol>
                <p className="mt-2"><span className="font-medium">Ne pas ignorer :</span> Un score rouge non traité peut compromettre la livraison du sprint.</p>
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
                et pour comprendre en profondeur le fonctionnement du Dashboard (architecture, métriques, formules de calcul...).
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

export default DashboardUserPage;
