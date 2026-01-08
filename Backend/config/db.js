// File: config/db.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection FAILED:', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool;