import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * TeamsDetailPage - Documentation TECHNIQUE du Module Équipes
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du standard ContactsDetailPage (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const TeamsDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">👥 Documentation Technique - Module Équipes</h1>
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
              Le <strong>Module Équipes</strong> permet d'organiser vos contacts en groupes de travail structurés : 
              Squads, Chapters, Teams fonctionnelles ou projets temporaires. Il centralise la gestion des membres, 
              du leadership et calcule automatiquement la capacité collective pour la planification sprint.
            </p>
            <p>
              Chaque équipe peut être associée à un ou plusieurs produits, facilitant la gestion multi-projets. 
              Le module suit le statut (active/inactive) pour archiver les équipes temporaires tout en conservant 
              l'historique complet.
            </p>
            <p>
              Fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Seuls les contacts internes marqués comme "membre d'équipe" (isActive=true) peuvent être ajoutés.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👥 Équipe</h3>
              <p className="text-sm text-gray-700 mb-3">
                Groupe de contacts travaillant ensemble sur un ou plusieurs produits. Peut représenter une 
                Squad Agile, un Chapter technique, une Team fonctionnelle ou un projet temporaire.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Champs clés :</span> name, memberContactIds[], leadContactId, productIds[]</p>
                <p><span className="font-medium">Statuts :</span> active (en activité), inactive (archivée)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👤 Membre d'Équipe</h3>
              <p className="text-sm text-gray-700 mb-3">
                Contact interne avec le flag isActive=true. Seuls ces contacts peuvent être ajoutés comme membres. 
                Chaque membre contribue à la capacité collective calculée automatiquement.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Condition :</span> contact.isActive === true</p>
                <p><span className="font-medium">Capacité :</span> (capacity × availability × workload) / 10000</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Team Lead</h3>
              <p className="text-sm text-gray-700 mb-3">
                Référent principal de l'équipe (optionnel). Doit obligatoirement être membre de l'équipe. 
                Badge "Team Lead" affiché dans le modal TeamDetail pour identification rapide.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Validation :</span> leadContactId must be in memberContactIds[]</p>
                <p><span className="font-medium">UI :</span> Badge teal-600 "Team Lead"</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Capacité Collective</h3>
              <p className="text-sm text-gray-700 mb-3">
                Somme automatique des capacités ajustées de tous les membres de l'équipe. Utilisée pour 
                la planification sprint et l'allocation des story points.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Formule :</span> Σ ((capacity × availability × workload) / 10000)</p>
                <p><span className="font-medium">Unité :</span> Story points par sprint</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> Le module Équipes nécessite au moins un contact 
              avec isActive=true pour créer une équipe. Les contacts externes ne peuvent pas être membres. 
              Archivez plutôt que supprimer pour conserver l'historique.
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
                  Au premier lancement (showTips=true), un module pédagogique complet guide l'utilisateur sur :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Création d'équipes efficaces : nom clair, Team Lead, association produits</li>
                  <li>Gestion des membres : contacts internes uniquement, capacité auto-calculée</li>
                  <li>Planification sprint : utiliser capacité affichée, ajuster statuts</li>
                  <li>Organisation et filtres : cartes stats cliquables, filtre produit, recherche</li>
                  <li>Bonnes pratiques : équipes stables, 5-9 personnes, revues régulières</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📱 Grille d'Équipes Responsive</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation en 3 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile). 
                  Chaque équipe est présentée sous forme de carte avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Nom de l'équipe uniquement</li>
                  <li><span className="font-medium">Corps :</span> Description, membres (3 premiers + compteur), capacité avec InfoTooltip, produits</li>
                  <li><span className="font-medium">Footer :</span> Badges statut + membres + capacité, 3 boutons d'action</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📄 Pagination</p>
                <p className="text-sm text-gray-700">
                  9 équipes par page. Navigation avec boutons Précédent et Suivant. 
                  Compteur de résultats affiché en bas.
                </p>
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
                  Contient les actions principales :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">ProductSelector :</span> Filtre par produit actif (topLeftContent)</li>
                  <li><span className="font-medium">Nouvelle Équipe :</span> Bouton gradient bleu-violet</li>
                  <li><span className="font-medium">Réinitialiser :</span> Efface tous les filtres (visible si filtres actifs)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (Repliable)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Par défaut repliée. Une fois dépliée, affiche :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Filtre Statut :</span> ✓ Actives (défaut) / Inactives / Tous les statuts</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">⚠️ Gestion des Dépendances</p>
                <p className="text-sm text-gray-700 mb-2">
                  Le module vérifie automatiquement les dépendances :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Contacts requis :</span> Au moins 1 contact avec isActive=true</li>
                  <li><span className="font-medium">État vide avec message :</span> "Vous devez d'abord créer des contacts..."</li>
                  <li><span className="font-medium">Fonction :</span> checkModuleDependencies('teams', {'{'} contacts: contacts.length {'}'})</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulaire d'équipe */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Formulaire d'Équipe</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">📝 Structure générale</p>
              <p className="text-sm text-gray-700 mb-3">
                Modale extra-large (size="xl") avec 6 sections, validation temps réel et aide contextuelle :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><span className="font-medium">📦 Produits associés</span> (fond indigo) - Sélection multiple avec ProductDropdown, pré-sélection actifs</li>
                <li><span className="font-medium">ℹ️ Informations de base</span> (fond blue) - Nom et Description (obligatoire)</li>
                <li><span className="font-medium">📊 Statut</span> (fond indigo) - Active/Inactive avec StatusSelector</li>
                <li><span className="font-medium">👥 Membres de l'équipe</span> (fond blue) - Sélection multiple checkbox (obligatoire, min 1)</li>
                <li><span className="font-medium">👤 Team Lead</span> (fond indigo) - Select parmi les membres (optionnel)</li>
                <li><span className="font-medium">📊 Capacité totale</span> (fond blue) - Affichage auto-calculé en temps réel</li>
              </ol>
              
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">✅ Validation du formulaire</p>
                <p className="text-xs text-gray-700">
                  Champs requis : Nom, Au moins 1 membre. Validation : Lead doit être membre. 
                  Le bouton "Sauvegarder" est désactivé si formulaire invalide.
                </p>
              </div>

              <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">⚡ Pré-sélection des produits actifs</p>
                <p className="text-xs text-gray-700">
                  Lors de la création (non-édition), tous les produits avec status="active" sont 
                  automatiquement pré-sélectionnés pour faciliter la saisie.
                </p>
              </div>
            </div>
          </div>

          {/* Modal détail */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Modal de Visualisation</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">👁️ TeamDetail - Structure</p>
                <p className="text-sm text-gray-700 mb-2">
                  Modal DetailModal avec 3 sections standardisées :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">En-tête :</span> Nom + badge statut (active/inactive)</li>
                  <li><span className="font-medium">Section 1 :</span> Produits associés avec badges code+couleur (fond cyan-50)</li>
                  <li><span className="font-medium">Section 2 :</span> Description (fond teal-50)</li>
                  <li><span className="font-medium">Section 3 :</span> Membres détaillés avec cartes riches (fond cyan-50)</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">👥 Affichage Membres Détaillé</p>
                <p className="text-sm text-gray-700 mb-2">
                  Chaque membre affiché dans une carte avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Nom + Badge Team Lead :</span> Badge teal-600 si leadContactId</li>
                  <li><span className="font-medium">Rôle :</span> contact.role</li>
                  <li><span className="font-medium">Badges :</span> Seniority (avec Award icon), Actif, Disponible</li>
                  <li><span className="font-medium">Compétences :</span> 4 premiers skills + compteur</li>
                  <li><span className="font-medium">Département + Email :</span> Liens cliquables</li>
                  <li><span className="font-medium">Capacité :</span> Affichage pts/sprint + formule détaillée</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Suppression */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">5️⃣ Suppression Simple</h3>
            
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">⚠️ Processus de suppression</p>
              <p className="text-sm text-gray-700 mb-2">
                La suppression d'une équipe est simple (pas de vérification de relations) :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Confirmation utilisateur via ConfirmDialog (variant="danger")</li>
                <li>Message : "Êtes-vous sûr de vouloir supprimer l'équipe..." </li>
                <li>Suppression immédiate sans cascade (équipes = organisation, pas de dépendances)</li>
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
              <li>👥 <span className="font-medium">Contacts membres d'équipe uniquement :</span> Seuls les contacts avec isActive=true peuvent être ajoutés</li>
              <li>🎯 <span className="font-medium">Team Lead obligatoirement membre :</span> Validation automatique, retrait du lead si membre retiré</li>
              <li>📦 <span className="font-medium">Pré-sélection produits actifs :</span> Tous les produits actifs sont pré-cochés en création</li>
              <li>📊 <span className="font-medium">Capacité auto-calculée :</span> Somme des capacités ajustées affichée en temps réel dans le formulaire</li>
              <li>✅ <span className="font-medium">Statut Actif par défaut :</span> Pour équipes en activité, "Active" est le statut recommandé</li>
              <li>💡 <span className="font-medium">InfoTooltips sur cartes :</span> Membres et Capacité ont des tooltips explicatifs (size=12)</li>
              <li>🔍 <span className="font-medium">Filtre statut par défaut "Actives" :</span> Équipes inactives masquées sauf si filtre changé</li>
              <li>🎨 <span className="font-medium">TeamCard sans badge produit :</span> Exception (showProductBadge=false) pour éviter surcharge visuelle</li>
              <li>📋 <span className="font-medium">Équipes 5-9 personnes :</span> Taille optimale selon bonnes pratiques Agile</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'une Équipe</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs obligatoires</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>id (string, auto)</div>
                    <div>name (string)</div>
                    <div>memberContactIds[] (array, min 1)</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs optionnels</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>description (string)</div>
                    <div>status (enum, défaut: 'active')</div>
                    <div>productIds[] (array)</div>
                    <div>leadContactId (string)</div>
                    <div>createdAt (date, auto)</div>
                    <div>updatedAt (date, auto)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🔍 <span className="font-medium">Filtrage membres disponibles :</span> contacts.filter(c {'=>'} c.isActive === true)</li>
                <li>✉️ <span className="font-medium">Validation lead :</span> leadContactId must be in memberContactIds[], auto-reset si membre retiré</li>
                <li>📊 <span className="font-medium">Calcul capacité membre :</span> Math.round((capacity × availability × workload) / 10000)</li>
                <li>📈 <span className="font-medium">Calcul capacité équipe :</span> Σ getMemberCapacity(contactId) pour tous les membres</li>
                <li>🎨 <span className="font-medium">Seniority badges :</span> junior/intermediate/senior/expert avec Award icon</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les équipes sont sauvegardées localement dans votre navigateur sous la clé "teams". 
                Sauvegarde automatique via le Factory Pattern Storage (getTeams, addTeam, updateTeam, deleteTeam).
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
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                Les équipes sont composées de contacts via memberContactIds[] et leadContactId. 
                Seuls les contacts avec isActive=true peuvent être membres. ContactSelector non utilisé 
                (liste checkbox custom pour multi-sélection).
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700">
                Équipes associées aux produits via productIds[]. ProductDropdown avec multiple=true 
                pour sélection. ProductSelector dans FilterBar pour filtrer les équipes par produit.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏃 Module Sprints</h3>
              <p className="text-sm text-gray-700">
                La capacité collective calculée par le module Équipes est utilisée pour la planification 
                sprint (buffer technique 20%, alertes surcharge).
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📊 Module Dashboard</h3>
              <p className="text-sm text-gray-700">
                Section "Ressources & Capacités" agrège les capacités des équipes actives par produit 
                pour vue d'ensemble globale.
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

export default TeamsDetailPage;
