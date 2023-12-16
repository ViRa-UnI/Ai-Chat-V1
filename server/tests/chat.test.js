const request = require('supertest');
const app = require('../index');
const { User } = require('../models/User');
const { Chat } = require('../models/Chat');
const mongoose = require('mongoose');
const { setupDB } = require('./test-setup');

setupDB('test-chat');

describe('Chat API endpoints', () => {
  let user;
  let token;

  beforeAll(async () => {
    // Create a test user
    user = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });
    await user.save();

    // Authenticate to get a token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    token = res.body.token;
  });

  afterAll(async () => {
    // Clean up database after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  test('POST /api/chat - send a message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'Hello, AI!'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Hello, AI!');
  });

  test('GET /api/chat - retrieve chat history', async () => {
    // Send a message to have it in the chat history
    await request(app)
      .post('/api/chat')
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'Hello again, AI!'
      });

    const res = await request(app)
      .get('/api/chat')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('chatHistory');
    expect(res.body.chatHistory.length).toBeGreaterThan(0);
    expect(res.body.chatHistory[0]).toHaveProperty('message', 'Hello again, AI!');
  });
});