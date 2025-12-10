import { User, Mail, Phone, Award, Users, Eye } from 'lucide-react';
import { CONTACT_TYPE_LABELS, CONTACT_TYPE_COLORS } from '../../utils/constants';
import { DetailModal, SectionGroup, InfoField } from '../ui';

/**
 * ContactDetail - Modale de visualisation complète d'un contact
 * 
 * Version sobre et standardisée :
 * - Typographie uniformisée (text-sm partout)
 * - Moins de bold, plus de font-medium
 * - Palette de couleurs réduite
 * - Design épuré et professionnel
 * - Sans traits de séparation entre sections
 * 
 * @component
 */
const ContactDetail = ({
  contact,
  products,
  onClose,
  onEdit
}) => {
  if (!contact) return null;

  const seniorityConfig = {
    junior: { label: 'Junior', badgeClass: 'bg-gray-100 text-gray-700' },
    intermediate: { label: 'Intermédiaire', badgeClass: 'bg-teal-100 text-teal-700' },
    senior: { label: 'Senior', badgeClass: 'bg-cyan-100 text-cyan-700' },
    expert: { label: 'Expert', badgeClass: 'bg-emerald-100 text-emerald-700' }
  };

  const contractTypeLabels = {
    cdi: 'CDI',
    cdd: 'CDD',
    freelance: 'Freelance',
    intern: 'Stagiaire',
    apprentice: 'Alternant'
  };

  const seniorityInfo = seniorityConfig[contact.seniority] || seniorityConfig.intermediate;
  const hasTeamFields = contact.skills?.length > 0 || contact.capacity || contact.contractType || contact.seniority !== 'intermediate';
  
  const calculateAdjustedCapacity = () => {
    if (!contact.capacity) return 0;
    return Math.round(
      (contact.capacity * (contact.availability ?? 100) * (contact.workload ?? 100)) / 10000
    );
  };

  return (
    <DetailModal
      isOpen={true}
      title="Détails du contact"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(contact)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Nom + Badges (sobre, sans gradient) */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">{contact.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${CONTACT_TYPE_COLORS[contact.type]}`}>
              {CONTACT_TYPE_LABELS[contact.type]}
            </span>
            
            {hasTeamFields && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                <Users className="w-3 h-3" />
                Membre Équipe
              </span>
            )}
            
            {hasTeamFields && contact.isActive && contact.isAvailable && (
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                ✓ Disponible
              </span>
            )}
          </div>
        </div>

        {/* Section 1 : Rôle & Organisation */}
        <SectionGroup title="Rôle & Organisation" emoji="💼" variant="plain">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-teal-50 p-3 rounded border border-teal-100">
              <p className="text-sm text-gray-900">{contact.role}</p>
            </div>
            
            {(contact.company || contact.department) && (
              <div className="bg-teal-50 p-3 rounded border border-teal-100">
                <p className="text-sm text-gray-900">
                  {contact.company || contact.department}
                </p>
              </div>
            )}
          </div>
        </SectionGroup>

        {/* Section 2 : Coordonnées */}
        <SectionGroup title="Coordonnées" emoji="📞" variant="plain">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contact.email && (
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{contact.email}</span>
                </a>
              )}
              
              {contact.phone && (
                <a 
                  href={`tel:${contact.phone}`}
                  className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </a>
              )}
            </div>
          </div>
        </SectionGroup>

        {/* Section 3 : Produits associés */}
        {contact.productIds && contact.productIds.length > 0 && (
          <SectionGroup title="Produits associés" emoji="📦" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="flex flex-wrap gap-3">
                {contact.productIds.map(productId => {
                  const product = products.find(p => p.id === productId);
                  return product ? (
                    <div key={productId} className="flex items-center gap-2">
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
                  ) : null;
                })}
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 4 : Informations Équipe */}
        {hasTeamFields && (
          <SectionGroup title="Informations Équipe" emoji="👥" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-3">
              {/* Badges : Niveau, Contrat, Compétences */}
              {(contact.seniority || contact.contractType || (contact.skills && contact.skills.length > 0)) && (
                <div className="flex flex-wrap gap-2">
                  {/* Badge Seniority */}
                  {contact.seniority && (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium ${seniorityInfo.badgeClass}`}>
                      <Award className="w-3 h-3" />
                      {seniorityInfo.label}
                    </span>
                  )}
                  
                  {/* Badge Contrat */}
                  {contact.contractType && (
                    <span className="px-2.5 py-1 rounded text-xs font-medium bg-teal-100 text-teal-700">
                      {contractTypeLabels[contact.contractType] || contact.contractType}
                    </span>
                  )}

                  {/* Badges Compétences */}
                  {contact.skills && contact.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Capacité */}
              {contact.capacity > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Capacité & Disponibilité
                  </p>
                  <div className="bg-white rounded border border-gray-200 p-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="text-center p-2">
                        <p className="text-xs text-gray-500 mb-1">Capacité théorique</p>
                        <p className="text-base font-medium text-gray-900">{contact.capacity}</p>
                        <p className="text-xs text-gray-500">pts/sprint</p>
                      </div>
                      <div className="text-center p-2">
                        <p className="text-xs text-gray-500 mb-1">Disponibilité</p>
                        <p className="text-base font-medium text-teal-600">{contact.availability || 100}%</p>
                      </div>
                      <div className="text-center p-2">
                        <p className="text-xs text-gray-500 mb-1">Charge actuelle</p>
                        <p className="text-base font-medium text-orange-600">{contact.workload || 100}%</p>
                      </div>
                    </div>
                    <div className="text-center pt-3 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        Capacité ajustée
                      </p>
                      <p className="text-xl font-medium text-emerald-600">
                        {calculateAdjustedCapacity()} <span className="text-sm">pts/sprint</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SectionGroup>
        )}

        {/* Section 5 : Notes */}
        <SectionGroup title="Notes" emoji="📝" variant="plain">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            {contact.notes ? (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.notes}</p>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucune note</p>
            )}
          </div>
        </SectionGroup>
      </div>
    </DetailModal>
  );
};

export default ContactDetail;
