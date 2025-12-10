import { useState, useEffect } from 'react';
import { UserCircle, Save } from 'lucide-react';
import { CONTACT_TYPES, CONTACT_TYPE_LABELS } from '../../utils/constants';
import { getSettings } from '../../utils/storage';
import {
  FormModal,
  FormHeader,
  FormSection,
  FormGrid,
  FormFooter,
  Input,
  Textarea,
  CustomSelect,
  StatusSelector,
  ProductDropdown,
  DynamicList
} from '../ui';
import ContactTeamFields from './ContactTeamFields';

// Configuration des types de contact
const TYPE_OPTIONS = [
  {
    value: CONTACT_TYPES.INTERNAL,
    label: CONTACT_TYPE_LABELS[CONTACT_TYPES.INTERNAL],
    emoji: '👤',
    description: 'Membre de l\'équipe',
    colorClass: 'emerald'
  },
  {
    value: CONTACT_TYPES.EXTERNAL,
    label: CONTACT_TYPE_LABELS[CONTACT_TYPES.EXTERNAL],
    emoji: '🏢',
    description: 'Partenaire, fournisseur',
    colorClass: 'teal'
  },
  {
    value: CONTACT_TYPES.CLIENT,
    label: CONTACT_TYPE_LABELS[CONTACT_TYPES.CLIENT],
    emoji: '👥',
    description: 'Client, utilisateur final',
    colorClass: 'cyan'
  }
];

