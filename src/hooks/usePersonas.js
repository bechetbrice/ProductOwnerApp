import { useState, useEffect, useCallback } from 'react';
import { Personas } from '../utils/storage';

export const usePersonas = (showNotification) => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPersonas = useCallback(() => {
    const data = Personas.get();
    setPersonas(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPersonas();
  }, [loadPersonas]);

  const handleAddPersona = useCallback((personaData) => {
    const newPersona = Personas.add(personaData);
    setPersonas(prev => [...prev, newPersona]);
    if (showNotification) {
      showNotification('Persona créé avec succès', 'success');
    }
    return newPersona;
  }, [showNotification]);

  const handleUpdatePersona = useCallback((id, updates) => {
    const updated = Personas.update(id, updates);
    if (updated) {
      setPersonas(prev => prev.map(persona => persona.id === id ? updated : persona));
      if (showNotification) {
        showNotification('Persona mis à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeletePersona = useCallback((id) => {
    Personas.remove(id);
    setPersonas(prev => prev.filter(persona => persona.id !== id));
    if (showNotification) {
      showNotification('Persona supprimé', 'success');
    }
  }, [showNotification]);

  const handleImportPersonas = useCallback(async (personasToImport) => {
    try {
      const newPersonas = Personas.addMany(personasToImport);
      setPersonas(Personas.get());
      
      if (newPersonas.length > 0 && showNotification) {
        showNotification(`${newPersonas.length} persona(s) importé(s) avec succès`, 'success');
      }
      
      return newPersonas.length;
    } catch (error) {
      console.error('Erreur lors de l\'import des personas:', error);
      if (showNotification) {
        showNotification('Erreur lors de l\'import', 'error');
      }
      return 0;
    }
  }, [showNotification]);

  return {
    personas,
    loading,
    addPersona: handleAddPersona,
    updatePersona: handleUpdatePersona,
    deletePersona: handleDeletePersona,
    importPersonas: handleImportPersonas,
    refreshPersonas: loadPersonas
  };
};
