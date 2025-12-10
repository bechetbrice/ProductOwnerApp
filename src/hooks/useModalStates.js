import { useState } from 'react';

/**
 * Hook centralisé pour gérer tous les états des modals de l'application
 * Réduit la complexité de App.jsx en isolant la gestion des états UI
 */
export const useModalStates = () => {
  // Contact
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  
  // Interview
  const [isInterviewFormOpen, setIsInterviewFormOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [viewingInterview, setViewingInterview] = useState(null);
  const [interviewReadOnly, setInterviewReadOnly] = useState(true);
  
  // Persona
  const [viewingPersona, setViewingPersona] = useState(null);
  
  // Team
  const [showTeamsForm, setShowTeamsForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  
  // Sprint Review
  const [isSprintReviewFormOpen, setIsSprintReviewFormOpen] = useState(false);
  const [editingSprintReview, setEditingSprintReview] = useState(false);
  
  // Sprint Retrospective
  const [isSprintRetroFormOpen, setIsSprintRetroFormOpen] = useState(false);
  const [editingSprintRetro, setEditingSprintRetro] = useState(null);
  
  // UserNeed Form
  const [isNeedFormModalOpen, setIsNeedFormModalOpen] = useState(false);
  const [prefilledNeedData, setPrefilledNeedData] = useState(null);
  
  // UserStory Form
  const [isStoryFormModalOpen, setIsStoryFormModalOpen] = useState(false);
  const [prefilledStoryData, setPrefilledStoryData] = useState(null);
  
  // Navigation states
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedNeedId, setSelectedNeedId] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  return {
    // Contact
    isContactFormOpen,
    setIsContactFormOpen,
    editingContact,
    setEditingContact,
    
    // Interview
    isInterviewFormOpen,
    setIsInterviewFormOpen,
    editingInterview,
    setEditingInterview,
    viewingInterview,
    setViewingInterview,
    interviewReadOnly,
    setInterviewReadOnly,
    
    // Persona
    viewingPersona,
    setViewingPersona,
    
    // Team
    showTeamsForm,
    setShowTeamsForm,
    editingTeam,
    setEditingTeam,
    
    // Sprint Review
    isSprintReviewFormOpen,
    setIsSprintReviewFormOpen,
    editingSprintReview,
    setEditingSprintReview,
    
    // Sprint Retrospective
    isSprintRetroFormOpen,
    setIsSprintRetroFormOpen,
    editingSprintRetro,
    setEditingSprintRetro,
    
    // UserNeed
    isNeedFormModalOpen,
    setIsNeedFormModalOpen,
    prefilledNeedData,
    setPrefilledNeedData,
    
    // UserStory
    isStoryFormModalOpen,
    setIsStoryFormModalOpen,
    prefilledStoryData,
    setPrefilledStoryData,
    
    // Navigation
    selectedContact,
    setSelectedContact,
    selectedNeedId,
    setSelectedNeedId,
    selectedStoryId,
    setSelectedStoryId
  };
};
