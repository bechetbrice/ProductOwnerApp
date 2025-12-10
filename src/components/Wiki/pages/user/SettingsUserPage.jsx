import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * SettingsUserPage - Guide UTILISATEUR du Module Paramétrage
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const SettingsUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">⚙️ Guide Paramétrage</h1>
              <p className="text-teal-100 text-lg">Configurez votre application selon vos besoins</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Paramétrage ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Paramétrage</strong> est votre <strong>centre de contrôle</strong> pour configurer 
              l'application selon vos besoins. Il regroupe 3 grandes sections essentielles :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold text-gray-900 mb-2">Export Automatique</h3>
                <p className="text-sm text-gray-600">
                  Sauvegardez automatiquement vos données à intervalle régulier sans y penser
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold text-gray-900 mb-2">Listes Personnalisées</h3>
                <p className="text-sm text-gray-600">
                  Gérez vos référentiels : rôles, entreprises et départements partagés dans l'app
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">⚖️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Mentions Légales</h3>
                <p className="text-sm text-gray-600">
                  Consultez les informations légales, copyright et conditions d'utilisation
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 L'essentiel :</span> Cette application fonctionne 100% offline. 
                Vos données restent sur votre appareil. Le module Paramétrage vous aide à sécuriser et organiser votre travail.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Activer l'export automatique</h3>
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur l'onglet <span className="font-medium text-teal-600">"Général"</span></p>
                  <p className="text-sm text-gray-700">• Dépliez la section "Export automatique"</p>
                  <p className="text-sm text-gray-700">• Activez le bouton bascule "Activer l'export automatique"</p>
                  <p className="text-sm text-gray-700">• Réglez la fréquence : 5 à 120 minutes (recommandé : 30 min)</p>
                  <p className="text-sm text-gray-700">• L'application sauvegardera automatiquement vos données dès qu'une modification est détectée</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Configurer vos listes personnalisées</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur l'onglet <span className="font-medium text-teal-600">"Listes Personnalisées"</span></p>
                  <p className="text-sm text-gray-700">• Ajoutez vos <span className="font-medium">rôles</span> fréquents (Product Owner, Dev, Designer...)</p>
                  <p className="text-sm text-gray-700">• Ajoutez vos <span className="font-medium">entreprises</span> partenaires</p>
                  <p className="text-sm text-gray-700">• Ajoutez vos <span className="font-medium">départements</span> internes (IT, Marketing, RH...)</p>
                  <p className="text-sm text-gray-700">• Ces listes seront disponibles dans les formulaires Contacts et Entretiens !</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Vérifier votre espace de stockage</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Dans l'onglet "Général", consultez la section "Utilisation du stockage"</p>
                  <p className="text-sm text-gray-700">• Vous voyez l'espace utilisé sur les ~5 MB disponibles dans le navigateur</p>
                  <p className="text-sm text-gray-700">• Si vous approchez 80%, pensez à exporter et nettoyer vos anciennes données</p>
                  <p className="text-sm text-gray-700">• L'application reste 100% fonctionnelle même avec beaucoup de données</p>
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
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔄 Scénario 1 : "Je veux sécuriser mes données automatiquement"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Ne plus avoir à penser aux sauvegardes. L'application le fait pour moi !</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Onglet "Général" → Section "Export automatique"</li>
                  <li>Activez le bouton bascule vert</li>
                  <li>Réglez la fréquence : 30 min recommandé (équilibre sécurité/performance)</li>
                  <li>Configurez la limite quotidienne : 20 exports max/jour (protection)</li>
                  <li>Activez la notification si vous voulez être prévenu avant chaque export</li>
                  <li>Et voilà ! L'application surveille les modifications et exporte automatiquement</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Les fichiers sont téléchargés dans votre dossier "Téléchargements" 
                    avec le format <code className="bg-green-100 px-1 rounded">productownerapp_auto_2025-01-15_14-30-00.json</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📝 Scénario 2 : "J'en ai marre de saisir les mêmes rôles à chaque contact"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Créer une liste de rôles prédéfinis pour gagner du temps dans les formulaires.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Onglet "Listes Personnalisées"</li>
                  <li>Dans la carte "Rôles / Postes", cliquez sur "+ Ajouter un rôle"</li>
                  <li>Tapez votre rôle (ex: "Product Owner"), appuyez sur Enter ou cliquez ✓</li>
                  <li>Répétez pour tous vos rôles fréquents : "Dev Full-Stack", "UX Designer", "Chef de projet"...</li>
                  <li>Ces rôles apparaîtront dans les menus déroulants des formulaires Contacts et Entretiens !</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Gain de temps :</span> Plus besoin de retaper "Product Owner" à chaque fois ! 
                    Sélectionnez simplement dans la liste. Les éléments sont automatiquement triés par ordre alphabétique.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">💾 Scénario 3 : "Je veux exporter immédiatement mes données"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Faire une sauvegarde manuelle avant une grosse modification ou pour archivage externe.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Onglet "Général" → Section "Export automatique"</li>
                  <li>Descendez jusqu'au bouton vert "Export manuel maintenant"</li>
                  <li>Cliquez : le fichier JSON est immédiatement téléchargé</li>
                  <li>Un message de confirmation apparaît : "✅ Export manuel réussi !"</li>
                  <li>Le fichier contient TOUTES vos données : produits, contacts, besoins, stories, sprints...</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bon usage :</span> L'export manuel ne compte PAS dans la limite quotidienne. 
                    Vous pouvez l'utiliser autant que nécessaire pour vos sauvegardes critiques !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🏢 Scénario 4 : "Je travaille avec plusieurs entreprises partenaires"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Créer une liste d'entreprises pour qualifier rapidement mes contacts externes.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Onglet "Listes Personnalisées"</li>
                  <li>Dans la carte "Entreprises", ajoutez vos partenaires : "Acme Corp", "TechStart", "ConsultPro"...</li>
                  <li>Modifiez ou supprimez via les boutons qui apparaissent au survol de chaque item</li>
                  <li>Ces entreprises seront disponibles lors de la création de contacts externes</li>
                </ol>

                <div className="bg-white border border-emerald-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🔗 Cohérence :</span> Utiliser les listes évite les doublons de saisie 
                    (ex: "Acme Corp" vs "ACME CORP" vs "Acme"). Une seule orthographe = données propres !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du module Paramétrage</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Activer l'export automatique dès le premier jour</p>
                <p className="text-sm text-gray-700">Sécurisez vos données sans effort. Réglez l'intervalle à 30 min et oubliez les sauvegardes manuelles !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Configurer les listes AVANT de créer des contacts</p>
                <p className="text-sm text-gray-700">Prenez 5 minutes pour créer vos rôles, entreprises et départements. Vous gagnerez des heures par la suite !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Surveiller régulièrement l'espace de stockage</p>
                <p className="text-sm text-gray-700">Consultez la jauge dans l'onglet Général. À partir de 80%, pensez à nettoyer ou exporter puis réinitialiser</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Exporter manuellement avant une grosse opération</p>
                <p className="text-sm text-gray-700">Avant une suppression massive, un import CSV ou une réinitialisation : export manuel = filet de sécurité</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Maintenir les listes à jour et cohérentes</p>
                <p className="text-sm text-gray-700">Modifiez/supprimez les doublons dans les listes personnalisées pour garder des référentiels propres</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Ne JAMAIS supprimer toutes les données sans export</p>
                <p className="text-sm text-gray-700">La zone dangereuse = IRRÉVERSIBLE. Export manuel → puis suppression si vraiment nécessaire</p>
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
                ❓ Comment fonctionne l'export automatique ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">L'application surveille les modifications dans vos données à l'intervalle que vous avez défini (ex: toutes les 30 min).</p>
                <p className="mt-2">Si des changements sont détectés depuis le dernier export, un fichier JSON est automatiquement téléchargé dans votre dossier "Téléchargements".</p>
                <p className="mt-2">Si aucune modification n'a eu lieu, aucun export n'est effectué → économie d'espace et de bande passante !</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ À quoi sert la limite quotidienne d'exports ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">C'est une protection pour éviter de surcharger votre dossier Téléchargements avec des centaines d'exports.</p>
                <p className="mt-2">Par défaut : 20 exports automatiques maximum par jour.</p>
                <p className="mt-2"><span className="font-medium">Bon à savoir :</span> Les exports manuels (bouton "Export manuel maintenant") ne comptent PAS dans cette limite !</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Que contient un fichier d'export ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">Le fichier JSON contient <span className="font-medium">TOUTES vos données</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Produits</li>
                  <li>Contacts</li>
                  <li>Entretiens</li>
                  <li>Besoins utilisateurs</li>
                  <li>User Stories</li>
                  <li>Objectifs</li>
                  <li>Sprints et tâches</li>
                  <li>Paramètres (listes personnalisées)</li>
                  <li>Préférences utilisateur</li>
                </ul>
                <p className="mt-2">Format : JSON structuré et lisible, réimportable ultérieurement</p>
              </div>
            </details>

            <details className="bg-emerald-50 border border-emerald-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-emerald-100 transition-colors">
                ❓ Comment utiliser les listes personnalisées ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-emerald-100">
                <p className="mt-3">Les listes (rôles, entreprises, départements) sont partagées dans toute l'application.</p>
                <p className="mt-2"><span className="font-medium">Création :</span> Onglet "Listes Personnalisées" → Cliquez "+ Ajouter" → Tapez le nom → Enter ou ✓</p>
                <p className="mt-2"><span className="font-medium">Modification :</span> Survolez un item → Cliquez le crayon bleu → Modifiez → Enter ou ✓</p>
                <p className="mt-2"><span className="font-medium">Suppression :</span> Survolez un item → Cliquez la corbeille rouge → Confirmez</p>
                <p className="mt-2"><span className="font-medium">⚠️ Important :</span> Si vous supprimez un élément, il reste dans les enregistrements existants (contacts/entretiens déjà créés). Seule la liste est modifiée.</p>
              </div>
            </details>

            <details className="bg-yellow-50 border border-yellow-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-yellow-100 transition-colors">
                ❓ Combien d'espace de stockage ai-je ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-yellow-100">
                <p className="mt-3">L'application utilise le <span className="font-medium">localStorage</span> de votre navigateur, limité à environ <span className="font-medium">5 à 10 MB</span>.</p>
                <p className="mt-2">Consultez la jauge dans Paramétrage → Général → "Utilisation du stockage"</p>
                <p className="mt-2">Si vous approchez 80-90%, pensez à exporter puis nettoyer vos anciennes données (contacts inactifs, sprints terminés depuis longtemps...)</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que fait le bouton "Effacer toutes les données" ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3 font-bold text-red-600">⚠️ ACTION IRRÉVERSIBLE ⚠️</p>
                <p className="mt-2">Ce bouton supprime <span className="font-medium">DÉFINITIVEMENT</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Tous vos business plans</li>
                  <li>Tous vos objectifs et analyses</li>
                  <li>Toutes vos préférences</li>
                  <li>L'intégralité du localStorage</li>
                </ul>
                <p className="mt-3"><span className="font-medium">Usage recommandé :</span></p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Export manuel complet</li>
                  <li>Vérifier que le fichier est bien téléchargé et valide</li>
                  <li>Double confirmation requise</li>
                  <li>Suppression → rechargement automatique de la page</li>
                </ol>
                <p className="mt-2 text-red-600 font-medium">À utiliser uniquement pour réinitialiser complètement l'application !</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Mes données sont-elles sécurisées ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3 font-medium">🔒 100% sécurisé et privé !</p>
                <p className="mt-2">ProductOwnerApp fonctionne entièrement <span className="font-medium">offline</span>. Vos données sont stockées localement dans votre navigateur.</p>
                <p className="mt-2"><span className="font-medium">Aucune donnée n'est jamais envoyée</span> vers un serveur externe.</p>
                <p className="mt-2">Aucun cookie, aucun tracker, aucun Google Analytics. Vous avez le contrôle total.</p>
                <p className="mt-2"><span className="font-medium">💡 Conseil :</span> Exportez régulièrement en CSV/JSON pour une sauvegarde externe supplémentaire sur votre cloud perso ou disque dur.</p>
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
                et pour comprendre en profondeur le fonctionnement du module (contexte AutoExport, structure données, intégrations...).
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

export default SettingsUserPage;
