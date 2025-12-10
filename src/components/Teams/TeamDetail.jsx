import { Users, TrendingUp, Award, Eye, Mail } from 'lucide-react';
import { DetailModal, SectionGroup, InfoField } from '../ui';

/**
 * TeamDetail - Modale de visualisation complète d'une équipe
 * 
 * Version sobre et standardisée (alignée sur ContactDetail) :
 * - Typographie uniformisée (text-sm partout)
 * - Moins de bold, plus de font-medium
 * - Palette de couleurs réduite
 * - Design épuré et professionnel
 * - Sans traits de séparation entre sections
 * - Focus sur les informations essentielles
 * 
 * @component
 */
const TeamDetail = ({ team, contacts, products, onClose, onEdit }) => {
  if (!team) return null;

  // Obtenir contact complet
  const getContact = (contactId) => {
    return contacts.find(c => c.id === contactId);
  };

  // Calculer capacité membre
  const getMemberCapacity = (contactId) => {
    const contact = getContact(contactId);
    if (!contact || !contact.capacity) return 0;
    
    return Math.round((contact.capacity * (contact.availability ?? 100) * (contact.workload ?? 100)) / 10000);
  };

  // Badge seniority
  const getSeniorityBadge = (seniority) => {
    if (!seniority) return null;
    
    const badges = {
      junior: { label: 'Junior', color: 'bg-gray-100 text-gray-700' },
      intermediate: { label: 'Intermédiaire', color: 'bg-teal-100 text-teal-700' },
      senior: { label: 'Senior', color: 'bg-cyan-100 text-cyan-700' },
      expert: { label: 'Expert', color: 'bg-emerald-100 text-emerald-700' }
    };
    
    const badge = badges[seniority] || badges.intermediate;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium ${badge.color}`}>
        <Award className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const memberCount = team.memberContactIds?.length || 0;

  return (
    <DetailModal
      isOpen={true}
      title="Détails de l'équipe"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(team)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Nom + Statut */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">{team.name}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${
              team.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {team.status === 'active' ? '✓ Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Section 1 : Produits associés */}
        {team.productIds && team.productIds.length > 0 && (
          <SectionGroup title="Produits associés" emoji="📦" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="flex flex-wrap gap-3">
                {team.productIds.map(productId => {
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

        {/* Section 2 : Description */}
        {team.description && (
          <SectionGroup title="Description" emoji="📝" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{team.description}</p>
            </div>
          </SectionGroup>
        )}

        {/* Section 3 : Membres de l'équipe */}
        {team.memberContactIds && team.memberContactIds.length > 0 && (
          <SectionGroup title={`Membres de l'équipe (${memberCount})`} emoji="👥" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-3">
              {team.memberContactIds.map(contactId => {
                const contact = getContact(contactId);
                if (!contact) return null;
                
                const capacity = getMemberCapacity(contactId);
                const isLead = team.leadContactId === contactId;

                return (
                  <div 
                    key={contactId}
                    className="bg-white p-3 rounded border border-gray-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Nom et badges statut */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h4 className="text-sm font-medium text-gray-900">{contact.name}</h4>
                          {isLead && (
                            <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-xs font-medium">
                              Team Lead
                            </span>
                          )}
                        </div>
                        
                        {/* Rôle */}
                        {contact.role && (
                          <p className="text-sm text-gray-600 mb-2">{contact.role}</p>
                        )}
                        
                        {/* Badges : Seniority, Statut, Compétences */}
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {contact.seniority && getSeniorityBadge(contact.seniority)}
                          
                          {contact.isActive && (
                            <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              ✓ Actif
                            </span>
                          )}
                          
                          {contact.isAvailable && contact.isActive && (
                            <span className="px-2.5 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                              Disponible
                            </span>
                          )}
                        </div>
                        
                        {/* Compétences */}
                        {contact.skills && contact.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {contact.skills.slice(0, 4).map((skill, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {contact.skills.length > 4 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                +{contact.skills.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Département et Email */}
                        {(contact.department || contact.email) && (
                          <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                            {contact.department && (
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Département:</span>
                                <span>{contact.department}</span>
                              </div>
                            )}
                            {contact.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <a href={`mailto:${contact.email}`} className="hover:text-emerald-600 truncate">
                                  {contact.email}
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Capacité */}
                      {capacity > 0 && (
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl font-medium text-emerald-600">{capacity}</p>
                          <p className="text-xs text-gray-500">pts/sprint</p>
                          {contact.capacity && (
                            <p className="text-xs text-gray-400 mt-1">
                              {contact.capacity} × {contact.availability}% × {contact.workload}%
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionGroup>
        )}
      </div>
    </DetailModal>
  );
};

export default TeamDetail;
