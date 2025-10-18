import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item }) => {
  return (
    <div className={`menu-item ${!item.available ? 'unavailable' : ''}`}>
      <div className="menu-item-image">
        <img 
          src={item.image || '/images/menu-default.jpg'} 
          alt={item.name}
        />
        {!item.available && <div className="sold-out">Нет в наличии</div>}
      </div>
      
      <div className="menu-item-content">
        <div className="menu-item-header">
          <h3>{item.name}</h3>
          <span className="price">{item.price} руб.</span>
        </div>
        
        <p className="description">{item.description}</p>
        
        {item.ingredients && item.ingredients.length > 0 && (
          <p className="ingredients">
            <strong>Состав:</strong> {item.ingredients.join(', ')}
          </p>
        )}
        
        <div className="item-tags">
          {item.vegan && <span className="tag vegan"> Веган</span>}
          {item.lactoseFree && <span className="tag lactose-free"> Без лактозы</span>}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;