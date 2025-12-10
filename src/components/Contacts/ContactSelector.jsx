import { useMemo } from 'react';
import CustomSelect from '../ui/CustomSelect';
import { CONTACT_TYPES } from '../../utils/constants';

/**
 * ContactSelector - Sélecteur de contacts avec emojis
 * Version 2.0 - Migration vers CustomSelect (style émeraude)
 * 
 * @component
 * @param {Array} contacts - Liste des contacts
 * @param {string} selectedContactId - ID du contact sélectionné
 * @param {Function} onChange - Callback de changement (reçoit l'ID du contact)
 * @param {string} [label] - Label du champ
 * @param {boolean} [required] - Champ obligatoire
 */
const ContactSelector = ({ 
  contacts, 
  selectedContactId, 
  onChange, 
  label = "Contact associé", 
  required = false 
}) => {
  // Préparer les options pour CustomSelect
  const options = useMemo(() => {
    // Trier les contacts par nom
    const sortedContacts = [...contacts].sort((a, b) => 
      a.name.localeCompare(b.name)
    );

    // Créer les options avec emojis
    return [
      { value: '', label: '-- Aucun contact --' },
      ...sortedContacts.map(contact => ({
        value: contact.id,
        label: `${contact.type === CONTACT_TYPES.INTERNAL ? '👤' : '🏢'} ${contact.name} - ${contact.role}`
      }))
    ];
  }, [contacts]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <CustomSelect
        value={selectedContactId || ''}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        aria-label={label}
      />
    </div>
  );
};

export default ContactSelector;

/**
 * Notes de développement - Migration CustomSelect:
 * 
 * Version 2.0 - Changements :
 * - ✅ Remplacement du <select> natif par CustomSelect
 * - ✅ Style émeraude cohérent (focus:ring-emerald-500)
 * - ✅ Navigation clavier (↑↓, Enter, Escape)
 * - ✅ Emojis préservés (👤 interne, 🏢 externe)
 * - ✅ Tri alphabétique préservé
 * - ✅ Option "Aucun contact" préservée
 * - ✅ useMemo pour optimisation
 * 
 * Comportement identique à la v1.0, mais avec :
 * - Dropdown moderne personnalisé
 * - Hover émeraude sur les options
 * - Sélection visible avec checkmark vert
 * - Fermeture auto au clic extérieur
 * 
 * Usage (identique à la v1.0) :
 * <ContactSelector
 *   contacts={contacts}
 *   selectedContactId={formData.primaryContactId}
 *   onChange={(id) => setFormData({...formData, primaryContactId: id})}
 *   label="Contact principal"
 *   required
 * />
 */
