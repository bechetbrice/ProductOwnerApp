import { Clock } from 'lucide-react';
import InterviewAnswerSection from '../InterviewAnswerSection';
import NotesList from '../NotesList';
import { formatTime } from '../../../utils/dateHelpers';

// Emojis de numérotation pour les sections
const SECTION_NUMBER_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

/**
 * Onglet 3 : Entretien (éditable en mode 'edit')
 * @component
 */
const InterviewConductTab = ({ 
  formData, 
  mode,
  onAnswerChange,
  onAddNote,
  onDeleteNote
}) => {
  return (
    <div className="space-y-6">

      {/* Questions et réponses */}
      {formData.sections && formData.sections.length > 0 && (
        <div className="space-y-6">
          {formData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Titre de section en dehors */}
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {SECTION_NUMBER_EMOJIS[sectionIndex] || `${sectionIndex + 1}.`} {section.title}
              </h3>
              
              {/* Contenu de la section */}
              <InterviewAnswerSection
                section={section}
                sectionIndex={sectionIndex}
                mode={mode}
                onAnswerChange={onAnswerChange}
              />
            </div>
          ))}
        </div>
      )}

      {/* Notes & Observations horodatées */}
      {(mode === 'edit' || (formData.notes && formData.notes.length > 0)) && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            📝 Notes & Observations
          </h3>
          {mode === 'view' ? (
            /* Affichage lecture seule des notes */
            <div className="space-y-2">
              {formData.notes.map(note => (
                <div
                  key={note.id}
                  className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded shadow-sm"
                >
                  <span className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    <Clock size={12} className="flex-shrink-0" />
                    {formatTime(note.timestamp)}
                  </span>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <NotesList
              notes={formData.notes || []}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewConductTab;
