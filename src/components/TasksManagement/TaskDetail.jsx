import { Clock, Eye } from 'lucide-react';
import { DetailModal, SectionGroup } from '../ui';
import TaskOutcomeBadge from './TaskOutcomeBadge';

/**
 * TaskDetail - Modal de détail d'une tâche technique
 * 
 * Version sobre et standardisée (alignée sur ContactDetail/TeamDetail) :
 * - En-tête unifié avec identification et badges intégrés
 * - Typographie uniformisée (text-sm partout)
 * - Moins de bold, plus de font-medium
 * - Palette de couleurs réduite (bg-gray-50 + border-gray-200)
 * - Design épuré et professionnel
 * - Sans traits de séparation entre sections
 * 
 * @component
 */
const TaskDetail = ({ 
  task, 
  userStories = [], 
  contacts = [],
  onEdit, 
  onClose
}) => {
  // Fonction pour obtenir le nom de la User Story
  const getStoryName = (storyId) => {
    const story = userStories.find(s => s.id === storyId);
    return story?.title || 'Story supprimée';
  };

  // Fonction pour obtenir le numéro de la story
  const getStoryNumber = (storyId) => {
    const story = userStories.find(s => s.id === storyId);
    return story?.storyNumber || null;
  };

  // Fonction pour obtenir le nom du contact assigné
  const getAssigneeName = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact?.name || 'Non assigné';
  };

  // Fonction pour obtenir le rôle du contact
  const getAssigneeRole = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact?.role || '';
  };

  // Fonction pour obtenir le label du statut
  const getStatusLabel = (status) => {
    const labels = {
      todo: 'À faire',
      inProgress: 'En cours',
      done: 'Terminée'
    };
    return labels[status] || status;
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    const colors = {
      todo: 'bg-gray-100 text-gray-700',
      inProgress: 'bg-orange-100 text-orange-700',
      done: 'bg-green-100 text-green-700'
    };
    return colors[status] || colors.todo;
  };

  // Fonction pour obtenir le type label
  const getTypeLabel = (type) => {
    const labels = {
      development: 'Développement',
      testing: 'Tests',
      review: 'Revue de code',
      deployment: 'Déploiement',
      documentation: 'Documentation',
      other: 'Autre'
    };
    return labels[type] || 'Autre';
  };

  // Fonction pour obtenir l'icône du type
  const getTypeIcon = (type) => {
    const icons = {
      development: '💻',
      testing: '🧪',
      review: '👀',
      deployment: '🚀',
      documentation: '📚',
      other: '🔧'
    };
    return icons[type] || '🔧';
  };

  return (
    <DetailModal
      isOpen={true}
      title="Détails de la tâche technique"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(task)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : #Task + Titre + Badges */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {/* Ligne 1 : # Task */}
          {task.taskNumber && (
            <div className="mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono bg-emerald-100 text-emerald-700 border border-emerald-200">
                #{task.taskNumber}
              </span>
            </div>
          )}
          
          {/* Ligne 2 : Titre */}
          <h3 className="text-lg font-medium text-gray-900 mb-3">{task.title}</h3>
          
          {/* Ligne 3 : Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {task.outcome ? (
              <TaskOutcomeBadge outcome={task.outcome} />
            ) : (
              <span className={`px-2.5 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
            )}
            
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
              <span>{getTypeIcon(task.type)}</span>
              {getTypeLabel(task.type)}
            </span>
            
            {task.estimatedHours > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-teal-100 text-teal-700">
                <Clock className="w-3 h-3" />
                {task.estimatedHours}h estimées
              </span>
            )}
          </div>
        </div>

        {/* Section 1 : Description */}
        {task.description && (
          <SectionGroup title="Description" emoji="📝" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{task.description}</p>
            </div>
          </SectionGroup>
        )}

        {/* Section 2 : User Story associée */}
        <SectionGroup title="User Story associée" emoji="📖" variant="plain">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <div className="p-3">
              <p className="text-gray-700 italic">
                « {getStoryNumber(task.userStoryId) ? `#${getStoryNumber(task.userStoryId)} - ` : ''}{getStoryName(task.userStoryId)} »
              </p>
            </div>
          </div>
        </SectionGroup>

        {/* Section 3 : Assignation */}
        <SectionGroup title="Assignation" emoji="👤" variant="plain">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            {task.assignedTo ? (
              <div className="inline-flex flex-col px-3 py-1.5 bg-white rounded border border-gray-200 text-sm">
                <span className="font-medium text-gray-900">{getAssigneeName(task.assignedTo)}</span>
                {getAssigneeRole(task.assignedTo) && (
                  <span className="text-xs text-gray-600">{getAssigneeRole(task.assignedTo)}</span>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Non assigné</p>
            )}
          </div>
        </SectionGroup>

        {/* Section 4 : Outcome et historique */}
        {(task.outcome || task.history?.length > 0) && (
          <SectionGroup title="Outcome et historique" emoji="🔄" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-2">
              {/* Outcome actuel */}
              {task.outcome && (
                <div className="bg-white border border-gray-200 rounded p-3">
                  <div className="flex items-start gap-3">
                    <TaskOutcomeBadge outcome={task.outcome} size="normal" showLabel={true} />
                    <div className="flex-1">
                      {task.outcomeReason && (
                        <p className="text-sm text-gray-900 font-medium mb-1">
                          Raison : {task.outcomeReason}
                        </p>
                      )}
                      {task.outcomeNote && (
                        <p className="text-sm text-gray-600 italic">
                          "{task.outcomeNote}"
                        </p>
                      )}
                      {task.outcomeDate && (
                        <p className="text-xs text-gray-500 mt-2">
                          Défini le {new Date(task.outcomeDate).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Historique */}
              {task.history?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600">Historique :</p>
                  {task.history.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                      <span className="text-gray-400">
                        {new Date(entry.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span>→</span>
                      <span className="font-medium">
                        {entry.outcome === 'completed' ? '✅' :
                         entry.outcome === 'paused' ? '⏸️' :
                         entry.outcome === 'blocked' ? '🚧' :
                         entry.outcome === 'cancelled' ? '🚫' :
                         entry.outcome === 'to_review' ? '🔄' : ''}
                        {' '}{entry.outcome}
                      </span>
                      {entry.reason && (
                        <span className="italic text-gray-500">: {entry.reason}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionGroup>
        )}

        {/* Section 5 : Dates */}
        <SectionGroup title="Dates" emoji="📅" variant="plain">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Date de création</span>
              <span className="font-medium text-gray-900">
                {new Date(task.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Dernière modification</span>
                <span className="font-medium text-gray-900">
                  {new Date(task.updatedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        </SectionGroup>
      </div>
    </DetailModal>
  );
};

export default TaskDetail;
