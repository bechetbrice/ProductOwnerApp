import { Eye, CheckCircle, TrendingUp } from 'lucide-react';
import { DetailModal, SectionGroup, InfoField } from '../ui';

/**
 * ObjectiveDetail - Modale de visualisation complète d'un objectif produit
 * 
 * Version sobre et standardisée (alignée sur ContactDetail/TeamDetail) :
 * - En-tête unifié avec titre et badges intégrés
 * - Typographie uniformisée (text-sm partout)
 * - Moins de bold, plus de font-medium
 * - Palette de couleurs réduite (bg-gray-50 + border-gray-200)
 * - Design épuré et professionnel
 * - Sans traits de séparation entre sections
 * 
 * @component
 */
const ObjectiveDetail = ({
  objective,
  product,
  onClose,
  onEdit
}) => {
  if (!objective) return null;

  const statusConfig = {
    planned: { label: 'Planifié', badgeClass: 'bg-teal-100 text-teal-700' },
    active: { label: 'Actif', badgeClass: 'bg-green-100 text-green-700' },
    completed: { label: 'Terminé', badgeClass: 'bg-cyan-100 text-cyan-700' },
    cancelled: { label: 'Annulé', badgeClass: 'bg-red-100 text-red-700' }
  };

  const priorityConfig = {
    critical: { label: 'Critique', badgeClass: 'bg-red-100 text-red-700' },
    high: { label: 'Haute', badgeClass: 'bg-orange-100 text-orange-700' },
    medium: { label: 'Moyenne', badgeClass: 'bg-yellow-100 text-yellow-700' },
    low: { label: 'Basse', badgeClass: 'bg-gray-100 text-gray-700' }
  };

  const statusInfo = statusConfig[objective.status] || statusConfig.planned;
  const priorityInfo = priorityConfig[objective.priority] || priorityConfig.medium;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const hasAnyDate = objective.startDate || objective.targetDate;

  return (
    <DetailModal
      isOpen={true}
      title="Détails de l'objectif"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(objective)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Titre + Badges (Statut + Priorité + Produit) */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {/* Ligne 1 : Titre */}
          <h3 className="text-lg font-medium text-gray-900 mb-3">{objective.title}</h3>
          
          {/* Ligne 2 : Badges Statut + Priorité + Produit */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${statusInfo.badgeClass}`}>
              {statusInfo.label}
            </span>
            
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${priorityInfo.badgeClass}`}>
              {priorityInfo.label}
            </span>
            
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

        {/* Section 1 : Dates */}
        {hasAnyDate && (
          <SectionGroup title="Dates" emoji="📅" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date de début */}
                {objective.startDate && (
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Date de début
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(objective.startDate)}
                    </p>
                  </div>
                )}

                {/* Date d'échéance */}
                {objective.targetDate && (
                  <div className="bg-white p-3 rounded border-l-4 border-l-orange-500 border-t border-r border-b border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Date d'échéance
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(objective.targetDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 2 : Description */}
        <SectionGroup title="Description" emoji="📝" variant="plain">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {objective.description ? (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{objective.description}</p>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucune description</p>
            )}
          </div>
        </SectionGroup>

        {/* Section 3 : Critères de succès */}
        {objective.successCriteria && (
          <SectionGroup title="Critères de succès" emoji="✅" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <ul className="space-y-2">
                {objective.successCriteria.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-700 flex-shrink-0">✓</span>
                    <span className="flex-1">{line.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionGroup>
        )}

        {/* Section 4 : KPIs */}
        {objective.kpis && (
          <SectionGroup title="Indicateurs de performance (KPIs)" emoji="📈" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <ul className="space-y-2">
                {objective.kpis.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-700 flex-shrink-0">✓</span>
                    <span className="flex-1">{line.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionGroup>
        )}
      </div>
    </DetailModal>
  );
};

export default ObjectiveDetail;
