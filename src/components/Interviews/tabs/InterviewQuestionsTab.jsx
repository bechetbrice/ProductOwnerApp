import { getInterviewStats } from '../../../utils/interviewHelpers';

/**
 * Onglet 2 : Questions (readonly)
 * @component
 */
const InterviewQuestionsTab = ({ interview, formData }) => {
  const stats = getInterviewStats(formData);

  return (
    <div className="space-y-6">
      {/* Objectif */}
      {interview.objectives && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">🎯 Objectif</h3>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{interview.objectives}</p>
          </div>
        </div>
      )}

      {/* Questions structurées */}
      {formData.sections && formData.sections.length > 0 ? (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            ❓ Questions préparées ({stats.totalQuestions})
          </h3>
          <div className="space-y-4">
            {formData.sections.map((section, sectionIndex) => (
              <div 
                key={sectionIndex} 
                className={`rounded-lg border p-4 ${
                  sectionIndex % 2 === 0 
                    ? 'bg-emerald-50 border-emerald-100' 
                    : 'bg-teal-50 border-teal-100'
                }`}
              >
                <h4 className="text-sm font-medium text-gray-900 mb-3">{section.title}</h4>
                <ol className="space-y-2 list-decimal list-inside">
                  {section.questions && section.questions.map((q, questionIndex) => (
                    <li key={questionIndex} className="text-sm text-gray-700">
                      {q.question}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500">
            Aucune question préparée pour cet entretien.
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestionsTab;
