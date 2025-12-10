import { Eye } from 'lucide-react';
import { DetailModal, SectionGroup, InfoField } from '../ui';

/**
 * PersonaDetail - Modale de visualisation complète d'un persona
 * 
 * Version sobre et standardisée (alignée sur ContactDetail/TeamDetail) :
 * - En-tête unifié avec avatar et badges intégrés
 * - Typographie uniformisée (text-sm partout)
 * - Moins de bold, plus de font-medium
 * - Palette de couleurs réduite (bg-gray-50 + border-gray-200)
 * - Design épuré et professionnel
 * - Sans traits de séparation entre sections
 * 
 * @component
 */
const PersonaDetail = ({ 
  persona, 
  products = [],
  onClose, 
  onEdit 
}) => {
  if (!persona) return null;

  const product = products.find(p => p.id === persona.productId);

  const getTechLevelLabel = (level) => {
    const labels = {
      novice: 'Débutant',
      intermediate: 'Intermédiaire',
      expert: 'Expert'
    };
    return labels[level] || level;
  };

  const getUsageFrequencyLabel = (frequency) => {
    const labels = {
      daily: 'Quotidien',
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      occasional: 'Occasionnel'
    };
    return labels[frequency] || frequency;
  };

  return (
    <DetailModal
      isOpen={true}
      title="Détails du persona"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(persona)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Avatar + Nom + Badges */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              {persona.avatar || '👤'}
            </div>
            <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900">{persona.name}</h3>
                {persona.role && (
                  <p className="text-sm text-gray-600">{persona.role}</p>
                )}
              </div>
              {/* Badge Type Persona */}
              <span className={`px-2.5 py-1 rounded text-xs font-medium flex-shrink-0 ${
                persona.isPrimary ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {persona.isPrimary ? '⭐ Primaire' : 'Secondaire'}
              </span>
            </div>
          </div>
          
          {/* Badge Produit */}
          {product && (
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
          )}
        </div>

        {/* Section 1 : Profil démographique */}
        {(persona.age || persona.demographic) && (
          <SectionGroup title="Profil démographique" emoji="👥" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
              {persona.age && (
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">Âge</span>
                  <span className="text-gray-900 font-medium">{persona.age}</span>
                </div>
              )}
              {persona.demographic && (
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">Démographie</span>
                  <span className="text-gray-900 font-medium">{persona.demographic}</span>
                </div>
              )}
            </div>
          </SectionGroup>
        )}

        {/* Section 2 : Citation */}
        {persona.quote && (
          <SectionGroup title="Citation" emoji="💬" variant="plain">
            <div className="bg-emerald-50 border-l-4 border-emerald-300 rounded-lg p-4 border-t border-r border-b border-emerald-100">
              <p className="text-sm text-gray-700 italic">"{persona.quote}"</p>
            </div>
          </SectionGroup>
        )}

        {/* Section 3 : Contexte Professionnel */}
        {(persona.company || persona.seniority || persona.teamSize) && (
          <SectionGroup title="Contexte Professionnel" emoji="💼" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-2">
              {persona.company && (
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">Type d'entreprise</span>
                  <span className="text-gray-900 font-medium">{persona.company}</span>
                </div>
              )}
              {persona.seniority && (
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">Expérience</span>
                  <span className="text-gray-900 font-medium">{persona.seniority}</span>
                </div>
              )}
              {persona.teamSize && (
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">Taille équipe</span>
                  <span className="text-gray-900 font-medium">{persona.teamSize}</span>
                </div>
              )}
            </div>
          </SectionGroup>
        )}

        {/* Section 4 : Objectifs */}
        {persona.goals && persona.goals.length > 0 && (
          <SectionGroup title="Objectifs" emoji="🎯" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <ul className="space-y-2">
                {persona.goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-700 mt-0.5 flex-shrink-0">✓</span>
                    <span className="flex-1">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionGroup>
        )}

        {/* Section 5 : Frustrations */}
        {persona.frustrations && persona.frustrations.length > 0 && (
          <SectionGroup title="Frustrations" emoji="😞" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <ul className="space-y-2">
                {persona.frustrations.map((frustration, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-700 mt-0.5 flex-shrink-0">✓</span>
                    <span className="flex-1">{frustration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionGroup>
        )}

        {/* Section 6 : Motivations */}
        {persona.motivations && persona.motivations.length > 0 && (
          <SectionGroup title="Motivations" emoji="💡" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <ul className="space-y-2">
                {persona.motivations.map((motivation, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-700 mt-0.5 flex-shrink-0">✓</span>
                    <span className="flex-1">{motivation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionGroup>
        )}

        {/* Section 7 : Usage & Compétences */}
        {(persona.techLevel || persona.usageFrequency) && (
          <SectionGroup title="Usage & Compétences" emoji="📱" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="flex flex-wrap gap-2">
                {persona.techLevel && (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                    Niveau : {getTechLevelLabel(persona.techLevel)}
                  </span>
                )}
                {persona.usageFrequency && (
                  <span className="px-2.5 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                    Fréquence : {getUsageFrequencyLabel(persona.usageFrequency)}
                  </span>
                )}
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 8 : Environnement */}
        {persona.environment && (
          <SectionGroup title="Environnement" emoji="🌍" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-sm text-gray-700">{persona.environment}</p>
            </div>
          </SectionGroup>
        )}

        {/* Section 9 : Canaux préférés */}
        {persona.preferredChannels && persona.preferredChannels.length > 0 && (
          <SectionGroup title="Canaux préférés" emoji="💬" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="flex flex-wrap gap-2">
                {persona.preferredChannels.map((channel, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 10 : Appareils */}
        {persona.devices && persona.devices.length > 0 && (
          <SectionGroup title="Appareils" emoji="💻" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="flex flex-wrap gap-2">
                {persona.devices.map((device, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                    {device}
                  </span>
                ))}
              </div>
            </div>
          </SectionGroup>
        )}
      </div>
    </DetailModal>
  );
};

export default PersonaDetail;
