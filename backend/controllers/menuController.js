const MenuItem = require('../models/Menuitem');

// Получить все элементы меню
exports.getMenuItems = async (req, res) => {
  try {
    const { category, vegan, lactoseFree, available } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (vegan) filter.vegan = vegan === 'true';
    if (lactoseFree) filter.lactoseFree = lactoseFree === 'true';
    if (available) filter.available = available === 'true';
    
    const menuItems = await MenuItem.find(filter);
    res.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Получить элементы по категории
exports.getMenuByCategory = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ 
      category: req.params.category,
      available: true 
    });
    res.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Создать элемент меню
exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};