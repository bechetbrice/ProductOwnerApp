import React from 'react';
import { ArrowLeft, CalendarRange, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * SprintsUserPage - Guide UTILISATEUR du Module Sprints Management
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const SprintsUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">📅 Guide Sprints Management</h1>
              <p className="text-teal-100 text-lg">Planifiez et suivez vos itérations Scrum efficacement</p>
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
              <CalendarRange className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Sprints ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Sprints Management</strong> vous permet de planifier et suivre vos <strong>itérations Scrum</strong> : 
              périodes time-boxées (durée fixe) pendant lesquelles votre équipe livre de la valeur incrémentale.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Objectif Clair</h3>
                <p className="text-sm text-gray-600">
                  Définissez un objectif mesurable que l'équipe s'engage à atteindre en 1-4 semaines
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-gray-900 mb-2">Stories Sélectionnées</h3>
                <p className="text-sm text-gray-600">
                  Choisissez les user stories que l'équipe va réaliser pendant le sprint
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Suivi en Temps Réel</h3>
                <p className="text-sm text-gray-600">
                  Visualisez la progression stories vs temps pour anticiper les retards
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 Philosophie Scrum :</span> Un sprint = durée fixe (7-28 jours), 
                objectif clair, livraison incrémentale. L'équipe s'engage sur ce qu'elle peut réaliser, 
                puis adapte lors du prochain sprint.
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre premier sprint</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouveau Sprint"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Produit :</span> sélectionnez le produit (obligatoire)</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Équipe :</span> choisissez l'équipe responsable (obligatoire)</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Identification :</span> numéro optionnel (ex: "Sprint-01") + nom obligatoire</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Dates :</span> définissez début et fin (durée 7-28 jours recommandée)</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Objectif :</span> décrivez ce que l'équipe souhaite accomplir</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Stories :</span> cochez les user stories à réaliser</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Suivre l'avancement du sprint</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Chaque carte affiche <span className="font-medium">2 barres de progression</span> :</p>
                  <p className="text-sm text-gray-700 ml-4">→ <span className="font-medium text-green-600">Stories</span> : % de stories terminées (status "done")</p>
                  <p className="text-sm text-gray-700 ml-4">→ <span className="font-medium text-teal-600">Temps</span> : % du sprint écoulé</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">⚠️ Alerte rouge</span> si temps écoulé &gt; progression stories</p>
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium">"Voir"</span> pour accéder aux détails complets</p>
                  <p className="text-sm text-gray-700">• Utilisez le <span className="font-medium">Sprint Board</span> (autre module) pour le suivi visuel quotidien</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Filtrer et organiser vos sprints</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• <span className="font-medium">Sélecteur Produit :</span> filtrez par produit en haut (si multi-produits)</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Statut :</span> Planifiés / En cours / Terminés</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Équipe :</span> filtrez par équipe responsable</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Période :</span> En cours (aujourd'hui) / À venir / Passés</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Tri :</span> Date début / Date fin / Nom / Progression</p>
                  <p className="text-sm text-gray-700">• Bouton <span className="font-medium">"Réinitialiser"</span> pour effacer tous les filtres</p>
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">📋 Scénario 1 : "Sprint Planning - Je prépare mon prochain sprint"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Planifier le Sprint 5 : sélectionner les stories, définir l'objectif, estimer la charge.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur "Nouveau Sprint"</li>
                  <li>Sélectionnez votre produit et l'équipe responsable</li>
                  <li>Définissez les dates : ex. 2 semaines (14 jours)</li>
                  <li>Rédigez un objectif clair : "Livrer le module de paiement sécurisé"</li>
                  <li>Parcourez les stories disponibles (filtrées par produit automatiquement)</li>
                  <li>Cochez uniquement les stories que l'équipe peut réaliser en 2 semaines</li>
                  <li>Sauvegardez → Le sprint passe en statut "Planifié"</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce :</span> Ne surchargez pas le sprint ! 
                    Référez-vous aux capacités de votre équipe (module Contacts) et à la vélocité des sprints précédents.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 2 : "Daily Scrum - Je vérifie l'avancement aujourd'hui"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Visualiser rapidement si le sprint est sur les rails ou s'il y a un risque de retard.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez le module Sprints Management</li>
                  <li>Filtrez sur "▶️ En cours" pour voir uniquement le sprint actif</li>
                  <li>Regardez les <span className="font-medium">2 barres de progression</span> sur la carte :</li>
                  <li className="ml-4">→ <span className="font-medium text-green-600">Barre verte (Stories) :</span> 40% → 4 stories sur 10 terminées</li>
                  <li className="ml-4">→ <span className="font-medium text-teal-600">Barre indigo (Temps) :</span> 50% → 7 jours écoulés sur 14</li>
                  <li>Si temps &gt; stories : <span className="font-medium text-red-600">⚠️ alerte rouge</span> → équipe en retard</li>
                  <li>Cliquez sur "Voir" pour consulter la liste des stories et identifier les blocages</li>
                  <li>Utilisez le <span className="font-medium">Sprint Board</span> pour le suivi détaillé (To Do, In Progress, Done)</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">⚡ Réaction rapide :</span> Si alerte rouge → Daily Scrum de 15min pour identifier 
                    les obstacles et réajuster les priorités si besoin.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔍 Scénario 3 : "Sprint Review - J'analyse les sprints passés"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Préparer la rétrospective en analysant la vélocité et les performances des derniers sprints.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Cliquez sur "Filtres" puis sélectionnez "✓ Terminés"</li>
                  <li>Triez par "Date fin" pour voir les sprints les plus récents</li>
                  <li>Comparez les progressions : 100% = sprint achevé, &lt;100% = stories reportées</li>
                  <li>Cliquez sur "Voir" pour chaque sprint terminé et notez :</li>
                  <li className="ml-4">→ Nombre de stories complétées vs planifiées</li>
                  <li className="ml-4">→ Objectif atteint ou non</li>
                  <li>Calculez la <span className="font-medium">vélocité moyenne</span> (stories complétées / sprint)</li>
                  <li>Utilisez cette vélocité pour planifier le prochain sprint plus précisément</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">📊 Vélocité :</span> Si votre équipe complète en moyenne 8 stories par sprint, 
                    ne planifiez pas 12 stories au prochain sprint. Soyez réaliste !
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">⚠️ Scénario 4 : "Gestion d'urgence - Je dois modifier un sprint en cours"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Réagir à un imprévu (bug critique, changement de priorité) sans déstabiliser le sprint.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Trouvez le sprint actif (filtre "▶️ En cours")</li>
                  <li>Cliquez sur "Modifier" (icône crayon)</li>
                  <li><span className="font-medium text-red-600">⚠️ NE MODIFIEZ PAS les dates</span> (principe Scrum : durée fixe)</li>
                  <li>Ajoutez ou retirez des stories selon l'urgence :</li>
                  <li className="ml-4">→ Ajout d'une story urgente → décochez une story moins prioritaire</li>
                  <li className="ml-4">→ Retrait d'une story bloquée → reportez-la au prochain sprint</li>
                  <li>Mettez à jour l'objectif si nécessaire (restez réaliste)</li>
                  <li>Sauvegardez et communiquez les changements à l'équipe</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🚨 Exception :</span> Si l'urgence est trop forte, envisagez d'annuler le sprint 
                    et d'en démarrer un nouveau. C'est rare mais parfois nécessaire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements du module Sprints</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">Durée fixe respectée</p>
                <p className="text-sm text-gray-700">Ne changez JAMAIS les dates d'un sprint en cours. Si problème majeur, annulez et créez un nouveau sprint.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">Durée Scrum : 7-28 jours</p>
                <p className="text-sm text-gray-700">L'app valide automatiquement : max 28 jours (4 semaines). Recommandation : 7-14 jours (2 semaines) pour agilité optimale.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Objectif clair et mesurable</p>
                <p className="text-sm text-gray-700">Rédigez un Sprint Goal précis : "Livrer le module X" plutôt que "Avancer sur le projet". L'équipe doit savoir ce qu'elle vise.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Capacité réaliste</p>
                <p className="text-sm text-gray-700">Ne surchargez pas le sprint. Basez-vous sur la vélocité passée et la capacité de l'équipe (module Contacts).</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Équipe stable</p>
                <p className="text-sm text-gray-700">L'équipe assignée au sprint est responsable de toutes ses stories. Évitez les changements d'équipe en cours de sprint.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Utiliser Sprint Board pour le quotidien</p>
                <p className="text-sm text-gray-700">Ce module = vision macro (planification). Pour le suivi quotidien détaillé (To Do, In Progress, Done), utilisez le Sprint Board.</p>
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
                ❓ Quelle est la différence entre les 3 statuts de sprint ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">Planifié :</span> Sprint préparé lors du Planning, pas encore démarré. 
                Vous pouvez encore ajuster les stories.</p>
                <p className="mt-2"><span className="font-medium">En cours :</span> Sprint actif. L'équipe travaille quotidiennement sur les stories. 
                Les dates ne doivent plus être modifiées.</p>
                <p className="mt-2"><span className="font-medium">Terminé :</span> Sprint achevé après la Review et la Rétro. 
                Les stories non terminées sont reportées au prochain sprint.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Que signifient les 2 barres de progression ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3"><span className="font-medium text-green-600">Barre verte (Stories) :</span> % de stories passées en "done". 
                Exemple : 5 stories terminées sur 10 = 50%</p>
                <p className="mt-2"><span className="font-medium text-teal-600">Barre indigo (Temps) :</span> % du sprint écoulé. 
                Exemple : 7 jours passés sur 14 = 50%</p>
                <p className="mt-2"><span className="font-medium text-red-600">⚠️ Alerte rouge :</span> Si temps écoulé &gt; progression stories, 
                votre équipe est en retard. Réajustez les priorités lors du Daily Scrum.</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Puis-je modifier les dates d'un sprint en cours ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium text-red-600">🚫 NON - Principe Scrum fondamental :</span> La durée du sprint est FIXE. 
                C'est une des règles d'or de Scrum.</p>
                <p className="mt-2">Si vraiment nécessaire (urgence majeure, crise), vous pouvez :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Passer le sprint en "Terminé" (même incomplet)</li>
                  <li>Créer un nouveau sprint avec les stories restantes</li>
                  <li>Documenter la raison en rétrospective</li>
                </ul>
                <p className="mt-2"><span className="font-medium">💡 Alternative :</span> Vous pouvez ajouter/retirer des stories pendant le sprint 
                (via "Modifier"), mais pas changer les dates.</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Comment savoir combien de stories planifier ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3"><span className="font-medium">📊 Utilisez la vélocité passée :</span></p>
                <ol className="mt-2 space-y-1 ml-4 list-decimal">
                  <li>Filtrez sur "✓ Terminés" et analysez les 3 derniers sprints</li>
                  <li>Notez le nombre de stories complétées pour chacun</li>
                  <li>Calculez la moyenne : ex. (8 + 10 + 9) / 3 = 9 stories/sprint</li>
                  <li>Pour le prochain sprint, planifiez environ 9 stories similaires</li>
                </ol>
                <p className="mt-3"><span className="font-medium">👥 Vérifiez les capacités :</span> Module Contacts → 
                Filtrez "Disponibles" pour voir la capacité ajustée de chaque membre.</p>
                <p className="mt-2"><span className="font-medium">⚠️ Attention :</span> Laissez de la marge (10-20%) pour les imprévus, 
                bugs, réunions...</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime un sprint ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">La suppression d'un sprint :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Supprime le sprint</span> de la liste</li>
                  <li><span className="font-medium">NE supprime PAS les user stories associées</span> → elles redeviennent disponibles</li>
                  <li><span className="font-medium">NE supprime PAS l'équipe ou le produit</span> → seule l'association est rompue</li>
                </ul>
                <p className="mt-3">
                  Vous êtes averti avant la suppression. 
                  <span className="font-medium"> Cette action est irréversible !</span>
                </p>
                <p className="mt-2"><span className="font-medium">💡 Astuce :</span> Au lieu de supprimer, passez le sprint en "Terminé" 
                pour conserver l'historique et la vélocité.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Mes données sont-elles en sécurité ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">🔒 100% sécurisé et privé !</p>
                <p className="mt-2">ProductOwnerApp fonctionne entièrement offline. Vos sprints sont stockés localement dans votre navigateur. 
                Aucune donnée n'est jamais envoyée vers un serveur externe.</p>
                <p className="mt-2"><span className="font-medium">💡 Conseil :</span> Exportez régulièrement en CSV pour une sauvegarde externe 
                supplémentaire.</p>
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

export default SprintsUserPage;
