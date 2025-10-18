const express = require('express');
const router = express.Router();
const {
  getReviews,
  createReview,
  approveReview
} = require('../controllers/reviewController');

router.get('/', getReviews);
router.post('/', createReview);
router.patch('/:id/approve', approveReview);

module.exports = router;