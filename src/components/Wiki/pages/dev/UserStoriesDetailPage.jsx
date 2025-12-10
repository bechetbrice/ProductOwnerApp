import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * UserStoriesDetailPage - Documentation TECHNIQUE du Module User Stories
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal StoryDetailModal (sobre et standardisé)
 * 
 * @component
 * @version 1.0.0 - Documentation post-nettoyage QW
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const UserStoriesDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📖 Documentation Technique - Module User Stories</h1>
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
              Le <strong>Module User Stories</strong> transforme les besoins utilisateurs en fonctionnalités développables 
              selon le format standardisé "En tant que... je veux... afin de...". Chaque story est obligatoirement liée 
              à un <strong>besoin utilisateur source</strong> et rattachée à un <strong>produit actif</strong>, garantissant 
              une traçabilité complète du workflow : Entretien → Besoin → User Story → Sprint.
            </p>
            <p>
              Le module utilise la <strong>méthode MoSCoW</strong> (Must/Should/Could/Won't) pour la priorisation visuelle 
              en colonnes. Chaque story possède un <strong>numéro unique</strong> et un <strong>titre court</strong> obligatoires 
              pour faciliter la communication en équipe. L'estimation est héritée automatiquement depuis le besoin source si définie.
            </p>
            <p>
              Les <strong>outcomes</strong> (résultats) des stories sont gérés uniquement via le <strong>Sprint Board</strong> 
              pour assurer la cohérence avec le sprint en cours. Le module fonctionne 100% offline avec stockage local et 
              s'intègre étroitement avec UserNeeds, Products, Contacts, Objectives et Teams.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📖 User Story</h3>
              <p className="text-sm text-gray-700 mb-3">
                Expression d'une fonctionnalité du point de vue utilisateur selon le format canonique : 
                "En tant que [rôle], je veux [action], afin de [bénéfice]". Chaque story DOIT être liée 
                à un besoin utilisateur source (linkedNeedId) pour garantir la traçabilité.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Champs obligatoires :</span> Produit, Besoin source, Format 3 champs, Numéro, Titre court</p>
                <p><span className="font-medium">Titre généré :</span> Construit automatiquement depuis les 3 champs du format</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">#️⃣ Identification Unique</h3>
              <p className="text-sm text-gray-700 mb-3">
                Chaque story possède 2 identifiants obligatoires : un <strong>numéro</strong> (ex: US-001, US-042) 
                et un <strong>titre court</strong> (ex: "Connexion OAuth", "Export PDF"). Ces identifiants facilitent 
                la communication rapide en équipe et les références dans les outils externes.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Numéro :</span> Format libre, généralement US-XXX ou #XXX</p>
                <p><span className="font-medium">Titre court :</span> Résumé en 2-5 mots de la fonctionnalité</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Priorité MoSCoW</h3>
              <p className="text-sm text-gray-700 mb-3">
                Méthode de priorisation en 4 niveaux : Must Have (indispensable), Should Have (important), 
                Could Have (souhaitable), Won't Have (exclu). Affiché en colonnes visuelles dans le board principal. 
                Recommandation : 60% Must, 20% Should, 20% Could.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Valeurs :</span> must, should (défaut), could, wont</p>
                <p><span className="font-medium">Affichage :</span> 4 colonnes avec codes couleur (rouge/orange/jaune/gris)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🔄 Outcome (Résultat)</h3>
              <p className="text-sm text-gray-700 mb-3">
                État final de la story après sprint : completed (terminée), paused (en pause), blocked (bloquée), 
                cancelled (annulée), to_review (à revoir). <strong>Géré UNIQUEMENT via Sprint Board</strong> 
                pour garantir cohérence avec le sprint et traçabilité historique.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Composant :</span> UserStoryOutcomeManager (modal bienveillant)</p>
                <p><span className="font-medium">Historique :</span> Chaque changement ajouté au tableau history[]</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note architecture :</strong> Le formulaire UserStoryForm ne gère PAS les outcomes. 
              Cette séparation garantit que seul le Sprint Board peut définir le résultat d'une story, 
              assurant cohérence entre sprint et backlog. Les champs status et outcome sont préservés 
              en mode édition mais non modifiables.
            </p>
          </div>
        </div>

        {/* Utilisation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Utilisation pas-à-pas</h2>

          {/* Interface principale */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Interface Principale (MoSCoWBoard)</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">💡 Module Conseils (optionnel)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Contrôlé par la prop showTips, affiche un guide pédagogique complet au premier lancement :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><strong>Must Have :</strong> Limiter à 60% max, fonctionnalités critiques sans lesquelles pas de release</li>
                  <li><strong>Should Have :</strong> ~20%, important mais contournable à court terme</li>
                  <li><strong>Could Have :</strong> ~20%, nice-to-have si temps et ressources le permettent</li>
                  <li><strong>Won't Have :</strong> Explicitement exclu, documenter décisions pour gérer attentes</li>
                  <li><strong>Format User Story :</strong> Utiliser "En tant que... je veux... afin de..."</li>
                  <li><strong>Gestion Backlog :</strong> Statistiques, filtres produit, réévaluation régulière</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📋 Board MoSCoW (4 colonnes)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation visuelle en 4 colonnes verticales. Chaque colonne affiche :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Emoji + Label + Description + Compteur stories</li>
                  <li><span className="font-medium">Corps scrollable :</span> StoryCardCompact triées par date décroissante</li>
                  <li><span className="font-medium">Hauteur :</span> max-height calc(100vh - 450px), min 400px</li>
                  <li><span className="font-medium">État vide :</span> Icône ClipboardList + "Aucune story"</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🃏 StoryCardCompact</p>
                <p className="text-sm text-gray-700 mb-2">
                  Carte story affichant les informations essentielles :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Ligne 1 badges :</span> Badge produit (code couleur) + Badge outcome (si défini)</li>
                  <li><span className="font-medium">Titre principal :</span> Titre généré en italique entre guillemets</li>
                  <li><span className="font-medium">Ligne 2 :</span> Badge numéro (#US-001) + Titre court tronqué</li>
                  <li><span className="font-medium">Actions :</span> 3 boutons (👁️ Voir / ✏️ Modifier / 🗑️ Supprimer)</li>
                  <li><span className="font-medium">Opacité :</span> 0.7 si status ≠ unassigned (assignée à sprint)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Filtres et actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Barre de Filtres (FilterBar)</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔧 En-tête (toujours visible)</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">ProductSelector :</span> Liste déroulante produits actifs (topLeftContent)</li>
                  <li><span className="font-medium">Bouton "Nouvelle Story" :</span> Gradient bleu-violet, déclenche setIsFormOpen(true)</li>
                  <li><span className="font-medium">Bouton Filtres :</span> Toggle pour déplier/replier la section filtres</li>
                  <li><span className="font-medium">Badge actif :</span> Compteur filtres actifs si ≥1 filtre appliqué</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (repliable)</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Filtre Statut :</span> all / todo / inProgress / done</li>
                  <li><span className="font-medium">Réinitialiser :</span> Bouton "Réinitialiser filtres" si hasActiveFilters</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2">
                  Logique de filtrage dans useMemo storiesByPriority : filtre produit → statut → spécificId, 
                  puis groupage par priorité et tri par createdAt desc dans chaque groupe.
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de story */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Formulaire Story (UserStoryForm)</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">📝 Structure en 6 sections + aide contextuelle</p>
              <p className="text-sm text-gray-700 mb-3">
                FormModal xl avec alternance fond indigo/blue. Validation temps réel avec état errors{}.
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><span className="font-medium">📦 Produit associé (fond indigo)</span> - ProductDropdown produits actifs (obligatoire)</li>
                <li><span className="font-medium">🎯 Besoin Utilisateur Source (fond blue)</span> - Select besoin obligatoire
                  <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                    <li>Filtrage automatique par productId si sélectionné</li>
                    <li>Affichage besoins déjà liés en barré gris avec "✓ ... - Déjà lié"</li>
                    <li>Preview besoin : objectif + estimation héritée + importance</li>
                    <li>Bloc erreur si aucun besoin disponible → redirection vers module Besoins</li>
                  </ul>
                </li>
                <li><span className="font-medium">#️⃣ Identification (fond indigo)</span> - storyNumber + storyTitle (FormGrid 1-2 colonnes, obligatoires)</li>
                <li><span className="font-medium">✨ Format User Story (fond blue)</span> - 3 champs obligatoires
                  <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                    <li>userRole : "En tant que" (Input)</li>
                    <li>userAction : "Je veux" (Textarea 2 rows)</li>
                    <li>userBenefit : "Afin de" (Textarea 2 rows)</li>
                    <li>Preview titre généré automatiquement si 3 champs remplis</li>
                  </ul>
                </li>
                <li><span className="font-medium">📝 Description complémentaire (fond indigo)</span> - Textarea 3 rows (optionnel)</li>
                <li><span className="font-medium">✅ Critères d'acceptation (fond blue)</span> - Textarea 3 rows avec placeholder format liste (optionnel)</li>
              </ol>
              
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">⚠️ Mode édition spécificités</p>
                <p className="text-xs text-gray-700">
                  • Description non chargée si contient format User Story (détection via includes "En tant que", "Je veux", "Afin de")
                  <br />• Section "ℹ️ Note importante" affichée : "L'outcome de cette story est géré uniquement via Sprint Board"
                  <br />• Préservation status/outcome/outcomeReason/outcomeNote/outcomeDate/history en handleSubmit
                </p>
              </div>

              <div className="mt-3 bg-green-50 border border-green-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">🔄 Héritage automatique estimation</p>
                <p className="text-xs text-gray-700">
                  Si linkedNeedId sélectionné et need.storyPoints défini, l'estimation est héritée automatiquement 
                  (useEffect sur linkedNeedId + userNeeds). En création uniquement (pas en édition pour préserver valeur existante).
                </p>
              </div>
            </div>
          </div>

          {/* Modal détail */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Modal Détail (StoryDetailModal)</h3>
            
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">👁️ Visualisation complète lecture seule</p>
              <p className="text-sm text-gray-700 mb-3">
                DetailModal lg avec 8 sections (SectionGroup variant="plain", alternance indigo/blue) :
              </p>
              <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
                <li><span className="font-medium">En-tête (fond indigo) :</span> Titre généré + Badges (statut/priorité/produit) + Badge numéro</li>
                <li><span className="font-medium">📝 Description :</span> Texte whitespace-pre-wrap ou "Aucune description"</li>
                <li><span className="font-medium">✅ Critères acceptation :</span> Liste avec checkmarks ✓ ou "Aucun critère défini"</li>
                <li><span className="font-medium">🎯 Besoin Source :</span> Carte blanche avec objectif + estimation héritée + importance + bouton ExternalLink vers need</li>
                <li><span className="font-medium">🔄 Outcome (si défini) :</span> Badge outcome + raison + note + historique avec dates</li>
                <li><span className="font-medium">👥 Équipe (si teamId) :</span> Nom équipe + compteur membres (alimenté par Sprint Management)</li>
                <li><span className="font-medium">👥 Stakeholders (si &gt;0) :</span> Cartes blanches avec icône User/Building2 + nom + rôle</li>
                <li><span className="font-medium">🎯 Objectif produit (si linkedGoalId) :</span> Carte blanche avec titre + description + bouton ExternalLink</li>
              </ol>
              
              <div className="mt-3 bg-white border border-cyan-200 rounded p-3">
                <p className="text-xs text-cyan-900">
                  <span className="font-medium">Actions :</span> Bouton "✏️ Modifier" (si onEdit fourni) + Bouton "Fermer". 
                  Config badges depuis USER_STORY_STATUS_CONFIG et MOSCOW_PRIORITY_CONFIG (utils/constants).
                </p>
              </div>
            </div>
          </div>

          {/* Outcome Manager */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">5️⃣ Gestion Outcomes (UserStoryOutcomeManager)</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">🔄 Modal bienveillante d'outcomes</p>
              <p className="text-sm text-gray-700 mb-3">
                Modal plein écran utilisée UNIQUEMENT depuis Sprint Board pour définir résultat story post-sprint :
              </p>
              <ul className="text-sm text-gray-600 space-y-2 ml-4 list-disc">
                <li><span className="font-medium">5 outcomes possibles :</span>
                  <ul className="ml-4 mt-1 space-y-0.5 list-circle text-xs">
                    <li>completed : Tous critères validés, déployée prod, tests OK</li>
                    <li>paused : Changement priorité, attente retour client</li>
                    <li>blocked : Dépendance équipe, API tierce, specs incomplètes</li>
                    <li>cancelled : Feature abandonnée, changement stratégie</li>
                    <li>to_review : Scope trop large, critères flous, complexité sous-évaluée</li>
                  </ul>
                </li>
                <li><span className="font-medium">Raisons pré-définies :</span> 5 suggestions par outcome pour rapidité</li>
                <li><span className="font-medium">Champ texte libre :</span> Raison personnalisée + Notes additionnelles</li>
                <li><span className="font-medium">Actions suggérées :</span> Liste 4 next steps selon outcome sélectionné</li>
                <li><span className="font-medium">Historique :</span> Affichage history[] avec dates + outcomes précédents</li>
                <li><span className="font-medium">Confirmation :</span> Écran vert CheckCircle 2s avant fermeture auto</li>
              </ul>
              
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-3">
                <p className="text-xs text-gray-900">
                  <span className="font-medium">⚠️ Approche bienveillante :</span> Vocabulaire positif ("pas d'échec, que des apprentissages"), 
                  focus sur actions suivantes plutôt que sur l'échec. Si completed, status auto-passé à "done".
                </p>
              </div>
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
              <li>🎯 <span className="font-medium">Besoin obligatoire :</span> Créez d'abord le besoin, puis la story - garantit traçabilité complète workflow</li>
              <li>#️⃣ <span className="font-medium">Numérotation cohérente :</span> Définissez convention équipe (US-001, #042...) et appliquez-la systématiquement</li>
              <li>✨ <span className="font-medium">Format User Story strict :</span> Les 3 champs sont obligatoires - le titre généré est utilisé partout dans l'app</li>
              <li>📊 <span className="font-medium">Équilibre MoSCoW :</span> Surveillez ratio 60/20/20 - trop de Must = surcharge, trop de Could = manque focus</li>
              <li>🔄 <span className="font-medium">Outcomes via Sprint Board :</span> Ne modifiez JAMAIS outcome directement en DB - toujours via Sprint Board</li>
              <li>🏷️ <span className="font-medium">Titre court descriptif :</span> Utilisé dans Kanban, exports, communications - doit être explicite hors contexte</li>
              <li>✅ <span className="font-medium">Critères mesurables :</span> Format liste recommandé, chaque critère doit être testable binaire (OK/KO)</li>
              <li>📋 <span className="font-medium">Stories atomiques :</span> Si &gt;8 story points ou &gt;1 sprint, découpez - facilite estimation et livraison</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'une UserStory</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs obligatoires</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>id (string - UUID)</div>
                    <div>productId (string)</div>
                    <div>linkedNeedId (string)</div>
                    <div>storyNumber (string)</div>
                    <div>storyTitle (string)</div>
                    <div>userRole (string)</div>
                    <div>userAction (string)</div>
                    <div>userBenefit (string)</div>
                    <div>title (string - généré)</div>
                    <div>priority (string - défaut "should")</div>
                    <div>status (string - défaut "todo")</div>
                    <div>createdAt, updatedAt</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs optionnels</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>description (string)</div>
                    <div>acceptanceCriteria (string)</div>
                    <div>estimation (number)</div>
                    <div>assignedTo (string)</div>
                    <div>teamId (string)</div>
                    <div>stakeholderIds (array)</div>
                    <div>linkedGoalId (string)</div>
                    <div>outcome (string)</div>
                    <div>outcomeReason (string)</div>
                    <div>outcomeNote (string)</div>
                    <div>outcomeDate (ISO string)</div>
                    <div>history (array objects)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>📦 <span className="font-medium">Validation produit :</span> checkModuleDependencies vérifie ≥1 produit actif avant création</li>
                <li>🎯 <span className="font-medium">Besoin obligatoire :</span> availableNeeds.length === 0 && !isEditing → bloc erreur + redirection module Besoins</li>
                <li>✨ <span className="font-medium">Titre auto-généré :</span> useEffect reconstruit title dès que userRole/userAction/userBenefit changent</li>
                <li>📊 <span className="font-medium">Héritage estimation :</span> useEffect copie linkedNeed.storyPoints → formData.estimation (création uniquement)</li>
                <li>🔒 <span className="font-medium">Immutabilité description :</span> En édition, description non chargée si contient format User Story</li>
                <li>🏷️ <span className="font-medium">Priority :</span> Valeurs autorisées "must", "should" (défaut), "could", "wont"</li>
                <li>📊 <span className="font-medium">Status :</span> Valeurs "todo" (défaut), "inProgress", "done", "unassigned"</li>
                <li>🔄 <span className="font-medium">Outcome :</span> Valeurs "completed", "paused", "blocked", "cancelled", "to_review" (null si non défini)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les user stories sont sauvegardées localement sous la clé "userStories" via Factory Pattern Storage. 
                Sauvegarde automatique à chaque opération (create/update/delete).
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">🔒 Confidentialité :</span> Données 100% privées, jamais envoyées vers serveur externe. 
                Persistance tant que cache navigateur non vidé.
              </p>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module User Needs</h3>
              <p className="text-sm text-gray-700">
                Dépendance forte : chaque story DOIT avoir un linkedNeedId. Le UserStoryForm filtre availableNeeds 
                selon productId sélectionné. Affichage besoins déjà liés avec indicateur visuel (barré + "✓ Déjà lié"). 
                Héritage automatique estimation depuis need.storyPoints. Le module UserNeeds affiche badge "X story(ies)" 
                via fonction getLinkedStories(needId).
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Products</h3>
              <p className="text-sm text-gray-700">
                Stories associées obligatoirement à un produit actif. ProductDropdown dans formulaire et ProductSelector 
                dans FilterBar (topLeftContent). Badge produit affiché sur cartes (code couleur) et modal détail. 
                Validation checkModuleDependencies('userStories', products: activeProductsCount) avant création.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                Champ stakeholderIds[] optionnel pour lier contacts impliqués dans la story. 
                Affichage dans StoryDetailModal avec badges nom + rôle + icônes User/Building2 selon type contact. 
                Utilisé pour tracking parties prenantes et communication projet.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module Objectives</h3>
              <p className="text-sm text-gray-700">
                Champ linkedGoalId optionnel pour associer story à un objectif produit. 
                Affichage dans StoryDetailModal avec carte blanche titre + description + bouton ExternalLink. 
                Permet d'aligner stories avec stratégie produit et OKRs.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Teams</h3>
              <p className="text-sm text-gray-700">
                Champ teamId alimenté par Sprint Management lors affectation story à sprint. 
                Affichage conditionnel dans StoryDetailModal section "Équipe responsable" avec nom équipe + compteur membres. 
                Utilisé pour tracking capacité équipes et planification sprints.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏃 Module Sprint Board</h3>
              <p className="text-sm text-gray-700">
                Gestion EXCLUSIVE des outcomes via UserStoryOutcomeManager. Le Sprint Board met à jour 
                outcome/outcomeReason/outcomeNote/outcomeDate et ajoute entrées au history[]. 
                Si outcome = "completed", status auto-passé à "done". Le UserStoryForm préserve ces champs 
                en mode édition mais ne les affiche/modifie pas.
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Composants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture Composants</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📂 Structure fichiers (post-nettoyage)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 font-mono">
                <div>index.js (exports centralisés)</div>
                <div>UserStoriesList.jsx (wrapper)</div>
                <div>MoSCoWBoard.jsx (board principal)</div>
                <div>MoSCoWColumn.jsx (colonne priorité)</div>
                <div>StoryCardCompact.jsx (carte story)</div>
                <div>UserStoryForm.jsx (formulaire)</div>
                <div>StoryDetailModal.jsx (modal détail)</div>
                <div>StoryOutcomeBadge.jsx (badge outcome)</div>
                <div>UserStoryOutcomeManager.jsx (modal outcome)</div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🔗 Hiérarchie composants</h3>
              <div className="text-sm text-gray-700 font-mono space-y-1">
                <div>UserStoriesList</div>
                <div className="ml-4">└─ MoSCoWBoard</div>
                <div className="ml-8">├─ FilterBar (Common)</div>
                <div className="ml-8">├─ ProductSelector (Common)</div>
                <div className="ml-8">├─ EmptyState (ui)</div>
                <div className="ml-8">├─ MoSCoWColumn (×4)</div>
                <div className="ml-12">└─ StoryCardCompact</div>
                <div className="ml-16">├─ StoryOutcomeBadge</div>
                <div className="ml-16">└─ BoardCard (ui)</div>
                <div className="ml-8">├─ UserStoryForm</div>
                <div className="ml-12">└─ FormModal + Form* (ui)</div>
                <div className="ml-8">└─ StoryDetailModal</div>
                <div className="ml-12">└─ DetailModal + SectionGroup (ui)</div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🧩 Composants UI réutilisables utilisés</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                <div>FormModal</div>
                <div>FormHeader</div>
                <div>FormSection</div>
                <div>FormGrid</div>
                <div>FormFooter</div>
                <div>Input</div>
                <div>Textarea</div>
                <div>Select</div>
                <div>ProductDropdown</div>
                <div>DetailModal</div>
                <div>SectionGroup</div>
                <div>BoardCard</div>
                <div>EmptyState</div>
                <div>FilterBar</div>
                <div>ProductSelector</div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎨 Design System</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <span className="font-medium">Palette :</span> Alternance fond teal-50/cyan-50 pour sections formulaire et modal</li>
                <li>• <span className="font-medium">Badges :</span> Produit (code couleur custom), Priorité MoSCoW (config constants), Outcome (5 couleurs)</li>
                <li>• <span className="font-medium">Colonnes :</span> Codes couleur red/orange/yellow/gray selon priorité</li>
                <li>• <span className="font-medium">Icons :</span> Lucide-react (Eye, Edit2, Trash2, Save, AlertCircle, Target, User, Building2, ExternalLink...)</li>
              </ul>
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

export default UserStoriesDetailPage;
