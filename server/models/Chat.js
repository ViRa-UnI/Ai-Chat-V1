const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [
    {
      text: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      },
      isUserMessage: {
        type: Boolean,
        required: true
      }
    }
  ]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;