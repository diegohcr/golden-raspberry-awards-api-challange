import { db } from '../database/db';

interface ProducerInterval {
  producers: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export const getProducerIntervals = async (): Promise<any> => {
  const movies: any = await new Promise((resolve, reject) => {
    db.all(
      'SELECT year, producers FROM movies WHERE winner = 1',
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });

  const producerWins: Record<string, number[]> = {};

  movies.forEach((movie: any) => {
    const normalizedProducers = movie.producers.replace(/\s+and\s+/g, ', ');
    normalizedProducers.split(', ').map((producer: string) => {
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
    const wins = producerWins[producer].sort((a, b) => a - b);
    if (wins.length > 1) {
      for (let i = 0; i < wins.length - 1; i++) {
        producerIntervals.push({
          producers: producer,
          interval: wins[i + 1] - wins[i],
          previousWin: wins[i],
          followingWin: wins[i + 1],
        });
      }
    }
  }

  if (producerIntervals.length === 0) {
    return { min: [], max: [] };
  }

  const min = Math.min(...producerIntervals.map((p) => p.interval));
  const max = Math.max(...producerIntervals.map((p) => p.interval));

  return {
    min: producerIntervals.filter((p) => p.interval === min),
    max: producerIntervals.filter((p) => p.interval === max),
  };
};
