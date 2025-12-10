import { useState, useEffect, useMemo } from 'react';
import { AlertCircle, ListIcon, Save } from 'lucide-react';
import {
  FormModal,
  FormHeader,
  FormSection,
  FormGrid,
  FormFooter,
  Input,
  Textarea,
  CustomSelect,
  ProductDropdown
} from '../ui';

/**
 * UserStoryForm - Formulaire User Story (v5.2.0 - Besoin obligatoire)
 * Statut et Outcome retirés - gérés uniquement par UserStoryOutcomeManager
 */
const UserStoryForm = ({ 
  story, 
  userNeeds = [], 
  userStories = [],
  products = [],
  onSubmit, 
  onCancel,
  onNavigate 
}) => {
  const [formData, setFormData] = useState({
    storyNumber: '',
    storyTitle: '',
    userRole: '',
    userAction: '',
    userBenefit: '',
    title: '',
    description: '',
    acceptanceCriteria: '',
    priority: 'should',
    productId: '',
    assignedTo: '',
    teamId: '',
    linkedNeedId: '',
    estimation: 0
  });
  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);

  const isEditing = !!story;

  // Vérifier si un besoin est déjà lié à une story (sauf la story en cours d'édition)
  const isNeedAlreadyLinked = (needId) => {
    return userStories.some(s => 
      s.linkedNeedId === needId && 
      (!isEditing || s.id !== story.id)
    );
  };

  // Filtrer les besoins disponibles selon le produit sélectionné
  const availableNeeds = useMemo(() => {
    // Si pas de produit sélectionné, afficher tous les besoins
    if (!formData.productId) {
      return userNeeds;
    }
    // Sinon, filtrer par produit
    return userNeeds.filter(need => need.productId === formData.productId);
  }, [userNeeds, formData.productId]);

  useEffect(() => {
    if (story) {
      // Vérifier si la description existante contient le format User Story
      const descriptionContainsFormat = story.description && 
        story.description.includes('En tant que') && 
        story.description.includes('Je veux') && 
        story.description.includes('Afin de');
      
      setFormData({
        storyNumber: story.storyNumber || '',
        storyTitle: story.storyTitle || '',
        userRole: story.userRole || '',
        userAction: story.userAction || '',
        userBenefit: story.userBenefit || '',
        title: story.title || '',
        // Ne charger la description QUE si elle ne contient PAS le format User Story
        description: (!descriptionContainsFormat ? story.description : '') || '',
        acceptanceCriteria: story.acceptanceCriteria || '',
        priority: story.priority || 'should',
        productId: story.productId || '',
        assignedTo: story.assignedTo || '',
        teamId: story.teamId || '',
        linkedNeedId: story.linkedNeedId || '',
        estimation: story.estimation || 0
      });
    }
  }, [story]);

  // Générer titre automatiquement depuis les 3 champs obligatoires
  useEffect(() => {
    if (formData.userRole && formData.userAction && formData.userBenefit) {
      const generatedTitle = `En tant que ${formData.userRole}, je veux ${formData.userAction} afin de ${formData.userBenefit}`;
      setFormData(prev => ({ ...prev, title: generatedTitle }));
    }
  }, [formData.userRole, formData.userAction, formData.userBenefit]);

  // Héritage automatique de l'estimation depuis le besoin lié
  useEffect(() => {
    if (formData.linkedNeedId && !isEditing) {
      const linkedNeed = userNeeds.find(n => n.id === formData.linkedNeedId);
      if (linkedNeed && linkedNeed.storyPoints) {
        setFormData(prev => ({ 
          ...prev, 
          estimation: linkedNeed.storyPoints 
        }));
      }
    }
  }, [formData.linkedNeedId, userNeeds, isEditing]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};
    
    // Champs obligatoires (true seulement, pas de message)
    if (!formData.productId) {
      newErrors.productId = true;
    }
    
    if (!formData.linkedNeedId) {
      newErrors.linkedNeedId = true;
    }
    
    if (!formData.userRole) newErrors.userRole = true;
    if (!formData.userAction) newErrors.userAction = true;
    if (!formData.userBenefit) newErrors.userBenefit = true;
    
    if (!formData.storyNumber) newErrors.storyNumber = true;
    if (!formData.storyTitle) newErrors.storyTitle = true;
    
    setErrors(newErrors);
  }, [formData, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier que tous les champs obligatoires sont remplis
    if (!formData.linkedNeedId) {
      alert('Veuillez sélectionner un besoin utilisateur source');
      return;
    }
    
    if (!formData.userRole || !formData.userAction || !formData.userBenefit) {
      alert('Veuillez remplir tous les champs du format User Story (En tant que, Je veux, Afin de)');
      return;
    }
    
    if (!formData.storyNumber || !formData.storyTitle) {
      alert('Veuillez remplir le numéro et le titre court de la story');
      return;
    }
    
    // Héritage automatique de l'estimation si besoin lié
    const linkedNeed = userNeeds.find(n => n.id === formData.linkedNeedId);
    const finalEstimation = formData.estimation || (linkedNeed?.storyPoints) || 0;
    
    // En édition, conserver le statut et l'outcome existants
    const submitData = {
      ...formData,
      estimation: finalEstimation
    };

    // Si on édite, garder le statut et l'outcome originaux
    if (isEditing && story) {
      submitData.status = story.status;
      submitData.outcome = story.outcome;
      submitData.outcomeReason = story.outcomeReason;
      submitData.outcomeNote = story.outcomeNote;
      submitData.outcomeDate = story.outcomeDate;
      submitData.history = story.history;
    } else {
      // En création, statut par défaut
      submitData.status = 'todo';
    }
    
    onSubmit(submitData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convertir estimation en nombre
    const finalValue = name === 'estimation' ? parseInt(value) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const isFormValid = Object.keys(errors).length === 0;

  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">📦 Produit associé</p>
        <p className="text-emerald-800 ml-2">Chaque story doit être rattachée à un produit actif. Cela permet de l'inclure dans la planification des sprints. Sélectionnez le produit concerné par cette fonctionnalité.</p>
      </div>

      <div>
        <p className="font-semibold">🎯 Besoin Utilisateur Source (OBLIGATOIRE)</p>
        <p className="text-emerald-800 ml-2">Chaque story DOIT découler d'un besoin utilisateur identifié. Cela garantit la traçabilité (Entretien → Besoin → Story) et assure que chaque développement répond à un vrai besoin. Les besoins déjà liés à d'autres stories sont indiqués mais restent sélectionnables si nécessaire. L'estimation du besoin sera héritée automatiquement.</p>
      </div>

      <div>
        <p className="font-semibold">#️⃣ Identification</p>
        <p className="text-emerald-800 ml-2"><strong>Numéro</strong> : Identifiant unique (ex: US-001, US-042). <strong>Titre court</strong> : Résumé en quelques mots (ex: "Connexion OAuth", "Export PDF"). Ces 2 champs sont <strong>obligatoires</strong> pour faciliter la communication en équipe.</p>
      </div>

      <div>
        <p className="font-semibold">✨ Format User Story</p>
        <p className="text-emerald-800 ml-2">Les <strong>3 champs sont obligatoires</strong> : <strong>En tant que</strong> (rôle utilisateur), <strong>Je veux</strong> (action/fonctionnalité), <strong>Afin de</strong> (bénéfice/valeur). Le titre est généré automatiquement selon le format standard. Gardez chaque champ concis et orienté valeur.</p>
      </div>

      <div>
        <p className="font-semibold">📝 Description complémentaire</p>
        <p className="text-emerald-800 ml-2">Optionnel. Ajoutez contexte technique, contraintes, dépendances ou précisions qui ne rentrent pas dans le format standard. Ex: "Nécessite accès API OAuth 2.0", "Compatible uniquement navigateurs modernes".</p>
      </div>

      <div>
        <p className="font-semibold">✅ Critères d'acceptation</p>
        <p className="text-emerald-800 ml-2">Définissez les conditions de validation. Format recommandé : liste à puces (- L'utilisateur peut... - Le système affiche... - Les données sont...). Ces critères sont utilisés pour tester que la story est complète.</p>
      </div>

      {isEditing && (
        <div>
          <p className="font-semibold">📊 Outcome (Résultat)</p>
          <p className="text-emerald-800 ml-2">L'outcome d'une story (réalisée, annulée, reportée) est géré uniquement via <strong>Sprint Board</strong>. Cela assure la traçabilité avec le sprint et facilite les analyses post-sprint.</p>
        </div>
      )}

      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-emerald-800 ml-2">• Créez d'abord le besoin, puis la story • Gardez les stories petites (1 sprint max) • Focalisez sur la valeur utilisateur • Écrivez des critères testables • Identifiez clairement (numéro + titre court) • Découpez les epics en stories plus petites • Validez avec l'équipe avant le sprint</p>
      </div>
    </div>
  );

  // Besoin lié sélectionné
  const linkedNeed = formData.linkedNeedId ? userNeeds.find(n => n.id === formData.linkedNeedId) : null;

  // Si aucun besoin disponible, afficher un message d'erreur
  if (availableNeeds.length === 0 && !isEditing) {
    return (
      <FormModal isOpen={true} onClose={onCancel} size="md">
        <FormHeader
          title="Impossible de créer une User Story"
          icon={AlertCircle}
          onClose={onCancel}
        />
        
        <div className="p-6">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Aucun besoin utilisateur disponible</h3>
                <p className="text-sm text-yellow-800 mb-3">
                  Pour créer une User Story, vous devez d'abord créer au moins un besoin utilisateur. 
                  Cela garantit que chaque développement répond à un besoin réel identifié.
                </p>
                <p className="text-sm font-semibold text-yellow-900">
                  📋 Workflow recommandé : Besoins → User Stories → Sprints
                </p>
              </div>
            </div>
          </div>
        </div>

        <FormFooter
          onCancel={onCancel}
          cancelLabel="Fermer"
          extraButton={
            <button
              type="button"
              onClick={() => onNavigate?.('user-needs')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Aller au module Besoins
            </button>
          }
        />
      </FormModal>
    );
  }

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={isEditing ? 'Modifier la User Story' : 'Nouvelle User Story'}
        icon={ListIcon}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* 1. Produit associé - Fond emerald */}
        <FormSection title="Produit associé" emoji="📦" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {products.filter(p => p.status === 'active').length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 flex items-center gap-1">
                  <AlertCircle size={16} />
                  <strong>Aucun produit actif disponible.</strong>
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Créez d'abord un produit dans le module <strong>Produits</strong> avant d'ajouter des user stories.
                </p>
              </div>
            ) : (
              <ProductDropdown
                products={products.filter(p => p.status === 'active')}
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

        {/* 2. Besoin source - Fond teal - OBLIGATOIRE */}
        <FormSection title="Besoin Utilisateur Source" emoji="🎯" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Besoin source <span className="text-red-500">*</span>
              </label>
              <CustomSelect
                value={formData.linkedNeedId}
                onChange={handleChange}
                options={[
                  { value: '', label: '-- Sélectionner un besoin --' },
                  ...availableNeeds.map(need => {
                    const hasEstimation = need.storyPoints && need.storyPoints > 0;
                    const alreadyLinked = isNeedAlreadyLinked(need.id);
                    const displayText = need.objective || need.context || 'Besoin sans titre';
                    
                    return {
                      value: need.id,
                      label: `${alreadyLinked ? '✓ ' : ''}${displayText}${hasEstimation ? ` (${need.storyPoints} pts)` : ' (non estimé)'}${alreadyLinked ? ' - Déjà lié' : ''}`
                    };
                  })
                ]}
                placeholder="-- Sélectionner un besoin --"
                aria-label="Besoin Utilisateur Source"
              />
            </div>
            
            {linkedNeed && (
              <div className="bg-white border border-teal-200 rounded-lg p-3">
                <p className="text-xs font-medium text-teal-600 mb-2">ℹ️ Informations du besoin source</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-900 font-medium">{linkedNeed.objective || linkedNeed.context}</p>
                  {linkedNeed.storyPoints && (
                    <p className="text-xs text-gray-600">
                      ✅ Estimation héritée : <strong>{linkedNeed.storyPoints} Story Points</strong>
                    </p>
                  )}
                  {linkedNeed.importance && (
                    <p className="text-xs text-gray-600">
                      {linkedNeed.importance === 'critical' && '🔴 Importance : Critique'}
                      {linkedNeed.importance === 'high' && '🟠 Importance : Haute'}
                      {linkedNeed.importance === 'medium' && '🟡 Importance : Moyenne'}
                      {linkedNeed.importance === 'low' && '⚪ Importance : Basse'}
                    </p>
                  )}
                  {isNeedAlreadyLinked(linkedNeed.id) && (
                    <p className="text-xs text-amber-600 flex items-center gap-1 mt-2">
                      <AlertCircle size={12} />
                      Ce besoin est déjà lié à une autre story
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </FormSection>

        {/* 3. Identification - Fond emerald */}
        <FormSection title="Identification" emoji="#️⃣" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <FormGrid columns={3}>
              <Input
                label="Numéro"
                name="storyNumber"
                value={formData.storyNumber}
                onChange={handleChange}
                required
                error={errors.storyNumber}
                placeholder="ex: US-001"
              />
              <div className="md:col-span-2">
                <Input
                  label="Titre court"
                  name="storyTitle"
                  value={formData.storyTitle}
                  onChange={handleChange}
                  required
                  error={errors.storyTitle}
                  placeholder="ex: Connexion OAuth"
                />
              </div>
            </FormGrid>
          </div>
        </FormSection>

        {/* 4. Format User Story - Fond teal */}
        <FormSection title="Format User Story" emoji="✨" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
            <Input
              label="En tant que"
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              required
              error={errors.userRole}
              placeholder="ex: Product Owner, utilisateur mobile..."
            />

            <Textarea
              label="Je veux"
              name="userAction"
              value={formData.userAction}
              onChange={handleChange}
              required
              error={errors.userAction}
              rows={2}
              placeholder="ex: prioriser mes stories selon la méthode MoSCoW"
            />

            <Textarea
              label="Afin de"
              name="userBenefit"
              value={formData.userBenefit}
              onChange={handleChange}
              required
              error={errors.userBenefit}
              rows={2}
              placeholder="ex: maximiser la valeur business livrée"
            />

            {/* Prévisualisation du titre généré */}
            {formData.userRole && formData.userAction && formData.userBenefit && (
              <div className="bg-white border border-teal-200 rounded-lg p-3">
                <p className="text-xs font-medium text-teal-600 mb-1">✨ Titre généré automatiquement</p>
                <p className="text-sm text-gray-900 italic">
                  "{formData.title}"
                </p>
              </div>
            )}
          </div>
        </FormSection>

        {/* 5. Description complémentaire - Fond emerald */}
        <FormSection title="Description complémentaire" emoji="📝">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Contexte supplémentaire, détails techniques, contraintes..."
            />
          </div>
        </FormSection>

        {/* 6. Critères d'acceptation - Fond teal */}
        <FormSection title="Critères d'acceptation" emoji="✅">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <Textarea
              name="acceptanceCriteria"
              value={formData.acceptanceCriteria}
              onChange={handleChange}
              rows={3}
              placeholder="- L'utilisateur peut...&#10;- Le système affiche...&#10;- Les données sont sauvegardées..."
            />
          </div>
        </FormSection>

        {/* 7. Avertissement en mode édition - Fond emerald */}
        {isEditing && (
          <FormSection title="Note importante" emoji="ℹ️">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="bg-white border border-cyan-200 rounded-lg p-4">
                <p className="text-sm text-cyan-800 flex items-center gap-2">
                  <AlertCircle size={16} />
                  <strong>Note :</strong> L'outcome de cette story est géré uniquement via <strong>Sprint Board</strong>.
                </p>
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

export default UserStoryForm;
