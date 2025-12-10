import { createContext, useContext, useMemo } from 'react';
import { useContacts } from '../hooks/useContacts';
import { useOthers } from '../hooks/useOthers';

const ContactsContext = createContext(null);

/**
 * ContactsProvider - Contexte pour les contacts et équipes
 * Gère les stakeholders, les équipes et les membres d'équipe
 */
export const ContactsProvider = ({ children, showNotification }) => {
  const contacts = useContacts(showNotification);
  const others = useOthers(showNotification);

  const value = useMemo(() => ({
    // Données
    contacts: contacts.contacts,
    teams: others.teams,
    teamMembers: others.teams.flatMap(team => 
      (team.memberContactIds || []).map(contactId => ({
        teamId: team.id,
        contactId
      }))
    ),
    
    // Actions
    contactsActions: {
      add: contacts.addContact,
      update: contacts.updateContact,
      delete: contacts.deleteContact,
      import: contacts.importContacts,
      refresh: contacts.refreshContacts
    },
    teamsActions: {
      add: others.addTeam,
      update: others.updateTeam,
      delete: others.deleteTeam,
      import: others.importTeams,
      refresh: others.refreshAll
    }
  }), [
    contacts.contacts,
    others.teams,
    contacts.addContact,
    contacts.updateContact,
    contacts.deleteContact,
    contacts.importContacts,
    contacts.refreshContacts,
    others.addTeam,
    others.updateTeam,
    others.deleteTeam,
    others.importTeams,
    others.refreshAll
  ]);

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

/**
 * Hook pour consommer le ContactsContext
 * Utilisation : const { contacts, teams, contactsActions, teamsActions } = useContactsContext();
 */
export const useContactsContext = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContactsContext must be used within ContactsProvider');
  }
  return context;
};
