import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import StoryCardCompact from './StoryCardCompact';
import ConfirmDialog from '../Common/ConfirmDialog';
import { VirtualizedList } from '../ui';

/**
 * MoSCoWColumn - Colonne de priorité MoSCoW (v3.2.2)
 * Support suppression depuis les cartes
 */
const MoSCoWColumn = ({ 
  column,
  stories,
  products,
  onStoryClick,
  onEdit,
  onDelete
}) => {
  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const handleDelete = (story) => {
    const message = `Êtes-vous sûr de vouloir supprimer la story "${story.title}" ?`;
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer la story',
      message: message,
      onConfirm: () => {
        onDelete(story.id);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };
  return (
    <div className="flex flex-col">
      {/* En-tête colonne */}
      <div 
        className="rounded-t-lg p-4 shadow-md"
        style={{ backgroundColor: column.bgColor }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{column.icon}</span>
            <h3 className="font-bold text-gray-900 text-lg">{column.label}</h3>
          </div>
        </div>
        <p className="text-xs text-gray-600">{column.description}</p>
      </div>

      {/* Zone d'affichage des cartes - Virtualisée */}
      <div
        className="flex-1 rounded-b-lg shadow-md p-3"
        style={{ 
          backgroundColor: column.bgColor,
          maxHeight: 'calc(100vh - 450px)', 
          minHeight: '400px'
        }}
      >
        {stories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <ClipboardList size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Aucune story</p>
          </div>
        ) : (
          <VirtualizedList
            items={stories}
            itemHeight={140}
            height={Math.min(window.innerHeight - 450, stories.length * 140)}
            renderItem={({ item: story, style }) => (
              <div key={story.id} style={style} className="pb-3">
                <StoryCardCompact
                  story={story}
                  products={products}
                  onView={onStoryClick}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                />
              </div>
            )}
          />
        )}
      </div>
      
      {/* Modale de confirmation */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null })}
      />
    </div>
  );
};

export default MoSCoWColumn;
