import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * ContactsUserPage - Guide UTILISATEUR du Module Contacts
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.2.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const ContactsUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">👥 Guide Contacts</h1>
              <p className="text-teal-100 text-lg">Gérez efficacement tous vos interlocuteurs projet</p>
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
              <Users className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Contacts ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Contacts</strong> est votre <strong>annuaire centralisé</strong> pour tous les interlocuteurs 
              de vos produits : votre équipe, vos partenaires, et vos clients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">👤</div>
                <h3 className="font-semibold text-gray-900 mb-2">Équipe Interne</h3>
                <p className="text-sm text-gray-600">
                  Suivez les capacités, disponibilités et compétences de votre équipe pour mieux planifier vos sprints
                </p>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🏢</div>
                <h3 className="font-semibold text-gray-900 mb-2">Partenaires Externes</h3>
                <p className="text-sm text-gray-600">
                  Gardez un accès facile aux coordonnées de vos fournisseurs, freelances et consultants
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold text-gray-900 mb-2">Clients & Prospects</h3>
                <p className="text-sm text-gray-600">
                  Centralisez vos contacts clients pour faciliter la communication et le suivi
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : l'association aux produits.</span> Chaque contact est lié à au moins un produit, 
                ce qui vous permet de filtrer rapidement et de voir uniquement les contacts pertinents pour chaque projet.
              </p>
            </div>
          </div>
        </div>

        {/* Démarrage rapide */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <Rocket className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Démarrage rapide (5 min)</h2>
          </div>

          {/* Étape 1 */}
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre premier contact</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur le bouton <span className="font-medium text-teal-600">"Nouveau Contact"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• Sélectionnez au moins un produit (obligatoire)</p>
                  <p className="text-sm text-gray-700">• Renseignez le nom et le rôle (obligatoire)</p>
                  <p className="text-sm text-gray-700">• Choisissez le type : Interne, Externe ou Client</p>
                  <p className="text-sm text-gray-700">• Ajoutez email et téléphone pour faciliter le contact</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Pour l'équipe :</span> activez les champs équipe pour suivre capacités et compétences</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Retrouver un contact rapidement</h3>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Utilisez la <span className="font-medium">barre de recherche</span> pour chercher par nom, rôle ou entreprise</p>
                  <p className="text-sm text-gray-700">• Filtrez par <span className="font-medium">produit</span> en haut (si vous avez plusieurs produits)</p>
                  <p className="text-sm text-gray-700">• Cliquez sur "Filtres" pour affiner : type, entreprise, équipe, disponibilité...</p>
                  <p className="text-sm text-gray-700">• Bouton <span className="font-medium">"Réinitialiser"</span> pour effacer tous les filtres d'un coup</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Importer/Exporter vos contacts</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">Template CSV :</span> Bouton violet 🟣 pour télécharger un fichier exemple avec 2 contacts pré-remplis</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Import CSV :</span> Bouton vert 🟢 pour importer en masse depuis Excel</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Export CSV :</span> Bouton bleu 🔵 pour sauvegarder ou partager vos contacts</p>
                  <p className="text-sm text-gray-700">• L'export respecte les filtres actifs (pratique pour extraire une liste ciblée)</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 1 : "Je veux planifier mon prochain sprint"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Savoir quelle est ma capacité d'équipe disponible pour les 2 prochaines semaines.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur "Filtres" puis sélectionnez "👥 Membres équipe"</li>
                  <li>Filtrez par "✅ Disponibles" pour voir uniquement ceux qui peuvent prendre de nouvelles tâches</li>
                  <li>Cliquez sur chaque contact pour voir leur <span className="font-medium">capacité ajustée</span> (calculée automatiquement)</li>
                  <li>Notez les compétences de chacun pour répartir les tâches efficacement</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> La "capacité ajustée" est calculée automatiquement : 
                    <span className="font-medium"> Capacité × Disponibilité % × Temps produit %</span>. 
                    C'est votre vraie vélocité disponible !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📥 Scénario 2 : "J'arrive sur le projet, je veux importer mon équipe Excel"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Importer rapidement toute mon équipe depuis un fichier Excel existant.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li><span className="font-medium">🟣 Téléchargez le template :</span> Cliquez sur "Template CSV" (bouton violet) pour obtenir un fichier exemple</li>
                  <li>Ouvrez le fichier dans Excel → Vous voyez les 11 colonnes + 2 exemples (Marie Dubois et Jean Martin)</li>
                  <li>Remplacez les exemples par vos vrais contacts (gardez le même format !)</li>
                  <li>Enregistrez en CSV UTF-8 ("Enregistrer sous" → CSV UTF-8)</li>
                  <li>Cliquez sur "Import CSV" (bouton vert) dans ProductOwnerApp</li>
                  <li>Sélectionnez votre fichier → Validation automatique</li>
                  <li>Tous vos contacts sont créés en quelques secondes !</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-700 mb-2">
                    <span className="font-medium text-gray-900">📋 Format CSV requis (11 colonnes) :</span>
                  </p>
                  <div className="bg-gray-50 rounded border border-gray-300 p-2 mb-2 overflow-x-auto">
                    <code className="text-xs">
                      Nom,Type,Rôle,Entreprise,Département,Email,Téléphone,Produits,Membre Équipe,Capacité,Compétences
                    </code>
                  </div>
                  <p className="text-xs text-gray-700">
                    <span className="font-medium">Produits :</span> Codes courts séparés par ";" (ex: "PROD1;PROD2")<br/>
                    <span className="font-medium">Compétences :</span> Liste séparée par ";" (ex: "React;Node.js")<br/>
                    <span className="font-medium">Membre Équipe :</span> "Oui" pour activer les champs équipe
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 3 : "Je cherche le contact d'un partenaire externe"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Retrouver rapidement les coordonnées d'un fournisseur ou consultant pour l'appeler.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Tapez le nom ou l'entreprise dans la barre de recherche</li>
                  <li>OU : Cliquez sur "Filtres" → Sélectionnez "🏢 Externes" + l'entreprise</li>
                  <li>Cliquez sur l'email ou le téléphone pour contacter directement (liens cliquables)</li>
                </ol>

                <div className="bg-white border border-emerald-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Gain de temps :</span> Les emails et téléphones sont cliquables : cliquez pour ouvrir votre client mail 
                    ou composer directement le numéro !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📦 Scénario 4 : "Je gère plusieurs produits, comment m'organiser ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Voir uniquement les contacts qui travaillent sur un produit spécifique.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>En haut de la page, utilisez le <span className="font-medium">sélecteur de produit</span></li>
                  <li>Choisissez le produit qui vous intéresse</li>
                  <li>La liste se filtre automatiquement : vous voyez UNIQUEMENT les contacts assignés à ce produit</li>
                  <li>Exportez cette liste filtrée en CSV si besoin (bouton "Export CSV")</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Associez TOUJOURS vos contacts à au moins un produit dès la création. 
                    C'est la clé pour une organisation efficace multi-produits !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du module Contacts</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Toujours associer à un produit</p>
                <p className="text-sm text-gray-700">Sans produit = contact invisible dans les filtres. Associez au moins un produit dès la création !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Utiliser les listes du Paramétrage</p>
                <p className="text-sm text-gray-700">Gérez vos listes de Rôles, Entreprises et Départements dans Paramétrage pour éviter les doublons</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Activer les champs équipe pour l'équipe</p>
                <p className="text-sm text-gray-700">Pour tous vos membres internes et freelances réguliers, activez les champs équipe pour suivre capacité et compétences</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Mettre à jour régulièrement les statuts</p>
                <p className="text-sm text-gray-700">Maintenez les statuts "Actif" et "Disponible" à jour pour des planifications sprint réalistes</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Utiliser Template CSV avant d'importer</p>
                <p className="text-sm text-gray-700">Téléchargez le Template CSV (bouton violet) pour découvrir le format exact avec 2 exemples. Remplissez-le dans Excel puis importez en un clic !</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Exporter régulièrement en CSV</p>
                <p className="text-sm text-gray-700">Sauvegardez vos contacts hors ligne pour sécurité. L'app fonctionne 100% offline mais une sauvegarde externe reste prudente !</p>
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
                ❓ Quelle est la différence entre "Interne" et "Externe" ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">Interne :</span> Membres de votre équipe ou organisation (employés, co-fondateurs). 
                Les champs équipe sont affichés par défaut.</p>
                <p className="mt-2"><span className="font-medium">Externe :</span> Partenaires, fournisseurs, consultants. Les champs équipe sont optionnels.</p>
              </div>
            </details>

            <details className="bg-emerald-50 border border-emerald-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-emerald-100 transition-colors">
                ❓ Qu'est-ce que la "capacité ajustée" ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-emerald-100">
                <p className="mt-3">C'est la vraie capacité disponible de votre membre d'équipe calculée automatiquement :</p>
                <p className="mt-2 font-medium">Capacité ajustée = Capacité × Disponibilité % × Temps produit %</p>
                <p className="mt-2">Exemple : Capacité 20 pts/sprint × 80% disponible × 50% temps sur ce produit = <span className="font-medium">8 pts/sprint réels</span></p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Pourquoi associer les contacts aux produits ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">L'association aux produits permet de :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Filtrer rapidement les contacts par projet</li>
                  <li>Voir uniquement les contacts pertinents dans chaque module</li>
                  <li>Organiser efficacement vos interlocuteurs multi-produits</li>
                  <li>Exporter des listes ciblées par produit</li>
                </ul>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment importer mes contacts depuis Excel ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <div className="bg-emerald-100 border border-emerald-200 rounded p-3 mt-3 mb-4">
                  <p className="text-xs font-medium text-emerald-900 mb-1">🎯 MÉTHODE LA PLUS SIMPLE :</p>
                  <ol className="text-xs space-y-1 ml-4 list-decimal">
                    <li>Cliquez sur le bouton violet <span className="font-medium">"Template CSV"</span></li>
                    <li>Ouvrez le fichier téléchargé dans Excel</li>
                    <li>Remplacez les 2 exemples par vos vrais contacts</li>
                    <li>Enregistrez (le format CSV est déjà bon !)</li>
                    <li>Importez avec le bouton vert "Import CSV"</li>
                  </ol>
                </div>

                <p className="font-medium text-gray-900 mb-2">📋 Format CSV attendu (11 colonnes) :</p>
                <div className="bg-white rounded border border-gray-300 p-3 mb-3 overflow-x-auto">
                  <code className="text-xs">
                    Nom,Type,Rôle,Entreprise,Département,Email,Téléphone,Produits,Membre Équipe,Capacité,Compétences
                  </code>
                </div>

                <p className="font-medium text-gray-900 mb-2 mt-4">📝 Exemple de ligne :</p>
                <div className="bg-white rounded border border-gray-300 p-3 mb-3 overflow-x-auto">
                  <code className="text-xs">
                    "Marie Dubois","Interne","Développeuse Full-Stack","","Tech","marie@example.com","+33612345678","PROD1;PROD2","Oui","20","React;Node.js;TypeScript"
                  </code>
                </div>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime un contact ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">Avant suppression, l'app vérifie automatiquement les relations :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Entretiens liés au contact</li>
                  <li>Besoins utilisateurs où il est mentionné</li>
                  <li>User Stories où il apparaît</li>
                </ul>
                <p className="mt-3">
                  Vous êtes averti du nombre de relations, et TOUTES seront supprimées si vous confirmez. 
                  <span className="font-medium"> Cette action est irréversible !</span>
                </p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Mes données sont-elles en sécurité ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">🔒 100% sécurisé et privé !</p>
                <p className="mt-2">ProductOwnerApp fonctionne entièrement offline. Vos contacts sont stockés localement dans votre navigateur. Aucune donnée n'est jamais envoyée vers un serveur externe.</p>
                <p className="mt-2"><span className="font-medium">💡 Conseil :</span> Exportez régulièrement en CSV pour une sauvegarde externe supplémentaire.</p>
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
                et pour comprendre en profondeur le fonctionnement du module (modèle de données, intégrations, composants...).
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

export default ContactsUserPage;
