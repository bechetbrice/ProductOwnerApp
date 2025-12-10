import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * UserStoriesUserPage - Guide UTILISATEUR du Module User Stories
 * Version simplifiée et pédagogique pour Product Owners
 * Design sobre et standardisé (aligné sur les autres guides user)
 * 
 * @component
 * @version 1.0.0 - Guide post-nettoyage QW
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const UserStoriesUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">📖 Guide User Stories</h1>
              <p className="text-teal-100 text-lg">Transformez les besoins en fonctionnalités priorisées et développables</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module User Stories ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>User Stories</strong> est votre <strong>backlog de développement</strong>. 
              Il transforme les besoins utilisateurs identifiés en fonctionnalités concrètes que votre équipe 
              peut développer, en utilisant le format standardisé "En tant que... je veux... afin de...".
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📖</div>
                <h3 className="font-semibold text-gray-900 mb-2">Format standardisé</h3>
                <p className="text-sm text-gray-600">
                  Chaque story suit le format "En tant que... je veux... afin de..." pour une communication claire
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Priorisation MoSCoW</h3>
                <p className="text-sm text-gray-600">
                  Organisez visuellement : Must (indispensable), Should (important), Could (souhaitable), Won't (exclu)
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🔗</div>
                <h3 className="font-semibold text-gray-900 mb-2">Traçabilité complète</h3>
                <p className="text-sm text-gray-600">
                  Chaque story liée à un besoin source - du feedback utilisateur au code développé
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 L'objectif : transformer chaque besoin en action concrète.</span> Vos stories 
                deviennent les tickets de développement, intégrables directement dans vos sprints Scrum/Agile.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre première story</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouvelle Story"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• Sélectionnez le <strong>produit concerné</strong> (obligatoire)</p>
                  <p className="text-sm text-gray-700">• <strong>Sélectionnez le besoin source</strong> (obligatoire) - chaque story découle d'un besoin identifié</p>
                  <p className="text-sm text-gray-700">• Définissez <strong>numéro</strong> (ex: US-001) et <strong>titre court</strong> (ex: "Connexion OAuth")</p>
                  <p className="text-sm text-gray-700">• Remplissez le format User Story (3 champs obligatoires) :
                    <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                      <li><strong>En tant que</strong> : rôle utilisateur (Product Owner, utilisateur mobile...)</li>
                      <li><strong>Je veux</strong> : action/fonctionnalité souhaitée</li>
                      <li><strong>Afin de</strong> : bénéfice/valeur apportée</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">• Ajoutez une <strong>description complémentaire</strong> si besoin (contexte technique, contraintes...)</p>
                  <p className="text-sm text-gray-700">• Définissez les <strong>critères d'acceptation</strong> pour validation (format liste recommandé)</p>
                </div>
                <div className="mt-2 bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-xs text-gray-900">
                    ✅ <strong>Astuce :</strong> Le titre complet est généré automatiquement depuis les 3 champs du format. 
                    Concentrez-vous sur la clarté de chaque champ !
                  </p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Organiser avec MoSCoW</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">Vos stories sont organisées en <strong>4 colonnes de priorisation</strong> :</p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                    <li><strong>🔴 Must Have</strong> : Indispensable pour cette version (~60% max du backlog)</li>
                    <li><strong>🟠 Should Have</strong> : Important mais contournable (~20%)</li>
                    <li><strong>🟡 Could Have</strong> : Souhaitable si possible (~20%)</li>
                    <li><strong>⚪ Won't Have</strong> : Explicitement exclu de cette version</li>
                  </ul>
                  <p className="text-sm text-gray-700 mt-2">Chaque colonne affiche vos stories triées par date de création (plus récentes en haut)</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Filtrer et suivre l'avancement</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Utilisez le <strong>sélecteur de produit</strong> en haut pour isoler les stories d'un produit</p>
                  <p className="text-sm text-gray-700">• Cliquez sur "Filtres" pour affiner par <strong>statut</strong> (À faire / En cours / Terminées)</p>
                  <p className="text-sm text-gray-700">• Les <strong>badges sur chaque carte</strong> indiquent :
                    <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                      <li>Code produit en couleur</li>
                      <li>Outcome (résultat) si défini : ✅ Terminée / ⏸️ En pause / 🚧 Bloquée / 🚫 Annulée / 🔄 À revoir</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">• Cliquez sur <strong>👁️ Voir détails</strong> pour voir les informations complètes</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 1 : "Je dois préparer le prochain sprint"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Sélectionner les stories Must Have et Should Have estimées pour le sprint à venir.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Regardez les colonnes <strong>🔴 Must Have</strong> et <strong>🟠 Should Have</strong></li>
                  <li>Identifiez les stories <strong>sans badge outcome</strong> (pas encore développées)</li>
                  <li>Cliquez sur "👁️ Voir détails" pour vérifier :
                    <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                      <li>Le <strong>besoin source</strong> avec son estimation héritée</li>
                      <li>Les <strong>critères d'acceptation</strong> clairement définis</li>
                      <li>Les <strong>stakeholders</strong> à impliquer</li>
                    </ul>
                  </li>
                  <li>Sélectionnez les stories qui rentrent dans la capacité équipe (vélocité)</li>
                  <li>Allez dans le module <strong>Sprint Management</strong> pour les intégrer au sprint</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Bonne pratique :</span> Priorisez les stories Must Have + estimation basse 
                    pour des victoires rapides. Gardez les Should Have comme "stretch goals" si l'équipe avance bien.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📋 Scénario 2 : "Besoin urgent identifié - je dois créer une story rapidement"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Transformer un nouveau besoin critique en user story développable en moins de 5 minutes.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Assurez-vous que le besoin existe dans le module <strong>Besoins Utilisateurs</strong>
                    <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                      <li>Si non, créez-le d'abord (5 min max)</li>
                      <li>Utilisez <strong>Planning Poker</strong> pour l'estimer si besoin</li>
                    </ul>
                  </li>
                  <li>Dans User Stories, cliquez sur <strong>"Nouvelle Story"</strong></li>
                  <li>Sélectionnez le produit puis le <strong>besoin source</strong> que vous venez de créer</li>
                  <li>L'<strong>estimation est héritée automatiquement</strong> du besoin !</li>
                  <li>Définissez numéro (ex: US-URGENT-01) et titre court</li>
                  <li>Remplissez rapidement les 3 champs du format User Story</li>
                  <li>Ajoutez critères d'acceptation minimaux (vous affinerez plus tard)</li>
                  <li>Sauvegardez → Story créée et prête pour discussion équipe</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Rapidité :</span> Le lien besoin → story garantit que même en urgence, 
                    vous maintenez la traçabilité et évitez les stories "orphelines" sans contexte.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔄 Scénario 3 : "Sprint terminé - je dois gérer les outcomes"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Documenter le résultat de chaque story du sprint pour analyse et rétrospective.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Allez dans le module <strong>Sprint Board</strong> (pas dans User Stories !)</li>
                  <li>Pour chaque story du sprint, cliquez sur "Définir outcome"</li>
                  <li>Sélectionnez le résultat approprié :
                    <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                      <li><strong>✅ Terminée :</strong> Tous critères validés, déployée</li>
                      <li><strong>⏸️ En pause :</strong> Changement priorité, attente retour</li>
                      <li><strong>🚧 Bloquée :</strong> Dépendance, API tierce manquante</li>
                      <li><strong>🚫 Annulée :</strong> Feature abandonnée, pivot stratégique</li>
                      <li><strong>🔄 À revoir :</strong> Scope trop large, besoin découpage</li>
                    </ul>
                  </li>
                  <li>Ajoutez une <strong>raison</strong> (suggestions contextuelles fournies)</li>
                  <li>Complétez avec des <strong>notes</strong> si nécessaire pour rétrospective</li>
                  <li>Validez → Outcome enregistré avec date, historique mis à jour</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📊 Analyse :</span> Les outcomes permettent de calculer votre taux de réussite sprint, 
                    identifier les blocages récurrents et améliorer votre estimation future.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎨 Scénario 4 : "Je dois présenter le backlog aux stakeholders"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Montrer visuellement les priorités et l'état d'avancement du backlog produit.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez la vue User Stories devant les stakeholders</li>
                  <li>Les <strong>4 colonnes MoSCoW</strong> montrent instantanément la répartition des priorités</li>
                  <li>Sélectionnez un produit spécifique avec le filtre si vous gérez plusieurs produits</li>
                  <li>Pour chaque colonne, expliquez :
                    <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                      <li><strong>Must Have :</strong> Ce qui DOIT être dans la prochaine release</li>
                      <li><strong>Should Have :</strong> Ce qu'on vise mais négociable</li>
                      <li><strong>Could Have :</strong> Les "bonus" si capacité disponible</li>
                      <li><strong>Won't Have :</strong> Explicitement exclu pour gérer attentes</li>
                    </ul>
                  </li>
                  <li>Cliquez sur "👁️ Voir détails" pour montrer :
                    <ul className="ml-4 mt-1 space-y-0.5 list-disc text-xs">
                      <li>Le besoin source qui justifie cette story</li>
                      <li>Les critères d'acceptation pour validation</li>
                      <li>Les stakeholders impliqués</li>
                    </ul>
                  </li>
                  <li>Les badges <strong>outcome</strong> montrent ce qui est déjà développé/bloqué</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💼 Impact :</span> La visualisation MoSCoW facilite les discussions de priorisation. 
                    Les stakeholders voient immédiatement où se situe chaque fonctionnalité demandée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 7 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 7 commandements des User Stories</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Toujours lier à un besoin source</p>
                <p className="text-sm text-gray-700">Chaque story DOIT découler d'un besoin utilisateur. Pas de story "orpheline" - garantissez la traçabilité complète du feedback utilisateur au code.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Respecter le format standardisé</p>
                <p className="text-sm text-gray-700">Les 3 champs "En tant que / Je veux / Afin de" sont obligatoires. Ce format garantit que votre story exprime le QUI, le QUOI et le POURQUOI.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Numéroter et titrer clairement</p>
                <p className="text-sm text-gray-700">Numéro unique (US-001) + titre court (3-5 mots) facilitent communication et références. L'équipe doit pouvoir dire "on fait US-042" sans ambiguïté.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Définir des critères d'acceptation mesurables</p>
                <p className="text-sm text-gray-700">Chaque critère doit être testable en OUI/NON. Format recommandé : "L'utilisateur peut...", "Le système affiche...", "Les données sont...". Pas de flou !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Équilibrer la répartition MoSCoW</p>
                <p className="text-sm text-gray-700">Visez 60% Must, 20% Should, 20% Could. Trop de Must = surcharge et stress équipe. Trop de Could = manque de focus et dilution valeur.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Garder les stories atomiques</p>
                <p className="text-sm text-gray-700">Une story = une fonctionnalité développable en 1 sprint maximum. Si &gt;8 story points ou &gt;5 jours, découpez. Stories petites = livraison rapide + estimation fiable.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">7</div>
              <div>
                <p className="font-medium text-gray-900">Documenter les outcomes via Sprint Board</p>
                <p className="text-sm text-gray-700">Ne modifiez JAMAIS les outcomes directement dans User Stories. Passez par Sprint Board pour garantir cohérence avec le sprint et historique propre.</p>
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
                ❓ Pourquoi dois-je obligatoirement lier ma story à un besoin utilisateur ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">La traçabilité complète est au cœur de la méthodologie Agile. En liant chaque story à un besoin :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Vous garantissez que <span className="font-medium">chaque développement répond à un vrai problème utilisateur</span></li>
                  <li>Vous maintenez le fil : <strong>Entretien → Insight → Besoin → Story → Sprint → Code</strong></li>
                  <li>Vous pouvez <span className="font-medium">justifier chaque feature</span> auprès des stakeholders</li>
                  <li>Vous héritez automatiquement de l'estimation du besoin</li>
                </ul>
                <p className="mt-2 font-medium">Résultat : zéro "story orpheline" développée sans justification business !</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ C'est quoi la différence entre Must, Should, Could et Won't ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3">La méthode MoSCoW aide à prioriser clairement :</p>
                <ul className="mt-2 space-y-2 ml-4 list-disc">
                  <li><strong>🔴 Must Have</strong> : Le produit <span className="font-medium">ne peut PAS sortir</span> sans ces features. 
                  Ex: authentification pour une app bancaire. Max 60% du backlog.</li>
                  <li><strong>🟠 Should Have</strong> : Important mais <span className="font-medium">contournable à court terme</span>. 
                  Ex: notifications push (on peut lancer sans). ~20% du backlog.</li>
                  <li><strong>🟡 Could Have</strong> : Nice-to-have, <span className="font-medium">si temps/budget le permettent</span>. 
                  Ex: thème sombre. ~20% du backlog.</li>
                  <li><strong>⚪ Won't Have</strong> : Explicitement <span className="font-medium">EXCLU de cette version</span>. 
                  Documenté pour gérer les attentes.</li>
                </ul>
                <p className="mt-2 text-xs font-medium">💡 Astuce : Si tout est "Must", rien n'est vraiment prioritaire. Soyez honnête sur ce qui est critique !</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Comment rédiger de bons critères d'acceptation ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Les critères d'acceptation définissent <span className="font-medium">"story terminée = critères validés"</span>. 
                Suivez ces règles :</p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li><strong>Format liste :</strong> Utilisez des tirets ou numéros pour clarté</li>
                  <li><strong>Testable binaire :</strong> Chaque critère = OUI ou NON, pas de zone grise</li>
                  <li><strong>Du point de vue utilisateur :</strong> "L'utilisateur peut..." pas "Le code fait..."</li>
                  <li><strong>Spécifique :</strong> Évitez "fonctionne bien", préférez "temps réponse &lt; 2s"</li>
                </ol>
                <p className="mt-2 font-medium">Exemple :</p>
                <div className="bg-white border border-cyan-200 rounded p-2 mt-1 text-xs font-mono">
                  - L'utilisateur peut se connecter avec email/mot de passe<br/>
                  - Le système affiche un message d'erreur si identifiants invalides<br/>
                  - Les données de session sont sauvegardées localement<br/>
                  - La connexion reste active pendant 7 jours
                </div>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Quelle est la taille idéale d'une user story ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3">Une bonne story doit être développable en <span className="font-medium">1 sprint maximum</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><strong>Idéal :</strong> 1-3 story points (1-3 jours de dev) = haute confiance estimation</li>
                  <li><strong>OK :</strong> 5-8 story points (1 semaine) = complexe mais gérable</li>
                  <li><strong>Trop gros :</strong> 13+ story points = découper en plusieurs stories plus petites</li>
                </ul>
                <p className="mt-2"><span className="font-medium">💡 Pourquoi découper ?</span></p>
                <ul className="mt-1 space-y-1 ml-4 list-disc text-xs">
                  <li>Livraison plus rapide = feedback plus tôt</li>
                  <li>Estimation plus fiable</li>
                  <li>Moins de risque (si blocage, impact limité)</li>
                  <li>Plus facile à tester et valider</li>
                </ul>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Comment gérer les outcomes des stories ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">Les outcomes documentent le <span className="font-medium">résultat final d'une story après sprint</span> :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><strong>✅ Terminée :</strong> Tous critères validés, déployée en production</li>
                  <li><strong>⏸️ En pause :</strong> Story mise de côté temporairement (changement priorité)</li>
                  <li><strong>🚧 Bloquée :</strong> Impossible de terminer (dépendance, API manquante...)</li>
                  <li><strong>🚫 Annulée :</strong> Feature abandonnée, pivot stratégique</li>
                  <li><strong>🔄 À revoir :</strong> Story trop large, besoin découpage</li>
                </ul>
                <p className="mt-3 font-medium text-red-900">⚠️ IMPORTANT :</p>
                <p className="text-xs mt-1">
                  Les outcomes se définissent UNIQUEMENT via le module <strong>Sprint Board</strong>, jamais directement 
                  dans User Stories. Cela garantit la cohérence avec le sprint et l'historique propre.
                </p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Mes données sont-elles en sécurité ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">🔒 100% sécurisé et privé !</p>
                <p className="mt-2">ProductOwnerApp fonctionne entièrement offline. Toutes vos user stories sont stockées localement 
                dans votre navigateur. Aucune donnée n'est jamais envoyée vers un serveur externe.</p>
                <p className="mt-2">
                  💡 <strong>Conseil :</strong> Vos données persistent tant que vous ne videz pas le cache de votre navigateur. 
                  Pour une sécurité maximale, travaillez toujours dans le même navigateur sur le même appareil.
                </p>
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

export default UserStoriesUserPage;
