import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';
import { EVENT_TYPE_LABELS } from '../services/constants';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await eventsAPI.getEvents();
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (eventId) => {
    try {
      await eventsAPI.registerForEvent(eventId);
      alert('Регистрация прошла успешно!');
      loadEvents(); // Reload to update participants count
    } catch (error) {
      alert('Ошибка при регистрации: ' + error.response?.data?.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Загрузка мероприятий...</div>;
  }

  return (
    <div className="events-page">
      <div className="container">
        <h1>Мероприятия</h1>
        <p className="page-subtitle">
          Присоединяйтесь к нашим событиям: книжные клубы, встречи с авторами и мастер-классы
        </p>

        <div className="events-grid">
          {events.filter(event => event.active).map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-image">
                <img src={event.image || '/images/event-default.jpg'} alt={event.title} />
              </div>
              <div className="event-content">
                <span className="event-type">{EVENT_TYPE_LABELS[event.type]}</span>
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                
                <div className="event-details">
                  <div className="event-date">
                    <strong> {formatDate(event.date)}</strong>
                    {event.time && <span> в {event.time}</span>}
                  </div>
                  
                  {event.maxParticipants && (
                    <div className="event-participants">
                      Участников: {event.currentParticipants}/{event.maxParticipants}
                    </div>
                  )}
                  
                  {event.price > 0 && (
                    <div className="event-price">Стоимость: {event.price} руб.</div>
                  )}
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleRegistration(event._id)}
                  disabled={event.currentParticipants >= event.maxParticipants}
                >
                  {event.currentParticipants >= event.maxParticipants 
                    ? 'Мест нет' 
                    : 'Зарегистрироваться'
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        {events.filter(event => event.active).length === 0 && (
          <div className="no-events">
            <h3>На данный момент мероприятий нет</h3>
            <p>Следите за обновлениями, скоро мы анонсируем новые события!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;