import { useMemo } from 'react';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';
import { CURRENCY_CONFIG, CONTACT_TYPE_COLORS, CONTRACT_TYPE_CONFIG } from '../../utils/constants';

/**
 * TeamBudgetView - Calcul automatique du budget RH depuis les Contacts
 * Affiche le budget calculé par contact actif sur le produit/sprint
 */
const TeamBudgetView = ({ contacts, productId, sprintId, sprints }) => {
  
  // Filtrer les contacts actifs avec informations équipe
  const activeTeamMembers = useMemo(() => {
    return contacts.filter(contact => {
      // Doit avoir des infos équipe
      const hasTeamInfo = contact.capacity && contact.dailyRate;
      if (!hasTeamInfo) return false;

      // Doit être actif
      if (!contact.isActive) return false;

      // Doit être assigné au produit
      if (productId && (!contact.productIds || !contact.productIds.includes(productId))) {
        return false;
      }

      return true;
    });
  }, [contacts, productId]);

  // Calculer la durée du sprint en jours ouvrés (approximation)
  const sprintDurationInDays = useMemo(() => {
    if (!sprintId) return 10; // Défaut : 2 semaines = 10 jours ouvrés

    const sprint = sprints.find(s => s.id === sprintId);
    if (!sprint || !sprint.startDate || !sprint.endDate) return 10;

    const start = new Date(sprint.startDate);
    const end = new Date(sprint.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Approximation : 5 jours ouvrés par semaine
    return Math.round(diffDays * (5/7));
  }, [sprintId, sprints]);

  // Calculer le budget par membre
  const teamBudget = useMemo(() => {
    return activeTeamMembers.map(contact => {
      const capacity = contact.capacity || 0;
      const dailyRate = contact.dailyRate || 0;
      const availability = contact.availability || 100;
      const workload = contact.workload || 100;
      const currency = contact.currency || 'EUR';

      // Calcul du coût estimé
      // Pour un sprint : dailyRate × (capacity/jours) × availability% × workload%
      // Approximation : capacity en story points → jours travaillés
      const estimatedDays = sprintDurationInDays * (availability / 100) * (workload / 100);
      const estimatedCost = dailyRate * estimatedDays;

      return {
        contact,
        dailyRate,
        capacity,
        availability,
        workload,
        currency,
        estimatedDays: Math.round(estimatedDays * 10) / 10, // 1 décimale
        estimatedCost: Math.round(estimatedCost)
      };
    });
  }, [activeTeamMembers, sprintDurationInDays]);

  // Totaux par devise
  const totalsByCurrency = useMemo(() => {
    const totals = {};

    teamBudget.forEach(item => {
      const currency = item.currency;
      if (!totals[currency]) {
        totals[currency] = {
          count: 0,
          totalCost: 0,
          totalDays: 0
        };
      }
      totals[currency].count += 1;
      totals[currency].totalCost += item.estimatedCost;
      totals[currency].totalDays += item.estimatedDays;
    });

    return totals;
  }, [teamBudget]);

  const formatAmount = (amount, currency) => {
    const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.EUR;
    return config.format(amount);
  };

  if (activeTeamMembers.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Budget Ressources Humaines</h3>
            <p className="text-xs sm:text-sm text-gray-600">Calculé automatiquement depuis les contacts actifs</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Aucun membre d'équipe avec budget</p>
              <p className="text-xs text-yellow-700 mt-1">
                Pour calculer le budget RH automatiquement, ajoutez des contacts avec :
              </p>
              <ul className="text-xs text-yellow-700 mt-2 space-y-1 ml-4 list-disc">
                <li><strong>Informations Équipe</strong> complétées (capacité, taux journalier)</li>
                <li><strong>Statut actif</strong> sur le produit sélectionné</li>
                <li><strong>Taux journalier</strong> renseigné</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Budget Ressources Humaines</h3>
            <p className="text-xs sm:text-sm text-gray-600">Calculé automatiquement • {activeTeamMembers.length} membre{activeTeamMembers.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Totaux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {Object.entries(totalsByCurrency).map(([currency, data]) => (
            <div key={currency} className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <div className="text-xs text-blue-600 font-medium mb-1">Total {currency}</div>
              <div className="text-2xl font-bold text-blue-900">
                {formatAmount(data.totalCost, currency)}
              </div>
              <div className="text-xs text-blue-700 mt-1">
                {data.count} personne{data.count > 1 ? 's' : ''} • {Math.round(data.totalDays)} jours
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-500 bg-gray-50 rounded p-2 sm:p-3">
          💡 <strong>Calcul :</strong> Taux journalier × Jours travaillés × Disponibilité × % Temps produit
          {sprintId && ` • Sprint : ${sprintDurationInDays} jours ouvrés`}
        </div>
      </div>

      {/* Liste des membres */}
      <div className="divide-y divide-gray-200">
        {teamBudget.map(item => {
          const { contact, dailyRate, capacity, availability, workload, currency, estimatedDays, estimatedCost } = item;
          const typeColor = CONTACT_TYPE_COLORS[contact.type];
          const contractConfig = CONTRACT_TYPE_CONFIG[contact.contractType];

          return (
            <div key={contact.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                {/* Avatar / Initiales */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                  {contact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${typeColor.bg} ${typeColor.text}`}>
                      {typeColor.icon} {typeColor.label}
                    </span>
                    {contractConfig && (
                      <span className="text-xs text-gray-500">
                        {contractConfig.icon} {contractConfig.label}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-2">
                    {contact.role}
                    {contact.type === 'external' && contact.company && (
                      <span className="ml-2">• {contact.company}</span>
                    )}
                    {contact.type === 'internal' && contact.department && (
                      <span className="ml-2">• {contact.department}</span>
                    )}
                  </div>

                  {/* Détails calcul */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                    <div>
                      <span className="text-gray-500">TJM :</span>
                      <div className="font-semibold text-gray-900">{formatAmount(dailyRate, currency)}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Jours :</span>
                      <div className="font-semibold text-gray-900">{estimatedDays}j</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Dispo :</span>
                      <div className="font-semibold text-gray-900">{availability}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">% Temps :</span>
                      <div className="font-semibold text-gray-900">{workload}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Capacité :</span>
                      <div className="font-semibold text-gray-900">{capacity} pts</div>
                    </div>
                  </div>
                </div>

                {/* Coût estimé */}
                <div className="text-right flex-shrink-0 min-w-0">
                  <div className="text-xs text-gray-500 mb-1">Coût estimé</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatAmount(estimatedCost, currency)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamBudgetView;
