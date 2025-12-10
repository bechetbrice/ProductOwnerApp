import { memo } from 'react';
import { Eye } from 'lucide-react';
import StoryOutcomeBadge from '../UserStories/StoryOutcomeBadge';
import { BoardCard } from '../ui';

/**
 * SprintBoardCard - Carte pour le tableau Kanban des sprints
 * Footer simplifié avec 1 seul bouton View
 */
const SprintBoardCard = ({ story, contacts, products, onViewDetails }) => {
  // Trouver le produit lié
  const product = products?.find(p => p.id === story.productId);
  
  // Trouver les stakeholders
  const stakeholders = story.stakeholderIds
    ?.map(id => contacts?.find(c => c.id === id))
    .filter(Boolean)
    .slice(0, 3) || [];

  // Badges
  const badges = [];
  if (product) {
    badges.push(
      <span 
        key="product"
        className="px-2 py-1 rounded text-sm font-bold text-white"
        style={{ backgroundColor: product.color }}
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
    e.preventDefault();
    onViewDetails();
    }}
    className="p-3 sm:p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors active:scale-95"
    title="Voir les détails"
    aria-label={`Voir la story ${story.title}`}
    >
    <Eye className="w-5 h-5 sm:w-4 sm:h-4" />
    </button>
  ];

  return (
    <BoardCard
      badges={badges}
      actions={actions}
    >
      <div className="space-y-2">
        <h3 className="text-sm text-gray-800 italic">« {story.title} »</h3>
        
        {/* Stakeholders (si présents) */}
        {stakeholders.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            {stakeholders.length === 1 ? (
              <>
                <span className="flex-shrink-0">👤</span>
                <span className="truncate">{stakeholders[0].name}</span>
              </>
            ) : (
              <>
                <span className="flex-shrink-0">👥</span>
                <span>{stakeholders.length} stakeholders</span>
              </>
            )}
          </div>
        )}
      </div>
    </BoardCard>
  );
};

export default memo(SprintBoardCard);
