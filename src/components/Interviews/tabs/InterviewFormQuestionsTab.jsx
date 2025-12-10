import { Target, Plus } from 'lucide-react';
import { FormSection, Textarea } from '../../ui';
import QuestionSectionEditor from '../QuestionSectionEditor';

/**
 * Onglet Questions du formulaire d'entretien
 * @component
 */
const InterviewFormQuestionsTab = ({
  formData,
  totalQuestions,
  onChange,
  onAddSection,
  onRemoveSection,
  onUpdateSectionTitle,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Objectif - EMERALD */}
      <FormSection title="Objectif" emoji="🎯" icon={Target}>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <Textarea
            name="objectives"
            value={formData.objectives}
            onChange={onChange}
            rows={3}
            placeholder="Décrivez l'objectif principal de cet entretien..."
          />
        </div>
      </FormSection>

      {/* 2. Questions préparées - TEAL */}
      <FormSection title="Questions à poser" emoji="❓">
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
          {totalQuestions > 0 && (
            <div className="mb-3">
              <span className="text-emerald-600 font-semibold text-xs">
                ({totalQuestions} question{totalQuestions > 1 ? 's' : ''} préparée{totalQuestions > 1 ? 's' : ''})
              </span>
            </div>
          )}
          
          <div className="bg-white border border-teal-200 rounded-lg p-3 mb-3">
            <p className="text-xs text-teal-800">
              <strong>💡 Astuce :</strong> Préparez vos questions à l'avance. Les réponses seront remplies lors de l'entretien (onglet "Entretien" dans la vue détail).
            </p>
          </div>
          
          <div className="flex justify-end mb-3">
            <button
              type="button"
              onClick={onAddSection}
              className="px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
            >
              <Plus size={14} />
              Nouvelle section
            </button>
          </div>

          {formData.sections.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                Aucune section créée. Cliquez sur "Nouvelle section" pour organiser vos questions.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.sections.map((section, sectionIndex) => (
                <QuestionSectionEditor
                  key={sectionIndex}
                  section={section}
                  sectionIndex={sectionIndex}
                  onUpdateTitle={(title) => onUpdateSectionTitle(sectionIndex, title)}
                  onRemoveSection={() => onRemoveSection(sectionIndex)}
                  onAddQuestion={onAddQuestion}
                  onUpdateQuestion={onUpdateQuestion}
                  onRemoveQuestion={onRemoveQuestion}
                />
              ))}
            </div>
          )}
        </div>
      </FormSection>
    </div>
  );
};

export default InterviewFormQuestionsTab;
