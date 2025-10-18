import React, { useState, useEffect } from 'react';
import { reviewsAPI } from '../../services/api';
import './Testimonials.css';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    email: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await reviewsAPI.getReviews();
      setReviews(response.data.data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await reviewsAPI.createReview(newReview);
      setNewReview({ author: '', email: '', rating: 5, comment: '' });
      setShowForm(false);
      loadReviews(); // Reload reviews to show the new one
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2>Отзывы наших гостей</h2>
        
        <div className="reviews-grid">
          {reviews.slice(0, 3).map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-text">"{review.comment}"</p>
              <p className="review-author">— {review.author}</p>
            </div>
          ))}
        </div>

        <button 
          className="btn btn-secondary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Отменить' : 'Оставить отзыв'}
        </button>

        {showForm && (
          <form className="review-form" onSubmit={handleSubmitReview}>
            <h3>Оставить отзыв</h3>
            <div className="form-group">
              <input
                type="text"
                name="author"
                placeholder="Ваше имя"
                value={newReview.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Ваш email"
                value={newReview.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Оценка:</label>
              <select name="rating" value={newReview.rating} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} ★</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <textarea
                name="comment"
                placeholder="Ваш отзыв..."
                value={newReview.comment}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Отправить отзыв
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Testimonials;