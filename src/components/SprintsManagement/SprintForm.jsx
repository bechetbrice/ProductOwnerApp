import { Paperclip, AlertCircle, Save } from 'lucide-react';
import PropTypes from 'prop-types';
import {
  FormModal,
  FormHeader,
  FormSection,
  FormGrid,
  FormFooter,
  Input,
  CustomSelect,
  ProductDropdown
} from '../ui';

/**
 * SprintForm - Formulaire de création/édition de sprint
 * 
 * @param {Object} props
 * @param {Object} props.formData - Données du formulaire
 * @param {Function} props.setFormData - Callback MAJ formData
 * @param {Object} props.editingSprint - Sprint en cours d'édition (null si création)
 * @param {Array} props.products - Liste des produits
 * @param {Array} props.teams - Liste des équipes
 * @param {Array} props.userStories - Liste des user stories
 * @param {Array} props.sprints - Liste de tous les sprints (pour vérifier assignations)
 * @param {boolean} props.showHelp - Afficher le panel d'aide
 * @param {Function} props.setShowHelp - Callback affichage aide
 * @param {Function} props.onSubmit - Callback soumission formulaire
 * @param {Function} props.onCancel - Callback annulation
 * @param {Function} props.toggleStory - Callback toggle sélection story
 */
const SprintForm = ({
  formData,
  setFormData,
  editingSprint,
  products,
  teams,
  userStories,
  sprints,
  showHelp,
  setShowHelp,
  onSubmit,
  onCancel,
  toggleStory
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = formData.productId && formData.name && formData.startDate && formData.endDate && formData.teamId;

  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">📦 Produit associé</p>
        <p className="text-emerald-800 ml-2">Le sprint regroupera les stories de ce produit. Seuls les produits actifs sont disponibles.</p>
      </div>

      <div>
        <p className="font-semibold">👥 Équipe responsable</p>
        <p className="text-emerald-800 ml-2">L'équipe assignée sera automatiquement appliquée aux stories. Seules les équipes actives sont disponibles.</p>
      </div>

      <div>
        <p className="font-semibold">#️⃣ Identification</p>
        <p className="text-emerald-800 ml-2">Numéro optionnel (ex: "Sprint-01") et nom obligatoire du sprint.</p>
      </div>

      <div>
        <p className="font-semibold">📊 Statut</p>
        <p className="text-emerald-800 ml-2">Planifié (préparation), En cours (actif), ou Terminé (achevé).</p>
      </div>

      <div>
        <p className="font-semibold">📅 Dates</p>
        <p className="text-emerald-800 ml-2">Durée Scrum recommandée : 1 à 4 semaines (7 à 28 jours). La date de fin doit être postérieure au début.</p>
      </div>

      <div>
        <p className="font-semibold">🎯 Objectif du sprint</p>
        <p className="text-emerald-800 ml-2">Décrivez ce que l'équipe souhaite accomplir. Objectif clair, mesurable et atteignable.</p>
      </div>

      <div>
        <p className="font-semibold">📋 User Stories</p>
        <p className="text-emerald-800 ml-2">Sélectionnez les stories à réaliser. Seules les stories du produit et non assignées sont disponibles.</p>
      </div>

      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-emerald-800 ml-2">• Durée 1-4 semaines • Objectif clair et mesurable • Équipe assignée dès le début • Ne surchargez pas • Mettez à jour le statut régulièrement</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={editingSprint ? 'Modifier le sprint' : 'Nouveau sprint'}
        subtitle="Planification et suivi de sprint"
        icon={Paperclip}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={onSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* 1. Produit associé - emerald */}
        <FormSection title="Produit associé" emoji="📦" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-3">
            {products.filter(p => p.status === 'active').length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 flex items-center gap-1">
                  <AlertCircle size={16} />
                  <strong>Aucun produit actif disponible.</strong>
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Créez d'abord un produit dans le module <strong>Produits</strong> avant d'ajouter des sprints.
                </p>
              </div>
            ) : (
              <>
                <ProductDropdown
                  products={products.filter(p => p.status === 'active')}
                  value={formData.productId}
                  onChange={(productId) => setFormData({ ...formData, productId })}
                  placeholder="-- Sélectionner un produit --"
                  emptyMessage="Aucun produit actif disponible"
                  required
                />

              </>
            )}
          </div>
        </FormSection>

        {/* 2. Équipe responsable - teal */}
        <FormSection title="Équipe responsable" emoji="👥" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Équipe <span className="text-red-500">*</span>
              </label>
              <CustomSelect
                value={formData.teamId}
                onChange={handleChange}
                options={[
                  { value: '', label: '-- Sélectionner une équipe --' },
                  ...teams
                    .filter(team => team.status === 'active' && (!formData.productId || team.productIds?.includes(formData.productId)))
                    .map(team => ({
                      value: team.id,
                      label: `${team.name} (${team.memberContactIds?.length || 0} membre${(team.memberContactIds?.length || 0) > 1 ? 's' : ''})`
                    }))
                ]}
                placeholder="-- Sélectionner une équipe --"
                aria-label="Équipe responsable"
              />
            </div>
            {teams.filter(t => t.status === 'active').length === 0 && (
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <AlertCircle size={12} />
                Aucune équipe active. Créez une équipe dans Paramètres → Équipes.
              </p>
            )}

          </div>
        </FormSection>

        {/* 3. Identification - emerald */}
        <FormSection title="Identification" emoji="#️⃣" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <FormGrid columns={2}>
              <Input
                label="Numéro d'identification"
                name="sprintNumber"
                value={formData.sprintNumber}
                onChange={handleChange}
                placeholder="Sprint-01, S15"
              />
              
              <Input
                label="Nom du sprint"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Sprint 1"
              />
            </FormGrid>

          </div>
        </FormSection>

        {/* 4. Statut - teal */}
        <FormSection title="Statut" emoji="📊">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <CustomSelect
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'planned', label: 'Planifié' },
                { value: 'active', label: 'En cours' },
                { value: 'completed', label: 'Terminé' }
              ]}
              aria-label="Statut du sprint"
            />
          </div>
        </FormSection>

        {/* 5. Dates - emerald */}
        <FormSection title="Dates" emoji="📅" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <FormGrid columns={2}>
              <Input
                label="Date de début"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              
              <Input
                label="Date de fin"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </FormGrid>

          </div>
        </FormSection>

        {/* 6. Objectif - teal */}
        <FormSection title="Objectif du sprint" emoji="🎯">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <textarea
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              rows={3}
              placeholder="Décrivez l'objectif principal de ce sprint..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>
        </FormSection>

        {/* 7. User Stories - emerald */}
        <FormSection title={`User Stories (${formData.storyIds.length} sélectionnées)`} emoji="📋">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <div className="border border-emerald-200 rounded-lg p-4 max-h-60 overflow-y-auto bg-white">
              {userStories
                .filter(s => !formData.productId || s.productId === formData.productId)
                .filter(s => {
                  const assignedToOtherSprint = sprints.some(sprint => 
                    sprint.id !== editingSprint?.id && 
                    sprint.storyIds?.includes(s.id)
                  );
                  return !assignedToOtherSprint;
                })
                .length === 0 ? (
                <p className="text-gray-500 text-sm">
                  {formData.productId 
                    ? 'Aucune user story disponible pour ce produit' 
                    : 'Aucune user story disponible'}
                </p>
              ) : (
                <div className="space-y-2">
                  {userStories
                    .filter(s => !formData.productId || s.productId === formData.productId)
                    .filter(s => {
                      const assignedToOtherSprint = sprints.some(sprint => 
                        sprint.id !== editingSprint?.id && 
                        sprint.storyIds?.includes(s.id)
                      );
                      return !assignedToOtherSprint;
                    })
                    .map(story => (
                      <label key={story.id} className="flex items-start gap-2 p-2 hover:bg-emerald-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.storyIds.includes(story.id)}
                          onChange={() => toggleStory(story.id)}
                          className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <div className="flex-1">
                          <div className="text-sm text-gray-800">{story.title}</div>
                        </div>
                      </label>
                    ))
                  }
                </div>
              )}
            </div>

          </div>
        </FormSection>
      </form>

      <FormFooter
        onCancel={onCancel}
        onSubmit={onSubmit}
        submitLabel="Sauvegarder"
        submitIcon={Save}
        submitDisabled={!isFormValid}
        errorMessage={!isFormValid ? (
          !formData.productId && products.filter(p => p.status === 'active').length > 0
            ? 'Veuillez sélectionner un produit'
            : 'Veuillez remplir tous les champs requis'
        ) : null}
      />
    </FormModal>
  );
};

SprintForm.propTypes = {
  formData: PropTypes.shape({
    sprintNumber: PropTypes.string,
    name: PropTypes.string.isRequired,
    goal: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['planned', 'active', 'completed']).isRequired,
    storyIds: PropTypes.array.isRequired,
    productId: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  editingSprint: PropTypes.object,
  products: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
  userStories: PropTypes.array.isRequired,
  sprints: PropTypes.array.isRequired,
  showHelp: PropTypes.bool.isRequired,
  setShowHelp: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  toggleStory: PropTypes.func.isRequired
};

export default SprintForm;
