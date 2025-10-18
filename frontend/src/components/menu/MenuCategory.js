import React, { useState } from 'react';
import MenuItem from './MenuItem';
import './MenuCategory.css';

const MenuCategory = ({ category, items }) => {
  const [filters, setFilters] = useState({
    vegan: false,
    lactoseFree: false,
    available: true
  });

  const filteredItems = items.filter(item => {
    if (filters.vegan && !item.vegan) return false;
    if (filters.lactoseFree && !item.lactoseFree) return false;
    if (filters.available && !item.available) return false;
    return true;
  });

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  return (
    <div className="menu-category">
      <div className="menu-filters">
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.vegan}
            onChange={() => handleFilterChange('vegan')}
          />
           Веганское
        </label>
        
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.lactoseFree}
            onChange={() => handleFilterChange('lactoseFree')}
          />
           Безлактозное
        </label>
        
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.available}
            onChange={() => handleFilterChange('available')}
          />
           В наличии
        </label>
      </div>

      <div className="menu-items-grid">
        {filteredItems.map(item => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          <p>Нет товаров, соответствующих выбранным фильтрам</p>
        </div>
      )}
    </div>
  );
};

export default MenuCategory;