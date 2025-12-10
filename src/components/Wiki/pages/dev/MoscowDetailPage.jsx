import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * MoscowDetailPage - Documentation TECHNIQUE du Module Vue Priorités MoSCoW
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const MoscowDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Vue Priorités MoSCoW</h1>
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
              Le <strong>Module Vue Priorités MoSCoW</strong> est une vue Kanban spécialisée qui organise 
              les besoins utilisateurs selon leur niveau de priorité. Il offre une visualisation claire 
              des besoins à traiter en urgence et permet de prendre des décisions de priorisation éclairées.
            </p>
            <p>
              Cette vue fonctionne de maniÃ¨re <strong>100% offline</strong> et s'intÃ¨gre directement avec 
              le module Besoins Utilisateurs. Elle ne crée ni ne modifie directement les besoins, mais 
              permet de les visualiser et d'accéder rapidement aux formulaires de modification.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🔴 Priorité Critique</h3>
              <p className="text-sm text-gray-700 mb-3">
                Besoins bloquants ou d'urgence absolue. Sans ces fonctionnalités, le produit ne peut pas fonctionner.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Code :</span> "critical"</p>
                <p><span className="font-medium">Couleur :</span> #EF4444 (rouge)</p>
                <p><span className="font-medium">Usage :</span> 10-15% maximum des besoins</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🟠 Priorité Haute</h3>
              <p className="text-sm text-gray-700 mb-3">
                Besoins très importants à traiter rapidement, généralement dans le prochain sprint.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Code :</span> "high"</p>
                <p><span className="font-medium">Couleur :</span> #F97316 (orange)</p>
                <p><span className="font-medium">Usage :</span> Valeur ajoutée forte et urgence confirmée</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🟡 Priorité Moyenne</h3>
              <p className="text-sm text-gray-700 mb-3">
                Besoins souhaitables mais pouvant attendre. Valeur ajoutée modérée.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Code :</span> "medium"</p>
                <p><span className="font-medium">Couleur :</span> #EAB308 (jaune)</p>
                <p><span className="font-medium">Usage :</span> Majorité des besoins en backlog</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚪ Priorité Basse</h3>
              <p className="text-sm text-gray-700 mb-3">
                Besoins "nice-to-have" de faible priorité, à traiter si temps disponible.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Code :</span> "low"</p>
                <p><span className="font-medium">Couleur :</span> #6B7280 (gris)</p>
                <p><span className="font-medium">Usage :</span> Améliorations futures non urgentes</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> La méthode MoSCoW originale (Must have, Should have, 
              Could have, Won't have) a été adaptée pour plus de clarté avec les termes Critical, High, 
              Medium, Low. Le champ importance du modèle UserNeed contient ces valeurs.
            </p>
          </div>
        </div>

        {/* Architecture */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture et Composants</h2>

          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📁 Structure des fichiers</h3>
              <div className="bg-white rounded border border-gray-300 p-3 mb-3">
                <code className="text-xs block space-y-1">
                  <div>src/components/Moscow/</div>
                  <div className="ml-4">├── Moscow.jsx (composant principal)</div>
                  <div className="ml-4">└── index.js (export)</div>
                </code>
              </div>
              <p className="text-sm text-gray-700">
                Le module est autonome et s'appuie sur les composants partagés BoardCard, FilterBar, 
                ProductSelector, et EmptyState. Il réutilise UserNeedForm et UserNeedDetail du module UserNeeds.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎨 Composants utilisés</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="font-medium">BoardCard :</span> Carte harmonisée pour affichage des besoins avec badges et actions</li>
                <li><span className="font-medium">FilterBar :</span> Barre de filtres repliable avec gestion des filtres actifs</li>
                <li><span className="font-medium">ProductSelector :</span> Sélecteur de produit toujours visible</li>
                <li><span className="font-medium">EmptyState :</span> États vides avec gestion des dépendances</li>
                <li><span className="font-medium">UserNeedDetail :</span> Modal de visualisation détaillée (lecture seule)</li>
                <li><span className="font-medium">UserNeedForm :</span> Formulaire d'édition complet</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Props du composant</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-white rounded border border-gray-300 p-3">
                  <p className="font-medium mb-2">Props requises :</p>
                  <ul className="space-y-1 ml-4 list-disc text-xs">
                    <li><code>userNeeds</code> : Array - Liste des besoins utilisateurs</li>
                    <li><code>userStories</code> : Array - Liste des user stories (pour couverture)</li>
                    <li><code>contacts</code> : Array - Liste des contacts (stakeholders)</li>
                    <li><code>personas</code> : Array - Liste des personas</li>
                    <li><code>products</code> : Array - Liste des produits</li>
                    <li><code>onUpdateNeed</code> : Function - Callback de mise à jour</li>
                    <li><code>onCreateStory</code> : Function - Callback création story</li>
                    <li><code>onNavigate</code> : Function - Navigation inter-modules</li>
                  </ul>
                </div>
                <div className="bg-white rounded border border-gray-300 p-3">
                  <p className="font-medium mb-2">Props optionnelles :</p>
                  <ul className="space-y-1 ml-4 list-disc text-xs">
                    <li><code>interviews</code> : Array - Liste des entretiens (default: [])</li>
                    <li><code>Objectives</code> : Array - Liste des objectifs (default: [])</li>
                    <li><code>showTips</code> : Boolean - Affichage module conseils (default: false)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logique métier */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Logique Métier</h2>

          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔄 Système de filtrage</h3>
              <p className="text-sm text-gray-700 mb-3">
                Le filtrage se fait en cascade via useMemo pour optimiser les performances :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><span className="font-medium">Filtre Produit :</span> Filtre par productId du besoin</li>
                <li><span className="font-medium">Filtre Stakeholder :</span> Recherche dans stakeholderIds[], primaryContactId et contactId</li>
                <li><span className="font-medium">Filtre Couverture :</span> Vérifie si des stories sont liées (linkedNeedId)</li>
                <li><span className="font-medium">Filtre Importance :</span> Filtre par valeur du champ importance</li>
              </ol>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📊 Regroupement par priorité</h3>
              <p className="text-sm text-gray-700 mb-3">
                Les besoins filtrés sont ensuite regroupés dans un objet avec 4 clés (critical, high, medium, low). 
                Chaque groupe est trié par date de création décroissante (plus récents en premier).
              </p>
              <div className="bg-white rounded border border-gray-300 p-3">
                <code className="text-xs block">
                  needsByPriority = {'{'} critical: [...], high: [...], medium: [...], low: [...] {'}'}
                </code>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔗 Relations et dépendances</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>📖 <span className="font-medium">Stories liées :</span> getLinkedStories() filtre userStories par linkedNeedId</li>
                <li>👤 <span className="font-medium">Persona lié :</span> getLinkedPersona() recherche par personaId</li>
                <li>🎤 <span className="font-medium">Entretien source :</span> getSourceInterview() trouve l'entretien contenant le needId dans linkedNeedIds[]</li>
                <li>📦 <span className="font-medium">Produit :</span> getProduct() retourne l'objet produit complet</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">👥 Collecte des stakeholders</h3>
              <p className="text-sm text-gray-700 mb-2">
                Extraction de tous les stakeholders uniques depuis les besoins pour alimenter le filtre :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Parcourt tous les userNeeds</li>
                <li>Collecte stakeholderIds[], primaryContactId, contactId</li>
                <li>Déduplique avec Set</li>
                <li>Résout les contacts complets depuis l'array contacts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interface utilisateur */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interface Utilisateur</h2>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Module Conseils (showTips)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Module pédagogique affiché si showTips=true, contenant 5 sections :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>🎯 Méthode MoSCoW - Explication des 4 niveaux de priorité</li>
                <li>🔍 Actions rapides - Raccourcis et interactions clés</li>
                <li>📊 Filtres puissants - Guide d'utilisation des filtres</li>
                <li>🔍 Identifier les gaps - Comment trouver les besoins non couverts</li>
                <li>💡 Bonnes pratiques - Conseils de priorisation</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔧 FilterBar</h3>
              <p className="text-sm text-gray-700 mb-2">
                Barre de filtres repliable avec 3 composants principaux :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li><span className="font-medium">topLeftContent :</span> ProductSelector (toujours visible)</li>
                <li><span className="font-medium">filters :</span> Stakeholder et Couverture Stories (repliables)</li>
                <li><span className="font-medium">hasActiveFilters :</span> Badge rouge si filtres actifs avec bouton "Réinitialiser"</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Colonnes Kanban</h3>
              <p className="text-sm text-gray-700 mb-3">
                Layout responsive en 4 colonnes (1 col mobile, 2 tablette, 4 desktop). Chaque colonne contient :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li><span className="font-medium">Header :</span> Icon emoji, Label, Badge compteur, Description</li>
                <li><span className="font-medium">Body :</span> Liste scrollable des cartes besoins (maxHeight calc)</li>
                <li><span className="font-medium">Empty :</span> Message "Aucun besoin" si colonne vide</li>
              </ul>
              <div className="mt-3 bg-white rounded border border-cyan-200 p-2">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Style dynamique :</span> Couleurs de fond, bordures et badges 
                  définies par priorityColumns (bgColor, borderColor, color)
                </p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎴 NeedCard (BoardCard)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Composant carte utilisant BoardCard standardisé avec :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li><span className="font-medium">Badge produit :</span> Code produit avec couleur du produit</li>
                <li><span className="font-medium">Contenu :</span> Objectif du besoin (line-clamp-3)</li>
                <li><span className="font-medium">Action :</span> Bouton Eye (👁️) pour ouvrir UserNeedDetail</li>
              </ul>
            </div>
          </div>
        </div>

        {/* États et modals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">États et Modals</h2>

          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📝 États React locaux</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-white rounded border border-gray-300 p-3">
                  <code className="text-xs block space-y-1">
                    <div>const [productFilter, setProductFilter] = useState('all');</div>
                    <div>const [stakeholderFilter, setStakeholderFilter] = useState('all');</div>
                    <div>const [coverageFilter, setCoverageFilter] = useState('all');</div>
                    <div>const [filterImportance, setFilterImportance] = useState('all');</div>
                    <div>const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);</div>
                    <div>const [editingNeed, setEditingNeed] = useState(null);</div>
                    <div>const [viewingNeed, setViewingNeed] = useState(null);</div>
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">👁️ Modal ViewNeedModal</h3>
              <p className="text-sm text-gray-700 mb-2">
                Wrapper autour de UserNeedDetail pour affichage en lecture seule :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Ouvre UserNeedDetail avec tous les props nécessaires</li>
                <li>Bouton "Modifier" ferme le modal et ouvre UserNeedForm</li>
                <li>Navigation inter-modules possible via onNavigate</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">✏️ Modal UserNeedForm</h3>
              <p className="text-sm text-gray-700 mb-2">
                Formulaire d'édition déclenché depuis ViewNeedModal :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Reçoit editingNeed comme prop</li>
                <li>onSubmit appelle onUpdateNeed puis ferme le modal</li>
                <li>onCancel ferme le modal sans sauvegarder</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚠️ États vides (EmptyState)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Gestion intelligente en 4 niveaux de priorité :
              </p>
              <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
                <li><span className="font-medium">Dépendance manquante :</span> Vérifie products.length via checkModuleDependencies</li>
                <li><span className="font-medium">Filtres actifs :</span> Si userNeeds.length &gt; 0 mais filteredNeeds vide → Bouton "Réinitialiser"</li>
                <li><span className="font-medium">État vide normal :</span> Si aucun besoin créé → Message standard</li>
                <li><span className="font-medium">Affichage colonnes :</span> Si besoins existent → Affiche Kanban</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Intégration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>

          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module Besoins Utilisateurs</h3>
              <p className="text-sm text-gray-700">
                Dépendance forte : utilise directement la liste userNeeds et affiche via UserNeedDetail/UserNeedForm. 
                Modification via onUpdateNeed remonte au parent pour persistance.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                Lecture seule : consulte userStories pour calculer la couverture des besoins. 
                Filtre "Avec/Sans stories" basé sur la présence de linkedNeedId.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700">
                Dépendance critique : vérifie products.length avant affichage. 
                ProductSelector filtre par productId des besoins.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                Lecture : résolution des stakeholders pour filtre et affichage dans UserNeedDetail.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎭 Module Personas</h3>
              <p className="text-sm text-gray-700">
                Lecture : affichage du persona lié dans UserNeedDetail si personaId défini.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎤 Module Entretiens</h3>
              <p className="text-sm text-gray-700">
                Lecture : affichage de l'entretien source dans UserNeedDetail si lien existant.
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
              <li>🎨 <span className="font-medium">Design System :</span> Ce module respecte le BoardCard standardisé - ne pas créer de variantes custom</li>
              <li>⚡ <span className="font-medium">Performance :</span> useMemo pour filteredNeeds et needsByPriority évite les recalculs inutiles</li>
              <li>🔄 <span className="font-medium">Réactivité :</span> Les besoins se mettent à jour automatiquement quand userNeeds change (props)</li>
              <li>🎯 <span className="font-medium">Props validation :</span> Toujours vérifier la présence de products avant d'afficher</li>
              <li>📊 <span className="font-medium">Calcul compteurs :</span> needsCount calculé dynamiquement par colonne pour éviter les incohérences</li>
              <li>🎭 <span className="font-medium">États modaux :</span> Un seul modal actif à la fois (viewingNeed XOR editingNeed)</li>
              <li>🔗 <span className="font-medium">Navigation :</span> onNavigate permet de passer d'un module à l'autre depuis UserNeedDetail</li>
              <li>🎨 <span className="font-medium">Responsive :</span> Layout adaptatif 1/2/4 colonnes selon taille écran via grid Tailwind</li>
            </ul>
          </div>
        </div>

        {/* Configuration technique */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration Technique</h2>

          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎨 Configuration des colonnes</h3>
              <p className="text-sm text-gray-700 mb-3">
                L'objet priorityColumns définit l'apparence et le comportement de chaque colonne :
              </p>
              <div className="bg-white rounded border border-gray-300 p-3 overflow-x-auto">
                <code className="text-xs block space-y-1">
                  <div>{'{'}</div>
                  <div>  id: 'critical',</div>
                  <div>  label: 'Critique',</div>
                  <div>  color: '#EF4444',        // Badge compteur</div>
                  <div>  bgColor: '#FEE2E2',      // Fond colonne</div>
                  <div>  borderColor: '#DC2626',  // Bordures</div>
                  <div>  icon: '🔴',</div>
                  <div>  description: 'À traiter en urgence'</div>
                  <div>{'}'}</div>
                </code>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📐 Dimensions et layout</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="font-medium">Hauteur colonnes :</span> maxHeight: calc(100vh - 450px), minHeight: 300px</li>
                <li><span className="font-medium">Grid responsive :</span> grid-cols-1 md:grid-cols-2 lg:grid-cols-4</li>
                <li><span className="font-medium">Gaps :</span> gap-3 sm:gap-4 entre colonnes et cartes</li>
                <li><span className="font-medium">Padding :</span> p-3 sm:p-4 md:p-6 lg:p-8 pour le container principal</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔧 Dépendances npm</h3>
              <p className="text-sm text-gray-700 mb-2">Imports depuis Lucide React :</p>
              <div className="bg-white rounded border border-gray-300 p-2">
                <code className="text-xs">
                  User, ExternalLink, ListChecks, MessageSquare, Eye, Lightbulb, AlertCircle
                </code>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Persistance des données</h3>
              <p className="text-sm text-gray-700">
                Ce module ne gère PAS la persistance directement. Les modifications via onUpdateNeed 
                remontent au parent (AppContent) qui persiste dans localStorage via le Factory Pattern Storage.
              </p>
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
                qui veulent juste apprendre à utiliser la vue MoSCoW.
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

export default MoscowDetailPage;
