import React from 'react';
import { ArrowLeft, BookOpen, Lightbulb, Users } from 'lucide-react';

/**
 * PersonasDetailPage - Documentation TECHNIQUE du Module Personas
 * Version destinée aux développeurs et à l'IA
 * Design inspiré du modal UserNeedDetail (chaleureux et équilibré)
 * 
 * @component
 * @version 1.0.0 - Design chaleureux avec fonds pastel et emojis stratégiques
 * @param {Function} onBack - Fonction de retour au Wiki
 * @param {Function} onSwitchToUser - Fonction pour basculer vers la version utilisateur
 */
const PersonasDetailPage = ({ onBack, onSwitchToUser }) => {
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
              <h1 className="text-2xl font-bold mb-1">📚 Documentation Technique - Module Personas</h1>
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
              Le <strong>Module Personas</strong> permet de créer et gérer des profils d'utilisateurs types (personas) 
              qui représentent les segments d'audience cibles. Un persona est une représentation semi-fictionnelle basée sur 
              des données réelles issues des entretiens et contacts.
            </p>
            <p>
              Ce module fonctionne de manière <strong>100% offline</strong> avec stockage local dans le navigateur. 
              Il s'intègre aux autres modules via les associations avec produits, contacts, besoins utilisateurs et user stories, 
              permettant une traçabilité complète de l'utilisateur final vers les fonctionnalités développées.
            </p>
          </div>
        </div>

        {/* Concepts clés */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Concepts clés</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">⭐ Persona Primaire</h3>
              <p className="text-sm text-gray-700 mb-3">
                Représente la cible principale du produit (70-80% des utilisateurs). 
                Toutes les décisions produit doivent d'abord satisfaire ce persona. 
                Limité à 1-2 personas primaires par produit pour maintenir le focus.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Propriété :</span> isPrimary: true</p>
                <p><span className="font-medium">Utilisation :</span> Filtres prioritaires, priorisation backlog</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">👤 Persona Secondaire</h3>
              <p className="text-sm text-gray-700 mb-3">
                Représente des segments importants mais moins prioritaires. 
                Leurs besoins sont pris en compte sans compromettre l'expérience des personas primaires. 
                Maximum 1-3 personas secondaires par produit.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Propriété :</span> isPrimary: false</p>
                <p><span className="font-medium">Utilisation :</span> Besoins secondaires, features optionnelles</p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Objectifs</h3>
              <p className="text-sm text-gray-700 mb-3">
                Ce que le persona veut accomplir avec le produit. 
                Minimum 1 objectif requis. Les objectifs guident la création de fonctionnalités 
                qui apportent de la valeur utilisateur.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Type :</span> Array de strings</p>
                <p><span className="font-medium">Validation :</span> Au moins 1 élément non vide requis</p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">😞 Frustrations</h3>
              <p className="text-sm text-gray-700 mb-3">
                Points de douleur et obstacles actuels du persona. 
                Identifient les problèmes à résoudre et guident les améliorations UX. 
                Optionnel mais fortement recommandé.
              </p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Type :</span> Array de strings</p>
                <p><span className="font-medium">Usage :</span> Priorisation des quick wins</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>💡 Note importante :</strong> Un persona est lié à UN SEUL produit (productId obligatoire). 
              Pour un persona qui apparaît sur plusieurs produits, créer des instances distinctes 
              avec des nuances spécifiques à chaque produit.
            </p>
          </div>
        </div>

        {/* Utilisation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Utilisation pas-à-pas</h2>

          {/* Interface principale */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">1️⃣ Interface Principale (PersonasList.jsx)</h3>
            
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">💡 Module Conseils et astuces</p>
                <p className="text-sm text-gray-700 mb-2">
                  Affichage conditionnel (showTips prop). Guide l'utilisateur sur :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><strong>Création :</strong> 2-5 personas max, basés sur données réelles</li>
                  <li><strong>Type :</strong> Primaire (70-80%) vs Secondaire</li>
                  <li><strong>Contenu :</strong> Bio, objectifs, frustrations, citation</li>
                  <li><strong>Liens :</strong> Contacts, besoins, entretiens</li>
                  <li><strong>Bonnes pratiques :</strong> MAJ tous les 6 mois, partage équipe</li>
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📱 Grille de Personas Responsive</p>
                <p className="text-sm text-gray-700 mb-2">
                  Organisation en 3 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile). 
                  Composant PersonaCard avec :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Header :</span> Avatar (emoji), Nom, Badge type (⭐ Primaire / Secondaire)</li>
                  <li><span className="font-medium">Corps :</span> Rôle, Citation tronquée, Badge produit coloré</li>
                  <li><span className="font-medium">Footer :</span> Badges niveau technique + fréquence + 3 boutons (Voir, Modifier, Supprimer)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📄 Pagination</p>
                <p className="text-sm text-gray-700">
                  9 personas par page. Composant Pagination réutilisable avec navigation Précédent/Suivant. 
                  Compteur de résultats affiché en bas.
                </p>
              </div>
            </div>
          </div>

          {/* Filtres et actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">2️⃣ Barre de Filtres et Actions (FilterBar)</h3>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔧 En-tête de la FilterBar (toujours visible)</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">ProductSelector :</span> Filtre par produit actif (topLeftContent)</li>
                  <li><span className="font-medium">Nouveau Persona :</span> Bouton gradient indigo (appelle onAdd)</li>
                  <li><span className="font-medium">Réinitialiser :</span> Visible si hasActiveFilters = true</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔍 Section Filtres (Repliable)</p>
                <p className="text-sm text-gray-700 mb-2">
                  Par défaut repliée (isFiltersExpanded state). Une fois dépliée, affiche :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li><span className="font-medium">Filtre Type :</span> Tous / ⭐ Primaires / 👤 Secondaires</li>
                  <li><span className="font-medium">Filtre Niveau Technique :</span> Tous / Débutant / Intermédiaire / Expert</li>
                </ul>
                <div className="mt-2 bg-white border border-cyan-200 rounded p-2">
                  <p className="text-xs text-gray-700">
                    <span className="font-medium">🔄 Logique filtres :</span> useMemo avec dépendances [personas, filterPrimary, filterProduct, filterTechLevel]. 
                    Sort alphabétique sur name. Reset currentPage à 1 lors du changement de filtre.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🚫 Gestion États Vides</p>
                <p className="text-sm text-gray-700 mb-2">
                  Composant EmptyState avec 3 scénarios distincts :
                </p>
                <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
                  <li><strong>Dépendance manquante :</strong> Vérifie checkModuleDependencies (besoin de produits actifs)</li>
                  <li><strong>Filtres actifs :</strong> Si personas.length &gt; 0 mais filteredPersonas.length === 0</li>
                  <li><strong>État vide normal :</strong> Aucun persona créé, bouton "Créer votre premier persona"</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Formulaire de persona */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">3️⃣ Formulaire de Persona (PersonaForm.jsx)</h3>
            
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mb-4">
              <p className="font-medium text-gray-900 mb-2">📋 Structure générale</p>
              <p className="text-sm text-gray-700 mb-3">
                FormModal plein écran avec 7 sections et validation temps réel via useEffect :
              </p>
              <ol className="text-sm text-gray-600 space-y-2 ml-4 list-decimal">
                <li><strong>📦 Produit associé</strong> - ProductDropdown (obligatoire, fond indigo)</li>
                <li><strong>👤 Identité</strong> - Avatar emoji + Nom + Rôle + Age + Démographie + isPrimary checkbox (obligatoire, fond blue)</li>
                <li><strong>💼 Contexte Professionnel</strong> - Entreprise + Ancienneté + Taille équipe (optionnel, fond indigo)</li>
                <li><strong>❤️ Profil Psychologique</strong> - Goals + Frustrations + Motivations via DynamicList (obligatoire 1+ goals, fond blue)</li>
                <li><strong>📱 Comportements & Usage</strong> - TechLevel + Frequency + Environment + Channels + Devices (optionnel, fond indigo)</li>
                <li><strong>💬 Citation Signature</strong> - Textarea quote (optionnel, fond blue)</li>
                <li><strong>👥 Contacts liés</strong> - MultiSelector linkedContactIds (optionnel, fond indigo)</li>
              </ol>
            </div>

            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🎨 Sélecteur Avatar</p>
                <p className="text-sm text-gray-700 mb-2">
                  15 emojis prédéfinis : ['👤', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🔬', '👩‍🔬', '👨‍🎓', '👩‍🎓', '👨‍⚕️', '👩‍⚕️', '👨‍🏫', '👩‍🏫', '🧑‍💼', '🧑‍💻']
                </p>
                <p className="text-sm text-gray-700">
                  Affichage en grille flex-wrap. Border verte + scale-110 pour sélection active.
                </p>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">📝 DynamicList pour Objectifs/Frustrations/Motivations</p>
                <p className="text-sm text-gray-700 mb-2">
                  Composant réutilisable permettant d'ajouter/supprimer des items dynamiquement :
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Initialisation avec [''] si vide</li>
                  <li>Bouton "+" pour ajouter une ligne</li>
                  <li>Bouton "×" pour supprimer (si plus d'1 item)</li>
                  <li>Validation : goals.filter(g =&gt; g.trim() !== '').length &gt; 0</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">✅ Validation Temps Réel</p>
                <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto mb-2">
                  useEffect(() =&gt; {`{`} /* Valide name, role, productId, goals */ {`}`}, [deps])
                </code>
                <p className="text-sm text-gray-700">
                  errors object : {`{ name: true, role: true, productId: true, goals: 'message' }`}. 
                  Bouton submit désactivé si Object.keys(errors).length &gt; 0.
                </p>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">🔘 Options Multiples (Channels & Devices)</p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Canaux :</strong> ['Email', 'Téléphone', 'Visioconférence', 'Messagerie instantanée', 'Face à face', 'Documentation', 'Tutoriels vidéo']
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Appareils :</strong> ['Ordinateur de bureau', 'Ordinateur portable', 'Tablette', 'Smartphone', 'Terminal mobile']
                </p>
                <p className="text-sm text-gray-700">
                  Grid responsive avec checkboxes. Fonction toggleArrayValue pour ajouter/retirer.
                </p>
              </div>
            </div>
          </div>

          {/* Détail persona */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4️⃣ Détail Persona (PersonaDetail.jsx)</h3>
            
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">👁️ Modale de Visualisation</p>
              <p className="text-sm text-gray-700 mb-3">
                DetailModal avec design sobre standardisé (aligné sur ContactDetail/TeamDetail) :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li><strong>En-tête unifié :</strong> Avatar (12×12) + Nom + Badge type + Badge produit coloré</li>
                <li><strong>10 sections optionnelles :</strong> Affichage conditionnel selon données disponibles</li>
                <li><strong>Typographie uniformisée :</strong> text-sm partout, font-medium pour labels</li>
                <li><strong>Palette réduite :</strong> Alternance bg-cyan-50 / bg-teal-50 + border-*-100</li>
                <li><strong>Sans traits séparation :</strong> Espacement vertical (space-y-6) uniquement</li>
              </ul>
              
              <div className="mt-3 bg-white border border-cyan-200 rounded p-3">
                <p className="text-xs text-gray-900 font-medium mb-1">📊 Sections détaillées</p>
                <p className="text-xs text-gray-700">
                  1. Profil démographique • 2. Citation • 3. Contexte Pro • 4. Objectifs • 5. Frustrations • 
                  6. Motivations • 7. Usage & Compétences • 8. Environnement • 9. Canaux préférés • 10. Appareils
                </p>
              </div>
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
              <li>👤 <span className="font-medium">Limitation personas :</span> 2-5 max par produit (1-2 primaires). Au-delà = dilution du focus</li>
              <li>📊 <span className="font-medium">Données réelles :</span> Basez vos personas sur entretiens et contacts existants, pas sur intuitions</li>
              <li>⭐ <span className="font-medium">Priorisation :</span> Les personas primaires guident TOUTES les décisions produit</li>
              <li>🔗 <span className="font-medium">Traçabilité :</span> Utilisez linkedContactIds pour lier aux vrais utilisateurs sources</li>
              <li>🎯 <span className="font-medium">Objectifs & Frustrations :</span> Les deux drivers principaux - toute feature doit résoudre l'un des deux</li>
              <li>💬 <span className="font-medium">Humanisation :</span> Avatar + citation + contexte = persona vivant et mémorable pour l'équipe</li>
              <li>🔄 <span className="font-medium">Mise à jour :</span> Revisiter tous les 6 mois pour rester aligné avec l'évolution des utilisateurs</li>
              <li>📢 <span className="font-medium">Partage équipe :</span> Toute l'équipe (dev, design, business) doit connaître les personas par cœur</li>
            </ul>
          </div>
        </div>

        {/* Modèle de données */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèle de Données et Stockage</h2>
          
          <div className="space-y-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Structure complète d'un Persona</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Identification (obligatoire)</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                    id: string (UUID)<br/>
                    name: string (requis)<br/>
                    avatar: string (emoji, défaut '👤')<br/>
                    role: string (requis)<br/>
                    productId: string (requis)
                  </code>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Profil démographique (optionnel)</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                    age: string<br/>
                    demographic: string
                  </code>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Contexte professionnel (optionnel)</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                    company: string<br/>
                    seniority: string<br/>
                    teamSize: string
                  </code>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Profil psychologique</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                    goals: string[] (requis, min 1 élément non vide)<br/>
                    frustrations: string[] (optionnel)<br/>
                    motivations: string[] (optionnel)<br/>
                    quote: string (optionnel)
                  </code>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Comportements & Usage (optionnel)</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                    techLevel: 'novice' | 'intermediate' | 'expert' (défaut: 'intermediate')<br/>
                    preferredChannels: string[]<br/>
                    usageFrequency: 'daily' | 'weekly' | 'monthly' | 'occasional' (défaut: 'weekly')<br/>
                    environment: string<br/>
                    devices: string[]
                  </code>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Métadonnées</p>
                  <code className="text-xs bg-white p-2 rounded border border-gray-300 block overflow-x-auto">
                    isPrimary: boolean (défaut: false)<br/>
                    linkedContactIds: string[] (optionnel)<br/>
                    linkedNeedIds: string[] (optionnel, géré par module Besoins)<br/>
                    linkedInterviewIds: string[] (optionnel, géré par module Entretiens)<br/>
                    createdAt: string (ISO date)<br/>
                    updatedAt: string (ISO date)
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">⚙️ Logique métier</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ <span className="font-medium">Validation formulaire :</span> name, role, productId et au moins 1 goal requis</li>
                <li>🧹 <span className="font-medium">Nettoyage données :</span> Arrays filtrés sur g.trim() !== '' avant sauvegarde</li>
                <li>🔍 <span className="font-medium">Filtres combinés :</span> Type (primaire/secondaire) + Produit + Niveau technique</li>
                <li>🗑️ <span className="font-medium">Suppression cascade :</span> Alerte si relations (besoins, stories, contacts, entretiens)</li>
                <li>📊 <span className="font-medium">Sort alphabétique :</span> Liste triée sur name.localeCompare(b.name)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">💾 Stockage Local</h3>
              <p className="text-sm text-gray-700 mb-2">
                Les personas sont sauvegardés localement sous la clé "personas". 
                Sauvegarde automatique via Factory Pattern Storage à chaque opération CRUD.
              </p>
              <div className="bg-white border border-green-200 rounded p-3 mt-3">
                <p className="text-xs text-gray-900 font-medium mb-1">🔧 Hooks disponibles (usePersonas.js)</p>
                <code className="text-xs text-gray-700">
                  addPersona(data), updatePersona(id, updates), deletePersona(id), 
                  importPersonas(array), refreshPersonas()
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Intégration avec les autres modules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intégration avec les autres modules</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📦 Module Produits</h3>
              <p className="text-sm text-gray-700 mb-2">
                Chaque persona est obligatoirement lié à UN produit actif via productId. 
                Le ProductSelector/ProductDropdown filtre automatiquement les produits actifs (status === 'active').
              </p>
              <div className="bg-white border border-cyan-200 rounded p-2 mt-2">
                <p className="text-xs text-gray-700">
                  <span className="font-medium">🔗 Relation :</span> productId (1:N) - Un produit peut avoir plusieurs personas
                </p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 Module Contacts</h3>
              <p className="text-sm text-gray-700 mb-2">
                linkedContactIds[] : Liste des contacts réels qui ont inspiré ce persona. 
                Permet la traçabilité entre profils fictionnels et utilisateurs réels.
              </p>
              <div className="bg-white border border-teal-200 rounded p-2 mt-2">
                <p className="text-xs text-gray-700">
                  <span className="font-medium">🔗 Relation :</span> linkedContactIds[] (N:M) - MultiSelector dans le formulaire
                </p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎯 Module Besoins Utilisateurs</h3>
              <p className="text-sm text-gray-700 mb-2">
                Chaque besoin peut être lié à un ou plusieurs personas via personaIds[]. 
                Permet de filtrer les besoins par persona et prioriser selon les personas primaires.
              </p>
              <div className="bg-white border border-cyan-200 rounded p-2 mt-2">
                <p className="text-xs text-gray-700">
                  <span className="font-medium">🔗 Relation :</span> personaIds[] dans UserNeed (N:M) - Le persona ne stocke pas directement les needIds
                </p>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📖 Module User Stories</h3>
              <p className="text-sm text-gray-700 mb-2">
                Chaque user story est liée à UN persona principal via personaId. 
                Format "En tant que [persona.name], je veux [feature] afin de [benefit]".
              </p>
              <div className="bg-white border border-teal-200 rounded p-2 mt-2">
                <p className="text-xs text-gray-700">
                  <span className="font-medium">🔗 Relation :</span> personaId (N:1) - Une story = 1 persona, un persona peut avoir N stories
                </p>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎤 Module Entretiens</h3>
              <p className="text-sm text-gray-700 mb-2">
                linkedInterviewIds[] : Liste des entretiens sources ayant contribué à la création de ce persona. 
                Traçabilité complète depuis les données brutes jusqu'au persona synthétique.
              </p>
              <div className="bg-white border border-cyan-200 rounded p-2 mt-2">
                <p className="text-xs text-gray-700">
                  <span className="font-medium">🔗 Relation :</span> linkedInterviewIds[] (N:M) - Géré depuis le module Entretiens
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Composants UI réutilisables */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Composants UI Réutilisables</h2>
          
          <div className="space-y-3">
            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">🎴 PersonaCard</h3>
              <p className="text-sm text-gray-700 mb-2">
                Carte persona affichée dans la grille. Structure standardisée :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Header : Avatar + Nom + Badge type (⭐/👤)</li>
                <li>Corps : Rôle + Citation tronquée + Badge produit</li>
                <li>Footer : 2 badges (tech + freq) + 3 boutons actions</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">📝 DynamicList</h3>
              <p className="text-sm text-gray-700 mb-2">
                Composant générique pour gérer des listes dynamiques (objectifs, frustrations, motivations) :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Props : items[], onChange, placeholder, addButtonLabel, required</li>
                <li>Fonctionnalités : Ajout/Suppression d'items, validation, auto-focus</li>
              </ul>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👥 MultiSelector</h3>
              <p className="text-sm text-gray-700 mb-2">
                Sélecteur multi-items générique pour linkedContactIds :
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Props : items[], selectedIds[], onChange, searchable, getItemLabel</li>
                <li>Features : Recherche, sélection multiple, affichage badges</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">👁️ PersonaDetail</h3>
              <p className="text-sm text-gray-700">
                DetailModal standardisée avec 10 sections conditionnelles. 
                Design sobre aligné sur ContactDetail/TeamDetail. 
                Typographie text-sm, palette cyan-50/teal-50, sans traits séparation.
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

export default PersonasDetailPage;
