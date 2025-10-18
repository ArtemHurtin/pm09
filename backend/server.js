const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');

// Подключение к базе данных
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Временные маршруты
app.get('/api/reservations', (req, res) => {
  res.json({ 
    success: true, 
    data: [], 
    message: 'Reservations endpoint' 
  });
});

app.get('/api/menu', (req, res) => {
  res.json({ 
    success: true, 
    data: [
      { 
        id: 1, 
        name: "Эспрессо", 
        price: 180, 
        category: "coffee",
        description: "Классический крепкий кофе",
        image: "/images/menu/coffee/espresso.jpg"
      },
      { 
        id: 2, 
        name: "Капучино", 
        price: 220, 
        category: "coffee",
        description: "Кофе с молочной пенкой",
        image: "/images/menu/coffee/cappuccino.jpg"
      },
      { 
        id: 3, 
        name: "Чизкейк", 
        price: 280, 
        category: "desserts",
        description: "Нежный сырный десерт", 
        image: "/images/menu/desserts/cheesecake.jpg"
      }
    ] 
  });
});

app.post('/api/reservations', (req, res) => {
  const reservation = {
    id: Date.now(),
    ...req.body,
    status: 'pending',
    createdAt: new Date()
  };
  res.json({ 
    success: true, 
    data: reservation, 
    message: 'Бронирование создано!' 
  });
});

app.get('/api/events', (req, res) => {
  res.json({ 
    success: true, 
    data: [
      {
        id: 1,
        title: "Книжный клуб",
        description: "Обсуждение современных произведений",
        date: "2024-02-15",
        time: "19:00",
        image: "/images/events/book-club.jpg",
        type: "book_club"
      }
    ], 
    message: 'Events endpoint' 
  });
});

app.get('/api/reviews', (req, res) => {
  res.json({ 
    success: true, 
    data: [
      {
        id: 1,
        author: "Анна",
        rating: 5,
        comment: "Отличное место! Кофе вкусный, атмосфера уютная.",
        createdAt: new Date()
      }
    ], 
    message: 'Reviews endpoint' 
  });
});

app.post('/api/reviews', (req, res) => {
  const review = {
    id: Date.now(),
    ...req.body,
    approved: false,
    createdAt: new Date()
  };
  res.json({ 
    success: true, 
    data: review, 
    message: 'Отзыв отправлен на модерацию!' 
  });
});

app.get('/api/orders', (req, res) => {
  res.json({ 
    success: true, 
    data: [], 
    message: 'Orders endpoint' 
  });
});

// Основной маршрут
app.get('/', (req, res) => {
  res.json({ 
    message: 'Coffee & Books API is running!',
    description: 'Backend for Coffee & Books cafe',
    version: '1.0.0',
    endpoints: {
      reservations: '/api/reservations',
      menu: '/api/menu', 
      events: '/api/events',
      reviews: '/api/reviews',
      orders: '/api/orders'
    }
  });
});

// Обработчик 404
app.use('', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = 5000; // Просто жестко задаем порт

app.listen(PORT, () => {
  console.log(` Coffee & Books Server is running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api`);
  console.log(`Test: http://localhost:${PORT}/api/menu`);
});