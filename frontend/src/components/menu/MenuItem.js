import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item }) => {
  // Функция для получения пути к изображению
  const getImagePath = () => {
    // Если в данных есть конкретное изображение - используем его
    if (item.image) return item.image;
    
    // Иначе генерируем путь по категории и названию
    const category = item.category.toLowerCase();
    const name = item.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    
    return `/images/menu/${category}/${name}.jpg`;
  };

  return (
    <div className={`menu-item ${!item.available ? 'unavailable' : ''}`}>
      <div className="menu-item-image">
        <img 
          src={getImagePath()} 
          alt={item.name}
          onError={(e) => {
            // Если изображение не найдено, используем заглушку для категории
            e.target.src = `/images/menu/${item.category}/default.jpg`;
          }}
        />
        {!item.available && <div className="sold-out">Нет в наличии</div>}
      </div>
      
      <div className="menu-item-content">
        {/* остальной код */}
      </div>
    </div>
  );
}