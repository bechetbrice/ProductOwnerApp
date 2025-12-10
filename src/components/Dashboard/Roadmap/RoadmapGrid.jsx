import React from 'react';

/**
 * RoadmapGrid - Grille de la timeline avec marqueurs de dates
 * Optimisée pour mobile, tablet et desktop
 */
const RoadmapGrid = ({ days, viewMode, startDate }) => {
  const markers = [];

  // Générer les marqueurs selon le mode de vue
  for (let dayIndex = 0; dayIndex <= days; dayIndex++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + dayIndex);

    const isMonthStart = currentDate.getDate() === 1;
    const isWeekStart = currentDate.getDay() === 1;
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

    if (viewMode === 'month') {
      const isSunday = currentDate.getDay() === 0;
      const isSaturday = currentDate.getDay() === 6;
      const isWeekend = isSunday || isSaturday;

      markers.push(
        <div
          key={`day-${dayIndex}`}
          className={`flex-1 border-l relative ${
            isWeekend ? 'bg-gray-50' : ''
          } ${
            isMonthStart
              ? 'border-l-2 border-emerald-400'
              : isWeekStart
              ? 'border-gray-400'
              : 'border-gray-200'
          }`}
        >
          {/* ✅ FIX: Taille de texte responsive */}
          <span
            className={`text-[9px] sm:text-[10px] md:text-xs ml-0.5 sm:ml-1 block ${
              isMonthStart
                ? 'font-bold text-emerald-600'
                : isWeekStart
                ? 'font-medium text-gray-600'
                : isWeekend
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            {isMonthStart
              ? currentDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
              : currentDate.toLocaleDateString('fr-FR', { day: '2-digit' })}
          </span>
        </div>
      );
    } else if (viewMode === 'quarter' || viewMode === 'year') {
      // Pour quarter et year, afficher seulement les marqueurs de mois
      if (isMonthStart) {
        markers.push(
          <div
            key={`month-${monthKey}-${dayIndex}`}
            className="flex-1 border-l border-gray-400 relative"
          >
            {/* ✅ FIX: Taille de texte responsive */}
            <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-600 ml-0.5 sm:ml-1 block">
              {currentDate.toLocaleDateString('fr-FR', { month: 'short' })}
            </span>
          </div>
        );
      } else {
        // Jours vides pour maintenir l'alignement flex
        markers.push(
          <div key={`day-${dayIndex}`} className="flex-1" />
        );
      }
    }
  }

  return (
    <div className="flex h-full w-full">
      {markers}
    </div>
  );
};

export default RoadmapGrid;
