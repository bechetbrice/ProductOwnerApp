import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * ObjectivesDetailPage - Documentation TECHNIQUE du Module Objectifs
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const ObjectivesDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">🎯 Documentation Technique - Module Objectifs</h1>
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
              Le <strong>Module Objectifs</strong> permet de définir et suivre les objectifs stratégiques de vos produits. 
              Il constitue le pont entre votre vision produit et l'exécution concrète via les besoins utilisateurs et user stories.
            </p>
            <p>
              Chaque objectif est associé à un produit actif et dispose d'un cycle de vie complet (Planifié → Actif → Terminé/Annulé). 
              Le module offre un système de priorisation à 4 niveaux (Critique/Haute/Moyenne/Basse), un suivi des dates d'échéance 
              avec alertes de retard, et la définition de critères de succès mesurables avec KPIs.
            </p>
            <p>
              L'intégration native avec les modules Besoins Utilisateurs et User Stories permet de tracer l'alignement stratégique 
              et de mesurer la progression des objectifs via les stories liées terminées.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Objectif Produit</h3>
              <p className="text-sm text-gray-700 mb-3">
                Déclaration de haut niveau définissant ce que le produit doit accomplir sur une période donnée. 
                Formulé selon la méthode SMART (Spécifique, Mesurable, Atteignable, Réaliste, Temporel).
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Champs obligatoires :</span> titre, description, productId</p>
                <p><span className="font-medium">Champs optionnels :</span> targetDate, successCriteria, kpis</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Cycle de Vie</h3>
              <p className="text-sm text-gray-700 mb-3">
                5 statuts possibles pour suivre l'évolution d'un objectif de sa conception à sa finalisation ou abandon.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Planifié :</span> Défini, pas encore démarré</p>
                <p><span className="font-medium">Actif :</span> En cours de réalisation</p>
                <p><span className="font-medium">Terminé :</span> Objectif atteint avec succès</p>
                <p><span className="font-medium">Annulé :</span> Abandonné (changement de priorités)</p>
                <p><span className="font-medium">Archivé :</span> Conservé pour historique</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Système de Priorité</h3>
              <p className="text-sm text-gray-700 mb-3">
                Classification à 4 niveaux permettant d'ordonner les objectifs selon leur impact business et leur urgence.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">🔴 Critique :</span> Impact majeur sur viabilité produit</p>
                <p><span className="font-medium">🟠 Haute :</span> Important pour stratégie produit</p>
                <p><span className="font-medium">🟡 Moyenne :</span> Amélioration notable, non urgente</p>
                <p><span className="font-medium">⚪ Basse :</span> Nice-to-have, faible impact</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📈 Métriques de Succès</h3>
              <p className="text-sm text-gray-700 mb-3">
                Définition des critères qualitatifs et quantitatifs permettant de mesurer l'atteinte de l'objectif.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Critères de succès :</span> Description qualitative de l'objectif atteint</p>
                <p><span className="font-medium">KPIs :</span> Indicateurs mesurables (chiffres, pourcentages, cibles)</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⏰ Alertes de Retard</h3>
              <p className="text-sm text-gray-700 mb-3">
                Système automatique de détection des objectifs dont la date d'échéance est dépassée.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Condition :</span> targetDate &lt; today ET status ≠ completed/cancelled</p>
                <p><span className="font-medium">Badge :</span> "⚠️ Retard" affiché sur la carte</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🔗 Traçabilité Stratégique</h3>
              <p className="text-sm text-gray-700 mb-3">
                Lien bidirectionnel entre objectifs, besoins utilisateurs et user stories pour assurer l'alignement stratégique.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">linkedGoalId :</span> Champ dans UserNeed et UserStory</p>
                <p><span className="font-medium">Visualisation :</span> Compteurs et liens dans ObjectiveDetail</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> Un objectif peut évoluer après création. Les dates d'échéance, 
              critères de succès et KPIs doivent être revus régulièrement pour refléter l'évolution du contexte business. 
              La suppression d'un objectif supprime automatiquement les relations avec besoins et stories (cascade delete).
            </p>
          </div>
        </div>

        {/* Utilisation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Utilisation pas-à-pas</h2>

          {/* Interface principale */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Interface Principale</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">💡 Module Conseils et astuces</p>
                <p className="text-sm text-gray-700 mb-2">
                  Module pédagogique optionnel (prop showTips) affichant 5 cartes de conseils :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>🎯 Définition d'objectifs : Méthode SMART, métriques, limite 3-5 objectifs actifs</li>
                  <li>📊 Cycle de vie : Explication des 5 statuts avec workflow recommandé</li>
                  <li>🎯 Priorisation : Guideline pour choisir le bon niveau de priorité</li>
                  <li>🔗 Traçabilité : Importance des liens avec besoins et stories</li>
                  <li>💡 Bonnes pratiques : Revue mensuelle, utilisation badge retard, célébration succès</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🗂️ Grille d'Objectifs Responsive</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation en 3 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile). Structure de carte :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Titre de l'objectif uniquement (CardHeader standardisé)</li>
                  <li><span className="font-medium">Corps :</span> Description (🎯 Objectif), Date d'échéance (📅) avec highlight si retard</li>
                  <li><span className="font-medium">Footer :</span> Badge produit + statut + priorité + badge retard (si applicable) + 3 boutons (Voir, Modifier, Supprimer)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📄 Pagination</p>
                <p className="text-sm text-gray-700">
                  9 objectifs par page. Composant Pagination réutilisable avec navigation Précédent/Suivant 
                  et compteur de résultats. Réinitialisation automatique à la page 1 lors du changement de filtre.
                </p>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🚫 États Vides Intelligents</p>
                <p className="text-sm text-gray-700 mb-2">
                  Système à 3 niveaux via EmptyState component :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Dépendance manquante :</span> Aucun produit actif → Message + lien module Produits</li>
                  <li><span className="font-medium">Filtres actifs :</span> Aucun résultat → Bouton "Réinitialiser les filtres"</li>
                  <li><span className="font-medium">Premier objectif :</span> Liste vide → Bouton "Créer votre premier objectif"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Filtres et actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Barre de Filtres et Actions</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔧 En-tête de la FilterBar (toujours visible)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Composant FilterBar standardisé avec sections topLeft et topRight :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Sélecteur Produit :</span> ProductSelector filtré sur produits actifs uniquement, avec compteur</li>
                  <li><span className="font-medium">Recherche globale :</span> Input avec icône Search, placeholder "Rechercher par titre, description..."</li>
                  <li><span className="font-medium">Nouvel Objectif :</span> Bouton gradient bleu-violet, icône Plus</li>
                  <li><span className="font-medium">Indicateur filtres :</span> Badge orange si filtres actifs + bouton "Réinitialiser"</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (Repliable)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Par défaut repliée. Grid 2 colonnes une fois dépliée :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Filtre Statut :</span> All / Planifiés / Actifs / Terminés / Annulés / Archivés</li>
                  <li><span className="font-medium">Filtre Tri :</span> Date de création (défaut) / Nom / Statut / Priorité</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  Logic: tri priorité utilise priorityOrder = {`{ critical: 0, high: 1, medium: 2, low: 3 }`}
                </p>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">⚙️ Logique de Filtrage</p>
                <p className="text-sm text-gray-700 mb-2">
                  useMemo pour performance optimale, filtrage en cascade :
                </p>
                <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
                  <li>Validation objectif (title présent)</li>
                  <li>Filtre produit (selectedProductId = 'all' ou match productId)</li>
                  <li>Recherche globale (titre.includes OU description.includes, case insensitive)</li>
                  <li>Filtre statut (statusFilter = 'all' ou match status)</li>
                  <li>Tri selon sortBy sélectionné</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Formulaire d'objectif */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Formulaire d'Objectif</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📝 Structure Générale</p>
                <p className="text-sm text-gray-700 mb-3">
                  FormModal plein écran avec FormHeader (aide contextuelle pliable), 6 sections et FormFooter :
                </p>
                <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">📦 Produit associé</span> - ProductDropdown, obligatoire, fond teal-50</li>
                  <li><span className="font-medium">#️⃣ Identification</span> - Titre + Description, obligatoires, fond cyan-50</li>
                  <li><span className="font-medium">⚡ Priorité</span> - StatusSelector 4 options en grid 2 colonnes, fond teal-50</li>
                  <li><span className="font-medium">📊 Statut</span> - StatusSelector 4 options en grid 2 colonnes, fond cyan-50</li>
                  <li><span className="font-medium">📅 Planning</span> - Date d'échéance, validation anti-passé, fond teal-50</li>
                  <li><span className="font-medium">📈 Métriques de succès</span> - Critères + KPIs (textarea), optionnels, fond cyan-50</li>
                </ol>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">✅ Validation en Temps Réel</p>
                <p className="text-sm text-gray-700 mb-2">
                  useEffect surveillant formData, mise à jour de errors{} :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Champs requis :</span> title.trim(), description.trim(), productId (errors[field] = true)</li>
                  <li><span className="font-medium">Validation date :</span> Si targetDate &lt; today → errors.targetDate = "message d'erreur"</li>
                  <li><span className="font-medium">Validation produit actif :</span> Au moins 1 produit actif requis pour création</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  Bouton "Sauvegarder" désactivé si Object.keys(errors).length &gt; 0 OU aucun produit actif
                </p>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎨 Configuration Visuelle des Statuts</p>
                <p className="text-sm text-gray-700 mb-2">
                  2 tableaux de configuration pour StatusSelector :
                </p>
                <div className="bg-white rounded border border-gray-300 p-2 text-xs mt-2">
                  <p className="font-medium mb-1">STATUS_OPTIONS (4 statuts) :</p>
                  <code className="block">planned (📋 bleu), active (✅ vert), completed (✔️ violet), cancelled (❌ rouge)</code>
                  <p className="font-medium mt-2 mb-1">PRIORITY_OPTIONS (4 priorités) :</p>
                  <code className="block">critical (🔴 rouge), high (🟠 orange), medium (🟡 jaune), low (⚪ gris)</code>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">💾 Soumission et Sauvegarde</p>
                <p className="text-sm text-gray-700 mb-2">
                  handleSubmit avec validation finale et transformation :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Vérification finale : errors.length === 0 ET produits actifs présents</li>
                  <li>Transformation : trim() sur tous les champs texte</li>
                  <li>Callback onSave(objectiveData) déclenché</li>
                  <li>Fermeture automatique du formulaire après sauvegarde</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Modal de détail */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Modal de Visualisation Détaillée</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">👁️ ObjectiveDetail Component</p>
                <p className="text-sm text-gray-700 mb-2">
                  DetailModal standardisé avec 4 sections :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">En-tête :</span> Titre + 3 badges inline (Statut, Priorité, Produit avec code couleur)</li>
                  <li><span className="font-medium">📅 Dates :</span> Grid 2 colonnes, date début + date échéance, fond cyan-50</li>
                  <li><span className="font-medium">📝 Description :</span> whitespace-pre-wrap, fond teal-50</li>
                  <li><span className="font-medium">✅ Critères + 📈 KPIs :</span> Listes avec checkmarks, fonds blue/indigo alternés</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎨 Traitement Visuel Spécial</p>
                <p className="text-sm text-gray-700 mb-2">
                  Mise en forme automatique des contenus :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Date échéance :</span> border-l-4 border-l-orange-500 pour souligner l'importance</li>
                  <li><span className="font-medium">Critères/KPIs :</span> split('\n') + filter() + map() pour listes à puces avec ✓</li>
                  <li><span className="font-medium">Dates :</span> formatDate() avec toLocaleDateString('fr-FR', {`{ year: 'numeric', month: 'long', day: 'numeric' }`})</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Suppression */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">5️⃣ Suppression avec Confirmation</h3>
            
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">🗑️ Processus de Suppression</p>
              <p className="text-sm text-gray-700 mb-2">
                ConfirmDialog avec analyse automatique des relations :
              </p>
              <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
                <li>Comptage relations : userNeeds.filter(linkedGoalId) + userStories.filter(linkedGoalId)</li>
                <li>Message dynamique : Affichage nombre de besoins et stories liés</li>
                <li>Warning : "Ces relations seront supprimées" si hasRelations</li>
                <li>Confirmation utilisateur requise</li>
                <li>onDelete(objectiveId) déclenché après confirmation</li>
              </ol>
              <p className="text-xs text-gray-600 mt-2">
                ⚠️ Suppression en cascade automatique dans les modules liés (linkedGoalId remis à null)
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
              <li>🎯 <span className="font-medium">Méthode SMART obligatoire :</span> Chaque objectif doit être Spécifique, Mesurable, Atteignable, Réaliste et Temporel</li>
              <li>📊 <span className="font-medium">Limite 3-5 objectifs actifs :</span> Trop d'objectifs simultanés = dispersion. Priorisez impitoyablement</li>
              <li>📅 <span className="font-medium">Définir dates d'échéance :</span> Un objectif sans deadline n'est qu'un souhait. Toujours fixer une targetDate</li>
              <li>📈 <span className="font-medium">KPIs mesurables :</span> "Améliorer UX" est vague. "Réduire temps chargement &lt;2s + NPS &gt;50" est actionnable</li>
              <li>🔗 <span className="font-medium">Lier besoins et stories :</span> Chaque objectif doit avoir au moins 1 besoin lié pour justifier son existence</li>
              <li>⚠️ <span className="font-medium">Surveiller badge retard :</span> Objectif en retard = revue urgente requise (ajuster date ou annuler)</li>
              <li>🔄 <span className="font-medium">Revue mensuelle systématique :</span> Status update, progression KPIs, ajustement priorités</li>
              <li>✅ <span className="font-medium">Célébrer les succès :</span> Objectif "Terminé" = moment team building important, ne pas zapper</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure Complète d'un Objectif</h3>
              
              <div className="bg-white rounded border border-gray-300 p-3 mb-3">
                <pre className="text-xs overflow-x-auto">{`{
  id: "obj_1234567890",           // UUID unique
  title: string,                   // Obligatoire, titre court
  description: string,             // Obligatoire, contexte détaillé
  productId: string,               // Obligatoire, référence vers Product.id
  priority: "critical" | "high" | "medium" | "low",  // Défaut: "medium"
  status: "planned" | "active" | "completed" | "cancelled" | "archived",
  targetDate: "YYYY-MM-DD",        // Optionnel, date ISO
  startDate: "YYYY-MM-DD",         // Optionnel, date début
  successCriteria: string,         // Optionnel, description qualitative
  kpis: string,                    // Optionnel, métriques quantifiables
  createdAt: timestamp,            // Auto-généré
  updatedAt: timestamp             // Auto-mis à jour
}`}</pre>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-gray-700">
                <p className="font-medium text-gray-900 mb-1">📏 Contraintes de validation :</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>title : 1-200 caractères, trim()</li>
                  <li>description : 1-2000 caractères, trim()</li>
                  <li>productId : doit référencer un produit actif existant</li>
                  <li>targetDate : ne peut pas être dans le passé (validation formulaire)</li>
                  <li>successCriteria, kpis : max 1000 caractères chacun</li>
                </ul>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique Métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🚨 <span className="font-medium">Détection retard :</span> 
                  <code className="text-xs bg-white px-2 py-1 rounded ml-2">
                    isOverdue = targetDate &lt; today AND status NOT IN (completed, cancelled)
                  </code>
                </li>
                <li>📊 <span className="font-medium">Calcul progression :</span> 
                  Basé sur stories liées terminées / total stories liées × 100
                </li>
                <li>🔗 <span className="font-medium">Relations bidirectionnelles :</span> 
                  UserNeed.linkedGoalId et UserStory.linkedGoalId pointent vers Objective.id
                </li>
                <li>🗑️ <span className="font-medium">Cascade delete :</span> 
                  Suppression objectif → linkedGoalId remis à null dans tous les besoins et stories
                </li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎨 Configuration Visuelle (Helpers)</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="font-medium text-gray-900 mb-1">getStatusColor(status) :</p>
                  <code className="block bg-white p-2 rounded">
                    planned: cyan-100/cyan-800 | active: green-100/green-800 | completed: emerald-100/emerald-800 | 
                    cancelled: red-100/red-800 | archived: gray-100/gray-800
                  </code>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">getPriorityColor(priority) :</p>
                  <code className="block bg-white p-2 rounded">
                    critical: red-100/red-800 | high: orange-100/orange-800 | medium: yellow-100/yellow-800 | 
                    low: gray-100/gray-800
                  </code>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">getStatusIcon(status) :</p>
                  <code className="block bg-white p-2 rounded">
                    planned/archived: Clock | active/completed: CheckCircle2 | cancelled: XCircle (de lucide-react)
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les objectifs sont sauvegardés via le Factory Pattern Storage sous la clé "objectives". 
                Opérations CRUD gérées par le hook useObjectives.
              </p>
              <div className="bg-white rounded border border-gray-300 p-3 text-xs mt-2">
                <p className="font-medium mb-1">Fonctions Storage :</p>
                <ul className="space-y-1 ml-4 list-disc text-gray-700">
                  <li><code>getObjectives()</code> → Array&lt;Objective&gt;</li>
                  <li><code>addObjective(data)</code> → Objective avec id généré + timestamps</li>
                  <li><code>updateObjective(id, updates)</code> → Objective mis à jour + updatedAt refresh</li>
                  <li><code>deleteObjective(id)</code> → void, suppression permanente</li>
                </ul>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-medium">🔒 Confidentialité :</span> Données 100% locales, aucune synchronisation externe.
              </p>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Dépendance obligatoire :</span> Chaque objectif DOIT être lié à un produit actif. 
                Utilisation de checkModuleDependencies() pour validation au chargement.
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>ProductDropdown dans formulaire : filtre automatique sur products.filter(status === 'active')</li>
                <li>ProductSelector dans FilterBar : affiche compteur d'objectifs par produit</li>
                <li>Badge produit : code + couleur sur chaque carte et dans modal détail</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module Besoins Utilisateurs</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Relation 1-N :</span> Un objectif peut être lié à plusieurs besoins via UserNeed.linkedGoalId
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>UserNeedLink component : affiche liste des besoins liés dans ObjectiveDetail</li>
                <li>Navigation bidirectionnelle : cliquer sur besoin → ouvre UserNeedDetail avec context</li>
                <li>Compteur dans carte : linkedNeedsCount visible en permanence</li>
                <li>Suppression cascade : linkedGoalId remis à null si objectif supprimé</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Relation 1-N :</span> Un objectif peut être lié à plusieurs stories via UserStory.linkedGoalId
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>UserStoryLink component : affiche liste des stories liées dans ObjectiveDetail</li>
                <li>Calcul progression : stories terminées / total stories × 100 pour objectifs actifs</li>
                <li>Navigation bidirectionnelle : cliquer sur story → ouvre UserStoryDetail avec context</li>
                <li>Suppression cascade : linkedGoalId remis à null si objectif supprimé</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏢 Module Équipes</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Relation indirecte :</span> Via les user stories liées, permet de tracer quelles équipes 
                travaillent sur quels objectifs stratégiques.
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>Analyse de vélocité : comparer capacité équipe VS charge objectifs actifs</li>
                <li>Dashboard : vue croisée objectifs × équipes pour allocation ressources</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📊 Module Sprints</h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Relation indirecte :</span> Les stories liées à un objectif peuvent être planifiées dans des sprints, 
                permettant de suivre l'avancement sprint par sprint.
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>Sprint planning : filtrer stories par linkedGoalId pour aligner sprint sur objectif</li>
                <li>Sprint review : mesure progression objectif via stories completed du sprint</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer avec lien vers version utilisateur */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-teal-200 rounded-lg p-6 shadow-sm">
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

export default ObjectivesDetailPage;
