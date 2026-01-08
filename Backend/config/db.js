// File: config/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',           // Default user
    host: 'localhost',          // Default host
    database: 'cal_clone',      // Must match the DB you created in Step 3
    password: 'Aarthi1234', // REPLACE THIS WITH YOUR PASSWORD
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection FAILED:', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool;