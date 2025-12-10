import { MessageSquare, Eye } from 'lucide-react';
import { DetailModal, SectionGroup } from '../ui';

/**
 * UserNeedDetail - Modale de visualisation complète d'un besoin utilisateur
 * 
 * Structure alignée sur le formulaire :
 * 1. En-tête : Besoin + Badges (Importance + Story Points + Produit)
 * 2. Description
 * 3. Stakeholders
 * 4. Contact privilégié
 * 5. Personas
 * 6. Stories liées
 * 7. Entretien source
 * 
 * @component
 */
const UserNeedDetail = ({
  need,
  contacts,
  userStories,
  interviews,
  Objectives,
  products,
  personas,
  onClose,
  onEdit,
  onNavigate,
  getContactById,
  getLinkedStories
}) => {
  if (!need) return null;

  const product = products.find(p => p.id === need.productId);
  const stakeholders = (need.stakeholderIds || [])
    .map(id => getContactById(id))
    .filter(Boolean);
  const primaryContact = getContactById(need.primaryContactId || need.contactId);
  const linkedStories = getLinkedStories(need.id);
  
  // Récupérer l'entretien source depuis sourceInterviewId (nouveau format)
  const sourceInterview = need.sourceInterviewId 
    ? interviews.find(i => i.id === need.sourceInterviewId)
    : null;
    
  const linkedPersonas = (need.personaIds || [])
    .map(id => personas.find(p => p.id === id))
    .filter(Boolean);

  const importanceConfig = {
    critical: { label: 'Critique', badgeClass: 'bg-red-100 text-red-700' },
    high: { label: 'Haute', badgeClass: 'bg-orange-100 text-orange-700' },
    medium: { label: 'Moyenne', badgeClass: 'bg-yellow-100 text-yellow-700' },
    low: { label: 'Basse', badgeClass: 'bg-green-100 text-green-700' }
  };

  const importanceInfo = importanceConfig[need.importance] || importanceConfig.medium;

  const getStoryPointsBadge = (points) => {
    if (!points) {
      return { emoji: '❓', label: 'Non estimé', class: 'bg-gray-100 text-gray-700' };
    }
    
    const config = {
      1: { emoji: '🟢', label: `${points} point`, class: 'bg-green-100 text-green-700' },
      2: { emoji: '🟢', label: `${points} points`, class: 'bg-green-100 text-green-700' },
      3: { emoji: '🟡', label: `${points} points`, class: 'bg-yellow-100 text-yellow-700' },
      5: { emoji: '🔴', label: `${points} points`, class: 'bg-red-100 text-red-700' },
      8: { emoji: '🔴', label: `${points} points`, class: 'bg-red-100 text-red-700' },
      13: { emoji: '🟣', label: `${points} points`, class: 'bg-cyan-100 text-cyan-700' },
      21: { emoji: '⚫', label: `${points} points`, class: 'bg-gray-900 text-white' }
    };
    
    return config[points] || { emoji: '', label: `${points} points`, class: 'bg-emerald-100 text-emerald-700' };
  };

  const storyPointsInfo = getStoryPointsBadge(need.storyPoints);

  return (
    <DetailModal
      isOpen={true}
      title="Détails du besoin"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(need)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Besoin + Badges */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {/* Titre : Le besoin (objectif) */}
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {need.objective || 'Besoin non défini'}
          </h3>
          
          {/* Badges : Importance + Story Points + Produit */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${importanceInfo.badgeClass}`}>
              {importanceInfo.label}
            </span>
            
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${storyPointsInfo.class}`}>
              {storyPointsInfo.emoji} {storyPointsInfo.label}
            </span>
            
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

        {/* Section 1 : Description */}
        <SectionGroup title="Description" emoji="📝" variant="plain">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            {need.context ? (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{need.context}</p>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucune description renseignée</p>
            )}
          </div>
        </SectionGroup>

        {/* Section 2 : Stakeholders */}
        <SectionGroup title="Stakeholders" emoji="👥" variant="plain">
          {stakeholders.length > 0 ? (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="flex flex-wrap gap-2">
                {stakeholders.map(contact => (
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
              <p className="text-sm text-gray-500 italic">Aucun stakeholder</p>
            </div>
          )}
        </SectionGroup>

        {/* Section 3 : Contact privilégié */}
        <SectionGroup title="Contact privilégié" emoji="⭐" variant="plain">
          {primaryContact ? (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="inline-flex flex-col px-3 py-1.5 bg-white rounded border border-gray-200 text-sm">
                <span className="font-medium text-gray-900">{primaryContact.name}</span>
                {primaryContact.role && <span className="text-xs text-gray-600">{primaryContact.role}</span>}
              </div>
            </div>
          ) : (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <p className="text-sm text-gray-500 italic">Aucun contact privilégié</p>
            </div>
          )}
        </SectionGroup>

        {/* Section 4 : Personas */}
        {linkedPersonas.length > 0 && (
          <SectionGroup title="Personas" emoji="👥" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="flex flex-wrap gap-2">
                {linkedPersonas.map(persona => (
                  <div
                    key={persona.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded border border-gray-200 text-sm"
                  >
                    <span className="text-base">{persona.avatar || '👤'}</span>
                    <span className="font-medium text-gray-900">{persona.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 5 : User Stories liées */}
        {linkedStories.length > 0 && (
          <SectionGroup title={`Stories liées (${linkedStories.length})`} emoji="📋" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
              {linkedStories.map(story => (
                <div
                  key={story.id}
                  className="bg-white rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 italic">« {story.title} »</p>
                    {story.status && (
                      <p className="text-xs text-gray-600 mt-0.5">
                        Statut : {story.status === 'done' ? '✅ Terminé' : 
                                 story.status === 'inProgress' ? '🔄 En cours' : 
                                 story.status === 'planned' ? '📋 Planifié' : 
                                 story.status === 'unassigned' ? '❓ Non statué' : story.status}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionGroup>
        )}

        {/* Section 6 : Entretien source */}
        {sourceInterview && (
          <SectionGroup title="Entretien source" emoji="💬" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="bg-white p-3 rounded border border-gray-200 flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{sourceInterview.title}</p>
                  {sourceInterview.scheduledDate && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      {new Date(sourceInterview.scheduledDate).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SectionGroup>
        )}
      </div>
    </DetailModal>
  );
};

export default UserNeedDetail;
