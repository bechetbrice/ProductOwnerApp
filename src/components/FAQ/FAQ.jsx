import { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Rocket,
  LayoutGrid,
  Compass,
  FileText,
  Zap,
  TrendingUp,
  Settings as SettingsIcon,
  Kanban,
  Euro,
  Cpu,
  Shield
} from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      category: 'Démarrage',
      icon: Rocket,
      color: 'emerald',
      questions: [
        {
          q: 'Comment commencer avec ProductOwnerApp ?',
          a: 'Commencez par créer un produit dans la section "Produits", puis définissez vos objectifs produit. Vous pourrez ensuite ajouter des contacts, mener des entretiens et créer des besoins utilisateurs. Vous pouvez également charger les données exemple via le menu Import/Export dans le header pour découvrir l\'application avec un projet e-commerce complet.'
        },
        {
          q: 'Comment charger les données exemple ?',
          a: 'Cliquez sur le menu "Import / Export" dans le header, puis sélectionnez "Charger données exemple". Cela importera un projet e-commerce fictif complet avec 2 produits, 4 contacts, 2 équipes, 6 user stories, 2 sprints et des entretiens utilisateurs. Ces données vous permettent de découvrir toutes les fonctionnalités de l\'application sans partir de zéro. Note : vos données actuelles seront remplacées, pensez à exporter avant si nécessaire.'
        },
        {
          q: 'Où sont stockées mes données ?',
          a: 'Toutes vos données sont stockées localement dans le navigateur (LocalStorage). Aucune donnée n\'est envoyée sur un serveur distant. Pensez à exporter régulièrement vos données via le menu Paramétrage.'
        },
        {
          q: 'L\'application fonctionne-t-elle hors ligne ?',
          a: 'Oui ! ProductOwnerApp est 100% offline-first. Une fois chargée, l\'application fonctionne sans connexion Internet. Vos données restent toujours accessibles localement.'
        },
        {
          q: 'Comment fonctionne le système de stockage ?',
          a: 'Toutes vos données sont stockées localement dans le navigateur via localStorage, sans serveur distant. Le système utilise un Factory Pattern qui génère automatiquement des IDs uniques (format timestamp_random). Les données incluent automatiquement createdAt et updatedAt à chaque modification. Le quota localStorage est d\'environ 5-10MB selon les navigateurs.'
        },
        {
          q: 'Puis-je perdre mes données ?',
          a: 'Oui, vos données peuvent être perdues si vous videz le cache du navigateur ou désinstallez l\'application. C\'est pourquoi l\'export régulier est crucial. Pensez à activer l\'auto-export dans Paramètres > Général > Export automatique pour sauvegarder automatiquement vos données.'
        }
      ]
    },
    {
      category: 'Organisation',
      icon: LayoutGrid,
      color: 'cyan',
      questions: [
        {
          q: 'Quelle est la différence entre Contacts et Équipes ?',
          a: 'Les Contacts sont les personnes avec qui vous interagissez (clients, utilisateurs, stakeholders, développeurs). Les Équipes représentent des groupes de contacts organisés en Squads (équipes produit), Chapters (communautés de pratique) ou Projets temporaires qui travaillent sur les sprints.'
        },
        {
          q: 'Comment organiser mes produits ?',
          a: 'Chaque produit peut avoir un code couleur. Utilisez les objectifs produit pour définir la stratégie, puis liez les besoins utilisateurs et stories à ces objectifs.'
        },
        {
          q: 'Puis-je gérer plusieurs produits en parallèle ?',
          a: 'Absolument ! ProductOwnerApp supporte la gestion multi-produits. Vous pouvez créer autant de produits que nécessaire et les filtrer dans la plupart des vues.'
        },
        {
          q: 'Comment fonctionnent les types de contacts ?',
          a: 'Les contacts sont classés en 3 types : Interne (employés, équipe), Externe (fournisseurs, partenaires), Client (utilisateurs finaux). Chaque type détermine les contrats disponibles : les internes ont accès aux CDI, temps partiel, stagiaires et alternants ; les externes aux statuts freelance, prestataire, agence et consultant.'
        },
        {
          q: 'Comment calculer la capacité d\'une équipe ?',
          a: 'La capacité d\'équipe se calcule automatiquement : (disponibilité × niveau expérience × taux présence) / 100 pour chaque membre. L\'application agrège ensuite ces capacités individuelles. Utilisez les champs "Disponibilité" (0-100%), "Niveau" (junior/confirmé/senior) et notez les absences prévues dans le module Équipes.'
        }
      ]
    },
    {
      category: 'Recherche Utilisateur',
      icon: Compass,
      color: 'teal',
      questions: [
        {
          q: 'Comment préparer un entretien utilisateur ?',
          a: 'Dans la section Entretiens, créez un nouvel entretien en sélectionnant le type (Découverte, Validation, Feedback, Research). Renseignez les informations pratiques (participants, date, durée, lieu) puis préparez vos questions en ajoutant des sections personnalisées. Les questions sont entièrement libres et doivent être rédigées manuellement selon vos besoins.'
        },
        {
          q: 'Comment documenter un entretien réalisé ?',
          a: 'Après avoir mené l\'entretien, ouvrez-le dans l\'application et utilisez l\'onglet "Mener l\'entretien" pour remplir les réponses aux questions préparées. Ajoutez vos notes et observations dans la section "Notes générales". Pensez à marquer le statut comme "Terminé" une fois complété.'
        },
        {
          q: 'Comment créer un besoin utilisateur depuis un entretien ?',
          a: 'Lors de la création d\'un besoin utilisateur, vous pouvez sélectionner l\'entretien source dans le champ "Source de l\'entretien". Cela permet de tracer l\'origine du besoin et de conserver le lien avec la recherche utilisateur qui l\'a identifié.'
        },
        {
          q: 'Comment gérer les personas ?',
          a: 'Les personas représentent vos utilisateurs cibles. Créez-les dans la section Personas avec leurs objectifs, frustrations et comportements. Vous pouvez ensuite lier des besoins utilisateurs à chaque persona pour mieux cibler vos développements.'
        }
      ]
    },
    {
      category: 'Backlog & Priorisation',
      icon: FileText,
      color: 'emerald',
      questions: [
        {
          q: 'Quelle méthode de priorisation utiliser ?',
          a: 'ProductOwnerApp propose 3 méthodes : MoSCoW (Must/Should/Could/Won\'t), RICE (Reach × Impact × Confidence / Effort), et ICE (Impact + Confidence + Ease / 3). Choisissez selon votre contexte.'
        },
        {
          q: 'Comment estimer mes stories ?',
          a: 'Utilisez le module Planning Poker pour estimer en équipe. Sélectionnez les besoins à estimer, invitez les participants, et lancez des votes avec la suite de Fibonacci.'
        },
        {
          q: 'Quelle est la différence entre Besoins Utilisateurs et User Stories ?',
          a: 'Les Besoins Utilisateurs sont issus de la recherche (entretiens, observations). Les User Stories sont des éléments du backlog prêts à être développés. Un besoin peut générer plusieurs stories.'
        },
        {
          q: 'Comment utiliser la matrice de priorisation ?',
          a: 'La Matrice Importance × Effort classe automatiquement vos besoins en 4 quadrants : Quick Wins (haute importance, faible effort), Big Bets, Time Sinks, et Fill-ins. Des suggestions vous aident à décider.'
        },
        {
          q: 'Comment fonctionne le calcul RICE ?',
          a: 'RICE = (Reach × Impact × Confidence) / Effort. Chaque critère utilise une échelle prédéfinie : Reach et Impact (1-10), Confidence (1-5), Effort (1-10). Le score final s\'affiche automatiquement et permet de classer objectivement vos besoins. Un score RICE > 50 indique généralement une priorité élevée.'
        },
        {
          q: 'Quelle est la différence entre RICE et ICE ?',
          a: 'RICE considère 4 facteurs (Reach, Impact, Confidence, Effort) pour une évaluation complète. ICE simplifie avec 3 facteurs (Impact, Confidence, Ease) en moyenne arithmétique. RICE convient aux backlogs complexes nécessitant une mesure de portée. ICE est plus rapide pour des estimations rapides.'
        },
        {
          q: 'Peut-on changer la priorité MoSCoW d\'une story planifiée ?',
          a: 'Oui, mais avec prudence. Une story "Must" planifiée dans un sprint engage l\'équipe. Changez la priorité avant le Sprint Planning si possible, ou documentez le changement en Rétrospective si c\'est durant le sprint. Les statistiques MoSCoW se recalculent automatiquement.'
        }
      ]
    },
    {
      category: 'Sprints',
      icon: Zap,
      color: 'yellow',
      questions: [
        {
          q: 'Comment planifier un sprint ?',
          a: 'Dans Gestion Sprints, créez un sprint avec dates et capacité. Assignez les stories planifiées. Utilisez le Sprint Board pendant le sprint pour suivre l\'avancement.'
        },
        {
          q: 'Quelle est la différence entre Sprint Board et Task Board ?',
          a: 'Le Sprint Board affiche les User Stories du sprint actif (colonnes Planned/In Progress/Done). Le Task Board décompose ces stories en tâches techniques plus granulaires.'
        },
        {
          q: 'Comment gérer les tâches techniques ?',
          a: 'Dans le Task Board, créez des tâches liées aux stories. Estimez-les en heures, assignez-les aux membres d\'équipe, et suivez le statut (Planned/In Progress/Done).'
        },
        {
          q: 'Comment clôturer un sprint ?',
          a: 'Assurez-vous que toutes les stories sont marquées Done ou renvoyées au backlog. Créez une Sprint Review pour documenter ce qui a été livré, puis une Rétrospective pour identifier les améliorations.'
        },
        {
          q: 'Comment activer un sprint ?',
          a: 'Un seul sprint peut être actif à la fois. Pour activer un sprint, il doit avoir le statut "Planifié". Cliquez sur "Activer le sprint" dans la fiche détail. Le sprint passe alors en statut "En cours". Les sprints précédents actifs sont automatiquement marqués "Terminé".'
        },
        {
          q: 'Quelle est la différence entre statuts de sprint et statuts de story ?',
          a: 'Statuts Sprint : Planifié → En cours → Terminé/Annulé (cycle de vie du sprint entier). Statuts Story : Non statué → Planifié → En cours → Terminé (progression individuelle de chaque story dans le sprint).'
        },
        {
          q: 'Que se passe-t-il si je supprime un sprint ?',
          a: 'Lorsque vous supprimez un sprint, les User Stories associées passent automatiquement en statut "Non statué" et retournent au backlog. Les tâches techniques liées à ces stories sont également dissociées du sprint. Les données de Sprint Reviews et Rétrospectives liées restent archivées pour historique.'
        },
        {
          q: 'Comment gérer les stories non terminées en fin de sprint ?',
          a: 'Les stories "En cours" ou "Planifiées" doivent être réévaluées. Vous pouvez : (1) les marquer "Terminé" si elles le sont réellement, (2) les dissocier du sprint pour les renvoyer au backlog (elles passent en "Non statué"), ou (3) les transférer au sprint suivant si vous l\'avez déjà créé.'
        },
        {
          q: 'Que signifie un buffer technique de 20% ?',
          a: 'Le buffer technique est une marge de sécurité recommandée lors du Sprint Planning. Si votre équipe a 100 points de capacité, planifiez seulement 80 points de stories. Ces 20% absorbent les imprévus (bugs, clarifications, réunions). L\'application calcule automatiquement le buffer et alerte si vous dépassez 100% de la capacité.'
        }
      ]
    },
    {
      category: 'Boards & Daily',
      icon: Kanban,
      color: 'orange',
      questions: [
        {
          q: 'Quelle est la différence entre Sprint Board et Task Board ?',
          a: 'Le Sprint Board affiche les User Stories du sprint actif en 3 colonnes : À faire / En cours / Terminé. Drag & drop HTML5 natif pour changer les statuts. Le Task Board affiche les Tâches techniques (code, tests, review, déploiement) avec estimation en heures. Il permet de décomposer finement chaque story.'
        },
        {
          q: 'Comment fonctionne le drag & drop ?',
          a: 'Le glisser-déposer utilise l\'API HTML5 DragEvent native (pas de bibliothèque externe). Saisissez une carte par son en-tête, glissez-la vers une autre colonne, et relâchez. Le statut se met à jour automatiquement. Compatible desktop uniquement (les mobiles nécessitent des boutons).'
        },
        {
          q: 'Qu\'est-ce qu\'un outcome ?',
          a: 'Un outcome (résultat) documente ce qui a réellement été livré pour une story ou tâche. C\'est un texte libre que vous ajoutez après avoir marqué l\'item "Terminé". Les outcomes alimentent les Sprint Reviews pour montrer la valeur livrée aux stakeholders.'
        }
      ]
    },
    {
      category: 'Budget',
      icon: Euro,
      color: 'emerald',
      questions: [
        {
          q: 'Comment fonctionne le module Budget ?',
          a: 'Le module Budget permet de suivre vos dépenses par catégorie : Développement, RH, Infrastructure, Licences, Prestataires externes, Marketing. Chaque ligne budgétaire peut être associée à un produit et une période (Sprint, Mensuel, Trimestriel, Annuel). Suivez le budget prévu vs consommé vs attendu. Note : le calcul automatique du budget RH depuis les contacts n\'est pas encore implémenté.'
        }
      ]
    },
    {
      category: 'Analyse & Retrospective',
      icon: TrendingUp,
      color: 'cyan',
      questions: [
        {
          q: 'Comment analyser la vélocité de mon équipe ?',
          a: 'Sprint Analytics affiche le Burndown Chart (avancement sprint) et le Velocity Chart (comparaison vélocité sur plusieurs sprints). Utilisez ces métriques pour ajuster la capacité.'
        },
        {
          q: 'À quoi sert la Timeline Roadmap ?',
          a: 'Elle offre une vue chronologique de tous vos sprints passés et futurs, avec les stories associées. Idéal pour visualiser la progression du produit sur le long terme.'
        },
        {
          q: 'Quels sont les graphiques disponibles ?',
          a: 'Sprint Analytics propose 8 graphiques : Distribution Stories, Burndown Chart, Cumulative Flow Diagram, Burnup Chart, Distribution Priorité, Cycle Time, Sprint Health Score, et Vélocité Historique.'
        }
      ]
    },
    {
      category: 'Technique & Performances',
      icon: Cpu,
      color: 'cyan',
      questions: [
        {
          q: 'Combien de données puis-je stocker ?',
          a: 'La limite localStorage est d\'environ 5-10 MB selon les navigateurs. Pour un projet moyen (100 stories, 20 sprints, 50 contacts), comptez environ 1-2 MB. Si vous atteignez la limite, un message d\'erreur QuotaExceededError s\'affichera. Solution : exportez et archivez les vieux sprints, ou envisagez une base de données externe.'
        },
        {
          q: 'L\'application ralentit avec beaucoup de données, que faire ?',
          a: 'Plusieurs optimisations sont en place : React.memo sur les cartes (réduit les re-renders de 60-80%), Factory Pattern storage, Context API mémoïsé. Si vous avez 500+ stories, envisagez d\'archiver les sprints anciens. Les futures versions incluront le lazy loading des composants et la pagination côté client.'
        },
        {
          q: 'Comment fonctionne l\'auto-export ?',
          a: 'Activez l\'auto-export dans Paramètres > Général > Export automatique. L\'application exporte automatiquement toutes vos données en JSON selon l\'intervalle configuré (5-120 minutes) si des modifications sont détectées. Le fichier inclut un timestamp : productownerapp_auto_YYYY-MM-DD_HH-MM-SS.json. Limite : 50 exports maximum par jour.'
        }
      ]
    },
    {
      category: 'Confidentialité',
      icon: Shield,
      color: 'teal',
      questions: [
        {
          q: 'Mes données sont-elles partagées ou synchronisées avec un serveur ?',
          a: 'Non. ProductOwnerApp est 100% offline et ne communique avec aucun serveur. Aucune télémétrie, aucun tracking, aucun cloud. Vos données restent exclusivement sur votre appareil. Pour synchroniser entre appareils, utilisez l\'export/import manuel JSON.'
        }
      ]
    },
    {
      category: 'Paramétrage',
      icon: SettingsIcon,
      color: 'gray',
      questions: [
        {
          q: 'Comment exporter mes données ?',
          a: 'Cliquez sur le menu Import/Export dans le header, puis "Exporter CSV" ou "Sauvegarder sous... (JSON)". Un fichier sera téléchargé avec toutes vos données. Conservez-le en backup sécurisé.'
        },
        {
          q: 'Comment synchroniser entre plusieurs appareils ?',
          a: 'Exportez vos données depuis l\'appareil 1 (format JSON), puis importez-les sur l\'appareil 2 via le menu Import/Export > "Ouvrir un fichier...". Attention : l\'import écrase les données existantes.'
        },
        {
          q: 'Comment personnaliser les listes déroulantes ?',
          a: 'Dans Paramètres > Listes Personnalisées, gérez les rôles, entreprises et départements. Ces référentiels sont utilisés dans les Contacts et autres modules.'
        }
      ]
    }
  ];

  const filteredFaq = faqData
    .map(category => ({
      ...category,
      questions: category.questions.filter(
        item =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.questions.length > 0);

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 max-w-6xl mx-auto">
        {/* Barre de recherche */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Sections de questions */}
        <div className="space-y-4 sm:space-y-6">
          {filteredFaq.map((category, categoryIndex) => {
            const Icon = category.icon;
            
            return (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                {/* En-tête de section */}
                <div className={`px-4 sm:px-6 py-3 sm:py-4 bg-${category.color}-50 dark:bg-${category.color}-900/20 border-b border-${category.color}-100 dark:border-${category.color}-800 rounded-t-lg`}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon className={`text-${category.color}-600 dark:text-${category.color}-400 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0`} />
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 truncate flex-1 min-w-0">
                      {category.category}
                    </h2>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-auto">
                      {category.questions.length} question{category.questions.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.questions.map((item, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openIndex === key;
                    
                    return (
                      <div key={questionIndex}>
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-start justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <span className="font-medium text-gray-800 dark:text-gray-100 pr-3 sm:pr-4 text-sm sm:text-base leading-relaxed">
                            {item.q}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <ChevronDown className="text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message si aucun résultat */}
        {filteredFaq.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <HelpCircle className="mx-auto text-gray-400 dark:text-gray-600 mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12" />
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Aucune question ne correspond à votre recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
