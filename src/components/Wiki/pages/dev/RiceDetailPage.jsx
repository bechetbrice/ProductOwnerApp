import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * RiceDetailPage - Documentation TECHNIQUE du Module RICE
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const RiceDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module RICE</h1>
              <p className="text-teal-100">Version complète pour développeurs et IA • v4.1.0</p>
            </div>
            {onSwitchToUser && (
              <button
                onClick={onSwitchToUser}
                className="flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                <Users size={18} />
                Guide Utilisateur
              </button>
            )}
          </div>
        </div>

        {/* Vue d'ensemble */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Le <strong>Module RICE</strong> est une matrice de priorisation 2×2 qui classe automatiquement 
              les besoins utilisateurs en 4 quadrants stratégiques selon deux dimensions : 
              <strong>Importance</strong> (axe vertical) et <strong>Effort</strong> (axe horizontal).
            </p>
            <p>
              Ce module s'appuie sur les données enrichies du module <strong>Besoins Utilisateurs</strong> 
              et utilise l'utilitaire <code>needEnrichment.js</code> pour calculer automatiquement les scores, 
              ratios et quadrants de chaque besoin.
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
              <p className="text-sm font-medium text-teal-900 mb-2">🎯 Objectif principal</p>
              <p className="text-sm text-teal-800">
                Fournir une visualisation stratégique pour identifier rapidement les opportunités à fort ROI 
                (Quick Wins), les investissements stratégiques nécessaires (Strategic), les compléments optionnels 
                (Fill-ins) et les besoins à faible ROI à éviter (Time Sinks).
              </p>
            </div>
          </div>
        </div>

        {/* Architecture technique */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture technique</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📁 Structure des fichiers</h3>
              <div className="bg-white rounded border border-gray-300 p-3 font-mono text-xs space-y-1">
                <div>src/components/Rice/</div>
                <div className="ml-4">├── Rice.jsx <span className="text-gray-500">// Composant principal</span></div>
                <div className="ml-4">└── index.js <span className="text-gray-500">// Export</span></div>
                <div className="mt-2">src/utils/analysis/</div>
                <div className="ml-4">└── needEnrichment.js <span className="text-gray-500">// Logique métier</span></div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔧 Composants et dépendances</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <span className="font-medium">Rice.jsx :</span> Composant principal (4.1.0)</li>
                <li>• <span className="font-medium">FilterBar :</span> Barre de filtres repliable (Common)</li>
                <li>• <span className="font-medium">BoardCard :</span> Carte harmonisée pour afficher les besoins (ui)</li>
                <li>• <span className="font-medium">EmptyState :</span> Gestion des états vides (ui)</li>
                <li>• <span className="font-medium">UserNeedDetail :</span> Modal de visualisation détaillée</li>
                <li>• <span className="font-medium">needEnrichment.js :</span> Utilitaire d'enrichissement et calculs (2.5.1)</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚡ Props du composant Rice</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">enrichedNeeds</code>
                  <span className="text-xs">: Besoins enrichis avec métadonnées</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">userNeeds</code>
                  <span className="text-xs">: Besoins bruts (pour comptage)</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">userStories</code>
                  <span className="text-xs">: Stories associées aux besoins</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">contacts</code>
                  <span className="text-xs">: Liste des contacts</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">personas</code>
                  <span className="text-xs">: Liste des personas</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">products</code>
                  <span className="text-xs">: Liste des produits</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">interviews</code>
                  <span className="text-xs">: Liste des entretiens</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">Objectives</code>
                  <span className="text-xs">: Liste des objectifs</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">onNavigate</code>
                  <span className="text-xs">: Fonction de navigation entre modules</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">onUpdateNeed</code>
                  <span className="text-xs">: Fonction de mise à jour d'un besoin</span>
                </div>
                <div className="flex gap-2">
                  <code className="bg-white px-2 py-1 rounded text-xs">showTips</code>
                  <span className="text-xs">: Afficher le module conseils (false par défaut)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logique métier - Enrichissement */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Logique métier - Enrichissement des besoins</h2>
          
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📊 Calcul du Score d'Impact (Axe vertical)</h3>
              <p className="text-sm text-gray-700 mb-3">Formule complète :</p>
              <div className="bg-white rounded border border-emerald-200 p-3 font-mono text-xs mb-3">
                impactScore = (importanceScore × 10) + (stakeholderCount × 5) + primaryContactBonus + criticalBonus
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium mb-1">1️⃣ importanceScore (mapping numérique) :</p>
                  <ul className="ml-6 space-y-1 text-xs">
                    <li>• <code>critical</code> = 4</li>
                    <li>• <code>high</code> = 3</li>
                    <li>• <code>medium</code> = 2</li>
                    <li>• <code>low</code> = 1</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium mb-1">2️⃣ stakeholderCount :</p>
                  <p className="text-xs ml-6">Nombre de stakeholders (need.stakeholderIds.length)</p>
                </div>

                <div>
                  <p className="font-medium mb-1">3️⃣ primaryContactBonus :</p>
                  <p className="text-xs ml-6">+5 si need.primaryContactId est défini</p>
                </div>

                <div>
                  <p className="font-medium mb-1">4️⃣ criticalBonus :</p>
                  <p className="text-xs ml-6">+20 si need.importance === 'critical'</p>
                </div>

                <div className="bg-emerald-100 rounded p-3 mt-3">
                  <p className="text-xs font-medium mb-1">📝 Exemple de calcul :</p>
                  <p className="text-xs">Besoin <strong>Critical</strong> avec 5 stakeholders et contact privilégié :</p>
                  <p className="text-xs font-mono mt-1">
                    (4 × 10) + (5 × 5) + 5 + 20 = 40 + 25 + 5 + 20 = <strong>90 points</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Calcul du Score d'Effort (Axe horizontal)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Utilise <strong>UNIQUEMENT</strong> le champ <code>storyPoints</code> renseigné manuellement 
                par l'équipe en session Planning Poker.
              </p>
              
              <div className="bg-white rounded border border-green-200 p-3 font-mono text-xs mb-3">
                effortScore = need.storyPoints || 0
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Valeurs possibles (suite Fibonacci) :</p>
                <ul className="ml-6 space-y-1 text-xs">
                  <li>• 0 : Non estimé (besoin classé en Fill-ins par défaut)</li>
                  <li>• 1 : Très faible effort</li>
                  <li>• 2 : Faible effort</li>
                  <li>• 3 : Moyen effort</li>
                  <li>• 5 : Effort élevé</li>
                  <li>• 8, 13, 21 : Très élevé (nécessite découpage)</li>
                </ul>

                <div className="bg-green-100 rounded p-3 mt-3">
                  <p className="text-xs font-medium mb-1">⚠️ Rétrocompatibilité :</p>
                  <p className="text-xs">
                    Si ancien format <code>effort</code> existe : "low" → 1, "medium" → 3, "high" → 5
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📈 Calcul du Ratio Valeur/Effort (ROI)</h3>
              <p className="text-sm text-gray-700 mb-3">Formule :</p>
              <div className="bg-white rounded border border-cyan-200 p-3 font-mono text-xs mb-3">
                valueEffortRatio = effortScore &gt; 0 ? (businessValue / effortScore).toFixed(2) : 'N/A'
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium mb-1">Valeur Business par Importance :</p>
                <ul className="ml-6 space-y-1 text-xs">
                  <li>• <code>critical</code> = 100</li>
                  <li>• <code>high</code> = 75</li>
                  <li>• <code>medium</code> = 50</li>
                  <li>• <code>low</code> = 25</li>
                </ul>

                <div className="bg-cyan-100 rounded p-3 mt-3">
                  <p className="text-xs font-medium mb-2">📝 Exemples :</p>
                  <ul className="text-xs space-y-1">
                    <li>• Critical (100) avec 5 pts → 100/5 = <strong>20</strong> (ROI exceptionnel)</li>
                    <li>• High (75) avec 8 pts → 75/8 = <strong>9.4</strong> (Bon ROI)</li>
                    <li>• Medium (50) avec 2 pts → 50/2 = <strong>25</strong> (ROI exceptionnel)</li>
                    <li>• Low (25) avec 13 pts → 25/13 = <strong>1.9</strong> (Faible ROI)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎯 Détermination du Quadrant</h3>
              <p className="text-sm text-gray-700 mb-3">
                Algorithme de classification automatique basé sur les seuils :
              </p>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-white rounded border border-teal-200 p-3">
                  <p className="font-mono text-xs mb-2">Seuils :</p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• <code>highImportance</code> = IMPORTANCE_SCORES[need.importance] &gt;= 3</li>
                    <li>• <code>lowEffort</code> = effortScore &gt; 0 && effortScore &lt;= 3</li>
                  </ul>
                </div>

                <div className="bg-white rounded border border-teal-200 p-3">
                  <p className="font-mono text-xs mb-2">Logique de classification :</p>
                  <div className="font-mono text-xs space-y-1">
                    <div>if (effortScore === 0) → <strong>'fillIns'</strong> (non estimé)</div>
                    <div>else if (highImportance && lowEffort) → <strong>'quickWins'</strong></div>
                    <div>else if (highImportance && !lowEffort) → <strong>'strategic'</strong></div>
                    <div>else if (!highImportance && lowEffort) → <strong>'fillIns'</strong></div>
                    <div>else → <strong>'timeSinks'</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Structure de données enrichies */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Structure de données enrichies</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">📋 Objet enrichedNeed</h3>
            <p className="text-sm text-gray-700 mb-3">
              Chaque besoin est enrichi avec une propriété <code>enrichment</code> contenant toutes les métadonnées calculées :
            </p>

            <div className="bg-white rounded border border-gray-300 p-4 font-mono text-xs overflow-x-auto">
              <div className="space-y-1">
                <div>{'{'}</div>
                <div className="ml-4">...need, <span className="text-gray-500">// Données originales du besoin</span></div>
                <div className="ml-4">enrichment: {'{'}</div>
                
                <div className="ml-8 text-cyan-600">// Scores</div>
                <div className="ml-8">impactScore: <span className="text-green-600">number</span>, <span className="text-gray-500">// 0-100+</span></div>
                <div className="ml-8">effortScore: <span className="text-green-600">number</span>, <span className="text-gray-500">// 0-21</span></div>
                <div className="ml-8">businessValue: <span className="text-green-600">number</span>, <span className="text-gray-500">// 25/50/75/100</span></div>
                <div className="ml-8">valueEffortRatio: <span className="text-green-600">string</span>, <span className="text-gray-500">// "X.XX" ou "N/A"</span></div>
                
                <div className="ml-8 text-cyan-600 mt-2">// État</div>
                <div className="ml-8">age: <span className="text-green-600">number</span>, <span className="text-gray-500">// Jours depuis création</span></div>
                <div className="ml-8">isAddressed: <span className="text-green-600">boolean</span>, <span className="text-gray-500">// Au moins 1 story</span></div>
                <div className="ml-8">isFullyAddressed: <span className="text-green-600">boolean</span>, <span className="text-gray-500">// Toutes stories done</span></div>
                
                <div className="ml-8 text-cyan-600 mt-2">// Priorisation</div>
                <div className="ml-8">quadrant: <span className="text-green-600">string</span>, <span className="text-gray-500">// quickWins|strategic|fillIns|timeSinks</span></div>
                <div className="ml-8">recommendedAction: <span className="text-green-600">string</span>, <span className="text-gray-500">// Action suggérée</span></div>
                
                <div className="ml-8 text-cyan-600 mt-2">// Informations liées</div>
                <div className="ml-8">product: {'{'} id, code, name, color {'}'},</div>
                <div className="ml-8">primaryContact: {'{'} id, name, type, role {'}'},</div>
                <div className="ml-8">stakeholders: {'['} {'{'} id, name, type, role {'}'} {']'},</div>
                <div className="ml-8">stakeholderCount: <span className="text-green-600">number</span>,</div>
                
                <div className="ml-8 text-cyan-600 mt-2">// Stories liées</div>
                <div className="ml-8">linkedStories: {'['} {'{'} id, title, status, priority {'}'} {']'},</div>
                <div className="ml-8">storyMetrics: {'{'}</div>
                <div className="ml-12">total: <span className="text-green-600">number</span>,</div>
                <div className="ml-12">completed: <span className="text-green-600">number</span>,</div>
                <div className="ml-12">inProgress: <span className="text-green-600">number</span>,</div>
                <div className="ml-12">coverage: <span className="text-green-600">string</span> <span className="text-gray-500">// Pourcentage</span></div>
                <div className="ml-8">{'}'}</div>
                
                <div className="ml-4">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Utilisation du module */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Utilisation du module</h2>

          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">1️⃣ Composant QuadrantCard</h3>
              <p className="text-sm text-gray-700 mb-3">
                Composant interne qui affiche un quadrant avec ses besoins. Paramètres :
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-6">
                <li>• <code>title</code> : Titre du quadrant</li>
                <li>• <code>description</code> : Description (Importance/Effort)</li>
                <li>• <code>color</code> : Classes CSS de couleur (bordure + fond)</li>
                <li>• <code>needs</code> : Tableau de besoins enrichis</li>
                <li>• <code>icon</code> : Emoji représentatif</li>
                <li>• <code>tip</code> : Conseil contextuel</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">2️⃣ Composant NeedCard</h3>
              <p className="text-sm text-gray-700 mb-3">
                Utilise le composant harmonisé <code>BoardCard</code> avec :
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-6">
                <li>• Badge produit coloré (code + couleur du produit)</li>
                <li>• Badge nombre de stories liées (si &gt; 0)</li>
                <li>• Objectif du besoin (line-clamp-3)</li>
                <li>• Bouton "Voir détails" (ouvre modal UserNeedDetail)</li>
                <li>• Opacité réduite si besoin adressé (isAddressed)</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">3️⃣ Filtrage et organisation</h3>
              <p className="text-sm text-gray-700 mb-3">
                Le composant utilise <code>useMemo</code> pour calculer les quadrants :
              </p>
              <div className="bg-white rounded border border-cyan-200 p-3 font-mono text-xs">
                <div>const quadrants = useMemo(() ={'>'} {'{'}</div>
                <div className="ml-4">const filtered = filterEnrichedNeeds(enrichedNeeds, {'{'}</div>
                <div className="ml-8">productId: productFilter !== 'all' ? productFilter : undefined</div>
                <div className="ml-4">{'}'});</div>
                <div className="ml-4 mt-2">return {'{'}</div>
                <div className="ml-8">quickWins: filtered.filter(n ={'>'} n.enrichment.quadrant === 'quickWins'),</div>
                <div className="ml-8">strategic: filtered.filter(n ={'>'} n.enrichment.quadrant === 'strategic'),</div>
                <div className="ml-8">fillIns: filtered.filter(n ={'>'} n.enrichment.quadrant === 'fillIns'),</div>
                <div className="ml-8">timeSinks: filtered.filter(n ={'>'} n.enrichment.quadrant === 'timeSinks')</div>
                <div className="ml-4">{'}'}</div>
                <div>{'}'}, [enrichedNeeds, productFilter]);</div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">4️⃣ États vides et dépendances</h3>
              <p className="text-sm text-gray-700 mb-3">
                Le module gère 4 types d'états vides dans l'ordre de priorité :
              </p>
              <ol className="text-sm text-gray-700 space-y-2 ml-6">
                <li>
                  <span className="font-medium">1. Dépendance manquante :</span> 
                  <div className="text-xs ml-4 mt-1">Vérifie qu'au moins un produit existe (via checkModuleDependencies)</div>
                </li>
                <li>
                  <span className="font-medium">2. Filtres actifs :</span>
                  <div className="text-xs ml-4 mt-1">Aucun besoin ne correspond aux filtres → Bouton "Réinitialiser"</div>
                </li>
                <li>
                  <span className="font-medium">3. État vide normal :</span>
                  <div className="text-xs ml-4 mt-1">Aucun besoin créé → Bouton "Aller à Besoins"</div>
                </li>
                <li>
                  <span className="font-medium">4. Affichage normal :</span>
                  <div className="text-xs ml-4 mt-1">Affiche la FilterBar et la grille des 4 quadrants</div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Filtres disponibles</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔍 Filtrage par produit</h3>
              <p className="text-sm text-gray-700 mb-2">
                État : <code>productFilter</code> (state local, valeur par défaut : 'all')
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Emplacement : <code>topLeftContent</code> de la FilterBar (toujours visible)
              </p>
              <p className="text-sm text-gray-700">
                Utilise <code>filterEnrichedNeeds()</code> avec paramètre <code>productId</code>
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📊 Compteur de résultats</h3>
              <p className="text-sm text-gray-700">
                Affiche le nombre de besoins filtrés sur le total dans la section repliable :
              </p>
              <div className="bg-white rounded border border-cyan-200 p-3 font-mono text-xs mt-2">
                Object.values(quadrants).flat().length besoin(s) affiché(s) sur userNeeds.length
              </div>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📋 Module Besoins Utilisateurs</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Source principale :</span> RICE dépend entièrement des besoins utilisateurs.
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-6">
                <li>• Champs utilisés : importance, storyPoints, productId, stakeholderIds, primaryContactId</li>
                <li>• Modification dans Besoins → Recalcul automatique du quadrant</li>
                <li>• Navigation possible via EmptyState si aucun besoin</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎲 Module Planning Poker</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Pré-requis obligatoire :</span> Les Story Points doivent être estimés.
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-6">
                <li>• Champ <code>storyPoints</code> rempli en session Planning Poker</li>
                <li>• Sans Story Points → Besoin classé en Fill-ins (effort = 0)</li>
                <li>• Mise à jour des Story Points → Recalcul automatique du quadrant</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📝 Module User Stories</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Lien bidirectionnel :</span> Les stories sont liées aux besoins.
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-6">
                <li>• Champ <code>linkedNeedIds</code> dans les stories</li>
                <li>• Badge nombre de stories liées affiché sur chaque carte</li>
                <li>• Calcul <code>isAddressed</code> basé sur l'existence de stories</li>
                <li>• Opacité réduite pour besoins adressés</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module MoSCoW</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Complémentaire :</span> RICE analyse → MoSCoW organise.
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-6">
                <li>• RICE suggère les priorités MoSCoW via quadrants</li>
                <li>• Quick Wins → SHOULD (ou MUST si critical)</li>
                <li>• Strategic → MUST (toujours)</li>
                <li>• Fill-ins → COULD</li>
                <li>• Time Sinks → WON'T (par défaut)</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Filtrage :</span> Permet de visualiser les besoins par produit.
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-6">
                <li>• Badge produit coloré sur chaque carte (code + couleur)</li>
                <li>• Filtre par produit dans la FilterBar</li>
                <li>• Dépendance obligatoire : au moins 1 produit requis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conseils pratiques */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-600 flex-shrink-0" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Conseils Pratiques</h2>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>🎯 <span className="font-medium">Enrichissement systématique :</span> Toujours passer par enrichNeeds() avant d'afficher les besoins</li>
              <li>⚡ <span className="font-medium">Performance :</span> Le calcul des quadrants est mémoïsé (useMemo) pour éviter les recalculs inutiles</li>
              <li>📊 <span className="font-medium">Story Points obligatoires :</span> Sans estimation, les besoins ne peuvent pas être correctement classés</li>
              <li>🔄 <span className="font-medium">Recalcul automatique :</span> Modification importance/effort → nouveau quadrant calculé instantanément</li>
              <li>🎨 <span className="font-medium">BoardCard harmonisé :</span> Utilise le composant standard pour cohérence UI</li>
              <li>📱 <span className="font-medium">Responsive :</span> Grille 2 colonnes (desktop) / 1 colonne (mobile) via grid-cols-1 lg:grid-cols-2</li>
              <li>🔍 <span className="font-medium">Modal détaillé :</span> Clic sur un besoin → UserNeedDetail avec toutes les infos</li>
              <li>💾 <span className="font-medium">États vides gérés :</span> 4 niveaux de vérification avant affichage</li>
            </ul>
          </div>
        </div>

        {/* Formules et constantes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Formules et constantes</h2>
          
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📊 IMPORTANCE_SCORES</h3>
              <div className="bg-white rounded border border-emerald-200 p-3 font-mono text-xs">
                <div>const IMPORTANCE_SCORES = {'{'}</div>
                <div className="ml-4">critical: 4,</div>
                <div className="ml-4">high: 3,</div>
                <div className="ml-4">medium: 2,</div>
                <div className="ml-4">low: 1</div>
                <div>{'}'};</div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💰 IMPORTANCE_TO_VALUE</h3>
              <div className="bg-white rounded border border-cyan-200 p-3 font-mono text-xs">
                <div>const IMPORTANCE_TO_VALUE = {'{'}</div>
                <div className="ml-4">critical: 100,</div>
                <div className="ml-4">high: 75,</div>
                <div className="ml-4">medium: 50,</div>
                <div className="ml-4">low: 25</div>
                <div>{'}'};</div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎯 Seuils de classification</h3>
              <div className="bg-white rounded border border-green-200 p-3 space-y-1 text-xs">
                <p><code>highImportance</code> = IMPORTANCE_SCORES[need.importance] &gt;= 3</p>
                <p><code>lowEffort</code> = effortScore &gt; 0 && effortScore &lt;= 3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer avec lien vers version utilisateur */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">📘 Vous cherchez une version simplifiée ?</h3>
              <p className="text-sm text-gray-700">
                Un <span className="font-medium">guide utilisateur</span> plus court et pédagogique est disponible pour les Product Owners 
                qui veulent juste apprendre à utiliser le module.
              </p>
            </div>
            {onSwitchToUser && (
              <button
                onClick={onSwitchToUser}
                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-md whitespace-nowrap ml-4"
              >
                <Users size={20} />
                Voir le Guide Utilisateur
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RiceDetailPage;
