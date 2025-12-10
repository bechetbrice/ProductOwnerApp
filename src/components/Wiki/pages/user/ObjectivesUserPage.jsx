import React from 'react';
import { ArrowLeft, Users, Rocket, Zap, HelpCircle, Code } from 'lucide-react';

/**
 * ObjectivesUserPage - Guide UTILISATEUR du Module Objectifs
 * Version simplifiée et pédagogique pour Product Owners
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToDev - Fonction pour basculer vers la version technique
 */
const ObjectivesUserPage = ({ onBack, onSwitchToDev }) => {
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
              <h1 className="text-3xl font-bold mb-2">🎯 Guide Objectifs Produit</h1>
              <p className="text-teal-100 text-lg">Définissez et suivez vos objectifs stratégiques</p>
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
            <h2 className="text-2xl font-bold text-gray-900">À quoi sert le module Objectifs ?</h2>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Le module <strong>Objectifs</strong> vous aide à <strong>définir clairement ce que vous voulez accomplir</strong> 
              avec votre produit et à <strong>mesurer votre progression</strong>. C'est le pont entre votre vision stratégique 
              et l'exécution quotidienne de votre équipe.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Direction Claire</h3>
                <p className="text-sm text-gray-600">
                  Donnez à votre équipe une vision précise de ce vers quoi vous tendez, avec des critères de succès mesurables
                </p>
              </div>
              
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Suivi de Progression</h3>
                <p className="text-sm text-gray-600">
                  Mesurez l'avancement de vos objectifs grâce aux user stories liées et aux KPIs définis
                </p>
              </div>
              
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <div className="text-3xl mb-2">🔗</div>
                <h3 className="font-semibold text-gray-900 mb-2">Alignement Stratégique</h3>
                <p className="text-sm text-gray-600">
                  Reliez vos besoins utilisateurs et user stories à vos objectifs pour garantir la cohérence
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">💡 La clé : la méthode SMART.</span> Chaque objectif doit être <strong>S</strong>pécifique, 
                <strong>M</strong>esurable, <strong>A</strong>tteignable, <strong>R</strong>éaliste et <strong>T</strong>emporel. 
                Sans ces critères, un objectif n'est qu'un vœu pieux !
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Créer votre premier objectif SMART</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Cliquez sur <span className="font-medium text-teal-600">"Nouvel Objectif"</span> en haut à droite</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Sélectionnez un produit</span> (obligatoire) - l'objectif sera rattaché à ce produit</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Titre clair :</span> "Améliorer le temps de chargement mobile" plutôt que "Mieux performer"</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Description :</span> Expliquez le POURQUOI - contexte, enjeu business, impact utilisateur</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Date d'échéance :</span> Fixez une deadline réaliste (trimestre, semestre)</p>
                  <p className="text-sm text-gray-700">• <span className="font-medium">Définissez des KPIs :</span> "Temps chargement &lt;2s", "Score Lighthouse &gt;90", "Taux rebond -20%"</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3 text-xs text-gray-700">
                  <span className="font-medium">💡 Exemple d'objectif SMART :</span> "Réduire le temps de chargement de la page d'accueil mobile 
                  de 4s à moins de 2s d'ici le 30 juin, mesuré par Google Lighthouse, pour améliorer le taux de conversion de 15%"
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Prioriser avec les niveaux de priorité</h3>
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700 mb-3">Choisissez le bon niveau selon l'impact business :</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🔴</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Critique</p>
                        <p className="text-xs text-gray-600">Impact majeur sur la viabilité du produit. À traiter en priorité absolue.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🟠</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Haute</p>
                        <p className="text-xs text-gray-600">Important pour la stratégie produit. À planifier rapidement.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🟡</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Moyenne</p>
                        <p className="text-xs text-gray-600">Amélioration notable mais non urgente. Peut attendre le bon moment.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">⚪</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Basse</p>
                        <p className="text-xs text-gray-600">Nice-to-have avec faible impact. À traiter si capacité disponible.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-teal-200 rounded p-3 mt-3 text-xs text-gray-700">
                  <span className="font-medium">🎯 Astuce :</span> Limitez-vous à 3-5 objectifs "Actifs" maximum par produit. 
                  Trop d'objectifs simultanés = dilution des efforts et perte de focus !
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Relier besoins et stories à l'objectif</h3>
                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700">• Allez dans le module <span className="font-medium">Besoins Utilisateurs</span></p>
                  <p className="text-sm text-gray-700">• Créez ou modifiez un besoin existant</p>
                  <p className="text-sm text-gray-700">• Dans le formulaire, section "🎯 Objectif stratégique", sélectionnez votre objectif</p>
                  <p className="text-sm text-gray-700">• Faites de même avec vos <span className="font-medium">User Stories</span></p>
                  <p className="text-sm text-gray-700">• Retournez dans Objectifs → Cliquez sur l'icône 👁️ pour voir vos relations</p>
                  <p className="text-sm text-gray-700">• La progression s'affiche automatiquement pour les objectifs "Actifs"</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-3 mt-3 text-xs text-gray-700">
                  <span className="font-medium">✅ Bonne pratique :</span> Chaque objectif devrait avoir au moins 1 besoin utilisateur lié 
                  pour justifier son existence. Un objectif sans besoin = feature factory, pas stratégie produit !
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
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Scénario 1 : "Je commence un nouveau trimestre, comment définir mes objectifs ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Définir 3-4 objectifs stratégiques alignés avec la vision produit pour les 3 prochains mois.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Analysez vos <span className="font-medium">besoins utilisateurs prioritaires</span> (module Besoins)</li>
                  <li>Identifiez les <span className="font-medium">thèmes récurrents</span> (ex: "Performance", "Onboarding", "Mobile")</li>
                  <li>Pour chaque thème, créez un <span className="font-medium">objectif SMART</span></li>
                  <li>Définissez des <span className="font-medium">KPIs mesurables</span> pour chacun</li>
                  <li>Fixez une date d'échéance (fin du trimestre)</li>
                  <li>Priorisez : 1-2 objectifs "Critiques", 1-2 "Hautes", évitez trop d'objectifs "Moyennes"</li>
                  <li>Reliez vos besoins existants aux objectifs créés</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Template d'objectif :</span> "[Action] [Métrique] [de X à Y] [pour Date] 
                    afin de [Impact Business]"
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    Ex: "Réduire le temps d'onboarding de 10 min à 3 min d'ici le 30 juin pour augmenter le taux d'activation de 25%"
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 Scénario 2 : "Comment mesurer la progression d'un objectif ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Suivre l'avancement d'un objectif "Actif" et savoir quand il sera atteint.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Ouvrez la vue <span className="font-medium">liste Objectifs</span></li>
                  <li>Identifiez votre objectif (statut "✅ Actif")</li>
                  <li>La <span className="font-medium">barre de progression</span> s'affiche automatiquement sur la carte</li>
                  <li>Cliquez sur l'icône <span className="font-medium">👁️ (Voir détails)</span></li>
                  <li>Dans la modal, vous voyez :</li>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Le nombre de <span className="font-medium">besoins utilisateurs</span> liés</li>
                    <li>Le nombre de <span className="font-medium">user stories</span> liées</li>
                    <li>La progression basée sur les stories terminées</li>
                  </ul>
                  <li>Suivez vos <span className="font-medium">KPIs</span> externes (Analytics, métriques produit)</li>
                  <li>Mettez à jour le statut en "✔️ Terminé" quand tous les critères sont atteints</li>
                </ol>

                <div className="bg-white border border-green-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-700 mb-2">
                    <span className="font-medium text-gray-900">📈 Calcul automatique de la progression :</span>
                  </p>
                  <p className="text-xs text-gray-700">
                    Progression = (Nombre de stories liées terminées / Total stories liées) × 100
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    Ex: 12 stories liées dont 8 terminées = 67% de progression
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 */}
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">⚠️ Scénario 3 : "Mon objectif affiche un badge 'Retard', que faire ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Gérer un objectif dont la date d'échéance est dépassée sans être terminé.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>Identifiez tous les objectifs avec le badge <span className="font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">⚠️ Retard</span></li>
                  <li>Pour chaque objectif en retard, ouvrez la vue détaillée (icône 👁️)</li>
                  <li>Analysez la situation :</li>
                  <ul className="ml-6 list-disc space-y-1">
                    <li><span className="font-medium">Progression &lt; 50% :</span> Objectif trop ambitieux ou manque de ressources ?</li>
                    <li><span className="font-medium">Progression &gt; 80% :</span> Presque fini, décaler la date suffit ?</li>
                    <li><span className="font-medium">Progression stagnante :</span> Bloqueurs ? Dépendances externes ?</li>
                  </ul>
                  <li>Prenez une décision :</li>
                  <ul className="ml-6 list-disc space-y-1">
                    <li><span className="font-medium">Option A :</span> Modifier la date d'échéance (réaliste mais prudent)</li>
                    <li><span className="font-medium">Option B :</span> Réduire le scope (moins de stories liées)</li>
                    <li><span className="font-medium">Option C :</span> Passer en "❌ Annulé" si plus pertinent (contexte changé)</li>
                  </ul>
                  <li>Communiquez avec votre équipe et vos stakeholders</li>
                </ol>

                <div className="bg-white border border-teal-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">🎯 Règle d'or :</span> Un objectif en retard = signal d'alarme, pas échec ! 
                    C'est l'occasion de réévaluer vos priorités et d'ajuster votre stratégie.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 4 */}
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🔄 Scénario 4 : "Comment organiser mes objectifs multi-produits ?"</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium text-gray-900">Objectif :</p>
                <p>Gérer efficacement des objectifs répartis sur plusieurs produits.</p>
                
                <p className="font-medium text-gray-900 mt-3">Actions :</p>
                <ol className="space-y-1 ml-6 list-decimal">
                  <li>En haut de la page, utilisez le <span className="font-medium">sélecteur de produit</span></li>
                  <li>Sélectionnez un produit spécifique pour filtrer uniquement ses objectifs</li>
                  <li>Analysez la charge : <span className="font-medium">combien d'objectifs actifs</span> pour ce produit ?</li>
                  <li>Recommandation : <span className="font-medium">max 3-5 objectifs actifs</span> par produit</li>
                  <li>Si trop d'objectifs :</li>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Passez certains en "📋 Planifié" (reporter au prochain trimestre)</li>
                    <li>Ou annulez les moins prioritaires</li>
                  </ul>
                  <li>Utilisez le <span className="font-medium">tri par priorité</span> pour voir les objectifs critiques en premier</li>
                </ol>

                <div className="bg-white border border-cyan-200 rounded p-3 mt-3">
                  <p className="text-xs text-gray-900">
                    <span className="font-medium">💡 Astuce multi-produits :</span> Les badges produit (code couleur) sont visibles 
                    sur chaque carte. Pratique pour identifier rapidement à quel produit appartient un objectif !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Les 6 commandements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Les 6 commandements des Objectifs Produit</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 flex-shrink-0">1</div>
              <div>
                <p className="font-medium text-gray-900">SMART tu seras</p>
                <p className="text-sm text-gray-700">Chaque objectif doit être Spécifique, Mesurable, Atteignable, Réaliste et Temporel. 
                Sans ces critères, c'est un vœu pieux, pas un objectif !</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">2</div>
              <div>
                <p className="font-medium text-gray-900">3-5 objectifs actifs maximum</p>
                <p className="text-sm text-gray-700">Trop d'objectifs simultanés = dispersion et perte de focus. Priorisez impitoyablement. 
                Mieux vaut 3 objectifs atteints que 10 objectifs abandonnés.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-teal-600 flex-shrink-0">3</div>
              <div>
                <p className="font-medium text-gray-900">Des KPIs mesurables tu définiras</p>
                <p className="text-sm text-gray-700">"Améliorer l'expérience utilisateur" est vague. "NPS &gt;50, temps chargement &lt;2s, taux conversion +15%" 
                est actionnable et mesurable.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 flex-shrink-0">4</div>
              <div>
                <p className="font-medium text-gray-900">Besoins et stories tu relieras</p>
                <p className="text-sm text-gray-700">Chaque objectif doit être lié à au moins 1 besoin utilisateur. C'est la garantie 
                que vous construisez pour vos utilisateurs, pas pour faire plaisir aux stakeholders.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600 flex-shrink-0">5</div>
              <div>
                <p className="font-medium text-gray-900">Mensuellement tu réviseras</p>
                <p className="text-sm text-gray-700">Revoyez vos objectifs chaque mois : progression, pertinence, ajustements nécessaires. 
                Un objectif figé dans le marbre est un objectif mort.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-600 flex-shrink-0">6</div>
              <div>
                <p className="font-medium text-gray-900">Les succès tu célébreras</p>
                <p className="text-sm text-gray-700">Objectif terminé = moment de célébration avec l'équipe ! C'est motivant, 
                fédérateur et ça marque la fin d'un cycle. Ne zappez jamais cette étape.</p>
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
                ❓ Quelle est la différence entre un objectif et un besoin utilisateur ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3"><span className="font-medium">Objectif :</span> Vision stratégique de haut niveau. 
                Ex: "Améliorer le temps de chargement mobile"</p>
                <p className="mt-2"><span className="font-medium">Besoin utilisateur :</span> Problème concret rencontré par un utilisateur. 
                Ex: "En tant que visiteur mobile, je veux que la page charge en moins de 3s pour ne pas abandonner"</p>
                <p className="mt-2 font-medium">→ Un objectif peut regrouper plusieurs besoins.</p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Combien d'objectifs actifs puis-je avoir simultanément ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3"><span className="font-medium">Recommandation forte : 3-5 objectifs actifs maximum par produit.</span></p>
                <p className="mt-2">Au-delà, vous risquez :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Dispersion de l'équipe sur trop de fronts</li>
                  <li>Perte de focus et de cohérence</li>
                  <li>Allongement des délais de livraison</li>
                  <li>Frustration de ne rien terminer complètement</li>
                </ul>
                <p className="mt-2 font-medium">Mieux vaut 3 objectifs atteints que 10 objectifs abandonnés !</p>
              </div>
            </details>

            <details className="bg-cyan-50 border border-cyan-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-cyan-100 transition-colors">
                ❓ Comment savoir si mon objectif est bien SMART ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-cyan-100">
                <p className="mt-3">Posez-vous ces 5 questions :</p>
                <ol className="mt-2 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">Spécifique :</span> Quelqu'un d'externe peut-il comprendre l'objectif sans contexte ?</li>
                  <li><span className="font-medium">Mesurable :</span> Ai-je défini des KPIs chiffrés pour mesurer le succès ?</li>
                  <li><span className="font-medium">Atteignable :</span> Avec mon équipe actuelle, est-ce réalisable ?</li>
                  <li><span className="font-medium">Réaliste :</span> Les contraintes (budget, tech, marché) permettent-elles d'y arriver ?</li>
                  <li><span className="font-medium">Temporel :</span> Ai-je fixé une date d'échéance claire ?</li>
                </ol>
                <p className="mt-3 font-medium">Si vous répondez "non" à une seule question, retravaillez votre objectif !</p>
              </div>
            </details>

            <details className="bg-green-50 border border-green-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-green-100 transition-colors">
                ❓ Mon objectif a dépassé sa date d'échéance, dois-je le supprimer ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-green-100">
                <p className="mt-3"><span className="font-medium">Non, ne supprimez pas ! Vous avez 3 options :</span></p>
                <ol className="mt-2 space-y-2 ml-4 list-decimal">
                  <li><span className="font-medium">Ajuster la date :</span> Si l'objectif est toujours pertinent et bien avancé, 
                  décalez la date d'échéance de 2-4 semaines</li>
                  <li><span className="font-medium">Réduire le scope :</span> Retirez des user stories liées pour finir plus vite avec un MVP</li>
                  <li><span className="font-medium">Annuler :</span> Si le contexte a changé ou l'objectif n'est plus prioritaire, 
                  passez-le en statut "❌ Annulé"</li>
                </ol>
                <p className="mt-3"><span className="font-medium">⚠️ Le retard est un signal,</span> pas un échec. 
                Analysez pourquoi (surcharge équipe ? objectif trop ambitieux ?) pour mieux planifier la prochaine fois.</p>
              </div>
            </details>

            <details className="bg-red-50 border border-red-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-red-100 transition-colors">
                ❓ Que se passe-t-il si je supprime un objectif ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-red-100">
                <p className="mt-3">Avant suppression, l'app vérifie automatiquement les relations :</p>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>Besoins utilisateurs liés à cet objectif</li>
                  <li>User Stories liées à cet objectif</li>
                </ul>
                <p className="mt-3">
                  Vous êtes averti du nombre de relations. Si vous confirmez, ces relations seront <span className="font-medium">supprimées</span> 
                  (le champ "linkedGoalId" sera vidé). Les besoins et stories eux-mêmes restent intacts.
                </p>
                <p className="mt-3">
                  <span className="font-medium text-red-700">⚠️ Cette action est irréversible !</span> Préférez passer l'objectif 
                  en "❌ Annulé" ou "📦 Archivé" pour garder l'historique.
                </p>
              </div>
            </details>

            <details className="bg-teal-50 border border-teal-100 rounded-lg">
              <summary className="font-semibold text-gray-900 p-4 cursor-pointer hover:bg-teal-100 transition-colors">
                ❓ Comment mesurer la progression d'un objectif ?
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-700 border-t border-teal-100">
                <p className="mt-3 font-medium">2 méthodes complémentaires :</p>
                
                <div className="mt-3 bg-white rounded border border-teal-200 p-3">
                  <p className="font-medium text-gray-900 mb-1">1️⃣ Progression automatique (dans l'app)</p>
                  <p className="text-xs text-gray-700">
                    Basée sur le nombre de user stories liées terminées. Si vous avez 10 stories liées dont 7 terminées, 
                    la barre de progression affiche 70%.
                  </p>
                </div>

                <div className="mt-3 bg-white rounded border border-teal-200 p-3">
                  <p className="font-medium text-gray-900 mb-1">2️⃣ KPIs externes (hors app)</p>
                  <p className="text-xs text-gray-700">
                    Suivez vos métriques dans vos outils d'analytics (Google Analytics, Mixpanel, etc.). 
                    Comparez avec les KPIs définis dans votre objectif.
                  </p>
                </div>

                <p className="mt-3"><span className="font-medium">💡 Astuce :</span> Combinez les deux ! La progression app vous dit 
                si vous avancez sur les livrables, les KPIs vous disent si vous atteignez l'impact business visé.</p>
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

export default ObjectivesUserPage;
