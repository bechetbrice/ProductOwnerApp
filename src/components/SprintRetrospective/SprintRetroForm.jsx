import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, Plus, Trash2, Minus, Edit2, Save, X } from 'lucide-react';
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

const SprintRetroForm = ({ retro, sprints, contacts, products, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    sprintId: '',
    retroDate: '',
    status: 'scheduled',
    participants: [],
    whatWentWell: [],
    whatNeedsImprovement: [],
    actionItems: [],
    nextSprintCommitments: ''
  });

  const [errors, setErrors] = useState({});
  const [newWentWell, setNewWentWell] = useState('');
  const [editingWentWellId, setEditingWentWellId] = useState(null);
  const [newImprovement, setNewImprovement] = useState('');
  const [editingImprovementId, setEditingImprovementId] = useState(null);
  const [newAction, setNewAction] = useState({
    description: '',
    priority: 'medium',
    category: 'process',
    assignedTo: '',
    dueDate: '',
    notes: '',
    status: 'todo'
  });
  const [editingActionId, setEditingActionId] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const isEditMode = !!retro;

  useEffect(() => {
    if (retro) {
      setFormData({
        sprintId: retro.sprintId || '',
        retroDate: retro.retroDate || '',
        status: retro.status || 'scheduled',
        participants: retro.participants || [],
        whatWentWell: retro.whatWentWell || [],
        whatNeedsImprovement: retro.whatNeedsImprovement || [],
        actionItems: retro.actionItems || [],
        nextSprintCommitments: retro.nextSprintCommitments || ''
      });
    } else {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 16);
      setFormData(prev => ({ ...prev, retroDate: dateStr }));
    }
  }, [retro]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};
    
    // Champs obligatoires (true seulement)
    if (!formData.sprintId) {
      newErrors.sprintId = true;
    }
    
    if (!formData.retroDate) {
      newErrors.retroDate = true;
    }

    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Gestion "Ce qui s'est bien passé"
  const handleAddWentWell = () => {
    if (newWentWell.trim()) {
      if (editingWentWellId !== null) {
        setFormData(prev => ({
          ...prev,
          whatWentWell: prev.whatWentWell.map(item => 
            item.id === editingWentWellId ? { ...item, description: newWentWell.trim() } : item
          )
        }));
        setEditingWentWellId(null);
      } else {
        setFormData(prev => ({
          ...prev,
          whatWentWell: [...prev.whatWentWell, { id: Date.now().toString(), description: newWentWell.trim(), votes: 0 }]
        }));
      }
      setNewWentWell('');
    }
  };

  const handleRemoveWentWell = (id) => {
    setFormData(prev => ({
      ...prev,
      whatWentWell: prev.whatWentWell.filter(item => item.id !== id)
    }));
    if (editingWentWellId === id) {
      setEditingWentWellId(null);
      setNewWentWell('');
    }
  };

  const handleEditWentWell = (item) => {
    setNewWentWell(item.description);
    setEditingWentWellId(item.id);
  };

  const handleCancelEditWentWell = () => {
    setEditingWentWellId(null);
    setNewWentWell('');
  };

  const handleVoteWentWell = (id, delta) => {
    setFormData(prev => ({
      ...prev,
      whatWentWell: prev.whatWentWell.map(item => 
        item.id === id ? { ...item, votes: Math.max(0, item.votes + delta) } : item
      )
    }));
  };

  // Gestion "À améliorer"
  const handleAddImprovement = () => {
    if (newImprovement.trim()) {
      if (editingImprovementId !== null) {
        setFormData(prev => ({
          ...prev,
          whatNeedsImprovement: prev.whatNeedsImprovement.map(item => 
            item.id === editingImprovementId ? { ...item, description: newImprovement.trim() } : item
          )
        }));
        setEditingImprovementId(null);
      } else {
        setFormData(prev => ({
          ...prev,
          whatNeedsImprovement: [...prev.whatNeedsImprovement, { id: Date.now().toString(), description: newImprovement.trim(), votes: 0 }]
        }));
      }
      setNewImprovement('');
    }
  };

  const handleRemoveImprovement = (id) => {
    setFormData(prev => ({
      ...prev,
      whatNeedsImprovement: prev.whatNeedsImprovement.filter(item => item.id !== id)
    }));
    if (editingImprovementId === id) {
      setEditingImprovementId(null);
      setNewImprovement('');
    }
  };

  const handleEditImprovement = (item) => {
    setNewImprovement(item.description);
    setEditingImprovementId(item.id);
  };

  const handleCancelEditImprovement = () => {
    setEditingImprovementId(null);
    setNewImprovement('');
  };

  const handleVoteImprovement = (id, delta) => {
    setFormData(prev => ({
      ...prev,
      whatNeedsImprovement: prev.whatNeedsImprovement.map(item => 
        item.id === id ? { ...item, votes: Math.max(0, item.votes + delta) } : item
      )
    }));
  };

  // Gestion actions
  const handleAddAction = () => {
    if (newAction.description.trim()) {
      if (editingActionId !== null) {
        setFormData(prev => ({
          ...prev,
          actionItems: prev.actionItems.map(item => 
            item.id === editingActionId ? { ...item, ...newAction } : item
          )
        }));
        setEditingActionId(null);
      } else {
        setFormData(prev => ({
          ...prev,
          actionItems: [
            ...prev.actionItems,
            { id: Date.now().toString(), ...newAction }
          ]
        }));
      }
      setNewAction({
        description: '',
        priority: 'medium',
        category: 'process',
        assignedTo: '',
        dueDate: '',
        notes: '',
        status: 'todo'
      });
    }
  };

  const handleRemoveAction = (id) => {
    setFormData(prev => ({
      ...prev,
      actionItems: prev.actionItems.filter(item => item.id !== id)
    }));
    if (editingActionId === id) {
      setEditingActionId(null);
      setNewAction({
        description: '',
        priority: 'medium',
        category: 'process',
        assignedTo: '',
        dueDate: '',
        notes: '',
        status: 'todo'
      });
    }
  };

  const handleEditAction = (action) => {
    setNewAction({ ...action });
    setEditingActionId(action.id);
  };

  const handleCancelEditAction = () => {
    setEditingActionId(null);
    setNewAction({
      description: '',
      priority: 'medium',
      category: 'process',
      assignedTo: '',
      dueDate: '',
      notes: '',
      status: 'todo'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    const cleanData = {
      sprintId: formData.sprintId,
      retroDate: formData.retroDate,
      status: formData.status,
      participants: formData.participants,
      whatWentWell: formData.whatWentWell,
      whatNeedsImprovement: formData.whatNeedsImprovement,
      actionItems: formData.actionItems,
      nextSprintCommitments: formData.nextSprintCommitments.trim()
    };

    onSave(cleanData);
  };

  const isFormValid = Object.keys(errors).length === 0;
  
  const selectedSprint = sprints.find(s => s.id === formData.sprintId);
  
  const availableParticipants = contacts.filter(c => {
    if (!selectedSprint) return false;
    const sprintProduct = products.find(p => p.id === selectedSprint.productId);
    if (!sprintProduct) return false;
    return c.productIds?.includes(sprintProduct.id);
  });

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
      process: 'bg-blue-100 text-blue-700',
      tools: 'bg-purple-100 text-purple-700',
      communication: 'bg-green-100 text-green-700',
      technical: 'bg-orange-100 text-orange-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || colors.other;
  };

  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">🎯 Informations de base</p>
        <p className="text-emerald-800 ml-2">Sprint et date obligatoires. Le statut indique l'état de la rétrospective.</p>
      </div>

      <div>
        <p className="font-semibold">👥 Participants</p>
        <p className="text-indigo-800 ml-2">Sélectionnez les membres de l'équipe présents. Seuls les contacts du produit du sprint sont disponibles.</p>
      </div>

      <div>
        <p className="font-semibold">👍 Ce qui s'est bien passé</p>
        <p className="text-indigo-800 ml-2">Succès du sprint : bonnes pratiques, collaboration efficace. Utilisez +/- pour voter (dot-voting).</p>
      </div>

      <div>
        <p className="font-semibold">💡 À améliorer</p>
        <p className="text-indigo-800 ml-2">Points de friction, obstacles rencontrés. Soyez constructifs et utilisez le dot-voting pour prioriser.</p>
      </div>

      <div>
        <p className="font-semibold">🎯 Actions d'Amélioration</p>
        <p className="text-indigo-800 ml-2">Actions concrètes avec priorité, catégorie, assignation et échéance. Limitez à 3-5 actions réalistes.</p>
      </div>

      <div>
        <p className="font-semibold">🎯 Engagements</p>
        <p className="text-indigo-800 ml-2">Ce que l'équipe s'engage collectivement à faire au prochain sprint.</p>
      </div>

      <div className="pt-2 border-t border-emerald-300 mt-2">
        <p className="font-semibold">💡 Bonnes pratiques</p>
        <p className="text-indigo-800 ml-2">• Environnement sûr et bienveillant • Focus sur les actions, pas les personnes • Dot-voting pour prioriser • Limitez les actions (3-5 max) • Suivez les actions précédentes</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={isEditMode ? 'Modifier la Rétrospective' : 'Nouvelle Rétrospective'}
        icon={RefreshCw}
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
                label="Date et heure de la rétrospective"
                name="retroDate"
                type="datetime-local"
                value={formData.retroDate}
                onChange={handleChange}
                required
                error={errors.retroDate}
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
              placeholder="Sélectionner les membres de l'équipe..."
              disabled={!formData.sprintId}
            />
          </div>
        </FormSection>

        {/* 3. Ce qui s'est bien passé - emerald */}
        <FormSection title={`Ce qui s'est bien passé (${formData.whatWentWell.length})`} emoji="👍">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-3">
            {formData.whatWentWell.length > 0 && (
              <div className="space-y-2">
                {formData.whatWentWell
                  .sort((a, b) => b.votes - a.votes)
                  .map(item => (
                  <div key={item.id} className="bg-white border border-emerald-300 rounded-lg p-3 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleVoteWentWell(item.id, -1)}
                        className="p-1 hover:bg-emerald-100 rounded transition-colors"
                        disabled={item.votes === 0}
                      >
                        <Minus size={14} className="text-emerald-700" />
                      </button>
                      <span className="w-8 text-center font-bold text-emerald-700">
                        {item.votes}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleVoteWentWell(item.id, 1)}
                        className="p-1 hover:bg-emerald-100 rounded transition-colors"
                      >
                        <Plus size={14} className="text-emerald-700" />
                      </button>
                    </div>
                    <p className="flex-1 text-sm text-gray-800">{item.description}</p>
                    <button
                      type="button"
                      onClick={() => handleEditWentWell(item)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Modifier"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveWentWell(item.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={`rounded-lg p-3 ${
              editingWentWellId !== null ? 'bg-cyan-50 border border-cyan-300' : 'bg-white border border-emerald-200'
            }`}>
              {editingWentWellId !== null && (
                <div className="flex items-center gap-2 text-sm text-blue-700 font-medium mb-2">
                  <Edit2 size={16} />
                  Modification en cours
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newWentWell}
                  onChange={(e) => setNewWentWell(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddWentWell())}
                  placeholder="Ex: Les dailys étaient efficaces et bien rythmés"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                />
                <div className="flex gap-2">
                  {editingWentWellId !== null && (
                    <button
                      type="button"
                      onClick={handleCancelEditWentWell}
                      className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-1.5"
                    >
                      <X size={14} />
                      <span className="hidden sm:inline">Annuler</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddWentWell}
                    disabled={!newWentWell.trim()}
                    className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:bg-gray-300 ${
                      editingWentWellId !== null ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {editingWentWellId !== null ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span className="hidden sm:inline">Valider</span>
                        <span className="sm:hidden">OK</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        Ajouter
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              💡 Utilisez les boutons +/- pour voter (dot-voting)
            </p>
          </div>
        </FormSection>

        {/* 4. À améliorer - teal */}
        <FormSection title={`À améliorer (${formData.whatNeedsImprovement.length})`} emoji="💡">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-3">
            {formData.whatNeedsImprovement.length > 0 && (
              <div className="space-y-2">
                {formData.whatNeedsImprovement
                  .sort((a, b) => b.votes - a.votes)
                  .map(item => (
                  <div key={item.id} className="bg-white border border-orange-300 rounded-lg p-3 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleVoteImprovement(item.id, -1)}
                        className="p-1 hover:bg-orange-100 rounded transition-colors"
                        disabled={item.votes === 0}
                      >
                        <Minus size={14} className="text-orange-700" />
                      </button>
                      <span className="w-8 text-center font-bold text-orange-700">
                        {item.votes}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleVoteImprovement(item.id, 1)}
                        className="p-1 hover:bg-orange-100 rounded transition-colors"
                      >
                        <Plus size={14} className="text-orange-700" />
                      </button>
                    </div>
                    <p className="flex-1 text-sm text-gray-800">{item.description}</p>
                    <button
                      type="button"
                      onClick={() => handleEditImprovement(item)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Modifier"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveImprovement(item.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={`rounded-lg p-3 ${
              editingImprovementId !== null ? 'bg-emerald-50 border border-emerald-300' : 'bg-white border border-teal-200'
            }`}>
              {editingImprovementId !== null && (
                <div className="flex items-center gap-2 text-sm text-indigo-700 font-medium mb-2">
                  <Edit2 size={16} />
                  Modification en cours
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newImprovement}
                  onChange={(e) => setNewImprovement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImprovement())}
                  placeholder="Ex: Améliorer les tests end-to-end"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                />
                <div className="flex gap-2">
                  {editingImprovementId !== null && (
                    <button
                      type="button"
                      onClick={handleCancelEditImprovement}
                      className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-1.5"
                    >
                      <X size={14} />
                      <span className="hidden sm:inline">Annuler</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddImprovement}
                    disabled={!newImprovement.trim()}
                    className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:bg-gray-300 ${
                      editingImprovementId !== null ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                  >
                    {editingImprovementId !== null ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span className="hidden sm:inline">Valider</span>
                        <span className="sm:hidden">OK</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        Ajouter
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              💡 Utilisez les boutons +/- pour voter (dot-voting)
            </p>
          </div>
        </FormSection>

        {/* 5. Actions d'amélioration - emerald */}
        <FormSection title={`Actions d'Amélioration (${formData.actionItems.length})`} emoji="🎯">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-3">
            {formData.actionItems.length > 0 && (
              <div className="space-y-2">
                {formData.actionItems.map((action) => {
                  const assignedContact = contacts.find(c => c.id === action.assignedTo);
                  return (
                    <div key={action.id} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="flex-1 text-sm font-medium text-gray-800">{action.description}</p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(action.priority)}`}>
                            {action.priority}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(action.category)}`}>
                            {action.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleEditAction(action)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Modifier"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveAction(action.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      {assignedContact && (
                        <p className="text-xs text-gray-600">Assigné à: {assignedContact.name}</p>
                      )}
                      {action.dueDate && (
                        <p className="text-xs text-gray-600">Échéance: {new Date(action.dueDate).toLocaleDateString('fr-FR')}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className={`border rounded-lg p-4 space-y-3 ${
              editingActionId !== null ? 'bg-cyan-50 border-cyan-300' : 'bg-white border-emerald-200'
            }`}>
              {editingActionId !== null && (
                <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
                  <Edit2 size={16} />
                  Modification de l'action
                </div>
              )}
              <Textarea
                label="Description de l'action"
                value={newAction.description}
                onChange={(e) => setNewAction(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                placeholder="Ex: Mettre en place des tests automatisés pour le backend"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">Priorité</label>
                  <select
                    value={newAction.priority}
                    onChange={(e) => setNewAction(prev => ({ ...prev, priority: e.target.value }))}
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
                    value={newAction.category}
                    onChange={(e) => setNewAction(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="process">🔄 Processus</option>
                    <option value="tools">🛠️ Outils</option>
                    <option value="communication">💬 Communication</option>
                    <option value="technical">⚙️ Technique</option>
                    <option value="other">🔧 Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">Assigné à</label>
                  <select
                    value={newAction.assignedTo}
                    onChange={(e) => setNewAction(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Non assigné</option>
                    {availableParticipants.map(contact => (
                      <option key={contact.id} value={contact.id}>{contact.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">Échéance</label>
                  <input
                    type="date"
                    value={newAction.dueDate}
                    onChange={(e) => setNewAction(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <Input
                label="Notes (optionnel)"
                value={newAction.notes}
                onChange={(e) => setNewAction(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Contexte, détails supplémentaires..."
              />

              <div className="flex flex-col sm:flex-row gap-2">
                {editingActionId !== null && (
                  <button
                    type="button"
                    onClick={handleCancelEditAction}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <X size={14} />
                    Annuler
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleAddAction}
                  disabled={!newAction.description.trim()}
                  className={`flex-1 px-3 sm:px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
                  editingActionId !== null ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {editingActionId !== null ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span className="hidden sm:inline">Mettre à jour</span>
                      <span className="sm:hidden">Valider</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span className="hidden sm:inline">Ajouter cette action</span>
                      <span className="sm:hidden">Ajouter</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </FormSection>

        {/* 6. Engagements pour le prochain sprint - teal */}
        <FormSection title="Engagements pour le Prochain Sprint" emoji="🎯">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <Textarea
              name="nextSprintCommitments"
              value={formData.nextSprintCommitments}
              onChange={handleChange}
              rows={4}
              placeholder="Ce que l'équipe s'engage à faire au prochain sprint..."
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

export default SprintRetroForm;
