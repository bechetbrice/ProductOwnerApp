import { Eye, Calendar } from 'lucide-react';
import { DetailModal, SectionGroup, InfoField } from '../ui';

/**
 * ProductDetail - Modale de visualisation complète d'un produit
 * 
 * Version sobre et standardisée (alignée sur ContactDetail/TeamDetail) :
 * - En-tête unifié avec badges intégrés
 * - Typographie uniformisée (text-sm partout)
 * - Moins de bold, plus de font-medium
 * - Palette de couleurs réduite (bg-gray-50 + border-gray-200)
 * - Design épuré et professionnel
 * - Sans traits de séparation entre sections
 * 
 * @component
 */
const ProductDetail = ({
  product,
  contacts,
  onClose,
  onEdit
}) => {
  if (!product) return null;

  const statusConfig = {
    draft: { label: 'Brouillon', badgeClass: 'bg-gray-100 text-gray-700' },
    active: { label: 'Actif', badgeClass: 'bg-green-100 text-green-700' },
    archived: { label: 'Archivé', badgeClass: 'bg-gray-100 text-gray-700' }
  };

  const statusInfo = statusConfig[product.status] || statusConfig.active;

  // Récupérer le Product Owner depuis les contacts
  const productOwner = product.ownerId 
    ? contacts.find(c => c.id === product.ownerId)
    : null;

  // Récupérer les clients depuis les contacts
  const clients = product.clientIds 
    ? product.clientIds.map(id => contacts.find(c => c.id === id)).filter(Boolean)
    : [];

  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const hasAnyDate = product.startDate || product.plannedEndDate || product.expectedEndDate || product.actualEndDate;

  return (
    <DetailModal
      isOpen={true}
      title="Détails du produit"
      icon={Eye}
      onClose={onClose}
      onEdit={() => onEdit(product)}
      size="lg"
    >
      <div className="space-y-6">
        {/* EN-TÊTE : Nom + Badges (Code + Statut) */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">{product.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Badge Code Produit avec couleur custom */}
            <span 
              className="px-2.5 py-1 rounded text-xs font-medium text-white"
              style={{ backgroundColor: product.color }}
            >
              {product.code}
            </span>
            
            {/* Badge Statut */}
            <span className={`px-2.5 py-1 rounded text-xs font-medium ${statusInfo.badgeClass}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>

        {/* Section 1 : Description */}
        <SectionGroup title="Description" emoji="📝" variant="plain">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            {product.description ? (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{product.description}</p>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucune description</p>
            )}
          </div>
        </SectionGroup>

        {/* Section 2 : Client(s) */}
        {clients.length > 0 && (
          <SectionGroup title="Client(s)" emoji="👥" variant="plain">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="flex flex-wrap gap-3">
                {clients.map(client => (
                  <div
                    key={client.id}
                    className="bg-white p-3 rounded border border-gray-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{client.name}</p>
                      {client.role && (
                        <p className="text-xs text-gray-600">{client.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 3 : Product Owner */}
        {productOwner && (
          <SectionGroup title="Product Owner" emoji="👤" variant="plain">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">{productOwner.name}</p>
                  {productOwner.role && (
                    <p className="text-xs text-gray-600">{productOwner.role}</p>
                  )}
                </div>
              </div>
            </div>
          </SectionGroup>
        )}

        {/* Section 4 : Dates du projet */}
        <SectionGroup title="Dates du projet" emoji="📅" variant="plain">
          {hasAnyDate ? (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date de début */}
                {product.startDate && (
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Date de début
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(product.startDate)}
                    </p>
                  </div>
                )}

                {/* Date de fin prévue */}
                {product.plannedEndDate && (
                  <div className="bg-white p-3 rounded border-l-4 border-l-teal-500 border-t border-r border-b border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Date de fin prévue
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(product.plannedEndDate)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Planning initial</p>
                  </div>
                )}

                {/* Date de fin attendue */}
                {product.expectedEndDate && (
                  <div className="bg-white p-3 rounded border-l-4 border-l-orange-500 border-t border-r border-b border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Date de fin attendue
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(product.expectedEndDate)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Estimation actuelle</p>
                  </div>
                )}

                {/* Date de fin réelle */}
                {product.actualEndDate && (
                  <div className="bg-white p-3 rounded border-l-4 border-l-green-500 border-t border-r border-b border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Date de fin réelle
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(product.actualEndDate)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Livraison effective</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-sm text-gray-500 italic">Aucune date renseignée</p>
            </div>
          )}
        </SectionGroup>
      </div>
    </DetailModal>
  );
};

export default ProductDetail;
