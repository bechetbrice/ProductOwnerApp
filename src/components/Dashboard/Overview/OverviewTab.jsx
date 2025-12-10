import { Rocket } from 'lucide-react';
import { EmptyState } from '../../ui';
import HealthScoreSection from './HealthScoreSection';
import MilestonesSection from './MilestonesSection';
import StrategicKPIsSection from './StrategicKPIsSection';
import ActiveSprintSection from './ActiveSprintSection';
import ProblematicTasksSection from './ProblematicTasksSection';
import ResourcesCapacitySection from './ResourcesCapacitySection';
import HistoricalVelocitySection from './HistoricalVelocitySection';
import AlertsBanner from './AlertsBanner';

/**
 * Onglet Vue d'Ensemble du Dashboard
 * Assemble toutes les sections
 */
const OverviewTab = ({ metrics, onNavigateToView, onNavigateToInterview }) => {
  const { isEmpty, alerts } = metrics;

  // EmptyState si aucune donnée
  if (isEmpty) {
    return (
      <EmptyState
        icon={Rocket}
        message="Bienvenue dans ProductOwnerApp !"
        description={
          <div className="space-y-4 text-left max-w-xl mx-auto">
            <p className="text-gray-600">
              Pour démarrer rapidement et découvrir toutes les fonctionnalités de l'application, vous avez trois options :
            </p>
            
            <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4">
              <p className="font-semibold text-emerald-900 mb-2">📦 Option 1 : Charger les données exemple</p>
              <p className="text-sm text-emerald-700">
                Cliquez sur le bouton <strong>"Charger données exemple"</strong> en haut de cette page pour importer un jeu de données complet et explorer l'application avec des exemples concrets.
              </p>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
              <p className="font-semibold text-orange-900 mb-2">📤 Option 2 : Ouvrir une sauvegarde</p>
              <p className="text-sm text-orange-700">
                Cliquez sur <strong>"📤 Charger → Ouvrir un fichier..."</strong> en haut de cette page pour importer une sauvegarde existante de vos données.
              </p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
              <p className="font-semibold text-green-900 mb-2">🚀 Option 3 : Créer vos propres données</p>
              <p className="text-sm text-green-700">
                Commencez par créer votre premier contact dans le module <strong>Contacts</strong>, puis construisez progressivement votre backlog produit.
              </p>
            </div>
            
            <p className="text-sm text-gray-500 italic">
              💡 Conseil : Les données exemple sont idéales pour découvrir l'application et comprendre les bonnes pratiques.
            </p>
          </div>
        }
        onAction={() => onNavigateToView && onNavigateToView('contacts')}
        actionLabel="Créer mon premier contact"
      />
    );
  }

  return (
    <>
      {/* Bannière Alertes Critiques */}
      {alerts.hasAlerts && (
        <AlertsBanner
          alerts={alerts}
          onNavigateToView={onNavigateToView}
        />
      )}

      {/* Health Score + Prochains Jalons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <HealthScoreSection healthScore={metrics.healthScore} />
        <MilestonesSection milestones={metrics.upcomingMilestones} />
      </div>

      {/* KPIs Stratégiques + Sprint en Cours */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <StrategicKPIsSection
          kpis={metrics.strategicKPIs}
          uncoveredNeeds={metrics.uncoveredNeeds}
          criticalUncoveredNeeds={metrics.criticalUncoveredNeeds}
          filtered={metrics.filtered}
          activeSprints={metrics.activeSprints}
          selectedSprintId={metrics.selectedSprintId}
          onSprintSelect={metrics.onSprintSelect}
          onNavigateToView={onNavigateToView}
        />
        <ActiveSprintSection
          sprint={metrics.activeSprint}
          stories={metrics.sprintStories}
          analytics={metrics.sprintAnalytics}
          products={metrics.filtered.products}
          onNavigateToView={onNavigateToView}
        />
      </div>

      {/* Tâches Problématiques */}
      <ProblematicTasksSection
        tasks={metrics.problematicTasks}
        contacts={metrics.contacts}
        onNavigateToView={onNavigateToView}
      />

      {/* Ressources & Capacité */}
      <ResourcesCapacitySection
        contacts={metrics.contacts}
        teams={metrics.teams}
        interviews={metrics.interviews}
        teamCapacity={metrics.teamCapacity}
        onNavigateToView={onNavigateToView}
      />

      {/* Vélocité Historique */}
      <HistoricalVelocitySection velocityData={metrics.velocityData} />
    </>
  );
};

export default OverviewTab;
