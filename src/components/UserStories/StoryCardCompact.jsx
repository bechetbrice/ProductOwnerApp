import { memo } from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import StoryOutcomeBadge from './StoryOutcomeBadge';
import { BoardCard } from '../ui';

/**
 * StoryCardCompact - Carte story simplifiée (v4.4.1)
 * Affiche : Badge Produit + Outcome → Titre généré → Badge Numéro + Titre court + 3 icônes
 */
const StoryCardCompact = ({ 
  story, 
  products,
  onEdit,
  onView,
  onDelete
}) => {
  const product = products.find(p => p.id === story.productId);

  // Titre principal : titre généré (automatique)
  const mainTitle = story.title || 'Story sans titre';
  
  // Titre court : manuel (optionnel)
  const shortTitle = story.storyTitle;

  const handleDelete = (e) => {
    e.stopPropagation();
    // Appeler onDelete avec la story entière pour permettre la confirmation
    onDelete && onDelete(story);
  };

  // Badges
  const badges = [];
  if (product) {
    badges.push(
      <span 
        key="product"
        className="inline-block px-2 py-1 rounded text-sm font-bold text-white"
        style={{ backgroundColor: product.color }}
        title={product.name}
      >
        {product.code}
      </span>
    );
  }
  if (story.outcome) {
    badges.push(
      <StoryOutcomeBadge key="outcome" outcome={story.outcome} size="small" showLabel={true} />
    );
  }

  // Actions - ✅ RESPONSIVE : Touch targets optimisés (44px mobile)
  const actions = [
    <button
      key="view"
      onClick={(e) => {
        e.stopPropagation();
        onView && onView(story);
      }}
      className="p-3 sm:p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors active:scale-95"
      title="Voir détails"
      aria-label={`Voir les détails de ${mainTitle}`}
    >
      <Eye className="w-5 h-5 sm:w-4 sm:h-4" />
    </button>,
    <button
      key="edit"
      onClick={(e) => {
        e.stopPropagation();
        onEdit && onEdit(story);
      }}
      className="p-3 sm:p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors active:scale-95"
      title="Modifier"
      aria-label={`Modifier ${mainTitle}`}
    >
      <Edit2 className="w-5 h-5 sm:w-4 sm:h-4" />
    </button>,
    <button
      key="delete"
      onClick={handleDelete}
      className="p-3 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
      title="Supprimer"
      aria-label={`Supprimer ${mainTitle}`}
    >
      <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" />
    </button>
  ];

  return (
    <BoardCard
      badges={badges}
      actions={actions}
      className={story.status && story.status !== 'unassigned' ? 'opacity-70' : ''}
    >
      <div>
        <h3 className="text-sm text-gray-800 italic">
          « {mainTitle} »
        </h3>

        {/* Ligne 2 : Badge Numéro + Titre court */}
        {(story.storyNumber || shortTitle) && (
          <div className="mt-2 flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {story.storyNumber && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded flex-shrink-0">
                #{story.storyNumber}
              </span>
            )}
            {shortTitle && (
              <span className="text-sm text-gray-600 truncate" title={shortTitle}>
                {shortTitle}
              </span>
            )}
          </div>
        )}
      </div>
    </BoardCard>
  );
};

export default memo(StoryCardCompact);
