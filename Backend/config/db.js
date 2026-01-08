const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon + Render
  },
});

pool
  .connect()
  .then(() => console.log("🟢 Connected to Neon Postgres"))
  .catch((err) => console.error("🔴 Neon DB connection failed:", err));

module.exports = pool;
