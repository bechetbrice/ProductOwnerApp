/**
 * useInterviewHandlers
 * 
 * Hook pour gérer les handlers liés aux entretiens
 * - Ajout/édition d'entretiens
 * - Visualisation en détail
 * - Mise à jour depuis la vue détail
 */
export const useInterviewHandlers = ({
  modalStates,
  interviewsActions
}) => {
  const {
    setIsInterviewFormOpen,
    setEditingInterview,
    setViewingInterview,
    setInterviewReadOnly,
    editingInterview,
    viewingInterview
  } = modalStates;

  /**
   * Ouvre le formulaire pour ajouter un nouvel entretien
   */
  const handleAddInterview = () => {
    setEditingInterview(null);
    setIsInterviewFormOpen(true);
  };

  /**
   * Ouvre le formulaire pour éditer un entretien
   * Gère le basculement entre mode view et mode édition
   * @param {Object} interview - Entretien à éditer
   */
  const handleEditInterview = (interview) => {
    // Si l'interview est en mode view, on bascule en mode édition dans le detail
    if (viewingInterview && viewingInterview.id === interview.id) {
      setInterviewReadOnly(false);
    } else {
      // Sinon on ouvre le formulaire de préparation
      setEditingInterview(interview);
      setIsInterviewFormOpen(true);
    }
  };

  /**
   * Sauvegarde un entretien (création ou mise à jour)
   * @param {Object} interviewData - Données de l'entretien
   */
  const handleSaveInterview = (interviewData) => {
    if (editingInterview) {
      interviewsActions.update(editingInterview.id, interviewData);
      if (viewingInterview && viewingInterview.id === editingInterview.id) {
        setViewingInterview({ ...editingInterview, ...interviewData });
      }
    } else {
      interviewsActions.add(interviewData);
    }
    setIsInterviewFormOpen(false);
    setEditingInterview(null);
  };

  /**
   * Ouvre la vue détaillée d'un entretien
   * @param {Object} interview - Entretien à visualiser
   * @param {string} mode - Mode d'affichage ('view' ou 'edit')
   */
  const handleViewInterview = (interview, mode = 'view') => {
    setViewingInterview(interview);
    setInterviewReadOnly(mode); // Stocke 'view' ou 'edit' au lieu de true/false
  };

  /**
   * Met à jour un entretien depuis la vue détail
   * @param {Object} updatedData - Données mises à jour
   */
  const handleUpdateInterviewFromDetail = (updatedData) => {
    interviewsActions.update(viewingInterview.id, updatedData);
    setViewingInterview({ ...viewingInterview, ...updatedData });
  };

  /**
   * Ferme la vue détaillée d'un entretien
   */
  const handleCloseInterviewDetail = () => {
    setViewingInterview(null);
    setInterviewReadOnly('view'); // Réinitialiser en mode 'view' pour la prochaine ouverture
  };

  return {
    handleAddInterview,
    handleEditInterview,
    handleSaveInterview,
    handleViewInterview,
    handleUpdateInterviewFromDetail,
    handleCloseInterviewDetail
  };
};
