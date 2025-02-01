import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { db } from '../database/db';

export const loadCsv = async (csvFilePath: string) => {
  const filePath = path.join(__dirname, csvFilePath);

  return await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ';' }))
      .on('data', (row) => {
        const movie = {
          year: row.year,
          title: row.title,
          studios: row.studios,
          producers: row.producers,
          winner: row.winner === 'yes',
        };
        db.run(
          'INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)',
          [
            movie.year,
            movie.title,
            movie.studios,
            movie.producers,
            movie.winner,
          ],
          (error) => {
            reject(error);
          },
        );
      })
      .on('end', () => {
        console.log('CSV file loaded into database successfully');
        resolve(true);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
