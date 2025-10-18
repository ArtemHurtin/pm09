const Reservation = require('../models/Reservation');

// Создать бронирование
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    
    // Здесь можно добавить отправку email/SMS подтверждения
    console.log(`New reservation created for ${reservation.name}`);
    
    res.status(201).json({
      success: true,
      data: reservation,
      message: 'Бронирование успешно создано!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Получить все бронирования
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    res.json({
      success: true,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Обновить статус бронирования
exports.updateReservationStatus = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};