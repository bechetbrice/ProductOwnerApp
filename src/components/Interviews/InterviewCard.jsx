import { memo } from 'react';
import { CardHeader, CardFooter } from '../ui/Card/index';
import { STATUS_CONFIG, TYPE_CONFIG } from '../../constants/interviewConfig';
import { formatDateMedium } from '../../utils/dateHelpers';

/**
 * InterviewCard - Carte d'affichage pour un entretien
 * 
 * Composant responsable de l'affichage d'une carte entretien avec :
 * - Informations principales (titre, contact, date, durée)
 * - Badges type et statut
 * - Actions (voir, modifier, supprimer)
 * 
 * @component
 */
const InterviewCard = ({ 
  interview, 
  interviewedContacts = [],
  product,
  onView, 
  onUpdate, 
  onDelete
}) => {
  const statusConfig = STATUS_CONFIG[interview.status] || STATUS_CONFIG.scheduled;
  const typeConfig = TYPE_CONFIG[interview.type] || { 
    label: 'Inconnu', 
    emoji: '❓', 
    color: '#6B7280',
    badgeClass: 'bg-gray-100 text-gray-700'
  };

  // Badges du footer
  const footerBadges = (
    <>
      <span className={`px-2 py-1 rounded-full text-sm font-medium whitespace-nowrap ${statusConfig.badgeClass}`}>
        {statusConfig.label}
      </span>
      <span 
        className={`px-2 py-1 rounded-full text-sm font-medium whitespace-nowrap ${typeConfig.badgeClass}`}
      >
        {typeConfig.emoji} {typeConfig.label}
      </span>
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le titre */}
      <CardHeader title={interview.title} />

      {/* Corps */}
      <div className="p-5 flex-1 space-y-3">
        {/* Contacts interviewés */}
        {interviewedContacts.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex-shrink-0 text-sm">👤</span>
            {interviewedContacts.map((contact, index) => (
              <span key={contact.id} className="text-sm text-gray-600">
                {contact.name}
                {index < interviewedContacts.length - 1 && ', '}
              </span>
            ))}
          </div>
        )}

        {/* Objectif */}
        {interview.objectives && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">🎯 Objectif</p>
            <p className="text-sm text-gray-600 line-clamp-2">{interview.objectives}</p>
          </div>
        )}

        {/* Informations principales */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date avec emoji */}
          <div className="flex items-center gap-1">
            <span className="flex-shrink-0">📅</span>
            {interview.scheduledDate ? (
              <a
                href={`ms-outlook://calendar/action/new?startdt=${new Date(interview.scheduledDate).toISOString()}&subject=${encodeURIComponent(interview.title)}&body=${encodeURIComponent(interview.objectives || '')}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer truncate"
                title="Cliquer pour ouvrir dans le Calendrier"
              >
                {formatDateMedium(interview.scheduledDate)}
              </a>
            ) : (
              <span className="text-sm text-gray-500">{formatDateMedium(interview.scheduledDate)}</span>
            )}
          </div>
        </div>


      </div>

      {/* Footer standardisé - Badge produit + badges + 3 boutons */}
      <CardFooter
        product={product}
        badges={footerBadges}
        onView={() => onView(interview, 'view')} // Ouvre "Détail de l'entretien" (mode consultation)
        onEdit={() => onView(interview, 'edit')} // Ouvre "Suivi de l'entretien" (mode édition)
        onDelete={() => onDelete(interview.id)}
        viewLabel={`Consulter l'entretien ${interview.title}`}
        editLabel={`Modifier l'entretien ${interview.title}`}
        deleteLabel={`Supprimer l'entretien ${interview.title}`}
      />
    </div>
  );
};

export default memo(InterviewCard);
