import request from 'supertest';
import { app, startServer } from '../app';
import { db } from '../database/db';

let server: any;

beforeAll(async () => {
  console.log('beforeAll');
  server = await startServer();
});

afterAll(async () => {
  console.log('afterAll');
  await server.close();
});

beforeEach(async () => {
  console.log('beforeEach1');
  //   await Promise.all([db.run('DELETE FROM movies')]);
  await new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM movies');
      db.run(
        `INSERT INTO movies (year, title, studios, producers, winner) VALUES
        (2000, 'Movie A', 'Studio A', 'Producer A', 1),
        (2001, 'Movie B', 'Studio A', 'Producer A', 1),
        (2010, 'Movie C', 'Studio B', 'Producer B', 1),
        (2020, 'Movie D', 'Studio C', 'Producer B', 1)`,
        resolve,
      );
      const data = db.all('SELECT * FROM movies', (error, rows) => {
        if (error != null) {
          reject(error);
        } else {
          console.log('rows', rows);
          resolve(rows);
        }
      });
    });

    // db.run('DELETE FROM movies');
    // db.run(
    //   `INSERT INTO movies (year, title, studios, producers, winner) VALUES
    //     (2000, 'Movie A', 'Studio A', 'Producer A', 'yes'),
    //     (2001, 'Movie B', 'Studio A', 'Producer A', 'yes'),
    //     (2010, 'Movie C', 'Studio B', 'Producer B', 'yes'),
    //     (2020, 'Movie D', 'Studio C', 'Producer B', 'yes')`,
    // );
    // resolve(true);
  });
  console.log('beforeEach2');
});

describe('GET /api/awards/intervals', () => {
  console.log('GET /api/awards/intervals');
  it('should return corrects producer intervals', async () => {
    console.log('GET /api/awards/intervals1');
    const response = await request(app).get('/api/awards/intervals');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    expect(response.body.min).toContainEqual({
      producers: 'Producer A',
      interval: 1,
      previousWin: 2000,
      followingWin: 2001,
    });

    expect(response.body.max).toContainEqual({
      producers: 'Producer B',
      interval: 10,
      previousWin: 2010,
      followingWin: 2020,
    });
  });
  console.log('GET /api/awards/intervals2');
});
