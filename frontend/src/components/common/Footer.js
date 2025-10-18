import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          
          {/* Информация о кофейне */}
          <div className="footer-section">
            <h3> Coffee & Books</h3>
            <p className="footer-description">
              Наша кофейня — это гармоничное пространство, где каждый гость может погрузиться в мир любимых книг за чашечкой ароматного кофе, наслаждаясь атмосферой спокойствия и умиротворения.
            </p>
            <div className="social-links">
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="social-link">
                VK
                </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-link">
                Telegram
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div className="footer-section">
            <h4>Навигация</h4>
            <ul className="footer-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/menu">Меню</Link></li>
              <li><Link to="/reservation">Бронирование</Link></li>
              <li><Link to="/events">Мероприятия</Link></li>
              <li><Link to="/reviews">Отзывы</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="footer-section">
            <h4>Контакты</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon"> </span>
                <span>г.Калуга, ул. Автозаводская 15</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon"> </span>
                <span>8-956-123-00-05</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon"> </span>
                <span>email: KofeiKnigi@mail.ru</span>
              </div>
            </div>
          </div>

          {/* График работы */}
          <div className="footer-section">
            <h4>График работы</h4>
            <div className="working-hours">
              <div className="hours-item">
                <span>Пн - Пт:</span>
                <span>8:00 - 19:00</span>
              </div>
              <div className="hours-item">
                <span>Сб - Вс:</span>
                <span>8:00 - 16:00</span>
              </div>
              <div className="hours-item">
                <span>Бронирование:</span>
                <span>круглосуточно</span>
              </div>
            </div>
          </div>

        </div>

        {/* Нижняя часть футера */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Coffee & Books. Все права защищены.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Политика конфиденциальности</Link>
              <Link to="/terms">Условия использования</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;