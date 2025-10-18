import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Добро пожаловать в Coffee & Books
        </h1>
        <p className="hero-subtitle">
          Уютное место, где встречаются ароматный кофе и увлекательные книги
        </p>
        <div className="hero-actions">
          <Link to="/menu" className="btn btn-primary">
            Посмотреть меню
          </Link>
          <Link to="/reservation" className="btn btn-secondary">
            Забронировать столик
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;