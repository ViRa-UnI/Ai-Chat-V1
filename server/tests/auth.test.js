const request = require('supertest');
const app = require('../index');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { setupDB } = require('./test-setup');

setupDB('test-auth');

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should not register a user with existing email', async () => {
      const user = new User({
        username: 'existinguser',
        email: 'existinguser@example.com',
        password: bcrypt.hashSync('password123', 10),
      });
      await user.save();

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'existinguser@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user and return token', async () => {
      const user = new User({
        username: 'loginuser',
        email: 'loginuser@example.com',
        password: bcrypt.hashSync('password123', 10),
      });
      await user.save();

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'loginuser@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login user with wrong credentials', async () => {
      const user = new User({
        username: 'wrongcredsuser',
        email: 'wrongcredsuser@example.com',
        password: bcrypt.hashSync('password123', 10),
      });
      await user.save();

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrongcredsuser@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error');
    });
  });
});