import { Calendar, CheckCircle2 } from 'lucide-react';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';

/**
 * Section Prochains Jalons (30 jours)
 */
const MilestonesSection = ({ milestones = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
        <Calendar size={18} className="sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
        <span className="truncate">Prochains Jalons (30 jours)</span>
      </h3>
      {milestones.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {milestones.map((milestone, idx) => {
            const daysUntil = Math.ceil((milestone.date - new Date()) / (1000 * 60 * 60 * 24));
            const colorClasses = {
              blue: 'bg-emerald-100 text-emerald-700 border-emerald-300',
              purple: 'bg-teal-100 text-teal-700 border-teal-300',
              green: 'bg-green-100 text-green-700 border-green-300',
              red: 'bg-red-100 text-red-700 border-red-300'
            };
            
            return (
              <div 
                key={idx}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg cursor-pointer hover:shadow transition-all ${colorClasses[milestone.color]}`}
                onClick={milestone.onClick}
              >
                <span className="text-lg sm:text-xl lg:text-2xl flex-shrink-0">{milestone.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium truncate">{milestone.title}</p>
                  <p className="text-xs opacity-75">
                    {daysUntil === 0 ? "Aujourd'hui" : 
                     daysUntil === 1 ? 'Demain' : 
                     `Dans ${daysUntil}j`} • {milestone.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <span className="hidden sm:inline px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold flex-shrink-0">
                  {milestone.label}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 text-gray-500">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-300 mx-auto mb-2 sm:mb-3" />
          <p className="text-xs sm:text-sm">Aucun jalon dans les 30 prochains jours</p>
        </div>
      )}
    </div>
  );
};

export default MilestonesSection;
