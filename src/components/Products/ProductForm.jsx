import { useState, useEffect } from 'react';
import { Package, Save } from 'lucide-react';
import ContactSelector from '../Contacts/ContactSelector';
import MultiContactSelector from '../Contacts/MultiContactSelector';
import {
  FormModal,
  FormHeader,
  FormSection,
  FormGrid,
  FormFooter,
  Input,
  Textarea,
  ColorPicker,
  StatusSelector
} from '../ui';

// Configuration des statuts
const STATUS_OPTIONS = [
  {
    value: 'draft',
    label: '📝 Brouillon',
    description: 'En préparation, non visible en production',
    color: 'border-gray-300 text-gray-800 hover:bg-gray-50',
    selectedColor: 'bg-gray-100 border-gray-400 text-gray-900',
    icon: '📝'
  },
  {
    value: 'active',
    label: '✅ Actif',
    description: 'Produit en production',
    color: 'border-emerald-300 text-emerald-800 hover:bg-emerald-50',
    selectedColor: 'bg-emerald-100 border-emerald-400 text-emerald-900',
    icon: '✅'
  },
  {
    value: 'archived',
    label: '📦 Archivé',
    description: 'Hors production',
    color: 'border-orange-300 text-orange-800 hover:bg-orange-50',
    selectedColor: 'bg-orange-100 border-orange-400 text-orange-900',
    icon: '📦'
  }
];

// Contenu d'aide
const HelpContent = () => (
  <div className="space-y-2 text-emerald-900">
    <div>
      <p className="font-semibold">#️⃣ Identification</p>
      <p className="text-emerald-800 ml-2">
        <strong>Nom</strong> : Nom complet (ex: "Application Mobile Client"). 
        <strong> Code</strong> : 2-6 caractères majuscules (ex: "AMC"), auto-généré depuis le nom.
      </p>
    </div>

    <div>
      <p className="font-semibold">🎨 Apparence</p>
      <p className="text-emerald-800 ml-2">
        <strong>Couleur</strong> : Identifiant visuel du produit dans toute l'application. 
        Aperçu en temps réel du badge.
      </p>
    </div>

    <div>
      <p className="font-semibold">📝 Informations complémentaires</p>
      <p className="text-emerald-800 ml-2">
        Contexte, objectif, public cible. Aide à l'onboarding des nouveaux collaborateurs.
      </p>
    </div>

    <div>
      <p className="font-semibold">⚡ Statut</p>
      <p className="text-emerald-800 ml-2">
        <strong>Brouillon</strong> : En préparation. 
        <strong> Actif</strong> : En production (défaut). 
        <strong> Archivé</strong> : Arrêté mais conservé.
      </p>
    </div>

    <div>
      <p className="font-semibold">👥 Gestion</p>
      <p className="text-emerald-800 ml-2">
        <strong>Client(s)</strong> : Sélection multiple de contacts (via dropdown). 
        <strong> Product Owner</strong> : Référent principal (optionnel). 
        <strong> Dates</strong> : Début = lancement, Fin prévue = planning initial, 
        Fin attendue = estimation actuelle, Fin réelle = date effective.
      </p>
    </div>

    <div className="pt-2 border-t border-emerald-300 mt-2">
      <p className="font-semibold">💡 Bonnes pratiques</p>
      <p className="text-emerald-800 ml-2">
        • Nom unique et explicite • Code court mémorable • Couleurs contrastées entre produits 
        • Documenter dès la création
      </p>
    </div>
  </div>
);

