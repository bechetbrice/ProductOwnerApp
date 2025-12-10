import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * PersonasUserPage - Guide UTILISATEUR du Module Personas
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const PersonasUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">👤 Guide Personas</h1>
              <p className="text-teal-100 text-lg">Créez des personas réalistes basés sur vos utilisateurs</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Personas ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Personas</strong> vous permet de <strong>créer des profils d'utilisateurs types</strong> qui 
              représentent vos segments d'audience. Un persona est une représentation semi-fictionnelle de votre utilisateur idéal, 
              basée sur des données réelles issues de vos entretiens et contacts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">⭐</div>
                <h3 className="font-semibold text-gray-900 mb-2">Personas Primaires</h3>
                <p className="text-sm text-gray-600">
                  Votre cible principale (70-80% de vos utilisateurs). Toutes les décisions produit se basent sur eux.
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">👤</div>
                <h3 className="font-semibold text-gray-900 mb-2">Personas Secondaires</h3>
                <p className="text-sm text-gray-600">
                  Segments importants mais moins prioritaires. Leurs besoins sont pris en compte sans compromettre l'expérience primaire.
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Traçabilité Totale</h3>
                <p className="text-sm text-gray-600">
                  Liez vos personas aux contacts réels, entretiens et besoins utilisateurs pour une vision complète.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : humaniser vos utilisateurs.</span> Un persona avec nom, photo et histoire aide toute l'équipe 
                (dev, design, business) à comprendre pour QUI vous construisez le produit.
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
            <h2 className="text-2xl font-bold text-gray-900">Démarrage rapide (10 min)</h2>
          </div>

          {/* Étape 1 */}
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre premier persona</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouveau Persona"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Sélectionnez le produit</span> (obligatoire)</p>
                  <p className="text-sm text-gray-700">• Choisissez un <span className="font-medium">avatar</span> qui représente bien votre utilisateur type</p>
                  <p className="text-sm text-gray-700">• Donnez un <span className="font-medium">nom et rôle</span> (ex: "Marie, la Manager Pressée")</p>
                  <p className="text-sm text-gray-700">• Ajoutez <span className="font-medium">au moins 1 objectif</span> (ce que votre persona veut accomplir)</p>
                  <p className="text-sm text-gray-700">• Cochez <span className="font-medium">"⭐ Persona primaire"</span> si c'est votre cible principale</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enrichir le profil psychologique</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">Objectifs :</span> Qu'est-ce que ce persona veut accomplir ?</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Frustrations :</span> Quels sont ses points de douleur actuels ?</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Motivations :</span> Qu'est-ce qui le pousse à utiliser votre produit ?</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Citation :</span> Une phrase typique qui résume son état d'esprit</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lier aux contacts et entretiens</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">Contacts liés :</span> Sélectionnez les vrais utilisateurs qui correspondent à ce persona</p>
                  <p className="text-sm text-gray-700">• Cette association crée la <span className="font-medium">traçabilité</span> entre vos données réelles et vos personas</p>
                  <p className="text-sm text-gray-700">• Vous pourrez ensuite filtrer vos besoins utilisateurs par persona</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 1 : "Je débute mon produit, par où commencer ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Créer 2-3 personas représentatifs pour guider toutes vos décisions produit.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Analysez vos <span className="font-medium">entretiens utilisateurs</span> existants</li>
                  <li>Identifiez les <span className="font-medium">patterns communs</span> : rôles, objectifs, frustrations</li>
                  <li>Créez 1-2 <span className="font-medium">personas primaires</span> (votre cœur de cible)</li>
                  <li>Ajoutez 1-2 <span className="font-medium">personas secondaires</span> si nécessaire</li>
                  <li>Liez chaque persona aux <span className="font-medium">contacts réels</span> qui l'inspirent</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Règle d'or :</span> <strong>2-5 personas maximum.</strong> 
                    Au-delà, vous diluez votre focus et perdez en clarté décisionnelle.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 2 : "J'hésite sur une fonctionnalité : la faire ou pas ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Utiliser vos personas pour prendre une décision éclairée.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez le détail de votre <span className="font-medium">persona primaire</span></li>
                  <li>Relisez ses <span className="font-medium">objectifs et frustrations</span></li>
                  <li>Demandez-vous : <span className="font-medium">"Cette feature répond-elle à un objectif clé ?"</span></li>
                  <li>Vérifiez si elle résout une <span className="font-medium">frustration majeure</span></li>
                  <li>Si oui aux deux → GO ! Si non → Reporter ou abandonner</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Exemple concret :</span> Votre persona "Marie, Manager Pressée" a comme objectif "Gagner du temps". 
                    Une feature qui automatise une tâche manuelle ? <strong>GO !</strong> Une feature cosmétique ? Reporter.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 3 : "Je veux prioriser mon backlog de besoins"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Filtrer vos besoins utilisateurs par persona pour prioriser intelligemment.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Allez dans le module <span className="font-medium">Besoins Utilisateurs</span></li>
                  <li>Utilisez le filtre <span className="font-medium">"Persona"</span> pour sélectionner votre persona primaire</li>
                  <li>Vous voyez UNIQUEMENT les besoins qui le concernent</li>
                  <li>Priorisez ces besoins en premier (= ceux qui ont le plus d'impact)</li>
                  <li>Répétez pour vos personas secondaires ensuite</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Bonne pratique :</span> Traitez d'abord 100% des besoins de vos personas primaires, 
                    PUIS seulement les besoins des secondaires qui ne compromettent pas l'expérience primaire.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">👥 Scénario 4 : "Je présente mon produit à mon équipe/investisseurs"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Utiliser vos personas pour communiquer clairement votre vision produit.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur <span className="font-medium">"Voir"</span> sur votre persona primaire</li>
                  <li>Capturez ou imprimez la fiche complète (avatar, citation, objectifs, frustrations)</li>
                  <li>Intégrez-la dans votre présentation : <span className="font-medium">"Voici Marie, notre utilisateur type"</span></li>
                  <li>Expliquez chaque feature en mode : <span className="font-medium">"Marie a besoin de X car elle est frustrée par Y"</span></li>
                  <li>Renforcez l'empathie de l'équipe avec des personas humanisés</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💼 Astuce pitch :</span> Commencez toujours par présenter votre persona primaire AVANT de parler de features. 
                    Cela ancre votre audience dans le "pourquoi" avant le "quoi".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du module Personas</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Basez-vous sur des données réelles</p>
                <p className="text-sm text-gray-700">Ne créez pas de personas "fictifs". Utilisez vos entretiens et contacts pour construire des profils crédibles.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">2-5 personas maximum</p>
                <p className="text-sm text-gray-700">1-2 primaires + 1-3 secondaires. Plus = dilution du focus et confusion dans les décisions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Humanisez vos personas</p>
                <p className="text-sm text-gray-700">Nom, avatar, citation, contexte personnel. Plus c'est réel et vivant, plus l'équipe s'y attache.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Focalisez sur objectifs & frustrations</p>
                <p className="text-sm text-gray-700">Ce sont les deux drivers principaux. Toutes vos features doivent soit accomplir un objectif, soit résoudre une frustration.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Mettez à jour régulièrement</p>
                <p className="text-sm text-gray-700">Vos utilisateurs évoluent. Revisitez vos personas tous les 6 mois pour rester aligné avec la réalité.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Partagez vos personas avec TOUTE l'équipe</p>
                <p className="text-sm text-gray-700">Dev, design, business, support : tout le monde doit connaître vos personas par cœur. Affichez-les visuellement dans vos locaux !</p>
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
                ❓ Quelle est la différence entre primaire et secondaire ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">Persona primaire ⭐ :</span> Votre cœur de cible (70-80% de vos utilisateurs). 
                TOUTES les décisions produit doivent d'abord satisfaire ce persona.</p>
                <p className="mt-2"><span className="font-medium">Persona secondaire 👤 :</span> Segment important mais moins prioritaire. 
                Leurs besoins sont pris en compte SANS compromettre l'expérience des primaires.</p>
                <p className="mt-2"><span className="font-medium">📊 Règle pratique :</span> 1-2 primaires maximum par produit. Plus = vous n'avez pas de vraie cible.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Combien de personas dois-je créer ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3"><span className="font-medium">🎯 Recommandation :</span> 2 à 5 personas maximum.</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><strong>1-2 personas primaires</strong> : votre cible principale</li>
                  <li><strong>1-3 personas secondaires</strong> : segments importants mais moins critiques</li>
                </ul>
                <p className="mt-2"><span className="font-medium text-red-600">⚠️ Attention :</span> Trop de personas = dilution du focus et équipe perdue. 
                Si vous avez 10 personas, c'est que vous ne savez pas qui est vraiment votre cible.</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ À partir de quelles sources créer mes personas ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Les meilleures sources sont :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><strong>Entretiens utilisateurs</strong> : patterns qui émergent de vos entretiens</li>
                  <li><strong>Contacts réels</strong> : vos clients existants qui utilisent déjà votre produit</li>
                  <li><strong>Analytics</strong> : données comportementales de vos utilisateurs actuels</li>
                  <li><strong>Support client</strong> : tickets et remontées terrains</li>
                </ul>
                <p className="mt-2"><span className="font-medium">💡 Astuce :</span> Utilisez le champ "Contacts liés" pour tracer chaque persona vers les vrais utilisateurs qui l'ont inspiré.</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Dois-je remplir tous les champs ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3"><span className="font-medium">Champs obligatoires :</span></p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Nom, rôle, produit</li>
                  <li>Au moins 1 objectif</li>
                </ul>
                
                <p className="mt-3"><span className="font-medium">Champs fortement recommandés :</span></p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Frustrations (= points de douleur à résoudre)</li>
                  <li>Citation signature (= humanise le persona)</li>
                  <li>Niveau technique (= pour adapter votre UX)</li>
                  <li>Contexte professionnel (= comprendre l'environnement)</li>
                </ul>
                
                <p className="mt-3"><span className="font-medium">💡 Conseil :</span> Plus votre persona est riche et détaillé, plus il sera utile pour guider vos décisions.</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime un persona ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">Avant suppression, l'app vérifie automatiquement les relations :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Besoins utilisateurs liés à ce persona</li>
                  <li>User Stories associées</li>
                  <li>Contacts et entretiens liés</li>
                </ul>
                <p className="mt-3">
                  Vous êtes averti du nombre de relations, et TOUTES seront supprimées si vous confirmez. 
                  <span className="font-medium"> Cette action est irréversible !</span>
                </p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Comment utiliser les personas au quotidien ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3"><span className="font-medium">📋 Checklist quotidienne :</span></p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><strong>Avant chaque décision feature :</strong> "Est-ce que ça résout un besoin de mon persona primaire ?"</li>
                  <li><strong>En réunion d'équipe :</strong> "Marie (notre persona) serait-elle satisfaite de ce design ?"</li>
                  <li><strong>Pour prioriser le backlog :</strong> Filtrer les besoins par persona et traiter les primaires d'abord</li>
                  <li><strong>En présentation :</strong> Toujours commencer par présenter vos personas avant les features</li>
                </ul>
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

export default PersonasUserPage;
