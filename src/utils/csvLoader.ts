/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { db } from '../database/db';

export const loadCsv = async (csvFilePath: string): Promise<boolean> => {
  const filePath = path.join(__dirname, csvFilePath);

  return await new Promise((resolve, reject) => {
    // read the csv file
    fs.createReadStream(filePath)
      // parse the csv
      .pipe(csvParser({ separator: ';' }))
      .on('data', (row) => {
        const movie = {
          year: row.year,
          title: row.title,
          studios: row.studios,
          producers: row.producers,
          winner: row.winner === 'yes', // convert 'yes' to true
        };
        if (!movie.year || !movie.title || !movie.studios || !movie.producers) {
          reject(
            new Error(
              'Invalid csv file format. One or more fields are empty (year, title, studios, producers or winner)',
            ),
          );
          return;
        }
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
