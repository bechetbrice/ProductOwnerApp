import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * PlanningPokerDetailPage - Documentation TECHNIQUE du Module Planning Poker
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const PlanningPokerDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">🎲 Documentation Technique - Module Planning Poker</h1>
              <p className="text-teal-100">Version complète pour développeurs et IA • v1.0.0</p>
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
              Le <strong>Module Planning Poker</strong> permet l'estimation collaborative de la complexité 
              des besoins utilisateurs en utilisant l'échelle de Fibonacci. Le module implémente la technique 
              Agile du Planning Poker pour assigner des Story Points (1, 2, 3, 5, 8, 13, 21) aux besoins.
            </p>
            <p>
              L'interface présente un layout <strong>3 colonnes style MoSCoW</strong> : 
              Besoins à estimer (amber) | Zone de sélection centrale (white) | Besoins estimés (green). 
              Le module propose une <strong>auto-sélection</strong> du besoin suivant après chaque estimation 
              pour optimiser le workflow d'équipe.
            </p>
            <p>
              Le module fonctionne en <strong>lecture/écriture sur le champ storyPoints</strong> des besoins. 
              Il filtre par produit, trie par importance (pour les non estimés) et par points (pour les estimés). 
              Les modifications sont persistées via onUpdateNeed fourni par le contexte parent.
            </p>
          </div>
        </div>

        {/* Architecture et composants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture et Composants</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📦 Composant Principal</h3>
              <p className="text-sm text-gray-700 mb-3">
                <strong>PlanningPoker.jsx</strong> (640 lignes) - Composant fonctionnel avec hooks
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">Props reçues :</span> userNeeds, contacts, products, personas, userStories, interviews, Objectives, onUpdateNeed, onNavigate, showTips</p>
                <p><span className="font-medium">États locaux :</span> selectedNeedId, selectedCard, productFilter, viewingNeed, isFiltersExpanded</p>
                <p><span className="font-medium">Dépendances :</span> EmptyState, BoardCard (ui/), FilterBar, ProductSelector (Common/), UserNeedDetail, checkModuleDependencies</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Sous-composants internes</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <p className="font-medium">NeedCard</p>
                  <p className="text-xs text-gray-600">
                    Wrapper autour de BoardCard avec badges (produit, story points) et actions (Eye, RotateCcw). 
                    Props: need, isSelected, onClick, showEstimation, onReestimate
                  </p>
                </div>
                <div>
                  <p className="font-medium">ViewNeedModal</p>
                  <p className="text-xs text-gray-600">
                    Modal de visualisation utilisant UserNeedDetail avec getters (getContactById, getLinkedStories, getSourceInterview). 
                    Props: need, onClose
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎴 Cartes Fibonacci</h3>
              <p className="text-sm text-gray-700 mb-2">
                Tableau fibonacciCards avec 8 objets (value, label, color, description) :
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>❓ null - bg-gray-200 - Réinitialiser</div>
                <div>1 - bg-green-100 - Très faible</div>
                <div>2 - bg-green-100 - Faible</div>
                <div>3 - bg-yellow-100 - Moyen</div>
                <div>5 - bg-orange-100 - Élevé</div>
                <div>8 - bg-red-100 - Très élevé</div>
                <div>13 - bg-emerald-100 - Complexe</div>
                <div>21 - bg-gray-800 text-white - Très complexe</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logique métier */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Logique Métier</h2>

          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🧮 useMemo - Séparation estimés/non estimés</h3>
              <p className="text-sm text-gray-700 mb-2">
                Calcul mémorisé basé sur userNeeds et productFilter :
              </p>
              <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
                <li>Copie userNeeds → allNeeds</li>
                <li>Si productFilter !== 'all' → filter par need.productId</li>
                <li><strong>unestimated</strong> : filter(!need.storyPoints) + sort par importance (critical=4 → low=1)</li>
                <li><strong>estimated</strong> : filter(need.storyPoints) + sort par storyPoints décroissant</li>
                <li>Return {`{ unestimatedNeeds, estimatedNeeds }`}</li>
              </ol>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚡ handleCardClick - Estimation et auto-sélection</h3>
              <p className="text-sm text-gray-700 mb-2">Workflow complet en 5 étapes :</p>
              <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
                <li>Guard clause : if (!selectedNeedId) return</li>
                <li>setSelectedCard(card.value) - feedback visuel immédiat</li>
                <li>onUpdateNeed(selectedNeedId, {`{ storyPoints: card.value }`}) - persistence</li>
                <li>setTimeout 500ms : trouver index besoin actuel dans unestimatedNeeds</li>
                <li>Si nextUnestimated existe → setSelectedNeedId + reset selectedCard, sinon → reset tout</li>
              </ol>
              <div className="mt-2 bg-white border border-cyan-200 rounded p-2">
                <p className="text-xs text-cyan-900">
                  <span className="font-medium">💡 Astuce :</span> Le délai de 500ms permet à l'utilisateur 
                  de voir l'animation de sélection de carte avant le changement de contexte
                </p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔄 handleReestimate - Modification d'une estimation</h3>
              <p className="text-sm text-gray-700 mb-2">
                Permet de réestimer un besoin déjà évalué depuis la colonne "Besoins estimés" :
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>Reçoit le besoin à réestimer</li>
                <li>setSelectedNeedId(need.id) - le besoin devient actif en zone centrale</li>
                <li>setSelectedCard(null) - reset sélection de carte précédente</li>
                <li>L'utilisateur peut alors cliquer sur une nouvelle carte Fibonacci</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 États vides et dépendances</h3>
              <p className="text-sm text-gray-700 mb-2">
                IIFE (Immediately Invoked Function Expression) dans le render pour gérer 4 cas :
              </p>
              <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
                <li><strong>checkModuleDependencies</strong> : vérifie products.length, affiche EmptyState si manquant</li>
                <li><strong>Filtres actifs</strong> : si totalFiltered === 0 ET userNeeds.length &gt; 0 → EmptyState "Réinitialiser filtres"</li>
                <li><strong>État vide</strong> : si userNeeds.length === 0 → EmptyState "Aller à Besoins"</li>
                <li><strong>Affichage normal</strong> : render complet avec FilterBar + layout 3 colonnes</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Interface utilisateur */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interface Utilisateur</h2>

          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Module Conseils (showTips)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Div gradient yellow-to-amber avec 5 cartes explicatives en grid responsive (1 col mobile → 2 cols desktop) :
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>🎯 Qu'est-ce que le Planning Poker ? (border-teal-500)</li>
                <li>📊 Échelle de complexité (border-emerald-500)</li>
                <li>🔄 Bonnes pratiques (border-emerald-500)</li>
                <li>⚡ Utilisation du module (border-cyan-500)</li>
                <li>💡 Astuces avancées (border-yellow-500, col-span-2)</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔍 FilterBar standardisé</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Props utilisées :</p>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>isExpanded / onToggleExpand : contrôle repliage section filtres</li>
                  <li>hasActiveFilters : productFilter !== 'all'</li>
                  <li>onResetFilters : réinitialise productFilter à 'all'</li>
                  <li>topLeftContent : ProductSelector (toujours visible)</li>
                  <li>filters : compteur de résultats avec strong amber/green</li>
                </ul>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📐 Layout 3 colonnes responsive</h3>
              <p className="text-sm text-gray-700 mb-2">
                Grid grid-cols-1 lg:grid-cols-3 avec gap-4 sm:gap-6. Chaque colonne = flex flex-col :
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <div>
                  <p className="font-medium">Colonne 1 - Besoins à estimer (bg-amber-50)</p>
                  <p>Header : emoji ⏳ + titre + badge compteur amber-500</p>
                  <p>Corps : div overflow-y-auto, maxHeight calc(100vh - 450px), minHeight 300px</p>
                  <p>EmptyState si length === 0 : "🎉 Tous les besoins sont estimés !"</p>
                </div>
                <div>
                  <p className="font-medium">Colonne 2 - Zone de sélection (bg-white)</p>
                  <p>Besoin sélectionné : badge produit + objectif + bouton Eye</p>
                  <p>Cartes Fibonacci : grid-cols-4 avec boutons aspect-square</p>
                  <p>Guide : bg-cyan-50 avec liste échelle simplifiée</p>
                </div>
                <div>
                  <p className="font-medium">Colonne 3 - Besoins estimés (bg-green-50)</p>
                  <p>Header : emoji ✅ + titre + badge compteur green-500</p>
                  <p>Corps : NeedCard avec showEstimation=true et bouton RotateCcw</p>
                  <p>EmptyState si length === 0 : "Aucun besoin estimé"</p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎴 Cartes interactives</h3>
              <p className="text-sm text-gray-700 mb-2">
                Boutons avec classes conditionnelles complexes :
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>Base : aspect-square rounded-lg font-bold text-xl sm:text-2xl transition-all</li>
                <li>Couleur : card.color (varie selon valeur)</li>
                <li>Disabled : !selectedNeedId → opacity-50 cursor-not-allowed</li>
                <li>Enabled : hover:scale-110 hover:shadow-lg cursor-pointer</li>
                <li>Selected : selectedCard === card.value → ring-4 ring-teal-500 scale-110</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📊 Champ modifié : storyPoints</h3>
              <p className="text-sm text-gray-700 mb-2">
                Le module ne modifie QUE le champ storyPoints des besoins via onUpdateNeed :
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">Type :</span> number | null</p>
                <p><span className="font-medium">Valeurs autorisées :</span> null (non estimé), 1, 2, 3, 5, 8, 13, 21</p>
                <p><span className="font-medium">Modification :</span> onUpdateNeed(needId, {`{ storyPoints: value }`})</p>
                <p><span className="font-medium">Lecture :</span> need.storyPoints (falsy check pour filtrage)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique de tri</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🔢 <span className="font-medium">Besoins non estimés :</span> Tri par ordre importance (critical=4, high=3, medium=2, low=1) décroissant</li>
                <li>📊 <span className="font-medium">Besoins estimés :</span> Tri par storyPoints décroissant (21 → 1)</li>
                <li>🎯 <span className="font-medium">But :</span> Afficher les besoins critiques en premier, les plus complexes en haut</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Persistance</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les modifications sont sauvegardées automatiquement via le contexte parent :
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>onUpdateNeed appelé par handleCardClick après chaque estimation</li>
                <li>Le parent (AppContent) propage au contexte UserNeedsActions.update</li>
                <li>Factory Pattern Storage persiste dans localStorage["userNeeds"]</li>
                <li>Aucune manipulation localStorage directe dans le composant</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module Besoins Utilisateurs</h3>
              <p className="text-sm text-gray-700">
                Le Planning Poker modifie directement le champ storyPoints des besoins. 
                Les besoins sont affichés par importance (non estimés) et par complexité (estimés). 
                Navigation vers module Besoins via onNavigate('user-needs').
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700">
                Filtrage par produit via ProductSelector. Seuls les produits actifs sont affichés. 
                checkModuleDependencies vérifie qu'au moins un produit existe avant d'afficher le module.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                Utilisé dans UserNeedDetail pour afficher stakeholders et contact privilégié. 
                getContactById(contactId) pour résoudre les références contacts.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                getLinkedStories(needId) affiche les stories liées dans UserNeedDetail. 
                Les Story Points estimés peuvent être utilisés comme base pour l'estimation des stories.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎲 Module Matrice RICE</h3>
              <p className="text-sm text-gray-700">
                Les Story Points sont utilisés dans le calcul RICE comme indicateur d'Effort. 
                Score RICE = (Reach × Impact × Confidence) / Effort (Story Points).
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📋 Module Vue Priorités (MoSCoW)</h3>
              <p className="text-sm text-gray-700">
                Les besoins estimés sont affichés avec leurs Story Points dans les colonnes MoSCoW. 
                Combinaison importance (MoSCoW) + complexité (Story Points) pour priorisation optimale.
              </p>
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
              <li>🎯 <span className="font-medium">Auto-sélection optimisée :</span> Le délai de 500ms dans handleCardClick permet feedback visuel avant changement contexte</li>
              <li>⚡ <span className="font-medium">Tri intelligent :</span> Les non estimés sont triés par importance pour prioriser les critiques, les estimés par complexité pour visibilité immédiate</li>
              <li>🎴 <span className="font-medium">Cartes désactivées :</span> Les boutons Fibonacci sont disabled si aucun besoin sélectionné pour éviter erreurs UX</li>
              <li>🔄 <span className="font-medium">Réestimation facile :</span> Bouton RotateCcw sur chaque besoin estimé pour modifier rapidement une estimation</li>
              <li>📊 <span className="font-medium">useMemo essentiel :</span> La séparation estimés/non estimés est mémorisée pour éviter recalculs à chaque render</li>
              <li>🎨 <span className="font-medium">Style MoSCoW cohérent :</span> Les colonnes utilisent les mêmes couleurs que le module Vue Priorités (amber/white/green)</li>
              <li>📱 <span className="font-medium">Responsive grid :</span> grid-cols-1 lg:grid-cols-3 assure layout empilé mobile, côte-à-côte desktop</li>
              <li>🔍 <span className="font-medium">IIFE pour états vides :</span> Pattern IIFE dans render permet gestion élégante des 4 cas (dépendances/filtres/vide/normal)</li>
            </ul>
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

export default PlanningPokerDetailPage;
