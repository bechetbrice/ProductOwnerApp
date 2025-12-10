import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * InterviewsDetailPage - Documentation TECHNIQUE du Module Entretiens
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const InterviewsDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Entretiens</h1>
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
              Le <strong>Module Entretiens</strong> permet de préparer, conduire et analyser des entretiens 
              utilisateurs structurés. Il couvre tout le cycle : préparation des questions, prise de notes pendant 
              l'entretien, capture d'insights et création de besoins utilisateurs.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Il s'intègre aux modules Contacts, Besoins Utilisateurs et Produits pour une traçabilité complète.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Types d'entretien</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="font-medium">🔍 Découverte :</span> Explorer les besoins et contexte utilisateur</li>
                <li><span className="font-medium">✅ Validation :</span> Valider des hypothèses ou solutions</li>
                <li><span className="font-medium">💬 Feedback :</span> Recueillir retours sur fonctionnalités existantes</li>
                <li><span className="font-medium">📊 Recherche :</span> Étude approfondie d'un sujet spécifique</li>
                <li><span className="font-medium">✏️ Personnalisé :</span> Type libre défini par l'utilisateur</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Statuts</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="font-medium">📅 Planifié :</span> Entretien préparé, en attente de réalisation</li>
                <li><span className="font-medium">⏳ En cours :</span> Entretien en train d'être conduit</li>
                <li><span className="font-medium">✅ Terminé :</span> Entretien réalisé avec notes complétées</li>
                <li><span className="font-medium">❌ Annulé :</span> Entretien annulé ou reporté</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">❓ Sections de questions</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les questions sont organisées en sections thématiques. Chaque section contient :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Titre de la section</li>
                <li>Liste de questions textuelles</li>
                <li>Champs de réponses associés (remplis pendant l'entretien)</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Templates de questions</h3>
              <p className="text-sm text-gray-700 mb-2">
                Le module propose des templates pré-définis selon le type d'entretien :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Questions de découverte (contexte, besoins, frustrations)</li>
                <li>Questions de validation (hypothèses, solutions)</li>
                <li>Questions de feedback (expérience, améliorations)</li>
                <li>Questions de recherche (comportements, processus)</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> Les entretiens sont obligatoirement liés à un produit et 
              au moins un contact. Les sections de questions peuvent être personnalisées à tout moment, 
              même après la création de l'entretien.
            </p>
          </div>
        </div>

        {/* Architecture */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture du module</h2>

          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Composants principaux</h3>
              <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc">
                <li><span className="font-medium">InterviewsList :</span> Orchestration (filtres, tri, pagination)</li>
                <li><span className="font-medium">InterviewCard :</span> Carte affichant les infos clés d'un entretien</li>
                <li><span className="font-medium">InterviewForm :</span> Formulaire de préparation (2 onglets)</li>
                <li><span className="font-medium">InterviewDetail :</span> Vue détaillée/suivi (3 onglets)</li>
                <li><span className="font-medium">InterviewFilters :</span> Barre de filtres et actions</li>
                <li><span className="font-medium">InterviewTips :</span> Module conseils et astuces</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎨 FormModal - Préparation d'entretien</h3>
              <p className="text-sm text-gray-700 mb-2">Modal plein écran avec 2 onglets :</p>
              <ul className="text-sm text-gray-600 space-y-2 ml-4 list-disc">
                <li>
                  <span className="font-medium">Onglet 1 - Informations pratiques :</span>
                  <ul className="ml-4 mt-1 space-y-1 list-circle">
                    <li>Produit associé (obligatoire)</li>
                    <li>Identification (titre, type)</li>
                    <li>Participants (contacts interviewés)</li>
                    <li>Statut (planifié, en cours, terminé, annulé)</li>
                    <li>Planning (date/heure, durée, lieu)</li>
                    <li>Objectif de l'entretien</li>
                    <li>Notes de préparation</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">Onglet 2 - Questions :</span>
                  <ul className="ml-4 mt-1 space-y-1 list-circle">
                    <li>Templates de questions selon le type d'entretien</li>
                    <li>Sections personnalisables</li>
                    <li>Ajout/suppression de questions dynamiques</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">👁️ DetailModal - Consultation/Suivi</h3>
              <p className="text-sm text-gray-700 mb-2">Modal plein écran avec 3 onglets et 2 modes :</p>
              
              <div className="space-y-3 mt-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Mode 'view' (consultation) :</p>
                  <ul className="text-sm text-gray-600 ml-4 mt-1 space-y-1 list-disc">
                    <li>Onglets 1-2 en lecture seule avec bouton "Modifier la préparation"</li>
                    <li>Onglet 3 en lecture seule avec bouton "Modifier le suivi"</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">Mode 'edit' (suivi d'entretien) :</p>
                  <ul className="text-sm text-gray-600 ml-4 mt-1 space-y-1 list-disc">
                    <li>Onglets 1-2 en lecture seule (pas de modification)</li>
                    <li>Onglet 3 éditable avec boutons "Sauvegarder" et "Marquer comme terminé"</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">Contenu des onglets :</p>
                  <ul className="text-sm text-gray-600 ml-4 mt-1 space-y-1 list-disc">
                    <li>Onglet 1 : Informations pratiques (readonly)</li>
                    <li>Onglet 2 : Questions préparées (readonly)</li>
                    <li>Onglet 3 : Réponses, notes générales (éditable en mode 'edit')</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Utilisation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Utilisation pas-à-pas</h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Interface Principale</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">💡 Module Conseils et astuces</p>
                <p className="text-sm text-gray-700 mb-2">
                  Au premier lancement, un module pédagogique guide l'utilisateur sur :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Préparation d'entretien avec objectif et questions structurées</li>
                  <li>Capture d'insights avec 6 types (Besoin, Point de friction, Opportunité, etc.)</li>
                  <li>Actions de suivi assignées avec dates limites</li>
                  <li>Traçabilité avec produits et besoins utilisateurs</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📱 Grille d'Entretiens Responsive</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation en 3 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile). 
                  Chaque entretien est présenté sous forme de carte avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Titre, Type (emoji + badge), Statut (badge coloré)</li>
                  <li><span className="font-medium">Corps :</span> Date/heure, Durée, Lieu, Participants, Produit</li>
                  <li><span className="font-medium">Footer :</span> 3 boutons d'action (Voir, Modifier, Supprimer)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📄 Pagination</p>
                <p className="text-sm text-gray-700">
                  9 entretiens par page. Navigation avec boutons Précédent et Suivant. 
                  Compteur de résultats affiché en bas.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Barre de Filtres et Actions</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔧 En-tête de la FilterBar</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Sélecteur Produit :</span> Filtre par produit actif</li>
                  <li><span className="font-medium">Export CSV :</span> Bouton bleu 🔵 - Export avec filtres appliqués</li>
                  <li><span className="font-medium">Nouvel Entretien :</span> Bouton gradient bleu-violet</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (Repliable)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Par défaut repliée. Une fois dépliée, affiche :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Filtre Statut :</span> Tous / 📅 Planifiés / ⏳ En cours / ✅ Terminés / ❌ Annulés</li>
                  <li><span className="font-medium">Filtre Type :</span> Tous / 🔍 Découverte / ✅ Validation / 💬 Feedback / 📊 Recherche</li>
                  <li><span className="font-medium">Filtre Contact :</span> Filtrer par participant</li>
                  <li><span className="font-medium">Filtre Période :</span> Toutes / Aujourd'hui / Cette semaine / Ce mois / Passés</li>
                  <li><span className="font-medium">Tri :</span> Par date / statut / contact / type</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📤 Export CSV</p>
                <p className="text-sm text-gray-700 mb-2">
                  Exporte les entretiens affichés (respecte les filtres actifs) avec colonnes :
                </p>
                <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                  Titre,Type,Statut,Date,Durée,Lieu,Participants,Produit,Objectif,Questions,Notes
                </code>
                <p className="text-xs text-gray-600 mt-2">
                  Nom du fichier généré : interviews-YYYY-MM-DD.csv
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Workflow complet</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <ol className="text-sm text-gray-700 space-y-3 ml-4 list-decimal">
                <li>
                  <span className="font-medium">Préparation :</span> Créer entretien avec formulaire 
                  (produit, titre, type, participants, date, objectif, questions)
                </li>
                <li>
                  <span className="font-medium">Avant l'entretien :</span> Modifier la préparation si besoin 
                  (ajouter questions, ajuster planning)
                </li>
                <li>
                  <span className="font-medium">Pendant l'entretien :</span> Ouvrir l'entretien en mode 'edit' 
                  → Onglet 3 → Remplir les réponses et prendre des notes
                </li>
                <li>
                  <span className="font-medium">Après l'entretien :</span> Marquer comme terminé → 
                  Analyser les insights → Créer besoins utilisateurs si pertinent
                </li>
                <li>
                  <span className="font-medium">Suivi :</span> Exporter en CSV pour partage avec stakeholders, 
                  consulter via filtres (ex: "Terminés" du dernier mois)
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'un Entretien</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Champs de base</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>id, createdAt, updatedAt</div>
                    <div>productId, title, type</div>
                    <div>interviewedContactIds[]</div>
                    <div>scheduledDate, duration, location</div>
                    <div>objectives, status</div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Sections et Questions</p>
                  <div className="text-xs text-gray-600">
                    <p className="mb-1">sections[] : Array d'objets contenant :</p>
                    <ul className="ml-4 space-y-1 list-disc">
                      <li>id : Identifiant unique de la section</li>
                      <li>title : Titre de la section</li>
                      <li>questions[] : Array d'objets question/réponse</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Notes et Relations</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>generalNotes (notes libres)</div>
                    <div>linkedNeedIds[] (besoins liés)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🔍 <span className="font-medium">Validation formulaire :</span> Produit, titre et au moins 1 participant obligatoires</li>
                <li>📅 <span className="font-medium">Date par défaut :</span> Date du jour à 14h00 si non spécifiée</li>
                <li>⏱️ <span className="font-medium">Durée par défaut :</span> 60 minutes</li>
                <li>🎯 <span className="font-medium">Templates dynamiques :</span> Questions pré-remplies selon le type d'entretien</li>
                <li>🔗 <span className="font-medium">Relations :</span> Un entretien peut être lié à plusieurs besoins utilisateurs</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les entretiens sont sauvegardés localement dans votre navigateur sous la clé "po_app_interviews". 
                Sauvegarde automatique à chaque opération via le Factory Pattern Storage.
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
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700">
                Les entretiens sont obligatoirement associés à un produit actif. 
                Le ProductSelector permet de filtrer les entretiens par produit dans la liste principale.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                Chaque entretien est lié à au moins un contact via interviewedContactIds[]. 
                MultiContactSelector utilisé pour choisir les participants.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module Besoins Utilisateurs</h3>
              <p className="text-sm text-gray-700">
                Les insights capturés lors d'un entretien peuvent être convertis en besoins utilisateurs. 
                linkedNeedIds[] stocke les relations entre entretiens et besoins créés.
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👤 Module Personas</h3>
              <p className="text-sm text-gray-700">
                Les personas peuvent référencer les entretiens sources via linkedInterviewIds[], 
                permettant de tracer l'origine des insights utilisés pour créer le persona.
              </p>
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
              <li>🎯 <span className="font-medium">Objectif clair :</span> Définissez TOUJOURS un objectif précis avant l'entretien</li>
              <li>❓ <span className="font-medium">Questions structurées :</span> Utilisez les templates puis personnalisez selon vos besoins</li>
              <li>⏱️ <span className="font-medium">Durée réaliste :</span> 60 min par défaut, ajustez selon le nombre de questions</li>
              <li>📝 <span className="font-medium">Notes immédiate :</span> Remplissez les réponses et notes pendant ou juste après l'entretien</li>
              <li>🔗 <span className="font-medium">Traçabilité :</span> Liez les besoins utilisateurs créés à l'entretien source</li>
              <li>📊 <span className="font-medium">Analyse régulière :</span> Revisitez les entretiens passés pour identifier les patterns</li>
              <li>💾 <span className="font-medium">Export CSV :</span> Exportez régulièrement pour partage avec stakeholders</li>
              <li>🔄 <span className="font-medium">Suivi :</span> Maintenez les statuts à jour (Planifié → En cours → Terminé)</li>
            </ul>
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

export default InterviewsDetailPage;
