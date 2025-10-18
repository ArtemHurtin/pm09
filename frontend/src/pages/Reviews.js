import React, { useState, useEffect } from 'react';
import { reviewsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    email: '',
    rating: 5,
    comment: ''
  });
  const [filter, setFilter] = useState('all'); // all, positive, negative

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await reviewsAPI.getReviews();
      setReviews(response.data.data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await reviewsAPI.createReview(newReview);
      setNewReview({ author: '', email: '', rating: 5, comment: '' });
      setShowForm(false);
      loadReviews(); // Перезагружаем отзывы
      alert('Спасибо за ваш отзыв! Он будет опубликован после модерации.');
    } catch (error) {
      alert('Ошибка при отправке отзыва. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value
    });
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'positive') return review.rating >= 4;
    if (filter === 'negative') return review.rating <= 2;
    return true;
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) {
    return <LoadingSpinner text="Загружаем отзывы..." />;
  }

  return (
    <div className="reviews-page">
      <div className="container">
        <div className="reviews-header">
          <h1>Отзывы наших гостей</h1>
          <div className="reviews-stats">
            <div className="average-rating">
              <span className="rating-number">{averageRating}</span>
              <div className="rating-stars">
                {'★'.repeat(5)}
                <div className="rating-overlay" style={{ width: `${(5 - averageRating) * 20}%` }}></div>
              </div>
              <span className="rating-count">на основе {reviews.length} отзывов</span>
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="reviews-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Все отзывы
          </button>
          <button 
            className={`filter-btn ${filter === 'positive' ? 'active' : ''}`}
            onClick={() => setFilter('positive')}
          >
            Положительные
          </button>
          <button 
            className={`filter-btn ${filter === 'negative' ? 'active' : ''}`}
            onClick={() => setFilter('negative')}
          >
            Критика
          </button>
        </div>

        {/* Кнопка добавления отзыва */}
        <div className="add-review-section">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Отменить' : '+ Написать отзыв'}
          </button>
        </div>

        {/* Форма отзыва */}
        {showForm && (
          <form className="review-form" onSubmit={handleSubmitReview}>
            <h3>Оставить отзыв</h3>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="author"
                  placeholder="Ваше имя *"
                  value={newReview.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Ваш email *"
                  value={newReview.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Ваша оценка:</label>
              <div className="rating-select">
                {[1, 2, 3, 4, 5].map(star => (
                  <label key={star} className="star-label">
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      checked={Number(newReview.rating) === star}
                      onChange={handleChange}
                    />
                    <span className="star">★</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <textarea
                name="comment"
                placeholder="Поделитесь вашими впечатлениями о кофейне... *"
                value={newReview.comment}
                onChange={handleChange}
                required
                rows="5"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Отправить отзыв
            </button>
          </form>
        )}

        {/* Список отзывов */}
        <div className="reviews-list">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="review-author">
                    <strong>{review.author}</strong>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="review-text">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="no-reviews">
              <p>Пока нет отзывов{filter !== 'all' ? ' по выбранному фильтру' : ''}. Будьте первым!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;