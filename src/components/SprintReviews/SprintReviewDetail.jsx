import { Eye } from 'lucide-react';
import { DetailModal, SectionGroup, InfoField } from '../ui';

/**
 * SprintReviewDetail - Modale de visualisation complète d'une Sprint Review
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
const SprintReviewDetail = ({ review, sprint, product, userStories, contacts, onClose, onEdit }) => {
  if (!review) return null;

  const completedStories = userStories.filter(s => review.completedStoryIds?.includes(s.id));
  const participants = contacts.filter(c => review.participants?.includes(c.id));

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
      feature: { label: 'Fonctionnalité', badgeClass: 'bg-teal-100 text-teal-700' },
      bug: { label: 'Bug', badgeClass: 'bg-red-100 text-red-700' },
      usability: { label: 'Ergonomie', badgeClass: 'bg-cyan-100 text-cyan-700' },
      performance: { label: 'Performance', badgeClass: 'bg-green-100 text-green-700' },
      other: { label: 'Autre', badgeClass: 'bg-gray-100 text-gray-700' }
    };
    return badges[category] || badges.other;
  };

  const statusInfo = getStatusBadge(review.status);

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
      title="Détails de la Sprint Review"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(review)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Titre + Badges (Statut + Date + Sprint + Produit) */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {/* Ligne 1 : Titre */}
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Sprint Review
          </h3>
          
          {/* Ligne 2 : Badges Statut + Date + Sprint + Produit */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${statusInfo.badgeClass}`}>
              {statusInfo.label}
            </span>
            
            {review.reviewDate && (
              <span className="text-xs text-gray-600">
                {formatDate(review.reviewDate)}
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

        {/* Section 3 : Stories Démontrées */}
        {completedStories.length > 0 && (
          <SectionGroup title={`Stories Démontrées (${completedStories.length})`} emoji="📋" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
              {completedStories.map(story => (
                <div key={story.id} className="p-3">
                  <p className="text-gray-700 italic">
                    « {story.title} »
                  </p>
                </div>
              ))}
            </div>
          </SectionGroup>
        )}

        {/* Section 4 : Notes de Démonstration */}
        <SectionGroup title="Notes de Démonstration" emoji="📝" variant="plain">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {review.demoNotes ? (
              <div className="space-y-2">
                {review.demoNotes.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-gray-700 mt-0.5">✓</span>
                    <p className="text-sm text-gray-700 flex-1">{line.trim()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucune note de démonstration</p>
            )}
          </div>
        </SectionGroup>

        {/* Section 5 : Feedback des Stakeholders */}
        {review.stakeholderFeedback && review.stakeholderFeedback.length > 0 && (
          <SectionGroup title={`Feedback des Stakeholders (${review.stakeholderFeedback.length})`} emoji="💬" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-3">
              {review.stakeholderFeedback.map((feedback, index) => {
                const contact = contacts.find(c => c.id === feedback.contactId);
                const priorityInfo = getPriorityBadge(feedback.priority);
                const categoryInfo = getCategoryBadge(feedback.category);
                
                return (
                  <div key={index} className="bg-white p-4 rounded border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {contact && (
                          <span className="text-sm font-medium text-gray-900">{contact.name}</span>
                        )}
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
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{feedback.feedback}</p>
                  </div>
                );
              })}
            </div>
          </SectionGroup>
        )}

        {/* Section 6 : Décisions Prises */}
        <SectionGroup title="Décisions Prises" emoji="🎯" variant="plain">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {review.decisions ? (
              <div className="space-y-2">
                {review.decisions.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-gray-700 mt-0.5">✓</span>
                    <p className="text-sm text-gray-700 flex-1">{line.trim()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucune décision enregistrée</p>
            )}
          </div>
        </SectionGroup>

        {/* Section 7 : Prochaines Étapes - Product Backlog */}
        <SectionGroup title="Prochaines Étapes - Product Backlog" emoji="📌" variant="plain">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            {review.nextStepsProductBacklog ? (
              <div className="space-y-2">
                {review.nextStepsProductBacklog.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-gray-700 mt-0.5">✓</span>
                    <p className="text-sm text-gray-700 flex-1">{line.trim()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucune étape définie</p>
            )}
          </div>
        </SectionGroup>
      </div>
    </DetailModal>
  );
};

export default SprintReviewDetail;
