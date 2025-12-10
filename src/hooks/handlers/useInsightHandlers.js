import { updateUserNeed } from '../../utils/storage';

/**
 * useInsightHandlers
 * 
 * Hook pour gérer les handlers liés aux insights d'entretiens
 * - Création de besoins depuis insights
 * - Création de stories depuis insights
 * - Enrichissement de besoins avec insights
 */
export const useInsightHandlers = ({
  modalStates,
  userNeedsActions,
  setCurrentView,
  showNotification
}) => {
  const {
    setPrefilledNeedData,
    setIsNeedFormModalOpen,
    setPrefilledStoryData,
    setIsStoryFormModalOpen
  } = modalStates;

  /**
   * Crée un besoin utilisateur pré-rempli depuis un insight d'entretien
   * @param {Object} insight - Insight source
   * @param {Object} contact - Contact associé
   * @param {Object} interview - Entretien source
   */
  const handleCreateNeedFromInsight = (insight, contact, interview) => {
    const needData = {
      stakeholderIds: contact ? [contact.id] : [],
      context: '',
      Objectives: insight.content,
      importance: insight.priority === 'critical' ? 'critical' 
        : insight.priority === 'high' ? 'high' 
        : insight.priority === 'low' ? 'low'
        : 'medium',
      primaryContactId: contact ? contact.id : '',
      productId: interview.productId || ''
    };
    
    setPrefilledNeedData(needData);
    setIsNeedFormModalOpen(true);
    setCurrentView('userNeeds');
  };

  /**
   * Crée une user story pré-remplie depuis un insight d'entretien
   * @param {Object} insight - Insight source
   * @param {Object} contact - Contact associé
   * @param {Object} interview - Entretien source
   */
  const handleCreateStoryFromInsight = (insight, contact, interview) => {
    const actionTitles = {
      pain_point: 'Résoudre le point de friction',
      opportunity: 'Exploiter l\'opportunité',
      quote: 'Répondre au retour utilisateur',
      behavior: 'Améliorer le comportement observé',
      feedback: 'Intégrer le feedback'
    };

    const priorityMapping = {
      critical: 'must',
      high: 'should',
      medium: 'could',
      low: 'wont'
    };

    const titlePrefix = actionTitles[insight.type] || 'Traiter l\'insight';

    const storyData = {
      title: `${titlePrefix} : ${insight.content.substring(0, 60)}${insight.content.length > 60 ? '...' : ''}`,
      description: `Insight capturé lors de l'entretien "${interview.title}" ${contact ? `avec ${contact.name}` : ''}:\n\n${insight.content}`,
      acceptanceCriteria: insight.type === 'pain_point' 
        ? '- Le problème identifié est résolu\n- La solution est validée par l\'utilisateur\n- Les tests confirment l\'amélioration'
        : insight.type === 'opportunity'
        ? '- L\'opportunité est implémentée\n- Les bénéfices attendus sont mesurables\n- Les utilisateurs adoptent la nouvelle fonctionnalité'
        : '- L\'insight est adressé de manière satisfaisante\n- La solution est validée\n- Les critères de succès sont atteints',
      priority: priorityMapping[insight.priority] || 'could',
      linkedNeedId: interview.linkedNeedIds && interview.linkedNeedIds.length > 0 ? interview.linkedNeedIds[0] : '',
      stakeholderIds: contact ? [contact.id] : [],
      productId: interview.productId || ''
    };
    
    setPrefilledStoryData(storyData);
    setIsStoryFormModalOpen(true);
  };

  /**
   * Enrichit un besoin utilisateur avec les insights d'un entretien
   * @param {Object} interview - Entretien source
   * @param {Object} need - Besoin à enrichir
   * @param {Object|null} specificInsight - Insight spécifique ou null pour tous
   */
  const handleEnrichNeed = (interview, need, specificInsight = null) => {
    const insightsToAdd = specificInsight 
      ? [specificInsight] 
      : (interview.insights || []);

    if (insightsToAdd.length === 0) {
      alert('Aucun insight à ajouter au besoin.');
      return;
    }

    const insightsText = insightsToAdd
      .map(insight => {
        const typeLabels = {
          need: '💡 Besoin',
          pain_point: '⚠️ Point de friction',
          opportunity: '🎯 Opportunité',
          quote: '💬 Citation',
          behavior: '👤 Comportement',
          feedback: '📝 Feedback'
        };
        const priorityLabels = {
          critical: '[CRITIQUE]',
          high: '[HAUTE]',
          medium: '[MOYENNE]',
          low: '[BASSE]'
        };
        return `${typeLabels[insight.type]} ${priorityLabels[insight.priority]}: ${insight.content}`;
      })
      .join('\n');

    const enrichedContext = need.context + '\n\n--- Insights de l\'entretien "' + interview.title + '" ---\n' + insightsText;

    const updated = updateUserNeed(need.id, { context: enrichedContext });
    if (updated) {
      userNeedsActions.refresh();
      showNotification(`Le besoin a été enrichi avec ${insightsToAdd.length} insight(s)`, 'success');
    }
  };

  return {
    handleCreateNeedFromInsight,
    handleCreateStoryFromInsight,
    handleEnrichNeed
  };
};
