/**
 * 🎨 Exports du système d'icônes
 * Point d'entrée unique pour tous les imports liés aux icônes
 */

// Composants
export { default as Icon } from './Icon';
export {
  ModuleIcon,
  ActionIcon,
  StatusIcon,
  SectionIcon,
  QuickIcon,
  LucideIcon
} from './IconComponents';

// Mappings d'icônes
export {
  moduleIcons,
  sectionIcons,
  actionIcons,
  statusIcons,
  metricIcons,
  userIcons,
  systemIcons,
  contentIcons,
  scrumIcons,
  featureIcons,
  lucideToEmojiMapping
} from './index';

// Fonctions utilitaires
export {
  getModuleIcon,
  getActionIcon,
  getStatusIcon,
  getSectionIcon,
  convertLucideToEmoji
} from './index';

// Export par défaut
export { default } from './index';
