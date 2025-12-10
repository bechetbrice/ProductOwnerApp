/**
 * useContactHandlers
 * 
 * Hook pour gérer les handlers liés aux contacts
 * - Ouverture/fermeture du formulaire contact
 * - Sauvegarde contact (création/édition)
 */
export const useContactHandlers = ({
  modalStates,
  contactsActions
}) => {
  const {
    setIsContactFormOpen,
    setEditingContact,
    editingContact
  } = modalStates;

  /**
   * Ouvre le formulaire de contact
   * @param {Object|null} contact - Contact à éditer ou null pour créer
   */
  const handleOpenContactForm = (contact = null) => {
    setEditingContact(contact);
    setIsContactFormOpen(true);
  };

  /**
   * Ferme le formulaire de contact
   */
  const handleCloseContactForm = () => {
    setEditingContact(null);
    setIsContactFormOpen(false);
  };

  /**
   * Sauvegarde un contact (création ou mise à jour)
   * @param {Object} contactData - Données du contact
   */
  const handleSaveContact = (contactData) => {
    if (editingContact) {
      contactsActions.update(editingContact.id, contactData);
      setEditingContact(null);
    } else {
      contactsActions.add(contactData);
    }
    setIsContactFormOpen(false);
  };

  return {
    handleOpenContactForm,
    handleCloseContactForm,
    handleSaveContact
  };
};
