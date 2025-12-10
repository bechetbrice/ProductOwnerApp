import { ExternalLink } from 'lucide-react';

const UserStoryLink = ({ storyId, userStories, onNavigate }) => {
  const story = userStories.find(s => s.id === storyId);
  
  if (!story) {
    return (
      <div className="text-gray-500 text-xs italic break-words">
        Story non trouvée (ID: {storyId})
      </div>
    );
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('story', storyId);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return '⚪';
      case 'inProgress': return '🔵';
      case 'done': return '✅';
      default: return '⚪';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'must': return '🔴';
      case 'should': return '🟠';
      case 'could': return '🟡';
      case 'wont': return '⚪';
      default: return '⚪';
    }
  };

  return (
    /* FIX 1: min-w-0 pour permettre troncature, wrapping responsive */
    <div className="flex items-center gap-1 text-xs min-w-0">
      <span className="text-gray-400 flex-shrink-0">
        {getStatusIcon(story.status)}
      </span>
      <span className="text-gray-400 flex-shrink-0">
        {getPriorityIcon(story.priority)}
      </span>
      <button
        onClick={handleClick}
        className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors flex items-center gap-1 min-w-0 flex-1"
        title={story.title}
      >
        {/* FIX 2: Troncature ajustée pour mobile (80px) et desktop (120px) */}
        <span className="truncate max-w-[80px] sm:max-w-[120px]">
          {story.title}
        </span>
        <ExternalLink size={10} className="flex-shrink-0" />
      </button>
    </div>
  );
};

export default UserStoryLink;
