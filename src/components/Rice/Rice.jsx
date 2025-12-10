import { useState, useMemo } from 'react';
import { Eye, Lightbulb, AlertCircle } from 'lucide-react';
import { filterEnrichedNeeds } from '../../utils/analysis/needEnrichment';
import UserNeedDetail from '../UserNeeds/UserNeedDetail';
import { EmptyState, BoardCard } from '../ui';
import ProductSelector from '../Common/ProductSelector';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

/**
 * Rice - Module Matrice de Priorisation RICE
 * Matrice Importance × Effort avec quadrants stratégiques
 * Focus : Évaluation et Priorisation uniquement
 * 
 * @version 4.3.0 - Simplification interface (suppression FilterBar)
 */
const Rice = ({ 
  enrichedNeeds,
  userNeeds,
  userStories,
  contacts,
  personas,
  products,
  interviews = [],
  Objectives = [],
  onNavigate,
  onUpdateNeed,
  showTips = false
}) => {
  const [productFilter, setProductFilter] = useState('all');
  const [viewingNeed, setViewingNeed] = useState(null);

  // Grouper par quadrant pré-calculé
  const quadrants = useMemo(() => {
    const filtered = filterEnrichedNeeds(enrichedNeeds, {
      productId: productFilter !== 'all' ? productFilter : undefined
    });

    return {
      quickWins: filtered.filter(n => n.enrichment.quadrant === 'quickWins'),
      strategic: filtered.filter(n => n.enrichment.quadrant === 'strategic'),
      fillIns: filtered.filter(n => n.enrichment.quadrant === 'fillIns'),
      timeSinks: filtered.filter(n => n.enrichment.quadrant === 'timeSinks')
    };
  }, [enrichedNeeds, productFilter]);

  const getLinkedStories = (needId) => {
    return userStories.filter(story => story.linkedNeedId === needId);
  };

  // Card harmonisée avec BoardCard
  const NeedCard = ({ need }) => {
    const addressed = need.enrichment.isAddressed;
    const linkedStories = getLinkedStories(need.id);
    const product = products.find(p => p.id === need.productId);

    // Badges
    const badges = [];
    if (product) {
      badges.push(
        <span 
          key="product"
          className="inline-block px-2 py-1 rounded text-xs font-bold text-white truncate max-w-[80px] sm:max-w-none"
          style={{ backgroundColor: product.color }}
          title={product.name}
        >
          {product.code}
        </span>
      );
    }

    // Indicateur stories liées
    if (linkedStories.length > 0) {
      badges.push(
        <span 
          key="stories"
          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
          title={`${linkedStories.length} story/stories associée(s)`}
        >
          📝 {linkedStories.length}
        </span>
      );
    }

    // Actions
    const actions = [
      <button
        key="view"
        onClick={() => setViewingNeed(need)}
        className="p-1.5 sm:p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        title="Voir détails"
      >
        <Eye className="w-4 h-4" />
      </button>
    ];

    return (
      <BoardCard
        badges={badges}
        actions={actions}
        className={addressed ? 'opacity-70' : ''}
      >
        <p className="text-xs sm:text-sm text-gray-900 line-clamp-3">
          {need.objective || 'Objectif non défini'}
        </p>
      </BoardCard>
    );
  };

  const QuadrantCard = ({ title, description, color, needs, icon, tip }) => {
    // Extraire la couleur de fond du className (ex: bg-green-50)
    const bgColorClass = color.split(' ').find(c => c.startsWith('bg-'));

    return (
      <div className={`rounded-lg shadow-md ${bgColorClass}`}>
        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="text-2xl sm:text-3xl flex-shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">{title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{description}</p>
            </div>
          </div>

          {tip && (
            <div className="mb-3 sm:mb-4 p-2 bg-white bg-opacity-60 rounded text-xs text-gray-700 italic">
              💡 {tip}
            </div>
          )}

          {needs.length === 0 ? (
            <p className="text-xs sm:text-sm text-gray-500 italic py-6 sm:py-8 text-center">
              Aucun besoin dans ce quadrant
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto">
              {needs.map(need => (
                <NeedCard key={need.id} need={need} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {showTips && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-yellow-200 rounded-lg flex-shrink-0">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-700" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Conseils et astuces</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-indigo-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🎯 Comprendre la matrice</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Axe vertical (Importance)</strong> : Impact business du besoin (critique, haute, moyenne, basse)</li>
                  <li><strong>Axe horizontal (Effort)</strong> : Complexité technique estimée en Story Points</li>
                  <li><strong>4 quadrants</strong> : Chaque besoin est classé selon son ratio Valeur/Effort</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🟢 Quick Wins (Gains rapides)</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Importance haute + Effort faible</strong> = ROI élevé</li>
                  <li>Priorisez ces besoins en <strong>SHOULD</strong> (ou MUST si critique)</li>
                  <li>Créez des stories via le <strong>module User Stories</strong></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🔵 Strategic (Stratégiques)</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Importance haute + Effort élevé</strong> = Investissement nécessaire</li>
                  <li>Toujours priorité <strong>MUST</strong> - Ne pas négliger !</li>
                  <li><strong>Planifiez</strong> soigneusement et découpez si &gt;13 Story Points</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🟡 Fill-ins (Compléments)</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Importance basse + Effort faible</strong> = Nice-to-have</li>
                  <li>Priorité <strong>COULD</strong> - à faire si capacité disponible</li>
                  <li>Idéal pour combler la fin d'un sprint</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-yellow-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🔴 Time Sinks (À éviter)</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Importance basse + Effort élevé</strong> = Mauvais ROI</li>
                  <li>Priorité <strong>WON'T</strong> par défaut</li>
                  <li><strong>Challengez</strong> la pertinence : est-ce vraiment nécessaire ?</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-amber-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">⚡ Workflow recommandé</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>RICE</strong> : Évaluez et priorisez vos besoins</li>
                  <li><strong>User Stories</strong> : Créez et formalisez vos stories</li>
                  <li><strong>Backlog</strong> : Organisez votre file d'attente</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* État vide ou affichage normal */}
        {(() => {
          // ÉTAPE 1: Vérifier les dépendances EN PREMIER
          const { canCreate, missingDependency } = checkModuleDependencies('userNeeds', {
            products: products.length
          });
          
          // ÉTAPE 2: Dépendance manquante - PRIORITAIRE
          if (!canCreate && missingDependency) {
            return (
              <EmptyState
                icon={AlertCircle}
                message={missingDependency.message}
                description="Utilisez le menu de gauche pour accéder au module correspondant."
              />
            );
          }
          
          // ÉTAPE 3: Filtres actifs
          const totalFiltered = Object.values(quadrants).flat().length;
          if (totalFiltered === 0 && userNeeds.length > 0) {
            return (
              <EmptyState
                icon={AlertCircle}
                message="Aucun besoin ne correspond à vos critères de filtrage"
                onAction={() => setProductFilter('all')}
                actionLabel="Réinitialiser les filtres"
              />
            );
          }
          
          // ÉTAPE 4: État vide normal
          if (userNeeds.length === 0) {
            return (
              <EmptyState
                icon={AlertCircle}
                message="Créez d'abord des besoins pour les prioriser avec la matrice RICE"
                onAction={() => onNavigate?.('user-needs')}
                actionLabel="Aller à Besoins"
              />
            );
          }
          
          // ÉTAPE 5: Affichage normal
          return (
            <>
              {/* Sélecteur de produit simple - Toujours visible */}
              {products.length > 0 && userNeeds.length > 0 && (
                <div className="bg-white rounded-lg shadow p-3 sm:p-4">
                  <ProductSelector
                    products={products}
                    value={productFilter}
                    onChange={setProductFilter}
                    placeholder="Tous les produits"
                    className="w-full sm:w-64"
                  />
                </div>
              )}

              {/* Grille des quadrants */}
              {userNeeds.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <QuadrantCard
                    title="Quick Wins"
                    description="Haute importance, Faible effort"
                    color="border-green-400 bg-green-50"
                    needs={quadrants.quickWins}
                    icon="🎯"
                    tip="Prioriser en SHOULD/MUST - ROI immédiat"
                  />

                  <QuadrantCard
                    title="Strategic"
                    description="Haute importance, Effort élevé"
                    color="border-blue-400 bg-blue-50"
                    needs={quadrants.strategic}
                    icon="🚀"
                    tip="Planifier et découper si nécessaire - Investissement stratégique"
                  />

                  <QuadrantCard
                    title="Fill-ins"
                    description="Faible importance, Faible effort"
                    color="border-yellow-400 bg-yellow-50"
                    needs={quadrants.fillIns}
                    icon="📋"
                    tip="À traiter en fin de sprint si capacité disponible"
                  />

                  <QuadrantCard
                    title="Time Sinks"
                    description="Faible importance, Effort élevé"
                    color="border-red-400 bg-red-50"
                    needs={quadrants.timeSinks}
                    icon="⏳"
                    tip="Éviter ou challenger la pertinence - Mauvais ROI"
                  />
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* Modal de visualisation */}
      {viewingNeed && (
        <UserNeedDetail
          need={viewingNeed}
          contacts={contacts}
          userStories={userStories}
          interviews={interviews}
          Objectives={Objectives}
          products={products}
          personas={personas}
          onClose={() => setViewingNeed(null)}
          onEdit={(need) => {
            setViewingNeed(null);
            // L'édition est gérée au niveau global via onUpdateNeed
            // Pas besoin de modal ici
          }}
          onNavigate={onNavigate || (() => {})}
          getContactById={(contactId) => contacts.find(c => c.id === contactId)}
          getLinkedStories={(needId) => userStories.filter(story => story.linkedNeedId === needId)}
          getSourceInterview={(needId) => interviews.find(interview => 
            interview.linkedNeedIds && interview.linkedNeedIds.includes(needId)
          )}
        />
      )}
    </div>
  );
};

export default Rice;
