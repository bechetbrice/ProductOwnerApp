import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * UserNeedsDetailPage - Documentation TECHNIQUE du Module Besoins Utilisateurs
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 4.2.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const UserNeedsDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Besoins Utilisateurs</h1>
              <p className="text-teal-100">Version complète pour développeurs et IA • v4.2.0</p>
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
              Le <strong>Module Besoins Utilisateurs</strong> (User Needs) est le cœur de la découverte produit. 
              Il centralise tous les besoins exprimés par les utilisateurs, identifiés lors des entretiens ou créés manuellement. 
              Chaque besoin est obligatoirement rattaché à un <strong>produit</strong> et associé à au moins un <strong>stakeholder</strong>.
            </p>
            <p>
              Les besoins sont priorisés par <strong>importance</strong> (Critique, Haute, Moyenne, Basse) et leur 
              <strong> complexité</strong> est évaluée en <strong>Story Points Fibonacci</strong> (1, 2, 3, 5, 8, 13, 21). 
              Le module assure le tracking automatique des <strong>User Stories liées</strong>, permettant de suivre 
              l'avancement de la transformation des besoins en fonctionnalités développables.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Il s'intègre aux autres modules via les associations avec produits, contacts, personas, entretiens et user stories.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Besoin Utilisateur</h3>
              <p className="text-sm text-gray-700 mb-3">
                Expression d'un problème, attente ou opportunité identifié(e) lors d'un entretien utilisateur 
                ou créé(e) manuellement. Chaque besoin contient un objectif (immutable après création), 
                un contexte descriptif, et est associé à un produit.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Champs obligatoires :</span> Produit, Objectif, ≥1 Stakeholder</p>
                <p><span className="font-medium">Origine :</span> Insight type "need" ou création manuelle</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Importance</h3>
              <p className="text-sm text-gray-700 mb-3">
                Niveau de priorité stratégique du besoin sur une échelle à 4 niveaux. 
                Défini à la création depuis les insights d'entretiens. 
                <strong className="text-amber-600"> Modifiable UNIQUEMENT via Vue Priorités</strong> (drag & drop MoSCoW).
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Niveaux :</span> 🔴 Critique &gt; 🟠 Haute &gt; 🟡 Moyenne &gt; ⚪ Basse</p>
                <p><span className="font-medium">Usage :</span> Tri et filtrage rapide, priorisation backlog</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Story Points</h3>
              <p className="text-sm text-gray-700 mb-3">
                Évaluation de la complexité technique du besoin selon l'échelle Fibonacci. 
                Assigné via Session d'Estimation (Planning Poker). <strong>Champ en lecture seule</strong> 
                dans le formulaire - modification via module Planning Poker uniquement.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Échelle :</span> 1, 2, 3, 5, 8, 13, 21 points</p>
                <p><span className="font-medium">Indicateurs :</span> 🟢 1-2 | 🟡 3 | 🔴 5-8 | 🟣 13 | ⚫ 21</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👥 Stakeholders</h3>
              <p className="text-sm text-gray-700 mb-3">
                Liste des contacts impliqués dans le besoin. Minimum 1 stakeholder requis. 
                Un <strong>contact privilégié</strong> peut être défini comme interlocuteur principal 
                pour validation et suivi (optionnel).
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Sélection :</span> MultiContactSelector (min 1)</p>
                <p><span className="font-medium">Contact privilégié :</span> ContactSelector (optionnel)</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> L'objectif d'un besoin est <strong>immutable</strong> 
              après création pour maintenir la traçabilité. L'importance ne se modifie que via Vue Priorités 
              pour éviter les incohérences de priorisation. Les Story Points sont assignés collectivement 
              via Planning Poker pour garantir un consensus d'équipe.
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
                <p className="font-medium text-gray-900 mb-2">💡 Module Conseils (optionnel)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Au premier lancement (contrôlé par prop showTips), un module pédagogique guide l'utilisateur sur :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><strong>🎯 Identification :</strong> Proviennent des entretiens, formuler objectif + contexte clairement</li>
                  <li><strong>👥 Stakeholders :</strong> Associer tous les stakeholders + contact privilégié + personas</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📱 Grille de Besoins Responsive</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation en 3 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile). 
                  Chaque besoin est présenté sous forme de carte UserNeedCard avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Objectif du besoin</li>
                  <li><span className="font-medium">Corps :</span> Stakeholders (max 2 + compteur), Contact privilégié, Personas liés</li>
                  <li><span className="font-medium">Footer :</span> Badge produit + Badges importance/complexité/stories + 3 boutons d'action</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📄 Pagination</p>
                <p className="text-sm text-gray-700">
                  9 besoins par page. Navigation avec boutons Précédent et Suivant + numéros de pages. 
                  Compteur "Affichage de X à Y sur Z besoins". Réinitialisation automatique à la page 1 lors de changement de filtres.
                </p>
              </div>
            </div>
          </div>

          {/* Filtres et actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Barre de Filtres et Actions (FilterBar)</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔧 En-tête de la FilterBar (toujours visible)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Contient les actions principales :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Sélecteur Produit :</span> ProductSelector avec compteur de besoins par produit</li>
                  <li><span className="font-medium">Nouveau Besoin :</span> Bouton gradient bleu-violet pour création manuelle</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (Repliable)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Par défaut repliée. Une fois dépliée, affiche :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Filtre Contact :</span> Liste déroulante des contacts liés à au moins un besoin</li>
                  <li><span className="font-medium">Filtre Importance :</span> Toutes / Critique / Haute / Moyenne / Basse</li>
                  <li><span className="font-medium">Filtre Story Points :</span> 1, 2, 3, 5, 8, 13, 21 pts ou "Non estimé"</li>
                  <li><span className="font-medium">Boutons de tri :</span> Date / Importance / Complexité / Stakeholder</li>
                  <li><span className="font-medium">Réinitialiser :</span> Efface tous les filtres actifs en un clic</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulaire de besoin */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Formulaire de Besoin (UserNeedForm)</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">📝 Structure générale</p>
              <p className="text-sm text-gray-700 mb-3">
                Modale plein écran UserNeedForm avec 8 sections et validation temps réel :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><span className="font-medium">📦 Produit associé</span> - ProductDropdown (obligatoire)</li>
                <li><span className="font-medium">🎯 Besoin</span> - Textarea objectif (obligatoire, immutable en édition)</li>
                <li><span className="font-medium">📝 Description</span> - Textarea contexte (optionnel)</li>
                <li><span className="font-medium">⚡ Importance</span> - StatusSelector 4 options (Critique/Haute/Moyenne/Basse)</li>
                <li><span className="font-medium">👥 Stakeholders</span> - MultiContactSelector (min 1 requis)</li>
                <li><span className="font-medium">⭐ Contact privilégié</span> - ContactSelector (optionnel)</li>
                <li><span className="font-medium">💬 Entretien source</span> - Liste déroulante entretiens complétés (optionnel)</li>
                <li><span className="font-medium">👥 Personas</span> - MultiSelector avec recherche (optionnel)</li>
              </ol>
              
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">✅ Validation du formulaire</p>
                <p className="text-xs text-gray-700">
                  Champs requis : Produit, Objectif, Au moins 1 Stakeholder. Le bouton "Sauvegarder" est désactivé si formulaire invalide 
                  ou si aucun produit actif n'est disponible.
                </p>
              </div>

              <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">⚠️ Mode édition</p>
                <p className="text-xs text-gray-700">
                  En mode édition, affichage supplémentaire : <strong>📋 Stories liées</strong> (liste avec titre, description, 
                  badges priorité et statut) si au moins 1 story associée. Alerte orange si modification de l'objectif 
                  (bien que champ en lecture seule).
                </p>
              </div>
            </div>
          </div>

          {/* Modal détail */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Modal Détail (UserNeedDetail)</h3>
            
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">👁️ Visualisation complète</p>
              <p className="text-sm text-gray-700 mb-3">
                Modal DetailModal en lecture seule affichant toutes les informations du besoin :
              </p>
              <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
                <li><span className="font-medium">En-tête :</span> Objectif + Badges (Importance, Story Points, Produit)</li>
                <li><span className="font-medium">📝 Description :</span> Contexte complet ou "Aucune description renseignée"</li>
                <li><span className="font-medium">👥 Stakeholders :</span> Cartes blanches avec nom + rôle</li>
                <li><span className="font-medium">⭐ Contact privilégié :</span> Carte blanche avec nom + rôle</li>
                <li><span className="font-medium">👥 Personas :</span> Badges avec avatar + nom (si définis)</li>
                <li><span className="font-medium">📋 Stories liées :</span> Liste avec titre, description, statut (si existantes)</li>
                <li><span className="font-medium">💬 Entretien source :</span> Titre + date entretien (si défini)</li>
              </ol>
              
              <div className="mt-3 bg-white border border-cyan-200 rounded p-3">
                <p className="text-xs text-cyan-900">
                  <span className="font-medium">Actions disponibles :</span> Bouton "✏️ Modifier" pour ouvrir le formulaire pré-rempli, 
                  bouton "Fermer" pour quitter la modal.
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
              <li>🎯 <span className="font-medium">Objectif immutable :</span> Prenez le temps de bien formuler l'objectif dès la création - il ne sera plus modifiable ensuite</li>
              <li>⚡ <span className="font-medium">Importance via Vue Priorités :</span> L'importance ne se modifie que par drag & drop dans la Vue Priorités (colonnes MoSCoW)</li>
              <li>📊 <span className="font-medium">Story Points collaboratifs :</span> Utilisez Planning Poker pour assigner les Story Points - évaluation d'équipe plus fiable</li>
              <li>👥 <span className="font-medium">Tous les stakeholders :</span> Associez TOUS les contacts impliqués dès le début - facilite communication et validation</li>
              <li>🎭 <span className="font-medium">Personas = contexte utilisateur :</span> Liez les personas pour identifier quel profil utilisateur est concerné</li>
              <li>💬 <span className="font-medium">Traçabilité entretien :</span> Conservez le lien vers l'entretien source pour retrouver le contexte complet si besoin</li>
              <li>📋 <span className="font-medium">Transformation en stories :</span> Surveillez les besoins "Sans Stories" - ce sont ceux à transformer pour démarrer le développement</li>
              <li>🔍 <span className="font-medium">Filtres intelligents :</span> Combinez filtre produit + importance + story points pour des vues ultra-focalisées du backlog</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'un UserNeed</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs obligatoires</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>id (string - UUID)</div>
                    <div>productId (string)</div>
                    <div>objective (string)</div>
                    <div>stakeholderIds (array)</div>
                    <div>importance (string)</div>
                    <div>createdAt, updatedAt</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs optionnels</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>context (string)</div>
                    <div>primaryContactId (string)</div>
                    <div>personaIds (array)</div>
                    <div>sourceInterviewId (string)</div>
                    <div>linkedGoalId (string)</div>
                    <div>storyPoints (number)</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs legacy (compatibilité)</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>contactId (string)</div>
                    <div>client (string)</div>
                    <div>effort (string)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🎯 <span className="font-medium">Validation produit :</span> Vérification qu'au moins un produit actif existe avant création</li>
                <li>👥 <span className="font-medium">Minimum stakeholders :</span> Au moins 1 stakeholder requis (validation côté formulaire)</li>
                <li>📊 <span className="font-medium">Story Points Fibonacci :</span> Seules les valeurs 1, 2, 3, 5, 8, 13, 21 ou null sont acceptées</li>
                <li>⚡ <span className="font-medium">Importance :</span> Valeurs autorisées : "critical", "high", "medium" (défaut), "low"</li>
                <li>🔗 <span className="font-medium">Relations :</span> Tracking automatique des User Stories via linkedNeedId dans le module UserStories</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les besoins utilisateurs sont sauvegardés localement dans votre navigateur sous la clé "userNeeds". 
                Sauvegarde automatique à chaque opération via le Factory Pattern Storage.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">🔒 Confidentialité :</span> Vos données restent 100% privées et ne sont jamais envoyées vers un serveur externe.
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
              <p className="text-sm text-gray-700">
                Les besoins sont obligatoirement associés à un produit actif. 
                Le ProductSelector permet de filtrer les besoins par produit dans la liste principale. 
                Seuls les produits avec status "active" sont disponibles pour la création.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                Chaque besoin a une liste de stakeholderIds (min 1 requis) et un primaryContactId optionnel. 
                MultiContactSelector et ContactSelector utilisés pour la sélection. 
                Compatibilité legacy avec contactId et champ client (texte libre).
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎭 Module Personas</h3>
              <p className="text-sm text-gray-700">
                Les besoins peuvent être associés à plusieurs personas via personaIds[]. 
                MultiSelector avec recherche pour sélection facile. 
                Affichage badges dans carte et modal détail.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">💬 Module Entretiens</h3>
              <p className="text-sm text-gray-700">
                Les besoins sont principalement créés depuis les insights type "need" des entretiens. 
                Le sourceInterviewId conserve la traçabilité vers l'entretien origine. 
                Les insights déjà convertis ne sont plus disponibles dans l'InsightSelector.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                Les User Stories contiennent un linkedNeedId pour associer à un besoin. 
                Fonction getLinkedStories(needId) retourne toutes les stories associées. 
                Tracking automatique avec badge "X story(ies)" sur les cartes besoins.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎲 Module Planning Poker</h3>
              <p className="text-sm text-gray-700">
                Le Planning Poker permet d'assigner collectivement les Story Points. 
                Modification des besoins pour ajouter la propriété storyPoints. 
                Champ en lecture seule dans UserNeedForm - éditable uniquement via Planning Poker.
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

export default UserNeedsDetailPage;
