import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * ContactsDetailPage - Documentation TECHNIQUE du Module Contacts
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 4.2.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const ContactsDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Contacts</h1>
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
              Le <strong>Module Contacts</strong> centralise tous vos interlocuteurs : membres d'équipe internes, 
              partenaires externes et clients. Il offre une gestion complète avec association aux produits, 
              suivi de disponibilité des équipes, gestion des compétences et capacités de sprint.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Il s'intègre aux autres modules via les associations avec les produits, permettant de filtrer et organiser 
              efficacement tous vos contacts par projet.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👤 Contact Interne</h3>
              <p className="text-sm text-gray-700 mb-3">
                Membre de votre équipe ou organisation (employés, co-fondateurs, collaborateurs directs). 
                Les champs équipe sont affichés par défaut pour suivre capacité, disponibilité et compétences.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Champ organisation :</span> Département</p>
                <p><span className="font-medium">Types de contrat :</span> CDI, Temps partiel, Stagiaire, Alternant</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🏢 Contact Externe</h3>
              <p className="text-sm text-gray-700 mb-3">
                Partenaires, fournisseurs, investisseurs, consultants ou tout intervenant externe au projet. 
                Les champs équipe sont optionnels mais disponibles pour les freelances/prestataires.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Champ organisation :</span> Entreprise</p>
                <p><span className="font-medium">Types de contrat :</span> Freelance, Prestataire, Agence, Consultant</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👥 Client</h3>
              <p className="text-sm text-gray-700 mb-3">
                Clients potentiels, utilisateurs finaux, prospects ou leads identifiés pour votre activité. 
                Généralement sans champs équipe.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Champ organisation :</span> Entreprise</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Membre d'Équipe</h3>
              <p className="text-sm text-gray-700 mb-3">
                Un contact devient "membre d'équipe" dès qu'au moins un champ équipe est renseigné : 
                compétences, capacité, type de contrat ou niveau d'expérience.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Statuts :</span> Actif / Inactif • Disponible / Non disponible</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> Le type de contact peut être modifié après création. 
              Les champs Entreprise/Département s'adaptent automatiquement selon le type. 
              Les champs équipe peuvent être masqués ou affichés à tout moment.
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
                  Au premier lancement, un module pédagogique guide l'utilisateur sur :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Organisation efficace avec types et produits</li>
                  <li>Gestion d'équipe avec capacités et disponibilités</li>
                  <li>Recherche et filtres avec cartes cliquables</li>
                  <li>Import/Export CSV avec format attendu</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📱 Grille de Contacts Responsive</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation en 3 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile). 
                  Chaque contact est présenté sous forme de carte avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Nom complet</li>
                  <li><span className="font-medium">Corps :</span> Rôle, Organisation, Produits, Coordonnées cliquables</li>
                  <li><span className="font-medium">Footer :</span> Badges et 3 boutons d'action (Voir, Modifier, Supprimer)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📄 Pagination</p>
                <p className="text-sm text-gray-700">
                  9 contacts par page. Navigation avec boutons Précédent et Suivant. 
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
                  <li><span className="font-medium">Sélecteur Produit :</span> Filtre par produit actif</li>
                  <li><span className="font-medium">Template CSV :</span> Bouton violet 🟣 - Télécharge un template avec exemples</li>
                  <li><span className="font-medium">Import CSV :</span> Bouton vert 🟢 - Import en masse</li>
                  <li><span className="font-medium">Export CSV :</span> Bouton bleu 🔵 - Export avec filtres appliqués</li>
                  <li><span className="font-medium">Nouveau Contact :</span> Bouton gradient bleu-violet</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (Repliable)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Par défaut repliée. Une fois dépliée, affiche :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Recherche globale :</span> Nom, rôle, entreprise, département</li>
                  <li><span className="font-medium">Filtre Type :</span> Tous / 👤 Internes / 🏢 Externes</li>
                  <li><span className="font-medium">Filtre Équipe :</span> Tous / 👥 Membres équipe / Non membres</li>
                  <li><span className="font-medium">Filtre Disponibilité :</span> Tous / ✅ Disponibles / ⚡ Actifs / ⏸️ Inactifs</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📋 Template CSV</p>
                <p className="text-sm text-gray-700 mb-2">
                  Nouveau bouton violet pour télécharger un fichier exemple prêt à l'emploi :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Contient les 11 en-têtes de colonnes</li>
                  <li>Inclut 2 lignes d'exemple (Marie Dubois - Interne + Jean Martin - Externe)</li>
                  <li>Format UTF-8 avec BOM pour ouverture parfaite dans Excel</li>
                  <li>Nom du fichier généré : contacts-template.csv</li>
                </ul>
                <div className="mt-3 bg-white rounded border border-emerald-200 p-3">
                  <p className="text-xs text-emerald-900">
                    <span className="font-medium">🎯 Workflow recommandé :</span> Template CSV → Ouvrir dans Excel → Remplacer les exemples → Enregistrer → Import CSV
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📥 Import CSV</p>
                <p className="text-sm text-gray-700 mb-2">
                  Format CSV attendu (11 colonnes) :
                </p>
                <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                  Nom,Type,Rôle,Entreprise,Département,Email,Téléphone,Produits,Membre Équipe,Capacité,Compétences
                </code>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 mt-2 list-disc">
                  <li><span className="font-medium">Type :</span> "Interne" ou "Externe"</li>
                  <li><span className="font-medium">Produits :</span> Codes produits séparés par ";" (ex: "PROD1;PROD2")</li>
                  <li><span className="font-medium">Membre Équipe :</span> "Oui" pour activer les champs équipe</li>
                  <li><span className="font-medium">Compétences :</span> Liste séparée par ";" (ex: "React;Node.js")</li>
                </ul>
                <div className="mt-3 bg-teal-50 border border-teal-200 rounded p-2">
                  <p className="text-xs text-teal-900">
                    <span className="font-medium">💡 Astuce :</span> Téléchargez d'abord le Template CSV pour obtenir le format exact avec exemples !
                  </p>
                </div>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📤 Export CSV</p>
                <p className="text-sm text-gray-700 mb-2">
                  Exporte les contacts affichés (respecte les filtres actifs) avec 12 colonnes :
                </p>
                <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                  Nom,Type,Rôle,Entreprise,Département,Email,Téléphone,Produits,Membre Équipe,Capacité Ajustée,Compétences,Date création
                </code>
                <p className="text-xs text-gray-600 mt-2">
                  Nom du fichier généré : contacts-YYYY-MM-DD.csv
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact - condensé */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Formulaire de Contact</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">📝 Structure générale</p>
              <p className="text-sm text-gray-700 mb-3">
                Modale plein écran avec 7 sections et validation temps réel :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><span className="font-medium">📦 Produits associés</span> - Sélection multiple (obligatoire)</li>
                <li><span className="font-medium">#️⃣ Identification</span> - Nom et rôle (obligatoire)</li>
                <li><span className="font-medium">👥 Type de contact</span> - Interne / Externe / Client</li>
                <li><span className="font-medium">🏛️ Organisation</span> - Département (si Interne) ou Entreprise (si Externe/Client)</li>
                <li><span className="font-medium">📞 Coordonnées</span> - Email et téléphone</li>
                <li><span className="font-medium">⚡ Informations Équipe</span> - 7 sous-sections (optionnel, repliable)</li>
                <li><span className="font-medium">📝 Notes</span> - Informations complémentaires</li>
              </ol>
              
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">✅ Validation du formulaire</p>
                <p className="text-xs text-gray-700">
                  Champs requis : Nom, Rôle, Au moins 1 Produit. Le bouton "Sauvegarder" est désactivé si formulaire invalide.
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
              <li>💼 <span className="font-medium">Association aux produits :</span> TOUJOURS associer les contacts à au moins un produit - c'est la clé de l'organisation</li>
              <li>👥 <span className="font-medium">Gestion des équipes :</span> Activez les champs équipe pour tous les membres internes et freelances réguliers</li>
              <li>📊 <span className="font-medium">Capacité ajustée :</span> Comprendre le calcul = (capacité × disponibilité × temps produit) / 10000 pour une planification sprint réaliste</li>
              <li>✅ <span className="font-medium">Statuts cohérents :</span> Maintenez à jour les statuts "Actif" et "Disponible" pour des filtres efficaces</li>
              <li>🟣 <span className="font-medium">Template CSV :</span> Utilisez le bouton Template CSV (violet) pour découvrir le format exact attendu avec 2 exemples concrets</li>
              <li>📥 <span className="font-medium">Import CSV :</span> Workflow optimal = Template CSV → Remplir dans Excel → Enregistrer → Import CSV</li>
              <li>💾 <span className="font-medium">Export régulier :</span> Exportez en CSV régulièrement pour sauvegarde externe</li>
              <li>⚙️ <span className="font-medium">Listes Paramétrage :</span> Gérez les listes Rôles/Entreprises/Départements pour éviter les doublons</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données - condensé */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'un Contact</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs de base</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>id, name, role, type</div>
                    <div>company, department</div>
                    <div>email, phone, notes</div>
                    <div>productIds[], createdAt, updatedAt</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs équipe (optionnels)</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>seniority, skills[]</div>
                    <div>capacity, availability, workload</div>
                    <div>contractType, dailyRate, currency</div>
                    <div>location, timezone, workingHours</div>
                    <div>startDate, endDate</div>
                    <div>isActive, isAvailable, preferences</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🔍 <span className="font-medium">Détection membre équipe :</span> Un contact est membre d'équipe si au moins un champ parmi skills, capacity, contractType est renseigné</li>
                <li>📊 <span className="font-medium">Calcul capacité ajustée :</span> Math.round((capacity × availability × workload) / 10000)</li>
                <li>✉️ <span className="font-medium">Validation email :</span> Regex standard /^[^\s@]+@[^\s@]+\.[^\s@]+$/</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les contacts sont sauvegardés localement dans votre navigateur sous la clé "contacts". 
                Sauvegarde automatique à chaque opération via le Factory Pattern Storage.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">🔒 Confidentialité :</span> Vos données restent 100% privées et ne sont jamais envoyées vers un serveur externe.
              </p>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules - condensé */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700">
                Les contacts sont obligatoirement associés à au moins un produit actif. 
                Le ProductSelector permet de filtrer les contacts par produit dans la liste principale.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎤 Module Entretiens</h3>
              <p className="text-sm text-gray-700">
                Chaque entretien est lié à un contact via contactId. 
                ContactSelector utilisé pour choisir l'interlocuteur.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module Besoins Utilisateurs</h3>
              <p className="text-sm text-gray-700">
                Chaque besoin a un primaryContactId (contact principal) et stakeholderIds[] (liste des parties prenantes).
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700">
                stakeholders[] : liste des contacts impliqués dans la story. 
                MultiContactSelector pour associer plusieurs contacts.
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

export default ContactsDetailPage;
