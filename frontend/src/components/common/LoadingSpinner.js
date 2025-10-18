import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  text = 'Загрузка...' 
}) => {
  return (
    <div className="loading-spinner-container">
      <div className={`spinner ${size} ${color}`}>
        <div className="spinner-circle"></div>
      </div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

// Вариант для полноэкранной загрузки
export const FullPageSpinner = ({ text = 'Загрузка...' }) => {
  return (
    <div className="full-page-spinner">
      <div className="spinner large primary">
        <div className="spinner-circle"></div>
      </div>
      <p className="spinner-text">{text}</p>
    </div>
  );
};

// Вариант для кнопок
export const ButtonSpinner = ({ size = 'small' }) => {
  return (
    <div className={`button-spinner ${size}`}>
      <div className="spinner-circle"></div>
    </div>
  );
};

export default LoadingSpinner;