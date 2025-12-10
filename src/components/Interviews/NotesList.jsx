import { useState } from 'react';
import { Trash2, Clock, Plus } from 'lucide-react';

/**
 * NotesList - Gestion des notes horodatées
 * 
 * Composant pour l'onglet 2 "Entretien" permettant :
 * - Affichage des notes avec timestamp
 * - Ajout de nouvelles notes
 * - Suppression de notes
 * 
 * @component
 */
const NotesList = ({ notes = [], onAddNote, onDeleteNote }) => {
  const [newNoteContent, setNewNoteContent] = useState('');

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAdd = () => {
    if (!newNoteContent.trim()) return;

    const note = {
      id: Date.now().toString(),
      content: newNoteContent,
      timestamp: new Date().toISOString()
    };

    onAddNote(note);
    setNewNoteContent('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      {/* Liste des notes existantes */}
      {notes.length > 0 && (
        <div className="space-y-2">
          {notes.map(note => (
            <div
              key={note.id}
              className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded shadow-sm hover:shadow transition-shadow"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} className="flex-shrink-0" />
                  {formatTime(note.timestamp)}
                </span>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="Supprimer cette note"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Formulaire d'ajout de note */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
        <textarea
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Notez une observation, une remarque importante..."
          rows={4}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleAdd}
            disabled={!newNoteContent.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesList;
