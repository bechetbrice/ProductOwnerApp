/**
 * Section de questions/réponses pour l'onglet Entretien
 * Le titre est maintenant géré par le composant parent
 * @component
 */
const InterviewAnswerSection = ({ 
  section, 
  sectionIndex, 
  mode, 
  onAnswerChange 
}) => {
  return (
    <div 
      className={`rounded-lg border p-4 ${
        sectionIndex % 2 === 0 
          ? 'bg-indigo-50 border-indigo-100' 
          : 'bg-blue-50 border-blue-100'
      }`}
    >
      <div className="space-y-4">
        {section.questions && section.questions.map((q, questionIndex) => (
          <div key={questionIndex}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {q.question}
            </label>
            {mode === 'view' ? (
              <div className="px-3 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200">
                {q.answer ? (
                  <p className="text-gray-900 whitespace-pre-wrap">{q.answer}</p>
                ) : (
                  <p className="text-gray-400 italic">Aucune réponse</p>
                )}
              </div>
            ) : (
              <textarea
                value={q.answer || ''}
                onChange={(e) => onAnswerChange(sectionIndex, questionIndex, e.target.value)}
                placeholder="Réponse recueillie..."
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewAnswerSection;
