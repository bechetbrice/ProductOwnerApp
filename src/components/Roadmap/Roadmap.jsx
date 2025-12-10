/**
 * Roadmap - Feuille de route de ProductOwnerApp
 * 
 * Page dédiée aux utilisateurs présentant :
 * - La vision et l'évolution de l'application
 * - Les fonctionnalités actuelles et à venir
 * - Les phases de développement et leurs priorités
 * - L'état d'avancement du projet
 * 
 * Format pédagogique sans onglets, optimisé pour la lecture
 */

import { useState } from 'react';
import { 
  Rocket,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Target,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  Calendar,
  Star,
  Package,
  Shield,
  Globe,
  BarChart3,
  Lightbulb,
  Code2,
  Layers,
  Activity,
  FileText,
  Share2,
  Download,
  Database,
  Smartphone
} from 'lucide-react';

const Roadmap = () => {
  const [expandedPhase, setExpandedPhase] = useState('phase1');

  // Statistiques du projet
  const projectStats = {
    modulesCompleted: 26,
    totalModules: 26,
    components: '30+',
    hooks: '11',
    pwa: '100% PWA',
    offline: '100% Offline',
    responsive: '100% Responsive'
  };

  // Phases de développement
  const phases = [
    {
      id: 'phase1',
      name: 'Phase 1 - Consolidation & Qualité',
      period: 'Août-Déc 2025',
      status: 'in-progress',
      priority: 'critical',
      description: 'Stabilisation et harmonisation de l\'existant pour garantir une expérience utilisateur cohérente et professionnelle.',
      items: [
        {
          name: 'Harmonisation visuelle complète',
          description: 'Audit et standardisation des 26 modules avec guide de style unifié et composants UI réutilisables',
          status: 'completed',
          icon: Layers
        },
        {
          name: 'Refactoring technique majeur',
          description: 'Extraction des composants réutilisables, Factory Pattern Storage, optimisation des performances (-75% de code dupliqué)',
          status: 'completed',
          icon: Code2
        },
        {
          name: 'Tests & validation',
          description: 'Suite de tests automatisés et validation de l\'accessibilité (WCAG 2.1)',
          status: 'in-progress',
          icon: CheckCircle2
        }
      ]
    },
    {
      id: 'phase2',
      name: 'Phase 2 - Nouvelles Fonctionnalités',
      period: 'Jan-Mar 2026',
      status: 'planned',
      priority: 'high',
      description: 'Enrichissement de l\'expérience avec de nouveaux modules essentiels pour optimiser votre gestion produit Scrum/Agile.',
      items: [
        {
          name: 'Module Export & Reporting',
          description: 'Export professionnel en PDF, Excel et CSV avec templates personnalisables pour backlog, sprints et rapports',
          status: 'planned',
          icon: Download
        },
        {
          name: 'Module Dashboard Analytics Avancé',
          description: 'Graphiques interactifs (vélocité, burn-down/up, cycle time) et métriques de performance d\'équipe',
          status: 'planned',
          icon: BarChart3
        },
        {
          name: 'Intégration IA (BYOAI - Bring Your Own AI)',
          description: 'Générateur de prompts optimisés pour ChatGPT, Claude et Gemini : génération user stories, critères d\'acceptation, documentation',
          status: 'planned',
          icon: Sparkles
        },
        {
          name: 'Module Import de données',
          description: 'Import depuis Jira, Trello, Excel pour faciliter la migration et l\'intégration avec vos outils existants',
          status: 'planned',
          icon: Package
        }
      ]
    },
    {
      id: 'phase3',
      name: 'Phase 3 - Optimisation & Scalabilité',
      period: 'Avr-Juin 2026',
      status: 'planned',
      priority: 'medium',
      description: 'Préparation pour le grand public avec migration vers une base de données locale performante.',
      items: [
        {
          name: 'Migration base de données locale',
          description: 'Passage à IndexedDB ou SQLite pour gérer de gros volumes de données (1000+ stories, 100+ sprints)',
          status: 'planned',
          icon: Database
        },
        {
          name: 'PWA avancée',
          description: 'Application installable avec fonctionnalités natives, synchronisation multi-appareils via fichiers locaux chiffrés et mode offline optimisé',
          status: 'planned',
          icon: Smartphone
        },
        {
          name: 'Optimisations performances',
          description: 'Virtual scrolling, lazy loading, code splitting pour supporter des projets de grande envergure',
          status: 'planned',
          icon: Zap
        }
      ]
    }
  ];

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const getStatusBadge = (status) => {
    const configs = {
      'in-progress': {
        label: 'En cours',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: Clock
      },
      'planned': {
        label: 'Planifié',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Calendar
      },
      'completed': {
        label: 'Terminé',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle2
      },
      'future': {
        label: 'Futur',
        color: 'bg-gray-100 text-gray-600 border-gray-200',
        icon: Sparkles
      }
    };

    const config = configs[status] || configs.planned;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const configs = {
      'critical': { label: '🔴 Critique', color: 'text-red-600' },
      'high': { label: '🟠 Haute', color: 'text-orange-600' },
      'medium': { label: '🟡 Moyenne', color: 'text-yellow-600' },
      'low': { label: '🟢 Basse', color: 'text-green-600' }
    };

    const config = configs[priority] || configs.medium;

    return (
      <span className={`text-sm font-semibold ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 max-w-7xl mx-auto">
        {/* Statistiques du projet */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">État Actuel du Projet</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {projectStats.modulesCompleted}/{projectStats.totalModules}
              </div>
              <div className="text-xs text-gray-600">Modules</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {projectStats.components}
              </div>
              <div className="text-xs text-gray-600">Composants</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                {projectStats.hooks}
              </div>
              <div className="text-xs text-gray-600">Hooks</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {projectStats.pwa}
              </div>
              <div className="text-xs text-gray-600">Progressive</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {projectStats.offline}
              </div>
              <div className="text-xs text-gray-600">Souverain</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
              <div className="text-2xl font-bold text-teal-600 mb-1">
                {projectStats.responsive}
              </div>
              <div className="text-xs text-gray-600">Adaptable</div>
            </div>
          </div>

          {/* Barre de progression globale */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progression globale</span>
              <span className="text-sm font-bold text-blue-600">Phase 1 - Consolidation en cours ⚡</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 transition-all duration-500"
                style={{ width: '40%' }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 text-right">
              Phase 1 : 40% • 4 mois / 11 mois (août 2025 - juin 2026)
            </div>
          </div>
        </div>

        {/* Message de vision */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm flex-shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Notre Vision</h3>
              <p className="text-blue-50 leading-relaxed">
                ProductOwnerApp est déjà un outil avec <strong>26 modules complets</strong> et une architecture solide. 
                Notre roadmap vise à <strong>enrichir l'expérience</strong> tout en respectant nos valeurs : 
                <strong> souveraineté</strong> (100% offline), <strong>qualité</strong> (code maintenable), 
                et <strong>accessibilité</strong> (outil gratuit et performant). 
                L'avenir apporte l'IA, les exports professionnels et une scalabilité optimale.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline des phases */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Phases de Développement</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Notre approche progressive et réaliste sur 11 mois (août 2025 - juin 2026), avec priorité à la <strong>consolidation</strong> avant l'innovation.
          </p>
        </div>

        {/* Phases */}
        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      {phase.name}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-sm text-gray-500 flex items-center gap-1.5">
                      <Calendar size={14} />
                      {phase.period}
                    </span>
                    {getStatusBadge(phase.status)}
                    {getPriorityBadge(phase.priority)}
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                <div className="ml-4 flex-shrink-0">
                  {expandedPhase === phase.id ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Phase Content */}
              {expandedPhase === phase.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4 space-y-3">
                    {phase.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon || Target;
                      
                      return (
                        <div
                          key={itemIndex}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                            <ItemIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">
                                {item.name}
                              </h4>
                              {getStatusBadge(item.status)}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer avec message d'encouragement */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Cette roadmap est <strong>évolutive</strong> et s'adaptera aux retours utilisateurs. 
            Merci de faire partie de l'aventure ProductOwnerApp ! 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
