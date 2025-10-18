const Order = require('../models/Order');

// Создать заказ
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    // Здесь можно добавить логику отправки уведомлений
    console.log(` New order at Coffee & Books: ${order._id}`);

res.status(201).json({
  success: true,
  message: 'Заказ в Coffee & Books успешно создан!',
  data: order
});
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Получить все заказы
exports.getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    
    const orders = await Order.find(filter)
      .populate('items.menuItem')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Обновить статус заказа
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('items.menuItem');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Заказ не найден'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Получить заказ по ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.menuItem');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Заказ не найден'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};