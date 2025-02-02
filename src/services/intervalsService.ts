import { db } from '../database/db';
import { type MovieType } from '../models/Movie';

interface ProducerInterval {
  producers: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export const getProducerIntervals = async (): Promise<any> => {
  const movies: MovieType[] = await new Promise((resolve, reject) => {
    // get all movies with a winner
    db.all(
      'SELECT year, producers FROM movies WHERE winner = 1',
      (err, rows) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
          reject(err);
        } else {
          resolve(rows as MovieType[]);
        }
      },
    );
  });

  const producerWins: Record<string, number[]> = {};

  movies.forEach((movie: any) => {
    // normalize producers - replace "and" with ","
    const normalizedProducers = movie.producers.replace(/\s+and\s+/g, ', ');
    // split producers by ","
    normalizedProducers.split(', ').forEach((producer: string) => {
      // trim producer
      const cleanProducer = producer.trim();
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!producerWins[cleanProducer]) {
        producerWins[cleanProducer] = [];
      }
      producerWins[cleanProducer].push(movie.year);
    });
  });

  const producerIntervals: ProducerInterval[] = [];

  for (const producer in producerWins) {
    // sort wins by year
    const wins = producerWins[producer].sort((a, b) => a - b);
    if (wins.length > 1) {
      for (let i = 0; i < wins.length - 1; i++) {
        // for every producer with more than one win, push an interval
        producerIntervals.push({
          producers: producer,
          interval: wins[i + 1] - wins[i],
          previousWin: wins[i],
          followingWin: wins[i + 1],
        });
      }
    }
  }

  // if no intervals, return empty array
  if (producerIntervals.length === 0) {
    return { min: [], max: [] };
  }

  // get min and max interval
  const min = Math.min(...producerIntervals.map((p) => p.interval));
  const max = Math.max(...producerIntervals.map((p) => p.interval));

  // filter by min and max interval
  return {
    min: producerIntervals.filter((p) => p.interval === min),
    max: producerIntervals.filter((p) => p.interval === max),
  };
};
