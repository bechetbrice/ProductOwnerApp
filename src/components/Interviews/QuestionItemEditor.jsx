import { Trash2 } from 'lucide-react';

/**
 * Éditeur pour une question individuelle
 * @component
 */
const QuestionItemEditor = ({ 
  question, 
  questionIndex, 
  onUpdate, 
  onRemove 
}) => {
  return (
    <div className="mb-3 p-3 bg-gray-50 rounded border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <label className="text-xs font-medium text-gray-700">
          Question {questionIndex + 1}
        </label>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-600 hover:text-red-800"
          title="Supprimer cette question"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <textarea
        value={question.question}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Saisissez la question à poser lors de l'entretien..."
        rows="2"
        className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      />
    </div>
  );
};

export default QuestionItemEditor;
