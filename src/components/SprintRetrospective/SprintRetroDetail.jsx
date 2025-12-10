import { Eye } from 'lucide-react';
import { DetailModal, SectionGroup, InfoField } from '../ui';

/**
 * SprintRetroDetail - Modale de visualisation complète d'une Sprint Retrospective
 * 
 * Version sobre et standardisée (alignée sur ContactDetail/TeamDetail) :
 * - En-tête unifié avec produit, sprint et statut
 * - Typographie uniformisée (text-sm partout)
 * - Moins de bold, plus de font-medium
 * - Palette de couleurs réduite (bg-gray-50 + border-gray-200)
 * - Design épuré et professionnel
 * - Sans traits de séparation entre sections
 * 
 * @component
 */
const SprintRetroDetail = ({ retro, sprint, product, contacts, onClose, onEdit }) => {
  if (!retro) return null;

  const participants = contacts.filter(c => retro.participants?.includes(c.id));

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: { label: 'Planifiée', badgeClass: 'bg-yellow-100 text-yellow-700' },
      completed: { label: 'Terminée', badgeClass: 'bg-green-100 text-green-700' },
      cancelled: { label: 'Annulée', badgeClass: 'bg-red-100 text-red-700' }
    };
    return badges[status] || badges.scheduled;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      critical: { label: 'Critique', badgeClass: 'bg-red-100 text-red-700' },
      high: { label: 'Haute', badgeClass: 'bg-orange-100 text-orange-700' },
      medium: { label: 'Moyenne', badgeClass: 'bg-yellow-100 text-yellow-700' },
      low: { label: 'Basse', badgeClass: 'bg-gray-100 text-gray-700' }
    };
    return badges[priority] || badges.medium;
  };

  const getCategoryBadge = (category) => {
    const badges = {
      process: { label: 'Processus', badgeClass: 'bg-teal-100 text-teal-700' },
      tools: { label: 'Outils', badgeClass: 'bg-cyan-100 text-cyan-700' },
      communication: { label: 'Communication', badgeClass: 'bg-green-100 text-green-700' },
      technical: { label: 'Technique', badgeClass: 'bg-orange-100 text-orange-700' },
      other: { label: 'Autre', badgeClass: 'bg-gray-100 text-gray-700' }
    };
    return badges[category] || badges.other;
  };

  const statusInfo = getStatusBadge(retro.status);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DetailModal
      isOpen={true}
      title="Détails de la Rétrospective"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(retro)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Titre + Badges (Statut + Date + Sprint + Produit) */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {/* Ligne 1 : Titre */}
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Rétrospective Sprint
          </h3>
          
          {/* Ligne 2 : Badges Statut + Date + Sprint + Produit */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${statusInfo.badgeClass}`}>
              {statusInfo.label}
            </span>
            
            {retro.retroDate && (
              <span className="text-xs text-gray-600">
                {formatDate(retro.retroDate)}
              </span>
            )}
            
            {/* Badge Sprint */}
            {sprint && (
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                {sprint.name}
              </span>
            )}
            
            {/* Badge Produit */}
            {product && (
              <>
                <span 
                  className="px-2 py-0.5 rounded text-xs font-medium text-white"
                  style={{ backgroundColor: product.color }}
                >
                  {product.code}
                </span>
                <span className="text-sm text-gray-700">
                  {product.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Section 1 : Sprint Info */}
        {sprint && (sprint.goal || (sprint.startDate && sprint.endDate)) && (
          <SectionGroup title="Informations Sprint" emoji="🎯" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
              {sprint.goal && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Objectif</p>
                  <p className="text-sm text-gray-900">{sprint.goal}</p>
                </div>
              )}
              {sprint.startDate && sprint.endDate && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    Du {new Date(sprint.startDate).toLocaleDateString('fr-FR')} au {new Date(sprint.endDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}
            </div>
          </SectionGroup>
        )}

        {/* Section 2 : Participants */}
        <SectionGroup title={`Participants (${participants.length})`} emoji="👥" variant="plain">
          {participants.length > 0 ? (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="flex flex-wrap gap-2">
                {participants.map(contact => (
                  <div
                    key={contact.id}
                    className="inline-flex flex-col px-3 py-1.5 bg-white rounded border border-gray-200 text-sm"
                  >
                    <span className="font-medium text-gray-900">{contact.name}</span>
                    {contact.role && <span className="text-xs text-gray-600">{contact.role}</span>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-sm text-gray-500 italic">Aucun participant</p>
            </div>
          )}
        </SectionGroup>

        {/* Section 3 : Ce qui s'est bien passé */}
        <SectionGroup title={`Ce qui s'est bien passé (${retro.whatWentWell?.length || 0})`} emoji="👍" variant="plain">
          {retro.whatWentWell && retro.whatWentWell.length > 0 ? (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
              {retro.whatWentWell
                .sort((a, b) => b.votes - a.votes)
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded border border-gray-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{item.description}</p>
                      {item.votes > 0 && (
                        <p className="text-xs text-gray-600 mt-1 font-medium">
                          🗳️ {item.votes} vote{item.votes > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <p className="text-sm text-gray-500 italic">Aucun point positif enregistré</p>
            </div>
          )}
        </SectionGroup>

        {/* Section 4 : À améliorer */}
        <SectionGroup title={`À améliorer (${retro.whatNeedsImprovement?.length || 0})`} emoji="💡" variant="plain">
          {retro.whatNeedsImprovement && retro.whatNeedsImprovement.length > 0 ? (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-2">
              {retro.whatNeedsImprovement
                .sort((a, b) => b.votes - a.votes)
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded border border-gray-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{item.description}</p>
                      {item.votes > 0 && (
                        <p className="text-xs text-gray-600 mt-1 font-medium">
                          🗳️ {item.votes} vote{item.votes > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-sm text-gray-500 italic">Aucun point d'amélioration enregistré</p>
            </div>
          )}
        </SectionGroup>

        {/* Section 5 : Actions d'Amélioration */}
        <SectionGroup title={`Actions d'Amélioration (${retro.actionItems?.length || 0})`} emoji="🎯" variant="plain">
          {retro.actionItems && retro.actionItems.length > 0 ? (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-3">
              {retro.actionItems.map((action, index) => {
                const assignedContact = contacts.find(c => c.id === action.assignedTo);
                const priorityInfo = getPriorityBadge(action.priority);
                const categoryInfo = getCategoryBadge(action.category);
                
                return (
                  <div key={index} className="bg-white p-4 rounded border border-gray-200">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-2 flex-1">
                        <p className="text-sm font-medium text-gray-900">{action.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityInfo.badgeClass}`}>
                          {priorityInfo.label}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${categoryInfo.badgeClass}`}>
                          {categoryInfo.label}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600 ml-6">
                      {assignedContact && (
                        <p>
                          <span className="font-medium">Assigné à :</span> {assignedContact.name}
                        </p>
                      )}
                      {action.dueDate && (
                        <p>
                          <span className="font-medium">Échéance :</span> {new Date(action.dueDate).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                      {action.status && (
                        <p>
                          <span className="font-medium">Statut :</span> {
                            action.status === 'done' ? '✅ Terminé' :
                            action.status === 'inProgress' ? '🔄 En cours' : '📝 À faire'
                          }
                        </p>
                      )}
                      {action.notes && (
                        <p className="mt-2 pt-2 border-t border-gray-200">
                          <span className="font-medium">Notes :</span> {action.notes}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <p className="text-sm text-gray-500 italic">Aucune action d'amélioration définie</p>
            </div>
          )}
        </SectionGroup>

        {/* Section 6 : Engagements pour le Prochain Sprint */}
        <SectionGroup title="Engagements pour le Prochain Sprint" emoji="🚀" variant="plain">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {retro.nextSprintCommitments ? (
              <div className="space-y-2">
                {retro.nextSprintCommitments.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-gray-700 mt-0.5">✓</span>
                    <p className="text-sm text-gray-700 flex-1">{line.trim()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucun engagement défini</p>
            )}
          </div>
        </SectionGroup>
      </div>
    </DetailModal>
  );
};

export default SprintRetroDetail;
