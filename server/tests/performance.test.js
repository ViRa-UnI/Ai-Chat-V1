```javascript
const request = require('supertest');
const app = require('../index');

describe('Performance Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('Home page loads quickly', async () => {
    const start = Date.now();
    const response = await request(server).get('/');
    const end = Date.now();
    expect(response.statusCode).toBe(200);
    expect(end - start).toBeLessThan(1000); // Response time should be less than 1000ms
  });

  test('Login endpoint performance', async () => {
    const start = Date.now();
    const response = await request(server).post('/auth/login').send({
      username: 'testuser',
      password: 'testpass'
    });
    const end = Date.now();
    expect(response.statusCode).toBe(200);
    expect(end - start).toBeLessThan(1000); // Response time should be less than 1000ms
  });

  test('Chat endpoint performance', async () => {
    const start = Date.now();
    const response = await request(server).get('/chat/history').set('Authorization', `Bearer testtoken`);
    const end = Date.now();
    expect(response.statusCode).toBe(200);
    expect(end - start).toBeLessThan(1000); // Response time should be less than 1000ms
  });

  // Add more performance tests as needed for other endpoints
});
```