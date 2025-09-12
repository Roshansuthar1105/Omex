const request = require('supertest');
const app = require('../src/app');

describe('Error Cases', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    
    expect(response.statusCode).toBe(404);
  });

  it('should handle JSON parsing errors', async () => {
    const response = await request(app)
      .post('/ai/optimize')
      .set('Content-Type', 'application/json')
      .send('invalid json');
    
    expect(response.statusCode).toBe(400);
  });
});