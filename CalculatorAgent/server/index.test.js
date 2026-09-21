const request = require('supertest');
const { app } = require('./index');

describe('GET /health', () => {
  test('returns 200 with status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      timestamp: expect.any(String)
    });
  });
});

describe('POST /api/calculate', () => {
  test('returns 200 with result for valid addition', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ a: 2, b: 3, operator: '+' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 5 });
  });

  test('returns 200 with result for valid subtraction', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ a: 10, b: 4, operator: '-' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 6 });
  });

  test('returns 200 with result for valid multiplication', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ a: 3, b: 7, operator: '*' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 21 });
  });

  test('returns 200 with result for valid division', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ a: 20, b: 4, operator: '/' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 5 });
  });

  test('returns 400 for non-numeric a', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ a: 'two', b: 3, operator: '+' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Both a and b must be numbers' });
  });

  test('returns 400 for non-numeric b', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ a: 2, b: 'three', operator: '+' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Both a and b must be numbers' });
  });

  test('returns 400 for missing a', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ b: 3, operator: '+' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Both a and b must be numbers' });
  });

  test('returns 400 for invalid operator', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ a: 2, b: 3, operator: '%' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid operator. Must be one of: +, -, *, /' });
  });

  test('returns 400 for division by zero', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ a: 5, b: 0, operator: '/' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Division by zero is not allowed' });
  });
});

describe('Server startup (require.main === module)', () => {
  let server;
  let serverPort;

  beforeAll((done) => {
    serverPort = 3002;
    server = app.listen(serverPort, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('server responds to health check when started directly', async () => {
    const response = await request(`http://localhost:${serverPort}`).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      timestamp: expect.any(String)
    });
  });

  test('server responds to calculate when started directly', async () => {
    const response = await request(`http://localhost:${serverPort}`)
      .post('/api/calculate')
      .send({ a: 10, b: 5, operator: '+' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 15 });
  });
});