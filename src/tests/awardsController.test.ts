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

beforeEach(async () => {
  await new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM movies');
      db.run(
        `INSERT INTO movies (year, title, studios, producers, winner) VALUES
        (2000, 'Movie A', 'Studio A', 'Producer A and Producer D', 1),
        (2001, 'Movie B', 'Studio A', 'Producer A, Producer D and Producer E', 1),
        (2005, 'Movie C', 'Studio B', 'Producer C', 1),
        (2010, 'Movie D', 'Studio C', 'Producer B, Producer D and Producer E', 1),
        (2015, 'Movie E', 'Studio C', 'Producer B, Producer D and Producer E', 1),
        (2020, 'Movie F', 'Studio C', 'Producer B, Producer D and Producer E', 1),
        (2025, 'Movie G', 'Studio B', 'Producer C', 1),
        (2000, 'Movie H', 'Studio D', 'Producer F', 1),
        (2001, 'Movie I', 'Studio D', 'Producer G', 1),
        (2002, 'Movie J', 'Studio D', 'Producer G', 1),
        (2000, 'Movie K', 'Studio E', 'Producer H', 1),
        (2002, 'Movie L', 'Studio E', 'Producer H', 1),
        (2004, 'Movie M', 'Studio E', 'Producer H', 1),
        (2024, 'Movie N', 'Studio E', 'Producer H', 1)`,
        (err) => {
          if (err != null) reject(err);
          else resolve(true);
        },
      );
    });
  });
});

describe('GET /api/awards/intervals', () => {
  it('should return corrects producer intervals', async () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const response = await request(app).get('/api/awards/intervals');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    expect(response.body.min).toStrictEqual([
      {
        producers: 'Producer A',
        interval: 1,
        previousWin: 2000,
        followingWin: 2001,
      },
      {
        producers: 'Producer D',
        interval: 1,
        previousWin: 2000,
        followingWin: 2001,
      },
      {
        producers: 'Producer G',
        interval: 1,
        previousWin: 2001,
        followingWin: 2002,
      },
    ]);

    expect(response.body.max).toStrictEqual([
      {
        producers: 'Producer C',
        interval: 20,
        previousWin: 2005,
        followingWin: 2025,
      },
      {
        producers: 'Producer H',
        interval: 20,
        previousWin: 2004,
        followingWin: 2024,
      },
    ]);
  });
});
