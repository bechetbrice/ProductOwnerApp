import { useState, useEffect } from 'react';
import { Lightbulb, AlertCircle, Save } from 'lucide-react';
import ContactSelector from '../Contacts/ContactSelector';
import MultiContactSelector from '../Contacts/MultiContactSelector';
import {
  FormModal,
  FormHeader,
  FormSection,
  FormFooter,
  Textarea,
  CustomSelect,
  StatusSelector,
  ProductDropdown,
  MultiSelector
} from '../ui';

const UserNeedForm = ({ need, contacts, userStories = [], interviews = [], Objectives = [], products = [], personas = [], onSubmit, onCancel, onNavigate }) => {
  const [formData, setFormData] = useState({
    stakeholderIds: [],
    context: '',
    objective: '',
    importance: 'medium',
    storyPoints: null,
    primaryContactId: '',
    personaIds: [],
    linkedGoalId: '',
    productId: '',
    sourceInterviewId: ''
  });

  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const isEditMode = !!need;

  const linkedStories = need && need.id 
    ? userStories.filter(story => story.linkedNeedId === need.id)
    : [];

  useEffect(() => {
    if (need) {
      let stakeholderIds = need.stakeholderIds || [];
      
      if (!stakeholderIds.length && need.client) {
        const matchingContact = contacts.find(c => 
          c.name.toLowerCase() === need.client.toLowerCase() ||
          c.company?.toLowerCase() === need.client.toLowerCase()
        );
        if (matchingContact) {
          stakeholderIds = [matchingContact.id];
        }
      }

      const primaryContactId = need.primaryContactId || need.contactId || '';

      setFormData({
        stakeholderIds,
        context: need.context || '',
        objective: need.objective || '',
        importance: need.importance || 'medium',
        storyPoints: need.storyPoints || null,
        primaryContactId,
        personaIds: need.personaIds || [],
        linkedGoalId: need.linkedGoalId || '',
        productId: need.productId || '',
        sourceInterviewId: need.sourceInterviewId || ''
      });
    } else {
      const defaultProduct = products.find(p => p.status === 'active');
      if (defaultProduct) {
        setFormData(prev => ({ ...prev, productId: defaultProduct.id }));
      }
    }
  }, [need, products, contacts]);

  useEffect(() => {
    const newErrors = {};

    // Champs obligatoires
    if (!formData.productId) {
      newErrors.productId = true;
    }

    if (formData.stakeholderIds.length === 0) {
      newErrors.stakeholderIds = true;
    }

    if (!formData.objective.trim()) {
      newErrors.objective = true;
    }

    setErrors(newErrors);
  }, [formData.productId, formData.stakeholderIds, formData.objective]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    const activeProducts = products.filter(p => p.status === 'active');
    if (activeProducts.length === 0) {
      alert('⚠️ Impossible de créer un besoin : aucun produit actif disponible.');
      return;
    }
    
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNavigate = (entity, id) => {
    if (onNavigate) {
      onCancel();
      onNavigate(entity, id);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
                      products && 
                      products.length > 0 && 
                      products.filter(p => p.status === 'active').length > 0;

  const selectedProduct = products.find(p => p.id === formData.productId);
  const activeProducts = products.filter(p => p.status === 'active');
  
  const selectedStakeholders = formData.stakeholderIds
    .map(id => contacts.find(c => c.id === id))
    .filter(Boolean);

  const IMPORTANCE_OPTIONS = [
    {
      value: 'critical',
      label: '🔴 Critique',
      emoji: '🔴',
      description: 'Bloquant majeur',
      colorClass: 'red',
      icon: '🔴'
    },
    {
      value: 'high',
      label: '🟠 Haute',
      emoji: '🟠',
      description: 'Priorité élevée',
      colorClass: 'orange',
      icon: '🟠'
    },
    {
      value: 'medium',
      label: '🟡 Moyenne',
      emoji: '🟡',
      description: 'Importance modérée',
      colorClass: 'yellow',
      icon: '🟡'
    },
    {
      value: 'low',
      label: '⚪ Basse',
      emoji: '⚪',
      description: 'Amélioration mineure',
      colorClass: 'gray',
      icon: '⚪'
    }
  ];

  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">📦 Produit</p>
        <p className="text-emerald-800 ml-2">Associez le besoin au produit concerné.</p>
      </div>

      <div>
        <p className="font-semibold">🎯 Besoin</p>
        <p className="text-emerald-800 ml-2">Décrivez clairement le besoin utilisateur. {isEditMode && linkedStories.length > 0 ? 'Attention aux stories liées lors de la modification.' : ''}</p>
      </div>

      <div>
        <p className="font-semibold">📝 Description</p>
        <p className="text-emerald-800 ml-2">Contexte et informations complémentaires (optionnel).</p>
      </div>

      <div>
        <p className="font-semibold">⚡ Importance</p>
        <p className="text-emerald-800 ml-2">Critique/Haute/Moyenne/Basse. {isEditMode ? 'Impact possible sur la priorisation.' : ''}</p>
      </div>

      <div>
        <p className="font-semibold">👥 Stakeholders</p>
        <p className="text-emerald-800 ml-2">Au moins un stakeholder requis.</p>
      </div>

      <div>
        <p className="font-semibold">⭐ Contact privilégié</p>
        <p className="text-emerald-800 ml-2">Définissez éventuellement un contact privilégié (optionnel).</p>
      </div>

      <div>
        <p className="font-semibold">💬 Entretien source</p>
        <p className="text-emerald-800 ml-2">Lien optionnel vers l'entretien qui a identifié ce besoin.</p>
      </div>

      <div>
        <p className="font-semibold">👥 Personas</p>
        <p className="text-emerald-800 ml-2">Associez les personas concernés (optionnel).</p>
      </div>

      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-emerald-800 ml-2">• Définir clairement le besoin • Impliquer tous les stakeholders • Lier aux personas concernés</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="lg">
      <FormHeader
        title={isEditMode ? 'Modifier le besoin' : 'Nouveau besoin'}
        icon={Lightbulb}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* 1. Produit - Fond emerald */}
        <FormSection title="Produit associé" emoji="📦" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {activeProducts.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-yellow-800 flex items-center gap-1">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <strong>Aucun produit actif.</strong>
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Créez un produit dans le module <strong>Produits</strong>.
                </p>
              </div>
            ) : (
              <ProductDropdown
                products={activeProducts}
                value={formData.productId}
                onChange={(productId) => setFormData(prev => ({ ...prev, productId }))}
                placeholder="-- Sélectionner un produit --"
                emptyMessage="Aucun produit actif disponible"
                required
                error={errors.productId}
              />
            )}
          </div>
        </FormSection>

        {/* 2. Besoin - Fond teal */}
        <FormSection title="Besoin" emoji="🎯" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <Textarea
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              rows={2}
              placeholder="Décrivez le besoin utilisateur..."
              required
              error={errors.objective}
            />
            {isEditMode && linkedStories.length > 0 && (
              <div className="mt-3 flex items-start gap-2 text-xs text-orange-700 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Attention :</strong> Ce besoin est lié à {linkedStories.length} story{linkedStories.length > 1 ? 's' : ''}. 
                  Toute modification peut impacter {linkedStories.length > 1 ? 'ces stories' : 'cette story'}.
                </span>
              </div>
            )}
          </div>
        </FormSection>

        {/* 3. Description - Fond emerald */}
        <FormSection title="Description" emoji="📝">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <Textarea
              name="context"
              value={formData.context}
              onChange={handleChange}
              rows={3}
              placeholder="Contexte et informations complémentaires sur le besoin..."
            />
          </div>
        </FormSection>

        {/* 4. Importance - Fond teal */}
        <FormSection title="Importance" emoji="⚡">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <StatusSelector
              value={formData.importance}
              onChange={(importance) => setFormData(prev => ({ ...prev, importance }))}
              options={IMPORTANCE_OPTIONS}
              columns={4}
              compact={true}
            />
            {isEditMode && (
              <div className="mt-3 flex items-start gap-2 text-xs text-orange-700 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Attention :</strong> Modifier l'importance peut impacter la priorisation globale du backlog.
                </span>
              </div>
            )}
          </div>
        </FormSection>

        {/* 5. Stakeholders - Fond emerald */}
        <FormSection title="Stakeholders" emoji="👥" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <MultiContactSelector
              contacts={contacts}
              selectedContactIds={formData.stakeholderIds}
              onChange={(stakeholderIds) => setFormData(prev => ({ ...prev, stakeholderIds }))}
              label=""
            />
          </div>
        </FormSection>

        {/* 6. Contact privilégié - Fond teal */}
        <FormSection title="Contact privilégié" emoji="⭐">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <ContactSelector
              contacts={contacts}
              selectedContactId={formData.primaryContactId}
              onChange={(contactId) => setFormData(prev => ({ ...prev, primaryContactId: contactId }))}
              label=""
              required={false}
            />
          </div>
        </FormSection>

        {/* 7. Entretien source - Fond emerald */}
        <FormSection title="Entretien source" emoji="💬">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <CustomSelect
              value={formData.sourceInterviewId}
              onChange={handleChange}
              options={[
                { value: '', label: '-- Aucun entretien lié --' },
                ...interviews
                  .filter(i => i.status === 'completed')
                  .sort((a, b) => new Date(b.scheduledDate || 0) - new Date(a.scheduledDate || 0))
                  .map(interview => ({
                    value: interview.id,
                    label: `${interview.title} - ${interview.scheduledDate ? new Date(interview.scheduledDate).toLocaleDateString('fr-FR') : 'Sans date'}`
                  }))
              ]}
              placeholder="-- Aucun entretien lié --"
              aria-label="Entretien source"
            />
          </div>
        </FormSection>

        {/* 8. Personas - Fond teal */}
        <FormSection title="Personas" emoji="👥">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <MultiSelector
              items={personas}
              selectedIds={formData.personaIds}
              onChange={(personaIds) => setFormData(prev => ({ ...prev, personaIds }))}
              label=""
              emptyMessage="Aucun persona disponible"
              placeholder="Rechercher un persona..."
              searchable={true}
              getItemKey={(persona) => persona.id}
              getItemLabel={(persona) => persona.name}
              getItemSubLabel={(persona) => persona.role}
              renderBadge={(persona) => (
                <span
                  key={persona.id}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-cyan-100 text-cyan-800"
                >
                  <span>{persona.avatar || '👤'}</span>
                  {persona.name}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, personaIds: prev.personaIds.filter(id => id !== persona.id) }))}
                    className="ml-1 hover:text-cyan-900"
                    aria-label={`Retirer ${persona.name}`}
                  >
                    ✕
                  </button>
                </span>
              )}
              renderItem={(persona, isSelected) => (
                <label
                  key={persona.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      if (isSelected) {
                        setFormData(prev => ({ ...prev, personaIds: prev.personaIds.filter(id => id !== persona.id) }));
                      } else {
                        setFormData(prev => ({ ...prev, personaIds: [...prev.personaIds, persona.id] }));
                      }
                    }}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded"
                  />
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-lg flex-shrink-0">{persona.avatar || '👤'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {persona.name}
                      </div>
                      <div className="text-xs text-gray-600 truncate">
                        {persona.role}
                      </div>
                    </div>
                  </div>
                </label>
              )}
            />
          </div>
        </FormSection>

        {/* Relations - Conditionnelles en mode édition */}
        {isEditMode && need.id && linkedStories.length > 0 && (
          <FormSection title={`Stories liées (${linkedStories.length})`} emoji="📋">
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                  <div className="space-y-2">
                    {linkedStories.map(story => (
                      <div
                        key={story.id}
                        className="w-full bg-white rounded-lg p-2 md:p-3 border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-1">
                              {story.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mt-1">{story.description}</p>
                            <div className="mt-1 flex items-center gap-2 flex-wrap">
                              <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                                story.priority === 'must' ? 'bg-red-100 text-red-800' :
                                story.priority === 'should' ? 'bg-orange-100 text-orange-800' :
                                story.priority === 'could' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {story.priority === 'must' ? 'Must' :
                                 story.priority === 'should' ? 'Should' :
                                 story.priority === 'could' ? 'Could' : 'Won\'t'}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                                story.status === 'done' ? 'bg-emerald-100 text-emerald-800' :
                                story.status === 'inProgress' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-teal-100 text-teal-800'
                              }`}>
                                {story.status === 'done' ? 'Terminée' :
                                 story.status === 'inProgress' ? 'En cours' : 'À faire'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
        errorMessage={!isFormValid ? (
          activeProducts.length === 0 
            ? 'Créer un produit actif d\'abord'
            : 'Remplir tous les champs requis'
        ) : null}
      />
    </FormModal>
  );
};

export default UserNeedForm;
