import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * ProductsDetailPage - Documentation TECHNIQUE du Module Produits
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du standard ContactsDetailPage (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const ProductsDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📦 Documentation Technique - Module Produits</h1>
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
              Le <strong>Module Produits</strong> est le point d'ancrage central de ProductOwnerApp. 
              Chaque entité métier (objectifs, besoins, stories, contacts, entretiens, sprints) doit être 
              obligatoirement associée à un produit. Il permet de structurer le travail multi-produits et 
              d'isoler les données par projet.
            </p>
            <p>
              Ce module gère le <strong>cycle de vie complet</strong> d'un produit : de la phase de conception 
              (brouillon) au développement actif (actif) jusqu'à l'archivage (archivé). Il offre une vue 
              consolidée des clients, du Product Owner, des dates clés et des statistiques d'utilisation.
            </p>
            <p>
              Fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Le code produit court (2-6 caractères) est utilisé comme identifiant visuel partout dans l'application.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📦 Produit</h3>
              <p className="text-sm text-gray-700 mb-3">
                Entité centrale de l'application. Représente un projet, une application, un service ou 
                tout livrable nécessitant un suivi Agile. Chaque élément métier doit être associé à un produit.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Champs clés :</span> name, code, color, status</p>
                <p><span className="font-medium">Relations :</span> Clients, Product Owner, Objectives, UserNeeds, Stories...</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🏷️ Code Produit</h3>
              <p className="text-sm text-gray-700 mb-3">
                Identifiant court (2-6 caractères majuscules) auto-généré depuis le nom. Utilisé comme badge 
                visuel partout dans l'app (cartes, filtres, sélecteurs). Doit être unique et mémorisable.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Format :</span> [A-Z0-9]{"{2,6}"}</p>
                <p><span className="font-medium">Exemple :</span> "Application Mobile Client" → "AMC"</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎨 Couleur Produit</h3>
              <p className="text-sm text-gray-700 mb-3">
                Identifiant visuel sous forme de couleur personnalisable. Le badge produit (code + couleur) 
                permet de reconnaître instantanément le produit dans tous les modules.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Format :</span> Code hexadécimal (#RRGGBB)</p>
                <p><span className="font-medium">Défaut :</span> #6366f1 (indigo)</p>
                <p><span className="font-medium">Preview :</span> Temps réel dans le ColorPicker</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Cycle de Vie</h3>
              <p className="text-sm text-gray-700 mb-3">
                Un produit passe par 3 statuts principaux au cours de son existence. Le statut "Actif" 
                est recommandé par défaut pour les produits en développement.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">📝 Brouillon :</span> En conception, non visible en production</p>
                <p><span className="font-medium">✅ Actif :</span> En développement ou production (défaut)</p>
                <p><span className="font-medium">📦 Archivé :</span> Arrêté mais historique conservé</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> Le module Produits nécessite au moins un contact 
              dans l'application pour créer un produit (association client/PO obligatoire). 
              Archivez plutôt que supprimer pour conserver l'historique complet.
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
                  <li>Structure de produit : code court, couleur distinctive, description claire</li>
                  <li>Cycle de vie : Brouillon → Actif → Archivé</li>
                  <li>Associations : Contacts, objectifs, besoins, stories</li>
                  <li>Vue détaillée : Statistiques, navigation rapide, timeline</li>
                  <li>Bonnes pratiques : Limiter les actifs, utiliser codes courts, archiver vs supprimer</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📱 Grille de Produits Responsive</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation en 3 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile). 
                  Chaque produit est présenté sous forme de carte avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Nom du produit uniquement</li>
                  <li><span className="font-medium">Corps :</span> Client(s), Product Owner</li>
                  <li><span className="font-medium">Footer :</span> Badge produit (code + couleur), badge statut, 3 boutons d'action</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📄 Pagination</p>
                <p className="text-sm text-gray-700">
                  9 produits par page. Navigation avec boutons Précédent et Suivant. 
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
                  <li><span className="font-medium">Nouveau Produit :</span> Bouton gradient bleu-violet</li>
                  <li><span className="font-medium">Réinitialiser :</span> Efface tous les filtres (visible si filtres actifs)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (Repliable)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Par défaut repliée. Une fois dépliée, affiche :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Filtre Statut :</span> Tous / Brouillon / Actifs / Archivés</li>
                  <li><span className="font-medium">Boutons Tri :</span> Date / Nom / Statut (exclusifs)</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">⚠️ Gestion des Dépendances</p>
                <p className="text-sm text-gray-700 mb-2">
                  Le module vérifie automatiquement les dépendances :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Contacts requis :</span> Au moins 1 contact doit exister pour créer un produit</li>
                  <li><span className="font-medium">État vide avec message :</span> "Vous devez d'abord créer des contacts..."</li>
                  <li><span className="font-medium">Fonction :</span> checkModuleDependencies('products', {'{'} contacts: contacts.length {'}'})</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulaire de produit */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Formulaire de Produit</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">📝 Structure générale</p>
              <p className="text-sm text-gray-700 mb-3">
                Modale plein écran avec 5 sections, validation temps réel et aide contextuelle :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><span className="font-medium">#️⃣ Identification</span> (fond indigo) - Nom et Code (obligatoire)</li>
                <li><span className="font-medium">🎨 Apparence</span> (fond blue) - Couleur avec preview en temps réel (obligatoire)</li>
                <li><span className="font-medium">📝 Informations complémentaires</span> (fond indigo) - Description (optionnel)</li>
                <li><span className="font-medium">⚡ Statut</span> (fond blue) - Brouillon/Actif/Archivé avec StatusSelector</li>
                <li><span className="font-medium">👥 Gestion</span> (fond indigo) - Client(s), PO, Dates (4 types)</li>
              </ol>
              
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">✅ Validation du formulaire</p>
                <p className="text-xs text-gray-700">
                  Champs requis : Nom, Code (2-6 car. majuscules), Couleur. 
                  Le bouton "Sauvegarder" est désactivé si formulaire invalide.
                </p>
              </div>

              <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">⚡ Auto-génération du code</p>
                <p className="text-xs text-gray-700">
                  Le code est généré automatiquement depuis le nom lors de la création : 
                  premières lettres des mots, max 6 caractères. Modifiable manuellement.
                </p>
              </div>
            </div>
          </div>

          {/* Modal détail */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Modal de Visualisation</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">👁️ ProductDetail - Structure</p>
                <p className="text-sm text-gray-700 mb-2">
                  Modal DetailModal avec 4 sections standardisées :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">En-tête :</span> Nom + badges (code couleur + statut)</li>
                  <li><span className="font-medium">Section 1 :</span> Description (fond cyan-50)</li>
                  <li><span className="font-medium">Section 2 :</span> Client(s) avec cartes contacts (fond teal-50)</li>
                  <li><span className="font-medium">Section 3 :</span> Product Owner (fond cyan-50)</li>
                  <li><span className="font-medium">Section 4 :</span> Dates du projet avec 4 types (fond teal-50)</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📅 Types de Dates</p>
                <p className="text-sm text-gray-700 mb-2">
                  4 types de dates pour suivi complet du planning :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Date de début :</span> Lancement effectif du produit</li>
                  <li><span className="font-medium">Date de fin prévue :</span> Planning initial (border-left blue)</li>
                  <li><span className="font-medium">Date de fin attendue :</span> Estimation actuelle (border-left orange)</li>
                  <li><span className="font-medium">Date de fin réelle :</span> Livraison effective (border-left green)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Suppression */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">5️⃣ Suppression avec Vérification</h3>
            
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">⚠️ Processus de suppression sécurisé</p>
              <p className="text-sm text-gray-700 mb-2">
                Avant suppression, le système vérifie automatiquement :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Présence d'objectifs liés au produit (Objectives.filter)</li>
                <li>Affichage d'un message d'alerte si éléments liés détectés</li>
                <li>Confirmation utilisateur via ConfirmDialog (variant="danger")</li>
                <li>Suppression en cascade de tous les éléments liés</li>
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
              <li>🏷️ <span className="font-medium">Code court unique :</span> Choisissez un code mémorable et distinctif (2-6 car.), utilisé partout dans l'app</li>
              <li>🎨 <span className="font-medium">Couleurs contrastées :</span> Utilisez des couleurs bien différentes entre produits pour reconnaissance visuelle rapide</li>
              <li>📝 <span className="font-medium">Description dès la création :</span> Documentez le contexte, objectif et public cible pour onboarding efficace</li>
              <li>✅ <span className="font-medium">Statut Actif par défaut :</span> Pour produits en développement, "Actif" est le statut recommandé</li>
              <li>📦 <span className="font-medium">Archiver plutôt que supprimer :</span> Conservez l'historique complet en archivant les produits terminés</li>
              <li>🎯 <span className="font-medium">Limiter les produits actifs :</span> Focus sur 3-5 produits max simultanément pour efficacité</li>
              <li>👥 <span className="font-medium">Associer les bons contacts :</span> Clients ET Product Owner pour clarifier les responsabilités</li>
              <li>📅 <span className="font-medium">4 dates pour suivi complet :</span> Début + Fin prévue + Fin attendue + Fin réelle = timeline précise</li>
              <li>🔄 <span className="font-medium">Revue trimestrielle :</span> Vérifiez régulièrement les statuts et archivez les produits inactifs</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'un Produit</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs obligatoires</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>id (string, auto)</div>
                    <div>name (string)</div>
                    <div>code (string, 2-6 car.)</div>
                    <div>color (string, hex)</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs optionnels</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>description (string)</div>
                    <div>status (enum, défaut: 'active')</div>
                    <div>clientIds[] (array)</div>
                    <div>ownerId (string)</div>
                    <div>startDate (date ISO)</div>
                    <div>plannedEndDate (date ISO)</div>
                    <div>expectedEndDate (date ISO)</div>
                    <div>actualEndDate (date ISO)</div>
                    <div>createdAt (date, auto)</div>
                    <div>updatedAt (date, auto)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🔍 <span className="font-medium">Auto-génération code :</span> Premières lettres des mots du nom, max 6 caractères, uppercase uniquement</li>
                <li>✉️ <span className="font-medium">Validation code :</span> Regex /^[A-Z0-9]{"{2,6}"}$/ - 2 à 6 caractères majuscules et chiffres</li>
                <li>🎨 <span className="font-medium">Couleur défaut :</span> #6366f1 (indigo) si non spécifiée</li>
                <li>📊 <span className="font-medium">Calcul stats :</span> Comptage temps réel des éléments liés (needs, stories, contacts, interviews, goals)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les produits sont sauvegardés localement dans votre navigateur sous la clé "products". 
                Sauvegarde automatique via le Factory Pattern Storage (getProducts, addProduct, updateProduct, deleteProduct).
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
                Les produits sont liés aux contacts via clientIds[] (liste de clients) et ownerId (Product Owner). 
                ContactSelector et MultiContactSelector utilisés dans le formulaire.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module Objectifs</h3>
              <p className="text-sm text-gray-700">
                Chaque objectif est lié à un produit via productId. Le module vérifie la présence 
                d'objectifs avant suppression d'un produit.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎤 Module Entretiens</h3>
              <p className="text-sm text-gray-700">
                Chaque entretien est associé à un produit via productId. ProductSelector utilisé 
                pour filtrer les entretiens par produit.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">💡 Module Besoins Utilisateurs</h3>
              <p className="text-sm text-gray-700">
                Chaque besoin a un productId obligatoire. ProductSelector en haut de la liste 
                permet de filtrer les besoins par produit actif.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                Stories liées au produit via productId. Badge produit (code + couleur) affiché 
                sur chaque carte de story pour identification rapide.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🏃 Module Sprints</h3>
              <p className="text-sm text-gray-700">
                Sprints associés au produit via productId. Permet de planifier des sprints 
                par produit et d'isoler les données.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📊 Module Dashboard</h3>
              <p className="text-sm text-gray-700">
                ProductSelector global en haut du Dashboard permet de filtrer toutes les métriques 
                par produit actif sélectionné.
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

export default ProductsDetailPage;
