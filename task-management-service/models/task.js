const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    name: {
      type: String,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'done'],
    default: 'todo'
  }
});

module.exports = mongoose.model('Task', taskSchema);
