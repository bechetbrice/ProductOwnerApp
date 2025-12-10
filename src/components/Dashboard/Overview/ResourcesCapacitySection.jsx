import { Users, Building2, Briefcase, Heart, MessageSquare, Award } from 'lucide-react';
import { InfoTooltip } from '../../ui';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';

/**
 * Section Ressources & Capacité
 * Affiche les stakeholders, clients et capacité des équipes
 */
const ResourcesCapacitySection = ({ contacts = [], teams = [], interviews = [], teamCapacity, onNavigateToView }) => {
  const activeTeams = teams.filter(t => t.status === 'active');
  
  return (
    <div>
      <h2 className={`${DASHBOARD_TEXT.h2} mb-2 sm:mb-3 flex items-center gap-2`}>
        <Users size={18} className="sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
        <span className="truncate">Ressources & Capacité</span>
        <InfoTooltip text="Vue consolidée de vos ressources humaines et de la capacité des équipes. Suivez le nombre total de stakeholders (internes, externes et clients) ainsi que la capacité totale, allouée et disponible de vos équipes pour les sprints." />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Stakeholders - Section 1 : indigo-50 */}
        <div className="bg-emerald-50 rounded-lg shadow p-4 sm:p-6 border border-emerald-100">
          <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
            <Users size={18} className="sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">Stakeholders</span>
            <InfoTooltip text="Liste complète de tous vos contacts internes et externes. Distinction entre membres de l'équipe interne et partenaires/fournisseurs externes. Cliquez pour filtrer par type." />
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white rounded-lg">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-emerald-700 font-medium truncate">Total Stakeholders</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-900">{contacts.filter(c => c.type !== 'client').length}</p>
                <p className="text-xs text-emerald-600 mt-1">
                  {contacts.filter(c => c.type !== 'client' && c.isActive).length} actifs
                </p>
              </div>
              <Users size={28} className="sm:w-8 sm:h-8 text-emerald-500 flex-shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-white rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors border border-emerald-200"
                   onClick={() => onNavigateToView && onNavigateToView('contacts', { type: 'internal' })}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Building2 size={14} className="sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <p className="text-xs text-emerald-700 truncate">Internes</p>
                </div>
                <p className="text-lg sm:text-xl font-bold text-emerald-900">{contacts.filter(c => c.type === 'internal').length}</p>
              </div>
              <div className="p-2 sm:p-3 bg-white rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors border border-emerald-200"
                   onClick={() => onNavigateToView && onNavigateToView('contacts', { type: 'external' })}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <Briefcase size={14} className="sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <p className="text-xs text-emerald-700 truncate">Externes</p>
                </div>
                <p className="text-lg sm:text-xl font-bold text-emerald-900">{contacts.filter(c => c.type === 'external').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clients - Section 2 : blue-50 */}
        <div className="bg-teal-50 rounded-lg shadow p-4 sm:p-6 border border-teal-100">
          <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
            <Heart size={18} className="sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
            <span className="truncate">Clients</span>
            <InfoTooltip text="Liste de vos clients et utilisateurs finaux. Ces contacts représentent vos utilisateurs cibles pour les entretiens, feedbacks et validation des besoins. Cliquez pour voir tous les clients." />
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div 
              className="flex items-center justify-between p-2.5 sm:p-3 bg-white rounded-lg cursor-pointer hover:bg-teal-100 transition-colors"
              onClick={() => onNavigateToView && onNavigateToView('contacts', { type: 'client' })}
            >
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-teal-700 font-medium truncate">Total Clients</p>
                <p className="text-xl sm:text-2xl font-bold text-teal-900">{contacts.filter(c => c.type === 'client').length}</p>
                <p className="text-xs text-teal-600 mt-1">
                  {contacts.filter(c => c.type === 'client' && c.isActive).length} actifs
                </p>
              </div>
              <Heart size={28} className="sm:w-8 sm:h-8 text-teal-500 flex-shrink-0" />
            </div>
            <div className="space-y-2">
              <div className="p-2 sm:p-3 bg-white rounded-lg border border-teal-200">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <MessageSquare size={14} className="sm:w-4 sm:h-4 text-teal-600 flex-shrink-0" />
                  <p className="text-xs text-teal-700 truncate">Entretiens</p>
                </div>
                <p className="text-lg sm:text-xl font-bold text-teal-900">
                  {(() => {
                    const clientIds = contacts.filter(c => c.type === 'client').map(c => c.id);
                    return interviews.filter(i => 
                      i.interviewedContactIds?.some(id => clientIds.includes(id)) ||
                      clientIds.includes(i.contactId)
                    ).length;
                  })()}
                </p>
                <p className="text-xs text-teal-600 mt-1 truncate">avec clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Capacité Équipes - Section 3 : indigo-50 */}
        <div className="bg-cyan-50 rounded-lg shadow p-4 sm:p-6 border border-cyan-100">
          <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
            <Award size={18} className="sm:w-5 sm:h-5 text-cyan-600 flex-shrink-0" />
            <span className="truncate">Capacité Équipes</span>
            <InfoTooltip text="Capacité globale de vos équipes en story points, calculée en tenant compte de la disponibilité et de la charge de travail de chaque membre. La capacité allouée correspond au sprint actif, la disponible représente ce qui reste pour les prochains sprints." />
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white rounded-lg">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-cyan-700 font-medium truncate">Capacité Totale</p>
                <p className="text-xl sm:text-2xl font-bold text-cyan-900">{teamCapacity.totalCapacity} pts</p>
                <p className="text-xs text-cyan-600 mt-1 truncate">{activeTeams.length} équipe{activeTeams.length > 1 ? 's' : ''} active{activeTeams.length > 1 ? 's' : ''}</p>
              </div>
              <Award size={28} className="sm:w-8 sm:h-8 text-cyan-500 flex-shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-white rounded-lg border border-cyan-200">
                <p className="text-xs text-cyan-700 mb-1 truncate">Allouée (sprint)</p>
                <p className="text-lg sm:text-xl font-bold text-cyan-900">{teamCapacity.allocatedCapacity} pts</p>
                <p className="text-xs text-cyan-600 mt-1">{teamCapacity.utilizationRate}% utilisée</p>
              </div>
              <div className="p-2 sm:p-3 bg-white rounded-lg border border-cyan-200">
                <p className="text-xs text-cyan-700 mb-1 truncate">Disponible</p>
                <p className="text-lg sm:text-xl font-bold text-cyan-900">{teamCapacity.availableCapacity} pts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesCapacitySection;
