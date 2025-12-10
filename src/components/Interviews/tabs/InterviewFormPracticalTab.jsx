import { Calendar, Clock, AlertCircle } from 'lucide-react';
import MultiContactSelector from '../../Contacts/MultiContactSelector';
import {
  FormSection,
  FormGrid,
  Input,
  Textarea,
  CustomSelect,
  StatusSelector,
  ProductDropdown
} from '../../ui';
import { STATUS_OPTIONS, TYPE_OPTIONS } from '../../../constants/interviewConfig';

/**
 * Onglet Informations pratiques du formulaire d'entretien
 * @component
 */
const InterviewFormPracticalTab = ({
  formData,
  errors,
  contacts,
  activeProducts,
  onFieldUpdate,
  onChange
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Produit - EMERALD */}
      <FormSection 
        title="Produit associé*" 
        emoji="📦"
        withBorder={false}
      >
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {activeProducts.length === 0 ? (
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
                products={activeProducts}
                value={formData.productId}
                onChange={(productId) => onFieldUpdate('productId', productId)}
                placeholder="-- Sélectionner un produit --"
                emptyMessage="Aucun produit actif disponible"
              />
              {errors.productId && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.productId}
                </p>
              )}
            </>
          )}
        </div>
      </FormSection>

      {/* 2. Identification - TEAL */}
      <FormSection title="Identification" emoji="#️⃣">
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 space-y-4">
          <Input
            label="Titre"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            error={errors.title}
            placeholder="Ex: Entretien découverte - Marie Dupont"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Type d'entretien
            </label>
            <CustomSelect
              value={formData.type}
              onChange={onChange}
              options={[
                { value: '', label: 'Sélectionner un type...' },
                ...TYPE_OPTIONS.map(opt => ({ value: opt.value, label: opt.label }))
              ]}
              placeholder="Sélectionner un type..."
              aria-label="Type d'entretien"
            />
          </div>
        </div>
      </FormSection>

      {/* 3. Participants - EMERALD */}
      <FormSection title="Participants" emoji="👥">
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <MultiContactSelector
            contacts={contacts}
            selectedContactIds={formData.interviewedContactIds || []}
            onChange={(contactIds) => onFieldUpdate('interviewedContactIds', contactIds)}
            label="Interviewé(s)"
            required={true}
          />
          {errors.interviewedContactIds && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.interviewedContactIds}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Sélectionnez les personnes qui seront interrogées
          </p>
        </div>
      </FormSection>

      {/* 4. Statut - TEAL */}
      <FormSection title="Statut" emoji="📊">
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
          <StatusSelector
            value={formData.status}
            onChange={(status) => onFieldUpdate('status', status)}
            options={STATUS_OPTIONS}
            columns={4}
          />
        </div>
      </FormSection>

      {/* 5. Planning - EMERALD */}
      <FormSection title="Planning" emoji="📅">
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <FormGrid columns={3}>
            <div>
              <label htmlFor="scheduledDate" className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar size={12} />
                Date et heure
              </label>
              <input
                type="datetime-local"
                id="scheduledDate"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={onChange}
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Clock size={12} />
                Durée (min)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={onChange}
                min="15"
                step="15"
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <Input
              label="Lieu"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="Ex: Visio, Bureau..."
            />
          </FormGrid>
        </div>
      </FormSection>

      {/* 6. Notes de préparation - TEAL */}
      <FormSection title="Notes de préparation" emoji="📝">
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
          <Textarea
            name="generalNotes"
            value={formData.generalNotes}
            onChange={onChange}
            rows={4}
            placeholder="Contexte, informations importantes à connaître avant l'entretien..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Ces notes concernent la préparation. Vous pourrez ajouter des observations horodatées pendant l'entretien.
          </p>
        </div>
      </FormSection>
    </div>
  );
};

export default InterviewFormPracticalTab;
