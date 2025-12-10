import React, { useState, useEffect } from 'react';
import { ListChecks, AlertCircle, Save } from 'lucide-react';
import UserStorySelector from './UserStorySelector';
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

/**
 * TaskForm - Formulaire amélioré pour la décomposition technique des User Stories
 * Version Scrum-compliant : Les développeurs créent des tâches techniques avec estimation en heures
 * v3.6.0
 */
const TaskForm = ({ 
  task = null, 
  userStories = [], 
  contacts = [],
  teams = [],
  prefilledStoryId = null,
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    taskNumber: '',
    title: '',
    description: '',
    userStoryId: prefilledStoryId || '',
    assignedTo: '',
    status: 'todo',
    estimatedHours: 0,
    sprintId: '',
    type: 'development',
    outcome: 'todo',
    outcomeReason: '',
    outcomeNote: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedStory, setSelectedStory] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  // Initialisation du formulaire en mode édition
  useEffect(() => {
    if (task) {
      setFormData({
        taskNumber: task.taskNumber || '',
        title: task.title || '',
        description: task.description || '',
        userStoryId: task.userStoryId || '',
        assignedTo: task.assignedTo || '',
        status: task.status || 'todo',
        estimatedHours: task.estimatedHours || 0,
        sprintId: task.sprintId || '',
        type: task.type || 'development',
        outcome: task.outcome || null,
        outcomeReason: task.outcomeReason || '',
        outcomeNote: task.outcomeNote || ''
      });
    }
  }, [task]);

  // Mettre à jour la story sélectionnée
  useEffect(() => {
    if (formData.userStoryId) {
      const story = userStories.find(s => s.id === formData.userStoryId);
      setSelectedStory(story || null);
    } else {
      setSelectedStory(null);
    }
  }, [formData.userStoryId, userStories]);

  // Validation du formulaire en temps réel
  useEffect(() => {
    const newErrors = {};

    // Champs obligatoires (true seulement)
    if (!formData.taskNumber.trim()) {
      newErrors.taskNumber = true;
    }

    if (!formData.title.trim()) {
      newErrors.title = true;
    }

    if (!formData.userStoryId) {
      newErrors.userStoryId = true;
    }

    if (!formData.assignedTo) {
      newErrors.assignedTo = true;
    }

    // Validations de format (avec message)
    if (formData.estimatedHours < 0) {
      newErrors.estimatedHours = 'L\'estimation ne peut pas être négative';
    }

    if (formData.estimatedHours === 0) {
      newErrors.estimatedHours = 'Veuillez estimer la tâche en heures (ex: 0.5, 1, 2, 4, 8...)';
    }

    setErrors(newErrors);
  }, [formData]);

  // Gestion de la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Récupération du sprintId depuis la User Story sélectionnée
    const selectedStory = userStories.find(s => s.id === formData.userStoryId);
    const taskData = {
      ...formData,
      sprintId: selectedStory?.sprintId || '',
      updatedAt: new Date().toISOString()
    };

    // Gérer l'outcome et l'historique
    if (formData.outcome) {
      taskData.outcomeDate = new Date().toISOString();
      
      // Si outcome = completed, mettre le statut à done
      if (formData.outcome === 'completed') {
        taskData.status = 'done';
      }
      
      // Ajouter à l'historique si c'est un changement d'outcome
      if (task && task.outcome !== formData.outcome) {
        const newHistory = [...(task.history || [])];
        newHistory.push({
          sprintId: taskData.sprintId,
          status: taskData.status,
          outcome: formData.outcome,
          reason: formData.outcomeReason,
          date: new Date().toISOString()
        });
        taskData.history = newHistory;
      }
    }

    // Si c'est une création, ajouter id et createdAt
    if (!task) {
      taskData.id = Date.now().toString();
      taskData.createdAt = new Date().toISOString();
      taskData.history = [];
    } else {
      // Si c'est une modification, conserver l'id et createdAt originaux
      taskData.id = task.id;
      taskData.createdAt = task.createdAt;
      taskData.history = task.history || [];
    }

    onSave(taskData);
  };

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Conversion en nombre pour estimatedHours
    const finalValue = name === 'estimatedHours' ? parseFloat(value) || 0 : value;
    setFormData({
      ...formData,
      [name]: finalValue
    });
  };

  // Obtenir l'équipe de la story sélectionnée
  const getStoryTeam = () => {
    if (!selectedStory || !selectedStory.teamId) return null;
    return teams.find(t => t.id === selectedStory.teamId);
  };

  const storyTeam = getStoryTeam();
  
  // Vérifier si le formulaire est valide en temps réel
  const isFormValid = Object.keys(errors).length === 0;

  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">📄 User Story associée</p>
        <p className="text-emerald-800 ml-2">Sélectionnez la User Story que cette tâche décompose. Si la story a une équipe, seuls ses membres pourront être assignés.</p>
      </div>

      <div>
        <p className="font-semibold">#️⃣ Identification & Type</p>
        <p className="text-emerald-800 ml-2">Numéro unique (ex: "T-123") et nature de la tâche (Développement, Tests, etc.).</p>
      </div>

      <div>
        <p className="font-semibold">✏️ Titre de la tâche</p>
        <p className="text-emerald-800 ml-2">Titre court et explicite décrivant l'action technique.</p>
      </div>

      <div>
        <p className="font-semibold">📝 Description détaillée</p>
        <p className="text-emerald-800 ml-2">Détails techniques : fichiers à modifier, approche, dépendances, points d'attention.</p>
      </div>

      <div>
        <p className="font-semibold">👤 Assignation & Estimation</p>
        <p className="text-emerald-800 ml-2">Membre responsable et temps estimé en heures (0.5, 1, 2, 4, 8...).</p>
      </div>

      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-emerald-800 ml-2">• Tâches de 0.5 à 8h max • Descriptions précises • Estimation réaliste • Assignez dès la création • Une tâche = une responsabilité</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={task ? 'Modifier la tâche' : 'Nouvelle tâche'}
        subtitle="Décomposition technique d'une User Story"
        icon={ListChecks}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* 1. User Story associée - emerald */}
        <FormSection title="User Story associée" emoji="📄" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-3">
            <UserStorySelector
              userStories={userStories}
              value={formData.userStoryId}
              onChange={handleChange}
              disabled={!!prefilledStoryId}
              error={errors.userStoryId}
            />
            
            {/* Informations sur la story sélectionnée */}
            {selectedStory && storyTeam && (
              <div className="p-3 bg-white rounded-lg border border-emerald-200">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Équipe responsable</span>
                    <span className="font-medium text-gray-900">{storyTeam.name}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FormSection>

        {/* 2. Identification & Type - teal */}
        <FormSection title="Identification & Type" emoji="#️⃣" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <FormGrid columns={2}>
              <Input
                label="Numéro d'identification"
                name="taskNumber"
                value={formData.taskNumber}
                onChange={handleChange}
                required
                error={errors.taskNumber}
                placeholder="Ex: T-123, TASK-042"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Type de tâche
                </label>
                <CustomSelect
                  value={formData.type}
                  onChange={handleChange}
                  options={[
                    { value: 'development', label: '💻 Développement' },
                    { value: 'testing', label: '🧪 Tests' },
                    { value: 'review', label: '👀 Revue de code' },
                    { value: 'deployment', label: '🚀 Déploiement' },
                    { value: 'documentation', label: '📚 Documentation' },
                    { value: 'other', label: '🔧 Autre' }
                  ]}
                  aria-label="Type de tâche"
                />
              </div>
            </FormGrid>
          </div>
        </FormSection>

        {/* 3. Titre - emerald */}
        <FormSection title="Titre de la tâche" emoji="✏️" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              error={errors.title}
              placeholder="Ex: Créer la page de connexion"
            />
          </div>
        </FormSection>

        {/* 4. Description - teal */}
        <FormSection title="Description détaillée" emoji="📝">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Décrivez ce qui doit être fait techniquement : fichiers à modifier, approche technique, dépendances, etc."
            />
          </div>
        </FormSection>

        {/* 5. Assignation & Estimation - emerald */}
        <FormSection title="Assignation & Estimation" emoji="👤" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <FormGrid columns={2}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Assigné à <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  value={formData.assignedTo}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Sélectionner' },
                    ...(storyTeam ? (
                      contacts
                        .filter(c => storyTeam.memberContactIds?.includes(c.id))
                        .length > 0 ? 
                          contacts
                            .filter(c => storyTeam.memberContactIds?.includes(c.id))
                            .map(contact => ({
                              value: contact.id,
                              label: `${contact.name} ${contact.role ? `(${contact.role})` : ''} ${contact.type === 'external' ? '🌐' : ''}`
                            }))
                        : [{ value: '', label: `Aucun membre dans l'équipe ${storyTeam.name}`, disabled: true }]
                    ) : (
                      contacts.filter(c => c.type === 'internal').length > 0 ?
                        contacts.filter(c => c.type === 'internal').map(contact => ({
                          value: contact.id,
                          label: `${contact.name} ${contact.role ? `(${contact.role})` : ''}`
                        }))
                      : [{ value: '', label: 'Aucun contact interne disponible', disabled: true }]
                    ))
                  ]}
                  placeholder="Sélectionner"
                  aria-label="Assigné à"
                />
                {errors.assignedTo && (
                  <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} />
                    Champ obligatoire
                  </p>
                )}
              </div>

              <Input
                label="Estimation (h)"
                name="estimatedHours"
                type="number"
                value={formData.estimatedHours}
                onChange={handleChange}
                required
                error={errors.estimatedHours}
                min="0"
                step="0.5"
                placeholder="0"
              />
            </FormGrid>
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

export default TaskForm;
