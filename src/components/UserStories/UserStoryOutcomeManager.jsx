import React, { useState } from 'react';
import { 
  CheckCircle2, 
  PauseCircle, 
  XCircle, 
  AlertCircle, 
  Shield,
  RefreshCw,
  ChevronRight,
  Clock,
  Target,
  X
} from 'lucide-react';

/**
 * UserStoryOutcomeManager - Système de gestion des "Outcomes" pour les User Stories
 * Approche bienveillante et actionnable pour gérer les stories non terminées
 * v4.4.0 - Design harmonisé avec TaskOutcomeManager
 */
const UserStoryOutcomeManager = ({ story, onUpdateOutcome, onClose }) => {
  const [selectedOutcome, setSelectedOutcome] = useState(story.outcome || null);
  const [selectedReason, setSelectedReason] = useState(story.outcomeReason || '');
  const [outcomeNote, setOutcomeNote] = useState(story.outcomeNote || '');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Configuration des Outcomes avec icônes, couleurs et raisons types
  const outcomes = {
    completed: {
      id: 'completed',
      label: 'Terminée',
      icon: CheckCircle2,
      color: 'green',
      bgClass: 'bg-green-50 border-green-300',
      iconClass: 'text-green-600',
      buttonClass: 'hover:bg-green-50',
      description: 'La User Story a été complétée et les critères d\'acceptation sont validés',
      reasons: [
        'Tous les critères d\'acceptation validés',
        'Fonctionnalité déployée en production',
        'Tests d\'acceptation passés',
        'PO a validé la démo',
        'Definition of Done respectée'
      ]
    },
    paused: {
      id: 'paused',
      label: 'En pause',
      icon: PauseCircle,
      color: 'yellow',
      bgClass: 'bg-yellow-50 border-yellow-300',
      iconClass: 'text-yellow-600',
      buttonClass: 'hover:bg-yellow-50',
      description: 'Story mise en pause pour prioriser d\'autres besoins',
      reasons: [
        'Changement de priorité business',
        'En attente de retour client',
        'Budget réalloué',
        'Focus sur autre épic',
        'Attente de validation stratégique'
      ]
    },
    blocked: {
      id: 'blocked',
      label: 'Bloquée',
      icon: Shield,
      color: 'orange',
      bgClass: 'bg-orange-50 border-orange-300',
      iconClass: 'text-orange-600',
      buttonClass: 'hover:bg-orange-50',
      description: 'Bloquée par une dépendance ou un manque d\'information',
      reasons: [
        'Dépendance avec autre équipe',
        'API tierce non disponible',
        'Spécifications incomplètes',
        'Manque de ressources design',
        'Contrainte légale ou compliance'
      ]
    },
    cancelled: {
      id: 'cancelled',
      label: 'Annulée',
      icon: XCircle,
      color: 'gray',
      bgClass: 'bg-gray-50 border-gray-300',
      iconClass: 'text-gray-600',
      buttonClass: 'hover:bg-gray-50',
      description: 'Cette story n\'est plus pertinente',
      reasons: [
        'Feature abandonnée',
        'Changement de stratégie produit',
        'Remplacée par autre solution',
        'ROI insuffisant',
        'Feedback utilisateurs négatif'
      ]
    },
    to_review: {
      id: 'to_review',
      label: 'À revoir',
      icon: RefreshCw,
      color: 'red',
      bgClass: 'bg-red-50 border-red-300',
      iconClass: 'text-red-600',
      buttonClass: 'hover:bg-red-50',
      description: 'Story à redécouper ou redéfinir',
      reasons: [
        'Scope trop large',
        'Critères d\'acceptation flous',
        'Estimation très sous-évaluée',
        'Découverte de complexité technique',
        'Besoin de recherche utilisateur'
      ]
    }
  };

  // Suggestions d'actions selon l'outcome
  const getNextActions = (outcomeId) => {
    const actions = {
      completed: [
        'Mettre à jour la roadmap',
        'Analyser les métriques d\'usage',
        'Communiquer aux stakeholders',
        'Documenter les apprentissages'
      ],
      paused: [
        'Replacer dans le backlog',
        'Définir critères de reprise',
        'Documenter l\'état actuel',
        'Revoir la priorité au prochain PI Planning'
      ],
      blocked: [
        'Escalader au niveau management',
        'Organiser meeting avec dépendances',
        'Évaluer solutions de contournement',
        'Estimer délai de déblocage'
      ],
      cancelled: [
        'Archiver la documentation',
        'Supprimer du backlog',
        'Informer les parties prenantes',
        'Documenter les raisons pour rétrospective'
      ],
      to_review: [
        'Organiser session de découpage',
        'Affiner avec le PO',
        'Workshop avec l\'équipe',
        'Créer des stories plus petites'
      ]
    };
    return actions[outcomeId] || [];
  };

  const handleSubmit = () => {
    if (!selectedOutcome) {
      return;
    }

    const outcomeData = {
      outcome: selectedOutcome,
      outcomeReason: selectedReason,
      outcomeNote: outcomeNote,
      outcomeDate: new Date().toISOString()
    };

    // Ajouter à l'historique
    const newHistory = [...(story.history || []), {
      sprintId: story.sprintId,
      status: story.status,
      outcome: selectedOutcome,
      reason: selectedReason,
      date: new Date().toISOString()
    }];

    onUpdateOutcome(story.id, {
      ...outcomeData,
      history: newHistory,
      // Si la story est terminée, mettre le statut à 'done'
      status: selectedOutcome === 'completed' ? 'done' : story.status
    });
  };

  const selectedOutcomeConfig = selectedOutcome ? outcomes[selectedOutcome] : null;
  const isFormValid = !!selectedOutcome;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Target className="text-indigo-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  Définir l'Outcome de la User Story
                </h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {story.title}
              </p>
              <p className="text-xs text-indigo-600 mt-2 flex items-center gap-1">
                <AlertCircle size={14} />
                Pas d'échec, que des apprentissages ! Choisissez l'action suivante.
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Corps */}
        <div className="p-6">
          {!showConfirmation ? (
            <div className="space-y-5">
              {/* 1. Sélection Outcome */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  1️⃣ Quel est l'état final de cette User Story ?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.values(outcomes).map((outcome) => {
                    const Icon = outcome.icon;
                    const isSelected = selectedOutcome === outcome.id;
                    return (
                      <button
                        key={outcome.id}
                        type="button"
                        onClick={() => {
                          setSelectedOutcome(outcome.id);
                          setSelectedReason('');
                        }}
                        className={`
                          p-4 rounded-lg border-2 transition-all text-left
                          ${isSelected 
                            ? `${outcome.bgClass} ring-2 ring-${outcome.color}-400 ring-opacity-50` 
                            : `bg-white border-gray-200 ${outcome.buttonClass}`
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`w-6 h-6 ${outcome.iconClass} flex-shrink-0`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">
                                {outcome.label}
                              </span>
                              {isSelected && (
                                <CheckCircle2 size={14} className="text-indigo-600" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {outcome.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Raisons */}
              {selectedOutcomeConfig && (
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    2️⃣ Raison <span className="text-xs font-normal text-gray-500">(optionnel)</span>
                  </h3>
                  <input
                    type="text"
                    id="customReason"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    placeholder="Raison de cet outcome..."
                    className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* 3. Notes */}
              {selectedOutcomeConfig && (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700">
                    3️⃣ Notes additionnelles <span className="text-xs font-normal text-gray-500">(optionnel)</span>
                  </h3>
                  <textarea
                    value={outcomeNote}
                    onChange={(e) => setOutcomeNote(e.target.value)}
                    placeholder="Ajoutez des détails, des liens, ou des informations utiles pour la suite..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
              )}

              {/* Actions suggérées */}
              {selectedOutcomeConfig && getNextActions(selectedOutcome).length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Actions suggérées
                  </h4>
                  <ul className="space-y-1">
                    {getNextActions(selectedOutcome).map((action, idx) => (
                      <li key={idx} className="text-sm text-blue-700 flex items-start gap-2">
                        <span className="block mt-0.5">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Historique */}
              {story.history && story.history.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Historique
                  </h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1">
                    {story.history.map((entry, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="text-gray-400">
                          {new Date(entry.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span>→</span>
                        <span className="font-medium">
                          {entry.outcome === 'completed' ? '✅' :
                           entry.outcome === 'paused' ? '⏸️' :
                           entry.outcome === 'blocked' ? '🚧' :
                           entry.outcome === 'cancelled' ? '🚫' :
                           entry.outcome === 'to_review' ? '🔄' : ''}
                          {' '}{outcomes[entry.outcome]?.label || entry.outcome}
                        </span>
                        {entry.reason && (
                          <>
                            <span>:</span>
                            <span className="italic">{entry.reason}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Confirmation
            <div className="py-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Outcome défini avec succès !
                </h3>
                <p className="text-sm text-green-700">
                  La User Story a été mise à jour avec l'outcome "{selectedOutcomeConfig?.label}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="text-xs text-gray-600">
            {!isFormValid && !showConfirmation && (
              <span className="flex items-center gap-1 text-amber-600">
                <AlertCircle size={14} />
                Veuillez sélectionner un outcome
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showConfirmation ? 'Fermer' : 'Annuler'}
            </button>
            {!showConfirmation && (
              <button
                type="button"
                onClick={() => {
                  if (selectedOutcome) {
                    handleSubmit();
                    setShowConfirmation(true);
                    setTimeout(() => {
                      onClose();
                    }, 2000);
                  }
                }}
                disabled={!isFormValid}
                className={`px-4 py-2 text-sm rounded-lg transition-all flex items-center gap-2 ${
                  isFormValid
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 size={16} />
                Valider l'Outcome
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStoryOutcomeManager;
