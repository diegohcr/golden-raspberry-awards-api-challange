import request from 'supertest';
import { app, startServer } from '../app';
import { db } from '../database/db';

let server: any;

beforeAll(async () => {
  server = await startServer();
});

afterAll(async () => {
  await server.close();
  db.close();
});

beforeEach(async () => {});

describe('GET /api/awards/intervals', () => {
  it('should return corrects producer intervals', async () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const response = await request(app).get('/api/awards/intervals');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    expect(response.body.min).toStrictEqual([
      {
        producers: 'Joel Silver',
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      },
    ]);

    expect(response.body.max).toStrictEqual([
      {
        producers: 'Matthew Vaughn',
        interval: 13,
        previousWin: 2002,
        followingWin: 2015,
      },
    ]);
  });

  it('should correct data integrity', async () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const response = await request(app).get('/api/awards/intervals');

    expect(response.body.min[0]).toMatchObject({
      producers: expect.any(String),
      interval: expect.any(Number),
      previousWin: expect.any(Number),
      followingWin: expect.any(Number),
    });

    expect(response.body.max[0]).toMatchObject({
      producers: expect.any(String),
      interval: expect.any(Number),
      previousWin: expect.any(Number),
      followingWin: expect.any(Number),
    });
  });
});
