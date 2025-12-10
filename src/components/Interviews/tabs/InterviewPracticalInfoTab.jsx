import { Calendar, Clock, MapPin, Target } from 'lucide-react';
import { STATUS_CONFIG, TYPE_CONFIG } from '../../../constants/interviewConfig';
import { formatDateShort, formatTime } from '../../../utils/dateHelpers';

/**
 * Onglet 1 : Informations pratiques (readonly)
 * @component
 */
const InterviewPracticalInfoTab = ({ 
  interview, 
  product, 
  interviewedContacts,
  statusConfig,
  typeConfig 
}) => {
  return (
    <div className="space-y-6">
      
      {/* EN-TÊTE : Titre + Badge Type */}
      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg font-medium text-gray-900">{interview.title}</h3>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium ${typeConfig.badgeClass}`}>
            {typeConfig.emoji} {typeConfig.label}
          </span>
        </div>
      </div>

      {/* 1. Produit associé */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">📦 Produit associé</h3>
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
          {product ? (
            <div className="flex items-center gap-2">
              <span 
                className="px-2 py-0.5 rounded text-xs font-medium text-white"
                style={{ backgroundColor: product.color }}
              >
                {product.code}
              </span>
              <span className="text-sm text-gray-700">
                {product.name}
              </span>
            </div>
          ) : interview.productId ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-sm font-medium text-yellow-800">Produit introuvable</span>
              </div>
              <p className="text-xs text-yellow-700">
                ID: {interview.productId}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Le produit a peut-être été supprimé ou archivé.
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Aucun produit associé</p>
          )}
        </div>
      </div>

      {/* 2. Participants */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">👥 Participants</h3>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {interviewedContacts.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {interviewedContacts.map(contact => (
                <div key={contact.id} className="px-3 py-2 bg-white rounded-lg border border-emerald-200">
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  {contact.role && (
                    <p className="text-xs text-gray-500 mt-0.5">{contact.role}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Aucun participant</p>
          )}
        </div>
      </div>

      {/* 3. Organisation (Planning + Statut) */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">📅 Organisation</h3>
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar size={12} />
                Date et heure
              </label>
              <p className="text-sm text-gray-900">
                {interview.scheduledDate ? (
                  <span className="flex items-center gap-2">
                    <span>{formatDateShort(interview.scheduledDate)}</span>
                    <span className="text-sm text-gray-600">{formatTime(interview.scheduledDate)}</span>
                  </span>
                ) : (
                  <span className="text-gray-500 italic">Non planifié</span>
                )}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Clock size={12} />
                Durée
              </label>
              <p className="text-sm text-gray-900">
                {interview.duration ? `${interview.duration} min` : <span className="text-gray-500 italic">Non spécifié</span>}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin size={12} />
                Lieu
              </label>
              <p className="text-sm text-gray-900">
                {interview.location || <span className="text-gray-500 italic">Non spécifié</span>}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Statut</label>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.badgeClass}`}>
                {statusConfig.emoji} {statusConfig.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Notes de préparation */}
      {interview.generalNotes && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">📝 Notes de préparation</h3>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{interview.generalNotes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPracticalInfoTab;
