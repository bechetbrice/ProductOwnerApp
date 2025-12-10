import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-window';

/**
 * VirtualizedList - Wrapper pour listes virtualisées
 * 
 * Rend seulement les items visibles pour optimiser les performances.
 * Scroll fluide même avec 500+ items.
 * 
 * Compatible avec react-window v2.x
 * 
 * @component
 * @param {Array} items - Items à afficher
 * @param {number} itemHeight - Hauteur d'un item en px
 * @param {number} height - Hauteur du container (défaut: 600px)
 * @param {Function} renderItem - Fonction de rendu ({ item, index, style })
 * @param {string} className - Classes CSS additionnelles
 * @param {number} overscanCount - Nombre d'items pré-chargés hors écran (défaut: 3)
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
  // Si peu d'items (< 20), pas besoin de virtualisation
  // Rendu normal plus simple et évite overhead
  if (items.length < 20) {
    return (
      <div className={className}>
        {items.map((item, index) => renderItem({ item, index, style: {} }))}
      </div>
    );
  }

  // Composant de rendu pour react-window v2.x
  const RowComponent = ({ index, style }) => {
    return renderItem({ item: items[index], index, style });
  };

  return (
    <List
      rowCount={items.length}
      rowHeight={itemHeight}
      rowComponent={RowComponent}
      rowProps={{}}
      defaultHeight={height}
      className={className}
      overscanCount={overscanCount}
      style={{ height }}
    />
  );
};

VirtualizedList.propTypes = {
  items: PropTypes.array.isRequired,
  itemHeight: PropTypes.number,
  height: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  className: PropTypes.string,
  overscanCount: PropTypes.number,
};

export default VirtualizedList;
