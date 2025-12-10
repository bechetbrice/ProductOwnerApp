import { useState, useEffect, useMemo, useRef } from 'react';
import { User, Search, Plus, Download, Upload, UserCircle } from 'lucide-react';
import { CONTACT_TYPES, CONTACT_TYPE_LABELS, CONTACT_TYPE_COLORS } from '../../utils/constants';
import ContactDetail from './ContactDetail';
import ContactCard from './ContactCard';
import ConfirmDialog from '../Common/ConfirmDialog';
import { EmptyState, Pagination, Button } from '../ui';
import { FilterBar, ProductSelector } from '../Common';
import { CustomSelect } from '../ui';

const ContactsList = ({ contacts, userNeeds, userStories, interviews, products, onEdit, onDelete, onNew, onNavigate, initialFilters = {}, onImportContacts }) => {
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterProduct, setFilterProduct] = useState(initialFilters.productId || 'all');
  const [filterTeamMember, setFilterTeamMember] = useState('all');
  const [filterAvailable, setFilterAvailable] = useState('all');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null); // Pour afficher le modal de détail
  
  // État pour la modale de confirmation
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  useEffect(() => {
    if (initialFilters.productId) {
      setFilterProduct(initialFilters.productId);
    }
  }, [initialFilters]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 500; // Pagination au-delà de 500 items

  const hasTeamFields = (contact) => {
    return !!(
      contact.skills?.length > 0 || 
      contact.capacity || 
      contact.contractType ||
      contact.seniority !== 'intermediate'
    );
  };

  const calculateAdjustedCapacity = (contact) => {
    if (!contact.capacity) return 0;
    return Math.round(
      (contact.capacity * (contact.availability ?? 100) * (contact.workload ?? 100)) / 10000
    );
  };

  const companies = useMemo(() => {
    return [...new Set(contacts
      .filter(c => c.company && c.company.trim() !== '')
      .map(c => c.company)
    )].sort();
  }, [contacts]);

  const roles = useMemo(() => {
    return [...new Set(contacts
      .filter(c => c.role && c.role.trim() !== '')
      .map(c => c.role)
    )].sort();
  }, [contacts]);

  const activeProducts = useMemo(() => {
    return products.filter(p => p.status === 'active');
  }, [products]);



  // Filtrage et recherche
  const filteredContacts = useMemo(() => {
    return contacts
      .filter(contact => {
        const matchesSearch = !searchTerm || 
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (contact.department && contact.department.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesType = filterType === 'all' || contact.type === filterType;
        const matchesCompany = filterCompany === 'all' || contact.company === filterCompany;
        const matchesRole = filterRole === 'all' || contact.role === filterRole;
        
        const matchesProduct = filterProduct === 'all' || 
          (contact.productIds && contact.productIds.includes(filterProduct));
        
        const matchesTeamMember = filterTeamMember === 'all' || 
          (filterTeamMember === 'team' && hasTeamFields(contact) && contact.isActive) ||
          (filterTeamMember === 'non_team' && (!hasTeamFields(contact) || !contact.isActive));
        
        const matchesAvailable = filterAvailable === 'all' ||
          (filterAvailable === 'available' && contact.isActive && contact.isAvailable) ||
          (filterAvailable === 'active' && contact.isActive) ||
          (filterAvailable === 'inactive' && !contact.isActive);
        
        return matchesSearch && matchesType && matchesCompany && matchesRole && matchesProduct && matchesTeamMember && matchesAvailable;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts, searchTerm, filterType, filterCompany, filterRole, filterProduct, filterTeamMember, filterAvailable]);

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, filterCompany, filterRole, filterProduct, filterTeamMember, filterAvailable]);

  const handleDelete = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;
    
    // Compter les relations
    const relatedInterviews = interviews?.filter(i => i.contactId === contactId).length || 0;
    const relatedNeeds = userNeeds?.filter(n => 
      n.primaryContactId === contactId || 
      n.stakeholderIds?.includes(contactId)
    ).length || 0;
    const relatedStories = userStories?.filter(s => 
      s.stakeholders?.includes(contactId)
    ).length || 0;
    
    const hasRelations = relatedInterviews > 0 || relatedNeeds > 0 || relatedStories > 0;
    
    let message = `Êtes-vous sûr de vouloir supprimer le contact "${contact.name}" ?`;
    
    if (hasRelations) {
      message += '\n\nCe contact est lié à :';
      if (relatedInterviews > 0) message += `\n• ${relatedInterviews} entretien${relatedInterviews > 1 ? 's' : ''}`;
      if (relatedNeeds > 0) message += `\n• ${relatedNeeds} besoin${relatedNeeds > 1 ? 's' : ''} utilisateur${relatedNeeds > 1 ? 's' : ''}`;
      if (relatedStories > 0) message += `\n• ${relatedStories} user stor${relatedStories > 1 ? 'ies' : 'y'}`;
      message += '\n\nCes relations seront supprimées.';
    }
    
    setConfirmDialog({
      isOpen: true,
      title: 'Supprimer le contact',
      message: message,
      onConfirm: () => {
        onDelete(contactId);
        setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterCompany('all');
    setFilterRole('all');
    setFilterProduct('all');
    setFilterTeamMember('all');
    setFilterAvailable('all');
  };

  const hasActiveFilters = searchTerm || filterType !== 'all' || filterCompany !== 'all' || filterRole !== 'all' || filterProduct !== 'all' || filterTeamMember !== 'all' || filterAvailable !== 'all';

  const getFilteredProductName = () => {
    if (filterProduct === 'all') return null;
    const product = products.find(p => p.id === filterProduct);
    return product ? `${product.code} - ${product.name}` : null;
  };

  const handleImportCSV = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        alert('Le fichier CSV semble vide ou invalide.');
        return;
      }

      // Parser le CSV
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const contactsToImport = [];
      let importedCount = 0;
      let errorCount = 0;

      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].match(/(?:"([^"]*)"|([^,]*))/g).map(v => 
            v ? v.replace(/"/g, '').trim() : ''
          );

          if (values.length < 3) continue; // Ignorer les lignes invalides

          const contact = {
            name: values[0] || '',
            type: values[1]?.includes('Interne') ? 'internal' : 'external',
            role: values[2] || '',
            company: values[3] || '',
            department: values[4] || '',
            email: values[5] || '',
            phone: values[6] || '',
            notes: '',
            productIds: values[7] ? values[7].split(';').filter(Boolean).map(code => {
              const prod = products.find(p => p.code === code.trim());
              return prod?.id;
            }).filter(Boolean) : []
          };

          // Champs équipe si présents
          if (values[8] === 'Oui') {
            contact.skills = values[10] ? values[10].split(';').filter(Boolean) : [];
            contact.capacity = parseInt(values[9]) || 0;
            contact.availability = 100;
            contact.workload = 100;
            contact.seniority = 'intermediate';
            contact.isActive = true;
            contact.isAvailable = true;
          }

          if (contact.name && contact.role) {
            contactsToImport.push(contact);
            importedCount++;
          }
        } catch (error) {
          console.error('Erreur ligne', i, error);
          errorCount++;
        }
      }

      // Créer les contacts via le callback parent
      if (onImportContacts) {
        await onImportContacts(contactsToImport);
        const confirmReload = window.confirm(
          `✅ Import terminé !\n\n` +
          `${importedCount} contact(s) importé(s)${errorCount > 0 ? `, ${errorCount} erreur(s)` : ''}\n\n` +
          `⚠️ Pour afficher les contacts, la page doit être rechargée.\n\n` +
          `Recharger maintenant ?`
        );
        
        if (confirmReload) {
          window.location.reload();
        }
      } else {
        alert('La fonction d\'import n\'est pas disponible.');
      }
    } catch (error) {
      console.error('Erreur import CSV:', error);
      alert('❌ Erreur lors de l\'import du fichier CSV.');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Nom', 'Type', 'Rôle', 'Entreprise', 'Département', 'Email', 'Téléphone', 'Produits', 'Membre Équipe', 'Capacité Ajustée', 'Compétences', 'Date création'].join(','),
      ...filteredContacts.map(contact => {
        const contactProducts = contact.productIds 
          ? contact.productIds.map(pid => {
              const prod = products.find(p => p.id === pid);
              return prod ? prod.code : '';
            }).join(';')
          : '';
        
        const isTeamMember = hasTeamFields(contact);
        const adjustedCapacity = isTeamMember ? calculateAdjustedCapacity(contact) : '';
        const skills = contact.skills?.join(';') || '';
        
        return [
          `"${contact.name}"`,
          contact.type === CONTACT_TYPES.INTERNAL ? 'Interne' : 'Externe',
          `"${contact.role}"`,
          `"${contact.company || ''}"`,
          `"${contact.department || ''}"`,
          contact.email || '',
          contact.phone || '',
          `"${contactProducts}"`,
          isTeamMember ? 'Oui' : 'Non',
          adjustedCapacity,
          `"${skills}"`,
          new Date(contact.createdAt || '').toLocaleDateString('fr-FR')
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleDownloadTemplate = () => {
    // Template CSV avec en-têtes + 2 lignes d'exemple
    const template = [
      ['Nom', 'Type', 'Rôle', 'Entreprise', 'Département', 'Email', 'Téléphone', 'Produits', 'Membre Équipe', 'Capacité', 'Compétences'].join(','),
      ['"Marie Dubois"', '"Interne"', '"Développeuse Full-Stack"', '""', '"Tech"', '"marie@example.com"', '"+33612345678"', '"PROD1;PROD2"', '"Oui"', '"20"', '"React;Node.js;TypeScript"'].join(','),
      ['"Jean Martin"', '"Externe"', '"Consultant Agile"', '"AgileConsult"', '""', '"jean@agileconsult.fr"', '"+33698765432"', '"PROD1"', '"Non"', '""', '""'].join(',')
    ].join('\n');

    const blob = new Blob(['\ufeff' + template], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contacts-template.csv';
    link.click();
  };


  const getSeniorityBadge = (seniority) => {
    const badges = {
      junior: { label: 'Junior', color: 'bg-gray-100 text-gray-700' },
      intermediate: { label: 'Intermédiaire', color: 'bg-blue-100 text-blue-700' },
      senior: { label: 'Senior', color: 'bg-purple-100 text-purple-700' },
      expert: { label: 'Expert', color: 'bg-indigo-100 text-indigo-700' }
    };
    const badge = badges[seniority] || badges.intermediate;
    return <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
      <Award size={12} />
      {badge.label}
    </span>;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        {/* MODULE FILTRES ET ACTIONS avec FilterBar */}
        {contacts.length > 0 && (
        <FilterBar
          isExpanded={isFiltersExpanded}
          onToggleExpand={() => setIsFiltersExpanded(!isFiltersExpanded)}
          onAdd={onNew}
          addLabel="Nouveau Contact"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          topLeftContent={
            /* Sélecteur Produit - Toujours visible */
            activeProducts.length > 0 && (
              <ProductSelector
                products={activeProducts}
                value={filterProduct}
                onChange={(productId) => setFilterProduct(productId)}
                placeholder="Tous les produits"
                className="w-full sm:w-64"
              />
            )
          }
          additionalActions={
            <div className="flex items-center gap-2 flex-wrap">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadTemplate}
                icon={Download}
                iconPosition="left"
                className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-300 text-xs sm:text-sm whitespace-nowrap"
                title="Télécharger un template CSV avec exemples"
              >
                <span className="hidden sm:inline">Template CSV</span>
                <span className="sm:hidden">Template</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                icon={Upload}
                iconPosition="left"
                className="bg-green-50 text-green-700 hover:bg-green-100 border-green-300 text-xs sm:text-sm whitespace-nowrap"
                title="Importer des contacts depuis CSV"
              >
                <span className="hidden sm:inline">Import CSV</span>
                <span className="sm:hidden">Import</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                icon={Download}
                iconPosition="left"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-300 text-xs sm:text-sm whitespace-nowrap"
                title="Exporter les contacts en CSV"
                disabled={filteredContacts.length === 0}
              >
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          }
          filters={
            <>
              {/* Recherche - Responsive */}
              <div className="col-span-full mb-2">
                <div className="relative">
                  <Search 
                    className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    size={16} 
                  />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, rôle, entreprise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>

              {/* Filtres - Harmonisés avec ProductSelector */}
              <div className="col-span-full flex flex-wrap gap-2 sm:gap-3">
                {/* Filtre Type */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type</label>
                  <CustomSelect
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous les types' },
                      { value: CONTACT_TYPES.INTERNAL, label: '🏢 Internes' },
                      { value: CONTACT_TYPES.EXTERNAL, label: '🌐 Externes' }
                    ]}
                    aria-label="Filtrer par type"
                  />
                </div>

                {/* Filtre Entreprise */}
                {companies.length > 0 && (
                  <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                    <CustomSelect
                      value={filterCompany}
                      onChange={(e) => setFilterCompany(e.target.value)}
                      options={[
                        { value: 'all', label: 'Toutes les entreprises' },
                        ...companies.map(company => ({
                          value: company,
                          label: company
                        }))
                      ]}
                      aria-label="Filtrer par entreprise"
                    />
                  </div>
                )}

                {/* Filtre Équipe */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Équipe</label>
                  <CustomSelect
                    value={filterTeamMember}
                    onChange={(e) => setFilterTeamMember(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous' },
                      { value: 'team', label: '👥 Membres équipe' },
                      { value: 'non_team', label: 'Non membres' }
                    ]}
                    aria-label="Filtrer par équipe"
                  />
                </div>

                {/* Filtre Rôle */}
                {roles.length > 0 && (
                  <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Rôle</label>
                    <CustomSelect
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      options={[
                        { value: 'all', label: 'Tous les rôles' },
                        ...roles.map(role => ({
                          value: role,
                          label: role
                        }))
                      ]}
                      aria-label="Filtrer par rôle"
                    />
                  </div>
                )}

                {/* Filtre Disponibilité */}
                <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
                  <CustomSelect
                    value={filterAvailable}
                    onChange={(e) => setFilterAvailable(e.target.value)}
                    options={[
                      { value: 'all', label: 'Tous' },
                      { value: 'available', label: '✓ Disponibles' },
                      { value: 'active', label: '⚡ Actifs' },
                      { value: 'inactive', label: '⏸️ Inactifs' }
                    ]}
                    aria-label="Filtrer par disponibilité"
                  />
                </div>
              </div>

              {/* Compteur de résultats */}
              {hasActiveFilters && filteredContacts.length < contacts.length && (
                <div className="col-span-full mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 text-xs sm:text-sm text-gray-600">
                  <strong className="text-indigo-600">{filteredContacts.length}</strong> contact{filteredContacts.length > 1 ? 's' : ''} affiché{filteredContacts.length > 1 ? 's' : ''} sur <strong className="text-gray-800">{contacts.length}</strong>
                </div>
              )}
            </>
          }
        />
        )}

        {/* LISTE DES CONTACTS - Grid responsive */}
        {contacts.length === 0 ? (
          <EmptyState
            icon={UserCircle}
            message="Aucun contact pour le moment"
            description="Commencez par créer votre premier contact pour démarrer."
            onAction={onNew}
            actionLabel="Créer mon premier contact"
          />
        ) : filteredContacts.length === 0 ? (
          <EmptyState
            icon={UserCircle}
            message="Aucun contact ne correspond à vos critères de recherche"
            onAction={resetFilters}
            actionLabel="Réinitialiser les filtres"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {paginatedContacts.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                products={products}
                hasTeamFields={hasTeamFields}
                onView={() => setSelectedContact(contact)}
                onEdit={() => onEdit(contact)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Pagination si nécessaire */}
        {filteredContacts.length > contactsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredContacts.length}
            itemsPerPage={contactsPerPage}
            onPageChange={setCurrentPage}
            itemLabel="contact"
          />
        )}

        {/* Modal de détail */}
        {selectedContact && (
          <ContactDetail
            contact={selectedContact}
            products={products}
            onClose={() => setSelectedContact(null)}
            onEdit={onEdit}
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

export default ContactsList;
