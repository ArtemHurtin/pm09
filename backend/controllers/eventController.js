const Event = require('../models/Event');

// Получить все мероприятия
exports.getEvents = async (req, res) => {
  try {
    const { active, type } = req.query;
    let filter = {};
    
    if (active !== undefined) filter.active = active === 'true';
    if (type) filter.type = type;
    
    const events = await Event.find(filter).sort({ date: 1 });
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Получить мероприятие по ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено'
      });
    }
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Создать мероприятие
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Зарегистрироваться на мероприятие
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено'
      });
    }
    
    if (!event.active) {
      return res.status(400).json({
        success: false,
        message: 'Регистрация на это мероприятие закрыта'
      });
    }
    
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'На мероприятие нет свободных мест'
      });
    }
    
    event.currentParticipants += 1;
    await event.save();
    
    res.json({
      success: true,
      message: 'Регистрация прошла успешно!',
      data: event
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};