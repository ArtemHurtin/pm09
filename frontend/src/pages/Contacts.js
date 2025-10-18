import React, { useState } from 'react';
import './Contacts.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка формы на бэкенд
    console.log('Форма отправлена:', formData);
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contacts-page">
      <div className="container">
        <h1>Контакты</h1>
        
        <div className="contacts-content">
          {/* Левая колонка - форма обратной связи */}
          <div className="contact-form-section">
            <h2>Свяжитесь с нами</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ваше имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Сообщение *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Отправить сообщение
              </button>
            </form>
          </div>

          {/* Правая колонка - карта и контактная информация */}
          <div className="contact-info-section">
            {/* Карта */}
            <div className="map-container">
              <div className="map-placeholder">
                <h3>Карта расположения</h3>
                <p>ул. Кофейная, 15, Москва</p>
                {/* Здесь будет интеграция с Google Maps API */}
                <div className="map-image">
                   Карта будет здесь
                </div>
              </div>
            </div>

            {/* Контактная информация */}
            <div className="contact-details">
              <h3>Наши контакты</h3>
              
              <div className="contact-item">
                <span className="contact-icon"></span>
                <div>
                  <strong>Адрес:</strong>
                  <p>г.Калуга, ул. Автозаводская 15, 101000</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon"></span>
                <div>
                  <strong>Телефон:</strong>
                  <p>8-956-123-00-05</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon"></span>
                <div>
                  <strong>Email:</strong>
                  <p> KofeiKnigi@mail.ru</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon"></span>
                <div>
                  <strong>График работы:</strong>
                  <p>Пн-Пт: 8:00 - 19:00</p>
                  <p>Сб-Вс: 8:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;