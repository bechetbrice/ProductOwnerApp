import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * ProductsUserPage - Guide UTILISATEUR du Module Produits
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du standard ContactsUserPage (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const ProductsUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">📦 Guide Produits</h1>
              <p className="text-teal-100 text-lg">Structurez et pilotez vos projets efficacement</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Produits ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Produits</strong> est le <strong>point d'ancrage central</strong> de ProductOwnerApp. 
              Chaque élément que vous créez (objectifs, besoins, stories, contacts, entretiens...) doit être 
              associé à un produit. C'est votre <strong>outil de structuration multi-projets</strong>.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Organiser</h3>
                <p className="text-sm text-gray-600">
                  Isolez les données par projet et gérez plusieurs produits en parallèle sans confusion
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🏷️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Identifier</h3>
                <p className="text-sm text-gray-600">
                  Code court + couleur = reconnaissance instantanée de vos produits partout dans l'app
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Piloter</h3>
                <p className="text-sm text-gray-600">
                  Suivez le cycle de vie complet avec statuts, dates clés et associations clients/PO
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : le code produit.</span> Ce code court (2-6 caractères) 
                est utilisé comme badge visuel partout : cartes, filtres, sélecteurs. Choisissez-le bien !
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre premier produit</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouveau Produit"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• Donnez un nom explicite (ex: "Application Mobile Client")</p>
                  <p className="text-sm text-gray-700">• Le code est auto-généré (ex: "AMC") → vous pouvez le modifier si besoin</p>
                  <p className="text-sm text-gray-700">• Choisissez une couleur distinctive (click sur la palette)</p>
                  <p className="text-sm text-gray-700">• Ajoutez une description pour clarifier le contexte</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Statut "Actif"</span> est recommandé par défaut</p>
                  <p className="text-sm text-gray-700">• Sélectionnez les clients et le Product Owner</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Organiser avec des filtres</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium">"Filtres"</span> pour affiner l'affichage</p>
                  <p className="text-sm text-gray-700">• Filtrez par statut : Brouillon / Actifs / Archivés</p>
                  <p className="text-sm text-gray-700">• Triez par : Date / Nom / Statut (boutons exclusifs)</p>
                  <p className="text-sm text-gray-700">• Bouton <span className="font-medium">"Réinitialiser"</span> pour effacer tous les filtres</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visualiser les détails</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium">👁️ Voir</span> pour ouvrir la vue complète</p>
                  <p className="text-sm text-gray-700">• Consultez la description, les clients, le Product Owner</p>
                  <p className="text-sm text-gray-700">• Suivez les 4 types de dates : début, fin prévue, fin attendue, fin réelle</p>
                  <p className="text-sm text-gray-700">• Modifiez directement depuis le modal avec le bouton "✏️ Modifier"</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 1 : "Je démarre un nouveau projet"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Structurer mon nouveau produit dès le départ pour bien organiser mon travail.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez le produit avec un <span className="font-medium">nom explicite</span> (ex: "Plateforme E-learning Pro")</li>
                  <li>Le code est généré automatiquement → <span className="font-medium">"PEP"</span> (modifiable)</li>
                  <li>Choisissez une <span className="font-medium">couleur vive</span> (ex: orange) pour le distinguer visuellement</li>
                  <li>Ajoutez une description claire : "Plateforme de formation en ligne pour entreprises"</li>
                  <li>Statut <span className="font-medium">"Actif"</span> car déjà en développement</li>
                  <li>Associez les clients et désignez le Product Owner</li>
                  <li>Renseignez la date de début et la date de fin prévue</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Résultat :</span> Maintenant, tous vos objectifs, besoins, stories 
                    pourront être associés à ce produit. Le badge "PEP" orange apparaîtra partout !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 2 : "Je gère 3 produits simultanément"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Éviter la confusion entre mes 3 projets actifs et filtrer rapidement les données.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez vos 3 produits avec des <span className="font-medium">codes distincts</span> : "PEP", "CRM", "API"</li>
                  <li>Choisissez 3 <span className="font-medium">couleurs bien différentes</span> : orange, bleu, vert</li>
                  <li>Dans chaque module (Besoins, Stories, Dashboard...), utilisez le <span className="font-medium">ProductSelector</span> en haut</li>
                  <li>Exemple : Sélectionnez "PEP" → Vous voyez UNIQUEMENT les données du projet E-learning</li>
                  <li>Changez de produit en un clic pour basculer de contexte</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Limitez à 3-5 produits actifs max. 
                    Au-delà, archivez les produits moins prioritaires pour rester focus.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🏷️ Scénario 3 : "Mon code produit n'est pas assez clair"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Modifier le code auto-généré pour qu'il soit plus mémorable et distinctif.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Créez le produit "Application Gestion Interne" → Code auto = "AGI"</li>
                  <li>Problème : "AGI" n'est pas assez parlant pour l'équipe</li>
                  <li>Modifiez manuellement le code en "GESTIN" (6 car. max, majuscules)</li>
                  <li>Le badge "GESTIN" + couleur apparaît maintenant partout</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Choisissez un code qui a du sens pour TOUTE l'équipe. 
                    Évitez les acronymes trop génériques ou les codes qui se ressemblent.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📅 Scénario 4 : "Je veux suivre le planning réaliste de mon produit"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Comparer la date de fin prévue initialement avec les estimations actuelles et la réalité.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li><span className="font-medium">Date de début :</span> Renseignez la date de lancement effective (ex: 01/01/2025)</li>
                  <li><span className="font-medium">Date de fin prévue :</span> Planning initial défini au kick-off (ex: 30/06/2025)</li>
                  <li><span className="font-medium">Date de fin attendue :</span> Estimation actuelle basée sur la vélocité réelle (ex: 31/08/2025)</li>
                  <li><span className="font-medium">Date de fin réelle :</span> Date effective de livraison (renseignée après coup)</li>
                  <li>Visualisez ces 4 dates dans le modal "Détails" pour analyse des écarts</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📊 Analyse :</span> Les écarts entre "Fin prévue" et "Fin attendue" vous 
                    indiquent si votre planning est réaliste ou nécessite un ajustement.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 5 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📦 Scénario 5 : "Un produit est terminé, que faire ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Ne pas encombrer ma liste avec des produits terminés, mais conserver l'historique.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Modifiez le statut du produit : <span className="font-medium">"Actif"</span> → <span className="font-medium">"Archivé"</span></li>
                  <li>Renseignez la <span className="font-medium">Date de fin réelle</span> pour traçabilité</li>
                  <li>Le produit disparaît des listes par défaut (filtre "Actifs")</li>
                  <li>Pour le consulter : Cliquez sur "Filtres" → Sélectionnez "Archivés"</li>
                  <li><span className="font-medium">Ne supprimez PAS</span> : vous perdriez tout l'historique (objectifs, besoins, stories...)</li>
                </ol>

                <div className="bg-white border border-emerald-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚠️ Important :</span> Archiver ≠ Supprimer. L'archivage conserve toutes 
                    les données pour référence future et analyses rétrospectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du module Produits</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Code court unique et mémorable</p>
                <p className="text-sm text-gray-700">2-6 caractères maximum. Évitez les codes génériques (PRO, APP, SYS). 
                Préférez des codes parlants pour toute l'équipe (GESTIN, ELEARN, APICRM)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Couleurs bien contrastées entre produits</p>
                <p className="text-sm text-gray-700">Utilisez des couleurs très différentes pour reconnaissance visuelle rapide. 
                Évitez 3 nuances de bleu : préférez bleu/orange/vert par exemple</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Description dès la création</p>
                <p className="text-sm text-gray-700">Documentez le contexte, l'objectif et le public cible. 
                Facilite l'onboarding des nouveaux collaborateurs et clarifie la vision produit</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Limiter les produits actifs simultanément</p>
                <p className="text-sm text-gray-700">Restez focus sur 3-5 produits maximum en statut "Actif". 
                Au-delà, archivez les moins prioritaires pour éviter la dispersion</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Archiver plutôt que supprimer</p>
                <p className="text-sm text-gray-700">Passez le statut en "Archivé" pour conserver l'historique complet. 
                La suppression efface TOUTES les données liées (objectifs, besoins, stories...)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Revue trimestrielle des statuts</p>
                <p className="text-sm text-gray-700">Tous les 3 mois, vérifiez les statuts de vos produits. 
                Archivez ceux terminés ou en pause pour garder une liste claire et à jour</p>
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
                ❓ Pourquoi le code produit est-il si important ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Le code produit est votre <span className="font-medium">identifiant visuel</span> partout dans l'app :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Badge coloré sur toutes les cartes (besoins, stories, objectifs...)</li>
                  <li>Filtre rapide dans le ProductSelector</li>
                  <li>Reconnaissance instantanée sans lire le nom complet</li>
                </ul>
                <p className="mt-2">Un bon code = mémorisable + unique + parlant pour toute l'équipe.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Puis-je modifier le code après création ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3"><span className="font-medium">Oui, absolument !</span> Le code est modifiable à tout moment via le bouton "✏️ Modifier".</p>
                <p className="mt-2"><span className="font-medium text-orange-700">⚠️ Attention :</span> Si vous modifiez le code d'un produit déjà utilisé, 
                le nouveau badge apparaîtra partout immédiatement. Prévenez l'équipe pour éviter la confusion.</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Quelle est la différence entre les 4 types de dates ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">📅 Date de début</p>
                    <p className="text-xs">Lancement effectif du produit (premier sprint, premier commit...)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">📘 Date de fin prévue</p>
                    <p className="text-xs">Planning initial défini au kick-off (optimiste)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">📙 Date de fin attendue</p>
                    <p className="text-xs">Estimation actuelle basée sur la vélocité réelle (réaliste)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">📗 Date de fin réelle</p>
                    <p className="text-xs">Date effective de livraison (renseignée après coup)</p>
                  </div>
                </div>
                <p className="mt-3 text-xs">
                  <span className="font-medium">💡 Utilité :</span> Comparer "Prévue" vs "Attendue" vs "Réelle" 
                  pour améliorer vos estimations futures.
                </p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment gérer plusieurs produits sans confusion ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3 font-medium">3 astuces pour rester organisé :</p>
                <ol className="mt-2 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">Codes distincts :</span> "PEP" / "CRM" / "API" (faciles à différencier)</li>
                  <li><span className="font-medium">Couleurs contrastées :</span> Orange / Bleu / Vert (reconnaissance visuelle immédiate)</li>
                  <li><span className="font-medium">ProductSelector :</span> Utilisez le filtre produit en haut de chaque module pour isoler les données</li>
                </ol>
                <div className="mt-3 bg-white border border-green-200 rounded p-2">
                  <p className="text-xs text-green-900">
                    <span className="font-medium">🎯 Conseil :</span> Limitez à 3-5 produits actifs max. 
                    Si vous avez plus, c'est le moment d'archiver les moins prioritaires !
                  </p>
                </div>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime un produit ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3 font-medium text-red-700">⚠️ SUPPRESSION = PERTE TOTALE DES DONNÉES</p>
                <p className="mt-2">Avant suppression, l'app vérifie automatiquement les relations :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Objectifs liés au produit</li>
                  <li>Besoins utilisateurs associés</li>
                  <li>User Stories du produit</li>
                  <li>Sprints et tâches</li>
                  <li>Entretiens, contacts, rétrospectives...</li>
                </ul>
                <p className="mt-3">
                  Vous êtes averti du nombre de relations, et <span className="font-medium">TOUTES seront supprimées</span> si vous confirmez. 
                  Cette action est <span className="font-medium text-red-700">irréversible</span> !
                </p>
                <div className="mt-3 bg-white border border-red-200 rounded p-2">
                  <p className="text-xs text-red-900">
                    <span className="font-medium">💡 Solution recommandée :</span> Utilisez le statut "Archivé" 
                    pour conserver l'historique complet tout en nettoyant votre liste active.
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
                <p className="mt-2">ProductOwnerApp fonctionne entièrement offline. Vos produits sont stockés localement dans votre navigateur. Aucune donnée n'est jamais envoyée vers un serveur externe.</p>
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

export default ProductsUserPage;
