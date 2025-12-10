import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * TeamsUserPage - Guide UTILISATEUR du Module Équipes
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du standard ContactsUserPage (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const TeamsUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">👥 Guide Équipes</h1>
              <p className="text-teal-100 text-lg">Organisez vos talents et maximisez votre vélocité</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Équipes ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Équipes</strong> vous permet d'organiser vos contacts en <strong>groupes de travail structurés</strong> : 
              Squads Agiles, Chapters techniques, Teams fonctionnelles ou projets temporaires. 
              C'est votre <strong>outil de management des ressources humaines</strong> pour une planification efficace.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Structurer</h3>
                <p className="text-sm text-gray-600">
                  Regroupez les personnes travaillant ensemble sur les mêmes produits ou technologies
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Planifier</h3>
                <p className="text-sm text-gray-600">
                  Calculez automatiquement la capacité collective pour une planification sprint réaliste
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">👤</div>
                <h3 className="font-semibold text-gray-900 mb-2">Responsabiliser</h3>
                <p className="text-sm text-gray-600">
                  Désignez un Team Lead pour clarifier les responsabilités et faciliter la coordination
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : la capacité collective.</span> Le module calcule automatiquement 
                la somme des capacités de tous les membres pour vous donner une vélocité d'équipe précise !
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre première équipe</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouvelle Équipe"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• Tous vos produits actifs sont <span className="font-medium">pré-sélectionnés</span> (modifiez si besoin)</p>
                  <p className="text-sm text-gray-700">• Donnez un nom clair (ex: "Squad Frontend", "Team Backend Core")</p>
                  <p className="text-sm text-gray-700">• Ajoutez une description : objectif, périmètre, technos</p>
                  <p className="text-sm text-gray-700">• Statut <span className="font-medium">"Active"</span> est recommandé par défaut</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Cochez les membres</span> de l'équipe (au moins 1 requis)</p>
                  <p className="text-sm text-gray-700">• Désignez un Team Lead parmi les membres (optionnel)</p>
                  <p className="text-sm text-gray-700">• La <span className="font-medium">capacité totale</span> s'affiche automatiquement !</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Filtrer et organiser</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Utilisez le <span className="font-medium">sélecteur de produit</span> en haut pour filtrer par projet</p>
                  <p className="text-sm text-gray-700">• Cliquez sur "Filtres" pour affiner : Actives / Inactives / Tous</p>
                  <p className="text-sm text-gray-700">• Par défaut, seules les équipes <span className="font-medium">Actives</span> sont affichées</p>
                  <p className="text-sm text-gray-700">• Bouton <span className="font-medium">"Réinitialiser"</span> pour revenir à la vue par défaut</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Consulter les détails</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium">👁️ Voir</span> pour ouvrir la vue complète</p>
                  <p className="text-sm text-gray-700">• Visualisez tous les membres avec leurs compétences, rôles et capacités</p>
                  <p className="text-sm text-gray-700">• Le <span className="font-medium">Team Lead</span> est identifié par un badge spécial</p>
                  <p className="text-sm text-gray-700">• Consultez les produits associés et la description</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 1 : "Je planifie mon prochain sprint"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Savoir combien de story points mon équipe peut absorber pour les 2 prochaines semaines.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Accédez au module <span className="font-medium">Équipes</span></li>
                  <li>Cliquez sur <span className="font-medium">👁️ Voir</span> pour votre équipe</li>
                  <li>Regardez la section "Membres de l'équipe" → Chaque membre affiche sa <span className="font-medium">capacité individuelle</span></li>
                  <li>La somme apparaît automatiquement : <span className="font-medium">ex: 42 pts/sprint</span></li>
                  <li>Utilisez cette capacité pour sélectionner vos stories dans le Sprint Planning</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> La capacité tient déjà compte de la disponibilité 
                    et du temps dédié au produit de chaque membre. C'est votre vraie vélocité exploitable !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🚀 Scénario 2 : "Je lance un nouveau projet temporaire"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Créer une équipe dédiée pour un projet spécifique de 3 mois.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez une nouvelle équipe : <span className="font-medium">"Task Force Migration API"</span></li>
                  <li>Sélectionnez uniquement le produit concerné (ex: "API v2")</li>
                  <li>Cochez les membres mobilisés : 3 développeurs + 1 architecte</li>
                  <li>Désignez l'architecte comme <span className="font-medium">Team Lead</span></li>
                  <li>Statut <span className="font-medium">"Active"</span> pendant la durée du projet</li>
                  <li>À la fin du projet : Passez le statut en <span className="font-medium">"Inactive"</span> (archivage)</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Les équipes temporaires sont archivées (statut Inactive) 
                    plutôt que supprimées pour conserver l'historique et les métriques.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">👥 Scénario 3 : "Un membre part en congés 2 semaines"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Ajuster la capacité de l'équipe pendant l'absence temporaire d'un membre.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Allez dans le module <span className="font-medium">Contacts</span></li>
                  <li>Éditez le contact concerné</li>
                  <li>Dans les champs équipe, modifiez <span className="font-medium">"Disponibilité"</span> : 100% → 0%</li>
                  <li>Sauvegardez</li>
                  <li>Retour au module Équipes → La <span className="font-medium">capacité totale</span> est automatiquement recalculée !</li>
                  <li>Après le congé : Remettez Disponibilité à 100%</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Alternative :</span> Vous pouvez aussi cocher/décocher "Disponible" 
                    dans le contact pour un effet similaire (100% ou 0%).
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 4 : "Je cherche qui travaille sur quel produit"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Identifier rapidement toutes les équipes mobilisées sur un produit spécifique.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez le module Équipes</li>
                  <li>Utilisez le <span className="font-medium">sélecteur de produit</span> en haut de la page</li>
                  <li>Sélectionnez votre produit (ex: "Application Mobile")</li>
                  <li>La liste se filtre automatiquement : vous voyez <span className="font-medium">uniquement les équipes</span> travaillant sur ce produit</li>
                  <li>Chaque carte affiche les membres, la capacité et les badges produits</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Une équipe peut travailler sur plusieurs produits. 
                    Les filtres vous aident à voir la répartition des ressources.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 5 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">⚙️ Scénario 5 : "Je réorganise mes équipes (restructuration)"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Passer d'une organisation fonctionnelle (Frontend/Backend) à des Squads produit.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Passez les anciennes équipes en statut <span className="font-medium">"Inactive"</span> (ne supprimez pas !)</li>
                  <li>Créez les nouvelles Squads : "Squad Checkout", "Squad Panier", "Squad Compte Client"</li>
                  <li>Pour chaque Squad, sélectionnez les <span className="font-medium">membres cross-fonctionnels</span> (mix Frontend + Backend)</li>
                  <li>Associez chaque Squad au produit principal concerné</li>
                  <li>Désignez un <span className="font-medium">Product Owner</span> comme Team Lead de chaque Squad</li>
                </ol>

                <div className="bg-white border border-emerald-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📊 Avantage :</span> Conserver les anciennes équipes en Inactive 
                    vous permet de comparer les métriques (vélocité, qualité) avant/après la réorganisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du module Équipes</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Nom clair et descriptif</p>
                <p className="text-sm text-gray-700">Utilisez des noms explicites : "Squad Frontend", "Chapter DevOps", "Task Force API". 
                Évitez "Équipe 1", "Team A" qui ne parlent à personne.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Contacts internes uniquement</p>
                <p className="text-sm text-gray-700">Seuls les contacts avec le champ "Membre actif" coché peuvent être ajoutés aux équipes. 
                Si vous ne voyez pas un contact, vérifiez sa fiche dans le module Contacts.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Taille optimale : 5-9 personnes</p>
                <p className="text-sm text-gray-700">Les bonnes pratiques Agile recommandent des équipes de 5 à 9 membres pour une efficacité maximale. 
                En dessous = surcharge, au-dessus = coordination difficile.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Team Lead = membre de l'équipe</p>
                <p className="text-sm text-gray-700">Le Team Lead DOIT être un membre de l'équipe. Si vous retirez un membre qui était Lead, 
                le champ Lead est automatiquement réinitialisé.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Capacité = réalité terrain</p>
                <p className="text-sm text-gray-700">La capacité affichée tient compte des congés, temps partiels, charge produit. 
                Maintenez les disponibilités à jour dans les contacts pour une planification réaliste.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Archiver plutôt que supprimer</p>
                <p className="text-sm text-gray-700">Passez les équipes terminées en statut "Inactive" pour conserver l'historique. 
                Utile pour analyses rétrospectives et REX (retours d'expérience).</p>
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
                ❓ Pourquoi je ne vois pas certains contacts dans la liste ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">Seuls les contacts internes "actifs" peuvent être membres.</span></p>
                <p className="mt-2">Pour qu'un contact soit éligible :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Allez dans le module Contacts</li>
                  <li>Éditez le contact concerné</li>
                  <li>Déployez la section "Informations Équipe"</li>
                  <li>Renseignez au moins un champ (compétences, capacité, contrat...)</li>
                  <li>Cochez "Actif" dans les statuts</li>
                  <li>Sauvegardez → Le contact apparaît maintenant dans le module Équipes !</li>
                </ol>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Comment est calculée la capacité de l'équipe ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">C'est la somme des capacités ajustées de chaque membre :</p>
                <div className="mt-3 bg-white border border-teal-200 rounded p-3">
                  <p className="font-medium text-gray-900 mb-2">Formule pour 1 membre :</p>
                  <p className="text-xs">Capacité ajustée = (Capacité × Disponibilité % × Temps produit %) / 10000</p>
                  <p className="text-xs text-gray-600 mt-2">Exemple : 20 pts × 80% dispo × 50% temps produit = 8 pts/sprint</p>
                </div>
                <p className="mt-3 font-medium text-gray-900">Formule équipe :</p>
                <p className="text-xs">Capacité équipe = Somme des capacités ajustées de TOUS les membres</p>
                <p className="mt-2 text-xs">
                  <span className="font-medium">💡 Exemple équipe de 5 :</span> 8 + 12 + 10 + 15 + 6 = 51 pts/sprint
                </p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ C'est quoi la différence entre Squad, Chapter et Team ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Ce sont juste des <span className="font-medium">conventions de nommage</span> selon votre organisation :</p>
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">🎯 Squad</p>
                    <p className="text-xs">Équipe cross-fonctionnelle dédiée à un produit (ex: "Squad Checkout"). 
                    Mix de compétences : dev frontend, backend, QA...</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">📚 Chapter</p>
                    <p className="text-xs">Groupe de spécialistes d'une même compétence (ex: "Chapter Frontend"). 
                    Partage de bonnes pratiques techniques.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">👥 Team</p>
                    <p className="text-xs">Équipe fonctionnelle ou projet temporaire (ex: "Task Force Migration"). 
                    Peut être n'importe quelle organisation.</p>
                  </div>
                </div>
                <p className="mt-3 text-xs bg-white border border-cyan-200 rounded p-2">
                  <span className="font-medium text-gray-900">💡 Dans ProductOwnerApp :</span> Aucune différence technique. 
                  Utilisez le nom qui fait sens pour VOTRE organisation !
                </p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Une équipe peut-elle travailler sur plusieurs produits ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3"><span className="font-medium">Oui, absolument !</span> C'est même recommandé dans certains cas :</p>
                <ul className="mt-2 space-y-2 ml-4 list-disc">
                  <li><span className="font-medium">Équipes transverses :</span> Ex: "Chapter DevOps" travaille sur TOUS les produits</li>
                  <li><span className="font-medium">Produits liés :</span> Ex: "Squad API" gère "API Core" + "API Mobile"</li>
                  <li><span className="font-medium">Ressources partagées :</span> Ex: "Team UX" intervient sur 3 produits différents</li>
                </ul>
                <div className="mt-3 bg-white border border-green-200 rounded p-2">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Comment gérer :</span> Lors de la création, cochez simplement plusieurs produits. 
                    Le filtre produit vous permet ensuite de voir toutes les équipes concernées par un projet.
                  </p>
                </div>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime une équipe ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3 font-medium text-red-700">⚠️ SUPPRESSION = PERTE DE L'ÉQUIPE UNIQUEMENT</p>
                <p className="mt-2">Contrairement aux modules Produits ou Contacts, <span className="font-medium">supprimer une équipe n'affecte pas d'autres données</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Les contacts restent intacts (ils ne sont pas supprimés)</li>
                  <li>Les sprints et user stories ne sont pas affectés</li>
                  <li>Seule l'organisation "équipe" disparaît</li>
                </ul>
                <div className="mt-3 bg-white border border-red-200 rounded p-2">
                  <p className="text-xs text-red-900">
                    <span className="font-medium">💡 Recommandation :</span> Même si sans conséquence, utilisez le statut "Inactive" 
                    pour archiver plutôt que supprimer. Vous conservez ainsi l'historique et les métriques d'équipe.
                  </p>
                </div>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Mes données sont-elles en sécurité ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">🔒 100% sécurisé et privé !</p>
                <p className="mt-2">ProductOwnerApp fonctionne entièrement offline. Vos équipes sont stockées localement dans votre navigateur. Aucune donnée n'est jamais envoyée vers un serveur externe.</p>
                <p className="mt-2"><span className="font-medium">💡 Conseil :</span> Exportez régulièrement vos données en JSON/CSV (via Paramètres → Export/Import) pour une sauvegarde externe supplémentaire.</p>
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

export default TeamsUserPage;
