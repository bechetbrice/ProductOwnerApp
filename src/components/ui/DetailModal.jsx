import { useState } from 'react';
import { X, Edit2, Eye, HelpCircle } from 'lucide-react';
import { Button } from './Button';
import PropTypes from 'prop-types';

/**
 * DetailModal - Modale de visualisation complète d'une entité
 * Structure standardisée avec header gradient (identique aux formulaires), contenu scrollable et footer sticky
 * 
 * ✅ Version harmonisée :
 * - Header avec gradient coloré (comme FormHeader)
 * - Support de l'aide contextuelle
 * - Boutons avec composant Button standardisé
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - État d'ouverture de la modale
 * @param {string} props.title - Titre de la modale
 * @param {React.Component} props.icon - Icône Lucide à afficher (défaut: Eye)
 * @param {Function} props.onClose - Callback fermeture
 * @param {Function} props.onEdit - Callback édition (optionnel)
 * @param {string} props.editLabel - Label du bouton édition (défaut: "Modifier")
 * @param {React.Component} props.editIcon - Icône du bouton édition (défaut: Edit2)
 * @param {React.ReactNode} props.customHeader - Contenu additionnel sous le titre (optionnel)
 * @param {React.ReactNode} props.customFooter - Footer personnalisé (optionnel, remplace le footer par défaut)
 * @param {React.ReactNode} props.helpContent - Contenu de l'aide contextuelle (optionnel)
 * @param {React.ReactNode} props.children - Contenu de la modale
 * @param {string} props.size - Taille de la modale: 'sm' | 'md' | 'lg' | 'xl' (défaut: 'lg')
 * @param {boolean} props.noScroll - Désactive le scroll interne (défaut: false)
 */
const DetailModal = ({
  isOpen,
  title,
  icon: Icon = Eye,
  onClose,
  onEdit,
  editLabel = 'Modifier',
  editIcon: EditIcon = Edit2,
  customHeader,
  customFooter,
  helpContent,
  children,
  size = 'lg',
  noScroll = false
}) => {
  const [showHelp, setShowHelp] = useState(false);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full ${noScroll ? 'max-h-[90vh] flex flex-col' : 'max-h-[90vh] overflow-y-auto'}`}>
        {/* Header sticky avec gradient (identique à FormHeader) */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-4 md:px-6 py-3 md:py-4 z-10 shadow-lg rounded-t-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
                {Icon && <Icon className="text-white flex-shrink-0" size={20} />}
                <h2 className="text-lg md:text-xl font-bold text-white">
                  {title}
                </h2>
                {helpContent && (
                  <button
                    type="button"
                    onClick={() => setShowHelp(!showHelp)}
                    className="p-1.5 text-white hover:bg-white/20 rounded-lg transition-colors"
                    title="Aide"
                  >
                    <HelpCircle size={18} />
                  </button>
                )}
              </div>
              {/* Contenu custom sous le titre (métadonnées, badges, etc.) */}
              {customHeader && (
                <div className="mt-2">
                  {customHeader}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-2 md:ml-4 text-white/80 hover:text-white transition-colors flex-shrink-0"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Panel d'aide */}
          {showHelp && helpContent && (
            <div className="mt-3 md:mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 md:p-4 text-xs max-h-60 md:max-h-80 overflow-y-auto">
              <h3 className="font-bold text-emerald-900 mb-2 md:mb-3 flex items-center gap-2">
                <HelpCircle size={14} />
                Guide
              </h3>
              <div className="space-y-2 text-emerald-900">
                {helpContent}
              </div>
            </div>
          )}
        </div>

        {/* Contenu scrollable */}
        <div className={`px-4 sm:px-6 py-3 sm:py-4 ${noScroll ? 'flex-1 overflow-y-auto' : ''}`}>
          {children}
        </div>

        {/* Footer sticky */}
        {customFooter ? (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-b-lg">
            {customFooter}
          </div>
        ) : (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 rounded-b-lg">
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
            >
              Fermer
            </Button>
            {onEdit && (
              <Button
                variant="gradient"
                size="md"
                icon={EditIcon}
                onClick={() => {
                  onClose();
                  onEdit();
                }}
              >
                {editLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

DetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  editLabel: PropTypes.string,
  editIcon: PropTypes.elementType,
  customHeader: PropTypes.node,
  customFooter: PropTypes.node,
  helpContent: PropTypes.node,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  noScroll: PropTypes.bool
};

export default DetailModal;
