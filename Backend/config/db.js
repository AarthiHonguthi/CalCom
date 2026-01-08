// config/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // <- your local PG user
  host: "localhost",
  database: "cal_clone", // <- change if your DB name differs
  password: "postgres", // <- your PG password
  port: 5432, // <- default PG port
});

pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("❌ Local PostgreSQL connection FAILED:", err);
  } else {
    console.log("✅ Local PostgreSQL connected successfully");
  }
});

module.exports = pool;
