import { useState, useMemo } from 'react';
import { Target, CheckCircle, AlertCircle, Eye, Lightbulb, Info, RotateCcw } from 'lucide-react';
import UserNeedDetail from '../UserNeeds/UserNeedDetail';
import { EmptyState, BoardCard } from '../ui';
import ProductSelector from '../Common/ProductSelector';
import { checkModuleDependencies } from '../../utils/moduleDependencies';

/**
 * PlanningPoker - Module d'estimation collaborative avec Planning Poker
 * 
 * Fonctionnalités :
 * - Estimation des Story Points avec suite de Fibonacci (1, 2, 3, 5, 8, 13, 21)
 * - Layout 3 colonnes : Besoins à estimer | Zone de sélection | Besoins estimés
 * - Auto-sélection du besoin suivant après estimation
 * - Réestimation possible des besoins déjà évalués
 * - Filtrage par produit (simple sélecteur)
 * - Rendu responsive et harmonisé style MoSCoW
 * 
 * @version 4.3.0 - Simplification interface (suppression FilterBar)
 */
const PlanningPoker = ({ 
  userNeeds = [],
  contacts = [],
  products = [],
  personas = [],
  userStories = [],
  interviews = [],
  Objectives = [],
  onUpdateNeed,
  onNavigate,
  showTips = false
}) => {
  const [selectedNeedId, setSelectedNeedId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [productFilter, setProductFilter] = useState('all');
  const [viewingNeed, setViewingNeed] = useState(null);

  // Cartes Fibonacci pour Planning Poker
  const fibonacciCards = [
    { value: null, label: '❓', color: 'bg-gray-200 text-gray-700', description: 'Réinitialiser' },
    { value: 1, label: '1', color: 'bg-green-100 text-green-800', description: 'Très faible' },
    { value: 2, label: '2', color: 'bg-green-100 text-green-800', description: 'Faible' },
    { value: 3, label: '3', color: 'bg-yellow-100 text-yellow-800', description: 'Moyen' },
    { value: 5, label: '5', color: 'bg-orange-100 text-orange-800', description: 'Élevé' },
    { value: 8, label: '8', color: 'bg-red-100 text-red-800', description: 'Très élevé' },
    { value: 13, label: '13', color: 'bg-purple-100 text-purple-800', description: 'Complexe' },
    { value: 21, label: '21', color: 'bg-gray-800 text-white', description: 'Très complexe' }
  ];

  // Séparer les besoins estimés et non estimés
  const { unestimatedNeeds, estimatedNeeds } = useMemo(() => {
    let allNeeds = [...userNeeds];

    // Appliquer le filtre produit
    if (productFilter !== 'all') {
      allNeeds = allNeeds.filter(need => need.productId === productFilter);
    }

    // Séparer estimés / non estimés
    const unestimated = allNeeds
      .filter(need => !need.storyPoints)
      .sort((a, b) => {
        const importanceOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return importanceOrder[b.importance] - importanceOrder[a.importance];
      });

    const estimated = allNeeds
      .filter(need => need.storyPoints)
      .sort((a, b) => b.storyPoints - a.storyPoints);

    return { unestimatedNeeds: unestimated, estimatedNeeds: estimated };
  }, [userNeeds, productFilter]);

  // Sélectionner une carte et estimer
  const handleCardClick = (card) => {
    if (!selectedNeedId) return;
    
    setSelectedCard(card.value);
    
    // Mettre à jour immédiatement le besoin
    onUpdateNeed(selectedNeedId, { storyPoints: card.value });
    
    // Auto-sélectionner le besoin suivant non estimé
    setTimeout(() => {
      const currentIndex = unestimatedNeeds.findIndex(n => n.id === selectedNeedId);
      const nextUnestimated = unestimatedNeeds[currentIndex + 1];
      
      if (nextUnestimated) {
        setSelectedNeedId(nextUnestimated.id);
        setSelectedCard(null);
      } else {
        setSelectedNeedId(null);
        setSelectedCard(null);
      }
    }, 500);
  };

  // Réestimer un besoin déjà estimé
  const handleReestimate = (need) => {
    setSelectedNeedId(need.id);
    setSelectedCard(null);
  };

  const selectedNeed = selectedNeedId ? userNeeds.find(n => n.id === selectedNeedId) : null;
  const selectedProduct = selectedNeed ? products.find(p => p.id === selectedNeed.productId) : null;

  // Composant NeedCard harmonisé avec BoardCard
  const NeedCard = ({ need, isSelected, onClick, showEstimation = false, onReestimate }) => {
    const product = products.find(p => p.id === need.productId);

    // Badges
    const badges = [];
    if (product) {
      badges.push(
        <span 
          key="product"
          className="px-2 py-1 rounded text-sm font-bold text-white flex-shrink-0"
          style={{ backgroundColor: product.color }}
          title={product.name}
        >
          {product.code}
        </span>
      );
    }
    if (showEstimation && need.storyPoints) {
      badges.push(
        <span key="points" className="px-2 py-1 rounded text-sm font-medium bg-green-100 text-green-800 flex-shrink-0">
          {need.storyPoints} pt
        </span>
      );
    }

    // Actions
    const actions = [
      <button
        key="view"
        onClick={(e) => {
          e.stopPropagation();
          setViewingNeed(need);
        }}
        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
        title="Voir détails"
      >
        <Eye className="w-4 h-4" />
      </button>
    ];

    if (showEstimation && onReestimate) {
      actions.push(
        <button
          key="reestimate"
          onClick={(e) => {
            e.stopPropagation();
            onReestimate(need);
          }}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
          title="Réestimer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      );
    }

    return (
      <BoardCard
        onClick={onClick}
        isSelected={isSelected}
        badges={badges}
        actions={actions}
      >
        <p className="text-xs sm:text-sm text-gray-900 line-clamp-3">
          {need.objective || 'Objectif non défini'}
        </p>
      </BoardCard>
    );
  };

  // Modal de visualisation
  const ViewNeedModal = ({ need, onClose }) => {
    if (!need) return null;

    const getContactById = (contactId) => {
      return contacts.find(c => c.id === contactId);
    };

    const getLinkedStories = (needId) => {
      return userStories.filter(story => story.linkedNeedId === needId);
    };

    const getSourceInterview = (needId) => {
      return interviews.find(interview => 
        interview.linkedNeedIds && interview.linkedNeedIds.includes(needId)
      );
    };

    return (
      <UserNeedDetail
        need={need}
        contacts={contacts}
        userStories={userStories}
        interviews={interviews}
        Objectives={Objectives}
        products={products}
        personas={personas}
        onClose={onClose}
        onEdit={() => {}}
        onNavigate={onNavigate || (() => {})}
        getContactById={getContactById}
        getLinkedStories={getLinkedStories}
        getSourceInterview={getSourceInterview}
      />
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* Module Conseils */}
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
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🎯 Qu'est-ce que le Planning Poker ?</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Technique d'<strong>estimation collaborative</strong> en équipe</li>
                  <li>Utilise la <strong>suite de Fibonacci</strong> (1, 2, 3, 5, 8, 13, 21)</li>
                  <li>Chaque membre vote <strong>simultanément</strong> pour éviter les biais</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">📊 Échelle de complexité</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>1-2 pts</strong> : Très simple, 1-2h de travail</li>
                  <li><strong>3 pts</strong> : Simple, demi-journée</li>
                  <li><strong>5 pts</strong> : Moyen, 1 journée</li>
                  <li><strong>8 pts</strong> : Complexe, 2-3 jours</li>
                  <li><strong>13+ pts</strong> : Très complexe, à <strong>découper</strong> !</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">🔄 Bonnes pratiques</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Estimez en <strong>équipe</strong>, pas seul</li>
                  <li>Basez-vous sur la <strong>complexité</strong>, pas le temps exact</li>
                  <li>Comparez avec des <strong>stories de référence</strong></li>
                  <li>Si divergence &gt; 3 pts : <strong>discutez</strong> avant de revoter</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">⚡ Utilisation du module</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li><strong>Colonne gauche</strong> : besoins à estimer (par priorité)</li>
                  <li><strong>Centre</strong> : sélectionnez un besoin puis une carte Fibonacci</li>
                  <li><strong>Colonne droite</strong> : besoins déjà estimés</li>
                  <li>Auto-sélection du besoin suivant après estimation</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-yellow-500 lg:col-span-2">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">💡 Astuces avancées</h4>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Réestimez si le besoin <strong>évolue</strong> significativement</li>
                  <li>Si 13+ pts : découpez en <strong>sous-besoins</strong> plus petits</li>
                  <li>La <strong>moyenne</strong> par besoin indique votre vélocité d'équipe</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Gestion des états vides et filtres */}
        {(() => {
          // Vérification des dépendances
          const { canCreate, missingDependency } = checkModuleDependencies('userNeeds', {
            products: products.length
          });
          
          // Dépendance manquante
          if (!canCreate && missingDependency) {
            return (
              <EmptyState
                icon={AlertCircle}
                message={missingDependency.message}
                description="Utilisez le menu de gauche pour accéder au module correspondant."
              />
            );
          }
          
          // Filtres actifs sans résultat
          const totalFiltered = unestimatedNeeds.length + estimatedNeeds.length;
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
          
          // État vide normal
          if (userNeeds.length === 0) {
            return (
              <EmptyState
                icon={AlertCircle}
                message="Créez d'abord des besoins pour les estimer en Planning Poker"
                onAction={() => onNavigate?.('user-needs')}
                actionLabel="Aller à Besoins"
              />
            );
          }
          
          // Affichage normal
          return (
            <>
              {/* Sélecteur de produit */}
              {products.length > 0 && userNeeds.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4 mb-4 sm:mb-6">
                  <ProductSelector
                    products={products}
                    value={productFilter}
                    onChange={(productId) => setProductFilter(productId)}
                    placeholder="Tous les produits"
                    className="w-full sm:w-64"
                  />
                </div>
              )}

              {/* Layout 3 colonnes */}
              {userNeeds.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* COLONNE 1 : Besoins à estimer */}
                  <div className="flex flex-col">
                    <div className="rounded-t-lg p-3 sm:p-4 shadow-md bg-amber-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl">⏳</span>
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">Besoins à estimer</h3>
                        </div>
                        <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white bg-amber-500">
                          {unestimatedNeeds.length}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Sélectionnez pour estimer</p>
                    </div>

                    <div 
                      className="flex-1 rounded-b-lg shadow-md p-2 sm:p-3 space-y-2 sm:space-y-3 overflow-y-auto bg-amber-50"
                      style={{ 
                        maxHeight: 'calc(100vh - 450px)', 
                        minHeight: '300px'
                      }}
                    >
                      {unestimatedNeeds.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <CheckCircle size={28} className="sm:w-8 sm:h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-xs sm:text-sm">🎉 Tous les besoins sont estimés !</p>
                        </div>
                      ) : (
                        unestimatedNeeds.map(need => (
                          <NeedCard
                            key={need.id}
                            need={need}
                            isSelected={selectedNeedId === need.id}
                            onClick={() => setSelectedNeedId(need.id)}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  {/* COLONNE 2 : Zone de sélection et estimation */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Besoin sélectionné */}
                    {selectedNeed ? (
                      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <div className="space-y-2 sm:space-y-3">
                          {selectedProduct && (
                            <div>
                              <span 
                                className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold text-white"
                                style={{ backgroundColor: selectedProduct.color }}
                              >
                                {selectedProduct.code}
                              </span>
                            </div>
                          )}
                          
                          <h3 className="text-base sm:text-lg text-gray-900">
                            {selectedNeed.objective || 'Objectif non défini'}
                          </h3>
                          
                          <div className="flex justify-end">
                            <button
                              onClick={() => setViewingNeed(selectedNeed)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Voir détails"
                            >
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>

                        {selectedNeed.storyPoints && (
                          <div className="mb-4 p-2.5 sm:p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-medium text-green-800">
                              Déjà estimé à <strong>{selectedNeed.storyPoints} point{selectedNeed.storyPoints > 1 ? 's' : ''}</strong>
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow p-8 sm:p-12 text-center">
                        <Target size={40} className="sm:w-12 sm:h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm sm:text-base text-gray-600">
                          Sélectionnez un besoin pour commencer l'estimation
                        </p>
                      </div>
                    )}

                    {/* Cartes Fibonacci */}
                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-3 sm:mb-4">
                        Sélectionnez la complexité
                      </h3>
                      <div className="grid grid-cols-4 gap-2 sm:gap-3">
                        {fibonacciCards.map(card => (
                          <button
                            key={card.label}
                            onClick={() => handleCardClick(card)}
                            disabled={!selectedNeedId}
                            className={`aspect-square rounded-lg font-bold text-xl sm:text-2xl transition-all ${
                              card.color
                            } ${
                              !selectedNeedId 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:scale-110 hover:shadow-lg cursor-pointer'
                            } ${
                              selectedCard === card.value 
                                ? 'ring-4 ring-indigo-500 scale-110' 
                                : ''
                            }`}
                            title={card.description}
                          >
                            {card.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3 sm:mt-4 text-center">
                        💡 Cliquez sur une carte pour estimer
                      </p>
                    </div>

                    {/* Guide Fibonacci */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-blue-900 mb-2 text-xs sm:text-sm">Guide Fibonacci</h4>
                          <ul className="space-y-1 text-xs text-blue-800">
                            <li><strong>1-2 :</strong> Très simple</li>
                            <li><strong>3 :</strong> Simple</li>
                            <li><strong>5 :</strong> Moyen</li>
                            <li><strong>8 :</strong> Complexe</li>
                            <li><strong>13 :</strong> Très complexe</li>
                            <li><strong>21 :</strong> À découper</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COLONNE 3 : Besoins estimés */}
                  <div className="flex flex-col">
                    <div className="rounded-t-lg p-3 sm:p-4 shadow-md bg-green-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl">✅</span>
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">Besoins estimés</h3>
                        </div>
                        <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white bg-green-500">
                          {estimatedNeeds.length}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Estimations complétées</p>
                    </div>

                    <div 
                      className="flex-1 rounded-b-lg shadow-md p-2 sm:p-3 space-y-2 sm:space-y-3 overflow-y-auto bg-green-50"
                      style={{ 
                        maxHeight: 'calc(100vh - 450px)', 
                        minHeight: '300px'
                      }}
                    >
                      {estimatedNeeds.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <AlertCircle size={28} className="sm:w-8 sm:h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-xs sm:text-sm">Aucun besoin estimé pour le moment</p>
                        </div>
                      ) : (
                        estimatedNeeds.map(need => (
                          <NeedCard
                            key={need.id}
                            need={need}
                            isSelected={selectedNeedId === need.id}
                            onClick={() => setSelectedNeedId(need.id)}
                            showEstimation={true}
                            onReestimate={handleReestimate}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* Modal de visualisation */}
      {viewingNeed && (
        <ViewNeedModal need={viewingNeed} onClose={() => setViewingNeed(null)} />
      )}
    </div>
  );
};

export default PlanningPoker;
