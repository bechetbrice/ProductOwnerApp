import { useState, useEffect, useCallback } from 'react';
import { Contacts } from '../utils/storage';

export const useContacts = (showNotification) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = useCallback(() => {
    const data = Contacts.get();
    setContacts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleAddContact = useCallback((contactData) => {
    const newContact = Contacts.add(contactData);
    setContacts(prev => [...prev, newContact]);
    if (showNotification) {
      showNotification('Contact créé avec succès', 'success');
    }
    return newContact;
  }, [showNotification]);

  const handleUpdateContact = useCallback((id, contactData) => {
    const updated = Contacts.update(id, contactData);
    if (updated) {
      setContacts(prev => prev.map(contact => contact.id === id ? updated : contact));
      if (showNotification) {
        showNotification('Contact mis à jour', 'success');
      }
    }
    return updated;
  }, [showNotification]);

  const handleDeleteContact = useCallback((id) => {
    Contacts.remove(id);
    setContacts(prev => prev.filter(contact => contact.id !== id));
    if (showNotification) {
      showNotification('Contact supprimé', 'success');
    }
  }, [showNotification]);

  const handleImportContacts = useCallback(async (contactsToImport) => {
    console.log('🔄 useContacts: Import de', contactsToImport.length, 'contacts');
    console.log('📊 Contacts avant import:', contacts.length);
    
    try {
      const newContacts = Contacts.addMany(contactsToImport);
      console.log('💾 Contacts.addMany retourné:', newContacts.length, 'nouveaux contacts');
      
      const allContacts = Contacts.get();
      console.log('📊 Total contacts après get():', allContacts.length);
      
      setContacts(allContacts);
      console.log('✅ setContacts appelé');
      
      if (newContacts.length > 0 && showNotification) {
        showNotification(`${newContacts.length} contact(s) importé(s) avec succès`, 'success');
      }
      
      return newContacts.length;
    } catch (error) {
      console.error('❌ Erreur lors de l\'import des contacts:', error);
      if (showNotification) {
        showNotification('Erreur lors de l\'import', 'error');
      }
      return 0;
    }
  }, [contacts.length, showNotification]);

  return {
    contacts,
    loading,
    addContact: handleAddContact,
    updateContact: handleUpdateContact,
    deleteContact: handleDeleteContact,
    importContacts: handleImportContacts,
    refreshContacts: loadContacts
  };
};
