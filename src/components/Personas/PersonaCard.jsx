import { memo } from 'react';
import { Star } from 'lucide-react';
import { CardHeader, CardFooter } from '../ui/Card/index';

/**
 * PersonaCard - Carte d'affichage d'un persona
 * 
 * @param {Object} props
 * @param {Object} props.persona - Données du persona
 * @param {Array} props.products - Liste des produits
 * @param {Function} props.onView - Callback voir détails
 * @param {Function} props.onEdit - Callback éditer
 * @param {Function} props.onDelete - Callback supprimer
 */
const PersonaCard = ({ persona, products, onView, onEdit, onDelete }) => {
  const product = products.find(p => p.id === persona.productId);

  // Badge du footer
  const footerBadges = (
    <>
      {persona.isPrimary && (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
          <Star className="w-3.5 h-3.5 fill-current" />
          Primaire
        </span>
      )}
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header standardisé - UNIQUEMENT le nom */}
      <CardHeader title={persona.name} />

      {/* Corps de la carte */}
      <div className="p-5 flex-1 space-y-3">
        {/* Avatar + Rôle + Âge */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl flex-shrink-0">
            {persona.avatar || '👤'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{persona.role}</p>
            {persona.age && (
              <p className="text-sm text-gray-500 mt-1">{persona.age} ans</p>
            )}
          </div>
        </div>
        
        {/* Quote */}
        {persona.quote && (
          <p className="text-sm text-gray-600 italic">« {persona.quote} »</p>
        )}

        {/* Objectifs */}
        {persona.goals && persona.goals.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
              🎯 Objectifs
            </p>
            <div className="space-y-2">
              {persona.goals.filter(g => g.trim() !== '').map((goal, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-gray-600 flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-sm text-gray-600 flex-1">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer standardisé - Badge produit + badge primaire + 3 boutons */}
      <CardFooter
        product={product}
        badges={footerBadges}
        onView={() => onView(persona)}
        onEdit={() => onEdit(persona)}
        onDelete={() => onDelete(persona.id)}
        viewLabel={`Voir les détails de ${persona.name}`}
        editLabel={`Modifier ${persona.name}`}
        deleteLabel={`Supprimer ${persona.name}`}
      />
    </div>
  );
};

export default memo(PersonaCard);
