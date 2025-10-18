import React, { useState, useEffect } from 'react';
import { menuAPI } from '../services/api';
import { CATEGORIES } from '../services/constants';
import MenuCategory from '../components/menu/MenuCategory';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.COFFEE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const response = await menuAPI.getMenu();
      setMenuItems(response.data.data);
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return <div className="loading">Загрузка меню...</div>;
  }

  return (
    <div className="menu-page">
      <h1>Наше меню</h1>
      
      <div className="category-tabs">
        {Object.values(CATEGORIES).map(category => (
          <button
            key={category}
            className={`tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>

      <MenuCategory 
        category={selectedCategory} 
        items={filteredItems} 
      />
    </div>
  );
};

const getCategoryLabel = (category) => {
  const labels = {
    [CATEGORIES.COFFEE]: 'Кофе',
    [CATEGORIES.DESSERTS]: 'Десерты',
    [CATEGORIES.BREAKFAST]: 'Завтраки',
    [CATEGORIES.BOOKS]: 'Книги'
  };
  return labels[category];
};

export default Menu;