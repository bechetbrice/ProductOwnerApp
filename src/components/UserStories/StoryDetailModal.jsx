import { Eye, Target, User, Building2, ExternalLink } from 'lucide-react';
import { DetailModal, SectionGroup } from '../ui';
import { CONTACT_TYPES, USER_STORY_STATUS_CONFIG, MOSCOW_PRIORITY_CONFIG } from '../../utils/constants';

/**
 * StoryDetailModal - Modale de visualisation complète d'une user story
 * 
 * Version sobre et standardisée (alignée sur tous les autres modaux) :
 * - Utilisation de DetailModal comme base
 * - En-tête unifié avec badges intégrés
 * - Typographie uniformisée (text-sm partout)
 * - Palette de couleurs alternée (indigo/blue)
 * - Design épuré et professionnel
 * - Structure optimisée pour la lecture
 * 
 * SECTIONS (ordre v2.0) :
 * 1. EN-TÊTE : # Story + Titre + Badges (Statut + Priorité + Produit)
 * 2. User Story (format standardisé)
 * 3. Description
 * 4. Critères d'acceptation
 * 5. Besoin Utilisateur Source (déplacé après critères)
 * 6. Outcome de la User Story (spécificité Story)
 * 7. Équipe responsable (conditionnelle - alimentée par Sprint Management)
 * 8. Stakeholders
 * 9. Objectif produit lié
 * 
 * @component
 */
