import { useState, useEffect } from 'react';
import MoSCoWBoard from './MoSCoWBoard';

/**
 * UserStoriesList - Module User Stories avec vue MoSCoW unique (v3.0.1)
 * Ajout prop teams
 */
const UserStoriesList = ({ 
  userStories, 
  userNeeds, 
  contacts, 
  Objectives = [],
  products = [],
  interviews = [],
  personas = [],
  teamMembers = [],
  teams = [],
  onAdd, 
  onUpdate, 
  onDelete, 
  prefilledData, 
  onClearPrefilled,
  onNavigate,
  initialFilters = {},
  showTips = false
}) => {
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || 'all');
  const [productFilter, setProductFilter] = useState(initialFilters.productId || 'all');
  const [specificIdFilter, setSpecificIdFilter] = useState(initialFilters.specificId || null);

  useEffect(() => {
    if (initialFilters.status) setStatusFilter(initialFilters.status);
    if (initialFilters.productId) setProductFilter(initialFilters.productId);
    if (initialFilters.specificId) setSpecificIdFilter(initialFilters.specificId);
  }, [initialFilters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        <MoSCoWBoard
          userStories={userStories}
          userNeeds={userNeeds}
          contacts={contacts}
          products={products}
          Objectives={Objectives}
          interviews={interviews}
          personas={personas}
          teamMembers={teamMembers}
          teams={teams}
          onAddStory={onAdd}
          onUpdateStory={onUpdate}
          onDeleteStory={onDelete}
          onNavigate={onNavigate}
          prefilledData={prefilledData}
          onClearPrefilled={onClearPrefilled}
          productFilter={productFilter}
          setProductFilter={setProductFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          specificIdFilter={specificIdFilter}
          setSpecificIdFilter={setSpecificIdFilter}
          showTips={showTips}
        />
      </div>
    </div>
  );
};

export default UserStoriesList;
