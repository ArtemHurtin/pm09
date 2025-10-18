import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menu API
export const menuAPI = {
  getMenu: () => api.get('/menu'),
  getMenuByCategory: (category) => api.get(`/menu/category/${category}`),
};

// Reservations API
export const reservationsAPI = {
  createReservation: (data) => api.post('/reservations', data),
  getReservations: () => api.get('/reservations'),
};

// Events API
export const eventsAPI = {
  getEvents: () => api.get('/events'),
  registerForEvent: (eventId) => api.post(`/events/${eventId}/register`),
};

// Reviews API
export const reviewsAPI = {
  getReviews: () => api.get('/reviews'),
  createReview: (data) => api.post('/reviews', data),
};

// Orders API
export const ordersAPI = {
  createOrder: (data) => api.post('/orders', data),
  getOrders: () => api.get('/orders'),
};

export default api;