const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to handle sending a message
router.post('/send', authMiddleware, chatController.sendMessage);

// Route to fetch chat history
router.get('/history', authMiddleware, chatController.fetchChatHistory);

// Route to update chat settings
router.put('/settings', authMiddleware, chatController.updateSettings);

module.exports = router;