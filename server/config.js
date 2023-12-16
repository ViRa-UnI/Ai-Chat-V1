require('dotenv').config();

const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ai_chat_app',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  openAIKey: process.env.OPENAI_API_KEY,
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development'
};

module.exports = config;