const ContactForm = ({ contact, products = [], onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    // Informations de base
    name: '',
    role: '',
    customRole: '',
    type: CONTACT_TYPES.INTERNAL,
    company: '',
    customCompany: '',
    department: '',
    customDepartment: '',
    email: '',
    phone: '',
    notes: '',
    productIds: [],
    
    // Champs équipe
    seniority: 'na',
    skills: [],
    capacity: 0,
    availability: 100,
    workload: 100,
    contractType: 'full_time',
    dailyRate: '',
    currency: 'EUR',
    location: '',
    timezone: 'Europe/Paris',
    workingHours: '9h-18h',
    startDate: '',
    endDate: '',
    isActive: false,
    isAvailable: false,
    preferences: ''
  });

  const [errors, setErrors] = useState({});
  const [settings, setSettings] = useState({ roles: [], companies: [], departments: [] });
  const [showTeamFields, setShowTeamFields] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const isEditMode = !!contact;

  // Charger les settings au montage
  useEffect(() => {
    const loadedSettings = getSettings();
    setSettings(loadedSettings);
  }, []);

  useEffect(() => {
    if (contact) {
      // Vérifier si le rôle est dans la liste configurée
      const isConfiguredRole = settings.roles.includes(contact.role);
      const isConfiguredCompany = settings.companies.includes(contact.company);
      const isConfiguredDepartment = settings.departments.includes(contact.department);
      
      // Déterminer si les champs équipe doivent être affichés
      const hasTeamFields = !!(
        contact.skills?.length > 0 || 
        contact.capacity || 
        contact.contractType ||
        contact.seniority !== 'intermediate'
      );
      
      setFormData({
        name: contact.name || '',
        role: isConfiguredRole ? contact.role : 'Autre (personnalisé)',
        customRole: isConfiguredRole ? '' : contact.role || '',
        type: contact.type || CONTACT_TYPES.INTERNAL,
        company: isConfiguredCompany ? contact.company : 'Autre (personnalisé)',
        customCompany: isConfiguredCompany ? '' : contact.company || '',
        department: isConfiguredDepartment ? contact.department : 'Autre (personnalisé)',
        customDepartment: isConfiguredDepartment ? '' : contact.department || '',
        email: contact.email || '',
        phone: contact.phone || '',
        notes: contact.notes || '',
        productIds: contact.productIds || [],
        
        // Champs équipe
        seniority: contact.seniority || 'na',
        skills: contact.skills || [],
        capacity: contact.capacity !== undefined ? contact.capacity : 0,
        availability: contact.availability !== undefined ? contact.availability : 100,
        workload: contact.workload !== undefined ? contact.workload : 100,
        contractType: contact.contractType || (contact.type === CONTACT_TYPES.INTERNAL ? 'full_time' : 'freelance'),
        dailyRate: contact.dailyRate || '',
        currency: contact.currency || 'EUR',
        location: contact.location || '',
        timezone: contact.timezone || 'Europe/Paris',
        workingHours: contact.workingHours || '9h-18h',
        startDate: contact.startDate || '',
        endDate: contact.endDate || '',
        isActive: contact.isActive !== undefined ? contact.isActive : false,
        isAvailable: contact.isAvailable !== undefined ? contact.isAvailable : false,
        preferences: contact.preferences || ''
      });
      
      setShowTeamFields(hasTeamFields);
    }
  }, [contact, settings, products]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};
    
    // Champs obligatoires (juste pour désactiver le bouton, pas de message)
    if (!formData.name.trim()) {
      newErrors.name = true; // Pas de message
    }
    
    const finalRole = formData.role === 'Autre (personnalisé)' ? formData.customRole : formData.role;
    if (!finalRole.trim()) {
      newErrors.role = true; // Pas de message
    }
    
    // Produits : Non obligatoires (retiré)
    
    // Validations de format (avec message)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation champs équipe si affichés
    if (showTeamFields) {
      if (formData.capacity < 0) {
        newErrors.capacity = 'La capacité doit être supérieure ou égale à 0';
      }

      if (formData.availability < 0 || formData.availability > 100) {
        newErrors.availability = 'La disponibilité doit être entre 0 et 100%';
      }

      if (formData.workload < 0 || formData.workload > 100) {
        newErrors.workload = 'Le temps sur produit doit être entre 0 et 100%';
      }

      if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
        newErrors.endDate = 'La date de départ doit être après la date d\'arrivée';
      }
    }
    
    setErrors(newErrors);
  }, [formData, showTeamFields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProductChange = (productIds) => {
    setFormData(prev => ({
      ...prev,
      productIds: Array.isArray(productIds) ? productIds : [productIds]
    }));
  };

  const handleSkillsChange = (newSkills) => {
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    const finalRole = formData.role === 'Autre (personnalisé)' ? formData.customRole : formData.role;
    const finalCompany = formData.company === 'Autre (personnalisé)' ? formData.customCompany : formData.company;
    const finalDepartment = formData.department === 'Autre (personnalisé)' ? formData.customDepartment : formData.department;

    const cleanData = {
      name: formData.name.trim(),
      role: finalRole.trim(),
      type: formData.type,
      company: finalCompany.trim(),
      department: finalDepartment.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      notes: formData.notes.trim(),
      productIds: formData.productIds,
      
      // Champs équipe (si affichés)
      ...(showTeamFields ? {
        seniority: formData.seniority,
        skills: formData.skills,
        capacity: formData.capacity,
        availability: formData.availability,
        workload: formData.workload,
        contractType: formData.contractType,
        dailyRate: formData.dailyRate,
        currency: formData.currency,
        location: formData.location.trim(),
        timezone: formData.timezone.trim(),
        workingHours: formData.workingHours.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        isActive: formData.isActive,
        isAvailable: formData.isAvailable,
        preferences: formData.preferences.trim()
      } : {})
    };

    onSave(cleanData);
  };

  const isFormValid = Object.keys(errors).length === 0;
  const showCustomRole = formData.role === 'Autre (personnalisé)';
  const showCustomCompany = formData.company === 'Autre (personnalisé)';
  const showCustomDepartment = formData.department === 'Autre (personnalisé)';
  
  const activeProducts = products.filter(p => p.status === 'active');
  const hasNoActiveProducts = activeProducts.length === 0;

  // Composant d'aide contextuelle
  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">📦 Produits associés</p>
        <p className="text-emerald-800 ml-2">Sélectionnez les produits sur lesquels ce contact intervient. Par défaut, tous les produits actifs sont pré-sélectionnés. Le contact apparaîtra dans les sélecteurs uniquement pour ces produits.</p>
      </div>

      <div>
        <p className="font-semibold">#️⃣ Identification</p>
        <p className="text-emerald-800 ml-2"><strong>Nom</strong> : Prénom et nom (ex: "Marie Dubois"). <strong>Rôle</strong> : Fonction exercée. Gérez les listes dans Paramétrage.</p>
      </div>

      <div>
        <p className="font-semibold">👥 Type de contact</p>
        <p className="text-emerald-800 ml-2"><strong>Interne</strong> : Membre équipe (champs équipe affichés par défaut). <strong>Externe</strong> : Client, partenaire (champs équipe optionnels).</p>
      </div>

      <div>
        <p className="font-semibold">🏛️ Organisation</p>
        <p className="text-emerald-800 ml-2"><strong>Interne</strong> : Département. <strong>Externe</strong> : Entreprise. Listes gérées dans Paramétrage.</p>
      </div>

      <div>
        <p className="font-semibold">📞 Coordonnées</p>
        <p className="text-emerald-800 ml-2">Email (validation auto) et téléphone avec indicatif international si nécessaire.</p>
      </div>

      <div>
        <p className="font-semibold">👥 Informations Équipe</p>
        <p className="text-emerald-800 ml-2"><strong>Capacité</strong> : Story points/sprint. <strong>Disponibilité</strong> : % temps projet. <strong>% Temps produit</strong> : Part allouée au produit. <strong>Capacité ajustée</strong> : Calcul auto pour planification. Renseignez dates, contrat, localisation, statuts (actif/disponible) pour coordination optimale.</p>
      </div>

      <div>
        <p className="font-semibold">📝 Notes</p>
        <p className="text-emerald-800 ml-2">Contexte, historique, préférences de communication.</p>
      </div>

      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-emerald-800 ml-2">• Associez aux bons produits • Renseignez coordonnées et infos équipe • Mettez à jour régulièrement • Utilisez listes Paramétrage</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={isEditMode ? 'Modifier le contact' : 'Nouveau contact'}
        icon={UserCircle}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* 1. Produits associés */}
        <FormSection 
          title="Produits associés" 
          emoji="📦"
        >
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <ProductDropdown
              products={activeProducts}
              value={formData.productIds}
              onChange={handleProductChange}
              multiple={true}
              placeholder="-- Sélectionner les produits --"
              emptyMessage="Aucun produit actif disponible. Créez d'abord un produit dans le module Produits avant d'ajouter des contacts."
            />
          </div>
        </FormSection>

        {/* 2. Identification */}
        <FormSection title="Identification" emoji="#️⃣">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
            <Input
              label="Nom complet"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name}
              placeholder="Ex: Jean Dupont"
            />

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Rôle / Poste <span className="text-red-500">*</span>
              </label>
              <CustomSelect
                value={formData.role}
                onChange={handleChange}
                options={
                  settings.roles.length > 0
                    ? [
                        { value: '', label: '-- Sélectionner un rôle --' },
                        ...settings.roles.map(role => ({ value: role, label: role })),
                        { value: 'Autre (personnalisé)', label: '✏️ Autre (personnalisé)' }
                      ]
                    : [
                        { value: '', label: '-- Sélectionner un rôle --' },
                        { value: 'Autre (personnalisé)', label: '✏️ Saisir un rôle personnalisé' }
                      ]
                }
                placeholder="-- Sélectionner un rôle --"
                aria-label="Rôle / Poste"
              />
              {settings.roles.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  💡 Ajoutez des rôles dans <strong>Paramétrage</strong>
                </p>
              )}
            </div>

            {showCustomRole && (
              <div className="pl-4 border-l-2 border-emerald-300">
                <Input
                  label="Rôle personnalisé"
                  name="customRole"
                  value={formData.customRole}
                  onChange={handleChange}
                  required
                  placeholder="Saisissez le rôle..."
                  autoFocus
                />
              </div>
            )}
          </div>
        </FormSection>

        {/* 3. Type */}
        <FormSection title="Type de contact" emoji="👥">
          {isEditMode && (
            <span className="text-xs text-emerald-600 font-normal">
              (modifiable)
            </span>
          )}
          
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <StatusSelector
            value={formData.type}
            onChange={(type) => {
              const defaultContractType = type === CONTACT_TYPES.INTERNAL ? 'full_time' : 'freelance';
              setFormData(prev => ({ ...prev, type, contractType: defaultContractType }));
              
              // Adapter l'affichage des champs équipe pour nouveaux contacts
              if (type === CONTACT_TYPES.INTERNAL && !isEditMode) {
                setShowTeamFields(true);
              } else if ((type === CONTACT_TYPES.EXTERNAL || type === CONTACT_TYPES.CLIENT) && !isEditMode) {
                setShowTeamFields(false);
              }
            }}
            options={TYPE_OPTIONS}
            columns={3}
          />
          </div>
        </FormSection>

        {/* 4. Organisation */}
        <FormSection 
          title={formData.type === CONTACT_TYPES.INTERNAL ? 'Département' : 'Entreprise'} 
          emoji={formData.type === CONTACT_TYPES.INTERNAL ? '🏛️' : '🏢'}
        >
          {formData.type !== CONTACT_TYPES.INTERNAL ? (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
              <CustomSelect
                value={formData.company}
                onChange={handleChange}
                options={
                  settings.companies.length > 0
                    ? [
                        { value: '', label: '-- Sélectionner une entreprise --' },
                        ...settings.companies.map(company => ({ value: company, label: company })),
                        { value: 'Autre (personnalisé)', label: '✏️ Autre (personnalisé)' }
                      ]
                    : [
                        { value: '', label: '-- Sélectionner une entreprise --' },
                        { value: 'Autre (personnalisé)', label: '✏️ Saisir une entreprise personnalisée' }
                      ]
                }
                placeholder="-- Sélectionner une entreprise --"
                aria-label="Entreprise"
              />
              {settings.companies.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  💡 Ajoutez des entreprises dans <strong>Paramétrage</strong>
                </p>
              )}

              {showCustomCompany && (
                <div className="pl-4 border-l-2 border-emerald-300">
                  <Input
                    label="Entreprise personnalisée"
                    name="customCompany"
                    value={formData.customCompany}
                    onChange={handleChange}
                    placeholder="Saisissez le nom de l'entreprise..."
                    autoFocus
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
              <CustomSelect
                value={formData.department}
                onChange={handleChange}
                options={
                  settings.departments.length > 0
                    ? [
                        { value: '', label: '-- Sélectionner un département --' },
                        ...settings.departments.map(dept => ({ value: dept, label: dept })),
                        { value: 'Autre (personnalisé)', label: '✏️ Autre (personnalisé)' }
                      ]
                    : [
                        { value: '', label: '-- Sélectionner un département --' },
                        { value: 'Autre (personnalisé)', label: '✏️ Saisir un département personnalisé' }
                      ]
                }
                placeholder="-- Sélectionner un département --"
                aria-label="Département"
              />
              {settings.departments.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  💡 Ajoutez des départements dans <strong>Paramétrage</strong>
                </p>
              )}

              {showCustomDepartment && (
                <div className="pl-4 border-l-2 border-emerald-300">
                  <Input
                    label="Département personnalisé"
                    name="customDepartment"
                    value={formData.customDepartment}
                    onChange={handleChange}
                    placeholder="Saisissez le nom du département..."
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}
        </FormSection>

        {/* 5. Coordonnées */}
        <FormSection title="Coordonnées" emoji="📞">
          <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-100">
          <FormGrid columns={2}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Ex: contact@exemple.com"
            />

            <Input
              label="Téléphone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ex: +33 6 12 34 56 78"
            />
          </FormGrid>
          </div>
        </FormSection>

        {/* 6. Champs Équipe */}
        <FormSection title="Informations Équipe" emoji="👥">
          <div className="flex items-center justify-between -mt-7 mb-4">
            <div></div>
            <button
              type="button"
              onClick={() => setShowTeamFields(!showTeamFields)}
              className="text-xs text-gray-600 hover:text-gray-900 font-medium"
            >
              {showTeamFields ? '➖ Masquer' : '➕ Afficher'}
            </button>
          </div>

          {showTeamFields && (
            <ContactTeamFields
              formData={formData}
              errors={errors}
              onFieldChange={handleChange}
              onSkillsChange={handleSkillsChange}
            />
          )}
        </FormSection>

        {/* 7. Notes */}
        <div className="mt-4">
          <FormSection title="Notes" emoji="📝">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Contexte, préférences de communication..."
          />
          </div>
        </FormSection>
        </div>
      </form>

      <FormFooter
        onCancel={onCancel}
        onSubmit={handleSubmit}
        submitLabel="Sauvegarder"
        submitIcon={Save}
        submitDisabled={!isFormValid}
        errorMessage={!isFormValid ? 'Veuillez remplir tous les champs requis' : null}
      />
    </FormModal>
  );
};

export default ContactForm;
