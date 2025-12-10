import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * SettingsDetailPage - Documentation TECHNIQUE du Module Paramétrage
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const SettingsDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Paramétrage</h1>
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
              Le <strong>Module Paramétrage</strong> centralise la configuration de l'application avec 3 onglets principaux : 
              <strong> Général</strong> (export automatique et stockage), <strong>Listes Personnalisées</strong> (référentiels) 
              et <strong>Mentions Légales</strong> (conformité LCEN et RGPD).
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage dans le localStorage. 
              Il permet de configurer l'export automatique avec détection intelligente des modifications, 
              gérer des référentiels personnalisés partagés entre modules, et consulter les informations légales complètes.
            </p>
          </div>
        </div>

        {/* Architecture du module */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Architecture et composants</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📋 Settings.jsx (Composant principal)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Composant conteneur avec navigation par onglets. Gère l'état activeTab et délègue le rendu aux sous-composants.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Props reçues :</span> settings (objet), onUpdateSettings (fonction)</p>
                <p><span className="font-medium">State local :</span> activeTab ('general' | 'customLists' | 'legal')</p>
                <p><span className="font-medium">Rendu :</span> Onglets + Composant actif (GeneralSettings | CustomListsSettings | LegalSettings)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚙️ GeneralSettings.jsx</h3>
              <p className="text-sm text-gray-700 mb-3">
                Gère les préférences générales et l'export automatique via le contexte AutoExportContext.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Sections :</span> Export automatique, Stockage, Confidentialité, Zone dangereuse</p>
                <p><span className="font-medium">Context utilisé :</span> useAutoExport() (config, updateConfig, stats, manualExport...)</p>
                <p><span className="font-medium">State localStorage :</span> productOwnerApp_preferences (compactMode)</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📝 CustomListsSettings.jsx</h3>
              <p className="text-sm text-gray-700 mb-3">
                Éditeur visuel pour les listes personnalisées (rôles, entreprises, départements).
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Props :</span> settings (objet avec roles[], companies[], departments[]), onUpdateSettings</p>
                <p><span className="font-medium">Composant interne :</span> ListCard (carte par liste avec actions CRUD)</p>
                <p><span className="font-medium">Actions :</span> Ajouter, Modifier, Supprimer (avec tri automatique alphabétique)</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⚖️ LegalSettings.jsx</h3>
              <p className="text-sm text-gray-700 mb-3">
                Affichage des mentions légales complètes conformes LCEN et RGPD. Sections repliables.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Sections :</span> 7 sections (Éditeur, Hébergement, RGPD, Copyright, Responsabilité, Juridiction, Contact)</p>
                <p><span className="font-medium">Fonctionnalité :</span> Contenu statique, liens externes cliquables, structure accordéon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Onglet Général - Détails techniques */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Onglet Général - Spécifications techniques</h2>

          {/* Export automatique */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Export Automatique</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔄 Fonctionnement du système</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><span className="font-medium">• Détection des modifications :</span> Le contexte AutoExportContext compare les snapshots de localStorage via checksum MD5</li>
                  <li><span className="font-medium">• Intervalle configurable :</span> 5 à 120 minutes (par défaut 30 min)</li>
                  <li><span className="font-medium">• Limite quotidienne :</span> 1 à 50 exports/jour (protection contre exports excessifs)</li>
                  <li><span className="font-medium">• Notification optionnelle :</span> Message console avec délai 0-60 secondes</li>
                  <li><span className="font-medium">• Format de fichier :</span> productownerapp_auto_YYYY-MM-DD_HH-MM-SS.json</li>
                </ul>
                <div className="mt-3 bg-white rounded border border-green-200 p-3">
                  <p className="text-xs text-green-900">
                    <span className="font-medium">💡 Algorithme :</span> setInterval(vérifier modifications + exporter si hasChanges, intervalMs)
                  </p>
                </div>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📊 Structure de la configuration</p>
                <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`{
  enabled: boolean,
  interval: number,           // minutes
  maxExportsPerDay: number,
  notifyBeforeExport: boolean,
  notifyDelay: number         // secondes
}`}
                </pre>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📈 Statistiques trackées</p>
                <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`{
  exportsToday: number,
  totalExports: number,
  lastExportDate: string,     // ISO 8601
  lastExportSuccess: boolean
}`}
                </pre>
                <p className="text-xs text-gray-600 mt-2">
                  Reset automatique des stats quotidiennes à minuit (via useEffect)
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">⚡ Actions disponibles</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><span className="font-medium">handleToggleAutoExport() :</span> Active/désactive le système</li>
                  <li><span className="font-medium">handleManualExport() :</span> Déclenche un export immédiat (bypass limite quotidienne)</li>
                  <li><span className="font-medium">resetDailyStats() :</span> Réinitialise exportsToday à 0</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stockage */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Utilisation du Stockage</h3>
            
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">💾 Calcul du stockage</p>
              <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto mb-2">
{`// Parcourt toutes les clés localStorage
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  totalSize += key.length + (value ? value.length : 0);
}

// Conversion en KB
sizeKB = (totalSize / 1024).toFixed(1);

// Pourcentage (limite ~5-10 MB selon navigateur)
percentage = ((totalSize / 1024 / 1024) / maxSizeMB * 100).toFixed(2);`}
              </pre>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Note :</span> useMemo pour éviter recalcul inutile à chaque render
              </p>
            </div>
          </div>

          {/* Zone dangereuse */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Zone Dangereuse</h3>
            
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">🗑️ Suppression de toutes les données</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="font-medium">• Double confirmation :</span> Clic bouton "Effacer" → État showDeleteConfirm → Clic "Confirmer" → window.confirm()</li>
                <li><span className="font-medium">• Action :</span> localStorage.clear() + window.location.reload()</li>
                <li><span className="font-medium">• Données supprimées :</span> TOUT le localStorage (business plans, objectifs, préférences, listes...)</li>
              </ul>
              <div className="mt-3 bg-white rounded border border-red-200 p-3">
                <p className="text-xs text-red-900">
                  <span className="font-medium">⚠️ IRRÉVERSIBLE :</span> Aucun mécanisme de récupération. Recommander export manuel avant.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Onglet Listes Personnalisées */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Onglet Listes Personnalisées - Spécifications</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure des données</h3>
              <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto mb-2">
{`// Objet settings stocké dans App.jsx
{
  roles: string[],        // Ex: ["Product Owner", "Dev Full-Stack"]
  companies: string[],    // Ex: ["Acme Corp", "TechStart"]
  departments: string[]   // Ex: ["IT", "Marketing", "RH"]
}`}
              </pre>
              <p className="text-xs text-gray-600 mt-2">
                <span className="font-medium">Sauvegarde :</span> Automatique via onUpdateSettings(newSettings) qui persiste dans localStorage
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🎨 Composant ListCard</h3>
              <p className="text-sm text-gray-700 mb-2">
                Composant interne réutilisable pour afficher et gérer une liste.
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">Props :</span> listKey, icon, title, color, badgeColor, borderColor</p>
                <p><span className="font-medium">États :</span> Normal (affichage) | Ajout (input + boutons) | Édition (input inline + boutons)</p>
                <p><span className="font-medium">UI :</span> Header avec compteur → Liste items scrollable (max-h-64) → Bouton "Ajouter"</p>
                <p><span className="font-medium">Hover :</span> Affiche boutons Modifier (bleu) + Supprimer (rouge) sur chaque item</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique CRUD</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-medium">Ajouter :</span> handleStartAdding() → setAddingTo(listKey) → handleSaveNewItem() → [...currentItems, newItem].sort()</p>
                <p><span className="font-medium">Modifier :</span> handleEditItem() → setEditingItem(item) → handleSaveEdit() → items.map(remplacement).sort()</p>
                <p><span className="font-medium">Supprimer :</span> handleDeleteItem() → window.confirm() → items.filter(item !== deleted)</p>
                <p><span className="font-medium">Tri automatique :</span> Ordre alphabétique après chaque modification (via .sort())</p>
              </div>
              <div className="mt-3 bg-white rounded border border-green-200 p-3">
                <p className="text-xs text-green-900">
                  <span className="font-medium">💡 Shortcuts :</span> Enter = Save | Escape = Cancel
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🔗 Intégration avec autres modules</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><span className="font-medium">• Module Contacts :</span> Utilise roles[], companies[], departments[] dans ContactForm</li>
                <li><span className="font-medium">• Module Interviews :</span> Utilise roles[], companies[] dans InterviewForm</li>
                <li><span className="font-medium">• Comportement suppression :</span> Éléments supprimés restent dans enregistrements existants (référence conservée)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Onglet Mentions Légales */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Onglet Mentions Légales - Contenu</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📄 Section 1 : Éditeur de l'application</h3>
              <p className="text-sm text-gray-700">
                Brice Béchet • 1 rue Charlier, 51100 Reims • bechetbrice@hotmail.com • LinkedIn
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🖥️ Section 2 : Hébergement</h3>
              <p className="text-sm text-gray-700">
                Site : coolabflow.fr • Hébergeur : OVH SAS • 2 rue Kellermann, 59100 Roubaix • www.ovh.com
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🔒 Section 3 : RGPD</h3>
              <p className="text-sm text-gray-700">
                Aucune donnée collectée • Stockage 100% local • Aucune transmission • Aucun cookie/tracker • 
                Droits RGPD (accès, rectification, effacement, portabilité, opposition) • Réclamation CNIL
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">© Section 4 : Propriété intellectuelle</h3>
              <p className="text-sm text-gray-700">
                Copyright © 2025 Brice Béchet • Licence MIT • Code source sur GitHub (github.com/bechetbrice/BusinessPlanBuilder) • 
                Autorisations : usage commercial, modification, distribution, sous-licences • Conditions : conserver copyright + licence
              </p>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">⚠️ Section 5 : Limitation de responsabilité</h3>
              <p className="text-sm text-gray-700">
                Fourni "EN L'ÉTAT" • Aucune garantie • Exclusion bugs/virus/compatibilité • 
                Responsabilité utilisateur : sauvegarde, usage conforme, protection, vérification données
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">⚖️ Section 6 : Juridiction</h3>
              <p className="text-sm text-gray-700">
                Droit français • Textes : LCEN, RGPD, Loi Informatique et Libertés, Code propriété intellectuelle • 
                Tribunal : Reims (51100) • Médiation : ec.europa.eu/consumers/odr
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📧 Section 7 : Contact</h3>
              <p className="text-sm text-gray-700">
                Email : bechetbrice@hotmail.com • LinkedIn : linkedin.com/in/brice-béchet-reims • 
                Courrier : 1 rue Charlier, 51100 Reims • Délai réponse : 30 jours max
              </p>
            </div>
          </div>
        </div>

        {/* Conseils pratiques */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-600 flex-shrink-0" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Conseils Techniques</h2>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>🔄 <span className="font-medium">Export automatique :</span> Utiliser AutoExportContext pour accéder config/stats sans prop drilling</li>
              <li>📊 <span className="font-medium">Statistiques :</span> Reset quotidien automatique via useEffect avec setTimeout calculé jusqu'à minuit</li>
              <li>💾 <span className="font-medium">Stockage :</span> Calculer taille totale via boucle localStorage avec useMemo pour performance</li>
              <li>📝 <span className="font-medium">Listes personnalisées :</span> Toujours trier alphabétiquement après modification pour cohérence UI</li>
              <li>⚠️ <span className="font-medium">Suppression :</span> Double confirmation + message explicite des conséquences (IRRÉVERSIBLE)</li>
              <li>🎨 <span className="font-medium">UI :</span> Sections repliables (expandedSections state) pour alléger l'interface et améliorer UX</li>
              <li>🔗 <span className="font-medium">Liens externes :</span> target="_blank" + rel="noopener noreferrer" pour sécurité</li>
              <li>⌨️ <span className="font-medium">Accessibilité :</span> onKeyDown avec Enter/Escape pour édition rapide des listes</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">🗂️ Clés localStorage utilisées</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-white rounded p-2">
                  <p className="font-medium mb-1">autoExportConfig</p>
                  <code className="text-xs">{'{ enabled, interval, maxExportsPerDay, notifyBeforeExport, notifyDelay }'}</code>
                </div>
                <div className="bg-white rounded p-2">
                  <p className="font-medium mb-1">autoExportStats</p>
                  <code className="text-xs">{'{ exportsToday, totalExports, lastExportDate, lastExportSuccess, lastResetDate }'}</code>
                </div>
                <div className="bg-white rounded p-2">
                  <p className="font-medium mb-1">productOwnerApp_preferences</p>
                  <code className="text-xs">{'{ compactMode: boolean }'}</code>
                </div>
                <div className="bg-white rounded p-2">
                  <p className="font-medium mb-1">settings (géré par App.jsx)</p>
                  <code className="text-xs">{'{ roles: string[], companies: string[], departments: string[] }'}</code>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Contexte AutoExportContext</h3>
              <p className="text-sm text-gray-700 mb-2">
                Contexte global pour gérer l'export automatique périodique avec détection de modifications.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Hook :</span> useAutoExport() retourne config, updateConfig, stats, hasChanges, manualExport, resetDailyStats</p>
                <p><span className="font-medium">Détection :</span> Snapshot localStorage MD5 comparé à chaque intervalle</p>
                <p><span className="font-medium">Timer :</span> setInterval déclenché uniquement si config.enabled = true</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Format de fichier export</h3>
              <pre className="text-xs bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`// productownerapp_auto_2025-01-15_14-30-00.json
{
  "exportDate": "2025-01-15T14:30:00.000Z",
  "version": "1.0.0",
  "data": {
    "products": [...],
    "contacts": [...],
    "interviews": [...],
    "userNeeds": [...],
    "userStories": [...],
    "objectives": [...],
    "settings": {
      "roles": [...],
      "companies": [...],
      "departments": [...]
    },
    ...
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Tous les modules (Export automatique)</h3>
              <p className="text-sm text-gray-700">
                Le système d'export automatique sauvegarde TOUTES les données de l'application : 
                produits, contacts, entretiens, besoins, stories, objectifs, sprints, tâches, paramètres...
              </p>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👤 Module Contacts</h3>
              <p className="text-sm text-gray-700">
                Utilise settings.roles[], settings.companies[], settings.departments[] dans les champs de saisie avec autocomplétion.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎤 Module Entretiens</h3>
              <p className="text-sm text-gray-700">
                Utilise settings.roles[] et settings.companies[] pour qualifier les interlocuteurs interrogés.
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

export default SettingsDetailPage;
