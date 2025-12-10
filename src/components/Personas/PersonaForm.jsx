import { useState, useEffect } from 'react';
import { User, MessageSquare, Monitor, AlertCircle, Save } from 'lucide-react';
import {
  FormModal,
  FormHeader,
  FormSection,
  FormGrid,
  FormFooter,
  Input,
  Textarea,
  CustomSelect,
  DynamicList,
  ProductDropdown,
  MultiSelector
} from '../ui';

const PersonaForm = ({ persona, contacts, userNeeds, interviews, products, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '👤',
    role: '',
    age: '',
    demographic: '',
    company: '',
    seniority: '',
    teamSize: '',
    goals: [''],
    frustrations: [''],
    motivations: [''],
    techLevel: 'intermediate',
    preferredChannels: [],
    usageFrequency: 'weekly',
    environment: '',
    devices: [],
    quote: '',
    isPrimary: false,
    linkedContactIds: [],
    linkedNeedIds: [],
    linkedInterviewIds: [],
    productId: ''
  });

  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const isEditMode = !!persona;

  useEffect(() => {
    if (persona) {
      setFormData({
        name: persona.name || '',
        avatar: persona.avatar || '👤',
        role: persona.role || '',
        age: persona.age || '',
        demographic: persona.demographic || '',
        company: persona.company || '',
        seniority: persona.seniority || '',
        teamSize: persona.teamSize || '',
        goals: persona.goals?.length > 0 ? persona.goals : [''],
        frustrations: persona.frustrations?.length > 0 ? persona.frustrations : [''],
        motivations: persona.motivations?.length > 0 ? persona.motivations : [''],
        techLevel: persona.techLevel || 'intermediate',
        preferredChannels: persona.preferredChannels || [],
        usageFrequency: persona.usageFrequency || 'weekly',
        environment: persona.environment || '',
        devices: persona.devices || [],
        quote: persona.quote || '',
        isPrimary: persona.isPrimary || false,
        linkedContactIds: persona.linkedContactIds || [],
        linkedNeedIds: persona.linkedNeedIds || [],
        linkedInterviewIds: persona.linkedInterviewIds || [],
        productId: persona.productId || ''
      });
    }
  }, [persona]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};

    // Champs obligatoires (true seulement)
    if (!formData.name?.trim()) {
      newErrors.name = true;
    }

    if (!formData.role?.trim()) {
      newErrors.role = true;
    }

    if (!formData.productId) {
      newErrors.productId = true;
    }

    const validGoals = formData.goals.filter(g => g.trim() !== '');
    if (validGoals.length === 0) {
      newErrors.goals = 'Au moins un objectif est requis';
    }

    setErrors(newErrors);
  }, [formData.name, formData.role, formData.productId, formData.goals]);

  const emojis = ['👤', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🔬', '👩‍🔬', '👨‍🎓', '👩‍🎓', '👨‍⚕️', '👩‍⚕️', '👨‍🏫', '👩‍🏫', '🧑‍💼', '🧑‍💻'];

  const channelOptions = [
    'Email',
    'Téléphone',
    'Visioconférence',
    'Messagerie instantanée',
    'Face à face',
    'Documentation',
    'Tutoriels vidéo'
  ];

  const deviceOptions = [
    'Ordinateur de bureau',
    'Ordinateur portable',
    'Tablette',
    'Smartphone',
    'Terminal mobile'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      return;
    }

    const cleanedData = {
      ...formData,
      goals: formData.goals.filter(g => g.trim() !== ''),
      frustrations: formData.frustrations.filter(f => f.trim() !== ''),
      motivations: formData.motivations.filter(m => m.trim() !== '')
    };

    onSubmit(cleanedData);
  };

  const isFormValid = Object.keys(errors).length === 0;

  // Composant d'aide contextuelle
  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">📦 Produit associé</p>
        <p className="text-emerald-800 ml-2">Sélectionnez le produit pour lequel vous créez ce persona.</p>
      </div>
      <div>
        <p className="font-semibold">👤 Identité</p>
        <p className="text-emerald-800 ml-2">Choisissez avatar, nom, rôle et âge représentatifs.</p>
      </div>
      <div>
        <p className="font-semibold">💼 Contexte Professionnel</p>
        <p className="text-emerald-800 ml-2">Type d'entreprise, ancienneté, taille équipe.</p>
      </div>
      <div>
        <p className="font-semibold">❤️ Profil Psychologique</p>
        <p className="text-emerald-800 ml-2">Objectifs, frustrations et motivations clés.</p>
      </div>
      <div>
        <p className="font-semibold">📱 Comportements & Usage</p>
        <p className="text-emerald-800 ml-2">Niveau technique, fréquence, environnement.</p>
      </div>
      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-emerald-800 ml-2">• Basez-vous sur de vrais contacts • Au moins 1 objectif requis • Choisissez un persona primaire par produit</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={isEditMode ? 'Modifier le Persona' : 'Nouveau Persona'}
        icon={User}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* 1. Produit associé - emerald */}
        <FormSection 
          title="Produit associé" 
          emoji="📦"
          required
        >
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-3">
            {products.filter(p => p.status === 'active').length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 flex items-center gap-1">
                  <AlertCircle size={16} />
                  <strong>Aucun produit actif disponible.</strong>
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Créez d'abord un produit dans le module <strong>Produits</strong>.
                </p>
              </div>
            ) : (
              <>
                <ProductDropdown
                  products={products.filter(p => p.status === 'active')}
                  value={formData.productId}
                  onChange={(productId) => handleFieldChange('productId', productId)}
                  placeholder="-- Sélectionner un produit --"
                  emptyMessage="Aucun produit actif disponible"
                  required
                  error={errors.productId}
                />
              </>
            )}
          </div>
        </FormSection>

        {/* 2. Identité du Persona - teal */}
        <FormSection title="Identité du Persona" emoji="👤" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
            {/* Avatar */}
            <div>
              <div className="flex flex-wrap gap-2">
                {emojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleFieldChange('avatar', emoji)}
                    className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                      formData.avatar === emoji
                        ? 'border-emerald-500 bg-white scale-110'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <FormGrid columns={2}>
              <Input
                label="Nom du Persona"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
                placeholder="Ex: Marie, la Manager Pressée"
              />

              <Input
                label="Rôle / Métier"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                error={errors.role}
                placeholder="Ex: Chef de projet"
              />
            </FormGrid>

            <FormGrid columns={2}>
              <Input
                label="Tranche d'âge"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Ex: 35-45 ans"
              />

              <Input
                label="Démographie"
                name="demographic"
                value={formData.demographic}
                onChange={handleChange}
                placeholder="Ex: Urbain, France"
              />
            </FormGrid>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPrimary"
                  checked={formData.isPrimary}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-normal text-gray-700">
                  ⭐ Persona primaire
                </span>
              </label>
            </div>
          </div>
        </FormSection>

        {/* 3. Contexte Professionnel - emerald */}
        <FormSection title="Contexte Professionnel" emoji="💼">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <FormGrid columns={3}>
              <Input
                label="Type d'entreprise"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Ex: PME, Startup"
              />

              <Input
                label="Ancienneté"
                name="seniority"
                value={formData.seniority}
                onChange={handleChange}
                placeholder="Ex: 5-10 ans"
              />

              <Input
                label="Taille équipe"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                placeholder="Ex: 5-10 pers."
              />
            </FormGrid>
          </div>
        </FormSection>

        {/* 4. Profil Psychologique - teal */}
        <FormSection title="Profil Psychologique" emoji="❤️" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
            {/* Objectifs */}
            <DynamicList
              label="Objectifs principaux"
              items={formData.goals}
              onChange={(newGoals) => handleFieldChange('goals', newGoals)}
              placeholder="Ex: Gagner du temps sur les tâches répétitives"
              addButtonLabel="Ajouter un objectif"
              required
            />

            {/* Frustrations */}
            <DynamicList
              label="Frustrations"
              items={formData.frustrations}
              onChange={(newFrustrations) => handleFieldChange('frustrations', newFrustrations)}
              placeholder="Ex: Interface trop complexe avec trop de clics"
              addButtonLabel="Ajouter une frustration"
            />

            {/* Motivations */}
            <DynamicList
              label="Motivations"
              items={formData.motivations}
              onChange={(newMotivations) => handleFieldChange('motivations', newMotivations)}
              placeholder="Ex: Être reconnu pour son efficacité"
              addButtonLabel="Ajouter une motivation"
            />
          </div>
        </FormSection>

        {/* 5. Comportements & Usage - emerald */}
        <FormSection title="Comportements & Usage" emoji="📱">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-4">
            <FormGrid columns={2}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Niveau technique</label>
                <CustomSelect
                  value={formData.techLevel}
                  onChange={handleChange}
                  options={[
                    { value: 'novice', label: 'Débutant' },
                    { value: 'intermediate', label: 'Intermédiaire' },
                    { value: 'expert', label: 'Expert' }
                  ]}
                  aria-label="Niveau technique"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Fréquence d'utilisation</label>
                <CustomSelect
                  value={formData.usageFrequency}
                  onChange={handleChange}
                  options={[
                    { value: 'daily', label: 'Quotidienne' },
                    { value: 'weekly', label: 'Hebdomadaire' },
                    { value: 'monthly', label: 'Mensuelle' },
                    { value: 'occasional', label: 'Occasionnelle' }
                  ]}
                  aria-label="Fréquence d'utilisation"
                />
              </div>
            </FormGrid>

            <Input
              label="Environnement d'utilisation"
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              placeholder="Ex: Bureau, déplacements fréquents"
            />

            {/* Canaux préférés */}
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare size={14} />
                Canaux de communication
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {channelOptions.map(channel => (
                  <label key={channel} className="flex items-center gap-2 cursor-pointer text-sm bg-white rounded px-2 py-1 border border-emerald-200">
                    <input
                      type="checkbox"
                      checked={formData.preferredChannels.includes(channel)}
                      onChange={() => toggleArrayValue('preferredChannels', channel)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-gray-700">{channel}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Appareils */}
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-2 flex items-center gap-2">
                <Monitor size={14} />
                Appareils utilisés
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {deviceOptions.map(device => (
                  <label key={device} className="flex items-center gap-2 cursor-pointer text-sm bg-white rounded px-2 py-1 border border-emerald-200">
                    <input
                      type="checkbox"
                      checked={formData.devices.includes(device)}
                      onChange={() => toggleArrayValue('devices', device)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-gray-700">{device}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        {/* 6. Citation Signature - teal */}
        <FormSection title="Citation Signature" emoji="💬">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <Textarea
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: « J'ai besoin d'outils simples qui ne me ralentissent pas »"
            />
          </div>
        </FormSection>

        {/* 7. Contacts qui ont inspiré ce persona - emerald */}
        <FormSection title="Contacts qui ont inspiré ce persona" emoji="👥">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <MultiSelector
              items={contacts}
              selectedIds={formData.linkedContactIds}
              onChange={(linkedContactIds) => handleFieldChange('linkedContactIds', linkedContactIds)}
              emptyMessage="Aucun contact disponible"
              placeholder="Rechercher un contact..."
              searchable={true}
              getItemKey={(contact) => contact.id}
              getItemLabel={(contact) => contact.name}
              getItemSubLabel={(contact) => contact.role || contact.company}
            />
          </div>
        </FormSection>
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

export default PersonaForm;