function ProductForm({ product, contacts, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    color: '#6366f1',
    status: 'active',
    clientIds: [],
    ownerId: '',
    startDate: new Date().toISOString().split('T')[0],
    plannedEndDate: '',
    expectedEndDate: '',
    actualEndDate: ''
  });

  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        code: product.code || '',
        color: product.color || '#6366f1',
        status: product.status || 'active',
        clientIds: product.clientIds || [],
        ownerId: product.ownerId || '',
        startDate: product.startDate || new Date().toISOString().split('T')[0],
        plannedEndDate: product.plannedEndDate || '',
        expectedEndDate: product.expectedEndDate || '',
        actualEndDate: product.actualEndDate || ''
      });
    }
  }, [product]);

  // Validation en temps réel
  useEffect(() => {
    const newErrors = {};

    // Champs obligatoires (true seulement, pas de message)
    if (!formData.name.trim()) {
      newErrors.name = true;
    }

    if (!formData.code.trim()) {
      newErrors.code = true;
    } else {
      // Validations de format (avec message)
      if (formData.code.length > 6) {
        newErrors.code = 'Le code ne peut pas dépasser 6 caractères';
      } else if (!/^[A-Z0-9]+$/.test(formData.code)) {
        newErrors.code = 'Le code doit contenir uniquement des lettres majuscules et chiffres';
      }
    }

    if (!formData.color) {
      newErrors.color = true;
    }

    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Générer automatiquement le code depuis le nom (seulement si nouveau produit)
    if (name === 'name' && !product) {
      const autoCode = value
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, '')
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 6);
      setFormData(prev => ({ ...prev, code: autoCode }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length === 0) {
      onSave(formData);
    }
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <FormModal isOpen={true} onClose={onCancel} size="lg">
      <FormHeader
        title={isEditing ? 'Modifier le produit' : 'Nouveau produit'}
        icon={Package}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
        
        {/* Section 1: Identification - Fond emerald */}
        <FormSection title="Identification" emoji="#️⃣" required>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-4">
            <Input
              label="Nom du produit"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Application Mobile Client"
              required
              error={errors.name}
            />

            <Input
              label="Code court"
              name="code"
              value={formData.code}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                setFormData(prev => ({ ...prev, code: value }));
              }}
              placeholder="Ex: AMC"
              maxLength={6}
              required
              error={errors.code}
              helpText="Max 6 caractères, lettres majuscules et chiffres uniquement"
              className="uppercase"
            />
          </div>
        </FormSection>

        {/* Section 2: Apparence - Fond teal */}
        <FormSection title="Apparence" emoji="🎨" required>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <ColorPicker
              label="Couleur"
              value={formData.color}
              onChange={(color) => setFormData(prev => ({ ...prev, color }))}
              required
              error={errors.color}
              previewCode={formData.code}
              previewName={formData.name}
            />
          </div>
        </FormSection>

        {/* Section 3: Description - Fond emerald */}
        <FormSection title="Informations complémentaires sur le produit" emoji="📝">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez le produit, son objectif, son public cible..."
              rows={3}
            />
          </div>
        </FormSection>

        {/* Section 4: Statut - Fond teal */}
        <FormSection title="Statut" emoji="⚡">
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <StatusSelector
              value={formData.status}
              onChange={(status) => setFormData(prev => ({ ...prev, status }))}
              options={STATUS_OPTIONS}
              columns={3}
            />
          </div>
        </FormSection>

        {/* Section 5: Gestion - Fond emerald */}
        <FormSection title="Gestion" emoji="👥">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-4">
            <MultiContactSelector
              contacts={contacts}
              selectedContactIds={formData.clientIds}
              onChange={(clientIds) => setFormData(prev => ({ ...prev, clientIds }))}
              label="Client(s)"
              required={false}
              helperText="Sélectionnez un ou plusieurs contacts clients pour ce produit"
            />

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Product Owner
              </label>
              <ContactSelector
                contacts={contacts}
                selectedContactId={formData.ownerId}
                onChange={(contactId) => setFormData(prev => ({ ...prev, ownerId: contactId }))}
                label=""
                required={false}
              />
              <p className="text-xs text-gray-500 mt-1">
                Responsable principal du produit (optionnel)
              </p>
            </div>

            {/* Dates - Ligne 1 */}
            <FormGrid columns={2}>
              <Input
                label="Date de début"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />

              <Input
                label="Date de fin prévue"
                type="date"
                name="plannedEndDate"
                value={formData.plannedEndDate}
                onChange={handleChange}
                helpText="Planning initial"
              />
            </FormGrid>

            {/* Dates - Ligne 2 */}
            <FormGrid columns={2}>
              <Input
                label="Date de fin attendue"
                type="date"
                name="expectedEndDate"
                value={formData.expectedEndDate}
                onChange={handleChange}
                helpText="Estimation actuelle"
              />

              <Input
                label="Date de fin réelle"
                type="date"
                name="actualEndDate"
                value={formData.actualEndDate}
                onChange={handleChange}
                helpText="Date effective de livraison"
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
}

export default ProductForm;
