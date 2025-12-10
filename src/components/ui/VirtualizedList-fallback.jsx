import React from 'react';

/**
 * VirtualizedList - Wrapper pour listes (VERSION SANS REACT-WINDOW)
 * 
 * Cette version temporaire rend tous les items sans virtualisation.
 * Fonctionne bien jusqu'à 100-200 items.
 * 
 * @component
 * @param {Array} items - Items à afficher
 * @param {number} itemHeight - Hauteur d'un item en px (ignoré sans virtualisation)
 * @param {number} height - Hauteur du container (défaut: 600px)
 * @param {Function} renderItem - Fonction de rendu ({ item, index, style })
 * @param {string} className - Classes CSS additionnelles
 * @param {number} overscanCount - Nombre d'items pré-chargés (ignoré)
 * 
 * @example
 * <VirtualizedList
 *   items={contacts}
 *   itemHeight={120}
 *   height={600}
 *   renderItem={({ item, style }) => (
 *     <div style={style}><ContactCard contact={item} /></div>
 *   )}
 * />
 */
const VirtualizedList = ({
  items,
  itemHeight = 120,
  height = 600,
  renderItem,
  className = '',
  overscanCount = 3
}) => {
  // Version sans virtualisation - rend tous les items
  // Acceptable pour < 200 items
  return (
    <div 
      className={className}
      style={{ 
        maxHeight: height,
        overflowY: 'auto'
      }}
    >
      {items.map((item, index) => renderItem({ item, index, style: {} }))}
    </div>
  );
};

export default VirtualizedList;
