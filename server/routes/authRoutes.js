const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /auth/register - Register a new user
router.post('/register', authController.registerUser);

// POST /auth/login - Authenticate a user and return a token
router.post('/login', authController.loginUser);

// GET /auth/user - Get user data for the currently authenticated user
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;