import { Edit2, Save, FileText, HelpCircle, MessageSquare } from 'lucide-react';
import { DetailModal } from '../ui';
import { Tabs, Tab } from '../ui/Tabs';
import InterviewPracticalInfoTab from './tabs/InterviewPracticalInfoTab';
import InterviewQuestionsTab from './tabs/InterviewQuestionsTab';
import InterviewConductTab from './tabs/InterviewConductTab';

import { useInterviewDetail } from './hooks/useInterviewDetail';
import {
  STATUS_CONFIG,
  TYPE_CONFIG
} from '../../constants/interviewConfig';
import {
  getInterviewedContacts
} from '../../utils/interviewHelpers';

/**
 * InterviewDetail - Modale de consultation/suivi d'un entretien avec 3 onglets
 * 
 * MODES :
 * - mode='view' : "Détail de l'entretien" (consultation readonly, tous onglets)
 *   → Bouton "Modifier la préparation" visible dans onglets 1-2
 * 
 * - mode='edit' : "Suivi de l'entretien" (édition onglet 3 uniquement)
 *   → Onglets 1-2 en readonly (pas de bouton "Modifier la préparation")
 *   → Onglet 3 éditable avec bouton "Sauvegarder"
 * 
 * ARCHITECTURE :
 * - Onglet 1 : Informations pratiques (readonly)
 * - Onglet 2 : Questions (readonly)
 * - Onglet 3 : Entretien (éditable en mode 'edit')
 * 
 * @component
 */
const InterviewDetail = ({ 
  interview, 
  contacts,
  products = [],
  onUpdate, 
  onClose, 
  onEditPreparation,
  onEditConduct, // Callback pour "Modifier le suivi de l'entretien"
  mode = 'view' // 'view' | 'edit'
}) => {
  // Hook personnalisé gérant toute la logique
  const {
    formData,
    activeTab,
    setActiveTab,
    handleAnswerChange,
    handleAddNote,
    handleDeleteNote,
    handleSaveInterview,
    handleMarkAsCompleted
  } = useInterviewDetail(interview, onUpdate, mode);

  // Récupérer le produit associé
  const product = products.find(p => p.id === interview.productId);

  // Récupérer les contacts interviewés
  const interviewedContacts = getInterviewedContacts(interview, contacts);



  // Configurations
  const statusConfig = STATUS_CONFIG[interview.status] || STATUS_CONFIG.scheduled;
  const typeConfig = TYPE_CONFIG[interview.type] || {
    label: 'Personnalisé',
    badgeClass: 'bg-gray-100 text-gray-700',
    emoji: '⚙️'
  };

  // Déterminer le titre et les actions selon le mode et l'onglet actif
  const modalTitle = mode === 'view' ? "Détail de l'entretien" : "Suivi de l'entretien";
  const showEditPreparation = mode === 'view' && (activeTab === 'pratique' || activeTab === 'questions');

  // Footer personnalisé
  // Mode 'edit' sur onglet 3 : bouton Sauvegarder
  // Mode 'view' sur onglet 3 : bouton Modifier le suivi
  const customFooter = activeTab === 'entretien' ? (
    <div className="flex flex-col sm:flex-row gap-3 justify-end">
      <button
        onClick={onClose}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Fermer
      </button>
      {mode === 'edit' ? (
        <>
          <button
            onClick={handleSaveInterview}
            className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Save size={16} />
            Sauvegarder l'entretien
          </button>
          {interview.status !== 'completed' && (
            <button
              onClick={handleMarkAsCompleted}
              className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Save size={16} />
              Marquer comme terminé
            </button>
          )}
        </>
      ) : onEditConduct ? (
        <button
          onClick={() => onEditConduct(interview)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
        >
          <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Modifier le suivi de l'entretien
        </button>
      ) : null}
    </div>
  ) : null;

  return (
    <DetailModal
      isOpen={true}
      title={modalTitle}
      icon={MessageSquare}
      onClose={onClose}
      onEdit={showEditPreparation && onEditPreparation ? () => onEditPreparation(interview) : null}
      editLabel="Modifier la préparation"
      customFooter={customFooter}
      size="xl"
      noScroll={true}
    >
      {/* === SYSTÈME D'ONGLETS === */}
      <Tabs defaultTab="pratique" onChange={setActiveTab}>
        
        {/* ONGLET 1 : INFORMATIONS PRATIQUES */}
        <Tab id="pratique" label="Informations pratiques" icon={FileText}>
          <InterviewPracticalInfoTab
            interview={interview}
            product={product}
            interviewedContacts={interviewedContacts}
            statusConfig={statusConfig}
            typeConfig={typeConfig}
          />
        </Tab>

        {/* ONGLET 2 : QUESTIONS */}
        <Tab id="questions" label="Questions" icon={HelpCircle}>
          <InterviewQuestionsTab
            interview={interview}
            formData={formData}
          />
        </Tab>

        {/* ONGLET 3 : ENTRETIEN */}
        <Tab id="entretien" label="Entretien" icon={MessageSquare}>
          <InterviewConductTab
            formData={formData}
            mode={mode}
            onAnswerChange={handleAnswerChange}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        </Tab>

      </Tabs>
    </DetailModal>
  );
};

export default InterviewDetail;
