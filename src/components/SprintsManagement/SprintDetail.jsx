import { Eye, Calendar, AlertCircle, Clock, ListChecks } from 'lucide-react';
import { DetailModal, SectionGroup } from '../ui';

/**
 * SprintDetail - Modal de visualisation détaillée d'un sprint
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
const SprintDetail = ({ 
  sprint, 
  userStories = [],
  products = [],
  teams = [],
  onClose,
  onEdit
}) => {
  if (!sprint) return null;

  // Récupérer le produit lié
  const product = products.find(p => p.id === sprint.productId);

  // Récupérer l'équipe responsable
  const team = teams.find(t => t.id === sprint.teamId);

  // Récupérer les stories du sprint
  const sprintStories = userStories.filter(s => sprint.storyIds?.includes(s.id)) || [];

  // Calculer les jours restants
  const today = new Date();
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  const isOverdue = daysRemaining < 0;
  const isEndingSoon = daysRemaining >= 0 && daysRemaining <= 3;

  // Obtenir le label et couleur du statut
  const getStatusBadge = (status) => {
    switch (status) {
      case 'planned':
        return 'bg-teal-100 text-teal-700';
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planned': return 'Planifié';
      case 'active': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return 'Inconnu';
    }
  };

  return (
    <DetailModal
      isOpen={true}
      title="Détails du sprint"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(sprint)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : #Sprint + Nom + Badges (Statut + Équipe + Produit) */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {/* Ligne 1 : # Sprint + Nom */}
          <div className="flex items-center gap-2 mb-3">
            {sprint.sprintNumber && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono bg-emerald-100 text-emerald-700 border border-emerald-200">
                #{sprint.sprintNumber}
              </span>
            )}
            <h3 className="text-lg font-medium text-gray-900">{sprint.name}</h3>
          </div>
          
          {/* Ligne 2 : Badges Statut + Équipe + Produit */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${getStatusBadge(sprint.status)}`}>
              {getStatusLabel(sprint.status)}
            </span>
            
            {team && (
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                👥 {team.name}
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

        {/* Section 1 : Période */}
        <SectionGroup title="Période" emoji="📅" variant="plain">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Date de début</span>
              <span className="font-medium text-gray-900">
                {new Date(sprint.startDate).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Date de fin</span>
              <span className="font-medium text-gray-900">
                {new Date(sprint.endDate).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Durée totale</span>
              <span className="text-base font-medium text-emerald-600">{totalDays} jour{totalDays > 1 ? 's' : ''}</span>
            </div>

            {/* Indicateur de temps restant */}
            {sprint.status === 'active' && (
              <div className="pt-2 border-t border-gray-200">
                {isOverdue ? (
                  <div className="flex items-center gap-2 text-sm bg-white border-l-4 border-l-red-500 border-t border-r border-b border-gray-200 px-3 py-2 rounded">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-gray-900">En retard de {Math.abs(daysRemaining)} jour{Math.abs(daysRemaining) > 1 ? 's' : ''}</span>
                  </div>
                ) : isEndingSoon ? (
                  <div className="flex items-center gap-2 text-sm bg-white border-l-4 border-l-orange-500 border-t border-r border-b border-gray-200 px-3 py-2 rounded">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-gray-900">{daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm bg-white px-3 py-2 rounded border border-gray-200">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </SectionGroup>

        {/* Section 2 : Objectif du sprint */}
        {sprint.goal && (
          <SectionGroup title="Objectif du sprint" emoji="🎯" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{sprint.goal}</p>
            </div>
          </SectionGroup>
        )}

        {/* Section 3 : User Stories */}
        <SectionGroup title={`User Stories (${sprintStories.length})`} emoji="📝" variant="plain">
          {sprintStories.length === 0 ? (
            <div className="bg-teal-50 rounded-lg border border-teal-100 p-6 text-center">
              <ListChecks className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                Aucune story assignée à ce sprint
              </p>
            </div>
          ) : (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
              {sprintStories.map(story => (
                <div 
                  key={story.id} 
                  className="p-3"
                >
                  <p className="text-sm text-gray-700 italic">
                    « {story.title} »
                  </p>
                </div>
              ))}
            </div>
          )}
        </SectionGroup>
      </div>
    </DetailModal>
  );
};

export default SprintDetail;
