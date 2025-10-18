const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getMenuByCategory,
  createMenuItem
} = require('../controllers/menuController');

router.get('/', getMenuItems);
router.get('/category/:category', getMenuByCategory);
router.post('/', createMenuItem);

module.exports = router;