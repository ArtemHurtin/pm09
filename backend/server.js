const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Временные данные вместо MongoDB
const menuItems = [
  { 
    id: 1, 
    name: "Эспрессо", 
    price: 180, 
    category: "coffee",
    description: "Классический крепкий кофе",
    image: "/images/menu/coffee/espresso.jpg",
    available: true
  },
  { 
    id: 2, 
    name: "Капучино", 
    price: 220, 
    category: "coffee",
    description: "Кофе с молочной пенкой", 
    image: "/images/menu/coffee/cappuccino.jpg",
    available: true
  },
  { 
    id: 3, 
    name: "Чизкейк", 
    price: 280, 
    category: "desserts",
    description: "Нежный сырный десерт",
    image: "/images/menu/desserts/cheesecake.jpg",
    available: true
  }
];

const reservations = [];
const reviews = [];
const events = [];

// Маршруты
app.get('/', (req, res) => {
  res.json({ 
    message: ' Coffee & Books API is running!',
    status: 'OK'
  });
});

app.get('/api/menu', (req, res) => {
  res.json({ success: true, data: menuItems });
});

app.get('/api/menu/category/:category', (req, res) => {
  const categoryItems = menuItems.filter(item => item.category === req.params.category);
  res.json({ success: true, data: categoryItems });
});

app.post('/api/reservations', (req, res) => {
  const reservation = { 
    id: Date.now(), 
    ...req.body, 
    status: 'pending',
    createdAt: new Date()
  };
  reservations.push(reservation);
  res.json({ success: true, data: reservation, message: 'Бронирование создано!' });
});

app.get('/api/reservations', (req, res) => {
  res.json({ success: true, data: reservations });
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
        type: "book_club",
        active: true
      }
    ]
  });
});

app.post('/api/events/:id/register', (req, res) => {
  res.json({ success: true, message: 'Регистрация прошла успешно!' });
});

app.get('/api/reviews', (req, res) => {
  res.json({ 
    success: true, 
    data: [
      {
        id: 1,
        author: "Марина",
        rating: 5,
        comment: "Зашла сюда спонтанно, проходя мимо, и не пожалела! Атмосфера очень уютная, играет приятная музыка, нет навязчивого шума. Бариста встретила с улыбкой, помогла определиться с выбором — я взяла раф с карамелью. Кофе приготовили буквально за 5 минут, напиток получился просто божественный — насыщенный, с приятным ароматом и идеальным балансом сладости. Обязательно вернусь ещё!",
        approved: true,
        createdAt: new Date()
      }
    ]
  });
});

app.post('/api/reviews', (req, res) => {
  const review = { 
    id: Date.now(), 
    ...req.body, 
    approved: false,
    createdAt: new Date()
  };
  reviews.push(review);
  res.json({ success: true, data: review, message: 'Отзыв отправлен на модерацию!' });
});

app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: [] });
});

app.post('/api/orders', (req, res) => {
  const order = { 
    id: Date.now(), 
    ...req.body, 
    status: 'pending',
    createdAt: new Date()
  };
  res.json({ success: true, data: order, message: 'Заказ создан!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(` Coffee & Books Server is running on port ${PORT}`);
  console.log(` API: http://localhost:${PORT}/api`);
  console.log(` Меню: http://localhost:${PORT}/api/menu`);
  console.log(` Работает БЕЗ MongoDB - все данные в памяти`);
});