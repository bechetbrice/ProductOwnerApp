import Icon from './Icon';

/**
 * 📦 ModuleIcon
 * Icône pour les modules de l'application
 * 
 * @example
 * <ModuleIcon name="dashboard" size="lg" />
 */
export const ModuleIcon = ({ name, ...props }) => (
  <Icon type="module" name={name} {...props} />
);

/**
 * 🎯 ActionIcon
 * Icône pour les actions (boutons, liens)
 * 
 * @example
 * <ActionIcon name="add" size="sm" onClick={handleAdd} />
 */
export const ActionIcon = ({ name, ...props }) => (
  <Icon type="action" name={name} {...props} />
);

/**
 * 🟢 StatusIcon
 * Icône pour les statuts et états
 * 
 * @example
 * <StatusIcon name="active" size="xs" />
 */
export const StatusIcon = ({ name, ...props }) => (
  <Icon type="status" name={name} {...props} />
);

/**
 * 🏷️ SectionIcon
 * Icône pour les sections de navigation
 * 
 * @example
 * <SectionIcon name="overview" size="md" />
 */
export const SectionIcon = ({ name, ...props }) => (
  <Icon type="section" name={name} {...props} />
);

/**
 * ⚡ QuickIcon
 * Composant pour afficher rapidement un emoji
 * 
 * @example
 * <QuickIcon emoji="🎉" size="2xl" />
 */
export const QuickIcon = ({ emoji, ...props }) => (
  <Icon emoji={emoji} {...props} />
);

/**
 * 🔄 LucideIcon (pour migration)
 * Composant temporaire pour faciliter la migration depuis Lucide
 * 
 * @example
 * <LucideIcon name="Home" size="md" />
 */
export const LucideIcon = ({ name, ...props }) => (
  <Icon lucide={name} {...props} />
);

export default {
  ModuleIcon,
  ActionIcon,
  StatusIcon,
  SectionIcon,
  QuickIcon,
  LucideIcon
};
