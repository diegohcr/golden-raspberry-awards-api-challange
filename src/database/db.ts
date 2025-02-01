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
  console.log('Database initialized');
};
export { db, initDB };
