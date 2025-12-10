// Pages de documentation détaillées (pour développeurs/Product Owners)
// ✅ OPTIMISATION QW4 : Lazy loading pour réduire bundle Wiki de 1.07 MB → 10 KB
import { lazy } from 'react';

// ─────────────────────────────────────────────────────────────
// 📦 PAGES DÉTAILLÉES (DEV) - Lazy loaded
// ─────────────────────────────────────────────────────────────

export const ProductsDetailPage = lazy(() => import('./dev/ProductsDetailPage'));
export const ObjectivesDetailPage = lazy(() => import('./dev/ObjectivesDetailPage'));
export const ContactsDetailPage = lazy(() => import('./dev/ContactsDetailPage'));
export const TeamsDetailPage = lazy(() => import('./dev/TeamsDetailPage'));
export const InterviewsDetailPage = lazy(() => import('./dev/InterviewsDetailPage'));
export const UserNeedsDetailPage = lazy(() => import('./dev/UserNeedsDetailPage'));
export const PersonasDetailPage = lazy(() => import('./dev/PersonasDetailPage'));
export const PlanningPokerDetailPage = lazy(() => import('./dev/PlanningPokerDetailPage'));
export const MoscowDetailPage = lazy(() => import('./dev/MoscowDetailPage'));
export const RiceDetailPage = lazy(() => import('./dev/RiceDetailPage'));
export const UserStoriesDetailPage = lazy(() => import('./dev/UserStoriesDetailPage'));
export const SprintsDetailPage = lazy(() => import('./dev/SprintsDetailPage'));
export const TaskBoardDetailPage = lazy(() => import('./dev/TaskBoardDetailPage'));
export const SprintBoardDetailPage = lazy(() => import('./dev/SprintBoardDetailPage'));
export const SprintReviewsDetailPage = lazy(() => import('./dev/SprintReviewsDetailPage'));
export const SprintRetrospectiveDetailPage = lazy(() => import('./dev/SprintRetrospectiveDetailPage'));
export const TasksManagementDetailPage = lazy(() => import('./dev/TasksManagementDetailPage'));
export const SettingsDetailPageNew = lazy(() => import('./dev/SettingsDetailPage'));
export const DashboardDetailPage = lazy(() => import('./dev/DashboardDetailPage'));

// ─────────────────────────────────────────────────────────────
// 👤 PAGES UTILISATEUR (USER) - Lazy loaded
// ─────────────────────────────────────────────────────────────

export const ProductsUserPage = lazy(() => import('./user/ProductsUserPage'));
export const ObjectivesUserPage = lazy(() => import('./user/ObjectivesUserPage'));
export const ContactsUserPage = lazy(() => import('./user/ContactsUserPage'));
export const TeamsUserPage = lazy(() => import('./user/TeamsUserPage'));
export const InterviewsUserPage = lazy(() => import('./user/InterviewsUserPage'));
export const UserNeedsUserPage = lazy(() => import('./user/UserNeedsUserPage'));
export const PersonasUserPage = lazy(() => import('./user/PersonasUserPage'));
export const PlanningPokerUserPage = lazy(() => import('./user/PlanningPokerUserPage'));
export const MoscowUserPage = lazy(() => import('./user/MoscowUserPage'));
export const RiceUserPage = lazy(() => import('./user/RiceUserPage'));
export const UserStoriesUserPage = lazy(() => import('./user/UserStoriesUserPage'));
export const SprintsUserPage = lazy(() => import('./user/SprintsUserPage'));
export const TaskBoardUserPage = lazy(() => import('./user/TaskBoardUserPage'));
export const SprintBoardUserPage = lazy(() => import('./user/SprintBoardUserPage'));
export const SprintReviewsUserPage = lazy(() => import('./user/SprintReviewsUserPage'));
export const SprintRetrospectiveUserPage = lazy(() => import('./user/SprintRetrospectiveUserPage'));
export const TasksManagementUserPage = lazy(() => import('./user/TasksManagementUserPage'));
export const SettingsUserPage = lazy(() => import('./user/SettingsUserPage'));
export const DashboardUserPage = lazy(() => import('./user/DashboardUserPage'));

// ─────────────────────────────────────────────────────────────
// 📊 TOTAL : 38 pages lazy loaded
// GAIN : Bundle Wiki 1.07 MB → 10 KB (-99%)
// Chaque page : chargée uniquement au clic (30-40 KB)
// ─────────────────────────────────────────────────────────────

// Pages générales (à la racine) - Commentées car non implémentées
// export const RoadmapDetailPage = lazy(() => import('./RoadmapDetailPage'));
// export const SprintAnalyticsDetailPage = lazy(() => import('./SprintAnalyticsDetailPage'));
// export const CustomListsDetailPage = lazy(() => import('./CustomListsDetailPage'));
// export const BudgetDetailPage = lazy(() => import('./BudgetDetailPage'));
