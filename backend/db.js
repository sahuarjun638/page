const mysql = require("mysql2/promise");

// Do not require dotenv or rely on a .env file by default. Use explicit defaults.
const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Arjun@123",
  database: process.env.DB_NAME || "page",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(DB_CONFIG);

module.exports = pool;
