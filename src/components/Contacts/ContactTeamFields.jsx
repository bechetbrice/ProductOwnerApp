import { Input, CustomSelect, FormGrid, Textarea, DynamicList } from '../ui';

/**
 * ContactTeamFields - Section dédiée aux informations d'équipe
 * Composant extrait de ContactForm pour alléger le code
 */
const ContactTeamFields = ({
  formData,
  errors,
  onFieldChange,
  onSkillsChange
}) => {
  const adjustedCapacity = Math.round(
    (formData.capacity * formData.availability * formData.workload) / 10000
  );

  return (
    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-4">
      
      {/* Niveau, Contrat, Taux & Devise */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Niveau d'expérience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Niveau d'expérience
          </label>
          <CustomSelect
            value={formData.seniority}
            onChange={onFieldChange}
            options={[
              { value: 'na', label: 'N/A (Non applicable)' },
              { value: 'junior', label: 'Junior' },
              { value: 'intermediate', label: 'Intermédiaire' },
              { value: 'senior', label: 'Senior' },
              { value: 'expert', label: 'Expert' }
            ]}
            placeholder="Sélectionner un niveau"
            aria-label="Niveau d'expérience"
          />
        </div>

        {/* Type de contrat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Type de contrat
          </label>
          <CustomSelect
            value={formData.contractType}
            onChange={onFieldChange}
            options={
              formData.type === 'internal'
                ? [
                    { value: 'full_time', label: 'Temps plein (CDI)' },
                    { value: 'part_time', label: 'Temps partiel' },
                    { value: 'intern', label: 'Stagiaire' },
                    { value: 'apprentice', label: 'Alternant' }
                  ]
                : [
                    { value: 'freelance', label: 'Freelance' },
                    { value: 'contractor', label: 'Prestataire' },
                    { value: 'agency', label: 'Agence' },
                    { value: 'consultant', label: 'Consultant' }
                  ]
            }
            placeholder="Sélectionner un type"
            aria-label="Type de contrat"
          />
        </div>

        {/* Taux horaire */}
        <Input
          label="Taux horaire brut chargé"
          name="dailyRate"
          type="number"
          value={formData.dailyRate}
          onChange={onFieldChange}
          placeholder="0"
          min="0"
        />

        {/* Devise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Devise
          </label>
          <CustomSelect
            value={formData.currency}
            onChange={onFieldChange}
            options={[
              { value: 'EUR', label: 'EUR' },
              { value: 'USD', label: 'USD' },
              { value: 'GBP', label: 'GBP' }
            ]}
            placeholder="Sélectionner une devise"
            aria-label="Devise"
          />
        </div>
      </div>

      {/* Compétences techniques */}
      <DynamicList
        label="Compétences techniques"
        items={formData.skills.length > 0 ? formData.skills : ['']}
        onChange={onSkillsChange}
        placeholder="Ex: React, Node.js, Python..."
        addButtonLabel="Ajouter une compétence"
      />

      {/* Capacité & Disponibilité */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Capacité & Disponibilité</h4>
        <FormGrid columns={3}>
          <Input
            label="Capacité (pts/sprint)"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={onFieldChange}
            min="0"
            error={errors.capacity}
          />

          <Input
            label="Disponibilité (%)"
            name="availability"
            type="number"
            value={formData.availability}
            onChange={onFieldChange}
            min="0"
            max="100"
            error={errors.availability}
          />

          <Input
            label="% Temps produit"
            name="workload"
            type="number"
            value={formData.workload}
            onChange={onFieldChange}
            min="0"
            max="100"
            error={errors.workload}
          />
        </FormGrid>
        
        {/* Capacité ajustée */}
        {formData.capacity > 0 && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-200">
            <p className="text-xs font-medium text-gray-600 mb-1">Capacité ajustée</p>
            <p className="text-lg font-semibold text-emerald-600">
              {adjustedCapacity} <span className="text-sm font-normal">pts/sprint</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ({formData.capacity} × {formData.availability}% × {formData.workload}%)
            </p>
          </div>
        )}
      </div>

      {/* Localisation & Horaires */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Localisation & Horaires</h4>
        <FormGrid columns={3}>
          <Input
            label="Localisation"
            name="location"
            value={formData.location}
            onChange={onFieldChange}
            placeholder="Paris, Remote..."
          />

          <Input
            label="Fuseau horaire"
            name="timezone"
            value={formData.timezone}
            onChange={onFieldChange}
            placeholder="Europe/Paris"
          />

          <Input
            label="Horaires"
            name="workingHours"
            value={formData.workingHours}
            onChange={onFieldChange}
            placeholder="9h-18h"
          />
        </FormGrid>
      </div>

      {/* Dates & Période */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Période</h4>
        <FormGrid columns={2}>
          <Input
            label="Date d'arrivée"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={onFieldChange}
          />

          <Input
            label="Date de départ"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={onFieldChange}
            error={errors.endDate}
          />
        </FormGrid>
      </div>

      {/* Statuts */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Statuts</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={onFieldChange}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-sm text-gray-700">Membre actif dans l'équipe</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={onFieldChange}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-sm text-gray-700">Disponible pour nouvelles assignations</span>
          </label>
        </div>
      </div>

      {/* Préférences */}
      <Textarea
        label="Préférences de travail"
        name="preferences"
        value={formData.preferences}
        onChange={onFieldChange}
        rows={2}
        placeholder="Ex: Préfère le backend, meilleur le matin..."
      />
    </div>
  );
};

export default ContactTeamFields;
