import { useState, useEffect } from 'react';
import { Users, AlertCircle, Save } from 'lucide-react';
import { 
  FormModal, 
  FormHeader, 
  FormSection, 
  FormFooter,
  Input, 
  Textarea, 
  CustomSelect,
  StatusSelector,
  ProductDropdown
} from '../ui';

// Configuration des statuts
const STATUS_OPTIONS = [
  { 
    value: 'active', 
    label: 'Active', 
    emoji: '✓', 
    description: 'Équipe en activité',
    colorClass: 'emerald'
  },
  { 
    value: 'inactive', 
    label: 'Inactive', 
    emoji: '⏸️', 
    description: 'Équipe archivée',
    colorClass: 'gray'
  }
];

const TeamForm = ({ team, contacts, products, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    productIds: [],
    memberContactIds: [],
    leadContactId: ''
  });

  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);

  const isEditMode = !!team;

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || '',
        description: team.description || '',
        status: team.status || 'active',
        productIds: team.productIds || [],
        memberContactIds: team.memberContactIds || [],
        leadContactId: team.leadContactId || ''
      });
    } else {
      // Pré-sélectionner tous les produits actifs par défaut
      const activeProducts = products.filter(p => p.status === 'active');
      if (activeProducts.length > 0) {
        setFormData(prev => ({ 
          ...prev, 
          productIds: activeProducts.map(p => p.id) 
        }));
      }
    }
  }, [team, products]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};
    
    // Champs obligatoires (true seulement, pas de message)
    if (!formData.name.trim()) {
      newErrors.name = true;
    }
    
    if (formData.memberContactIds.length === 0) {
      newErrors.members = true;
    }

    // Validation de logique (avec message)
    if (formData.leadContactId && !formData.memberContactIds.includes(formData.leadContactId)) {
      newErrors.lead = 'Le lead doit être membre de l\'équipe';
    }
    
    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer la sélection multiple de produits
  const handleProductChange = (productIds) => {
    setFormData(prev => ({
      ...prev,
      productIds: Array.isArray(productIds) ? productIds : [productIds]
    }));
  };

  // Gérer la sélection multiple de membres
  const handleMemberToggle = (contactId) => {
    setFormData(prev => {
      const isSelected = prev.memberContactIds.includes(contactId);
      const newMemberIds = isSelected
        ? prev.memberContactIds.filter(id => id !== contactId)
        : [...prev.memberContactIds, contactId];
      
      // Si on retire le lead, réinitialiser leadContactId
      const newLeadId = isSelected && prev.leadContactId === contactId 
        ? '' 
        : prev.leadContactId;
      
      return {
        ...prev,
        memberContactIds: newMemberIds,
        leadContactId: newLeadId
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    const cleanData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
      productIds: formData.productIds,
      memberContactIds: formData.memberContactIds,
      leadContactId: formData.leadContactId
    };

    onSave(cleanData);
  };

  const isFormValid = Object.keys(errors).length === 0;
  
  const activeProducts = products.filter(p => p.status === 'active');
  const availableMembers = contacts.filter(c => c.isActive === true);

  // Calculer capacité totale équipe
  const calculateTeamCapacity = () => {
    return formData.memberContactIds.reduce((sum, contactId) => {
      const contact = contacts.find(c => c.id === contactId);
      if (!contact || !contact.capacity) return sum;
      
      const adjustedCapacity = (contact.capacity * (contact.availability ?? 100) * (contact.workload ?? 100)) / 10000;
      return sum + adjustedCapacity;
    }, 0);
  };

  const teamCapacity = Math.round(calculateTeamCapacity());

  // Composant d'aide contextuelle
  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">📦 Produits associés</p>
        <p className="text-emerald-800 ml-2">Sélectionnez les produits sur lesquels l'équipe travaille. Par défaut, tous les produits actifs sont pré-sélectionnés.</p>
      </div>

      <div>
        <p className="font-semibold">ℹ️ Informations de base</p>
        <p className="text-emerald-800 ml-2"><strong>Nom</strong> : Identifiant clair (ex: "Squad Frontend", "Team Backend"). <strong>Description</strong> : Objectif, périmètre, technologies utilisées.</p>
      </div>

      <div>
        <p className="font-semibold">📊 Statut</p>
        <p className="text-emerald-800 ml-2"><strong>Active</strong> : Équipe en activité. <strong>Inactive</strong> : Équipe archivée (conservée pour historique).</p>
      </div>

      <div>
        <p className="font-semibold">👥 Membres de l'équipe</p>
        <p className="text-emerald-800 ml-2">Sélectionnez les contacts avec le champ "Membre actif" coché. La capacité ajustée de chaque membre s'affiche. Au moins 1 membre requis.</p>
      </div>

      <div>
        <p className="font-semibold">👤 Team Lead</p>
        <p className="text-emerald-800 ml-2">Optionnel. Le référent doit être membre de l'équipe. Facilite l'identification du responsable.</p>
      </div>

      <div>
        <p className="font-semibold">📊 Capacité totale</p>
        <p className="text-emerald-800 ml-2">Somme automatique des capacités ajustées de tous les membres. Utile pour planification sprint.</p>
      </div>

      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-emerald-800 ml-2">• Regroupez les personnes travaillant ensemble • Nommez clairement (Squad/Team/Chapter) • Mettez à jour régulièrement la composition • Archivez plutôt que supprimer</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={isEditMode ? 'Modifier l\'équipe' : 'Nouvelle équipe'}
        icon={Users}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* 1. Produits associés - Fond emerald */}
        <FormSection title="Produits associés" emoji="📦">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <ProductDropdown
              products={activeProducts}
              value={formData.productIds}
              onChange={handleProductChange}
              multiple={true}
              placeholder="-- Sélectionner les produits --"
              emptyMessage="Aucun produit actif disponible."
            />
          </div>
        </FormSection>

        {/* 2. Informations de base - Fond teal */}
        <FormSection title="Informations de base" emoji="ℹ️" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
            <Input
              label="Nom de l'équipe"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name}
              placeholder="Ex: Squad Frontend, Team Backend, Chapter DevOps..."
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Objectif, périmètre, technologies utilisées..."
            />
          </div>
        </FormSection>

        {/* 3. Statut - Fond emerald */}
        <FormSection title="Statut" emoji="📊">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <StatusSelector
              value={formData.status}
              onChange={(status) => setFormData(prev => ({ ...prev, status }))}
              options={STATUS_OPTIONS}
              columns={2}
            />
          </div>
        </FormSection>

        {/* 4. Membres de l'équipe - Fond teal */}
        <FormSection title="Membres de l'équipe" emoji="👥" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            {formData.memberContactIds.length > 0 && (
              <div className="mb-4">
                <span className="text-emerald-600 font-semibold text-sm">
                  {formData.memberContactIds.length} membre{formData.memberContactIds.length > 1 ? 's' : ''} sélectionné{formData.memberContactIds.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
            
            {availableMembers.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 flex items-center gap-1">
                  <AlertCircle size={16} />
                  <strong>Aucun contact avec champs équipe disponible.</strong>
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Ajoutez des informations équipe aux contacts internes dans le module <strong>Contacts</strong>.
                </p>
              </div>
            ) : (
              <>
                {formData.memberContactIds.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2 p-3 bg-white border border-emerald-200 rounded-lg">
                    {formData.memberContactIds.map(contactId => {
                      const contact = contacts.find(c => c.id === contactId);
                      return contact ? (
                        <span 
                          key={contactId}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700"
                        >
                          {contact.name}
                          <button
                            type="button"
                            onClick={() => handleMemberToggle(contactId)}
                            className="ml-1 hover:text-emerald-900"
                          >
                            ✕
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                
                <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white">
                  {availableMembers.map(contact => {
                    const adjustedCapacity = contact.capacity 
                      ? Math.round((contact.capacity * (contact.availability ?? 100) * (contact.workload ?? 100)) / 10000)
                      : 0;
                    
                    return (
                      <label 
                        key={contact.id} 
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.memberContactIds.includes(contact.id)}
                          onChange={() => handleMemberToggle(contact.id)}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate">
                            {contact.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {contact.role}
                            {adjustedCapacity > 0 && (
                              <span className="ml-2 text-emerald-600 font-semibold">
                                • {adjustedCapacity} pts
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
                
                {errors.members && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle size={12} />
                    Ajoutez au moins un membre à l'équipe
                  </p>
                )}
              </>
            )}
          </div>
        </FormSection>

        {/* 5. Team Lead - Fond emerald */}
        {formData.memberContactIds.length > 0 && (
          <FormSection title="Team Lead (optionnel)" emoji="👤">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <CustomSelect
                value={formData.leadContactId}
                onChange={handleChange}
                options={[
                  { value: '', label: '-- Aucun lead --' },
                  ...formData.memberContactIds.map(contactId => {
                    const contact = contacts.find(c => c.id === contactId);
                    return contact ? {
                      value: contactId,
                      label: `${contact.name} - ${contact.role}`
                    } : null;
                  }).filter(Boolean)
                ]}
                placeholder="-- Aucun lead --"
                aria-label="Team Lead"
              />
              
              {errors.lead && (
                <p className="text-xs text-red-600 mt-2">{errors.lead}</p>
              )}
              
              <p className="text-xs text-gray-500 mt-2">
                💡 Le lead doit être membre de l'équipe
              </p>
            </div>
          </FormSection>
        )}

        {/* 6. Récapitulatif Capacité - Fond teal */}
        {formData.memberContactIds.length > 0 && teamCapacity > 0 && (
          <FormSection title="Capacité totale de l'équipe" emoji="📊">
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-700 mt-1">
                    Calculée à partir des capacités ajustées des membres
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-emerald-600">
                    {teamCapacity}
                  </p>
                  <p className="text-xs text-emerald-700">pts/sprint</p>
                </div>
              </div>
            </div>
          </FormSection>
        )}
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

export default TeamForm;
