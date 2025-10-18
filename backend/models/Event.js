const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  time: String,
  image: String,
  maxParticipants: Number,
  currentParticipants: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['book_club', 'author_meeting', 'master_class', 'other']
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Event', eventSchema);