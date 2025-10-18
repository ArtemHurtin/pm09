const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  registerForEvent
} = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.post('/:id/register', registerForEvent);

module.exports = router;