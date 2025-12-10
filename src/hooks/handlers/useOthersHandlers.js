/**
 * useOthersHandlers
 * 
 * Hook pour gérer les handlers additionnels
 * - Personas (view, close, update)
 * - Teams (add, update, save)
 * - Sprint Reviews (add, edit, save)
 * - Sprint Retrospectives (add, edit, save)
 */
export const useOthersHandlers = ({
  modalStates,
  personasActions,
  othersActions
}) => {
  const {
    setViewingPersona,
    setShowTeamsForm,
    setEditingTeam,
    setIsSprintReviewFormOpen,
    setEditingSprintReview,
    setIsSprintRetroFormOpen,
    setEditingSprintRetro,
    viewingPersona,
    editingTeam,
    editingSprintReview,
    editingSprintRetro
  } = modalStates;

  // ============================================================
  // PERSONA HANDLERS
  // ============================================================
  
  /**
   * Ouvre la vue détaillée d'un persona
   * @param {Object} persona - Persona à visualiser
   */
  const handleViewPersona = (persona) => {
    setViewingPersona(persona);
  };

  /**
   * Ferme la vue détaillée d'un persona
   */
  const handleClosePersonaDetail = () => {
    setViewingPersona(null);
  };

  /**
   * Met à jour un persona
   * @param {string} id - ID du persona
   * @param {Object} updates - Données à mettre à jour
   */
  const handleUpdatePersona = (id, updates) => {
    personasActions.update(id, updates);
    if (viewingPersona && viewingPersona.id === id) {
      setViewingPersona({ ...viewingPersona, ...updates });
    }
  };

  // ============================================================
  // TEAM HANDLERS
  // ============================================================
  
  /**
   * Ouvre le formulaire pour ajouter une nouvelle équipe
   */
  const handleAddTeam = () => {
    setEditingTeam(null);
    setShowTeamsForm(true);
  };

  /**
   * Ouvre le formulaire pour éditer une équipe
   * @param {Object} team - Équipe à éditer
   */
  const handleUpdateTeam = (team) => {
    setEditingTeam(team);
    setShowTeamsForm(true);
  };

  /**
   * Sauvegarde une équipe (création ou mise à jour)
   * @param {Object} teamData - Données de l'équipe
   */
  const handleSaveTeam = (teamData) => {
    if (editingTeam) {
      othersActions.updateTeam(editingTeam.id, teamData);
    } else {
      othersActions.addTeam(teamData);
    }
    setShowTeamsForm(false);
    setEditingTeam(null);
  };

  // ============================================================
  // SPRINT REVIEW HANDLERS
  // ============================================================
  
  /**
   * Ouvre le formulaire pour ajouter une nouvelle sprint review
   */
  const handleAddSprintReview = () => {
    setEditingSprintReview(null);
    setIsSprintReviewFormOpen(true);
  };

  /**
   * Ouvre le formulaire pour éditer une sprint review
   * @param {Object} review - Sprint review à éditer
   */
  const handleEditSprintReview = (review) => {
    setEditingSprintReview(review);
    setIsSprintReviewFormOpen(true);
  };

  /**
   * Sauvegarde une sprint review (création ou mise à jour)
   * @param {Object} reviewData - Données de la sprint review
   */
  const handleSaveSprintReview = (reviewData) => {
    if (editingSprintReview) {
      othersActions.updateSprintReview(editingSprintReview.id, reviewData);
    } else {
      othersActions.addSprintReview(reviewData);
    }
    setIsSprintReviewFormOpen(false);
    setEditingSprintReview(null);
  };

  // ============================================================
  // SPRINT RETROSPECTIVE HANDLERS
  // ============================================================
  
  /**
   * Ouvre le formulaire pour ajouter une nouvelle rétrospective
   */
  const handleAddSprintRetro = () => {
    setEditingSprintRetro(null);
    setIsSprintRetroFormOpen(true);
  };

  /**
   * Ouvre le formulaire pour éditer une rétrospective
   * @param {Object} retro - Rétrospective à éditer
   */
  const handleEditSprintRetro = (retro) => {
    setEditingSprintRetro(retro);
    setIsSprintRetroFormOpen(true);
  };

  /**
   * Sauvegarde une rétrospective (création ou mise à jour)
   * @param {Object} retroData - Données de la rétrospective
   */
  const handleSaveSprintRetro = (retroData) => {
    if (editingSprintRetro) {
      othersActions.updateSprintRetro(editingSprintRetro.id, retroData);
    } else {
      othersActions.addSprintRetro(retroData);
    }
    setIsSprintRetroFormOpen(false);
    setEditingSprintRetro(null);
  };

  return {
    // Persona
    handleViewPersona,
    handleClosePersonaDetail,
    handleUpdatePersona,
    
    // Team
    handleAddTeam,
    handleUpdateTeam,
    handleSaveTeam,
    
    // Sprint Review
    handleAddSprintReview,
    handleEditSprintReview,
    handleSaveSprintReview,
    
    // Sprint Retrospective
    handleAddSprintRetro,
    handleEditSprintRetro,
    handleSaveSprintRetro
  };
};
