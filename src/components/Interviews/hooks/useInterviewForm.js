import { useState, useEffect } from 'react';
import { getInterviewedContactIds } from '../../../utils/interviewHelpers';

/**
 * Convertit une date ISO en format datetime-local (YYYY-MM-DDTHH:mm)
 */
const toDatetimeLocalFormat = (isoString) => {
  if (!isoString) return '';
  
  try {
    const date = new Date(isoString);
    // Format: YYYY-MM-DDTHH:mm (sans secondes, sans timezone)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (e) {
    return '';
  }
};

/**
 * Hook personnalisé pour gérer l'état et la logique d'InterviewForm
 * Centralise validation, gestion des sections/questions, et transformations de données
 */
export const useInterviewForm = (interview, contacts, products) => {
  // Formatter la date au format datetime-local si elle existe
  const initialScheduledDate = interview?.scheduledDate 
    ? toDatetimeLocalFormat(interview.scheduledDate)
    : '';

  const [formData, setFormData] = useState({
    title: '',
    type: 'custom',
    interviewedContactIds: [],
    scheduledDate: initialScheduledDate,
    duration: 60,
    location: '',
    objectives: '',
    status: 'scheduled',
    sections: [],
    generalNotes: '',
    productId: '',
    ...interview,
    // Override scheduledDate avec le format correct
    scheduledDate: initialScheduledDate
  });

  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [activeTab, setActiveTab] = useState('pratique');

  const isEditMode = !!interview;

  // Migration automatique : si l'ancien format contactId existe, le convertir
  useEffect(() => {
    if (interview) {
      const contactIds = getInterviewedContactIds(interview);
      if (contactIds.length > 0 && !formData.interviewedContactIds.length) {
        setFormData(prev => ({
          ...prev,
          interviewedContactIds: contactIds
        }));
      }
    }
  }, [interview]);

  // Pré-sélectionner le premier produit actif lors de la création
  useEffect(() => {
    if (!interview) {
      const defaultProduct = products.find(p => p.status === 'active');
      if (defaultProduct) {
        setFormData(prev => ({ ...prev, productId: defaultProduct.id }));
      }
    }
  }, [interview, products]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!formData.interviewedContactIds || formData.interviewedContactIds.length === 0) {
      newErrors.interviewedContactIds = 'Au moins un interviewé est requis';
    }

    if (!formData.productId) {
      newErrors.productId = 'Le produit est requis';
    }

    setErrors(newErrors);
  }, [formData.title, formData.interviewedContactIds, formData.productId]);

  // Handlers génériques
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldUpdate = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  // Gestion des sections
  const addCustomSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: 'Nouvelle Section',
          questions: []
        }
      ]
    }));
  };

  const removeSection = (sectionIndex) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex)
    }));
  };

  const updateSectionTitle = (sectionIndex, title) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === sectionIndex ? { ...section, title } : section
      )
    }));
  };

  // Gestion des questions
  const addQuestion = (sectionIndex) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex
          ? { ...section, questions: [...section.questions, { question: '', answer: '' }] }
          : section
      )
    }));
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex
          ? { ...section, questions: section.questions.filter((_, qIndex) => qIndex !== questionIndex) }
          : section
      )
    }));
  };

  const updateQuestion = (sectionIndex, questionIndex, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) =>
                qIndex === questionIndex ? { ...q, question: value } : q
              )
            }
          : section
      )
    }));
  };

  // Calculs dérivés
  const isFormValid = Object.keys(errors).length === 0;
  const activeProducts = products.filter(p => p.status === 'active');
  const totalQuestions = formData.sections.reduce((total, s) => total + s.questions.length, 0);

  return {
    formData,
    errors,
    showHelp,
    setShowHelp,
    activeTab,
    setActiveTab,
    isEditMode,
    isFormValid,
    activeProducts,
    totalQuestions,
    handleChange,
    handleFieldUpdate,
    addCustomSection,
    removeSection,
    updateSectionTitle,
    addQuestion,
    removeQuestion,
    updateQuestion
  };
};
