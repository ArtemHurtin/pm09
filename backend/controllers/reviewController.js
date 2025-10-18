const Review = require('../models/Review');

// Получить все отзывы (только одобренные)
exports.getReviews = async (req, res) => {
  try {
    const { approved } = req.query;
    let filter = {};
    
    // По умолчанию показываем только одобренные отзывы
    if (approved !== undefined) {
      filter.approved = approved === 'true';
    } else {
      filter.approved = true;
    }
    
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Создать отзыв
exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      ...req.body,
      approved: false // Новые отзывы требуют модерации
    });
    await review.save();
    
    res.status(201).json({
      success: true,
      message: 'Отзыв отправлен на модерацию. Спасибо!',
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Одобрить отзыв (для админа)
exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Отзыв не найден'
      });
    }
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};