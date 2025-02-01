import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

const initDB = async (): Promise<void> => {
  db.serialize(() => {
    db.run(`
        CREATE TABLE movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER,
        title TEXT,
        studios TEXT,
        producers TEXT,
        winner BOOLEAN
        );    
    `);
  });
  console.log('Database initialized successfully');
};

// funtion to get data and verify if the database is working and with the data
const getData = async (): Promise<any> => {
  return await new Promise((resolve, reject) => {
    db.all('SELECT * FROM movies', (error, rows) => {
      if (error != null) {
        reject(error);
      } else {
        console.log('rows', rows);
        resolve(rows);
      }
    });
  });
};
export { db, initDB, getData };
