import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function createUserTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await connection.query(createTableQuery);
      console.log('User table created or already exists');
    } catch (error) {
      console.error('Error creating user table:', error);
    }
  }

  export async function createRoomTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS room (
        id INT AUTO_INCREMENT PRIMARY KEY,
        roomname VARCHAR(100),
        occupied_count INT,
        CHECK (occupied_count <= 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await connection.query(createTableQuery);
      console.log('Room table created or already exists');
    } catch (error) {
      console.error('Error creating room table:', error);
    }
  }

export default connection;
