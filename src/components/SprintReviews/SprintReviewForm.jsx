import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import MultiContactSelector from '../Contacts/MultiContactSelector';
import {
  FormModal,
  FormHeader,
  FormSection,
  FormGrid,
  FormFooter,
  Input,
  Textarea,
  CustomSelect
} from '../ui';

const SprintReviewForm = ({ review, sprints, userStories, contacts, products, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    sprintId: '',
    reviewDate: '',
    status: 'scheduled',
    participants: [],
    completedStoryIds: [],
    demoNotes: '',
    stakeholderFeedback: [],
    decisions: '',
    nextStepsProductBacklog: ''
  });

  const [errors, setErrors] = useState({});
  const [newFeedback, setNewFeedback] = useState({
    contactId: '',
    feedback: '',
    priority: 'medium',
    category: 'feature'
  });

  const [editingFeedbackIndex, setEditingFeedbackIndex] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const isEditMode = !!review;

  useEffect(() => {
    if (review) {
      setFormData({
        sprintId: review.sprintId || '',
        reviewDate: review.reviewDate || '',
        status: review.status || 'scheduled',
        participants: review.participants || [],
        completedStoryIds: review.completedStoryIds || [],
        demoNotes: review.demoNotes || '',
        stakeholderFeedback: review.stakeholderFeedback || [],
        decisions: review.decisions || '',
        nextStepsProductBacklog: review.nextStepsProductBacklog || ''
      });
    } else {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 16);
      setFormData(prev => ({ ...prev, reviewDate: dateStr }));
    }
  }, [review]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};
    
    // Champs obligatoires (true seulement)
    if (!formData.sprintId) {
      newErrors.sprintId = true;
    }
    
    if (!formData.reviewDate) {
      newErrors.reviewDate = true;
    }

    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStoryToggle = (storyId) => {
    setFormData(prev => ({
      ...prev,
      completedStoryIds: prev.completedStoryIds.includes(storyId)
        ? prev.completedStoryIds.filter(id => id !== storyId)
        : [...prev.completedStoryIds, storyId]
    }));
  };

  const handleAddFeedback = () => {
    if (newFeedback.contactId && newFeedback.feedback.trim()) {
      if (editingFeedbackIndex !== null) {
        setFormData(prev => ({
          ...prev,
          stakeholderFeedback: prev.stakeholderFeedback.map((fb, i) => 
            i === editingFeedbackIndex ? { ...newFeedback } : fb
          )
        }));
        setEditingFeedbackIndex(null);
      } else {
        setFormData(prev => ({
          ...prev,
          stakeholderFeedback: [
            ...prev.stakeholderFeedback,
            { ...newFeedback }
          ]
        }));
      }
      setNewFeedback({
        contactId: '',
        feedback: '',
        priority: 'medium',
        category: 'feature'
      });
    }
  };

  const handleRemoveFeedback = (index) => {
    setFormData(prev => ({
      ...prev,
      stakeholderFeedback: prev.stakeholderFeedback.filter((_, i) => i !== index)
    }));
    if (editingFeedbackIndex === index) {
      setEditingFeedbackIndex(null);
      setNewFeedback({
        contactId: '',
        feedback: '',
        priority: 'medium',
        category: 'feature'
      });
    }
  };

  const handleEditFeedback = (index) => {
    const feedbackToEdit = formData.stakeholderFeedback[index];
    setNewFeedback({ ...feedbackToEdit });
    setEditingFeedbackIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingFeedbackIndex(null);
    setNewFeedback({
      contactId: '',
      feedback: '',
      priority: 'medium',
      category: 'feature'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    const cleanData = {
      sprintId: formData.sprintId,
      reviewDate: formData.reviewDate,
      status: formData.status,
      participants: formData.participants,
      completedStoryIds: formData.completedStoryIds,
      demoNotes: formData.demoNotes.trim(),
      stakeholderFeedback: formData.stakeholderFeedback,
      decisions: formData.decisions.trim(),
      nextStepsProductBacklog: formData.nextStepsProductBacklog.trim()
    };

    onSave(cleanData);
  };

  const isFormValid = Object.keys(errors).length === 0;
  
  const selectedSprint = sprints.find(s => s.id === formData.sprintId);
  const sprintStories = selectedSprint && selectedSprint.storyIds
    ? userStories.filter(s => selectedSprint.storyIds.includes(s.id) && s.status === 'done')
    : [];

  const availableParticipants = contacts.filter(c => {
    if (!selectedSprint) return false;
    const sprintProduct = products.find(p => p.id === selectedSprint.productId);
    if (!sprintProduct) return false;
    return c.productIds?.includes(sprintProduct.id);
  });

  // Participants sélectionnés pour le feedback
  const selectedParticipants = contacts.filter(c => formData.participants.includes(c.id));

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-gray-100 text-gray-700'
    };
    return colors[priority] || colors.medium;
  };

  const getCategoryColor = (category) => {
    const colors = {
      feature: 'bg-blue-100 text-blue-700',
      bug: 'bg-red-100 text-red-700',
      usability: 'bg-purple-100 text-purple-700',
      performance: 'bg-green-100 text-green-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || colors.other;
  };

  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">🎯 Informations de base</p>
        <p className="text-emerald-800 ml-2">Sprint et date obligatoires. Le statut indique l'état de la review.</p>
      </div>

      <div>
        <p className="font-semibold">👥 Participants</p>
        <p className="text-indigo-800 ml-2">Stakeholders présents (PO, équipe, clients). Seuls les contacts du produit sont disponibles.</p>
      </div>

      <div>
        <p className="font-semibold">📈 Stories Démontrées</p>
        <p className="text-indigo-800 ml-2">Cochez les stories terminées présentées. Permet de tracer ce qui a été démontré.</p>
      </div>

      <div>
        <p className="font-semibold">📝 Notes de Démonstration</p>
        <p className="text-indigo-800 ml-2">Points présentés, réactions, questions, ambiance.</p>
      </div>

      <div>
        <p className="font-semibold">💬 Feedback des Stakeholders</p>
        <p className="text-indigo-800 ml-2">Capturez chaque retour avec priorité et catégorie. Ces feedbacks deviennent des stories.</p>
      </div>

      <div>
        <p className="font-semibold">🎯 Décisions Prises</p>
        <p className="text-indigo-800 ml-2">Changements de cap, nouvelles priorités, ajustements stratégiques.</p>
      </div>

      <div>
        <p className="font-semibold">📋 Prochaines Étapes</p>
        <p className="text-indigo-800 ml-2">Actions sur le backlog : stories à créer, modifier ou prioriser.</p>
      </div>

      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-indigo-800 ml-2">• Documentez pendant/après la review • Capturez tous les feedbacks • Assignez priorités • Les décisions sont cruciales • Une review bien documentée améliore l'alignement</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={isEditMode ? 'Modifier la Sprint Review' : 'Nouvelle Sprint Review'}
        icon={Calendar}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* 1. Informations de base - emerald */}
        <FormSection title="Informations de base" emoji="🎯" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-4">
            <FormGrid columns={2}>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sprint <span className="text-red-500">*</span>
              </label>
              <CustomSelect
                value={formData.sprintId}
                onChange={handleChange}
                  options={[
                  { value: '', label: '-- Sélectionner un sprint --' },
                  ...sprints.map(sprint => ({
                  value: sprint.id,
                label: `${sprint.name} - ${new Date(sprint.startDate).toLocaleDateString('fr-FR')}`
                }))
                ]}
                  placeholder="-- Sélectionner un sprint --"
                aria-label="Sprint"
              />
            </div>

              <Input
                label="Date et heure de la review"
                name="reviewDate"
                type="datetime-local"
                value={formData.reviewDate}
                onChange={handleChange}
                required
                error={errors.reviewDate}
              />
            </FormGrid>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Statut</label>
              <CustomSelect
                value={formData.status}
                onChange={handleChange}
                options={[
                  { value: 'scheduled', label: '⏱️ Planifiée' },
                  { value: 'completed', label: '✅ Terminée' },
                  { value: 'cancelled', label: '❌ Annulée' }
                ]}
                aria-label="Statut"
              />
            </div>
          </div>
        </FormSection>

        {/* 2. Participants - teal */}
        <FormSection title={`Participants (${formData.participants.length})`} emoji="👥">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <MultiContactSelector
              contacts={availableParticipants}
              selectedContactIds={formData.participants}
              onChange={(ids) => setFormData(prev => ({ ...prev, participants: ids }))}
              placeholder="Sélectionner les stakeholders présents..."
              disabled={!formData.sprintId}
            />
          </div>
        </FormSection>

        {/* 3. Stories démontrées - emerald */}
        <FormSection title={`Stories Démontrées (${formData.completedStoryIds.length}/${sprintStories.length})`} emoji="📈">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            {sprintStories.length === 0 ? (
              <div className="bg-white border border-emerald-200 rounded-lg p-4 text-sm text-gray-600">
                {formData.sprintId 
                  ? "Aucune story terminée dans ce sprint"
                  : "Sélectionnez d'abord un sprint"}
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto border border-emerald-200 rounded-lg p-3 bg-white">
                {sprintStories.map(story => (
                  <label 
                  key={story.id} 
                  className="flex items-start gap-3 cursor-pointer hover:bg-emerald-50 p-2 rounded transition-colors"
                  >
                  <input
                  type="checkbox"
                  checked={formData.completedStoryIds.includes(story.id)}
                  onChange={() => handleStoryToggle(story.id)}
                  className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded"
                  />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">{story.title}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </FormSection>

        {/* 4. Notes de démonstration - teal */}
        <FormSection title="Notes de Démonstration" emoji="📝">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <Textarea
              name="demoNotes"
              value={formData.demoNotes}
              onChange={handleChange}
              rows={4}
              placeholder="Notez les points importants présentés, les réactions, les questions..."
            />
          </div>
        </FormSection>

        {/* 5. Feedback stakeholders - emerald */}
        <FormSection title={`Feedback des Stakeholders (${formData.stakeholderFeedback.length})`} emoji="💬">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-3">
            {/* Liste des feedback existants */}
            {formData.stakeholderFeedback.length > 0 && (
              <div className="space-y-2">
                {formData.stakeholderFeedback.map((fb, index) => {
                  const contact = contacts.find(c => c.id === fb.contactId);
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {contact && (
                            <span className="text-sm font-medium text-gray-800">{contact.name}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(fb.priority)}`}>
                            {fb.priority}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(fb.category)}`}>
                            {fb.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleEditFeedback(index)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Modifier"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeedback(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{fb.feedback}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Ajouter/Modifier feedback */}
            <div className={`border rounded-lg p-3 sm:p-4 space-y-3 ${
              editingFeedbackIndex !== null 
                ? 'bg-cyan-50 border-cyan-300' 
                : 'bg-white border-emerald-200'
            }`}>
              {editingFeedbackIndex !== null && (
                <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
                  <Edit2 size={16} />
                  Modification du feedback #{editingFeedbackIndex + 1}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">Stakeholder</label>
                  <select
                    value={newFeedback.contactId}
                    onChange={(e) => setNewFeedback(prev => ({ ...prev, contactId: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                    disabled={selectedParticipants.length === 0}
                  >
                    <option value="">-- Sélectionner --</option>
                    {selectedParticipants.map(contact => (
                      <option key={contact.id} value={contact.id}>{contact.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">Priorité</label>
                  <select
                    value={newFeedback.priority}
                    onChange={(e) => setNewFeedback(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                  >
                    <option value="low">⚪ Basse</option>
                    <option value="medium">🟡 Moyenne</option>
                    <option value="high">🟠 Haute</option>
                    <option value="critical">🔴 Critique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={newFeedback.category}
                    onChange={(e) => setNewFeedback(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                  >
                    <option value="feature">✨ Fonctionnalité</option>
                    <option value="bug">🐛 Bug</option>
                    <option value="usability">🎨 Ergonomie</option>
                    <option value="performance">⚡ Performance</option>
                    <option value="other">🔧 Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-1">Commentaire</label>
                <textarea
                  value={newFeedback.feedback}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, feedback: e.target.value }))}
                  rows={2}
                  placeholder="Commentaire du stakeholder..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none bg-white"
                />
              </div>

              <div className="flex gap-2">
                {editingFeedbackIndex !== null && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <X size={16} />
                    Annuler
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleAddFeedback}
                  disabled={!newFeedback.contactId || !newFeedback.feedback.trim()}
                  className={`flex-1 px-3 sm:px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm ${
                    editingFeedbackIndex !== null
                      ? 'bg-cyan-600 hover:bg-cyan-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {editingFeedbackIndex !== null ? (
                    <>
                      <CheckCircle2 size={16} />
                      Mettre à jour
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Ajouter
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </FormSection>

        {/* 6. Décisions prises - teal */}
        <FormSection title="Décisions Prises" emoji="🎯">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <Textarea
              name="decisions"
              value={formData.decisions}
              onChange={handleChange}
              rows={4}
              placeholder="Décisions importantes prises pendant la review..."
            />
          </div>
        </FormSection>

        {/* 7. Prochaines étapes Product Backlog - emerald */}
        <FormSection title="Prochaines Étapes - Product Backlog" emoji="📋">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <Textarea
              name="nextStepsProductBacklog"
              value={formData.nextStepsProductBacklog}
              onChange={handleChange}
              rows={4}
              placeholder="Ajustements à faire dans le Product Backlog suite à cette review..."
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

export default SprintReviewForm;
