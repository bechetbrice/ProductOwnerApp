import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { InfoTooltip } from '../../ui';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';

/**
 * Section Tâches Problématiques
 * Affiche les tâches bloquées, à revoir ou en pause
 */
const ProblematicTasksSection = ({ tasks = [], contacts = [], onNavigateToView }) => {
  const outcomeConfig = {
    blocked: { icon: '🚧', label: 'Bloquée', color: 'bg-red-100 text-red-700 border-red-300' },
    to_review: { icon: '🔄', label: 'À revoir', color: 'bg-teal-100 text-teal-700 border-teal-300' },
    paused: { icon: '⏸️', label: 'En pause', color: 'bg-gray-100 text-gray-700 border-gray-300' }
  };

  return (
    <div>
      <h2 className={`${DASHBOARD_TEXT.h2} mb-2 sm:mb-3 flex items-center gap-2`}>
        <AlertTriangle size={18} className="sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
        <span className="truncate">Tâches bloquées, à revoir ou en pause</span>
        <InfoTooltip text="Liste des tâches qui nécessitent une attention particulière : tâches bloquées (impossibles à avancer), tâches à revoir (nécessitant une réévaluation), ou tâches en pause (temporairement suspendues). Ces tâches peuvent impacter la vélocité et nécessitent un traitement prioritaire." />
      </h2>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
          {tasks.map(task => {
            const outcomeInfo = outcomeConfig[task.outcome];
            const assignedContact = task.assignedTo ? contacts.find(c => c.id === task.assignedTo) : null;
            
            return (
              <div 
                key={task.id}
                className="bg-white rounded-lg shadow px-2 sm:px-3 py-2 cursor-pointer hover:shadow-md transition-all border-l-4"
                style={{ borderLeftColor: outcomeInfo.color.includes('red') ? '#EF4444' : outcomeInfo.color.includes('teal') ? '#14b8a6' : '#6B7280' }}
                onClick={() => onNavigateToView && onNavigateToView('tasks', { taskId: task.id })}
              >
                {/* Titre */}
                <div className="mb-1.5 sm:mb-2">
                  <p className="text-xs sm:text-sm text-gray-900 line-clamp-2">
                    {task.title}
                  </p>
                </div>

                {/* Badge Outcome + Référent */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium border ${outcomeInfo.color} flex items-center gap-0.5 sm:gap-1 flex-shrink-0`}>
                    <span className="text-xs">{outcomeInfo.icon}</span>
                    <span className="hidden sm:inline">{outcomeInfo.label}</span>
                  </span>
                  
                  {assignedContact && (
                    <span className="text-xs text-gray-600 truncate flex-shrink-0" title={assignedContact.name}>
                      {assignedContact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4 sm:p-8">
          <div className="text-center py-6 sm:py-8 text-gray-400">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto mb-3 sm:mb-4" />
            <h4 className="text-base sm:text-lg font-semibold text-green-700 mb-2">Aucune tâche problématique</h4>
            <p className="text-xs sm:text-sm text-gray-600">Toutes vos tâches progressent normalement</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblematicTasksSection;