const StoryDetailModal = ({ 
  story, 
  userNeeds,
  contacts,
  products,
  Objectives,
  teams = [],
  onClose,
  onEdit,
  onNavigate
}) => {
  if (!story) return null;

  // Récupérer le besoin lié
  const linkedNeed = story.linkedNeedId
    ? userNeeds.find(n => n.id === story.linkedNeedId)
    : null;

  // Récupérer les stakeholders
  const stakeholders = (story.stakeholderIds || [])
    .map(contactId => contacts.find(c => c.id === contactId))
    .filter(Boolean);

  // Récupérer l'objectif lié
  const linkedGoal = story.linkedGoalId 
    ? Objectives.find(g => g.id === story.linkedGoalId)
    : null;

  // Récupérer le produit
  const product = products.find(p => p.id === story.productId);

  // Récupérer l'équipe responsable (conditionnelle)
  const team = story.teamId
    ? teams.find(t => t.id === story.teamId)
    : null;

  // Utiliser les configs depuis constants.js
  const statusInfo = USER_STORY_STATUS_CONFIG[story.status || 'unassigned'] || USER_STORY_STATUS_CONFIG.unassigned;
  const priorityInfo = MOSCOW_PRIORITY_CONFIG[story.priority] || MOSCOW_PRIORITY_CONFIG.should;
  const hasUserStoryFormat = story.userRole && story.userAction && story.userBenefit;

  // Configuration des outcomes
  const outcomeConfig = {
    completed: { label: 'Terminée', icon: '✅', color: 'text-green-700' },
    paused: { label: 'En pause', icon: '⏸️', color: 'text-yellow-700' },
    blocked: { label: 'Bloquée', icon: '🚧', color: 'text-orange-700' },
    cancelled: { label: 'Annulée', icon: '🚫', color: 'text-gray-700' },
    to_review: { label: 'À revoir', icon: '🔄', color: 'text-red-700' }
  };

  return (
    <DetailModal
      isOpen={true}
      title="Détails de la user story"
      icon={Eye}
      onClose={onClose}
      onEdit={onEdit ? () => onEdit(story) : null}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Titre généré + Numéro + Badges */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {/* Titre principal : Titre généré automatiquement */}
          {story.title && (
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {story.title}
            </h3>
          )}
          
          {/* Ligne unique : # Story + Badges (Statut + Priorité + Produit) */}
          <div className="flex items-center gap-2 flex-wrap">
            {story.storyNumber && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold font-mono">
                #{story.storyNumber}
              </span>
            )}
            
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${statusInfo.badgeClass}`}>
              {statusInfo.label}
            </span>
            
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${priorityInfo.badgeClass}`}>
              {priorityInfo.icon} {priorityInfo.label}
            </span>
            
            {/* Badge Produit */}
            {product ? (
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
            ) : (
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-white text-gray-600 border border-gray-300">
                ⚠️ Pas de produit
              </span>
            )}
          </div>
        </div>

        {/* Section 1 : User Story (format standardisé) - Section supprimée car titre dans l'en-tête */}

        {/* Section 2 : Description */}
        <SectionGroup title="Description" emoji="📝" variant="plain">
          {story.description ? (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{story.description}</p>
            </div>
          ) : (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <p className="text-sm text-gray-500 italic">Aucune description</p>
            </div>
          )}
        </SectionGroup>

        {/* Section 3 : Critères d'acceptation */}
        <SectionGroup title="Critères d'acceptation" emoji="✅" variant="plain">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {story.acceptanceCriteria ? (
              <div className="space-y-2">
                {story.acceptanceCriteria.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-gray-700 mt-0.5">✓</span>
                    <p className="text-sm text-gray-700 flex-1">{line.trim()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucun critère défini</p>
            )}
          </div>
        </SectionGroup>

        {/* Section 4 : Besoin Utilisateur Source (déplacé après critères) */}
        <SectionGroup title="Besoin Utilisateur Source" emoji="🎯" variant="plain">
          {linkedNeed ? (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {linkedNeed.objective || linkedNeed.context || 'Besoin sans titre'}
                    </p>
                  </div>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('need', linkedNeed.id)}
                      className="text-emerald-600 hover:text-emerald-800 transition-colors flex-shrink-0"
                      aria-label="Voir les détails du besoin"
                    >
                      <ExternalLink size={16} />
                    </button>
                  )}
                </div>
                
                {/* Estimation et Importance */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  {linkedNeed.storyPoints > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-600">Estimation héritée:</span>
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-bold">
                        {linkedNeed.storyPoints} pt{linkedNeed.storyPoints > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  
                  {linkedNeed.importance && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-600">Importance:</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        linkedNeed.importance === 'critical' ? 'bg-red-100 text-red-700' :
                        linkedNeed.importance === 'high' ? 'bg-orange-100 text-orange-700' :
                        linkedNeed.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {linkedNeed.importance === 'critical' ? '🔴 Critique' :
                         linkedNeed.importance === 'high' ? '🟠 Haute' :
                         linkedNeed.importance === 'medium' ? '🟡 Moyenne' : '⚪ Basse'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <p className="text-sm text-gray-500 italic">Aucun besoin source</p>
            </div>
          )}
        </SectionGroup>

        {/* Section 5 : Outcome de la User Story (spécificité Story) */}
        {story.outcome && (
          <SectionGroup title="Outcome de la User Story" emoji="🔄" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-3">
              {/* Outcome en texte */}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {outcomeConfig[story.outcome]?.icon || ''} {outcomeConfig[story.outcome]?.label || story.outcome}
                </p>
              </div>

              {/* Raison */}
              {story.outcomeReason && (
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Raison</label>
                  <p className="text-sm text-gray-900 bg-white border border-gray-200 rounded p-2">
                    {story.outcomeReason}
                  </p>
                </div>
              )}

              {/* Note */}
              {story.outcomeNote && (
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Note additionnelle</label>
                  <p className="text-sm text-gray-900 bg-white border border-gray-200 rounded p-2 whitespace-pre-wrap">
                    {story.outcomeNote}
                  </p>
                </div>
              )}

              {/* Historique */}
              {story.history && story.history.length > 0 && (
                <div>
                  <div className="bg-white border border-gray-200 rounded p-3 space-y-1">
                    {story.history.map((entry, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="text-gray-400">
                          {new Date(entry.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span>→</span>
                        <span className="font-medium">
                          {outcomeConfig[entry.outcome]?.icon || ''} {outcomeConfig[entry.outcome]?.label || entry.outcome}
                        </span>
                        {entry.reason && (
                          <>
                            <span>:</span>
                            <span className="italic">{entry.reason}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SectionGroup>
        )}

        {/* Section 6 : Équipe responsable (conditionnelle - alimentée par Sprint Management) */}
        {team && (
          <SectionGroup title="Équipe responsable" emoji="👥" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{team.name}</span>
                <span className="text-xs text-gray-600">
                  {team.memberContactIds?.length || 0} membre{(team.memberContactIds?.length || 0) > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 7 : Stakeholders */}
        {stakeholders.length > 0 && (
          <SectionGroup title={`Stakeholders (${stakeholders.length})`} emoji="👥" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="flex flex-wrap gap-2">
                {stakeholders.map(contact => (
                  <div
                    key={contact.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded border border-gray-200 text-sm"
                  >
                    {contact.type === CONTACT_TYPES.INTERNAL ? (
                      <User className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Building2 className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="font-medium text-gray-900">{contact.name}</span>
                    {contact.role && <span className="text-xs text-gray-600">• {contact.role}</span>}
                  </div>
                ))}
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 8 : Objectif produit lié */}
        {linkedGoal && (
          <SectionGroup title="Objectif produit lié" emoji="🎯" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="bg-white p-3 rounded border border-gray-200 flex items-center gap-3">
                <Target className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{linkedGoal.title}</p>
                  {linkedGoal.description && (
                    <p className="text-xs text-gray-600 mt-0.5">{linkedGoal.description}</p>
                  )}
                </div>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('objective', linkedGoal.id)}
                    className="text-gray-400 hover:text-emerald-600 transition-colors"
                    aria-label="Voir l'objectif"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  </button>
                )}
              </div>
            </div>
          </SectionGroup>
        )}
      </div>
    </DetailModal>
  );
};

export default StoryDetailModal;
