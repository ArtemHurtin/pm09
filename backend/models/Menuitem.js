const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['coffee', 'desserts', 'breakfast', 'books']
  },
  subcategory: String,
  image: String,
  ingredients: [String],
  tags: [String],
  available: {
    type: Boolean,
    default: true
  },
  vegan: Boolean,
  lactoseFree: Boolean
});

module.exports = mongoose.model('MenuItem', menuItemSchema);