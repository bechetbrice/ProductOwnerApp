import { useState } from 'react';
import { hasInterviewContent } from '../../../utils/interviewHelpers';

/**
 * Hook personnalisé pour gérer l'état et la logique d'InterviewDetail
 * Centralise tous les handlers pour faciliter la maintenance
 */
export const useInterviewDetail = (interview, onUpdate, mode) => {
  // État principal
  const [formData, setFormData] = useState({
    ...interview,
    notes: interview.notes || [],
    sections: interview.sections || []
  });

  // État de l'onglet actif
  const [activeTab, setActiveTab] = useState(mode === 'edit' ? 'entretien' : 'pratique');

  // === HANDLERS ONGLET 3 : ENTRETIEN ===

  const handleAnswerChange = (sectionIndex, questionIndex, value) => {
    if (!formData.sections || !formData.sections[sectionIndex] || !formData.sections[sectionIndex].questions) return;
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].questions[questionIndex].answer = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleAddNote = (note) => {
    setFormData({
      ...formData,
      notes: [...(formData.notes || []), note]
    });
  };

  const handleDeleteNote = (noteId) => {
    setFormData({
      ...formData,
      notes: (formData.notes || []).filter(n => n.id !== noteId)
    });
  };

  const handleSaveInterview = () => {
    // Auto-passage en "in_progress" si statut "scheduled" et qu'il y a du contenu
    let updatedData = { ...formData };
    
    if (interview.status === 'scheduled' && hasInterviewContent(formData)) {
      updatedData.status = 'in_progress';
    }
    
    onUpdate(updatedData);
  };

  const handleMarkAsCompleted = () => {
    onUpdate({ ...formData, status: 'completed' });
  };

  return {
    formData,
    activeTab,
    setActiveTab,
    handleAnswerChange,
    handleAddNote,
    handleDeleteNote,
    handleSaveInterview,
    handleMarkAsCompleted
  };
};
