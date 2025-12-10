import React from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';
import { ZOOM } from './RoadmapConstants';
import { CustomSelect } from '../../ui';

const RoadmapHeader = ({
  filteredSprints,
  userStories,
  viewMode,
  setViewMode,
  label,
  filterStatus,
  setFilterStatus,
  filterTeam,
  setFilterTeam,
  filterAssignedTo,
  setFilterAssignedTo,
  products,
  teams,
  teamMembers,
  contacts,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onNavigatePrevious,
  onNavigateNext,
  onGoToToday,
  hideProductFilter = false
}) => {

  // Préparer les options pour les CustomSelect
  const statusOptions = [
    { value: 'all', label: 'Tous statuts' },
    { value: 'planned', label: '📅 Planifiés' },
    { value: 'active', label: '▶️ En cours' },
    { value: 'completed', label: '✓ Terminés' }
  ];

  const teamOptions = [
    { value: 'all', label: 'Toutes les équipes' },
    ...teams.map(team => ({ value: team.id, label: team.name }))
  ];

  const assignationOptions = [
    { value: 'all', label: 'Toutes' },
    { value: 'unassigned', label: '❌ Non assignées' },
    ...contacts
      .filter(c => c.type === 'internal')
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      .map(contact => ({ value: contact.id, label: `👤 ${contact.name}` }))
  ];

  return (
    <>
      {/* FILTRES ET ACTIONS */}
      {/* ✅ FIX 1: Padding responsive */}
      <div className="p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
        <div>
          {/* ✅ FIX 2-3: Navigation temporelle responsive */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-4">
            {/* Groupe navigation */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onNavigatePrevious}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="Période précédente"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* ✅ FIX 4: Label période responsive */}
              <div className="px-3 sm:px-4 py-2 bg-emerald-50 rounded-lg font-semibold text-emerald-700 text-center text-sm sm:text-base flex-1 sm:flex-none sm:min-w-[140px] md:min-w-[160px]">
                {label}
              </div>

              <button
                onClick={onNavigateNext}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="Période suivante"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* ✅ FIX 5: Bouton "Aujourd'hui" responsive */}
            <button
              onClick={onGoToToday}
              className="px-3 py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Aujourd'hui</span>
              <span className="sm:hidden">Auj.</span>
            </button>
          </div>

          {/* ✅ FIX 6-7: Zoom et Vue temporelle en grid responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4">
            {/* Vue temporelle */}
            <div>
              {/* ✅ FIX 8: Label responsive */}
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Vue temporelle
              </label>
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => setViewMode('month')}
                  className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                    viewMode === 'month'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mois
                </button>
                <button
                  onClick={() => setViewMode('quarter')}
                  className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                    viewMode === 'quarter'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Trimestre
                </button>
                <button
                  onClick={() => setViewMode('year')}
                  className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                    viewMode === 'year'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Année
                </button>
              </div>
            </div>

            {/* ✅ FIX 9-10: Contrôles Zoom responsive */}
            <div>
              <label className={`block ${DASHBOARD_TEXT.label} mb-1 sm:mb-2`}>
                Zoom
              </label>
              <div className="flex gap-1 sm:gap-2 items-center">
                <button
                  onClick={onZoomOut}
                  disabled={zoomLevel <= ZOOM.MIN}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  aria-label="Zoom arrière"
                >
                  <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">-</span>
                </button>
                
                <div className="flex-1 text-center min-w-[60px]">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </div>
                
                <button
                  onClick={onZoomIn}
                  disabled={zoomLevel >= ZOOM.MAX}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  aria-label="Zoom avant"
                >
                  <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">+</span>
                </button>
                
                <button
                  onClick={onResetZoom}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1"
                  aria-label="Réinitialiser zoom"
                  title="Réinitialiser à 100%"
                >
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ✅ FIX 11: Filtres responsive (1 col mobile, 2 col tablet, 3 col desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
            {/* Statut */}
            <div>
              <label className={`block ${DASHBOARD_TEXT.label} mb-1 sm:mb-2`}>
                Statut
              </label>
              <CustomSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={statusOptions}
                aria-label="Filtrer par statut"
              />
            </div>

            {/* Équipe responsable */}
            <div>
              <label className={`block ${DASHBOARD_TEXT.label} mb-1 sm:mb-2`}>
                Équipe
              </label>
              <CustomSelect
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
                options={teamOptions}
                aria-label="Filtrer par équipe"
              />
            </div>

            {/* Assignation (Tâches) */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className={`block ${DASHBOARD_TEXT.label} mb-1 sm:mb-2`}>
                Assignation
              </label>
              <CustomSelect
                value={filterAssignedTo}
                onChange={(e) => setFilterAssignedTo(e.target.value)}
                options={assignationOptions}
                aria-label="Filtrer par assignation"
              />
            </div>
          </div>

          {/* ✅ FIX 12-15: Légende responsive avec wrap */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
            {/* Label "Légende" visible mobile */}
            <div className={`${DASHBOARD_TEXT.caption} font-medium mb-2 sm:hidden`}>Légende :</div>
            
            {/* Flex wrap + gap responsive */}
            <div className={`flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 ${DASHBOARD_TEXT.caption}`}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-100 border-2 border-cyan-400 rounded flex-shrink-0"></div>
                <span>Planifié</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-100 border-2 border-emerald-500 rounded flex-shrink-0"></div>
                <span>En cours</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 border-2 border-gray-400 rounded flex-shrink-0"></div>
                <span>Terminé</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-0.5 h-3 sm:h-4 bg-red-500 flex-shrink-0"></div>
                <span>Aujourd'hui</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadmapHeader;
