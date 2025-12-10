import React from 'react';
import { ArrowLeft, Target, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * RiceUserPage - Guide UTILISATEUR du Module RICE
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const RiceUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">🎯 Guide Matrice RICE</h1>
              <p className="text-teal-100 text-lg">Priorisez vos besoins avec la matrice Importance × Effort</p>
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
              <Target className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert la matrice RICE ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              La <strong>Matrice RICE</strong> est votre <strong>outil stratégique de priorisation</strong>. 
              Elle classe automatiquement vos besoins utilisateurs dans une matrice 2×2 pour vous aider à 
              décider quoi faire en premier, quoi planifier, et quoi éviter.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Axe Vertical : Importance</h3>
                <p className="text-sm text-gray-600">
                  Impact business de chaque besoin : <strong>Critical</strong>, <strong>High</strong>, 
                  <strong>Medium</strong>, <strong>Low</strong>
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">⚙️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Axe Horizontal : Effort</h3>
                <p className="text-sm text-gray-600">
                  Complexité technique estimée en <strong>Story Points</strong> (suite Fibonacci : 1, 2, 3, 5, 8, 13, 21)
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La magie de la matrice :</span> Elle croise ces deux dimensions pour créer 
                4 quadrants stratégiques qui vous indiquent instantanément où concentrer vos efforts.
              </p>
            </div>
          </div>
        </div>

        {/* Les 4 quadrants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Les 4 Quadrants Stratégiques</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Wins */}
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">🎯</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Quick Wins</h3>
                  <p className="text-sm text-gray-600">Gains rapides</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-70 rounded-lg p-3 mb-3">
                <p className="text-xs font-medium text-gray-700 mb-1">Caractéristiques :</p>
                <p className="text-xs text-gray-600">
                  <strong>Haute importance</strong> + <strong>Faible effort (≤5 pts)</strong>
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Priorité MoSCoW :</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold">🟠 SHOULD</span>
                  <span className="text-xs">(ou MUST si critique)</span>
                </div>
                <p className="text-xs text-gray-600 bg-green-100 p-2 rounded">
                  <strong>💡 Conseil :</strong> ROI immédiat ! Créez les stories de ce quadrant en priorité 
                  pour délivrer rapidement de la valeur business.
                </p>
              </div>
            </div>

            {/* Strategic */}
            <div className="bg-cyan-50 border-2 border-cyan-400 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">🚀</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Strategic</h3>
                  <p className="text-sm text-gray-600">Investissements stratégiques</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-70 rounded-lg p-3 mb-3">
                <p className="text-xs font-medium text-gray-700 mb-1">Caractéristiques :</p>
                <p className="text-xs text-gray-600">
                  <strong>Haute importance</strong> + <strong>Effort élevé (&gt;5 pts)</strong>
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Priorité MoSCoW :</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">🔴 MUST</span>
                  <span className="text-xs">(toujours)</span>
                </div>
                <p className="text-xs text-gray-600 bg-cyan-100 p-2 rounded">
                  <strong>💡 Conseil :</strong> Ne négligez pas ces besoins ! Planifiez soigneusement 
                  et découpez si &gt;13 pts. Un Epic peut donner 3-4 Quick Wins après découpage.
                </p>
              </div>
            </div>

            {/* Fill-ins */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">📋</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Fill-ins</h3>
                  <p className="text-sm text-gray-600">Compléments</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-70 rounded-lg p-3 mb-3">
                <p className="text-xs font-medium text-gray-700 mb-1">Caractéristiques :</p>
                <p className="text-xs text-gray-600">
                  <strong>Faible importance</strong> + <strong>Faible effort (≤5 pts)</strong>
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Priorité MoSCoW :</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">🟡 COULD</span>
                </div>
                <p className="text-xs text-gray-600 bg-yellow-100 p-2 rounded">
                  <strong>💡 Conseil :</strong> Nice-to-have. Gardez en réserve pour combler la fin 
                  d'un sprint si votre vélocité est plus rapide que prévu.
                </p>
              </div>
            </div>

            {/* Time Sinks */}
            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">⏳</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Time Sinks</h3>
                  <p className="text-sm text-gray-600">À éviter</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-70 rounded-lg p-3 mb-3">
                <p className="text-xs font-medium text-gray-700 mb-1">Caractéristiques :</p>
                <p className="text-xs text-gray-600">
                  <strong>Faible importance</strong> + <strong>Effort élevé (&gt;5 pts)</strong>
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Priorité MoSCoW :</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold">⚪ WON'T</span>
                  <span className="text-xs">(par défaut)</span>
                </div>
                <p className="text-xs text-gray-600 bg-red-100 p-2 rounded">
                  <strong>💡 Conseil :</strong> Mauvais ROI. Challengez : "Est-ce vraiment nécessaire ?", 
                  "Peut-on simplifier ?". Évitez ou redéfinissez le scope.
                </p>
              </div>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer vos besoins utilisateurs</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Allez dans le module <span className="font-medium text-teal-600">"Besoins Utilisateurs"</span></p>
                  <p className="text-sm text-gray-700">• Créez des besoins avec leur <strong>Importance</strong> (Critical, High, Medium, Low)</p>
                  <p className="text-sm text-gray-700">• Renseignez le <strong>contexte</strong>, l'<strong>objectif</strong> et les <strong>stakeholders</strong></p>
                  <p className="text-sm text-gray-700">• Plus vos besoins sont détaillés, plus l'analyse RICE sera pertinente</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Estimer l'effort avec Planning Poker</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Allez dans le module <span className="font-medium text-teal-600">"Planning Poker"</span></p>
                  <p className="text-sm text-gray-700">• Organisez une session avec votre équipe pour estimer les <strong>Story Points</strong></p>
                  <p className="text-sm text-gray-700">• Utilisez la suite Fibonacci : 1, 2, 3, 5, 8, 13, 21</p>
                  <p className="text-sm text-gray-700">• Sans estimation, les besoins ne pourront pas être correctement classés dans RICE</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Analyser avec la matrice RICE</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Ouvrez le module <span className="font-medium text-teal-600">"Matrice RICE"</span></p>
                  <p className="text-sm text-gray-700">• La matrice affiche automatiquement vos besoins dans les 4 quadrants</p>
                  <p className="text-sm text-gray-700">• Cliquez sur un besoin pour voir le détail (importance, effort, ROI, stories liées...)</p>
                  <p className="text-sm text-gray-700">• Filtrez par produit si vous gérez plusieurs projets</p>
                  <p className="text-sm text-gray-700">• Créez ensuite vos stories dans le module <span className="font-medium">"User Stories"</span></p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 1 : "Je dois prioriser mon backlog pour le prochain sprint"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Identifier rapidement les besoins à forte valeur business avec effort minimal.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez la matrice RICE</li>
                  <li>Concentrez-vous sur le quadrant <span className="font-medium text-green-700">🎯 Quick Wins</span></li>
                  <li>Ces besoins ont un ROI immédiat : créez leurs stories en priorité <strong>SHOULD</strong> (ou <strong>MUST</strong> si critiques)</li>
                  <li>Ajoutez quelques besoins du quadrant <span className="font-medium text-cyan-700">🚀 Strategic</span> en priorité <strong>MUST</strong></li>
                  <li>Gardez 2-3 besoins <span className="font-medium text-yellow-700">📋 Fill-ins</span> en <strong>COULD</strong> comme buffer de fin de sprint</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Un sprint équilibré contient 60% Quick Wins, 30% Strategic, 10% Fill-ins. 
                    Évitez les Time Sinks sauf raison exceptionnelle.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🚀 Scénario 2 : "J'ai un besoin Strategic avec 13 Story Points"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Découper un besoin stratégique complexe en stories plus petites et actionnables.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Identifiez le besoin dans le quadrant <span className="font-medium text-cyan-700">🚀 Strategic</span></li>
                  <li>Cliquez sur le besoin pour voir le détail</li>
                  <li>Analysez le contexte et l'objectif pour identifier les sous-fonctionnalités</li>
                  <li>Dans le module <span className="font-medium">"User Stories"</span>, créez 3-4 stories plus petites (2-5 pts chacune)</li>
                  <li>Retournez dans RICE : plusieurs de ces stories peuvent maintenant apparaître en <span className="font-medium text-green-700">🎯 Quick Wins</span> !</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Exemple :</span> Besoin "Système de notifications" (13 pts) → 
                    Story 1 "Notif email" (3 pts) + Story 2 "Notif push" (5 pts) + Story 3 "Centre de notif" (5 pts)
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 3 : "Mon équipe a terminé plus vite que prévu"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Trouver rapidement des tâches complémentaires pour optimiser la vélocité du sprint.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez la matrice RICE</li>
                  <li>Concentrez-vous sur le quadrant <span className="font-medium text-yellow-700">📋 Fill-ins</span></li>
                  <li>Ces besoins sont parfaits pour combler un sprint : faible importance mais faible effort</li>
                  <li>Choisissez un besoin avec 1-3 Story Points</li>
                  <li>Créez rapidement une story en priorité <strong>COULD</strong></li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Les Fill-ins sont idéaux pour les développeurs juniors 
                    ou pour ajouter de petites améliorations sans risque de bloquer le sprint.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-red-50 border border-red-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">⏳ Scénario 4 : "J'ai plusieurs besoins dans Time Sinks"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Challenger ces besoins pour éviter de gaspiller des ressources sur des features à faible ROI.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Identifiez les besoins dans le quadrant <span className="font-medium text-red-700">⏳ Time Sinks</span></li>
                  <li>Pour chacun, posez-vous 3 questions :</li>
                  <ul className="ml-6 list-disc space-y-1 text-xs">
                    <li><strong>"Est-ce vraiment nécessaire ?"</strong> → Peut-être le besoin peut être supprimé</li>
                    <li><strong>"Peut-on simplifier ?"</strong> → Réduire le scope pour diminuer l'effort</li>
                    <li><strong>"Y a-t-il une alternative ?"</strong> → Solution technique plus simple</li>
                  </ul>
                  <li>Si aucune solution : marquez en priorité <strong>WON'T</strong> et archivez</li>
                  <li>Si vous pouvez simplifier : recalculez l'effort → le besoin peut migrer vers Fill-ins !</li>
                </ol>

                <div className="bg-white border border-red-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚠️ Important :</span> Un Time Sink n'est pas forcément une mauvaise idée, 
                    mais il faut le justifier TRÈS fortement. Privilégiez toujours les Quick Wins et Strategic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements de la matrice RICE</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Estimer AVANT de prioriser</p>
                <p className="text-sm text-gray-700">Sans Story Points, la matrice ne peut pas fonctionner. Organisez toujours une session Planning Poker AVANT d'utiliser RICE.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Focus Quick Wins 🎯</p>
                <p className="text-sm text-gray-700">60% de votre sprint devrait provenir des Quick Wins. C'est là que vous délivrez le plus de valeur avec le moins d'effort.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Ne négligez pas Strategic 🚀</p>
                <p className="text-sm text-gray-700">Les besoins Strategic sont toujours MUST. Découpez-les si &gt;13 pts, mais ne les évitez jamais !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Fill-ins en buffer 📋</p>
                <p className="text-sm text-gray-700">Gardez 10% de Fill-ins (COULD) pour combler les fins de sprint si vélocité plus rapide que prévu.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Challengez Time Sinks ⏳</p>
                <p className="text-sm text-gray-700">Avant de marquer WON'T, demandez-vous si vous pouvez simplifier. Un Time Sink simplifié devient un Fill-in !</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Réévaluez régulièrement</p>
                <p className="text-sm text-gray-700">La matrice évolue avec vos besoins. Ré-estimez après chaque sprint et ajustez vos priorités.</p>
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
                ❓ Quelle est la différence entre RICE et MoSCoW ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">RICE :</span> Outil d'<strong>analyse</strong> qui classe vos besoins selon Importance × Effort pour identifier les opportunités.</p>
                <p className="mt-2"><span className="font-medium">MoSCoW :</span> Outil d'<strong>organisation</strong> qui range vos stories dans votre backlog par priorité (MUST, SHOULD, COULD, WON'T).</p>
                <p className="mt-2"><span className="font-medium">🔗 Workflow :</span> RICE → analyser et décider → MoSCoW → organiser le backlog → Sprint → exécuter</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Comment sont calculés les scores d'impact et d'effort ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">Impact Score (axe vertical) :</p>
                <p className="text-xs bg-white p-2 rounded mt-1 font-mono">
                  (importance × 10) + (nombre stakeholders × 5) + (contact privilégié +5) + (critique +20)
                </p>
                
                <p className="mt-3 font-medium">Effort Score (axe horizontal) :</p>
                <p className="text-xs bg-white p-2 rounded mt-1">
                  Directement les <strong>Story Points</strong> estimés en Planning Poker (1, 2, 3, 5, 8, 13, 21)
                </p>

                <p className="mt-3 font-medium">Seuil quadrants :</p>
                <p className="text-xs">• Haute importance = Critical ou High (score ≥3)</p>
                <p className="text-xs">• Faible effort = Story Points ≤5</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Que se passe-t-il si un besoin n'a pas de Story Points ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Si un besoin n'a pas été estimé, il sera classé par défaut dans <span className="font-medium text-yellow-700">📋 Fill-ins</span> avec un effort de 0.</p>
                <p className="mt-2"><span className="font-medium">⚠️ Important :</span> Cela signifie que la matrice ne peut pas fonctionner correctement. 
                Vous DEVEZ estimer tous vos besoins en Planning Poker avant d'utiliser RICE.</p>
                <p className="mt-2"><span className="font-medium">💡 Conseil :</span> Organisez une session Planning Poker dès que vous avez 5-10 besoins à prioriser.</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment interpréter le ratio Valeur/Effort (ROI) ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">Le ratio Valeur/Effort indique le <strong>retour sur investissement</strong> d'un besoin :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><strong>Ratio &gt;15 :</strong> ROI exceptionnel (Quick Wins idéaux)</li>
                  <li><strong>Ratio 10-15 :</strong> Bon ROI (Quick Wins ou Strategic efficaces)</li>
                  <li><strong>Ratio 5-10 :</strong> ROI acceptable (Strategic standards)</li>
                  <li><strong>Ratio &lt;5 :</strong> Faible ROI (Time Sinks ou Fill-ins)</li>
                </ul>
                <p className="mt-2 text-xs bg-green-100 p-2 rounded">
                  <strong>Exemple :</strong> Besoin Critical (100) avec 5 pts = 100/5 = <strong>20</strong> → ROI exceptionnel !
                </p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Puis-je déplacer manuellement un besoin d'un quadrant à un autre ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3"><strong>Non, les quadrants sont automatiques.</strong> Ils sont calculés en fonction de l'Importance et des Story Points du besoin.</p>
                <p className="mt-2">Pour déplacer un besoin vers un autre quadrant :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Modifiez l'<strong>Importance</strong> dans le module Besoins Utilisateurs</li>
                  <li>Ou ré-estimez les <strong>Story Points</strong> en Planning Poker</li>
                  <li>La matrice RICE se met à jour automatiquement</li>
                </ol>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Quelle est la meilleure stratégie pour un sprint ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">Répartition idéale pour maximiser la valeur :</p>
                <ul className="mt-2 space-y-2 ml-4 list-disc">
                  <li><span className="font-medium text-green-700">60% Quick Wins 🎯</span> : Valeur immédiate, ROI élevé</li>
                  <li><span className="font-medium text-cyan-700">30% Strategic 🚀</span> : Investissement long terme, toujours MUST</li>
                  <li><span className="font-medium text-yellow-700">10% Fill-ins 📋</span> : Buffer pour fins de sprint</li>
                  <li><span className="font-medium text-red-700">0% Time Sinks ⏳</span> : À éviter sauf justification exceptionnelle</li>
                </ul>
                <p className="mt-3 text-xs bg-teal-100 p-2 rounded">
                  <strong>💡 Pro tip :</strong> Découpez les besoins Strategic &gt;13 pts pour transformer une partie en Quick Wins !
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
                et pour comprendre en profondeur le fonctionnement du module (calculs, formules, algorithmes...).
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

export default RiceUserPage;
