import { MessageSquare, Save, FileText, HelpCircle } from 'lucide-react';
import { Tabs, Tab } from '../ui/Tabs';
import {
  FormModal,
  FormHeader,
  FormFooter
} from '../ui';
import InterviewFormPracticalTab from './tabs/InterviewFormPracticalTab';
import InterviewFormQuestionsTab from './tabs/InterviewFormQuestionsTab';
import { useInterviewForm } from './hooks/useInterviewForm';

/**
 * InterviewForm - Formulaire de création/édition d'entretien
 * 
 * Composant responsable de la préparation d'un entretien :
 * - Onglet 1 : Informations pratiques (produit, identification, participants, statut, planning, notes)
 * - Onglet 2 : Questions (objectif, sections de questions)
 * 
 * @component
 */
const InterviewForm = ({ interview, contacts, userNeeds, products = [], onSave, onCancel }) => {
  const {
    formData,
    errors,
    showHelp,
    setShowHelp,
    activeTab,
    setActiveTab,
    isEditMode,
    isFormValid,
    activeProducts,
    totalQuestions,
    handleChange,
    handleFieldUpdate,
    addCustomSection,
    removeSection,
    updateSectionTitle,
    addQuestion,
    removeQuestion,
    updateQuestion
  } = useInterviewForm(interview, contacts, products);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    onSave(formData);
  };

  // Composant d'aide contextuelle
  const HelpContent = () => (
    <div className="space-y-2 text-emerald-900">
      <div>
        <p className="font-semibold">📦 Produit</p>
        <p className="text-emerald-800 ml-2">Associez l'entretien au produit concerné.</p>
      </div>

      <div>
        <p className="font-semibold">#️⃣ Identification</p>
        <p className="text-emerald-800 ml-2"><strong>Titre</strong> : Identifiez clairement l'entretien. <strong>Type</strong> : Choisissez selon votre objectif.</p>
      </div>

      <div>
        <p className="font-semibold">👥 Participants</p>
        <p className="text-emerald-800 ml-2">Sélectionnez les personnes interviewées. Au moins un participant est requis.</p>
      </div>

      <div>
        <p className="font-semibold">📊 Statut</p>
        <p className="text-emerald-800 ml-2">Planifié, En cours, Terminé ou Annulé.</p>
      </div>

      <div>
        <p className="font-semibold">📅 Planning</p>
        <p className="text-emerald-800 ml-2">Date/heure, durée (60 min par défaut), lieu.</p>
      </div>

      <div>
        <p className="font-semibold">🎯 Objectif</p>
        <p className="text-emerald-800 ml-2">Décrivez ce que vous cherchez à apprendre ou valider.</p>
      </div>

      <div>
        <p className="font-semibold">❓ Questions</p>
        <p className="text-emerald-800 ml-2">Préparez vos questions à l'avance. Les réponses seront remplies pendant l'entretien.</p>
      </div>

      <div>
        <p className="font-semibold">📝 Notes de préparation</p>
        <p className="text-emerald-800 ml-2">Contexte, informations importantes avant l'entretien.</p>
      </div>
    </div>
  );

  return (
    <FormModal isOpen={true} onClose={onCancel} size="xl">
      <FormHeader
        title={isEditMode ? 'Préparer l\'entretien' : 'Préparer un entretien'}
        icon={MessageSquare}
        onClose={onCancel}
        helpContent={<HelpContent />}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="flex-1 p-4 md:p-6">
          <Tabs defaultTab="pratique" onChange={setActiveTab}>
            
            {/* ONGLET 1 : INFORMATIONS PRATIQUES */}
            <Tab id="pratique" label="Informations pratiques" icon={FileText}>
              <InterviewFormPracticalTab
                formData={formData}
                errors={errors}
                contacts={contacts}
                activeProducts={activeProducts}
                onFieldUpdate={handleFieldUpdate}
                onChange={handleChange}
              />
            </Tab>

            {/* ONGLET 2 : QUESTIONS */}
            <Tab id="questions" label="Questions" icon={HelpCircle}>
              <InterviewFormQuestionsTab
                formData={formData}
                totalQuestions={totalQuestions}
                onChange={handleChange}
                onAddSection={addCustomSection}
                onRemoveSection={removeSection}
                onUpdateSectionTitle={updateSectionTitle}
                onAddQuestion={addQuestion}
                onUpdateQuestion={updateQuestion}
                onRemoveQuestion={removeQuestion}
              />
            </Tab>
          </Tabs>
        </div>

        {/* FormFooter visible dans tous les onglets */}
        <FormFooter
          onCancel={onCancel}
          onSubmit={handleSubmit}
          submitLabel="Sauvegarder"
          submitIcon={Save}
          submitDisabled={!isFormValid}
          errorMessage={!isFormValid ? 'Veuillez remplir tous les champs requis' : null}
        />
      </form>
    </FormModal>
  );
};

export default InterviewForm;
