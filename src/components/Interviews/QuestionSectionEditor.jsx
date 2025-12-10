import { Trash2, Plus } from 'lucide-react';
import QuestionItemEditor from './QuestionItemEditor';

/**
 * Éditeur pour une section de questions
 * @component
 */
const QuestionSectionEditor = ({ 
  section, 
  sectionIndex, 
  onUpdateTitle, 
  onRemoveSection,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion
}) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      {/* En-tête section */}
      <div className="flex justify-between items-center gap-2 mb-3">
        <input
          type="text"
          value={section.title}
          onChange={(e) => onUpdateTitle(e.target.value)}
          className="text-sm font-semibold bg-gray-50 border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Titre de la section (ex: Contexte, Besoins, Feedback...)"
        />
        <button
          type="button"
          onClick={onRemoveSection}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Supprimer la section"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Questions */}
      {section.questions.map((q, questionIndex) => (
        <QuestionItemEditor
          key={questionIndex}
          question={q}
          questionIndex={questionIndex}
          onUpdate={(value) => onUpdateQuestion(sectionIndex, questionIndex, value)}
          onRemove={() => onRemoveQuestion(sectionIndex, questionIndex)}
        />
      ))}

      {section.questions.length === 0 && (
        <p className="text-xs text-gray-500 italic text-center py-2">
          Aucune question dans cette section
        </p>
      )}

      <button
        type="button"
        onClick={() => onAddQuestion(sectionIndex)}
        className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-2"
      >
        <Plus size={14} />
        Ajouter une question
      </button>
    </div>
  );
};

export default QuestionSectionEditor;
